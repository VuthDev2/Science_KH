// ==============================================================================
// ScienceKH — Official MoEYS Lesson Detail & Interactive Reader
// Aligned with the Cambodian National Curriculum (Grades 7–12)
// Features: Thematic Subject Hero, 1-Tap Bilingual Toggle (Khmer / English),
// Practical Application Callout, Formatted Math/Section Cards,
// Interactive Socratic Quick-Check, Tactile CTAs, and Sound Effects
// ==============================================================================

import { createFileRoute, Link, useNavigate, getRouteApi } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useMemo, Component } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import { cleanLatexMathString } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
  Check,
  GraduationCap,
  ArrowRight,
  HelpCircle,
  Volume2,
  BookOpen,
  Award,
  Layers,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  Share2,
  Zap,
  Compass,
  Lightbulb,
  Brain,
  ChevronDown,
  ChevronUp,
  PenTool,
} from "lucide-react";
import { getLessonPracticeExercises } from "@/lib/curriculum/practice-exercises";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getCuratedLesson, isUUID } from "@/lib/curated-lessons";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/_authenticated/lessons/$lessonId")({
  ssr: false,
  head: () => ({ meta: [{ title: "Lesson — ScienceKH" }] }),
  component: LessonPage,
  errorComponent: LessonErrorComponent,
});

const routeApi = getRouteApi("/_authenticated/lessons/$lessonId");

class SafeMarkdownBoundary extends Component<
  { children: React.ReactNode; fallbackText: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallbackText: string }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any) {
    console.error("Markdown rendering error:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
          {this.props.fallbackText}
        </div>
      );
    }
    return this.props.children;
  }
}

function SafeMathBlock({ math, className }: { math: string; className?: string }) {
  const html = useMemo(() => {
    try {
      const sanitized = cleanLatexMathString(math);
      return katex.renderToString(sanitized, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [math]);

  if (!html) {
    return (
      <div className={cn("font-mono text-xs sm:text-sm overflow-x-auto", className)}>
        {math}
      </div>
    );
  }
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function LessonErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error("Lesson route error:", error);
  let lessonId = "";
  try {
    const params = Route.useParams();
    lessonId = params?.lessonId || "";
  } catch {
    // safely handle outside route context
  }
  const isKhmer = typeof window !== "undefined"
    ? (localStorage.getItem("sciencekh_lang") || "km") === "km"
    : true;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="h-16 w-16 rounded-3xl grid place-items-center bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-2xl shadow-xs">
        ⚠️
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="font-display font-black text-lg text-slate-900 dark:text-white">
          {isKhmer ? "មានបញ្ហាបច្ចេកទេសលើមេរៀននេះ" : "Technical Issue Loading Lesson"}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          {isKhmer
            ? "ប្រព័ន្ធមិនអាចបង្ហាញទិន្នន័យមេរៀនបានពេញលេញនៅពេលនេះទេ។ អ្នកអាចធ្វើតេស្ត Quiz ភ្លាមៗ ឬត្រឡប់ទៅកម្មវិធីសិក្សាវិញ។"
            : "The lesson content could not be fully loaded right now. You can take the interactive quiz directly or return to the curriculum roadmap."}
        </p>
      </div>

      {Boolean(error) && (
        <details className="mt-2 text-left p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 max-w-md w-full">
          <summary className="font-semibold cursor-pointer">
            {isKhmer ? "ព័ត៌មានលម្អិតបច្ចេកទេស (Error Details)" : "Technical Details"}
          </summary>
          <pre className="mt-2 overflow-auto max-h-40 whitespace-pre-wrap font-mono text-[10px]">
            {error instanceof Error ? error.stack || error.message : String(error)}
          </pre>
        </details>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition cursor-pointer"
        >
          {isKhmer ? "ព្យាយាមម្តងទៀត" : "Try Again"}
        </button>
        {lessonId ? (
          <Link
            to="/lessons/$lessonId/quiz"
            params={{ lessonId }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-sm cursor-pointer"
          >
            {isKhmer ? "ធ្វើតេស្ត Quiz ជំនួសវិញ →" : "Take Quiz Instead →"}
          </Link>
        ) : null}
        <Link
          to="/lessons"
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs"
        >
          {isKhmer ? "ត្រឡប់ទៅកម្មវិធីសិក្សា" : "Back to Curriculum"}
        </Link>
        <Link
          to="/home"
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs"
        >
          {isKhmer ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}

// Subject Theme Helpers
function getSubjectTheme(slug?: string) {
  switch (slug) {
    case "mathematics":
      return {
        gradient: "from-blue-600 via-indigo-600 to-blue-700",
        badgeBg: "bg-blue-50 dark:bg-blue-950/60",
        badgeText: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        icon: Calculator,
      };
    case "physics":
      return {
        gradient: "from-purple-600 via-fuchsia-600 to-purple-700",
        badgeBg: "bg-purple-50 dark:bg-purple-950/60",
        badgeText: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        icon: Atom,
      };
    case "chemistry":
      return {
        gradient: "from-emerald-600 via-teal-600 to-emerald-700",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        icon: FlaskConical,
      };
    case "biology":
      return {
        gradient: "from-teal-600 via-emerald-600 to-teal-700",
        badgeBg: "bg-teal-50 dark:bg-teal-950/60",
        badgeText: "text-teal-700 dark:text-teal-300",
        border: "border-teal-200 dark:border-teal-800",
        icon: Dna,
      };
    case "earth":
      return {
        gradient: "from-amber-500 via-orange-600 to-amber-700",
        badgeBg: "bg-amber-50 dark:bg-amber-950/60",
        badgeText: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        icon: Globe,
      };
    default:
      return {
        gradient: "from-emerald-600 to-teal-700",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        icon: Layers,
      };
  }
}

// Real-World Pedagogical Insights & Practical Application
function getLessonPracticalInsight(titleEn: string, titleKm: string, isKhmer: boolean): string {
  const text = `${titleEn} ${titleKm}`.toLowerCase();

  if (text.includes("integer") || text.includes("ចំនួនគត់") || text.includes("algebraic")) {
    return isKhmer
      ? "ហេតុអ្វីត្រូវរៀនលេខអវិជ្ជមាន? ក្នុងជីវិតពិត នៅពេលសីតុណ្ហភាពធ្លាក់ចុះក្រោមសូន្យ (-5°C) ឬក្នុងធនាគារនៅពេលមានបំណុល ចំនួនអវិជ្ជមានជួយយើងគណនាយ៉ាងសុក្រឹតបំផុត!"
      : "Why do negative numbers exist? In the real world, sub-zero temperatures (-5°C) and financial balances rely on negative integers for precise mathematical accounting.";
  }
  if (text.includes("fraction") || text.includes("ប្រភាគ") || text.includes("percentage")) {
    return isKhmer
      ? "ប្រភាគ និងភាគរយ គឺជាភាសារបស់វិស្វករ និងពាណិជ្ជករ! ការដឹងពីសមាមាត្រជួយយើងលាយសារធាតុគីមី ឬគណនាការប្រាក់បានយ៉ាងត្រឹមត្រូវ!"
      : "Fractions and percentages are the universal language of ratios, chemical mixing, and financial growth calculations.";
  }
  if (text.includes("equation") || text.includes("សមីការ")) {
    return isKhmer
      ? "សមីការ គឺជាឧបករណ៍ស្វែងរកចម្លើយអាថ៌កំបាំង! រាល់ពេលដែលអ្នកចង់ដឹងពីតម្លៃមិនស្គាល់ (x) ក្នុងវិទ្យាសាស្ត្រ ឬជីវិតប្រចាំថ្ងៃ សមីការដោះស្រាយវាភ្លាម!"
      : "Equations turn unknown questions into definite mathematical solutions across engineering, business, and science.";
  }
  if (text.includes("integral") || text.includes("អាំងតេក្រាល")) {
    return isKhmer
      ? "អាំងតេក្រាល គឺជាវិធីបូកបញ្ចូលបំណែកតូចៗគ្មានដែនកំណត់! វិស្វករអវកាសប្រើវាដើម្បីគណនាគន្លងផ្លូវ និងកម្លាំងរុញរបស់គ្រាប់រ៉ុក្កែត SpaceX!"
      : "Integrals sum infinitely small slices, allowing aerospace engineers to calculate rocket thrust curves and orbital trajectories.";
  }
  if (
    text.includes("newton") ||
    text.includes("ញូតុន") ||
    text.includes("motion") ||
    text.includes("ចលនា")
  ) {
    return isKhmer
      ? "ច្បាប់ញូតុន F = m·a បង្ហាញថាកម្លាំងបង្កើតបម្រែបម្រួលល្បឿន! រថយន្តទំនើប និងយន្តហោះសុទ្ធតែរចនាតាមសមីការនេះ!"
      : "Newton's F = m·a is the fundamental bedrock of mechanical design, vehicle safety, and aeronautical lift.";
  }
  if (text.includes("acid") || text.includes("ph") || text.includes("អាស៊ីត")) {
    return isKhmer
      ? "កម្រិត pH ក្នុងឈាមមនុស្សត្រូវតែរក្សាឱ្យបានចន្លោះ 7.35–7.45 យ៉ាងតឹងរ៉ឹង! បើប្រែប្រួលបន្តិចបន្តួច អង់ស៊ីមជីវិតនឹងឈប់ដំណើរការ!"
      : "Human blood pH is strictly maintained at 7.35–7.45; chemical buffer systems keep our cellular enzymes functioning.";
  }

  return isKhmer
    ? "ការយល់ដឹងច្បាស់ពីនិយមន័យ និងការអនុវត្តលំហាត់គំរូជាប្រចាំ ជួយពង្រឹងមូលដ្ឋានគ្រឹះសម្រាប់ការប្រឡងថ្នាក់ជាតិ។"
    : "A solid grasp of core definitions and regular problem-solving builds strong foundations for national examinations.";
}

// Quick Concept Check Questions
interface ConceptCheckData {
  questionKm: string;
  questionEn: string;
  options: { labelKm: string; labelEn: string; isCorrect: boolean }[];
  explanationKm: string;
  explanationEn: string;
}

const CONCEPT_CHECKS: Record<string, ConceptCheckData> = {
  "les-g7-math-01": {
    questionKm: "គណនាប្រមាណវិធី៖ (-7) + (+15) = ?",
    questionEn: "Calculate: (-7) + (+15) = ?",
    options: [
      { labelKm: "+8", labelEn: "+8", isCorrect: true },
      { labelKm: "-8", labelEn: "-8", isCorrect: false },
      { labelKm: "+22", labelEn: "+22", isCorrect: false },
      { labelKm: "-22", labelEn: "-22", isCorrect: false },
    ],
    explanationKm:
      "ត្រឹមត្រូវណាស់! យកតម្លៃដាច់ខាតធំដកតូច (15 - 7 = 8) រួចរក្សាសញ្ញាតាមចំនួនធំជាង (+15) ដូច្នេះចម្លើយគឺ +8!",
    explanationEn:
      "Correct! Subtract magnitudes (15 - 7 = 8) and keep the sign of the larger absolute value (+15), giving +8!",
  },
  "les-g7-math-02": {
    questionKm: "តើប្រភាគ 3/4 ស្មើនឹងប៉ុន្មានភាគរយ?",
    questionEn: "What is 3/4 converted to a percentage?",
    options: [
      { labelKm: "75%", labelEn: "75%", isCorrect: true },
      { labelKm: "50%", labelEn: "50%", isCorrect: false },
      { labelKm: "25%", labelEn: "25%", isCorrect: false },
      { labelKm: "34%", labelEn: "34%", isCorrect: false },
    ],
    explanationKm: "ពិតជាត្រឹមត្រូវ! 3/4 × 100% = 75%!",
    explanationEn: "Spot on! 3/4 × 100% = 75%!",
  },
  "les-g8-math-01": {
    questionKm: "តើចំនួនណាខាងក្រោមជាចំនួនអសនិទាន?",
    questionEn: "Which of the following is an irrational number?",
    options: [
      { labelKm: "√2", labelEn: "√2", isCorrect: true },
      { labelKm: "3/5", labelEn: "3/5", isCorrect: false },
      { labelKm: "0.45", labelEn: "0.45", isCorrect: false },
      { labelKm: "√9", labelEn: "√9", isCorrect: false },
    ],
    explanationKm: "ត្រឹមត្រូវ! √2 ជាទសភាគមិនកំណត់ និងមិនខួប (1.414...) ដូច្នេះវាជាចំនួនអសនិទាន។",
    explanationEn: "Correct! √2 is non-terminating and non-repeating, so it is an irrational number.",
  },
  "les-g8-math-02": {
    questionKm: "គណនាពន្លាត៖ (2x + 3)² = ?",
    questionEn: "Calculate the expansion: (2x + 3)² = ?",
    options: [
      { labelKm: "4x² + 12x + 9", labelEn: "4x² + 12x + 9", isCorrect: true },
      { labelKm: "4x² + 9", labelEn: "4x² + 9", isCorrect: false },
      { labelKm: "2x² + 6x + 9", labelEn: "2x² + 6x + 9", isCorrect: false },
      { labelKm: "4x² + 6x + 9", labelEn: "4x² + 6x + 9", isCorrect: false },
    ],
    explanationKm: "ពិតជាត្រឹមត្រូវ! (2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9!",
    explanationEn: "Spot on! (2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9!",
  },
  "les-g8-math-06": {
    questionKm: "ដាក់ជាផលគុណកត្តា៖ x² - 25 = ?",
    questionEn: "Factor the expression: x² - 25 = ?",
    options: [
      { labelKm: "(x - 5)(x + 5)", labelEn: "(x - 5)(x + 5)", isCorrect: true },
      { labelKm: "(x - 5)²", labelEn: "(x - 5)²", isCorrect: false },
      { labelKm: "(x - 25)(x + 25)", labelEn: "(x - 25)(x + 25)", isCorrect: false },
      { labelKm: "x(x - 25)", labelEn: "x(x - 25)", isCorrect: false },
    ],
    explanationKm: "ត្រឹមត្រូវ! រូបមន្ត a² - b² = (a - b)(a + b) ដោយ 25 = 5² នាំឱ្យបាន (x - 5)(x + 5)។",
    explanationEn: "Correct! a² - b² = (a - b)(a + b) with 25 = 5² gives (x - 5)(x + 5).",
  },
};

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { user } = useAuth();
  const { lang, setLanguage } = useProfile();
  const qc = useQueryClient();
  const navigate = useNavigate();

  // 1-Tap Bilingual View State synchronized with global profile language
  const [viewLang, setViewLang] = useState<"km" | "en">(lang || "km");
  useEffect(() => {
    if (lang) {
      setViewLang(lang);
    }
  }, [lang]);
  const isKhmer = viewLang === "km";

  // Interactive Concept Check state
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnsweredCheck, setHasAnsweredCheck] = useState(false);

  // Short Practice Exercises & Calculation State
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [selectedExerciseOptionIdx, setSelectedExerciseOptionIdx] = useState<number | null>(null);
  const [hasAnsweredExercise, setHasAnsweredExercise] = useState(false);
  const [showExerciseSolution, setShowExerciseSolution] = useState(false);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<Set<string>>(new Set());

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const curated = getCuratedLesson(lessonId);
      if (curated) return curated;

      if (!isUUID(lessonId)) return null;

      try {
        const { data, error } = await supabase
          .from("lessons")
          .select("*, subject:subjects(name_en, name_km, slug), quiz:quizzes(id)")
          .eq("id", lessonId)
          .maybeSingle();
        if (error) return null;
        return data;
      } catch {
        return null;
      }
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id, lessonId],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return null;
      if (!isUUID(lessonId)) {
        try {
          const saved =
            typeof window !== "undefined"
              ? localStorage.getItem(`sciencekh_progress_${user.id}_${lessonId}`)
              : null;
          return saved ? { status: saved } : null;
        } catch {
          return null;
        }
      }
      try {
        const { data } = await supabase
          .from("lesson_progress")
          .select("status")
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId)
          .maybeSingle();
        return data;
      } catch {
        return null;
      }
    },
  });

  // Mark in-progress automatically on view
  useEffect(() => {
    let isMounted = true;
    if (!user || !lesson) return;
    if (progress) return;
    if (!isUUID(lessonId)) {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`sciencekh_progress_${user.id}_${lessonId}`, "in_progress");
          if (isMounted) {
            qc.invalidateQueries({ queryKey: ["progress", user.id, lessonId] });
          }
        } catch {
          // ignore storage error
        }
      }
      return;
    }
    supabase
      .from("lesson_progress")
      .upsert(
        { user_id: user.id, lesson_id: lessonId, status: "in_progress" },
        { onConflict: "user_id,lesson_id" },
      )
      .then(
        () => {
          if (isMounted) {
            qc.invalidateQueries({ queryKey: ["progress", user.id, lessonId] });
          }
        },
        (err: unknown) => {
          console.warn("Could not save lesson progress:", err);
        },
      );

    return () => {
      isMounted = false;
    };
  }, [user, lesson, progress, lessonId, qc]);

  // Complete lesson mutation
  const complete = useMutation({
    mutationFn: async () => {
      if (!user || !lesson) throw new Error("Not ready");
      if (!isUUID(lessonId)) {
        if (typeof window !== "undefined") {
          localStorage.setItem(`sciencekh_progress_${user.id}_${lessonId}`, "completed");
          localStorage.setItem(`sciencekh_progress_${lessonId}`, "completed");
          const userKey = `sciencekh_completed_lessons_${user.id}`;
          const uList = JSON.parse(localStorage.getItem(userKey) || "[]");
          if (!uList.includes(lessonId)) {
            uList.push(lessonId);
            localStorage.setItem(userKey, JSON.stringify(uList));
          }
          const allKey = `sciencekh_completed_lessons_all`;
          const aList = JSON.parse(localStorage.getItem(allKey) || "[]");
          if (!aList.includes(lessonId)) {
            aList.push(lessonId);
            localStorage.setItem(allKey, JSON.stringify(aList));
          }
        }
        sounds.playVictory();
        launchConfetti();
        if (progress?.status !== "completed") {
          const { data: p } = await supabase
            .from("profiles")
            .select("xp")
            .eq("id", user.id)
            .maybeSingle();
          if (p) {
            await supabase
              .from("profiles")
              .update({ xp: (p.xp ?? 0) + (lesson.xp_reward ?? 0) })
              .eq("id", user.id);
          }
        }
        return;
      }
      const { error: e1 } = await supabase.from("lesson_progress").upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          status: "completed",
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );
      if (e1) throw e1;
      if (progress?.status !== "completed") {
        const { data: p } = await supabase
          .from("profiles")
          .select("xp")
          .eq("id", user.id)
          .maybeSingle();
        if (p) {
          await supabase
            .from("profiles")
            .update({ xp: (p.xp ?? 0) + (lesson.xp_reward ?? 0) })
            .eq("id", user.id);
        }
      }
    },
    onSuccess: () => {
      sounds.playVictory();
      launchConfetti();
      toast.success(
        isKhmer
          ? `+${lesson?.xp_reward ?? 35} XP — មេរៀនបានបញ្ចប់ដោយជោគជ័យ!`
          : `+${lesson?.xp_reward ?? 35} XP — Lesson completed!`,
      );
      qc.invalidateQueries({ queryKey: ["progress", user?.id, lessonId] });
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
      qc.invalidateQueries({ queryKey: ["student-progress", user?.id] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Could not save"),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] dark:bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-xs font-bold text-slate-500">កំពុងផ្ទុកមេរៀន MoEYS...</p>
        </div>
      </main>
    );
  }

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] dark:bg-background flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="h-14 w-14 rounded-2xl grid place-items-center bg-slate-100 dark:bg-slate-800 text-2xl">
          🔍
        </div>
        <div className="space-y-1">
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white">
            រកមិនឃើញមេរៀននេះទេ
          </h2>
          <p className="text-xs text-slate-500 max-w-xs">
            មេរៀននេះប្រហែលជាត្រូវបានផ្លាស់ប្តូរ ឬមិនទាន់មានក្នុងប្រព័ន្ធ។
          </p>
        </div>
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ត្រឡប់ទៅកម្មវិធីសិក្សា</span>
        </Link>
      </main>
    );
  }

  const isCompleted = progress?.status === "completed";
  const body = isKhmer ? lesson.body_km : lesson.body_en;
  const title = isKhmer ? lesson.title_km : lesson.title_en;
  const summary = isKhmer ? lesson.summary_km : lesson.summary_en;
  const quizRaw = lesson.quiz as { id: string } | { id: string }[] | null | undefined;
  const quizId = Array.isArray(quizRaw) ? quizRaw[0]?.id : quizRaw?.id;

  const subjectSlug = lesson.subject?.slug || "general";
  const theme = getSubjectTheme(subjectSlug);
  const IconComp = theme.icon;
  const practicalInsight = getLessonPracticalInsight(lesson.title_en, lesson.title_km, isKhmer);
  const checkData = CONCEPT_CHECKS[lesson.id] || null;
  const practiceExercises = useMemo(() => {
    if (!lesson) return [];
    try {
      return getLessonPracticeExercises(lesson as any) || [];
    } catch (err) {
      console.warn("Failed to get practice exercises:", err);
      return [];
    }
  }, [lesson]);
  const currentExercise = practiceExercises[activeExerciseIdx] || practiceExercises[0] || null;

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "កម្មវិធីសិក្សា" : "Curriculum", href: "/lessons" },
        {
          label: lesson.subject
            ? isKhmer
              ? lesson.subject.name_km
              : lesson.subject.name_en
            : "STEM",
        },
        { label: isKhmer ? lesson.title_km : lesson.title_en },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Lesson Actions Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isKhmer ? "សកម្មភាពសិក្សា" : "Lesson Mastery"}
            </span>

            {/* Mark as Complete Button */}
            {!isCompleted ? (
              <button
                type="button"
                onClick={() => complete.mutate()}
                disabled={complete.isPending}
                className="w-full h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                {complete.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 text-emerald-600" />
                )}
                <span>{isKhmer ? "បានយល់មេរៀននេះ" : "Mark as Understood"}</span>
              </button>
            ) : (
              <div className="w-full h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{isKhmer ? "✓ បានបញ្ចប់ (+35 XP)" : "✓ Mastered (+35 XP)"}</span>
              </div>
            )}

            {/* Quiz Button — Every lesson has an interactive laboratory quiz */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                navigate({ to: "/lessons/$lessonId/quiz", params: { lessonId } });
              }}
              className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition active:scale-[0.98] cursor-pointer"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{isKhmer ? "ធ្វើតេស្ត Quiz (+50 XP)" : "Take Quiz (+50 XP)"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Ask Tutor about this lesson */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth — STEM Mentor"}
                </h4>
                <span className="text-[10.5px] text-slate-400 font-medium">
                  {isKhmer ? "ជំនួយការដោះស្រាយមេរៀន MoEYS" : "Instant MoEYS Lesson Guidance"}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {isKhmer
                ? `មានចម្ងល់លើមេរៀន "${lesson.title_km}" មែនទេ? សួរលោកគ្រូ វុឌ្ឍ ដើម្បីទទួលបានការពន្យល់។`
                : `Have questions about "${lesson.title_en}"? Ask Kru Vuth for instant clarification.`}
            </p>
            <Link
              to="/tutor"
              search={{
                initialPrompt: isKhmer
                  ? `ពន្យល់ខ្ញុំអំពីមេរៀន "${lesson.title_km}" ថ្នាក់ទី ${lesson.grade}`
                  : `Please explain the lesson "${lesson.title_en}" Grade ${lesson.grade}`,
              }}
              className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{isKhmer ? "សួរអំពីមេរៀននេះ" : "Ask About Lesson"}</span>
            </Link>
          </div>

          {/* Lesson Metadata Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isKhmer ? "ព័ត៌មានមេរៀន MoEYS" : "Lesson Details"}
            </span>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{isKhmer ? "មុខវិជ្ជា" : "Subject"}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {lesson.subject ? (isKhmer ? lesson.subject.name_km : lesson.subject.name_en) : "STEM"}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{isKhmer ? "កម្រិតថ្នាក់" : "Grade Level"}</span>
              <span className="font-bold text-slate-900 dark:text-white">Grade {lesson.grade}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{isKhmer ? "រយៈពេលសិក្សា" : "Est. Time"}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {lesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"}
              </span>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ================================================================== */}
        {/* 1. STICKY LESSON HEADER: BACK, BREADCRUMB & BILINGUAL TOGGLE       */}
        {/* ================================================================== */}
        <header
          className="lg:hidden sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors header-safe-top px-4 pb-2.5"
          style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
        >
          <div className="mx-auto w-full max-w-md px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2">
            {/* Back Button to Roadmap */}
            <Link
              to="/lessons"
              onClick={() => sounds.playPop()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition cursor-pointer py-1"
              aria-label="Back to STEM Roadmap"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline font-semibold">
                {isKhmer ? "កម្មវិធីសិក្សា" : "Roadmap"}
              </span>
            </Link>

            {/* Middle: Subject Pill */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 truncate">
                <IconComp className="h-3 w-3 shrink-0" />
                <span>
                  {lesson.subject
                    ? isKhmer
                      ? lesson.subject.name_km
                      : lesson.subject.name_en
                    : "STEM"}
                </span>
                <span>·</span>
                <span>{isKhmer ? `ថ្នាក់ទី ${lesson.grade}` : `Grade ${lesson.grade}`}</span>
              </span>
            </div>

            {/* Right: Instant 1-Tap Bilingual Switcher */}
            <div className="flex items-center gap-1">
              <div className="inline-flex p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-850 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setViewLang("km");
                    setLanguage("km");
                  }}
                  className={cn(
                    "px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer",
                    viewLang === "km"
                      ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900",
                  )}
                  title="មើលជាភាសាខ្មែរ"
                >
                  🇰🇭 ខ្មែរ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setViewLang("en");
                    setLanguage("en");
                  }}
                  className={cn(
                    "px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer",
                    viewLang === "en"
                      ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900",
                  )}
                  title="View in English"
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================== */}
        {/* 2. EDITORIAL ARTICLE (SINGLE UNIFIED SURFACE WITHOUT BOX OVERLOAD) */}
        {/* ================================================================== */}
        <article className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none px-4 sm:px-6 lg:px-0 pt-5 pb-32 lg:pb-8 space-y-6">
          {/* Article Header */}
          <div className="space-y-2 pb-5 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {lesson.subject
                  ? isKhmer
                    ? lesson.subject.name_km
                    : lesson.subject.name_en
                  : "STEM"}{" "}
                ·{" "}
                {isKhmer
                  ? `ថ្នាក់ទី ${lesson.grade} · មេរៀនទី ${lesson.sort_order}`
                  : `Grade ${lesson.grade} · Lesson ${lesson.sort_order}`}
              </span>

              {isCompleted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>{isKhmer ? "បានបញ្ចប់" : "Mastered"}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
                  <Zap className="h-3 w-3 fill-current text-amber-500" />
                  <span>{isKhmer ? "កំពុងរៀន" : "In Progress"}</span>
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {title}
            </h1>

            {summary && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                {summary}
              </p>
            )}

            {/* Minimal Inline Metadata Row (No nested boxes!) */}
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {lesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"}
                </span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>+{lesson.xp_reward || 35} XP</span>
              </span>
            </div>
          </div>

          {/* Real-World Context & Application */}
          <section className="rounded-2xl border border-emerald-200/90 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {isKhmer
                  ? "ការអនុវត្តជាក់ស្តែងក្នុងជីវិតពិត"
                  : "Real-World Application & Concept Context"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {practicalInsight}
            </p>
          </section>

          {/* Core Markdown Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-foreground pt-1">
            {body ? (
              <SafeMarkdownBoundary fallbackText={body}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
                  components={{
                    h2: ({ children }) => (
                      <div className="mt-8 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug m-0">
                          {children}
                        </h2>
                      </div>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-display text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mt-5 mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-2">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-3 space-y-2 pl-1 list-none">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                        <div className="flex-1">{children}</div>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <div className="my-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700 dark:text-amber-400">
                          <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                          <span>
                            {isKhmer
                              ? "ឧទាហរណ៍ជាក់ស្តែង & គន្លឹះដោះស្រាយ"
                              : "Worked Example & Concept Tip"}
                          </span>
                        </div>
                        <div className="leading-relaxed not-italic">{children}</div>
                      </div>
                    ),
                  }}
                >
                  {body}
                </ReactMarkdown>
              </SafeMarkdownBoundary>
            ) : (
              <p className="text-slate-400 text-xs">មិនទាន់មានទិន្នន័យមេរៀននេះនៅឡើយទេ។</p>
            )}
          </div>

          {/* Interactive Concept Quick-Check */}
          {checkData && (
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500 shrink-0" />
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {isKhmer ? "សំណួរពិចារណាលើមេរៀន" : "Lesson Concept Check"}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {isKhmer
                      ? "ជ្រើសរើសចម្លើយដើម្បីផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នក"
                      : "Select an answer to verify your understanding"}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700">
                {isKhmer ? checkData.questionKm : checkData.questionEn}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {checkData.options.map((opt, optIdx) => {
                  const isSelected = selectedOptionIdx === optIdx;
                  const isCorrect = opt.isCorrect;

                  return (
                    <button
                      key={opt.labelEn}
                      type="button"
                      onClick={() => {
                        setSelectedOptionIdx(optIdx);
                        setHasAnsweredCheck(true);
                        if (isCorrect) {
                          sounds.playCorrect();
                        } else {
                          sounds.playWrong();
                        }
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border-b-[3px] text-xs font-bold transition-all active:border-b-0 active:translate-y-1 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs",
                        isSelected
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-800 shadow-emerald-500/30"
                            : "bg-red-600 text-white border-red-800 shadow-red-500/30"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500",
                      )}
                    >
                      <span>{isKhmer ? opt.labelKm : opt.labelEn}</span>
                      {isSelected && isCorrect && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredCheck && selectedOptionIdx !== null && (
                <div
                  className={cn(
                    "p-3 rounded-xl text-xs leading-relaxed animate-in fade-in duration-200 border",
                    checkData.options[selectedOptionIdx].isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                  )}
                >
                  <p className="font-bold mb-0.5">
                    {checkData.options[selectedOptionIdx].isCorrect
                      ? isKhmer
                        ? "ត្រឹមត្រូវអស្ចារ្យណាស់!"
                        : "Spot on! Excellent!"
                      : isKhmer
                        ? "សូមសាកល្បងពិចារណាម្តងទៀត!"
                        : "Almost there, keep trying!"}
                  </p>
                  <p>{isKhmer ? checkData.explanationKm : checkData.explanationEn}</p>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. INTERACTIVE SHORT PRACTICE EXERCISES & CALCULATION LAB      */}
          {/* ============================================================== */}
          {currentExercise && (
            <section className="rounded-3xl border border-emerald-200/90 dark:border-emerald-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 grid place-items-center">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {isKhmer ? "លំហាត់អនុវត្តខ្លីៗ & គណនាជាក់ស្តែង" : "Short Practice & Calculation Exercises"}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {isKhmer
                        ? "អនុវត្តទ្រឹស្តីជាមួយលំហាត់ជាក់ស្តែងដើម្បីពង្រឹងការយល់ដឹង"
                        : "Apply theory with step-by-step problem calculations"}
                    </p>
                  </div>
                </div>

                {practiceExercises.length > 1 && (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full shrink-0">
                    {activeExerciseIdx + 1} / {practiceExercises.length}
                  </span>
                )}
              </div>

              {/* Exercise Title & Problem Statement */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                    {isKhmer ? currentExercise.titleKm : currentExercise.titleEn}
                  </span>
                  {completedExerciseIds.has(currentExercise.id) && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      ✓ {isKhmer ? "ឆ្លើយត្រូវ" : "Solved"}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {isKhmer ? currentExercise.questionKm : currentExercise.questionEn}
                </p>

                {/* KaTeX Problem Expression Box */}
                {currentExercise.formulaOrContext && (
                  <div className="my-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-center font-bold text-emerald-700 dark:text-emerald-300 text-base sm:text-lg overflow-x-auto whitespace-nowrap scrollbar-none">
                    <SafeMathBlock math={currentExercise.formulaOrContext} />
                  </div>
                )}
              </div>

              {/* 4 Interactive Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {currentExercise.options?.map((opt: any, optIdx: number) => {
                  const isSelected = selectedExerciseOptionIdx === optIdx;
                  const isCorrect = opt.isCorrect;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => {
                        setSelectedExerciseOptionIdx(optIdx);
                        setHasAnsweredExercise(true);
                        if (isCorrect) {
                          sounds.playCorrect();
                          if (!completedExerciseIds.has(currentExercise.id)) {
                            setCompletedExerciseIds((prev) => new Set([...prev, currentExercise.id]));
                            toast.success(isKhmer ? "+10 XP! ចម្លើយត្រឹមត្រូវអស្ចារ្យណាស់" : "+10 XP! Spot on answer!");
                          }
                        } else {
                          sounds.playWrong();
                          toast.error(isKhmer ? "មិនទាន់ត្រឹមត្រូវទេ! សាកល្បងម្តងទៀត ឬមើលរបៀបដោះស្រាយ" : "Not quite! Try again or view solution");
                        }
                      }}
                      className={cn(
                        "p-3 rounded-2xl border-b-[3px] text-xs font-bold transition-all text-left flex items-center justify-between gap-2 cursor-pointer shadow-2xs",
                        isSelected
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-800 shadow-emerald-500/25 active:translate-y-0.5 active:border-b-0"
                            : "bg-red-600 text-white border-red-800 shadow-red-500/25 active:translate-y-0.5 active:border-b-0"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400 active:translate-y-0.5 active:border-b-0"
                      )}
                    >
                      <span>{isKhmer ? opt.labelKm : opt.labelEn}</span>
                      {isSelected && isCorrect && <Check className="h-4 w-4 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              {/* Tip Callout */}
              {currentExercise.tipKm && (
                <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-2 text-xs text-amber-950 dark:text-amber-200">
                  <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="font-bold">{isKhmer ? "គន្លឹះដោះស្រាយ៖ " : "Tip: "}</strong>
                    {currentExercise.tipKm}
                  </p>
                </div>
              )}

              {/* Expandable Step-by-Step Solution Breakdown */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setShowExerciseSolution(!showExerciseSolution);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      {showExerciseSolution
                        ? isKhmer ? "លាក់របៀបដោះស្រាយលម្អិត" : "Hide Step-by-Step Solution"
                        : isKhmer ? "មើលរបៀបដោះស្រាយលម្អិតមួយជំហានម្តងៗ" : "View Step-by-Step Solution"}
                    </span>
                  </span>
                  {showExerciseSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showExerciseSolution && (
                  <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2 animate-in fade-in duration-200">
                    <SafeMarkdownBoundary fallbackText={isKhmer ? currentExercise.stepByStepSolutionKm : currentExercise.stepByStepSolutionEn}>
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}>
                        {isKhmer ? currentExercise.stepByStepSolutionKm : currentExercise.stepByStepSolutionEn}
                      </ReactMarkdown>
                    </SafeMarkdownBoundary>
                  </div>
                )}
              </div>

              {/* Next Exercise Navigation */}
              {practiceExercises.length > 1 && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-400">
                    {isKhmer
                      ? `បានដោះស្រាយ ${completedExerciseIds.size}/${practiceExercises.length} លំហាត់`
                      : `Solved ${completedExerciseIds.size}/${practiceExercises.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      const nextIdx = (activeExerciseIdx + 1) % practiceExercises.length;
                      setActiveExerciseIdx(nextIdx);
                      setSelectedExerciseOptionIdx(null);
                      setHasAnsweredExercise(false);
                      setShowExerciseSolution(false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold flex items-center gap-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition cursor-pointer"
                  >
                    <span>{isKhmer ? "លំហាត់បន្ទាប់" : "Next Exercise"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Academic Study Assistant Link */}
          <div className="pt-2 flex items-center justify-center">
            <Link
              to="/tutor"
              search={{
                initialPrompt: lesson
                  ? `សូមជួយពន្យល់មេរៀន «${lesson.title_km}» មុខវិជ្ជា ${lesson.subject ? (isKhmer ? lesson.subject.name_km : lesson.subject.name_en) : "STEM"} ថ្នាក់ទី ${lesson.grade} ឱ្យខ្ញុំយល់ច្បាស់បន្តិច។`
                  : undefined,
              }}
              onClick={() => sounds.playPop()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {isKhmer
                  ? "សួរលោកគ្រូ វុឌ្ឍ អំពីមេរៀននេះ →"
                  : "Ask Kru Vuth about this lesson →"}
              </span>
            </Link>
          </div>
        </article>

        {/* ================================================================== */}
        {/* 7. HIGH-IMPACT TACTILE ACTION DOCK (STICKY BOTTOM BAR - MOBILE ONLY) */}
        {/* ================================================================== */}
        <aside className="lg:hidden fixed bottom-16 sm:bottom-18 left-0 right-0 z-20 mx-auto max-w-md px-4 pointer-events-none">
          <div className="p-3 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-2xl flex items-center gap-2 pointer-events-auto">
            {/* Mark as Complete Button */}
            {!isCompleted ? (
              <button
                type="button"
                onClick={() => complete.mutate()}
                disabled={complete.isPending}
                className="flex-1 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                {complete.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 text-emerald-600" />
                )}
                <span>{isKhmer ? "បានយល់មេរៀននេះ" : "Mark as Understood"}</span>
              </button>
            ) : (
              <div className="flex-1 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{isKhmer ? "✓ បានបញ្ចប់មេរៀន (+35 XP)" : "✓ Mastered (+35 XP)"}</span>
              </div>
            )}

            {/* Direct Quiz Challenge Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                navigate({ to: "/lessons/$lessonId/quiz", params: { lessonId } });
              }}
              className="flex-1 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition active:scale-[0.98] cursor-pointer border-b-[4px] border-emerald-800 active:border-b-0 active:translate-y-1"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{isKhmer ? "ធ្វើតេស្ត Quiz" : "Take Quiz"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
