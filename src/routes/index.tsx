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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScienceKH — The Duolingo for Cambodian STEM (Grade 7–12)" },
      {
        name: "description",
        content:
          "Master Cambodian High School Science (Grade 7–12) for BacII exams. Gamified learning with daily streaks, 5 hearts, bilingual Khmer-English exercises, and an AI tutor.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { user, loading } = useAuth();
  const [lang, setLang] = useState<"km" | "en">("km");
  const isKhmer = lang === "km";

  // Hero practice demo state
  const [demoSubject, setDemoSubject] = useState<"physics" | "chemistry" | "biology">("physics");
  const [demoSelected, setDemoSelected] = useState<number | null>(null);
  const [demoStatus, setDemoStatus] = useState<"idle" | "correct" | "wrong">("idle");

  // Grade selection state for curriculum
  const [activeGrade, setActiveGrade] = useState<number>(12);

  // Interactive Vocabulary Matcher State
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<{ id: string; type: "km" | "en"; pairId: string } | null>(null);

  // Interactive AI Tutor Sandbox Prompt
  const [activeAiPrompt, setActiveAiPrompt] = useState<number>(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!loading && user) {
    return <Navigate to="/home" />;
  }

  // Handle Demo Quiz Answer
  const demoQuestions = {
    physics: {
      tagKm: "រូបវិទ្យា ថ្នាក់ទី ១០ · កម្លាំង និង ច្បាប់ញូតុន",
      tagEn: "Grade 10 Physics · Force & Newton's Laws",
      questionKm: "តើខ្នាតអន្តរជាតិ (SI) នៃកម្លាំង (Force, F) គឺជាអ្វី?",
      questionEn: "What is the official SI unit of Force (F) in Physics?",
      options: [
        { label: "Joule (ស៊ូល - J)", isCorrect: false },
        { label: "Newton (ញូតុន - N)", isCorrect: true },
        { label: "Watt (វ៉ាត់ - W)", isCorrect: false },
        { label: "Pascal (ប៉ាស្កាល់ - Pa)", isCorrect: false },
      ],
      explanationKm: "ញូតុន (N) ជាខ្នាតកម្លាំង ដែល ១ N = ១ kg·m/s² ស្របតាមរូបមន្ត F = m · a ។",
      explanationEn: "Newton (N) is the SI unit of force, where 1 N = 1 kg·m/s² according to F = m · a.",
    },
    chemistry: {
      tagKm: "គីមីវិទ្យា ថ្នាក់ទី ១១ · សម្ព័ន្ធគីមី",
      tagEn: "Grade 11 Chemistry · Chemical Bonding",
      questionKm: "តើសម្ព័ន្ធរវាងម៉ូលេគុលទឹក (H₂O) និងទឹក ជាសម្ព័ន្ធអ្វី?",
      questionEn: "What type of intermolecular bond exists between water (H₂O) molecules?",
      options: [
        { label: "សម្ព័ន្ធអ៊ីយ៉ុង (Ionic Bond)", isCorrect: false },
        { label: "សម្ព័ន្ធអ៊ីដ្រូសែន (Hydrogen Bond)", isCorrect: true },
        { label: "សម្ព័ន្ធលោហៈ (Metallic Bond)", isCorrect: false },
        { label: "សម្ព័ន្ធកូវ៉ាឡង់ទោល (Non-polar Covalent)", isCorrect: false },
      ],
      explanationKm: "សម្ព័ន្ធអ៊ីដ្រូសែនកើតឡើងរវាងអាតូម H នៃម៉ូលេគុលមួយ ជាមួយអាតូម O នៃម៉ូលេគុលមួយទៀត។",
      explanationEn: "Hydrogen bonds occur between the H atom of one molecule and the O atom of another.",
    },
    biology: {
      tagKm: "ជីវវិទ្យា ថ្នាក់ទី ១២ · ពន្ធុវិទ្យាម៉ូលេគុល",
      tagEn: "Grade 12 Biology · Molecular Genetics",
      questionKm: "ក្នុងម៉ូលេគុល DNA តើបាសអាសូត អាដេនីន (A) ភ្ជាប់ជាមួយបាសអ្វី?",
      questionEn: "In a DNA molecule, Adenine (A) always pairs with which nitrogenous base?",
      options: [
        { label: "ហ្គានីន (Guanine - G)", isCorrect: false },
        { label: "ទីមីន (Thymine - T)", isCorrect: true },
        { label: "ស៊ីតូស៊ីន (Cytosine - C)", isCorrect: false },
        { label: "អ៊ុយរ៉ាស៊ីល (Uracil - U)", isCorrect: false },
      ],
      explanationKm: "តាមគោលការណ៍បំពេញបាសក្នុង DNA៖ A ភ្ជាប់ជាមួយ T (សម្ព័ន្ធ ២) ហើយ G ភ្ជាប់ជាមួយ C (សម្ព័ន្ធ ៣)។",
      explanationEn: "By complementary base pairing in DNA: A pairs with T, and G pairs with C.",
    },
  };

  const currentQ = demoQuestions[demoSubject];

  const handleDemoAnswer = (idx: number) => {
    setDemoSelected(idx);
    if (currentQ.options[idx].isCorrect) {
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

  // Vocabulary Matching Demo Items
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

    // Check if matching pair
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
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-primary px-4 py-2 text-center text-xs font-bold text-white shadow-inner">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur">
            New 🇰🇭
          </span>
          <span>
            {isKhmer
              ? "ត្រៀមប្រឡងបាក់ឌុប ២០២៦៖ វិញ្ញាសាគំរូថ្មី និងរូបមន្តសង្ខេបថ្នាក់ទី ១២ បានបន្ថែមរួចរាល់!"
              : "BacII 2026 Ready: New national exam papers & Grade 12 formula sheets now live!"}
          </span>
          <Link to="/auth" search={{ mode: "signup" }} className="ml-1 underline hover:text-emerald-200">
            {isKhmer ? "ចូលរៀនឥឡូវនេះ →" : "Explore now →"}
          </Link>
        </div>
      </div>

      {/* 2. STICKY GLASSMORPHISM NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md transition group-hover:scale-105">
              <Atom className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tight text-foreground">ScienceKH</span>
              <span className="ml-1.5 hidden rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 sm:inline-block">
                វិទ្យាសាស្ត្រ
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            <a
              href="#curriculum"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "កម្មវិធីសិក្សា ៧-១២" : "Grade 7–12"}
            </a>
            <a
              href="#gamification"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "របៀបរៀនបែបហ្គេម" : "Gamified Path"}
            </a>
            <a
              href="#bacii"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "ត្រៀមបាក់ឌុប" : "BacII Prep"}
            </a>
            <a
              href="#ai-tutor"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "គ្រូ AI" : "AI Tutor"}
            </a>
            <a
              href="#comparison"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "ការប្រៀបធៀប" : "Compare"}
            </a>
            <a
              href="#faq"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "សំណួរញឹកញាប់" : "FAQ"}
            </a>
          </nav>

          {/* Controls & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "km" ? "en" : "km")}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm transition hover:bg-muted"
            >
              <Languages className="h-3.5 w-3.5 text-emerald-500" />
              <span>{isKhmer ? "English 🇺🇸" : "ខ្មែរ 🇰🇭"}</span>
            </button>

            <Link
              to="/auth"
              search={{ mode: "signin" }}
              className="hidden text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground sm:inline-block"
            >
              {isKhmer ? "ចូលគណនី" : "Sign In"}
            </Link>

            <Button
              asChild
              className="h-10 rounded-xl border-b-4 border-emerald-700 bg-emerald-500 px-5 font-black text-white shadow-md transition active:border-b-0 active:translate-y-0.5 hover:bg-emerald-600"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                {isKhmer ? "ចាប់ផ្តើមឥតគិតថ្លៃ" : "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 py-16 lg:py-24">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[100px]" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Hero Text */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {isKhmer
                    ? "🇰🇭 កម្មវិធីសិក្សាជាតិ ក្រសួងអប់រំ យុវជន និងកីឡា · Grade 7–12"
                    : "🇰🇭 Cambodia MoEYS STEM Curriculum · Grade 7–12"}
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-black leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {isKhmer ? (
                  <>
                    រៀនវិទ្យាសាស្ត្របែប <span className="text-emerald-500">Duolingo</span> ត្រៀមប្រឡង{" "}
                    <span className="text-primary">ឌីប្លូម និងបាក់ឌុប</span>
                  </>
                ) : (
                  <>
                    The <span className="text-emerald-500">Duolingo</span> for High School Science in{" "}
                    <span className="text-primary">Cambodia</span>
                  </>
                )}
              </h1>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl">
                {isKhmer
                  ? "លែងបារម្ភរឿងទន្ទេញរូបមន្តស្មុគស្មាញ! ScienceKH ជួយសិស្សវិទ្យាល័យកម្ពុជាពីថ្នាក់ទី ៧ ដល់ទី ១២ ឱ្យយល់ច្បាស់ពី រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា និងផែនដីវិទ្យា តាមរយៈល្បែងសិក្សា ៥ បេះដូង រក្សា Streak និងគ្រូ AI ពន្យល់ជាភាសាខ្មែរ ២៤/៧។"
                  : "No more boring memorization. Master Physics, Chemistry, Biology & Earth Science with bite-sized stepping stone paths, 5-heart challenges, daily streaks, and an on-demand AI tutor in Khmer and English."}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-2xl border-b-4 border-emerald-700 bg-emerald-500 px-8 text-base font-black text-white shadow-xl transition active:border-b-0 active:translate-y-1 hover:bg-emerald-600"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {isKhmer ? "ចាប់ផ្តើមរៀនឥតគិតថ្លៃ" : "Start Learning Free"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-2 border-border bg-card px-6 text-base font-bold shadow-sm transition hover:bg-muted"
                >
                  <a href="#interactive-practice">
                    <Play className="mr-2 h-4 w-4 fill-foreground" />
                    {isKhmer ? "សាកល្បងលំហាត់ផ្ទាល់" : "Try Interactive Demo"}
                  </a>
                </Button>
              </div>

              {/* Trust Metrics Bar */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-6 text-left">
                <div>
                  <p className="font-display text-2xl font-black text-foreground">Grade 7–12</p>
                  <p className="text-xs text-muted-foreground">{isKhmer ? "អនុវិទ្យាល័យ និង វិទ្យាល័យ" : "Middle & High School"}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-emerald-500">100% Free</p>
                  <p className="text-xs text-muted-foreground">{isKhmer ? "ឥតគិតថ្លៃសម្រាប់សិស្ស" : "Open for all students"}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-primary">BacII Ready</p>
                  <p className="text-xs text-muted-foreground">{isKhmer ? "វិញ្ញាសាត្រៀមបាក់ឌុប" : "National Exam Prep"}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Live Interactive Practice Card */}
            <div id="interactive-practice" className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-3xl border-2 border-border bg-card p-6 shadow-2xl">
                {/* Floating Streak, Heart & XP Status */}
                <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-1.5 font-bold text-orange-500">
                    <Flame className="h-5 w-5 fill-orange-500" />
                    <span className="text-xs font-black">7 Day Streak</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-rose-500">
                    <Heart className="h-5 w-5 fill-rose-500" />
                    <span className="text-xs font-black">5/5 Hearts</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Sparkles className="h-4 w-4 fill-amber-500" />
                    <span className="text-xs font-black">+30 XP</span>
                  </div>
                </div>

                {/* Subject Selector Pills for the Interactive Demo */}
                <div className="mb-4 flex gap-1.5">
                  {(["physics", "chemistry", "biology"] as const).map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => {
                        setDemoSubject(sub);
                        handleDemoReset();
                      }}
                      className={cn(
                        "flex-1 rounded-xl py-1 text-xs font-bold capitalize transition",
                        demoSubject === sub
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {sub === "physics" ? (isKhmer ? "រូបវិទ្យា" : "Physics") : sub === "chemistry" ? (isKhmer ? "គីមីវិទ្យា" : "Chemistry") : (isKhmer ? "ជីវវិទ្យា" : "Biology")}
                    </button>
                  ))}
                </div>

                {/* Question Prompt */}
                <span className="inline-block rounded-lg bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {isKhmer ? currentQ.tagKm : currentQ.tagEn}
                </span>

                <h3 className="mt-2 font-display text-base font-bold leading-snug text-foreground">
                  {isKhmer ? currentQ.questionKm : currentQ.questionEn}
                </h3>

                {/* Interactive 3D Choice Buttons */}
                <div className="mt-4 space-y-2">
                  {currentQ.options.map((item, idx) => {
                    const isSelected = demoSelected === idx;
                    const isChecked = demoStatus !== "idle";

                    let btnStyle = "border-border bg-card hover:bg-muted text-foreground";
                    if (isSelected && !isChecked) {
                      btnStyle = "border-primary bg-primary/10 text-primary ring-2 ring-primary/20";
                    } else if (isChecked) {
                      if (item.isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/40 dark:text-emerald-300";
                      } else if (isSelected && !item.isCorrect) {
                        btnStyle = "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300";
                      } else {
                        btnStyle = "border-border bg-card opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={demoStatus !== "idle"}
                        onClick={() => handleDemoAnswer(idx)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border-2 border-b-4 p-3 text-left text-xs sm:text-sm font-semibold transition active:border-b-2 active:translate-y-0.5",
                          btnStyle,
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-6 w-6 place-items-center rounded-md border text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {isChecked && item.isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                        {isChecked && isSelected && !item.isCorrect && (
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
                      "mt-4 rounded-2xl border p-3.5 animate-in fade-in",
                      demoStatus === "correct"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
                    )}
                  >
                    <p className="text-xs font-bold">
                      {demoStatus === "correct"
                        ? isKhmer ? "🎉 ត្រឹមត្រូវណាស់! +30 XP" : "🎉 Correct! +30 XP"
                        : isKhmer ? "❌ ចម្លើយមិនទាន់ត្រឹមត្រូវទេ" : "❌ Incorrect"}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90">
                      {isKhmer ? currentQ.explanationKm : currentQ.explanationEn}
                    </p>
                    <button
                      type="button"
                      onClick={handleDemoReset}
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold underline"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {isKhmer ? "សាកល្បងសំណួរម្តងទៀត" : "Try Again"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4 MOEYS SCIENCE DISCIPLINES */}
      <section className="border-b border-border/40 py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {isKhmer ? "មុខវិជ្ជាស្នូលទាំង ៤" : "4 Core MoEYS Disciplines"}
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {isKhmer ? "គ្រប់គ្រងវិទ្យាសាស្ត្រវិទ្យាល័យទាំងអស់" : "Complete Secondary & High School Science"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {isKhmer
              ? "មេរៀននីមួយៗរៀបចំស្របតាមសៀវភៅពុម្ពក្រសួងអប់រំ យុវជន និងកីឡា ដោយមានការបកប្រែជាភាសាអង់គ្លេសទន្ទឹមគ្នា"
              : "Every single topic aligns with Cambodia's official syllabus, with bilingual terminology to prepare students for university and international STEM careers."}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border-2 border-blue-500/30 bg-blue-50/40 p-6 text-left dark:bg-blue-950/20 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-md">
                <Atom className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground">
                {isKhmer ? "រូបវិទ្យា (Physics)" : "Physics"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "ចលនា ច្បាប់ញូតុន ការងារនិងថាមពល អគ្គិសនី អុបទិច និងទែម៉ូឌីណាមិច"
                  : "Kinematics, Newton's Laws, Work & Energy, Electromagnetism, Optics, and Thermodynamics."}
              </p>
              <div className="mt-4 border-t border-border/60 pt-3 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                Grade 7–12 · 48 Lessons
              </div>
            </div>

            <div className="rounded-3xl border-2 border-emerald-500/30 bg-emerald-50/40 p-6 text-left dark:bg-emerald-950/20 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-white shadow-md">
                <FlaskConical className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground">
                {isKhmer ? "គីមីវិទ្យា (Chemistry)" : "Chemistry"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "អាតូម សម្ព័ន្ធគីមី សមីការតុល្យភាព អាស៊ីត-បាស គីមីសរីរាង្គ និងអេស្ទែ"
                  : "Atomic Structure, Periodic Table, Chemical Bonding, Acid-Base Reactions, and Organic Chemistry."}
              </p>
              <div className="mt-4 border-t border-border/60 pt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Grade 8–12 · 52 Lessons
              </div>
            </div>

            <div className="rounded-3xl border-2 border-purple-500/30 bg-purple-50/40 p-6 text-left dark:bg-purple-950/20 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500 text-white shadow-md">
                <Dna className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground">
                {isKhmer ? "ជីវវិទ្យា (Biology)" : "Biology"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "ជីវវិទ្យាកោសិកា ពន្ធុវិទ្យាម៉ង់ដែល អាដេអិន (DNA) ប្រព័ន្ធរាងកាយ និងបរិស្ថានវិទ្យា"
                  : "Cell Biology, Genetics, DNA & RNA Replication, Human Body Systems, and Ecology."}
              </p>
              <div className="mt-4 border-t border-border/60 pt-3 text-[11px] font-bold text-purple-600 dark:text-purple-400">
                Grade 7–12 · 44 Lessons
              </div>
            </div>

            <div className="rounded-3xl border-2 border-amber-500/30 bg-amber-50/40 p-6 text-left dark:bg-amber-950/20 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500 text-white shadow-md">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground">
                {isKhmer ? "ផែនដីវិទ្យា (Earth Science)" : "Earth Science"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "ភូគព្ភវិទ្យា ស្រទាប់បរិយាកាស បម្រែបម្រួលអាកាសធាតុ ធនធានធម្មជាតិ និងតារាសាស្ត្រ"
                  : "Plate Tectonics, Weather, Climate Change, Earth's Atmosphere, and Astronomy."}
              </p>
              <div className="mt-4 border-t border-border/60 pt-3 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                Grade 7–12 · 36 Lessons
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BILINGUAL VOCABULARY MATCHING MINI-GAME */}
      <section className="border-b border-border/40 py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
              {isKhmer ? "ល្បែងផ្គូផ្គងពាក្យវិទ្យាសាស្ត្រ" : "Interactive STEM Vocabulary Game"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer ? "ស្ទាត់ជំនាញពាក្យបច្ចេកទេស ខ្មែរ-អង់គ្លេស" : "Master Bilingual Scientific Terminology"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              {isKhmer
                ? "សាកល្បងចុចផ្គូផ្គងពាក្យខ្មែរ ជាមួយពាក្យអង់គ្លេស ដើម្បីឃើញពីរបៀបលេងជាក់ស្តែងក្នុង ScienceKH!"
                : "Click a Khmer term, then click its English translation to pair them up and hear the chime!"}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border-2 border-border bg-card p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-bold text-muted-foreground">
              <span>{isKhmer ? "ចុចផ្គូផ្គងពាក្យ ៤ គូខាងក្រោម៖" : "Match the 4 term pairs below:"}</span>
              <span className="text-emerald-500">
                {matchedPairs.length} / 4 {isKhmer ? "បានផ្គូផ្គង" : "Matched"}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                      "flex h-20 items-center justify-center rounded-2xl border-2 border-b-4 p-3 text-center text-sm font-bold transition-all active:border-b-2 active:translate-y-0.5",
                      isMatched
                        ? "border-emerald-500 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 opacity-60 cursor-default"
                        : isSelected
                          ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 translate-y-0.5"
                          : "border-border bg-muted/40 hover:bg-muted text-foreground",
                    )}
                  >
                    {card.text}
                  </button>
                );
              })}
            </div>

            {matchedPairs.length === 4 && (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-950/40 animate-in zoom-in-95">
                <p className="font-display text-base font-bold text-emerald-700 dark:text-emerald-300">
                  {isKhmer ? "🎉 អស្ចារ្យណាស់! អ្នកបានផ្គូផ្គងពាក្យទាំងអស់ដោយជោគជ័យ!" : "🎉 Awesome! You matched all terms!"}
                </p>
                <button
                  type="button"
                  onClick={() => setMatchedPairs([])}
                  className="mt-2 text-xs font-bold text-emerald-700 underline dark:text-emerald-300"
                >
                  {isKhmer ? "លេងម្តងទៀត" : "Play Again"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. GRADE 7 TO 12 CURRICULUM SELECTOR */}
      <section id="curriculum" className="border-b border-border/40 py-20 bg-muted/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {isKhmer ? "ថ្នាក់ទី ៧ ដល់ ទី ១២" : "Complete Grade 7–12 Roadmap"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer ? "កម្មវិធីសិក្សាតាមកម្រិតថ្នាក់ជាក់ស្តែង" : "Structured Curriculum by Grade Level"}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {isKhmer
                ? "ជ្រើសរើសកម្រិតថ្នាក់របស់អ្នក ដើម្បីមើលជំពូក និងមេរៀននីមួយៗ"
                : "Select a grade level to explore chapters and national exam readiness."}
            </p>

            {/* Grade Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveGrade(g)}
                  className={cn(
                    "rounded-2xl border-2 px-5 py-2.5 text-sm font-bold transition",
                    activeGrade === g
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {isKhmer ? `ថ្នាក់ទី ${g}` : `Grade ${g}`}
                  {g === 9 && (
                    <span className="ml-1.5 rounded bg-amber-400 px-1 py-0.2 text-[10px] text-amber-950 font-black">
                      ឌីប្លូម
                    </span>
                  )}
                  {g === 12 && (
                    <span className="ml-1.5 rounded bg-emerald-400 px-1 py-0.2 text-[10px] text-emerald-950 font-black">
                      បាក់ឌុប
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grade Detail Card */}
          <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <GraduationCap className="h-4 w-4" />
                  <span>
                    {activeGrade >= 10
                      ? isKhmer ? "វិទ្យាល័យ (Upper Secondary)" : "Upper Secondary School"
                      : isKhmer ? "អនុវិទ្យាល័យ (Lower Secondary)" : "Lower Secondary School"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-black text-foreground">
                  {isKhmer ? `កម្មវិធីសិក្សាវិទ្យាសាស្ត្រ ថ្នាក់ទី ${activeGrade}` : `Grade ${activeGrade} Science Curriculum`}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {activeGrade === 12
                    ? isKhmer
                      ? "ផ្តោតលើការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ថ្នាក់វិទ្យាសាស្ត្រ និងថ្នាក់វិទ្យាសាស្ត្រសង្គម។ វិញ្ញាសាជាក់ស្តែងពីរដ្ឋ ដំណោះស្រាយ និងរូបមន្តសង្ខេបសម្រាប់យកនិទ្ទេស A ។"
                      : "Focused on the National BacII Exam for both Science and Social Science tracks. Covers official past exam papers, rubric criteria, and shortcut formulas for Grade A results."
                    : activeGrade === 9
                      ? isKhmer
                        ? "ត្រៀមប្រឡងឌីប្លូមមធ្យមសិក្សាបឋមភូមិ ជាមួយការយល់ដឹងពីមូលដ្ឋានគ្រឹះរូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា។"
                        : "Comprehensive preparation for the National Brevet (Grade 9) Diploma examination."
                      : isKhmer
                        ? `មេរៀន និងលំហាត់អនុវត្តប្រចាំសប្តាហ៍សម្រាប់សិស្សថ្នាក់ទី ${activeGrade} ស្របតាមសៀវភៅពុម្ពក្រសួងអប់រំ។`
                        : `Complete weekly structured lessons and quizzes for Grade ${activeGrade} students.`}
                </p>

                {/* Chapter Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {(activeGrade === 12
                    ? [
                        "វិញ្ញាសារូបវិទ្យាបាក់ឌុប",
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
                      className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-2xl border-b-4 border-emerald-700 bg-emerald-500 text-base font-black text-white shadow-lg active:border-b-0 active:translate-y-1 hover:bg-emerald-600"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {isKhmer ? `រៀនថ្នាក់ទី ${activeGrade} ឥតគិតថ្លៃ` : `Start Grade ${activeGrade}`}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground lg:text-right">
                  {isKhmer ? "មិនទាមទារកាតធនាគារ" : "No credit card required"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BACII (បាក់ឌុប) EXAM MASTERY SECTION */}
      <section id="bacii" className="border-b border-border/40 py-20 bg-gradient-to-b from-card to-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                {isKhmer ? "ត្រៀមប្រឡងថ្នាក់ជាតិ" : "National Examination Ready"}
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                {isKhmer
                  ? "ត្រៀមខ្លួនយកនិទ្ទេស A ក្នុងការប្រឡងបាក់ឌុប (BacII)"
                  : "Ace Your BacII National Exams with Confidence"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "វិញ្ញាសារូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា និងគណិតវិទ្យា ត្រូវបានដកស្រង់ចេញពីវិញ្ញាសាប្រឡងបាក់ឌុបពិតប្រាកដរបស់ក្រសួងអប់រំ (២០១៨ - ២០២៥) ជាមួយរូបមន្តកាត់ និងគន្លឹះដោះស្រាយយ៉ាងលម្អិត។"
                  : "Curated questions and mock tests drawn directly from actual Ministry of Education BacII exams (2018–2025), complete with formula shortcuts and step-by-step scoring criteria."}
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold">
                    {isKhmer ? "វិញ្ញាសាប្រឡងបាក់ឌុបជាក់ស្តែងរាល់ឆ្នាំ" : "Real past BacII examination papers"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold">
                    {isKhmer ? "បំបែកលំហាត់ជាជំហានងាយយល់" : "Step-by-step formula breakdown"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold">
                    {isKhmer ? "គណនាពិន្ទុ និងវិភាគចំណុចខ្សោយដោយស្វ័យប្រវត្តិ" : "Instant score analysis & weakness diagnostic"}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-xl border-b-4 border-amber-600 bg-amber-500 font-bold text-amber-950 shadow-md transition active:border-b-0 active:translate-y-0.5 hover:bg-amber-400"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {isKhmer ? "ចាប់ផ្តើមអនុវត្តវិញ្ញាសា" : "Practice BacII Papers"}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border-2 border-amber-300/40 bg-amber-50/40 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center justify-between border-b border-amber-200 pb-4 dark:border-amber-900">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-amber-600" />
                    <span className="font-display font-bold text-foreground">
                      {isKhmer ? "វិញ្ញាសាគំរូបាក់ឌុប" : "BacII Mock Exam"}
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">
                    Grade A Target
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-xs font-bold text-primary">រូបវិទ្យា ថ្នាក់ទី ១២ (Physics)</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      ចលនាទំលាក់សេរី និងចលនាត្រង់ប្រែប្រួលស្មើ ($v = v_0 + at$, $x = \frac{1}{2}at^2$)
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-xs font-bold text-emerald-600">គីមីវិទ្យា ថ្នាក់ទី ១២ (Chemistry)</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      ល្បឿនប្រតិកម្មគីមី និងសមតុល្យគីមី ($K_c$, $pH = -\log[H_3O^+]$)
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-xs font-bold text-purple-600">ជីវវិទ្យា ថ្នាក់ទី ១២ (Biology)</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      ពន្ធុវិទ្យាម៉ូលេគុល និងច្បាប់ម៉ង់ដែល (DNA Replication & Mendel Laws)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 24/7 AI KHMER TUTOR PLAYGROUND */}
      <section id="ai-tutor" className="border-b border-border/40 py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-black text-primary">
            {isKhmer ? "លោកគ្រូ AI ២៤ ម៉ោង (Socratic Tutor)" : "24/7 AI Socratic Tutor"}
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {isKhmer ? "ជាប់គាំងលំហាត់? សួរគ្រូ AI ភ្លាមៗ!" : "Stuck on a Problem? Ask the AI Tutor."}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {isKhmer
              ? "គ្រូ AI មិនត្រឹមតែប្រាប់ចម្លើយទេ ប៉ុន្តែពន្យល់ពីវិធីដោះស្រាយមួយជំហានម្តងៗជាភាសាខ្មែរយ៉ាងក្បោះក្បាយ។"
              : "Our AI doesn't just hand you the answer — it guides you step-by-step through the concept in Khmer."}
          </p>

          {/* Interactive AI Chat Box */}
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border-2 border-primary/20 bg-card p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground">
                    {isKhmer ? "លោកគ្រូ សុខា (Dr. Sokha AI Tutor)" : "Dr. Sokha (AI Science Tutor)"}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-600">Online · Ready in Khmer & English</p>
                </div>
              </div>

              {/* Sample Question Chips */}
              <div className="hidden sm:flex gap-1.5">
                {["ច្បាប់ញូតុន F=m·a", "សមតុល្យ Fe+O₂", "DNA Replication"].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveAiPrompt(idx)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-bold transition",
                      activeAiPrompt === idx
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-none bg-primary px-4 py-3 text-primary-foreground max-w-md shadow-sm">
                  {activeAiPrompt === 0
                    ? isKhmer
                      ? "លោកគ្រូ ខ្ញុំអត់យល់ពីច្បាប់ទី ២ ញូតុនទេ តើ F = m · a មានន័យថាម៉េច?"
                      : "Teacher, what does Newton's second law F = m · a mean?"
                    : activeAiPrompt === 1
                      ? isKhmer
                        ? "លោកគ្រូ ជួយថ្លឹងសមីការ Fe + O₂ → Fe₂O₃ មួយជំហានម្តងៗបានទេ?"
                        : "Teacher, can you help me balance Fe + O₂ → Fe₂O₃ step by step?"
                      : isKhmer
                        ? "តើការស្វ័យតម្លើងទ្វេនៃ DNA ប្រព្រឹត្តទៅនៅវគ្គណា?"
                        : "In which cell phase does DNA replication occur?"}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-none border border-border bg-muted/60 p-4 text-foreground max-w-xl leading-relaxed shadow-sm">
                  {activeAiPrompt === 0 ? (
                    isKhmer ? (
                      <>
                        សួស្តីប្អូន! ច្បាប់ទី ២ ញូតុន ងាយយល់ណាស់៖<br />
                        • <strong>F (កម្លាំង / Force)</strong> គិតជា ញូតុន (N)<br />
                        • <strong>m (ម៉ាស / Mass)</strong> គិតជា គីឡូក្រាម (kg)<br />
                        • <strong>a (សំទុះ / Acceleration)</strong> គិតជា m/s²<br />
                        💡 <strong>ន័យជាក់ស្តែង៖</strong> បើប្អូនរុញវត្ថុមួយកាន់តែខ្លាំង (F ធំ) វត្ថុនោះនឹងបង្កើនល្បឿនកាន់តែលឿន (a ធំ)! តើប្អូនចង់សាកធ្វើលំហាត់គំរូជាមួយគ្រូទេ?
                      </>
                    ) : (
                      <>
                        Hello! Newton's Second Law ($F = m \cdot a$) explains how an object accelerates when a force is applied. If you push twice as hard ($2F$), the object accelerates twice as fast ($2a$)!
                      </>
                    )
                  ) : activeAiPrompt === 1 ? (
                    isKhmer ? (
                      <>
                        ដើម្បីថ្លឹងសមីការ <strong>Fe + O₂ → Fe₂O₃</strong>៖<br />
                        ១. រាប់អាតូម O៖ នៅខាងឆ្វេងមាន ២, ខាងស្តាំមាន ៣ $\rightarrow$ គុណ ៣ ខាងឆ្វេង និង ២ ខាងស្តាំ $\rightarrow$ <strong>3O₂ និង 2Fe₂O₃</strong><br />
                        ២. រាប់អាតូម Fe៖ ខាងស្តាំមាន $2 \times 2 = 4$ Fe $\rightarrow$ ដាក់មេគុណ ៤ នៅមុខ Fe<br />
                        ✨ <strong>សមីការថ្លឹងរួច៖</strong> <strong>4Fe + 3O₂ → 2Fe₂O₃</strong>!
                      </>
                    ) : (
                      <>
                        To balance Fe + O₂ → Fe₂O₃:<br />
                        1. Balance Oxygen: Left has 2 O, right has 3 O $\rightarrow$ Common multiple is 6. Put 3 in front of O₂ and 2 in front of Fe₂O₃.<br />
                        2. Balance Iron: Right has 4 Fe $\rightarrow$ Put 4 in front of Fe.<br />
                        Balanced equation: 4Fe + 3O₂ → 2Fe₂O₃!
                      </>
                    )
                  ) : isKhmer ? (
                    <>
                      ការស្វ័យតម្លើងទ្វេនៃ DNA ប្រព្រឹត្តទៅនៅ <strong>វគ្គចន្លោះ (Interphase)</strong> ពិសេសក្នុង <strong>អនុវគ្គ S (Synthesis Phase)</strong> មុនពេលកោសិកាចែកខ្លួនតាមមីតូស ឬមេយ៉ូស!
                    </>
                  ) : (
                    <>
                      DNA replication occurs during the S (Synthesis) phase of Interphase, right before mitosis or meiosis begins!
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMPARISON TABLE: SCIENCEKH VS TRADITIONAL EXTRA CLASSES (គួរ) */}
      <section id="comparison" className="border-b border-border/40 py-20 bg-muted/20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
              {isKhmer ? "ការប្រៀបធៀបជាក់ស្តែង" : "The Smart Choice"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer ? "ScienceKH ធៀបនឹងការរៀនគួរធម្មតា" : "ScienceKH vs. Traditional Extra Classes"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              {isKhmer
                ? "ហេតុអ្វីបានជាការរៀនជាមួយ ScienceKH មានប្រសិទ្ធភាពខ្ពស់ និងសន្សំសំចៃជាង?"
                : "Why modern gamified micro-learning outperforms expensive traditional extra classes."}
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-4 px-4 font-display font-bold text-foreground">
                    {isKhmer ? "លក្ខណៈពិសេស" : "Feature"}
                  </th>
                  <th className="py-4 px-4 font-display font-black text-emerald-600 dark:text-emerald-400">
                    ScienceKH 🇰🇭
                  </th>
                  <th className="py-4 px-4 font-display font-bold text-muted-foreground">
                    {isKhmer ? "ការរៀនគួរក្រៅម៉ោង (Extra Classes)" : "Traditional Extra Classes"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-4 px-4 font-bold text-foreground">
                    {isKhmer ? "តម្លៃសិក្សា (Cost)" : "Price / Cost"}
                  </td>
                  <td className="py-4 px-4 font-black text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "ឥតគិតថ្លៃ ១០០% (Free)" : "100% Free"}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {isKhmer ? "$20 - $50 ក្នុងមួយខែ/មុខវិជ្ជា" : "$20–$50 per subject / month"}
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-foreground">
                    {isKhmer ? "ពេលវេលាសិក្សា (Schedule)" : "Study Flexibility"}
                  </td>
                  <td className="py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "រៀនបានគ្រប់ពេល ២៤/៧ តាមទូរស័ព្ទ" : "Learn anytime, 15 mins a day"}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {isKhmer ? "ម៉ោងកំណត់ថេរ ត្រូវធ្វើដំណើរ" : "Fixed hours, travel in traffic"}
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-foreground">
                    {isKhmer ? "ជំនួយការផ្ទាល់ខ្លួន (Tutor Support)" : "Personalized Tutoring"}
                  </td>
                  <td className="py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "គ្រូ AI ពន្យល់ភ្លាមៗជាភាសាខ្មែរ" : "Instant 24/7 AI Tutor in Khmer"}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {isKhmer ? "ថ្នាក់រៀនមានសិស្សច្រើន ពិបាកសួរ" : "Crowded classrooms, limited Q&A"}
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-foreground">
                    {isKhmer ? "ការលើកទឹកចិត្ត (Motivation)" : "Gamification & Motivation"}
                  </td>
                  <td className="py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "Streak, ៥ បេះដូង, XP, និង Confetti" : "Daily streaks, 5 hearts, XP, confetti"}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {isKhmer ? "ទន្ទេញមេរៀនស្ងួត ងាយធុញទ្រាន់" : "Dry rote memorization"}
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-foreground">
                    {isKhmer ? "ភាសា (Languages)" : "Bilingual Support"}
                  </td>
                  <td className="py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {isKhmer ? "ភាសាខ្មែរ និង អង់គ្លេស ទន្ទឹមគ្នា" : "Khmer & English side-by-side"}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {isKhmer ? "មានតែភាសាខ្មែរប៉ុណ្ណោះ" : "Khmer only, terms lack English"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faq" className="border-b border-border/40 py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer ? "សំណួរដែលសួរញឹកញាប់" : "Frequently Asked Questions"}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {isKhmer
                ? "ចម្លើយសម្រាប់សិស្ស អាណាព្យាបាល និងលោកគ្រូអ្នកគ្រូ"
                : "Everything you need to know about learning with ScienceKH."}
            </p>
          </div>

          <div className="mt-12 space-y-3">
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
                qKm: "តើខ្ញុំអាចប្រើ ScienceKH លើទូរស័ព្ទដៃ (Mobile) បានទេ?",
                qEn: "Can I use ScienceKH on my mobile phone?",
                aKm: "បានយ៉ាងងាយស្រួល! ScienceKH ត្រូវបានរចនាឡើងបែប Mobile-First ស័ក្តិសមឥតខ្ចោះលើទូរស័ព្ទដៃគ្រប់ប្រភេទ មិនថា iOS ឬ Android ឡើយ។",
                aEn: "Yes! ScienceKH is designed with a responsive mobile-first interface optimized for all smartphones and tablets.",
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
                  className="rounded-2xl border border-border bg-card p-5 transition shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between text-left font-display text-base font-bold text-foreground"
                  >
                    <span>{isKhmer ? faq.qKm : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground border-t border-border/60 pt-3 animate-in fade-in">
                      {isKhmer ? faq.aKm : faq.aEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FINAL HIGH-ENERGY CALL TO ACTION */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-500 via-teal-600 to-primary p-10 text-white shadow-2xl sm:p-14">
            <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              {isKhmer
                ? "ចាប់ផ្តើមរៀនវិទ្យាសាស្ត្រថ្ងៃនេះ ដើម្បីអនាគតរបស់អ្នក!"
                : "Ready to Ace High School Science in Cambodia?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100 sm:text-lg">
              {isKhmer
                ? "ឥតគិតថ្លៃ ១០០%។ ចូលរួមជាមួយសិស្សទូទាំងប្រទេសកម្ពុជា ដើម្បីពូកែវិទ្យាសាស្ត្រ និងត្រៀមប្រឡងបាក់ឌុបដោយទំនុកចិត្ត។"
                : "Join thousands of Cambodian students building daily learning streaks, acing quizzes, and preparing for BacII."}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-2xl border-b-4 border-emerald-900 bg-white px-8 text-lg font-black text-emerald-800 shadow-xl transition active:border-b-0 active:translate-y-1 hover:bg-emerald-50"
              >
                <Link to="/auth" search={{ mode: "signup" }}>
                  {isKhmer ? "បង្កើតគណនីឥតគិតថ្លៃ" : "Create Free Account"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. PROFESSIONAL FOOTER */}
      <footer className="border-t border-border bg-card py-12 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                <Atom className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-foreground">ScienceKH</span>
              <span className="text-xs">· Cambodian STEM Platform (Grade 7–12)</span>
            </div>

            <p className="text-xs text-center sm:text-right">
              © {new Date().getFullYear()} ScienceKH. Built with ❤️ for Cambodian Students by{" "}
              <a
                href="https://github.com/VuthDev2"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-foreground underline hover:text-emerald-500"
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
