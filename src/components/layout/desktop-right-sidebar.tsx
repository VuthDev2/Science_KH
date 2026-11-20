// ==============================================================================
// ScienceKH — Desktop Contextual Right Sidebar (បារចំហៀងស្តាំកុំព្យូទ័រ)
// Minimalist, high-utility supporting sidebar displaying weekly rhythm, study goals,
// bookmarked formulas, and academic milestones without vanity clutter
// ==============================================================================

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Flame,
  Sparkles,
  Check,
  Bookmark,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Bot,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { ALL_CURATED_LESSONS } from "@/lib/curriculum";
import { ReferenceRepository } from "@/services/supabase/reference.repository";
import type { ReferenceEntry } from "@/types/reference-library";
import { sounds } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";

interface DesktopRightSidebarProps {
  children?: ReactNode;
}

export function DesktopRightSidebar({ children }: DesktopRightSidebarProps) {
  return (
    <aside
      className="hidden xl:block w-[300px] 2xl:w-[320px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar space-y-4 pb-6"
      aria-label="Contextual Study Assistant"
    >
      {children}
    </aside>
  );
}

// 7-Day Weekly Rhythm Days
const WEEK_DAYS = [
  { key: "mon", labelKm: "ច", labelEn: "M" },
  { key: "tue", labelKm: "អ", labelEn: "T" },
  { key: "wed", labelKm: "ព", labelEn: "W" },
  { key: "thu", labelKm: "ព្រ", labelEn: "T" },
  { key: "fri", labelKm: "សុ", labelEn: "F" },
  { key: "sat", labelKm: "ស", labelEn: "S" },
  { key: "sun", labelKm: "អា", labelEn: "S" },
];

/**
 * Pre-configured Desktop Right Sidebar for the Home page
 */
export function HomeRightSidebarWidgets({
  studentGrade,
  studentStream = "science",
  streakDays = 1,
  currentXp = 0,
  dailyGoal = 50,
  todayXp = 0,
}: {
  studentGrade: number;
  studentStream?: "science" | "social";
  streakDays?: number;
  currentXp?: number;
  dailyGoal?: number;
  todayXp?: number;
}) {
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

  return (
    <div className="space-y-4">
      {/* 1. Daily Study Goal & Habit Rhythm */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 border border-amber-200/60 dark:border-amber-800/60">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                {isKhmer ? "ទម្លាប់សិក្សាប្រចាំថ្ងៃ" : "Daily Study Habit"}
              </span>
              <span className="text-[10.5px] text-slate-400 block">
                {streakDays} {isKhmer ? "ថ្ងៃជាប់គ្នា" : "days in a row"}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
            {todayXp}/{dailyGoal} XP
          </span>
        </div>

        {/* Goal Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
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
                    ? "bg-emerald-600 text-white shadow-2xs font-bold"
                    : day.isToday
                      ? "border-2 border-emerald-600 text-emerald-600 font-bold bg-emerald-50/50 dark:bg-emerald-950/30"
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
      </div>

      {/* 2. MoEYS Academic Track Card */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {isKhmer ? "គោលដៅប្រឡងជាតិ" : "Academic Target"}
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/60">
            {studentGrade === 12
              ? isKhmer
                ? "បាក់ឌុប ២០២៦"
                : "Bac II 2026"
              : studentGrade === 9
                ? isKhmer
                  ? "ឌីប្លូម ២០២៦"
                  : "Brevet 2026"
                : isKhmer
                  ? `ថ្នាក់ទី ${studentGrade}`
                  : `Grade ${studentGrade}`}
          </span>
        </div>

        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {studentGrade >= 11
            ? isKhmer
              ? `អ្នកកំពុងសិក្សាក្នុងខ្សែវិជ្ជាជីវៈ ${studentStream === "science" ? "វិទ្យាសាស្ត្រពិត" : "វិទ្យាសាស្ត្រសង្គម"} ស្របតាមកាលវិភាគ MoEYS។`
              : `Enrolled in the ${studentStream === "science" ? "Science Stream" : "Social Science Stream"} curriculum.`
            : isKhmer
              ? "កម្មវិធីសិក្សាមូលដ្ឋានគ្រឹះកម្រិតមធ្យមសិក្សា ស្របតាមសៀវភៅគោលក្រសួងអប់រំ។"
              : "Standard national lower-secondary curriculum."}
        </p>

        <Link
          to="/exams"
          onClick={() => sounds.playPop()}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between pt-1 group"
        >
          <span>{isKhmer ? "មើលវិញ្ញាសាគំរូ និងអត្រាកំណែ" : "View Exam Papers & Keys"}</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 3. Ask Kru Vuth Fast Launcher */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {isKhmer ? "លោកគ្រូ វុឌ្ឍ (Kru Vuth)" : "Kru Vuth — STEM Mentor"}
            </h4>
            <span className="text-[10.5px] text-slate-400 font-medium">
              {isKhmer ? "ជំនួយការដោះស្រាយមេរៀន MoEYS" : "Instant MoEYS Lesson Guidance"}
            </span>
          </div>
        </div>

        <Link
          to="/tutor"
          onClick={() => sounds.playPop()}
          className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>{isKhmer ? "សួរចម្ងល់មេរៀន" : "Ask a Question"}</span>
        </Link>
      </div>

      {/* 4. Quick Reference Library Cheatsheet */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {isKhmer ? "បណ្ណាល័យរូបមន្ត & និមិត្តសញ្ញា" : "Formula Warehouse"}
            </span>
          </div>
          <Link
            to="/reference"
            search={{ grade: studentGrade }}
            onClick={() => sounds.playPop()}
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {isKhmer ? "មើលទាំងអស់" : "View All"}
          </Link>
        </div>

        <div className="space-y-1.5">
          {[
            { titleKm: "រូបមន្តល្បឿនមធ្យម", formula: "v = s / t", subject: "រូបវិទ្យា" },
            { titleKm: "ទ្រឹស្តីបទពីតាករ", formula: "a^2 + b^2 = c^2", subject: "គណិត" },
            { titleKm: "កំហាប់ម៉ូលេគុល", formula: "C_M = n / V", subject: "គីមី" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to="/reference"
              search={{ grade: studentGrade }}
              onClick={() => sounds.playPop()}
              className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-emerald-500 transition flex items-center justify-between text-xs group cursor-pointer"
            >
              <div className="min-w-0">
                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition truncate block text-[11.5px]">
                  {item.titleKm}
                </span>
                <span className="font-mono text-[10.5px] text-slate-500 dark:text-slate-400">
                  {item.formula}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                {item.subject}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
