import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  Heart,
  Flame,
  Trophy,
  X,
  RotateCcw,
  Bot,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/_authenticated/lessons/$lessonId/quiz")({
  head: () => ({ meta: [{ title: "Duolingo STEM Quiz — ScienceKH" }] }),
  component: DuolingoQuizPage,
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

function DuolingoQuizPage() {
  const { lessonId } = Route.useParams();
  const { user } = useAuth();
  const { profile, lang } = useProfile();
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

  // Quiz state
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [hearts, setHearts] = useState(5);
  const [heartShake, setHeartShake] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [showAiExplainer, setShowAiExplainer] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState(false);

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
        const { data: p } = await supabase
          .from("profiles")
          .select("xp, streak_days")
          .eq("id", user.id)
          .maybeSingle();

        await supabase
          .from("profiles")
          .update({
            xp: (p?.xp ?? 0) + 30,
            streak_days: Math.max(1, p?.streak_days ?? 0),
          })
          .eq("id", user.id);
      }
      return { score, total, percent, passed };
    },
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
      if (r.passed) {
        sounds.playVictory();
        launchConfetti();
        toast.success(isKhmer ? "អបអរសាទរ! ទទួលបាន +30 XP" : "Congratulations! Earned +30 XP");
      }
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Submission error"),
  });

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="text-muted-foreground">
          {isKhmer ? "មិនទាន់មានលំហាត់សម្រាប់មេរៀននេះនៅឡើយទេ។" : "No quiz available for this lesson yet."}
        </p>
        <Button asChild className="mt-4">
          <Link to="/lessons/$lessonId" params={{ lessonId }}>
            {tx(lang, "backToLesson")}
          </Link>
        </Button>
      </div>
    );
  }

  const questions = (data.questions ?? []) as Question[];
  const q = questions[idx];
  const isLast = idx === questions.length - 1;
  const options = isKhmer ? q.options_km : q.options_en;
  const prompt = isKhmer ? q.prompt_km : q.prompt_en;
  const explanation = isKhmer ? q.explanation_km : q.explanation_en;

  // Handle Answer Check
  const handleCheck = () => {
    if (selected === null) return;

    const isCorrect = selected === q.correct_index;

    if (isCorrect) {
      sounds.playCorrect();
      setStatus("correct");
    } else {
      sounds.playWrong();
      sounds.playHeartLost();
      setStatus("wrong");
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      setHeartShake(true);
      setTimeout(() => setHeartShake(false), 500);

      if (nextHearts <= 0) {
        setOutOfHearts(true);
      }
    }
  };

  // Handle Next Question
  const handleContinue = () => {
    const nextAnswers = [...answers, selected ?? -1];
    setAnswers(nextAnswers);
    setSelected(null);
    setStatus("idle");
    setShowAiExplainer(false);

    if (isLast) {
      setDone(true);
      submit.mutate(nextAnswers);
    } else {
      setIdx((i) => i + 1);
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    setIdx(0);
    setSelected(null);
    setStatus("idle");
    setHearts(5);
    setAnswers([]);
    setDone(false);
    setOutOfHearts(false);
    setShowAiExplainer(false);
    submit.reset();
  };

  // Out of Hearts Game Over Modal
  if (outOfHearts) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-2xl animate-in zoom-in-95">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose-100 text-rose-600">
            <Heart className="h-10 w-10 fill-rose-600" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
            {isKhmer ? "អស់បេះដូងហើយ!" : "Out of Hearts!"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isKhmer
              ? "កុំបារម្ភ! ការរៀនទាមទារការអនុវត្ត។ សូមពិនិត្យមេរៀនឡើងវិញ ឬព្យាយាមម្តងទៀត។"
              : "Don't worry! Making mistakes is part of learning. Review the lesson or try again."}
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <Button
              size="lg"
              onClick={handleRestart}
              className="h-12 rounded-2xl bg-primary text-base font-semibold shadow-md active:translate-y-0.5"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              {isKhmer ? "ព្យាយាមម្តងទៀត (ពេញ ៥ បេះដូង)" : "Try Again (Full 5 Hearts)"}
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-2xl text-base">
              <Link to="/lessons/$lessonId" params={{ lessonId }}>
                {tx(lang, "backToLesson")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Final Victory / Results Screen
  if (done && submit.data) {
    const r = submit.data;
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-background p-6">
        <div className="my-auto w-full max-w-md text-center">
          <div className="relative mx-auto inline-block">
            <div
              className={cn(
                "grid h-28 w-28 place-items-center rounded-3xl shadow-xl transition-transform duration-500 animate-in zoom-in-75",
                r.passed
                  ? "bg-amber-400 text-amber-950"
                  : "bg-rose-100 text-rose-600",
              )}
            >
              {r.passed ? (
                <Trophy className="h-14 w-14" />
              ) : (
                <XCircle className="h-14 w-14" />
              )}
            </div>
            {r.passed && (
              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                <Sparkles className="h-4 w-4" />
              </span>
            )}
          </div>

          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground">
            {r.passed
              ? isKhmer
                ? "អបអរសាទរ! បញ្ចប់មេរៀន!"
                : "Lesson Complete!"
              : isKhmer
                ? "ព្យាយាមម្តងទៀត!"
                : "Needs Practice"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isKhmer ? "អ្នកបានធ្វើលំហាត់បានយ៉ាងល្អ" : "Great effort on completing the questions!"}
          </p>

          {/* Gamification Stats Cards */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-3 text-center dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold uppercase text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3.5 w-3.5" /> Total XP
              </div>
              <p className="mt-1 font-display text-2xl font-black text-amber-700 dark:text-amber-300">
                +{r.passed ? 30 : 5}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-3 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Accuracy
              </div>
              <p className="mt-1 font-display text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {r.percent}%
              </p>
            </div>

            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/60 p-3 text-center dark:border-orange-900/50 dark:bg-orange-950/30">
              <div className="flex items-center justify-center gap-1 text-xs font-semibold uppercase text-orange-600 dark:text-orange-400">
                <Flame className="h-3.5 w-3.5" /> Streak
              </div>
              <p className="mt-1 font-display text-2xl font-black text-orange-600 dark:text-orange-400">
                {profile?.streak_days ? `${profile.streak_days} Days` : "+1 Day"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-2">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-2xl border-b-4 border-emerald-700 bg-emerald-500 text-lg font-bold text-white shadow-lg transition active:border-b-0 active:translate-y-1 hover:bg-emerald-600"
          >
            <Link to="/lessons/$lessonId" params={{ lessonId }}>
              {isKhmer ? "បន្តទៅមុខទៀត" : "Continue"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {!r.passed && (
            <Button
              variant="ghost"
              size="lg"
              onClick={handleRestart}
              className="h-12 w-full rounded-2xl text-base font-semibold text-muted-foreground hover:bg-muted"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {isKhmer ? "ព្យាយាមម្តងទៀត" : "Retry Quiz"}
            </Button>
          )}
        </div>
      </main>
    );
  }

  // Active Quiz View (Duolingo Layout)
  const progressPercent = ((idx + (status !== "idle" ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      {/* Duolingo Top Header */}
      <header className="mx-auto flex w-full max-w-2xl items-center gap-4 px-6 pt-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/lessons/$lessonId", params: { lessonId } })}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted"
          aria-label="Exit Quiz"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Dynamic Green Progress Bar */}
        <div className="relative flex-1">
          <Progress value={progressPercent} className="h-3.5 rounded-full bg-muted" />
        </div>

        {/* Duolingo Hearts Counter */}
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-600 transition-transform dark:border-rose-900/50 dark:bg-rose-950/40",
            heartShake && "animate-bounce scale-110",
          )}
        >
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          <span className="font-display font-bold text-base">{hearts}</span>
        </div>
      </header>

      {/* Main Question Body */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-8">
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary w-fit">
          <Sparkles className="h-3.5 w-3.5" />
          {isKhmer ? `សំណួរទី ${idx + 1} នៃ ${questions.length}` : `Question ${idx + 1} of ${questions.length}`}
        </div>

        <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl">
          {prompt}
        </h2>

        {/* Duolingo-style 3D Answer Cards */}
        <div className="mt-8 grid gap-3">
          {options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correct_index;
            const isAnswerChecked = status !== "idle";

            let cardStyles = "border-border bg-card text-foreground hover:bg-muted/50 border-b-4 active:border-b-2 active:translate-y-0.5";

            if (isSelected && !isAnswerChecked) {
              cardStyles = "border-primary bg-primary/5 text-primary border-b-4 ring-2 ring-primary/20 translate-y-0.5";
            } else if (isAnswerChecked) {
              if (isCorrect) {
                cardStyles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-b-4 font-bold ring-2 ring-emerald-500/30";
              } else if (isSelected && !isCorrect) {
                cardStyles = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-b-4 ring-2 ring-rose-500/30";
              } else {
                cardStyles = "border-border bg-card opacity-50 border-b-2";
              }
            }

            return (
              <button
                key={i}
                type="button"
                disabled={status !== "idle"}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border-2 p-4 text-left font-medium transition-all duration-150 md:p-5",
                  cardStyles,
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-lg border text-xs font-bold",
                      isSelected && !isAnswerChecked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base md:text-lg">{opt}</span>
                </div>
                {isAnswerChecked && isCorrect && (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                )}
                {isAnswerChecked && isSelected && !isCorrect && (
                  <XCircle className="h-6 w-6 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Duolingo Slide-up Bottom Feedback Drawer */}
      <footer
        className={cn(
          "border-t p-6 transition-colors duration-200",
          status === "idle" && "border-border bg-card",
          status === "correct" && "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/70",
          status === "wrong" && "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/70",
        )}
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {status === "idle" && (
            <div className="hidden text-sm text-muted-foreground md:block">
              {isKhmer ? "ជ្រើសរើសចម្លើយត្រឹមត្រូវ រួចចុច 'ពិនិត្យ'" : "Select an answer, then check"}
            </div>
          )}

          {status === "correct" && (
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-emerald-800 dark:text-emerald-300">
                  {isKhmer ? "អស្ចារ្យណាស់! ត្រឹមត្រូវ!" : "Great job! That's correct!"}
                </h3>
                {explanation && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 line-clamp-1">
                    {explanation}
                  </p>
                )}
              </div>
            </div>
          )}

          {status === "wrong" && (
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-500 text-white shadow-md">
                  <XCircle className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-rose-800 dark:text-rose-300">
                    {isKhmer ? "ចម្លើយមិនទាន់ត្រឹមត្រូវទេ" : "Incorrect"}
                  </h3>
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-400">
                    {isKhmer ? "ចម្លើយត្រឹមត្រូវគឺ៖ " : "Correct answer: "}
                    <span className="font-bold underline">{options[q.correct_index]}</span>
                  </p>
                </div>
              </div>

              {/* AI Socratic Explainer Button */}
              {explanation && (
                <div className="mt-3">
                  {!showAiExplainer ? (
                    <button
                      type="button"
                      onClick={() => setShowAiExplainer(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-white/80 px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-white dark:border-rose-700 dark:bg-rose-900/60 dark:text-rose-200"
                    >
                      <Bot className="h-3.5 w-3.5" />
                      {isKhmer ? "✨ ពន្យល់ខ្ញុំពីមូលហេតុ (AI Explanation)" : "✨ Explain why (AI Explanation)"}
                    </button>
                  ) : (
                    <div className="mt-2 rounded-xl border border-rose-200 bg-white/90 p-3 text-xs leading-relaxed text-rose-900 shadow-sm dark:border-rose-800 dark:bg-card dark:text-rose-200 animate-in fade-in">
                      <span className="font-bold">💡 {isKhmer ? "ការពន្យល់៖ " : "Explanation: "}</span>
                      {explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            {status === "idle" ? (
              <Button
                size="lg"
                disabled={selected === null}
                onClick={handleCheck}
                className={cn(
                  "h-12 w-full rounded-2xl border-b-4 text-base font-bold transition-all active:border-b-0 active:translate-y-1 md:w-44",
                  selected !== null
                    ? "border-emerald-700 bg-emerald-500 text-white shadow-md hover:bg-emerald-600"
                    : "border-muted-foreground/30 bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                {isKhmer ? "ពិនិត្យ" : "Check"}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleContinue}
                className={cn(
                  "h-12 w-full rounded-2xl border-b-4 text-base font-bold shadow-md transition-all active:border-b-0 active:translate-y-1 md:w-44",
                  status === "correct"
                    ? "border-emerald-700 bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border-rose-700 bg-rose-500 text-white hover:bg-rose-600",
                )}
              >
                {isLast
                  ? isKhmer
                    ? "បញ្ចប់លទ្ធផល"
                    : "Finish"
                  : isKhmer
                    ? "បន្តទៅមុខ"
                    : "Continue"}
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
