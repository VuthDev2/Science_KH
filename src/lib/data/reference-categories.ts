// ==============================================================================
// ScienceKH — Study Reference Library Dynamic Category Configuration
// Aligned with Cambodian MoEYS National Curriculum Standards (Grades 7 to 12)
// Provides tailored knowledge categories per subject and dynamic grade availability.
// ==============================================================================

import type { ReferenceType, StreamApplicability } from "@/types/reference-library";
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  BookOpen,
  Languages,
  Landmark,
  Laptop,
  Scale,
  Compass,
  FileCode,
  Sparkles,
  Layers,
  LucideIcon,
} from "lucide-react";

export interface SubjectCategoryDef {
  id: string;
  nameKm: string;
  nameEn: string;
  referenceTypes: ReferenceType[];
}

export interface SubjectCatalogEntry {
  slug: string;
  nameKm: string;
  nameEn: string;
  icon: LucideIcon;
  minGrade: number;
  maxGrade: number;
  applicableStreams?: StreamApplicability[];
  descriptionKm: string;
  descriptionEn: string;
}

/**
 * Official MoEYS Subjects Catalog across Grades 7 to 12
 */
export const MOEYS_REFERENCE_SUBJECTS: SubjectCatalogEntry[] = [
  {
    slug: "mathematics",
    nameKm: "គណិតវិទ្យា",
    nameEn: "Mathematics",
    icon: Calculator,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science", "social_science"],
    descriptionKm: "រូបមន្ត និមិត្តសញ្ញា ទ្រឹស្តីបទ វិធានពីជគណិត និងធរណីមាត្រ",
    descriptionEn: "Formulas, symbols, theorems, algebra, and geometry references",
  },
  {
    slug: "physics",
    nameKm: "រូបវិទ្យា",
    nameEn: "Physics",
    icon: Atom,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science"],
    descriptionKm: "ខ្នាត SI សមីការចលនា ច្បាប់រូបវិទ្យា ប៉ោល រលក និងអគ្គិសនី",
    descriptionEn: "SI units, motion equations, physical laws, oscillations, and circuits",
  },
  {
    slug: "chemistry",
    nameKm: "គីមីវិទ្យា",
    nameEn: "Chemistry",
    icon: FlaskConical,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science"],
    descriptionKm: "ធាតុគីមី វ៉ាឡង់ សមីការគីមី លំនឹង អាស៊ីត-បាស និងគីមីសរីរាង្គ",
    descriptionEn: "Chemical elements, valencies, equations, equilibrium, acids-bases, and organics",
  },
  {
    slug: "biology",
    nameKm: "ជីវវិទ្យា",
    nameEn: "Biology",
    icon: Dna,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science"],
    descriptionKm: "កោសិកា សរីរាង្គមនុស្ស តំណពូជ ហ្សែន DNA និងរស្មីសំយោគ",
    descriptionEn: "Cells, human anatomy, genetics, DNA structure, and photosynthesis",
  },
  {
    slug: "earth",
    nameKm: "ផែនដីវិទ្យា",
    nameEn: "Earth Science",
    icon: Globe,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science", "social_science"],
    descriptionKm: "ស្រទាប់ផែនដី បន្ទះតិចតូនិក វដ្តទឹក អាកាសធាតុ និងតារាសាស្ត្រ",
    descriptionEn: "Earth strata, plate tectonics, water cycle, climate, and astronomy",
  },
  {
    slug: "khmer",
    nameKm: "ភាសាខ្មែរ",
    nameEn: "Khmer Literature",
    icon: BookOpen,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science", "social_science"],
    descriptionKm: "វេយ្យាករណ៍ខ្មែរ កាព្យឃ្លោង ក្បួនតែងសេចក្តី និងអក្សរសិល្ប៍",
    descriptionEn: "Khmer grammar rules, poetic meters, essay structures, and literature",
  },
  {
    slug: "history",
    nameKm: "ប្រវត្តិវិទ្យា",
    nameEn: "History",
    icon: Landmark,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "social_science"],
    descriptionKm: "ព្រឹត្តិការណ៍ប្រវត្តិសាស្ត្រ កាលបរិច្ឆេទ នគរភ្នំ ចេនឡា និងសម័យអង្គរ",
    descriptionEn: "Historical milestones, timelines, Funan, Chenla, and Angkorian eras",
  },
  {
    slug: "geography",
    nameKm: "ភូមិវិទ្យា",
    nameEn: "Geography",
    icon: Compass,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "social_science"],
    descriptionKm: "ផែនទី និយាមកា ភូមិសាស្ត្រកម្ពុជា ធនធាន និងសេដ្ឋកិច្ចតំបន់",
    descriptionEn: "Map symbols, coordinates, topography, climate, and economic geography",
  },
  {
    slug: "english",
    nameKm: "ភាសាអង់គ្លេស",
    nameEn: "English",
    icon: Languages,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science", "social_science"],
    descriptionKm: "វេយ្យាករណ៍ កាល (Tenses) គំរូល្បះ និងវាក្យសព្ទសិក្សា",
    descriptionEn: "English grammar, verb tenses, sentence patterns, and vocabulary",
  },
  {
    slug: "ict",
    nameKm: "ព័ត៌មានវិទ្យា (ICT)",
    nameEn: "ICT & Computing",
    icon: Laptop,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "science", "social_science"],
    descriptionKm: "ផ្នែករឹង ប្រព័ន្ធប្រតិបត្តិការ កូដគ្រឹះ និងសុវត្ថិភាពឌីជីថល",
    descriptionEn: "Hardware components, operating systems, coding concepts, and cybersecurity",
  },
  {
    slug: "morality",
    nameKm: "សីលធម៌-ពលរដ្ឋ",
    nameEn: "Moral & Civics",
    icon: Scale,
    minGrade: 7,
    maxGrade: 12,
    applicableStreams: ["all", "social_science"],
    descriptionKm: "សីលធម៌សង្គម សិទ្ធិកុមារ រដ្ឋធម្មនុញ្ញ និងនីតិរដ្ឋ",
    descriptionEn: "Social ethics, child rights, constitutional principles, and civic duty",
  },
];

/**
 * Dynamic Knowledge Categories mapped to each specific academic discipline
 */
export const SUBJECT_CATEGORY_MAP: Record<string, SubjectCategoryDef[]> = {
  mathematics: [
    {
      id: "concepts",
      nameKm: "មូលដ្ឋានគ្រឹះ & សញ្ញាណ",
      nameEn: "Basics & Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "symbols",
      nameKm: "និមិត្តសញ្ញាគណិត",
      nameEn: "Mathematical Symbols",
      referenceTypes: ["symbol"],
    },
    {
      id: "formulas",
      nameKm: "រូបមន្ត & សមីការ",
      nameEn: "Formulas & Equations",
      referenceTypes: ["formula", "equation"],
    },
    {
      id: "theorems",
      nameKm: "ទ្រឹស្តីបទ",
      nameEn: "Theorems",
      referenceTypes: ["theorem"],
    },
    {
      id: "rules",
      nameKm: "វិធាន & លក្ខណៈ",
      nameEn: "Rules & Properties",
      referenceTypes: ["rule"],
    },
    {
      id: "methods",
      nameKm: "វិធីសាស្ត្រគណិត",
      nameEn: "Mathematical Methods",
      referenceTypes: ["procedure"],
    },
  ],
  physics: [
    {
      id: "concepts",
      nameKm: "សញ្ញាណគ្រឹះ",
      nameEn: "Basic Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "symbols",
      nameKm: "និមិត្តសញ្ញារូបវិទ្យា",
      nameEn: "Physical Symbols",
      referenceTypes: ["symbol"],
    },
    {
      id: "units",
      nameKm: "ខ្នាតអន្តរជាតិ SI",
      nameEn: "SI Units & Measures",
      referenceTypes: ["unit_measurement"],
    },
    {
      id: "formulas",
      nameKm: "រូបមន្ត & សមីការចលនា",
      nameEn: "Formulas & Equations",
      referenceTypes: ["formula", "equation"],
    },
    {
      id: "laws",
      nameKm: "ច្បាប់ & គោលការណ៍",
      nameEn: "Laws & Principles",
      referenceTypes: ["law_principle", "rule"],
    },
  ],
  chemistry: [
    {
      id: "concepts",
      nameKm: "សញ្ញាណគ្រឹះ",
      nameEn: "Basic Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "elements",
      nameKm: "ធាតុគីមី & តារាងខួប",
      nameEn: "Chemical Elements",
      referenceTypes: ["chemical_element"],
    },
    {
      id: "symbols",
      nameKm: "និមិត្តសញ្ញា & វ៉ាឡង់",
      nameEn: "Chemical Symbols",
      referenceTypes: ["symbol"],
    },
    {
      id: "formulas",
      nameKm: "រូបមន្ត & សមាសធាតុ",
      nameEn: "Chemical Formulas",
      referenceTypes: ["chemical_formula", "formula"],
    },
    {
      id: "equations",
      nameKm: "សមីការ & ប្រតិកម្ម",
      nameEn: "Equations & Reactions",
      referenceTypes: ["equation", "law_principle"],
    },
  ],
  biology: [
    {
      id: "concepts",
      nameKm: "សញ្ញាណគ្រឹះ",
      nameEn: "Basic Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "terms",
      nameKm: "វាក្យសព្ទជីវវិទ្យា",
      nameEn: "Biological Terms",
      referenceTypes: ["vocabulary", "definition"],
    },
    {
      id: "structures",
      nameKm: "រចនាសម្ព័ន្ធ & កោសិកា",
      nameEn: "Structures & Cells",
      referenceTypes: ["diagram", "concept"],
    },
    {
      id: "processes",
      nameKm: "មុខងារ & ដំណើរជីវិត",
      nameEn: "Functions & Processes",
      referenceTypes: ["procedure", "rule"],
    },
    {
      id: "classifications",
      nameKm: "ចំណាត់ថ្នាក់ភាវៈរស់",
      nameEn: "Classifications",
      referenceTypes: ["classification", "table"],
    },
    {
      id: "genetics",
      nameKm: "រូបមន្តហ្សែន & DNA",
      nameEn: "Genetics & DNA Formulas",
      referenceTypes: ["formula", "equation"],
    },
  ],
  khmer: [
    {
      id: "grammar",
      nameKm: "ក្បួនវេយ្យាករណ៍",
      nameEn: "Grammar Rules",
      referenceTypes: ["grammar_rule", "rule"],
    },
    {
      id: "vocabulary",
      nameKm: "វាក្យសព្ទ & ថ្នាក់ពាក្យ",
      nameEn: "Vocabulary & Word Classes",
      referenceTypes: ["vocabulary", "definition"],
    },
    {
      id: "literature",
      nameKm: "ពាក្យអក្សរសិល្ប៍",
      nameEn: "Literary Terms",
      referenceTypes: ["concept"],
    },
    {
      id: "writing",
      nameKm: "ក្បួនតែងសេចក្តី",
      nameEn: "Writing Structures",
      referenceTypes: ["procedure"],
    },
  ],
  history: [
    {
      id: "events",
      nameKm: "ព្រឹត្តិការណ៍ប្រវត្តិសាស្ត្រ",
      nameEn: "Historical Events",
      referenceTypes: ["historical_event"],
    },
    {
      id: "timelines",
      nameKm: "កាលបរិច្ឆេទ & ខ្សែបន្ទាត់ពេល",
      nameEn: "Dates & Timelines",
      referenceTypes: ["date_timeline"],
    },
    {
      id: "figures",
      nameKm: "ឥស្សរជនប្រវត្តិសាស្ត្រ",
      nameEn: "Historical Figures",
      referenceTypes: ["concept"],
    },
    {
      id: "periods",
      nameKm: "សម័យកាល & អាណាចក្រ",
      nameEn: "Historical Periods",
      referenceTypes: ["classification", "definition"],
    },
  ],
  geography: [
    {
      id: "symbols",
      nameKm: "សញ្ញាសម្គាល់ផែនទី",
      nameEn: "Map Symbols",
      referenceTypes: ["symbol", "diagram"],
    },
    {
      id: "concepts",
      nameKm: "សញ្ញាណភូមិវិទ្យា",
      nameEn: "Geographical Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "coordinates",
      nameKm: "និយាមកា & មាត្រដ្ឋាន",
      nameEn: "Coordinates & Scales",
      referenceTypes: ["rule", "formula"],
    },
    {
      id: "climate",
      nameKm: "អាកាសធាតុ & បរិស្ថាន",
      nameEn: "Climate & Environment",
      referenceTypes: ["table", "concept"],
    },
  ],
  english: [
    {
      id: "grammar",
      nameKm: "Grammar Rules",
      nameEn: "Grammar",
      referenceTypes: ["grammar_rule", "rule"],
    },
    {
      id: "vocabulary",
      nameKm: "Vocabulary & Expressions",
      nameEn: "Vocabulary",
      referenceTypes: ["vocabulary", "definition"],
    },
    {
      id: "tenses",
      nameKm: "Verb Tenses",
      nameEn: "Tenses",
      referenceTypes: ["rule", "concept"],
    },
    {
      id: "patterns",
      nameKm: "Sentence Patterns",
      nameEn: "Sentence Structures",
      referenceTypes: ["procedure"],
    },
  ],
  ict: [
    {
      id: "terms",
      nameKm: "វាក្យសព្ទបច្ចេកទេស",
      nameEn: "Terminology",
      referenceTypes: ["vocabulary", "definition"],
    },
    {
      id: "hardware",
      nameKm: "ផ្នែករឹង & ឧបករណ៍",
      nameEn: "Hardware Components",
      referenceTypes: ["concept", "diagram"],
    },
    {
      id: "software",
      nameKm: "ផ្នែកទន់ & កូដគ្រឹះ",
      nameEn: "Software & Coding",
      referenceTypes: ["procedure", "rule"],
    },
    {
      id: "shortcuts",
      nameKm: "ផ្លូវកាត់ក្តារចុច",
      nameEn: "Keyboard Shortcuts",
      referenceTypes: ["table"],
    },
  ],
  morality: [
    {
      id: "concepts",
      nameKm: "សញ្ញាណសីលធម៌",
      nameEn: "Moral Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "rights",
      nameKm: "សិទ្ធិ & កាតព្វកិច្ច",
      nameEn: "Rights & Duties",
      referenceTypes: ["rule", "law_principle"],
    },
    {
      id: "civics",
      nameKm: "រដ្ឋធម្មនុញ្ញ & ស្ថាប័ន",
      nameEn: "Constitutional Civics",
      referenceTypes: ["classification"],
    },
  ],
  earth: [
    {
      id: "concepts",
      nameKm: "សញ្ញាណភូគព្ភសាស្ត្រ",
      nameEn: "Geological Concepts",
      referenceTypes: ["concept", "definition"],
    },
    {
      id: "cycles",
      nameKm: "វដ្តធម្មជាតិ & បរិយាកាស",
      nameEn: "Natural Cycles",
      referenceTypes: ["procedure", "diagram"],
    },
    {
      id: "rocks",
      nameKm: "ថ្ម រ៉ែ និងស្រទាប់ផែនដី",
      nameEn: "Rocks, Minerals & Strata",
      referenceTypes: ["classification", "table"],
    },
  ],
};

/**
 * Filter available subjects for a specific grade and optional academic stream
 */
export function getSubjectsForGrade(
  grade: number,
  stream: StreamApplicability = "all"
): SubjectCatalogEntry[] {
  return MOEYS_REFERENCE_SUBJECTS.filter((subject) => {
    if (grade < subject.minGrade || grade > subject.maxGrade) return false;
    if (grade >= 11 && stream !== "all") {
      if (subject.applicableStreams && !subject.applicableStreams.includes("all") && !subject.applicableStreams.includes(stream)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Retrieve dynamic categories for a subject, with fallback to standard categories
 */
export function getCategoriesForSubject(subjectSlug: string): SubjectCategoryDef[] {
  return SUBJECT_CATEGORY_MAP[subjectSlug] || [
    {
      id: "all_general",
      nameKm: "ចំណេះដឹងទូទៅ",
      nameEn: "General Knowledge",
      referenceTypes: ["concept", "definition"],
    },
  ];
}
