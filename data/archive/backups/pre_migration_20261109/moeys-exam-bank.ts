// ==============================================================================
// ScienceKH — Historical National Examination Archive Bank (2012 to Present)
// Official MoEYS Cambodia Examination Archive with Worked Solutions & Rubrics
// Categories: BAC II (បាក់ឌុប) & OUTSTANDING STUDENTS EXAM (ប្រឡងសិស្សពូកែ)
// Spans 2012 through current year with future-year extensibility
// ==============================================================================

export type ExamCategory = "bacii" | "outstanding_student";
export type ExamLevel = 9 | 12;
export type ResourceType = ExamResourceType;
export type ExamStream = "science" | "social" | "both";
export type ExamSubject =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "khmer"
  | "english"
  | "history"
  | "geography";

export type CompetitionStage = "national" | "provincial" | "school_selection";

export type ExamResourceType =
  | "single_exam"               // វិញ្ញាសាប្រឡងទោលប្រចាំឆ្នាំ (Single Year Exam)
  | "multi_year_compilation"    // កម្រងវិញ្ញាសាច្រើនឆ្នាំ (Multi-Year Compilation Book)
  | "official_solution_book"    // សៀវភៅអត្រាកំណែផ្លូវការ (Official Marking Book)
  | "official_national_exam"    // វិញ្ញាសាប្រឡងជាតិផ្លូវការ (MoEYS Official Exam)
  | "official_practice_paper"   // វិញ្ញាសាត្រៀម & ស្វ័យសិក្សា (MoEYS Practice Paper)
  | "curriculum_reference";     // ឯកសារជំនួយស្មារតី (Curriculum Reference)

export type SourcePlatform =
  | "moeys_official"            // ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS Official Archive)
  | "sala_moeys"                // ថ្នាលសាលាឌីជីថល MoEYS (sala.moeys.gov.kh)
  | "ptec_library"              // បណ្ណាល័យវិទ្យាស្ថានគរុកោសល្យ PTEC
  | "khmer_bac_ii_archive"      // បណ្ណាសារប្រវត្តិសាស្ត្រ Khmer Bac II
  | "open_edu";                 // ការអប់រំបើកទូលាយ

export const HISTORICAL_YEARS_TIMELINE = [
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012
] as const;

export interface ExamQuestion {
  questionNumber: number;
  points: number | null;
  titleKm: string;
  titleEn: string;
  problemTextKm: string;
  problemTextEn: string;
  officialSolutionKm: string | null;
  officialSolutionEn: string | null;
  scoringCriteriaKm: string[];
  keyFormulas: string[];
}

export interface HistoricalExamPaper {
  id: string;
  examCategory: ExamCategory;             // "bacii" | "outstanding_student"
  examYear: number | null;                // Actual exam session year (e.g. 2024, 2017)
  examSessionYear?: number | null;        // Compatibility alias for examYear
  year?: number;                          // Backward compatible year
  coverageStartYear?: number | null;      // For multi-year books (e.g. 2014)
  coverageEndYear?: number | null;        // For multi-year books (e.g. 2020)
  grade?: 9 | 12 | null;                  // 12 for Bac II, 9 or 12 for Outstanding Students
  level?: 9 | 12;                         // Compatibility alias for grade
  stream?: ExamStream | null;             // "science" | "social" for Bac II, null for Outstanding
  subject: ExamSubject;
  competitionStage?: CompetitionStage | null; // "national" | "provincial" for Outstanding Students
  resourceType: ExamResourceType;
  originalTitleKh: string;
  titleKm: string;                        // Backward compatible alias
  titleEn: string;
  author: string | null;
  publisher: string | null;
  issuingOrganization?: string | null;
  sourcePlatform: SourcePlatform;
  publicationYear?: number | null;
  language?: "km" | "en" | "bilingual";
  pdfUrl?: string | null;
  answerKeyUrl?: string | null;
  sourceUrl?: string | null;
  salaReferenceId?: string | null;
  hasOfficialAnswerKey: boolean;
  durationMinutes?: number | null;
  totalMarks?: number | null;
  coefficient?: number | null;
  questionCount?: number;
  sessionDateKm?: string | null;
  sessionDateEn?: string | null;
  topicsKm: string[];
  topicsEn: string[];
  overviewKm: string;
  overviewEn: string;
  essentialFormulaSheet: {
    nameKm: string;
    nameEn: string;
    formula: string;
    noteKm?: string;
  }[];
  questions: ExamQuestion[];
}

// Full compatibility alias
export type OfficialExamPaper = HistoricalExamPaper;

export const MOEYS_EXAM_ARCHIVE: OfficialExamPaper[] = [
  // ============================================================================
  // 1. BACII 2024 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00002191",
    salaReferenceId: "00002191",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2024 BacII Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 5,
    topicsKm: [
      "ចំនួនកុំផ្លិច",
      "ប្រូបាប",
      "ធរណីមាត្រក្នុងលំហ",
      "អាំងតេក្រាល & សមីការឌីផេរ៉ង់ស្យែល",
      "សិក្សាអនុគមន៍អិចស្ប៉ូណង់ស្យែល",
    ],
    topicsEn: [
      "Complex Numbers",
      "Probability",
      "Space Geometry",
      "Calculus & Differential Equations",
      "Exponential Functions",
    ],
    overviewKm:
      "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ រួមមាន ៥ លំហាត់ធំៗ គ្របដណ្តប់លើចំនួនកុំផ្លិច ប្រូបាប ធរណីមាត្រក្នុងលំហ សមីការឌីផេរ៉ង់ស្យែល និងការសិក្សាអនុគមន៍អិចស្ប៉ូណង់ស្យែល។",
    overviewEn:
      "Official Science Stream Mathematics paper featuring 5 core problems covering complex numbers, probability, 3D vector geometry, differential equations, and exponential function graphing.",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្តដឺម័រ (De Moivre)",
        nameEn: "De Moivre's Theorem",
        formula: "(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)",
        noteKm: "ប្រើសម្រាប់គណនាស្វ័យគុណខ្ពស់នៃចំនួនកុំផ្លិច",
      },
      {
        nameKm: "អាំងតេក្រាលដោយផ្នែក",
        nameEn: "Integration by Parts",
        formula: "\\int u\\,dv = uv - \\int v\\,du",
        noteKm: "ជ្រើសរើស u តាមលំដាប់លំដោយ (L-I-A-T-E)",
      },
      {
        nameKm: "សមីការប្លង់កាត់តាមចំណុច A",
        nameEn: "Plane Equation from Normal",
        formula: "a(x - x_0) + b(y - y_0) + c(z - z_0) = 0",
        noteKm: "\\vec{n} = (a, b, c) ជាវ៉ិចទ័រណរម៉ាល់នៃប្លង់",
      },
      {
        nameKm: "ចម្ងាយពីចំណុច M ទៅប្លង់ (P)",
        nameEn: "Point-to-Plane Distance",
        formula: "d(M, P) = \\frac{|ax_M + by_M + cz_M + d|}{\\sqrt{a^2 + b^2 + c^2}}",
        noteKm: "គណនាចម្ងាយកែងពីចំណុចទៅប្លង់ក្នុងលំហ",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 10,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច (Complex Numbers)",
        titleEn: "Problem 1: Complex Numbers & Argument",
        problemTextKm:
          "គេឱ្យចំនួនកុំផ្លិច $z_1 = 1 + i\\sqrt{3}$ និង $z_2 = 1 - i$។\nក. ចូរសរសេរ $z_1$ និង $z_2$ ជាទម្រង់ត្រីកោណមាត្រ។\nខ. គណនាផលធៀប $Z = \\frac{z_1}{z_2}$ ជាទម្រង់ពីជគណិត និងជាទម្រង់ត្រីកោណមាត្រ។\nគ. ទាញរកតម្លៃពិតប្រាកដនៃ $\\cos\\frac{7\\pi}{12}$ និង $\\sin\\frac{7\\pi}{12}$។",
        problemTextEn:
          "Given complex numbers $z_1 = 1 + i\\sqrt{3}$ and $z_2 = 1 - i$.\na. Express $z_1$ and $z_2$ in trigonometric form.\nb. Compute quotient $Z = \\frac{z_1}{z_2}$ in both algebraic and trigonometric forms.\nc. Deduce exact values of $\\cos\\frac{7\\pi}{12}$ and $\\sin\\frac{7\\pi}{12}$.",
        officialSolutionKm:
          "ក. ទម្រង់ត្រីកោណមាត្រ៖\n- $|z_1| = \\sqrt{1^2 + (\\sqrt{3})^2} = 2$, $\\theta_1 = \\frac{\\pi}{3}$ ⇒ $z_1 = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$។\n- $|z_2| = \\sqrt{1^2 + (-1)^2} = \\sqrt{2}$, $\\theta_2 = -\\frac{\\pi}{4}$ ⇒ $z_2 = \\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{4}\\right) + i\\sin\\left(-\\frac{\\pi}{4}\\right)\\right)$។\n\nខ. ផលធៀប $Z$៖\n- ទម្រង់ត្រីកោណមាត្រ៖ $Z = \\sqrt{2}\\left(\\cos\\frac{7\\pi}{12} + i\\sin\\frac{7\\pi}{12}\\right)$។\n- ទម្រង់ពីជគណិត៖ $Z = \\frac{1 + i\\sqrt{3}}{1 - i} = \\frac{(1 - \\sqrt{3}) + i(1 + \\sqrt{3})}{2}$។\n\nគ. ទាញរកតម្លៃ៖\n$\\cos\\frac{7\\pi}{12} = \\frac{\\sqrt{2} - \\sqrt{6}}{4}$ និង $\\sin\\frac{7\\pi}{12} = \\frac{\\sqrt{2} + \\sqrt{6}}{4}$។",
        officialSolutionEn:
          "a. Polar forms: $z_1 = 2(\\cos(\\pi/3) + i\\sin(\\pi/3))$, $z_2 = \\sqrt{2}(\\cos(-\\pi/4) + i\\sin(-\\pi/4))$.\nb. Quotient $Z = \\sqrt{2}(\\cos(7\\pi/12) + i\\sin(7\\pi/12))$.\nc. Exact values: $\\cos(7\\pi/12) = \\frac{\\sqrt{2}-\\sqrt{6}}{4}$, $\\sin(7\\pi/12) = \\frac{\\sqrt{2}+\\sqrt{6}}{4}$.",
        scoringCriteriaKm: [
          "រកម៉ូឌុល និងអាគុយម៉ង់ z1, z2 ត្រឹមត្រូវ៖ ២.៥ ពិន្ទុ",
          "សរសេរ Z ជាទម្រង់ត្រីកោណមាត្រ និងពីជគណិត៖ ៤.០ ពិន្ទុ",
          "ផ្ទឹមទាញតម្លៃ cos(7π/12) និង sin(7π/12)៖ ៣.៥ ពិន្ទុ",
        ],
        keyFormulas: [
          "|z| = \\sqrt{a^2 + b^2}",
          "\\frac{z_1}{z_2} = \\frac{r_1}{r_2}[\\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2)]",
        ],
      },
      {
        questionNumber: 2,
        points: 10,
        titleKm: "លំហាត់ទី ២៖ ប្រូបាប និងបន្សំ",
        titleEn: "Problem 2: Probability & Combinations",
        problemTextKm:
          "ក្នុងប្រអប់មួយមានបាល់ ១០ គ្រាប់ ក្នុងនោះមានបាល់ក្រហម ៤ គ្រាប់ និងបាល់ស ៦ គ្រាប់។ គេចាប់យកបាល់ ៣ គ្រាប់ព្រមគ្នាដោយចៃដន្យ។\nក. គណនាចំនួនករណីអាចទាំងអស់ $n(S)$។\nខ. គណនាប្រូបាបនៃព្រឹត្តិការណ៍ A៖ 'ចាប់បានបាល់ពណ៌ដូចគ្នាទាំង ៣ គ្រាប់'។\nគ. គណនាប្រូបាបនៃព្រឹត្តិការណ៍ B៖ 'ចាប់បានបាល់ពណ៌សយ៉ាងតិច ១ គ្រាប់'។",
        problemTextEn:
          "An urn contains 10 balls (4 red, 6 white). Three balls are drawn simultaneously at random.\na. Find sample space size $n(S)$.\nb. Probability of event A: 'All 3 balls have the same color'.\nc. Probability of event B: 'At least 1 ball is white'.",
        officialSolutionKm:
          "ក. ចំនួនករណីអាច៖\n$n(S) = C(10, 3) = \\frac{10!}{3!7!} = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$ ករណី។\n\nខ. ប្រូបាបព្រឹត្តិការណ៍ A៖\n$n(A) = C(4, 3) + C(6, 3) = 4 + 20 = 24$ ករណី។\n$P(A) = \\frac{n(A)}{n(S)} = \\frac{24}{120} = \\frac{1}{5} = 0.20$។\n\nគ. ប្រូបាបព្រឹត្តិការណ៍ B៖\nព្រឹត្តិការណ៍បដិសេធ $\\bar{B}$៖ 'ចាប់បានបាល់ក្រហមទាំង ៣' ⇒ $n(\\bar{B}) = C(4, 3) = 4$។\n$P(B) = 1 - P(\\bar{B}) = 1 - \\frac{4}{120} = 1 - \\frac{1}{30} = \\frac{29}{30}$។",
        officialSolutionEn:
          "a. $n(S) = C(10, 3) = 120$.\nb. $P(A) = \\frac{C(4,3) + C(6,3)}{120} = \\frac{24}{120} = \\frac{1}{5}$.\nc. $P(B) = 1 - P(\\text{all red}) = 1 - \\frac{4}{120} = \\frac{29}{30}$.",
        scoringCriteriaKm: [
          "គណនាចំនួនករណីអាច n(S) = 120៖ ២.៥ ពិន្ទុ",
          "គណនាប្រូបាប P(A) = 1/5៖ ៣.៥ ពិន្ទុ",
          "គណនាប្រូបាប P(B) = 29/30៖ ៤.០ ពិន្ទុ",
        ],
        keyFormulas: ["C(n, p) = \\frac{n!}{p!(n-p)!}", "P(B) = 1 - P(\\bar{B})"],
      },
    ],
  },

  // ============================================================================
  // 2. BACII 2024 — PHYSICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-phys-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "science",
    subject: "physics",
    originalTitleKh: "វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2024 BacII Physics Official Exam (Science Stream)",
    durationMinutes: 90,
    totalMarks: 75,
    coefficient: 3,
    questionCount: 5,
    topicsKm: [
      "លំយោលមេកានិច និងប៉ោលទោល",
      "អគ្គិសនី និងដែនម៉ាញ៉េទិច",
      "សៀគ្វីចរន្តឆ្លាស់ RLC",
      "ទែម៉ូឌីណាមិច និងឧស្ម័នបរិសុទ្ធ",
      "រូបវិទ្យានុយក្លេអ៊ែរ និងវិទ្យុសកម្ម",
    ],
    topicsEn: [
      "Mechanical Oscillations",
      "Electromagnetism",
      "AC RLC Circuits",
      "Thermodynamics",
      "Nuclear Physics",
    ],
    overviewKm:
      "វិញ្ញាសារូបវិទ្យាថ្នាក់វិទ្យាសាស្ត្រមាន ៥ លំហាត់ធំៗ រួមមានការគណនាខួបប៉ោលទោល អាំងឌុចស្យុងអេឡិចត្រូម៉ាញ៉េទិច អាំងពែដង់សៀគ្វីចរន្តឆ្លាស់ កម្មន្តទែម៉ូឌីណាមិច និងការបំបែកវិទ្យុសកម្ម។",
    overviewEn:
      "Official 2024 BacII Physics paper featuring simple pendulum periods, electromagnetic induction flux, AC RLC circuit impedance, gas thermodynamics, and nuclear radiation half-life.",
    essentialFormulaSheet: [
      {
        nameKm: "ខួបប៉ោលទោល",
        nameEn: "Simple Pendulum Period",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
        noteKm: "L គិតជាម៉ែត្រ (m), g គិតជា m/s²",
      },
      {
        nameKm: "អាំងពែដង់សៀគ្វី RLC",
        nameEn: "RLC Circuit Impedance",
        formula: "Z = \\sqrt{R^2 + (Z_L - Z_C)^2}",
        noteKm: "Z_L = L\\omega = 2\\pi fL, Z_C = \\frac{1}{C\\omega}",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ លំយោលមេកានិចនៃប៉ោលទោល",
        titleEn: "Problem 1: Simple Pendulum Oscillation",
        problemTextKm:
          "ប៉ោលទោលមួយមានប្រវែងខ្សែ $L = 1\\,\\text{m}$ យោលនៅកន្លែងដែលមានសំទុះទំនាញដី $g = \\pi^2 = 9.8\\,\\text{m/s}^2$។\nក. គណនាខួបលំយោលផ្ទាល់ $T_0$ និងប្រេកង់ $f$ នៃប៉ោល។\nខ. ប្រសិនបើគេចង់ឱ្យខួបនៃប៉ោលនេះកើនឡើងទ្វេដង តើត្រូវផ្លាស់ប្តូរប្រវែងខ្សែ $L'$ ឱ្យស្មើនឹងប៉ុន្មាន?",
        problemTextEn:
          "A simple pendulum has length $L = 1\\,\\text{m}$ oscillating where $g = \\pi^2 = 9.8\\,\\text{m/s}^2$.\na. Find natural period $T_0$ and frequency $f$.\nb. What length $L'$ is required to double its oscillation period?",
        officialSolutionKm:
          "ក. គណនាខួប T₀ និងប្រេកង់ f៖\n- ខួប៖ $T_0 = 2\\pi\\sqrt{\\frac{L}{g}} = 2\\pi\\sqrt{\\frac{1}{\\pi^2}} = 2\\,\\text{s}$។\n- ប្រេកង់៖ $f = \\frac{1}{T_0} = \\frac{1}{2} = 0.5\\,\\text{Hz}$។\n\nខ. គណនាប្រវែង L'៖\nដើម្បីឱ្យ $T' = 2T_0 = 4\\,\\text{s}$៖\n$T' = 2\\pi\\sqrt{\\frac{L'}{g}} \\Rightarrow \\sqrt{\\frac{L'}{\\pi^2}} = \\frac{4}{2\\pi} = \\frac{2}{\\pi} \\Rightarrow \\frac{L'}{\\pi^2} = \\frac{4}{\\pi^2} \\Rightarrow L' = 4\\,\\text{m}$។",
        officialSolutionEn:
          "a. Period $T_0 = 2\\pi\\sqrt{1/\\pi^2} = 2\\,\\text{s}$. Frequency $f = 1/2 = 0.5\\,\\text{Hz}$.\nb. For $T' = 2T_0 = 4\\,\\text{s}$, $L' = 4L = 4\\,\\text{m}$.",
        scoringCriteriaKm: [
          "រូបមន្ត និងគណនាខួប T0 = 2 s ត្រឹមត្រូវ៖ ៦.០ ពិន្ទុ",
          "គណនាប្រេកង់ f = 0.5 Hz៖ ៤.០ ពិន្ទុ",
          "ទាញរកប្រវែងខ្សែ L' = 4 m៖ ៥.០ ពិន្ទុ",
        ],
        keyFormulas: ["T = 2\\pi\\sqrt{\\frac{L}{g}}", "f = \\frac{1}{T}"],
      },
    ],
  },

  // ============================================================================
  // 3. BACII 2024 — CHEMISTRY (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-chem-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00003619",
    salaReferenceId: "00003619",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "science",
    subject: "chemistry",
    originalTitleKh: "វិញ្ញាសា គីមីវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គីមីវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2024 BacII Chemistry Official Exam (Science Stream)",
    durationMinutes: 90,
    totalMarks: 75,
    coefficient: 3,
    questionCount: 5,
    topicsKm: [
      "ល្បឿនប្រតិកម្មគីមី",
      "អាស៊ីត-បាស និង pH",
      "លំនឹងគីមី",
      "អេស្ទែរកម្ម និងសាប៊ូកម្ម",
      "អាស៊ីតអាមីណេ និងប៉ិបទីត",
    ],
    topicsEn: [
      "Chemical Kinetics",
      "Acids, Bases & pH",
      "Chemical Equilibrium",
      "Esters & Saponification",
      "Amino Acids & Peptides",
    ],
    overviewKm:
      "វិញ្ញាសាគីមីវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ ផ្តោតលើការគណនាកំហាប់អ៊ីយ៉ុងអ៊ីដ្រូញ៉ូម និង pH នៃសូលុយស្យុងអាស៊ីត ការសរសេរសមីការអេស្ទែរកម្ម ការកំណត់រូបមន្តម៉ូលេគុល និងលំនឹងគីមី។",
    overviewEn:
      "Official 2024 BacII Chemistry exam evaluating solution pH calculations, esterification mechanisms, reversible chemical equilibria, and peptide bond synthesis.",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្ត pH",
        nameEn: "pH Formula",
        formula: "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]",
        noteKm: "[H₃O⁺] = 10^(-pH) mol/L",
      },
      {
        nameKm: "ថេរអាស៊ីត Ka",
        nameEn: "Acid Dissociation Constant",
        formula: "K_a = \\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}",
        noteKm: "អាស៊ីតខ្សោយ HA + H₂O ⇌ H₃O⁺ + A⁻",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ អាស៊ីត-បាស និង pH នៃសូលុយស្យុង",
        titleEn: "Problem 1: Strong & Weak Acid Solution pH",
        problemTextKm:
          "គេមានសូលុយស្យុងអាស៊ីតក្លរីឌ្រិច $(HCl)$ កំហាប់ $C_1 = 0.02\\,\\text{M}$ និងសូលុយស្យុងអាស៊ីតអេតាណូអ៊ិច $(CH_3COOH)$ កំហាប់ $C_2 = 0.1\\,\\text{M}$ ដែលមានថេរអាស៊ីត $K_a = 1.8 \\times 10^{-5}$។\nក. សរសេរសមីការបំបែកជាអ៊ីយ៉ុងក្នុងទឹកនៃអាស៊ីតទាំងពីរ។\nខ. គណនា $\\text{pH}$ នៃសូលុយស្យុង $HCl$ (យក $\\log 2 = 0.30$)។\nគ. គណនាកំហាប់ $[H_3O^+]$ និង $\\text{pH}$ នៃសូលុយស្យុង $CH_3COOH$ (យក $\\sqrt{1.8} \\approx 1.34$, $\\log 1.34 \\approx 0.13$)។",
        problemTextEn:
          "Given $HCl$ solution $C_1 = 0.02\\,\\text{M}$ and acetic acid $CH_3COOH$ $C_2 = 0.1\\,\\text{M}$ with $K_a = 1.8 \\times 10^{-5}$.\na. Write ionization equations in water for both acids.\nb. Calculate pH of $HCl$ (take $\\log 2 = 0.30$).\nc. Find $[H_3O^+]$ and pH of $CH_3COOH$ (take $\\sqrt{1.8} \\approx 1.34$, $\\log 1.34 \\approx 0.13$).",
        officialSolutionKm:
          "ក. សមីការបំបែកជាអ៊ីយ៉ុង៖\n- $HCl + H_2O \\to H_3O^+ + Cl^-$ (អាស៊ីតខ្លាំង)\n- $CH_3COOH + H_2O \\rightleftharpoons H_3O^+ + CH_3COO^-$ (អាស៊ីតខ្សោយ)\n\nខ. គណនា pH នៃ HCl៖\n$\\text{pH} = -\\log(0.02) = 2 - \\log 2 = 2 - 0.30 = 1.70$។\n\nគ. គណនា pH នៃ CH₃COOH៖\n$[H_3O^+] = \\sqrt{K_a \\cdot C_2} = \\sqrt{1.8 \\times 10^{-6}} = 1.34 \\times 10^{-3}\\,\\text{M}$។\n$\\text{pH} = 3 - \\log 1.34 = 3 - 0.13 = 2.87$។",
        officialSolutionEn:
          "a. Strong acid $HCl$: total ionization; weak acid $CH_3COOH$: partial equilibrium.\nb. $HCl$: $\\text{pH} = 1.70$.\nc. $CH_3COOH$: $[H_3O^+] = 1.34 \\times 10^{-3}\\,\\text{M} \\Rightarrow \\text{pH} = 2.87$.",
        scoringCriteriaKm: [
          "សរសេរសមីការបំបែកជាអ៊ីយ៉ុងត្រឹមត្រូវ៖ ៣.០ ពិន្ទុ",
          "គណនា pH នៃ HCl = 1.70 ត្រឹមត្រូវ៖ ៦.០ ពិន្ទុ",
          "ទាញរក [H₃O⁺] = 1.34×10⁻³ M និង pH = 2.87៖ ៦.០ ពិន្ទុ",
        ],
        keyFormulas: [
          "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]",
          "[\\text{H}_3\\text{O}^+] = \\sqrt{K_a \\cdot C}",
        ],
      },
    ],
  },

  // ============================================================================
  // 4. BACII 2024 — BIOLOGY (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-bio-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00003621",
    salaReferenceId: "00003621",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "science",
    subject: "biology",
    originalTitleKh: "វិញ្ញាសា ជីវវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា ជីវវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2024 BacII Biology Official Exam (Science Stream)",
    durationMinutes: 90,
    totalMarks: 75,
    coefficient: 3,
    questionCount: 5,
    topicsKm: [
      "រចនាសម្ព័ន្ធ DNA និងការស្វ័យតម្រង",
      "សំយោគប្រូតេអ៊ីន និងកូដពន្ធុ",
      "មីតូស និងមេយ៉ូស (Cell Division)",
      "ច្បាប់តំណពូជម៉ង់ដែល",
      "ប្រព័ន្ធប្រសាទ និងអ័រម៉ូន",
    ],
    topicsEn: [
      "DNA Structure & Replication",
      "Protein Synthesis & Codons",
      "Mitosis & Meiosis",
      "Mendelian Genetics",
      "Nervous & Endocrine Systems",
    ],
    overviewKm:
      "វិញ្ញាសាជីវវិទ្យាផ្លូវការថ្នាក់វិទ្យាសាស្ត្រ បាក់ឌុប ២០២៤ ផ្តោតលើការគណនាចំនួននុយក្លេអូទីដក្នុងម៉ូលេគុល DNA ការកំណត់លំដាប់អាស៊ីតអាមីណេ និងការបកស្រាយច្បាប់ម៉ង់ដែលលើការបង្កាត់ពូជ។",
    overviewEn:
      "Official 2024 BacII Biology exam testing DNA nucleotide calculations, mRNA transcription, amino acid translation, and Mendelian dihybrid cross ratios.",
    essentialFormulaSheet: [
      {
        nameKm: "គោលការណ៍បំពេញបាសឆាហ្កាហ្វ",
        nameEn: "Chargaff's Rule",
        formula: "A = T,\\quad G = C",
        noteKm: "A + G = T + C = 50% នៃនុយក្លេអូទីដសរុប",
      },
      {
        nameKm: "ប្រវែងម៉ូលេគុល DNA",
        nameEn: "DNA Length Formula",
        formula: "L = \\frac{N}{2} \\times 3.4\\,\\text{Å}",
        noteKm: "N ជាចំនួននុយក្លេអូទីដសរុប, 1 Å = 10^(-10) m",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ម៉ូលេគុល DNA និងការសំយោគប្រូតេអ៊ីន",
        titleEn: "Problem 1: DNA Structure & Nucleotides",
        problemTextKm:
          "បំណែកម៉ូលេគុល DNA មួយមានប្រវែង $L = 5100\\,\\text{Å}$ និងមាននុយក្លេអូទីដប្រភេទ អាដេនីន $A = 600$។\nក. គណនាចំនួននុយក្លេអូទីដសរុប $N$ នៃបំណែក DNA នេះ។\nខ. គណនាចំនួននុយក្លេអូទីដប្រភេទនីមួយៗ ($A, T, G, C$)។\nគ. គណនាចំនួនសម្ព័ន្ធអ៊ីដ្រូសែនសរុប $H$ ក្នុងបំណែក DNA នេះ។",
        problemTextEn:
          "A DNA segment has length $L = 5100\\,\\text{Å}$ and contains Adenine $A = 600$.\na. Calculate total number of nucleotides $N$.\nb. Find the count of each nucleotide type ($A, T, G, C$).\nc. Compute total number of hydrogen bonds $H$.",
        officialSolutionKm:
          "ក. គណនា N៖\n$L = \\frac{N}{2} \\times 3.4 \\Rightarrow N = \\frac{2 \\times L}{3.4} = \\frac{2 \\times 5100}{3.4} = 3000$ នុយក្លេអូទីដ។\n\nខ. គណនាប្រភេទនីមួយៗ៖\nតាមគោលការណ៍បំពេញបាស៖\n- $A = T = 600$ នុយក្លេអូទីដ។\n- $G = C = \\frac{N - 2A}{2} = \\frac{3000 - 1200}{2} = 900$ នុយក្លេអូទីដ។\n\nគ. គណនាសម្ព័ន្ធអ៊ីដ្រូសែន H៖\n$H = 2A + 3G = 2(600) + 3(900) = 1200 + 2700 = 3900$ សម្ព័ន្ធ។",
        officialSolutionEn:
          "a. Total nucleotides $N = (2 \\times 5100) / 3.4 = 3000$.\nb. $A = T = 600$; $G = C = (3000 - 1200)/2 = 900$.\nc. Hydrogen bonds $H = 2A + 3G = 2(600) + 3(900) = 3900$.",
        scoringCriteriaKm: [
          "រូបមន្ត និងគណនា N = 3000៖ ៥.០ ពិន្ទុ",
          "រកឃើញ A = T = 600 និង G = C = 900៖ ៥.០ ពិន្ទុ",
          "គណនាសម្ព័ន្ធអ៊ីដ្រូសែន H = 3900៖ ៥.០ ពិន្ទុ",
        ],
        keyFormulas: ["N = \\frac{2L}{3.4}", "H = 2A + 3G"],
      },
    ],
  },

  // ============================================================================
  // 5. BACII 2024 — KHMER LITERATURE
  // ============================================================================
  {
    id: "bacii-2024-khmer-literature",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "both",
    subject: "khmer",
    originalTitleKh: "វិញ្ញាសា ភាសាខ្មែរ បាក់ឌុប ២០២៤ (តែងសេចក្តីផ្លូវការ)",
    titleKm: "វិញ្ញាសា ភាសាខ្មែរ បាក់ឌុប ២០២៤ (តែងសេចក្តីផ្លូវការ)",
    titleEn: "2024 BacII Khmer Literature Official Exam",
    durationMinutes: 150,
    totalMarks: 100,
    coefficient: 4,
    questionCount: 3,
    topicsKm: [
      "សំណួរស្វែងយល់អត្ថបទ",
      "វេយ្យាករណ៍ និងរចនាបថតែងនិពន្ធ",
      "តែងសេចក្តីបែបពន្យល់ និងពិភាក្សា",
    ],
    topicsEn: [
      "Literature Comprehension",
      "Khmer Syntax & Stylistics",
      "MoEYS Argumentative Essay",
    ],
    overviewKm:
      "វិញ្ញាសាភាសាខ្មែរផ្លូវការប្រឡងបាក់ឌុប រួមមានសំណួរអក្សរសិល្ប៍វិភាគតួអង្គក្នុងរឿងកុលាបប៉ៃលិន និងប្រធានតែងសេចក្តីបែបពិភាក្សាលើគុណតម្លៃនៃការអប់រំ និងសីលធម៌សង្គម។",
    overviewEn:
      "Official 2024 BacII Khmer Literature paper featuring character analysis from Kulap Pailin and an official argumentative essay prompt on education and societal virtues.",
    essentialFormulaSheet: [
      {
        nameKm: "រចនាសម្ព័ន្ធតែងសេចក្តី ៣ វគ្គ",
        nameEn: "3-Part Essay Structure",
        formula: "\\text{ផ្តើមសេចក្តី} \\to \\text{តួសេចក្តី} \\to \\text{បញ្ចប់សេចក្តី}",
        noteKm: "ផ្តើម (លំនាំ-ចំណូល-ចំណោទ) — បញ្ចប់ (វាយតម្លៃ-មតិផ្ទាល់ខ្លួន)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 70,
        titleKm: "ប្រធានតែងសេចក្តី (Essay Prompt — ៧០ ពិន្ទុ)",
        titleEn: "Main Essay Prompt (70 Marks)",
        problemTextKm:
          "ប្រធាន៖ មានមតិមួយលើកឡើងថា៖ 'ចំណេះដឹងជាទ្រព្យដ៏ប្រសើរបំផុតក្នុងការកសាងអនាគតខ្លួនឯង និងសង្គមជាតិ'។\nចូរពន្យល់ និងពិភាក្សាដោយលើកយកឧទាហរណ៍ជាក់ស្តែងក្នុងសង្គម និងតួអង្គក្នុងរឿង 'កុលាបប៉ៃលិន' ឬ 'ភូមិតិរច្ឆាន' មកបញ្ជាក់ឱ្យបានច្បាស់លាស់។",
        problemTextEn:
          "Prompt: 'Knowledge is the most supreme asset in building one's own future and national prosperity.' Explain and discuss with textual evidence from Kulap Pailin or Phum Tirachhan.",
        officialSolutionKm:
          "គម្រោងតែងតាមអត្រាកំណែ MoEYS៖\n១. ផ្តើមសេចក្តី (១០ ពិន្ទុ)៖ លំនាំបញ្ហា ចំណូលបញ្ហា និងចំណោទបញ្ហា។\n២. តួសេចក្តី (៥០ ពិន្ទុ)៖ ពន្យល់ពាក្យគន្លឹះ បកស្រាយចំណេះដឹងចំពោះបុគ្គល និងសង្គមជាតិ លើកឧទាហរណ៍តួអង្គចៅចិត្រក្នុងរឿងកុលាបប៉ៃលិន ព្រមទាំងការពិភាក្សាទស្សនៈដែលត្រូវភ្ជាប់នឹងសីលធម៌។\n៣. បញ្ចប់សេចក្តី (១០ ពិន្ទុ)៖ វាយតម្លៃប្រធាន និងមតិផ្ទាល់ខ្លួន។",
        officialSolutionEn:
          "Official scoring outline: Intro (10 pts), Body with textual references to Chao Chet in Kulap Pailin and societal impact (50 pts), Conclusion and personal reflection (10 pts).",
        scoringCriteriaKm: [
          "ផ្តើមសេចក្តីមានលំនាំ ចំណូល ចំណោទបញ្ហាត្រឹមត្រូវ៖ ១០ ពិន្ទុ",
          "ពន្យល់ន័យប្រធាន និងលើកឧទាហរណ៍អក្សរសិល្ប៍សមស្រប៖ ៣០ ពិន្ទុ",
          "សំយោគពិភាក្សាចំណេះដឹងគួបផ្សំនឹងសីលធម៌៖ ២០ ពិន្ទុ",
          "បញ្ចប់សេចក្តី និងក្បួនអក្ខរាវិរុទ្ធវេយ្យាករណ៍៖ ១០ ពិន្ទុ",
        ],
        keyFormulas: [
          "ផ្តើម (លំនាំ-ចំណូល-ចំណោទ)",
          "តួ (ពន្យល់-បកស្រាយ-អំណះអំណាង-ពិភាក្សា)",
          "បញ្ចប់ (វាយតម្លៃ-មតិផ្ទាល់ខ្លួន)",
        ],
      },
    ],
  },

  // ============================================================================
  // 6. BACII 2023 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2023-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2023,
    examSessionYear: 2023,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2023,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2023,
    sessionDateKm: "សម័យប្រឡង៖ ០៦ វិច្ឆិកា ២០២៣",
    sessionDateEn: "Official Session: November 6, 2023",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៣ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៣ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2023 BacII Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 5,
    topicsKm: [
      "ចំនួនកុំផ្លិច និងឫសទី n",
      "ប្រូបាប និងការជ្រើសរើសចៃដន្យ",
      "ធរណីមាត្រក្នុងលំហ (ប្លង់ និងបន្ទាត់)",
      "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ២",
      "អនុគមន៍លោការីត និងអាំងតេក្រាល",
    ],
    topicsEn: [
      "Complex Numbers & Roots",
      "Probability Distributions",
      "3D Planes and Lines",
      "Second-Order Differential Equations",
      "Logarithmic Integrals",
    ],
    overviewKm:
      "វិញ្ញាសាផ្លូវការគណិតវិទ្យា ២០២៣ មានលំហាត់ចំនួនកុំផ្លិច ប្រូបាបនៃការចាប់បាល់ ធរណីមាត្រវ៉ិចទ័រក្នុងលំហ សមីការ y'' - 4y' + 3y = 0 និងអនុគមន៍ f(x) = x - ln(x)។",
    overviewEn:
      "Official 2023 BacII Mathematics paper evaluating complex roots, probability, 3D vector geometry, 2nd order differential equations, and logarithmic curve analysis.",
    essentialFormulaSheet: [
      {
        nameKm: "សមីការឌីផេរ៉ង់ស្យែល y'' + ay' + b = 0",
        nameEn: "2nd Order Characteristic Equation",
        formula: "r^2 + ar + b = 0",
        noteKm: "ករណី Δ > 0: y = c₁e^(r₁x) + c₂e^(r₂x)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ២",
        titleEn: "Problem 1: 2nd Order Differential Equation",
        problemTextKm:
          "គេឱ្យសមីការឌីផេរ៉ង់ស្យែល $(E): y'' - 4y' + 3y = 0$។\nក. ដោះស្រាយសមីការ $(E)$ ក្នុង $\\mathbb{R}$។\nខ. កំណត់ចម្លើយជាក់លាក់ $g(x)$ នៃសមីការ $(E)$ ដែលផ្ទៀងផ្ទាត់លក្ខខណ្ឌដើម $g(0) = 3$ និង $g'(0) = 5$។",
        problemTextEn:
          "Given differential equation $(E): y'' - 4y' + 3y = 0$.\na. Find general solution of $(E)$.\nb. Determine particular solution $g(x)$ satisfying $g(0) = 3$ and $g'(0) = 5$.",
        officialSolutionKm:
          "ក. សមីការសម្គាល់៖ $r^2 - 4r + 3 = 0$។\nមានឫស $r_1 = 1$ និង $r_2 = 3$ (ព្រោះ $a+b+c = 1 - 4 + 3 = 0$)។\nដូចនេះ ចម្លើយទូទៅគឺ $y = c_1 e^x + c_2 e^{3x}$ ($c_1, c_2 \\in \\mathbb{R}$)។\n\nខ. កំណត់ចម្លើយជាក់លាក់៖\n- $g(0) = c_1 + c_2 = 3$\n- $g'(x) = c_1 e^x + 3c_2 e^{3x} \\Rightarrow g'(0) = c_1 + 3c_2 = 5$\nដោះស្រាយប្រព័ន្ធ៖\n$2c_2 = 2 \\Rightarrow c_2 = 1$ និង $c_1 = 3 - 1 = 2$។\nដូចនេះ ចម្លើយជាក់លាក់គឺ $g(x) = 2e^x + e^{3x}$។",
        officialSolutionEn:
          "a. Characteristic equation $r^2 - 4r + 3 = 0 \\Rightarrow r_1 = 1, r_2 = 3$. General solution: $y = c_1e^x + c_2e^{3x}$.\nb. Initial conditions: $c_1 + c_2 = 3$ and $c_1 + 3c_2 = 5 \\Rightarrow c_1 = 2, c_2 = 1$. Hence $g(x) = 2e^x + e^{3x}$.",
        scoringCriteriaKm: [
          "រកឫសសមីការសម្គាល់ r1 = 1, r2 = 3៖ ៥.០ ពិន្ទុ",
          "សរសេរចម្លើយទូទៅត្រឹមត្រូវ៖ ៤.០ ពិន្ទុ",
          "ទាញរក c1 = 2, c2 = 1 និងសន្និដ្ឋាន g(x) = 2e^x + e^(3x)៖ ៦.០ ពិន្ទុ",
        ],
        keyFormulas: ["r^2 + ar + b = 0", "y = c_1 e^{r_1 x} + c_2 e^{r_2 x}"],
      },
    ],
  },

  // ============================================================================
  // 7. BACII 2023 — PHYSICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2023-phys-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2023,
    examSessionYear: 2023,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2023,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2023,
    sessionDateKm: "សម័យប្រឡង៖ ០៦ វិច្ឆិកា ២០២៣",
    sessionDateEn: "Official Session: November 6, 2023",
    stream: "science",
    subject: "physics",
    originalTitleKh: "វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៣ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៣ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2023 BacII Physics Official Exam (Science Stream)",
    durationMinutes: 90,
    totalMarks: 75,
    coefficient: 3,
    questionCount: 5,
    topicsKm: [
      "លំយោលអេឡិចត្រូម៉ាញ៉េទិច LC",
      "អុបទិកធរណីមាត្រ និងកញ្ចក់ឡង់ទី",
      "ច្បាប់ញូតុន និងចលនាត្រង់ប្រែប្រួលស្មើ",
      "ថាមពលនុយក្លេអ៊ែរ និងអនុភាពម៉ាស៊ីន",
    ],
    topicsEn: [
      "LC Electromagnetic Oscillations",
      "Geometric Optics & Thin Lenses",
      "Newtonian Dynamics",
      "Nuclear Binding Energy",
    ],
    overviewKm:
      "វិញ្ញាសារូបវិទ្យា បាក់ឌុប ២០២៣ ផ្តោតលើការគណនាប្រេកង់លំយោលសៀគ្វី LC កំណត់ទីតាំង និងទំហំរូបភាពបង្កើតដោយឡង់ទីពង្រីក និងការគណនាថាមពលតភ្ជាប់នុយក្លេអ៊ែរ។",
    overviewEn:
      "Official 2023 BacII Physics exam testing LC circuit natural frequency, convex lens image formation, and mass defect nuclear binding energy.",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្តឡង់ទីស្តើង",
        nameEn: "Thin Lens Formula",
        formula: "\\frac{1}{f'} = \\frac{1}{d'} - \\frac{1}{d}",
        noteKm: "f' ជាកំហាប់ប្រសព្វ, d ជាចម្ងាយវត្ថុ, d' ជាចម្ងាយរូបភាព",
      },
      {
        nameKm: "ថាមពលតភ្ជាប់នុយក្លេអ៊ែរ",
        nameEn: "Nuclear Binding Energy",
        formula: "E_b = \\Delta m \\cdot c^2 = [Z m_p + (A - Z) m_n - m_X] \\times 931.5\\,\\text{MeV}",
        noteKm: "Δm គិតជា u (amu)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ សៀគ្វីលំយោល LC",
        titleEn: "Problem 1: LC Oscillating Circuit",
        problemTextKm:
          "សៀគ្វីលំយោល LC មួយរួមមានកុងដង់សាទ័រមានកាប៉ាស៊ីតេ $C = 10\\,\\mu\\text{F}$ និងប៊ូប៊ីនសុទ្ធមានអាំងឌុចតង់ $L = 0.1\\,\\text{H}$។\nក. គណនាខួបលំយោលផ្ទាល់ $T_0$ និងប្រេកង់ $f_0$ នៃសៀគ្វី។\nខ. ប្រសិនបើតង់ស្យុងអតិបរមាលើកុងដង់សាទ័រគឺ $U_m = 12\\,\\text{V}$ ចូរគណនាថាមពលអេឡិចត្រូម៉ាញ៉េទិចសរុប $W$ នៃសៀគ្វី។",
        problemTextEn:
          "An LC circuit consists of capacitor $C = 10\\,\\mu\\text{F}$ and inductor $L = 0.1\\,\\text{H}$.\na. Calculate natural period $T_0$ and frequency $f_0$.\nb. If peak voltage is $U_m = 12\\,\\text{V}$, find total stored energy $W$.",
        officialSolutionKm:
          "ក. គណនា T₀ និង f₀៖\n$T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{0.1 \\times 10 \\times 10^{-6}} = 2\\pi\\sqrt{10^{-6}} = 2\\pi \\times 10^{-3} \\approx 6.28\\,\\text{ms}$។\n$f_0 = \\frac{1}{T_0} = \\frac{1}{2\\pi \\times 10^{-3}} \\approx 159.2\\,\\text{Hz}$។\n\nខ. គណនាថាមពលសរុប W៖\n$W = \\frac{1}{2} C U_m^2 = \\frac{1}{2} (10 \\times 10^{-6}) (12)^2 = 5 \\times 10^{-6} \\times 144 = 7.2 \\times 10^{-4}\\,\\text{J} = 0.72\\,\\text{mJ}$។",
        officialSolutionEn:
          "a. $T_0 = 2\\pi\\sqrt{LC} = 2\\pi \\times 10^{-3} = 6.28\\,\\text{ms}$, $f_0 = 159.2\\,\\text{Hz}$.\nb. Total energy $W = \\frac{1}{2}CU_m^2 = \\frac{1}{2}(10^{-5})(144) = 7.2 \\times 10^{-4}\\,\\text{J}$.",
        scoringCriteriaKm: [
          "រូបមន្ត និងគណនា T0 ត្រឹមត្រូវ៖ ៦.០ ពិន្ទុ",
          "គណនាប្រេកង់ f0 ត្រឹមត្រូវ៖ ៤.០ ពិន្ទុ",
          "គណនាថាមពល W = 0.72 mJ៖ ៥.០ ពិន្ទុ",
        ],
        keyFormulas: ["T_0 = 2\\pi\\sqrt{LC}", "W = \\frac{1}{2}CU_m^2"],
      },
    ],
  },

  // ============================================================================
  // 8. BACII 2022 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2022-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2022,
    examSessionYear: 2022,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2022,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2022,
    sessionDateKm: "សម័យប្រឡង៖ ០៥ ធ្នូ ២០២២",
    sessionDateEn: "Official Session: December 5, 2022",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២២ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២២ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2022 BacII Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 5,
    topicsKm: [
      "ចំនួនកុំផ្លិច និងទម្រង់ពីជគណិត",
      "ប្រូបាប និងចៃដន្យ",
      "ធរណីមាត្រវ៉ិចទ័រក្នុងលំហ",
      "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ១",
      "អនុគមន៍សនិទាន និងក្រាប",
    ],
    topicsEn: [
      "Complex Numbers",
      "Probability",
      "Vector Space Geometry",
      "First Order Differential Equations",
      "Rational Functions",
    ],
    overviewKm:
      "វិញ្ញាសាគណិតវិទ្យា បាក់ឌុប ២០២២ រួមមានការគណនាឫសការេនៃចំនួនកុំផ្លិច ចម្ងាយរវាងចំណុច និងបន្ទាត់ក្នុងលំហ និងការសិក្សាអថេរភាពនៃអនុគមន៍សនិទាន។",
    overviewEn:
      "Official 2022 BacII Mathematics paper evaluating complex square roots, 3D point-to-line distances, and rational function curve sketching.",
    essentialFormulaSheet: [
      {
        nameKm: "ឫសការេនៃចំនួនកុំផ្លិច z = a + ib",
        nameEn: "Complex Square Roots",
        formula: "x = \\pm\\sqrt{\\frac{|z|+a}{2}},\\quad y = \\pm\\text{sgn}(b)\\sqrt{\\frac{|z|-a}{2}}",
        noteKm: "ឫសការេ w = x + iy",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ឫសការេនៃចំនួនកុំផ្លិច",
        titleEn: "Problem 1: Complex Square Roots",
        problemTextKm:
          "ចូរកំណត់ឫសការេនៃចំនួនកុំផ្លិច $Z = 3 + 4i$។\nទាញរកដំណោះស្រាយនៃសមីការ $w^2 - (1 + i)w - (2 - i) = 0$ ក្នុង $\\mathbb{C}$។",
        problemTextEn:
          "Find square roots of $Z = 3 + 4i$.\nDeduce solutions of quadratic equation $w^2 - (1 + i)w - (2 - i) = 0$ in $\\mathbb{C}$.",
        officialSolutionKm:
          "តាង $\\delta = x + iy$ ជាឫសការេនៃ $Z = 3 + 4i$ ($x, y \\in \\mathbb{R}$)៖\n$\\begin{cases} x^2 - y^2 = 3 \\\\ 2xy = 4 \\\\ x^2 + y^2 = |Z| = \\sqrt{3^2 + 4^2} = 5 \\end{cases}$\nបូក (1) និង (3)៖ $2x^2 = 8 \\Rightarrow x = \\pm 2$។\nដក (1) ពី (3)៖ $2y^2 = 2 \\Rightarrow y = \\pm 1$។\nដោយ $2xy = 4 > 0$ នាំឱ្យ $x$ និង $y$ មានសញ្ញាដូចគ្នា។\nដូចនេះ ឫសការេនៃ $Z$ គឺ $\\delta = \\pm(2 + i)$។",
        officialSolutionEn:
          "Let $\\delta = x + iy$: $x^2 - y^2 = 3$, $2xy = 4$, $x^2 + y^2 = 5$. Hence $x = \\pm 2$, $y = \\pm 1$. Roots are $\\delta = \\pm(2 + i)$.",
        scoringCriteriaKm: [
          "បង្កើតប្រព័ន្ធសមីការរក x, y ត្រឹមត្រូវ៖ ៦.០ ពិន្ទុ",
          "គណនារក x = ±2 និង y = ±1៖ ៥.០ ពិន្ទុ",
          "សន្និដ្ឋានឫសការេ δ = ±(2 + i)៖ ៤.០ ពិន្ទុ",
        ],
        keyFormulas: ["x^2 - y^2 = a", "x^2 + y^2 = \\sqrt{a^2 + b^2}"],
      },
    ],
  },

  // ============================================================================
  // 9. GRADE 9 BREVET 2024 — MATHEMATICS
  // ============================================================================
  {
    id: "brevet-2024-math",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 9,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ មិថុនា ២០២៤",
    sessionDateEn: "Official Session: June 2024",
    stream: "both",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា ឌីប្លូម ២០២៤ (ថ្នាក់ទី ៩)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា ឌីប្លូម ២០២៤ (ថ្នាក់ទី ៩)",
    titleEn: "2024 Brevet Mathematics Official Exam (Grade 9)",
    durationMinutes: 120,
    totalMarks: 50,
    coefficient: 2,
    questionCount: 4,
    topicsKm: [
      "កន្សោមពីជគណិត និងសមភាពកត់សម្គាល់",
      "ប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអញ្ញាត",
      "ធរណីមាត្រ ទ្រឹស្តីបទពីតាករ",
      "ស្ថិតិ និងប្រូបាបមូលដ្ឋាន",
    ],
    topicsEn: [
      "Algebraic Factoring",
      "Linear Systems",
      "Pythagorean Theorem",
      "Basic Statistics",
    ],
    overviewKm:
      "វិញ្ញាសាគណិតវិទ្យាផ្លូវការប្រឡងឌីប្លូមថ្នាក់ទី៩ រួមមាន ៤ លំហាត់ លើការដាក់ជាផលគុណកត្តា ដោះស្រាយប្រព័ន្ធសមីការ និងការអនុវត្តទ្រឹស្តីបទពីតាករលើត្រីកោណកែង។",
    overviewEn:
      "Official 2024 Grade 9 Brevet Mathematics paper testing algebraic identities, 2-variable linear systems, right-triangle Pythagorean calculations, and statistical means.",
    essentialFormulaSheet: [
      {
        nameKm: "ទ្រឹស្តីបទពីតាករ",
        nameEn: "Pythagorean Theorem",
        formula: "BC^2 = AB^2 + AC^2",
        noteKm: "ក្នុងត្រីកោណ ABC កែងត្រង់ A",
      },
      {
        nameKm: "សមភាពកត់សម្គាល់",
        nameEn: "Algebraic Identity",
        formula: "a^2 - b^2 = (a - b)(a + b)",
        noteKm: "ប្រើសម្រាប់ដាក់កន្សោមជាផលគុណកត្តា",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 12,
        titleKm: "លំហាត់ទី ១៖ ប្រព័ន្ធសមីការដឺក្រេទី ១ មានពីរអញ្ញាត",
        titleEn: "Problem 1: 2-Variable Linear System",
        problemTextKm:
          "ដោះស្រាយប្រព័ន្ធសមីការក្នុង $\\mathbb{R} \\times \\mathbb{R}$៖\n$$\\begin{cases} 2x + 3y = 13 \\\\ 3x - y = 3 \\end{cases}$$",
        problemTextEn:
          "Solve the system of equations in $\\mathbb{R} \\times \\mathbb{R}$:\n$$\\begin{cases} 2x + 3y = 13 \\\\ 3x - y = 3 \\end{cases}$$",
        officialSolutionKm:
          "តាមសមីការ (2)៖ $y = 3x - 3$ (3)។\nយក (3) ជួសក្នុង (1)៖\n$2x + 3(3x - 3) = 13 \\Rightarrow 11x = 22 \\Rightarrow x = 2$។\nយក $x = 2$ ជួសក្នុង (3)៖ $y = 3(2) - 3 = 3$។\nដូចនេះ ប្រព័ន្ធសមីការមានគូចម្លើយ $(x, y) = (2, 3)$។",
        officialSolutionEn:
          "From (2): $y = 3x - 3$. Substitute into (1): $2x + 3(3x - 3) = 13 \\Rightarrow x = 2, y = 3$. Solution $(x, y) = (2, 3)$.",
        scoringCriteriaKm: [
          "បំប្លែងរក y តាម x ត្រឹមត្រូវ៖ ៤.០ ពិន្ទុ",
          "គណនារកឃើញ x = 2៖ ៤.០ ពិន្ទុ",
          "រកឃើញ y = 3 និងសន្និដ្ឋានគូចម្លើយ (2, 3)៖ ៤.០ ពិន្ទុ",
        ],
        keyFormulas: ["\\text{Substitution Method}", "\\text{Elimination Method}"],
      },
    ],
  },

  // ============================================================================
  // 10. GRADE 9 BREVET 2024 — PHYSICS
  // ============================================================================
  {
    id: "brevet-2024-phys",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 9,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ មិថុនា ២០២៤",
    sessionDateEn: "Official Session: June 2024",
    stream: "both",
    subject: "physics",
    originalTitleKh: "វិញ្ញាសា រូបវិទ្យា ឌីប្លូម ២០២៤ (ថ្នាក់ទី ៩)",
    titleKm: "វិញ្ញាសា រូបវិទ្យា ឌីប្លូម ២០២៤ (ថ្នាក់ទី ៩)",
    titleEn: "2024 Brevet Physics Official Exam (Grade 9)",
    durationMinutes: 60,
    totalMarks: 50,
    coefficient: 1.5,
    questionCount: 4,
    topicsKm: [
      "ច្បាប់អូម និងរេស៊ីស្តង់អគ្គិសនី",
      "អានុភាព និងថាមពលអគ្គិសនី",
      "កម្លាំង ម៉ាស់ និងទម្ងន់",
      "កម្តៅ និងបរិមាណកម្តៅ",
    ],
    topicsEn: [
      "Ohm's Law & Resistance",
      "Electric Power & Energy",
      "Weight & Gravity",
      "Heat & Temperature",
    ],
    overviewKm:
      "វិញ្ញាសារូបវិទ្យាថ្នាក់ទី៩ រួមមាន ៤ លំហាត់ជាក់ស្តែងលើការគណនាកម្លាំងទម្ងន់ ច្បាប់អូម និងការគណនាថ្លៃភ្លើងប្រើប្រាស់ប្រចាំខែតាមអានុភាពគិតជាគីឡូវ៉ាត់ម៉ោង (kWh)។",
    overviewEn:
      "Official Grade 9 Brevet Physics exam evaluating Ohm's law circuit calculations, power ratings, energy consumption in kilowatt-hours, and thermal transfer.",
    essentialFormulaSheet: [
      {
        nameKm: "ច្បាប់អូម",
        nameEn: "Ohm's Law",
        formula: "U = R \\cdot I",
        noteKm: "U (Volt), R (Ohm), I (Ampere)",
      },
      {
        nameKm: "អានុភាពអគ្គិសនី",
        nameEn: "Electric Power",
        formula: "P = U \\cdot I = R \\cdot I^2",
        noteKm: "P (Watt)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ច្បាប់អូម និងអានុភាពអគ្គិសនី",
        titleEn: "Problem 1: Ohm's Law & Power Calculation",
        problemTextKm:
          "ឆ្នាំងដាំបាយអគ្គិសនីមួយមានស្លាកសញ្ញាសម្គាល់ $(220\\,\\text{V} - 880\\,\\text{W})$។\nក. តើស្លាកសញ្ញាទាំងពីរខាងលើមានន័យដូចម្តេច?\nខ. គណនាអាំងតង់ស៊ីតេចរន្តអគ្គិសនី $I$ ដែលឆ្លងកាត់ឆ្នាំងដាំបាយ នៅពេលប្រើប្រាស់ធម្មតា។\nគ. គណនារេស៊ីស្តង់ $R$ នៃខ្សែរបញ្ជូនកម្តៅរបស់ឆ្នាំង។",
        problemTextEn:
          "An electric rice cooker is labeled $(220\\,\\text{V} - 880\\,\\text{W})$.\na. What do these two values signify?\nb. Find the normal operating current $I$.\nc. Compute the heating element resistance $R$.",
        officialSolutionKm:
          "ក. អត្ថន័យ៖ $220\\,\\text{V}$ ជាតង់ស្យុងធម្មតា; $880\\,\\text{W}$ ជាអានុភាពអគ្គិសនីធម្មតា។\nខ. $I = \\frac{P}{U} = \\frac{880}{220} = 4\\,\\text{A}$។\nគ. $R = \\frac{U}{I} = \\frac{220}{4} = 55\\,\\Omega$។",
        officialSolutionEn:
          "a. 220V is nominal voltage, 880W is nominal power.\nb. Current $I = 880/220 = 4\\,\\text{A}$.\nc. Resistance $R = 220/4 = 55\\,\\Omega$.",
        scoringCriteriaKm: [
          "ពន្យល់អត្ថន័យតង់ស្យុង និងអានុភាព៖ ៤.០ ពិន្ទុ",
          "រូបមន្ត និងគណនា I = 4 A៖ ៥.៥ ពិន្ទុ",
          "រូបមន្ត និងគណនា R = 55 Ω៖ ៥.៥ ពិន្ទុ",
        ],
        keyFormulas: ["P = U \\times I", "R = \\frac{U}{I}"],
      },
    ],
  },
  // ============================================================================
  // 11. MOEYS SALA DIGITAL — MATHEMATICS PREP COLLECTION (ID: 00002191)
  // ============================================================================
  {
    id: "sala-prep-2024-math-00002191",
    examCategory: "bacii",
    examYear: null,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    resourceType: "multi_year_compilation",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    year: 2024,
    examSessionYear: null, // Note: Self-study preparation compilation, not a single session!
    publicationYear: 2024,
    sessionDateKm: null,
    sessionDateEn: null,
    level: 12,
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប គណិតវិទ្យា (SALA Digital)",
    titleKm: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប គណិតវិទ្យា (SALA Digital)",
    titleEn: "MoEYS SALA Digital Grade 12 Mathematics Self-Study & Exam Prep Collection",
    durationMinutes: null, // Self-paced
    totalMarks: null,
    coefficient: null,
    questionCount: 4,
    sourcePlatform: "sala_moeys",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00002191",
    salaReferenceId: "00002191",
    author: "ក្រុមការងារគណិតវិទ្យា MoEYS",
    publisher: "សាលាឌីជីថល (SALA Digital)",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    topicsKm: [
      "លីមីត និងដេរីវេនៃអនុគមន៍",
      "អាំងតេក្រាល និងផ្ទៃក្រឡា",
      "ធរណីមាត្រក្នុងលំហ",
      "ប្រូបាប",
    ],
    topicsEn: ["Limits & Derivatives", "Integration & Areas", "Space Vectors", "Probability"],
    overviewKm:
      "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុបផ្លូវការ រៀបចំដោយក្រុមការងារមុខវិជ្ជាគណិតវិទ្យានៃក្រសួងអប់រំ យុវជន និងកីឡា លើថ្នាលសាលាឌីជីថល (SALA ID: 00002191)។",
    overviewEn:
      "MoEYS SALA Digital officially curated Grade 12 Mathematics self-study & examination prep resource (SALA Library ID: 00002191).",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្តលីមីតត្រីកោណមាត្រ",
        nameEn: "Trigonometric Limit",
        formula: "\lim_{x \to 0} \frac{\sin x}{x} = 1",
        noteKm: "x គិតជាដឺក្រេ ឬរ៉ាដ្យង់ (រ៉ាដ្យង់ជាខ្នាតស្តង់ដារ)",
      },
      {
        nameKm: "ផ្ទៃក្រឡាខណ្ឌដោយខ្សែកោង",
        nameEn: "Area under Curve",
        formula: "S = \int_a^b |f(x) - g(x)|\,dx",
        noteKm: "គណនាផ្ទៃក្រឡារវាងខ្សែកោងទាំងពីរចន្លោះ [a, b]",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: null,
        titleKm: "លំហាត់ទី ១៖ លីមីត និងអនុគមន៍ជាប់",
        titleEn: "Problem 1: Limits & Function Continuity",
        problemTextKm:
          "គណនាលីមីតខាងក្រោម៖\nក. $A = \lim_{x \to 0} \frac{1 - \cos(2x)}{x^2}$\nខ. $B = \lim_{x \to 1} \frac{\sqrt{x+3} - 2}{x - 1}$",
        problemTextEn:
          "Evaluate the following limits:\na. $A = \lim_{x \to 0} \frac{1 - \cos(2x)}{x^2}$\nb. $B = \lim_{x \to 1} \frac{\sqrt{x+3} - 2}{x - 1}$",
        officialSolutionKm:
          "ក. ដោយ $1 - \cos(2x) = 2\sin^2(x)$ នោះ៖\n$A = \lim_{x \to 0} \frac{2\sin^2(x)}{x^2} = 2 \times 1^2 = 2$។\n\nខ. គុណនឹងកន្សោមឆ្លាស់ $\sqrt{x+3} + 2$៖\n$B = \lim_{x \to 1} \frac{(x+3) - 4}{(x-1)(\sqrt{x+3}+2)} = \lim_{x \to 1} \frac{1}{\sqrt{x+3}+2} = \frac{1}{2+2} = \frac{1}{4}$។",
        officialSolutionEn:
          "a. $A = \lim_{x \to 0} \frac{2\sin^2 x}{x^2} = 2$.\nb. Rationalizing numerator yields $B = 1/4$.",
        scoringCriteriaKm: [
          "បំប្លែងទម្រង់ត្រីកោណមាត្រត្រឹមត្រូវ",
          "គុណកន្សោមឆ្លាស់ និងសម្រួល (x - 1)",
        ],
        keyFormulas: ["1 - \cos(2x) = 2\sin^2(x)", "\lim_{x \to 0} \frac{\sin x}{x} = 1"],
      },
    ],
  },

  // ============================================================================
  // 12. MOEYS SALA DIGITAL — CHEMISTRY PREP COLLECTION (ID: 00003619)
  // ============================================================================
  {
    id: "sala-prep-2024-chem-00003619",
    examCategory: "bacii",
    examYear: null,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    resourceType: "multi_year_compilation",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    year: 2024,
    examSessionYear: null,
    publicationYear: 2024,
    sessionDateKm: null,
    sessionDateEn: null,
    level: 12,
    stream: "science",
    subject: "chemistry",
    originalTitleKh: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប គីមីវិទ្យា (SALA Digital)",
    titleKm: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប គីមីវិទ្យា (SALA Digital)",
    titleEn: "MoEYS SALA Digital Grade 12 Chemistry Self-Study & Exam Prep Collection",
    durationMinutes: null,
    totalMarks: null,
    coefficient: null,
    questionCount: 3,
    sourcePlatform: "sala_moeys",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00003619",
    salaReferenceId: "00003619",
    author: "ក្រុមការងារគីមីវិទ្យា MoEYS",
    publisher: "សាលាឌីជីថល (SALA Digital)",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    topicsKm: [
      "កាតាលីករ និងល្បឿនប្រតិកម្ម",
      "កម្លាំងអាស៊ីត-បាស និង pH",
      "អេស្ទែរកម្ម",
    ],
    topicsEn: ["Catalysis & Reaction Rate", "Acid-Base Strength", "Esterification"],
    overviewKm:
      "កម្រងវិញ្ញាសាស្វ័យសិក្សាគីមីវិទ្យាសម្រាប់ត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ ផ្អែកលើបណ្ណាល័យសាលាឌីជីថល MoEYS (SALA ID: 00003619)។",
    overviewEn:
      "Grade 12 Chemistry examination preparation handbook published by MoEYS SALA Digital (SALA Library ID: 00003619).",
    essentialFormulaSheet: [
      {
        nameKm: "ទំនាក់ទំនង pH និង pOH",
        nameEn: "pH & pOH Relation",
        formula: "\text{pH} + \text{pOH} = 14",
        noteKm: "នៅសីតុណ្ហភាព 25 °C (Ke = 10^-14)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: null,
        titleKm: "លំហាត់ទី ១៖ ល្បឿនមធ្យមនៃប្រតិកម្មគីមី",
        titleEn: "Problem 1: Reaction Kinetics & Average Rate",
        problemTextKm:
          "គេមានប្រតិកម្មបំបែកអ៊ីដ្រូសែនពែអុកស៊ីត $2H_2O_2(aq) \to 2H_2O(l) + O_2(g)$។\nនៅខណៈ $t_1 = 0\,\text{s}$ កំហាប់ $[H_2O_2]_1 = 0.50\,\text{M}$។ នៅខណៈ $t_2 = 20\,\text{s}$ កំហាប់ $[H_2O_2]_2 = 0.30\,\text{M}$។\nចូរគណនាល្បឿនមធ្យមនៃការបាត់បង់ $H_2O_2$ ចន្លោះពេល $t_1$ ដល់ $t_2$។",
        problemTextEn:
          "Consider $2H_2O_2 \to 2H_2O + O_2$. At $t_1 = 0\,\text{s}$, $[H_2O_2] = 0.50\,\text{M}$. At $t_2 = 20\,\text{s}$, $[H_2O_2] = 0.30\,\text{M}$. Calculate average disappearance rate.",
        officialSolutionKm:
          "ល្បឿនមធ្យមនៃការបាត់បង់ $H_2O_2$៖\n$V_m = -\frac{\Delta [H_2O_2]}{\Delta t} = -\frac{0.30 - 0.50}{20 - 0} = -\frac{-0.20}{20} = 0.01\,\text{M/s}$ ឬ $1.0 \times 10^{-2}\,\text{mol}/(\text{L}\cdot\text{s})$។",
        officialSolutionEn:
          "$V_m = -\Delta[H_2O_2]/\Delta t = 0.01\,\text{M/s}$.",
        scoringCriteriaKm: [
          "រូបមន្តល្បឿនមធ្យមនៃការបាត់បង់អង្គធាតុប្រតិករ",
          "គណនាលទ្ធផល Vm = 0.01 mol/(L·s) ត្រឹមត្រូវ",
        ],
        keyFormulas: ["V_m = -\frac{\Delta [A]}{\Delta t}"],
      },
    ],
  },

  // ============================================================================
  // 13. MOEYS SALA DIGITAL — BIOLOGY PREP COLLECTION (ID: 00003621)
  // ============================================================================
  {
    id: "sala-prep-2024-bio-00003621",
    examCategory: "bacii",
    examYear: null,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    resourceType: "multi_year_compilation",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    year: 2024,
    examSessionYear: null,
    publicationYear: 2024,
    sessionDateKm: null,
    sessionDateEn: null,
    level: 12,
    stream: "science",
    subject: "biology",
    originalTitleKh: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប ជីវវិទ្យា (SALA Digital)",
    titleKm: "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុប ជីវវិទ្យា (SALA Digital)",
    titleEn: "MoEYS SALA Digital Grade 12 Biology Self-Study & Exam Prep Collection",
    durationMinutes: null,
    totalMarks: null,
    coefficient: null,
    questionCount: 3,
    sourcePlatform: "sala_moeys",
    sourceUrl: "https://sala.moeys.gov.kh/kh/library/00003621",
    salaReferenceId: "00003621",
    author: "ក្រុមការងារជីវវិទ្យា MoEYS",
    publisher: "សាលាឌីជីថល (SALA Digital)",
    hasOfficialAnswerKey: true,
    pdfUrl: null,
    topicsKm: [
      "ចម្លងក្រម និងបកប្រែក្រម",
      "ការផ្លាស់ប្តូរហ្សែន (Mutation)",
      "ប្រព័ន្ធការពាររាងកាយ (Immune System)",
    ],
    topicsEn: ["Transcription & Translation", "Genetic Mutations", "Immune System"],
    overviewKm:
      "កម្រងវិញ្ញាសាស្វ័យសិក្សា និងត្រៀមប្រឡងបាក់ឌុបជីវវិទ្យា ផ្អែកលើបណ្ណាល័យសាលាឌីជីថល MoEYS (SALA ID: 00003621)។",
    overviewEn:
      "Grade 12 Biology examination preparation handbook published on MoEYS SALA Digital (SALA Library ID: 00003621).",
    essentialFormulaSheet: [
      {
        nameKm: "ចំនួនអាស៊ីតអាមីណេក្នុងខ្សែប៉ូលីប៉ិបទីត",
        nameEn: "Amino Acids Count",
        formula: "n_{\text{aa}} = \frac{N_{\text{mRNA}}}{3} - 1",
        noteKm: "ដក 1 ដោយសារកូដុងបញ្ឈប់ (UAA, UAG, UGA) មិនបកប្រែជាអាស៊ីតអាមីណេ",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: null,
        titleKm: "លំហាត់ទី ១៖ ការសំយោគ mRNA និងខ្សែប៉ូលីប៉ិបទីត",
        titleEn: "Problem 1: mRNA Transcription & Polypeptide Synthesis",
        problemTextKm:
          "ខ្សែម៉ូលេគុល mRNA មួយមាននុយក្លេអូទីដសរុប $N = 900$។\nក. គណនាចំនួនត្រីធាតុ (កូដុង) នៅលើខ្សែ mRNA នេះ។\nខ. គណនាចំនួនអាស៊ីតអាមីណេនៃខ្សែប៉ូលីប៉ិបទីតដែលសំយោគបានពី mRNA នេះ (ដឹងថាកូដុងចុងក្រោយជាកូដុងបញ្ចប់)។",
        problemTextEn:
          "An mRNA molecule has $N = 900$ nucleotides. Calculate number of codons and resulting amino acids in the polypeptide.",
        officialSolutionKm:
          "ក. ចំនួនកូដុង (ត្រីធាតុ)៖\n$\text{Codons} = \frac{N}{3} = \frac{900}{3} = 300$ កូដុង។\n\nខ. ចំនួនអាស៊ីតអាមីណេ៖\n$n_{\text{aa}} = 300 - 1 = 299$ អាស៊ីតអាមីណេ (ដកកូដុងបញ្ចប់ចេញ ១)។",
        officialSolutionEn:
          "a. Codons = 900 / 3 = 300.\nb. Amino acids = 300 - 1 = 299.",
        scoringCriteriaKm: [
          "រូបមន្ត និងគណនាចំនួនកូដុង = 300",
          "ពន្យល់ និងគណនាចំនួនអាស៊ីតអាមីណេ = 299",
        ],
        keyFormulas: ["\text{Codons} = \frac{N}{3}", "n_{\text{aa}} = \frac{N}{3} - 1"],
      },
    ],
  },

  // ============================================================================
  // 14. BACII 2021 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2021-math-science",
    examCategory: "bacii",
    examYear: 2021,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: "science",
    subject: "mathematics",
    competitionStage: null,
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២១ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២១ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2021 BacII Mathematics Official Exam (Science Stream)",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2021,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    sessionDateKm: "សម័យប្រឡង៖ ២៧ ធ្នូ ២០២១",
    sessionDateEn: "Official Session: December 27, 2021",
    topicsKm: ["ចំនួនកុំផ្លិច", "ប្រូបាប", "អនុគមន៍លោការីត", "ធរណីមាត្រក្នុងលំហ"],
    topicsEn: ["Complex Numbers", "Probability", "Logarithmic Functions", "Space Vectors"],
    overviewKm:
      "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ បាក់ឌុប ២០២១ (សម័យប្រឡងពិសេសក្នុងដំណាក់កាលកូវីដ-១៩)។",
    overviewEn:
      "Official 2021 BacII Science Mathematics examination paper administered under strict national health guidelines.",
    essentialFormulaSheet: [
      {
        nameKm: "ម៉ូឌុល និងអាគុយម៉ង់",
        nameEn: "Modulus & Argument",
        formula: "z = r(\cos\theta + i\sin\theta)",
        noteKm: "r = \sqrt{a^2 + b^2}",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 10,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច",
        titleEn: "Problem 1: Complex Numbers",
        problemTextKm: "ដោះស្រាយក្នុងសំណុំ $\\mathbb{C}$ នូវសមីការ $z^2 - 2z + 4 = 0$។ សរសេរប្ញសជាទម្រង់ត្រីកោណមាត្រ។",
        problemTextEn: "Solve $z^2 - 2z + 4 = 0$ in $\\mathbb{C}$ and express roots in trigonometric form.",
        officialSolutionKm: "\\Delta' = (-1)^2 - 4 = -3 = (i\\sqrt{3})^2 \\Rightarrow z = 1 \\pm i\\sqrt{3} = 2(\\cos(\\pm\\pi/3) + i\\sin(\\pm\\pi/3))។",
        officialSolutionEn: "Roots: $z_{1,2} = 1 \\pm i\\sqrt{3} = 2(\\cos(\\pm\\pi/3) + i\\sin(\\pm\\pi/3))$.",
        scoringCriteriaKm: ["គណនាឌីសគ្រីមីណង់៖ ៤.០ ពិន្ទុ", "សរសេរទម្រង់ត្រីកោណមាត្រ៖ ៦.០ ពិន្ទុ"],
        keyFormulas: ["z = \\frac{-b' \\pm i\\sqrt{|\\Delta'|}}{a}"],
      },
    ],
  },

  // ============================================================================
  // 15. BACII 2019 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2019-math-science",
    examCategory: "bacii",
    examYear: 2019,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: "science",
    subject: "mathematics",
    competitionStage: null,
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៩ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៩ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2019 BacII Mathematics Official Exam (Science Stream)",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2019,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    sessionDateKm: "សម័យប្រឡង៖ ១៩ សីហា ២០១៩",
    sessionDateEn: "Official Session: August 19, 2019",
    topicsKm: ["ចំនួនកុំផ្លិច", "ប្រូបាប", "អាំងតេក្រាល", "ធរណីមាត្រក្នុងលំហ"],
    topicsEn: ["Complex Numbers", "Probability", "Integrals", "Solid Geometry"],
    overviewKm:
      "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ បាក់ឌុប ២០១៩ ផ្តោតលើចំនួនកុំផ្លិច ប្រូបាប អាំងតេក្រាល និងធរណីមាត្រក្នុងលំហ។",
    overviewEn: "Official 2019 BacII Science Stream Mathematics examination paper.",
    essentialFormulaSheet: [
      {
        nameKm: "អាំងតេក្រាលដោយផ្នែក",
        nameEn: "Integration by Parts",
        formula: "\\int u\\,dv = uv - \\int v\\,du",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 10,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច",
        titleEn: "Problem 1: Complex Roots",
        problemTextKm: "គេមានចំនួនកុំផ្លិច $z = \\frac{-1 + i\\sqrt{3}}{2}$។ គណនា $z^2, z^3$ និង $1 + z + z^2$។",
        problemTextEn: "Given $z = (-1 + i\\sqrt{3})/2$. Compute $z^2, z^3$, and $1 + z + z^2$.",
        officialSolutionKm: "$z = \\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}$ នាំឱ្យ $z^3 = 1$ និង $1 + z + z^2 = 0$។",
        officialSolutionEn: "$z = e^{i2\\pi/3} \\Rightarrow z^3 = 1$ and $1 + z + z^2 = 0$.",
        scoringCriteriaKm: ["គណនា z^2៖ ៣.០ ពិន្ទុ", "ទាញ z^3 = 1៖ ៣.៥ ពិន្ទុ", "បង្ហាញ 1+z+z^2=0៖ ៣.៥ ពិន្ទុ"],
        keyFormulas: ["(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)"],
      },
    ],
  },

  // ============================================================================
  // 16. BACII 2017 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2017-math-science",
    examCategory: "bacii",
    examYear: 2017,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: "science",
    subject: "mathematics",
    competitionStage: null,
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៧ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៧ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2017 BacII Mathematics Official Exam (Science Stream)",
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2017,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    sessionDateKm: "សម័យប្រឡង៖ ២១ សីហា ២០១៧",
    sessionDateEn: "Official Session: August 21, 2017",
    topicsKm: ["លីមីត", "ដេរីវេ", "អាំងតេក្រាល", "ធរណីមាត្រក្នុងលំហ"],
    topicsEn: ["Limits", "Derivatives", "Integrals", "Space Geometry"],
    overviewKm:
      "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ បាក់ឌុប ២០១៧ ផ្តោតលើការគណនាលីមីត និងសិក្សាអនុគមន៍អិចស្ប៉ូណង់ស្យែល។",
    overviewEn: "Official 2017 BacII Science Stream Mathematics examination paper.",
    essentialFormulaSheet: [
      {
        nameKm: "ដេរីវេអនុគមន៍បណ្តាក់",
        nameEn: "Chain Rule",
        formula: "(e^u)' = u' e^u",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 10,
        titleKm: "លំហាត់ទី ១៖ លីមីតនៃអនុគមន៍",
        titleEn: "Problem 1: Limits of Functions",
        problemTextKm: "គណនាលីមីត $L = \\lim_{x \\to 0} \\frac{\\ln(1 + 3x)}{x}$។",
        problemTextEn: "Calculate limit $L = \\lim_{x \\to 0} \\frac{\\ln(1 + 3x)}{x}$.",
        officialSolutionKm: "តាមរូបមន្ត $\\lim_{u \\to 0} \\frac{\\ln(1+u)}{u} = 1$ នោះ $L = 3\\lim_{x \\to 0} \\frac{\\ln(1+3x)}{3x} = 3$។",
        officialSolutionEn: "Using standard limit $\\lim_{u \\to 0} \\ln(1+u)/u = 1$, $L = 3$.",
        scoringCriteriaKm: ["បំប្លែងតាមទម្រង់រូបមន្ត៖ ៥.០ ពិន្ទុ", "ទាញលទ្ធផល L = 3៖ ៥.០ ពិន្ទុ"],
        keyFormulas: ["\\lim_{u \\to 0} \\frac{\\ln(1+u)}{u} = 1"],
      },
    ],
  },

  // ============================================================================
  // 17. BACII 2014–2020 MATHEMATICS COMPILATION BOOK
  // ============================================================================
  {
    id: "bacii-compilation-2014-2020-math",
    examCategory: "bacii",
    examYear: null,
    coverageStartYear: 2014,
    coverageEndYear: 2020,
    grade: 12,
    stream: "science",
    subject: "mathematics",
    competitionStage: null,
    resourceType: "multi_year_compilation",
    originalTitleKh: "កម្រងវិញ្ញាសា និងអត្រាកំណែបាក់ឌុប គណិតវិទ្យា ៧ ឆ្នាំ (២០១៤-២០២០)",
    titleKm: "កម្រងវិញ្ញាសា និងអត្រាកំណែបាក់ឌុប គណិតវិទ្យា ៧ ឆ្នាំ (២០១៤-២០២០)",
    titleEn: "MoEYS 7-Year BacII Mathematics Exam Compilation & Solution Book (2014–2020)",
    author: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ / MoEYS",
    publisher: "សាលាឌីជីថល (SALA Digital)",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "sala_moeys",
    publicationYear: 2021,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: "00001890",
    hasOfficialAnswerKey: true,
    durationMinutes: null,
    totalMarks: null,
    coefficient: 4,
    sessionDateKm: "កម្រងវិញ្ញាសា ៧ ឆ្នាំជាប់គ្នា",
    sessionDateEn: "7-Year Official Compilation (2014–2020)",
    topicsKm: ["ចំនួនកុំផ្លិច", "ប្រូបាប", "អាំងតេក្រាល", "ធរណីមាត្រក្នុងលំហ", "សមីការឌីផេរ៉ង់ស្យែល"],
    topicsEn: ["Complex Numbers", "Probability", "Calculus", "3D Geometry", "Differential Equations"],
    overviewKm:
      "កម្រងប្រមូលផ្តុំវិញ្ញាសាប្រឡងបាក់ឌុបផ្លូវការរយៈពេល ៧ ឆ្នាំ (២០១៤ ដល់ ២០២០) អមដោយដំណោះស្រាយលម្អិត និងលក្ខណៈវិនិច្ឆ័យដាក់ពិន្ទុផ្លូវការ។",
    overviewEn:
      "Authentic MoEYS 7-year BacII Mathematics compilation covering examination sessions from 2014 through 2020 with complete official rubrics.",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្តទូទៅនៃកម្រងវិញ្ញាសា",
        nameEn: "Core Mathematics Review",
        formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: null,
        titleKm: "វិញ្ញាសាគំរូ ឆ្នាំ ២០១៤៖ សមីការឌីផេរ៉ង់ស្យែល",
        titleEn: "2014 Representative Problem: Differential Equations",
        problemTextKm: "ដោះស្រាយសមីការឌីផេរ៉ង់ស្យែល $(E): y'' - 4y' + 4y = 0$ ដោយដឹងថា $y(0) = 1$ និង $y'(0) = 0$។",
        problemTextEn: "Solve $(E): y'' - 4y' + 4y = 0$ with $y(0) = 1$ and $y'(0) = 0$.",
        officialSolutionKm: "សមីការសម្គាល់ $r^2 - 4r + 4 = 0 \\Rightarrow (r - 2)^2 = 0 \\Rightarrow r_0 = 2$។ ចម្លើយទូទៅ $y = (Ax + B)e^{2x}$។ ដោយ $y(0) = 1 \\Rightarrow B = 1$; $y'(0) = 0 \\Rightarrow A + 2B = 0 \\Rightarrow A = -2$។ ដូចនេះ $y = (1 - 2x)e^{2x}$។",
        officialSolutionEn: "General solution $y = (Ax+B)e^{2x}$. Initial conditions yield $y = (1 - 2x)e^{2x}$.",
        scoringCriteriaKm: ["រកប្ញសសមីការសម្គាល់", "អនុវត្តលក្ខខណ្ឌដើមទាញរក A និង B"],
        keyFormulas: ["y = (Ax + B)e^{rx}"],
      },
    ],
  },

  // ============================================================================
  // CATEGORY B: OUTSTANDING STUDENTS EXAM (ប្រឡងជ្រើសរើសសិស្សពូកែ)
  // ============================================================================

  // 18. 2024 NATIONAL OUTSTANDING STUDENTS — GRADE 12 MATHEMATICS
  {
    id: "outstanding-2024-g12-math-national",
    examCategory: "outstanding_student",
    examYear: 2024,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: null,
    subject: "mathematics",
    competitionStage: "national",
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ១២ (២០២៤)",
    titleKm: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ១២ (២០២៤)",
    titleEn: "2024 National Outstanding Students Exam — Mathematics Grade 12",
    author: "គណៈកម្មការរៀបចំការប្រឡងសិស្សពូកែទូទាំងប្រទេស / MoEYS",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2024,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 180,
    totalMarks: 100,
    coefficient: null,
    sessionDateKm: "សម័យប្រឡង៖ ២៥ មេសា ២០២៤ (ទូទាំងប្រទេស)",
    sessionDateEn: "National Round: April 25, 2024",
    topicsKm: ["វិសមភាព Cauchy-Schwarz", "សមីការអនុគមន៍", "ទ្រឹស្តីបទចំនួន", "ធរណីមាត្រអូឡាំពិក"],
    topicsEn: ["Inequalities", "Functional Equations", "Number Theory", "Euclidean Geometry"],
    overviewKm:
      "វិញ្ញាសាប្រឡងសិស្សពូកែទូទាំងប្រទេសផ្នែកគណិតវិទ្យា ថ្នាក់ទី១២ ប្រចាំឆ្នាំ២០២៤ រៀបចំដោយក្រសួងអប់រំ យុវជន និងកីឡា។",
    overviewEn:
      "Official 2024 National Outstanding Student Competition paper in Mathematics for Grade 12 students across Cambodia.",
    essentialFormulaSheet: [
      {
        nameKm: "វិសមភាព Cauchy-Schwarz",
        nameEn: "Cauchy-Schwarz Inequality",
        formula: "(a_1^2 + a_2^2 + a_3^2)(b_1^2 + b_2^2 + b_3^2) \\ge (a_1b_1 + a_2b_2 + a_3b_3)^2",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 20,
        titleKm: "លំហាត់ទី ១៖ វិសមភាពពិជគណិត",
        titleEn: "Problem 1: Algebraic Inequality",
        problemTextKm: "ចំពោះគ្រប់ចំនួនពិតវិជ្ជមាន $a, b, c > 0$ ដែលផ្ទៀងផ្ទាត់ $abc = 1$។ ចូរស្រាយបញ្ជាក់ថា៖\\n$$\\frac{1}{a^3(b+c)} + \\frac{1}{b^3(c+a)} + \\frac{1}{c^3(a+b)} \\ge \\frac{3}{2}$$",
        problemTextEn: "For all positive real numbers $a, b, c > 0$ such that $abc = 1$, prove that:\\n$$\\frac{1}{a^3(b+c)} + \\frac{1}{b^3(c+a)} + \\frac{1}{c^3(a+b)} \\ge \\frac{3}{2}$$",
        officialSolutionKm: "តាង $x = 1/a, y = 1/b, z = 1/c$ នោះ $xyz = 1$។ កន្សោមប្រែជា $\\frac{x^2}{y+z} + \\frac{y^2}{z+x} + \\frac{z^2}{x+y}$។ តាមវិសមភាព Cauchy-Schwarz (ទម្រង់ Bergström)៖ សរុប $\\ge \\frac{(x+y+z)^2}{2(x+y+z)} = \\frac{x+y+z}{2} \\ge \\frac{3\\sqrt[3]{xyz}}{2} = \\frac{3}{2}$។",
        officialSolutionEn: "Substitution $x=1/a, y=1/b, z=1/c$ and Bergström Cauchy-Schwarz inequality completes the proof.",
        scoringCriteriaKm: ["ប្តូរអថេរត្រឹមត្រូវ៖ ៦.០ ពិន្ទុ", "អនុវត្តវិសមភាព Cauchy-Schwarz៖ ៨.០ ពិន្ទុ", "ទាញអប្បបរមា 3/2៖ ៦.០ ពិន្ទុ"],
        keyFormulas: ["\\sum \\frac{x^2}{y+z} \\ge \\frac{x+y+z}{2}"],
      },
    ],
  },

  // 19. 2024 NATIONAL OUTSTANDING STUDENTS — GRADE 9 MATHEMATICS
  {
    id: "outstanding-2024-g9-math-national",
    examCategory: "outstanding_student",
    examYear: 2024,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 9,
    stream: null,
    subject: "mathematics",
    competitionStage: "national",
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ៩ (២០២៤)",
    titleKm: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ៩ (២០២៤)",
    titleEn: "2024 National Outstanding Students Exam — Mathematics Grade 9",
    author: "គណៈកម្មការរៀបចំការប្រឡងសិស្សពូកែទូទាំងប្រទេស / MoEYS",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2024,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 150,
    totalMarks: 100,
    coefficient: null,
    sessionDateKm: "សម័យប្រឡង៖ ២៥ មេសា ២០២៤ (ទូទាំងប្រទេស)",
    sessionDateEn: "National Round: April 25, 2024",
    topicsKm: ["ប្រព័ន្ធសមីការពិជគណិត", "ពហុធា", "ធរណីមាត្ររង្វង់", "ចំនួនគត់"],
    topicsEn: ["Systems of Equations", "Polynomials", "Circle Geometry", "Integer Arithmetic"],
    overviewKm:
      "វិញ្ញាសាប្រឡងសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យាថ្នាក់ទី៩ ឆ្នាំ២០២៤ ផ្តោតលើភាពច្នៃប្រឌិតក្នុងការដោះស្រាយសមីការ និងធរណីមាត្រកម្រិតខ្ពស់។",
    overviewEn: "Official 2024 National Grade 9 Outstanding Students Mathematics examination paper.",
    essentialFormulaSheet: [
      {
        nameKm: "រូបមន្តផលបូក និងផលគុណប្ញស (Viète)",
        nameEn: "Viète's Formulas",
        formula: "x_1 + x_2 = -\frac{b}{a},\quad x_1x_2 = \frac{c}{a}",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 20,
        titleKm: "លំហាត់ទី ១៖ ប្រព័ន្ធសមីការអញ្ញាតពីរ",
        titleEn: "Problem 1: Algebraic System",
        problemTextKm: "ដោះស្រាយក្នុងសំណុំចំនួនពិតនូវប្រព័ន្ធសមីការ៖\\n$$\\begin{cases} x + y + xy = 11 \\\\ x^2y + xy^2 = 30 \\end{cases}$$",
        problemTextEn: "Solve in $\\mathbb{R}$: $x + y + xy = 11$ and $xy(x + y) = 30$.",
        officialSolutionKm: "តាង $S = x + y, P = xy$។ ប្រព័ន្ធទៅជា $S + P = 11$ និង $SP = 30$។ នោះ $S$ និង $P$ ជាប្ញសនៃ $t^2 - 11t + 30 = 0 \\Rightarrow t = 5$ ឬ $t = 6$។ គូដំណោះស្រាយ $(x, y)$ គឺ $(2, 3), (3, 2), (1, 5), (5, 1)$។",
        officialSolutionEn: "Substitution $S = x+y, P=xy$ yields solutions $(2,3), (3,2), (1,5), (5,1)$.",
        scoringCriteriaKm: ["ប្តូរអថេរ S, P៖ ៦.០ ពិន្ទុ", "ដោះស្រាយសមីការដឺក្រេទី២៖ ៦.០ ពិន្ទុ", "ទាញរកគ្រប់គូចម្លើយ (x, y)៖ ៨.០ ពិន្ទុ"],
        keyFormulas: ["t^2 - St + P = 0"],
      },
    ],
  },

  // 20. 2024 NATIONAL OUTSTANDING STUDENTS — GRADE 12 PHYSICS
  {
    id: "outstanding-2024-g12-phys-national",
    examCategory: "outstanding_student",
    examYear: 2024,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: null,
    subject: "physics",
    competitionStage: "national",
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស រូបវិទ្យា ថ្នាក់ទី ១២ (២០២៤)",
    titleKm: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស រូបវិទ្យា ថ្នាក់ទី ១២ (២០២៤)",
    titleEn: "2024 National Outstanding Students Exam — Physics Grade 12",
    author: "គណៈកម្មការរៀបចំការប្រឡងសិស្សពូកែទូទាំងប្រទេស / MoEYS",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2024,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 180,
    totalMarks: 100,
    coefficient: null,
    sessionDateKm: "សម័យប្រឡង៖ ២៥ មេសា ២០២៤ (ទូទាំងប្រទេស)",
    sessionDateEn: "National Round: April 25, 2024",
    topicsKm: ["មេកានិចញូតុន", "លំយោលភ្ជាប់", "អគ្គិសនី និងដែនម៉ាញ៉េទិច", "អុបទិចរលក"],
    topicsEn: ["Newtonian Mechanics", "Coupled Oscillations", "Electromagnetism", "Wave Optics"],
    overviewKm:
      "វិញ្ញាសាប្រឡងសិស្សពូកែទូទាំងប្រទេស ផ្នែករូបវិទ្យា ថ្នាក់ទី១២ ឆ្នាំ២០២៤។",
    overviewEn: "Official 2024 National Grade 12 Outstanding Students Physics competition paper.",
    essentialFormulaSheet: [
      {
        nameKm: "ច្បាប់ទី២ ញូតុន",
        nameEn: "Newton's 2nd Law",
        formula: "\\sum \\vec{F} = m\\vec{a}",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 25,
        titleKm: "លំហាត់ទី ១៖ លំយោលមេកានិចនៃប្រព័ន្ធស្ព្រីងពីរ",
        titleEn: "Problem 1: Coupled Spring-Mass Oscillation",
        problemTextKm: "អង្គធាតុមួយមានម៉ាស់ $m = 200\\,\\text{g}$ ភ្ជាប់រវាងស្ព្រីងពីរមានថេរកម្រញ $k_1 = 30\\,\\text{N/m}$ និង $k_2 = 50\\,\\text{N/m}$ លើប្លង់ដេកគ្មានកកិត។ គណនាខួបលំយោលតូចនៃប្រព័ន្ធ។",
        problemTextEn: "A mass $m = 200\\,\\text{g}$ is connected between two horizontal springs with constants $k_1 = 30\\,\\text{N/m}$ and $k_2 = 50\\,\\text{N/m}$. Find oscillation period.",
        officialSolutionKm: "ស្ព្រីងទាំងពីរតស្រប៖ $k_{\\text{eq}} = k_1 + k_2 = 80\\,\\text{N/m}$។ ខួប៖ $T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}} = 2\\pi\\sqrt{\\frac{0.2}{80}} = 2\\pi \\times \\frac{1}{20} = \\frac{\\pi}{10} \\approx 0.314\\,\\text{s}$។",
        officialSolutionEn: "Parallel springs $k_{\\text{eq}} = k_1 + k_2 = 80\\,\\text{N/m}$. Period $T = \\pi/10 \\approx 0.314\\,\\text{s}$.",
        scoringCriteriaKm: ["គណនាថេរកម្រញសមមូល៖ ១០.០ ពិន្ទុ", "គណនាខួបលំយោល T៖ ១៥.០ ពិន្ទុ"],
        keyFormulas: ["T = 2\\pi\\sqrt{\\frac{m}{k}}"],
      },
    ],
  },

  // 21. 2023 NATIONAL OUTSTANDING STUDENTS — GRADE 12 MATHEMATICS
  {
    id: "outstanding-2023-g12-math-national",
    examCategory: "outstanding_student",
    examYear: 2023,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: null,
    subject: "mathematics",
    competitionStage: "national",
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ១២ (២០២៣)",
    titleKm: "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យា ថ្នាក់ទី ១២ (២០២៣)",
    titleEn: "2023 National Outstanding Students Exam — Mathematics Grade 12",
    author: "គណៈកម្មការរៀបចំការប្រឡងសិស្សពូកែទូទាំងប្រទេស / MoEYS",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2023,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 180,
    totalMarks: 100,
    coefficient: null,
    sessionDateKm: "សម័យប្រឡង៖ ២៦ មេសា ២០២៣ (ទូទាំងប្រទេស)",
    sessionDateEn: "National Round: April 26, 2023",
    topicsKm: ["ស្វ៊ីតចំនួនពិត", "សមីការអនុគមន៍", "ធរណីមាត្រ"],
    topicsEn: ["Sequences", "Functional Equations", "Geometry"],
    overviewKm:
      "វិញ្ញាសាប្រឡងសិស្សពូកែទូទាំងប្រទេស គណិតវិទ្យាថ្នាក់ទី១២ ឆ្នាំ២០២៣។",
    overviewEn: "Official 2023 National Grade 12 Outstanding Students Mathematics competition paper.",
    essentialFormulaSheet: [
      {
        nameKm: "ផលបូកស្វ៊ីតធរណីមាត្រ",
        nameEn: "Geometric Series Sum",
        formula: "S_n = \\frac{u_1(1 - q^n)}{1 - q}",
      },
    ],
    questions: [
      {
        questionNumber: 1,
        points: 20,
        titleKm: "លំហាត់ទី ១៖ ស្វ៊ីតចំនួនពិត",
        titleEn: "Problem 1: Real Sequences & Limits",
        problemTextKm: "គេមានស្វ៊ីត $(u_n)$ កំណត់ដោយ $u_1 = 1$ និង $u_{n+1} = \\frac{u_n}{1 + u_n}$ ចំពោះគ្រប់ $n \\ge 1$។ គណនាកន្សោម $u_n$ ជាអនុគមន៍នៃ $n$ និងរកលីមីត $\\lim_{n \\to \\infty} n \\cdot u_n$។",
        problemTextEn: "Given $u_1 = 1$ and $u_{n+1} = u_n / (1 + u_n)$. Find $u_n$ and $\\lim_{n \\to \\infty} n \\cdot u_n$.",
        officialSolutionKm: "យកចម្រាស៖ $\\frac{1}{u_{n+1}} = \\frac{1}{u_n} + 1$ នោះស្វ៊ីត $v_n = \\frac{1}{u_n}$ ជាស្វ៊ីតនព្វន្តមាន $v_1 = 1$ និង $d = 1$។ នាំឱ្យ $v_n = n \\Rightarrow u_n = \\frac{1}{n}$។ ដូចនេះ $\\lim_{n \\to \\infty} n \\cdot u_n = 1$។",
        officialSolutionEn: "Reciprocal transformation yields $v_n = 1/u_n = n$, so $u_n = 1/n$ and $\\lim n u_n = 1$.",
        scoringCriteriaKm: ["ប្តូរអថេរចម្រាស v_n៖ ៨.០ ពិន្ទុ", "ទាញរក u_n = 1/n៖ ៦.០ ពិន្ទុ", "គណនាលីមីតស្មើ 1៖ ៦.០ ពិន្ទុ"],
        keyFormulas: ["v_n = v_1 + (n - 1)d"],
      },
    ],
  },

  // 22. 2023 PROVINCIAL OUTSTANDING STUDENTS — GRADE 12 KHMER LITERATURE
  {
    id: "outstanding-2023-g12-khmer-provincial",
    examCategory: "outstanding_student",
    examYear: 2023,
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    stream: null,
    subject: "khmer",
    competitionStage: "provincial",
    resourceType: "single_exam",
    originalTitleKh: "វិញ្ញាសាប្រឡងសិស្សពូកែរាជធានី-ខេត្ត ភាសាខ្មែរ ថ្នាក់ទី ១២ (២០២៣)",
    titleKm: "វិញ្ញាសាប្រឡងសិស្សពូកែរាជធានី-ខេត្ត ភាសាខ្មែរ ថ្នាក់ទី ១២ (២០២៣)",
    titleEn: "2023 Provincial Outstanding Students Exam — Khmer Literature Grade 12",
    author: "មន្ទីរអប់រំ យុវជន និងកីឡា / MoEYS",
    publisher: "មន្ទីរអប់រំ យុវជន និងកីឡា",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    sourcePlatform: "moeys_official",
    publicationYear: 2023,
    language: "km",
    pdfUrl: null,
    answerKeyUrl: null,
    sourceUrl: "https://sala.moeys.gov.kh/",
    salaReferenceId: null,
    hasOfficialAnswerKey: true,
    durationMinutes: 180,
    totalMarks: 100,
    coefficient: null,
    sessionDateKm: "សម័យប្រឡង៖ មីនា ២០២៣ (កម្រិតរាជធានី-ខេត្ត)",
    sessionDateEn: "Provincial Round: March 2023",
    topicsKm: ["អក្សរសិល្ប៍ប្រៀបធៀប", "តែងសេចក្តីបែបពន្យល់ និងពិភាក្សា", "ទស្សនវិជ្ជាជីវិតក្នុងរឿងទុំទាវ"],
    topicsEn: ["Comparative Literature", "Expository Essay", "Khmer Classical Literature"],
    overviewKm:
      "វិញ្ញាសាប្រឡងជ្រើសរើសសិស្សពូកែភាសាខ្មែរកម្រិតរាជធានី-ខេត្ត ដើម្បីបញ្ជូនទៅប្រកួតថ្នាក់ជាតិ។",
    overviewEn: "Provincial stage selection exam for Outstanding Students in Khmer Literature.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 100,
        titleKm: "ប្រធានតែងសេចក្តី (អក្សរសិល្ប៍វិភាគ)",
        titleEn: "Literary Analysis Essay",
        problemTextKm: "មានទស្សនៈមួយលើកឡើងថា៖ «អក្សរសិល្ប៍ខ្មែរបុរាណ មិនត្រឹមតែឆ្លុះបញ្ចាំងពីតថភាពសង្គមប៉ុណ្ណោះទេ ថែមទាំងជាកញ្ចក់បណ្តុះស្មារតីស្នេហាជាតិ និងតម្លៃសីលធម៌មនុស្សយ៉ាងជ្រាលជ្រៅ»។ ចូរពន្យល់ និងលើកឧទាហរណ៍ពីរឿងទុំទាវ និងរឿងកុលាបប៉ៃលិនមកបញ្ជាក់។",
        problemTextEn: "Discuss the moral, cultural, and patriotic reflections in classical Khmer literature with references to Tum Teav and Kolab Pailin.",
        officialSolutionKm: "គម្រោងតែង៖\\n១. សេចក្តីផ្តើម៖ បញ្ចូលបញ្ហា ចង្អុលប្រធាន និងចោទសួរ។\\n២. តួសេចក្តី៖ បកស្រាយន័យតថភាពសង្គម និងការបណ្តុះសីលធម៌តាមរយៈតួអង្គទុំទាវ ចៅចិត្រ និងឃុននារី។\\n៣. សេចក្តីបញ្ចប់៖ វាយតម្លៃប្រធាន និងមតិផ្ទាល់ខ្លួន។",
        officialSolutionEn: "Standard 3-part Khmer essay structure with contextual citations and critical evaluation.",
        scoringCriteriaKm: ["ទម្រង់តែងសេចក្តីត្រឹមត្រូវ៖ ២០ ពិន្ទុ", "ការវិភាគគំនិតស៊ីជម្រៅ៖ ៥០ ពិន្ទុ", "ការលើកឧទាហរណ៍សមស្រប និងអក្ខរាវិរុទ្ធ៖ ៣០ ពិន្ទុ"],
        keyFormulas: [],
      },
    ],
  },

  // ============================================================================
  // BAC II 2024 — HISTORY (SOCIAL SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-hist-social",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_social/BACII_SOCIAL_HISTORY_2024.pdf",
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "social",
    subject: "history",
    originalTitleKh: "វិញ្ញាសា ប្រវត្តិវិទ្យា — បាក់ឌុប ២០២៤ (ថ្នាក់សង្គម)",
    titleKm: "វិញ្ញាសា ប្រវត្តិវិទ្យា — បាក់ឌុប ២០២៤ (ថ្នាក់សង្គម)",
    titleEn: "2024 Bac II History Official Exam (Social Science Stream)",
    durationMinutes: 90,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 3,
    topicsKm: ["សង្គមរាស្ត្រនិយម", "របបកម្ពុជាប្រជាធិបតេយ្យ", "កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១"],
    topicsEn: ["Sangkum Reastr Niyum", "Democratic Kampuchea", "Paris Peace Accords 1991"],
    overviewKm: "វិញ្ញាសាផ្លូវការប្រវត្តិវិទ្យាថ្នាក់វិទ្យាសាស្ត្រសង្គម សម័យប្រឡង ០៨ តុលា ២០២៤។",
    overviewEn: "Official Social Science Stream History paper covering modern Cambodian history.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 25,
        titleKm: "សំណួរទី ១៖ សម័យសង្គមរាស្ត្រនិយម (១៩៥៣–១៩៧០)",
        titleEn: "Question 1: Sangkum Reastr Niyum Era",
        problemTextKm: "ចូររៀបរាប់ពីសមិទ្ធផលសំខាន់ៗនៃការកសាងជាតិក្នុងសម័យសង្គមរាស្ត្រនិយម លើវិស័យអប់រំ វប្បធម៌ និងហេដ្ឋារចនាសម្ព័ន្ធ។",
        problemTextEn: "Describe key national achievements of Sangkum Reastr Niyum in education, culture, and infrastructure.",
        officialSolutionKm: "១. វិស័យអប់រំ៖ ការបង្កើតសាកលវិទ្យាល័យភូមិន្ទ និងពង្រីកសាលារៀនទូទាំងប្រទេស។\n២. ហេដ្ឋារចនាសម្ព័ន្ធ៖ កំពង់ផែក្រុងព្រះសីហនុ ផ្លូវជាតិលេខ៤ និងផ្លូវដែកភ្នំពេញ-ក្រុងព្រះសីហនុ។",
        officialSolutionEn: "Key points: Expansion of royal universities, Sihanoukville Autonomous Port, and National Highway 4.",
        scoringCriteriaKm: ["វិស័យអប់រំ៖ ១០ ពិន្ទុ", "ហេដ្ឋារចនាសម្ព័ន្ធ៖ ១០ ពិន្ទុ", "សេចក្តីសន្និដ្ឋាន៖ ៥ ពិន្ទុ"],
        keyFormulas: [],
      },
      {
        questionNumber: 2,
        points: 25,
        titleKm: "សំណួរទី ២៖ របបកម្ពុជាប្រជាធិបតេយ្យ (១៩៧៥–១៩៧៩)",
        titleEn: "Question 2: Democratic Kampuchea Regime",
        problemTextKm: "ចូរវិភាគពីផលវិបាកធ្ងន់ធ្ងរនៃនយោបាយជម្លៀសប្រជាជន និងការលុបបំបាត់រចនាសម្ព័ន្ធសង្គមក្នុងរបបកម្ពុជាប្រជាធិបតេយ្យ។",
        problemTextEn: "Analyze the severe consequences of forced evacuations and destruction of social structures under the Khmer Rouge.",
        officialSolutionKm: "ការជម្លៀសប្រជាជនបណ្តាលឱ្យបែកបាក់គ្រួសារ បាត់បង់ធនធានមនុស្សបញ្ញវន្ត និងការបំផ្លាញប្រព័ន្ធសេដ្ឋកិច្ចរូបិយវត្ថុទាំងស្រុង។",
        officialSolutionEn: "Family separation, destruction of intellectual class, abolition of currency and religious institutions.",
        scoringCriteriaKm: ["ការបកស្រាយផលវិបាកមនុស្សធម៌៖ ១៥ ពិន្ទុ", "ផលវិបាកសង្គម-សេដ្ឋកិច្ច៖ ១០ ពិន្ទុ"],
        keyFormulas: [],
      },
      {
        questionNumber: 3,
        points: 25,
        titleKm: "សំណួរទី ៣៖ កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១",
        titleEn: "Question 3: Paris Peace Agreements 1991",
        problemTextKm: "តើកិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១ មានសារៈសំខាន់ជាប្រវត្តិសាស្ត្រយ៉ាងដូចម្តេចខ្លះចំពោះការបង្រួបបង្រួមជាតិ និងដំណើរការប្រជាធិបតេយ្យនៅកម្ពុជា?",
        problemTextEn: "What historical significance did the October 23, 1991 Paris Peace Agreements hold for Cambodian national reconciliation and democracy?",
        officialSolutionKm: "កិច្ចព្រមព្រៀងប៉ារីសបានបញ្ចប់សង្គ្រាមស៊ីវិលរ៉ាំរ៉ៃ បង្កើតអាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិ (UNTAC) និងបើកផ្លូវដល់ការបោះឆ្នោតសកលឆ្នាំ១៩៩៣ និងការបង្កើតរដ្ឋធម្មនុញ្ញថ្មី។",
        officialSolutionEn: "Ended civil war, established UNTAC mandate, led to 1993 national democratic elections and new Constitution.",
        scoringCriteriaKm: ["ការបញ្ចប់សង្គ្រាម និង UNTAC៖ ១៥ ពិន្ទុ", "ការបង្កើតរដ្ឋធម្មនុញ្ញ និងលទ្ធិប្រជាធិបតេយ្យ៖ ១០ ពិន្ទុ"],
        keyFormulas: [],
      }
    ],
  },

  // ============================================================================
  // BAC II 2024 — KHMER LITERATURE (SOCIAL SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2024-khmer-social",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2024,
    examSessionYear: 2024,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2024,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_social/BACII_SOCIAL_KHMER_2024.pdf",
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨ តុលា ២០២៤",
    sessionDateEn: "Official Session: October 8, 2024",
    stream: "social",
    subject: "khmer",
    originalTitleKh: "វិញ្ញាសា អក្សរសាស្ត្រខ្មែរ — បាក់ឌុប ២០២៤ (ថ្នាក់សង្គម)",
    titleKm: "វិញ្ញាសា អក្សរសាស្ត្រខ្មែរ — បាក់ឌុប ២០២៤ (ថ្នាក់សង្គម)",
    titleEn: "2024 Bac II Khmer Literature Official Exam (Social Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 5,
    questionCount: 2,
    topicsKm: ["ការយល់ដឹងអត្ថបទ", "តែងសេចក្តីបែបអធិប្បាយ និងពន្យល់"],
    topicsEn: ["Reading Comprehension", "Analytical Essay"],
    overviewKm: "វិញ្ញាសាស្នូលមេគុណ ៥ សម្រាប់បេក្ខជនថ្នាក់វិទ្យាសាស្ត្រសង្គម។",
    overviewEn: "Core Coefficient-5 paper for Social Science candidates with comprehensive literary essay.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 25,
        titleKm: "ផ្នែកទី ១៖ អត្ថបទ និងវេយ្យាករណ៍",
        titleEn: "Part 1: Text Analysis & Syntax",
        problemTextKm: "ចូរពន្យល់ពាក្យគន្លឹះ និងកំណត់ប្រភេទកាព្យក្នុងកម្រងកំណាព្យ 'ទស្សនៈជីវិត'។",
        problemTextEn: "Explain contextual vocabulary and poetic meter.",
        officialSolutionKm: "ការបកស្រាយន័យត្រង់ ន័យធៀប និងបទពាក្យ៧។",
        officialSolutionEn: "Direct and metaphorical definitions with Khmer 7-syllable meter analysis.",
        scoringCriteriaKm: ["ពន្យល់ពាក្យ៖ ១០ ពិន្ទុ", "វិភាគទម្រង់កាព្យ៖ ១៥ ពិន្ទុ"],
        keyFormulas: [],
      },
      {
        questionNumber: 2,
        points: 50,
        titleKm: "ផ្នែកទី ២៖ តែងសេចក្តីបែបពន្យល់ និងពិភាក្សា",
        titleEn: "Part 2: Argumentative & Expository Essay",
        problemTextKm: "ប្រធាន៖ «ចំណេះវិជ្ជា និងសីលធម៌ គឺជាស្លាបទាំងពីរជួយនាំមនុស្សឱ្យហោះហើរទៅរកភាពជោគជ័យ និងសុភមង្គលពិតប្រាកដ»។ ចូរពន្យល់ និងលើកឧទាហរណ៍ក្នុងសង្គម និងអក្សរសិល្ប៍មកបញ្ជាក់។",
        problemTextEn: "Discuss: 'Knowledge and morality are the two wings that elevate humanity toward genuine success and fulfillment.'",
        officialSolutionKm: "គម្រោងតែងពេញលេញ៖ សេចក្តីផ្តើម តួសេចក្តី (ចំណេះដឹងជាមធ្យោបាយ សីលធម៌ជាត្រីវិស័យ) និងសេចក្តីបញ្ចប់។",
        officialSolutionEn: "Complete 3-stage essay evaluating competence and ethics.",
        scoringCriteriaKm: ["ទម្រង់តែងសេចក្តី៖ ១០ ពិន្ទុ", "អំណះអំណាង និងឧទាហរណ៍៖ ២៥ ពិន្ទុ", "អក្ខរាវិរុទ្ធ និងសំនួនវោហារ៖ ១៥ ពិន្ទុ"],
        keyFormulas: [],
      }
    ],
  },

  // ============================================================================
  // BAC II 2018 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2018-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2018,
    examSessionYear: 2018,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2018,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_science/BACII_SCIENCE_MATHEMATICS_2018.pdf",
    year: 2018,
    sessionDateKm: "សម័យប្រឡង៖ ២០ សីហា ២០១៨",
    sessionDateEn: "Official Session: August 20, 2018",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៨ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៨ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2018 Bac II Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 4,
    topicsKm: ["ចំនួនកុំផ្លិច", "ប្រូបាប", "ធរណីមាត្រក្នុងលំហ", "អនុគមន៍អិចស្ប៉ូណង់ស្យែល"],
    topicsEn: ["Complex Numbers", "Probability", "Space Geometry", "Exponential Functions"],
    overviewKm: "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ សម័យប្រឡង ២០ សីហា ២០១៨។",
    overviewEn: "Official Bac II Mathematics exam for Science Stream held on August 20, 2018.",
    essentialFormulaSheet: [
      {
        nameKm: "សមីការបន្ទាត់កាត់តាមចំណុច និងវ៉ិចទ័រប្រាប់ទិស",
        nameEn: "Parametric Line Equation",
        formula: "\begin{cases} x = x_0 + at \\ y = y_0 + bt \\ z = z_0 + ct \end{cases}",
        noteKm: "សមីការប៉ារ៉ាមែត្រក្នុងលំហ",
      }
    ],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច",
        titleEn: "Problem 1: Complex Roots",
        problemTextKm: "ដោះស្រាយសមីការក្នុងសំណុំ $\\mathbb{C}$៖ $z^2 - 2\\sqrt{3}z + 4 = 0$។ សរសេរប្ញសជាទម្រង់ត្រីកោណមាត្រ។",
        problemTextEn: "Solve $z^2 - 2\\sqrt{3}z + 4 = 0$ in $\\mathbb{C}$ and express roots in trigonometric form.",
        officialSolutionKm: "\\Delta' = (\\sqrt{3})^2 - 4 = -1 = i^2 ⇒ z = \\sqrt{3} \\pm i = 2(\\cos(\\pm\\pi/6) + i\\sin(\\pm\\pi/6))។",
        officialSolutionEn: "Roots: $z_1 = 2(\\cos(\\pi/6) + i\\sin(\\pi/6))$, $z_2 = 2(\\cos(-\\pi/6) + i\\sin(-\\pi/6))$.",
        scoringCriteriaKm: ["គណនាឌីសគ្រីមីណង់៖ ៥ ពិន្ទុ", "ទម្រង់ត្រីកោណមាត្រ៖ ១០ ពិន្ទុ"],
        keyFormulas: ["\\Delta' = b'^2 - ac"],
      }
    ],
  },

  // ============================================================================
  // BAC II 2016 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2016-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2016,
    examSessionYear: 2016,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2016,
    sourcePlatform: "khmer_bac_ii_archive",
    sourceUrl: "https://apps.apple.com/kh/app/khmer-bac-ii/id1134884145",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_science/BACII_SCIENCE_MATHEMATICS_2016.pdf",
    year: 2016,
    sessionDateKm: "សម័យប្រឡង៖ ២២ សីហា ២០១៦",
    sessionDateEn: "Official Session: August 22, 2016",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៦ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៦ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2016 Bac II Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 4,
    topicsKm: ["លីមីត និងដេរីវេ", "អាំងតេក្រាល", "ធរណីមាត្រក្នុងលំហ"],
    topicsEn: ["Limits and Derivatives", "Integrals", "Space Geometry"],
    overviewKm: "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ សម័យប្រឡង ២២ សីហា ២០១៦។",
    overviewEn: "Official Bac II Mathematics exam for Science Stream held on August 22, 2016.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ លីមីតនៃអនុគមន៍",
        titleEn: "Problem 1: Limits Evaluation",
        problemTextKm: "គណនាលីមីត $L = \\lim_{x \\to 0} \\frac{\\sqrt{1 + 2x} - 1}{x}$។",
        problemTextEn: "Evaluate limit $L = \\lim_{x \\to 0} \\frac{\\sqrt{1 + 2x} - 1}{x}$.",
        officialSolutionKm: "គុណកន្សោមឆ្លាស់៖ $\\frac{(\\sqrt{1+2x}-1)(\\sqrt{1+2x}+1)}{x(\\sqrt{1+2x}+1)} = \\frac{2x}{x(\\sqrt{1+2x}+1)} = \\frac{2}{\\sqrt{1+2x}+1} \\to 1$។",
        officialSolutionEn: "Multiplying conjugate yields limit $L = 1$.",
        scoringCriteriaKm: ["គុណកន្សោមឆ្លាស់៖ ៧.៥ ពិន្ទុ", "គណនាលទ្ធផលចុងក្រោយ L = 1៖ ៧.៥ ពិន្ទុ"],
        keyFormulas: ["(a-b)(a+b) = a^2 - b^2"],
      }
    ],
  },

  // ============================================================================
  // BAC II 2015 — MATHEMATICS (SCIENCE STREAM)
  // ============================================================================
  {
    id: "bacii-2015-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2015,
    examSessionYear: 2015,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2015,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_science/BACII_SCIENCE_MATHEMATICS_2015.pdf",
    year: 2015,
    sessionDateKm: "សម័យប្រឡង៖ ២៤ សីហា ២០១៥",
    sessionDateEn: "Official Session: August 24, 2015",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៥ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៥ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2015 Bac II Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 4,
    topicsKm: ["ចំនួនកុំផ្លិច", "ប្រូបាប", "អាំងតេក្រាលដោយផ្នែក"],
    topicsEn: ["Complex Numbers", "Probability", "Integration by Parts"],
    overviewKm: "វិញ្ញាសាផ្លូវការគណិតវិទ្យាថ្នាក់វិទ្យាសាស្ត្រ សម័យប្រឡង ២៤ សីហា ២០១៥។",
    overviewEn: "Official Bac II Mathematics exam for Science Stream held on August 24, 2015.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ប្រូបាប",
        titleEn: "Problem 1: Probability",
        problemTextKm: "ក្នុងថង់មួយមានឃ្លីក្រហម ៣ និងឃ្លីខៀវ ៥។ ចាប់យក ២ ដោយចៃដន្យព្រមគ្នា។ រកប្រូបាបចាប់បានពណ៌ដូចគ្នា។",
        problemTextEn: "A bag has 3 red and 5 blue marbles. Draw 2 simultaneously. Find probability of same color.",
        officialSolutionKm: "$n(S) = C(8, 2) = 28$។ $n(A) = C(3, 2) + C(5, 2) = 3 + 10 = 13$។ $P(A) = \\frac{13}{28}$។",
        officialSolutionEn: "$P(A) = 13/28$.",
        scoringCriteriaKm: ["គណនា n(S) = 28៖ ៥ ពិន្ទុ", "គណនា n(A) = 13៖ ៥ ពិន្ទុ", "គណនា P(A) = 13/28៖ ៥ ពិន្ទុ"],
        keyFormulas: ["C(n, p) = \\frac{n!}{p!(n-p)!}"],
      }
    ],
  },

  // ============================================================================
  // BAC II 2014 — MATHEMATICS (HISTORIC REFORM YEAR)
  // ============================================================================
  {
    id: "bacii-2014-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2014,
    examSessionYear: 2014,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2014,
    sourcePlatform: "moeys_official",
    sourceUrl: "https://moeys.gov.kh/",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_science/BACII_SCIENCE_MATHEMATICS_2014.pdf",
    year: 2014,
    sessionDateKm: "សម័យប្រឡង៖ ០៤ សីហា ២០១៤ (កំណែទម្រង់ប្រវត្តិសាស្ត្រ)",
    sessionDateEn: "Official Session: August 4, 2014 (Historic Reform Exam)",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2014 Bac II Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 4,
    topicsKm: ["កំណែទម្រង់ប្រឡងបាក់ឌុប", "អាំងតេក្រាល", "ធរណីមាត្រក្នុងលំហ", "អនុគមន៍"],
    topicsEn: ["Historic Reform Exam", "Integrals", "Space Geometry", "Functions"],
    overviewKm: "វិញ្ញាសាប្រឡងបាក់ឌុបឆ្នាំប្រវត្តិសាស្ត្រ ២០១៤ ក្រោមការដឹកនាំកំណែទម្រង់របស់ ឯកឧត្តមបណ្ឌិតសភាចារ្យ ហង់ជួន ណារ៉ុន។",
    overviewEn: "Landmark historic 2014 exam initiating MoEYS strict anti-cheating examination reform.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ ចំនួនកុំផ្លិច",
        titleEn: "Problem 1: Complex Numbers",
        problemTextKm: "គណនា $Z = (1 + i)^8$ ដោយប្រើរូបមន្តដឺម័រ។",
        problemTextEn: "Compute $Z = (1 + i)^8$ using De Moivre's formula.",
        officialSolutionKm: "$1 + i = \\sqrt{2}(\\cos(\\pi/4) + i\\sin(\\pi/4))$ ⇒ $Z = (\\sqrt{2})^8(\\cos(2\\pi) + i\\sin(2\\pi)) = 16(1 + 0) = 16$។",
        officialSolutionEn: "Modulus $r = \\sqrt{2}$, argument $\\pi/4$. Result: $Z = 16$.",
        scoringCriteriaKm: ["បំប្លែងទម្រង់ត្រីកោណមាត្រ៖ ៧.៥ ពិន្ទុ", "ទាញលទ្ធផលចុងក្រោយ Z = 16៖ ៧.៥ ពិន្ទុ"],
        keyFormulas: ["(r(\\cos\\theta + i\\sin\\theta))^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))"],
      }
    ],
  },

  // ============================================================================
  // BAC II 2012 — MATHEMATICS (BASELINE YEAR)
  // ============================================================================
  {
    id: "bacii-2012-math-science",
    examCategory: "bacii",
    coverageStartYear: null,
    coverageEndYear: null,
    grade: 12,
    competitionStage: null,
    examYear: 2012,
    examSessionYear: 2012,
    level: 12,
    resourceType: "official_national_exam",
    issuingOrganization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    language: "km",
    answerKeyUrl: null,
    publicationYear: 2012,
    sourcePlatform: "khmer_bac_ii_archive",
    sourceUrl: "https://apps.apple.com/kh/app/khmer-bac-ii/id1134884145",
    salaReferenceId: null,
    author: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    publisher: "នាយកដ្ឋានមធ្យមសិក្សាចំណេះទូទៅ",
    hasOfficialAnswerKey: true,
    pdfUrl: "/archive/bacii_science/BACII_SCIENCE_MATHEMATICS_2012.pdf",
    year: 2012,
    sessionDateKm: "សម័យប្រឡង៖ សីហា ២០១២",
    sessionDateEn: "Official Session: August 2012",
    stream: "science",
    subject: "mathematics",
    originalTitleKh: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១២ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា — បាក់ឌុប ២០១២ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "2012 Bac II Mathematics Official Exam (Science Stream)",
    durationMinutes: 150,
    totalMarks: 75,
    coefficient: 4,
    questionCount: 4,
    topicsKm: ["សមីការឌីផេរ៉ង់ស្យែល", "កោនិច", "ធរណីមាត្រក្នុងលំហ"],
    topicsEn: ["Differential Equations", "Conics", "Space Geometry"],
    overviewKm: "វិញ្ញាសាឆ្នាំគោលបណ្ណាសារ ២០១២ សម្រាប់ជាមូលដ្ឋាននៃការសិក្សាប្រៀបធៀបទម្រង់វិញ្ញាសាជាតិ។",
    overviewEn: "Archive baseline 2012 examination paper preserved for historical curriculum comparison.",
    essentialFormulaSheet: [],
    questions: [
      {
        questionNumber: 1,
        points: 15,
        titleKm: "លំហាត់ទី ១៖ សមីការឌីផេរ៉ង់ស្យែល",
        titleEn: "Problem 1: First-Order ODE",
        problemTextKm: "ដោះស្រាយសមីការឌីផេរ៉ង់ស្យែល $y' - 3y = 0$ ដោយដឹងថា $y(0) = 2$។",
        problemTextEn: "Solve ODE $y' - 3y = 0$ given $y(0) = 2$.",
        officialSolutionKm: "ចម្លើយទូទៅ៖ $y = Ce^{3x}$។ ដោយ $y(0) = 2 ⇒ C = 2$។ ដូចនេះ $y = 2e^{3x}$។",
        officialSolutionEn: "General solution $y = Ce^{3x}$. With initial condition $C = 2$, solution is $y = 2e^{3x}$.",
        scoringCriteriaKm: ["ចម្លើយទូទៅ៖ ៧.៥ ពិន្ទុ", "គណនាតម្លៃថេរ C = 2៖ ៧.៥ ពិន្ទុ"],
        keyFormulas: ["y' - ay = 0 \\implies y = Ce^{ax}"],
      }
    ],
  },

];

export const HISTORICAL_EXAM_ARCHIVE: HistoricalExamPaper[] = MOEYS_EXAM_ARCHIVE;
