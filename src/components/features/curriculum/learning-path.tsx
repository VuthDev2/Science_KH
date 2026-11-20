// ==============================================================================
// ScienceKH — Official MoEYS STEM Learning Roadmap & Spatial Pathway
// Aligned with the Cambodian National Ministry of Education (Grades 7–12)
// Winding Stepping Stone Pathway, Tactile Nodes, Mystery Chests, Boss Challenges,
// Interactive Practical Application Quick-Peek Sheet, & Sound Effects
// ==============================================================================

import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Sparkles,
  Play,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  PenTool,
  Lock,
  X,
  Swords,
  Gift,
  HelpCircle,
  Compass,
  Star,
  Zap,
  Lightbulb,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import {
  groupLessonsIntoUnits,
  type CurriculumUnitDefinition,
  type UnitWithLessons,
} from "@/lib/curriculum/units";

export type LessonNode = {
  id: string;
  title_en: string;
  title_km: string;
  summary_en: string | null;
  summary_km: string | null;
  grade: number;
  sort_order: number;
  xp_reward: number;
  estimated_minutes: number;
  subject?: { slug: string; name_en: string; name_km: string } | null;
};

interface LearningPathProps {
  lessons: LessonNode[];
  completedIds: Set<string>;
  inProgressIds: Set<string>;
  lang: "en" | "km";
  subjectTitle?: string;
  subjectSlug?: string;
  grade?: number;
}

// Biome Visual Profiles for Unit Realms
interface BiomeStyle {
  gradient: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  orbGradient: string;
  orbBorder: string;
  orbShadow: string;
  glowColor: string;
  icon: string;
  realmName_km: string;
  realmName_en: string;
}

const BIOME_STYLES: BiomeStyle[] = [
  {
    gradient: "from-emerald-600 via-teal-600 to-emerald-700",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    orbGradient: "from-emerald-500 to-emerald-600",
    orbBorder: "border-emerald-700",
    orbShadow: "shadow-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: "🌱",
    realmName_km: "ដែនដីគ្រឹះវិទ្យាសាស្ត្រ",
    realmName_en: "Foundations Realm",
  },
  {
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    badgeBg: "bg-blue-50 dark:bg-blue-950/60",
    badgeText: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    orbGradient: "from-blue-500 to-indigo-600",
    orbBorder: "border-indigo-700",
    orbShadow: "shadow-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.4)",
    icon: "⚡",
    realmName_km: "ដែនអគ្គិសនី និងរលកថាមពល",
    realmName_en: "Energy & Waves Realm",
  },
  {
    gradient: "from-purple-600 via-fuchsia-600 to-purple-700",
    badgeBg: "bg-purple-50 dark:bg-purple-950/60",
    badgeText: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    orbGradient: "from-purple-500 to-fuchsia-600",
    orbBorder: "border-purple-800",
    orbShadow: "shadow-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.4)",
    icon: "🔮",
    realmName_km: "ដែនដីម៉ូលេគុល និងប្រតិកម្ម",
    realmName_en: "Reactions & Synthesis Realm",
  },
  {
    gradient: "from-amber-500 via-orange-600 to-amber-700",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60",
    badgeText: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    orbGradient: "from-amber-500 to-orange-600",
    orbBorder: "border-amber-700",
    orbShadow: "shadow-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: "☀️",
    realmName_km: "ដែនថាមពលកកើតឡើងវិញ",
    realmName_en: "Renewable Systems Realm",
  },
  {
    gradient: "from-rose-600 via-pink-600 to-rose-700",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60",
    badgeText: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    orbGradient: "from-rose-500 to-pink-600",
    orbBorder: "border-rose-800",
    orbShadow: "shadow-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.4)",
    icon: "🧬",
    realmName_km: "ដែនដីជីវសាស្ត្រ និងតំណពូជ",
    realmName_en: "Genetics & Living Systems Realm",
  },
];

// Helper: Curated Practical Application Insights for Real-World STEM Connection
function getLessonPracticalInsight(lesson: LessonNode, isKhmer: boolean): string {
  const text =
    `${lesson.title_en} ${lesson.title_km} ${lesson.summary_en || ""} ${lesson.summary_km || ""}`.toLowerCase();

  if (text.includes("integer") || text.includes("ចំនួនគត់") || text.includes("algebraic")) {
    return isKhmer
      ? "ហេតុអ្វីត្រូវរៀនលេខអវិជ្ជមាន? ក្នុងជីវិតពិត នៅពេលសីតុណ្ហភាពធ្លាក់ចុះក្រោមសូន្យ (-5°C) ឬក្នុងធនាគារនៅពេលមានបំណុល ចំនួនអវិជ្ជមានជួយយើងគណនាយ៉ាងសុក្រឹតបំផុត!"
      : "Why do negative numbers exist? In the real world, sub-zero temperatures (-5°C) and financial balances rely on negative integers for precise mathematical accounting.";
  }
  if (
    text.includes("fraction") ||
    text.includes("ប្រភាគ") ||
    text.includes("percentage") ||
    text.includes("decimal")
  ) {
    return isKhmer
      ? "ប្រភាគ និងភាគរយ គឺជាភាសារបស់វិស្វករ និងពាណិជ្ជករ! ការដឹងពីសមាមាត្រជួយយើងលាយសារធាតុគីមី ឬគណនាការប្រាក់បានយ៉ាងត្រឹមត្រូវ!"
      : "Fractions and percentages are the universal language of ratios, chemical mixing, and financial growth calculations.";
  }
  if (text.includes("equation") || text.includes("សមីការ")) {
    return isKhmer
      ? "សមីការ គឺជាឧបករណ៍ស្វែងរកចម្លើយអាថ៌កំបាំង! រាល់ពេលដែលអ្នកចង់ដឹងពីតម្លៃមិនស្គាល់ (x) ក្នុងវិទ្យាសាស្ត្រ ឬជីវិតប្រចាំថ្ងៃ សមីការដោះស្រាយវាភ្លាម!"
      : "Equations turn unknown questions into definite mathematical solutions across engineering, business, and science.";
  }

  if (text.includes("integral") || text.includes("អាំងតេក្រាល")) {
    return isKhmer
      ? "អាំងតេក្រាល គឺជាវិធីបូកបញ្ចូលបំណែកតូចៗគ្មានដែនកំណត់! វិស្វករអវកាសប្រើវាដើម្បីគណនាគន្លងផ្លូវ និងកម្លាំងរុញរបស់គ្រាប់រ៉ុក្កែត SpaceX!"
      : "Integrals sum infinitely small slices! Aerospace engineers use them to calculate orbital trajectories and rocket thrust curves.";
  }
  if (text.includes("complex") || text.includes("កុំផ្លិច")) {
    return isKhmer
      ? "ចំនួនកុំផ្លិច (i = √-1) គឺជាអាថ៌កំបាំងនៅពីក្រោយបច្ចេកវិទ្យា Quantum Computing និងរលកសញ្ញា Wi-Fi ដែលអ្នកកំពុងប្រើរាល់ថ្ងៃ!"
      : "Complex numbers (i = √-1) power quantum computing and the electromagnetic wave rotations behind modern Wi-Fi.";
  }
  if (
    text.includes("newton") ||
    text.includes("ញូតុន") ||
    text.includes("ចលនា") ||
    text.includes("motion")
  ) {
    return isKhmer
      ? "ច្បាប់ញូតុន F = m·a បង្ហាញថាកម្លាំងបង្កើតបម្រែបម្រួលល្បឿន! រថយន្តទំនើប និងយន្តហោះសុទ្ធតែរចនាតាមសមីការនេះ!"
      : "Newton's F = m·a is the bedrock of modern aerodynamics and vehicle safety engineering.";
  }
  if (
    text.includes("rlc") ||
    text.includes("ចរន្តឆ្លាស់") ||
    text.includes("wave") ||
    text.includes("រលក")
  ) {
    return isKhmer
      ? "សៀគ្វី RLC គឺជាមូលដ្ឋាននៃទូរស័ព្ទស្មាតហ្វូន! បាតុភូតរ៉េសូណង់អនុញ្ញាតឱ្យឧបករណ៍របស់អ្នកចាប់យកប៉ុស្តិ៍ 5G បានយ៉ាងច្បាស់!"
      : "RLC resonant circuits act as high-precision frequency filters, allowing your smartphone to lock onto 5G carrier bands.";
  }
  if (
    text.includes("acid") ||
    text.includes("ph") ||
    text.includes("អាស៊ីត") ||
    text.includes("បាស")
  ) {
    return isKhmer
      ? "កម្រិត pH ក្នុងឈាមមនុស្សត្រូវតែរក្សាឱ្យបានចន្លោះ 7.35–7.45 យ៉ាងតឹងរ៉ឹង! បើប្រែប្រួលបន្តិចបន្តួច អង់ស៊ីមជីវិតនឹងឈប់ដំណើរការ!"
      : "Human blood pH is strictly regulated at 7.35–7.45; chemical buffer systems keep our cellular enzymes functioning.";
  }
  if (text.includes("kinetic") || text.includes("ស៊ីនេទិច") || text.includes("ល្បឿនប្រតិកម្ម")) {
    return isKhmer
      ? "កាតាលីករជួយបង្កើនល្បឿនប្រតិកម្មដោយមិនបាត់បង់ខ្លួនឯង! ក្នុងរថយន្ត កាតាលីករជួយកាត់បន្ថយផ្សែងពុលដល់ទៅ ៩០%!"
      : "Catalysts accelerate reactions without degradation. Automotive catalytic converters filter over 90% of toxic emissions.";
  }
  if (
    text.includes("dna") ||
    text.includes("ហ្សែន") ||
    text.includes("តំណពូជ") ||
    text.includes("genetics")
  ) {
    return isKhmer
      ? "DNA គឺជាសៀវភៅកូដនៃជីវិត! មនុស្សយើងមាន DNA ដូចគ្នាដល់ទៅ 99.9% ភាពខុសគ្នាត្រឹម 0.1% ប៉ុណ្ណោះដែលបង្កើតភាពពិសេសរបស់មនុស្សម្នាក់ៗ!"
      : "DNA is life's master code. Humans share 99.9% of identical genetic sequences; that 0.1% creates our unique individuality.";
  }
  if (text.includes("neuron") || text.includes("ប្រសាទ") || text.includes("ខួរក្បាល")) {
    return isKhmer
      ? "ខួរក្បាលមនុស្សមានណឺរ៉ូនប្រមាណ ៨៦ ពាន់លាន! សញ្ញាប្រសាទរត់ឆ្លងកាត់ក្នុងល្បឿនជាង ៤០០ គីឡូម៉ែត្រក្នុងមួយម៉ោង!"
      : "The human brain networks 86 billion neurons, firing signals at speeds exceeding 400 km/h.";
  }
  if (
    text.includes("atmosphere") ||
    text.includes("ozone") ||
    text.includes("អូហ្សូន") ||
    text.includes("បរិយាកាស")
  ) {
    return isKhmer
      ? "ស្រទាប់អូហ្សូនការពារផែនដីពីកាំរស្មីយូវីដែលបង្កគ្រោះថ្នាក់! ការយល់ដឹងពីភពផែនដីជួយយើងការពារអនាគតកម្ពុជា!"
      : "The stratospheric ozone layer shields Earth from ionizing solar radiation, making complex life possible.";
  }

  return isKhmer
    ? "ការយល់ដឹងច្បាស់ពីនិយមន័យ និងការអនុវត្តលំហាត់គំរូជាប្រចាំ ជួយពង្រឹងមូលដ្ឋានគ្រឹះសម្រាប់ការប្រឡងថ្នាក់ជាតិ។"
    : "A solid grasp of core definitions and regular problem-solving builds strong foundations for national examinations.";
}

// Alternating Stepping Stone Positions (Center, Left, Center, Right, Center)
const STEP_X_POSITIONS = [
  "translate-x-0", // Step 0: Center
  "-translate-x-12", // Step 1: Left
  "translate-x-0", // Step 2: Center
  "translate-x-12", // Step 3: Right
  "translate-x-0", // Step 4: Center
  "-translate-x-10", // Step 5: Left
  "translate-x-10", // Step 6: Right
];

export function LearningPath({
  lessons,
  completedIds,
  inProgressIds,
  lang,
  subjectTitle,
  subjectSlug,
  grade = 12,
}: LearningPathProps) {
  const isKhmer = lang === "km";

  const safeBlur = () => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // Selected lesson for interactive quick-peek drawer
  const [selectedLesson, setSelectedLesson] = useState<LessonNode | null>(null);

  // Mystery chest state (saved in localStorage for persistence)
  const [claimedChestUnits, setClaimedChestUnits] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("sciencekh_claimed_chests");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [activeChestModal, setActiveChestModal] = useState<{
    unitId: string;
    unitNumber: number;
    xpBonus: number;
  } | null>(null);

  // Group lessons into official MoEYS units
  const unitsWithLessons: UnitWithLessons[] = useMemo(() => {
    return groupLessonsIntoUnits(lessons, grade, subjectSlug, completedIds);
  }, [lessons, grade, subjectSlug, completedIds]);

  // Identify the single Global Active Lesson (The Next Challenge)
  const activeGlobalLessonId = useMemo(() => {
    for (const group of unitsWithLessons) {
      const nextIncomplete = group.lessons.find((l) => !completedIds.has(l.id));
      if (nextIncomplete) return nextIncomplete.id;
    }
    return lessons[0]?.id ?? null;
  }, [unitsWithLessons, completedIds, lessons]);

  // Handle chest claiming
  const handleClaimChest = (unitId: string, unitNumber: number) => {
    sounds.playVictory();
    const updated = new Set(claimedChestUnits);
    updated.add(unitId);
    setClaimedChestUnits(updated);
    try {
      localStorage.setItem("sciencekh_claimed_chests", JSON.stringify(Array.from(updated)));
    } catch {
      // ignore
    }
    setActiveChestModal({
      unitId,
      unitNumber,
      xpBonus: 40,
    });
  };

  // Floating Jump Button: Only show when user scrolls away from top/active view
  const [showJumpButton, setShowJumpButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowJumpButton(window.scrollY > 450);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to active lesson
  const scrollToActiveLesson = (silent: boolean | unknown = false) => {
    if (silent !== true) sounds.playPop();
    if (!activeGlobalLessonId) return;

    // If active lesson is the first lesson, keep the scroll at the top so the Unit banner is in view
    if (lessons.length > 0 && activeGlobalLessonId === lessons[0].id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(`step-node-${activeGlobalLessonId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Duolingo Auto-Scroll on initial mount / roadmap change
  useEffect(() => {
    if (!activeGlobalLessonId) return;
    const timer = setTimeout(() => {
      scrollToActiveLesson(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeGlobalLessonId]);

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center space-y-6 pb-28 sm:pb-32">
      {/* ===================================================================== */}
      {/* THEMATIC BIOME REALMS & WINDING STEPPING STONE PATHWAY                */}
      {/* ===================================================================== */}
      <div className="w-full space-y-10">
        {unitsWithLessons.map((unitGroup, unitIndex) => {
          const {
            unit,
            lessons: unitLessons,
            completedCount,
            totalCount,
            progressPercent,
            isLocked,
          } = unitGroup;

          const isUnitDone = completedCount === totalCount && totalCount > 0;
          const biome = BIOME_STYLES[unitIndex % BIOME_STYLES.length];
          const hasChest = unitLessons.length >= 2;
          const isChestClaimed = claimedChestUnits.has(unit.id);
          const isChestUnlocked = completedCount >= Math.ceil(unitLessons.length / 2);

          return (
            <section
              key={unit.id}
              className={cn(
                "relative rounded-3xl transition-all duration-200",
                isLocked ? "opacity-75 grayscale-[35%]" : "opacity-100",
              )}
            >
              {/* ------------------------------------------------------------- */}
              {/* A. BIOME REALM HEADER CARD                                    */}
              {/* ------------------------------------------------------------- */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl p-5 text-white shadow-sm transition-all",
                  `bg-gradient-to-r ${biome.gradient}`,
                )}
              >
                {/* Visual Texture / Decorative Rings */}
                <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full border-4 border-white/10 pointer-events-none" />
                <div className="absolute right-8 -top-8 h-24 w-24 rounded-full border-4 border-white/10 pointer-events-none" />

                <div className="relative z-10 space-y-2.5">
                  {/* Eyebrow: Unit Number + Status Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                      {isUnitDone ? (
                        <Check className="h-3 w-3 stroke-[3]" />
                      ) : isLocked ? (
                        <Lock className="h-3 w-3 stroke-[2.5]" />
                      ) : (
                        <Zap className="h-3 w-3 fill-current text-amber-300" />
                      )}
                      <span>
                        {isKhmer ? `ជំពូកទី ${unit.unitNumber}` : `Unit ${unit.unitNumber}`}
                      </span>
                    </span>

                    <span className="text-[11px] font-black tracking-wide bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      {completedCount}/{totalCount} {isKhmer ? "មេរៀន" : "Lessons"}
                    </span>
                  </div>

                  {/* Unit Title & Description */}
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-black text-white leading-snug">
                      {isKhmer ? unit.title_km : unit.title_en}
                    </h3>
                    <p className="text-xs text-white/85 line-clamp-2 leading-relaxed mt-1">
                      {isKhmer ? unit.description_km : unit.description_en}
                    </p>
                  </div>

                  {/* Progress Strip in Header */}
                  <div className="pt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-black/25 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-500 shadow-2xs"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white/90 shrink-0">
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* B. MEANDERING WINDING STEPPING STONES PATHWAY                 */}
              {/* ------------------------------------------------------------- */}
              <div className="relative pt-8 pb-4 flex flex-col items-center">
                {/* SVG Connecting Track Line */}
                <div className="absolute top-4 bottom-8 left-1/2 -translate-x-1/2 w-1.5 bg-slate-200/90 dark:bg-slate-800 -z-0 rounded-full" />

                {unitLessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedIds.has(lesson.id);
                  const isCurrent = lesson.id === activeGlobalLessonId;
                  const stepNumber = lessonIdx + 1;
                  const xPosClass = STEP_X_POSITIONS[lessonIdx % STEP_X_POSITIONS.length];

                  // Halfway Chest Placement
                  const shouldShowChestAfter =
                    hasChest && lessonIdx === Math.floor(unitLessons.length / 2) - 1;

                  return (
                    <div
                      key={lesson.id}
                      id={`step-node-${lesson.id}`}
                      className="relative w-full flex flex-col items-center my-3.5 z-10"
                    >
                      {/* Floating Active "START HERE" Banner */}
                      {isCurrent && (
                        <div className="mb-2 animate-bounce flex flex-col items-center pointer-events-none">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px] shadow-lg shadow-emerald-600/30">
                            <Play className="h-2.5 w-2.5 fill-white" />
                            <span>{isKhmer ? "រៀនបន្តត្រង់នេះ!" : "CONTINUE HERE!"}</span>
                          </div>
                          <div className="w-2 h-2 bg-emerald-600 rotate-45 -mt-1" />
                        </div>
                      )}

                      {/* Tactile 3D Stepping Stone Orb */}
                      <div className={cn("transition-transform duration-300 flex flex-col items-center w-[150px] shrink-0", xPosClass)}>
                        <button
                          type="button"
                          onClick={() => {
                            safeBlur();
                            sounds.playPop();
                            setSelectedLesson(lesson);
                          }}
                          className={cn(
                            "relative group flex flex-col items-center justify-center rounded-full transition-all duration-150 cursor-pointer select-none shrink-0 aspect-square",
                            "h-[68px] w-[68px] sm:h-[72px] sm:w-[72px] min-w-[68px] min-h-[68px]",
                            // 3D Push-down button styling:
                            isCompleted
                              ? "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-b-[6px] border-emerald-700 shadow-md shadow-emerald-500/25 active:border-b-0 active:translate-y-1.5"
                              : isCurrent
                                ? "bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-600 text-white border-b-[6px] border-emerald-800 shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-400/50 animate-pulse active:border-b-0 active:translate-y-1.5"
                                : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 border-b-[6px] border-b-slate-300 dark:border-b-slate-900 shadow-sm hover:border-emerald-500 active:border-b-0 active:translate-y-1.5",
                          )}
                          aria-label={`Lesson ${stepNumber}: ${lesson.title_km}`}
                        >
                          {/* Top Star Crown for Completed Lessons */}
                          {isCompleted && (
                            <div className="absolute -top-3.5 flex items-center justify-center gap-0.5 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-xs border border-amber-300">
                              <Star className="h-2.5 w-2.5 fill-current" />
                              <Star className="h-2.5 w-2.5 fill-current" />
                              <Star className="h-2.5 w-2.5 fill-current" />
                            </div>
                          )}

                          {/* Node Core Icon / Number */}
                          <div className="flex flex-col items-center justify-center">
                            {isCompleted ? (
                              <Check className="h-7 w-7 stroke-[3.5] text-white" />
                            ) : isCurrent ? (
                              <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
                            ) : isLocked ? (
                              <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            ) : (
                              <span className="font-display text-lg font-black text-slate-700 dark:text-slate-200">
                                {stepNumber}
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Lesson Label Pill Below Node */}
                        <div
                          onClick={() => {
                            safeBlur();
                            sounds.playPop();
                            setSelectedLesson(lesson);
                          }}
                          className="mt-2 w-full flex flex-col items-center text-center cursor-pointer px-1"
                        >
                          {lesson.title_km.includes("លំហាត់") || lesson.title_en?.toLowerCase().includes("practice") ? (
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 mb-1">
                              <PenTool className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                              <span>{isKhmer ? "លំហាត់អនុវត្ត" : "Practice"}</span>
                            </span>
                          ) : lesson.title_km.includes("វិញ្ញាសា") || lesson.title_en?.toLowerCase().includes("exam") ? (
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 mb-1">
                              <Award className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
                              <span>{isKhmer ? "វិញ្ញាសាប្រឡង" : "Exam Challenge"}</span>
                            </span>
                          ) : null}

                          <span
                            className={cn(
                              "text-xs font-bold line-clamp-2 leading-tight transition-colors break-words",
                              isCurrent
                                ? "text-emerald-600 dark:text-emerald-400 font-black"
                                : isCompleted
                                  ? "text-slate-800 dark:text-slate-200"
                                  : "text-slate-500 dark:text-slate-400",
                            )}
                          >
                            {isKhmer ? lesson.title_km : lesson.title_en}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                            +{lesson.xp_reward || 35} XP
                          </span>
                        </div>
                      </div>

                      {/* ------------------------------------------------------- */}
                      {/* MYSTERY BONUS CHEST MILESTONE                           */}
                      {/* ------------------------------------------------------- */}
                      {shouldShowChestAfter && (
                        <div className="relative my-4 flex flex-col items-center z-10 w-[150px] shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              safeBlur();
                              if (isChestUnlocked && !isChestClaimed) {
                                handleClaimChest(unit.id, unit.unitNumber);
                              } else {
                                sounds.playPop();
                                setActiveChestModal({
                                  unitId: unit.id,
                                  unitNumber: unit.unitNumber,
                                  xpBonus: 40,
                                });
                              }
                            }}
                            className={cn(
                              "relative group grid h-14 w-14 shrink-0 aspect-square place-items-center rounded-2xl border-b-[5px] transition-all active:translate-y-1 active:border-b-0 cursor-pointer shadow-md",
                              isChestClaimed
                                ? "bg-slate-100 dark:bg-slate-800 border-b-slate-300 dark:border-b-slate-900 text-slate-400 opacity-80"
                                : isChestUnlocked
                                  ? "bg-gradient-to-b from-amber-400 to-amber-500 border-amber-600 text-slate-950 ring-4 ring-amber-300/40 animate-bounce"
                                  : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-400",
                            )}
                            aria-label="Mystery XP Chest"
                          >
                            <Gift className={cn("h-7 w-7", isChestUnlocked && "text-slate-950")} />
                            {!isChestClaimed && isChestUnlocked && (
                              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
                              </span>
                            )}
                          </button>

                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-1.5">
                            {isChestClaimed
                              ? isKhmer
                                ? "✓ បានបើកកញ្ចប់"
                                : "✓ Claimed"
                              : isKhmer
                                ? "🎁 កញ្ចប់រង្វាន់ XP"
                                : "🎁 Mystery XP Chest"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* ------------------------------------------------------------- */}
                {/* C. UNIT BOSS MASTERY CHALLENGE NODE                           */}
                {/* ------------------------------------------------------------- */}
                <div className="relative mt-4 flex flex-col items-center z-10">
                  <div
                    onClick={() => {
                      safeBlur();
                      sounds.playPop();
                      // Launch boss quiz or preview
                      const firstLesson = unitLessons[0];
                      if (firstLesson) setSelectedLesson(firstLesson);
                    }}
                    className={cn(
                      "relative group flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 max-w-sm w-full",
                      isUnitDone
                        ? "border-amber-300 bg-amber-50/60 dark:bg-amber-950/30 dark:border-amber-800"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900",
                    )}
                  >
                    <div
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl font-black text-xl shadow-xs",
                        isUnitDone
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
                      )}
                    >
                      {isUnitDone ? "🏆" : <Swords className="h-6 w-6 text-amber-600" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          {isKhmer ? "ការប្រកួតជ័យជំនះ" : "Unit Mastery"}
                        </span>
                        {isUnitDone && (
                          <span className="text-[10px] font-bold text-emerald-600">✓ Mastered</span>
                        )}
                      </div>
                      <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {isKhmer
                          ? `តេស្តស្ទាត់ជំនាញជំពូកទី ${unit.unitNumber}`
                          : `Unit ${unit.unitNumber} Mastery Challenge`}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {isKhmer
                          ? "ប្រឡងសាកល្បងបញ្ចប់ជំពូក +100 XP"
                          : "Comprehensive Boss Quiz +100 XP"}
                      </p>
                    </div>

                    <Link
                      to="/lessons/$lessonId/quiz"
                      params={{ lessonId: unitLessons[0]?.id || "default" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playPop();
                      }}
                      className="h-8 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 shadow-2xs shrink-0 cursor-pointer transition active:scale-95"
                    >
                      <span>{isKhmer ? "ប្រកួត" : "Fight"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* 3. STICKY "JUMP TO ACTIVE LESSON" FLOATING ACTION PILL                */}
      {/* Only shown when user has scrolled away from the active lesson         */}
      {/* ===================================================================== */}
      {activeGlobalLessonId && showJumpButton && (
        <aside className="fixed bottom-28 mb-safe right-4 z-30 sm:right-8 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            type="button"
            onClick={() => scrollToActiveLesson(false)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-emerald-600/90 text-white text-xs font-bold shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
            aria-label="Scroll to current lesson"
          >
            <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{isKhmer ? "មេរៀនបច្ចុប្បន្ន" : "Resume Lesson"}</span>
          </button>
        </aside>
      )}

      {/* ===================================================================== */}
      {/* 4. INTERACTIVE QUICK-PEEK CONCEPT DRAWER (BOTTOM SHEET)               */}
      {/* ===================================================================== */}
      {selectedLesson && (
        <LessonQuickPeekDrawer
          lesson={selectedLesson}
          isKhmer={isKhmer}
          isCompleted={completedIds.has(selectedLesson.id)}
          isCurrent={selectedLesson.id === activeGlobalLessonId}
          onClose={() => setSelectedLesson(null)}
        />
      )}

      {/* ===================================================================== */}
      {/* 5. MYSTERY XP CHEST CELEBRATION MODAL                                 */}
      {/* ===================================================================== */}
      {activeChestModal && (
        <MysteryChestModal
          modal={activeChestModal}
          isKhmer={isKhmer}
          isClaimed={claimedChestUnits.has(activeChestModal.unitId)}
          onClose={() => setActiveChestModal(null)}
          onClaim={() => {
            handleClaimChest(activeChestModal.unitId, activeChestModal.unitNumber);
            setActiveChestModal(null);
          }}
        />
      )}
    </div>
  );
}

function getSubjectIcon(slug?: string) {
  switch (slug) {
    case "mathematics":
      return Calculator;
    case "physics":
      return Atom;
    case "chemistry":
      return FlaskConical;
    case "biology":
      return Dna;
    case "earth":
      return Globe;
    default:
      return BookOpen;
  }
}

// ============================================================================
// QUICK-PEEK LESSON DRAWER (CLEAN, MINIMALIST, PRODUCTION-READY)
// ============================================================================
function LessonQuickPeekDrawer({
  lesson,
  isKhmer,
  isCompleted,
  isCurrent,
  onClose,
}: {
  lesson: LessonNode;
  isKhmer: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  onClose: () => void;
}) {
  const SubjectIcon = getSubjectIcon(lesson.subject?.slug);

  // Close on Escape key and release background focus to prevent aria-hidden focus blocking
  useEffect(() => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const subjectName = isKhmer
    ? lesson.subject?.name_km || "មុខវិជ្ជា"
    : lesson.subject?.name_en || "Curriculum";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Clean Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isKhmer ? lesson.title_km : lesson.title_en}
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-3xl bg-white dark:bg-slate-900 shadow-2xl border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-200 pb-safe"
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Content Container */}
        <div className="px-5 sm:px-6 pt-1 pb-6 space-y-4">
          {/* Top Bar: Subject Badge + Lesson Number + Mastered Badge + Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                <SubjectIcon className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {isKhmer
                  ? `មេរៀនទី ${lesson.sort_order || 1} · ${subjectName}`
                  : `Lesson ${lesson.sort_order || 1} · ${subjectName}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>{isKhmer ? "បានបញ្ចប់" : "Mastered"}</span>
                </span>
              ) : isCurrent ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>{isKhmer ? "រៀនបន្ត" : "Next Up"}</span>
                </span>
              ) : null}

              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Lesson Title & Summary */}
          <div className="space-y-1.5">
            <h3 className="font-display text-xl font-black text-slate-900 dark:text-white leading-snug">
              {isKhmer ? lesson.title_km : lesson.title_en}
            </h3>

            {(isKhmer ? lesson.summary_km : lesson.summary_en) && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isKhmer ? lesson.summary_km : lesson.summary_en}
              </p>
            )}
          </div>

          {/* Minimalist Info Row: Duration + XP */}
          <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-semibold">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {lesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"}
              </span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>+{lesson.xp_reward || 35} XP</span>
            </span>
          </div>

          {/* Clean Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <Link
              to="/lessons/$lessonId"
              params={{ lessonId: lesson.id }}
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="flex-1 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition cursor-pointer border-b-[4px] border-emerald-800 active:border-b-0 active:translate-y-1"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>
                {isCompleted
                  ? isKhmer
                    ? "រៀនឡើងវិញ"
                    : "Review Lesson"
                  : lesson.title_km.includes("លំហាត់")
                    ? isKhmer
                      ? "ចាប់ផ្តើមអនុវត្តលំហាត់"
                      : "Start Practice"
                    : lesson.title_km.includes("វិញ្ញាសា")
                      ? isKhmer
                        ? "ប្រកួតវិញ្ញាសាប្រឡង"
                        : "Take Exam Challenge"
                      : isKhmer
                        ? "ចាប់ផ្តើមរៀន"
                        : "Start Lesson"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/lessons/$lessonId/quiz"
              params={{ lessonId: lesson.id }}
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="h-12 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
            >
              <HelpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isKhmer ? "តេស្ត Quiz" : "Take Quiz"}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// MYSTERY CHEST CELEBRATION MODAL
// ============================================================================
function MysteryChestModal({
  modal,
  isKhmer,
  isClaimed,
  onClose,
  onClaim,
}: {
  modal: { unitId: string; unitNumber: number; xpBonus: number };
  isKhmer: boolean;
  isClaimed: boolean;
  onClose: () => void;
  onClaim: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 text-center space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        {/* Animated Trophy / Chest */}
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-b from-amber-400 to-amber-500 text-4xl shadow-xl shadow-amber-500/30 animate-bounce">
          🎁
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {isKhmer ? `រង្វាន់ជំពូកទី ${modal.unitNumber}` : `Unit ${modal.unitNumber} Reward`}
          </span>
          <h3 className="font-display text-lg font-black text-slate-900 dark:text-white">
            {isKhmer ? "កញ្ចប់កំណប់ចំណេះដឹង MoEYS!" : "Knowledge Treasure Chest!"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isClaimed
              ? isKhmer
                ? "អ្នកបានបើករង្វាន់នេះរួចរាល់ហើយ! សូមបន្តរៀនមេរៀនបន្ទាប់!"
                : "You have already claimed this treasure chest! Keep learning!"
              : isKhmer
                ? "អបអរសាទរ! ការខិតខំប្រឹងប្រែងរបស់អ្នកបានដោះសោកញ្ចប់រង្វាន់ពិសេស!"
                : "Congratulations! Your dedication unlocked a special XP bonus!"}
          </p>
        </div>

        {/* Bonus Badge */}
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 font-black text-amber-700 dark:text-amber-300 text-sm flex items-center justify-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          <span>+{modal.xpBonus} XP MoEYS Bonus</span>
        </div>

        {/* Action Button */}
        <div>
          {isClaimed ? (
            <button
              type="button"
              onClick={onClose}
              className="w-full h-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-md"
            >
              {isKhmer ? "យល់ព្រម" : "Close"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClaim}
              className="w-full h-11 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-amber-500/30 transition active:scale-95 border-b-[4px] border-amber-700 active:border-b-0 active:translate-y-1"
            >
              {isKhmer ? "🎉 ទទួលយក +40 XP ឥឡូវនេះ" : "🎉 Claim +40 XP Now"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
