import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Flame, Sparkles, UserRound, BookOpen, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { BottomNav } from "@/components/bottom-nav";
import { tx } from "@/lib/i18n";

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
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const greetingName = profile?.display_name ?? user?.email?.split("@")[0] ?? "student";
  const isKhmer = lang === "km";

  return (
    <>
      <main className="min-h-screen bg-background pb-24">
        <header className="mx-auto w-full max-w-md px-6 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isKhmer ? "សួស្តី" : "Hello"},</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight">{greetingName}</h1>
            </div>
            <Link
              to="/profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft hover:bg-muted"
              aria-label="Open profile"
            >
              <UserRound className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <StatCard icon={<Sparkles className="h-4 w-4" />} label={tx(lang, "xp")} value={profile?.xp ?? 0} />
            <StatCard icon={<Flame className="h-4 w-4" />} label="Day streak" value={profile?.streak_days ?? 0} />
          </div>
        </header>

        {inProgress && inProgress.length > 0 && (
          <section className="mx-auto w-full max-w-md px-6 pt-8">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              {tx(lang, "continueLearning")}
            </h2>
            <div className="mt-3 space-y-2">
              {inProgress.map((p) => {
                const lesson = p.lesson as { id: string; title_en: string; title_km: string; estimated_minutes: number } | null;
                if (!lesson) return null;
                return (
                  <Link
                    key={lesson.id}
                    to="/lessons/$lessonId"
                    params={{ lessonId: lesson.id }}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{isKhmer ? lesson.title_km : lesson.title_en}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {lesson.estimated_minutes} {tx(lang, "minutes")} · {tx(lang, "inProgress")}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mx-auto w-full max-w-md px-6 pt-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">{tx(lang, "subjects")}</h2>
            <Link to="/lessons" className="text-sm font-medium text-primary hover:underline">
              {tx(lang, "lessons")} →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
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

        <section className="mx-auto mt-8 w-full max-w-md px-6">
          <Link
            to="/tutor"
            className="flex items-center justify-between rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground shadow-elevated"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-80">AI Tutor</p>
              <p className="mt-1 font-display text-lg font-semibold">{tx(lang, "askTutor")}</p>
            </div>
            <Sparkles className="h-7 w-7 opacity-90" />
          </Link>
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{value}</p>
    </div>
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
  const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] ?? BookOpen;
  const toneClasses = tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent/10 text-accent";
  return (
    <Link
      to={to}
      search={search}
      className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneClasses}`}>
        <IconComp className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold tracking-tight">{label}</p>
        <p className="text-xs text-muted-foreground">Explore</p>
      </div>
    </Link>
  );
}
