// ==============================================================================
// ScienceKH — AI Smart Mistake Vault Drawer (ធនាគារកែកំហុស AI)
// Modeled after Super Duolingo's Practice Mistakes Hub
// Students drill and master questions they missed until 100% mastery.
// ==============================================================================

import { useState } from "react";
import {
  Target,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  X,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { useSuper, type MistakeItem } from "@/lib/super-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export function MistakeReviewDrawer() {
  const { isMistakesDrawerOpen, closeMistakesDrawer, mistakes, resolveMistake } = useSuper();
  const [activeMistakeIndex, setActiveMistakeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  if (!isMistakesDrawerOpen) return null;

  const currentMistake: MistakeItem | undefined = mistakes[activeMistakeIndex];

  const handleSelectOption = (option: string) => {
    sounds.playPop();
    setSelectedAnswer(option);
  };

  const handleVerify = () => {
    if (!currentMistake || !selectedAnswer) return;

    if (selectedAnswer === currentMistake.correctAnswerKm || selectedAnswer === currentMistake.correctAnswerEn) {
      setFeedback("correct");
      sounds.playCorrect(3);
      launchConfetti();
    } else {
      setFeedback("wrong");
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    if (!currentMistake) return;

    if (feedback === "correct") {
      resolveMistake(currentMistake.id);
    }

    setFeedback(null);
    setSelectedAnswer(null);

    if (activeMistakeIndex >= mistakes.length - 1) {
      setActiveMistakeIndex(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl p-5 sm:p-7 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground">
                ធនាគារកែកំហុសឆ្លាតវៃ (Mistake Vault)
              </h3>
              <p className="text-xs text-muted-foreground">
                {mistakes.length} សំណួរត្រូវពិនិត្យឡើងវិញ (To review)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMistakesDrawer}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        {mistakes.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-7 w-7" />
            </div>
            <h4 className="font-bold text-lg text-foreground">គ្មានកំហុសដែលត្រូវកែឡើយ! 🎉</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              អបអរសាទរ! អ្នកបានឆ្លើយត្រូវគ្រប់សំណួរទាំងអស់។ បន្តការរៀនសូត្រក្នុងមេរៀនបន្ទាប់!
            </p>
            <Button
              type="button"
              onClick={closeMistakesDrawer}
              className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              ត្រឡប់ទៅមេរៀនវិញ (Back to Lessons)
            </Button>
          </div>
        ) : currentMistake ? (
          <div className="space-y-4 pt-4">
            {/* Subject & Progress Counter */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-bold uppercase text-emerald-600 dark:text-emerald-400">
                {currentMistake.subject} • ថ្នាក់ទី {currentMistake.grade}
              </span>
              <span>
                {activeMistakeIndex + 1} / {mistakes.length}
              </span>
            </div>

            {/* Prompt */}
            <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
              <p className="text-sm font-semibold text-foreground leading-relaxed">
                {currentMistake.promptKm}
              </p>
              {currentMistake.promptEn && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {currentMistake.promptEn}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {[currentMistake.correctAnswerKm, "ជម្រើសផ្សេងទៀត ក (Alternative A)", "ជម្រើសផ្សេងទៀត ខ (Alternative B)"].map(
                (opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={cn(
                      "w-full p-3.5 rounded-xl border text-left text-xs font-medium transition active:scale-98 cursor-pointer flex items-center justify-between",
                      selectedAnswer === opt
                        ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                        : "border-border hover:bg-muted/60 text-foreground",
                    )}
                  >
                    <span>{opt}</span>
                    {selectedAnswer === opt && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                ),
              )}
            </div>

            {/* Feedback Message */}
            {feedback && (
              <div
                className={cn(
                  "p-3.5 rounded-xl text-xs font-semibold animate-in fade-in flex items-start gap-2",
                  feedback === "correct"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400",
                )}
              >
                {feedback === "correct" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                )}
                <div>
                  <div className="font-bold">
                    {feedback === "correct" ? "ត្រឹមត្រូវណាស់! 🎉" : "នៅមិនទាន់ត្រឹមត្រូវទេ"}
                  </div>
                  <div className="mt-0.5 text-[11px] font-normal text-muted-foreground">
                    {currentMistake.explanationKm}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2">
              {!feedback ? (
                <Button
                  type="button"
                  disabled={!selectedAnswer}
                  onClick={handleVerify}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md"
                >
                  ផ្ទៀងផ្ទាត់ចម្លើយ (Check Answer)
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className={cn(
                    "w-full font-bold shadow-md gap-2",
                    feedback === "correct"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-800 hover:bg-slate-900 text-white",
                  )}
                >
                  <span>បន្តបន្ទាប់ (Continue)</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
