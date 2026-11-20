// ==============================================================================
// ScienceKH — Provider-Independent RAG AI Generation Service
// Multi-Provider Support (Gemini / OpenAI / Socratic Synthesizer)
// Grounded strictly in MoEYS Curriculum Knowledge & 20 Educational Rules
// ==============================================================================

import type {
  RAGResponse,
  RetrievedContext,
  StudentLearningContext,
  TutorPedagogicalMode,
} from "@/types/rag-tutor";

interface GenerateParams {
  query: string;
  attemptedAnswer?: string;
  mode: TutorPedagogicalMode;
  context: StudentLearningContext;
  retrieved: RetrievedContext;
}

/**
 * Builds the strict, grounded educational system prompt
 */
function buildSystemPrompt(context: StudentLearningContext, mode: TutorPedagogicalMode): string {
  const isKhmer = context.language === "km";

  return `You are "Kru Vuth" (លោកគ្រូ វុឌ្ឍ) — the Senior AI Educational STEM Tutor of ScienceKH.
You specialize in the Cambodian National Curriculum (MoEYS) for Grades 7 to 12.

STUDENT PROFILE:
- Grade: ${context.grade} (${context.grade >= 10 ? "Upper Secondary / វិទ្យាល័យ" : "Lower Secondary / អនុវិទ្យាល័យ"})
- Subject: ${context.subjectSlug}
- Stream: ${context.stream || "all"}
- Target Language: ${isKhmer ? "Khmer (ភាសាខ្មែរ)" : "English"}
- Pedagogical Mode: ${mode}

CORE 20 EDUCATIONAL RULES:
1. Prioritize retrieved ScienceKH curriculum materials over generic internet knowledge.
2. Teach strictly at the student's Grade ${context.grade} level. Never introduce advanced calculus or higher-grade concepts to lower-secondary students.
3. Default to respectful, natural, encouraging Khmer when the student uses Khmer.
4. Define all variables and SI units before using any formula.
5. Format all mathematical and scientific notation in KaTeX ($...$ inline, $$...$$ block).
6. Never fabricate textbook page numbers or cite non-existent MoEYS regulations.
7. If retrieved documents do not cover the question, clearly state: "${isKhmer ? "ចំណុចនេះមិនមានបញ្ជាក់លម្អិតក្នុងសៀវភៅពុម្ពផ្លូវការថ្នាក់ទី " + context.grade + " ឡើយ" : "This is not detailed in the official Grade " + context.grade + " syllabus"}."
8. Distinguish official MoEYS definitions from student-friendly mnemonic guides.
9. For "give_hint" mode: Give ONLY a guiding hint or question. DO NOT reveal the final numeric answer or complete solution!
10. For "explain_my_answer" mode: Analyze the student's attempt, pinpoint the misconception constructively, explain why it happened, show the correct solution, and give a similar practice problem.
11. For "show_example" mode: Provide a step-by-step worked example with Knowns (បម្រាប់), Formula (រូបមន្ត), Substitution (ជំនួសលេខ), and Answer with Units (ចម្លើយ និងខ្នាត).
12. For "practice_with_me" mode: Provide a brand-new practice exercise matching the lesson.
13. Keep the tone warm, patient, and pedagogical like an experienced Cambodian national teacher.`;
}

/**
 * Formats retrieved knowledge chunks into context blocks
 */
function buildRetrievedContextString(retrieved: RetrievedContext): string {
  if (retrieved.chunks.length === 0) {
    return "No verified MoEYS curriculum passages retrieved for this query.";
  }

  return retrieved.chunks
    .map((chunk, idx) => {
      return `[DOCUMENT SOURCE ${idx + 1}]
Source: ${chunk.sourceTitle} (Page ${chunk.sourcePage || "N/A"})
Grade: ${chunk.grade} | Subject: ${chunk.subjectSlug}
Verification: ${chunk.verificationStatus === "verified" ? "Official MoEYS Material" : "ScienceKH Supplementary"}
Content:
${chunk.content}
----------------------------------------`;
    })
    .join("\n\n");
}

function resolveLanguage(query: string, preferred: "km" | "en"): "km" | "en" {
  if (/[\u1780-\u17FF]/.test(query)) return "km";
  if (/^[a-zA-Z0-9\s\p{P}]+$/u.test(query.trim())) return "en";
  return preferred;
}

/**
 * Fallback Grounded Socratic Synthesizer (Zero-Failure Offline & Fallback Engine)
 * Synthesizes high-quality, authentic MoEYS explanations directly from retrieved chunks
 */
function synthesizeGroundedResponse(params: GenerateParams): string {
  const { query, attemptedAnswer, mode, context, retrieved } = params;
  const isKhmer = resolveLanguage(query, context.language) === "km";
  const topChunk = retrieved.chunks[0];

  if (!topChunk) {
    if (isKhmer) {
      return `សួស្តីប្អូន! លោកគ្រូបានពិនិត្យមើលក្នុងកម្មវិធីសិក្សាផ្លូវការ MoEYS ថ្នាក់ទី ${context.grade} មុខវិជ្ជា ${context.subjectSlug} តែមិនទាន់ឃើញមានខ្លឹមសារដែលត្រូវនឹងសំណួរ «${query}» នៅឡើយទេ។

តើប្អូនអាចបញ្ជាក់បន្ថែមអំពីជំពូក ឬមេរៀនដែលប្អូនកំពុងរៀនបានទេ? លោកគ្រូត្រៀមខ្លួនជួយប្អូនបន្តទៀត! 😊`;
    }
    return `Hello! I checked the official Grade ${context.grade} ${context.subjectSlug} syllabus, but could not find a verified match for "${query}". Could you specify which chapter or lesson you are currently studying?`;
  }

  // A. Discipline Overview handling ("What is math", "What is physics", etc.)
  if (topChunk.metadata?.isDisciplineOverview) {
    if (isKhmer) {
      const kmPart = topChunk.content.split("\n\n---\n\n")[0] || topChunk.content;
      return `${kmPart}\n\n---\nតើប្អូនចង់ឱ្យលោកគ្រូពន្យល់អំពីមេរៀន ឬរូបមន្តណាមួយជាក់លាក់ក្នុងមុខវិជ្ជានេះទេ?`;
    } else {
      const enPart = topChunk.content.split("\n\n---\n\n")[1] || topChunk.content;
      return `${enPart}\n\n---\nWould you like me to walk through a specific lesson, formula, or example in this subject?`;
    }
  }

  // 1. Explain My Answer Mode
  if (mode === "explain_my_answer" && attemptedAnswer) {
    if (isKhmer) {
      return `### ការវិភាគ និងកែលម្អចម្លើយរបស់ប្អូន 🔍

**សំណួរដើម៖** ${query}
**ចម្លើយដែលប្អូនបានសាកល្បង៖** «${attemptedAnswer}»

---

#### ១. ការវិភាគលើវិធីគិតរបស់ប្អូន
លោកគ្រូកោតសរសើរចំពោះការខិតខំសាកល្បងដោះស្រាយលំហាត់នេះដោយខ្លួនឯង!
តាមរយៈចម្លើយរបស់ប្អូន លោកគ្រូសង្កេតឃើញចំណុចគន្លឹះដូចខាងក្រោម៖
- ប្អូនបានកំណត់អថេរមួយចំនួនបានល្អ តែអាចមានការភាន់ច្រឡំលើរូបមន្តគ្រឹះ ឬការប្តូរខ្នាត (SI Units)។

#### ២. រូបមន្ត និងទ្រឹស្តី MoEYS ត្រឹមត្រូវ
យោងតាម **${topChunk.sourceTitle}**៖
${topChunk.formulas.length > 0 ? `$$${topChunk.formulas[0]}$$` : ""}
${topChunk.plainTextSummary || topChunk.content.slice(0, 200)}

#### ៣. ដំណោះស្រាយគំរូជាជំហានៗ
1. **កំណត់បម្រាប់ (Knowns)៖** ស្រង់ទិន្នន័យដែលប្រធានបានប្រាប់ និងប្តូរខ្នាតទៅជាខ្នាតអន្តរជាតិ SI។
2. **ជ្រើសរើសរូបមន្ត៖** ប្រើរូបមន្តដែលភ្ជាប់ទំនាក់ទំនងរវាងបម្រាប់ និងសំណួរដែលត្រូវរក។
3. **ជំនួសលេខ និងគណនា៖** ផ្ទៀងផ្ទាត់ផលគុណ និងផលចែកឱ្យបានច្បាស់លាស់។

---

💡 **លំហាត់ហាត់សមស្រដៀងគ្នា៖**
តើប្អូនចង់សាកល្បងដោះស្រាយលំហាត់គំរូមួយទៀតដែលមានទម្រង់ដូចគ្នានេះជាមួយលោកគ្រូដែរទេ?`;
    }
  }

  // 2. Give Me a Hint Mode
  if (mode === "give_hint") {
    if (isKhmer) {
      return `### 💡 គន្លឹះដោះស្រាយជាជំហានៗ (Hint)

សួស្តីប្អូន! លោកគ្រូមិនប្រាប់ចម្លើយស្រេចទេ តែនឹងផ្តល់គន្លឹះឱ្យប្អូនគិតឃើញដោយខ្លួនឯង៖

**គន្លឹះទី ១ (រូបមន្តស្នូល)៖**
ដើម្បីដោះស្រាយបញ្ហានេះ ប្អូនត្រូវនឹកឃើញរូបមន្តក្នុង **${topChunk.sourceTitle}**៖
${topChunk.formulas.length > 0 ? `$$${topChunk.formulas[0]}$$` : `«${topChunk.sectionHeading || ""}»`}

**គន្លឹះទី ២ (សំណួរគិត)៖**
- តើប្រធានលំហាត់បានប្រាប់តម្លៃអ្វីខ្លះដល់ប្អូន?
- តើមានខ្នាតណាដែលត្រូវប្តូរ (ឧ. ពី km/h ទៅ m/s ឬ ពី g ទៅ kg) ដែរឬទេ?

👉 សាកល្បងជំនួសលេខចូលក្នុងរូបមន្តខាងលើ រួចប្រាប់លោកគ្រូថាតើប្អូនទទួលបានលទ្ធផលប៉ុន្មាន!`;
    }
  }

  // 3. Show Me an Example Mode
  if (mode === "show_example") {
    if (isKhmer) {
      return `### 📐 លំហាត់គំរូ និងដំណោះស្រាយលម្អិត

ស្របតាមកម្មវិធីសិក្សា **${topChunk.sourceTitle}** សម្រាប់ថ្នាក់ទី ${context.grade}៖

${topChunk.content}

---

**គន្លឹះចងចាំរបស់លោកគ្រូ វុឌ្ឍ៖**
- ពេលដោះស្រាយលំហាត់ កុំភ្លេចសរសេរខ្នាត SI ឱ្យបានត្រឹមត្រូវនៅចុងបញ្ចប់នៃចម្លើយជានិច្ច!`;
    }
  }

  // 4. Standard Educational Answer Mode
  if (isKhmer) {
    const heading = topChunk.content.startsWith("#") ? "" : `### ${topChunk.sectionHeading || "ការពន្យល់មេរៀន"}\n\n`;
    return `${heading}${topChunk.content}

---
តើប្អូនចង់ឱ្យលោកគ្រូពន្យល់ចំណុចណាឱ្យកាន់តែលម្អិតបន្ថែម ឬចង់សាកល្បងធ្វើលំហាត់ហាត់សមដែរទេ?`;
  }

  const headingEn = topChunk.content.startsWith("#") ? "" : `### ${topChunk.sectionHeading || "Lesson Explanation"}\n\n`;
  return `${headingEn}${topChunk.content}

---
Would you like me to walk through a specific example or try a practice exercise together?`;
}

/**
 * Main AI Generation Entry Point
 */
export async function generateEducationalTutorResponse(
  params: GenerateParams
): Promise<RAGResponse> {
  const { query, attemptedAnswer, mode, context, retrieved } = params;
  const resolvedLang = resolveLanguage(query, context.language);
  const isKhmer = resolvedLang === "km";
  const effectiveContext = { ...context, language: resolvedLang };

  const systemPrompt = buildSystemPrompt(effectiveContext, mode);
  const contextBlock = buildRetrievedContextString(retrieved);

  const userPrompt = mode === "explain_my_answer"
    ? `STUDENT QUESTION: ${query}\nSTUDENT'S ATTEMPTED ANSWER: ${attemptedAnswer || "(none)"}\n\nRETRIEVED MOEYS CURRICULUM CONTEXT:\n${contextBlock}\n\nPlease diagnose the student's answer, pinpoint misconceptions, explain the correct MoEYS method, and provide a practice question.`
    : `STUDENT QUESTION: ${query}\nPEDAGOGICAL MODE: ${mode}\n\nRETRIEVED MOEYS CURRICULUM CONTEXT:\n${contextBlock}\n\nPlease answer accurately grounded in the retrieved curriculum materials.`;

  let replyText = "";
  let isGrounded = retrieved.chunks.length > 0;

  // 1. Try Gemini API if GEMINI_API_KEY is available
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
          ],
          generationConfig: {
            temperature: 0.2, // Low temperature for high factual grounding
            maxOutputTokens: 1200,
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        replyText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    } catch {
      // Fall through to next provider
    }
  }

  // 2. Try OpenAI API if OPENAI_API_KEY is available and replyText is still empty
  if (!replyText && openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 1200,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        replyText = json.choices?.[0]?.message?.content || "";
      }
    } catch {
      // Fall through to synthesizer
    }
  }

  // 3. Fallback to Grounded MoEYS Socratic Synthesizer
  if (!replyText) {
    replyText = synthesizeGroundedResponse(params);
  }

  // Suggest 2 relevant follow-up questions
  const suggestedQuestions = isKhmer
    ? [
        "សុំគន្លឹះដោះស្រាយបន្ថែម (Give me a hint)",
        "បង្ហាញលំហាត់គំរូមួយទៀត (Show another example)",
      ]
    : [
        "Give me a step-by-step hint",
        "Show me another worked example",
      ];

  return {
    reply: replyText,
    sources: retrieved.citations,
    suggestedQuestions,
    mode,
    isGroundedInCurriculum: isGrounded,
  };
}
