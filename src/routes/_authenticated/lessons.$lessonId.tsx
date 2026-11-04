import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCircle2, Clock, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { PageShell } from "@/components/page-shell";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";
import { toast } from "sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Lesson — ScienceKH" }] }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { user } = useAuth();
  const { lang } = useProfile();
  const isKhmer = lang === "km";
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*, subject:subjects(name_en, name_km), quiz:quizzes(id)")
        .eq("id", lessonId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id, lessonId],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("status")
        .eq("user_id", user!.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();
      return data;
    },
  });

  // Mark in-progress on view
  useEffect(() => {
    if (!user || !lesson) return;
    if (progress) return;
    supabase
      .from("lesson_progress")
      .upsert(
        { user_id: user.id, lesson_id: lessonId, status: "in_progress" },
        { onConflict: "user_id,lesson_id" },
      )
      .then(() => qc.invalidateQueries({ queryKey: ["progress", user.id, lessonId] }));
  }, [user, lesson, progress, lessonId, qc]);

  const complete = useMutation({
    mutationFn: async () => {
      if (!user || !lesson) throw new Error("Not ready");
      const { error: e1 } = await supabase
        .from("lesson_progress")
        .upsert(
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
        await supabase
          .from("profiles")
          .update({ xp: (p?.xp ?? 0) + (lesson.xp_reward ?? 0) })
          .eq("id", user.id);
      }
    },
    onSuccess: () => {
      toast.success(`+${lesson?.xp_reward ?? 0} XP`);
      qc.invalidateQueries({ queryKey: ["progress", user?.id, lessonId] });
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
      qc.invalidateQueries({ queryKey: ["in-progress", user?.id] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Could not save"),
  });

  if (isLoading) {
    return (
      <PageShell back="/lessons">
        <div className="grid place-items-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </PageShell>
    );
  }
  if (!lesson) {
    return (
      <PageShell back="/lessons" title="Not found">
        <p className="mx-auto mt-12 max-w-md px-6 text-center text-muted-foreground">
          This lesson is not available.
        </p>
      </PageShell>
    );
  }

  const body = isKhmer ? lesson.body_km : lesson.body_en;
  const title = isKhmer ? lesson.title_km : lesson.title_en;
  const summary = isKhmer ? lesson.summary_km : lesson.summary_en;
  const quizRaw = lesson.quiz as { id: string } | { id: string }[] | null | undefined;
  const quizId = Array.isArray(quizRaw) ? quizRaw[0]?.id : quizRaw?.id;

  return (
    <>
      <PageShell back="/lessons">
        <article className="mx-auto w-full max-w-md px-6 pt-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
            {lesson.subject ? (isKhmer ? lesson.subject.name_km : lesson.subject.name_en) : ""} ·{" "}
            {tx(lang, "grade")} {lesson.grade}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {summary && <p className="mt-2 text-muted-foreground">{summary}</p>}
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {lesson.estimated_minutes} {tx(lang, "minutes")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              +{lesson.xp_reward} {tx(lang, "xp")}
            </span>
            {progress?.status === "completed" && (
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {tx(lang, "completed")}
              </span>
            )}
          </div>

          {lesson.cover_image_url && (
            <img
              src={lesson.cover_image_url}
              alt=""
              className="mt-6 aspect-video w-full rounded-2xl border border-border object-cover"
            />
          )}

          <div className="prose prose-slate prose-headings:font-display prose-headings:tracking-tight prose-p:leading-relaxed mt-6 max-w-none text-foreground">
            {body ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">No content yet.</p>
            )}
          </div>

          <div className="mt-8 grid gap-2">
            {progress?.status !== "completed" && (
              <Button
                size="lg"
                className="h-12 text-base shadow-soft"
                onClick={() => complete.mutate()}
                disabled={complete.isPending}
              >
                {complete.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Mark as complete
              </Button>
            )}
            {quizId && (
              <Button
                size="lg"
                variant={progress?.status === "completed" ? "default" : "outline"}
                className="h-12 text-base"
                onClick={() => navigate({ to: "/lessons/$lessonId/quiz", params: { lessonId } })}
              >
                {tx(lang, "takeQuiz")}
              </Button>
            )}
            <Button asChild variant="ghost" className="h-12">
              <Link to="/tutor">{tx(lang, "askTutor")}</Link>
            </Button>
          </div>
        </article>
      </PageShell>
      <BottomNav />
    </>
  );
}
