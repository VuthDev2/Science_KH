import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Clock, Sparkles, Map, List, Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { BottomNav } from "@/components/bottom-nav";
import { Input } from "@/components/ui/input";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DuolingoPath, LessonNode } from "@/components/duolingo-path";

type Search = { subject?: string; grade?: number };

export const Route = createFileRoute("/_authenticated/lessons/")({
  head: () => ({ meta: [{ title: "Learning Path — ScienceKH" }] }),
  validateSearch: (s: Record<string, unknown>): Search => ({
    subject: typeof s.subject === "string" ? s.subject : undefined,
    grade: typeof s.grade === "number" ? s.grade : undefined,
  }),
  component: LessonsIndex,
});

function LessonsIndex() {
  const { subject, grade } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { user } = useAuth();
  const { lang } = useProfile();
  const isKhmer = lang === "km";
  const [q, setQ] = useState("");
  const [viewMode, setViewMode] = useState<"path" | "list">("path");

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("id, slug, name_en, name_km")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const currentSubject = useMemo(
    () => subjects?.find((s) => s.slug === subject),
    [subjects, subject],
  );

  const subjectId = currentSubject?.id;

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons", subjectId ?? null, grade ?? null],
    queryFn: async () => {
      let query = supabase
        .from("lessons")
        .select(
          "id, title_en, title_km, summary_en, summary_km, grade, estimated_minutes, xp_reward, cover_image_url, sort_order, subject:subjects(slug, name_en, name_km)",
        )
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (subjectId) query = query.eq("subject_id", subjectId);
      if (grade) query = query.eq("grade", grade);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // User progress for completed and in-progress lessons
  const { data: userProgress } = useQuery({
    queryKey: ["user-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id, status")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data;
    },
  });

  const completedIds = useMemo(() => {
    return new Set(
      (userProgress ?? [])
        .filter((p) => p.status === "completed")
        .map((p) => p.lesson_id),
    );
  }, [userProgress]);

  const inProgressIds = useMemo(() => {
    return new Set(
      (userProgress ?? [])
        .filter((p) => p.status === "in_progress")
        .map((p) => p.lesson_id),
    );
  }, [userProgress]);

  const filtered = useMemo(() => {
    if (!q.trim()) return lessons ?? [];
    const needle = q.toLowerCase();
    return (lessons ?? []).filter(
      (l) =>
        l.title_en.toLowerCase().includes(needle) ||
        l.title_km.toLowerCase().includes(needle) ||
        (l.summary_en ?? "").toLowerCase().includes(needle),
    );
  }, [lessons, q]);

  const subjectTitle = currentSubject
    ? isKhmer
      ? currentSubject.name_km
      : currentSubject.name_en
    : undefined;

  return (
    <>
      <main className="min-h-screen bg-background pb-24">
        <header className="mx-auto w-full max-w-md px-6 pt-8">
          {/* Header Title & View Toggle */}
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl font-black tracking-tight">
              {viewMode === "path"
                ? isKhmer
                  ? "ផ្លូវសិក្សា"
                  : "Learning Path"
                : tx(lang, "lessons")}
            </h1>

            {/* Toggle Switch between Duolingo Path and Flat List */}
            <div className="flex rounded-xl border border-border bg-card p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("path")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition",
                  viewMode === "path"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Path view"
              >
                <Compass className="h-3.5 w-3.5" />
                {isKhmer ? "ផ្លូវ" : "Path"}
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="List view"
              >
                <List className="h-3.5 w-3.5" />
                {isKhmer ? "បញ្ជី" : "List"}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tx(lang, "search")}
              className="h-11 pl-9 rounded-xl"
            />
          </div>

          {/* Subject Pills */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Chip active={!subject} onClick={() => navigate({ search: { grade } })}>
              {isKhmer ? "ទាំងអស់" : "All"}
            </Chip>
            {(subjects ?? []).map((s) => (
              <Chip
                key={s.id}
                active={subject === s.slug}
                onClick={() => navigate({ search: { subject: s.slug, grade } })}
              >
                {isKhmer ? s.name_km : s.name_en}
              </Chip>
            ))}
          </div>

          {/* Grade Level Pills (Grade 7 to 12) */}
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Chip active={!grade} onClick={() => navigate({ search: { subject } })}>
              {tx(lang, "allGrades")}
            </Chip>
            {[7, 8, 9, 10, 11, 12].map((g) => (
              <Chip
                key={g}
                active={grade === g}
                onClick={() => navigate({ search: { subject, grade: g } })}
              >
                {tx(lang, "grade")} {g}
              </Chip>
            ))}
          </div>
        </header>

        {/* Content View */}
        {isLoading ? (
          <div className="mx-auto mt-8 w-full max-w-md px-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md px-6 text-center">
            <p className="text-sm text-muted-foreground">{tx(lang, "noLessons")}</p>
          </div>
        ) : viewMode === "path" ? (
          /* Duolingo Winding Snake Path */
          <DuolingoPath
            lessons={filtered as LessonNode[]}
            completedIds={completedIds}
            inProgressIds={inProgressIds}
            lang={lang}
            subjectTitle={subjectTitle}
          />
        ) : (
          /* Standard List View */
          <section className="mx-auto w-full max-w-md px-6 pt-6">
            <ul className="space-y-3">
              {filtered.map((l) => (
                <li key={l.id}>
                  <Link
                    to="/lessons/$lessonId"
                    params={{ lessonId: l.id }}
                    className="block rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {l.subject ? (isKhmer ? l.subject.name_km : l.subject.name_en) : ""} ·{" "}
                          {tx(lang, "grade")} {l.grade}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-tight">
                          {isKhmer ? l.title_km : l.title_en}
                        </h3>
                        {(isKhmer ? l.summary_km : l.summary_en) && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {isKhmer ? l.summary_km : l.summary_en}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 font-medium">
                            <Clock className="h-3.5 w-3.5" />
                            {l.estimated_minutes} {tx(lang, "minutes")}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                            <Sparkles className="h-3.5 w-3.5" />
                            +{l.xp_reward || 30} {tx(lang, "xp")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <BottomNav />
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold transition",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
