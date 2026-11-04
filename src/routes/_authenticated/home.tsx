import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [{ title: "Home — ScienceKH" }] }),
  component: HomePage,
});

function HomePage() {
  const { user } = useAuth();
  const { data: profile, lang } = useProfile();

  const { data: subjects } = useQuery({
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

  const greetingName = profile?.display_name ?? user?.email?.split("@")[0] ?? "Student";
  const isKhmer = lang === "km";

  // Calculate daily quest progress (e.g. 50 XP goal)
  const currentXp = profile?.xp ?? 0;
  const dailyGoal = 50;
  const questProgress = Math.min(100, Math.round(((currentXp % dailyGoal) / dailyGoal) * 100));

  return (
    <>
      <main className="min-h-screen bg-background pb-28">
        {/* Duolingo Sticky Top Gamification Status Bar */}
        <div className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-6">
            {/* Day Streak */}
            <div className="flex items-center gap-1.5 font-bold text-orange-500">
              <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
              <span className="font-display text-sm">{profile?.streak_days ?? 0}</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 font-bold text-amber-500">
              <Sparkles className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-display text-sm">{profile?.xp ?? 0} XP</span>
            </div>

            {/* Gems / Coins */}
            <div className="flex items-center gap-1.5 font-bold text-cyan-500">
              <Coins className="h-4 w-4 fill-cyan-500 text-cyan-500" />
              <span className="font-display text-sm">{profile?.coins ?? 100}</span>
            </div>

            {/* Hearts (Full 5 hearts) */}
            <div className="flex items-center gap-1.5 font-bold text-rose-500">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
              <span className="font-display text-sm">5</span>
            </div>

            {/* Profile Avatar link */}
            <Link
              to="/profile"
              className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-muted"
              aria-label="Open profile"
            >
              <UserRound className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md px-6 pt-6">
          {/* Greeting */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isKhmer ? "សូមស្វាគមន៍មកកាន់ ScienceKH" : "Welcome back to ScienceKH"}
            </p>
            <h1 className="mt-0.5 font-display text-2xl font-black tracking-tight text-foreground">
              {isKhmer ? "សួស្តី" : "Hello"}, {greetingName} 👋
            </h1>
          </div>

          {/* Primary CTA: Jump into Duolingo Learning Path */}
          <div className="mt-5 rounded-3xl border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-xl dark:border-emerald-500/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-100 backdrop-blur">
                  <Compass className="h-3.5 w-3.5" />
                  {isKhmer ? "ផ្លូវរៀនស្ទាត់ជំនាញ" : "STEM Path"}
                </span>
                <h2 className="mt-2 font-display text-xl font-black leading-tight text-white">
                  {isKhmer ? "បន្តដំណើររៀនវិទ្យាសាស្ត្រ" : "Continue Your Science Quest"}
                </h2>
                <p className="mt-1 text-xs text-emerald-100/90 leading-relaxed">
                  {isKhmer
                    ? "ឆ្លងកាត់មេរៀននីមួយៗ ឈ្នះ XP និងរក្សាកម្រិតពិន្ទុរបស់អ្នក!"
                    : "Step along the path, earn XP, and protect your daily streak!"}
                </p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 text-white shadow backdrop-blur">
                <Trophy className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-4">
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-2xl border-b-4 border-emerald-800 bg-white font-black text-emerald-700 shadow-md transition active:border-b-0 active:translate-y-1 hover:bg-emerald-50"
              >
                <Link to="/lessons">
                  {isKhmer ? "ចូលទៅកាន់ផ្លូវរៀន (Learning Path)" : "Jump into Learning Path"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Daily Quest Card */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {isKhmer ? "បេសកកម្មប្រចាំថ្ងៃ" : "Daily Quest"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isKhmer ? "រកឱ្យបាន 50 XP ថ្ងៃនេះ" : "Earn 50 XP today"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                +{currentXp % dailyGoal}/{dailyGoal} XP
              </span>
            </div>
            <div className="mt-3">
              <Progress value={questProgress} className="h-2 rounded-full" />
            </div>
          </div>

          {/* Continue In-Progress Lessons */}
          {inProgress && inProgress.length > 0 && (
            <section className="mt-6">
              <h2 className="font-display text-lg font-bold tracking-tight">
                {tx(lang, "continueLearning")}
              </h2>
              <div className="mt-3 space-y-2">
                {inProgress.map((p) => {
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
                      className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {isKhmer ? lesson.title_km : lesson.title_en}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {lesson.estimated_minutes} {tx(lang, "minutes")} · {tx(lang, "inProgress")}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* MoEYS High School Science Subjects */}
          <section className="mt-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight">
                  {tx(lang, "subjects")} (Grade 7–12)
                </h2>
                <p className="text-xs text-muted-foreground">
                  {isKhmer ? "កម្មវិធីសិក្សាជាតិក្រសួងអប់រំ" : "National MoEYS Curriculum"}
                </p>
              </div>
              <Link to="/lessons" className="text-xs font-bold text-primary hover:underline">
                {isKhmer ? "មើលទាំងអស់" : "View all"} →
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {(subjects ?? []).map((s, i) => (
                <SubjectTile
                  key={s.id}
                  to="/lessons"
                  search={{ subject: s.slug }}
                  iconName={s.icon}
                  label={isKhmer ? s.name_km : s.name_en}
                  tone={i % 2 === 0 ? "primary" : "accent"}
                />
              ))}
            </div>
          </section>

          {/* AI Science Tutor Banner */}
          <section className="mt-6">
            <Link
              to="/tutor"
              className="flex items-center justify-between rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-accent p-4 text-primary-foreground shadow-md transition hover:-translate-y-0.5"
            >
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                  <Sparkles className="h-3 w-3" /> AI Tutor
                </span>
                <p className="mt-1 font-display text-base font-bold">
                  {tx(lang, "askTutor")}
                </p>
                <p className="text-xs opacity-90">
                  {isKhmer ? "សួរពីលំហាត់រូបវិទ្យា គីមីវិទ្យា ឬគណិតវិទ្យា" : "Ask physics, chem or math questions"}
                </p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
            </Link>
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function SubjectTile({
  to,
  search,
  iconName,
  label,
  tone,
}: {
  to: "/lessons";
  search: { subject: string };
  iconName: string;
  label: string;
  tone: "primary" | "accent";
}) {
  const IconComp =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] ??
    BookOpen;
  const toneClasses =
    tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent/10 text-accent";

  return (
    <Link
      to={to}
      search={search}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-3.5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${toneClasses}`}>
        <IconComp className="h-4 w-4" />
      </div>
      <div>
        <p className="font-display text-base font-bold tracking-tight leading-tight">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Grade 7–12</p>
      </div>
    </Link>
  );
}
