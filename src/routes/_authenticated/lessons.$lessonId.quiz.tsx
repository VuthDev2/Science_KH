import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/lessons/$lessonId/quiz")({
  head: () => ({ meta: [{ title: "Quiz — ScienceKH" }] }),
  component: QuizPage,
});

type Question = {
  id: string;
  prompt_en: string;
  prompt_km: string;
  options_en: string[];
  options_km: string[];
  correct_index: number;
  explanation_en: string | null;
  explanation_km: string | null;
};

function QuizPage() {
  const { lessonId } = Route.useParams();
  const { user } = useAuth();
  const { lang } = useProfile();
  const isKhmer = lang === "km";
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["quiz", lessonId],
    queryFn: async () => {
      const { data: quiz, error } = await supabase
        .from("quizzes")
        .select("id, title_en, title_km, pass_score, questions:quiz_questions(*)")
        .eq("lesson_id", lessonId)
        .maybeSingle();
      if (error) throw error;
      return quiz;
    },
  });

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const submit = useMutation({
    mutationFn: async (finalAnswers: number[]) => {
      if (!user || !data) throw new Error("Not ready");
      const questions = (data.questions ?? []) as Question[];
      const score = finalAnswers.reduce(
        (acc, a, i) => acc + (a === questions[i].correct_index ? 1 : 0),
        0,
      );
      const total = questions.length;
      const percent = Math.round((score / Math.max(total, 1)) * 100);
      const passed = percent >= data.pass_score;
      const { error } = await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        quiz_id: data.id,
        score,
        total,
        passed,
        answers: finalAnswers,
      });
      if (error) throw error;
      if (passed) {
        const { data: p } = await supabase.from("profiles").select("xp").eq("id", user.id).maybeSingle();
        await supabase
          .from("profiles")
          .update({ xp: (p?.xp ?? 0) + 30 })
          .eq("id", user.id);
      }
      return { score, total, percent, passed };
    },
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
      if (r.passed) toast.success(`${tx(lang, "passed")} · +30 XP`);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not submit"),
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
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <PageShell back="/lessons" title="Quiz">
        <p className="mx-auto mt-12 max-w-md px-6 text-center text-muted-foreground">
          No quiz available for this lesson yet.
        </p>
      </PageShell>
    );
  }

  const questions = data.questions as Question[];
  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  if (done && submit.data) {
    const r = submit.data;
    return (
      <PageShell back={`/lessons/${lessonId}`}>
        <div className="mx-auto mt-6 w-full max-w-md px-6 text-center">
          <div
            className={cn(
              "mx-auto grid h-20 w-20 place-items-center rounded-full",
              r.passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
            )}
          >
            {r.passed ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">
            {r.passed ? tx(lang, "passed") : tx(lang, "failed")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {tx(lang, "score")}: {r.score} / {r.total} ({r.percent}%)
          </p>
          {r.passed && (
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-primary">
              <Sparkles className="h-4 w-4" /> +30 XP
            </p>
          )}
          <div className="mt-8 grid gap-2">
            <Button asChild size="lg" className="h-12 text-base">
              <Link to="/lessons/$lessonId" params={{ lessonId }}>
                {tx(lang, "backToLesson")}
              </Link>
            </Button>
            {!r.passed && (
              <Button
                variant="outline"
                size="lg"
                className="h-12 text-base"
                onClick={() => {
                  setDone(false);
                  setIdx(0);
                  setSelected(null);
                  setAnswers([]);
                  submit.reset();
                }}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </PageShell>
    );
  }

  const options = isKhmer ? q.options_km : q.options_en;
  const prompt = isKhmer ? q.prompt_km : q.prompt_en;
  const explanation = isKhmer ? q.explanation_km : q.explanation_en;
  const revealed = selected !== null;

  return (
    <PageShell back={`/lessons/${lessonId}`}>
      <div className="mx-auto w-full max-w-md px-6 pt-4">
        <Progress value={((idx + (revealed ? 1 : 0)) / questions.length) * 100} className="h-1.5" />
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {idx + 1} / {questions.length}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight">{prompt}</h2>

        <div className="mt-6 space-y-2">
          {options.map((opt, i) => {
            const isCorrect = i === q.correct_index;
            const isSelected = i === selected;
            return (
              <button
                key={i}
                type="button"
                disabled={revealed}
                onClick={() => setSelected(i)}
                className={cn(
                  "block w-full rounded-2xl border p-4 text-left transition",
                  !revealed && "border-border bg-card hover:border-primary",
                  revealed && isCorrect && "border-emerald-500 bg-emerald-50",
                  revealed && isSelected && !isCorrect && "border-rose-500 bg-rose-50",
                  revealed && !isSelected && !isCorrect && "border-border bg-card opacity-60",
                )}
              >
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && explanation && (
          <div className="mt-4 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            {explanation}
          </div>
        )}

        <div className="mt-8">
          <Button
            size="lg"
            className="h-12 w-full text-base"
            disabled={selected === null || submit.isPending}
            onClick={() => {
              const nextAnswers = [...answers, selected!];
              setAnswers(nextAnswers);
              setSelected(null);
              if (isLast) {
                setDone(true);
                submit.mutate(nextAnswers);
              } else {
                setIdx(idx + 1);
              }
            }}
          >
            {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLast ? tx(lang, "finish") : tx(lang, "next")}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
