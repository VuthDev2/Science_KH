import { useState } from "react";
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe2,
  BookOpen,
  Languages,
  Laptop,
  Landmark,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MOEYS_GRADE_TOPICS, type MoeysSubjectSlug } from "@/lib/moeys-curriculum";
import { sounds } from "@/lib/sound-effects";

interface CurriculumSectionProps {
  copy: LandingCopy["curriculum"];
  isKhmer: boolean;
}

type SubjectCategoryFilter = "all" | "stem" | "languages" | "social" | "tech";

export function CurriculumSection({ copy, isKhmer }: CurriculumSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<number>(12);
  const [categoryFilter, setCategoryFilter] = useState<SubjectCategoryFilter>("all");

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case "mathematics":
        return <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "physics":
        return <Atom className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case "chemistry":
        return <FlaskConical className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "biology":
        return <Dna className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case "earth":
        return <Globe2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "khmer":
        return <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case "english":
        return <Languages className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case "ict":
        return <Laptop className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case "history":
        return <Landmark className="w-5 h-5 text-amber-700 dark:text-amber-400" />;
      case "geography":
        return <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-600" />;
    }
  };

  const getSubjectCategory = (id: string): SubjectCategoryFilter => {
    if (["mathematics", "physics", "chemistry", "biology", "earth"].includes(id)) return "stem";
    if (["khmer", "english"].includes(id)) return "languages";
    if (["ict"].includes(id)) return "tech";
    if (["history", "geography"].includes(id)) return "social";
    return "stem";
  };

  const categories = [
    { id: "all" as const, labelKm: "ទាំងអស់ (១០ មុខវិជ្ជា)", labelEn: "All 10 Subjects" },
    { id: "stem" as const, labelKm: "វិទ្យាសាស្ត្រពិត (STEM)", labelEn: "STEM Sciences" },
    { id: "languages" as const, labelKm: "ភាសា & អក្សរសាស្ត្រ", labelEn: "Languages & Lit" },
    { id: "tech" as const, labelKm: "ព័ត៌មានវិទ្យា (ICT)", labelEn: "ICT & Tech" },
    { id: "social" as const, labelKm: "វិទ្យាសាស្ត្រសង្គម", labelEn: "Social Studies" },
  ];

  const filteredDisciplines = copy.disciplines.filter((disc) => {
    if (categoryFilter === "all") return true;
    return getSubjectCategory(disc.id) === categoryFilter;
  });

  return (
    <section id="curriculum" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Grade Selector Pills (Grades 7 to 12) */}
        <ScrollReveal animation="fade-up" delay={100} duration={600}>
          <div className="flex items-center justify-start sm:justify-center gap-2 mb-6 overflow-x-auto pb-2 px-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline shrink-0">
              {copy.gradeLabel}:
            </span>
            {copy.grades.map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setSelectedGrade(grade);
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 border cursor-pointer active:scale-95 ${
                  selectedGrade === grade
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-102"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <span>{isKhmer ? `ថ្នាក់ទី ${grade}` : `Grade ${grade}`}</span>
                {grade === 9 && (
                  <span className="ml-1 text-[10px] text-emerald-400 font-semibold">(ឌីប្លូម)</span>
                )}
                {grade === 12 && (
                  <span className="ml-1 text-[10px] text-emerald-400 font-semibold">(បាក់ឌុប)</span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Category Filter Chips */}
        <ScrollReveal animation="fade-up" delay={140} duration={600}>
          <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 px-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setCategoryFilter(cat.id);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === cat.id
                    ? "bg-emerald-600 text-white shadow-2xs font-bold"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {isKhmer ? cat.labelKm : cat.labelEn}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active Grade Subheader */}
        <ScrollReveal animation="fade-up" delay={180} duration={600}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isKhmer
                  ? `កម្មវិធីសិក្សា MoEYS ថ្នាក់ទី ${selectedGrade} ${
                      selectedGrade <= 9 ? "· កម្រិតអនុវិទ្យាល័យ" : "· កម្រិតវិទ្យាល័យ"
                    } (${filteredDisciplines.length} មុខវិជ្ជា)`
                  : `MoEYS National Curriculum Grade ${selectedGrade} ${
                      selectedGrade <= 9 ? "· Junior High" : "· Senior High"
                    } (${filteredDisciplines.length} Subjects)`}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 10 MoEYS Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDisciplines.map((disc, idx) => {
            const gradeSlug = disc.id as MoeysSubjectSlug;
            const gradeTopicsData = MOEYS_GRADE_TOPICS[selectedGrade]?.[gradeSlug];
            const activeTopics = gradeTopicsData
              ? isKhmer
                ? gradeTopicsData.km
                : gradeTopicsData.en
              : disc.topics;

            return (
              <ScrollReveal
                key={disc.id}
                animation="fade-up"
                delay={(idx % 4) * 80}
                duration={550}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:scale-105 transition-all">
                      {getSubjectIcon(disc.id)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                      Gr. {selectedGrade}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                      {disc.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{disc.nameAlt}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{disc.desc}</p>

                  {/* Dynamic Topics List for Selected Grade */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {isKhmer
                        ? `មេរៀនសំខាន់ថ្នាក់ទី ${selectedGrade}`
                        : `Core Topics (Grade ${selectedGrade})`}
                    </p>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {activeTopics.slice(0, 4).map((t, topicIdx) => (
                        <li key={topicIdx} className="flex items-start gap-1.5 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                          <span className="text-slate-700 font-medium">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to="/auth"
                    search={{ mode: "signup" }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group/link"
                  >
                    <span>{isKhmer ? `រៀន ${disc.name}` : `Learn ${disc.name}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
