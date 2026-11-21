// ==============================================================================
// ScienceKH — Study Reference Library (បណ្ណាល័យឯកសារយោង & ឃ្លាំងចំណេះដឹងគ្រឹះ)
// Centralized Academic Knowledge Warehouse for Grades 7 to 12
// Progressive Disclosure UX Flow: Select Grade → Filter Discipline / Search → Select Subject → Browse Formulas
// ==============================================================================

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katex from "katex";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  X,
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Filter,
  Copy,
  Check,
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  Globe,
  Compass,
  Landmark,
  Laptop,
  Scale,
  Languages,
  FileText,
  Flame,
  Zap,
  HelpCircle,
  Award,
  Lightbulb,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { AppShell } from "@/components/layout/app-shell";
import { cn, cleanLatexDisplayTitle } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { toast } from "sonner";
import { ReferenceRepository } from "@/services/supabase/reference.repository";
import { toKhmerNumeral } from "@/lib/i18n";
import type {
  ReferenceEntry,
  ReferenceFilterState,
  ReferenceType,
  StreamApplicability,
} from "@/types/reference-library";
import { REFERENCE_TYPE_LABELS } from "@/types/reference-library";
import {
  MOEYS_REFERENCE_SUBJECTS,
  getSubjectsForGrade,
  getCategoriesForSubject,
  type SubjectCategoryDef,
  type SubjectCatalogEntry,
} from "@/lib/data/reference-categories";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema-generator";

type SearchParams = {
  grade?: number;
  subject?: string;
  category?: string;
  stream?: string;
  q?: string;
};

export const Route = createFileRoute("/_authenticated/reference/")({
  head: () => ({
    meta: [
      {
        title: "Study Reference Library — ScienceKH",
      },
      {
        name: "description",
        content:
          "Centralized academic knowledge reference library for Cambodian students in Grades 7–12. Formulas, symbols, definitions, laws, and SI units.",
      },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    grade: s.grade ? Number(s.grade) : undefined,
    subject: typeof s.subject === "string" ? s.subject : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    stream: typeof s.stream === "string" ? s.stream : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: StudyReferenceLibraryPage,
});

// MoEYS 6 Grades Metadata
const REFERENCE_GRADES = [
  { grade: 7, labelKm: "ថ្នាក់ទី ៧", labelEn: "Grade 7", tierKm: "អនុវិទ្យាល័យ", tierEn: "Junior High", isSenior: false, badgeKm: null, badgeEn: null },
  { grade: 8, labelKm: "ថ្នាក់ទី ៨", labelEn: "Grade 8", tierKm: "អនុវិទ្យាល័យ", tierEn: "Junior High", isSenior: false, badgeKm: null, badgeEn: null },
  { grade: 9, labelKm: "ថ្នាក់ទី ៩", labelEn: "Grade 9", tierKm: "អនុវិទ្យាល័យ", tierEn: "Junior High", isSenior: false, badgeKm: "ឌីប្លូម", badgeEn: "Brevet" },
  { grade: 10, labelKm: "ថ្នាក់ទី ១០", labelEn: "Grade 10", tierKm: "វិទ្យាល័យ", tierEn: "Senior High", isSenior: true, badgeKm: null, badgeEn: null },
  { grade: 11, labelKm: "ថ្នាក់ទី ១១", labelEn: "Grade 11", tierKm: "វិទ្យាល័យ", tierEn: "Senior High", isSenior: true, badgeKm: null, badgeEn: null },
  { grade: 12, labelKm: "ថ្នាក់ទី ១២", labelEn: "Grade 12", tierKm: "វិទ្យាល័យ", tierEn: "Senior High", isSenior: true, badgeKm: "បាក់ឌុប", badgeEn: "Bac II" },
];

// ==============================================================================
// 7 Standard Academic Reference Categories specified for secondary students
// ==============================================================================
export const CORE_ACADEMIC_CATEGORIES = [
  {
    id: "formulas",
    nameKm: "រូបមន្ត",
    nameEn: "Formulas",
    referenceTypes: ["formula", "equation", "chemical_formula"] as ReferenceType[],
  },
  {
    id: "symbols",
    nameKm: "និមិត្តសញ្ញា",
    nameEn: "Symbols",
    referenceTypes: ["symbol"] as ReferenceType[],
  },
  {
    id: "definitions",
    nameKm: "និយមន័យ",
    nameEn: "Definitions",
    referenceTypes: ["definition", "vocabulary"] as ReferenceType[],
  },
  {
    id: "rules",
    nameKm: "វិធាន & ច្បាប់",
    nameEn: "Rules & Laws",
    referenceTypes: ["rule", "law_principle", "theorem", "grammar_rule"] as ReferenceType[],
  },
  {
    id: "units",
    nameKm: "ខ្នាតរង្វាស់",
    nameEn: "Units",
    referenceTypes: ["unit_measurement"] as ReferenceType[],
  },
  {
    id: "concepts",
    nameKm: "ទ្រឹស្តី & គោលគំនិត",
    nameEn: "Key Concepts",
    referenceTypes: ["concept", "procedure", "historical_event", "date_timeline"] as ReferenceType[],
  },
  {
    id: "tables",
    nameKm: "តារាង & គំនូសបំព្រួញ",
    nameEn: "Tables & Diagrams",
    referenceTypes: ["table", "diagram", "chemical_element", "classification", "other"] as ReferenceType[],
  },
] as const;

function getStudyContextTopic(grade: number, subjectSlug?: string, isKhmer: boolean = true): string {
  if (!subjectSlug || subjectSlug === "all") {
    return isKhmer ? "កម្មវិធីសិក្សាគោលថ្នាក់ជាតិ" : "National Core Curriculum";
  }
  switch (subjectSlug) {
    case "mathematics":
      if (grade === 7) return isKhmer ? "សំណុំចំនួន & ធរណីមាត្រគ្រឹះ" : "Number Sets & Basic Geometry";
      if (grade === 8) return isKhmer ? "ពហុធា & ត្រីកោណប៉ុនគ្នា" : "Polynomials & Congruent Triangles";
      if (grade === 9) return isKhmer ? "សមីការដឺក្រេទី២ & ធរណីមាត្ររង្វង់" : "Quadratic Equations & Circle Geometry";
      if (grade === 10) return isKhmer ? "អនុគមន៍ & ត្រីកោណមាត្រគ្រឹះ" : "Functions & Foundational Trigonometry";
      if (grade === 11) return isKhmer ? "ស្វ៊ីតចំនួន & លីមីតនៃអនុគមន៍" : "Sequences & Function Limits";
      return isKhmer ? "ដេរីវេ អាំងតេក្រាល & ប្រូបាប (បាក់ឌុប)" : "Derivatives, Integrals & Probability";
    case "physics":
      if (grade === 7) return isKhmer ? "កម្លាំង ចលនា និងខ្នាតរង្វាស់" : "Force, Motion & Measurement";
      if (grade === 8) return isKhmer ? "សម្ពាធ ថាមពល និងកម្ដៅ" : "Pressure, Energy & Heat";
      if (grade === 9) return isKhmer ? "អគ្គិសនី ចរន្ត និងម៉ាញ៉េទិច" : "Electricity, Current & Magnetism";
      if (grade === 10) return isKhmer ? "ច្បាប់ញូតុន & ឌីណាមិច" : "Newton's Laws & Dynamics";
      if (grade === 11) return isKhmer ? "ទែម៉ូឌីណាមិច & អុបទិចធរណីមាត្រ" : "Thermodynamics & Optics";
      return isKhmer ? "លំយោលមេកានិច & រលកអេឡិចត្រូម៉ាញ៉េទិច" : "Oscillations & EM Waves";
    case "chemistry":
      if (grade === 7) return isKhmer ? "សារធាតុ អង្គធាតុ និងល្បាយ" : "Matter, Substances & Mixtures";
      if (grade === 8) return isKhmer ? "អាតូម ម៉ូលេគុល និងសមាសធាតុ" : "Atoms, Molecules & Compounds";
      if (grade === 9) return isKhmer ? "សមីការគីមី អាស៊ីត-បាស និងអំបិល" : "Chemical Equations, Acids, Bases & Salts";
      if (grade === 10) return isKhmer ? "តារាងខួបនៃធាតុគីមី & សម្ព័ន្ធគីមី" : "Periodic Table & Chemical Bonds";
      if (grade === 11) return isKhmer ? "ល្បឿនប្រតិកម្ម & លំនឹងគីមី" : "Reaction Kinetics & Equilibrium";
      return isKhmer ? "គីមីសរីរាង្គ អេសទែ និងអាស៊ីត-បាស" : "Organic Chemistry, Esters & pH";
    case "biology":
      if (grade === 7) return isKhmer ? "ពិភពរុក្ខជាតិ សត្វ និងកោសិកា" : "Plants, Animals & Cells";
      if (grade === 8) return isKhmer ? "សរីរាង្គមនុស្ស និងប្រព័ន្ធរំលាយអាហារ" : "Human Body & Digestion";
      if (grade === 9) return isKhmer ? "ប្រព័ន្ធប្រសាទ និងអ័រម៉ូន" : "Nervous System & Hormones";
      if (grade === 10) return isKhmer ? "កោសិកា ការបំបែកកោសិកា និងជាលិកា" : "Cell Division & Tissues";
      if (grade === 11) return isKhmer ? "សរីរវិទ្យារុក្ខជាតិ & រស្មីសំយោគ" : "Plant Physiology & Photosynthesis";
      return isKhmer ? "ពន្ធុវិទ្យា ហ្សែន DNA & តំណពូជ" : "Genetics, DNA & Heredity";
    default:
      return isKhmer ? "កម្មវិធីសិក្សាជាតិ MoEYS" : "MoEYS Curriculum Standard";
  }
}

// Subject Visual Themes & Knowledge Badges
const SUBJECT_THEMES: Record<
  string,
  {
    iconBg: string;
    iconBorder: string;
    textColor: string;
    badgeBg: string;
    badgeText: string;
    borderHover: string;
    cardBgHover: string;
    discipline: "stem" | "language" | "social" | "tech";
    formulaPillsKm: string[];
    formulaPillsEn: string[];
  }
> = {
  mathematics: {
    iconBg: "bg-blue-50 dark:bg-blue-950/60",
    iconBorder: "border-blue-200/80 dark:border-blue-800/60",
    textColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/50",
    badgeText: "text-blue-700 dark:text-blue-300",
    borderHover: "hover:border-blue-400 dark:hover:border-blue-500",
    cardBgHover: "hover:bg-blue-50/20 dark:hover:bg-blue-950/10",
    discipline: "stem",
    formulaPillsKm: ["ពីជគណិត", "ធរណីមាត្រ", "ត្រីកោណមាត្រ"],
    formulaPillsEn: ["Algebra", "Geometry", "Trigonometry"],
  },
  physics: {
    iconBg: "bg-purple-50 dark:bg-purple-950/60",
    iconBorder: "border-purple-200/80 dark:border-purple-800/60",
    textColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-950/50",
    badgeText: "text-purple-700 dark:text-purple-300",
    borderHover: "hover:border-purple-400 dark:hover:border-purple-500",
    cardBgHover: "hover:bg-purple-50/20 dark:hover:bg-purple-950/10",
    discipline: "stem",
    formulaPillsKm: ["ខ្នាត SI", "សមីការចលនា", "អគ្គិសនី"],
    formulaPillsEn: ["SI Units", "Kinematics", "Electricity"],
  },
  chemistry: {
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
    iconBorder: "border-emerald-200/80 dark:border-emerald-800/60",
    textColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    borderHover: "hover:border-emerald-400 dark:hover:border-emerald-500",
    cardBgHover: "hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10",
    discipline: "stem",
    formulaPillsKm: ["តារាងខួប", "វ៉ាឡង់ធាតុ", "អាស៊ីត-បាស"],
    formulaPillsEn: ["Periodic Table", "Valency", "Acids & Bases"],
  },
  biology: {
    iconBg: "bg-teal-50 dark:bg-teal-950/60",
    iconBorder: "border-teal-200/80 dark:border-teal-800/60",
    textColor: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-950/50",
    badgeText: "text-teal-700 dark:text-teal-300",
    borderHover: "hover:border-teal-400 dark:hover:border-teal-500",
    cardBgHover: "hover:bg-teal-50/20 dark:hover:bg-teal-950/10",
    discipline: "stem",
    formulaPillsKm: ["កោសិកា", "តំណពូជ DNA", "រស្មីសំយោគ"],
    formulaPillsEn: ["Cell Biology", "DNA Genetics", "Photosynthesis"],
  },
  earth: {
    iconBg: "bg-amber-50 dark:bg-amber-950/60",
    iconBorder: "border-amber-200/80 dark:border-amber-800/60",
    textColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/50",
    badgeText: "text-amber-700 dark:text-amber-300",
    borderHover: "hover:border-amber-400 dark:hover:border-amber-500",
    cardBgHover: "hover:bg-amber-50/20 dark:hover:bg-amber-950/10",
    discipline: "stem",
    formulaPillsKm: ["ស្រទាប់ផែនដី", "បន្ទះតិចតូនិក", "អាកាសធាតុ"],
    formulaPillsEn: ["Earth Layers", "Plate Tectonics", "Meteorology"],
  },
  khmer: {
    iconBg: "bg-rose-50 dark:bg-rose-950/60",
    iconBorder: "border-rose-200/80 dark:border-rose-800/60",
    textColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/50",
    badgeText: "text-rose-700 dark:text-rose-300",
    borderHover: "hover:border-rose-400 dark:hover:border-rose-500",
    cardBgHover: "hover:bg-rose-50/20 dark:hover:bg-rose-950/10",
    discipline: "language",
    formulaPillsKm: ["វេយ្យាករណ៍", "ក្បួនតែងសេចក្តី", "កាព្យឃ្លោង"],
    formulaPillsEn: ["Grammar", "Composition", "Khmer Poetry"],
  },
  history: {
    iconBg: "bg-amber-50 dark:bg-amber-950/60",
    iconBorder: "border-amber-200/80 dark:border-amber-800/60",
    textColor: "text-amber-800 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/50",
    badgeText: "text-amber-800 dark:text-amber-300",
    borderHover: "hover:border-amber-500 dark:hover:border-amber-500",
    cardBgHover: "hover:bg-amber-50/20 dark:hover:bg-amber-950/10",
    discipline: "social",
    formulaPillsKm: ["កាលប្បវត្តិ", "នគរភ្នំ & ចេនឡា", "សម័យអង្គរ"],
    formulaPillsEn: ["Chronology", "Funan & Chenla", "Angkor Era"],
  },
  geography: {
    iconBg: "bg-teal-50 dark:bg-teal-950/60",
    iconBorder: "border-teal-200/80 dark:border-teal-800/60",
    textColor: "text-teal-700 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-950/50",
    badgeText: "text-teal-800 dark:text-teal-300",
    borderHover: "hover:border-teal-500 dark:hover:border-teal-500",
    cardBgHover: "hover:bg-teal-50/20 dark:hover:bg-teal-950/10",
    discipline: "social",
    formulaPillsKm: ["មាត្រដ្ឋានផែនទី", "និយាមកា", "សេដ្ឋកិច្ចតំបន់"],
    formulaPillsEn: ["Map Scale", "Coordinates", "Regional Economy"],
  },
  english: {
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60",
    iconBorder: "border-indigo-200/80 dark:border-indigo-800/60",
    textColor: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/50",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    borderHover: "hover:border-indigo-400 dark:hover:border-indigo-500",
    cardBgHover: "hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10",
    discipline: "language",
    formulaPillsKm: ["កាលកិរិយា", "វេយ្យាករណ៍", "វាក្យសព្ទ"],
    formulaPillsEn: ["Verb Tenses", "Grammar Rules", "Vocabulary"],
  },
  ict: {
    iconBg: "bg-cyan-50 dark:bg-cyan-950/60",
    iconBorder: "border-cyan-200/80 dark:border-cyan-800/60",
    textColor: "text-cyan-600 dark:text-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/50",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    borderHover: "hover:border-cyan-400 dark:hover:border-cyan-500",
    cardBgHover: "hover:bg-cyan-50/20 dark:hover:bg-cyan-950/10",
    discipline: "tech",
    formulaPillsKm: ["ប្រព័ន្ធទ្វេភាគ", "កូដគ្រឹះ Python", "សុវត្ថិភាព IT"],
    formulaPillsEn: ["Binary & Logic", "Python Basics", "Cybersecurity"],
  },
  morality: {
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
    iconBorder: "border-emerald-200/80 dark:border-emerald-800/60",
    textColor: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
    badgeText: "text-emerald-800 dark:text-emerald-300",
    borderHover: "hover:border-emerald-500 dark:hover:border-emerald-500",
    cardBgHover: "hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10",
    discipline: "social",
    formulaPillsKm: ["សិទ្ធិមនុស្ស", "រដ្ឋធម្មនុញ្ញ", "សីលធម៌ពលរដ្ឋ"],
    formulaPillsEn: ["Human Rights", "Constitution", "Civic Ethics"],
  },
};

type DisciplineFilter = "all" | "stem" | "language" | "social" | "tech";

/**
 * Sanitizes LaTeX math strings, restoring any stripped backslashes or tokens.
 */
function cleanLatexMathString(raw: string | undefined | null): string {
  if (!raw) return "";
  let s = raw.trim();
  // Strip outer dollar signs if already wrapped
  if (s.startsWith("$") && s.endsWith("$")) {
    s = s.slice(1, -1).trim();
  }
  // Convert 3 dots to \dots
  s = s.replace(/\.\.\./g, "\\dots ");
  // Restore missing leading backslashes on mathbb and common LaTeX commands
  s = s
    .replace(/(^|[^\\])mathbb\{/g, "$1\\mathbb{")
    .replace(/(^|[^\\])frac\{/g, "$1\\frac{")
    .replace(/(^|[^\\])sqrt\{/g, "$1\\sqrt{")
    .replace(/(^|[^\\])pm\b/g, "$1\\pm")
    .replace(/(^|[^\\])times\b/g, "$1\\times")
    .replace(/(^|[^\\])cdot\b/g, "$1\\cdot")
    .replace(/(^|[^\\])neq\b/g, "$1\\neq")
    .replace(/(^|[^\\])leq\b/g, "$1\\leq")
    .replace(/(^|[^\\])geq\b/g, "$1\\geq")
    .replace(/(^|[^\\])approx\b/g, "$1\\approx")
    .replace(/(^|[^\\])implies\b/g, "$1\\implies")
    .replace(/(^|[^\\])alpha\b/g, "$1\\alpha")
    .replace(/(^|[^\\])beta\b/g, "$1\\beta")
    .replace(/(^|[^\\])pi\b/g, "$1\\pi")
    .replace(/(^|[^\\])rho\b/g, "$1\\rho")
    .replace(/(^|[^\\])theta\b/g, "$1\\theta")
    .replace(/(^|[^\\])omega\b/g, "$1\\omega")
    .replace(/(^|[^\\])Delta\b/g, "$1\\Delta")
    .replace(/(^|[^\\])Omega\b/g, "$1\\Omega")
    .replace(/(^|[^\\])Sigma\b/g, "$1\\Sigma")
    .replace(/(^|[^\\])parallel\b/g, "$1\\parallel")
    .replace(/(^|[^\\])perp\b/g, "$1\\perp")
    .replace(/(^|[^\\])dots\b/g, "$1\\dots")
    .replace(/(^|[^\\])in\b/g, "$1\\in")
    .replace(/(^|[^\\])infty\b/g, "$1\\infty");

  return s;
}

/**
 * Robust, resilient KaTeX renderer for formulas and symbols.
 * Renders directly into KaTeX HTML with zero markdown escaping issues.
 */
function SafeKatex({
  math,
  className,
  displayMode = false,
}: {
  math: string;
  className?: string;
  displayMode?: boolean;
}) {
  const html = useMemo(() => {
    try {
      const sanitized = cleanLatexMathString(math);
      return katex.renderToString(sanitized, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [math, displayMode]);

  if (!html) {
    return <span className={className}>{math}</span>;
  }

  return (
    <span
      className={cn("katex-inline inline-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Compact Academic Reference Item
 * Implements the user's compact reference blueprint:
 * - Category · Type
 * - Title (Khmer & English / notation)
 * - Restrained, clean KaTeX formula / symbol box
 * - Concise 1-2 line summary (zero bloated vertical space)
 * - Footer: Grade · Subject on left, View details → on right
 */
function CompactAcademicReferenceCard({
  entry,
  activeGrade,
  isKhmer,
  isCopied,
  showSubjectBadge = false,
  onCopyFormula,
  onToggleBookmark,
  onSelect,
}: {
  entry: ReferenceEntry;
  activeGrade: number;
  isKhmer: boolean;
  isCopied: boolean;
  showSubjectBadge?: boolean;
  onCopyFormula: (latex: string, id: string, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (entry: ReferenceEntry) => void;
}) {
  const sc = (entry.structuredContent || {}) as any;
  const rawLatex =
    sc.latexExpression ||
    (sc.symbol && (sc.symbol.includes("\\") || sc.symbol.includes("{") || sc.symbol.includes("mathbb") || sc.symbol.includes("=") || sc.symbol.includes("^"))
      ? sc.symbol
      : null);
  const mathExpr = rawLatex ? cleanLatexMathString(rawLatex) : null;
  const hasPlainSymbol = !mathExpr && !!sc.symbol;
  const subTheme = SUBJECT_THEMES[entry.subjectSlug] || SUBJECT_THEMES.mathematics;
  const subjectNameKm = MOEYS_REFERENCE_SUBJECTS.find((s) => s.slug === entry.subjectSlug)?.nameKm || entry.subjectSlug;

  const categoryLabel = isKhmer
    ? REFERENCE_TYPE_LABELS[entry.referenceType]?.labelKm || entry.referenceType
    : REFERENCE_TYPE_LABELS[entry.referenceType]?.labelEn || entry.referenceType;

  return (
    <article
      onClick={() => onSelect(entry)}
      className="p-4 sm:p-4.5 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-[#059669] dark:hover:border-[#059669] hover:shadow-xs transition-all duration-150 cursor-pointer group flex flex-col justify-between gap-3 active:scale-[0.99]"
    >
      {/* Category badge & bookmark button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {categoryLabel}
          </span>
          {showSubjectBadge && (
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-md",
                subTheme.badgeBg,
                subTheme.badgeText
              )}
            >
              {isKhmer ? subjectNameKm : entry.subjectSlug}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => onToggleBookmark(entry.id, e)}
          className="p-1 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label={entry.isBookmarked ? "Remove bookmark" : "Save bookmark"}
        >
          {entry.isBookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-amber-500 fill-amber-500" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#059669] transition leading-snug line-clamp-1">
          {isKhmer
            ? cleanLatexDisplayTitle(entry.originalTitleKh)
            : entry.titleEn || cleanLatexDisplayTitle(entry.originalTitleKh)}
        </h2>
      </div>

      {/* Formula / Math Expression Display */}
      {mathExpr ? (
        <div className="relative p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 formula-card-preview overflow-x-auto whitespace-nowrap text-center shadow-2xs">
          <div className="inline-block text-sm sm:text-base text-slate-900 dark:text-white whitespace-nowrap px-3 py-0.5">
            <SafeKatex math={mathExpr} displayMode={true} />
          </div>

          <button
            type="button"
            onClick={(e) => onCopyFormula(mathExpr, entry.id, e)}
            className="absolute top-2 right-2 p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#059669] shadow-2xs transition cursor-pointer"
            title={isKhmer ? "ចម្លង LaTeX" : "Copy LaTeX"}
          >
            {isCopied ? <Check className="h-3 w-3 text-[#059669]" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
      ) : hasPlainSymbol ? (
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-3">
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono whitespace-nowrap">
            {sc.symbol}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {sc.associatedUnit
              ? isKhmer
                ? `ខ្នាត៖ ${sc.associatedUnit}`
                : `Unit: ${sc.associatedUnit}`
              : (isKhmer ? sc.phoneticKh : sc.phoneticEn) || ""}
          </span>
        </div>
      ) : null}

      {/* Concise 1-2 line explanation */}
      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
        {isKhmer ? entry.shortDescriptionKh : (entry.explanationEn || entry.titleEn || entry.shortDescriptionKh)}
      </p>

      {/* Footer: Grade · Subject on left, View details → on right */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span className="truncate max-w-[200px]">
          {isKhmer
            ? `ថ្នាក់ទី ${toKhmerNumeral(activeGrade)} · ${subjectNameKm}`
            : `Grade ${activeGrade} · ${entry.subjectSlug}`}
        </span>
        <span className="font-bold text-[#059669] group-hover:underline flex items-center gap-1 shrink-0">
          <span>{isKhmer ? "មើលលម្អិត" : "View details"}</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
}

function StudyReferenceLibraryPage() {
  const { lang, data: profile } = useProfile();
  const isKhmer = lang === "km";
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  // Active Grade: Defaults to search param, then user profile grade, fallback to Grade 7
  const activeGrade = Number(searchParams.grade) || profile?.grade || 7;
  const activeSubjectSlug = searchParams.subject;
  const activeCategory = searchParams.category || "all";
  const activeStream = (searchParams.stream as StreamApplicability) || "all";
  const searchQuery = searchParams.q || "";

  // UI state: Synchronously initialized from master repository to ensure instant 0ms render
  const [entries, setEntries] = useState<ReferenceEntry[]>(() => {
    return ReferenceRepository.filterEntriesInMemory(
      ReferenceRepository.getMasterReferenceEntries(),
      {
        grade: Number(searchParams.grade) || 7,
        subjectSlug: searchParams.subject && searchParams.subject !== "all" ? searchParams.subject : "all",
        referenceType: "all",
        stream: (searchParams.stream as StreamApplicability) || "all",
        searchQuery: searchParams.q || "",
      }
    );
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineFilter>("all");
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Sync search input
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Load all entries for active grade & stream
  useEffect(() => {
    let mounted = true;

    const filter: ReferenceFilterState = {
      grade: activeGrade,
      subjectSlug: activeSubjectSlug && activeSubjectSlug !== "all" ? activeSubjectSlug : "all",
      referenceType: "all",
      stream: activeStream,
      searchQuery: localSearch,
    };

    // 1. Immediately update with verified local master warehouse
    const localData = ReferenceRepository.filterEntriesInMemory(
      ReferenceRepository.getMasterReferenceEntries(),
      filter
    );
    if (mounted) {
      setEntries(localData);
      setIsLoading(false);
    }

    // 2. Background sync from Supabase if online, without blocking the UI
    ReferenceRepository.getReferences(filter)
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setEntries(data);
        }
      })
      .catch(() => {
        // Safe: localData is already loaded
      });

    return () => {
      mounted = false;
    };
  }, [activeGrade, activeSubjectSlug, activeStream, localSearch]);

  // Available subjects for the active grade
  const availableSubjects = useMemo(() => {
    return getSubjectsForGrade(activeGrade, activeStream);
  }, [activeGrade, activeStream]);

  // Filtered subjects based on selected discipline chip
  const filteredSubjects = useMemo(() => {
    if (selectedDiscipline === "all") return availableSubjects;
    return availableSubjects.filter((sub) => {
      const theme = SUBJECT_THEMES[sub.slug];
      return theme?.discipline === selectedDiscipline;
    });
  }, [availableSubjects, selectedDiscipline]);

  // Active subject metadata
  const currentSubject = useMemo(() => {
    if (!activeSubjectSlug) return null;
    return MOEYS_REFERENCE_SUBJECTS.find((s) => s.slug === activeSubjectSlug) || null;
  }, [activeSubjectSlug]);

  // Dynamic 7 Core Academic Categories generated strictly from actual loaded records
  const dynamicCategories = useMemo(() => {
    return CORE_ACADEMIC_CATEGORIES.map((cat) => {
      const count = entries.filter((e) => (cat.referenceTypes as readonly ReferenceType[]).includes(e.referenceType)).length;
      return { ...cat, count };
    }).filter((cat) => cat.count > 0);
  }, [entries]);

  // Entries filtered by the active dynamic category
  const filteredEntries = useMemo(() => {
    if (activeCategory === "all") return entries;

    const matchedCat = CORE_ACADEMIC_CATEGORIES.find((c) => c.id === activeCategory);
    if (!matchedCat) return entries;

    return entries.filter((e) => (matchedCat.referenceTypes as readonly ReferenceType[]).includes(e.referenceType));
  }, [entries, activeCategory]);

  // Grade-appropriate quick references strictly filtered by active grade and active subject
  const gradeQuickReferences = useMemo(() => {
    return entries.filter((e) => {
      const matchGrade = e.grades.includes(activeGrade);
      const matchSubject = !activeSubjectSlug || activeSubjectSlug === "all" || e.subjectSlug === activeSubjectSlug;
      return matchGrade && matchSubject;
    });
  }, [entries, activeGrade, activeSubjectSlug]);

  // Saved / Bookmarked references
  const savedReferences = useMemo(() => {
    return entries.filter((e) => e.isBookmarked);
  }, [entries]);

  // Handlers for clean navigation transitions
  const handleSelectGrade = (newGrade: number) => {
    sounds.playPop();
    triggerHapticSelection();
    navigate({
      search: {
        grade: newGrade,
        subject: undefined,
        category: undefined,
        stream: newGrade >= 11 ? activeStream : undefined,
        q: undefined,
      },
    });
  };

  const handleSelectSubject = (slug: string) => {
    sounds.playPop();
    triggerHapticSelection();
    navigate({
      search: {
        grade: activeGrade,
        subject: slug,
        category: "all",
        stream: activeStream,
        q: undefined,
      },
    });
  };

  const handleSelectCategory = (catId: string) => {
    sounds.playPop();
    triggerHapticSelection();
    navigate({
      search: {
        grade: activeGrade,
        subject: activeSubjectSlug,
        category: catId,
        stream: activeStream,
        q: localSearch || undefined,
      },
    });
  };

  const handleBackToSubjects = () => {
    sounds.playPop();
    triggerHapticSelection();
    navigate({
      search: {
        grade: activeGrade,
        subject: undefined,
        category: undefined,
        stream: activeStream,
        q: undefined,
      },
    });
  };

  const handleCopyFormula = (latex: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(latex);
    setCopiedFormulaId(id);
    sounds.playPop();
    triggerHapticSelection();
    toast.success(isKhmer ? "បានចម្លងរូបមន្ត LaTeX!" : "Copied LaTeX formula!");
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const handleToggleBookmark = async (entryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    triggerHapticSelection();
    try {
      const isNowBookmarked = await ReferenceRepository.toggleBookmark(entryId);
      setEntries((prev) =>
        prev.map((item) => (item.id === entryId ? { ...item, isBookmarked: isNowBookmarked } : item))
      );
      toast.success(
        isNowBookmarked
          ? isKhmer
            ? "បានរក្សាទុកក្នុងបញ្ជីចំណាំ"
            : "Saved to bookmarks"
          : isKhmer
            ? "បានលុបចេញពីបញ្ជីចំណាំ"
            : "Removed from bookmarks"
      );
    } catch {
      toast.error("Bookmark update failed");
    }
  };

  return (
    <AppShell
      hideGamification={true}
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "ស្វែងយល់" : "Explore", href: "/explore" },
        { label: isKhmer ? "បណ្ណាល័យឯកសារយោង" : "Study References", href: "/reference" },
        ...(currentSubject ? [{ label: isKhmer ? currentSubject.nameKm : currentSubject.nameEn }] : []),
      ]}
      activeGrade={activeGrade}
      onGradeChange={(g) => handleSelectGrade(g)}
      rightSidebar={
        <div className="space-y-4">
          {/* Section 1: Your Current Study Context */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#059669]" />
                <span>{isKhmer ? "បរិបទសិក្សារបស់អ្នក" : "Current Study Context"}</span>
              </span>
              <span className="text-[11px] font-black text-[#059669] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800">
                {isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(activeGrade)}` : `Grade ${activeGrade}`}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">
                    {isKhmer ? "មុខវិជ្ជាសកម្ម" : "Active Subject"}
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-100">
                    {currentSubject ? (isKhmer ? currentSubject.nameKm : currentSubject.nameEn) : (isKhmer ? "គ្រប់មុខវិជ្ជា" : "All Subjects")}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-slate-400 font-medium">
                    {isKhmer ? "មេរៀនស្នូល" : "Current Topic"}
                  </span>
                  <span className="font-bold text-[#059669] text-right truncate max-w-[150px]">
                    {getStudyContextTopic(activeGrade, activeSubjectSlug, isKhmer)}
                  </span>
                </div>
              </div>

              {/* Action Link to Related Lesson */}
              <Link
                to="/lessons"
                search={{
                  grade: activeGrade,
                  subject: activeSubjectSlug && activeSubjectSlug !== "all" ? activeSubjectSlug : undefined,
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 text-[#059669] dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/60 hover:bg-emerald-100/60 transition group font-bold text-xs"
              >
                <span>{isKhmer ? "បើកមេរៀនពាក់ព័ន្ធ" : "Open Related Lesson"}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Section 2: Grade-Appropriate Quick References */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{isKhmer ? "ឯកសារយោងរហ័សប្រចាំថ្នាក់" : "Related References"}</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(activeGrade)}` : `Grade ${activeGrade}`}
              </span>
            </div>

            <div className="space-y-1.5">
              {gradeQuickReferences.length > 0 ? (
                gradeQuickReferences.slice(0, 4).map((ref) => {
                  const sc = (ref.structuredContent || {}) as any;
                  const displaySym = sc.symbol || sc.latexExpression || ref.titleEn;
                  const isCopied = copiedFormulaId === ref.id;

                  return (
                    <div
                      key={ref.id}
                      onClick={() => {
                        sounds.playPop();
                        triggerHapticSelection();
                        navigate({
                          to: "/reference/$referenceId",
                          params: { referenceId: ref.slug || ref.id },
                        });
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-left bg-slate-50/70 dark:bg-slate-800/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-serif font-black text-xs text-slate-900 dark:text-white truncate block">
                          {cleanLatexDisplayTitle(ref.originalTitleKh)}
                        </span>
                        {displaySym && (
                          <span className="text-[11px] font-mono font-bold text-[#059669] block truncate">
                            {displaySym.length > 32 ? displaySym.slice(0, 32) + "..." : displaySym}
                          </span>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleCopyFormula(displaySym || ref.originalTitleKh, ref.id, e)}
                          className="p-1 text-slate-400 hover:text-[#059669] transition cursor-pointer"
                          title={isKhmer ? "ចម្លង" : "Copy"}
                        >
                          {isCopied ? <Check className="h-3.5 w-3.5 text-[#059669]" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 py-2 text-center">
                  {isKhmer ? "ជ្រើសរើសមុខវិជ្ជាដើម្បីបង្ហាញឯកសារយោងរហ័ស" : "Select a subject to display quick references"}
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Saved & Recently Viewed References */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                <span>{isKhmer ? "ឯកសារបានចំណាំ & ធ្លាប់មើល" : "Saved & Recent"}</span>
              </span>
              {savedReferences.length > 0 && (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/60">
                  {isKhmer ? toKhmerNumeral(savedReferences.length) : savedReferences.length}
                </span>
              )}
            </div>

            {savedReferences.length > 0 ? (
              <div className="space-y-1.5">
                {savedReferences.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    to="/reference/$referenceId"
                    params={{ referenceId: item.slug || item.id }}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-amber-50/40 dark:hover:bg-amber-950/30 border border-slate-100 dark:border-slate-800 hover:border-amber-200 text-xs font-bold text-slate-700 dark:text-slate-200 transition group"
                  >
                    <span className="truncate pr-2">{cleanLatexDisplayTitle(item.originalTitleKh)}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                {isKhmer
                  ? "ចុចសញ្ញាចំណាំ 🔖 លើរូបមន្ត ឬនិយមន័យ ដើម្បីរក្សាទុកសម្រាប់បើកមើលរហ័សនៅទីនេះ។"
                  : "Bookmark any formula or definition to quickly access it here."}
              </div>
            )}
          </div>
        </div>
      }
    >
      {/* Schema.org Breadcrumb */}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Study References", item: "/reference" },
          ...(currentSubject
            ? [{ name: currentSubject.nameEn, item: `/reference?grade=${activeGrade}&subject=${currentSubject.slug}` }]
            : []),
        ])}
      />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 space-y-5 pb-32 lg:pb-8">
        {/* ================================================================== */}
        {/* VIEW A: SCREEN ONE — GRADE AND SUBJECT SELECTION (BENTO GRID)      */}
        {/* ================================================================== */}
        {!activeSubjectSlug ? (
          <div className="space-y-5">
            {/* Elevated Academic Hero Header */}
            <header className="p-5 sm:p-6 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {isKhmer ? "ថ្នាក់ទី ៧ ដល់ ១២" : "Grades 7 to 12"}
                </span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-relaxed">
                  {isKhmer ? "បណ្ណាល័យឯកសារយោង & រូបមន្តគ្រឹះ" : "Study Reference Library"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  {isKhmer
                    ? "ឃ្លាំងប្រមូលផ្តុំរូបមន្ត និមិត្តសញ្ញា ខ្នាតរង្វាស់ និងទ្រឹស្តីបទផ្លូវការតាមកម្រិតថ្នាក់ជាតិ សម្រាប់ជាជំនួយការរៀន និងប្រឡង"
                    : "Essential formulas, symbols, physical constants, SI units, and official curriculum theorems."}
                </p>
              </div>

              {/* High-Contrast Global Reference Search */}
              <div className="relative pt-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none mt-0.5" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder={
                    isKhmer
                      ? "ស្វែងរករូបមន្ត និមិត្តសញ្ញា ឬទ្រឹស្តីបទ (ឧ. អូម, ញូតុន, ដេរីវេ, សមីការ)..."
                      : "Search formulas, symbols, or theorems across all subjects..."
                  }
                  className="w-full h-11 pl-10 pr-9 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-slate-900 shadow-2xs transition"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full mt-0.5 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </header>

            {/* Tactile 3D Segmented Grade Level Selector */}
            <div className="p-3.5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs px-0.5">
                <span className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-[#059669]" />
                  <span>{isKhmer ? "ជ្រើសរើសកម្រិតថ្នាក់សិក្សា៖" : "Select Grade Level:"}</span>
                </span>
                <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                  {isKhmer
                    ? REFERENCE_GRADES.find((g) => g.grade === activeGrade)?.tierKm
                    : REFERENCE_GRADES.find((g) => g.grade === activeGrade)?.tierEn}
                </span>
              </div>

              {/* Segmented Grade Buttons with uniform height & alignment */}
              <div className="grid grid-cols-6 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/90">
                {REFERENCE_GRADES.map((g) => {
                  const isSelected = activeGrade === g.grade;
                  const badgeText = isKhmer ? g.badgeKm : g.badgeEn;
                  return (
                    <button
                      key={g.grade}
                      type="button"
                      onClick={() => handleSelectGrade(g.grade)}
                      className={cn(
                        "relative h-12 px-1 rounded-xl text-center font-black text-xs transition-all cursor-pointer flex flex-col items-center justify-center",
                        isSelected
                          ? "bg-[#059669] text-white shadow-xs border-b-2 border-emerald-800 active:border-b-0 active:translate-y-0.5"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60"
                      )}
                    >
                      <span className="leading-tight">{isKhmer ? `ថ្នាក់ ${g.grade}` : `Gr ${g.grade}`}</span>
                      <span
                        className={cn(
                          "text-[9px] font-extrabold px-1 rounded-sm leading-tight mt-0.5 min-h-[14px] flex items-center justify-center",
                          badgeText
                            ? isSelected
                              ? "bg-emerald-900/50 text-emerald-100"
                              : "bg-emerald-100 dark:bg-emerald-950/80 text-[#059669]"
                            : "invisible"
                        )}
                      >
                        {badgeText || "—"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Stream Switcher for Grades 11 and 12 */}
              {activeGrade >= 11 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-xs">
                  <span className="text-slate-500 font-bold">{isKhmer ? "ខ្សែវិជ្ជាជីវៈ៖" : "Academic Stream:"}</span>
                  <div className="flex items-center gap-1.5">
                    {(
                      [
                        { id: "all", labelKm: "ទាំងអស់", labelEn: "All" },
                        { id: "science", labelKm: "វិទ្យាសាស្ត្រ", labelEn: "Science" },
                        { id: "social_science", labelKm: "សង្គម", labelEn: "Social" },
                      ] as const
                    ).map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          navigate({
                            search: {
                              grade: activeGrade,
                              subject: undefined,
                              stream: st.id,
                            },
                          });
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-xl font-black text-xs transition cursor-pointer",
                          activeStream === st.id
                            ? "bg-emerald-100 text-[#059669] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/80 dark:border-emerald-800 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        {isKhmer ? st.labelKm : st.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* SUB-VIEW 1: SEARCH ACTIVE ACROSS ALL SUBJECTS                  */}
            {/* ============================================================== */}
            {localSearch.trim().length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                  <span className="font-bold">
                    {isKhmer
                      ? `លទ្ធផលស្វែងរកឆ្លងកាត់មុខវិជ្ជា (${entries.length})`
                      : `Search Results Across Subjects (${entries.length})`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocalSearch("")}
                    className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
                  >
                    {isKhmer ? "ត្រឡប់ទៅមុខវិជ្ជាវិញ" : "Clear Search"}
                  </button>
                </div>

                {isLoading ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    {isKhmer ? "កំពុងស្វែងរកក្នុងឃ្លាំងឯកសារយោង..." : "Searching reference warehouse..."}
                  </div>
                ) : entries.length === 0 ? (
                  <div className="p-8 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isKhmer
                        ? `មិនមានរូបមន្ត ឬឯកសារយោងត្រូវនឹង "${localSearch}" សម្រាប់ថ្នាក់ទី ${activeGrade} ទេ`
                        : `No reference entries match "${localSearch}" for Grade ${activeGrade}`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setLocalSearch("")}
                      className="text-xs font-black text-[#059669] hover:underline cursor-pointer"
                    >
                      {isKhmer ? "លុបការស្វែងរក" : "Reset search filter"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {entries.map((entry) => (
                      <CompactAcademicReferenceCard
                        key={entry.id}
                        entry={entry}
                        activeGrade={activeGrade}
                        isKhmer={isKhmer}
                        isCopied={copiedFormulaId === entry.id}
                        showSubjectBadge={true}
                        onCopyFormula={handleCopyFormula}
                        onToggleBookmark={handleToggleBookmark}
                        onSelect={(e) => {
                          sounds.playPop();
                          triggerHapticSelection();
                          navigate({
                            to: "/reference/$referenceId",
                            params: { referenceId: e.slug || e.id },
                          });
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ============================================================== */
              /* SUB-VIEW 2: DISCIPLINE PILLS & 2-COLUMN BENTO GRID OF SUBJECTS  */
              /* ============================================================== */
              <div className="space-y-3.5">
                {/* Discipline Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {(
                    [
                      { id: "all", labelKm: "គ្រប់មុខវិជ្ជា", labelEn: "All Subjects", icon: Layers },
                      { id: "stem", labelKm: "វិទ្យាសាស្ត្រពិត", labelEn: "STEM Sciences", icon: Atom },
                      { id: "language", labelKm: "ភាសា & អក្សរសិល្ប៍", labelEn: "Languages", icon: BookOpen },
                      { id: "social", labelKm: "វិទ្យាសាស្ត្រសង្គម", labelEn: "Social Sciences", icon: Landmark },
                      { id: "tech", labelKm: "បច្ចេកវិទ្យា", labelEn: "Technology", icon: Laptop },
                    ] as const
                  ).map((d) => {
                    const DIcon = d.icon;
                    const isDSelected = selectedDiscipline === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setSelectedDiscipline(d.id);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border active:scale-95",
                          isDSelected
                            ? "bg-[#059669] text-white border-[#059669] shadow-xs"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-[#E5EAF0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        )}
                      >
                        <DIcon className="h-3.5 w-3.5 shrink-0" />
                        <span>{isKhmer ? d.labelKm : d.labelEn}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                  <span className="font-black text-slate-700 dark:text-slate-300">
                    {isKhmer ? "ជ្រើសរើសមុខវិជ្ជាដើម្បីចូលមើលរូបមន្ត៖" : "Select a Subject to Browse References:"}
                  </span>
                  <span>
                    {filteredSubjects.length} {isKhmer ? "មុខវិជ្ជា" : "Subjects"}
                  </span>
                </div>

                {/* 2-Column Responsive Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredSubjects.map((subject) => {
                    const Icon = subject.icon;
                    const theme = SUBJECT_THEMES[subject.slug] || SUBJECT_THEMES.mathematics;

                    return (
                      <button
                        key={subject.slug}
                        type="button"
                        onClick={() => handleSelectSubject(subject.slug)}
                        className={cn(
                          "w-full text-left p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between gap-3 active:scale-[0.99]",
                          theme.borderHover,
                          theme.cardBgHover
                        )}
                      >
                        {/* Top: Icon + Grade Range Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={cn(
                              "h-11 w-11 rounded-2xl grid place-items-center border shrink-0 transition-transform group-hover:scale-105",
                              theme.iconBg,
                              theme.iconBorder,
                              theme.textColor
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <span className="text-[10.5px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
                            Gr. {subject.minGrade}–{subject.maxGrade}
                          </span>
                        </div>

                        {/* Middle: Subject Title */}
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <h2
                              className={cn(
                                "text-base font-black text-slate-900 dark:text-white transition leading-relaxed",
                                `group-hover:${theme.textColor}`
                              )}
                            >
                              {isKhmer ? subject.nameKm : subject.nameEn}
                            </h2>
                          </div>

                          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {isKhmer ? subject.descriptionKm : subject.descriptionEn}
                          </p>
                        </div>

                        {/* Bottom: Formula Knowledge Category Pills + Explore CTA */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 overflow-hidden">
                            {(isKhmer ? theme.formulaPillsKm : (theme.formulaPillsEn || theme.formulaPillsKm))
                              .slice(0, 2)
                              .map((pill) => (
                                <span
                                  key={pill}
                                  className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-md truncate",
                                    theme.badgeBg,
                                    theme.badgeText
                                  )}
                                >
                                  {pill}
                                </span>
                              ))}
                          </div>

                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs font-black transition shrink-0",
                              theme.textColor
                            )}
                          >
                            <span>{isKhmer ? "ចូលមើល" : "Browse"}</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ================================================================== */
          /* VIEW B: SCREEN TWO & THREE — SUBJECT REFERENCE HUB & FORMULA LIST  */
          /* ================================================================== */
          <div className="space-y-4">
            {/* Mobile-Only Back Navigation */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={handleBackToSubjects}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#059669] transition cursor-pointer py-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{isKhmer ? "ត្រឡប់ទៅជ្រើសរើសមុខវិជ្ជាវិញ" : "Back to All Subjects"}</span>
              </button>
            </div>

            {/* Subject Hub Header Card */}
            <header className="p-5 sm:p-6 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {currentSubject && (
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl grid place-items-center shrink-0 border",
                        (SUBJECT_THEMES[currentSubject.slug] || SUBJECT_THEMES.mathematics).iconBg,
                        (SUBJECT_THEMES[currentSubject.slug] || SUBJECT_THEMES.mathematics).iconBorder,
                        (SUBJECT_THEMES[currentSubject.slug] || SUBJECT_THEMES.mathematics).textColor
                      )}
                    >
                      <currentSubject.icon className="h-6 w-6" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate leading-relaxed">
                      {isKhmer ? currentSubject?.nameKm : currentSubject?.nameEn}
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10.5px] font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-[#059669]">
                        {isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(activeGrade)}` : `Grade ${activeGrade}`}
                      </span>
                      {activeGrade >= 11 && activeStream !== "all" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {activeStream === "science" ? (isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science Stream") : (isKhmer ? "វិទ្យាសាស្ត្រសង្គម" : "Social Stream")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBackToSubjects}
                  className="px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
                >
                  {isKhmer ? "ប្តូរមុខវិជ្ជា" : "Change Subject"}
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isKhmer ? currentSubject?.descriptionKm : currentSubject?.descriptionEn}
              </p>

              {/* In-Subject Search Input */}
              <div className="relative pt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none mt-0.5" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder={
                    isKhmer
                      ? `ស្វែងរកក្នុង ${currentSubject?.nameKm} (ឧ. រូបមន្ត, និមិត្តសញ្ញា, និយមន័យ)...`
                      : `Search ${currentSubject?.nameEn} references...`
                  }
                  className="w-full h-10 pl-9 pr-8 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-slate-900 transition"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full mt-0.5 cursor-pointer"
                    aria-label="Clear in-subject search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </header>

            {/* Dynamic Knowledge Categories Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-black text-slate-500 px-0.5">
                {isKhmer ? "ប្រភេទចំណេះដឹងយោង៖" : "Knowledge Categories:"}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {/* All Pill */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 border",
                    activeCategory === "all"
                      ? "bg-[#059669] text-white border-[#059669] shadow-xs"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-[#E5EAF0] dark:border-slate-800 hover:border-slate-300"
                  )}
                >
                  {isKhmer ? `ទាំងអស់ (${toKhmerNumeral(entries.length)})` : `All (${entries.length})`}
                </button>

                {/* Populated Dynamic Categories */}
                {dynamicCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 border",
                        isActive
                          ? "bg-[#059669] text-white border-[#059669] shadow-xs"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-[#E5EAF0] dark:border-slate-800 hover:border-slate-300"
                      )}
                    >
                      <span>{isKhmer ? cat.nameKm : cat.nameEn}</span>{" "}
                      <span
                        className={cn(
                          "text-[10.5px] ml-1 font-extrabold",
                          isActive ? "text-emerald-100" : "text-slate-400"
                        )}
                      >
                        ({isKhmer ? toKhmerNumeral(cat.count) : cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reference Entry Count & Indicator */}
            <div className="flex items-center justify-between text-xs px-0.5 text-slate-500">
              <span className="font-bold">
                {isKhmer ? "បញ្ជីរូបមន្ត និងឯកសារយោងផ្លូវការ" : "Official Reference Records"}
              </span>
              <span>
                {isKhmer ? toKhmerNumeral(filteredEntries.length) : filteredEntries.length} {isKhmer ? "កំណត់ត្រា" : "Records"}
              </span>
            </div>

            {/* Formula & Reference List */}
            {isLoading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                {isKhmer ? "កំពុងផ្ទុកឯកសារយោង..." : "Loading reference library..."}
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="p-8 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isKhmer
                    ? "មិនមានឯកសារយោងត្រូវនឹងការស្វែងរកនេះទេ"
                    : "No reference entries match this category or search"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch("");
                    handleSelectCategory("all");
                  }}
                  className="text-xs font-black text-[#059669] hover:underline cursor-pointer"
                >
                  {isKhmer ? "បង្ហាញទាំងអស់ឡើងវិញ" : "Reset category filter"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredEntries.map((entry) => (
                  <CompactAcademicReferenceCard
                    key={entry.id}
                    entry={entry}
                    activeGrade={activeGrade}
                    isKhmer={isKhmer}
                    isCopied={copiedFormulaId === entry.id}
                    onCopyFormula={handleCopyFormula}
                    onToggleBookmark={handleToggleBookmark}
                    onSelect={(e) => {
                      sounds.playPop();
                      triggerHapticSelection();
                      navigate({
                        to: "/reference/$referenceId",
                        params: { referenceId: e.slug || e.id },
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}