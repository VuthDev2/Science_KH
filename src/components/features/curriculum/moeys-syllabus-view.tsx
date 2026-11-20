// ==============================================================================
// ScienceKH — Official MoEYS Curriculum Syllabus & Textbook View
// Designed for Cambodian Teachers & Students following National Syllabi
// Features:
//   1. MoEYS Master Framework Study Hours Matrix (Table 4)
//   2. Academic Semester Split (ឆមាសទី ១ / ឆមាសទី ២ / ទាំងអស់)
//   3. High School Stream Selector (Grades 11–12: ថ្នាក់វិទ្យាសាស្ត្រ vs ថ្នាក់វិទ្យាសាស្ត្រសង្គម)
//   4. Teacher Print & Lesson Plan Export Modal with Official MoEYS Sign-off
//   5. Direct Exam Vault Integration (Brevet G9 & Bac II G12)
//   6. In-Syllabus Search & Instant Key Concepts Radar
// ==============================================================================

import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  Award,
  Check,
  GraduationCap,
  ShieldCheck,
  Search,
  X,
  Printer,
  FileText,
  Atom,
  Layers,
  Sparkles,
  Calendar,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import type { UnitWithLessons } from "@/lib/curriculum/units";

interface MoeysSyllabusViewProps {
  unitsWithLessons: UnitWithLessons[];
  completedIds: Set<string>;
  inProgressIds: Set<string>;
  lang: "km" | "en";
  grade: number;
  subjectSlug?: string;
  subjectNameKm?: string;
  subjectNameEn?: string;
}

// MoEYS Master Framework Study Hours Reference (Curriculum Framework January 2016, Table 4)
export function getMoeysWeeklyHours(
  grade: number,
  subjectSlug: string | undefined,
  stream: "science" | "social" = "science",
): {
  weeklyHours: number;
  annualHours: number;
  bacIIMarks?: number;
  examDuration?: number;
  paperTypeKm?: string;
} {
  // Lower secondary (Grades 7, 8, 9)
  if (grade <= 9) {
    switch (subjectSlug) {
      case "mathematics":
        return {
          weeklyHours: 7,
          annualHours: 245,
          bacIIMarks: 100,
          examDuration: 120,
          paperTypeKm: "វិញ្ញាសាសរសេរ ឌីប្លូម",
        };
      case "khmer":
        return {
          weeklyHours: 7,
          annualHours: 245,
          bacIIMarks: 100,
          examDuration: 120,
          paperTypeKm: "វិញ្ញាសាសរសេរ ឌីប្លូម",
        };
      case "physics":
        return { weeklyHours: 2, annualHours: 70, bacIIMarks: 50, examDuration: 60 };
      case "chemistry":
        return { weeklyHours: 2, annualHours: 70, bacIIMarks: 50, examDuration: 60 };
      case "biology":
        return { weeklyHours: 2, annualHours: 70, bacIIMarks: 50, examDuration: 60 };
      case "earth":
        return { weeklyHours: 1, annualHours: 35 };
      case "history":
      case "geography":
      case "morality":
        return { weeklyHours: 2, annualHours: 70, bacIIMarks: 50, examDuration: 60 };
      case "english":
        return {
          weeklyHours: 6,
          annualHours: 210,
          bacIIMarks: 50,
          examDuration: 60,
          paperTypeKm: "វិញ្ញាសាភាសាបរទេស",
        };
      case "ict":
        return { weeklyHours: 2, annualHours: 70 };
      default:
        return { weeklyHours: 6, annualHours: 210 };
    }
  }

  // Grade 10 Foundation
  if (grade === 10) {
    switch (subjectSlug) {
      case "mathematics":
        return { weeklyHours: 6, annualHours: 210 };
      case "khmer":
        return { weeklyHours: 6, annualHours: 210 };
      case "physics":
      case "chemistry":
      case "biology":
        return { weeklyHours: 3, annualHours: 105 };
      case "earth":
        return { weeklyHours: 2, annualHours: 70 };
      case "history":
      case "geography":
        return { weeklyHours: 3, annualHours: 105 };
      case "morality":
        return { weeklyHours: 2, annualHours: 70 };
      case "english":
        return { weeklyHours: 4, annualHours: 140 };
      case "ict":
        return { weeklyHours: 2, annualHours: 70 };
      default:
        return { weeklyHours: 4, annualHours: 140 };
    }
  }

  // Grades 11 and 12 Upper Secondary (Science vs Social Science Stream)
  if (stream === "science") {
    switch (subjectSlug) {
      case "mathematics":
        return {
          weeklyHours: 6,
          annualHours: 210,
          bacIIMarks: 125,
          examDuration: 150,
          paperTypeKm: "វិញ្ញាសាមេ (Major)",
        };
      case "physics":
        return {
          weeklyHours: 5,
          annualHours: 175,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "chemistry":
        return {
          weeklyHours: 5,
          annualHours: 175,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "biology":
        return {
          weeklyHours: 5,
          annualHours: 175,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "khmer":
        return {
          weeklyHours: 4,
          annualHours: 140,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "history":
        return {
          weeklyHours: 2,
          annualHours: 70,
          bacIIMarks: 50,
          examDuration: 60,
          paperTypeKm: "វិញ្ញាសារង",
        };
      case "earth":
        return { weeklyHours: 2, annualHours: 70 };
      case "english":
        return {
          weeklyHours: 4,
          annualHours: 140,
          bacIIMarks: 50,
          examDuration: 60,
          paperTypeKm: "វិញ្ញាសាភាសាបរទេស (បូកបន្ថែមលើស 25)",
        };
      default:
        return { weeklyHours: 4, annualHours: 140 };
    }
  } else {
    // Social Stream
    switch (subjectSlug) {
      case "khmer":
        return {
          weeklyHours: 6,
          annualHours: 210,
          bacIIMarks: 125,
          examDuration: 150,
          paperTypeKm: "វិញ្ញាសាមេ (Major)",
        };
      case "history":
        return {
          weeklyHours: 5,
          annualHours: 175,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "geography":
        return {
          weeklyHours: 5,
          annualHours: 175,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "morality":
        return {
          weeklyHours: 4,
          annualHours: 140,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល",
        };
      case "mathematics":
        return {
          weeklyHours: 3,
          annualHours: 105,
          bacIIMarks: 75,
          examDuration: 90,
          paperTypeKm: "វិញ្ញាសាស្នូល (កម្រិតមូលដ្ឋាន)",
        };
      case "earth":
        return {
          weeklyHours: 2,
          annualHours: 70,
          bacIIMarks: 50,
          examDuration: 60,
          paperTypeKm: "វិញ្ញាសារង",
        };
      case "english":
        return {
          weeklyHours: 4,
          annualHours: 140,
          bacIIMarks: 50,
          examDuration: 60,
          paperTypeKm: "វិញ្ញាសាភាសាបរទេស (បូកបន្ថែមលើស 25)",
        };
      default:
        return { weeklyHours: 4, annualHours: 140 };
    }
  }
}

export function MoeysSyllabusView({
  unitsWithLessons,
  completedIds,
  inProgressIds,
  lang,
  grade,
  subjectSlug,
  subjectNameKm,
  subjectNameEn,
}: MoeysSyllabusViewProps) {
  const isKhmer = lang === "km";

  // Navigation states
  const [collapsedUnits, setCollapsedUnits] = useState<Set<string>>(new Set());
  const [selectedSemester, setSelectedSemester] = useState<"all" | 1 | 2>("all");
  const [highSchoolStream, setHighSchoolStream] = useState<"science" | "social">("science");
  const [syllabusSearch, setSyllabusSearch] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const toggleUnit = (unitId: string) => {
    sounds.playPop();
    setCollapsedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  const isJuniorHigh = grade <= 9;
  const isHighSchoolStreaming = grade >= 11;
  const isExamGrade = grade === 9 || grade === 12;

  // Study hours computation from MoEYS Framework Table 4
  const moeysHours = useMemo(() => {
    return getMoeysWeeklyHours(grade, subjectSlug, highSchoolStream);
  }, [grade, subjectSlug, highSchoolStream]);

  // Semester split logic: MoEYS splits chapters evenly between Semester 1 (Nov–Mar) and Semester 2 (Apr–Jul)
  const semesterSplitIndex = Math.ceil(unitsWithLessons.length / 2);

  const filteredUnits = useMemo(() => {
    let units = unitsWithLessons;

    // Filter by semester
    if (selectedSemester === 1) {
      units = units.slice(0, semesterSplitIndex);
    } else if (selectedSemester === 2) {
      units = units.slice(semesterSplitIndex);
    }

    // Filter by search query if typed
    if (syllabusSearch.trim()) {
      const query = syllabusSearch.toLowerCase();
      units = units
        .map((u) => {
          const matchingLessons = u.lessons.filter(
            (l) =>
              l.title_km.toLowerCase().includes(query) ||
              l.title_en.toLowerCase().includes(query) ||
              (l.summary_km && l.summary_km.toLowerCase().includes(query)) ||
              (l.summary_en && l.summary_en.toLowerCase().includes(query)),
          );
          return {
            ...u,
            lessons: matchingLessons,
          };
        })
        .filter(
          (u) =>
            u.lessons.length > 0 ||
            u.unit.title_km.toLowerCase().includes(query) ||
            u.unit.title_en.toLowerCase().includes(query),
        );
    }

    return units;
  }, [unitsWithLessons, selectedSemester, semesterSplitIndex, syllabusSearch]);

  // Progress metrics across currently displayed units
  const displayedLessons = filteredUnits.flatMap((u) => u.lessons);
  const totalLessons = displayedLessons.length;
  const completedCount = displayedLessons.filter((l) => completedIds.has(l.id)).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="w-full space-y-5 pb-12">
      {/* ===================================================================== */}
      {/* 1. OFFICIAL MOEYS SYLLABUS HEADER BANNER                              */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-5 sm:p-6 text-white shadow-lg">
        {/* Decorative Watermark Rings */}
        <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full border-4 border-white/10 pointer-events-none" />
        <div className="absolute right-10 -top-10 h-36 w-36 rounded-full border-4 border-white/10 pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          {/* Top Eyebrow Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                <ShieldCheck className="h-3 w-3 text-emerald-300" />
                <span>{isKhmer ? "ស្តង់ដារជាតិ MoEYS" : "MoEYS National Standard"}</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-black/25 text-emerald-100">
                <GraduationCap className="h-3 w-3" />
                <span>
                  {isKhmer
                    ? isJuniorHigh
                      ? "អនុវិទ្យាល័យ"
                      : "វិទ្យាល័យ"
                    : isJuniorHigh
                      ? "Junior High"
                      : "High School"}
                </span>
              </span>

              {isExamGrade && (
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-black bg-amber-400 text-slate-900 shadow-2xs">
                  <Award className="h-3 w-3" />
                  <span>
                    {grade === 9
                      ? isKhmer
                        ? "ឌីប្លូម Brevet (៦០០ ពិន្ទុ)"
                        : "Brevet G9"
                      : isKhmer
                        ? "បាក់ឌុប Bac II (៥០០ ពិន្ទុ)"
                        : "Bac II G12"}
                  </span>
                </span>
              )}
            </div>

            {/* Teacher Print & Lesson Plan Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setIsPrintModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold transition cursor-pointer backdrop-blur-md active:scale-95"
              title={isKhmer ? "បោះពុម្ពកាលវិភាគមាតិកា" : "Print Syllabus Plan"}
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{isKhmer ? "បោះពុម្ពកាលវិភាគ" : "Print Syllabus"}</span>
            </button>
          </div>

          {/* Subject & Grade Main Heading */}
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white leading-tight">
              {subjectNameKm || (isKhmer ? "កម្មវិធីសិក្សាគ្រប់មុខវិជ្ជា" : "All Subjects Curriculum")}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-0.5">
              {isKhmer
                ? `សៀវភៅសិក្សាគោល និងកម្រងមេរៀន ថ្នាក់ទី ${grade} ក្រសួងអប់រំ យុវជន និងកីឡា`
                : `Official Grade ${grade} Syllabus & Textbook Directory — MoEYS Cambodia`}
            </p>
          </div>

          {/* MoEYS Table 4 Study Hours & Exam Weighting Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/20 text-emerald-100 font-semibold">
              <Clock className="h-3 w-3 text-emerald-300" />
              <span>
                {isKhmer
                  ? `ម៉ោងសិក្សា MoEYS ៖ ${moeysHours.weeklyHours} ម៉ោង/សប្តាហ៍ (${moeysHours.annualHours} ម៉ោង/ឆ្នាំ)`
                  : `MoEYS Periods: ${moeysHours.weeklyHours}h/week (${moeysHours.annualHours}h/year)`}
              </span>
            </span>

            {moeysHours.bacIIMarks && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-200 border border-amber-300/30 font-bold">
                <Award className="h-3 w-3 text-amber-300" />
                <span>
                  {isKhmer
                    ? `មេគុណប្រឡង ៖ ${moeysHours.bacIIMarks} ពិន្ទុ (${moeysHours.examDuration} នាទី)`
                    : `Exam Mark: ${moeysHours.bacIIMarks} pts (${moeysHours.examDuration} mins)`}
                </span>
              </span>
            )}

            {isExamGrade && (
              <Link
                to="/exams"
                search={{ mode: "study" }}
                onClick={() => sounds.playPop()}
                className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                <span>{isKhmer ? "បណ្ណសារវិញ្ញាសាប្រឡង" : "Exam Papers Vault"}</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>

          {/* Curriculum Stats Bar */}
          <div className="flex items-center justify-between pt-1 text-xs text-emerald-100">
            <div className="flex items-center gap-4">
              <span>
                <strong className="text-white font-bold">{filteredUnits.length}</strong>{" "}
                {isKhmer ? "ជំពូក" : "Chapters"}
              </span>
              <span>
                <strong className="text-white font-bold">{totalLessons}</strong>{" "}
                {isKhmer ? "មេរៀន" : "Lessons"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>
                {completedCount}/{totalLessons} ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. HIGH SCHOOL STREAM SELECTOR (GRADES 11 & 12 ONLY)                  */}
      {/* ===================================================================== */}
      {isHighSchoolStreaming && (
        <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isKhmer ? "ជ្រើសរើសផ្នែកសិក្សា (វិទ្យាល័យ)" : "Upper Secondary Academic Track"}</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {isKhmer ? "បែងចែកតាមក្របខ័ណ្ឌ MoEYS" : "Per MoEYS Framework"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setHighSchoolStream("science");
              }}
              className={cn(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95",
                highSchoolStream === "science"
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 shadow-2xs font-black"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-emerald-400",
              )}
            >
              <Atom className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រ (Science)" : "Science Track"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setHighSchoolStream("social");
              }}
              className={cn(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95",
                highSchoolStream === "social"
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 shadow-2xs font-black"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-emerald-400",
              )}
            >
              <BookOpen className="h-3.5 w-3.5 text-teal-600" />
              <span>{isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រសង្គម (Social)" : "Social Track"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. SEMESTER PILLS & QUICK IN-SYLLABUS SEARCH                          */}
      {/* ===================================================================== */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Semester Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs text-xs">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setSelectedSemester("all");
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition cursor-pointer",
                selectedSemester === "all"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              {isKhmer ? "ពេញមួយឆ្នាំ (All)" : "Full Year"}
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setSelectedSemester(1);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1",
                selectedSemester === 1
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <Calendar className="h-3 w-3" />
              <span>{isKhmer ? "ឆមាសទី ១ (វិច្ឆិកា–មីនា)" : "Sem 1 (Nov–Mar)"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setSelectedSemester(2);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1",
                selectedSemester === 2
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <Calendar className="h-3 w-3" />
              <span>{isKhmer ? "ឆមាសទី ២ (មេសា–កក្កដា)" : "Sem 2 (Apr–Jul)"}</span>
            </button>
          </div>

          {/* Quick Collapse / Expand All Button */}
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              if (collapsedUnits.size === filteredUnits.length) {
                setCollapsedUnits(new Set());
              } else {
                setCollapsedUnits(new Set(filteredUnits.map((u) => u.unit.id)));
              }
            }}
            className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer px-2 py-1"
          >
            {collapsedUnits.size === filteredUnits.length
              ? isKhmer
                ? "បើកទាំងអស់ (Expand All)"
                : "Expand All"
              : isKhmer
                ? "បង្រួមទាំងអស់ (Collapse All)"
                : "Collapse All"}
          </button>
        </div>

        {/* In-Syllabus Search Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={syllabusSearch}
            onChange={(e) => setSyllabusSearch(e.target.value)}
            placeholder={
              isKhmer
                ? "ស្វែងរកមេរៀនក្នុងកម្មវិធីសិក្សា (ឧ. ពីតាក័រ, សមីការ, ផ្ទៃក្រឡា...)"
                : "Filter syllabus lessons by title or keyword..."
            }
            className="w-full h-9 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-8 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-2xs transition"
          />
          {syllabusSearch && (
            <button
              type="button"
              onClick={() => setSyllabusSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. SEQUENTIAL CHAPTERS & LESSONS DIRECTORY                            */}
      {/* ===================================================================== */}
      {filteredUnits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-2">
          <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
            {isKhmer
              ? "មិនមានមេរៀនត្រូវគ្នានឹងការស្វែងរកទេ"
              : "No lessons matched the filter criteria"}
          </p>
          <button
            type="button"
            onClick={() => {
              setSyllabusSearch("");
              setSelectedSemester("all");
            }}
            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            {isKhmer ? "សម្អាតការស្វែងរក" : "Reset filter"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUnits.map((unitGroup) => {
            const { unit, lessons, completedCount: unitDone, totalCount: unitTotal } = unitGroup;
            const isCollapsed = collapsedUnits.has(unit.id);
            const isAllUnitDone = unitDone === unitTotal && unitTotal > 0;

            const cleanTitleKm = unit.title_km.replace(/^ជំពូកទី\s*\d+\s*[៖:]\s*/i, "");
            const cleanTitleEn = unit.title_en.replace(/^Unit\s*\d+\s*[:\-]\s*/i, "");

            return (
              <div
                key={unit.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden transition"
              >
                {/* Unit / Chapter Header Accordion Button */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full flex items-start justify-between gap-3 p-4 sm:p-5 text-left bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition cursor-pointer border-b border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Chapter Number Badge */}
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm shadow-2xs">
                      {unit.unitNumber}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {isKhmer ? `ជំពូកទី ${unit.unitNumber}` : `Chapter ${unit.unitNumber}`}
                        </span>
                        {isAllUnitDone && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            <Check className="h-3 w-3 stroke-[3]" />
                            <span>{isKhmer ? "បានបញ្ចប់" : "Mastered"}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug mt-0.5">
                        {isKhmer ? cleanTitleKm : cleanTitleEn}
                      </h3>

                      {(unit.description_km || unit.description_en) && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {isKhmer ? unit.description_km : unit.description_en}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right controls: completion count + accordion toggle arrow */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full">
                      {unitDone}/{unitTotal}
                    </span>
                    <div className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                      {isCollapsed ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronUp className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Lessons Table in this Chapter */}
                {!isCollapsed && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedIds.has(lesson.id);
                      const isInProgress = inProgressIds.has(lesson.id);
                      const lessonNumber = lesson.sort_order || lessonIndex + 1;

                      return (
                        <div
                          key={lesson.id}
                          className={cn(
                            "p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition",
                            isCompleted
                              ? "bg-emerald-50/20 dark:bg-emerald-950/10"
                              : "hover:bg-slate-50/50 dark:hover:bg-slate-800/20",
                          )}
                        >
                          {/* Lesson Info */}
                          <div className="flex items-start gap-3 min-w-0">
                            {/* Lesson Order Pill */}
                            <div
                              className={cn(
                                "grid h-8 w-8 shrink-0 place-items-center rounded-lg font-bold text-xs",
                                isCompleted
                                  ? "bg-emerald-600 text-white shadow-2xs"
                                  : isInProgress
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                              )}
                            >
                              {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : lessonNumber}
                            </div>

                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                                  {isKhmer ? `មេរៀនទី ${lessonNumber}` : `Lesson ${lessonNumber}`}
                                </span>
                                <span className="text-[10px] text-slate-400">·</span>
                                <span className="text-[10px] text-slate-400 inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.estimated_minutes || 20} {isKhmer ? "នាទី" : "mins"}
                                </span>
                                <span className="text-[10px] text-slate-400">·</span>
                                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                  +{lesson.xp_reward || 35} XP
                                </span>
                              </div>

                              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                {isKhmer ? lesson.title_km : lesson.title_en}
                              </h4>

                              {(lesson.summary_km || lesson.summary_en) && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                  {isKhmer ? lesson.summary_km : lesson.summary_en}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons: Study & Quiz */}
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-1 sm:pt-0">
                            <Link
                              to="/lessons/$lessonId"
                              params={{ lessonId: lesson.id }}
                              onClick={() => sounds.playPop()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-emerald-500 hover:text-emerald-600 transition shadow-2xs cursor-pointer active:scale-95"
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>{isKhmer ? "អានមេរៀន" : "Study"}</span>
                            </Link>

                            <Link
                              to="/lessons/$lessonId/quiz"
                              params={{ lessonId: lesson.id }}
                              onClick={() => sounds.playPop()}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition shadow-2xs cursor-pointer active:scale-95",
                                isCompleted
                                  ? "bg-emerald-600 hover:bg-emerald-700"
                                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
                              )}
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              <span>{isKhmer ? "ធ្វើលំហាត់" : "Quiz"}</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. TEACHER PRINTABLE SYLLABUS & LESSON PLAN MODAL                     */}
      {/* ===================================================================== */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
            {/* Modal Controls (Not printed) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="h-5 w-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base">
                  {isKhmer ? "កាលវិភាគមាតិកាកម្មវិធីសិក្សា (ទម្រង់ MoEYS)" : "Printable Syllabus Plan"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{isKhmer ? "បោះពុម្ព (Print)" : "Print"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Printable Official Document Body */}
            <div className="pt-6 space-y-6">
              {/* National Emblem & MoEYS Header */}
              <div className="text-center space-y-1">
                <p className="font-display font-bold text-sm sm:text-base tracking-wide">
                  ព្រះរាជាណាចក្រកម្ពុជា
                </p>
                <p className="font-display font-medium text-xs sm:text-sm">
                  ជាតិ សាសនា ព្រះមហាក្សត្រ
                </p>
                <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  ក្រសួងអប់រំ យុវជន និងកីឡា · នាយកដ្ឋានអភិវឌ្ឍន៍កម្មវិធីសិក្សា
                </div>
                <h1 className="font-display font-black text-lg sm:text-xl text-emerald-700 dark:text-emerald-400 pt-3">
                  ប្លង់មាតិកាកម្មវិធីសិក្សាផ្លូវការ និងកិច្ចតែងការបង្រៀន
                </h1>
                <p className="text-xs text-slate-500">
                  {subjectNameKm || "មុខវិជ្ជាស្នូល"} · ថ្នាក់ទី {grade} · ឆ្នាំសិក្សា ២០២៥–២០២៦
                </p>
              </div>

              {/* Study Hours & Period Quota Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">កម្រិតសិក្សា</span>
                  <strong className="font-bold">{isJuniorHigh ? "អនុវិទ្យាល័យ" : "វិទ្យាល័យ"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ម៉ោងក្នុងមួយសប្តាហ៍</span>
                  <strong className="font-bold">{moeysHours.weeklyHours} ម៉ោង / សប្តាហ៍</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ម៉ោងសរុបប្រចាំឆ្នាំ</span>
                  <strong className="font-bold">{moeysHours.annualHours} ម៉ោង / ឆ្នាំ</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ចំនួនមេរៀនសរុប</span>
                  <strong className="font-bold">{unitsWithLessons.flatMap(u => u.lessons).length} មេរៀន</strong>
                </div>
              </div>

              {/* Table of Chapters and Lessons */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-2.5 font-bold text-center w-12">ល.រ</th>
                      <th className="p-2.5 font-bold">ជំពូក / មេរៀន</th>
                      <th className="p-2.5 font-bold">សមត្ថភាពរំពឹងទុក និងខ្លឹមសារសង្ខេប</th>
                      <th className="p-2.5 font-bold text-center w-20">ម៉ោងបង្រៀន</th>
                      <th className="p-2.5 font-bold text-center w-24">ស្ថានភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {unitsWithLessons.map((u, uIdx) => (
                      <>
                        <tr key={u.unit.id} className="bg-emerald-50/40 dark:bg-emerald-950/20 font-bold">
                          <td className="p-2 text-center text-emerald-700 dark:text-emerald-300">
                            {uIdx + 1}
                          </td>
                          <td colSpan={4} className="p-2 text-emerald-800 dark:text-emerald-200">
                            {u.unit.title_km}
                          </td>
                        </tr>
                        {u.lessons.map((les, lesIdx) => (
                          <tr key={les.id} className="hover:bg-slate-50/50">
                            <td className="p-2 text-center text-slate-400 text-[11px]">
                              {les.sort_order || lesIdx + 1}
                            </td>
                            <td className="p-2 font-medium text-slate-800 dark:text-slate-200">
                              {les.title_km}
                            </td>
                            <td className="p-2 text-slate-500 text-[11px] leading-relaxed">
                              {les.summary_km || "ខ្លឹមសារស្របតាមសៀវភៅពុម្ពក្រសួង"}
                            </td>
                            <td className="p-2 text-center text-slate-500 font-mono">
                              {les.estimated_minutes ? `${Math.ceil(les.estimated_minutes / 45)} ម៉ោង` : "២ ម៉ោង"}
                            </td>
                            <td className="p-2 text-center">
                              <span className="inline-block h-3.5 w-3.5 rounded border border-slate-300 dark:border-slate-600" />
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Official Pedagogical Sign-off Block */}
              <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
                <div className="space-y-12">
                  <p className="font-bold">បានឃើញ និងឯកភាពដោយ នាយកសាលា</p>
                  <p className="text-slate-400 italic">(ហត្ថលេខា និងត្រា)</p>
                </div>
                <div className="space-y-12">
                  <div>
                    <p className="text-slate-500 text-[11px]">ថ្ងៃទី.........ខែ.........ឆ្នាំ ២០២...</p>
                    <p className="font-bold mt-1">ហត្ថលេខាគ្រូបង្រៀន</p>
                  </div>
                  <p className="text-slate-400 italic">(ហត្ថលេខា និងឈ្មោះ)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
