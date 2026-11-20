// ==============================================================================
// ScienceKH — Exam Archive (2011–Present)
// Mobile-First Academic Digital Library: Clean, Intuitive, Apple-Grade UX
// Primary Categories:
//   1. Bac II (បាក់ឌុប) -> Science Stream vs Social Science Stream
//   2. Outstanding Students (សិស្សពូកែ) -> Grade 12 vs Grade 9
// Minimalist Design System Tokens:
//   Primary Green: #059669 | Background: #F8FAFC | Surface: #FFFFFF
//   Text: #111827 / #64748B | Border: #E5EAF0 | Accent: #ECFDF5
// ==============================================================================

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  FileText,
  BookOpen,
  Layers,
  Calendar,
  Check,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Bot,
  AlertCircle,
  Clock,
  BookMarked,
  Filter,
  FileSpreadsheet,
  UploadCloud,
  ArrowLeftRight,
  Download,
  BookmarkCheck,
  Copy,
  Sparkles,
  Lightbulb,
  Award,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import {
  isExamSavedOffline,
  saveExamOffline,
  removeOfflineExam,
  getOfflineExamIds,
} from "@/lib/offline-exam";
import { useOfflineExams } from "@/lib/store/app-store";
import { JsonLd } from "@/components/seo/json-ld";
import {
  generateExamArchiveSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema-generator";
import { AppShell } from "@/components/layout/app-shell";
import { useProfile } from "@/lib/use-profile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import {
  HISTORICAL_EXAM_ARCHIVE,
  HISTORICAL_YEARS_TIMELINE,
  type HistoricalExamPaper,
  type ExamSubject,
  type ExamCategory,
  type ExamStream,
  type ResourceType,
} from "@/lib/moeys-exam-bank";

const examSearchSchema = z.object({
  paperId: z.string().optional(),
  mode: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/exams")({
  validateSearch: examSearchSchema,
  head: () => ({ meta: [{ title: "Exam Archive — ScienceKH" }] }),
  component: ExamsArchivePage,
});

// Subject Definitions with Distinct Visual Identity & Exam Specs
export interface SubjectConfig {
  nameKm: string;
  nameEn: string;
  icon: any;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
}

export const SUBJECT_CONFIG: Record<ExamSubject, SubjectConfig> = {
  mathematics: {
    nameKm: "គណិតវិទ្យា",
    nameEn: "Mathematics",
    icon: Calculator,
    accentBg: "bg-blue-50 dark:bg-blue-950/50",
    accentText: "text-blue-600 dark:text-blue-400",
    accentBorder: "border-blue-200/90 dark:border-blue-800/80",
    badgeBg: "bg-blue-100/80 dark:bg-blue-900/40",
    badgeText: "text-blue-700 dark:text-blue-300",
  },
  physics: {
    nameKm: "រូបវិទ្យា",
    nameEn: "Physics",
    icon: Atom,
    accentBg: "bg-purple-50 dark:bg-purple-950/50",
    accentText: "text-purple-600 dark:text-purple-400",
    accentBorder: "border-purple-200/90 dark:border-purple-800/80",
    badgeBg: "bg-purple-100/80 dark:bg-purple-900/40",
    badgeText: "text-purple-700 dark:text-purple-300",
  },
  chemistry: {
    nameKm: "គីមីវិទ្យា",
    nameEn: "Chemistry",
    icon: FlaskConical,
    accentBg: "bg-emerald-50 dark:bg-emerald-950/50",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBorder: "border-emerald-200/90 dark:border-emerald-800/80",
    badgeBg: "bg-emerald-100/80 dark:bg-emerald-900/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
  },
  biology: {
    nameKm: "ជីវវិទ្យា",
    nameEn: "Biology",
    icon: Dna,
    accentBg: "bg-teal-50 dark:bg-teal-950/50",
    accentText: "text-teal-600 dark:text-teal-400",
    accentBorder: "border-teal-200/90 dark:border-teal-800/80",
    badgeBg: "bg-teal-100/80 dark:bg-teal-900/40",
    badgeText: "text-teal-700 dark:text-teal-300",
  },
  khmer: {
    nameKm: "ភាសាខ្មែរ",
    nameEn: "Khmer Literature",
    icon: FileText,
    accentBg: "bg-rose-50 dark:bg-rose-950/50",
    accentText: "text-rose-600 dark:text-rose-400",
    accentBorder: "border-rose-200/90 dark:border-rose-800/80",
    badgeBg: "bg-rose-100/80 dark:bg-rose-900/40",
    badgeText: "text-rose-700 dark:text-rose-300",
  },
  history: {
    nameKm: "ប្រវត្តិវិទ្យា",
    nameEn: "History",
    icon: BookOpen,
    accentBg: "bg-amber-50 dark:bg-amber-950/50",
    accentText: "text-amber-700 dark:text-amber-400",
    accentBorder: "border-amber-200/90 dark:border-amber-800/80",
    badgeBg: "bg-amber-100/80 dark:bg-amber-900/40",
    badgeText: "text-amber-800 dark:text-amber-300",
  },
  english: {
    nameKm: "ភាសាអង់គ្លេស",
    nameEn: "English",
    icon: FileText,
    accentBg: "bg-indigo-50 dark:bg-indigo-950/50",
    accentText: "text-indigo-600 dark:text-indigo-400",
    accentBorder: "border-indigo-200/90 dark:border-indigo-800/80",
    badgeBg: "bg-indigo-100/80 dark:bg-indigo-900/40",
    badgeText: "text-indigo-700 dark:text-indigo-300",
  },
  geography: {
    nameKm: "ភូមិវិទ្យា",
    nameEn: "Geography",
    icon: BookOpen,
    accentBg: "bg-emerald-50 dark:bg-emerald-950/50",
    accentText: "text-emerald-700 dark:text-emerald-300",
    accentBorder: "border-emerald-200/90 dark:border-emerald-800/80",
    badgeBg: "bg-emerald-100/80 dark:bg-emerald-900/40",
    badgeText: "text-emerald-800 dark:text-emerald-200",
  },
  moral_civics: {
    nameKm: "សីលធម៌-ពលរដ្ឋ",
    nameEn: "Moral-Civics",
    icon: FileText,
    accentBg: "bg-purple-50 dark:bg-purple-950/50",
    accentText: "text-purple-700 dark:text-purple-300",
    accentBorder: "border-purple-200/90 dark:border-purple-800/80",
    badgeBg: "bg-purple-100/80 dark:bg-purple-900/40",
    badgeText: "text-purple-800 dark:text-purple-200",
  },
  earth: {
    nameKm: "ផែនដីវិទ្យា",
    nameEn: "Earth Science",
    icon: Layers,
    accentBg: "bg-amber-50 dark:bg-amber-950/50",
    accentText: "text-amber-600 dark:text-amber-400",
    accentBorder: "border-amber-200/90 dark:border-amber-800/80",
    badgeBg: "bg-amber-100/80 dark:bg-amber-900/40",
    badgeText: "text-amber-700 dark:text-amber-300",
  },
  french: {
    nameKm: "ភាសាបារាំង",
    nameEn: "French",
    icon: FileText,
    accentBg: "bg-blue-50 dark:bg-blue-950/50",
    accentText: "text-blue-600 dark:text-blue-400",
    accentBorder: "border-blue-200/90 dark:border-blue-800/80",
    badgeBg: "bg-blue-100/80 dark:bg-blue-900/40",
    badgeText: "text-blue-700 dark:text-blue-300",
  },
};

export function getSubjectConfig(subject: ExamSubject): SubjectConfig {
  return (
    SUBJECT_CONFIG[subject] || {
      nameKm: subject,
      nameEn: subject,
      icon: BookOpen,
      accentBg: "bg-slate-50 dark:bg-slate-800",
      accentText: "text-slate-700 dark:text-slate-300",
      accentBorder: "border-slate-200 dark:border-slate-700",
      badgeBg: "bg-slate-100 dark:bg-slate-800",
      badgeText: "text-slate-700 dark:text-slate-300",
    }
  );
}

// Compute official MoEYS Examination time & score specifications
export function getExamSpecs(paper: HistoricalExamPaper): { durationMins: number; maxScore: number } {
  if (paper.durationMinutes && paper.totalMarks) {
    return { durationMins: paper.durationMinutes, maxScore: paper.totalMarks };
  }
  if (paper.examinationCategory === "outstanding_student") {
    return { durationMins: 180, maxScore: 100 };
  }
  // Bac II Social Science Stream
  if (paper.stream === "social") {
    if (paper.subject === "khmer") return { durationMins: 150, maxScore: 125 };
    if (paper.subject === "earth" || paper.subject === "english") return { durationMins: 60, maxScore: 50 };
    return { durationMins: 90, maxScore: 75 };
  }
  // Bac II Science Stream (Default)
  if (paper.subject === "mathematics") return { durationMins: 150, maxScore: 125 };
  if (paper.subject === "history" || paper.subject === "english") return { durationMins: 60, maxScore: 50 };
  return { durationMins: 90, maxScore: 75 };
}

// Official MoEYS Exam Blueprints & Structured Outlines for All Core Examination Subjects
export const MOEYS_STANDARD_EXAM_BLUEPRINTS: Record<
  string,
  {
    totalMarks: number;
    durationMinutes: number;
    coefficient: number;
    exercises: Array<{
      number: number;
      titleKm: string;
      topicKm: string;
      points: number;
      descriptionKm: string;
      sampleLatex?: string;
    }>;
    essentialFormulas: Array<{
      nameKm: string;
      nameEn: string;
      formula: string;
      noteKm: string;
    }>;
  }
> = {
  mathematics: {
    totalMarks: 75,
    durationMinutes: 150,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច (Complex Numbers)",
        topicKm: "ចំនួនកុំផ្លិច & រូបមន្តដឺម័រ",
        points: 10,
        descriptionKm: "ដោះស្រាយសមីការដឺក្រេទី ២ ក្នុងសំណុំកុំផ្លិច C, សរសេរជាទម្រង់ត្រីកោណមាត្រ និងគណនាស្វ័យគុណ n តាមដឺម័រ។",
        sampleLatex: "z^2 - 2z + 4 = 0 \\implies z = 1 \\pm i\\sqrt{3} = 2\\left(\\cos\\frac{\\pi}{3} \\pm i\\sin\\frac{\\pi}{3}\\right)",
      },
      {
        number: 2,
        titleKm: "លំហាត់ទី ២៖ សមីការឌីផេរ៉ង់ស្យែល & ប្រូបាប",
        topicKm: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ ១ & ២",
        points: 10,
        descriptionKm: "ដោះស្រាយសមីការលីនេអ៊ែរ y' + ay = 0 រកចម្លើយទូទៅដែលផ្ទៀងផ្ទាត់លក្ខខណ្ឌដើម និងដោះស្រាយចំណោទប្រូបាប។",
        sampleLatex: "y' + 2y = 0 \\implies y = C e^{-2x}, \\quad P(A) = \\frac{n(A)}{n(S)}",
      },
      {
        number: 3,
        titleKm: "លំហាត់ទី ៣៖ ធរណីមាត្រក្នុងលំហ Oxyz",
        topicKm: "ផលគុណវ៉ិចទ័រ សមីការប្លង់ និងចម្ងាយ",
        points: 15,
        descriptionKm: "គណនាផលគុណវ៉ិចទ័រ u × v, សរសេរសមីការប្លង់កាត់តាម ៣ ចំណុច និងគណនាចម្ងាយពីចំណុចទៅប្លង់។",
        sampleLatex: "\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ x_1 & y_1 & z_1 \\\\ x_2 & y_2 & z_2 \\end{vmatrix}, \\quad d(M, \\alpha) = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
      },
      {
        number: 4,
        titleKm: "លំហាត់ទី ៤៖ អាំងតេក្រាល និងផ្ទៃក្រឡា",
        topicKm: "ព្រីមីទីវ អាំងតេក្រាលដោយផ្នែក & មាឌ",
        points: 15,
        descriptionKm: "គណនាអាំងតេក្រាលកំណត់ដោយវិធីអាំងតេក្រាលដោយផ្នែក និងគណនាផ្ទៃក្រឡា ឬមាឌសូលីតបដិវត្តន៍។",
        sampleLatex: "\\int u\\,dv = uv - \\int v\\,du, \\quad V = \\pi \\int_{a}^{b} [f(x)]^2\\,dx",
      },
      {
        number: 5,
        titleKm: "លំហាត់ទី ៥៖ សិក្សាអថេរភាព និងសង់ក្រាបនៃអនុគមន៍",
        topicKm: "អនុគមន៍អិចស្ប៉ូណង់ស្យែល ឬលោការីត",
        points: 25,
        descriptionKm: "គណនាលីមីតត្រង់ចុងដែនកំណត់, រកដេរីវេ f'(x), តារាងអថេរភាព, សមីការអាស៊ីមតូត និងសង់ក្រាប (C)។",
        sampleLatex: "f(x) = (x - 1)e^x + 2, \\quad f'(x) = x e^x, \\quad \\lim_{x\\to-\\infty} f(x) = 2",
      },
    ],
    essentialFormulas: [
      {
        nameKm: "រូបមន្តដឺម័រ (De Moivre)",
        nameEn: "De Moivre's Formula",
        formula: "[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)",
        noteKm: "គណនាស្វ័យគុណធំនៃចំនួនកុំផ្លិច",
      },
      {
        nameKm: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ១",
        nameEn: "1st Order Differential Equation",
        formula: "y' + ay = 0 \\implies y = C e^{-ax}",
        noteKm: "C ជាចំនួនថេរពិតកំណត់ដោយលក្ខខណ្ឌដើម",
      },
      {
        nameKm: "រូបមន្តអាំងតេក្រាលដោយផ្នែក",
        nameEn: "Integration by Parts",
        formula: "\\int u\\,dv = uv - \\int v\\,du",
        noteKm: "គន្លឹះជ្រើសរើស u តាមលំដាប់ LIATE",
      },
      {
        nameKm: "រូបមន្តចម្ងាយពីចំណុចទៅប្លង់",
        nameEn: "Point to Plane Distance",
        formula: "d(M_0, P) = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
        noteKm: "ប្លង់ P: ax + by + cz + d = 0",
      },
    ],
  },
  physics: {
    totalMarks: 75,
    durationMinutes: 150,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "លំហាត់ទី ១៖ ចលនាលំយោលសេរី",
        topicKm: "ប៉ោលទោល និងប៉ោលរ៉ឺស័រ",
        points: 10,
        descriptionKm: "គណនាខួបលំយោល T, ប្រវែងខ្សែប៉ោល l, និងថាមពលមេកានិចសរុបនៃលំយោល។",
        sampleLatex: "T = 2\\pi\\sqrt{\\frac{l}{g}}, \\quad E_m = \\frac{1}{2}k x_m^2",
      },
      {
        number: 2,
        titleKm: "លំហាត់ទី ២៖ រលកមេកានិច",
        topicKm: "ល្បឿនរលក និងអន្តរាគមន៍រលក",
        points: 15,
        descriptionKm: "គណនាល្បឿនរលក v = λf, រកប្រវែងរលក λ និងលក្ខខណ្ឌអតិបរមា/អប្បបរមានៃរលកជ្រៀតជ្រែក។",
        sampleLatex: "v = \\lambda f, \\quad d_2 - d_1 = k\\lambda \\quad (k \\in \\mathbb{Z})",
      },
      {
        number: 3,
        titleKm: "លំហាត់ទី ៣៖ សៀគ្វីចរន្តឆ្លាស់ RLC",
        topicKm: "អាំងប៉េដង់ និងបាតុភូតរេសូណង់",
        points: 20,
        descriptionKm: "គណនាអាំងប៉េដង់ Z, គម្លាតផាស φ, អានុភាពមធ្យម P = UI cosφ, និងប្រេកង់រេសូណង់។",
        sampleLatex: "Z = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}, \\quad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
      },
      {
        number: 4,
        titleKm: "លំហាត់ទី ៤៖ រលកអេឡិចត្រូម៉ាញេទិច",
        topicKm: "សៀគ្វី LC និងការបញ្ជូនរលក",
        points: 15,
        descriptionKm: "គណនាខួប និងប្រេកង់លំយោលអគ្គិសនីក្នុងសៀគ្វី LC និងប្រវែងរលកអេឡិចត្រូម៉ាញេទិច c = λf។",
        sampleLatex: "c = \\lambda f \\implies \\lambda = \\frac{c}{f} = 2\\pi c \\sqrt{LC}",
      },
      {
        number: 5,
        titleKm: "លំហាត់ទី ៥៖ រូបវិទ្យានុយក្លេអ៊ែរ និងអាតូម",
        topicKm: "ឥទ្ធិពលរូបអគ្គិសនី & បំបែកវិទ្យុសកម្ម",
        points: 15,
        descriptionKm: "អនុវត្តសមីការ Einstein hf = W₀ + Ek, គណនាថាមពលភ្ជាប់នុយក្លេអ៊ែរ E = Δm·c² និងច្បាប់បំបែកវិទ្យុសកម្ម។",
        sampleLatex: "hf = W_0 + \\frac{1}{2}m v_{\\max}^2, \\quad N(t) = N_0 e^{-\\lambda t}",
      },
    ],
    essentialFormulas: [
      {
        nameKm: "ខួបប៉ោលទោល",
        nameEn: "Simple Pendulum Period",
        formula: "T = 2\\pi\\sqrt{\\frac{l}{g}}",
        noteKm: "l គិតជាម៉ែត្រ (m), g = 9.8 ឬ 10 m/s²",
      },
      {
        nameKm: "អាំងប៉េដង់សៀគ្វី RLC",
        nameEn: "RLC Circuit Impedance",
        formula: "Z = \\sqrt{R^2 + (L\\omega - 1/C\\omega)^2}",
        noteKm: "នៅពេលរេសូណង់ Z = R អប្បបរមា",
      },
      {
        nameKm: "ឥទ្ធិពលរូបអគ្គិសនី (Einstein)",
        nameEn: "Photoelectric Effect",
        formula: "hf = W_0 + E_{k,\\max}",
        noteKm: "h = 6.626 × 10⁻³⁴ J·s",
      },
    ],
  },
  chemistry: {
    totalMarks: 75,
    durationMinutes: 150,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "លំហាត់ទី ១៖ ល្បឿនប្រតិកម្មគីមី",
        topicKm: "ល្បឿនមធ្យម និងល្បឿនខណៈ",
        points: 10,
        descriptionKm: "គណនាល្បឿនបង្កើតផល ឬល្បឿនបំបាត់ប្រតិករ និងកត្តាជះឥទ្ធិពលលើល្បឿនប្រតិកម្ម។",
        sampleLatex: "v = -\\frac{\\Delta [A]}{\\Delta t} = +\\frac{\\Delta [B]}{\\Delta t}",
      },
      {
        number: 2,
        titleKm: "លំហាត់ទី ២៖ តុល្យភាពអាស៊ីត-បាស & pH",
        topicKm: "កំហាប់អ៊ីយ៉ុង និងសូលុយស្យុងទ្រនាប់",
        points: 15,
        descriptionKm: "គណនា pH នៃអាស៊ីតខ្លាំង/ខ្សោយ, បាសខ្លាំង/ខ្សោយ, និងសមីការប្រតិកម្មអាស៊ីត-បាស។",
        sampleLatex: "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+], \\quad K_a = \\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}",
      },
      {
        number: 3,
        titleKm: "លំហាត់ទី ៣៖ លំនឹងគីមី",
        topicKm: "ថេរលំនឹង Kc និងច្បាប់ Le Chatelier",
        points: 15,
        descriptionKm: "គណនាកំហាប់ត្រង់លំនឹង, ថេរលំនឹង Kc និងការព្យាករណ៍ទិសដៅរំកិលលំនឹងតាមច្បាប់ Le Chatelier។",
        sampleLatex: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}",
      },
      {
        number: 4,
        titleKm: "លំហាត់ទី ៤៖ សមាសធាតុសរីរាង្គមានអុកស៊ីសែន",
        topicKm: "អាកុល អាស៊ីតកាបុកស៊ីលិច និងអេសទែ",
        points: 20,
        descriptionKm: "កំណត់រូបមន្តម៉ូលេគុល រូបមន្តស្ថាបនា សរសេរសមីការប្រតិកម្មអេសទែភីកាសុង និងគណនាទិន្នផល %។",
        sampleLatex: "\\text{R-COOH} + \\text{R'-OH} \\rightleftharpoons \\text{R-COO-R'} + \\text{H}_2\\text{O}",
      },
      {
        number: 5,
        titleKm: "លំហាត់ទី ៥៖ គីមីជីវៈ",
        topicKm: "ខ្លាញ់ សាប៊ូ និងអាស៊ីតអាមីណេ",
        points: 15,
        descriptionKm: "ប្រតិកម្មសាប៊ូភីកាសុងនៃទ្រីគ្លីសេរីត, ការគណនាម៉ាសសាប៊ូដែលទទួលបាន, និងចំណងប៉ិបទីតនៃប្រូតេអ៊ីន។",
        sampleLatex: "(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\longrightarrow 3\\text{RCOONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3",
      },
    ],
    essentialFormulas: [
      {
        nameKm: "រូបមន្តសន្ទស្សន៍ pH",
        nameEn: "pH Formula",
        formula: "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+], \\quad \\text{pH} + \\text{pOH} = 14",
        noteKm: "នៅសីតុណ្ហភាពបន្ទប់ 25°C",
      },
      {
        nameKm: "ថេរអុកស៊ីដកម្មអាស៊ីត Ka",
        nameEn: "Acid Dissociation Constant",
        formula: "K_a = \\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}",
        noteKm: "Ka កាន់តែធំ អាស៊ីតកាន់តែខ្លាំង",
      },
    ],
  },
  biology: {
    totalMarks: 75,
    durationMinutes: 90,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "លំហាត់ទី ១៖ ម៉ូលេគុល DNA និងច្បាប់បំពេញបាស",
        topicKm: "រចនាសម្ព័ន្ធ DNA & សម្ព័ន្ធអ៊ីដ្រូសែន",
        points: 15,
        descriptionKm: "គណនាចំនួននុយក្លេអូទីដប្រភេទនីមួយៗ (A, T, G, C), ប្រវែង DNA L, និងចំនួនសម្ព័ន្ធអ៊ីដ្រូសែន H។",
        sampleLatex: "N = 2\\text{A} + 2\\text{G}, \\quad L = \\frac{N}{2} \\times 3.4\\,\\text{Å}, \\quad H = 2\\text{A} + 3\\text{G}",
      },
      {
        number: 2,
        titleKm: "លំហាត់ទី ២៖ ការសំយោគប្រូតេអ៊ីន",
        topicKm: "ការចម្លងកូដ (mRNA) និងការបកប្រែកូដ (tRNA)",
        points: 15,
        descriptionKm: "កំណត់លំដាប់នុយក្លេអូទីដនៃ mRNA, ចំនួនកូដុង, និងលំដាប់អាស៊ីតអាមីណេនៃខ្សែប៉ូលីប៉ិបទីត។",
        sampleLatex: "\\text{ចំនួនអាស៊ីតអាមីណេ} = \\frac{N_{\\text{mRNA}}}{3} - 1",
      },
      {
        number: 3,
        titleKm: "លំហាត់ទី ៣៖ ពន្ធុវិទ្យា Mendel",
        topicKm: "ការបង្កាត់ពូជ និងតារាងហ្សេណូទីប",
        points: 20,
        descriptionKm: "ដោះស្រាយចំណោទបង្កាត់ពូជមួយគូ ឬពីរគូលក្ខណៈ, កំណត់ហ្សេណូទីប និងសរសេរតារាងបង្កាត់ F1, F2។",
      },
      {
        number: 4,
        titleKm: "លំហាត់ទី ៤៖ មីតូស និងមេយ៉ូស",
        topicKm: "វដ្តកោសិកា & បម្រែបម្រួលក្រូម៉ូសូម",
        points: 15,
        descriptionKm: "គណនាចំនួនកោសិកាកូនកកើត, ចំនួនក្រូម៉ូសូមក្នុងដំណាក់កាលនីមួយៗនៃមីតូស និងមេយ៉ូស។",
        sampleLatex: "\\text{ចំនួនកោសិកាកូន} = 2^k \\quad (k\\text{ ជាចំនួនដងនៃការចែកកោសិកា})",
      },
      {
        number: 5,
        titleKm: "លំហាត់ទី ៥៖ បច្ចេកវិទ្យាជីវៈ & បរិស្ថាន",
        topicKm: "វិស្វកម្មសេនេទិច និងអេកូឡូស៊ី",
        points: 10,
        descriptionKm: "វិភាគគោលការណ៍កាត់តភ្ជាប់ DNA (Plasmids, Restriction enzymes) និងខ្សែច្រវាក់ចំណីអាហារ។",
      },
    ],
    essentialFormulas: [
      {
        nameKm: "ច្បាប់បំពេញបាស DNA (Chargaff)",
        nameEn: "Chargaff Base Pairing Rule",
        formula: "\\text{A} = \\text{T}, \\quad \\text{G} \\equiv \\text{C}, \\quad N = 2\\text{A} + 2\\text{G}",
        noteKm: "សម្ព័ន្ធអ៊ីដ្រូសែន H = 2A + 3G",
      },
      {
        nameKm: "ប្រវែងម៉ូលេគុល DNA",
        nameEn: "DNA Length Formula",
        formula: "L = \\frac{N}{2} \\times 3.4\\,\\text{Å}",
        noteKm: "1 Å (អង់ស្រ្តូម) = 10⁻¹⁰ ម៉ែត្រ = 0.1 nm",
      },
    ],
  },
  khmer: {
    totalMarks: 75,
    durationMinutes: 150,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "ផ្នែកទី ១៖ អក្សរសិល្ប៍ និងវិភាគតួអង្គ (២៥ ពិន្ទុ)",
        topicKm: "អក្សរសិល្ប៍ខ្មែរ MoEYS",
        points: 25,
        descriptionKm: "វិភាគអត្ថន័យទស្សនវិជ្ជា តម្លៃអប់រំ និងឥរិយាបថតួអង្គក្នុងស្នាដៃអក្សរសិល្ប៍បុរាណ និងទំនើប (រឿងទុំទាវ រឿងកុលាបប៉ៃលិន)។",
      },
      {
        number: 2,
        titleKm: "ផ្នែកទី ២៖ តែងសេចក្តីបែបពន្យល់ ឬពិភាក្សា (៥០ ពិន្ទុ)",
        topicKm: "ក្បួនតែងសេចក្តី ៣ ដំណាក់កាល",
        points: 50,
        descriptionKm: "សរសេរតែងសេចក្តីឱ្យបានត្រឹមត្រូវតាមទម្រង់ MoEYS៖ សេចក្តីផ្តើម (លំនាំបញ្ហា ចំណូលបញ្ហា ចំណោទបញ្ហា), តួសេចក្តី (ពន្យល់ពាក្យគន្លឹះ បកស្រាយ និងលើកឧទាហរណ៍), និងសេចក្តីបញ្ចប់ (វាយតម្លៃ និងមតិផ្ទាល់ខ្លួន)។",
      },
    ],
    essentialFormulas: [
      {
        nameKm: "ទម្រង់តែងសេចក្តី ៣ ដំណាក់កាល",
        nameEn: "Khmer Essay 3-Part Structure",
        formula: "\\text{តែងសេចក្តី} = \\text{សេចក្តីផ្តើម} + \\text{តួសេចក្តី (អំណះអំណាង)} + \\text{សេចក្តីបញ្ចប់}",
        noteKm: "ត្រូវមានចំណោទបញ្ហានៅចុងសេចក្តីផ្តើមជានិច្ច",
      },
    ],
  },
  history: {
    totalMarks: 75,
    durationMinutes: 90,
    coefficient: 4,
    exercises: [
      {
        number: 1,
        titleKm: "សំណួរទី ១៖ ប្រវត្តិសាស្ត្រកម្ពុជាសម័យអង្គរ (២០ ពិន្ទុ)",
        topicKm: "សម័យមហានគរអង្គរ",
        points: 20,
        descriptionKm: "វិភាគកត្តាដែលធ្វើឱ្យអាណាចក្រខ្មែរមានភាពរុងរឿងក្នុងរាជ្យព្រះបាទជ័យវរ្ម័នទី ៧ និងប្រព័ន្ធធារាសាស្ត្រ (បារាយណ៍)។",
      },
      {
        number: 2,
        titleKm: "សំណួរទី ២៖ ការដណ្តើមឯករាជ្យជាតិ (២០ ពិន្ទុ)",
        topicKm: "ទិវាបុណ្យឯករាជ្យជាតិ ៩ វិច្ឆិកា ១៩៥៣",
        points: 20,
        descriptionKm: "ពិពណ៌នាអំពីព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យពីបារាំងនៃសម្តេចព្រះ នរោត្តម សីហនុ និងសន្និសីទក្រុងហ្សឺណែវ ១៩៥៤។",
      },
      {
        number: 3,
        titleKm: "សំណួរទី ៣៖ សន្តិភាព និងនយោបាយឈ្នះ-ឈ្នះ (៣៥ ពិន្ទុ)",
        topicKm: "កិច្ចព្រមព្រៀងប៉ារីស ១៩៩១ & ឈ្នះ-ឈ្នះ ១៩៩៨",
        points: 35,
        descriptionKm: "វិភាគសារៈសំខាន់នៃកិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១ និងការអនុវត្តនយោបាយឈ្នះ-ឈ្នះ បង្រួបបង្រួមជាតិ។",
      },
    ],
    essentialFormulas: [],
  },
};

// Subject Options with Icons for Navigation Strip
const SUBJECT_OPTIONS: {
  id: "all" | ExamSubject;
  nameKm: string;
  nameEn: string;
  icon: any;
}[] = [
  { id: "all", nameKm: "គ្រប់មុខវិជ្ជា", nameEn: "All Subjects", icon: Layers },
  { id: "mathematics", nameKm: "គណិតវិទ្យា", nameEn: "Mathematics", icon: Calculator },
  { id: "physics", nameKm: "រូបវិទ្យា", nameEn: "Physics", icon: Atom },
  { id: "chemistry", nameKm: "គីមីវិទ្យា", nameEn: "Chemistry", icon: FlaskConical },
  { id: "biology", nameKm: "ជីវវិទ្យា", nameEn: "Biology", icon: Dna },
  { id: "khmer", nameKm: "ភាសាខ្មែរ", nameEn: "Khmer Literature", icon: FileText },
  { id: "history", nameKm: "ប្រវត្តិវិទ្យា", nameEn: "History", icon: BookOpen },
  { id: "earth", nameKm: "ផែនដីវិទ្យា", nameEn: "Earth Science", icon: Layers },
  { id: "english", nameKm: "ភាសាអង់គ្លេស", nameEn: "English", icon: FileText },
  { id: "geography", nameKm: "ភូមិវិទ្យា", nameEn: "Geography", icon: BookOpen },
  { id: "moral_civics", nameKm: "សីលធម៌-ពលរដ្ឋ", nameEn: "Moral-Civics", icon: FileText },
];

type SortOrder = "newest" | "oldest" | "title";

// Clean user-facing titles from internal database IDs like "(SALA 00007808)"
function cleanDisplayTitle(title: string): string {
  return title.replace(/\s*\(SALA\s+\d+\)/gi, "").trim();
}

// Clean Subject Label
function getSubjectLabel(subject: ExamSubject): string {
  const found = SUBJECT_OPTIONS.find((s) => s.id === subject);
  return found ? found.nameKm : subject;
}

// Subject Icon
function getSubjectIcon(subject: ExamSubject) {
  const found = SUBJECT_OPTIONS.find((s) => s.id === subject);
  return found ? found.icon : BookOpen;
}

// Resource Type Label
function getResourceTypeLabel(type: ResourceType): string {
  switch (type) {
    case "individual_past_exam":
      return "វិញ្ញាសាប្រឡងផ្លូវការ";
    case "multi_year_collection":
      return "កម្រងវិញ្ញាសាច្រើនឆ្នាំ";
    case "practice_examination":
      return "វិញ្ញាសាត្រៀម";
    case "answer_key_solution":
      return "អត្រាកំណែ";
    case "curriculum_study_material":
      return "ឯកសារជំនួយស្មារតី";
    default:
      return "វិញ្ញាសា";
  }
}

// Provenance line
function formatAttribution(paper: HistoricalExamPaper): string {
  if (paper.sourceVerificationStatus === "verified_official") {
    return "ប្រភព៖ ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)";
  }
  if (paper.actualAuthor) {
    return `និពន្ធដោយ៖ ${paper.actualAuthor}`;
  }
  if (paper.publisher) {
    return `បោះពុម្ពដោយ៖ ${paper.publisher}`;
  }
  return "បណ្ណាសារ ScienceKH";
}

function ExamsArchivePage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { lang } = useProfile();
  const isKhmer = lang === "km";

  // ============================================================================
  // 1. PRIMARY & SECONDARY CATEGORY STATE (STRICTLY 2 PRIMARY TABS)
  // ============================================================================
  const [category, setCategory] = useState<ExamCategory>("bacii");
  const [stream, setStream] = useState<ExamStream>("science");
  const [outstandingGrade, setOutstandingGrade] = useState<9 | 12>(12);

  // ============================================================================
  // 2. SEARCH & COMPACT DROPDOWN FILTERS
  // ============================================================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<"all" | ExamSubject>("all");
  const [selectedYear, setSelectedYear] = useState<"all" | number>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // Sheets & Drawers
  const [showSubjectSheet, setShowSubjectSheet] = useState(false);
  const [showYearSheet, setShowYearSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);

  // Active exam drawer state (Supports deep-linking by paperId)
  const [activeExam, setActiveExam] = useState<HistoricalExamPaper | null>(() => {
    if (search.paperId) {
      return HISTORICAL_EXAM_ARCHIVE.find((p) => p.id === search.paperId) || null;
    }
    return null;
  });
  const [modalTab, setModalTab] = useState<"paper" | "rubric" | "formulas" | "topics">("paper");

  // Offline study storage state
  const [offlineExamIds, setOfflineExamIds] = useState<string[]>(() => getOfflineExamIds());

  const handleToggleOffline = async (paper: HistoricalExamPaper) => {
    sounds.playPop();
    const isSaved = offlineExamIds.includes(paper.id);
    if (isSaved) {
      await removeOfflineExam(paper.id);
      setOfflineExamIds((prev) => prev.filter((id) => id !== paper.id));
      toast.info("បានលុបវិញ្ញាសាចេញពី Offline");
    } else {
      await saveExamOffline(paper);
      setOfflineExamIds((prev) => [...prev, paper.id]);
      sounds.playCorrect(1);
      toast.success("បានរក្សាទុកវិញ្ញាសាសម្រាប់រៀន Offline ដោយជោគជ័យ!");
    }
  };

  const [copiedFormulaText, setCopiedFormulaText] = useState<string | null>(null);

  const handleCopyFormula = (latex: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(latex);
    setCopiedFormulaText(latex);
    sounds.playPop();
    toast.success("បានចម្លងរូបមន្ត LaTeX ជោគជ័យ!");
    setTimeout(() => setCopiedFormulaText(null), 2000);
  };

  // Reset helper
  const isAnyFilterActive =
    searchQuery.trim().length > 0 || selectedSubject !== "all" || selectedYear !== "all";

  const handleResetFilters = () => {
    sounds.playPop();
    setSearchQuery("");
    setSelectedSubject("all");
    setSelectedYear("all");
  };

  // ============================================================================
  // 3. DYNAMIC METRICS & AVAILABLE SUBJECTS / YEARS FROM REAL DATA
  // ============================================================================
  // Available subjects for the current track based on actual database records
  const availableSubjects = useMemo(() => {
    const present = new Set<ExamSubject>();

    HISTORICAL_EXAM_ARCHIVE.forEach((p) => {
      if (category === "bacii") {
        if (p.examinationCategory !== "bacii") return;
        if (p.stream !== stream && p.stream !== "both") return;
      } else {
        if (p.examinationCategory !== "outstanding_student") return;
        if (p.grade !== null && p.grade !== outstandingGrade) return;
      }
      present.add(p.subject);
    });

    return SUBJECT_OPTIONS.filter(
      (opt) => opt.id === "all" || present.has(opt.id as ExamSubject)
    );
  }, [category, stream, outstandingGrade]);

  // Paper count per year in the active track
  const yearCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    let multiYearCount = 0;

    HISTORICAL_EXAM_ARCHIVE.forEach((p) => {
      if (category === "bacii") {
        if (p.examinationCategory !== "bacii") return;
        if (p.stream !== stream && p.stream !== "both") return;
      } else {
        if (p.examinationCategory !== "outstanding_student") return;
        if (p.grade !== null && p.grade !== outstandingGrade) return;
      }

      if (selectedSubject !== "all" && p.subject !== selectedSubject) return;

      if (p.resourceType === "multi_year_collection") {
        multiYearCount++;
      } else if (p.examinationYear) {
        counts[p.examinationYear] = (counts[p.examinationYear] || 0) + 1;
      } else if (p.examYear) {
        counts[p.examYear] = (counts[p.examYear] || 0) + 1;
      }
    });

    return { counts, multiYearCount };
  }, [category, stream, outstandingGrade, selectedSubject]);

  // ============================================================================
  // 4. FILTER PIPELINE (INDIVIDUAL PAPERS VS MULTI-YEAR COLLECTIONS)
  // ============================================================================
  const matchingPapers = useMemo(() => {
    return HISTORICAL_EXAM_ARCHIVE.filter((p) => {
      // Category & sub-selector matching
      if (category === "bacii") {
        if (p.examinationCategory !== "bacii") return false;
        if (p.stream !== stream && p.stream !== "both") return false;
      } else {
        if (p.examinationCategory !== "outstanding_student") return false;
        if (p.grade !== null && p.grade !== outstandingGrade) return false;
      }

      // Subject filter
      if (selectedSubject !== "all" && p.subject !== selectedSubject) return false;

      // Year filter
      if (selectedYear !== "all") {
        const matchesSingle =
          p.examinationYear === selectedYear || p.examYear === selectedYear;
        const matchesRange =
          p.coverageStartYear &&
          p.coverageEndYear &&
          selectedYear >= p.coverageStartYear &&
          selectedYear <= p.coverageEndYear;
        if (!matchesSingle && !matchesRange) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle =
          p.originalTitleKh.toLowerCase().includes(q) ||
          p.titleEn.toLowerCase().includes(q);
        const matchYear =
          (p.examinationYear && p.examinationYear.toString().includes(q)) ||
          (p.examYear && p.examYear.toString().includes(q)) ||
          (p.coverageStartYear && p.coverageStartYear.toString().includes(q)) ||
          (p.coverageEndYear && p.coverageEndYear.toString().includes(q));
        const matchSubject =
          p.subject.toLowerCase().includes(q) ||
          (p.subject === "mathematics" && (q.includes("គណិត") || q.includes("math"))) ||
          (p.subject === "physics" && (q.includes("រូប") || q.includes("phys"))) ||
          (p.subject === "chemistry" && (q.includes("គីមី") || q.includes("chem"))) ||
          (p.subject === "biology" && (q.includes("ជីវ") || q.includes("bio"))) ||
          (p.subject === "khmer" && (q.includes("ខ្មែរ") || q.includes("តែង"))) ||
          (p.subject === "history" && (q.includes("ប្រវត្តិ") || q.includes("hist")));

        return matchTitle || matchYear || matchSubject;
      }

      return true;
    });
  }, [category, stream, outstandingGrade, selectedSubject, selectedYear, searchQuery]);

  // Separate individual papers from multi-year collections
  const { individualPapers, collectionPapers } = useMemo(() => {
    const individual: HistoricalExamPaper[] = [];
    const collections: HistoricalExamPaper[] = [];

    matchingPapers.forEach((paper) => {
      if (paper.resourceType === "multi_year_collection") {
        collections.push(paper);
      } else {
        individual.push(paper);
      }
    });

    // Apply sorting
    const sortFn = (a: HistoricalExamPaper, b: HistoricalExamPaper) => {
      if (sortOrder === "newest") {
        const yearA = a.examinationYear ?? a.coverageEndYear ?? a.examYear ?? 0;
        const yearB = b.examinationYear ?? b.coverageEndYear ?? b.examYear ?? 0;
        return yearB - yearA;
      } else if (sortOrder === "oldest") {
        const yearA = a.examinationYear ?? a.coverageStartYear ?? a.examYear ?? 0;
        const yearB = b.examinationYear ?? b.coverageStartYear ?? b.examYear ?? 0;
        return yearA - yearB;
      } else {
        return a.originalTitleKh.localeCompare(b.originalTitleKh, "km");
      }
    };

    individual.sort(sortFn);
    collections.sort(sortFn);

    return { individualPapers: individual, collectionPapers: collections };
  }, [matchingPapers, sortOrder]);

  // Group individual papers by verified examination year
  const groupedByYear = useMemo(() => {
    const groups: { year: number; papers: HistoricalExamPaper[] }[] = [];
    const map = new Map<number, HistoricalExamPaper[]>();

    individualPapers.forEach((paper) => {
      const yr = paper.examinationYear ?? paper.examYear ?? 0;
      if (!map.has(yr)) {
        map.set(yr, []);
      }
      map.get(yr)!.push(paper);
    });

    // Sort years descending (newest first)
    const sortedYears = Array.from(map.keys()).sort((a, b) => b - a);

    sortedYears.forEach((yr) => {
      if (yr > 0) {
        groups.push({ year: yr, papers: map.get(yr)! });
      }
    });

    // Any papers with undefined year placed at end
    if (map.has(0)) {
      groups.push({ year: 0, papers: map.get(0)! });
    }

    return groups;
  }, [individualPapers]);

  // Related papers across other years for the active modal paper (Deduplicated strictly by year)
  const relatedCrossYearPapers = useMemo(() => {
    if (!activeExam) return [];
    const currentYear = activeExam.examinationYear ?? activeExam.examYear ?? 0;

    const filtered = HISTORICAL_EXAM_ARCHIVE.filter((p) => {
      if (p.id === activeExam.id) return false;
      if (p.examinationCategory !== activeExam.examinationCategory) return false;
      if (p.subject !== activeExam.subject) return false;
      if (
        activeExam.examinationCategory === "bacii" &&
        p.stream !== activeExam.stream &&
        p.stream !== "both"
      ) {
        return false;
      }
      if (
        activeExam.examinationCategory === "outstanding_student" &&
        p.grade !== activeExam.grade
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const yA = a.examinationYear ?? a.examYear ?? a.coverageEndYear ?? 0;
      const yB = b.examinationYear ?? b.examYear ?? b.coverageEndYear ?? 0;
      return yB - yA;
    });

    // Deduplicate by year so duplicate years (e.g. 2025, 2025) never appear
    const seenYears = new Set<number>();
    if (currentYear) seenYears.add(currentYear);

    const deduped: HistoricalExamPaper[] = [];
    for (const p of filtered) {
      const y = p.examinationYear ?? p.examYear ?? p.coverageEndYear;
      if (y && !seenYears.has(y)) {
        seenYears.add(y);
        deduped.push(p);
      }
    }
    return deduped;
  }, [activeExam]);

  const handleOpenPaper = (
    paper: HistoricalExamPaper,
    tab: "paper" | "rubric" | "formulas" | "topics" = "paper"
  ) => {
    sounds.playPop();
    setActiveExam(paper);
    setModalTab(tab);
  };

  const handleClosePaper = () => {
    setActiveExam(null);
  };

  const totalResultsCount = individualPapers.length + collectionPapers.length;

  return (
    <AppShell
      wide={true}
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "ស្វែងយល់" : "Explore", href: "/explore" },
        { label: isKhmer ? "វិញ្ញាសាជាតិ MoEYS" : "National Exam Archive" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Archive Summary Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>{isKhmer ? "បណ្ណសារវិញ្ញាសា" : "MoEYS Archive"}</span>
              </span>
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/80">
                2011–2024
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? `មានវិញ្ញាសាសរុប ${totalResultsCount} ច្បាប់ រួមទាំងបាក់ឌុប និងសិស្សពូកែទូទាំងប្រទេស។`
                : `Contains ${totalResultsCount} verified papers across Bac II and Outstanding Students examinations.`}
            </p>
          </div>

          {/* Offline Saved Papers Indicator */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookmarkCheck className="h-4 w-4 text-amber-500" />
                <span>{isKhmer ? "វិញ្ញាសា Offline" : "Saved Offline"}</span>
              </span>
              <span className="text-[11px] font-bold text-amber-600">
                {offlineExamIds.length} {isKhmer ? "ច្បាប់" : "papers"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? "វិញ្ញាសាដែលបានទាញយកអាចបើកមើលដោយគ្មានអ៊ីនធឺណិតបានគ្រប់ពេលវេលា។"
                : "Downloaded papers can be viewed offline without internet."}
            </p>
          </div>

          {/* Contribute Paper Link */}
          <div className="p-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              {isKhmer ? "ចូលរួមចែករំលែកវិញ្ញាសា" : "Contribute Papers"}
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? "មានវិញ្ញាសាចាស់ៗដែលមិនទាន់មានក្នុងប្រព័ន្ធ? ផ្ញើមកកាន់ Telegram យើងខ្ញុំ។"
                : "Have historical exam papers to contribute? Reach out on Telegram."}
            </p>
            <a
              href="https://t.me/sciencekh_support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
            >
              <span>Telegram: @sciencekh_support</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      }
    >
      {/* Schema.org Structured Data for MoEYS Exam Archive */}
      <JsonLd
        data={[
          generateExamArchiveSchema(totalResultsCount),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Exams", item: "/exams" },
          ]),
        ]}
      />

      <div className="space-y-6">
        {/* ============================================================ */}
        {/* 1. CLEAN, SPACIOUS MOBILE-FIRST TOP BAR                      */}
        {/* ============================================================ */}
        <header
          className="lg:hidden sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md header-safe-top transition-colors px-4 py-2.5"
          style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
        >
          <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 sm:px-6 pt-3 pb-2.5 space-y-2.5">
            {/* Row 1: Brand Title & Filter Actions */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-display text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                    វិញ្ញាសាជាតិ MoEYS
                  </h1>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    ២០១១–២០២៦
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {category === "bacii" ? "បណ្ណសារប្រឡងបាក់ឌុប" : "បណ្ណសារប្រឡងសិស្សពូកែ"} • {totalResultsCount} វិញ្ញាសា
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Year Selector Pill */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setShowYearSheet(true);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 h-8 px-2.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap",
                    selectedYear !== "all"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-extrabold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500"
                  )}
                  title="ជ្រើសរើសសម័យប្រឡង"
                >
                  <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{selectedYear === "all" ? "គ្រប់ឆ្នាំ" : selectedYear}</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {/* Filter Sheet Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setShowFilterSheet(true);
                  }}
                  className={cn(
                    "flex items-center gap-1 h-8 px-2.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap",
                    sortOrder !== "newest"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-extrabold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500"
                  )}
                  aria-label="Filter & Archive Settings"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>តម្រង</span>
                </button>

                {/* Reset Action */}
                {isAnyFilterActive && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="grid h-8 w-8 place-items-center rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition active:scale-95 cursor-pointer shadow-2xs shrink-0"
                    title="កំណត់ឡើងវិញ (Reset)"
                    aria-label="Reset filters"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Level Selector & Track Toggle */}
            <div className="flex items-center gap-2">
              {/* Category Segmented Control */}
              <div className="flex-1 grid grid-cols-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setCategory("bacii");
                    setSelectedSubject("all");
                  }}
                  className={cn(
                    "py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer",
                    category === "bacii"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  បាក់ឌុប (Bac II)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setCategory("outstanding_student");
                    setSelectedSubject("all");
                  }}
                  className={cn(
                    "py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer",
                    category === "outstanding_student"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  សិស្សពូកែ
                </button>
              </div>

              {/* Stream / Grade Switcher Pill */}
              {category === "bacii" ? (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setStream(stream === "science" ? "social" : "science");
                    setSelectedSubject("all");
                  }}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition active:scale-95 cursor-pointer shrink-0 shadow-2xs"
                  title="ប្តូរថ្នាក់វិទ្យាសាស្ត្រ / សង្គម"
                >
                  <span>{stream === "science" ? "ថ្នាក់វិទ្យាសាស្ត្រ" : "ថ្នាក់សង្គម"}</span>
                  <ArrowLeftRight className="h-3 w-3 text-slate-400" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setOutstandingGrade(outstandingGrade === 12 ? 9 : 12);
                    setSelectedSubject("all");
                  }}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition active:scale-95 cursor-pointer shrink-0 shadow-2xs"
                  title="ប្តូរថ្នាក់ទី ៩ / ១២"
                >
                  <span>ថ្នាក់ទី {outstandingGrade}</span>
                  <ArrowLeftRight className="h-3 w-3 text-slate-400" />
                </button>
              )}
            </div>

            {/* Row 3: Horizontal Scrollable Subject Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:-mx-6 sm:px-6">
              {availableSubjects.map((subj) => {
                const isSelected = selectedSubject === subj.id;
                const SubjIcon = subj.icon;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedSubject(subj.id as "all" | ExamSubject);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0",
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs font-extrabold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    )}
                  >
                    {subj.id !== "all" && <SubjIcon className="h-3.5 w-3.5" />}
                    <span>{subj.nameKm}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. MAIN RESULTS FEED & SEARCH                                */}
        {/* ============================================================ */}
        <section className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none px-4 sm:px-6 lg:px-0 pt-3 space-y-4 pb-32 lg:pb-8">
          {/* Fast Search Input Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកតាមឈ្មោះវិញ្ញាសា ឬឆ្នាំ..."
              className="w-full h-10 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9.5 pr-9 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-2xs transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results Summary & Inline Sort */}
          <div className="flex items-center justify-between text-xs px-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-slate-900 dark:text-white">
                {category === "bacii"
                  ? stream === "science"
                    ? "បាក់ឌុប • វិទ្យាសាស្ត្រ"
                    : "បាក់ឌុប • សង្គម"
                  : `សិស្សពូកែ • ថ្នាក់ទី ${outstandingGrade}`}
              </span>
              {selectedSubject !== "all" && (
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  • {getSubjectLabel(selectedSubject)}
                </span>
              )}
              {selectedYear !== "all" && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  • ឆ្នាំ {selectedYear}
                </span>
              )}
              <span className="text-slate-400 font-normal">
                ({totalResultsCount} វិញ្ញាសា)
              </span>
            </div>

            {/* Compact Sorting Selector */}
            <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
              <span>តម្រៀប៖</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="bg-transparent border-none text-[11px] font-bold text-slate-900 dark:text-white outline-none cursor-pointer pr-1"
              >
                <option value="newest">ថ្មីបំផុត</option>
                <option value="oldest">ចាស់បំផុត</option>
                <option value="title">តាមអក្ខរក្រម</option>
              </select>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. EMPTY / DIGITIZATION STATE                                */}
          {/* ============================================================ */}
          {totalResultsCount === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3 mt-4">
              <div className="h-12 w-12 mx-auto rounded-2xl grid place-items-center bg-slate-50 dark:bg-slate-800 text-slate-500 shadow-2xs">
                <AlertCircle className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {selectedYear !== "all"
                    ? `វិញ្ញាសាឆ្នាំ ${selectedYear} កំពុងត្រូវបានប្រមូលពីបណ្ណសារដ្ឋាន`
                    : "មិនមានវិញ្ញាសាត្រូវគ្នានឹងការស្វែងរកនេះទេ"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  ScienceKH ប្រកាន់ខ្ជាប់នូវគោលការណ៍ «មិនបង្កើតវិញ្ញាសាក្លែងក្លាយ»។ ឯកសារច្បាប់ដើមកំពុងត្រូវបានប្រមូល និងផ្ទៀងផ្ទាត់។
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer shadow-xs transition active:scale-95"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>មើលវិញ្ញាសាគ្រប់ឆ្នាំដែលមាន</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowContributeModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-600 cursor-pointer"
                >
                  <UploadCloud className="h-3.5 w-3.5 text-emerald-600" />
                  <span>ចែករំលែកឯកសារច្បាប់ដើម</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ============================================================ */}
              {/* 4. INDIVIDUAL PAPERS (GROUPED BY YEAR)                        */}
              {/* ============================================================ */}
              {groupedByYear.map(({ year, papers }) => (
                <section key={year} className="space-y-3">
                  {/* Year Header Strip */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <h2 className="font-display text-xs font-black text-slate-900 dark:text-white">
                        {year > 0 ? `សម័យប្រឡង ${year}` : "វិញ្ញាសាផ្សេងៗ"}
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      {papers.length} វិញ្ញាសា
                    </span>
                  </div>

                  {/* Clean, Spacious Professional Cards */}
                  <div className="space-y-3">
                    {papers.map((paper) => {
                      const cfg = getSubjectConfig(paper.subject);
                      const specs = getExamSpecs(paper);
                      const SubjectIcon = cfg.icon;
                      const paperYear = paper.examinationYear || paper.examYear || year;
                      const hasPdf = Boolean(paper.pdfUrl);

                      return (
                        <article
                          key={paper.id}
                          onClick={() => handleOpenPaper(paper, "paper")}
                          className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-emerald-500/60 hover:shadow-xs transition-all active:scale-[0.99] cursor-pointer group flex items-center justify-between gap-3.5"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            {/* Subject Signature Icon Container */}
                            <div
                              className={cn(
                                "grid h-12 w-12 place-items-center rounded-2xl border shrink-0 transition-transform group-hover:scale-105 shadow-2xs",
                                cfg.accentBg,
                                cfg.accentBorder,
                                cfg.accentText
                              )}
                            >
                              <SubjectIcon className="h-6 w-6 stroke-[2]" />
                            </div>

                            {/* Clean Subject Info & Metadata - ZERO TRUNCATION */}
                            <div className="min-w-0 flex-1 space-y-1">
                              {/* Subject Khmer Name + English Subtitle */}
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="font-display text-base font-extrabold text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {cfg.nameKm}
                                </h3>
                                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                                  ({cfg.nameEn})
                                </span>
                              </div>

                              {/* Academic Specs: Year, Duration & Points */}
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                  សម័យប្រឡង {paperYear}
                                </span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-slate-400" />
                                  <span>{specs.durationMins} នាទី</span>
                                </span>
                                <span>•</span>
                                <span>{specs.maxScore} ពិន្ទុ</span>
                              </div>

                              {/* Trust Badges */}
                              <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                  <span>MoEYS ផ្លូវការ</span>
                                </span>

                                {paper.hasOfficialAnswerKey && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                                    <Check className="h-3 w-3 text-amber-600" />
                                    <span>មានអត្រាកំណែ</span>
                                  </span>
                                )}

                                {hasPdf && (
                                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    PDF
                                  </span>
                                )}

                                {offlineExamIds.includes(paper.id) && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                    <BookmarkCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                    <span>Offline</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Tactile Action Button */}
                          <div className="flex items-center gap-1 pl-1 shrink-0">
                            <span className="hidden sm:inline text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                              បើកវិញ្ញាសា
                            </span>
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* ============================================================ */}
              {/* 5. MULTI-YEAR COMPILATIONS                                   */}
              {/* ============================================================ */}
              {collectionPapers.length > 0 && (
                <section className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <BookMarked className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <h2 className="font-display text-xs font-black text-slate-900 dark:text-white">
                        កម្រងវិញ្ញាសាច្រើនឆ្នាំ (Compilations)
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      {collectionPapers.length} ក្បាល
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {collectionPapers.map((collection) => {
                      const displayTitle = cleanDisplayTitle(collection.originalTitleKh);
                      const coverageSpan =
                        collection.coverageStartYear && collection.coverageEndYear
                          ? `${collection.coverageStartYear}–${collection.coverageEndYear}`
                          : "ច្រើនឆ្នាំ";

                      return (
                        <article
                          key={collection.id}
                          onClick={() => handleOpenPaper(collection, "paper")}
                          className="p-3.5 sm:p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-slate-900 shadow-2xs hover:border-emerald-500 transition-all active:scale-[0.99] cursor-pointer group flex items-center justify-between gap-3.5"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shrink-0">
                              <BookMarked className="h-6 w-6 stroke-[1.9]" />
                            </div>
                            <div className="min-w-0 space-y-1">
                              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white leading-snug truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {displayTitle}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                  {coverageSpan}
                                </span>
                                <span>•</span>
                                <span>{getSubjectLabel(collection.subject)}</span>
                                {collection.actualAuthor && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate">{collection.actualAuthor}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100/60 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-200/70 transition shrink-0">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* 9. COMPACT SUBJECT BOTTOM SHEET                              */}
        {/* ============================================================ */}
        <Drawer open={showSubjectSheet} onOpenChange={setShowSubjectSheet}>
          <DrawerContent className="max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-[#E5EAF0] dark:border-slate-800 rounded-t-3xl p-5 space-y-3 max-h-[80vh] overflow-y-auto">
            <DrawerHeader className="p-0 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="font-display text-base font-bold text-[#111827] dark:text-white">
                    ជ្រើសរើសមុខវិជ្ជា
                  </DrawerTitle>
                  <DrawerDescription className="text-xs text-[#64748B] mt-0.5">
                    ជ្រើសរើសដើម្បីសម្រាំងវិញ្ញាសាដែលចង់អនុវត្ត
                  </DrawerDescription>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSubjectSheet(false)}
                  className="rounded-full p-1 text-[#94A3B8] hover:text-[#111827] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DrawerHeader>

            <div className="space-y-1 pt-1">
              {availableSubjects.map((sub) => {
                const IconComp = sub.icon;
                const isSelected = selectedSubject === sub.id;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedSubject(sub.id);
                      setShowSubjectSheet(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition cursor-pointer active:scale-98",
                      isSelected
                        ? "border-[#059669] bg-[#ECFDF5] text-[#059669]"
                        : "border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-800 text-[#111827] dark:text-white hover:border-[#059669]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-lg",
                          isSelected
                            ? "bg-[#059669] text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-[#64748B]"
                        )}
                      >
                        <IconComp className="h-3.5 w-3.5" />
                      </div>
                      <span>{sub.nameKm}</span>
                    </div>

                    {isSelected && <Check className="h-4 w-4 text-[#059669]" />}
                  </button>
                );
              })}
            </div>
          </DrawerContent>
        </Drawer>

        {/* ============================================================ */}
        {/* 10. COMPACT YEAR BOTTOM SHEET (2011 TO 2026)                 */}
        {/* ============================================================ */}
        <Drawer open={showYearSheet} onOpenChange={setShowYearSheet}>
          <DrawerContent className="max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-[#E5EAF0] dark:border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <DrawerHeader className="p-0 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="font-display text-base font-bold text-[#111827] dark:text-white">
                    ជ្រើសរើសសម័យប្រឡង (២០១១–២០២៦)
                  </DrawerTitle>
                  <DrawerDescription className="text-xs text-[#64748B] mt-0.5">
                    សម្រាំងតាមឆ្នាំប្រឡងផ្លូវការជាក់ស្តែង
                  </DrawerDescription>
                </div>
                <button
                  type="button"
                  onClick={() => setShowYearSheet(false)}
                  className="rounded-full p-1 text-[#94A3B8] hover:text-[#111827] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DrawerHeader>

            {/* All Years Option */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setSelectedYear("all");
                setShowYearSheet(false);
              }}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition cursor-pointer",
                selectedYear === "all"
                  ? "border-[#059669] bg-[#ECFDF5] text-[#059669]"
                  : "border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-800 text-[#111827] dark:text-white hover:border-[#059669]"
              )}
            >
              <span>គ្រប់ឆ្នាំទាំងអស់ (All Available Years)</span>
              {selectedYear === "all" && <Check className="h-4 w-4 text-[#059669]" />}
            </button>

            {/* Grid of Verified Years */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                ឆ្នាំប្រឡងជាក់ស្តែង
              </span>
              <div className="grid grid-cols-3 gap-2">
                {HISTORICAL_YEARS_TIMELINE.map((yr) => {
                  const count = yearCounts.counts[yr] || 0;
                  const isSelected = selectedYear === yr;

                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setSelectedYear(yr);
                        setShowYearSheet(false);
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border text-center transition cursor-pointer active:scale-95",
                        isSelected
                          ? "border-[#059669] bg-[#059669] text-white shadow-2xs font-extrabold"
                          : count > 0
                            ? "border-[#059669]/30 bg-white dark:bg-slate-800 text-[#111827] dark:text-white hover:border-[#059669]"
                            : "border-[#E5EAF0] dark:border-slate-800 bg-slate-50 dark:bg-slate-850/50 text-[#94A3B8]"
                      )}
                    >
                      <div className="text-xs font-bold">{yr}</div>
                      <div
                        className={cn(
                          "text-[9px] mt-0.5 font-medium",
                          isSelected
                            ? "text-emerald-100"
                            : count > 0
                              ? "text-[#059669]"
                              : "text-[#94A3B8]"
                        )}
                      >
                        {count > 0 ? `${count} វិញ្ញាសា` : "កំពុងបញ្ចូល"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* ============================================================ */}
        {/* 11. DESKTOP-GRADE RESPONSIVE EXAM MODAL DIALOG               */}
        {/* ============================================================ */}
        <Dialog open={!!activeExam} onOpenChange={(open) => !open && handleClosePaper()}>
          {activeExam && (() => {
            const specs = getExamSpecs(activeExam);
            const blueprint =
              MOEYS_STANDARD_EXAM_BLUEPRINTS[activeExam.subject] ||
              MOEYS_STANDARD_EXAM_BLUEPRINTS.mathematics;
            const subjectConfig =
              SUBJECT_CONFIG[activeExam.subject as ExamSubject] || SUBJECT_CONFIG.mathematics;
            const SubjectIcon = subjectConfig.icon || FileText;

            return (
              <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[96vw] max-w-4xl lg:max-w-5xl h-[88vh] max-h-[88vh] p-0 rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 gap-0 z-50 focus:outline-none">
                <DialogHeader className="sr-only">
                  <DialogTitle>{cleanDisplayTitle(activeExam.originalTitleKh)}</DialogTitle>
                  <DialogDescription>{formatAttribution(activeExam)}</DialogDescription>
                </DialogHeader>

                {/* Modal Top Header (Desktop Spacious Layout) */}
                <div className="p-4 sm:p-5 lg:p-6 border-b border-[#E5EAF0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-850/80 shrink-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center shrink-0 text-[#059669]">
                        <SubjectIcon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#059669] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                            {getResourceTypeLabel(activeExam.resourceType)}
                          </span>
                          {activeExam.examinationYear && (
                            <span className="text-[10.5px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                              សម័យប្រឡង {activeExam.examinationYear}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                            {activeExam.stream === "social" ? "ថ្នាក់សង្គម" : "ថ្នាក់វិទ្យាសាស្ត្រ"}
                          </span>
                        </div>

                        <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                          {cleanDisplayTitle(activeExam.originalTitleKh)}
                        </h2>
                        {activeExam.titleEn && (
                          <p className="text-xs text-slate-500 font-semibold">
                            {activeExam.titleEn}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <DialogClose asChild>
                        <button
                          type="button"
                          onClick={handleClosePaper}
                          className="rounded-2xl p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition shadow-2xs active:scale-95"
                          aria-label="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </DialogClose>
                    </div>
                  </div>

                  {/* MoEYS Official Specification Pill Row */}
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{blueprint.durationMinutes || specs.durationMins} នាទី</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{blueprint.totalMarks || specs.maxScore} ពិន្ទុពេញ</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
                      <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                      <span>មេគុណ {blueprint.coefficient}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-700 dark:text-emerald-300 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                      <span>ស្តង់ដារជាតិ MoEYS</span>
                    </span>
                  </div>

                  {/* Cross-Year Comparison Switcher */}
                  {relatedCrossYearPapers.length > 0 && (
                    <div className="pt-2 border-t border-[#E5EAF0] dark:border-slate-800/80">
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        <span className="text-[11px] text-slate-500 font-bold shrink-0">
                          ប្រៀបធៀបឆ្នាំប្រឡង៖
                        </span>
                        <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#059669] text-white shadow-xs shrink-0">
                          {activeExam.examinationYear ?? activeExam.examYear} (បច្ចុប្បន្ន)
                        </span>
                        {relatedCrossYearPapers.map((other) => (
                          <button
                            key={other.id}
                            type="button"
                            onClick={() => {
                              sounds.playPop();
                              setActiveExam(other);
                            }}
                            className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-[#E5EAF0] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#059669] hover:text-[#059669] transition shrink-0 cursor-pointer shadow-2xs active:scale-95"
                          >
                            {other.examinationYear ?? other.examYear ?? other.coverageEndYear}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4 Tabs: Paper / Rubric / Formulas / Topics */}
                  <div className="grid grid-cols-4 gap-1.5 bg-[#F1F5F9] dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setModalTab("paper");
                      }}
                      className={cn(
                        "py-2 px-2 rounded-xl text-center transition cursor-pointer truncate flex items-center justify-center gap-1.5",
                        modalTab === "paper"
                          ? "bg-white dark:bg-slate-900 text-[#059669] shadow-xs font-black"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>វិញ្ញាសា ({activeExam.questions.length > 0 ? activeExam.questions.length : blueprint.exercises.length} លំហាត់)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setModalTab("rubric");
                      }}
                      className={cn(
                        "py-2 px-2 rounded-xl text-center transition cursor-pointer truncate flex items-center justify-center gap-1.5",
                        modalTab === "rubric"
                          ? "bg-white dark:bg-slate-900 text-[#059669] shadow-xs font-black"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>អត្រាកំណែ & ពិន្ទុ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setModalTab("formulas");
                      }}
                      className={cn(
                        "py-2 px-2 rounded-xl text-center transition cursor-pointer truncate flex items-center justify-center gap-1.5",
                        modalTab === "formulas"
                          ? "bg-white dark:bg-slate-900 text-[#059669] shadow-xs font-black"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>រូបមន្តគន្លឹះ ({blueprint.essentialFormulas.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setModalTab("topics");
                      }}
                      className={cn(
                        "py-2 px-2 rounded-xl text-center transition cursor-pointer truncate flex items-center justify-center gap-1.5",
                        modalTab === "topics"
                          ? "bg-white dark:bg-slate-900 text-[#059669] shadow-xs font-black"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>មេរៀនប្រឡង</span>
                    </button>
                  </div>
                </div>

                {/* Modal Body (Scrollable, Full Desktop Width) */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-4 text-xs sm:text-sm">
                  {/* TAB 1: EXAM PAPER */}
                  {modalTab === "paper" && (
                    <div className="space-y-4">
                      {/* MoEYS Official Original PDF Link Banner */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-slate-850 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10.5px] font-black uppercase text-[#059669] bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                              MoEYS Verified Archive
                            </span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                              ឯកសារវិញ្ញាសាច្បាប់ដើមពេញលេញ
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            វិញ្ញាសាត្រូវបានរៀបចំតាមកម្រងសំណួរផ្លូវការ និងអាចបើកមើល PDF ច្បាប់ដើមរបស់ក្រសួងអប់រំគ្រប់ពេលវេលា។
                          </p>
                        </div>

                        {activeExam.pdfUrl && (
                          <a
                            href={activeExam.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 px-4 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer transition active:scale-95"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>បើកមើល PDF ច្បាប់ដើម</span>
                          </a>
                        )}
                      </div>

                      {/* Digitized Questions OR MoEYS Blueprint 5 Exercises */}
                      {activeExam.questions.length > 0 ? (
                        activeExam.questions.map((q) => (
                          <div
                            key={q.questionNumber}
                            className="p-5 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-2xs"
                          >
                            <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-slate-800 pb-2.5">
                              <span className="font-black text-sm text-[#059669]">
                                {q.titleKm}
                              </span>
                              {q.points && (
                                <span className="text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                                  {q.points} ពិន្ទុ
                                </span>
                              )}
                            </div>

                            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                              >
                                {q.problemTextKm.replace(/\\n/g, "\n\n")}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-1">
                            <span className="font-black text-sm text-slate-800 dark:text-white flex items-center gap-2">
                              <span>🏛️</span>
                              <span>រចនាសម្ព័ន្ធវិញ្ញាសាផ្លូវការ ៥ លំហាត់ (MoEYS Official Outline)</span>
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">
                              សរុប {blueprint.totalMarks} ពិន្ទុ • រយៈពេល {blueprint.durationMinutes} នាទី
                            </span>
                          </div>

                          {blueprint.exercises.map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-2xs hover:border-[#059669]/60 transition"
                            >
                              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-xs font-black text-[#059669] border border-emerald-200 dark:border-emerald-800">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                                      {ex.titleKm}
                                    </h3>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-800">
                                    {ex.topicKm}
                                  </span>
                                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                                    {ex.points} ពិន្ទុ
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {ex.descriptionKm}
                              </p>

                              {ex.sampleLatex && (
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 font-mono text-center overflow-x-auto text-sm text-slate-900 dark:text-emerald-300 shadow-2xs">
                                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {`$${ex.sampleLatex}$`}
                                  </ReactMarkdown>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: RUBRIC & SCORING METHODOLOGY */}
                  {modalTab === "rubric" && (
                    <div className="space-y-4">
                      {/* Standard MoEYS Scoring Allocation Guide */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-2.5">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span>គោលការណ៍បែងចែកពិន្ទុផ្លូវការ MoEYS ក្នុងការប្រឡងជាតិ</span>
                        </div>
                        <p className="text-xs text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
                          គណៈកម្មការកំណែអនុវត្តវិធានកាត់ពិន្ទុជាជំហានៗយ៉ាងម៉ឺងម៉ាត់៖ 
                          <span className="font-bold"> ០.៥ – ១ ពិន្ទុ </span> សម្រាប់សរសេររូបមន្តត្រឹមត្រូវ, 
                          <span className="font-bold"> ១ – ២ ពិន្ទុ </span> សម្រាប់ដំណើរការគណនា និងជំនួសលេខ, 
                          និង <span className="font-bold"> ០.៥ – ១ ពិន្ទុ </span> សម្រាប់ចម្លើយចុងក្រោយ និងខ្នាតត្រឹមត្រូវ។
                        </p>
                      </div>

                      {activeExam.questions.length > 0 ? (
                        activeExam.questions.map((q) => (
                          <div
                            key={q.questionNumber}
                            className="p-5 rounded-2xl border border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3"
                          >
                            <div className="font-black text-sm text-[#059669]">
                              ដំណោះស្រាយលម្អិត & អត្រាកំណែ — {q.titleKm}
                            </div>

                            {q.officialSolutionKm ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm, remarkMath]}
                                  rehypePlugins={[rehypeKatex]}
                                >
                                  {q.officialSolutionKm.replace(/\\n/g, "\n\n")}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p className="text-slate-500 italic">
                                អត្រាកំណែផ្លូវការមាននៅក្នុងឯកសារ PDF ច្បាប់ដើមខាងក្រោម។
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="space-y-3">
                          <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                            បំណែងចែកពិន្ទុតាមលំហាត់នីមួយៗ (Exercise Scoring Rubric):
                          </h3>
                          {blueprint.exercises.map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
                            >
                              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                                <span className="text-[#059669]">
                                  {ex.titleKm} ({ex.topicKm})
                                </span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-black text-slate-700 dark:text-slate-200">
                                  {ex.points} ពិន្ទុ
                                </span>
                              </div>
                              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                                <li>
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">ជំហាន ១ (រូបមន្ត & ទ្រឹស្តី)៖</span> សរសេររូបមន្តមូលដ្ឋាន និងសម្មតិកម្ម ({Math.round(ex.points * 0.3)} ពិន្ទុ)
                                </li>
                                <li>
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">ជំហាន ២ (ដំណោះស្រាយ)៖</span> ដំណើរការគណនា សម្រួល និងជំនួសលេខ ({Math.round(ex.points * 0.5)} ពិន្ទុ)
                                </li>
                                <li>
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">ជំហាន ៣ (សន្និដ្ឋាន)៖</span> គូសប្រអប់ចម្លើយចុងក្រោយ និងខ្នាត ({Math.round(ex.points * 0.2)} ពិន្ទុ)
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: ESSENTIAL FORMULAS */}
                  {modalTab === "formulas" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                          <span>📐</span>
                          <span>រូបមន្តគន្លឹះដាច់ខាតសម្រាប់វិញ្ញាសានេះ</span>
                        </span>
                        <span className="text-xs text-slate-400">
                          ចុចលើប៊ូតុងដើម្បីចម្លងរូបមន្ត (LaTeX)
                        </span>
                      </div>

                      {blueprint.essentialFormulas.map((f, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-2xs hover:border-[#059669]/60 transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                              {f.nameKm}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleCopyFormula(f.formula, e)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-[#059669] text-slate-600 dark:text-slate-300 transition cursor-pointer"
                            >
                              {copiedFormulaText === f.formula ? (
                                <>
                                  <Check className="w-3 h-3 text-[#059669]" />
                                  <span className="text-[#059669]">បានចម្លង!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>ចម្លងរូបមន្ត</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 font-mono text-center text-sm text-[#059669] dark:text-emerald-300 overflow-x-auto shadow-2xs">
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {`$${f.formula}$`}
                            </ReactMarkdown>
                          </div>

                          {f.noteKm && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-center gap-1.5">
                              <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              <span>{f.noteKm}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 4: SYLLABUS TOPICS & STRATEGY */}
                  {modalTab === "topics" && (
                    <div className="space-y-4">
                      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-2xs">
                        <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <span>សង្ខេបវិញ្ញាសា និងទម្ងន់ពិន្ទុ</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {activeExam.overviewKm || "វិញ្ញាសាផ្លូវការសម្រាប់បណ្ណសារដ្ឋាន។"}
                        </p>
                      </div>

                      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-2xs">
                        <div className="font-black text-sm text-slate-900 dark:text-white">
                          មេរៀនដែលចេញប្រឡងតាមលំដាប់លំហាត់
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {blueprint.exercises.map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="h-6 w-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black grid place-items-center text-[11px]">
                                  {idx + 1}
                                </span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                  {ex.topicKm}
                                </span>
                              </div>
                              <span className="font-black text-slate-500">
                                {ex.points} ពិន្ទុ
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategic Study Tip */}
                      <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2.5">
                        <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed space-y-1">
                          <span className="font-black block">យុទ្ធសាស្ត្រដណ្តើមនិទ្ទេស A/B ក្នុងវិញ្ញាសានេះ៖</span>
                          <p>
                            ផ្តោតលើលំហាត់ដែលមានទម្ងន់ពិន្ទុខ្ពស់ជាមុន (ដូចជា សិក្សាអនុគមន៍ ធរណីមាត្រក្នុងលំហ ឬលំហាត់សរុបពិន្ទុធំ) 
                            ដើម្បីធានាពិន្ទុមូលដ្ឋានជាប់ ៥០% បន្ទាប់មកដោះស្រាយលំហាត់លំដាប់ពិន្ទុ ១០ ដើម្បីសន្សំពិន្ទុបន្ថែម។
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer Dock (Spacious, Responsive Desktop/Mobile) */}
                <div className="p-4 sm:p-5 border-t border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {activeExam.pdfUrl ? (
                      <a
                        href={activeExam.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs w-full sm:w-auto cursor-pointer"
                      >
                        <ExternalLink className="h-4 w-4 text-[#059669]" />
                        <span>បើកមើល PDF ច្បាប់ដើម</span>
                      </a>
                    ) : (
                      <div className="h-11 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 font-medium text-xs flex items-center justify-center">
                        <span>គ្មាន PDF ក្រៅប្រព័ន្ធ</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleToggleOffline(activeExam)}
                      className={cn(
                        "h-11 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 border cursor-pointer shadow-2xs w-full sm:w-auto",
                        offlineExamIds.includes(activeExam.id)
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                      )}
                    >
                      {offlineExamIds.includes(activeExam.id) ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 text-emerald-600" />
                          <span>បានរក្សាទុក Offline</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 text-slate-500" />
                          <span>រក្សាទុក Offline</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playCorrect();
                      navigate({
                        to: "/tutor",
                        search: {
                          initialPrompt: `សូមជួយពន្យល់ និងបង្រៀនគន្លឹះដោះស្រាយ «${cleanDisplayTitle(activeExam.originalTitleKh)} (${activeExam.titleEn})» ឱ្យបានច្បាស់លាស់។`,
                        },
                      });
                    }}
                    className="w-full sm:w-auto h-11 px-6 rounded-2xl bg-[#059669] hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition active:scale-95"
                  >
                    <Bot className="h-4 w-4" />
                    <span>សួរ Kru Vuth AI ពន្យល់វិញ្ញាសានេះ</span>
                  </button>
                </div>
              </DialogContent>
            );
          })()}
        </Dialog>

        {/* ============================================================ */}
        {/* 12. FILTER & ARCHIVE SETTINGS SHEET                          */}
        {/* ============================================================ */}
        <Drawer open={showFilterSheet} onOpenChange={setShowFilterSheet}>
          <DrawerContent className="max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <DrawerHeader className="p-0 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="font-display text-base font-bold text-slate-900 dark:text-white">
                    តម្រង និងការកំណត់ (Filters)
                  </DrawerTitle>
                  <DrawerDescription className="text-xs text-slate-500 mt-0.5">
                    ចម្រាញ់តាមឆ្នាំប្រឡង និងទម្រង់តម្រៀប
                  </DrawerDescription>
                </div>

                {isAnyFilterActive && (
                  <button
                    type="button"
                    onClick={() => {
                      handleResetFilters();
                    }}
                    className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                  >
                    កំណត់ឡើងវិញ
                  </button>
                )}
              </div>
            </DrawerHeader>

            {/* Year Filter Grid */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ឆ្នាំប្រឡង (Exam Year)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setSelectedYear("all");
                  }}
                  className={cn(
                    "py-2 px-3 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer text-center",
                    selectedYear === "all"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  )}
                >
                  គ្រប់ឆ្នាំ
                </button>
                {Object.keys(yearCounts.counts)
                  .map(Number)
                  .sort((a, b) => b - a)
                  .map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setSelectedYear(yr);
                      }}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer text-center",
                        selectedYear === yr
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                      )}
                    >
                      ឆ្នាំ {yr}
                    </button>
                  ))}
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                តម្រៀបតាម (Sort Order)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "newest", label: "ថ្មីបំផុត" },
                  { id: "oldest", label: "ចាស់បំផុត" },
                  { id: "title", label: "តាមឈ្មោះ" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSortOrder(s.id as SortOrder);
                    }}
                    className={cn(
                      "py-2 px-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer text-center",
                      sortOrder === s.id
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Community */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => setShowFilterSheet(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center hover:bg-emerald-700 transition active:scale-95 cursor-pointer shadow-xs"
              >
                អនុវត្ត និងបិទ (Apply Filters)
              </button>

              <a
                href="/archive/cambodia_historical_exams_2011_2026.csv"
                download="cambodia_historical_exams_2011_2026.csv"
                onClick={() => sounds.playPop()}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-emerald-600 transition"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <span>ទាញយកទិន្នន័យ CSV (2011–2026)</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowFilterSheet(false);
                  setShowContributeModal(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UploadCloud className="h-4 w-4 text-emerald-600" />
                  <span>ចូលរួមចែករំលែកវិញ្ញាសាច្បាប់ដើម</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </DrawerContent>
        </Drawer>

        {/* ============================================================ */}
        {/* 13. COMMUNITY CONTRIBUTE SCAN DIALOG                         */}
        {/* ============================================================ */}
        <Dialog open={showContributeModal} onOpenChange={setShowContributeModal}>
          <DialogContent className="max-w-md w-[92%] rounded-3xl bg-white dark:bg-slate-900 p-5 space-y-4">
            <DialogHeader className="p-0 text-left">
              <DialogTitle className="font-display text-base font-bold text-[#111827] dark:text-white">
                ចូលរួមចែករំលែកវិញ្ញាសាប្រឡងចាស់ៗ
              </DialogTitle>
              <DialogDescription className="text-xs text-[#64748B] mt-1">
                ជួយសិស្សានុសិស្សកម្ពុជាជំនាន់ក្រោយ ក្នុងការស្វែងរក និងស្រាវជ្រាវវិញ្ញាសាពីឆ្នាំ ២០១២ ដល់បច្ចុប្បន្ន
              </DialogDescription>
            </DialogHeader>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E5EAF0] dark:border-slate-700 space-y-2 text-xs text-[#64748B] dark:text-slate-300">
              <p className="font-semibold text-[#111827] dark:text-white">
                លក្ខខណ្ឌឯកសារដែលត្រូវផ្ទៀងផ្ទាត់៖
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>ជាវិញ្ញាសាផ្លូវការ ឬសន្លឹកកិច្ចការប្រឡងដើមរបស់ក្រសួងអប់រំ (MoEYS)។</li>
                <li>មានបញ្ជាក់ច្បាស់នូវសម័យប្រឡង ឆ្នាំ និងកាលបរិច្ឆេទជាក់ស្តែង។</li>
                <li>រូបថត ឬ File PDF ត្រូវមានគុណភាពច្បាស់ អាចអានអក្សរ និងរូបមន្តបាន។</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-[#64748B]">
                លោកគ្រូ អ្នកគ្រូ ឬសិស្សានុសិស្សដែលមានឯកសារច្បាប់ដើម អាចផ្ញើមកកាន់ក្រុមការងារ ScienceKH តាមរយៈ៖
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://t.me/sciencekh_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#0088cc] text-white text-xs font-bold text-center hover:opacity-90 transition"
                >
                  Telegram: @sciencekh_support
                </a>
                <a
                  href="mailto:archive@sciencekh.edu.kh"
                  className="flex-1 py-2.5 rounded-xl border border-[#E5EAF0] dark:border-slate-700 text-[#111827] dark:text-white text-xs font-bold text-center hover:border-[#059669] transition"
                >
                  archive@sciencekh.edu.kh
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
