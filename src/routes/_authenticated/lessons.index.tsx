import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  GraduationCap,
  X,
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  Globe,
  Layers,
  RotateCcw,
  AlertCircle,
  Flame,
  BookOpen,
  Languages,
  Landmark,
  Compass,
  Laptop,
  Scale,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { toKhmerNumeral } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CURATED_MOEYS_LESSONS as MOEYS_BANK_LESSONS } from "@/lib/curated-lessons";
import { sounds } from "@/lib/sound-effects";
import { LearningPath, type LessonNode } from "@/components/learning-path";
import { MoeysSyllabusView } from "@/components/features/curriculum/moeys-syllabus-view";
import { groupLessonsIntoUnits } from "@/lib/curriculum/units";
import { JsonLd } from "@/components/seo/json-ld";
import { generateCourseSchema, generateBreadcrumbSchema } from "@/lib/seo/schema-generator";
import { AppShell } from "@/components/layout/app-shell";
import { LessonsRightSidebar } from "@/components/features/curriculum/lessons-right-sidebar";
import {
  GradePickerSheet,
  GRADE_TIERS,
  GRADE_LABELS,
} from "@/components/features/curriculum/grade-picker-sheet";

type SearchParams = { subject?: string; grade?: number };

export const Route = createFileRoute("/_authenticated/lessons/")({
  ssr: false,
  head: () => ({ meta: [{ title: "MoEYS National Curriculum — ScienceKH" }] }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    subject: typeof s.subject === "string" ? s.subject : undefined,
    grade: typeof s.grade === "number" ? s.grade : undefined,
  }),
  component: LessonsIndex,
});

const routeApi = getRouteApi("/_authenticated/lessons/");

// MoEYS Grade 7–12 Curriculum Bank
const CURATED_MOEYS_LESSONS: LessonNode[] = MOEYS_BANK_LESSONS as unknown as LessonNode[];

// Stream classification for Grade 11 & 12 Bac II
const SCIENCE_STREAM_SLUGS = new Set([
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "earth",
  "ict",
]);

const SOCIAL_STREAM_SLUGS = new Set([
  "khmer",
  "history",
  "geography",
  "morality",
  "english",
  "mathematics",
]);

// Official MoEYS National Curriculum Subjects with Duolingo-style thematic palettes
const ALL_MOEYS_SUBJECTS = [
  {
    slug: "mathematics",
    name_km: "គណិតវិទ្យា",
    short_km: "គណិត",
    name_en: "Mathematics",
    icon: Calculator,
    iconColor: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    bgLight: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    slug: "physics",
    name_km: "រូបវិទ្យា",
    short_km: "រូប",
    name_en: "Physics",
    icon: Atom,
    iconColor: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-600 via-fuchsia-600 to-purple-700",
    bgLight: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    slug: "chemistry",
    name_km: "គីមីវិទ្យា",
    short_km: "គីមី",
    name_en: "Chemistry",
    icon: FlaskConical,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-600 via-teal-600 to-emerald-700",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    slug: "biology",
    name_km: "ជីវវិទ្យា",
    short_km: "ជីវ",
    name_en: "Biology",
    icon: Dna,
    iconColor: "text-teal-600 dark:text-teal-400",
    gradient: "from-teal-600 via-emerald-600 to-teal-700",
    bgLight: "bg-teal-50 dark:bg-teal-950/40",
  },
  {
    slug: "khmer",
    name_km: "ភាសាខ្មែរ",
    short_km: "ខ្មែរ",
    name_en: "Khmer Literature",
    icon: BookOpen,
    iconColor: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-600 via-pink-600 to-rose-700",
    bgLight: "bg-rose-50 dark:bg-rose-950/40",
  },
  {
    slug: "earth",
    name_km: "ផែនដីវិទ្យា",
    short_km: "ផែនដី",
    name_en: "Earth Science",
    icon: Globe,
    iconColor: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-600 via-orange-600 to-amber-700",
    bgLight: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    slug: "english",
    name_km: "ភាសាអង់គ្លេស",
    short_km: "អង់គ្លេស",
    name_en: "English",
    icon: Languages,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-600 via-blue-600 to-indigo-700",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    slug: "history",
    name_km: "ប្រវត្តិវិទ្យា",
    short_km: "ប្រវត្តិ",
    name_en: "History",
    icon: Landmark,
    iconColor: "text-amber-700 dark:text-amber-400",
    gradient: "from-amber-700 via-yellow-700 to-amber-800",
    bgLight: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    slug: "geography",
    name_km: "ភូមិវិទ្យា",
    short_km: "ភូមិ",
    name_en: "Geography",
    icon: Compass,
    iconColor: "text-teal-700 dark:text-teal-400",
    gradient: "from-teal-700 via-cyan-700 to-teal-800",
    bgLight: "bg-teal-50 dark:bg-teal-950/40",
  },
  {
    slug: "ict",
    name_km: "ព័ត៌មានវិទ្យា (ICT)",
    short_km: "ICT",
    name_en: "ICT & Computing",
    icon: Laptop,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-600 via-blue-600 to-cyan-700",
    bgLight: "bg-cyan-50 dark:bg-cyan-950/40",
  },
  {
    slug: "morality",
    name_km: "សីលធម៌-ពលរដ្ឋ",
    short_km: "ពលរដ្ឋ",
    name_en: "Moral & Civics",
    icon: Scale,
    iconColor: "text-emerald-700 dark:text-emerald-300",
    gradient: "from-emerald-700 via-green-700 to-emerald-800",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    slug: "all",
    name_km: "គ្រប់មុខវិជ្ជា",
    short_km: "ទាំងអស់",
    name_en: "All Subjects",
    icon: Layers,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    bgLight: "bg-slate-50 dark:bg-slate-800",
  },
];

function LessonsIndex() {
  const { subject, grade } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { user } = useAuth();
  const { lang, data: profile } = useProfile();
  const queryClient = useQueryClient();
  const isKhmer = lang === "km";

  const [q, setQ] = useState("");
  const [showGradeSheet, setShowGradeSheet] = useState(false);
  const [viewMode, setViewMode] = useState<"path" | "syllabus">("path");
  const [streamFilter, setStreamFilter] = useState<"all" | "science" | "social">("all");

  // Student's profile grade (defaults to 12)
  const profileGrade = profile?.grade ?? 12;

  // Grade being viewed — search param wins, then profile
  const currentGrade = grade ?? profileGrade;
  const isGuestBrowsing = currentGrade !== profileGrade;

  // Active Subject Logic:
  // - If subject === "all", user explicitly requested All Subjects (Bento Grid)
  // - Otherwise default to "mathematics" (or the chosen subject) so the user is immediately on the Duolingo Path!
  const isAllSubjects = subject === "all";
  const activeSubjectSlug = isAllSubjects ? undefined : (subject || "mathematics");

  const activeSubjectObj = useMemo(() => {
    if (isAllSubjects) {
      return ALL_MOEYS_SUBJECTS.find((s) => s.slug === "all") || ALL_MOEYS_SUBJECTS[0];
    }
    return (
      ALL_MOEYS_SUBJECTS.find((s) => s.slug === activeSubjectSlug) ||
      ALL_MOEYS_SUBJECTS[0]
    );
  }, [isAllSubjects, activeSubjectSlug]);

  // Persist grade change to Supabase
  const setProfileGrade = useMutation({
    mutationFn: async (newGrade: number) => {
      if (!user) return;
      await supabase.from("profiles").update({ grade: newGrade }).eq("id", user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  // Query DB lessons
  const { data: dbLessons } = useQuery({
    queryKey: ["lessons", activeSubjectSlug ?? null, currentGrade],
    queryFn: async () => {
      try {
        let query = supabase
          .from("lessons")
          .select(
            "id, title_en, title_km, summary_en, summary_km, grade, estimated_minutes, xp_reward, sort_order, subject:subjects(slug, name_en, name_km)",
          )
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (activeSubjectSlug) {
          const { data: subObj } = await supabase
            .from("subjects")
            .select("id")
            .eq("slug", activeSubjectSlug)
            .maybeSingle();
          if (subObj) query = query.eq("subject_id", subObj.id);
        }
        query = query.eq("grade", currentGrade);

        const { data, error } = await query;
        if (error || !data || data.length === 0) return null;
        return data as LessonNode[];
      } catch {
        return null;
      }
    },
  });

  const allLessons = useMemo(() => {
    const curated = CURATED_MOEYS_LESSONS;
    if (!dbLessons || dbLessons.length === 0) return curated;
    const existingIds = new Set(curated.map((c) => c.id));
    const extra = dbLessons.filter((d) => !existingIds.has(d.id));
    return [...curated, ...extra];
  }, [dbLessons]);

  // Real progress directly from Supabase (resilient against offline or serverFn proxy issues)
  const { data: progressData } = useQuery({
    queryKey: ["student-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      try {
        if (!user) return { completedIds: [] as string[], inProgressIds: [] as string[] };
        const { data, error } = await supabase
          .from("lesson_progress")
          .select("lesson_id, status")
          .eq("user_id", user.id);
        if (error || !data) {
          return { completedIds: [] as string[], inProgressIds: [] as string[] };
        }
        return {
          completedIds: data.filter((r) => r.status === "completed").map((r) => r.lesson_id),
          inProgressIds: data.filter((r) => r.status === "in_progress").map((r) => r.lesson_id),
        };
      } catch {
        return { completedIds: [] as string[], inProgressIds: [] as string[] };
      }
    },
    staleTime: 30_000,
  });

  // Completed IDs set (combines Supabase real-time progress + offline/curated localStorage progress)
  const completedIds = useMemo(() => {
    const ids = new Set<string>();
    if (progressData?.completedIds) {
      for (const id of progressData.completedIds) ids.add(id);
    }
    if (typeof window !== "undefined") {
      try {
        const uid = user?.id || "guest";
        const stored = localStorage.getItem(`sciencekh_completed_lessons_${uid}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            for (const id of parsed) ids.add(id);
          }
        }
        const storedAll = localStorage.getItem("sciencekh_completed_lessons_all");
        if (storedAll) {
          const parsedAll = JSON.parse(storedAll);
          if (Array.isArray(parsedAll)) {
            for (const id of parsedAll) ids.add(id);
          }
        }
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            key.startsWith("sciencekh_progress_") &&
            localStorage.getItem(key) === "completed"
          ) {
            const suffix = key.slice("sciencekh_progress_".length);
            if (uid && suffix.startsWith(`${uid}_`)) {
              ids.add(suffix.slice(`${uid}_`.length));
            } else {
              ids.add(suffix);
            }
          }
        }
      } catch {
        // ignore storage errors
      }
    }
    return ids;
  }, [progressData, user]);

  const inProgressIds = useMemo(() => {
    if (progressData?.inProgressIds && progressData.inProgressIds.length > 0) {
      return new Set<string>(progressData.inProgressIds);
    }
    return new Set<string>();
  }, [progressData]);

  // Filtered lessons for current grade and active subject
  const gradeLessons = useMemo(() => {
    return allLessons.filter((l) => l.grade === currentGrade);
  }, [allLessons, currentGrade]);

  const subjectFilteredLessons = useMemo(() => {
    if (!activeSubjectSlug) return gradeLessons;
    return gradeLessons.filter((l) => l.subject?.slug === activeSubjectSlug);
  }, [gradeLessons, activeSubjectSlug]);

  const searchFilteredLessons = useMemo(() => {
    if (!q.trim()) return subjectFilteredLessons;
    const needle = q.toLowerCase();
    return subjectFilteredLessons.filter(
      (l) =>
        l.title_en.toLowerCase().includes(needle) ||
        l.title_km.toLowerCase().includes(needle) ||
        (l.summary_en ?? "").toLowerCase().includes(needle) ||
        (l.summary_km ?? "").toLowerCase().includes(needle),
    );
  }, [subjectFilteredLessons, q]);

  // Grade change handler
  const handleGradeChange = (newGrade: number) => {
    sounds.playPop();
    setShowGradeSheet(false);
    navigate({ search: { grade: newGrade, subject: undefined } });
    if (user) setProfileGrade.mutate(newGrade);
  };

  const unitsWithLessons = useMemo(() => {
    return groupLessonsIntoUnits(
      searchFilteredLessons,
      currentGrade,
      activeSubjectSlug,
      completedIds,
    );
  }, [searchFilteredLessons, currentGrade, activeSubjectSlug, completedIds]);

  // Authentic subject progress stats for the active Grade
  const subjectsWithStats = useMemo(() => {
    return ALL_MOEYS_SUBJECTS.filter((s) => s.slug !== "all").map((sub) => {
      const subLessons = gradeLessons.filter((l) => l.subject?.slug === sub.slug);
      const total = subLessons.length;
      const completed = subLessons.filter((l) => completedIds.has(l.id)).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        ...sub,
        totalLessons: total,
        completedLessons: completed,
        percent,
      };
    });
  }, [gradeLessons, completedIds]);

  // Filtered subjects for Bento Grid based on stream
  const filteredBentoSubjects = useMemo(() => {
    if (currentGrade < 11 || streamFilter === "all") {
      return subjectsWithStats;
    }
    if (streamFilter === "science") {
      return subjectsWithStats.filter((s) => SCIENCE_STREAM_SLUGS.has(s.slug));
    }
    if (streamFilter === "social") {
      return subjectsWithStats.filter((s) => SOCIAL_STREAM_SLUGS.has(s.slug));
    }
    return subjectsWithStats;
  }, [subjectsWithStats, currentGrade, streamFilter]);

  const activeSubjectProgress = useMemo(() => {
    if (!activeSubjectSlug) return { completed: 0, total: 0, percent: 0 };
    const total = subjectFilteredLessons.length;
    const completed = subjectFilteredLessons.filter((l) => completedIds.has(l.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  }, [activeSubjectSlug, subjectFilteredLessons, completedIds]);

  return (
    <>
      <AppShell
        breadcrumbs={[
          { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
          { label: isKhmer ? "កម្មវិធីសិក្សា" : "Curriculum", href: "/lessons" },
          ...(activeSubjectSlug ? [{ label: isKhmer ? activeSubjectObj.name_km : activeSubjectObj.name_en }] : []),
        ]}
        activeGrade={currentGrade}
        onGradeChange={handleGradeChange}
        rightSidebar={
          <LessonsRightSidebar
            currentGrade={currentGrade}
            activeSubjectSlug={activeSubjectSlug}
            activeSubjectNameKm={activeSubjectObj.slug !== "all" ? activeSubjectObj.name_km : undefined}
            activeSubjectNameEn={activeSubjectObj.slug !== "all" ? activeSubjectObj.name_en : undefined}
            unitsWithLessons={unitsWithLessons}
            completedCount={activeSubjectProgress.completed}
            totalCount={activeSubjectProgress.total}
            progressPercent={activeSubjectProgress.percent}
            isKhmer={isKhmer}
          />
        }
      >
        {/* Schema.org Structured Data for MoEYS Curriculum Course */}
        <JsonLd
          data={[
            generateCourseSchema({
              title: isKhmer ? "កម្មវិធីសិក្សាជាតិ MoEYS ថ្នាក់ទី ៧-១២" : "MoEYS Curriculum Grades 7-12",
              description: isKhmer
                ? "មេរៀនវិទ្យាសាស្ត្រ គណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា ស្របតាមស្តង់ដារក្រសួងអប់រំ"
                : "STEM subjects national curriculum lessons, practice quizzes, and dedicated teacher tutor support.",
              subject: activeSubjectObj.slug !== "all" ? activeSubjectObj.name_km : "STEM",
              grade: currentGrade,
              url: `https://sciencekh.com/lessons?grade=${currentGrade}`,
            }),
            generateBreadcrumbSchema([
              { name: "Home", item: "/" },
              { name: "Curriculum", item: "/lessons" },
            ]),
          ]}
        />

        {/* ================================================================== */}
        {/* 1. MOBILE-ONLY TOP NAV: BRAND, STREAK, GRADE SWITCHER, VIEW TOGGLE */}
        {/* ================================================================== */}
        <header
          className="lg:hidden sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors header-safe-top mb-3"
          style={{ paddingTop: "max(2.75rem, calc(env(safe-area-inset-top, 0px) + 0.35rem))" }}
        >
          <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl px-4 sm:px-6 pt-3 pb-2.5 space-y-2.5">
            {/* Top Bar: Brand & Subject + Streak + Grade + View Toggle */}
            <div className="flex items-center justify-between gap-2">
              {/* Brand & Active Subject Badge */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white font-black text-xs shadow-2xs">
                  S
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-sm font-black text-slate-900 dark:text-white leading-tight">
                    {isKhmer ? "រៀន" : "Learn"}
                  </h1>
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-none truncate">
                    {isKhmer ? activeSubjectObj.name_km : activeSubjectObj.name_en}
                  </p>
                </div>
              </div>

              {/* Action Capsules: Streak + Grade + View Toggle */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Daily Streak Indicator */}
                <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-black bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/60 shadow-2xs shrink-0 whitespace-nowrap">
                  <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
                  <span>{profile?.streak_days || 1}</span>
                </div>

                {/* Grade Selector Pill */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setShowGradeSheet(true);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition active:scale-95 cursor-pointer shadow-2xs shrink-0 whitespace-nowrap",
                    isGuestBrowsing
                      ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500",
                  )}
                >
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">{isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(currentGrade)}` : `G${currentGrade}`}</span>
                  <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
                </button>

                {/* View Mode Toggle Pill (Learning Path vs MoEYS Syllabus) */}
                <div className="inline-flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setViewMode("path");
                    }}
                    className={cn(
                      "px-2 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 cursor-pointer",
                      viewMode === "path"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                    title={isKhmer ? "គន្លងសិក្សា (Learning Path)" : "Learning Path"}
                  >
                    <Compass className="h-3 w-3" />
                    <span>{isKhmer ? "គន្លង" : "Path"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setViewMode("syllabus");
                    }}
                    className={cn(
                      "px-2 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 cursor-pointer",
                      viewMode === "syllabus"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                    title={isKhmer ? "មាតិកាសៀវភៅពុម្ព MoEYS" : "Official Syllabus"}
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>{isKhmer ? "មាតិកា" : "Syllabus"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Fast Curriculum Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={
                  isKhmer
                    ? "ស្វែងរកមេរៀន រូបមន្ត ឬទ្រឹស្តី..."
                    : "Search lessons, formulas, or concepts..."
                }
                className="w-full h-9 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9.5 pr-8 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-2xs transition"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* 1-Tap Horizontal Scrolling Subject Tabs (Duolingo Style Switcher) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
              {ALL_MOEYS_SUBJECTS.map((sub) => {
                const isSelected = sub.slug === "all" ? isAllSubjects : activeSubjectSlug === sub.slug;
                const IconComp = sub.icon;

                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      navigate({ search: { grade: currentGrade, subject: sub.slug } });
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 shrink-0 cursor-pointer shadow-2xs border",
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-black"
                        : "bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500",
                    )}
                  >
                    <IconComp
                      className={cn(
                        "h-3.5 w-3.5",
                        isSelected ? "text-white" : sub.iconColor,
                      )}
                    />
                    <span>{isKhmer ? sub.short_km || sub.name_km : sub.name_en}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ================================================================== */}
        {/* 2. DESKTOP CONTROLS: SEARCH, VIEW MODE TOGGLE & SUBJECT TABS       */}
        {/* ================================================================== */}
        <div className="hidden lg:block space-y-3.5 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={
                  isKhmer
                    ? "ស្វែងរកមេរៀន រូបមន្ត ឬទ្រឹស្តីគ្រប់មុខវិជ្ជា..."
                    : "Search lessons across all subjects..."
                }
                className="w-full h-11 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-9 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-2xs transition"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Desktop View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5EAF0] dark:border-slate-800 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setViewMode("path");
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer",
                  viewMode === "path"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>{isKhmer ? "គន្លងសិក្សា" : "Learning Path"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setViewMode("syllabus");
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer",
                  viewMode === "syllabus"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{isKhmer ? "មាតិកាកម្មវិធីសិក្សា" : "Official Syllabus"}</span>
              </button>
            </div>
          </div>

          {/* Desktop Subject Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {ALL_MOEYS_SUBJECTS.map((sub) => {
              const isSelected = sub.slug === "all" ? isAllSubjects : activeSubjectSlug === sub.slug;
              const IconComp = sub.icon;
              return (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    navigate({ search: { grade: currentGrade, subject: sub.slug } });
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 shrink-0 cursor-pointer border",
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-black"
                      : "bg-white dark:bg-slate-900 border-[#E5EAF0] dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                  )}
                >
                  <IconComp className={cn("h-4 w-4", isSelected ? "text-white" : sub.iconColor)} />
                  <span>{isKhmer ? sub.name_km : sub.name_en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. MAIN CONTENT: DUOLINGO PATHWAY VS SYLLABUS VS BENTO GRID        */}
        {/* ================================================================== */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-0 space-y-5 pb-32 lg:pb-8">
          {searchFilteredLessons.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center space-y-3 mt-4">
              <div className="h-12 w-12 mx-auto rounded-2xl grid place-items-center bg-slate-50 dark:bg-slate-800 text-slate-400 shadow-2xs">
                <AlertCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {isKhmer ? "រកមិនឃើញមេរៀនដែលត្រូវគ្នាទេ" : "No matching lessons found"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isKhmer
                    ? "សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះផ្សេងទៀត"
                    : "Try searching with different keywords"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQ("")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs cursor-pointer transition active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{isKhmer ? "សម្អាតការស្វែងរក" : "Reset search"}</span>
              </button>
            </div>
          ) : isAllSubjects ? (
            /* ================================================================ */
            /* VIEW 1: VIBRANT 2-COLUMN GAMIFIED BENTO GRID FOR ALL SUBJECTS     */
            /* ================================================================ */
            <div className="space-y-6">
              {/* Gamified Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-5 sm:p-6 text-white shadow-md">
                <div className="absolute -right-8 -bottom-8 h-36 w-36 rounded-full border-4 border-white/10 pointer-events-none" />
                <div className="absolute right-12 -top-12 h-28 w-28 rounded-full border-4 border-white/10 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>{isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(currentGrade)}` : `Grade ${currentGrade}`}</span>
                      <span>•</span>
                      <span>
                        {currentGrade === 12
                          ? isKhmer ? "ត្រៀមបាក់ឌុប" : "Bac II Prep"
                          : currentGrade === 9
                            ? isKhmer ? "ត្រៀមឌីប្លូម" : "Brevet Prep"
                            : isKhmer ? "កម្មវិធីសិក្សាជាតិ" : "National Standard"}
                      </span>
                    </span>

                    <span className="text-xs font-black bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full">
                      {gradeLessons.filter((l) => completedIds.has(l.id)).length}/{gradeLessons.length} {isKhmer ? "បានចប់" : "Done"}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-black text-white leading-tight">
                      {isKhmer ? "រុករកគ្រប់មុខវិជ្ជា MoEYS" : "Explore MoEYS Curriculum"}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-1 max-w-xl">
                      {isKhmer
                        ? "ជ្រើសរើសមុខវិជ្ជាខាងក្រោម ដើម្បីបន្តដំណើរលើគន្លងសិក្សា និងសន្សំពិន្ទុចំណេះដឹង!"
                        : "Choose a subject below to advance along the winding learning path and earn XP!"}
                    </p>
                  </div>

                  {/* Stream Filter Toggle for Grade 11 & 12 */}
                  {currentGrade >= 11 && (
                    <div className="pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setStreamFilter("all");
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap",
                          streamFilter === "all"
                            ? "bg-white text-emerald-800 font-black shadow-xs"
                            : "bg-white/15 text-white hover:bg-white/25"
                        )}
                      >
                        {isKhmer ? "គ្រប់មុខវិជ្ជា" : "All Subjects"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setStreamFilter("science");
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap",
                          streamFilter === "science"
                            ? "bg-white text-emerald-800 font-black shadow-xs"
                            : "bg-white/15 text-white hover:bg-white/25"
                        )}
                      >
                        🔬 {isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science Stream"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setStreamFilter("social");
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap",
                          streamFilter === "social"
                            ? "bg-white text-emerald-800 font-black shadow-xs"
                            : "bg-white/15 text-white hover:bg-white/25"
                        )}
                      >
                        📚 {isKhmer ? "វិទ្យាសាស្ត្រសង្គម" : "Social Stream"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic 2-Column Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredBentoSubjects.map((sub) => {
                  const IconComp = sub.icon;
                  const isComplete = sub.completedLessons === sub.totalLessons && sub.totalLessons > 0;
                  const hasProgress = sub.completedLessons > 0;

                  return (
                    <div
                      key={sub.slug}
                      className="relative group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between gap-4 overflow-hidden"
                    >
                      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", sub.gradient)} />

                      <div className="space-y-3">
                        {/* Subject Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-12 w-12 rounded-2xl grid place-items-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-2xs",
                              sub.bgLight,
                              sub.iconColor
                            )}>
                              <IconComp className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                                {isKhmer ? sub.name_km : sub.name_en}
                              </h3>
                              <p className="text-xs text-slate-400 font-medium">
                                {isKhmer ? sub.name_en : sub.name_km}
                              </p>
                            </div>
                          </div>

                          {/* Progress capsule */}
                          <div className="text-right shrink-0">
                            <span className={cn(
                              "inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full border shadow-2xs",
                              isComplete
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                                : hasProgress
                                  ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200/80 dark:border-slate-700"
                            )}>
                              {sub.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span>{sub.completedLessons}/{sub.totalLessons} {isKhmer ? "មេរៀន" : "lessons"}</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              +{sub.totalLessons * 50} XP
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all duration-500 bg-gradient-to-r", sub.gradient)}
                              style={{ width: `${Math.max(sub.percent, 3)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3D Push-down Action Button */}
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          navigate({ search: { grade: currentGrade, subject: sub.slug } });
                        }}
                        className={cn(
                          "w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:translate-y-0.5 select-none",
                          hasProgress
                            ? "bg-emerald-600 hover:bg-emerald-500 border-b-4 border-emerald-800 active:border-b-0 text-white"
                            : "bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 text-white border-b-4 border-slate-950 dark:border-slate-300 active:border-b-0"
                        )}
                      >
                        {hasProgress ? (
                          <>
                            <Play className="h-3.5 w-3.5 fill-current" />
                            <span>{isKhmer ? "បន្តគន្លងសិក្សា (Continue)" : "Continue Learning"}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>{isKhmer ? "ចាប់ផ្តើមរៀន (Start Path)" : "Start Pathway"}</span>
                          </>
                        )}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : viewMode === "path" ? (
            /* ================================================================ */
            /* VIEW 2: AUTHENTIC DUOLINGO-STYLE WINDING STEPPING STONE PATHWAY   */
            /* ================================================================ */
            <div className="py-2">
              <LearningPath
                lessons={searchFilteredLessons}
                completedIds={completedIds}
                inProgressIds={inProgressIds}
                lang={isKhmer ? "km" : "en"}
                subjectTitle={isKhmer ? activeSubjectObj.name_km : activeSubjectObj.name_en}
                subjectSlug={activeSubjectSlug}
                grade={currentGrade}
              />
            </div>
          ) : (
            /* ================================================================ */
            /* VIEW 3: OFFICIAL MOEYS SYLLABUS & TEXTBOOK CHAPTER VIEW          */
            /* ================================================================ */
            <div className="py-2">
              <MoeysSyllabusView
                unitsWithLessons={unitsWithLessons}
                completedIds={completedIds}
                inProgressIds={inProgressIds}
                lang={isKhmer ? "km" : "en"}
                grade={currentGrade}
                subjectSlug={activeSubjectSlug}
                subjectNameKm={activeSubjectObj.name_km}
                subjectNameEn={activeSubjectObj.name_en}
              />
            </div>
          )}
        </div>
      </AppShell>

      {/* ================================================================== */}
      {/* GRADE PICKER BOTTOM SHEET                                           */}
      {/* ================================================================== */}
      {showGradeSheet && (
        <GradePickerSheet
          currentGrade={currentGrade}
          profileGrade={profileGrade}
          isKhmer={isKhmer}
          onSelect={handleGradeChange}
          onClose={() => setShowGradeSheet(false)}
        />
      )}
    </>
  );
}


