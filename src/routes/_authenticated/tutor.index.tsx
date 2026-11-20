// ==============================================================================
// ScienceKH — AI STEM Tutor Hub (លោកគ្រូ វុឌ្ឍ - Kru Vuth)
// Ultra-Clean, Minimalist Socratic AI STEM Mentor for Cambodian Students
// Designed for instant clarity, zero clutter, and effortless student focus.
// ==============================================================================

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Clock,
  Trash2,
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { useSuper } from "@/lib/super-context";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { toast } from "sonner";
import type { TutorPedagogicalMode } from "@/types/rag-tutor";
import { PEDAGOGICAL_MODE_LABELS } from "@/types/rag-tutor";

type TutorSearchParams = {
  initialPrompt?: string;
};

export const Route = createFileRoute("/_authenticated/tutor/")({
  validateSearch: (s: Record<string, unknown>): TutorSearchParams => ({
    initialPrompt: typeof s.initialPrompt === "string" ? s.initialPrompt : undefined,
  }),
  head: () => ({ meta: [{ title: "STEM Tutor (លោកគ្រូ វុឌ្ឍ) — ScienceKH" }] }),
  component: TutorIndex,
});

// Curated 4 Quick Topics tailored by Grade Level
const GRADE_SUGGESTIONS = {
  g12: [
    {
      icon: "📐",
      labelKm: "អាំងតេក្រាលដោយផ្នែក",
      labelEn: "Integration by parts",
      promptKm: "សូមពន្យល់រូបមន្ត និងគន្លឹះដោះស្រាយអាំងតេក្រាលដោយផ្នែកក្នុងបាក់ឌុប",
      promptEn: "Explain integration by parts formula and exam strategies for Bac II",
    },
    {
      icon: "⚡",
      labelKm: "រលកមេកានិចបាក់ឌុប",
      labelEn: "Mechanical waves",
      promptKm: "តើអ្វីជាខួប និងប្រេកង់នៃរលកមេកានិច? សូមពន្យល់រូបមន្តគន្លឹះបាក់ឌុប",
      promptEn: "What are the period and frequency of mechanical waves? Explain key formulas",
    },
    {
      icon: "🧪",
      labelKm: "ប្រតិកម្មអេស្ទែរកម្ម",
      labelEn: "Esterification",
      promptKm: "សូមពន្យល់ពីប្រតិកម្មអេស្ទែរកម្ម និងលក្ខណៈសម្បត្តិនៃជាតិខ្លាញ់",
      promptEn: "Explain esterification reactions and chemical properties of lipids",
    },
    {
      icon: "🧬",
      labelKm: "ការចម្លងក្រម DNA",
      labelEn: "Transcription & DNA",
      promptKm: "តើ DNA និង RNA ខុសគ្នាយ៉ាងណា? សូមពន្យល់ដំណើរការចម្លងក្រម",
      promptEn: "How do DNA and RNA differ? Explain the process of genetic transcription",
    },
  ],
  g10_11: [
    {
      icon: "📐",
      labelKm: "សង់ក្រាបប៉ារ៉ាបូល",
      labelEn: "Parabola curve",
      promptKm: "របៀបរកចំណុចកំពូល និងសង់ក្រាបប៉ារ៉ាបូល y = ax² + bx + c",
      promptEn: "How to find the vertex and plot the parabola of y = ax² + bx + c",
    },
    {
      icon: "⚡",
      labelKm: "ច្បាប់ទី២ញូតុន F = m · a",
      labelEn: "Newton's 2nd Law",
      promptKm: "ពន្យល់ពីច្បាប់ទី២ញូតុន F = m · a និងចលនាត្រង់ប្រែប្រួលស្មើ",
      promptEn: "Explain Newton's Second Law F = m · a and accelerated linear motion",
    },
    {
      icon: "🧪",
      labelKm: "សម្ព័ន្ធកូវ៉ាឡង់ & អ៊ីយ៉ុង",
      labelEn: "Chemical bonding",
      promptKm: "តើសម្ព័ន្ធកូវ៉ាឡង់ និងសម្ព័ន្ធអ៊ីយ៉ុងខុសគ្នាយ៉ាងណាខ្លះ?",
      promptEn: "What is the difference between covalent and ionic bonds?",
    },
    {
      icon: "🧬",
      labelKm: "ដំណាក់កាលមីតូស",
      labelEn: "Mitosis phases",
      promptKm: "ពន្យល់ពីដំណាក់កាលទាំង៤ នៃការបែងចែកកោសិកាមីតូស (Mitosis)",
      promptEn: "Explain the 4 phases of mitosis cell division and its function",
    },
  ],
  g7_9: [
    {
      icon: "📐",
      labelKm: "ប្រព័ន្ធសមីការដឺក្រេទី១",
      labelEn: "Linear systems",
      promptKm: "របៀបដោះស្រាយប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអថេរ",
      promptEn: "How to solve systems of linear equations in 2 variables",
    },
    {
      icon: "⚡",
      labelKm: "ទម្ងន់ P = m · g",
      labelEn: "Mass vs Weight",
      promptKm: "រូបមន្តទម្ងន់ P = m · g និងភាពខុសគ្នារវាងម៉ាស និងទម្ងន់",
      promptEn: "Weight formula P = m · g and the key difference between mass and weight",
    },
    {
      icon: "🧪",
      labelKm: "ថ្លឹងសមីការគីមី",
      labelEn: "Balancing equations",
      promptKm: "របៀបថ្លឹងសមីការគីមីងាយៗ និងស្គាល់ធាតុអាស៊ីត បាស",
      promptEn: "How to balance simple chemical equations and identify acids and bases",
    },
    {
      icon: "🧬",
      labelKm: "សមាសធាតុកោសិកា",
      labelEn: "Cell structure",
      promptKm: "តើកោសិកាមានសមាសធាតុសំខាន់ៗអ្វីខ្លះ? ភាពខុសគ្នារវាងកោសិការុក្ខជាតិ និងសត្វ",
      promptEn: "What are the key components of a cell? Plant vs animal cells",
    },
  ],
};

function formatRelativeTime(dateStr: string, isKhmer: boolean): string {
  const d = new Date(dateStr);
  const diffMs = Date.now() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return isKhmer ? "ទើបតែឥឡូវនេះ" : "Just now";
  if (diffMins < 60) return isKhmer ? `${diffMins} នាទីមុន` : `${diffMins}m ago`;
  if (diffHours < 24) return isKhmer ? `${diffHours} ម៉ោងមុន` : `${diffHours}h ago`;
  if (diffDays === 1) return isKhmer ? "ម្សិលមិញ" : "Yesterday";
  if (diffDays < 7) return isKhmer ? `${diffDays} ថ្ងៃមុន` : `${diffDays}d ago`;

  return d.toLocaleDateString(isKhmer ? "km-KH" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

function TutorIndex() {
  const { user } = useAuth();
  const { lang, data: profile } = useProfile();
  const { isSuper, openPaywall } = useSuper();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isKhmer = lang === "km";

  const [questionInput, setQuestionInput] = useState(search.initialPrompt || "");

  // Update input if search param changes
  useEffect(() => {
    if (search.initialPrompt) {
      setQuestionInput(search.initialPrompt);
    }
  }, [search.initialPrompt]);

  // Student grade tier calculation
  const studentGrade = profile?.grade ?? 10;
  const gradeTier: "g12" | "g10_11" | "g7_9" =
    studentGrade >= 12 ? "g12" : studentGrade >= 10 ? "g10_11" : "g7_9";

  const suggestions = useMemo(() => GRADE_SUGGESTIONS[gradeTier], [gradeTier]);

  // Fetch recent conversations
  const { data: conversations, isLoading: isConversationsLoading } = useQuery({
    queryKey: ["conversations", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_conversations")
        .select("id, title, updated_at")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Create new conversation mutation
  const create = useMutation({
    mutationFn: async ({
      title,
      initialPrompt,
      mode,
    }: {
      title: string;
      initialPrompt?: string;
      mode?: TutorPedagogicalMode;
    }) => {
      if (!user) throw new Error("Please log in first");
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert({ user_id: user.id, title })
        .select("id")
        .single();
      if (error) throw error;
      return { id: data.id, initialPrompt, mode };
    },
    onSuccess: ({ id, initialPrompt, mode }) => {
      qc.invalidateQueries({ queryKey: ["conversations", user?.id] });
      sounds.playPop();
      navigate({
        to: "/tutor/$conversationId",
        params: { conversationId: id },
        search: {
          initialPrompt,
          mode,
          grade: studentGrade,
        },
      });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to start chat");
    },
  });

  // Direct question submit
  const handleDirectSubmit = () => {
    const prompt = questionInput.trim();
    if (!prompt || create.isPending) return;
    setQuestionInput("");
    create.mutate({ title: prompt, initialPrompt: prompt, mode: "ask_sciencekh" });
  };

  // Launch with specific pedagogical mode
  const handleLaunchMode = (mode: TutorPedagogicalMode) => {
    sounds.playPop();
    const modeLabel = isKhmer ? PEDAGOGICAL_MODE_LABELS[mode].labelKm : PEDAGOGICAL_MODE_LABELS[mode].labelEn;
    create.mutate({
      title: modeLabel,
      mode,
    });
  };

  // 1-Tap starter prompt click
  const handleSelectPrompt = (promptText: string) => {
    sounds.playPop();
    create.mutate({ title: promptText, initialPrompt: promptText, mode: "ask_sciencekh" });
  };

  // Start a new blank chat
  const handleBlankChat = () => {
    sounds.playPop();
    create.mutate({
      title: isKhmer ? "ការសន្ទនាថ្មី" : "New Chat",
    });
  };

  // Delete conversation mutation
  const deleteConv = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ai_conversations").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["conversations", user?.id] });
      sounds.playPop();
      toast.success(isKhmer ? "បានលុបការសន្ទនា" : "Conversation deleted");
    },
  });

  const greetingName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    (isKhmer ? "ប្អូន" : "Student");
  const firstName = greetingName.split(" ")[0];

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth STEM Tutor" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* STEM Mentor Card */}
          <div className="p-4 rounded-3xl border border-emerald-200/80 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">👨‍🏫</span>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth STEM Mentor"}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  {isKhmer ? "ស្របតាមកម្មវិធី MoEYS" : "MoEYS Curriculum Grounded"}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {isKhmer
                ? "លោកគ្រូ វុឌ្ឍ ត្រូវបានបណ្តុះបណ្តាលដោយផ្ទាល់លើសៀវភៅពុម្ព និងវិញ្ញាសាជាតិ ៧-១២ ដើម្បីជួយប្អូនៗដោះស្រាយលំហាត់។"
                : "Trained on official MoEYS textbooks and past exams from Grade 7-12 to provide pedagogical step-by-step guidance."}
            </p>
          </div>

          {/* Quick New Chat Button */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <button
              type="button"
              onClick={handleBlankChat}
              disabled={create.isPending}
              className="w-full h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{isKhmer ? "ចាប់ផ្តើមការសន្ទនាថ្មី" : "Start New Chat"}</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ============================================================ */}
        {/* 1. MINIMALIST TOP BAR (MOBILE ONLY)                          */}
        {/* ============================================================ */}
        <header className="lg:hidden sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md header-safe-top px-4 pb-2.5">
          <div className="mx-auto flex h-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm shadow-2xs">
                👨‍🏫
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-white dark:border-slate-900"></span>
                </span>
              </div>
              <div>
                <h1 className="font-display text-sm font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth"}
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">
                  {isKhmer ? "គ្រូជំនួយ STEM MoEYS" : "STEM Tutor"}
                </p>
              </div>
            </div>

            {/* Quick Action: New Chat */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBlankChat}
                disabled={create.isPending}
                className="h-8 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title={isKhmer ? "ការសន្ទនាថ្មី" : "New Chat"}
              >
                <Plus className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isKhmer ? "ការសន្ទនាថ្មី" : "New Chat"}</span>
              </button>
            </div>
          </div>
        </header>

        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-0 space-y-6 pb-32 lg:pb-8">
          {/* ============================================================ */}
          {/* 2. FRIENDLY GREETING (CENTERED & UNCLUTTERED)                */}
          {/* ============================================================ */}
          <div className="text-center space-y-2">
            <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-3xl shadow-xs border border-emerald-100 dark:border-emerald-900/60 mx-auto">
              👨‍🏫
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isKhmer
                  ? firstName
                    ? `ជម្រាបសួរ, ${firstName}! 👋`
                    : "ជម្រាបសួរ! 👋"
                  : firstName
                    ? `Hi, ${firstName}! 👋`
                    : "Hi there! 👋"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                {isKhmer
                  ? `តើប្អូនចង់សួរ ឬរៀនរូបមន្តអ្វីថ្ងៃនេះ? (ថ្នាក់ទី ${studentGrade})`
                  : `What STEM question can I help you with today? (Grade ${studentGrade})`}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. PRIMARY HERO ACTION: MODERN CENTRAL INPUT CARD            */}
          {/* ============================================================ */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-3.5 shadow-xs focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all space-y-2.5">
            <textarea
              rows={2}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleDirectSubmit();
                }
              }}
              placeholder={
                isKhmer
                  ? "សួររូបមន្ត លំហាត់ ឬទ្រឹស្តីវិទ្យាសាស្ត្រ (Enter ដើម្បីសួរ)..."
                  : "Ask any formula, exercise, or concept (Enter to send)..."
              }
              className="w-full resize-none bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none font-medium leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>🇰🇭 / EN</span>
                <span>•</span>
                <span>Socratic Hints</span>
              </div>

              <Button
                type="button"
                size="sm"
                disabled={!questionInput.trim() || create.isPending}
                onClick={handleDirectSubmit}
                className="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition active:scale-95 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {create.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <span>{isKhmer ? "សួរ" : "Ask"}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4. 6 CORE PEDAGOGICAL MODES (CURRICULUM AI TUTOR MODES)     */}
          {/* ============================================================ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isKhmer ? "របៀបសិក្សាជាមួយលោកគ្រូ វុឌ្ឍ" : "Pedagogical Learning Modes"}
              </p>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                {isKhmer ? `ផ្អែកលើ MoEYS ថ្នាក់ទី ${studentGrade}` : `Grounded in MoEYS G${studentGrade}`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(PEDAGOGICAL_MODE_LABELS) as TutorPedagogicalMode[]).map((modeKey) => {
                const modeMeta = PEDAGOGICAL_MODE_LABELS[modeKey];
                return (
                  <button
                    key={modeKey}
                    type="button"
                    disabled={create.isPending}
                    onClick={() => handleLaunchMode(modeKey)}
                    className="p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 text-left transition active:scale-[0.98] group flex flex-col justify-between shadow-2xs cursor-pointer"
                  >
                    <div>
                      <div className="text-xl mb-1">{modeMeta.icon}</div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-snug">
                        {isKhmer ? modeMeta.labelKm : modeMeta.labelEn}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {isKhmer ? modeMeta.descriptionKm : modeMeta.descriptionEn}
                      </p>
                    </div>
                    <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                      <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-emerald-600 transition" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. 4 QUICK-START TOPICS (CLEAN & MINIMALIST)                 */}
          {/* ============================================================ */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              {isKhmer ? "ប្រធានបទគំរូពេញនិយម" : "Suggested Topics"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={create.isPending}
                  onClick={() => handleSelectPrompt(isKhmer ? item.promptKm : item.promptEn)}
                  className="flex items-center justify-between gap-2.5 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 text-left transition active:scale-[0.98] group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 truncate">
                        {isKhmer ? item.labelKm : item.labelEn}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {isKhmer ? item.promptKm : item.promptEn}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-emerald-600 transition shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. RECENT CONVERSATIONS (CLEAN, QUIET & INTUITIVE)           */}
          {/* ============================================================ */}
          {isConversationsLoading ? (
            <div className="space-y-2 pt-2">
              <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>
          ) : conversations && conversations.length > 0 ? (
            <section className="space-y-2 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isKhmer ? "ប្រវត្តិការសន្ទនា" : "Recent Chats"}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  {conversations.length}
                </span>
              </div>

              <ul className="space-y-1.5">
                {conversations.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 sm:p-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition">
                      <Link
                        to="/tutor/$conversationId"
                        params={{ conversationId: c.id }}
                        onClick={() => sounds.playPop()}
                        className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs shrink-0 font-bold">
                          💬
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {c.title || (isKhmer ? "ការសន្ទនាគ្មានចំណងជើង" : "Untitled Chat")}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{formatRelativeTime(c.updated_at, isKhmer)}</span>
                          </div>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConv.mutate(c.id);
                        }}
                        disabled={deleteConv.isPending}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition active:scale-95 cursor-pointer shrink-0"
                        title={isKhmer ? "លុប" : "Delete"}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}