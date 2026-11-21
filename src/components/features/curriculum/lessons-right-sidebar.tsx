// ==============================================================================
// ScienceKH — Desktop Contextual Right Sidebar for Curriculum & Lessons
// Displays subject mastery, quick unit jump index, and contextual AI Tutor launcher
// ==============================================================================

import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { UnitWithLessons } from "@/lib/curriculum/units";
import { sounds } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";

interface LessonsRightSidebarProps {
  currentGrade: number;
  activeSubjectSlug?: string;
  activeSubjectNameKm?: string;
  activeSubjectNameEn?: string;
  unitsWithLessons: UnitWithLessons[];
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  isKhmer?: boolean;
}

export function LessonsRightSidebar({
  currentGrade,
  activeSubjectSlug,
  activeSubjectNameKm,
  activeSubjectNameEn,
  unitsWithLessons,
  completedCount,
  totalCount,
  progressPercent,
  isKhmer = true,
}: LessonsRightSidebarProps) {
  return (
    <div className="space-y-4">
      {/* 1. Subject Mastery Card */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                {(isKhmer ? activeSubjectNameKm : (activeSubjectNameEn || activeSubjectNameKm)) || (isKhmer ? "កម្មវិធីសិក្សាជាតិ" : "Curriculum")}
              </span>
              <span className="text-[10.5px] text-slate-400 block">
                {isKhmer ? `ថ្នាក់ទី ${currentGrade}` : `Grade ${currentGrade}`}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
            {completedCount}/{totalCount} {isKhmer ? "ចប់" : "Done"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>{isKhmer ? "វឌ្ឍនភាពមុខវិជ្ជា" : "Subject progress"}</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* 2. Quick Unit Jump Index (when units exist) */}
      {unitsWithLessons.length > 0 && (
        <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              {isKhmer ? "មាតិកាជំពូកសិក្សា" : "Units Outline"}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              {unitsWithLessons.length} {isKhmer ? "ជំពូក" : "Units"}
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto no-scrollbar">
            {unitsWithLessons.map((ug) => (
              <div
                key={ug.unit.id}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block truncate text-[11.5px]">
                    {isKhmer ? ug.unit.title_km : (ug.unit.title_en || ug.unit.title_km)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {ug.completedCount}/{ug.totalCount} {isKhmer ? "មេរៀនចប់" : "completed"}
                  </span>
                </div>
                {ug.isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {ug.progressPercent}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Ask Tutor about this Subject */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 grid place-items-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {isKhmer ? "លោកគ្រូ វុឌ្ឍ" : "Kru Vuth — STEM Mentor"}
            </h4>
            <span className="text-[10.5px] text-slate-400 font-medium">
              {activeSubjectNameKm
                ? isKhmer
                  ? `សួរពីមុខវិជ្ជា ${activeSubjectNameKm}`
                  : `Ask about ${activeSubjectNameEn}`
                : isKhmer
                  ? "សួរចម្ងល់មេរៀនគ្រប់មុខវិជ្ជា"
                  : "Instant Curriculum Explanations"}
            </span>
          </div>
        </div>

        <Link
          to="/tutor"
          search={{
            initialPrompt: activeSubjectNameKm
              ? isKhmer
                ? `ខ្ញុំមានចម្ងល់លើមុខវិជ្ជា ${activeSubjectNameKm} ថ្នាក់ទី ${currentGrade}៖ `
                : `I have a question about ${activeSubjectNameEn} Grade ${currentGrade}: `
              : undefined,
          }}
          onClick={() => sounds.playPop()}
          className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>{isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ" : "Ask Kru Vuth"}</span>
        </Link>
      </div>

      {/* 4. Quick Reference Library Link */}
      <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {isKhmer ? "ឯកសារយោង & រូបមន្ត" : "References"}
            </span>
          </div>
          <Link
            to="/reference"
            search={{ grade: currentGrade, subject: activeSubjectSlug }}
            onClick={() => sounds.playPop()}
            className="text-[11px] font-bold text-emerald-600 hover:underline"
          >
            {isKhmer ? "មើលទាំងអស់" : "View"}
          </Link>
        </div>
        <p className="text-[11px] text-slate-400">
          {isKhmer
            ? "ស្វែងរករូបមន្ត និមិត្តសញ្ញា និងនិយមន័យដែលពាក់ព័ន្ធនឹងមេរៀននេះ។"
            : "Browse formulas, symbols, and concepts related to this subject."}
        </p>
      </div>
    </div>
  );
}
