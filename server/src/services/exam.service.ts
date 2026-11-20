export interface ExamPaper {
  id: string;
  examType: "brevet_grade_9" | "bacii_grade_12";
  year: number;
  subject: "physics" | "chemistry" | "biology" | "mathematics";
  titleKm: string;
  titleEn: string;
  difficulty: "normal" | "hard" | "olympiad";
  questionsCount: number;
  durationMinutes: number;
  hasOfficialSolution: boolean;
  sampleQuestionKm: string;
  solutionSummaryKm: string;
}

const EXAM_PAPERS: ExamPaper[] = [
  {
    id: "bacii-2024-phys",
    examType: "bacii_grade_12",
    year: 2024,
    subject: "physics",
    titleKm: "វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "BacII 2024 Physics (Science Stream)",
    difficulty: "hard",
    questionsCount: 5,
    durationMinutes: 90,
    hasOfficialSolution: true,
    sampleQuestionKm: "រលកអេឡិចត្រូម៉ាញេទិចមួយមានប្រេកង់ f = 500 MHz ឆ្លងកាត់ក្នុងខ្វះចន្លោះ។ ចូរគណនាប្រវែងរលក λ?",
    solutionSummaryKm: "ប្រើរូបមន្ត λ = c / f = (3 × 10⁸ m/s) / (500 × 10⁶ s⁻¹) = 0.6 m",
  },
  {
    id: "bacii-2024-chem",
    examType: "bacii_grade_12",
    year: 2024,
    subject: "chemistry",
    titleKm: "វិញ្ញាសា គីមីវិទ្យា បាក់ឌុប ២០២៤ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "BacII 2024 Chemistry (Science Stream)",
    difficulty: "normal",
    questionsCount: 6,
    durationMinutes: 90,
    hasOfficialSolution: true,
    sampleQuestionKm: "សូលុយស្យុងអាស៊ីតក្លរីឌ្រិក HCl មានកំហាប់ 0.05 M។ គណនា pH នៃសូលុយស្យុងនេះ?",
    solutionSummaryKm: "HCl ជាអាស៊ីតខ្លាំង៖ [H₃O⁺] = C = 0.05 M => pH = -log(0.05) ≈ 1.30",
  },
  {
    id: "brevet-2024-phys",
    examType: "brevet_grade_9",
    year: 2024,
    subject: "physics",
    titleKm: "វិញ្ញាសា រូបវិទ្យា ឌីប្លូម ២០២៤ (ថ្នាក់ទី ៩)",
    titleEn: "Brevet 2024 Physics (Grade 9)",
    difficulty: "normal",
    questionsCount: 4,
    durationMinutes: 60,
    hasOfficialSolution: true,
    sampleQuestionKm: "អំពូលភ្លើងមួយភ្ជាប់ទៅនឹងតង់ស្យុង 220V និងមានចរន្ត 0.5A ឆ្លងកាត់។ គណនាអានុភាព?",
    solutionSummaryKm: "P = U × I = 220V × 0.5A = 110 Watts",
  },
  {
    id: "bacii-2023-math",
    examType: "bacii_grade_12",
    year: 2023,
    subject: "mathematics",
    titleKm: "វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៣ (ថ្នាក់វិទ្យាសាស្ត្រ)",
    titleEn: "BacII 2023 Mathematics (Science Stream)",
    difficulty: "hard",
    questionsCount: 5,
    durationMinutes: 150,
    hasOfficialSolution: true,
    sampleQuestionKm: "គណនាអាំងតេក្រាល I = ∫(2x + 1)e^(x) dx ចន្លោះពី 0 ដល់ 1?",
    solutionSummaryKm: "ប្រើរូបមន្តអាំងតេក្រាលដោយផ្នែក ∫u dv = uv - ∫v du => I = e + 1",
  },
];

export class ExamService {
  static getExams(filters?: {
    examType?: string;
    subject?: string;
    year?: number;
  }) {
    let result = [...EXAM_PAPERS];

    if (filters?.examType) {
      result = result.filter((e) => e.examType === filters.examType);
    }
    if (filters?.subject) {
      result = result.filter((e) => e.subject === filters.subject);
    }
    if (filters?.year) {
      result = result.filter((e) => e.year === filters.year);
    }

    return {
      total: result.length,
      exams: result,
    };
  }

  static getExamById(id: string) {
    const exam = EXAM_PAPERS.find((e) => e.id === id);
    if (!exam) return null;
    return exam;
  }
}

