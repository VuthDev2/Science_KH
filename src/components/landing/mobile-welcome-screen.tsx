// ==============================================================================
// ScienceKH — Mobile Welcome & Onboarding Screen (Duolingo Flow)
// Displayed on iOS / Android App launch for unauthenticated students
// ==============================================================================

import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Atom,
  GraduationCap,
  BookOpen,
  Trophy,
  Flame,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerHapticLight, triggerHapticSelection } from "@/lib/native-mobile";
import { sounds } from "@/lib/sound-effects";

interface SlideData {
  id: number;
  tagKm: string;
  tagEn: string;
  titleKm: string;
  titleEn: string;
  descKm: string;
  descEn: string;
  icon: typeof Atom;
  iconBg: string;
  iconColor: string;
  badgeBorder: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    tagKm: "កម្មវិធីសិក្សាជាតិ MoEYS",
    tagEn: "National MoEYS Curriculum",
    titleKm: "រៀនវិទ្យាសាស្ត្រ ដោយទំនុកចិត្ត",
    titleEn: "Master Science with Confidence",
    descKm:
      "គ្រប់មុខវិជ្ជា STEM ថ្នាក់ទី ៧ ដល់ ១២ ជាមួយមេរៀនសង្ខេបងាយយល់ កម្រងលំហាត់ និងលោកគ្រូ វុឌ្ឍ (Kru Vuth) — គ្រូជំនួយ STEM",
    descEn:
      "Covering Grades 7–12 STEM with bite-sized lessons, interactive quizzes, and Kru Vuth STEM Tutor.",
    icon: Atom,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-200 dark:border-emerald-900/50",
  },
  {
    id: 1,
    tagKm: "បណ្ណសារវិញ្ញាសាជាតិ",
    tagEn: "Official Exam Archive",
    titleKm: "ប្រឡងបាក់ឌុប & សិស្សពូកែ",
    titleEn: "Bac II & National Olympiad",
    descKm:
      "បណ្ដុំវិញ្ញាសាផ្លូវការពីឆ្នាំ ២០១១–២០២៦ ជាមួយអត្រាកំណែពិន្ទុស្តង់ដារ និងដំណោះស្រាយលម្អិតគ្រប់លំហាត់",
    descEn:
      "Authentic 2011–2026 MoEYS past papers with step-by-step worked solutions and scoring rubrics.",
    icon: GraduationCap,
    iconBg: "bg-blue-50 dark:bg-blue-950/60",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBorder: "border-blue-200 dark:border-blue-900/50",
  },
  {
    id: 2,
    tagKm: "ស្ទីល Duolingo Gamification",
    tagEn: "Daily Habit & Leaderboard",
    titleKm: "រក្សា Streak ឈ្នះចំណាត់ថ្នាក់",
    titleEn: "Build Streaks & Top the Ranks",
    descKm:
      "អនុវត្តរាល់ថ្ងៃ សន្សំ XP ដណ្តើមមេដាយកិត្តិយស និងប្រកួតប្រជែងជាមួយមិត្តភក្តិទូទាំង ២៥ រាជធានី-ខេត្ត",
    descEn:
      "Practice daily, build study streaks, earn XP, and compete on the nationwide leaderboard.",
    icon: Flame,
    iconBg: "bg-amber-50 dark:bg-amber-950/60",
    iconColor: "text-amber-500 dark:text-amber-400",
    badgeBorder: "border-amber-200 dark:border-amber-900/50",
  },
];

export function MobileWelcomeScreen() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lang, setLang] = useState<"km" | "en">("km");

  // Auto-advance slides every 5.5s if not touched
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  const handleNextSlide = () => {
    triggerHapticSelection();
    sounds.playPop();
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleGetStarted = () => {
    triggerHapticLight();
    sounds.playPop();
    navigate({
      to: "/auth",
      search: { mode: "signup", lang },
    });
  };

  const handleSignIn = () => {
    triggerHapticLight();
    sounds.playPop();
    navigate({
      to: "/auth",
      search: { mode: "signin", lang },
    });
  };

  const handleBrowseGuest = () => {
    triggerHapticLight();
    sounds.playPop();
    navigate({ to: "/exams" });
  };

  const toggleLanguage = () => {
    triggerHapticLight();
    sounds.playPop();
    setLang((prev) => (prev === "km" ? "en" : "km"));
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] dark:bg-background text-[#111827] dark:text-foreground flex flex-col justify-between max-w-md mx-auto px-5 selection:bg-emerald-500 selection:text-white select-none"
      style={{
        paddingTop: "max(1.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))",
        paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
      }}
    >
      {/* ============================================================ */}
      {/* 1. TOP APP BAR (BRAND & LANGUAGE SWITCHER)                   */}
      {/* ============================================================ */}
      <header className="pt-1 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
              Science<span className="text-[#059669]">KH</span>
            </span>
            <span className="block text-[10px] font-bold text-[#64748B] -mt-0.5">
              {lang === "km" ? "បណ្ណសារវិទ្យាសាស្ត្រជាតិ" : "Cambodia STEM & Exam Archive"}
            </span>
          </div>
        </div>

        {/* Language Pill Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="px-2.5 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition shadow-2xs cursor-pointer active:scale-95"
          aria-label="Switch Language"
        >
          {lang === "km" ? "🇰🇭 KH" : "🇬🇧 EN"}
        </button>
      </header>

      {/* ============================================================ */}
      {/* 2. CENTER SWIPEABLE HERO HERO ILLUSTRATION & VALUE PROPOSITION */}
      {/* ============================================================ */}
      <div
        className="flex-1 flex flex-col items-center justify-center py-6 text-center cursor-pointer"
        onClick={handleNextSlide}
      >
        {/* Animated Badge Icon Container */}
        <div className="relative mb-6">
          <div
            className={cn(
              "w-28 h-28 rounded-3xl flex items-center justify-center border shadow-xl transition-all duration-500 transform",
              slide.iconBg,
              slide.badgeBorder
            )}
          >
            <IconComponent className={cn("w-14 h-14 transition-all duration-300", slide.iconColor)} />
          </div>

          {/* Sparkle Floating Indicator */}
          <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-md border border-slate-100 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold uppercase tracking-wide mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{lang === "km" ? slide.tagKm : slide.tagEn}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight max-w-xs mb-3">
          {lang === "km" ? slide.titleKm : slide.titleEn}
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed font-sans">
          {lang === "km" ? slide.descKm : slide.descEn}
        </p>

        {/* Slide Pagination Dots */}
        <div className="flex items-center gap-2 mt-6">
          {SLIDES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerHapticSelection();
                setCurrentSlide(s.id);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                currentSlide === s.id
                  ? "w-7 bg-[#059669]"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              )}
              aria-label={`Slide ${s.id + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM CALL-TO-ACTION STACK (DUOLINGO GRADE)              */}
      {/* ============================================================ */}
      <footer className="space-y-3 pt-2 pb-6">
        {/* Primary CTA: GET STARTED / CREATE ACCOUNT */}
        <button
          type="button"
          onClick={handleGetStarted}
          className="w-full h-13 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-display font-black text-base shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer border-b-[4px] border-[#047857] active:border-b-0 active:translate-y-1"
        >
          <span>{lang === "km" ? "ចាប់ផ្តើមរៀនឥឡូវនេះ" : "GET STARTED"}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Secondary CTA: I ALREADY HAVE AN ACCOUNT */}
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full h-13 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-100 font-display font-extrabold text-sm active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs border-b-[4px] border-slate-300 dark:border-slate-700 active:border-b-2 active:translate-y-0.5"
        >
          <span>{lang === "km" ? "ខ្ញុំមានគណនីរួចហើយ" : "I ALREADY HAVE AN ACCOUNT"}</span>
        </button>

        {/* Tertiary Guest Access Link */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleBrowseGuest}
            className="text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer underline underline-offset-4"
          >
            {lang === "km" ? "សាកល្បងមើលវិញ្ញាសាជាភ្ញៀវ →" : "Browse Exam Archive as Guest →"}
          </button>
        </div>
      </footer>
    </div>
  );
}

