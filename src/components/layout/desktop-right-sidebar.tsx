// ==============================================================================
// ScienceKH — Desktop Contextual Right Sidebar (បារចំហៀងស្តាំកុំព្យូទ័រ)
// Minimalist, high-utility supporting sidebar structured into 3 core sections:
// A. Weekly Progress (Study days, daily goal, weekly habit rhythm)
// B. Continue Studying (Recently accessed lesson, upcoming activity)
// C. Quick References (Grade-specific formulas, definitions, bookmarked items)
// ==============================================================================

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Flame,
  Check,
  Bookmark,
  Layers,
  ChevronRight,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { toKhmerNumeral } from "@/lib/i18n";
import { sounds } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";

interface DesktopRightSidebarProps {
  children?: ReactNode;
}

export function DesktopRightSidebar({ children }: DesktopRightSidebarProps) {
  return (
    <aside
      className="hidden xl:block w-[280px] xl:w-[290px] 2xl:w-[300px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar space-y-4 pb-8"
      aria-label="Contextual Study Assistant"
    >
      {children}
    </aside>
  );
}

// 7-Day Weekly Rhythm Days (Mon - Sun)
const WEEK_DAYS = [
  { key: "mon", labelKm: "ច", labelEn: "M" },
  { key: "tue", labelKm: "អ", labelEn: "T" },
  { key: "wed", labelKm: "ព", labelEn: "W" },
  { key: "thu", labelKm: "ព្រ", labelEn: "T" },
  { key: "fri", labelKm: "សុ", labelEn: "F" },
  { key: "sat", labelKm: "ស", labelEn: "S" },
  { key: "sun", labelKm: "អា", labelEn: "S" },
];

// Grade-Specific High-Yield Academic References
const GRADE_QUICK_REFERENCES: Record<number, Array<{ titleKm: string; titleEn: string; formula: string; subjectKm: string; subjectEn: string }>> = {
  12: [
    { titleKm: "រូបមន្តអាំងតេក្រាល", titleEn: "Definite Integral", formula: "∫ f(x)dx = F(b) - F(a)", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ច្បាប់ទី ២ ញូតុន", titleEn: "Newton's 2nd Law", formula: "Σ F = m · a", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
    { titleKm: "កំហាប់ pH", titleEn: "pH Calculation", formula: "pH = -log[H₃O⁺]", subjectKm: "គីមី", subjectEn: "Chem" },
  ],
  11: [
    { titleKm: "ដេរីវេនៃអនុគមន៍", titleEn: "Derivatives", formula: "(xⁿ)' = n·xⁿ⁻¹", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ច្បាប់គូឡុំ", titleEn: "Coulomb's Law", formula: "F = k|q₁q₂| / r²", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
    { titleKm: "ល្បឿនប្រតិកម្មគីមី", titleEn: "Reaction Rate", formula: "v = -Δ[A] / Δt", subjectKm: "គីមី", subjectEn: "Chem" },
  ],
  10: [
    { titleKm: "អនុគមន៍ដឺក្រេទី ២", titleEn: "Quadratic Function", formula: "y = ax² + bx + c", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ថាមពលស៊ីនេទិច", titleEn: "Kinetic Energy", formula: "E_k = ½ m·v²", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
    { titleKm: "ចំនួនម៉ូល", titleEn: "Mole Formula", formula: "n = m / M", subjectKm: "គីមី", subjectEn: "Chem" },
  ],
  9: [
    { titleKm: "រូបមន្តសមីការដឺក្រេទី ២", titleEn: "Quadratic Formula", formula: "Δ = b² - 4ac", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ទ្រឹស្តីបទពីតាក័រ", titleEn: "Pythagorean Theorem", formula: "a² + b² = c²", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ច្បាប់អូម", titleEn: "Ohm's Law", formula: "U = R · I", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
  ],
  8: [
    { titleKm: "រូបមន្តពន្លាតទ្វេធា", titleEn: "Binomial Expansion", formula: "(a + b)² = a² + 2ab + b²", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ល្បឿនមធ្យម", titleEn: "Average Velocity", formula: "v = s / t", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
    { titleKm: "សម្ពាធ", titleEn: "Pressure Formula", formula: "P = F / A", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
  ],
  7: [
    { titleKm: "សំណុំចំនួនគត់", titleEn: "Set of Integers", formula: "ℤ = {..., -1, 0, 1, ...}", subjectKm: "គណិត", subjectEn: "Math" },
    { titleKm: "ម៉ាសមាឌ", titleEn: "Mass Density", formula: "ρ = m / V", subjectKm: "រូបវិទ្យា", subjectEn: "Physics" },
    { titleKm: "ប្រមាណវិធីប្រភាគ", titleEn: "Fractions Addition", formula: "a/b + c/b = (a+c)/b", subjectKm: "គណិត", subjectEn: "Math" },
  ],
};

export interface HomeRightSidebarWidgetsProps {
  studentGrade: number;
  studentStream?: "science" | "social";
  streakDays?: number;
  currentXp?: number;
  dailyGoal?: number;
  todayXp?: number;
  activeLesson?: {
    id: string;
    title_km: string;
    title_en: string;
    estimated_minutes: number;
    xp_reward: number;
    subject?: {
      name_km: string;
      name_en: string;
    };
  };
  inProgressLesson?: {
    id: string;
    title_km: string;
    title_en: string;
    estimated_minutes: number;
    subject?: {
      name_km: string;
      name_en: string;
    };
  } | null;
}

/**
 * Pre-configured Desktop Right Sidebar for the Student Home Page
 */
export function HomeRightSidebarWidgets({
  studentGrade,
  studentStream = "science",
  streakDays = 1,
  currentXp = 0,
  dailyGoal = 50,
  todayXp = 0,
  activeLesson,
  inProgressLesson,
}: HomeRightSidebarWidgetsProps) {
  const { lang } = useProfile();
  const isKhmer = lang === "km";

  // Dynamic 7-Day Habit Tracker
  const dynamicWeekDays = useMemo(() => {
    return WEEK_DAYS.map((day, i) => ({
      ...day,
      completed: i < Math.min(streakDays, 7),
      isToday: i === Math.min(Math.max(0, streakDays - 1), 6),
    }));
  }, [streakDays]);

  const goalPercent = Math.min(100, Math.round((todayXp / dailyGoal) * 100));

  // Determine Continue Studying target
  const resumeLesson = inProgressLesson || activeLesson;

  // Grade-tailored references
  const quickReferences = useMemo(() => {
    return GRADE_QUICK_REFERENCES[studentGrade] || GRADE_QUICK_REFERENCES[12];
  }, [studentGrade]);

  // Bookmarked references count from localStorage
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sciencekh_bookmarked_references");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setBookmarkCount(parsed.length);
        }
      } catch {
        // silent
      }
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* ================================================================== */}
      {/* SECTION A: WEEKLY PROGRESS                                         */}
      {/* Study days, daily goal progress, and 7-day habit rhythm           */}
      {/* ================================================================== */}
      <section className="p-4 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 border border-amber-200/60 dark:border-amber-800/60">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                {isKhmer ? "វឌ្ឍនភាពប្រចាំសប្តាហ៍" : "Weekly Progress"}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {streakDays} {isKhmer ? "ថ្ងៃបន្តបន្ទាប់" : "days streak"}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
            {todayXp}/{dailyGoal} XP
          </span>
        </div>

        {/* Goal Progress Bar */}
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#059669] transition-all duration-500"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10.5px] text-slate-400 font-medium">
            <span>{isKhmer ? "គោលដៅថ្ងៃនេះ" : "Today's goal"}</span>
            <span>{goalPercent}%</span>
          </div>
        </div>

        {/* 7-Day Habit Tracker Grid */}
        <div className="grid grid-cols-7 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {dynamicWeekDays.map((day) => (
            <div key={day.key} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-slate-400">
                {isKhmer ? day.labelKm : day.labelEn}
              </span>
              <div
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full text-xs transition-all",
                  day.completed
                    ? "bg-[#059669] text-white shadow-2xs font-bold"
                    : day.isToday
                      ? "border-2 border-[#059669] text-[#059669] font-bold bg-emerald-50/50 dark:bg-emerald-950/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}
              >
                {day.completed ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION B: SAVED REFERENCES                                        */}
      {/* Grade-specific formulas, definitions & bookmarked reference items  */}
      {/* ================================================================== */}
      <section className="p-4 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
              <Layers className="h-4 w-4 text-[#059669]" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                {isKhmer ? `រូបមន្តសំខាន់ (ថ្នាក់ទី ${toKhmerNumeral(studentGrade)})` : `Formulas (Grade ${studentGrade})`}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {isKhmer ? "ឯកសារយោង និងរូបមន្តស្នូល" : "Core academic formulas"}
              </span>
            </div>
          </div>
          <Link
            to="/reference"
            search={{ grade: studentGrade }}
            onClick={() => sounds.playPop()}
            className="text-[11px] font-bold text-[#059669] hover:underline flex items-center gap-0.5"
          >
            <span>{isKhmer ? "ទាំងអស់" : "View all"}</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-1.5">
          {quickReferences.map((ref, idx) => (
            <Link
              key={idx}
              to="/reference"
              search={{ grade: studentGrade }}
              onClick={() => sounds.playPop()}
              className="p-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/40 hover:border-emerald-300 dark:hover:border-emerald-800 transition flex items-center justify-between text-xs group cursor-pointer"
            >
              <div className="min-w-0 pr-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#059669] transition truncate block text-[11px]">
                  {isKhmer ? ref.titleKm : ref.titleEn}
                </span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  {ref.formula}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold shrink-0 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                {isKhmer ? ref.subjectKm : ref.subjectEn}
              </span>
            </Link>
          ))}
        </div>

        {bookmarkCount > 0 && (
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              to="/reference"
              search={{ grade: studentGrade }}
              className="text-[11px] font-semibold text-slate-500 hover:text-[#059669] flex items-center gap-1.5"
            >
              <Bookmark className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>{isKhmer ? `${bookmarkCount} ឯកសារយោងបានកត់ត្រាទុក` : `${bookmarkCount} Bookmarked references`}</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
