// ==============================================================================
// ScienceKH — Unified Home Route (ទំព័រដើម ScienceKH)
// MOBILE (< 1024px): 100% Exact Original Mobile UI from HEAD (69da624)
// DESKTOP (>= 1024px): Modern SaaS 3-Column Academic Learning Dashboard
// ==============================================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import * as Icons from "lucide-react";
import {
  Flame,
  Sparkles,
  UserRound,
  BookOpen,
  ChevronRight,
  Heart,
  Coins,
  Compass,
  Trophy,
  Target,
  ArrowRight,
  Bot,
  Layers,
  Clock,
  FileText,
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  Globe2,
  Languages,
  Landmark,
  Laptop,
  Scale,
  GraduationCap,
  ChevronDown,
  Check,
  CheckCircle2,
} from "lucide-react";
import { GradePickerSheet } from "@/components/features/curriculum/grade-picker-sheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tx, toKhmerNumeral } from "@/lib/i18n";
import { AppShell } from "@/components/layout/app-shell";
import { HomeRightSidebarWidgets } from "@/components/layout/desktop-right-sidebar";
import { GuidedLearningPath } from "@/components/features/curriculum/guided-learning-path";
import { ALL_CURATED_LESSONS } from "@/lib/curriculum";
import { getStudentProgress } from "@/lib/gamification.functions";
import { sounds } from "@/lib/sound-effects";
import { checkAndTriggerStreakGuardian } from "@/lib/streak-guardian";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [{ title: "Home — ScienceKH" }] }),
  component: HomePage,
});

// Official MoEYS National Curriculum Disciplines (Desktop Grid)
const ALL_DISCIPLINES = [
  {
    slug: "mathematics",
    nameKm: "គណិតវិទ្យា",
    nameEn: "Mathematics",
    icon: Calculator,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900/50",
    progressColor: "bg-blue-600 dark:bg-blue-500",
    cardBorder: "hover:border-blue-400/50",
  },
  {
    slug: "physics",
    nameKm: "រូបវិទ្យា",
    nameEn: "Physics",
    icon: Atom,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-100 dark:border-purple-900/50",
    progressColor: "bg-purple-600 dark:bg-purple-500",
    cardBorder: "hover:border-purple-400/50",
  },
  {
    slug: "chemistry",
    nameKm: "គីមីវិទ្យា",
    nameEn: "Chemistry",
    icon: FlaskConical,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/50",
    progressColor: "bg-emerald-600 dark:bg-emerald-500",
    cardBorder: "hover:border-emerald-400/50",
  },
  {
    slug: "biology",
    nameKm: "ជីវវិទ្យា",
    nameEn: "Biology",
    icon: Dna,
    iconColor: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900/50",
    progressColor: "bg-teal-600 dark:bg-teal-500",
    cardBorder: "hover:border-teal-400/50",
  },
  {
    slug: "khmer",
    nameKm: "ភាសាខ្មែរ",
    nameEn: "Khmer Literature",
    icon: BookOpen,
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-100 dark:border-rose-900/50",
    progressColor: "bg-rose-600 dark:bg-rose-500",
    cardBorder: "hover:border-rose-400/50",
  },
  {
    slug: "history",
    nameKm: "ប្រវត្តិវិទ្យា",
    nameEn: "History",
    icon: Landmark,
    iconColor: "text-amber-700 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/50",
    progressColor: "bg-amber-600 dark:bg-amber-500",
    cardBorder: "hover:border-amber-400/50",
  },
  {
    slug: "geography",
    nameKm: "ភូមិវិទ្យា",
    nameEn: "Geography",
    icon: Compass,
    iconColor: "text-teal-700 dark:text-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900/50",
    progressColor: "bg-teal-600 dark:bg-teal-500",
    cardBorder: "hover:border-teal-400/50",
  },
  {
    slug: "english",
    nameKm: "ភាសាអង់គ្លេស",
    nameEn: "English",
    icon: Languages,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-900/50",
    progressColor: "bg-indigo-600 dark:bg-indigo-500",
    cardBorder: "hover:border-indigo-400/50",
  },
  {
    slug: "earth",
    nameKm: "ផែនដីវិទ្យា",
    nameEn: "Earth Science",
    icon: Globe2,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/50",
    progressColor: "bg-amber-600 dark:bg-amber-500",
    cardBorder: "hover:border-amber-400/50",
  },
  {
    slug: "ict",
    nameKm: "ព័ត៌មានវិទ្យា (ICT)",
    nameEn: "ICT & Computing",
    icon: Laptop,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-100 dark:border-cyan-900/50",
    progressColor: "bg-cyan-600 dark:bg-cyan-500",
    cardBorder: "hover:border-cyan-400/50",
  },
  {
    slug: "morality",
    nameKm: "សីលធម៌-ពលរដ្ឋ",
    nameEn: "Moral & Civics",
    icon: Scale,
    iconColor: "text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/50",
    progressColor: "bg-emerald-600 dark:bg-emerald-500",
    cardBorder: "hover:border-emerald-400/50",
  },
];

// Fallback MoEYS subjects for mobile tiles if database is slow
const DEFAULT_MOBILE_SUBJECTS = [
  { id: "sub-math", slug: "mathematics", name_en: "Mathematics", name_km: "គណិតវិទ្យា", icon: "Calculator", sort_order: 1 },
  { id: "sub-phys", slug: "physics", name_en: "Physics", name_km: "រូបវិទ្យា", icon: "Atom", sort_order: 2 },
  { id: "sub-chem", slug: "chemistry", name_en: "Chemistry", name_km: "គីមីវិទ្យា", icon: "FlaskConical", sort_order: 3 },
  { id: "sub-bio", slug: "biology", name_en: "Biology", name_km: "ជីវវិទ្យា", icon: "Dna", sort_order: 4 },
];

function HomePage() {
  const { user } = useAuth();
  const { data: profile, lang } = useProfile();
  const isKhmer = lang === "km";

  // Desktop active student grade & stream state
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedStream, setSelectedStream] = useState<"science" | "social">("science");

  const studentGrade = selectedGrade ?? profile?.grade ?? 12;

  // Streak Guardian: Check daily retention risk & dispatch 7:00 PM reminder if inactive
  useEffect(() => {
    if (profile) {
      checkAndTriggerStreakGuardian(
        profile.display_name || profile.full_name || (isKhmer ? "សិស្ស" : "Student"),
        profile.streak_days || 1,
        isKhmer
      );
    }
  }, [profile, isKhmer]);

  // Mobile subjects query (exact same query as HEAD)
  const { data: dbSubjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("id, slug, name_en, name_km, icon, sort_order")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const subjects = (dbSubjects && dbSubjects.length > 0) ? dbSubjects : DEFAULT_MOBILE_SUBJECTS;

  // Mobile in-progress lessons query (exact same query as HEAD)
  const { data: inProgress } = useQuery({
    queryKey: ["in-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("status, updated_at, lesson:lessons(id, title_en, title_km, estimated_minutes)")
        .eq("user_id", user!.id)
        .eq("status", "in_progress")
        .order("updated_at", { ascending: false })
        .limit(2);
      if (error) throw error;
      return data;
    },
  });

  // Real lesson progress from authentic database records
  const { data: studentProgress } = useQuery({
    queryKey: ["student-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      try {
        return await getStudentProgress({ data: undefined });
      } catch {
        return { completedIds: [] as string[], inProgressIds: [] as string[] };
      }
    },
    staleTime: 30_000,
  });

  const completedIdsSet = useMemo(
    () => new Set<string>(studentProgress?.completedIds ?? []),
    [studentProgress]
  );

  const inProgressIdsSet = useMemo(
    () => new Set<string>(studentProgress?.inProgressIds ?? []),
    [studentProgress]
  );

  const hasAnyCompleted = completedIdsSet.size > 0;

  // Active Lesson recommendation based on grade & progress
  const activeLesson = useMemo(() => {
    const gradeLessons = ALL_CURATED_LESSONS.filter((l) => l.grade === studentGrade);
    const nextIncomplete = gradeLessons.find((l) => !completedIdsSet.has(l.id));
    return nextIncomplete || gradeLessons[0] || ALL_CURATED_LESSONS[0];
  }, [studentGrade, completedIdsSet]);

  const greetingName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    (isKhmer ? "សិស្ស" : "Student");

  // Learning stats
  const currentXp = profile?.xp ?? 0;
  const streakDays = profile?.streak_days ?? 1;
  const dailyGoal = 50;
  const questProgress = Math.min(100, Math.round(((currentXp % dailyGoal) / dailyGoal) * 100));
  const todayProgressXp =
    currentXp % dailyGoal === 0 && currentXp > 0 ? dailyGoal : currentXp % dailyGoal;

  // Per-subject stats for current grade (Desktop)
  const subjectStats = useMemo(() => {
    const gradeLessons = ALL_CURATED_LESSONS.filter((l) => l.grade === studentGrade);
    return ALL_DISCIPLINES.map((sub) => {
      const subLessons = gradeLessons.filter((l) => l.subject.slug === sub.slug);
      const total = subLessons.length > 0 ? subLessons.length : 5;
      const completed = subLessons.filter((l) => completedIdsSet.has(l.id)).length;
      const percent = Math.min(100, Math.round((completed / total) * 100));
      return {
        ...sub,
        total,
        completed,
        percent,
      };
    });
  }, [studentGrade, completedIdsSet]);

  return (
    <>
      {/* ================================================================== */}
      {/* 1. MOBILE APP SCREEN (< 1024px / lg:hidden)                       */}
      {/* 100% Exact Original Mobile UI from HEAD (69da624)                 */}
      {/* Untouched, pristine mobile experience for phones and tablets       */}
      {/* ================================================================== */}
      <div className="lg:hidden">
        <MobileHomeScreen
          profile={profile}
          lang={lang}
          greetingName={greetingName}
          isKhmer={isKhmer}
          currentXp={currentXp}
          dailyGoal={dailyGoal}
          questProgress={questProgress}
          studentGrade={studentGrade}
          selectedStream={selectedStream}
          onGradeChange={(g) => setSelectedGrade(g)}
          onStreamChange={(s) => setSelectedStream(s)}
          activeLesson={activeLesson}
          hasAnyCompleted={hasAnyCompleted}
          subjectStats={subjectStats}
          streakDays={streakDays}
          todayXp={todayProgressXp}
          inProgress={inProgress}
        />
      </div>

      {/* ================================================================== */}
      {/* 2. DESKTOP WEB APPLICATION (>= 1024px / hidden lg:block)          */}
      {/* Premium 3-Column SaaS Learning Platform inspired by Duolingo flow  */}
      {/* ================================================================== */}
      <div className="hidden lg:block">
        <AppShell
          breadcrumbs={[{ label: isKhmer ? "ទំព័រដើម" : "Home" }]}
          activeGrade={studentGrade}
          onGradeChange={(g) => setSelectedGrade(g)}
          activeStream={selectedStream}
          onStreamChange={setSelectedStream}
          rightSidebar={
            <HomeRightSidebarWidgets
              studentGrade={studentGrade}
              studentStream={selectedStream}
              streakDays={streakDays}
              currentXp={currentXp}
              dailyGoal={dailyGoal}
              todayXp={todayProgressXp}
            />
          }
        >
          <div className="w-full space-y-6 pb-8">
            {/* SECTION A: PERSONAL ACADEMIC GREETING BANNER */}
            <section className="p-6 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <h1 className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    {isKhmer ? "សួស្តី" : "Hello"}, {greetingName} 👋
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isKhmer
                      ? "បន្តដំណើរការសិក្សា STEM ប្រចាំថ្ងៃរបស់អ្នកដើម្បីទទួលបាននិទ្ទេសល្អក្នុងការប្រឡងជាតិ"
                      : "Continue your daily MoEYS STEM learning progression for academic excellence"}
                  </p>
                </div>

                {/* Quick 1-Tap Action Pill Shortcuts */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/tutor"
                    onClick={() => sounds.playPop()}
                    className="px-3.5 py-2 rounded-xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-slate-50 dark:hover:bg-slate-850 transition active:scale-95 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    title={isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ" : "Ask Kru Vuth"}
                  >
                    <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth"}</span>
                  </Link>

                  <Link
                    to="/reference"
                    search={{ grade: studentGrade }}
                    onClick={() => sounds.playPop()}
                    className="px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:border-emerald-400 transition active:scale-95 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    title={isKhmer ? "បណ្ណាល័យរូបមន្ត & និមិត្តសញ្ញា" : "Study References"}
                  >
                    <Layers className="h-4 w-4 text-emerald-600" />
                    <span>{isKhmer ? "បណ្ណាល័យយោង" : "References"}</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION B: UP NEXT / PRIMARY ACTION TARGET CARD */}
            <section className="rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isKhmer ? "មេរៀនបន្ទាប់" : "Up Next"}
                </span>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                  <span>
                    {isKhmer ? activeLesson.subject.name_km : activeLesson.subject.name_en}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                      {activeLesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"}
                    </span>
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                  {isKhmer ? activeLesson.title_km : activeLesson.title_en}
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {isKhmer ? activeLesson.summary_km : activeLesson.summary_en}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                  <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>+{activeLesson.xp_reward} XP</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>{isKhmer ? "៥ លំហាត់អនុវត្ត" : "5 Exercises"}</span>
                </span>
              </div>

              <div className="pt-1">
                <Link
                  to="/lessons/$lessonId"
                  params={{ lessonId: activeLesson.id }}
                  onClick={() => sounds.playPop()}
                  className="h-12 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition shadow-xs hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.99] select-none cursor-pointer"
                >
                  <BookOpen className="h-4.5 w-4.5" />
                  <span>
                    {hasAnyCompleted
                      ? isKhmer
                        ? "បន្តការសិក្សាមេរៀននេះ"
                        : "Continue Lesson"
                      : isKhmer
                        ? `ចាប់ផ្តើមរៀន (${activeLesson.estimated_minutes} នាទី)`
                        : `Start Lesson (${activeLesson.estimated_minutes} mins)`}
                  </span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>
              </div>
            </section>

            {/* SECTION C: GUIDED LINEAR LEARNING PATH */}
            <GuidedLearningPath
              grade={studentGrade}
              stream={selectedStream}
              completedIds={completedIdsSet}
              inProgressIds={inProgressIdsSet}
              isKhmer={isKhmer}
            />

            {/* SECTION D: MOEYS CURRICULUM DISCIPLINES GRID */}
            <section className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
                    <span>
                      {isKhmer
                        ? `មុខវិជ្ជាកម្មវិធីជាតិ (ថ្នាក់ទី ${toKhmerNumeral(studentGrade)})`
                        : `Curriculum Subjects (Grade ${studentGrade})`}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isKhmer
                      ? "ជ្រើសរើសមុខវិជ្ជាដើម្បីរុករកមេរៀន និងលំហាត់តាមលំដាប់លំដោយ"
                      : "Select a discipline to browse sequential chapters, lessons and exercises"}
                  </p>
                </div>
                <Link
                  to="/lessons"
                  search={{ grade: studentGrade }}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 group"
                >
                  <span>{isKhmer ? "មើលទាំងអស់" : "View all"}</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjectStats.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.slug}
                      to="/lessons"
                      search={{ subject: sub.slug, grade: studentGrade }}
                      onClick={() => sounds.playPop()}
                      className={cn(
                        "group p-3.5 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition duration-150 flex flex-col justify-between space-y-2 cursor-pointer",
                        sub.cardBorder
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform",
                            sub.iconBg
                          )}
                        >
                          <Icon className={cn("h-4.5 w-4.5", sub.iconColor)} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">
                          {sub.percent}%
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                          {isKhmer ? sub.nameKm : sub.nameEn}
                        </h3>
                        <p className="text-[10px] text-slate-400">
                          {sub.completed}/{sub.total} {isKhmer ? "មេរៀន" : "lessons"}
                        </p>
                      </div>

                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all duration-300", sub.progressColor)}
                          style={{ width: `${sub.percent}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </AppShell>
      </div>
    </>
  );
}

// ==============================================================================
// ScienceKH — Mobile Home Screen (ទំព័រដើមកម្មវិធីទូរស័ព្ទ)
// Duolingo & Apple HIG-grade academic experience:
// 1. Safe-area gamification status bar with tactile stat capsules
// 2. Clear academic orientation (Grade & MoEYS stream + 1-tap power tools)
// 3. Today's primary recommended Target Lesson with 3D tactile push-down CTA
// 4. 7-day study habit streak rhythm with daily XP goal progress
// 5. Official MoEYS core curriculum subjects bento with real progress bars
// 6. National Bac II / Brevet exam countdown and archive card
// 7. Kru Vuth STEM Mentor quick prompt card
// ==============================================================================

const WEEK_DAYS = [
  { key: "mon", labelKm: "ច", labelEn: "M" },
  { key: "tue", labelKm: "អ", labelEn: "T" },
  { key: "wed", labelKm: "ព", labelEn: "W" },
  { key: "thu", labelKm: "ព្រ", labelEn: "T" },
  { key: "fri", labelKm: "សុ", labelEn: "F" },
  { key: "sat", labelKm: "ស", labelEn: "S" },
  { key: "sun", labelKm: "អា", labelEn: "S" },
];

function MobileHomeScreen({
  profile,
  lang,
  greetingName,
  isKhmer,
  currentXp,
  dailyGoal,
  questProgress,
  studentGrade,
  selectedStream,
  onGradeChange,
  onStreamChange,
  activeLesson,
  hasAnyCompleted,
  subjectStats,
  streakDays,
  todayXp,
  inProgress,
}: {
  profile: any;
  lang: any;
  greetingName: string;
  isKhmer: boolean;
  currentXp: number;
  dailyGoal: number;
  questProgress: number;
  studentGrade: number;
  selectedStream: "science" | "social";
  onGradeChange: (grade: number) => void;
  onStreamChange: (stream: "science" | "social") => void;
  activeLesson: any;
  hasAnyCompleted: boolean;
  subjectStats: any[];
  streakDays: number;
  todayXp: number;
  inProgress: any;
}) {
  const [showGradeSheet, setShowGradeSheet] = useState(false);

  // 7-Day Habit Tracker dynamic array
  const dynamicWeekDays = useMemo(() => {
    return WEEK_DAYS.map((day, i) => ({
      ...day,
      completed: i < Math.min(streakDays, 7),
      isToday: i === Math.min(Math.max(0, streakDays - 1), 6),
    }));
  }, [streakDays]);

  const goalPercent = Math.min(100, Math.round((todayXp / dailyGoal) * 100));

  // Top core subjects for current grade (first 6 subjects)
  const coreSubjects = useMemo(() => {
    return subjectStats.slice(0, 6);
  }, [subjectStats]);

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-36">
        {/* Sticky Top Bar: Brand (Logo + ScienceKH) + Gamification Stats */}
        <header
          className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all shadow-2xs"
          style={{
            paddingTop: "max(2.75rem, calc(env(safe-area-inset-top, 0px) + 0.35rem))",
          }}
        >
          <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-4 sm:px-6">
            {/* BRAND: LOGO & APP NAME */}
            <Link
              to="/home"
              onClick={() => sounds.playPop()}
              className="flex items-center gap-2.5 transition active:scale-95 group cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Atom className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                  Science<span className="text-emerald-600 dark:text-emerald-400">KH</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none">
                  {isKhmer ? "អប់រំជាតិ MoEYS" : "MoEYS STEM"}
                </span>
              </div>
            </Link>

            {/* GAMIFICATION STATS & PROFILE */}
            <div className="flex items-center gap-3 shrink-0 text-xs font-bold">
              {/* Day Streak */}
              <div
                className="flex items-center gap-1 text-orange-600 dark:text-orange-400"
                title={isKhmer ? `${streakDays} ថ្ងៃបន្តបន្ទាប់` : `${streakDays} days streak`}
              >
                <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
                <span>{streakDays}</span>
              </div>

              {/* XP */}
              <div
                className="flex items-center gap-1 text-amber-600 dark:text-amber-400"
                title="XP"
              >
                <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>{currentXp}</span>
              </div>

              {/* Hearts */}
              <div
                className="flex items-center gap-1 text-rose-500"
                title="Hearts"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>5</span>
              </div>

              {/* Profile Avatar link */}
              <Link
                to="/profile"
                onClick={() => sounds.playPop()}
                className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition cursor-pointer"
                aria-label="Open profile"
              >
                <UserRound className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-md px-4 sm:px-6 space-y-4 pt-3">
          {/* SECTION 1: STUDENT GREETING & ACADEMIC DIRECTION (MINIMALIST & AIRY) */}
          <section className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {isKhmer ? "សូមស្វាគមន៍មកកាន់" : "Welcome back"}
              </p>
              <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {greetingName} 👋
              </h1>
            </div>

            {/* Sleek Minimalist Grade Switcher */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setShowGradeSheet(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 cursor-pointer shrink-0"
              title={isKhmer ? "ចុចដើម្បីប្តូរថ្នាក់រៀន" : "Tap to change grade"}
            >
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {studentGrade >= 11
                  ? isKhmer
                    ? `ថ្នាក់ទី ${toKhmerNumeral(studentGrade)} · ${selectedStream === "science" ? "វិទ្យាសាស្ត្រពិត" : "សង្គម"}`
                    : `Grade ${studentGrade} · ${selectedStream === "science" ? "Science" : "Social"}`
                  : isKhmer
                    ? `ថ្នាក់ទី ${toKhmerNumeral(studentGrade)}`
                    : `Grade ${studentGrade}`}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </section>

          {/* SECTION 2: TODAY'S PRIMARY TARGET LESSON (COMPACT & ULTRA-CLEAR HERO BLOCK) */}
          <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs space-y-2.5">
            {/* Clear Status & Subject Row */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                  {isKhmer ? "មេរៀនបន្ទាប់" : "Up Next"}
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300 text-xs truncate">
                  {isKhmer ? activeLesson.subject.name_km : activeLesson.subject.name_en}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-slate-400 text-xs shrink-0">
                  {isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(studentGrade)}` : `Grade ${studentGrade}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs shrink-0 font-medium text-slate-400">
                <span>{activeLesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">+{activeLesson.xp_reward} XP</span>
              </div>
            </div>

            {/* Title & Concise 1-Line Preview */}
            <div className="space-y-0.5">
              <h2 className="font-display text-base font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                {isKhmer ? activeLesson.title_km : activeLesson.title_en}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed font-normal">
                {isKhmer ? activeLesson.summary_km : activeLesson.summary_en}
              </p>
            </div>

            {/* Tactile 3D Action Button (Compact & Clickable) */}
            <div className="pt-0.5">
              <Link
                to="/lessons/$lessonId"
                params={{ lessonId: activeLesson.id }}
                onClick={() => sounds.playPop()}
                className="h-10.5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition border-b-[3px] border-emerald-800 active:border-b-0 active:translate-y-0.5 shadow-xs flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <BookOpen className="h-4 w-4" />
                <span>
                  {hasAnyCompleted
                    ? isKhmer
                      ? "បន្តការរៀន"
                      : "Continue Lesson"
                    : isKhmer
                      ? "ចាប់ផ្តើមរៀន"
                      : "Start Lesson"}
                </span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </section>

          {/* SECTION 3: DAILY STUDY HABIT & 7-DAY STREAK RHYTHM */}
          <section className="p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 border border-amber-200/60 dark:border-amber-800/60">
                  <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 dark:text-white block leading-tight">
                    {isKhmer ? "ទម្លាប់សិក្សាប្រចាំថ្ងៃ" : "Daily Study Habit"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    {streakDays} {isKhmer ? "ថ្ងៃជាប់គ្នា · បានការពារ" : "days streak · protected"}
                  </span>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-200/70 dark:border-emerald-800/60">
                +{todayXp}/{dailyGoal} XP
              </span>
            </div>

            {/* Goal Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
                  style={{ width: `${goalPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>{isKhmer ? "គោលដៅ 50 XP ថ្ងៃនេះ" : "Today's 50 XP Goal"}</span>
                <span>{goalPercent}%</span>
              </div>
            </div>

            {/* 7-Day Habit Tracker Grid */}
            <div className="grid grid-cols-7 gap-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
              {dynamicWeekDays.map((day) => (
                <div key={day.key} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400">
                    {isKhmer ? day.labelKm : day.labelEn}
                  </span>
                  <div
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full text-xs transition-all",
                      day.completed
                        ? "bg-emerald-600 text-white shadow-2xs font-bold"
                        : day.isToday
                          ? "border-2 border-emerald-600 text-emerald-600 font-black bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    )}
                  >
                    {day.completed ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: MOEYS CURRICULUM CORE SUBJECTS (BENTO GRID) */}
          <section className="space-y-3">
            <div className="flex items-end justify-between px-1">
              <div>
                <h2 className="font-display text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span>
                    {isKhmer
                      ? `មុខវិជ្ជាស្នូល ថ្នាក់ទី ${toKhmerNumeral(studentGrade)}`
                      : `Core Subjects · Grade ${studentGrade}`}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isKhmer ? "កម្មវិធីសិក្សាជាតិក្រសួងអប់រំ MoEYS" : "Official MoEYS National Curriculum"}
                </p>
              </div>

              <Link
                to="/lessons"
                search={{ grade: studentGrade }}
                onClick={() => sounds.playPop()}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>{isKhmer ? "មើលទាំងអស់" : "View all"}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {coreSubjects.map((sub: any) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.slug}
                    to="/lessons"
                    search={{ subject: sub.slug, grade: studentGrade }}
                    onClick={() => sounds.playPop()}
                    className={cn(
                      "p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition duration-150 flex flex-col justify-between space-y-2.5 cursor-pointer active:scale-[0.98]",
                      sub.cardBorder
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center border",
                          sub.iconBg
                        )}
                      >
                        <Icon className={cn("h-4 w-4", sub.iconColor)} />
                      </div>
                      <span className="text-[11px] font-black text-slate-400">
                        {sub.percent}%
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {isKhmer ? sub.nameKm : sub.nameEn}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {sub.completed}/{sub.total} {isKhmer ? "មេរៀន" : "lessons"}
                      </p>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all duration-300", sub.progressColor)}
                        style={{ width: `${sub.percent}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* SECTION 5: NATIONAL EXAM READINESS / MILESTONE CARD */}
          <section className="p-4.5 rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white grid place-items-center shrink-0 shadow-2xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/50 px-2 py-0.5 rounded-md">
                  {studentGrade === 12
                    ? isKhmer ? "ត្រៀមបាក់ឌុប ២០២៦" : "Bac II 2026"
                    : studentGrade === 9
                      ? isKhmer ? "ត្រៀមឌីប្លូម ២០២៦" : "Brevet 2026"
                      : isKhmer ? "ស្ទង់កម្រិតសមត្ថភាព MoEYS" : "National Assessment"}
                </span>
                <h3 className="font-display text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">
                  {studentGrade === 12
                    ? isKhmer ? "ការប្រឡងបាក់ឌុបថ្នាក់ជាតិ" : "National Bac II Examination Archive"
                    : studentGrade === 9
                      ? isKhmer ? "ការប្រឡងឌីប្លូមថ្នាក់ជាតិ" : "National Brevet Examination Archive"
                      : isKhmer ? "បណ្ណាល័យវិញ្ញាសា និងលំហាត់គំរូ" : "National Exam Papers & Question Bank"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isKhmer
                    ? "អនុវត្តវិញ្ញាសាប្រឡងចាស់ៗ ២០១១–២០២៤ ជាមួយនឹងអត្រាកំណែផ្លូវការ"
                    : "Practice official historical exam papers (2011–2024) with complete answer keys"}
                </p>
              </div>
            </div>

            <Link
              to="/explore"
              onClick={() => sounds.playPop()}
              className="h-10 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition shadow-2xs flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{isKhmer ? "មើលវិញ្ញាសា និងអត្រាកំណែ →" : "View Exam Archive & Keys →"}</span>
            </Link>
          </section>


          {/* SECTION 7: IN-PROGRESS LESSONS (IF ANY) */}
          {inProgress && inProgress.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="font-display text-sm font-black text-slate-900 dark:text-white px-1">
                {tx(lang, "continueLearning")}
              </h2>
              <div className="space-y-2">
                {inProgress.map((p: any) => {
                  const lesson = p.lesson as {
                    id: string;
                    title_en: string;
                    title_km: string;
                    estimated_minutes: number;
                  } | null;
                  if (!lesson) return null;
                  return (
                    <Link
                      key={lesson.id}
                      to="/lessons/$lessonId"
                      params={{ lessonId: lesson.id }}
                      onClick={() => sounds.playPop()}
                      className="flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-2xs hover:shadow-xs transition active:scale-[0.99] cursor-pointer"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                          {isKhmer ? lesson.title_km : lesson.title_en}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {lesson.estimated_minutes} {tx(lang, "minutes")} · {tx(lang, "inProgress")}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Grade Picker Bottom Sheet for Mobile */}
      {showGradeSheet && (
        <GradePickerSheet
          currentGrade={studentGrade}
          profileGrade={profile?.grade ?? 12}
          isKhmer={isKhmer}
          onSelect={(g) => {
            sounds.playPop();
            onGradeChange(g);
            setShowGradeSheet(false);
          }}
          onClose={() => setShowGradeSheet(false)}
        />
      )}

      {/* Thumb-Reachable Mobile Bottom Navigation */}
      <BottomNav />
    </>
  );
}
