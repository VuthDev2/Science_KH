// ==============================================================================
// ScienceKH — RAG AI STEM Tutor Conversation View (លោកគ្រូ វុឌ្ឍ - Kru Vuth)
// Curriculum-Aware Socratic AI Assistant with KaTeX & Verified MoEYS Citations
// ==============================================================================

import { createFileRoute, useNavigate, getRouteApi, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Send,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  HelpCircle,
  X,
  ChevronDown,
  FileQuestion,
  Lightbulb,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { askTutor, submitTutorFeedback } from "@/lib/ai-tutor.functions";
import { useProfile } from "@/lib/use-profile";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { toast } from "sonner";
import { SourceCitationCard } from "@/components/features/tutor/source-citation-card";
import type {
  SourceCitation,
  TutorPedagogicalMode,
} from "@/types/rag-tutor";
import { PEDAGOGICAL_MODE_LABELS } from "@/types/rag-tutor";

const chatSearchSchema = z.object({
  initialPrompt: z.string().optional(),
  mode: z.string().optional(),
  subject: z.string().optional(),
  grade: z.coerce.number().optional(),
});

export const Route = createFileRoute("/_authenticated/tutor/$conversationId")({
  validateSearch: (search) => chatSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Kru Vuth AI Tutor — ScienceKH" }] }),
  component: ChatPage,
});

const routeApi = getRouteApi("/_authenticated/tutor/$conversationId");

type Msg = {
  id: string;
  role: string;
  content: string;
  sources?: SourceCitation[];
};

const TUTOR_SUBJECTS = [
  { slug: "mathematics", nameKm: "គណិតវិទ្យា", nameEn: "Math" },
  { slug: "physics", nameKm: "រូបវិទ្យា", nameEn: "Physics" },
  { slug: "chemistry", nameKm: "គីមីវិទ្យា", nameEn: "Chemistry" },
  { slug: "biology", nameKm: "ជីវវិទ្យា", nameEn: "Biology" },
  { slug: "khmer", nameKm: "អក្សរសាស្ត្រខ្មែរ", nameEn: "Khmer" },
  { slug: "history", nameKm: "ប្រវត្តិវិទ្យា", nameEn: "History" },
  { slug: "ict", nameKm: "ព័ត៌មានវិទ្យា", nameEn: "ICT" },
  { slug: "earth", nameKm: "ផែនដីវិទ្យា", nameEn: "Earth Science" },
];

function formatMathDelimiters(content: string): string {
  let res = content;

  // 1. Convert standard LaTeX block \[ ... \] to $$ ... $$
  res = res.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, "\n\n$$$$1$$\n\n");

  // 2. Convert standard LaTeX inline \( ... \) to $ ... $
  res = res.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, "$$$1$");

  // 3. Convert accidental code backticks containing LaTeX into math $ ... $
  res = res.replace(/`([^`\n]*\\[a-zA-Z]+[^`\n]*)`/g, "$$$1$");

  // 4. Wrap expressions in parentheses containing LaTeX: e.g. (\Delta = b^2 - 4ac)
  res = res.replace(/(?<!\$)\(([a-zA-Z\\][^\n)]*?\\[a-zA-Z]+[^\n)]*?)\)(?!\$)/g, "($$$1$)");

  // 5. Wrap lines with full LaTeX relations: e.g. \Delta = b^2 - 4ac or \Delta > 0 \implies x_{1,2} = \frac{...}{...}
  res = res.replace(/(?<!\$|\`|\w)(\\[a-zA-Z]+(?:[^\n\r$]*?(?:=|<|>|\\implies)[^\n\r$]*?))(?=(?:\s*[\u1780-\u17FF]|\s*$|\n|\r))(?!\$|\`)/g, "$$$1$");

  // 6. Wrap variable = \frac{...}{...} or variable = \sqrt{...}
  res = res.replace(/(?<!\$|\`|\w)([a-zA-Z0-9_{},]+\s*=\s*(?:[^\n\r$]*?\\[a-zA-Z]+[^\n\r$]*?))(?=(?:\s*[\u1780-\u17FF]|\s*$|\n|\r))(?!\$|\`)/g, "$$$1$");

  return res;
}

function parseMessageContent(raw: string): { text: string; sources: SourceCitation[] } {
  let cleanText = raw;
  let sources: SourceCitation[] = [];

  const match = raw.match(/<!-- SOURCES_JSON: (.*?) -->/);
  if (match) {
    try {
      sources = JSON.parse(match[1]);
      cleanText = raw.replace(/<!-- SOURCES_JSON: (.*?) -->/, "").trim();
    } catch {
      // Fallback
    }
  }

  cleanText = formatMathDelimiters(cleanText);
  return { text: cleanText, sources };
}

function ChatPage() {
  const { conversationId } = routeApi.useParams();
  const search = routeApi.useSearch();
  const { lang, data: profile } = useProfile();
  const isKhmer = lang === "km";
  const qc = useQueryClient();
  const navigate = useNavigate();
  const ask = useServerFn(askTutor);
  const feedbackFn = useServerFn(submitTutorFeedback);

  // Learning Context State
  const studentGrade = search.grade || (profile?.grade ? Math.min(Math.max(profile.grade, 7), 12) : 10);
  const [activeGrade, setActiveGrade] = useState<number>(studentGrade);
  const [activeSubject, setActiveSubject] = useState<string>(search.subject || "physics");
  const [activeMode, setActiveMode] = useState<TutorPedagogicalMode>(
    (search.mode as TutorPedagogicalMode) || "ask_sciencekh"
  );

  // Inputs
  const [input, setInput] = useState("");
  const [attemptedAnswer, setAttemptedAnswer] = useState("");
  const [isExplainMyAnswerOpen, setIsExplainMyAnswerOpen] = useState(
    search.mode === "explain_my_answer"
  );

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const initialSentRef = useRef(false);

  const isNew = conversationId === "new";

  // Fetch conversation header
  const { data: conv } = useQuery({
    queryKey: ["conversation", conversationId],
    enabled: !isNew,
    queryFn: async () => {
      const { data } = await supabase
        .from("ai_conversations")
        .select("id, title")
        .eq("id", conversationId)
        .maybeSingle();
      return data;
    },
  });

  // Fetch message history
  const { data: rawMessages } = useQuery({
    queryKey: ["messages", conversationId],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_messages")
        .select("id, role, content")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data || []) as Msg[];
    },
    refetchOnWindowFocus: false,
  });

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [rawMessages]);

  // Mutation to send RAG query
  const send = useMutation({
    mutationFn: async (payload: { userMessage: string; attemptedAnswer?: string }) => {
      return ask({
        data: {
          conversationId,
          userMessage: payload.userMessage,
          attemptedAnswer: payload.attemptedAnswer,
          language: lang,
          mode: activeMode,
          grade: activeGrade,
          subjectSlug: activeSubject,
        },
      });
    },
    onSuccess: (res) => {
      if (res?.conversationId && res.conversationId !== conversationId) {
        navigate({
          to: "/tutor/$conversationId",
          params: { conversationId: res.conversationId },
          search: { mode: activeMode, grade: activeGrade, subject: activeSubject },
          replace: true,
        });
      }
      qc.invalidateQueries({ queryKey: ["messages", res?.conversationId || conversationId] });
      qc.invalidateQueries({ queryKey: ["conversation", res?.conversationId || conversationId] });
      qc.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not send message"),
  });

  function handleSend(customText?: string, customAttempt?: string) {
    const txt = (customText ?? input).trim();
    if (!txt || send.isPending) return;

    sounds.playPop();
    triggerHapticSelection();

    if (!customText) {
      setInput("");
      setAttemptedAnswer("");
      setIsExplainMyAnswerOpen(false);
    }

    // Optimistic UI update
    let optContent = txt;
    if (activeMode === "explain_my_answer" && (customAttempt || attemptedAnswer)) {
      optContent = `**សំណួរ / Problem:** ${txt}\n\n**ចម្លើយរបស់ខ្ញុំ / My Attempt:** ${customAttempt || attemptedAnswer}`;
    }

    qc.setQueryData<Msg[]>(["messages", conversationId], (old) => [
      ...(old ?? []),
      { id: `tmp-${Date.now()}`, role: "user", content: optContent },
    ]);

    send.mutate({
      userMessage: txt,
      attemptedAnswer: customAttempt || (activeMode === "explain_my_answer" ? attemptedAnswer : undefined),
    });
  }

  // Handle Initial Prompt Auto-Dispatch (runs once on mount)
  useEffect(() => {
    if (search.initialPrompt && !initialSentRef.current) {
      initialSentRef.current = true;
      const promptToDispatch = search.initialPrompt;
      // Immediately clear initialPrompt from URL search params so it cannot re-trigger
      navigate({
        to: "/tutor/$conversationId",
        params: { conversationId },
        search: {
          mode: search.mode,
          grade: search.grade,
          subject: search.subject,
        },
        replace: true,
      });
      handleSend(promptToDispatch);
    }
  }, []);

  // Copy Message Handler
  const handleCopyMessage = (id: string, text: string) => {
    sounds.playPop();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(isKhmer ? "បានចម្លងទៅ Clipboard!" : "Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Submit Feedback Handler
  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    sounds.playPop();
    triggerHapticSelection();
    setFeedbackGiven((prev) => ({ ...prev, [messageId]: true }));
    feedbackFn({ data: { messageId, isHelpful } });
    toast.success(
      isHelpful
        ? isKhmer ? "សូមអរគុណចំពោះមតិកែលម្អ! 👍" : "Thank you for the positive feedback!"
        : isKhmer ? "បានកត់ត្រាមតិ។ លោកគ្រូនឹងកែលម្អបន្ថែម! ✍️" : "Feedback recorded. We will improve!"
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* 1. TOP BAR: Back button, Avatar, Title, Status & Grade/Subject Selector (Guaranteed Safe Area Clearance) */}
      <header
        className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 z-20 shadow-2xs"
        style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
      >
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <Link
              to="/tutor"
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-black text-xs shadow-2xs">
                👨‍🏫
              </div>
              <div className="truncate max-w-[200px] sm:max-w-xs">
                <h1 className="font-display text-sm font-black text-slate-900 dark:text-white leading-tight truncate">
                  {conv?.title ?? (isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth")}
                </h1>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isKhmer ? "គ្រូជំនួយ MoEYS STEM" : "MoEYS AI STEM Tutor"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Grade & Subject Selector Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 px-4 py-2 bg-slate-50/90 dark:bg-slate-900/90">
          <div className="mx-auto flex max-w-2xl items-center justify-between text-xs gap-2">
            {/* Grade Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">{isKhmer ? "ថ្នាក់ទី៖" : "Grade:"}</span>
              <select
                value={activeGrade}
                onChange={(e) => setActiveGrade(Number(e.target.value))}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden text-xs"
              >
                {[7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {isKhmer ? `ថ្នាក់ទី ${g}` : `Grade ${g}`} {g >= 10 ? "(វិទ្យាល័យ)" : "(អនុវិទ្យាល័យ)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">{isKhmer ? "មុខវិជ្ជា៖" : "Subject:"}</span>
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden text-xs"
              >
                {TUTOR_SUBJECTS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {isKhmer ? s.nameKm : s.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CHAT SCROLL STREAM (The single dedicated scroll container) */}
      <div
        ref={scrollRef}
        className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4"
      >
        {/* Welcome Starter State if no messages yet */}
        {(!rawMessages || rawMessages.length === 0) && (
          <div className="py-6 text-center space-y-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 mx-auto">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {isKhmer ? "លោកគ្រូ វុឌ្ឍ — គ្រូជំនួយ AI តាមកម្មវិធីសិក្សា MoEYS" : "Kru Vuth — MoEYS AI STEM Tutor"}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {isKhmer
                  ? `ឆ្លើយសំណួរផ្អែកលើសៀវភៅពុម្ព MoEYS ថ្នាក់ទី ${activeGrade}។ ជ្រើសរើសរបៀបសិក្សា ឬចុចសំណួរគំរូខាងក្រោម៖`
                  : `Answers grounded in Grade ${activeGrade} MoEYS textbooks. Choose a mode or tap a sample question below:`}
              </p>
            </div>

            {/* Quick Starter Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
              {[
                {
                  km: "⚡ រូបវិទ្យា៖ ពន្យល់រូបមន្តល្បឿនមធ្យម v = s / t និងខ្នាត SI",
                  en: "⚡ Physics: Explain average speed formula v = s / t and SI units",
                  mode: "ask_sciencekh",
                },
                {
                  km: "🔍 គណិតវិទ្យា៖ ខ្ញុំគណនា 2x + 4 = 10 ឃើញ x = 5 តើខុសត្រង់ណា?",
                  en: "🔍 Math: I solved 2x + 4 = 10 and got x = 5. Where is my mistake?",
                  mode: "explain_my_answer",
                },
                {
                  km: "🧪 គីមីវិទ្យា៖ សុំគន្លឹះរកចំនួនម៉ូល n = m / M",
                  en: "🧪 Chemistry: Give me a hint on mole calculation n = m / M",
                  mode: "give_hint",
                },
                {
                  km: "📐 គណិតវិទ្យា៖ បង្ហាញលំហាត់គំរូទ្រឹស្តីបទពីតាករ a² + b² = c²",
                  en: "📐 Math: Show me a worked example of Pythagorean theorem",
                  mode: "show_example",
                },
              ].map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveMode(q.mode as TutorPedagogicalMode);
                    handleSend(isKhmer ? q.km : q.en);
                  }}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-left transition shadow-2xs"
                >
                  {isKhmer ? q.km : q.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        <ul className="space-y-4">
          {(rawMessages ?? []).map((m) => {
            const isUser = m.role === "user";
            const parsed = parseMessageContent(m.content);

            return (
              <li key={m.id} className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[88%] sm:max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs transition-all",
                    isUser
                      ? "bg-slate-900 text-white dark:bg-emerald-600 dark:text-white rounded-br-xs"
                      : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs"
                  )}
                >
                  {/* Tutor Avatar Header */}
                  {!isUser && (
                    <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isKhmer ? "លោកគ្រូ វុឌ្ឍ (Kru Vuth)" : "Kru Vuth (MoEYS AI Tutor)"}</span>
                    </div>
                  )}

                  {/* Render Markdown with KaTeX support */}
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-headings:font-display prose-headings:my-2 overflow-x-auto no-scrollbar font-suwannaphum">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {parsed.text}
                    </ReactMarkdown>
                  </div>

                  {/* Transparent Verified Source Citations Accordion */}
                  {!isUser && parsed.sources.length > 0 && (
                    <SourceCitationCard sources={parsed.sources} isKhmer={isKhmer} />
                  )}

                  {/* Message Action Bar (Copy & Helpful / Not Helpful) */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(m.id, parsed.text)}
                        className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600">{isKhmer ? "បានចម្លង" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>{isKhmer ? "ចម្លង" : "Copy"}</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">{isKhmer ? "តើការពន្យល់នេះមានប្រយោជន៍ទេ?" : "Helpful?"}</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, true)}
                          disabled={feedbackGiven[m.id]}
                          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 transition disabled:opacity-40"
                          title="មានប្រយោជន៍"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, false)}
                          disabled={feedbackGiven[m.id]}
                          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500 transition disabled:opacity-40"
                          title="ត្រូវការកែលម្អ"
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}

          {/* Typing Loading Indicator (only show when actively waiting for assistant response) */}
          {send.isPending && (!rawMessages || rawMessages.length === 0 || rawMessages[rawMessages.length - 1]?.role === "user") && (
            <li className="flex justify-start">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-2xs flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                <span>{isKhmer ? "លោកគ្រូកំពុងទាញយកឯកសារ MoEYS និងរៀបចំការពន្យល់..." : "Kru Vuth is retrieving MoEYS documents..."}</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* 3. BOTTOM CONTROL DOCK & PEDAGOGICAL MODES (Pinned cleanly at flex bottom) */}
      <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] z-20">
        <div className="mx-auto w-full max-w-2xl px-4 pt-2.5 space-y-2">
          {/* Pedagogical Mode Switcher Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(Object.keys(PEDAGOGICAL_MODE_LABELS) as TutorPedagogicalMode[]).map((modeKey) => {
              const modeMeta = PEDAGOGICAL_MODE_LABELS[modeKey];
              const isSelected = activeMode === modeKey;

              return (
                <button
                  key={modeKey}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    triggerHapticSelection();
                    setActiveMode(modeKey);
                    setIsExplainMyAnswerOpen(modeKey === "explain_my_answer");
                  }}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 border active:scale-95",
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200/70"
                  )}
                >
                  <span>{modeMeta.icon}</span>
                  <span>{isKhmer ? modeMeta.labelKm : modeMeta.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* DEDICATED "EXPLAIN MY ANSWER" TWO-FIELD FORM */}
          {activeMode === "explain_my_answer" && isExplainMyAnswerOpen && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <FileQuestion className="h-3.5 w-3.5" />
                  <span>{isKhmer ? "បញ្ចូលសំណួរ និងចម្លើយដែលអ្នកបានសាកល្បងធ្វើ" : "Enter Question & Attempted Answer"}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsExplainMyAnswerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">
                  {isKhmer ? "១. ប្រធានលំហាត់ ឬសំណួរដើម៖" : "1. Problem statement or question:"}
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isKhmer ? "ឧ. រកចម្ងាយចរ បើ v = 60 km/h និង t = 3 h..." : "e.g. Find distance if v = 60 km/h and t = 3 h..."}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">
                  {isKhmer ? "២. ចម្លើយដែលប្អូនបានគិត ឬធ្វើបាន៖" : "2. Your attempted solution or steps:"}
                </label>
                <textarea
                  value={attemptedAnswer}
                  onChange={(e) => setAttemptedAnswer(e.target.value)}
                  placeholder={isKhmer ? "ឧ. ខ្ញុំយក 60 ចែកនឹង 3 ឃើញ 20 km តែសៀវភៅដាក់ 180 km..." : "e.g. I did 60 / 3 = 20, but the book says 180..."}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || !attemptedAnswer.trim() || send.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  {isKhmer ? "វិភាគចម្លើយ" : "Analyze My Answer"}
                </Button>
              </div>
            </div>
          )}

          {/* STANDARD CHAT INPUT FORM */}
          {(!isExplainMyAnswerOpen || activeMode !== "explain_my_answer") && (
            <form
              className="flex items-center gap-2 pb-1"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeMode === "give_hint"
                    ? isKhmer ? "សុំគន្លឹះលើលំហាត់ណាដែរ?..." : "Ask for a hint on..."
                    : activeMode === "show_example"
                    ? isKhmer ? "ចង់ឃើញឧទាហរណ៍លើរូបមន្តណា?..." : "Show example for..."
                    : isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ អំពីមេរៀន MoEYS..." : "Ask Kru Vuth about MoEYS curriculum..."
                }
                className="h-11 flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 text-xs sm:text-sm outline-hidden focus:border-emerald-500 shadow-2xs"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                disabled={!input.trim() || send.isPending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
