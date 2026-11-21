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
  BookOpen,
  Target,
} from "lucide-react";
import { ALL_CURATED_LESSONS, type CuratedLesson } from "@/lib/curriculum";
import { groupLessonsIntoUnits, type UnitWithLessons } from "@/lib/curriculum/units";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { toKhmerNumeral } from "@/lib/i18n";
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
    <section className="space-y-4">
      {/* 1. Header with Subject Tabs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-black text-slate-900 dark:text-white tracking-tight">
                {isKhmer ? "គន្លងសិក្សាជាប្រព័ន្ធ" : "Guided Learning Path"}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] border border-emerald-200/60 dark:border-emerald-800/60">
                MoEYS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isKhmer
                ? `រៀនតាមលំដាប់លំដោយជំពូក មេរៀន និងអនុវត្តលំហាត់រំលឹកចំណេះដឹង (ថ្នាក់ទី ${toKhmerNumeral(grade)})`
                : `Step-by-step curriculum progression with integrated revision milestones (Grade ${grade})`}
            </p>
          </div>
        </div>

        {/* Clean, Non-Clipped Wrapping Subject Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              triggerHapticSelection();
              setSelectedSubject("all");
            }}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 border",
              selectedSubject === "all"
                ? "bg-[#059669] text-white border-[#059669] shadow-2xs font-bold"
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
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 border",
                  isSelected
                    ? "bg-[#059669] text-white border-[#059669] shadow-2xs font-bold"
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
      <div className="space-y-4">
        {unitsWithLessons.map((unitGroup) => {
          const unit = unitGroup.unit;

          return (
            <div
              key={unit.id}
              className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden"
            >
              {/* Unit Banner Header */}
              <div className="p-4 border-b border-[#E5EAF0] dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                      {isKhmer ? `ជំពូកទី ${unit.unitNumber}` : `Unit ${unit.unitNumber}`}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {unitGroup.completedCount}/{unitGroup.totalCount} {isKhmer ? "បានចប់" : "Completed"}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {unit.title_km}
                  </h3>
                  {unit.title_en && (
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      {unit.title_en}
                    </p>
                  )}
                </div>

                {/* Meaningful Status / Progress Indicator (No Arbitrary 0% Bars) */}
                <div className="shrink-0 flex items-center gap-2">
                  {unitGroup.completedCount === 0 ? (
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {isKhmer ? "មិនទាន់ចាប់ផ្តើម" : "Not Started"}
                    </span>
                  ) : unitGroup.isCompleted ? (
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 flex items-center gap-1">
                      <Check className="h-3 w-3 stroke-[3]" />
                      <span>{isKhmer ? "បានបញ្ចប់" : "Completed"}</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-20 sm:w-24 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#059669] transition-all duration-500"
                          style={{ width: `${unitGroup.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {unitGroup.completedCount}/{unitGroup.totalCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stepped Sequential Learning Track */}
              <div className="p-4 space-y-3 relative">
                {/* Vertical Hairline Connecting Track */}
                <div
                  className="absolute left-7 top-6 bottom-14 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0"
                  aria-hidden="true"
                />

                {/* Lesson Nodes */}
                {unitGroup.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedIds.has(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <div
                      key={lesson.id}
                      className="relative z-10 flex items-start gap-3 group"
                    >
                      {/* Step Node Indicator */}
                      <div
                        className={cn(
                          "h-7 w-7 rounded-xl grid place-items-center shrink-0 mt-2 transition-all duration-200 text-xs font-bold select-none",
                          isCompleted
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 shadow-2xs"
                            : isCurrent
                              ? "bg-[#059669] text-white shadow-xs ring-4 ring-emerald-500/20 font-black"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        ) : isCurrent ? (
                          <Play className="h-3 w-3 fill-white ml-0.5" />
                        ) : (
                          <span>{lessonIdx + 1}</span>
                        )}
                      </div>

                      {/* Lesson Card */}
                      <div
                        className={cn(
                          "flex-1 p-3 rounded-xl border transition-all duration-150",
                          isCurrent
                            ? "border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-2xs"
                            : isCompleted
                              ? "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200"
                              : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {isKhmer ? `មេរៀន ${lessonIdx + 1}` : `L${lessonIdx + 1}`}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {lesson.estimated_minutes} {isKhmer ? "នាទី" : "mins"} · +{lesson.xp_reward} XP
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#059669] text-white">
                                  {isKhmer ? "មេរៀនបច្ចុប្បន្ន" : "Current"}
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
                                "px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-2xs",
                                isCurrent
                                  ? "bg-[#059669] hover:bg-[#047857] text-white shadow-xs"
                                  : isCompleted
                                    ? "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                    : "bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              )}
                            >
                              <span>
                                {isCompleted
                                  ? isKhmer ? "រៀនឡើងវិញ" : "Review"
                                  : isCurrent
                                    ? isKhmer ? "បន្តការសិក្សា" : "Continue"
                                    : isKhmer ? "ចាប់ផ្តើម" : "Start"}
                              </span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Unit Practice Checkpoint Milestone */}
                <div className="relative z-10 pt-1 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 grid place-items-center shrink-0 mt-1 shadow-2xs">
                    <Target className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex-1 p-3 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                          {isKhmer ? "ចំណុចត្រួតពិនិត្យ" : "Checkpoint"}
                        </span>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          +50 XP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {isKhmer
                          ? `លំហាត់សង្ខេបជំពូកទី ${unit.unitNumber} & Quiz`
                          : `Unit ${unit.unitNumber} Practice & Quiz`}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isKhmer
                          ? "ផ្ទៀងផ្ទាត់ការចងចាំរូបមន្ត និងទ្រឹស្តីបទនៃជំពូកនេះ"
                          : "Verify formula recall and core principles"}
                      </p>
                    </div>

                    <Link
                      to="/lessons/$lessonId/quiz"
                      params={{ lessonId: unitGroup.lessons[0]?.id || "les-g10-phys-01" }}
                      onClick={() => sounds.playPop()}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wide transition active:scale-95 shrink-0 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{isKhmer ? "ធ្វើតេស្តសាកល្បង" : "Start Quiz"}</span>
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
