// ==============================================================================
// ScienceKH — Study Reference Detail Page (ទំព័រព័ត៌មានលម្អិតឯកសារយោង)
// Dedicated Academic Deep-Dive with Type-Specific Renderers & MoEYS Citations
// ==============================================================================

import { createFileRoute, Link, useNavigate, getRouteApi } from "@tanstack/react-router";
import React, { useState, useEffect, useMemo, Component } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import { ALL_CURATED_LESSONS } from "@/lib/curriculum";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  ExternalLink,
  BookOpen,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Layers,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  FileText,
  AlertCircle,
  Lightbulb,
  Volume2,
  Ruler,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { AppShell } from "@/components/layout/app-shell";
import { cn, cleanLatexDisplayTitle, cleanLatexMathString } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { toast } from "sonner";
import { ReferenceRepository } from "@/services/supabase/reference.repository";
import type {
  ReferenceEntry,
  FormulaContent,
  SymbolContent,
  DefinitionContent,
  ChemicalElementContent,
  HistoricalEventContent,
  GrammarRuleContent,
  ConceptContent,
} from "@/types/reference-library";
import { REFERENCE_TYPE_LABELS } from "@/types/reference-library";

export const Route = createFileRoute("/_authenticated/reference/$referenceId")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Reference Details — ScienceKH" }],
  }),
  component: ReferenceDetailPage,
  errorComponent: ReferenceErrorComponent,
});

class ReferenceContentErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error("Reference content rendering error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs sm:text-sm leading-relaxed text-center space-y-3">
            <p className="font-bold">មានការរអាក់រអួលក្នុងការបង្ហាញទិន្នន័យឯកសារយោងនេះ</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              អ្នកអាចត្រឡប់ទៅបណ្ណាល័យឯកសារយោងវិញដើម្បីស្វែងរកមាតិកាផ្សេងទៀត។
            </p>
            <Link
              to="/reference"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-sm transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>ត្រឡប់ទៅបណ្ណាល័យ</span>
            </Link>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

function ReferenceErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error("Reference route error:", error);
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
          {isKhmer ? "មានបញ្ហាក្នុងការផ្ទុកឯកសារយោងនេះ" : "Error Loading Reference"}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          {isKhmer
            ? "ប្រព័ន្ធមិនអាចបង្ហាញទិន្នន័យឯកសារយោងបាននៅពេលនេះទេ។"
            : "The reference entry could not be displayed."}
        </p>
      </div>

      {Boolean(error) && (
        <details open className="mt-2 text-left p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 max-w-md w-full">
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
        <Link
          to="/reference"
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-sm cursor-pointer"
        >
          {isKhmer ? "ត្រឡប់ទៅបណ្ណាល័យ" : "Back to Library"}
        </Link>
      </div>
    </main>
  );
}

/**
 * Robust KaTeX renderer that avoids react-markdown delimiter escaping bugs.
 */
function SafeKatex({
  math,
  className,
  displayMode = false,
}: {
  math: string;
  className?: string;
  displayMode?: boolean;
}) {
  const html = useMemo(() => {
    if (!math || typeof math !== "string") return null;
    try {
      const sanitized = cleanLatexMathString(math);
      return katex.renderToString(sanitized, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [math, displayMode]);

  if (!html) {
    return <span className={className}>{math || ""}</span>;
  }

  return (
    <span
      className={cn("katex-inline inline-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function ReferenceDetailPage() {
  const { referenceId } = Route.useParams();
  const { lang } = useProfile();
  const isKhmer = lang === "km";
  const navigate = useNavigate();

  const [entry, setEntry] = useState<ReferenceEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"official" | "student" | "sources">("official");

  // Cross-link with official MoEYS curriculum lessons (unconditionally declared at top level)
  const relatedLessons = useMemo(() => {
    if (!entry) return [];
    const entrySubj = (entry.subjectSlug || "").toLowerCase();
    const matches = ALL_CURATED_LESSONS.filter((l) => {
      const isGrade = entry.grades?.includes(l.grade);
      const lSubj = (l.subject?.slug || "").toLowerCase();
      const isSubj =
        lSubj === entrySubj ||
        (entrySubj === "math" && lSubj === "mathematics") ||
        (entrySubj === "physics" && lSubj === "physics") ||
        (entrySubj === "chemistry" && lSubj === "chemistry") ||
        (entrySubj === "biology" && lSubj === "biology");
      return isGrade && isSubj;
    });

    // Score based on title and key terms matching
    const scored = matches.map((lesson) => {
      let score = 0;
      const haystack = `${lesson.title_km} ${lesson.title_en} ${lesson.summary_km || ""}`.toLowerCase();
      (entry.keyTerms || []).forEach((term) => {
        if (haystack.includes(term.toLowerCase())) score += 2;
      });
      if (entry.originalTitleKh && haystack.includes(entry.originalTitleKh.toLowerCase())) score += 5;
      return { lesson, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((s) => s.lesson);
  }, [entry]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    ReferenceRepository.getReferenceByIdOrSlug(referenceId)
      .then((data) => {
        if (mounted) {
          setEntry(data);
          setIsBookmarked(!!data?.isBookmarked);
          setIsLoading(false);
          if (data) {
            ReferenceRepository.recordRecentView(data.id);
          }
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [referenceId]);

  const handleToggleBookmark = () => {
    if (!entry) return;
    sounds.playPop();
    triggerHapticSelection();
    const nextState = ReferenceRepository.toggleBookmark(entry.id);
    setIsBookmarked(nextState);
    toast.success(
      nextState
        ? isKhmer ? "បានរក្សាទុកក្នុងចំណាំ" : "Bookmarked reference"
        : isKhmer ? "បានដកចេញពីចំណាំ" : "Removed bookmark"
    );
  };

  const handleCopy = (text: string, type: string) => {
    sounds.playPop();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(isKhmer ? "បានចម្លងទៅ Clipboard!" : "Copied to clipboard!");
    setTimeout(() => setCopiedType(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-center items-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">
          {isKhmer ? "កំពុងទាញយកឯកសារយោងពី MoEYS..." : "Loading official reference..."}
        </p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-center items-center p-6 text-center space-y-4">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {isKhmer ? "រកមិនឃើញឯកសារយោងនេះឡើយ" : "Reference Not Found"}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          {isKhmer
            ? "ឯកសារយោងដែលអ្នកកំពុងស្វែងរកប្រហែលជាត្រូវបានផ្លាស់ប្តូរ ឬមិនទាន់បានបញ្ចូលក្នុងប្រព័ន្ធ។"
            : "The reference you are looking for may have moved or is not yet indexed."}
        </p>
        <Link
          to="/reference"
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
        >
          {isKhmer ? "ត្រឡប់ទៅបណ្ណាល័យ" : "Back to Library"}
        </Link>
      </div>
    );
  }

  const typeMeta = REFERENCE_TYPE_LABELS[entry.referenceType] || REFERENCE_TYPE_LABELS.other;
  const formula = entry.referenceType === "formula" || entry.referenceType === "equation"
    ? (entry.structuredContent as FormulaContent)
    : null;
  const symbol = entry.referenceType === "symbol"
    ? (entry.structuredContent as SymbolContent)
    : null;
  const definition = entry.referenceType === "definition"
    ? (entry.structuredContent as DefinitionContent)
    : null;
  const chemicalElement = entry.referenceType === "chemical_element"
    ? (entry.structuredContent as ChemicalElementContent)
    : null;
  const historicalEvent = entry.referenceType === "historical_event"
    ? (entry.structuredContent as HistoricalEventContent)
    : null;
  const grammarRule = entry.referenceType === "grammar_rule"
    ? (entry.structuredContent as GrammarRuleContent)
    : null;
  const concept = entry.referenceType === "concept"
    ? (entry.structuredContent as ConceptContent)
    : null;

  return (
    <AppShell
      hideGamification={true}
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "ស្វែងយល់" : "Explore", href: "/explore" },
        { label: isKhmer ? "បណ្ណាល័យឯកសារយោង" : "Study References", href: "/reference" },
        { label: cleanLatexDisplayTitle(entry.originalTitleKh) },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Ask Tutor Widget */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "លោកគ្រូ វុឌ្ឍ (Kru Vuth)" : "Kru Vuth — STEM Mentor"}
                </h4>
                <span className="text-[10.5px] text-slate-400 font-medium">
                  {isKhmer ? "ជំនួយការដោះស្រាយមេរៀន MoEYS" : "Instant MoEYS Lesson Guidance"}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {isKhmer
                ? `ចង់ឱ្យលោកគ្រូ វុឌ្ឍ ពន្យល់អំពី ${cleanLatexDisplayTitle(entry.originalTitleKh)} ជាមួយឧទាហរណ៍ជាក់ស្តែងទេ?`
                : `Need a step-by-step walkthrough or practice example for ${cleanLatexDisplayTitle(entry.titleEn)}?`}
            </p>
            <Link
              to="/tutor"
              search={{ initialPrompt: `ពន្យល់ខ្ញុំអំពី ${entry.originalTitleKh} ថ្នាក់ទី ${(entry.grades || [7]).join(", ")}` }}
              className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ" : "Ask Kru Vuth"}</span>
            </Link>
          </div>

          {/* Quick Actions Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isKhmer ? "សកម្មភាពរហ័ស" : "Quick Actions"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleToggleBookmark}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 transition text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>{isKhmer ? "បានរក្សាទុក" : "Saved"}</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span>{isKhmer ? "រក្សាទុក" : "Bookmark"}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(window.location.href, "url")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>{isKhmer ? "ចែករំលែក" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <span>{isKhmer ? "ប្រភពឯកសារផ្លូវការ" : "Curriculum Source"}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {entry.sources?.[0]?.sourceDocument?.titleKm || "ស្រង់ចេញពីសៀវភៅពុម្ពផ្លូវការក្រសួងអប់រំ យុវជន និងកីឡា"}
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Sticky Header with iPhone Notch & Dynamic Island Clearance */}
        <header
          className="lg:hidden sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 pb-2"
          style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))" }}
        >
          <div className="max-w-4xl mx-auto min-h-[3.25rem] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/reference"
                search={{ grade: entry.grades?.[0] || 7, subject: entry.subjectSlug }}
                onClick={() => sounds.playPop()}
                className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {isKhmer ? "បណ្ណាល័យ" : "Library"}
                </span>
                <ChevronRight className="h-3 w-3" />
                <span className="font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[160px] sm:max-w-none">
                  {cleanLatexDisplayTitle(entry.originalTitleKh)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleBookmark}
                className="p-2 rounded-xl text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={isBookmarked ? "ដកចំណាំ" : "ចំណាំទុក"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-amber-500 fill-amber-500" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(window.location.href, "url")}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="ចែករំលែក"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Reference Document Shell */}
        <ReferenceContentErrorBoundary>
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 space-y-6 pb-32 lg:pb-8">
          {/* Title, Badges & Verification Status */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border",
                  typeMeta.badgeColor
                )}
              >
                <span>{typeMeta.emoji}</span>
                <span>{isKhmer ? typeMeta.labelKm : typeMeta.labelEn}</span>
              </span>

              {/* Grades Tag */}
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                {isKhmer ? `ថ្នាក់ទី ${(entry.grades || [7]).join(", ")}` : `Grades ${(entry.grades || [7]).join(", ")}`}
              </span>

              {/* Stream Tag */}
              {entry.streamApplicability !== "all" && (
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {entry.streamApplicability === "science"
                    ? isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រពិត" : "Science Stream"
                    : isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រសង្គម" : "Social Science Stream"}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {cleanLatexDisplayTitle(entry.originalTitleKh)}
              </h1>
              {entry.titleEn && (
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
                  {entry.titleEn}
                </p>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {entry.shortDescriptionKh}
            </p>

            {/* Quick Bridge to Ask Kru Vuth */}
            <div className="pt-2 flex items-center justify-between">
              <Link
                to="/tutor"
                search={{ initialPrompt: `សូមជួយពន្យល់លម្អិតអំពី៖ ${entry.originalTitleKh} ក្នុងមុខវិជ្ជា ${entry.subjectSlug} សម្រាប់សិស្សថ្នាក់ទី ${entry.grades?.[0] || 7}។` }}
                onClick={() => sounds.playPop()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ លើមេរៀននេះ" : "Ask Kru Vuth about this"}</span>
              </Link>
            </div>
          </section>

          {/* TYPE-SPECIFIC HERO BLOCK */}

          {/* 0. SYMBOL & MATHEMATICAL NOTATION RENDERER */}
          {(symbol || entry.referenceType === "symbol" || (entry.structuredContent as any)?.symbol) && !formula && (
            <section className="space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center relative group">
                {((entry.structuredContent as any)?.symbol || (entry.structuredContent as any)?.latexExpression) && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        (entry.structuredContent as any)?.latexExpression ||
                        (entry.structuredContent as any)?.symbol,
                        "symbol"
                      )
                    }
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1 text-xs cursor-pointer"
                    title="Copy LaTeX"
                  >
                    {copiedType === "symbol" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline font-bold">LaTeX</span>
                  </button>
                )}

                {/* KaTeX Symbol Display */}
                <div className="py-6 text-3xl sm:text-5xl font-black text-emerald-700 dark:text-emerald-300 formula-card-preview overflow-x-auto whitespace-nowrap">
                  {(() => {
                    const rawSym =
                      (entry.structuredContent as any)?.latexExpression ||
                      (entry.structuredContent as any)?.symbol ||
                      entry.originalTitleKh;
                    const isLatex =
                      rawSym &&
                      (rawSym.includes("\\") ||
                        rawSym.includes("{") ||
                        rawSym.includes("mathbb") ||
                        rawSym.includes("=") ||
                        rawSym.includes("^") ||
                        rawSym.includes("_") ||
                        rawSym.includes("dots"));
                    const cleaned = isLatex ? cleanLatexMathString(rawSym) : rawSym;

                    return isLatex ? (
                      <SafeKatex math={cleaned} displayMode={true} className="text-3xl sm:text-5xl" />
                    ) : (
                      <span className="font-mono">{rawSym}</span>
                    );
                  })()}
                </div>

                {/* Phonetic & Associated Unit Bar */}
                <div className="flex items-center justify-center gap-3 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  {(entry.structuredContent as any)?.phoneticKh && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200/80 dark:border-purple-800">
                      <Volume2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>អានថា៖ {(entry.structuredContent as any).phoneticKh}</span>
                    </span>
                  )}
                  {(entry.structuredContent as any)?.associatedUnit && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/80 dark:border-blue-800">
                      <Ruler className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>ខ្នាត SI៖ {(entry.structuredContent as any).associatedUnit}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Variable / Element Breakdown for Symbols (if any) */}
              {(entry.structuredContent as any)?.variables &&
                (entry.structuredContent as any).variables.length > 0 && (
                  <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      <span>{isKhmer ? "តារាងពន្យល់អត្ថន័យអក្សរនីមួយៗ" : "Symbols & Notation Elements"}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(entry.structuredContent as any).variables.map((v: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                        >
                          <span className="font-serif font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-lg border border-blue-200">
                            {v.symbol}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {isKhmer ? v.nameKh : v.nameEn || v.nameKh}
                          </span>
                          {v.unit && (
                            <span className="text-[11px] text-slate-400">[{v.unit}]</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </section>
          )}

          {/* 1. FORMULA / EQUATION RENDERER */}
          {formula && (
            <section className="space-y-4">
              {/* KaTeX Hero Display */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center relative group">
                <button
                  type="button"
                  onClick={() => handleCopy(formula.latexExpression, "latex")}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1 text-xs cursor-pointer"
                  title="ចម្លង LaTeX"
                >
                  {copiedType === "latex" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline font-bold">LaTeX</span>
                </button>

                <div className="py-6 text-2xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-300 formula-card-preview overflow-x-auto whitespace-nowrap scrollbar-none">
                  <SafeKatex math={formula.latexExpression} displayMode={true} className="text-2xl sm:text-4xl" />
                </div>

                {formula.applicableConditions && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{formula.applicableConditions}</span>
                  </div>
                )}
              </div>

              {/* Variable Definition Breakdown Table */}
              {formula.variables && formula.variables.length > 0 && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    <span>{isKhmer ? "តារាងពន្យល់អថេរ និងខ្នាតរង្វាស់រង្វាល់" : "Variables & SI Units Breakdown"}</span>
                  </h3>

                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                          <th className="py-2.5 px-3 font-semibold">{isKhmer ? "អថេរ" : "Symbol"}</th>
                          <th className="py-2.5 px-3 font-semibold">{isKhmer ? "ឈ្មោះជាភាសាខ្មែរ" : "Khmer Name"}</th>
                          <th className="py-2.5 px-3 font-semibold">{isKhmer ? "ខ្នាត (SI Unit)" : "SI Unit"}</th>
                          <th className="py-2.5 px-3 font-semibold">{isKhmer ? "អត្ថន័យ" : "Description"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                        {formula.variables.map((v, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition">
                            <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 font-sans text-sm">
                              {v.symbol}
                            </td>
                            <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                              {v.nameKh}
                              {v.nameEn && <span className="text-slate-400 ml-1 font-normal">({v.nameEn})</span>}
                            </td>
                            <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                                {v.unit || "-"}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                              {v.description || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Derived Formulas */}
              {formula.derivedFormulas && formula.derivedFormulas.length > 0 && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {isKhmer ? "រូបមន្តទាញចេញ (Derived Forms)" : "Derived Formulas"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formula.derivedFormulas.map((d, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          <SafeKatex math={d.formula} displayMode={false} />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {d.meaningKh}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 2. CHEMICAL ELEMENT RENDERER */}
          {chemicalElement && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {isKhmer ? "លក្ខណៈរូប និងព័ត៌មានអាតូម" : "Atomic & Element Data"}
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">លេខអាតូម (Z)</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{chemicalElement.atomicNumber}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">ម៉ាសអាតូម (amu)</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{chemicalElement.atomicMass}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">វ៉ាឡង់ទូទៅ</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{chemicalElement.valency}</div>
                </div>
              </div>

              {chemicalElement.electronConfig && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">ទម្រង់អេឡិចត្រុង</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{chemicalElement.electronConfig}</span>
                </div>
              )}
            </section>
          )}

          {/* 3. HISTORICAL EVENT RENDERER */}
          {historicalEvent && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 font-black text-xl">
                  {historicalEvent.dateDisplayKh}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{historicalEvent.significanceKh}</h3>
                  <span className="text-xs text-slate-400">{historicalEvent.historicalPeriod}</span>
                </div>
              </div>

              {historicalEvent.causes && historicalEvent.causes.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">មូលហេតុចម្បងៗ៖</h4>
                  <ul className="space-y-1">
                    {historicalEvent.causes.map((c, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* 4. GRAMMAR RULE RENDERER */}
          {grammarRule && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {isKhmer ? "វិធានវេយ្យាករណ៍ & រូបមន្តល្បះ" : "Grammar Pattern Formula"}
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-bold text-emerald-800 dark:text-emerald-300 text-base">
                {grammarRule.ruleStatementKh}
              </div>

              {grammarRule.components && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {grammarRule.components.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                      <span className="font-bold text-emerald-600 block mb-1">{c.element}</span>
                      <span className="text-slate-500">ឧទាហរណ៍៖ «{c.example}»</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 5. CONCEPT / UNITS TABLE RENDERER */}
          {concept?.unitsTable && (
            <section className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {isKhmer ? "តារាងបម្លែងខ្នាតរង្វាស់" : "Units Conversion Table"}
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {concept.unitsTable.map((u, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{u.unit}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{u.equivalent}</span>
                    <span className="text-slate-400">{u.meaningKh}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TABBED PEDAGOGICAL VIEW: OFFICIAL VS SCIENCEKH EXPLANATION */}
          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/60 p-1.5 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("official")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-2xl font-bold transition text-center",
                  activeTab === "official"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isKhmer ? "និយមន័យផ្លូវការ MoEYS" : "Official MoEYS Definition"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-2xl font-bold transition text-center flex items-center justify-center gap-1.5",
                  activeTab === "student"
                    ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>{isKhmer ? "គន្លឹះយល់ងាយ ScienceKH" : "Student-Friendly Guide"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sources")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-2xl font-bold transition text-center",
                  activeTab === "sources"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isKhmer ? "ប្រភពឯកសារ" : "Sources"}
              </button>
            </div>

            <div className="p-6 text-sm leading-relaxed">
              {activeTab === "official" && (
                <div className="space-y-4">
                  <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {entry.explanationKh}
                  </div>
                  {entry.explanationEn && (
                    <div className="text-xs text-slate-400 dark:text-slate-500 italic border-l-2 border-slate-200 dark:border-slate-800 pl-3">
                      {entry.explanationEn}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "student" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                    <div className="flex items-center gap-2 font-bold mb-1 text-emerald-700 dark:text-emerald-300 text-xs">
                      <Sparkles className="h-4 w-4" />
                      <span>{isKhmer ? "វិធីសាស្ត្រចងចាំបែបងាយយល់" : "Pedagogical Memory Trick"}</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {entry.studentFriendlyGuideKh || entry.explanationKh}
                    </p>
                  </div>

                  {entry.supplementaryNotesKh && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {isKhmer ? "ចំណេះដឹងបន្ថែម (លើសពីកម្មវិធីសិក្សា)" : "Supplementary Notes"}
                      </div>
                      <p>{entry.supplementaryNotesKh}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "sources" && (
                <div className="space-y-4">
                  {entry.sources && entry.sources.length > 0 ? (
                    entry.sources.map((src) => (
                      <div
                        key={src.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            📖 {src.sourceDocument?.titleKm}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                            {src.sourceDocument?.organization}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          {src.chapterKm && <span>{src.chapterKm} • </span>}
                          {src.pageStart && <span>ទំព័រទី {src.pageStart} {src.pageEnd ? `- ${src.pageEnd}` : ""}</span>}
                          {src.sourceDocument?.publicationYear && <span> (ឆ្នាំ {src.sourceDocument.publicationYear})</span>}
                        </div>
                        {src.quotedPassageKm && (
                          <blockquote className="border-l-2 border-emerald-500 pl-3 italic text-slate-600 dark:text-slate-400 text-xs">
                            «{src.quotedPassageKm}»
                          </blockquote>
                        )}
                        {src.sourceDocument?.officialUrl && (
                          <a
                            href={src.sourceDocument.officialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                          >
                            <span>{isKhmer ? "បើកឯកសារយោងលើ MoEYS OER" : "View on MoEYS OER Portal"}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">
                      {isKhmer ? "ប្រភពពីកម្មវិធីសិក្សាគោល MoEYS" : "Verified from MoEYS standard syllabus."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* WORKED EXAMPLES */}
          {entry.examples && entry.examples.length > 0 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{isKhmer ? "លំហាត់គំរូ និងដំណោះស្រាយជាក់ស្តែង" : "Worked Example & Solution"}</span>
              </h3>

              {entry.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs"
                >
                  {ex.problemKh && (
                    <div>
                      <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {isKhmer ? "ប្រធានលំហាត់គំរូ៖" : "Problem Statement:"}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        {ex.problemKh}
                      </p>
                    </div>
                  )}

                  {ex.solutionKh && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        {isKhmer ? "ដំណោះស្រាយលម្អិត៖" : "Step-by-step Solution:"}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {ex.solutionKh}
                      </p>
                    </div>
                  )}

                  {ex.correctExample && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200">
                      <span className="font-bold block mb-0.5">ឧទាហរណ៍ត្រឹមត្រូវ៖</span>
                      <p>{ex.correctExample}</p>
                      {ex.explanation && <p className="text-slate-500 text-[11px] mt-1">{ex.explanation}</p>}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* RELATED MOEYS LESSONS CROSS-LINKING */}
          {relatedLessons.length > 0 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span>{isKhmer ? "មេរៀន MoEYS ដែលពាក់ព័ន្ធ" : "Related MoEYS Lessons"}</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {isKhmer ? "កម្មវិធីសិក្សាជាតិ" : "National Curriculum"}
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {relatedLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to="/lessons/$lessonId"
                    params={{ lessonId: lesson.id }}
                    onClick={() => sounds.playPop()}
                    className="py-3 flex items-center justify-between gap-3 group hover:text-emerald-600 transition"
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {lesson.sort_order}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition truncate">
                          {lesson.title_km}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {lesson.subject?.name_km || (isKhmer ? "មុខវិជ្ជាស្នូល" : "Core Subject")} • {lesson.estimated_minutes || 15} {isKhmer ? "នាទី" : "mins"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-600 shrink-0">
                      <span className="text-[11px] font-semibold hidden sm:inline">
                        {isKhmer ? "ចូលរៀន" : "Study"}
                      </span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Key Terms and Tags */}
          <section className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs text-slate-400">{isKhmer ? "ពាក្យគន្លឹះ៖" : "Tags:"}</span>
            {(entry.keyTerms || []).map((term, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300"
              >
                #{term}
              </span>
            ))}
          </section>
        </div>
      </ReferenceContentErrorBoundary>
    </div>
    </AppShell>
  );
}
