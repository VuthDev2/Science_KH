export type SubjectSlug =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "khmer"
  | "english"
  | "ict"
  | "history"
  | "geography";

export interface SubjectInfo {
  id: SubjectSlug;
  titleKm: string;
  titleEn: string;
  icon: string;
  color: string;
  category: "stem" | "language" | "tech" | "social";
  unitsCount: number;
}

export const SUBJECTS: SubjectInfo[] = [
  {
    id: "mathematics",
    titleKm: "គណិតវិទ្យា",
    titleEn: "Mathematics",
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    category: "stem",
    unitsCount: 16,
  },
  {
    id: "physics",
    titleKm: "រូបវិទ្យា",
    titleEn: "Physics",
    icon: "Atom",
    color: "from-blue-500 to-indigo-600",
    category: "stem",
    unitsCount: 14,
  },
  {
    id: "chemistry",
    titleKm: "គីមីវិទ្យា",
    titleEn: "Chemistry",
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-600",
    category: "stem",
    unitsCount: 12,
  },
  {
    id: "biology",
    titleKm: "ជីវវិទ្យា",
    titleEn: "Biology",
    icon: "Dna",
    color: "from-green-500 to-emerald-700",
    category: "stem",
    unitsCount: 12,
  },
  {
    id: "earth",
    titleKm: "ផែនដី និងបរិស្ថានវិទ្យា",
    titleEn: "Earth & Environmental Science",
    icon: "Globe2",
    color: "from-cyan-500 to-blue-600",
    category: "stem",
    unitsCount: 10,
  },
  {
    id: "khmer",
    titleKm: "ភាសាខ្មែរ និងអក្សរសាស្ត្រ",
    titleEn: "Khmer Literature",
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    category: "language",
    unitsCount: 15,
  },
  {
    id: "english",
    titleKm: "ភាសាអង់គ្លេស",
    titleEn: "English",
    icon: "Languages",
    color: "from-purple-500 to-violet-600",
    category: "language",
    unitsCount: 14,
  },
  {
    id: "ict",
    titleKm: "ព័ត៌មានវិទ្យា",
    titleEn: "ICT & Computing",
    icon: "Laptop",
    color: "from-sky-500 to-indigo-600",
    category: "tech",
    unitsCount: 10,
  },
  {
    id: "history",
    titleKm: "ប្រវត្តិវិទ្យា",
    titleEn: "History",
    icon: "Landmark",
    color: "from-amber-600 to-yellow-700",
    category: "social",
    unitsCount: 10,
  },
  {
    id: "geography",
    titleKm: "ភូមិវិទ្យា",
    titleEn: "Geography",
    icon: "Compass",
    color: "from-teal-600 to-emerald-700",
    category: "social",
    unitsCount: 10,
  },
];

const ALL_SUBJECT_SLUGS: SubjectSlug[] = [
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "earth",
  "khmer",
  "english",
  "ict",
  "history",
  "geography",
];

export const GRADES_CATALOG = [
  {
    grade: 7,
    level: "junior_high",
    titleKm: "ថ្នាក់ទី ៧ (អនុវិទ្យាល័យ)",
    titleEn: "Grade 7 (Junior High)",
    descriptionKm: "គ្រឹះវិទ្យាសាស្ត្រ គណិតវិទ្យា ភាសា និងសង្គមវិជ្ជាតាមកម្មវិធី MoEYS",
    descriptionEn: "Foundational STEM, Mathematics, Languages, and Social Studies aligned with MoEYS",
    subjects: ALL_SUBJECT_SLUGS,
  },
  {
    grade: 8,
    level: "junior_high",
    titleKm: "ថ្នាក់ទី ៨ (អនុវិទ្យាល័យ)",
    titleEn: "Grade 8 (Junior High)",
    descriptionKm: "ពង្រីកចំណេះដឹងវិទ្យាសាស្ត្រ ការគណនាពិជគណិត និងភាសា",
    descriptionEn: "Deepening science concepts, algebraic reasoning, literature, and ICT",
    subjects: ALL_SUBJECT_SLUGS,
  },
  {
    grade: 9,
    level: "junior_high",
    titleKm: "ថ្នាក់ទី ៩ (ត្រៀមប្រឡងឌីប្លូម Brevet)",
    titleEn: "Grade 9 (National Brevet Diploma)",
    descriptionKm: "ត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម MoEYS) គ្រប់មុខវិជ្ជា",
    descriptionEn: "Comprehensive Brevet Diploma prep across all MoEYS examination subjects",
    subjects: ALL_SUBJECT_SLUGS,
  },
  {
    grade: 10,
    level: "senior_high",
    titleKm: "ថ្នាក់ទី ១០ (វិទ្យាល័យ)",
    titleEn: "Grade 10 (Senior High)",
    descriptionKm: "ត្រៀមគ្រឹះថ្នាក់វិទ្យាសាស្ត្រពិត និងសង្គម សម្រាប់ការសិក្សាកម្រិតខ្ពស់",
    descriptionEn: "Transition to upper secondary curricula with rigorous STEM and humanities modules",
    subjects: ALL_SUBJECT_SLUGS,
  },
  {
    grade: 11,
    level: "senior_high",
    titleKm: "ថ្នាក់ទី ១១ (វិទ្យាល័យ)",
    titleEn: "Grade 11 (Senior High)",
    descriptionKm: "អគ្គិសនី គីមីសរីរាង្គ ពន្ធុវិទ្យា អក្សរសាស្ត្រ និងប្រវត្តិសាស្ត្រទំនើប",
    descriptionEn: "Advanced sciences, modern history, literature, and analytical problem-solving",
    subjects: ALL_SUBJECT_SLUGS,
  },
  {
    grade: 12,
    level: "senior_high",
    titleKm: "ថ្នាក់ទី ១២ (ត្រៀមប្រឡងបាក់ឌុប BacII)",
    titleEn: "Grade 12 (National BacII Exam)",
    descriptionKm: "ត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប MoEYS) ជាមួយវិញ្ញាសាផ្លូវការ",
    descriptionEn: "Intensive BacII National Exam prep with MoEYS past papers across all subjects",
    subjects: ALL_SUBJECT_SLUGS,
  },
];
