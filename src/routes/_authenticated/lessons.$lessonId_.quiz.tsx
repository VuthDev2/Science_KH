import { createFileRoute, Link, useNavigate, getRouteApi } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Atom,
  Flame,
  X,
  RotateCcw,
  Bot,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Volume2,
  FlaskConical,
  Activity,
  Heart,
  HelpCircle,
  Check,
  Award,
  Play,
  MapPin,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { recordLessonCompletion } from "@/lib/gamification.functions";
import { useProfile } from "@/lib/use-profile";
import { useAuth } from "@/lib/auth-context";
import { useSuper } from "@/lib/super-context";
import { SuperPostLessonInterstitial } from "@/components/super/super-post-lesson-interstitial";
import { Button } from "@/components/ui/button";
import { cn, cleanLatexMathString } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import { toast } from "sonner";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";
import { recordStudyActivity } from "@/lib/streak-guardian";
import { getCuratedLesson, getNextCuratedLesson } from "@/lib/curated-lessons";
import { MOEYS_UNITS_REGISTRY } from "@/lib/curriculum/units";

function QuizErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error("Quiz route error:", error);
  const isKhmer =
    typeof window !== "undefined"
      ? (localStorage.getItem("sciencekh_lang") || "km") === "km"
      : true;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="h-16 w-16 rounded-3xl grid place-items-center bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-2xl shadow-xs">
        ⚠️
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="font-display font-black text-lg text-slate-900 dark:text-white">
          {isKhmer ? "មានបញ្ហាបច្ចេកទេសលើលំហាត់នេះ" : "Technical Issue Loading Quiz"}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          {isKhmer
            ? "ប្រព័ន្ធមិនអាចបង្ហាញលំហាត់បានពេញលេញនៅពេលនេះទេ។ អ្នកអាចព្យាយាមម្តងទៀត ឬត្រឡប់ទៅកម្មវិធីសិក្សាវិញ។"
            : "The quiz exercises could not be loaded right now. You can try again or return to the curriculum roadmap."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition cursor-pointer"
        >
          {isKhmer ? "ព្យាយាមម្តងទៀត" : "Try Again"}
        </button>
        <Link
          to="/lessons"
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition cursor-pointer"
        >
          {isKhmer ? "ត្រឡប់ទៅកម្មវិធីសិក្សា" : "Back to Curriculum"}
        </Link>
        <Link
          to="/home"
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs"
        >
          {isKhmer ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/_authenticated/lessons/$lessonId_/quiz")({
  ssr: false,
  head: () => ({ meta: [{ title: "Interactive MoEYS Learning Lab — ScienceKH" }] }),
  component: InteractiveQuizPage,
  errorComponent: QuizErrorComponent,
});

const routeApi = getRouteApi("/_authenticated/lessons/$lessonId_/quiz");

import {
  type QuizQuestionItem,
  type QuantumVariable,
  type SynthesizerQuestion,
  type ConceptChoiceQuestion,
  type DerivationChainQuestion,
  type LabCalculationQuestion,
  getCurriculumLabQuestions,
} from "@/lib/quiz-curriculum-labs";

/**
 * Robust KaTeX block renderer for mathematical formulas
 */
function SafeMathBlock({
  math,
  className,
  displayMode = true,
}: {
  math: string;
  className?: string;
  displayMode?: boolean;
}) {
  const html = useMemo(() => {
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
    return <span className={className}>{math}</span>;
  }
  return <div className={cn("overflow-x-auto py-1", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Renders rich markdown with embedded LaTeX math (both inline $ and display $$)
 */
function QuizMarkdownContent({ content, className }: { content: string; className?: string }) {
  if (!content) return null;
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none text-inherit leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <span className="block mb-1.5 last:mb-0">{children}</span>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Smart Option Content Renderer: renders KaTeX formulas seamlessly if LaTeX notation is present
 */
function OptionMathContent({ text }: { text: string }) {
  if (!text) return null;
  if (text.includes("$")) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{ p: ({ children }) => <span>{children}</span> }}
      >
        {text}
      </ReactMarkdown>
    );
  }
  if (/(\\[a-zA-Z]+|[_^]|\b[a-zA-Z]_[0-9])/.test(text)) {
    try {
      const html = katex.renderToString(cleanLatexMathString(text), {
        displayMode: false,
        throwOnError: false,
        strict: false,
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <span>{text}</span>;
    }
  }
  return <span>{text}</span>;
}

/**
 * Strips accidental leading order numbers (e.g., "1. ", "2) ", "១. ", "២) ")
 * so ordered-slot questions never clash with the position number badge.
 */
function cleanStepText(text: string): string {
  if (!text) return "";
  return text.replace(/^([0-9០-៩]+[\.\)]\s*)+/g, "").trim();
}

/**
 * Animated Oscilloscope Waveform Component
 */
function OscilloscopeWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-6 px-2.5 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800">
      {[40, 75, 50, 90, 60, 100, 45, 80, 55, 95, 35, 70].map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-full bg-sky-500 dark:bg-sky-400 transition-all duration-150",
            isPlaying ? "animate-pulse" : "opacity-30",
          )}
          style={{
            height: isPlaying ? `${Math.max(20, h * (i % 2 === 0 ? 1 : 0.75))}%` : "30%",
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Multi-tiered Kru Vuth Voice & Audio Synthesizer
 * 1. Google Translate Native Khmer / English TTS Audio stream
 * 2. Web Speech API (with language/voice detection)
 * 3. Harmonic Web Audio Science Formula Synthesizer
 */
function playKruVuthAudio(
  textKm: string,
  textEn: string,
  speed = 0.95,
  isKhmer = true,
  onPlayStart?: () => void,
  onPlayEnd?: () => void,
): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  // Stop any active Web Speech synthesis
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  const primaryText = isKhmer ? textKm : textEn;
  const langCode = isKhmer ? "km" : "en";
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${langCode}&q=${encodeURIComponent(primaryText)}`;

  try {
    const audio = new Audio(ttsUrl);
    audio.playbackRate = speed;

    const fallbackSpeech = () => {
      // Tier 2: Try Web Speech API
      if ("speechSynthesis" in window) {
        try {
          const voices = window.speechSynthesis.getVoices();
          const kmVoice = voices.find((v) => v.lang.startsWith("km"));
          const utteranceText = kmVoice || !isKhmer ? primaryText : textEn;
          const utterance = new SpeechSynthesisUtterance(utteranceText);
          utterance.rate = speed;

          if (kmVoice) {
            utterance.voice = kmVoice;
          } else {
            const enVoice = voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Google") ||
                  v.name.includes("Natural") ||
                  v.name.includes("Samantha")),
            );
            if (enVoice) utterance.voice = enVoice;
            utterance.lang = "en-US";
          }

          utterance.onstart = () => onPlayStart?.();
          utterance.onend = () => onPlayEnd?.();
          utterance.onerror = () => {
            onPlayEnd?.();
            sounds.playFormulaSynthesizer();
          };

          window.speechSynthesis.speak(utterance);
          return;
        } catch (speechErr) {
          console.warn("SpeechSynthesis failed:", speechErr);
        }
      }

      // Tier 3: Resonant Web Audio Formula Synthesizer
      sounds.playFormulaSynthesizer();
      onPlayStart?.();
      setTimeout(() => onPlayEnd?.(), 1400);
    };

    audio.onplay = () => {
      onPlayStart?.();
    };

    audio.onended = () => {
      onPlayEnd?.();
    };

    audio.onerror = () => {
      console.warn("Direct TTS stream unavailable, falling back to Web Speech / Synthesizer...");
      fallbackSpeech();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio element play error:", err);
        fallbackSpeech();
      });
    }

    return audio;
  } catch (err) {
    console.warn("Kru Vuth audio error:", err);
    sounds.playFormulaSynthesizer();
    onPlayStart?.();
    setTimeout(() => onPlayEnd?.(), 1400);
    return null;
  }
}

function InteractiveQuizPage() {
  const { lessonId } = Route.useParams();
  const { lang, data: profile } = useProfile();
  const { user } = useAuth();
  const { isSuper, hearts, loseHeart, recordMistake, openPaywall, refillHearts } = useSuper();
  const isKhmer = lang === "km";
  const navigate = useNavigate();
  const qc = useQueryClient();

  const lesson = getCuratedLesson(lessonId);
  const subjectSlug = lesson?.subject?.slug || "";
  const isLanguageSubject =
    subjectSlug === "english" || subjectSlug === "languages" || subjectSlug === "foreign-languages";

  // Load curated lab deck
  const initialLabDeck = useMemo(() => getCurriculumLabQuestions(lessonId), [lessonId]);

  // Deck & Progression State
  const [deck, setDeck] = useState<QuizQuestionItem[]>([]);
  const [deckIndex, setDeckIndex] = useState(0);

  // Lab Metrics & Gamification Hearts
  const [quantumEnergy, setQuantumEnergy] = useState(5); // 5 Energy Hearts
  const [energyGlow, setEnergyGlow] = useState(false);
  const [resonanceStreak, setResonanceStreak] = useState(0);
  const [peakResonance, setPeakResonance] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const mistakesCountRef = useRef<number>(0);
  const totalAttemptsRef = useRef<number>(0);
  const reviewCyclesRef = useRef<number>(0);
  const [lostHeartAnimation, setLostHeartAnimation] = useState(false);
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);

  // Voice Synthesizer Audio State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showSocraticCard, setShowSocraticCard] = useState(false);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Stop active audio on unmount or question change
  useEffect(() => {
    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [deckIndex]);

  // Synthesizer Rail Selection State
  const [synthesizerRailTokens, setSynthesizerRailTokens] = useState<QuantumVariable[]>([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [derivationPositions, setDerivationPositions] = useState<number[]>([]);
  const [activeSwapIndex, setActiveSwapIndex] = useState<number | null>(null);

  // Interaction Status
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [done, setDone] = useState(false);
  const [animatedXp, setAnimatedXp] = useState(0);

  // Duolingo Auto-Progression Countdown State
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number | null>(null);
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = useState(false);

  // Duolingo Post-Lesson Super Interstitial Ad State (Free Tier only)
  const [showPostLessonAd, setShowPostLessonAd] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  const handleProceedAfterLesson = useCallback(
    (targetAction: () => void) => {
      setAutoAdvanceTimer(null);
      sounds.playPop();

      if (!isSuper) {
        setPendingNavigation(() => targetAction);
        setShowPostLessonAd(true);
      } else {
        targetAction();
      }
    },
    [isSuper],
  );

  // Identify unit membership and whether this lesson completes the current unit
  const unitInfo = useMemo(() => {
    if (!lesson) return null;
    const key = `${lesson.grade}-${lesson.subject.slug}`;
    const units = MOEYS_UNITS_REGISTRY[key] || [];
    for (const u of units) {
      if (u.lessonIds.includes(lessonId)) {
        const isLastInUnit = u.lessonIds[u.lessonIds.length - 1] === lessonId;
        return { unit: u, isLastInUnit };
      }
    }
    return null;
  }, [lesson, lessonId]);

  const nextCuratedLesson = useMemo(() => getNextCuratedLesson(lessonId), [lessonId]);

  // Reset and initialize Lab Deck whenever lessonId changes
  useEffect(() => {
    setDeck(initialLabDeck);
    setDeckIndex(0);
    setDone(false);
    setStatus("idle");
    setResonanceStreak(0);
    setPeakResonance(0);
    setQuantumEnergy(5);
    setEnergyGlow(false);
    setSynthesizerRailTokens([]);
    setSelectedChoiceIndex(null);
    setActiveSwapIndex(null);
    setShowSocraticCard(false);
    setAnimatedXp(0);
    setAutoAdvanceTimer(null);
    setIsAutoAdvancePaused(false);
  }, [lessonId, initialLabDeck]);

  const currentQ = deck[deckIndex];
  const isLastQuestion = deckIndex === deck.length - 1;

  // Auto-play Voice on Synthesizer Stage ONLY for Foreign Language subjects
  useEffect(() => {
    if (isLanguageSubject && currentQ?.type === "synthesizer") {
      activeAudioRef.current = playKruVuthAudio(
        currentQ.spoken_theorem_km,
        currentQ.spoken_theorem_en,
        0.95,
        isKhmer,
        () => setIsVoiceActive(true),
        () => {
          setIsVoiceActive(false);
          activeAudioRef.current = null;
        },
      );
    }
  }, [deckIndex, currentQ, isKhmer, isLanguageSubject]);

  // Reset Interaction per Question
  useEffect(() => {
    setSynthesizerRailTokens([]);
    setSelectedChoiceIndex(null);
    setActiveSwapIndex(null);
    setShowSocraticCard(false);

    if (currentQ?.type === "derivation_chain") {
      const idxs = currentQ.steps_km.map((_, i) => i);
      setDerivationPositions([...idxs].sort(() => Math.random() - 0.5));
    }
  }, [deckIndex, currentQ]);

  // Trigger Voice Playback
  const triggerVoicePlayback = (speed: 0.95 | 0.65 = 0.95) => {
    if (!currentQ || currentQ.type !== "synthesizer") return;
    sounds.playPop();

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }

    activeAudioRef.current = playKruVuthAudio(
      currentQ.spoken_theorem_km,
      currentQ.spoken_theorem_en,
      speed,
      isKhmer,
      () => setIsVoiceActive(true),
      () => {
        setIsVoiceActive(false);
        activeAudioRef.current = null;
      },
    );
  };

  // Variable Snap to Rail
  const handleSnapToRail = (variable: QuantumVariable) => {
    if (status !== "idle") return;
    sounds.playPop();
    setSynthesizerRailTokens((prev) => [...prev, variable]);
  };

  // Variable Eject from Rail
  const handleEjectFromRail = (index: number) => {
    if (status !== "idle") return;
    sounds.playPop();
    setSynthesizerRailTokens((prev) => prev.filter((_, i) => i !== index));
  };

  // Choice Selection
  const handleSelectChoice = (index: number) => {
    if (status !== "idle") return;
    sounds.playPop();
    setSelectedChoiceIndex(index);
  };

  // Swap Derivation Cards
  const handleStepSwap = (index: number) => {
    if (status !== "idle") return;
    sounds.playPop();
    if (activeSwapIndex === null) {
      setActiveSwapIndex(index);
    } else if (activeSwapIndex === index) {
      setActiveSwapIndex(null);
    } else {
      const updated = [...derivationPositions];
      const temp = updated[activeSwapIndex];
      updated[activeSwapIndex] = updated[index];
      updated[index] = temp;
      setDerivationPositions(updated);
      setActiveSwapIndex(null);
    }
  };

  // Move Step Up or Down directly
  const handleStepMove = (index: number, direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== "idle") return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= derivationPositions.length) return;
    sounds.playPop();
    const updated = [...derivationPositions];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setDerivationPositions(updated);
    setActiveSwapIndex(null);
  };

  // Check if Ready to Verify Hypothesis
  const canVerifyHypothesis = () => {
    if (status !== "idle" || !currentQ) return false;
    if (currentQ.type === "synthesizer") return synthesizerRailTokens.length > 0;
    if (currentQ.type === "concept_choice" || currentQ.type === "lab_calculation")
      return selectedChoiceIndex !== null;
    if (currentQ.type === "derivation_chain")
      return derivationPositions.length === currentQ.steps_km.length;
    return false;
  };

  // Submission Mutation
  const submitHypothesis = useMutation({
    mutationFn: async (results: { peakStreak: number }) => {
      const earnedXp = 40 + results.peakStreak * 4;

      // 1. Immediately persist to localStorage for instant UI updates and offline resilience
      if (typeof window !== "undefined") {
        try {
          const uid = user?.id || "guest";
          const storageKey = `sciencekh_completed_lessons_${uid}`;
          const currentList = JSON.parse(localStorage.getItem(storageKey) || "[]");
          if (!currentList.includes(lessonId)) {
            currentList.push(lessonId);
            localStorage.setItem(storageKey, JSON.stringify(currentList));
          }
          localStorage.setItem(`sciencekh_progress_${uid}_${lessonId}`, "completed");
          localStorage.setItem(`sciencekh_progress_${lessonId}`, "completed");

          // Also keep universal list
          const allKey = `sciencekh_completed_lessons_all`;
          const allList = JSON.parse(localStorage.getItem(allKey) || "[]");
          if (!allList.includes(lessonId)) {
            allList.push(lessonId);
            localStorage.setItem(allKey, JSON.stringify(allList));
          }
        } catch (e) {
          console.warn("Could not save completion to localStorage:", e);
        }
      }

      let resData = {
        earnedXp,
        earnedCoins: Math.floor(earnedXp / 4),
        peakStreak: results.peakStreak,
      };

      try {
        const result = await recordLessonCompletion({
          data: {
            lessonId: lessonId,
            quizId: lesson?.quiz?.id ?? `quiz-${lessonId}`,
            score: Math.max(1, deck.length - mistakesCountRef.current),
            total: deck.length,
            passed: true,
            answers: {},
            earnedXp,
          },
        });
        if (result) {
          resData = {
            earnedXp: result.earnedXp || earnedXp,
            earnedCoins: result.earnedCoins || Math.floor(earnedXp / 4),
            peakStreak: results.peakStreak,
          };
        }
      } catch (err) {
        console.warn("recordLessonCompletion server call fallback (offline/curated):", err);
      }

      return resData;
    },
    onSuccess: (res) => {
      // Direct query cache updates for instant roadmap reflection
      const uid = user?.id || "guest";
      qc.setQueryData(["student-progress", uid], (old: any) => {
        const completed = new Set(old?.completedIds || []);
        completed.add(lessonId);
        return {
          ...old,
          completedIds: Array.from(completed),
        };
      });

      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["student-progress"] });
      qc.invalidateQueries({ queryKey: ["leaderboard-live"] });
      qc.invalidateQueries({ queryKey: ["progress-summary"] });
      qc.invalidateQueries({ queryKey: ["lessons"] });
      sounds.playVictory();
      recordStudyActivity();
      launchConfetti();

      let c = 0;
      const targetXp = res.earnedXp || 40;
      const interval = setInterval(() => {
        c += 2;
        if (c >= targetXp) {
          setAnimatedXp(targetXp);
          clearInterval(interval);
        } else {
          setAnimatedXp(c);
        }
      }, 30);
    },
  });

  // Duolingo Auto-Progression Countdown Effect: Automatically move to next block of roadmap
  useEffect(() => {
    if (!done || isAutoAdvancePaused) return;

    setAutoAdvanceTimer(3);
    const interval = setInterval(() => {
      setAutoAdvanceTimer((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          handleProceedAfterLesson(() => {
            navigate({
              to: "/lessons",
              search: {
                grade: lesson?.grade,
                subject: lesson?.subject?.slug,
              },
            });
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [done, isAutoAdvancePaused, lesson, navigate]);

  // Verify Hypothesis
  const verifyHypothesis = () => {
    if (!currentQ || status !== "idle") return;
    setActiveSwapIndex(null);

    let isSuccess = false;

    if (currentQ.type === "synthesizer") {
      const currentIds = synthesizerRailTokens.map((t) => t.id);
      isSuccess =
        currentIds.length === currentQ.target_sequence_ids.length &&
        currentIds.every((id, idx) => id === currentQ.target_sequence_ids[idx]);
    } else if (currentQ.type === "concept_choice" || currentQ.type === "lab_calculation") {
      isSuccess = selectedChoiceIndex === currentQ.correct_index;
    } else if (currentQ.type === "derivation_chain") {
      isSuccess = derivationPositions.every((val, i) => val === currentQ.correct_chain_order[i]);
    }

    totalAttemptsRef.current += 1;

    if (isSuccess) {
      const nextStreak = resonanceStreak + 1;
      setResonanceStreak(nextStreak);
      setPeakResonance((prev) => Math.max(prev, nextStreak));
      sounds.playCorrect(nextStreak);
      setStatus("correct");
    } else {
      mistakesCountRef.current += 1;
      sounds.playWrong();
      sounds.playHeartLost();
      setResonanceStreak(0);
      setStatus("wrong");

      // Decrement genuine Duolingo Hearts & trigger pulse / -1 animation
      setLostHeartAnimation(true);
      setTimeout(() => setLostHeartAnimation(false), 1200);

      const hasRemainingHearts = loseHeart();
      if (!hasRemainingHearts || hearts <= 1) {
        setTimeout(() => {
          setShowOutOfHeartsModal(true);
        }, 500);
      }

      // Record mistake in AI Mistake Vault
      if (lesson && currentQ) {
        recordMistake({
          id: currentQ.id,
          lessonId: lesson.id,
          subject: lesson.subject.name_km || lesson.subject.slug,
          grade: lesson.grade,
          promptKm: currentQ.prompt_km,
          promptEn: currentQ.prompt_en || "",
          correctAnswerKm: (currentQ as any).options_km?.[(currentQ as any).correct_index] || "ចម្លើយត្រឹមត្រូវ",
          correctAnswerEn: (currentQ as any).options_en?.[(currentQ as any).correct_index] || "Correct Answer",
          explanationKm: (currentQ as any).explanation_km || "",
          explanationEn: (currentQ as any).explanation_en || "",
        });
      }

      setEnergyGlow(true);
      setTimeout(() => setEnergyGlow(false), 500);
    }
  };

  // Advance Protocol: When the progress line is complete, end lesson immediately and celebrate!
  const advanceProtocol = () => {
    setStatus("idle");
    setShowSocraticCard(false);

    if (!isLastQuestion) {
      setDeckIndex((prev) => prev + 1);
      return;
    }

    // Line completed! All questions in this lesson have been answered.
    // End lesson immediately — no more repeating questions!
    setDone(true);
    submitHypothesis.mutate({ peakStreak: peakResonance });
  };

  if (!currentQ && !done) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Atom className="h-10 w-10 animate-spin text-emerald-500" />
          <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
            {isKhmer ? "កំពុងបើកដំណើរការបន្ទប់ពិសោធន៍ STEM..." : "Loading STEM Lab..."}
          </span>
        </div>
      </div>
    );
  }

  // ============================================================================
  // DISCOVERY COMPLETE (VICTORY SCREEN - DUOLINGO FLOW)
  // ============================================================================
  if (done) {
    const nextLesson = getNextCuratedLesson(lessonId);
    const totalAttempts = totalAttemptsRef.current || 1;
    const mistakes = mistakesCountRef.current || 0;
    const accuracy = Math.max(70, Math.round(((totalAttempts - mistakes) / totalAttempts) * 100));
    const elapsedSec = Math.max(15, Math.floor((Date.now() - startTimeRef.current) / 1000));
    const timeStr = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, "0")}`;

    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-background p-6 text-foreground select-none">
        <div className="my-auto w-full max-w-md text-center animate-in zoom-in-95 duration-300">
          {/* Trophy Emblem with Shimmering Glow */}
          <div className="relative mx-auto inline-block mb-4">
            <div className="grid h-28 w-28 place-items-center rounded-3xl bg-[#58CC02] text-white shadow-xl shadow-emerald-500/30 border-b-[6px] border-[#46A302]">
              <Award className="h-14 w-14 animate-bounce text-white stroke-[2.5]" />
            </div>
            <span className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-amber-950 shadow-md text-lg">
              ⭐
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs font-black text-emerald-700 dark:text-emerald-300 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span>{isKhmer ? "មេរៀនត្រូវបានបញ្ចប់ • LESSON COMPLETE" : "LESSON COMPLETE"}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {isKhmer ? "អបអរសាទរ! សម្រេចជោគជ័យ!" : "Lesson Complete!"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
            {isKhmer
              ? "អ្នកបានស្វែងយល់រូបមន្ត និងអនុវត្តលំហាត់ជាក់ស្តែងដោយជោគជ័យ ១០០%!"
              : "You explored first principles and mastered key MoEYS competencies!"}
          </p>

          {/* Duolingo 3 Stat Cards Grid */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {/* 1. TOTAL XP */}
            <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/40 p-3 shadow-xs">
              <div className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {isKhmer ? "ពិន្ទុ XP" : "TOTAL XP"}
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-300 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>+{animatedXp || 40}</span>
              </div>
            </div>

            {/* 2. ACCURACY */}
            <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-950/40 p-3 shadow-xs">
              <div className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {isKhmer ? "ភាពត្រឹមត្រូវ" : "ACCURACY"}
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-300 flex items-center justify-center gap-1">
                <span>🎯</span>
                <span>{accuracy}%</span>
              </div>
            </div>

            {/* 3. TIME / SPEED */}
            <div className="rounded-2xl border-2 border-sky-300 dark:border-sky-700/60 bg-sky-50/70 dark:bg-sky-950/40 p-3 shadow-xs">
              <div className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                {isKhmer ? "រយៈពេល" : "SPEED"}
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-300 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-sky-500 text-sky-500" />
                <span>{timeStr}</span>
              </div>
            </div>
          </div>

          {/* Daily Streak Celebration */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-300/80 dark:border-amber-700/80 flex items-center gap-3.5 text-left shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
              🔥
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {isKhmer ? "សន្ទុះសិក្សាប្រចាំថ្ងៃ (STREAK)" : "Daily Streak Extended!"}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {isKhmer ? "រក្សាទម្លាប់រៀនសូត្របានល្អណាស់! ជួបគ្នានៅថ្ងៃស្អែកទៀត!" : "Great habit! Keep the momentum burning tomorrow!"}
              </div>
            </div>
          </div>

          {/* Unit Completion Celebration Banner */}
          {unitInfo?.isLastInUnit && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200 flex items-center gap-3.5 text-left shadow-sm animate-in zoom-in-95">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-black shadow-md text-xl">
                🏆
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <span>{isKhmer ? `ជំពូកទី ${unitInfo.unit.unitNumber} ត្រូវបានបញ្ចប់!` : `Unit ${unitInfo.unit.unitNumber} Mastered!`}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                </div>
                <div className="text-xs font-bold text-amber-900 dark:text-amber-100 truncate mt-0.5">
                  {isKhmer ? unitInfo.unit.title_km : unitInfo.unit.title_en}
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-300/80 mt-0.5">
                  {isKhmer ? "អបអរសាទរ! អ្នកបានឆ្លងកាត់គ្រប់មេរៀនក្នុងជំពូកនេះហើយ។" : "All lessons in this unit completed! Progressing to the next milestone."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Automatically move to next block of roadmap */}
        <div className="w-full max-w-md pt-4 space-y-2.5">
          <Button
            size="lg"
            onClick={() => {
              handleProceedAfterLesson(() => {
                navigate({
                  to: "/lessons",
                  search: {
                    grade: lesson?.grade,
                    subject: lesson?.subject?.slug,
                  },
                });
              });
            }}
            className="h-15 sm:h-16 w-full rounded-2xl border-b-[5px] border-[#46A302] bg-[#58CC02] hover:bg-[#46A302] active:border-b-0 active:translate-y-1 text-white shadow-xl shadow-emerald-500/25 transition-all font-black uppercase tracking-wider text-sm sm:text-base cursor-pointer flex items-center justify-between px-5"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Play className="h-5 w-5 fill-white text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest flex items-center gap-1.5">
                  {autoAdvanceTimer !== null && autoAdvanceTimer > 0 && !isAutoAdvancePaused ? (
                    <>
                      <span>{isKhmer ? "បន្តទៅផែនទីសិក្សាស្វ័យប្រវត្តក្នុង" : "MOVING TO ROADMAP IN"}</span>
                      <span className="inline-block bg-white/30 px-1.5 py-0.5 rounded-md text-white font-mono text-xs font-black">
                        {autoAdvanceTimer}s
                      </span>
                    </>
                  ) : (
                    <span>{isKhmer ? "បន្តទៅផែនទីសិក្សា" : "CONTINUE ON ROADMAP"}</span>
                  )}
                </span>
                <span className="text-xs sm:text-sm font-black text-white truncate max-w-[240px] sm:max-w-[280px]">
                  {nextCuratedLesson
                    ? (isKhmer ? `មេរៀនបន្ទាប់៖ ${nextCuratedLesson.title_km}` : `Next Topic: ${nextCuratedLesson.title_en}`)
                    : (isKhmer ? "ត្រឡប់ទៅផែនទីសិក្សា" : "Return to Roadmap")}
                </span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 ml-2" />
          </Button>

          {/* Auto-Advance Controls */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1 pt-0.5">
            <button
              type="button"
              onClick={() => setIsAutoAdvancePaused((p) => !p)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold cursor-pointer underline underline-offset-2"
            >
              {isAutoAdvancePaused
                ? isKhmer ? "▶ បន្តស្វ័យប្រវត្តឡើងវិញ" : "▶ Resume Auto-Advance"
                : isKhmer ? "⏸ ផ្អាកការបន្តស្វ័យប្រវត្តិ" : "⏸ Pause Auto-Advance"}
            </button>
            <span className="text-[10px] text-slate-400">
              {isKhmer ? "ចុចប៊ូតុងដើម្បីបន្តភ្លាមៗ" : "Tap to advance immediately"}
            </span>
          </div>

          {nextCuratedLesson && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleProceedAfterLesson(() => {
                  navigate({
                    to: "/lessons/$lessonId/quiz",
                    params: { lessonId: nextCuratedLesson.id },
                  });
                });
              }}
              className="w-full rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
              <span>{isKhmer ? "ចាប់ផ្តើមសំណួរមេរៀនបន្ទាប់ភ្លាមៗ" : "Start Next Quiz Directly"}</span>
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => {
              navigate({ to: "/lessons" });
            }}
            className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            {isKhmer ? "ត្រឡប់ទៅមេរៀនទាំងអស់ (Curriculum)" : "Back to All Lessons"}
          </Button>
        </div>

        {/* Duolingo Post-Lesson Super Interstitial Ad Modal */}
        <SuperPostLessonInterstitial
          isOpen={showPostLessonAd}
          onProceed={() => {
            setShowPostLessonAd(false);
            if (pendingNavigation) {
              pendingNavigation();
            }
          }}
        />
      </main>
    );
  }

  // Guard against missing question or empty deck
  if (!currentQ) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="h-14 w-14 rounded-2xl grid place-items-center bg-slate-100 dark:bg-slate-800 text-2xl">
          📚
        </div>
        <div className="space-y-1">
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white">
            {isKhmer ? "មិនទាន់មានលំហាត់សម្រាប់មេរៀននេះទេ" : "No Quiz Available Yet"}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs">
            {isKhmer
              ? "លំហាត់សម្រាប់មេរៀននេះកំពុងត្រូវបានរៀបចំ។ សូមត្រឡប់ទៅកម្មវិធីសិក្សាវិញ។"
              : "Practice exercises for this module are being prepared. Please return to curriculum."}
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: "/lessons" })}
          className="rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
        >
          {isKhmer ? "ត្រឡប់ទៅកម្មវិធីសិក្សា" : "Back to Curriculum"}
        </Button>
      </main>
    );
  }

  // Active Progress
  const progressPercent = ((deckIndex + (status !== "idle" ? 1 : 0)) / deck.length) * 100;
  const prompt = isKhmer ? currentQ.prompt_km : currentQ.prompt_en;
  const socraticClue = isKhmer ? currentQ.socratic_clue_km : currentQ.socratic_clue_en;
  const explanation = isKhmer ? currentQ.explanation_km : currentQ.explanation_en;
  const hasAnswer = canVerifyHypothesis();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-emerald-500/20">
      {/* ===================================================================== */}
      {/* 1. TOP HEADER (CLEAN DUOLINGO-STYLE WITH THICK PROGRESS & HEARTS)      */}
      {/* ===================================================================== */}
      <header
        className="mx-auto flex w-full max-w-xl items-center gap-3.5 px-4 select-none shrink-0"
        style={{ paddingTop: "max(3rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))" }}
      >
        {/* Exit Button */}
        <button
          type="button"
          onClick={() => navigate({ to: "/lessons" })}
          className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white transition cursor-pointer"
          aria-label="Exit"
        >
          <X className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Thick, Vibrant Progress Bar */}
        <div className="relative flex-1">
          <div className="h-3.5 sm:h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 relative">
            <div
              className="h-full bg-[#58CC02] dark:bg-emerald-500 rounded-full transition-all duration-300 shadow-sm relative overflow-hidden"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Top highlight shine */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Resonance Streak */}
        {resonanceStreak >= 2 && (
          <div className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 px-2.5 py-1 text-amber-600 dark:text-amber-400 text-xs font-black animate-in zoom-in-95">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{resonanceStreak}</span>
          </div>
        )}

        {/* Duolingo Real Hearts Indicator with -1 Animation */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (hearts < 5) refillHearts();
              else sounds.playPop();
            }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95 shadow-xs border",
              hearts <= 1
                ? "bg-rose-100 dark:bg-rose-950/70 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 ring-2 ring-rose-400/50 animate-pulse"
                : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400",
              lostHeartAnimation && "scale-125 ring-4 ring-rose-500 animate-bounce",
            )}
            title={isKhmer ? `នៅសល់ ${hearts}/5 ជីវិត` : `${hearts}/5 Hearts remaining`}
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="font-black text-xs">{hearts}</span>
          </button>

          {/* Floating "-1" Heart Lost Bubble */}
          {lostHeartAnimation && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-black text-rose-600 dark:text-rose-400 animate-out fade-out slide-out-to-top duration-1000 bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 px-2 py-0.5 rounded-full shadow-md pointer-events-none whitespace-nowrap">
              -1 💔
            </span>
          )}
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN EXPERIMENT QUESTION BODY                                      */}
      {/* ===================================================================== */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-start px-4 pt-5 sm:pt-7 sm:px-6 select-none pb-36">
        {/* Stage Badge & Context Pill */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isKhmer ? currentQ.stage_name_km : currentQ.stage_name_en}</span>
          </span>

          <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {lesson
              ? `${isKhmer ? lesson.subject.name_km : lesson.subject.name_en} • ${isKhmer ? `ថ្នាក់ទី ${lesson.grade}` : `Grade ${lesson.grade}`}`
              : "MoEYS STEM"}
          </span>
        </div>

        {/* Solution Clue Card (Expandable) */}
        {showSocraticCard && socraticClue && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-2.5 shadow-sm animate-in slide-in-from-top-2">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">
                {isKhmer ? "គន្លឹះដោះស្រាយ ៖ " : "Solution Clue: "}
              </strong>
              <span><OptionMathContent text={socraticClue} /></span>
            </div>
          </div>
        )}

        {/* Clean, Readable Prompt */}
        <h2 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-relaxed mb-4 break-words">
          <QuizMarkdownContent content={prompt} />
        </h2>

        {/* ================================================================= */}
        {/* ARCHETYPE 1: THE EQUATION SYNTHESIZER (Formula Rail)              */}
        {/* ================================================================= */}
        {currentQ.type === "synthesizer" && (
          <div className="flex flex-col items-center w-full animate-in fade-in duration-200">
            {/* Audio Center: Exclusively reserved for Language & Listening Comprehension */}
            {isLanguageSubject && (
              <div className="flex flex-col items-center justify-center my-3 gap-2">
                <div className="flex items-center justify-center gap-3">
                  {/* Primary Big Blue Speaker Button */}
                  <button
                    type="button"
                    onClick={() => triggerVoicePlayback(0.95)}
                    className={cn(
                      "w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#1CB0F6] hover:bg-[#18A0E0] border-b-[6px] border-[#1899D6] text-white flex items-center justify-center shadow-lg active:border-b-0 active:translate-y-1.5 transition-all cursor-pointer group",
                      isVoiceActive && "scale-95 bg-[#18A0E0] ring-4 ring-[#1CB0F6]/40",
                    )}
                    aria-label="Play Voice Audio"
                  >
                    <Volume2 className="w-9 h-9 sm:w-10 sm:h-10 stroke-[2.5] group-hover:scale-105 transition-transform" />
                  </button>

                  {/* Slower Pronunciation Button (Iconic Turtle Mode) */}
                  <button
                    type="button"
                    onClick={() => triggerVoicePlayback(0.65)}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-white border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-0 active:translate-y-1 flex items-center justify-center transition-all cursor-pointer shadow-sm group"
                    aria-label="Slow pronunciation"
                    title={isKhmer ? "អានយឺតៗច្បាស់ៗ (0.65x)" : "Slow-mo pronunciation (0.65x)"}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🐢</span>
                  </button>
                </div>

                {/* Voice Status & Waveform */}
                {isVoiceActive && (
                  <div className="flex items-center gap-1.5 mt-1 animate-in fade-in">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                      {isKhmer ? "កំពុងអាន..." : "Speaking..."}
                    </span>
                    <OscilloscopeWave isPlaying={true} />
                  </div>
                )}
              </div>
            )}

            {/* Target Assembly Docking Line (The Equation Rail) */}
            <div className="w-full my-4">
              <div className="min-h-[82px] w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 p-3 flex items-center justify-center flex-wrap gap-2 transition-all">
                {synthesizerRailTokens.length === 0 ? (
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500 italic text-center py-2">
                    {isKhmer
                      ? "ចុចអថេរ ឬសញ្ញាខាងក្រោមដើម្បីផ្គុំរូបមន្ត..."
                      : "Tap variables or symbols below to assemble the formula..."}
                  </span>
                ) : (
                  synthesizerRailTokens.map((tok, i) => (
                    <button
                      key={`${tok.id}-${i}`}
                      type="button"
                      disabled={status !== "idle"}
                      onClick={() => handleEjectFromRail(i)}
                      className={cn(
                        "rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 px-4 py-2 flex flex-col items-center justify-center shadow-sm active:translate-y-0.5 border-b-4 border-b-emerald-600 transition cursor-pointer hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 group animate-in zoom-in-95",
                        tok.category === "operator" ? "min-w-[50px]" : "min-w-[72px]",
                      )}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-rose-500 leading-none mb-0.5">
                        {tok.name_km}
                      </span>
                      <span className="text-xl font-black font-mono">{tok.symbol}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Tactile 3D Variable Bank */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 my-3 max-w-lg mx-auto">
              {currentQ.variables_pool.map((variable) => {
                const isSnapped = synthesizerRailTokens.some((t) => t.id === variable.id);
                return (
                  <div key={variable.id} className="relative">
                    {isSnapped ? (
                      /* Depleted sunken placeholder slot */
                      <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 px-3.5 py-2 flex flex-col items-center justify-center min-w-[68px] h-[58px] pointer-events-none" />
                    ) : (
                      /* Active Chunky 3D Tile */
                      <button
                        type="button"
                        disabled={status !== "idle"}
                        onClick={() => handleSnapToRail(variable)}
                        className={cn(
                          "rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-850 dark:text-white px-3.5 py-2 flex flex-col items-center justify-center min-w-[68px] shadow-sm border-b-[4px] border-b-slate-300 dark:border-b-slate-950 active:border-b-0 active:translate-y-1 transition cursor-pointer",
                          variable.category === "operator" && "min-w-[52px]",
                        )}
                      >
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none mb-0.5">
                          {variable.name_km}
                        </span>
                        <span className="text-lg sm:text-xl font-black font-mono">
                          {variable.symbol}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* ARCHETYPE 2: FIRST-PRINCIPLES CONCEPT DECIDER / LAB CALCULATION   */}
        {/* ================================================================= */}
        {(currentQ.type === "concept_choice" || currentQ.type === "lab_calculation") && (
          <div className="animate-in fade-in duration-200">
            {/* Real-World Analogy Banner */}
            {"scientific_analogy_km" in currentQ && currentQ.scientific_analogy_km && (
              <div className="mb-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2.5">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                <span>
                  {isKhmer ? currentQ.scientific_analogy_km : currentQ.scientific_analogy_en}
                </span>
              </div>
            )}

            {/* Given Parameters Card */}
            {"given_values_km" in currentQ && ((isKhmer ? currentQ.given_values_km : currentQ.given_values_en) || []).length > 0 && (
              <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-750 flex flex-col items-center justify-center text-center shadow-sm">
                {((isKhmer ? currentQ.given_values_km : currentQ.given_values_en) || []).map((item, i) => (
                  <div key={i} className="flex flex-col items-center w-full min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      {item.label}
                    </span>
                    <div className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 py-1 overflow-x-auto max-w-full">
                      <SafeMathBlock math={item.value} displayMode={true} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3D Option Cards */}
            <div className="grid gap-3">
              {(isKhmer ? currentQ.options_km : currentQ.options_en).map((opt, i) => {
                const isSelected = selectedChoiceIndex === i;
                const isCorrect = i === currentQ.correct_index;
                const isChecked = status !== "idle";

                let cardStyle =
                  "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-800 dark:text-white border-b-[4px] border-b-slate-300 dark:border-b-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-0 active:translate-y-1";

                if (isSelected && !isChecked) {
                  cardStyle =
                    "border-[#1CB0F6] bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-white border-b-[4px] border-b-[#1899D6] ring-2 ring-[#1CB0F6]/30 translate-y-0.5";
                } else if (isChecked) {
                  if (isCorrect) {
                    cardStyle =
                      "border-[#58CC02] bg-[#D7FFB8]/50 dark:bg-[#0D3320] text-emerald-950 dark:text-emerald-100 border-b-[4px] border-b-[#46A302]";
                  } else if (isSelected) {
                    cardStyle =
                      "border-[#EA2B2B] bg-[#FFDFE0]/50 dark:bg-[#331114] text-rose-950 dark:text-rose-100 border-b-[4px] border-b-[#B01717]";
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isChecked}
                    onClick={() => handleSelectChoice(i)}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer shadow-sm",
                      cardStyle,
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 dark:bg-slate-750 text-xs font-black text-slate-600 dark:text-slate-300 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm sm:text-base font-bold leading-snug">
                        <OptionMathContent text={opt} />
                      </span>
                    </div>

                    {isChecked && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isChecked && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* ARCHETYPE 3: DERIVATION CHAIN                                     */}
        {/* ================================================================= */}
        {currentQ.type === "derivation_chain" && (
          <div className="animate-in fade-in duration-200">
            {/* Quick interactive hint when in idle mode */}
            {status === "idle" ? (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold mb-3.5 shadow-2xs">
                <ArrowUpDown className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0 animate-bounce" />
                <div className="leading-relaxed">
                  <span className="font-black text-amber-700 dark:text-amber-300 block">
                    {isKhmer ? "🔄 លំហាត់តម្រៀបលំដាប់ (Step Ordering)" : "🔄 Step Ordering Challenge"}
                  </span>
                  <span>
                    {activeSwapIndex !== null
                      ? isKhmer
                        ? "👉 បានរើសកាតមួយហើយ! សូមចុចលើកាតទី ២ ដើម្បីប្តូរទីតាំងគ្នាទៅវិញទៅមក"
                        : "👉 1st step selected! Tap another step to swap them"
                      : isKhmer
                        ? "👉 ចុចលើប៊ូតុង ⬆️ / ⬇️ ដើម្បីរុញជំហានឡើងលើ/ចុះក្រោម ឬចុចលើកាតពីរដើម្បីប្តូរទីតាំងគ្នាឱ្យត្រឹមត្រូវ"
                        : "Tap ⬆️ / ⬇️ to move up/down, or tap two steps to swap them into the correct sequence"}
                  </span>
                </div>
              </div>
            ) : status === "wrong" ? (
              <div className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-semibold mb-3.5 shadow-2xs">
                <HelpCircle className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800 dark:text-rose-300 block">
                    {isKhmer
                      ? "ជំហានទាំងអស់សុទ្ធតែត្រូវ ប៉ុន្តែលំដាប់លំដោយមិនទាន់ត្រូវទីតាំងទេ!"
                      : "All steps belong to the solution, but their sequential order is incorrect!"}
                  </span>
                  <span className="text-[11px] opacity-90 block mt-0.5">
                    {isKhmer
                      ? "ពិនិត្យមើលលំដាប់លំដោយត្រឹមត្រូវនៅផ្នែកខាងក្រោម ដើម្បីយល់ច្បាស់ពីដំណោះស្រាយ។"
                      : "Review the correct sequential solution below."}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="grid gap-2.5">
              {derivationPositions.map((stepOriginalIndex, positionIdx) => {
                const rawStepText = isKhmer
                  ? currentQ.steps_km[stepOriginalIndex]
                  : currentQ.steps_en[stepOriginalIndex];
                const stepText = cleanStepText(rawStepText);
                const isSelectedToSwap = status === "idle" && activeSwapIndex === positionIdx;
                const isCorrectPos =
                  currentQ.correct_chain_order[positionIdx] === stepOriginalIndex;

                let cardStyle =
                  "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-800 dark:text-white border-b-[3px] border-b-slate-300 dark:border-b-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.99]";

                if (isSelectedToSwap) {
                  cardStyle =
                    "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-white border-b-[3px] border-b-sky-600 ring-2 ring-sky-400/30 scale-[1.01]";
                } else if (status !== "idle") {
                  cardStyle = isCorrectPos
                    ? "border-emerald-500 bg-emerald-50/70 dark:bg-[#0D3320]/60 text-emerald-950 dark:text-emerald-100 border-b-[3px] border-b-emerald-600"
                    : "border-rose-400 bg-rose-50/70 dark:bg-[#331114]/60 text-rose-950 dark:text-rose-100 border-b-[3px] border-b-rose-500";
                }

                return (
                  <button
                    key={positionIdx}
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => handleStepSwap(positionIdx)}
                    className={cn(
                      "w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 cursor-pointer shadow-sm transition-all",
                      cardStyle,
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Step Number Slot Badge */}
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-xl text-xs font-black shrink-0 transition-colors",
                          isSelectedToSwap
                            ? "bg-sky-500 text-white shadow-sm"
                            : status !== "idle"
                              ? isCorrectPos
                                ? "bg-emerald-600 text-white"
                                : "bg-rose-500 text-white"
                              : "bg-slate-100 dark:bg-slate-750 text-slate-700 dark:text-slate-200",
                        )}
                      >
                        {positionIdx + 1}
                      </span>
                      <span className="text-sm font-semibold leading-snug break-words">
                        {stepText}
                      </span>
                    </div>

                    {/* Right Side Status / Action Controls */}
                    {status === "idle" ? (
                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        {/* Up / Down Reordering Buttons */}
                        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                          <button
                            type="button"
                            disabled={positionIdx === 0}
                            onClick={(e) => handleStepMove(positionIdx, "up", e)}
                            className={cn(
                              "p-1 rounded-lg transition text-slate-600 dark:text-slate-300",
                              positionIdx === 0
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 cursor-pointer shadow-2xs active:scale-90"
                            )}
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                          </button>
                          <button
                            type="button"
                            disabled={positionIdx === derivationPositions.length - 1}
                            onClick={(e) => handleStepMove(positionIdx, "down", e)}
                            className={cn(
                              "p-1 rounded-lg transition text-slate-600 dark:text-slate-300",
                              positionIdx === derivationPositions.length - 1
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 cursor-pointer shadow-2xs active:scale-90"
                            )}
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Swap indicator */}
                        <span
                          onClick={() => handleStepSwap(positionIdx)}
                          className={cn(
                            "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all cursor-pointer",
                            isSelectedToSwap
                              ? "bg-sky-500 text-white shadow-sm animate-pulse"
                              : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
                          )}
                        >
                          <ArrowUpDown className="w-3 h-3" />
                          <span>{isSelectedToSwap ? (isKhmer ? "បានរើស..." : "Selected...") : (isKhmer ? "ប្តូរ" : "Swap")}</span>
                        </span>
                      </div>
                    ) : isCorrectPos ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full shrink-0 border border-emerald-300/80 dark:border-emerald-800">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>{isKhmer ? "ត្រូវ" : "Correct"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100/90 dark:bg-rose-950/80 px-2.5 py-1 rounded-full shrink-0 border border-rose-300/80 dark:border-rose-800">
                        <X className="h-3.5 w-3.5 stroke-[3]" />
                        <span>{isKhmer ? "ខុសទីតាំង" : "Wrong spot"}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* 3. BOTTOM DUOLINGO-STYLE STICKY ACTION FOOTER                         */}
      {/* ===================================================================== */}
      <footer
        className={cn(
          "fixed bottom-0 left-0 right-0 border-t p-4 sm:p-5 select-none z-30 transition-all duration-300 pb-[max(1rem,env(safe-area-inset-bottom,0px))]",
          status === "idle" && "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
          status === "correct" &&
            "bg-[#D7FFB8] dark:bg-[#143319] border-[#A5ED6E] dark:border-[#27532D] text-[#256303] dark:text-emerald-100 shadow-xl animate-in slide-in-from-bottom duration-200",
          status === "wrong" &&
            "bg-[#FFDFE0] dark:bg-[#351518] border-[#FFB3B5] dark:border-[#5A2428] text-[#EA2B2B] dark:text-rose-100 shadow-xl animate-in slide-in-from-bottom duration-200",
        )}
      >
        <div className="mx-auto flex w-full max-w-2xl sm:max-w-3xl items-center justify-between gap-4">
          {/* Status Idle: Socratic Hint Button */}
          {status === "idle" && (
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setShowSocraticCard(!showSocraticCard);
              }}
              className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-amber-500 transition cursor-pointer"
            >
              <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{isKhmer ? "គន្លឹះជំនួយ (HINT)" : "NEED A HINT?"}</span>
            </button>
          )}

          {/* Status Correct: Duolingo Vibrant Celebration */}
          {status === "correct" && (
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#58CC02] text-white shadow-md shrink-0">
                <Check className="h-7 w-7 stroke-[3.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#58A700] dark:text-[#58CC02] tracking-wide leading-tight">
                  {isKhmer ? "ត្រឹមត្រូវណាស់! 🎉" : "Nicely Done! 🎉"}
                </h3>
                {explanation && (
                  <div className="text-xs sm:text-sm font-semibold text-[#407A00] dark:text-[#A0DB75] leading-relaxed mt-1.5">
                    <QuizMarkdownContent content={explanation} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Wrong: Duolingo Clean Guidance with High-Contrast Card */}
          {status === "wrong" && (
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EA2B2B] text-white shadow-md shrink-0 mt-0.5">
                <X className="h-7 w-7 stroke-[3.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#EA2B2B] dark:text-[#FF6B6B] tracking-wide leading-tight">
                  {isKhmer ? "មិនទាន់ត្រឹមត្រូវទេ!" : "Not quite yet!"}
                </h3>

                {/* Solution Card with WCAG AA High Contrast */}
                {currentQ.type === "derivation_chain" && (
                  <div className="mt-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
                    <span className="font-black text-rose-700 dark:text-rose-400 text-xs uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{isKhmer ? "លំដាប់លំដោយត្រឹមត្រូវតាមស្តង់ដារ៖" : "Correct Standard Sequence:"}</span>
                    </span>
                    <div className="space-y-1.5">
                      {currentQ.correct_chain_order.map((origIdx, pos) => {
                        const text = isKhmer ? currentQ.steps_km[origIdx] : currentQ.steps_en[origIdx];
                        return (
                          <div key={pos} className="flex items-start gap-2 text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {pos + 1}
                            </span>
                            <span>{cleanStepText(text)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentQ.type === "synthesizer" && (
                  <div className="mt-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
                    <span className="font-black text-rose-700 dark:text-rose-400 text-xs uppercase tracking-wider block mb-1">
                      {isKhmer ? "រូបមន្តត្រឹមត្រូវ៖" : "Correct Formula:"}
                    </span>
                    <div className="text-base sm:text-lg font-black font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2 flex-wrap">
                      {currentQ.target_sequence_ids.map((id, idx) => {
                        const v = currentQ.variables_pool.find((p) => p.id === id);
                        return (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                            {v ? v.symbol : id}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {(currentQ.type === "concept_choice" || currentQ.type === "lab_calculation") && (
                  <div className="mt-2 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-rose-700 dark:text-rose-400 text-xs uppercase tracking-wider">
                        {isKhmer ? "ចម្លើយត្រឹមត្រូវ៖" : "Correct Answer:"}
                      </span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        <OptionMathContent text={isKhmer ? currentQ.options_km[currentQ.correct_index] : currentQ.options_en[currentQ.correct_index]} />
                      </span>
                    </div>
                    {explanation && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">
                          {isKhmer ? "ដំណោះស្រាយលម្អិត ៖" : "Step-by-Step Solution:"}
                        </span>
                        <QuizMarkdownContent content={explanation} />
                      </div>
                    )}
                  </div>
                )}

                <Link
                  to="/tutor"
                  search={{
                    initialPrompt: currentQ
                      ? `ខ្ញុំមិនទាន់យល់លំហាត់នេះទេ៖ «${currentQ.prompt_km || currentQ.prompt_en}» ក្នុងមេរៀន ${lesson?.title_km || ""}។ សូមជួយពន្យល់បកស្រាយឱ្យខ្ញុំយល់។`
                      : undefined,
                  }}
                  onClick={() => sounds.playPop()}
                  className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-50 transition shadow-2xs cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>{isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ ឱ្យជួយពន្យល់" : "Ask Kru Vuth to Explain"}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Primary Action Button (CHECK / CONTINUE) */}
          <div className="ml-auto shrink-0">
            {status === "idle" ? (
              <button
                type="button"
                disabled={!hasAnswer}
                onClick={verifyHypothesis}
                className={cn(
                  "h-13 sm:h-14 px-8 sm:px-12 rounded-2xl font-black uppercase tracking-wider text-sm sm:text-base transition-all select-none",
                  hasAnswer
                    ? "bg-[#58CC02] hover:bg-[#46A302] border-b-[5px] border-[#46A302] text-white shadow-lg active:border-b-0 active:translate-y-[5px] cursor-pointer"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-b-[4px] border-slate-300 dark:border-slate-900 cursor-not-allowed",
                )}
              >
                {isKhmer ? "ពិនិត្យ" : "CHECK"}
              </button>
            ) : (
              <button
                type="button"
                onClick={advanceProtocol}
                className={cn(
                  "h-13 sm:h-14 px-8 sm:px-12 rounded-2xl font-black uppercase tracking-wider text-sm sm:text-base text-white shadow-lg border-b-[5px] active:border-b-0 active:translate-y-[5px] transition-all cursor-pointer",
                  status === "correct"
                    ? "bg-[#58CC02] hover:bg-[#46A302] border-[#46A302]"
                    : "bg-[#EA2B2B] hover:bg-[#D42020] border-[#B01717]",
                )}
              >
                {status === "correct"
                  ? isKhmer ? "បន្ត" : "CONTINUE"
                  : isKhmer ? "យល់ហើយ" : "GOT IT"}
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Out of Hearts Modal Dialog */}
      {showOutOfHeartsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 text-center shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-3xl shadow-inner">
              💔
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {isKhmer ? "អ្នកបានអស់ជីវិតហើយ!" : "You're Out of Hearts!"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">
                {isKhmer
                  ? "កុំបារម្ភ! អ្នកអាចបំពេញ 5 ជីវិតឡើងវិញដោយឥតគិតថ្លៃដើម្បីបន្តរៀនមេរៀននេះ។"
                  : "Don't worry! Refill 5 hearts for free right now to continue practicing this lesson."}
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  refillHearts();
                  setShowOutOfHeartsModal(false);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#58CC02] hover:bg-[#46A302] border-b-[5px] border-[#46A302] active:border-b-0 active:translate-y-1 text-white font-black uppercase tracking-wider text-sm shadow-md transition cursor-pointer"
              >
                {isKhmer ? "បំពេញ ៥ ជីវិតឡើងវិញ ❤️" : "Refill 5 Hearts ❤️"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOutOfHeartsModal(false);
                  navigate({ to: "/lessons" });
                }}
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                {isKhmer ? "ត្រឡប់ទៅកម្មវិធីសិក្សា" : "Back to Curriculum"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
