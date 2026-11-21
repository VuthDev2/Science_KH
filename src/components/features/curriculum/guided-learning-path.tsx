// ==============================================================================
// ScienceKH — Guided Linear Learning Path (គន្លងសិក្សាស្វ័យប្រវត្តិ MoEYS)
// Combines the progressive flow of modern linear learning with a premium academic SaaS identity
// 100% original design: clean vertical stepper, unit banners, revision checkpoints
// ==============================================================================

import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
  ChevronRight,
  Layers,
  GraduationCap,
} from "lucide-react";
import { ALL_CURATED_LESSONS, type CuratedLesson } from "@/lib/curriculum";
import { groupLessonsIntoUnits, type UnitWithLessons } from "@/lib/curriculum/units";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { cn } from "@/lib/utils";

interface GuidedLearningPathProps {
  grade: number;
  stream?: "science" | "social";
  completedIds: Set<string>;
  inProgressIds: Set<string>;
  isKhmer?: boolean;
}

export function GuidedLearningPath({
  grade,
  stream = "science",
  completedIds,
  inProgressIds,
  isKhmer = true,
}: GuidedLearningPathProps) {
  // Optional subject filter for the learning path
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Filter lessons for grade & stream
  const gradeLessons = useMemo(() => {
    return ALL_CURATED_LESSONS.filter((l) => l.grade === grade);
  }, [grade]);

  // Available subjects for current grade
  const subjects = useMemo(() => {
    const map = new Map<string, { slug: string; nameKm: string; nameEn: string }>();
    for (const l of gradeLessons) {
      if (l.subject?.slug && !map.has(l.subject.slug)) {
        map.set(l.subject.slug, {
          slug: l.subject.slug,
          nameKm: l.subject.name_km,
          nameEn: l.subject.name_en,
        });
      }
    }
    return Array.from(map.values());
  }, [gradeLessons]);

  // Lessons filtered by active subject
  const filteredLessons = useMemo(() => {
    if (selectedSubject === "all") return gradeLessons;
    return gradeLessons.filter((l) => l.subject?.slug === selectedSubject);
  }, [gradeLessons, selectedSubject]);

  // Group into MoEYS units
  const unitsWithLessons: UnitWithLessons[] = useMemo(() => {
    return groupLessonsIntoUnits(
      filteredLessons,
      grade,
      selectedSubject !== "all" ? selectedSubject : undefined,
      completedIds
    );
  }, [filteredLessons, grade, selectedSubject, completedIds]);

  // Find the single active / current lesson
  const currentLessonId = useMemo(() => {
    const nextIncomplete = filteredLessons.find((l) => !completedIds.has(l.id));
    return nextIncomplete?.id || filteredLessons[0]?.id;
  }, [filteredLessons, completedIds]);

  return (
    <section className="space-y-6">
      {/* 1. Header with Subject Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {isKhmer ? "គន្លងសិក្សាជាប្រព័ន្ធ" : "Guided Learning Path"}
              </h2>
              <span className="text-[10.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] border border-emerald-200/80 dark:border-emerald-800/60">
                MoEYS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isKhmer
                ? "រៀនតាមលំដាប់លំដោយជំពូក មេរៀន និងអនុវត្តលំហាត់រំលឹកចំណេះដឹង"
                : "Step-by-step curriculum progression with integrated revision milestones"}
            </p>
          </div>
        </div>

        {/* 1-Tap Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              triggerHapticSelection();
              setSelectedSubject("all");
            }}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 border",
              selectedSubject === "all"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-extrabold"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-[#E5EAF0] dark:border-slate-800 hover:border-slate-300"
            )}
          >
            {isKhmer ? "គ្រប់មុខវិជ្ជា" : "All Subjects"}
          </button>
          {subjects.map((sub) => {
            const isSelected = selectedSubject === sub.slug;
            return (
              <button
                key={sub.slug}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  triggerHapticSelection();
                  setSelectedSubject(sub.slug);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 border",
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-extrabold"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-[#E5EAF0] dark:border-slate-800 hover:border-slate-300"
                )}
              >
                {isKhmer ? sub.nameKm : sub.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Units & Stepped Lesson Progression */}
      <div className="space-y-6">
        {unitsWithLessons.map((unitGroup, unitIdx) => {
          const unit = unitGroup.unit;
          const isUnitCompleted = unitGroup.isCompleted;

          return (
            <div
              key={unit.id}
              className="rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden"
            >
              {/* Unit Banner Header */}
              <div className="p-4 sm:p-5 border-b border-[#E5EAF0] dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                      {isKhmer ? `ជំពូកទី ${unit.unitNumber}` : `Unit ${unit.unitNumber}`}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {unitGroup.completedCount}/{unitGroup.totalCount} {isKhmer ? "បានចប់" : "Completed"}
                    </span>
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {unit.title_km}
                  </h3>
                  {unit.title_en && (
                    <p className="text-xs text-slate-400 font-medium truncate">
                      {unit.title_en}
                    </p>
                  )}
                </div>

                {/* Unit Progress Ring / Pill */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-24 sm:w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
                      style={{ width: `${unitGroup.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[36px] text-right">
                    {unitGroup.progressPercent}%
                  </span>
                </div>
              </div>

              {/* Stepped Sequential Learning Track */}
              <div className="p-4 sm:p-6 space-y-4 relative">
                {/* Vertical Hairline Connecting Track */}
                <div
                  className="absolute left-8 sm:left-10 top-8 bottom-16 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0"
                  aria-hidden="true"
                />

                {/* Lesson Nodes */}
                {unitGroup.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedIds.has(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <div
                      key={lesson.id}
                      className="relative z-10 flex items-start gap-3.5 sm:gap-4 group"
                    >
                      {/* Step Node Circle Indicator */}
                      <div
                        className={cn(
                          "h-8 w-8 sm:h-9 sm:w-9 rounded-2xl grid place-items-center shrink-0 mt-2 transition-all duration-200 shadow-2xs font-bold text-xs select-none",
                          isCompleted
                            ? "bg-emerald-600 text-white shadow-emerald-500/20"
                            : isCurrent
                              ? "bg-white dark:bg-slate-900 text-emerald-600 border-2 border-emerald-600 shadow-emerald-500/30 scale-105"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 stroke-[3]" />
                        ) : isCurrent ? (
                          <div className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse" />
                        ) : (
                          <span>{lessonIdx + 1}</span>
                        )}
                      </div>

                      {/* Lesson Card */}
                      <div
                        className={cn(
                          "flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200",
                          isCurrent
                            ? "border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs"
                            : isCompleted
                              ? "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/30 hover:border-slate-300"
                              : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                                {isKhmer ? `មេរៀនទី ${lessonIdx + 1}` : `Lesson ${lessonIdx + 1}`}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {lesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"} · +{lesson.xp_reward} XP
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white animate-pulse">
                                  {isKhmer ? "មេរៀនបន្ទាប់" : "Up Next"}
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                              {lesson.title_km}
                            </h4>
                            {lesson.title_en && (
                              <p className="text-[11px] text-slate-400 truncate">
                                {lesson.title_en}
                              </p>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 flex items-center gap-2 pt-1 sm:pt-0">
                            <Link
                              to="/lessons/$lessonId"
                              params={{ lessonId: lesson.id }}
                              onClick={() => sounds.playPop()}
                              className={cn(
                                "px-3.5 py-2 rounded-xl font-bold text-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-2xs",
                                isCurrent
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
                                  : isCompleted
                                    ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                                    : "bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              )}
                            >
                              <span>
                                {isCompleted
                                  ? isKhmer
                                    ? "រៀនឡើងវិញ"
                                    : "Review"
                                  : isCurrent
                                    ? isKhmer
                                      ? "បន្តការសិក្សា"
                                      : "Continue"
                                    : isKhmer
                                      ? "ចាប់ផ្តើម"
                                      : "Start"}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Unit Practice & Revision Checkpoint Milestone */}
                <div className="relative z-10 pt-2 flex items-start gap-3.5 sm:gap-4">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 grid place-items-center shrink-0 mt-1 shadow-2xs font-bold">
                    <Target className="h-4 w-4" />
                  </div>

                  <div className="flex-1 p-3.5 sm:p-4 rounded-2xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                          {isKhmer ? "ចំណុចត្រួតពិនិត្យ & រំលឹកចំណេះដឹង" : "Revision Checkpoint"}
                        </span>
                        <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                          +50 XP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {isKhmer
                          ? `លំហាត់សង្ខេបជំពូកទី ${unit.unitNumber} & Quiz សាកល្បង`
                          : `Unit ${unit.unitNumber} Practice & Review Quiz`}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isKhmer
                          ? "ផ្ទៀងផ្ទាត់ការចងចាំរូបមន្ត និងទ្រឹស្តីបទនៃជំពូកនេះ"
                          : "Verify formula recall and core principles covered in this unit"}
                      </p>
                    </div>

                    <Link
                      to="/lessons/$lessonId/quiz"
                      params={{ lessonId: unitGroup.lessons[0]?.id || "les-g10-phys-01" }}
                      onClick={() => sounds.playPop()}
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wide transition active:scale-95 shrink-0 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isKhmer ? "ចាប់ផ្តើមអនុវត្ត" : "Start Quiz"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
