export interface PrivateQuestion {
  id: string;
  lessonId: string;
  type: "mcq" | "fill_blank" | "order_steps";
  prompt_km: string;
  prompt_en: string;
  options_km: string[];
  options_en: string[];
  correct_index: number;
  explanation_km: string;
  explanation_en: string;
  formula_badge?: string;
}

export interface PublicQuestion {
  id: string;
  lessonId: string;
  type: "mcq" | "fill_blank" | "order_steps";
  prompt_km: string;
  prompt_en: string;
  options_km: string[];
  options_en: string[];
  formula_badge?: string;
}

const PRIVATE_QUESTION_BANK: Record<string, PrivateQuestion[]> = {
  default: [
    {
      id: "q-phys-01",
      lessonId: "default",
      type: "mcq",
      prompt_km: "យោងតាមច្បាប់ញូតុនទី២ (Newton's Second Law) តើសមីការណាជាសមីការត្រឹមត្រូវ?",
      prompt_en: "According to Newton's Second Law, which formula is correct?",
      options_km: [
        "F = m × a (កម្លាំង = ម៉ាស × សំទុះ)",
        "F = m / a (កម្លាំង = ម៉ាស / សំទុះ)",
        "F = m × v² (កម្លាំង = ម៉ាស × ល្បឿនការ៉េ)",
        "F = 1/2 m × v (កម្លាំង = កន្លះម៉ាស × ល្បឿន)",
      ],
      options_en: [
        "F = m × a (Force = Mass × Acceleration)",
        "F = m / a (Force = Mass / Acceleration)",
        "F = m × v² (Force = Mass × Velocity squared)",
        "F = 1/2 m × v (Force = Half Mass × Velocity)",
      ],
      correct_index: 0,
      formula_badge: "F = m · a",
      explanation_km: "ច្បាប់ញូតុនទី២ ចែងថាកម្លាំងផ្គួបមានអំពើលើវត្ថុមួយ ស្មើនឹងផលគុណរវាងម៉ាស m និងសំទុះ a (F = m × a)។",
      explanation_en: "Newton's second law states that net force equals mass times acceleration: F = m · a.",
    },
    {
      id: "q-chem-02",
      lessonId: "default",
      type: "mcq",
      prompt_km: "សម្រាប់សូលុយស្យុងអាស៊ីត តម្លៃ pH ស្ថិតក្នុងចន្លោះណា?",
      prompt_en: "For an acidic solution, which range does the pH value fall into?",
      options_km: [
        "pH < 7 (អាស៊ីត)",
        "pH = 7 (អព្យាក្រឹត)",
        "pH > 7 (បាស)",
        "pH = 14 (បាសខ្លាំង)",
      ],
      options_en: [
        "pH < 7 (Acidic)",
        "pH = 7 (Neutral)",
        "pH > 7 (Basic)",
        "pH = 14 (Strong Base)",
      ],
      correct_index: 0,
      formula_badge: "pH < 7",
      explanation_km: "សូលុយស្យុងអាស៊ីតមានកំហាប់អ៊ីយ៉ុង [H₃O⁺] > 10⁻⁷ M ដូច្នេះ pH < 7។",
      explanation_en: "Acidic solutions have hydronium concentration > 10^-7 M, resulting in pH < 7.",
    },
    {
      id: "q-math-03",
      lessonId: "default",
      type: "mcq",
      prompt_km: "ដេរីវេនៃអនុគមន៍ f(x) = x³ - 3x + 2 គឺស្មើនឹងប៉ុន្មាន?",
      prompt_en: "What is the derivative of the function f(x) = x³ - 3x + 2?",
      options_km: [
        "f'(x) = 3x² - 3",
        "f'(x) = 3x² + 2",
        "f'(x) = x² - 3",
        "f'(x) = 3x² - 3x",
      ],
      options_en: [
        "f'(x) = 3x² - 3",
        "f'(x) = 3x² + 2",
        "f'(x) = x² - 3",
        "f'(x) = 3x² - 3x",
      ],
      correct_index: 0,
      formula_badge: "d/dx(x^n) = n*x^(n-1)",
      explanation_km: "អនុវត្តរូបមន្តដេរីវេ d/dx(xⁿ) = n·xⁿ⁻¹ នាំឲ្យ d/dx(x³) = 3x² និង d/dx(-3x) = -3 និង d/dx(2) = 0។",
      explanation_en: "Applying power rule d/dx(x^n) = n*x^(n-1) gives 3x^2 - 3.",
    },
  ],
};

export class ExerciseService {
  /**
   * Returns sanitized public questions without exposing correct answers
   */
  static getPublicQuestions(lessonId: string): PublicQuestion[] {
    const questions = PRIVATE_QUESTION_BANK[lessonId] || PRIVATE_QUESTION_BANK["default"];
    return questions.map(({ id, lessonId: lId, type, prompt_km, prompt_en, options_km, options_en, formula_badge }) => ({
      id,
      lessonId: lId,
      type,
      prompt_km,
      prompt_en,
      options_km,
      options_en,
      formula_badge,
    }));
  }

  /**
   * Verify an answer against private question bank
   */
  static verifyAnswer(lessonId: string, questionId: string, selectedIndex: number) {
    const questions = PRIVATE_QUESTION_BANK[lessonId] || PRIVATE_QUESTION_BANK["default"];
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return null;
    }

    const isCorrect = question.correct_index === selectedIndex;

    return {
      isCorrect,
      correctIndex: isCorrect ? question.correct_index : undefined,
      explanation_km: question.explanation_km,
      explanation_en: question.explanation_en,
      formula_badge: question.formula_badge,
    };
  }
}

