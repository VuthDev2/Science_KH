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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScienceKH — Duolingo for Cambodian High School STEM (Grade 7–12)" },
      {
        name: "description",
        content:
          "The gamified, bilingual science learning platform for Cambodian Grade 7–12 students. Master Physics, Chemistry, Biology & Earth Science for BacII exams with daily streaks, 5 hearts, and an AI tutor.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { user, loading } = useAuth();
  const [lang, setLang] = useState<"km" | "en">("km");
  const isKhmer = lang === "km";

  // State for the interactive demo question on the hero section
  const [demoSelected, setDemoSelected] = useState<number | null>(null);
  const [demoStatus, setDemoStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [activeGrade, setActiveGrade] = useState<number>(12);

  if (!loading && user) {
    return <Navigate to="/home" />;
  }

  const handleDemoAnswer = (idx: number) => {
    setDemoSelected(idx);
    if (idx === 1) {
      // Correct answer (Newton / ញូតុន)
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

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* 1. STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
              <Atom className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tight">ScienceKH</span>
              <span className="ml-1.5 hidden rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary sm:inline-block">
                វិទ្យាសាស្ត្រ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#curriculum"
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "កម្មវិធីសិក្សា ថ្នាក់ទី ៧-១២" : "Grade 7–12 Curriculum"}
            </a>
            <a
              href="#gamification"
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "របៀបរៀនបែបហ្គេម" : "Gamified Path"}
            </a>
            <a
              href="#bacii"
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "ត្រៀមប្រឡងបាក់ឌុប" : "BacII Prep"}
            </a>
            <a
              href="#ai-tutor"
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {isKhmer ? "AI បង្រៀន" : "AI Tutor"}
            </a>
          </nav>

          {/* Language Switcher & Auth Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Pill */}
            <button
              type="button"
              onClick={() => setLang(lang === "km" ? "en" : "km")}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm transition hover:bg-muted"
              title="Toggle Language / ប្តូរភាសា"
            >
              <Languages className="h-3.5 w-3.5 text-primary" />
              <span>{isKhmer ? "English 🇺🇸" : "ខ្មែរ 🇰🇭"}</span>
            </button>

            <Link
              to="/auth"
              search={{ mode: "signin" }}
              className="hidden text-sm font-bold text-muted-foreground transition hover:text-foreground sm:inline-block"
            >
              {isKhmer ? "ចូលគណនី" : "Sign In"}
            </Link>

            <Button
              asChild
              className="h-10 rounded-xl border-b-4 border-emerald-700 bg-emerald-500 font-bold text-white shadow-md transition active:border-b-0 active:translate-y-0.5 hover:bg-emerald-600"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                {isKhmer ? "ចាប់ផ្តើមឥតគិតថ្លៃ" : "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 py-16 md:py-24">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Headline & Value Proposition */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {isKhmer
                    ? "🇰🇭 កម្មវិធីសិក្សាជាតិ ក្រសួងអប់រំ · MoEYS Grade 7–12"
                    : "🇰🇭 Cambodian MoEYS Curriculum · Grade 7–12"}
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {isKhmer ? (
                  <>
                    រៀនវិទ្យាសាស្ត្រតាមរបៀប <span className="text-emerald-500">សប្បាយ</span> និងមាន{" "}
                    <span className="text-primary">ប្រសិទ្ធភាពខ្ពស់</span>
                  </>
                ) : (
                  <>
                    The Fun, <span className="text-emerald-500">Gamified Way</span> to Master{" "}
                    <span className="text-primary">High School Science</span>
                  </>
                )}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {isKhmer
                  ? "រៀបចំឡើងជាពិសេសសម្រាប់សិស្សថ្នាក់ទី ៧ ដល់ទី ១២ ត្រៀមប្រឡងឌីប្លូម និងបាក់ឌុប (BacII)។ រៀនជាមួយផ្លូវសាកល្បងបែប Duolingo រក្សា Streak ៥ បេះដូង និងគ្រូ AI ពន្យល់ជាភាសាខ្មែរ ២៤/៧។"
                  : "Built specifically for Cambodian Grade 7–12 students preparing for national exams (BacII & Brevet). Master Physics, Chemistry, Biology & Earth Science through daily streaks, 5-heart challenges, and a 24/7 AI Khmer Tutor."}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-2xl border-b-4 border-emerald-700 bg-emerald-500 px-8 text-base font-extrabold text-white shadow-xl transition active:border-b-0 active:translate-y-1 hover:bg-emerald-600"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {isKhmer ? "ចាប់ផ្តើមរៀនឥតគិតថ្លៃ" : "Start Learning For Free"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-2 border-border bg-card px-6 text-base font-bold shadow-sm transition hover:bg-muted"
                >
                  <a href="#interactive-demo">
                    <Play className="mr-2 h-4 w-4 fill-foreground" />
                    {isKhmer ? "សាកល្បងលំហាត់ផ្ទាល់" : "Try Interactive Demo"}
                  </a>
                </Button>
              </div>

              {/* Trust highlights */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-muted-foreground lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{isKhmer ? "ឥតគិតថ្លៃ ១០០%" : "100% Free to Start"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{isKhmer ? "ភាសាខ្មែរ និង អង់គ្លេស" : "Bilingual Khmer & English"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{isKhmer ? "វិញ្ញាសាប្រឡងបាក់ឌុប" : "BacII Past Papers"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Duolingo Demo Card */}
            <div id="interactive-demo" className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-3xl border-2 border-border bg-card p-6 shadow-2xl">
                {/* Floating Streak & Heart Badges */}
                <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-1.5 font-bold text-orange-500">
                    <Flame className="h-5 w-5 fill-orange-500" />
                    <span className="text-sm">7 Day Streak</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-rose-500">
                    <Heart className="h-5 w-5 fill-rose-500" />
                    <span className="text-sm">5/5 Hearts</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Sparkles className="h-4 w-4 fill-amber-500" />
                    <span className="text-sm">+30 XP</span>
                  </div>
                </div>

                {/* Question Pill */}
                <span className="inline-block rounded-lg bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  {isKhmer ? "រូបវិទ្យា ថ្នាក់ទី ១០ · កម្លាំង និង ចលនា" : "Grade 10 Physics · Force & Motion"}
                </span>

                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
                  {isKhmer
                    ? "តើខ្នាតអន្តរជាតិ (SI) នៃកម្លាំង (Force, F) គឺជាអ្វី?"
                    : "What is the SI unit of Force (F) in Physics?"}
                </h3>

                {/* 3D Interactive Options */}
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "Joule (ស៊ូល)", isCorrect: false },
                    { label: "Newton (ញូតុន - N)", isCorrect: true },
                    { label: "Watt (វ៉ាត់)", isCorrect: false },
                    { label: "Pascal (ប៉ាស្កាល់)", isCorrect: false },
                  ].map((item, idx) => {
                    const isSelected = demoSelected === idx;
                    const isChecked = demoStatus !== "idle";

                    let btnStyle = "border-border bg-muted/40 hover:bg-muted text-foreground";
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
                          "flex w-full items-center justify-between rounded-xl border-2 border-b-4 p-3 text-left text-sm font-semibold transition active:border-b-2 active:translate-y-0.5",
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
                      "mt-4 rounded-xl border p-3 animate-in fade-in",
                      demoStatus === "correct"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
                    )}
                  >
                    <p className="text-xs font-bold">
                      {demoStatus === "correct"
                        ? isKhmer
                          ? "🎉 ត្រឹមត្រូវ! ខ្នាតកម្លាំងគឺ ញូតុន (N = kg·m/s²)"
                          : "🎉 Correct! The unit of Force is Newton (N = kg·m/s²)"
                        : isKhmer
                          ? "❌ ចម្លើយត្រឹមត្រូវគឺ ញូតុន (Newton)"
                          : "❌ Correct answer is Newton"}
                    </p>
                    <button
                      type="button"
                      onClick={handleDemoReset}
                      className="mt-2 text-[11px] font-bold underline"
                    >
                      {isKhmer ? "សាកល្បងម្តងទៀត" : "Try Again"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE DISCIPLINES */}
      <section className="border-b border-border/40 py-16 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {isKhmer ? "មុខវិជ្ជាគោលទាំង ៤" : "4 Core MoEYS Disciplines"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {isKhmer
              ? "គ្រប់គ្រងវិទ្យាសាស្ត្រវិទ្យាល័យទាំងអស់"
              : "Complete Secondary & High School Science"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            {isKhmer
              ? "មេរៀននីមួយៗស្របតាមសៀវភៅពុម្ពក្រសួងអប់រំ យុវជន និងកីឡា"
              : "Every lesson is mapped to Cambodia's official Ministry of Education curriculum."}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SubjectCard
              icon={<Atom className="h-8 w-8 text-blue-500" />}
              titleEn="Physics"
              titleKm="រូបវិទ្យា"
              descEn="Kinematics, Newton's Laws, Electricity, Optics & Thermodynamics."
              descKm="ចលនា ច្បាប់ញូតុន អគ្គិសនី អុបទិច និងទែម៉ូឌីណាមិច"
              colorClass="border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20"
              isKhmer={isKhmer}
            />

            <SubjectCard
              icon={<FlaskConical className="h-8 w-8 text-emerald-500" />}
              titleEn="Chemistry"
              titleKm="គីមីវិទ្យា"
              descEn="Atomic structure, Chemical bonding, Acids & Bases, Organic Chemistry."
              descKm="រចនាសម្ព័ន្ធអាតូម សម្ព័ន្ធគីមី អាស៊ីត-បាស និងគីមីសរីរាង្គ"
              colorClass="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20"
              isKhmer={isKhmer}
            />

            <SubjectCard
              icon={<Dna className="h-8 w-8 text-purple-500" />}
              titleEn="Biology"
              titleKm="ជីវវិទ្យា"
              descEn="Cellular biology, Genetics, DNA, Human anatomy & Evolution."
              descKm="ជីវវិទ្យាកោសិកា ពន្ធុវិទ្យា អាដេអិន (DNA) និងប្រព័ន្ធរាងកាយ"
              colorClass="border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/20"
              isKhmer={isKhmer}
            />

            <SubjectCard
              icon={<Globe2 className="h-8 w-8 text-amber-500" />}
              titleEn="Earth Science"
              titleKm="ផែនដីវិទ្យា"
              descEn="Geology, Atmosphere, Climate change, Ecology & Natural resources."
              descKm="ភូគព្ភវិទ្យា បរិយាកាស បម្រែបម្រួលអាកាសធាតុ និងបរិស្ថាន"
              colorClass="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20"
              isKhmer={isKhmer}
            />
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM GRADE SELECTOR (Grade 7 to 12) */}
      <section id="curriculum" className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {isKhmer ? "ថ្នាក់ទី ៧ ដល់ ទី ១២" : "Grade 7 through Grade 12"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer
                ? "កម្មវិធីសិក្សាតាមកម្រិតថ្នាក់ជាក់ស្តែង"
                : "Step-by-Step Curriculum by Grade"}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {isKhmer
                ? "ជ្រើសរើសថ្នាក់របស់អ្នក ដើម្បីមើលមេរៀន និងវិញ្ញាសាប្រឡង"
                : "Select your grade to see the lessons and exam requirements."}
            </p>

            {/* Grade Tabs */}
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
                    <span className="ml-1.5 rounded bg-amber-400 px-1 py-0.2 text-[10px] text-amber-950">
                      ឌីប្លូម
                    </span>
                  )}
                  {g === 12 && (
                    <span className="ml-1.5 rounded bg-emerald-400 px-1 py-0.2 text-[10px] text-emerald-950">
                      បាក់ឌុប
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Grade Content Box */}
          <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {activeGrade >= 10
                    ? isKhmer
                      ? "វិទ្យាល័យ (Upper Secondary)"
                      : "Upper Secondary (High School)"
                    : isKhmer
                      ? "អនុវិទ្យាល័យ (Lower Secondary)"
                      : "Lower Secondary (Middle School)"}
                </span>
                <h3 className="mt-1 font-display text-2xl font-black text-foreground">
                  {isKhmer ? `កម្មវិធីសិក្សាវិទ្យាសាស្ត្រ ថ្នាក់ទី ${activeGrade}` : `Grade ${activeGrade} Science Syllabus`}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                  {activeGrade === 12
                    ? isKhmer
                      ? "ផ្តោតលើការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ជាមួយវិញ្ញាសាអនុវត្តជាក់ស្តែងពីរដ្ឋ និងដំណោះស្រាយលម្អិត។"
                      : "Focused on the National BacII Exam with real past exam papers, scoring guidelines, and step-by-step problem breakdowns."
                    : activeGrade === 9
                      ? isKhmer
                        ? "ត្រៀមប្រឡងឌីប្លូមមធ្យមសិក្សាបឋមភូមិ ជាមួយការយល់ដឹងពីមូលដ្ឋានគ្រឹះរូបវិទ្យា និងគីមីវិទ្យា។"
                        : "Preparation for the Junior High Brevet Exam with essential scientific foundations."
                      : isKhmer
                        ? `មេរៀន និងលំហាត់អនុវត្តប្រចាំសប្តាហ៍សម្រាប់សិស្សថ្នាក់ទី ${activeGrade} ស្របតាមក្រសួងអប់រំ។`
                        : `Weekly structured lessons and interactive quizzes for Grade ${activeGrade} students.`}
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl border-b-4 border-primary bg-primary font-bold text-white shadow transition active:border-b-0 active:translate-y-0.5"
              >
                <Link to="/auth" search={{ mode: "signup" }}>
                  {isKhmer ? `រៀនថ្នាក់ទី ${activeGrade} ឥឡូវនេះ` : `Start Grade ${activeGrade}`}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GAMIFICATION PILLARS (The Duolingo Method) */}
      <section id="gamification" className="border-b border-border/40 py-20 bg-muted/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {isKhmer ? "វិធីសាស្ត្ររៀនបែប DUOLINGO" : "The Duolingo Learning Loop"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {isKhmer
                ? "ហេតុអ្វីបានជា ScienceKH ជួយឱ្យអ្នកពូកែវិទ្យាសាស្ត្រ?"
                : "Why ScienceKH Actually Works"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              {isKhmer
                ? "ការរៀនវិទ្យាសាស្ត្រលែងពិបាកទៀតហើយ។ យើងប្រែក្លាយមេរៀនស្មុគស្មាញឱ្យទៅជាហ្គេមរាល់ថ្ងៃ។"
                : "Science is hard when memorized from dry textbooks. We turned it into an addictive daily habit."}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-soft">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                <Flame className="h-8 w-8 fill-orange-500" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {isKhmer ? "រក្សា Day Streak ប្រចាំថ្ងៃ" : "Daily Streak Motivation"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "គ្រាន់តែចំណាយពេល ១៥ នាទីក្នុងមួយថ្ងៃដើម្បីកសាងទម្លាប់រៀនជាប់លាប់ ត្រៀមប្រឡងដោយមិនបាច់ទន្ទេញនៅនាទីចុងក្រោយ។"
                  : "Just 15 minutes a day builds lasting memory retention. No more stressful all-night cramming before exams."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-soft">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Heart className="h-8 w-8 fill-rose-500" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {isKhmer ? "ប្រព័ន្ធ ៥ បេះដូង (5 Hearts)" : "5 Hearts Energy System"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "ឆ្លើយខុសបាត់បង់បេះដូង! ជំរុញឱ្យអ្នកគិតឱ្យបានហ្មត់ចត់លើរូបមន្ត និងទ្រឹស្តី មុននឹងជ្រើសរើសចម្លើយ។"
                  : "Mistakes cost hearts, encouraging thoughtful problem-solving instead of random guessing."}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-soft">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {isKhmer ? "ផ្លូវរៀន Winding Roadmap" : "The Winding Learning Path"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isKhmer
                  ? "ដើរតាមជំហាននីមួយៗ ឈ្នះតារា Golden Crown និងដោះសោមេរៀនបន្ទាប់មួយកម្រិតម្តងៗ។"
                  : "Progress down an interactive stepping stone path, earn Golden Crowns, and unlock new topics chapter by chapter."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BACII EXAM PREPARATION SECTION */}
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

      {/* 7. AI TUTOR (DUOMAX) SECTION */}
      <section id="ai-tutor" className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {isKhmer ? "លោកគ្រូ AI ២៤ ម៉ោង" : "24/7 Socratic AI Tutor"}
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {isKhmer ? "ជាប់គាំងលំហាត់? សួរគ្រូ AI ភ្លាមៗ!" : "Stuck on a Problem? Ask the AI Tutor."}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {isKhmer
              ? "គ្រូ AI មិនត្រឹមតែប្រាប់ចម្លើយទេ ប៉ុន្តែពន្យល់ពីវិធីដោះស្រាយមួយជំហានម្តងៗជាភាសាខ្មែរយ៉ាងក្បោះក្បាយ។"
              : "Our AI doesn't just hand you the answer — it guides you step-by-step through the concept in Khmer."}
          </p>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-primary/20 bg-card p-6 text-left shadow-xl">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground">
                  {isKhmer ? "លោកគ្រូ សុខា (AI Science Tutor)" : "Dr. Sokha (AI Science Tutor)"}
                </h4>
                <p className="text-xs text-emerald-600 font-semibold">Online · Ready in Khmer & English</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-none bg-primary px-4 py-3 text-primary-foreground max-w-md">
                  {isKhmer
                    ? "លោកគ្រូ ខ្ញុំអត់យល់ពីច្បាប់ទី ២ ញូតុនទេ តើ F = m · a មានន័យថាម៉េច?"
                    : "Teacher, I don't understand Newton's Second Law. What does F = m · a mean?"}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-none border border-border bg-muted/60 px-4 py-3 text-foreground max-w-lg leading-relaxed">
                  {isKhmer ? (
                    <>
                      សួស្តីប្អូន! ច្បាប់ទី ២ ញូតុន ងាយយល់ណាស់៖<br />
                      • <strong>F (កម្លាំង / Force)</strong> គិតជា ញូតុន (N)<br />
                      • <strong>m (ម៉ាស / Mass)</strong> គិតជា គីឡូក្រាម (kg)<br />
                      • <strong>a (សំទុះ / Acceleration)</strong> គិតជា m/s²<br />
                      មានន័យថា៖ បើប្អូនរុញវត្ថុមួយកាន់តែខ្លាំង (F ធំ) វត្ថុនោះនឹងបង្កើនល្បឿនកាន់តែលឿន (a ធំ)! តើប្អូនចង់សាកធ្វើលំហាត់គំរូទេ?
                    </>
                  ) : (
                    <>
                      Hello! Newton's 2nd Law states that the force applied to an object equals its mass times its acceleration. If you double the force, the acceleration doubles! Ready to solve an example together?
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL HIGH-ENERGY CALL TO ACTION */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-500 via-teal-600 to-primary p-10 text-white shadow-2xl sm:p-14">
            <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              {isKhmer
                ? "ចាប់ផ្តើមរៀនវិទ្យាសាស្ត្រថ្ងៃនេះ ដើម្បីអនាគតរបស់អ្នក!"
                : "Ready to Master High School Science in Cambodia?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100 sm:text-lg">
              {isKhmer
                ? "ឥតគិតថ្លៃ ១០០%។ ចូលរួមជាមួយសិស្សទូទាំងប្រទេសកម្ពុជា ដើម្បីពូកែវិទ្យាសាស្ត្រ និងត្រៀមប្រឡងបាក់ឌុបដោយទំនុកចិត្ត។"
                : "Join students across Cambodia mastering Grade 7–12 STEM with fun daily quizzes and an AI tutor."}
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

      {/* 9. PROFESSIONAL FOOTER */}
      <footer className="border-t border-border bg-card py-12 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Atom className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-foreground">ScienceKH</span>
            <span className="text-xs">· Cambodian STEM Platform</span>
          </div>

          <p className="text-xs text-center sm:text-right">
            © {new Date().getFullYear()} ScienceKH. Built with ❤️ for Cambodian Students by{" "}
            <a
              href="https://github.com/VuthDev2"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-foreground underline hover:text-primary"
            >
              VuthDev2
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function SubjectCard({
  icon,
  titleEn,
  titleKm,
  descEn,
  descKm,
  colorClass,
  isKhmer,
}: {
  icon: React.ReactNode;
  titleEn: string;
  titleKm: string;
  descEn: string;
  descKm: string;
  colorClass: string;
  isKhmer: boolean;
}) {
  return (
    <div className={cn("rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 shadow-soft", colorClass)}>
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-sm">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-foreground">
        {isKhmer ? titleKm : titleEn}
      </h3>
      <p className="text-xs font-semibold text-primary mt-0.5">
        {isKhmer ? titleEn : titleKm}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {isKhmer ? descKm : descEn}
      </p>
    </div>
  );
}
