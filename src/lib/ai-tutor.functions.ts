import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const askTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { conversationId: string; userMessage: string; language: "en" | "km" }) => input,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const apiKey = process.env.OPENAI_API_KEY || process.env.LOVABLE_API_KEY;

    // Verify the conversation belongs to this user
    const { data: conv, error: convErr } = await supabase
      .from("ai_conversations")
      .select("id, title")
      .eq("id", data.conversationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (convErr || !conv) throw new Error("Conversation not found.");

    // Insert the user message
    const { error: insErr } = await supabase.from("ai_messages").insert({
      conversation_id: conv.id,
      role: "user",
      content: data.userMessage,
    });
    if (insErr) throw insErr;

    // Load history
    const { data: history } = await supabase
      .from("ai_messages")
      .select("role, content")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: true });

    const systemPrompt =
      data.language === "km"
        ? "អ្នកគឺជាគ្រូបង្រៀនវិទ្យាសាស្ត្រដ៏ស្ងប់ស្ងាត់ និងគួរឱ្យយល់ច្បាស់ សម្រាប់សិស្សកម្ពុជាថ្នាក់ទី៧–១២។ ឆ្លើយជាភាសាខ្មែរ ដោយប្រើពាក្យសាមញ្ញ ឧទាហរណ៍ និងពន្យល់ជាជំហានៗ។ ប្រើ markdown សម្រាប់ហ្វូម៉ាត់។"
        : "You are ScienceKH, a calm and patient science tutor for Cambodian Grade 7–12 students. Explain step-by-step with simple language and real-world examples. Use markdown formatting. If the question is unrelated to science, gently redirect.";

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...((history ?? []) as ChatMessage[]),
    ];

    let reply = "";

    if (!apiKey) {
      reply =
        data.language === "km"
          ? `ខ្ញុំអាចជួយអ្នកស្វែងរកចម្លើយវិទ្យាសាស្ត្រ។ សូមសួរញ៉ាំមួយសំនួរ ឧ. \"ធាតុអ្វីខ្លះជួយផ្លាស់ប្តូរតង់ទំនិញ?\"`
          : `I can help you with science questions. Try asking something like, “What is the difference between mitosis and meiosis?”`;
    } else {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
        if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
        throw new Error(`AI gateway error: ${text}`);
      }

      const json = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      reply = json.choices?.[0]?.message?.content ?? "(no response)";
    }

    await supabase.from("ai_messages").insert({
      conversation_id: conv.id,
      role: "assistant",
      content: reply,
    });

    // Update conversation title from first user message if still default
    if (conv.title === "New chat") {
      await supabase
        .from("ai_conversations")
        .update({ title: data.userMessage.slice(0, 60) })
        .eq("id", conv.id);
    } else {
      await supabase
        .from("ai_conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conv.id);
    }

    return { reply };
  });
