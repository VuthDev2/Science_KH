// ==============================================================================
// ScienceKH — RAG AI Educational Tutor Server Functions
// Fully grounded in verified MoEYS Curriculum, Study Reference Library & Exams
// ==============================================================================

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertValidUuid } from "@/lib/security/parameterized-query";
import { validateStudentInputForSafety } from "@/lib/security/ai-safety-guardrails";
import { retrieveCurriculumKnowledge } from "@/lib/rag/hybrid-retriever";
import { generateEducationalTutorResponse } from "@/lib/rag/ai-generator.service";
import type {
  SourceCitation,
  StudentLearningContext,
  TutorPedagogicalMode,
} from "@/types/rag-tutor";

export interface AskTutorInput {
  conversationId: string;
  userMessage: string;
  language: "en" | "km";
  mode?: TutorPedagogicalMode;
  grade?: number;
  subjectSlug?: string;
  stream?: "all" | "science" | "social_science";
  lessonId?: string;
  attemptedAnswer?: string;
}

export interface AskTutorOutput {
  reply: string;
  sources: SourceCitation[];
  suggestedQuestions: string[];
  mode: TutorPedagogicalMode;
  isGroundedInCurriculum: boolean;
  conversationId?: string;
}

export const askTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: AskTutorInput) => input)
  .handler(async ({ data, context }): Promise<AskTutorOutput> => {
    const { supabase, userId } = context;

    // 1. Parameterized security: strictly validate user UUID
    const safeUserId = assertValidUuid(userId, "userId");

    // 2. Resolve or create conversation
    let safeConvId = data.conversationId;
    if (data.conversationId === "new" || !data.conversationId) {
      const mode = data.mode || "ask_sciencekh";
      const title = data.userMessage.slice(0, 45) || (data.language === "km" ? "ការសន្ទនាថ្មី" : "New Chat");
      const { data: convCreated, error: convCrtErr } = await supabase
        .from("ai_conversations")
        .insert({ user_id: safeUserId, title })
        .select("id")
        .single();
      if (convCrtErr || !convCreated) throw new Error("Could not initialize conversation.");
      safeConvId = convCreated.id;
    } else {
      safeConvId = assertValidUuid(data.conversationId, "conversationId");
      const { data: conv, error: convErr } = await supabase
        .from("ai_conversations")
        .select("id, title")
        .eq("id", safeConvId)
        .eq("user_id", safeUserId)
        .maybeSingle();
      if (convErr || !conv) throw new Error("Conversation not found.");
    }

    // 3. Insert the student's message
    const mode = data.mode || "ask_sciencekh";
    let formattedUserMsg = data.userMessage;
    if (mode === "explain_my_answer" && data.attemptedAnswer) {
      formattedUserMsg = `**សំណួរ / Problem:** ${data.userMessage}\n\n**ចម្លើយរបស់ខ្ញុំ / My Attempt:** ${data.attemptedAnswer}`;
    }

    const { error: insErr } = await supabase.from("ai_messages").insert({
      conversation_id: safeConvId,
      role: "user",
      content: formattedUserMsg,
    });
    if (insErr) throw insErr;

    // 4. Pre-flight AI Child Safety & Jailbreak Validation
    const safetyCheck = validateStudentInputForSafety(
      `${data.userMessage} ${data.attemptedAnswer || ""}`
    );
    if (!safetyCheck.isSafe) {
      const safeReply =
        data.language === "km"
          ? safetyCheck.cannedReplyKm || "សំណួរនេះមិនស្ថិតក្នុងគោលការណ៍សុវត្ថិភាពសិក្សាឡើយ។"
          : safetyCheck.cannedReplyEn || "This query is restricted under educational safety guidelines.";

      await supabase.from("ai_messages").insert({
        conversation_id: safeConvId,
        role: "assistant",
        content: safeReply,
      });

      return {
        reply: safeReply,
        sources: [],
        suggestedQuestions: [],
        mode,
        isGroundedInCurriculum: false,
        conversationId: safeConvId,
      };
    }

    // 5. Build Student Learning Context (Grade 7–12, Subject, Stream)
    let studentGrade = data.grade;
    if (!studentGrade) {
      // Look up profile grade
      const { data: prof } = await supabase
        .from("profiles")
        .select("grade")
        .eq("id", safeUserId)
        .maybeSingle();
      studentGrade = prof?.grade ? Math.min(Math.max(prof.grade, 7), 12) : 10;
    }

    const learningContext: StudentLearningContext = {
      grade: studentGrade,
      subjectSlug: data.subjectSlug || "physics",
      stream: data.stream || "all",
      lessonId: data.lessonId,
      language: data.language || "km",
    };

    // 6. RAG PIPELINE: Execute Hybrid Retrieval across MoEYS Knowledge Base
    const retrieved = await retrieveCurriculumKnowledge(
      data.userMessage,
      learningContext,
      4
    );

    // 7. RAG PIPELINE: Generate Grounded Educational Explanation
    const ragResult = await generateEducationalTutorResponse({
      query: data.userMessage,
      attemptedAnswer: data.attemptedAnswer,
      mode,
      context: learningContext,
      retrieved,
    });

    // 8. Persist assistant reply with embedded sources metadata
    let storedContent = ragResult.reply;
    if (ragResult.sources.length > 0) {
      storedContent += `\n\n<!-- SOURCES_JSON: ${JSON.stringify(ragResult.sources)} -->`;
    }

    await supabase.from("ai_messages").insert({
      conversation_id: safeConvId,
      role: "assistant",
      content: storedContent,
    });

    // 9. Update conversation title and timestamp
    const cleanTitle = data.userMessage.slice(0, 45).replace(/\n/g, " ");
    await supabase
      .from("ai_conversations")
      .update({
        title: cleanTitle,
        updated_at: new Date().toISOString(),
      })
      .eq("id", safeConvId);

    return {
      ...ragResult,
      conversationId: safeConvId,
    };
  });

/**
 * Student Feedback Submission Function (Helpful / Not Helpful)
 */
export const submitTutorFeedback = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { messageId: string; isHelpful: boolean; comment?: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    try {
      await (supabase as any).from("ai_tutor_feedback").insert({
        message_id: data.messageId,
        user_id: userId,
        is_helpful: data.isHelpful,
        feedback_comment: data.comment,
      });
      return { success: true };
    } catch {
      // Graceful fallback
      return { success: true };
    }
  });
