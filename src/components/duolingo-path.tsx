import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star,
  Check,
  Lock,
  Sparkles,
  Play,
  BookOpen,
  Award,
  ChevronRight,
  Atom,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

interface DuolingoPathProps {
  lessons: LessonNode[];
  completedIds: Set<string>;
  inProgressIds: Set<string>;
  lang: "en" | "km";
  subjectTitle?: string;
}

export function DuolingoPath({
  lessons,
  completedIds,
  inProgressIds,
  lang,
  subjectTitle,
}: DuolingoPathProps) {
  const isKhmer = lang === "km";
  const [activePopupId, setActivePopupId] = useState<string | null>(null);

  // Find index of the first incomplete lesson (current node)
  const currentIdx = lessons.findIndex((l) => !completedIds.has(l.id));
  const activeIndex = currentIdx === -1 ? lessons.length - 1 : currentIdx;

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center pb-28 pt-4">
      {/* Unit Header Card */}
      <div className="sticky top-16 z-20 mb-8 w-full px-4">
        <div className="rounded-2xl border-2 border-emerald-600/40 bg-emerald-500 p-4 text-white shadow-lg dark:bg-emerald-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                {isKhmer ? "វគ្គសិក្សាស្ទាត់ជំនាញ · MoEYS STEM" : "Mastery Pathway · MoEYS STEM"}
              </p>
              <h2 className="mt-0.5 font-display text-xl font-extrabold tracking-tight">
                {subjectTitle || (isKhmer ? "វិទ្យាសាស្ត្រទូទៅ" : "General Science")}
              </h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-white backdrop-blur">
              <Atom className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-xs text-emerald-100">
            <span>
              {completedIds.size} / {lessons.length} {isKhmer ? "បានបញ្ចប់" : "Completed"}
            </span>
            <span className="font-semibold">
              {Math.round((completedIds.size / Math.max(1, lessons.length)) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* The Winding Snake Nodes */}
      <div className="relative flex w-full flex-col items-center gap-7">
        {lessons.map((lesson, idx) => {
          const isCompleted = completedIds.has(lesson.id);
          const isCurrent = idx === activeIndex && !isCompleted;
          const isLocked = idx > activeIndex && !isCompleted;

          // Sinusoidal curve for the classic Duolingo snake offset
          const curveOffset = Math.sin(idx * 0.95) * 58;

          const isPopupOpen = activePopupId === lesson.id;

          return (
            <div
              key={lesson.id}
              className="relative flex flex-col items-center"
              style={{ transform: `translateX(${curveOffset}px)` }}
            >
              {/* Floating Start Tooltip above current active node */}
              {isCurrent && (
                <div className="absolute -top-10 z-10 animate-bounce">
                  <div className="relative rounded-xl border-2 border-emerald-600 bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-600 shadow-md dark:bg-card">
                    {isKhmer ? "ចាប់ផ្តើម!" : "START!"}
                    <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-emerald-600 bg-white dark:bg-card" />
                  </div>
                </div>
              )}

              {/* Node Button */}
              <button
                type="button"
                onClick={() => {
                  if (!isLocked) {
                    setActivePopupId(isPopupOpen ? null : lesson.id);
                  }
                }}
                disabled={isLocked}
                className={cn(
                  "relative grid h-20 w-20 place-items-center rounded-full border-b-[6px] shadow-lg transition-all duration-150 active:border-b-2 active:translate-y-1",
                  isCompleted &&
                    "border-amber-600 bg-amber-400 text-amber-950 hover:bg-amber-300 ring-4 ring-amber-300/40",
                  isCurrent &&
                    "border-emerald-700 bg-emerald-500 text-white hover:bg-emerald-400 ring-4 ring-emerald-400/50 scale-105",
                  isLocked &&
                    "border-slate-300 bg-slate-200 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed opacity-80",
                )}
                aria-label={lesson.title_en}
              >
                {isCompleted ? (
                  <Check className="h-9 w-9 stroke-[3]" />
                ) : isCurrent ? (
                  <Play className="h-9 w-9 fill-white text-white ml-1" />
                ) : (
                  <Lock className="h-7 w-7" />
                )}

                {/* Stars Crown for completed nodes */}
                {isCompleted && (
                  <div className="absolute -bottom-2 flex gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-600" />
                    <Star className="h-4 w-4 fill-amber-300 text-amber-600 -translate-y-0.5" />
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-600" />
                  </div>
                )}
              </button>

              {/* Lesson Title Label below node */}
              <div className="mt-2 max-w-[130px] text-center">
                <p
                  className={cn(
                    "text-xs font-bold leading-tight line-clamp-2",
                    isLocked ? "text-muted-foreground/60" : "text-foreground",
                  )}
                >
                  {isKhmer ? lesson.title_km : lesson.title_en}
                </p>
              </div>

              {/* Interactive Popup Card when clicking an unlocked node */}
              {isPopupOpen && (
                <div className="absolute top-24 z-30 w-72 rounded-2xl border-2 border-border bg-card p-4 shadow-2xl animate-in zoom-in-95">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-primary">
                        <Sparkles className="h-3 w-3" /> Grade {lesson.grade} · +{lesson.xp_reward || 30} XP
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-foreground">
                        {isKhmer ? lesson.title_km : lesson.title_en}
                      </h4>
                    </div>
                  </div>

                  {(isKhmer ? lesson.summary_km : lesson.summary_en) && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {isKhmer ? lesson.summary_km : lesson.summary_en}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="h-10 w-full rounded-xl border-b-4 border-emerald-700 bg-emerald-500 font-bold text-white shadow active:border-b-0 active:translate-y-0.5 hover:bg-emerald-600"
                    >
                      <Link to="/lessons/$lessonId" params={{ lessonId: lesson.id }}>
                        <BookOpen className="mr-1.5 h-4 w-4" />
                        {isKhmer ? "អានមេរៀន" : "Study Lesson"}
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-10 w-full rounded-xl border-2 border-primary/30 font-bold text-primary hover:bg-primary/5"
                    >
                      <Link to="/lessons/$lessonId/quiz" params={{ lessonId: lesson.id }}>
                        <Play className="mr-1.5 h-4 w-4 fill-primary" />
                        {isKhmer ? "ធ្វើលំហាត់ (Quiz)" : "Take Quiz"}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

