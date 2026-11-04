import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Atom,
  FlaskConical,
  Sparkles,
  Languages,
  Flame,
  Heart,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Dna,
  Globe2,
  GraduationCap,
  Play,
  Check,
  Compass,
  Bot,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
  Coins,
  Shield,
  Layers,
  Award,
  Users,
  Clock,
  HelpCircle,
  CheckCheck,
  RotateCcw,
  Terminal,
  Cpu,
  Database,
  Code2,
  Sparkle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScienceKH — The Gamified STEM Platform for Cambodian Grade 7–12" },
      {
        name: "description",
        content:
          "Professional bilingual STEM learning platform for Cambodian high school students (Grade 7–12). Features interactive learning paths, daily streaks, 5-heart quizzes, and an on-demand AI tutor.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { user, loading } = useAuth();
  const [lang, setLang] = useState<"km" | "en">("km");
  const isKhmer = lang === "km";

  // Hero Product Console Tab
  const [heroTab, setHeroTab] = useState<"quiz" | "path" | "tutor" | "leaderboard">("quiz");

  // Hero practice demo state
  const [demoSelected, setDemoSelected] = useState<number | null>(null);
  const [demoStatus, setDemoStatus] = useState<"idle" | "correct" | "wrong">("idle");

  // Grade selection state for curriculum
  const [activeGrade, setActiveGrade] = useState<number>(12);

  // Vocabulary Matcher state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<{ id: string; type: "km" | "en"; pairId: string } | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!loading && user) {
    return <Navigate to="/home" />;
  }

  const handleDemoAnswer = (idx: number) => {
    setDemoSelected(idx);
    if (idx === 1) {
      setDemoStatus("correct");
      sounds.playCorrect();
      launchConfetti();
    } else {
      setDemoStatus("wrong");
      sounds.playWrong();
      sounds.playHeartLost();
    }
  };

  const handleDemoReset = () => {
    setDemoSelected(null);
    setDemoStatus("idle");
  };

  // Vocabulary Matcher items
  const vocabCards = [
    { id: "k1", pairId: "atom", type: "km" as const, text: "អាតូម" },
    { id: "e1", pairId: "atom", type: "en" as const, text: "Atom" },
    { id: "k2", pairId: "force", type: "km" as const, text: "កម្លាំង" },
    { id: "e2", pairId: "force", type: "en" as const, text: "Force" },
    { id: "k3", pairId: "accel", type: "km" as const, text: "សំទុះ" },
    { id: "e3", pairId: "accel", type: "en" as const, text: "Acceleration" },
    { id: "k4", pairId: "photosyn", type: "km" as const, text: "រស្មីសំយោគ" },
    { id: "e4", pairId: "photosyn", type: "en" as const, text: "Photosynthesis" },
  ];

  const handleVocabClick = (card: { id: string; type: "km" | "en"; pairId: string }) => {
    if (matchedPairs.includes(card.pairId)) return;

    if (!selectedWord) {
      setSelectedWord(card);
      return;
    }

    if (selectedWord.id === card.id) {
      setSelectedWord(null);
      return;
    }

    if (selectedWord.pairId === card.pairId && selectedWord.type !== card.type) {
      sounds.playCorrect();
      setMatchedPairs((prev) => [...prev, card.pairId]);
      setSelectedWord(null);
      if (matchedPairs.length === 3) {
        launchConfetti();
      }
    } else {
      sounds.playWrong();
      setSelectedWord(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="border-b border-emerald-500/20 bg-emerald-50/80 px-4 py-2 text-center text-xs font-semibold text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            BacII 2026
          </span>
          <span>
            {isKhmer
              ? "កម្មវិធីសិក្សាថ្មី៖ វិញ្ញាសារូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យាត្រៀមបាក់ឌុប បានដាក់បញ្ចូលរួចរាល់!"
              : "National Exam Ready: Grade 12 BacII practice papers and formula cheat-sheets now live!"}
          </span>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="ml-1 inline-flex items-center font-bold text-emerald-700 underline hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
          >
            {isKhmer ? "ចូលរៀន →" : "Explore →"}
          </Link>
        </div>
      </div>

      {/* 2. MINIMALIST GLASS NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900 transition group-hover:scale-105">
              <Atom className="h-5 w-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight">ScienceKH</span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                វិទ្យាសាស្ត្រ
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-400 lg:flex">
            <a href="#features" className="transition hover:text-slate-900 dark:hover:text-white">
              {isKhmer ? "មុខងារគោល" : "Features"}
            </a>
            <a href="#curriculum" className="transition hover:text-slate-900 dark:hover:text-white">
              {isKhmer ? "កម្មវិធីសិក្សា ៧-១២" : "Curriculum"}
            </a>
            <a href="#bacii" className="transition hover:text-slate-900 dark:hover:text-white">
              {isKhmer ? "ត្រៀមបាក់ឌុប (BacII)" : "BacII Prep"}
            </a>
            <a href="#architecture" className="transition hover:text-slate-900 dark:hover:text-white">
              {isKhmer ? "បច្ចេកវិទ្យា (Architecture)" : "Tech Stack"}
            </a>
            <a href="#faq" className="transition hover:text-slate-900 dark:hover:text-white">
              {isKhmer ? "សំណួរចម្លើយ" : "FAQ"}
            </a>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Bilingual Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "km" ? "en" : "km")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Languages className="h-3.5 w-3.5 text-emerald-500" />
              <span>{isKhmer ? "English" : "ខ្មែរ"}</span>
            </button>

            <Link
              to="/auth"
              search={{ mode: "signin" }}
              className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white sm:inline-block"
            >
              {isKhmer ? "ចូលគណនី" : "Sign In"}
            </Link>

            <Button
              asChild
              className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                {isKhmer ? "ចាប់ផ្តើមឥតគិតថ្លៃ" : "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isKhmer
                ? "វេទិកាអប់រំវិទ្យាសាស្ត្រកម្រិតខ្ពស់សម្រាប់សិស្សកម្ពុជា"
                : "Advanced STEM Learning Platform for Cambodian Students"}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            {isKhmer ? (
              <>
                រៀនវិទ្យាសាស្ត្រកម្រិតវិទ្យាល័យ <br className="hidden sm:block" />
                ជាមួយវិធីសាស្ត្រ <span className="text-emerald-600 dark:text-emerald-400">អន្តរកម្មឆ្លាតវៃ</span> ត្រៀមប្រឡងបាក់ឌុប
              </>
            ) : (
              <>
                Master Cambodian High School Science with <br className="hidden sm:block" />
                <span className="text-emerald-600 dark:text-emerald-400">Gamified Micro-Learning</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400 leading-relaxed">
            {isKhmer
              ? "ជំនួសការទន្ទេញដោយការយល់ដឹងស៊ីជម្រៅ។ គ្របដណ្តប់ រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា និងផែនដីវិទ្យា ថ្នាក់ទី ៧-១២ ជាមួយផ្លូវរៀនអន្តរកម្ម ៥ បេះដូង រក្សា Streak និងគ្រូ AI ពន្យល់ជាភាសាខ្មែរ ២៤/៧។"
              : "Built for Grades 7 to 12. Accelerate comprehension for National BacII Exams with interactive stepping-stone roads, 5-heart challenges, spaced repetition, and an instant AI tutor in Khmer and English."}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-slate-900 px-6 font-bold text-white shadow-md transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                {isKhmer ? "ចាប់ផ្តើមរៀនឥឡូវនេះ" : "Start Learning Free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <a href="#curriculum">
                {isKhmer ? "ពិនិត្យកម្មវិធីសិក្សា ៧-១២" : "Explore Curriculum"}
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>{isKhmer ? "កម្មវិធីសិក្សាផ្លូវការ MoEYS" : "Aligned with MoEYS Syllabus"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>{isKhmer ? "វិញ្ញាសាប្រឡងបាក់ឌុបជាក់ស្តែង" : "Real BacII Exam Papers"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>{isKhmer ? "ភាសាខ្មែរ និង អង់គ្លេស" : "Bilingual Khmer & English"}</span>
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE PRODUCT SHOWCASE CONSOLE (Mac Browser Frame) */}
        <div className="mx-auto mt-14 max-w-5xl px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            {/* macOS Window Title Bar */}
            <div className="flex h-11 items-center justify-between border-b border-slate-200/80 bg-slate-50 px-4 dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              {/* Console Tabs */}
              <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setHeroTab("quiz")}
                  className={cn(
                    "rounded-md px-3 py-1 transition",
                    heroTab === "quiz"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  ⚡ {isKhmer ? "លំហាត់អនុវត្ត (Quiz)" : "Interactive Quiz"}
                </button>
                <button
                  type="button"
                  onClick={() => setHeroTab("path")}
                  className={cn(
                    "rounded-md px-3 py-1 transition",
                    heroTab === "path"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  🗺️ {isKhmer ? "ផ្លូវរៀន (Snake Path)" : "Learning Path"}
                </button>
                <button
                  type="button"
                  onClick={() => setHeroTab("tutor")}
                  className={cn(
                    "rounded-md px-3 py-1 transition",
                    heroTab === "tutor"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  🤖 {isKhmer ? "គ្រូ AI (Dr. Sokha)" : "AI Tutor"}
                </button>
                <button
                  type="button"
                  onClick={() => setHeroTab("leaderboard")}
                  className={cn(
                    "rounded-md px-3 py-1 transition hidden sm:inline-block",
                    heroTab === "leaderboard"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                  )}
                >
                  🏆 {isKhmer ? "តារាងពិន្ទុ (League)" : "League Ranking"}
                </button>
              </div>

              <div className="hidden text-[11px] font-mono text-slate-400 sm:block">
                app.sciencekh.edu
              </div>
            </div>

            {/* Console Screen Body */}
            <div className="p-6 md:p-8">
              {heroTab === "quiz" && (
                <div className="mx-auto max-w-xl">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-bold dark:border-slate-800">
                    <span className="flex items-center gap-1.5 text-orange-500">
                      <Flame className="h-4 w-4 fill-orange-500" /> 14 Day Streak
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-500">
                      <Heart className="h-4 w-4 fill-rose-500" /> 5 Hearts Remaining
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-500">
                      <Sparkles className="h-4 w-4 fill-amber-500" /> +30 XP Reward
                    </span>
                  </div>

                  {/* Question */}
                  <div className="mt-6 text-left">
                    <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {isKhmer ? "រូបវិទ្យា ថ្នាក់ទី ១០ · កម្លាំង និង ច្បាប់ញូតុន" : "Grade 10 Physics · Force & Newton's Laws"}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {isKhmer
                        ? "តើខ្នាតអន្តរជាតិ (SI) នៃកម្លាំង (Force, F) ក្នុងរូបវិទ្យាគឺជាអ្វី?"
                        : "What is the official SI unit of Force (F) in Physics?"}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="mt-5 space-y-2.5">
                    {[
                      { label: "Joule (ស៊ូល - J)", isCorrect: false },
                      { label: "Newton (ញូតុន - N)", isCorrect: true },
                      { label: "Watt (វ៉ាត់ - W)", isCorrect: false },
                      { label: "Pascal (ប៉ាស្កាល់ - Pa)", isCorrect: false },
                    ].map((opt, i) => {
                      const isSelected = demoSelected === i;
                      const isChecked = demoStatus !== "idle";

                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={isChecked}
                          onClick={() => handleDemoAnswer(i)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold transition",
                            !isChecked && isSelected
                              ? "border-emerald-500 bg-emerald-50/50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"
                              : !isChecked
                                ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                                : opt.isCorrect
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/60 dark:text-emerald-300"
                                  : isSelected
                                    ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300"
                                    : "border-slate-200 bg-white opacity-40 dark:border-slate-800 dark:bg-slate-900",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border text-xs font-bold text-slate-500">
                              {i + 1}
                            </span>
                            <span>{opt.label}</span>
                          </div>
                          {isChecked && opt.isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          )}
                          {isChecked && isSelected && !opt.isCorrect && (
                            <XCircle className="h-5 w-5 text-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Drawer */}
                  {demoStatus !== "idle" && (
                    <div
                      className={cn(
                        "mt-4 rounded-xl border p-3.5 text-left text-xs transition animate-in fade-in",
                        demoStatus === "correct"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
                          : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-200",
                      )}
                    >
                      <p className="font-bold">
                        {demoStatus === "correct"
                          ? isKhmer ? "🎉 ត្រឹមត្រូវណាស់! ញូតុន (N) = kg·m/s²" : "🎉 Correct! Newton (N) = kg·m/s²"
                          : isKhmer ? "❌ ចម្លើយត្រឹមត្រូវគឺ ញូតុន (Newton)" : "❌ Incorrect. The answer is Newton."}
                      </p>
                      <button
                        type="button"
                        onClick={handleDemoReset}
                        className="mt-2 font-bold underline cursor-pointer"
                      >
                        {isKhmer ? "សាកល្បងសំណួរម្តងទៀត" : "Try question again"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {heroTab === "path" && (
                <div className="mx-auto max-w-md py-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "ផ្លូវរៀនស្ទាត់ជំនាញ (Interactive Roadmap)" : "Interactive Winding Roadmap"}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-bold">
                    {isKhmer ? "ជំពូកទី ១ · រូបធាតុ និង ចលនា" : "Unit 1: Matter & Motion"}
                  </h4>

                  <div className="relative mt-8 flex flex-col items-center gap-6">
                    {/* Node 1 - Completed */}
                    <div className="flex flex-col items-center">
                      <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-amber-500 bg-amber-400 text-amber-950 shadow-md">
                        <Check className="h-7 w-7 stroke-[3]" />
                      </div>
                      <span className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {isKhmer ? "មេរៀនទី ១ · ល្បឿន និង បម្រែបម្រួល" : "Lesson 1: Speed & Velocity"}
                      </span>
                    </div>

                    {/* Node 2 - Active */}
                    <div className="flex flex-col items-center translate-x-10">
                      <div className="relative grid h-16 w-16 place-items-center rounded-full border-4 border-emerald-600 bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-300/40">
                        <Play className="h-7 w-7 fill-white ml-0.5" />
                        <span className="absolute -top-6 rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm dark:bg-white dark:text-slate-900">
                          START!
                        </span>
                      </div>
                      <span className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {isKhmer ? "មេរៀនទី ២ · កម្លាំង និង សំទុះ" : "Lesson 2: Force & Acceleration"}
                      </span>
                    </div>

                    {/* Node 3 - Locked */}
                    <div className="flex flex-col items-center -translate-x-10 opacity-60">
                      <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-slate-300 bg-slate-200 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <span className="mt-1 text-xs font-bold text-slate-500">
                        {isKhmer ? "ប្រឡងបញ្ចប់ជំពូក (Unit Test)" : "Unit 1 Boss Challenge"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {heroTab === "tutor" && (
                <div className="mx-auto max-w-xl text-left">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-white shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {isKhmer ? "លោកគ្រូ សុខា (Dr. Sokha AI Tutor)" : "Dr. Sokha (AI Science Tutor)"}
                      </p>
                      <p className="text-[11px] text-emerald-600 font-medium">Online · Ready in Khmer & English</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed">
                    <div className="flex justify-end">
                      <div className="rounded-xl rounded-tr-none bg-slate-900 p-3 text-white dark:bg-slate-800 max-w-md">
                        {isKhmer
                          ? "លោកគ្រូ ជួយថ្លឹងសមីការ Fe + O₂ → Fe₂O₃ មួយជំហានម្តងៗបានទេ?"
                          : "Teacher, can you help me balance Fe + O₂ → Fe₂O₃ step by step?"}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="rounded-xl rounded-tl-none border border-slate-200 bg-slate-50 p-3.5 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 max-w-lg">
                        {isKhmer ? (
                          <>
                            សួស្តីប្អូន! ដើម្បីថ្លឹងសមីការ <strong>Fe + O₂ → Fe₂O₃</strong>៖<br />
                            ១. រាប់អាតូម O៖ ខាងឆ្វេងមាន ២, ខាងស្តាំមាន ៣ $\rightarrow$ គុណ ៣ ខាងឆ្វេង និង ២ ខាងស្តាំ $\rightarrow$ <strong>3O₂ និង 2Fe₂O₃</strong><br />
                            ២. រាប់អាតូម Fe៖ ខាងស្តាំមាន $2 \times 2 = 4$ Fe $\rightarrow$ ដាក់មេគុណ ៤ នៅមុខ Fe<br />
                            ✨ <strong>សមីការថ្លឹងរួច៖</strong> <strong>4Fe + 3O₂ → 2Fe₂O₃</strong>!
                          </>
                        ) : (
                          <>
                            To balance <strong>Fe + O₂ → Fe₂O₃</strong>:<br />
                            1. Balance Oxygen: Left has 2 O, right has 3 O $\rightarrow$ Common multiple is 6. Put 3 before O₂ and 2 before Fe₂O₃.<br />
                            2. Balance Iron: Right has 4 Fe $\rightarrow$ Place 4 before Fe.<br />
                            Balanced Equation: <strong>4Fe + 3O₂ → 2Fe₂O₃</strong>!
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {heroTab === "leaderboard" && (
                <div className="mx-auto max-w-md">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-bold dark:border-slate-800">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <Trophy className="h-4 w-4" /> Diamond League · Top Cambodian Students
                    </span>
                    <span className="text-slate-500">Resets in 2d 14h</span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      { rank: 1, name: "Sokha V.", school: "Bak Touk High School", xp: 1420, medal: "🥇" },
                      { rank: 2, name: "Dara K.", school: "Sisowath NGS", xp: 1280, medal: "🥈" },
                      { rank: 3, name: "Bopha M.", school: "Hun Sen Siem Reap", xp: 1150, medal: "🥉" },
                      { rank: 4, name: "Vannak C.", school: "Kampong Cham High", xp: 980, medal: "4" },
                    ].map((row) => (
                      <div
                        key={row.rank}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-2.5",
                          row.rank === 1
                            ? "border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20"
                            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-center font-bold">{row.medal}</span>
                          <div className="text-left">
                            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
                            <p className="text-[10px] text-slate-500">{row.school}</p>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {row.xp} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES & GAMIFICATION METHODOLOGY */}
      <section id="features" className="border-t border-slate-200/80 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              {isKhmer ? "វិធីសាស្ត្រសិក្សាផ្អែកលើវិទ្យាសាស្ត្រ" : "Cognitive Learning Design"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {isKhmer ? "ហេតុអ្វីបានជា ScienceKH មានប្រសិទ្ធភាព?" : "Why ScienceKH Outperforms Static Books"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              {isKhmer
                ? "ការរៀនវិទ្យាសាស្ត្រទាមទារការអនុវត្តផ្ទាល់ មិនមែនការទន្ទេញដោយគ្មានការយល់ដឹងនោះទេ។"
                : "Active recall and spaced repetition engineered to build genuine mental models for STEM."}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500 text-white shadow-sm">
                <Flame className="h-6 w-6 fill-white" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                {isKhmer ? "ទម្លាប់ Streak ប្រចាំថ្ងៃ (15 Mins)" : "15-Minute Daily Streaks"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {isKhmer
                  ? "ការរៀនតិចៗរាល់ថ្ងៃជួយបង្កើនការចងចាំរយៈពេលវែង ត្រៀមប្រឡងបាក់ឌុបដោយមិនបាច់ប្រឹងទន្ទេញមុនពេលប្រឡង។"
                  : "Micro-learning habits build lasting long-term memory, eliminating stressful exam cramming."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-rose-500 text-white shadow-sm">
                <Heart className="h-6 w-6 fill-white" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                {isKhmer ? "ប្រព័ន្ធ ៥ បេះដូង (Hearts Engine)" : "5-Heart Precision Engine"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {isKhmer
                  ? "ឆ្លើយខុសបាត់បង់បេះដូង ជំរុញឱ្យសិស្សពិចារណាលើរូបមន្ត និងមូលហេតុច្បាស់លាស់មុននឹងជ្រើសរើសចម្លើយ។"
                  : "Stakes encourage deep critical thinking and formula verification over reckless guessing."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white shadow-sm">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                {isKhmer ? "គ្រូ AI ពន្យល់ជាភាសាខ្មែរ (Socratic)" : "Socratic AI Explainer"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {isKhmer
                  ? "ពេលឆ្លើយខុស ប៊ូតុង 'ពន្យល់ខ្ញុំ' នឹងបង្ហាញជំហានដោះស្រាយរូបមន្តជាភាសាខ្មែរយ៉ាងក្បោះក្បាយ។"
                  : "Get immediate step-by-step reasoning in Khmer whenever you make a mistake on a quiz."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE BILINGUAL VOCABULARY MATCHING MINI-GAME */}
      <section className="border-t border-slate-200/80 bg-slate-50/50 py-20 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              {isKhmer ? "ល្បែងផ្គូផ្គងពាក្យវិទ្យាសាស្ត្រ" : "Interactive Vocabulary Game"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {isKhmer ? "ស្ទាត់ជំនាញពាក្យបច្ចេកទេស ខ្មែរ-អង់គ្លេស" : "Bilingual Scientific Vocabulary"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              {isKhmer
                ? "ចុចពាក្យខ្មែរ និងពាក្យអង់គ្លេសដែលត្រូវគ្នា ដើម្បីស្តាប់សំឡេងជោគជ័យ!"
                : "Click a Khmer term, then click its corresponding English translation to pair them."}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-bold text-slate-500 dark:border-slate-800">
              <span>{isKhmer ? "ផ្គូផ្គង ៤ គូខាងក្រោម៖" : "Match the 4 pairs below:"}</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {matchedPairs.length} / 4 {isKhmer ? "បានផ្គូផ្គង" : "Matched"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {vocabCards.map((card) => {
                const isMatched = matchedPairs.includes(card.pairId);
                const isSelected = selectedWord?.id === card.id;

                return (
                  <button
                    key={card.id}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleVocabClick(card)}
                    className={cn(
                      "flex h-16 items-center justify-center rounded-xl border p-2 text-center text-xs font-bold transition",
                      isMatched
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 opacity-60 cursor-default"
                        : isSelected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 dark:bg-emerald-950/50 dark:text-emerald-200"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                    )}
                  >
                    {card.text}
                  </button>
                );
              })}
            </div>

            {matchedPairs.length === 4 && (
              <div className="mt-5 rounded-xl bg-emerald-50 p-3 text-center dark:bg-emerald-950/40">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {isKhmer ? "🎉 អស្ចារ្យណាស់! អ្នកបានផ្គូផ្គងពាក្យទាំងអស់ដោយជោគជ័យ!" : "🎉 Awesome! You matched all pairs!"}
                </p>
                <button
                  type="button"
                  onClick={() => setMatchedPairs([])}
                  className="mt-1 text-xs font-bold text-emerald-700 underline dark:text-emerald-300 cursor-pointer"
                >
                  {isKhmer ? "លេងម្តងទៀត" : "Reset & Play Again"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. GRADE 7 TO 12 CURRICULUM SELECTOR */}
      <section id="curriculum" className="border-t border-slate-200/80 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {isKhmer ? "ថ្នាក់ទី ៧ ដល់ ទី ១២" : "Grade 7 through 12"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {isKhmer ? "កម្មវិធីសិក្សាតាមកម្រិតថ្នាក់ MoEYS" : "Official MoEYS Syllabus Coverage"}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-400">
              {isKhmer
                ? "ជ្រើសរើសថ្នាក់របស់អ្នក ដើម្បីមើលជំពូក និងមេរៀននីមួយៗ"
                : "Select a grade level to review specific chapters and national exam readiness."}
            </p>

            {/* Grade Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveGrade(g)}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-xs font-bold transition",
                    activeGrade === g
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-slate-900"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400",
                  )}
                >
                  {isKhmer ? `ថ្នាក់ទី ${g}` : `Grade ${g}`}
                  {g === 9 && (
                    <span className="ml-1.5 rounded bg-amber-400 px-1 py-0.2 text-[10px] text-amber-950 font-bold">
                      ឌីប្លូម
                    </span>
                  )}
                  {g === 12 && (
                    <span className="ml-1.5 rounded bg-emerald-400 px-1 py-0.2 text-[10px] text-emerald-950 font-bold">
                      បាក់ឌុប
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grade Detail Card */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {activeGrade >= 10
                    ? isKhmer ? "វិទ្យាល័យ (Upper Secondary)" : "Upper Secondary (High School)"
                    : isKhmer ? "អនុវិទ្យាល័យ (Lower Secondary)" : "Lower Secondary (Middle School)"}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {isKhmer ? `កម្មវិធីសិក្សាវិទ្យាសាស្ត្រ ថ្នាក់ទី ${activeGrade}` : `Grade ${activeGrade} Science Syllabus`}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {activeGrade === 12
                    ? isKhmer
                      ? "ផ្តោតលើការប្រឡងបាក់ឌុប (BacII) ថ្នាក់វិទ្យាសាស្ត្រ និងសង្គម។ វិញ្ញាសាជាក់ស្តែងពីរដ្ឋ ដំណោះស្រាយ និងរូបមន្តសង្ខេបសម្រាប់យកនិទ្ទេស A ។"
                      : "Focused on the National BacII Exam for Science & Social tracks. Real past papers, rubrics, and formula cheat-sheets for Grade A results."
                    : activeGrade === 9
                      ? isKhmer
                        ? "ត្រៀមប្រឡងឌីប្លូមមធ្យមសិក្សាបឋមភូមិ ជាមួយការយល់ដឹងពីមូលដ្ឋានគ្រឹះរូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា។"
                        : "Preparation for the Grade 9 National Diploma examination with core science principles."
                      : isKhmer
                        ? `មេរៀន និងលំហាត់អនុវត្តប្រចាំសប្តាហ៍សម្រាប់សិស្សថ្នាក់ទី ${activeGrade} ស្របតាមសៀវភៅពុម្ពក្រសួងអប់រំ។`
                        : `Complete weekly structured lessons and quizzes for Grade ${activeGrade} students.`}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(activeGrade === 12
                    ? [
                        "រូបវិទ្យាបាក់ឌុប",
                        "គីមីសរីរាង្គ & អេស្ទែ",
                        "ពន្ធុវិទ្យាម៉ូលេគុល & DNA",
                        "ចលនាត្រង់ប្រែប្រួលស្មើ",
                        "សមតុល្យគីមី & pH",
                      ]
                    : [
                        `ជំពូកទី ១ · រូបធាតុ និង ចលនា`,
                        `ជំពូកទី ២ · ប្រតិកម្មគីមី`,
                        `ជំពូកទី ៣ · កោសិកា និង បរិស្ថាន`,
                        `ជំពូកទី ៤ · ថាមពលអគ្គិសនី`,
                      ]
                  ).map((ch, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 lg:text-right">
                <Button
                  asChild
                  className="h-11 w-full rounded-xl bg-emerald-600 font-bold text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {isKhmer ? `រៀនថ្នាក់ទី ${activeGrade} ឥតគិតថ្លៃ` : `Start Grade ${activeGrade}`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SYSTEM ARCHITECTURE & ENGINEERING EXCELLENCE (Portfolio Showcase) */}
      <section id="architecture" className="border-t border-slate-200/80 bg-slate-900 py-20 text-white dark:bg-black">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
              Technical Architecture
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isKhmer ? "រចនាសម្ព័ន្ធបច្ចេកវិទ្យាកម្រិតខ្ពស់" : "Engineered for Performance & Scale"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              {isKhmer
                ? "បង្កើតឡើងដោយប្រើបច្ចេកវិទ្យាទំនើបចុងក្រោយបំផុត ដើម្បីធានាបាននូវល្បឿន និងសុវត្ថិភាពខ្ពស់"
                : "A modern, full-stack architecture built on React 19, TanStack Start SSR, and Supabase PostgreSQL."}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="mt-4 font-bold text-white">TanStack Start SSR</h4>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Server-side rendering, file-based routing, and sub-100ms hydration built on modern Vite.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/20 text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="mt-4 font-bold text-white">PostgreSQL & RLS</h4>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Supabase relational database with strict Row-Level Security, automated streak crons, and schema migrations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-purple-500/20 text-purple-400">
                <Bot className="h-5 w-5" />
              </div>
              <h4 className="mt-4 font-bold text-white">Socratic AI Engine</h4>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Custom server functions with OpenAI integration, prompt-engineered to teach in fluent Khmer.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/20 text-amber-400">
                <Sparkle className="h-5 w-5" />
              </div>
              <h4 className="mt-4 font-bold text-white">Zero-Dep Web Audio</h4>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Pure Web Audio API synthesizers for reactive chimes, buzzers, and 60fps canvas particle confetti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="border-t border-slate-200/80 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {isKhmer ? "សំណួរដែលសួរញឹកញាប់" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                qKm: "តើ ScienceKH ពិតជាឥតគិតថ្លៃមែនទេ?",
                qEn: "Is ScienceKH really 100% free to use?",
                aKm: "បាទ/ចាស! ScienceKH ត្រូវបានបង្កើតឡើងដើម្បីផ្តល់ឱកាសរៀនស្មើៗគ្នាដល់សិស្សកម្ពុជាទូទាំងប្រទេស។ សិស្សអាចរៀនមេរៀន ធ្វើលំហាត់ និងសួរគ្រូ AI ដោយមិនចាំបាច់បង់ប្រាក់ឡើយ។",
                aEn: "Yes! ScienceKH is completely free to start for Cambodian students, offering equal access to quality STEM education.",
              },
              {
                qKm: "តើខ្លឹមសារមេរៀនស្របតាមក្រសួងអប់រំ (MoEYS) ដែរឬទេ?",
                qEn: "Is the curriculum aligned with Cambodia's MoEYS syllabus?",
                aKm: "ស្របតាម ១០០%! គ្រប់មេរៀនទាំងអស់នៃរូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា និងផែនដីវិទ្យា ចាប់ពីថ្នាក់ទី ៧ ដល់ទី ១២ គឺផ្អែកលើសៀវភៅពុម្ពផ្លូវការ និងវិញ្ញាសាប្រឡងឌីប្លូម និងបាក់ឌុបជាក់ស្តែង។",
                aEn: "100% aligned. Every lesson and quiz matches the official Cambodian national curriculum from Grade 7 to 12.",
              },
              {
                qKm: "តើប្រព័ន្ធ ៥ បេះដូង (Hearts) ដំណើរការយ៉ាងដូចម្តេច?",
                qEn: "How does the 5 Hearts system work?",
                aKm: "នៅពេលអ្នកចាប់ផ្តើមធ្វើ Quiz អ្នកមាន ៥ បេះដូង។ ប្រសិនបើឆ្លើយខុស អ្នកនឹងបាត់បង់ ១ បេះដូង។ បេះដូងជួយជំរុញឱ្យអ្នកគិតឱ្យបានហ្មត់ចត់លើរូបមន្តមុននឹងឆ្លើយ។ បើអស់បេះដូង អ្នកអាចពិនិត្យមេរៀនឡើងវិញ ឬព្យាយាមម្តងទៀត។",
                aEn: "You start each quiz with 5 hearts. Missing a question costs 1 heart, encouraging thoughtful reasoning over random guessing.",
              },
              {
                qKm: "តើគ្រូ AI ជួយពន្យល់លំហាត់យ៉ាងដូចម្តេច?",
                qEn: "How does the AI Socratic Tutor help me study?",
                aKm: "នៅពេលអ្នកជួបលំហាត់ពិបាក ឬឆ្លើយខុស គ្រូ AI នឹងពន្យល់ពីមូលហេតុ និងជំហានដោះស្រាយរូបមន្តជាភាសាខ្មែរយ៉ាងច្បាស់លាស់ ដូចមានលោកគ្រូផ្ទាល់ខ្លួននៅក្បែរ ២៤ ម៉ោង។",
                aEn: "When you miss a question or get stuck, the AI Tutor provides step-by-step explanations in Khmer or English.",
              },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4.5 transition dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between text-left text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <span>{isKhmer ? faq.qKm : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-2.5 dark:border-slate-800 dark:text-slate-400">
                      {isKhmer ? faq.aKm : faq.aEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL ENROLLMENT CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 p-10 text-white shadow-xl sm:p-14 dark:border-slate-800">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              {isKhmer
                ? "ចាប់ផ្តើមរៀនវិទ្យាសាស្ត្រថ្ងៃនេះ ដើម្បីអនាគតរបស់អ្នក!"
                : "Ready to Master High School Science in Cambodia?"}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-emerald-100/90 leading-relaxed">
              {isKhmer
                ? "ឥតគិតថ្លៃ ១០០%។ ចូលរួមជាមួយសិស្សទូទាំងប្រទេសកម្ពុជា ដើម្បីពូកែវិទ្យាសាស្ត្រ និងត្រៀមប្រឡងបាក់ឌុបដោយទំនុកចិត្ត។"
                : "Join thousands of Cambodian students building daily learning streaks, mastering formulas, and preparing for BacII."}
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-white px-7 font-bold text-slate-900 shadow-md transition hover:bg-slate-100"
              >
                <Link to="/auth" search={{ mode: "signup" }}>
                  {isKhmer ? "បង្កើតគណនីឥតគិតថ្លៃ" : "Create Free Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-12 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Atom className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">ScienceKH</span>
              <span>· Cambodian STEM Platform (Grade 7–12)</span>
            </div>

            <p className="text-center sm:text-right">
              © {new Date().getFullYear()} ScienceKH. Portfolio Project engineered by{" "}
              <a
                href="https://github.com/VuthDev2"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-slate-900 underline hover:text-emerald-600 dark:text-white"
              >
                VuthDev2
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
