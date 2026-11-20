// ==============================================================================
// ScienceKH — Bespoke MoEYS Curriculum Interactive Discovery Labs
// 4-Stage Gamified Discovery: Synthesizer -> Concept -> Derivation -> Calculation
// Covers Mathematics, Physics, Chemistry, Biology, Earth & Environmental Science
// ==============================================================================

import { getCuratedLesson } from "./curated-lessons";

export type QuestionType =
  "synthesizer" | "concept_choice" | "derivation_chain" | "lab_calculation";

export type QuantumVariable = {
  id: string;
  symbol: string;
  name_en: string;
  name_km: string;
  unit: string;
  category?: "variable" | "operator" | "constant";
};

export type BaseQuestion = {
  id: string;
  type: QuestionType;
  stage_name_km: string;
  stage_name_en: string;
  prompt_km: string;
  prompt_en: string;
  socratic_clue_km?: string;
  socratic_clue_en?: string;
  formula_badge?: string;
  explanation_km: string;
  explanation_en: string;
};

export type SynthesizerQuestion = BaseQuestion & {
  type: "synthesizer";
  spoken_theorem_km: string;
  spoken_theorem_en: string;
  variables_pool: QuantumVariable[];
  target_sequence_ids: string[];
};

export type ConceptChoiceQuestion = BaseQuestion & {
  type: "concept_choice";
  options_km: string[];
  options_en: string[];
  correct_index: number;
  scientific_analogy_km?: string;
  scientific_analogy_en?: string;
};

export type DerivationChainQuestion = BaseQuestion & {
  type: "derivation_chain";
  steps_km: string[];
  steps_en: string[];
  correct_chain_order: number[];
};

export type LabCalculationQuestion = BaseQuestion & {
  type: "lab_calculation";
  given_values_km: { label: string; value: string }[];
  given_values_en: { label: string; value: string }[];
  options_km: string[];
  options_en: string[];
  correct_index: number;
};

export type QuizQuestionItem =
  SynthesizerQuestion | ConceptChoiceQuestion | DerivationChainQuestion | LabCalculationQuestion;

/**
 * Raw Subject & Topic Aware Discovery Lab Deck Generator
 */
function getRawCurriculumLabQuestions(lessonId: string): QuizQuestionItem[] {
  const lesson = getCuratedLesson(lessonId);
  const subjectSlug = lesson?.subject.slug || "physics";
  const id = lessonId.toLowerCase();

  // ============================================================================
  // 1. MATHEMATICS LABS
  // ============================================================================
  if (subjectSlug === "mathematics" || id.includes("math")) {
    // 1A. Definite Integrals (G12 Math 01)
    if (id.includes("g12-math-01") || id.includes("int")) {
      return [
        {
          id: "math-int-1",
          type: "synthesizer",
          stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តព្រីមីទីវ",
          stage_name_en: "Stage 1 • Antiderivative Power Rule",
          prompt_km: "ចូរផ្គុំរូបមន្តព្រីមីទីវនៃ xⁿ លើរនាំងសមីការ៖",
          prompt_en: "Assemble the power rule antiderivative formula on the equation rail:",
          spoken_theorem_km:
            "អាំងតេក្រាល អិច ស្វ័យគុណ អិន ឌីអិច ស្មើនឹង អិច ស្វ័យគុណ អិន បូកមួយ ចែកនឹង អិន បូកមួយ បូក សេ",
          spoken_theorem_en:
            "Integral of x to the n dx equals x to the n plus one divided by n plus one plus C",
          variables_pool: [
            {
              id: "i1",
              symbol: "∫ xⁿ dx",
              name_km: "អាំងតេក្រាល",
              name_en: "Integral",
              unit: "Expression",
            },
            {
              id: "i2",
              symbol: "=",
              name_km: "ស្មើនឹង",
              name_en: "Equals",
              unit: "Operator",
              category: "operator",
            },
            {
              id: "i3",
              symbol: "xⁿ⁺¹",
              name_km: "អិចស្វ័យគុណ n+1",
              name_en: "Power n+1",
              unit: "Numerator",
            },
            {
              id: "i4",
              symbol: "/",
              name_km: "ចែកនឹង",
              name_en: "Divided by",
              unit: "Division",
              category: "operator",
            },
            {
              id: "i5",
              symbol: "(n + 1)",
              name_km: "ភាគបែង n+1",
              name_en: "Denominator",
              unit: "Factor",
            },
            {
              id: "i6",
              symbol: "+ C",
              name_km: "ថេរ C",
              name_en: "Constant",
              unit: "Constant",
              category: "constant",
            },
            {
              id: "i7",
              symbol: "n · xⁿ⁻¹",
              name_km: "ដេរីវេ",
              name_en: "Derivative",
              unit: "Distractor",
            },
          ],
          target_sequence_ids: ["i1", "i2", "i3", "i4", "i5", "i6"],
          formula_badge: "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C",
          socratic_clue_km:
            "អាំងតេក្រាលបង្កើនស្វ័យគុណឡើងមួយកម្រិត ហើយចែកនឹងស្វ័យគុណថ្មីនោះ បូកថេរ C។",
          socratic_clue_en:
            "Integration raises power by one and divides by the new exponent: xⁿ⁺¹/(n+1) + C.",
          explanation_km:
            "ព្រីមីទីវនៃ xⁿ (ចំពោះ n ≠ -1) គឺ xⁿ⁺¹/(n+1) + C ព្រោះដេរីវេនៃ xⁿ⁺¹ គឺ (n+1)xⁿ។",
          explanation_en:
            "The fundamental power rule of integration is the inverse operation of differentiation.",
        },
        {
          id: "math-int-2",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី២ • ន័យធរណីមាត្រនៃអាំងតេក្រាលកំណត់",
          stage_name_en: "Stage 2 • Geometric Meaning of Integrals",
          prompt_km: "តើអាំងតេក្រាលកំណត់ ∫ₐᵇ f(x) dx (ចំពោះ f(x) ≥ 0) តំណាងឱ្យអ្វីក្នុងធរណីមាត្រ?",
          prompt_en:
            "What does the definite integral ∫ₐᵇ f(x) dx represent geometrically when f(x) ≥ 0?",
          options_km: [
            "ក្រឡាផ្ទៃប្លង់ខណ្ឌដោយខ្សែកោង អ័ក្សដេក Ox និងបន្ទាត់ឈរ x = a, x = b",
            "ប្រវែងអង្កត់ផ្ចិតនៃរង្វង់ត្រីកោណមាត្រ",
            "មេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះត្រង់ចំណុច a",
            "បរិមាត្រនៃត្រីកោណកែង",
          ],
          options_en: [
            "The net geometric area between the curve, x-axis, and vertical bounds x = a to x = b",
            "The diameter of the trigonometric unit circle",
            "The derivative tangent slope at point a",
            "The perimeter of an inscribed polygon",
          ],
          correct_index: 0,
          scientific_analogy_km:
            "ដូចការបូកសរុបបន្ទះចតុកោណកែងតូចៗរាប់មិនអស់នៅក្រោមខ្សែកោង (Riemann Sums)។",
          scientific_analogy_en:
            "Like summing infinitely thin vertical ribbons to measure total planar surface area.",
          formula_badge: "S = ∫ₐᵇ f(x) dx",
          socratic_clue_km: "អាំងតេក្រាលកំណត់គណនាក្រឡាផ្ទៃក្រោមខ្សែកោងពីព្រំ a ទៅ b។",
          socratic_clue_en:
            "Definite integration computes the exact enclosed area between boundary limits.",
          explanation_km:
            "អាំងតេក្រាលកំណត់ពី a ទៅ b នៃអនុគមន៍វិជ្ជមាន គឺស្មើនឹងក្រឡាផ្ទៃប្លង់ក្រោមខ្សែកោង។",
          explanation_en:
            "The definite integral calculates the exact area under a curve bounded by interval [a, b].",
        },
        {
          id: "math-int-3",
          type: "derivation_chain",
          stage_name_km: "ដំណាក់កាលទី៣ • ខ្សែសង្វាក់អាំងតេក្រាលដោយផ្នែក",
          stage_name_en: "Stage 3 • Integration by Parts Chain",
          prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការធ្វើអាំងតេក្រាលដោយផ្នែកឱ្យបានត្រឹមត្រូវ៖",
          prompt_en: "Arrange the 4 steps of algebraic derivation for Integration by Parts:",
          steps_km: [
            "កំណត់ជ្រើសរើស u និង dv ពីកន្សោមដើម",
            "គណនាដេរីវេ du = u' dx និងព្រីមីទីវ v = ∫ dv",
            "អនុវត្តរូបមន្ត ∫ u dv = u·v - ∫ v du",
            "គណនាអាំងតេក្រាលដែលនៅសល់ ∫ v du រួចបូកថេរ C",
          ],
          steps_en: [
            "Choose factors u and dv using the priority rule",
            "Differentiate du = u' dx and integrate v = ∫ dv",
            "Apply identity ∫ u dv = u·v - ∫ v du",
            "Evaluate remaining integral ∫ v du and add integration constant C",
          ],
          correct_chain_order: [0, 1, 2, 3],
          formula_badge: "∫ u dv = uv - ∫ v du",
          socratic_clue_km: "រើស u និង dv -> រក du និង v -> ជំនួសក្នុង uv - ∫ v du -> គណនាចប់។",
          socratic_clue_en:
            "Identify u and dv -> calculate differential du and primitive v -> assemble formula.",
          explanation_km:
            "រូបមន្តអាំងតេក្រាលដោយផ្នែក ∫ u dv = uv - ∫ v du ទាញចេញពីដេរីវេនៃផលគុណ (uv)' = u'v + uv'។",
          explanation_en:
            "Integration by parts directly mirrors the product differentiation rule in reverse.",
        },
        {
          id: "math-int-4",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាអាំងតេក្រាលព្រីមីទីវ",
          stage_name_en: "Stage 4 • Calculus Bench Calculation",
          prompt_km: "គណនាព្រីមីទីវ ∫ 3x² dx ៖",
          prompt_en: "Evaluate the antiderivative ∫ 3x² dx:",
          given_values_km: [
            { label: "កន្សោមអាំងតេក្រាល", value: "∫ 3x² dx" },
            { label: "ស្វ័យគុណ (n)", value: "2" },
          ],
          given_values_en: [
            { label: "Integral Expression", value: "∫ 3x² dx" },
            { label: "Power (n)", value: "2" },
          ],
          options_km: [
            "x³ + C (តាមរូបមន្ត 3 · x³/3 + C = x³ + C)",
            "6x + C (ច្រឡំជាមួយដេរីវេ)",
            "3x³ + C",
            "x² + C",
          ],
          options_en: [
            "x³ + C (via 3 · (x³/3) + C = x³ + C)",
            "6x + C (confusing integration with derivative)",
            "3x³ + C",
            "x² + C",
          ],
          correct_index: 0,
          formula_badge: "x³ + C",
          socratic_clue_km: "ស្វ័យគុណ 2 កើនឡើងជា 3 រួចចែកនឹង 3៖ 3 · (x³/3) = x³។",
          socratic_clue_en: "Power 2 becomes 3, divided by 3: 3 · (x³/3) = x³ + C.",
          explanation_km: "∫ 3x² dx = 3 · (x³ / 3) + C = x³ + C។",
          explanation_en: "Antiderivative of 3x² is x³ + C because derivative of x³ is 3x².",
        },
      ];
    }

    // 1B. Grade 7 Math Lesson 1: Integers & Signed Operations (ចំនួនគត់រ៉ឺឡាទីវ និងប្រមាណវិធី)
    if (id.includes("g7-math-01") || id.includes("integers") || id.includes("signed")) {
      return [
        {
          id: "g7-math-01-q1",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី១ • វិធានសញ្ញានៃប្រមាណវិធីគុណ",
          stage_name_en: "Stage 1 • Rules of Signs in Multiplication",
          prompt_km: "តើផលគុណនៃចំនួនអវិជ្ជមានពីរ (-a) × (-b) ទទួលបានលទ្ធផលជាចំនួនអ្វី?",
          prompt_en: "What is the sign of the product of two negative numbers: (-a) × (-b)?",
          options_km: [
            "ចំនួនវិជ្ជមាន (+)",
            "ចំនួនអវិជ្ជមាន (-)",
            "ស្មើនឹងសូន្យជានិច្ច (0)",
            "មិនអាចកំណត់បាន",
          ],
          options_en: [
            "Positive number (+)",
            "Negative number (-)",
            "Always equal to zero (0)",
            "Indeterminate",
          ],
          correct_index: 0,
          scientific_analogy_km: "ដូចវិធាន៖ «សត្រូវរបស់សត្រូវ គឺជាមិត្ត» (ដកគុណដក ចេញបូក)។",
          scientific_analogy_en:
            "Like the rule: 'The enemy of my enemy is my friend' (negative × negative = positive).",
          socratic_clue_km:
            "វិធានសញ្ញា៖ សញ្ញាដូចគ្នាគុណគ្នាបានវិជ្ជមាន (+a) × (+b) = + និង (-a) × (-b) = +។",
          socratic_clue_en: "Sign Rule: Multiplying same signs always yields positive (+).",
          explanation_km:
            "ផលគុណនៃចំនួនពីរដែលមានសញ្ញាដូចគ្នា គឺតែងតែជាចំនួនវិជ្ជមាន (+) ដូចជា (-3) × (-4) = +12។",
          explanation_en:
            "The product of two negative integers is always positive: (-a) × (-b) = +(ab).",
        },
        {
          id: "g7-math-01-q2",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី២ • ការអនុវត្តចំនួនអវិជ្ជមានក្នុងជីវភាពជាក់ស្តែង",
          stage_name_en: "Stage 2 • Real-World Negative Numbers",
          prompt_km: "តើសញ្ញាដក (-) ក្នុងជីវភាពរស់នៅជាក់ស្តែងតំណាងឱ្យស្ថានភាពណា?",
          prompt_en: "In practical life, what does a negative sign (-) represent?",
          options_km: [
            "សីតុណ្ហភាពក្រោមសូន្យ (-5°C) ឬជម្រៅក្រោមនីវ៉ូទឹកសមុទ្រ (-15m)",
            "កម្ពស់ភ្នំខ្ពស់ជាងនីវ៉ូសមុទ្រ",
            "ចំនួនសិស្សសរុបក្នុងថ្នាក់រៀន",
            "ប្រវែងផ្លូវរត់ប្រណាំងកីឡា",
          ],
          options_en: [
            "Sub-zero temperature (-5°C) or depth below sea level (-15m)",
            "Mountain height above sea level",
            "Total number of students in a classroom",
            "Length of an athletic race track",
          ],
          correct_index: 0,
          socratic_clue_km:
            "ចំនួនអវិជ្ជមានប្រើសម្រាប់បរិមាណដែលនៅក្រោមចំណុចយោងសូន្យ ដូចជាជម្រៅទឹក ឬសីតុណ្ហភាពត្រជាក់ខ្លាំង។",
          socratic_clue_en:
            "Negative values represent quantities beneath a baseline reference point zero.",
          explanation_km:
            "សីតុណ្ហភាពត្រជាក់ក្រោម 0°C និងជម្រៅក្រោមនីវ៉ូទឹកសមុទ្រ ត្រូវបានកំណត់ដោយចំនួនអវិជ្ជមាន។",
          explanation_en:
            "Sub-zero temperatures and depths below sea level are represented by negative integers.",
        },
        {
          id: "g7-math-01-q3",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៣ • គណនាប្រមាណវិធីបូកចំនួនគត់សញ្ញាផ្ទុយ",
          stage_name_en: "Stage 3 • Integer Addition with Opposite Signs",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (-7) + (+15) = ?",
          prompt_en: "Calculate the value of: (-7) + (+15) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីបូក", value: "(-7) + (+15)" }],
          given_values_en: [{ label: "Addition", value: "(-7) + (+15)" }],
          options_km: ["+8", "-8", "+22", "-22"],
          options_en: ["+8", "-8", "+22", "-22"],
          correct_index: 0,
          socratic_clue_km:
            "បូកសញ្ញាផ្ទុយគ្នា៖ ដកតម្លៃដាច់ខាត 15 - 7 = 8 រួចយកសញ្ញាតាមចំនួនដែលមានតម្លៃដាច់ខាតធំជាង (គឺ +15)។",
          socratic_clue_en:
            "Subtract absolute values (15 - 7 = 8) and keep the sign of the larger absolute value (+).",
          explanation_km: "(-7) + (+15) = +(15 - 7) = +8 ព្រោះ 15 មានតម្លៃដាច់ខាតធំជាង 7។",
          explanation_en:
            "(-7) + (+15) = +(15 - 7) = +8 because 15 has a larger absolute value than 7.",
        },
        {
          id: "g7-math-01-q4",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៤ • គណនាផលបូកចំនួនអវិជ្ជមានដូចគ្នា",
          stage_name_en: "Stage 4 • Adding Same-Sign Negatives",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (-14) + (-8) = ?",
          prompt_en: "Calculate: (-14) + (-8) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីបូក", value: "(-14) + (-8)" }],
          given_values_en: [{ label: "Addition", value: "(-14) + (-8)" }],
          options_km: ["-22", "+22", "-6", "+6"],
          options_en: ["-22", "+22", "-6", "+6"],
          correct_index: 0,
          socratic_clue_km:
            "បូកចំនួនសញ្ញាដូចគ្នា៖ បូកតម្លៃដាច់ខាត 14 + 8 = 22 ហើយរក្សាសញ្ញាដកដដែល។",
          socratic_clue_en:
            "Add absolute values (14 + 8 = 22) and preserve the common negative sign.",
          explanation_km: "(-14) + (-8) = -(14 + 8) = -22។",
          explanation_en: "(-14) + (-8) = -(14 + 8) = -22.",
        },
        {
          id: "g7-math-01-q5",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៥ • គណនាប្រមាណវិធីដកចំនួនគត់រ៉ឺឡាទីវ",
          stage_name_en: "Stage 5 • Subtracting Signed Integers",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (+9) - (+17) = ?",
          prompt_en: "Calculate: (+9) - (+17) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីដក", value: "(+9) - (+17)" }],
          given_values_en: [{ label: "Subtraction", value: "(+9) - (+17)" }],
          options_km: ["-8", "+8", "-26", "+26"],
          options_en: ["-8", "+8", "-26", "+26"],
          correct_index: 0,
          socratic_clue_km: "ប្រមាណវិធីដក គឺជាការបូកនឹងចំនួនផ្ទុយ៖ (+9) + (-17) = -8។",
          socratic_clue_en: "Subtraction is adding the opposite: (+9) + (-17) = -8.",
          explanation_km: "(+9) - (+17) = 9 - 17 = -8។",
          explanation_en: "(+9) - (+17) = 9 - 17 = -8.",
        },
        {
          id: "g7-math-01-q6",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៦ • ការដកនឹងចំនួនអវិជ្ជមាន (Double Negatives)",
          stage_name_en: "Stage 6 • Subtracting a Negative Number",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (+5) - (-12) = ?",
          prompt_en: "Calculate: (+5) - (-12) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីដក", value: "(+5) - (-12)" }],
          given_values_en: [{ label: "Subtraction", value: "(+5) - (-12)" }],
          options_km: ["+17", "-7", "+7", "-17"],
          options_en: ["+17", "-7", "+7", "-17"],
          correct_index: 0,
          socratic_clue_km: "ដកនឹងចំនួនអវិជ្ជមាន ក្លាយជាការបូកចំនួនវិជ្ជមាន៖ a - (-b) = a + b។",
          socratic_clue_en:
            "Subtracting a negative converts directly into addition: a - (-b) = a + b.",
          explanation_km: "(+5) - (-12) = 5 + 12 = +17។",
          explanation_en: "(+5) - (-12) = 5 + 12 = +17.",
        },
        {
          id: "g7-math-01-q7",
          type: "synthesizer",
          stage_name_km: "ដំណាក់កាលទី៧ • សំយោគនិយមន័យតម្លៃដាច់ខាត",
          stage_name_en: "Stage 7 • Absolute Value Identity Synthesizer",
          prompt_km: "ចូរផ្គុំសមភាពតម្លៃដាច់ខាត |-x| លើរនាំងសមីការ៖",
          prompt_en: "Assemble the absolute value identity |-x| on the equation rail:",
          spoken_theorem_km: "តម្លៃដាច់ខាតនៃ ដក អិច ស្មើនឹង តម្លៃដាច់ខាតនៃ បូក អិច ស្មើនឹង អិច",
          spoken_theorem_en:
            "Absolute value of negative x equals absolute value of positive x equals x",
          variables_pool: [
            {
              id: "av1",
              symbol: "|-x|",
              name_km: "តម្លៃដាច់ខាត -x",
              name_en: "Abs(-x)",
              unit: "Expression",
            },
            {
              id: "av2",
              symbol: "=",
              name_km: "ស្មើនឹង",
              name_en: "Equals",
              unit: "Operator",
              category: "operator",
            },
            {
              id: "av3",
              symbol: "|+x|",
              name_km: "តម្លៃដាច់ខាត +x",
              name_en: "Abs(+x)",
              unit: "Expression",
            },
            {
              id: "av4",
              symbol: "=",
              name_km: "ស្មើនឹង",
              name_en: "Equals",
              unit: "Operator",
              category: "operator",
            },
            {
              id: "av5",
              symbol: "x",
              name_km: "ចម្ងាយ x",
              name_en: "Distance x",
              unit: "Positive",
            },
            {
              id: "av6",
              symbol: "-x",
              name_km: "អវិជ្ជមាន",
              name_en: "Negative",
              unit: "Distractor",
            },
          ],
          target_sequence_ids: ["av1", "av2", "av3", "av4", "av5"],
          formula_badge: "|-x| = |+x| = x",
          socratic_clue_km: "តម្លៃដាច់ខាតតំណាងឱ្យចម្ងាយពី 0 ដូច្នេះ |-x| = |+x| = x (ចំពោះ x ≥ 0)។",
          socratic_clue_en: "Absolute value represents geometric distance from zero.",
          explanation_km:
            "តម្លៃដាច់ខាតនៃចំនួនផ្ទុយគ្នាគឺស្មើគ្នាជានិច្ច ព្រោះមានចម្ងាយស្មើគ្នាពីគល់សូន្យ។",
          explanation_en:
            "Opposite signed integers have identical absolute values because distance is always positive.",
        },
        {
          id: "g7-math-01-q8",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី៨ • គណនាតម្លៃដាច់ខាត",
          stage_name_en: "Stage 8 • Absolute Value Evaluation",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ |-12| - |-5| = ?",
          prompt_en: "Calculate the value of: |-12| - |-5| = ?",
          options_km: ["7", "-17", "17", "-7"],
          options_en: ["7", "-17", "17", "-7"],
          correct_index: 0,
          socratic_clue_km:
            "តម្លៃដាច់ខាតនៃចំនួនមួយ គឺជាចម្ងាយពីសូន្យ (តែងតែវិជ្ជមាន)៖ |-12| = 12 និង |-5| = 5។",
          socratic_clue_en: "Absolute value is distance from zero: |-12| = 12 and |-5| = 5.",
          explanation_km: "ដោយសារ |-12| = 12 និង |-5| = 5 នាំឱ្យ 12 - 5 = 7។",
          explanation_en: "Since |-12| = 12 and |-5| = 5, we have 12 - 5 = 7.",
        },
        {
          id: "g7-math-01-q9",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៩ • គណនាផលគុណចំនួនអវិជ្ជមានច្រើនតួ",
          stage_name_en: "Stage 9 • Multi-factor Negative Product",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (-2) × (-3) × (-4) = ?",
          prompt_en: "Calculate: (-2) × (-3) × (-4) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីគុណ", value: "(-2) × (-3) × (-4)" }],
          given_values_en: [{ label: "Product", value: "(-2) × (-3) × (-4)" }],
          options_km: ["-24", "+24", "-9", "+9"],
          options_en: ["-24", "+24", "-9", "+9"],
          correct_index: 0,
          socratic_clue_km:
            "ចំនួនកត្តាអវិជ្ជមានមាន ៣ (ចំនួនសេស) ដូច្នេះលទ្ធផលចេញសញ្ញាដក (-)៖ 2 × 3 × 4 = 24។",
          socratic_clue_en:
            "An odd number of negative factors (3) yields a negative result: -(2 × 3 × 4) = -24.",
          explanation_km: "(-2) × (-3) = +6 រួច (+6) × (-4) = -24។",
          explanation_en: "(-2) × (-3) = +6, then (+6) × (-4) = -24.",
        },
        {
          id: "g7-math-01-q10",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី១០ • ប្រមាណវិធីចែកចំនួនគត់សញ្ញាផ្ទុយ",
          stage_name_en: "Stage 10 • Dividing Signed Integers",
          prompt_km: "គណនាតម្លៃនៃកន្សោម៖ (-48) ÷ (+6) = ?",
          prompt_en: "Calculate: (-48) ÷ (+6) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីចែក", value: "(-48) ÷ (+6)" }],
          given_values_en: [{ label: "Division", value: "(-48) ÷ (+6)" }],
          options_km: ["-8", "+8", "-7", "+7"],
          options_en: ["-8", "+8", "-7", "+7"],
          correct_index: 0,
          socratic_clue_km: "ការចែកសញ្ញាផ្ទុយគ្នា (-) ÷ (+) តែងតែទទួលបានលទ្ធផលជាសញ្ញាដក (-)។",
          socratic_clue_en: "Dividing opposite signs always gives a negative result.",
          explanation_km: "(-48) ÷ (+6) = -(48 ÷ 6) = -8។",
          explanation_en: "(-48) ÷ (+6) = -(48 ÷ 6) = -8.",
        },
        {
          id: "g7-math-01-q11",
          type: "derivation_chain",
          stage_name_km: "ដំណាក់កាលទី១១ • លំដាប់នៃប្រមាណវិធីចម្រុះ (PEMDAS)",
          stage_name_en: "Stage 11 • Order of Operations Derivation",
          prompt_km: "ចូររៀបចំ ៤ ជំហាននៃលំដាប់ប្រមាណវិធីគណិតវិទ្យាឱ្យបានត្រឹមត្រូវ៖",
          prompt_en: "Arrange the 4 steps of algebraic order of operations:",
          steps_km: [
            "គណនាកន្សោមក្នុងវង់ក្រចក ឬរនាំងបាំង (Parentheses)",
            "គណនាតម្លៃដាច់ខាត ឬស្វ័យគុណ (Absolute Value & Powers)",
            "គណនាប្រមាណវិធីគុណ និងចែក ពីឆ្វេងទៅស្តាំ",
            "គណនាប្រមាណវិធីបូក និងដក ពីឆ្វេងទៅស្តាំ",
          ],
          steps_en: [
            "Evaluate expressions inside grouping brackets/parentheses",
            "Evaluate absolute values and exponents",
            "Perform multiplication and division from left to right",
            "Perform addition and subtraction from left to right",
          ],
          correct_chain_order: [0, 1, 2, 3],
          formula_badge: "BODMAS / PEMDAS",
          socratic_clue_km: "វង់ក្រចក -> តម្លៃដាច់ខាត -> គុណ/ចែក -> បូក/ដក។",
          socratic_clue_en:
            "Parentheses -> Absolute values/Powers -> Multiply/Divide -> Add/Subtract.",
          explanation_km:
            "លំដាប់ប្រមាណវិធីធានាថាកន្សោមគណិតវិទ្យាត្រូវបានដោះស្រាយត្រឹមត្រូវគ្មានភាពស្រពិចស្រពិល។",
          explanation_en:
            "Following operational hierarchy ensures mathematically consistent solutions.",
        },
        {
          id: "g7-math-01-q12",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី១២ • លំហាត់ប្រឡងបូកសរុបប្រមាណវិធីចម្រុះ",
          stage_name_en: "Stage 12 • MoEYS Examination Challenge",
          prompt_km: "គណនាតម្លៃនៃកន្សោមចម្រុះ៖ 20 - 3 × (-4) + |-10| ÷ 2 = ?",
          prompt_en: "Evaluate the combined expression: 20 - 3 × (-4) + |-10| ÷ 2 = ?",
          given_values_km: [{ label: "កន្សោមចម្រុះ", value: "20 - 3 × (-4) + |-10| ÷ 2" }],
          given_values_en: [{ label: "Expression", value: "20 - 3 × (-4) + |-10| ÷ 2" }],
          options_km: ["37 (20 + 12 + 5 = 37)", "17", "13", "45"],
          options_en: ["37 (via 20 + 12 + 5 = 37)", "17", "13", "45"],
          correct_index: 0,
          formula_badge: "= 37",
          socratic_clue_km:
            "ជំហានទី១៖ 3 × (-4) = -12 -> 20 - (-12) = 20 + 12 = 32។ ជំហានទី២៖ |-10| ÷ 2 = 10 ÷ 2 = 5។ ជំហានទី៣៖ 32 + 5 = 37។",
          socratic_clue_en:
            "Step 1: 3 × (-4) = -12 -> 20 - (-12) = 32. Step 2: 10 ÷ 2 = 5. Step 3: 32 + 5 = 37.",
          explanation_km: "20 - 3 × (-4) + |-10| ÷ 2 = 20 - (-12) + (10 ÷ 2) = 20 + 12 + 5 = 37។",
          explanation_en: "20 - 3 × (-4) + |-10| ÷ 2 = 20 - (-12) + 5 = 20 + 12 + 5 = 37.",
        },
      ];
    }

    // 1C. Grade 7 Math Lesson 2: Fractions & Decimals (ប្រភាគ ចំនួនទសភាគ និងភាគរយ)
    if (id.includes("g7-math-02") || id.includes("fraction")) {
      return [
        {
          id: "g7-math-02-q1",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី១ • វិធានបូកប្រភាគភាគបែងខុសគ្នា",
          stage_name_en: "Stage 1 • Adding Fractions with Unlike Denominators",
          prompt_km: "ដើម្បីបូកឬដកប្រភាគដែលមានភាគបែងខុសគ្នា តើយើងត្រូវធ្វើអ្វីជាដំបូង?",
          prompt_en:
            "To add or subtract fractions with different denominators, what must you do first?",
          options_km: [
            "តម្រូវភាគបែងរួម (ស្វែងរក LCM / ភាគបែងរួមតូចបំផុត)",
            "បូកភាគយក និងបូកភាគបែងចូលគ្នាភ្លាមៗ",
            "គុណភាគយកនឹងភាគយក",
            "ប្តូរប្រភាគទៅជាចំនួនគត់",
          ],
          options_en: [
            "Find a common denominator (LCM)",
            "Add numerators and denominators directly",
            "Multiply numerators",
            "Convert to integers",
          ],
          correct_index: 0,
          socratic_clue_km:
            "យើងមិនអាចបូកប្រភាគដែលមានទំហំចំណែកខុសគ្នាបានទេ លុះត្រាតែតម្រូវភាគបែងឱ្យដូចគ្នាជាមុនសិន។",
          socratic_clue_en: "You cannot combine fractional parts without a common denominator.",
          explanation_km: "ដើម្បីបូក a/b + c/d យើងត្រូវតម្រូវភាគបែងរួម bd ៖ (ad + bc)/bd។",
          explanation_en:
            "To add fractions with unlike denominators, first find the common denominator.",
        },
        {
          id: "g7-math-02-q2",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី២ • គណនាផលបូកប្រភាគ",
          stage_name_en: "Stage 2 • Fraction Addition Calculation",
          prompt_km: "គណនាតម្លៃនៃ៖ 1/3 + 1/6 = ?",
          prompt_en: "Calculate: 1/3 + 1/6 = ?",
          given_values_km: [{ label: "ប្រមាណវិធី", value: "1/3 + 1/6" }],
          given_values_en: [{ label: "Expression", value: "1/3 + 1/6" }],
          options_km: ["1/2 (ស្មើ 3/6)", "2/9", "2/6", "5/6"],
          options_en: ["1/2 (or 3/6)", "2/9", "2/6", "5/6"],
          correct_index: 0,
          socratic_clue_km: "តម្រូវភាគបែង 6៖ 1/3 = 2/6 ដូច្នេះ 2/6 + 1/6 = 3/6 = 1/2។",
          socratic_clue_en: "1/3 = 2/6, so 2/6 + 1/6 = 3/6 = 1/2.",
          explanation_km: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 (សម្រួលចែកនឹង 3)។",
          explanation_en: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2.",
        },
        {
          id: "g7-math-02-q3",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៣ • គណនាប្រមាណវិធីដកប្រភាគ",
          stage_name_en: "Stage 3 • Fraction Subtraction",
          prompt_km: "គណនាតម្លៃនៃ៖ 3/4 - 2/5 = ?",
          prompt_en: "Calculate: 3/4 - 2/5 = ?",
          given_values_km: [{ label: "ប្រមាណវិធីដក", value: "3/4 - 2/5" }],
          given_values_en: [{ label: "Subtraction", value: "3/4 - 2/5" }],
          options_km: ["7/20", "1/20", "1/1", "5/20"],
          options_en: ["7/20", "1/20", "1/1", "5/20"],
          correct_index: 0,
          socratic_clue_km:
            "ភាគបែងរួមនៃ 4 និង 5 គឺ 20៖ 3/4 = 15/20 និង 2/5 = 8/20។ 15/20 - 8/20 = 7/20។",
          socratic_clue_en: "Common denominator is 20: (15 - 8) / 20 = 7/20.",
          explanation_km: "3/4 - 2/5 = (15 - 8) / 20 = 7/20។",
          explanation_en: "3/4 - 2/5 = (15 - 8) / 20 = 7/20.",
        },
        {
          id: "g7-math-02-q4",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី៤ • វិធានគុណប្រភាគ",
          stage_name_en: "Stage 4 • Multiplying Fractions Rule",
          prompt_km: "ដើម្បីគុណប្រភាគពីរ (a/b) × (c/d) តើយើងត្រូវអនុវត្តយ៉ាងដូចម្តេច?",
          prompt_en: "How do you multiply two fractions: (a/b) × (c/d)?",
          options_km: [
            "គុណភាគយកនឹងភាគយក និងភាគបែងនឹងភាគបែង (ac / bd)",
            "តម្រូវភាគបែងរួមជាមុនសិន",
            "គុណខ្វែងភាគយកនឹងភាគបែង",
            "បូកភាគយក និងគុណភាគបែង",
          ],
          options_en: [
            "Multiply numerators together and denominators together (ac / bd)",
            "Find common denominator first",
            "Cross multiply",
            "Add numerators and multiply denominators",
          ],
          correct_index: 0,
          socratic_clue_km:
            "ប្រមាណវិធីគុណប្រភាគ មិនចាំបាច់តម្រូវភាគបែងទេ៖ យកភាគយកគុណភាគយក និងភាគបែងគុណភាគបែង។",
          socratic_clue_en:
            "Fraction multiplication does not require a common denominator: (a × c) / (b × d).",
          explanation_km: "(a/b) × (c/d) = (a × c) / (b × d)។",
          explanation_en: "(a/b) × (c/d) = (ac)/(bd).",
        },
        {
          id: "g7-math-02-q5",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៥ • គណនាផលគុណប្រភាគ និងសម្រួល",
          stage_name_en: "Stage 5 • Multiplying Fractions Calculation",
          prompt_km: "គណនាតម្លៃនៃ៖ (2/5) × (15/4) = ?",
          prompt_en: "Calculate: (2/5) × (15/4) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីគុណ", value: "(2/5) × (15/4)" }],
          given_values_en: [{ label: "Multiplication", value: "(2/5) × (15/4)" }],
          options_km: ["3/2 (ឬ 1.5)", "30/20", "8/75", "17/9"],
          options_en: ["3/2 (or 1.5)", "30/20", "8/75", "17/9"],
          correct_index: 0,
          socratic_clue_km:
            "សម្រួល 2 ជាមួយ 4 សល់ 2 នៅភាគបែង; សម្រួល 15 ជាមួយ 5 សល់ 3 នៅភាគយក៖ 3/2។",
          socratic_clue_en:
            "Simplify 2 with 4 (giving 2 in denominator) and 15 with 5 (giving 3 in numerator): 3/2.",
          explanation_km: "(2 × 15) / (5 × 4) = 30 / 20 = 3 / 2 = 1.5។",
          explanation_en: "(2/5) × (15/4) = 30/20 = 3/2.",
        },
        {
          id: "g7-math-02-q6",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី៦ • វិធានចែកប្រភាគ (គុណនឹងចម្រាស)",
          stage_name_en: "Stage 6 • Dividing Fractions Rule",
          prompt_km: "ដើម្បីចែកប្រភាគ (a/b) ÷ (c/d) តើយើងត្រូវប្តូរប្រមាណវិធីទៅជាអ្វី?",
          prompt_en: "To divide fractions (a/b) ÷ (c/d), what do you multiply by?",
          options_km: [
            "គុណនឹងចម្រាសនៃប្រភាគទី២៖ (a/b) × (d/c)",
            "ចែកភាគយកនឹងភាគយក និងចែកភាគបែងនឹងភាគបែង",
            "គុណនឹងប្រភាគទី២ ដដែល",
            "ដកប្រភាគទី២ ចេញពីប្រភាគទី១",
          ],
          options_en: [
            "Multiply by the reciprocal of the second fraction: (a/b) × (d/c)",
            "Divide numerators and divide denominators",
            "Multiply by the same fraction",
            "Subtract the second fraction",
          ],
          correct_index: 0,
          socratic_clue_km: "ការចែកប្រភាគស្មើនឹងការគុណនឹងចម្រាស (ត្រឡប់ភាគយក និងភាគបែងនៃតួចែក)។",
          socratic_clue_en:
            "Dividing by a fraction is equivalent to multiplying by its reciprocal.",
          explanation_km: "(a/b) ÷ (c/d) = (a/b) × (d/c)។",
          explanation_en: "Division by fraction converts to multiplication by reciprocal.",
        },
        {
          id: "g7-math-02-q7",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៧ • គណនាផលចែកប្រភាគ",
          stage_name_en: "Stage 7 • Fraction Division Calculation",
          prompt_km: "គណនាតម្លៃនៃ៖ (3/7) ÷ (6/14) = ?",
          prompt_en: "Calculate: (3/7) ÷ (6/14) = ?",
          given_values_km: [{ label: "ប្រមាណវិធីចែក", value: "(3/7) ÷ (6/14)" }],
          given_values_en: [{ label: "Division", value: "(3/7) ÷ (6/14)" }],
          options_km: ["1", "2", "1/2", "18/98"],
          options_en: ["1", "2", "1/2", "18/98"],
          correct_index: 0,
          socratic_clue_km: "(3/7) × (14/6) = (3 × 14) / (7 × 6) = 42 / 42 = 1។",
          socratic_clue_en: "(3/7) × (14/6) = 42 / 42 = 1.",
          explanation_km: "(3/7) ÷ (6/14) = (3/7) × (14/6) = 1។",
          explanation_en: "(3/7) ÷ (6/14) = (3/7) × (14/6) = 1.",
        },
        {
          id: "g7-math-02-q8",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៨ • បំប្លែងចំនួនចម្រុះទៅជាប្រភាគមិនសុទ្ធ",
          stage_name_en: "Stage 8 • Mixed Number to Improper Fraction",
          prompt_km: "បំប្លែងចំនួនចម្រុះ 2 3/4 ទៅជាប្រភាគមិនសុទ្ធ៖",
          prompt_en: "Convert the mixed number 2 3/4 into an improper fraction:",
          given_values_km: [{ label: "ចំនួនចម្រុះ", value: "2 3/4" }],
          given_values_en: [{ label: "Mixed Number", value: "2 3/4" }],
          options_km: ["11/4", "9/4", "6/4", "5/4"],
          options_en: ["11/4", "9/4", "6/4", "5/4"],
          correct_index: 0,
          socratic_clue_km:
            "រូបមន្ត៖ ភាគយកថ្មី = (ចំនួនគត់ × ភាគបែង) + ភាគយកចាស់ = (2 × 4) + 3 = 11។",
          socratic_clue_en:
            "New numerator = (Integer × Denominator) + Numerator = (2 × 4) + 3 = 11.",
          explanation_km: "2 3/4 = (2 × 4 + 3) / 4 = 11/4។",
          explanation_en: "2 3/4 = (2 × 4 + 3) / 4 = 11/4.",
        },
        {
          id: "g7-math-02-q9",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី៩ • ទំនាក់ទំនងរវាងចំនួនទសភាគ និងប្រភាគ",
          stage_name_en: "Stage 9 • Decimal to Fraction Conversion",
          prompt_km: "តើចំនួនទសភាគ 0.75 ស្មើនឹងប្រភាគសម្រួលមួយណា?",
          prompt_en: "Which simplified fraction equals the decimal 0.75?",
          options_km: ["3/4", "75/10", "1/2", "7/5"],
          options_en: ["3/4", "75/10", "1/2", "7/5"],
          correct_index: 0,
          socratic_clue_km: "0.75 = 75/100។ សម្រួលចែកភាគយក និងភាគបែងនឹង 25 ទទួលបាន 3/4។",
          socratic_clue_en: "0.75 = 75/100 = 3/4 by dividing both by 25.",
          explanation_km: "0.75 = 75/100 = 3/4។",
          explanation_en: "0.75 = 75/100 = 3/4.",
        },
        {
          id: "g7-math-02-q10",
          type: "synthesizer",
          stage_name_km: "ដំណាក់កាលទី១០ • សំយោគរូបមន្តគណនាភាគរយ",
          stage_name_en: "Stage 10 • Percentage Formula Synthesizer",
          prompt_km: "ចូរផ្គុំរូបមន្តគណនាអត្រាភាគរយ P លើរនាំងសមីការ៖",
          prompt_en: "Assemble the percentage rate formula (P = (A / B) × 100%):",
          spoken_theorem_km: "ភាគរយ ស្មើនឹង ចំណែក អា ចែកនឹង ចំនួនសរុប បេ គុណនឹង មួយរយ ភាគរយ",
          spoken_theorem_en:
            "Percentage equals part A divided by total B multiplied by one hundred percent",
          variables_pool: [
            { id: "pct1", symbol: "P", name_km: "ភាគរយ", name_en: "Percentage", unit: "%" },
            {
              id: "pct2",
              symbol: "=",
              name_km: "ស្មើនឹង",
              name_en: "Equals",
              unit: "Operator",
              category: "operator",
            },
            {
              id: "pct3",
              symbol: "(A / B)",
              name_km: "ចំណែក/សរុប",
              name_en: "Part/Total",
              unit: "Ratio",
            },
            {
              id: "pct4",
              symbol: "×",
              name_km: "គុណនឹង",
              name_en: "Multiplied by",
              unit: "Operator",
              category: "operator",
            },
            { id: "pct5", symbol: "100%", name_km: "១០០%", name_en: "100 percent", unit: "Factor" },
            { id: "pct6", symbol: "+", name_km: "បូក", name_en: "Plus", unit: "Distractor" },
          ],
          target_sequence_ids: ["pct1", "pct2", "pct3", "pct4", "pct5"],
          formula_badge: "P = (A / B) × 100%",
          socratic_clue_km: "ភាគរយ = (តម្លៃជាក់ស្តែង ÷ តម្លៃសរុប) × 100%។",
          socratic_clue_en: "Percentage = (Part / Total) × 100%.",
          explanation_km:
            "រូបមន្តភាគរយ P = (A/B) × 100% ប្រើសម្រាប់គណនាអត្រាក្នុង ១០០ នៃទំហំណាមួយ។",
          explanation_en: "The percentage formula calculates proportional scale out of 100.",
        },
        {
          id: "g7-math-02-q11",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី១១ • គណនាតម្លៃភាគរយជាក់ស្តែង",
          stage_name_en: "Stage 11 • Practical Percentage Calculation",
          prompt_km:
            "នៅក្នុងថ្នាក់រៀនមួយមានសិស្ស 40 នាក់។ ប្រសិនបើសិស្សស្រីមាន 60% តើមានសិស្សស្រីប៉ុន្មាននាក់?",
          prompt_en:
            "A classroom has 40 students. If 60% are girls, how many female students are there?",
          given_values_km: [
            { label: "សិស្សសរុប", value: "40 នាក់" },
            { label: "ភាគរយសិស្សស្រី", value: "60%" },
          ],
          given_values_en: [
            { label: "Total Students", value: "40" },
            { label: "Female Ratio", value: "60%" },
          ],
          options_km: ["24 នាក់ (40 × 0.60 = 24)", "20 នាក់", "16 នាក់", "30 នាក់"],
          options_en: ["24 students (40 × 0.60 = 24)", "20 students", "16 students", "30 students"],
          correct_index: 0,
          socratic_clue_km: "គណនា 60% នៃ 40 ៖ 40 × (60/100) = 40 × 0.6 = 24 នាក់។",
          socratic_clue_en: "Calculate 60% of 40: 40 × 0.60 = 24.",
          explanation_km: "ចំនួនសិស្សស្រី = 40 × (60 / 100) = 24 នាក់។",
          explanation_en: "Number of female students = 40 × 0.6 = 24.",
        },
        {
          id: "g7-math-02-q12",
          type: "derivation_chain",
          stage_name_km: "ដំណាក់កាលទី១២ • ជំហានដោះស្រាយប្រមាណវិធីចម្រុះប្រភាគ",
          stage_name_en: "Stage 12 • Fraction Problem Solving Protocol",
          prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយប្រមាណវិធីបូកដកប្រភាគឱ្យបានត្រឹមត្រូវ៖",
          prompt_en: "Arrange the 4 steps for evaluating multi-fraction operations:",
          steps_km: [
            "បំប្លែងចំនួនចម្រុះ (បើមាន) ទៅជាប្រភាគមិនសុទ្ធ",
            "រកភាគបែងរួមតូចបំផុត (LCM) និងតម្រូវភាគបែង",
            "បូក ឬដក ភាគយកដោយរក្សាទុកភាគបែងរួម",
            "សម្រួលប្រភាគលទ្ធផលឱ្យទៅជាប្រភាគសម្រួលមិនអាចបង្រួមបាន",
          ],
          steps_en: [
            "Convert mixed numbers (if any) to improper fractions",
            "Determine least common denominator (LCM) and rescale",
            "Add or subtract numerators while keeping the common denominator",
            "Reduce final fraction to irreducible lowest terms",
          ],
          correct_chain_order: [0, 1, 2, 3],
          formula_badge: "Fraction Protocol",
          socratic_clue_km: "បំប្លែងចំនួនចម្រុះ -> តម្រូវភាគបែង -> បូកដកភាគយក -> សម្រួលលទ្ធផល។",
          socratic_clue_en:
            "Convert mixed -> Find LCM -> Combine numerators -> Simplify to lowest terms.",
          explanation_km:
            "លំដាប់ ៤ ជំហាននេះធានាភាពត្រឹមត្រូវ 100% ក្នុងការប្រឡងបាក់ឌុប និងឌីប្លូម។",
          explanation_en:
            "This standard 4-step protocol guarantees accuracy on MoEYS national exams.",
        },
      ];
    }

    // 1D. Quadratic Equations & Discriminant Δ (Grade 9 / 10 Math)
    return [
      {
        id: "math-quad-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តឌីសគ្រីមីណង់ Δ",
        stage_name_en: "Stage 1 • Discriminant Formula Synthesizer",
        prompt_km: "ចូរផ្គុំរូបមន្តឌីសគ្រីមីណង់ ដេលតា (Δ) នៃសមីការដឺក្រេទី២៖",
        prompt_en: "Assemble the quadratic discriminant formula (Δ) on the equation rail:",
        spoken_theorem_km: "ដេលតា ស្មើនឹង បេ ការេ ដក បួន អា សេ",
        spoken_theorem_en: "Delta equals b squared minus four a c",
        variables_pool: [
          { id: "q1", symbol: "Δ", name_km: "ដេលតា", name_en: "Discriminant", unit: "Metric" },
          {
            id: "q2",
            symbol: "=",
            name_km: "ស្មើនឹង",
            name_en: "Equals",
            unit: "Operator",
            category: "operator",
          },
          { id: "q3", symbol: "b²", name_km: "បេការេ", name_en: "b squared", unit: "Term" },
          {
            id: "q4",
            symbol: "-",
            name_km: "ដក",
            name_en: "Minus",
            unit: "Operator",
            category: "operator",
          },
          { id: "q5", symbol: "4ac", name_km: "៤ac", name_en: "4ac product", unit: "Product" },
          {
            id: "q6",
            symbol: "+",
            name_km: "បូក",
            name_en: "Plus",
            unit: "Operator",
            category: "operator",
          },
          { id: "q7", symbol: "2a", name_km: "២a", name_en: "2a", unit: "Distractor" },
        ],
        target_sequence_ids: ["q1", "q2", "q3", "q4", "q5"],
        formula_badge: "Δ = b² - 4ac",
        socratic_clue_km: "ឌីសគ្រីមីណង់ ដេលតា ស្មើ b² ដក 4ac។",
        socratic_clue_en: "Discriminant Δ equals b² minus 4ac.",
        explanation_km:
          "រូបមន្តឌីសគ្រីមីណង់ Δ = b² - 4ac កំណត់ចំនួនឬសនៃសមីការដឺក្រេទី២ ax² + bx + c = 0។",
        explanation_en:
          "The discriminant Δ = b² - 4ac dictates the nature and count of quadratic roots.",
      },
      {
        id: "math-quad-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ការវិភាគចំនួនឬសតាមសញ្ញា Δ",
        stage_name_en: "Stage 2 • Root Nature Analysis",
        prompt_km: "ប្រសិនបើសមីការដឺក្រេទី២ មានតម្លៃ Δ > 0 តើសមីការនោះមានឬសយ៉ាងដូចម្តេច?",
        prompt_en: "If a quadratic equation yields discriminant Δ > 0, what are its roots?",
        options_km: [
          "មានឬសពីរជាចំនួនពិតផ្សេងគ្នា (x₁ ≠ x₂)",
          "មានឬសឌុបតែមួយ (x₁ = x₂)",
          "គ្មានឬសក្នុងសំណុំចំនួនពិតទេ",
          "មានឬសអនន្តច្រើនរាប់មិនអស់",
        ],
        options_en: [
          "Two distinct real roots (x₁ ≠ x₂)",
          "Exactly one double root (x₁ = x₂ = -b/2a)",
          "No real roots (conjugate complex roots)",
          "Infinitely many solutions",
        ],
        correct_index: 0,
        scientific_analogy_km: "ដូចខ្សែកោងប៉ារ៉ាបូលកាត់អ័ក្សដេក Ox ត្រង់ ២ ចំណុចដាច់ដោយឡែកពីគ្នា។",
        scientific_analogy_en:
          "Like a parabola intersecting the horizontal axis at two distinct points.",
        formula_badge: "Δ > 0 ⟹ 2 ឬសពិត",
        socratic_clue_km: "កាលណា Δ វិជ្ជមាន (Δ > 0) រ៉ាឌីកាល់ √Δ មានតម្លៃ នាំឱ្យបានឬសពីរខុសគ្នា។",
        socratic_clue_en:
          "When Δ > 0, the square root √Δ produces two distinct branches: (-b ± √Δ)/2a.",
        explanation_km: "បើ Δ > 0 សមីការមានឬសពីរផ្សេងគ្នា x = (-b ± √Δ)/(2a)។",
        explanation_en: "When the discriminant is strictly positive, two real roots exist.",
      },
      {
        id: "math-quad-3",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៣ • ជំហានដោះស្រាយសមីការដឺក្រេទី២",
        stage_name_en: "Stage 3 • Quadratic Solving Steps",
        prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយសមីការដឺក្រេទី២ ឱ្យបានត្រឹមត្រូវ៖",
        prompt_en: "Arrange the 4 steps to solve a quadratic equation ax² + bx + c = 0:",
        steps_km: [
          "កំណត់មេគុណ a, b, c ពីសមីការ ax² + bx + c = 0",
          "គណនាតម្លៃឌីសគ្រីមីណង់ Δ = b² - 4ac",
          "ប្រៀបធៀបសញ្ញានៃ Δ ជាមួយលេខ ០",
          "ទាញរកឬស x = (-b ± √Δ)/(2a) ប្រសិនបើ Δ ≥ 0",
        ],
        steps_en: [
          "Identify coefficients a, b, and c from standard form",
          "Calculate discriminant Δ = b² - 4ac",
          "Compare the sign of Δ against zero",
          "Compute roots x = (-b ± √Δ)/(2a) if Δ ≥ 0",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "x = (-b ± √Δ) / 2a",
        socratic_clue_km: "កំណត់ a,b,c -> រក Δ -> ពិនិត្យសញ្ញា -> គណនាឬស x។",
        socratic_clue_en: "Find coefficients -> compute Δ -> evaluate sign -> calculate roots.",
        explanation_km: "ក្បួនដោះស្រាយសមីការដឺក្រេទី២ ចាប់ផ្តើមពីការរក Δ រួចទាញរកឬសតាមរូបមន្តទូទៅ។",
        explanation_en:
          "Standard quadratic resolution pipeline from coefficient extraction to root evaluation.",
      },
      {
        id: "math-quad-4",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាតម្លៃឌីសគ្រីមីណង់",
        stage_name_en: "Stage 4 • Discriminant Bench Calculation",
        prompt_km: "ចំពោះសមីការ x² - 5x + 6 = 0 (a = 1, b = -5, c = 6) គណនាតម្លៃ Δ ៖",
        prompt_en: "For equation x² - 5x + 6 = 0 (a = 1, b = -5, c = 6), calculate discriminant Δ:",
        given_values_km: [
          { label: "មេគុណ a", value: "1" },
          { label: "មេគុណ b", value: "-5" },
          { label: "មេគុណ c", value: "6" },
        ],
        given_values_en: [
          { label: "Coefficient a", value: "1" },
          { label: "Coefficient b", value: "-5" },
          { label: "Coefficient c", value: "6" },
        ],
        options_km: [
          "Δ = 1 (តាមរូបមន្ត (-5)² - 4(1)(6) = 25 - 24 = 1)",
          "Δ = 49 (ច្រឡំសញ្ញា 25 + 24)",
          "Δ = -1",
          "Δ = 0",
        ],
        options_en: [
          "Δ = 1 (via (-5)² - 4(1)(6) = 25 - 24 = 1)",
          "Δ = 49 (sign error: 25 + 24)",
          "Δ = -1",
          "Δ = 0",
        ],
        correct_index: 0,
        formula_badge: "Δ = 1",
        socratic_clue_km: "យក (-5)² = 25 រួចដក 4 × 1 × 6 = 24៖ 25 - 24 = 1។",
        socratic_clue_en: "Square (-5) to get 25, then subtract 4(1)(6) = 24. Result: 25 - 24 = 1.",
        explanation_km:
          "Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 > 0 នាំឱ្យសមីការមានឬសពីរគឺ x = 2 និង x = 3។",
        explanation_en: "Δ = 1 > 0 confirms two distinct integer solutions: x₁ = 2, x₂ = 3.",
      },
    ];
  }

  // ============================================================================
  // 2. BIOLOGY LABS
  // ============================================================================
  if (subjectSlug === "biology" || id.includes("bio")) {
    // 2A. Molecular Genetics & DNA (G12 Bio)
    if (id.includes("g12-bio-01") || id.includes("dna") || id.includes("genetic")) {
      return [
        {
          id: "bio-dna-1",
          type: "synthesizer",
          stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់បំពេញបាស DNA",
          stage_name_en: "Stage 1 • DNA Base Pairing Synthesizer",
          prompt_km: "ចូរផ្គុំសម្ព័ន្ធគូរបាសអាសូតនៃ DNA តាមច្បាប់បំពេញ៖",
          prompt_en: "Assemble Watson-Crick DNA complementary base pairs on the rail:",
          spoken_theorem_km: "អាដេនីន ភ្ជាប់នឹង ទីមីន ហើយ ហ្គានីន ភ្ជាប់នឹង ស៊ីតូស៊ីន",
          spoken_theorem_en: "Adenine pairs with Thymine and Guanine pairs with Cytosine",
          variables_pool: [
            { id: "b1", symbol: "A", name_km: "អាដេនីន", name_en: "Adenine", unit: "Purine" },
            {
              id: "b2",
              symbol: "=",
              name_km: "សម្ព័ន្ធ ២",
              name_en: "2 H-bonds",
              unit: "Double Bond",
              category: "operator",
            },
            { id: "b3", symbol: "T", name_km: "ទីមីន", name_en: "Thymine", unit: "Pyrimidine" },
            {
              id: "b4",
              symbol: "&",
              name_km: "និង",
              name_en: "And",
              unit: "Conjunction",
              category: "operator",
            },
            { id: "b5", symbol: "G", name_km: "ហ្គានីន", name_en: "Guanine", unit: "Purine" },
            {
              id: "b6",
              symbol: "≡",
              name_km: "សម្ព័ន្ធ ៣",
              name_en: "3 H-bonds",
              unit: "Triple Bond",
              category: "operator",
            },
            {
              id: "b7",
              symbol: "C",
              name_km: "ស៊ីតូស៊ីន",
              name_en: "Cytosine",
              unit: "Pyrimidine",
            },
          ],
          target_sequence_ids: ["b1", "b2", "b3", "b4", "b5", "b6", "b7"],
          formula_badge: "A = T & G ≡ C",
          socratic_clue_km: "A ភ្ជាប់ T ដោយសម្ព័ន្ធអ៊ីដ្រូសែន ២ ហើយ G ភ្ជាប់ C ដោយសម្ព័ន្ធ ៣។",
          socratic_clue_en:
            "Adenine bonds with Thymine via 2 H-bonds; Guanine bonds with Cytosine via 3 H-bonds.",
          explanation_km:
            "ច្បាប់បំពេញបាស Chargaff ចែងថា A តែងតែភ្ជាប់នឹង T ហើយ G តែងតែភ្ជាប់នឹង C ក្នុងទ្វេវង់ DNA។",
          explanation_en:
            "Complementary base pairing (A=T and G≡C) maintains uniform double helix diameter.",
        },
        {
          id: "bio-dna-2",
          type: "concept_choice",
          stage_name_km: "ដំណាក់កាលទី២ • ភាពខុសគ្នារវាង DNA និង RNA",
          stage_name_en: "Stage 2 • Nucleic Acid Comparison",
          prompt_km: "តើបាសអាសូតណាដែលមានតែនៅក្នុង RNA ហើយមិនមានក្នុង DNA ឡើយ?",
          prompt_en: "Which nitrogenous base is present exclusively in RNA and never in DNA?",
          options_km: [
            "អ៊ុយរ៉ាស៊ីល (Uracil - U ជំនួស Thymine)",
            "អាដេនីន (Adenine - A)",
            "ហ្គានីន (Guanine - G)",
            "ស៊ីតូស៊ីន (Cytosine - C)",
          ],
          options_en: ["Uracil (U replaces Thymine)", "Adenine (A)", "Guanine (G)", "Cytosine (C)"],
          correct_index: 0,
          scientific_analogy_km:
            "ដូចសំបុត្រផ្ញើសារបណ្តោះអាសន្ន៖ RNA ប្រើ U ជំនួស T ដើម្បីងាយស្រួលបំបែកចោលក្រោយបកប្រែរួច។",
          scientific_analogy_en:
            "Like a disposable messenger: RNA incorporates Uracil rather than energetic Thymine.",
          formula_badge: "Uracil (U) in RNA",
          socratic_clue_km: "ក្នុង RNA បាស Thymine (T) ត្រូវបានជំនួសដោយ Uracil (U)។",
          socratic_clue_en:
            "In RNA transcripts, Uracil (U) replaces Thymine (T) across from Adenine.",
          explanation_km:
            "RNA មានបាស ៤ គឺ A, U, G, C (អ៊ុយរ៉ាស៊ីល U ជំនួស ទីមីន T) និងមានស្កររីបូស។",
          explanation_en:
            "RNA uniquely uses Uracil instead of Thymine and ribose instead of deoxyribose.",
        },
        {
          id: "bio-dna-3",
          type: "derivation_chain",
          stage_name_km: "ដំណាក់កាលទី៣ • លំដាប់សំយោគប្រូតេអ៊ីន (Central Dogma)",
          stage_name_en: "Stage 3 • Protein Synthesis Flow",
          prompt_km: "ចូររៀបចំ ៤ ដំណាក់កាលនៃការសំយោគប្រូតេអ៊ីនតាមលំដាប់លំហូរព័ត៌មានពន្ធុ៖",
          prompt_en: "Arrange the 4 sequential stages of the Central Dogma of Molecular Biology:",
          steps_km: [
            "ការចម្លងកូដ (Transcription) ពីពុម្ព DNA ទៅជា mRNA ក្នុងស្នូលកោសិកា",
            "mRNA ចាកចេញពីស្នូលឆ្លងកាត់រន្ធភ្នាសស្នូល ទៅកាន់ស៊ីតូប្លាស",
            "mRNA ភ្ជាប់ជាមួយរីបូសូម (Ribosome) ដើម្បីចាប់ផ្តើមបកប្រែកូដ",
            "tRNA ដឹកនាំអាស៊ីតអាមីណូមកផ្គុំជាច្រវាក់ប៉ូលីប៉ិបទីត (ប្រូតេអ៊ីន)",
          ],
          steps_en: [
            "Transcription of DNA template strand into pre-mRNA in nucleus",
            "mRNA transcript exits nucleus through nuclear pores into cytoplasm",
            "mRNA binds to small ribosomal subunit to initiate translation",
            "tRNA matches anticodons and elongates nascent polypeptide protein chain",
          ],
          correct_chain_order: [0, 1, 2, 3],
          formula_badge: "DNA ➔ mRNA ➔ Protein",
          socratic_clue_km:
            "ចម្លងកូដក្នុងស្នូល -> mRNA ចេញក្រៅ -> ភ្ជាប់រីបូសូម -> tRNA បកប្រែជាប្រូតេអ៊ីន។",
          socratic_clue_en:
            "Nuclear transcription -> cytoplasmic export -> ribosomal docking -> tRNA translation.",
          explanation_km:
            "ព័ត៌មានពន្ធុហូរពី DNA ទៅ mRNA តាមការចម្លងកូដ រួចបកប្រែជារូបរាងប្រូតេអ៊ីននៅរីបូសូម។",
          explanation_en:
            "The Central Dogma describes unidirectional information transfer: DNA -> RNA -> Protein.",
        },
        {
          id: "bio-dna-4",
          type: "lab_calculation",
          stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាកូដុង និងអាស៊ីតអាមីណូ",
          stage_name_en: "Stage 4 • Codon Translation Calculation",
          prompt_km:
            "ខ្សែ mRNA មួយមានប្រវែង ៣០០ នុយក្លេអូទីដ (មិនគិតកូដុងបញ្ចប់)។ តើវាសំយោគបានប្រូតេអ៊ីនដែលមានអាស៊ីតអាមីណូចំនួនប៉ុន្មាន?",
          prompt_en:
            "An mRNA strand consists of 300 coding nucleotides (excluding stop codon). How many amino acids will be in the translated peptide?",
          given_values_km: [
            { label: "ចំនួននុយក្លេអូទីដ (N)", value: "300" },
            { label: "នុយក្លេអូទីដក្នុង ១ កូដុង", value: "3" },
          ],
          given_values_en: [
            { label: "Coding Nucleotides (N)", value: "300" },
            { label: "Bases per Codon", value: "3" },
          ],
          options_km: [
            "១០០ អាស៊ីតអាមីណូ (ព្រោះ ៣ នុយក្លេអូទីដ = ១ កូដុង = ១ អាស៊ីតអាមីណូ)",
            "៣០០ អាស៊ីតអាមីណូ",
            "៩០០ អាស៊ីតអាមីណូ",
            "៥០ អាស៊ីតអាមីណូ",
          ],
          options_en: [
            "100 amino acids (via 300 / 3 = 100 codons)",
            "300 amino acids",
            "900 amino acids",
            "50 amino acids",
          ],
          correct_index: 0,
          formula_badge: "100 Amino Acids",
          socratic_clue_km: "កូដពន្ធុជាកូដត្រីធាតុ (Triplet Code)៖ យក 300 ចែកនឹង 3។",
          socratic_clue_en: "Genetic code is triplet-based: divide total nucleotides by 3.",
          explanation_km: "ចំនួនអាស៊ីតអាមីណូ = ៣០០ / ៣ = ១០០ អាស៊ីតអាមីណូ។",
          explanation_en:
            "Triplet reading frame translates 300 nucleotides into exactly 100 amino acids.",
        },
      ];
    }

    // 2B. Photosynthesis & Cellular Respiration (General Bio)
    return [
      {
        id: "bio-photo-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគសមីការរស្មីសំយោគ",
        stage_name_en: "Stage 1 • Photosynthesis Synthesizer",
        prompt_km: "ចូរផ្គុំសមីការគីមីនៃរស្មីសំយោគរបស់រុក្ខជាតិ៖",
        prompt_en: "Assemble the chemical equation for plant photosynthesis:",
        spoken_theorem_km:
          "ប្រាំមួយ ឧស្ម័នកាបូនិក បូក ប្រាំមួយ ទឹក បង្កើតបានជា គ្លុយកូស បូក ប្រាំមួយ អុកស៊ីសែន",
        spoken_theorem_en:
          "Six Carbon Dioxide plus six Water molecules yield one Glucose and six Oxygen",
        variables_pool: [
          { id: "p1", symbol: "6 CO₂", name_km: "កាបូនិក", name_en: "Carbon Dioxide", unit: "Gas" },
          {
            id: "p2",
            symbol: "+",
            name_km: "បូក",
            name_en: "Plus",
            unit: "Operator",
            category: "operator",
          },
          { id: "p3", symbol: "6 H₂O", name_km: "ទឹក", name_en: "Water", unit: "Liquid" },
          {
            id: "p4",
            symbol: "→",
            name_km: "បង្កើតជា",
            name_en: "Yields",
            unit: "Reaction",
            category: "operator",
          },
          { id: "p5", symbol: "C₆H₁₂O₆", name_km: "គ្លុយកូស", name_en: "Glucose", unit: "Sugar" },
          {
            id: "p6",
            symbol: "+",
            name_km: "បូក",
            name_en: "Plus",
            unit: "Operator",
            category: "operator",
          },
          { id: "p7", symbol: "6 O₂", name_km: "អុកស៊ីសែន", name_en: "Oxygen", unit: "Gas" },
        ],
        target_sequence_ids: ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],
        formula_badge: "6 CO₂ + 6 H₂O ➔ C₆H₁₂O₆ + 6 O₂",
        socratic_clue_km:
          "រុក្ខជាតិស្រូប CO₂ និងទឹក ដោយប្រើពន្លឺព្រះអាទិត្យ ផលិតបានស្ករគ្លុយកូស និងឧស្ម័ន O₂។",
        socratic_clue_en:
          "Plants absorb carbon dioxide and water to produce glucose sugar and oxygen gas.",
        explanation_km:
          "រស្មីសំយោគបំប្លែងថាមពលពន្លឺព្រះអាទិត្យទៅជាថាមពលគីមីស្តុកទុកក្នុងម៉ូលេគុលគ្លុយកូស។",
        explanation_en:
          "Photosynthesis converts solar photons into chemical energy stored in glucose bonds.",
      },
      {
        id: "bio-photo-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ទីតាំងសំយោគពន្លឺក្នុងកោសិកា",
        stage_name_en: "Stage 2 • Cellular Organelle Analysis",
        prompt_km:
          "តើសរីរាង្គតូច (Organelle) ណាក្នុងកោសិការុក្ខជាតិ ដែលជាទីតាំងផ្ទាល់នៃដំណើររស្មីសំយោគ?",
        prompt_en:
          "Which plant cell organelle is the dedicated biological site for photosynthesis?",
        options_km: [
          "ក្លរ៉ូប្លាស (Chloroplast - ផ្ទុកសារធាតុពណ៌បៃតងក្លរ៉ូភីល)",
          "មីតូកុងឌ្រី (Mitochondria - កន្លែងដកដង្ហើមកោសិកា)",
          "រីបូសូម (Ribosome - កន្លែងសំយោគប្រូតេអ៊ីន)",
          "ស្នូលកោសិកា (Nucleus)",
        ],
        options_en: [
          "Chloroplast (contains chlorophyll pigment thylakoids)",
          "Mitochondria (site of cellular respiration)",
          "Ribosome (protein factory)",
          "Cell Nucleus",
        ],
        correct_index: 0,
        scientific_analogy_km:
          "ដូចបន្ទះស្រូបពន្លឺព្រះអាទិត្យ (Solar panels) របស់កោសិកា ដែលចាប់យកពន្លឺថ្ងៃ។",
        scientific_analogy_en:
          "Like biological solar panels, thylakoid membranes capture photons to split water.",
        formula_badge: "Chloroplast",
        socratic_clue_km: "ក្លរ៉ូប្លាសមានសារធាតុពណ៌បៃតងក្លរ៉ូភីល ដែលចាប់យកពន្លឺព្រះអាទិត្យ។",
        socratic_clue_en:
          "Chloroplasts house chlorophyll pigments capable of absorbing visible light wavelengths.",
        explanation_km:
          "រស្មីសំយោគប្រព្រឹត្តទៅក្នុងក្លរ៉ូប្លាស ដែលផ្ទុកក្លរ៉ូភីលស្រូបពន្លឺព្រះអាទិត្យ។",
        explanation_en:
          "Chloroplast thylakoids and stroma execute the light reactions and Calvin cycle.",
      },
      {
        id: "bio-photo-3",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៣ • វដ្តចែកកោសិកាមីតូស (Mitosis)",
        stage_name_en: "Stage 3 • Mitotic Phase Sequence",
        prompt_km: "ចូររៀបចំដំណាក់កាលទាំង ៤ នៃការចែកកោសិកាមីតូសឱ្យបានត្រឹមត្រូវតាមលំដាប់លំដោយ៖",
        prompt_en:
          "Arrange the 4 classic phases of mitotic somatic cell division in chronological order:",
        steps_km: [
          "Prophase ៖ ក្រូម៉ាទីនកកើតជាក្រូម៉ូសូម ភ្នាសស្នូលរលាយបាត់",
          "Metaphase ៖ ក្រូម៉ូសូមតម្រង់ជួរនៅប្លង់អេក្វាទ័រកណ្តាលកោសិកា",
          "Anaphase ៖ ក្រូម៉ាទីតបងប្អូនបែកចេញពីគ្នា ឆ្ពោះទៅប៉ូលទាំងសងខាង",
          "Telophase ៖ ស្នូលថ្មីកកើតឡើងវិញ កោសិកាបំបែកជាពីរ",
        ],
        steps_en: [
          "Prophase: Chromatin condenses into visible chromosomes, nuclear membrane dissolves",
          "Metaphase: Chromosomes align along equatorial metaphase plate",
          "Anaphase: Sister chromatids pulled apart toward opposite poles by spindle fibers",
          "Telophase: Nuclear envelopes reform, cytokinesis yields two identical daughter cells",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "P ➔ M ➔ A ➔ T",
        socratic_clue_km: "ចាំពាក្យកាត់ PMAT ៖ Prophase -> Metaphase -> Anaphase -> Telophase។",
        socratic_clue_en: "Mnemonic PMAT: Prophase -> Metaphase -> Anaphase -> Telophase.",
        explanation_km:
          "មីតូសឆ្លងកាត់ ៤ ដំណាក់កាលជាប់ៗគ្នា (PMAT) ដើម្បីបែងចែកក្រូម៉ូសូមស្មើគ្នាទៅកោសិកាកូនទាំងពីរ។",
        explanation_en:
          "Mitotic PMAT order ensures exact chromosomal distribution without genetic anomalies.",
      },
      {
        id: "bio-photo-4",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី៤ • ផលធៀបសេណូទីបម៉ង់ដែល (Punnett Square)",
        stage_name_en: "Stage 4 • Mendelian Ratio Calculation",
        prompt_km:
          "ក្នុងការបង្កាត់ពូជសណ្តែករបស់លោកម៉ង់ដែលរវាងកូនកាត់ F₁ (Aa × Aa) តើកូនជំនាន់ F₂ នឹងមានផលធៀបរូបរាង (Phenotype) យ៉ាងដូចម្តេច?",
        prompt_en:
          "In a monohybrid cross of heterozygous F₁ pea plants (Aa × Aa), what is the expected phenotypic ratio in F₂?",
        given_values_km: [
          { label: "សេណូទីបមេបា", value: "Aa × Aa" },
          { label: "លក្ខណៈលុប (A)", value: "ដើមខ្ពស់" },
          { label: "លក្ខណៈលិច (a)", value: "ដើមទាប" },
        ],
        given_values_en: [
          { label: "Parental Genotype", value: "Aa × Aa" },
          { label: "Dominant Allele (A)", value: "Tall" },
          { label: "Recessive Allele (a)", value: "Short" },
        ],
        options_km: [
          "៣ ដើមខ្ពស់ : ១ ដើមទាប (ផលធៀប 3 : 1)",
          "១ ដើមខ្ពស់ : ១ ដើមទាប",
          "ទាំងអស់សុទ្ធតែជាដើមខ្ពស់",
          "៩ : ៣ : ៣ : ១ (នេះជាការបង្កាត់ ២ លក្ខណៈ)",
        ],
        options_en: [
          "3 Tall : 1 Short (classic 3:1 phenotypic ratio)",
          "1 Tall : 1 Short",
          "100% Tall",
          "9 : 3 : 3 : 1 (dihybrid ratio)",
        ],
        correct_index: 0,
        formula_badge: "3 : 1 Ratio",
        socratic_clue_km:
          "តារាង Punnett មាន AA (ខ្ពស់), Aa (ខ្ពស់), Aa (ខ្ពស់), aa (ទាប) ៖ សរុប ៣ ខ្ពស់ : ១ ទាប។",
        socratic_clue_en:
          "Punnett square gives AA, Aa, Aa (3 dominant phenotypes) to aa (1 recessive phenotype).",
        explanation_km: "ផលធៀបរូបរាងនៃការបង្កាត់ឯកកូនកាត់ម៉ង់ដែលគឺ 3 លុប : 1 លិច (3:1)។",
        explanation_en: "Monohybrid heterozygous crosses yield a strict 3:1 phenotypic ratio.",
      },
    ];
  }

  // ============================================================================
  // 3. EARTH & ENVIRONMENTAL SCIENCE LABS
  // ============================================================================
  if (subjectSlug === "earth" || id.includes("earth")) {
    return [
      {
        id: "earth-lab-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគស្រទាប់ខាងក្នុងផែនដី",
        stage_name_en: "Stage 1 • Geosphere Layer Synthesizer",
        prompt_km: "ចូរផ្គុំរចនាសម្ព័ន្ធស្រទាប់ផែនដីតាមលំដាប់ពីក្រៅទៅក្នុង៖",
        prompt_en: "Assemble the Earth's interior layers in order from surface to core:",
        spoken_theorem_km: "សំបកផែនដី ទៅកាន់ អាវផែនដី ទៅកាន់ ស្នូលក្រៅ ទៅកាន់ ស្នូលក្នុង",
        spoken_theorem_en: "Crust leads to Mantle leads to Outer Core leads to Inner Solid Core",
        variables_pool: [
          {
            id: "e1",
            symbol: "សំបកផែនដី (Crust)",
            name_km: "សំបក",
            name_en: "Crust",
            unit: "0-40 km",
          },
          {
            id: "e2",
            symbol: "➔",
            name_km: "ឆ្ពោះទៅ",
            name_en: "Transition",
            unit: "Boundary",
            category: "operator",
          },
          {
            id: "e3",
            symbol: "អាវផែនដី (Mantle)",
            name_km: "អាវ",
            name_en: "Mantle",
            unit: "2900 km",
          },
          {
            id: "e4",
            symbol: "➔",
            name_km: "ឆ្ពោះទៅ",
            name_en: "Transition",
            unit: "Boundary",
            category: "operator",
          },
          {
            id: "e5",
            symbol: "ស្នូលក្រៅ (Outer Core)",
            name_km: "ស្នូលរាវ",
            name_en: "Outer Core",
            unit: "Liquid Fe-Ni",
          },
          {
            id: "e6",
            symbol: "➔",
            name_km: "ឆ្ពោះទៅ",
            name_en: "Transition",
            unit: "Boundary",
            category: "operator",
          },
          {
            id: "e7",
            symbol: "ស្នូលក្នុង (Inner Core)",
            name_km: "ស្នូលរឹង",
            name_en: "Inner Core",
            unit: "Solid Iron",
          },
        ],
        target_sequence_ids: ["e1", "e2", "e3", "e4", "e5", "e6", "e7"],
        formula_badge: "Crust ➔ Mantle ➔ Core",
        socratic_clue_km:
          "លំដាប់ស្រទាប់ផែនដីពីក្រៅទៅក្នុង៖ សំបក -> អាវ -> ស្នូលក្រៅរាវ -> ស្នូលក្នុងរឹង។",
        socratic_clue_en:
          "From superficial to center: Crust -> Mantle -> Liquid Outer Core -> Solid Inner Core.",
        explanation_km:
          "ផែនដីមាន ៣ ស្រទាប់ធំៗ ៖ សំបកថ្មក្រៅ អាវម៉ាក់ម៉ាកណ្តាល និងស្នូលដែក-នីកែលខាងក្នុងបង្អស់។",
        explanation_en:
          "Density differentiation sorted Earth into rocky crust, convective silicate mantle, and iron core.",
      },
      {
        id: "earth-lab-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ដែនម៉ាញេទិចផែនដី",
        stage_name_en: "Stage 2 • Planetary Geodynamo Origin",
        prompt_km: "តើស្រទាប់ណាដែលបង្កើតដែនម៉ាញេទិចការពារភពផែនដីពីខ្យល់ព្រះអាទិត្យ (Solar Wind)?",
        prompt_en: "Which planetary layer generates Earth's geomagnetic shield against solar wind?",
        options_km: [
          "ស្នូលក្រៅ (Outer Core - លំហូរចរន្តវិលវល់នៃដែក និងនីកែលរាវ)",
          "សំបកផែនដី (Crust)",
          "ស្រទាប់អូហ្សូនក្នុងបរិយាកាស",
          "បាតមហាសមុទ្រ",
        ],
        options_en: [
          "Outer Core (convection of molten iron-nickel dynamo)",
          "Planetary Crust",
          "Atmospheric Ozone Layer",
          "Abyssal Ocean Trenches",
        ],
        correct_index: 0,
        scientific_analogy_km:
          "ដូចឌីណាម៉ូកង់កង់៖ ចលនាវិលវល់នៃលោហៈរាវបង្កើតចរន្តអគ្គិសនី និងដែនម៉ាញេទិចសកល។",
        scientific_analogy_en:
          "Like an electrical dynamo: churning liquid conductors produce magnetic dipole flux.",
        formula_badge: "Geodynamo Shield",
        socratic_clue_km:
          "ចរន្តរាវវិលវល់នៃដែក និងនីកែលក្នុងស្នូលក្រៅ បង្កើតដែនម៉ាញេទិចការពារជីវិត។",
        socratic_clue_en:
          "Convection in the molten outer iron-nickel layer produces the geomagnetic dynamo.",
        explanation_km:
          "ស្នូលក្រៅជាលោហៈរាវដែលមានចលនាវិលវល់ បង្កើតបានជាដែនម៉ាញេទិចផែនដី (Geodynamo)។",
        explanation_en:
          "Earth's magnetic shield originates from mechanical convection within the molten outer core.",
      },
      {
        id: "earth-lab-3",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៣ • វដ្តថ្មធម្មជាតិ (The Rock Cycle)",
        stage_name_en: "Stage 3 • Rock Transformation Cycle",
        prompt_km: "ចូររៀបចំ ៤ ដំណាក់កាលនៃវដ្តថ្មធម្មជាតិឱ្យបានត្រឹមត្រូវ៖",
        prompt_en: "Arrange the 4 stages of the continuous geological rock cycle:",
        steps_km: [
          "ម៉ាក់ម៉ាចុះត្រជាក់កកបង្កើតជាថ្មម៉ាក់ម៉ា (Igneous Rocks)",
          "អាកាសធាតុនិងទឹកហូរបំបែកថ្មជាកម្ទេចកណ និងកកស្ទះជាថ្មកម្ទេចកណ (Sedimentary Rocks)",
          "សម្ពាធ និងកម្តៅខ្លាំងក្នុងដីប្រែក្លាយថ្មទៅជាថ្មប្រែក្លាយ (Metamorphic Rocks)",
          "ថ្មប្រែក្លាយរលាយចូលក្នុងអាវផែនដី ក្លាយជាម៉ាក់ម៉ាឡើងវិញ",
        ],
        steps_en: [
          "Magma cools and crystallizes into igneous rock",
          "Weathering and sedimentation lithify strata into sedimentary rock",
          "Intense tectonic heat and pressure deform rock into metamorphic rock",
          "Metamorphic rock subducts and melts back into molten magma",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "Magma ➔ Igneous ➔ Sedimentary ➔ Metamorphic",
        socratic_clue_km:
          "ម៉ាក់ម៉ាកក -> ថ្មម៉ាក់ម៉ា -> កម្ទេចកណ -> រងកម្តៅប្រែរូប -> រលាយជាម៉ាក់ម៉ា។",
        socratic_clue_en:
          "Magma crystallizes -> weathering/sedimentation -> metamorphic pressure -> melting.",
        explanation_km:
          "វដ្តថ្មជាដំណើរការវិលវល់គ្មានទីបញ្ចប់ដែលផ្លាស់ប្តូរប្រភេទថ្មក្រោមឥទ្ធិពលចលនាផែនដី។",
        explanation_en:
          "The rock cycle dynamically recycles crustal materials across geological time scales.",
      },
      {
        id: "earth-lab-4",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី៤ • ការវិភាគរលកកញ្ជ្រោលរញ្ជួយដី",
        stage_name_en: "Stage 4 • Richter Energy Scaling",
        prompt_km:
          "រាល់ពេលដែលកម្រិតរ៉ិចទ័រនៃការរញ្ជួយដីកើនឡើង ១ កម្រិត (ឧ. ពីកម្រិត ៥ ដល់ ៦) តើថាមពលរំញ័រដែលបញ្ចេញកើនឡើងប្រមាណប៉ុន្មានដង?",
        prompt_en:
          "On the Richter logarithmic earthquake scale, how much does released seismic energy multiply for each 1.0 unit increase (e.g., from 5.0 to 6.0)?",
        given_values_km: [
          { label: "កម្រិតរ៉ិចទ័រដើម", value: "5.0" },
          { label: "កម្រិតរ៉ិចទ័រថ្មី", value: "6.0 (កើន +1.0)" },
        ],
        given_values_en: [
          { label: "Initial Richter", value: "5.0" },
          { label: "New Richter", value: "6.0 (+1.0)" },
        ],
        options_km: [
          "ប្រមាណ ៣២ ដង (ថាមពលគុណនឹង 10^1.5 ≈ 31.6 ដង)",
          "កើនតែ ១ ដងប៉ុណ្ណោះ",
          "កើនឡើង ១០ ដង (១០ ដងគ្រាន់តែជាទំហំរលក Amplitude)",
          "កើនឡើង ១០០ ដង",
        ],
        options_en: [
          "Approximately 32 times (energy scales as 10^1.5 ≈ 31.6x)",
          "1 time",
          "10 times (10x is the wave amplitude, not total energy)",
          "100 times",
        ],
        correct_index: 0,
        formula_badge: "E ~ 10^(1.5 M)",
        socratic_clue_km:
          "មាត្រដ្ឋានរ៉ិចទ័រជាមាត្រដ្ឋានឡូការីត ៖ កើន ១ កម្រិត ថាមពលកើនឡើងប្រហែល ៣២ ដង។",
        socratic_clue_en:
          "Richter is logarithmic: each whole integer leap releases roughly 31.6 times more seismic energy.",
        explanation_km: "ការកើនឡើង ១ កម្រិតរ៉ិចទ័របង្កើនថាមពលបញ្ចេញប្រមាណ ៣១.៦ ដង (≈ ៣២ ដង)។",
        explanation_en:
          "Seismic wave energy scales exponentially: 10^(1.5 ΔM) ≈ 31.6-fold energy increase per unit.",
      },
    ];
  }

  // ============================================================================
  // 4. CHEMISTRY LABS
  // ============================================================================
  if (subjectSlug === "chemistry" || id.includes("chem")) {
    return [
      {
        id: "chem-lab-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគប្រតិកម្មបន្សាបអាស៊ីត-បាស",
        stage_name_en: "Stage 1 • Neutralization Synthesis",
        prompt_km: "ចូរផ្គុំសមីការប្រតិកម្មបន្សាបរវាងអាស៊ីតក្លរីឌ្រិច និងសូដ្យូមអ៊ីដ្រុកស៊ីត៖",
        prompt_en: "Assemble the balanced neutralization equation between HCl and NaOH:",
        spoken_theorem_km:
          "អាស៊ីតក្លរីឌ្រិច បូក សូដ្យូមអ៊ីដ្រុកស៊ីត បង្កើតបានជា អំបិលសូដ្យូមក្លរួ បូក ទឹក",
        spoken_theorem_en:
          "Hydrochloric acid plus Sodium hydroxide yields Sodium chloride salt and Water",
        variables_pool: [
          {
            id: "c1",
            symbol: "HCl",
            name_km: "អាស៊ីតក្លរីឌ្រិច",
            name_en: "Acid",
            unit: "Aqueous",
          },
          {
            id: "c2",
            symbol: "+",
            name_km: "បូក",
            name_en: "Reacts with",
            unit: "Plus",
            category: "operator",
          },
          {
            id: "c3",
            symbol: "NaOH",
            name_km: "សូដ្យូមអ៊ីដ្រុកស៊ីត",
            name_en: "Base",
            unit: "Aqueous",
          },
          {
            id: "c4",
            symbol: "→",
            name_km: "បង្កើតជា",
            name_en: "Yields",
            unit: "Reaction",
            category: "operator",
          },
          { id: "c5", symbol: "NaCl", name_km: "អំបិលសម្ល", name_en: "Salt", unit: "Salt" },
          {
            id: "c6",
            symbol: "+",
            name_km: "បូក",
            name_en: "Plus",
            unit: "Operator",
            category: "operator",
          },
          { id: "c7", symbol: "H₂O", name_km: "ទឹក", name_en: "Water", unit: "Liquid" },
        ],
        target_sequence_ids: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
        formula_badge: "HCl + NaOH ➔ NaCl + H₂O",
        socratic_clue_km: "អាស៊ីត (HCl) បូក បាស (NaOH) ឱ្យផលជា អំបិល (NaCl) និង ទឹក (H₂O)។",
        socratic_clue_en: "Acid plus Base yields Salt plus Water: HCl + NaOH -> NaCl + H₂O.",
        explanation_km:
          "អ៊ីយ៉ុង H⁺ ពីអាស៊ីតផ្សំជាមួយ OH⁻ ពីបាសបង្កើតបានជាទឹក ធ្វើឱ្យសូលុយស្យុងមាន pH = 7 (ណឺត)។",
        explanation_en:
          "Proton transfer between hydronium and hydroxide yields pure water and neutral salt.",
      },
      {
        id: "chem-lab-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ការវិភាគកម្រិត pH",
        stage_name_en: "Stage 2 • pH Scale Analysis",
        prompt_km:
          "ប្រសិនបើសូលុយស្យុងមួយមានកំហាប់អ៊ីយ៉ុង [H₃O⁺] = 10⁻³ M តើសូលុយស្យុងនេះមានកម្រិត pH ប៉ុន្មាន ហើយជាប្រភេទអ្វី?",
        prompt_en: "If a solution exhibits [H₃O⁺] = 10⁻³ M, what is its pH and chemical nature?",
        options_km: [
          "pH = 3 (សូលុយស្យុងអាស៊ីតខ្លាំង)",
          "pH = 11 (សូលុយស្យុងបាស)",
          "pH = 7 (សូលុយស្យុងណឺត)",
          "pH = -3",
        ],
        options_en: [
          "pH = 3 (Acidic solution)",
          "pH = 11 (Basic solution)",
          "pH = 7 (Neutral solution)",
          "pH = -3",
        ],
        correct_index: 0,
        scientific_analogy_km:
          "ដូចទឹកក្រូចឆ្មារ ឬទឹកខ្មេះ៖ pH កាន់តែតូចជាង ៧ ជាតិអាស៊ីតកាន់តែខ្លាំង។",
        scientific_analogy_en:
          "Like lemon juice: lower pH values below 7 reflect elevated hydronium ion concentration.",
        formula_badge: "pH = -log[H₃O⁺]",
        socratic_clue_km: "តាមរូបមន្ត pH = -log(10⁻³) = -(-3) = 3។",
        socratic_clue_en: "Using the logarithmic definition: pH = -log(10⁻³) = 3.",
        explanation_km: "pH = -log[H₃O⁺] = -log(10⁻³) = 3 < 7 នាំឱ្យសូលុយស្យុងមានលក្ខណៈជាអាស៊ីត។",
        explanation_en: "pH equals 3, denoting an acidic aqueous environment.",
      },
      {
        id: "chem-lab-3",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៣ • ខ្សែសង្វាក់គណនាកំហាប់ Titration",
        stage_name_en: "Stage 3 • Titration Math Derivation",
        prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការគណនាកំហាប់អាស៊ីតតាមវិធីអត្រាកម្ម (Titration)៖",
        prompt_en: "Arrange the 4 steps to determine unknown acid concentration via titration:",
        steps_km: [
          "កំណត់ចំណុចសមមូលនៅពេលសូចនាករពណ៌ប្តូរពណ៌",
          "អានមាឌបាសដែលបានប្រើប្រាស់ពីប៊ុយរ៉ែត (VB)",
          "សរសេរសមីការសមមូលម៉ូល CA · VA = CB · VB",
          "ទាញរកកំហាប់អាស៊ីត CA = (CB · VB) / VA",
        ],
        steps_en: [
          "Detect the equivalence point signaled by indicator color change",
          "Record titrant base volume consumed from burette (VB)",
          "State molar equivalence equation CA · VA = CB · VB",
          "Isolate unknown acid concentration CA = (CB · VB) / VA",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "CA · VA = CB · VB",
        socratic_clue_km: "រកចំណុចសមមូល -> អានមាឌ VB -> ដាក់សមីការសមមូល -> ទាញរក CA។",
        socratic_clue_en: "Find equivalence -> read VB -> apply equality -> solve for CA.",
        explanation_km: "នៅចំណុចសមមូល ចំនួនម៉ូលអាស៊ីតស្មើនឹងចំនួនម៉ូលបាស នាំឱ្យ CA·VA = CB·VB។",
        explanation_en: "Stoichiometric equivalence equates total moles of reacting acid and base.",
      },
      {
        id: "chem-lab-4",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាកំហាប់ក្នុងបន្ទប់ពិសោធន៍",
        stage_name_en: "Stage 4 • Solution Concentration Bench Test",
        prompt_km:
          "រំលាយអំបិលសម្ល NaCl ចំនួន n = 0.5 mol ក្នុងទឹកបង្កើតបានសូលុយស្យុងមាឌ V = 0.25 L។ គណនាកំហាប់ជាម៉ូលែ C ៖",
        prompt_en:
          "Dissolving n = 0.5 mol NaCl into water gives a total volume V = 0.25 L. Calculate molarity C:",
        given_values_km: [
          { label: "ចំនួនម៉ូល (n)", value: "0.5 mol" },
          { label: "មាឌសូលុយស្យុង (V)", value: "0.25 L" },
        ],
        given_values_en: [
          { label: "Moles (n)", value: "0.5 mol" },
          { label: "Volume (V)", value: "0.25 L" },
        ],
        options_km: [
          "C = 2 M (តាមរូបមន្ត C = n / V = 0.5 / 0.25 = 2 mol/L)",
          "C = 0.125 M (ច្រឡំយកគុណ)",
          "C = 0.5 M",
          "C = 1 M",
        ],
        options_en: [
          "C = 2.0 M (via C = n / V = 0.5 / 0.25 = 2.0 mol/L)",
          "C = 0.125 M",
          "C = 0.5 M",
          "C = 1.0 M",
        ],
        correct_index: 0,
        formula_badge: "C = 2 M",
        socratic_clue_km: "កំហាប់ C ស្មើចំនួនម៉ូល n ចែកនឹងមាឌ V ៖ 0.5 / 0.25 = 2 M។",
        socratic_clue_en: "Divide moles 0.5 by volume 0.25 L to obtain molarity 2.0 M.",
        explanation_km: "C = n / V = 0.5 mol / 0.25 L = 2 mol/L = 2 M។",
        explanation_en: "Molarity equals 0.5 moles divided by 0.25 liters = 2.0 Molar.",
      },
    ];
  }

  // ============================================================================
  // 5. PHYSICS LABS (DEFAULT & SPECIFIC CHAPTERS)
  // ============================================================================

  // 5A. Waves (Mechanical & Electromagnetic Waves)
  if (id.includes("phys-02") || id.includes("wave")) {
    return [
      {
        id: "wave-lab-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តប្រវែងរលក",
        stage_name_en: "Stage 1 • Wave Equation Synthesizer",
        prompt_km: "ចូរផ្គុំរូបមន្តទំនាក់ទំនងប្រវែងរលក (λ = v/f) លើរនាំងសមីការ៖",
        prompt_en: "Assemble the wave speed and wavelength equation (λ = v/f):",
        spoken_theorem_km: "ប្រវែងរលក ឡាំដា ស្មើនឹង ល្បឿនរលក ចែកនឹង ប្រេកង់",
        spoken_theorem_en: "Wavelength lambda equals wave velocity divided by frequency",
        variables_pool: [
          { id: "w1", symbol: "λ", name_km: "ប្រវែងរលក", name_en: "Wavelength", unit: "m" },
          {
            id: "w2",
            symbol: "=",
            name_km: "ស្មើនឹង",
            name_en: "Equals",
            unit: "Equivalence",
            category: "operator",
          },
          { id: "w3", symbol: "v", name_km: "ល្បឿនរលក", name_en: "Wave Speed", unit: "m/s" },
          {
            id: "w4",
            symbol: "/",
            name_km: "ចែកនឹង",
            name_en: "Divided by",
            unit: "Division",
            category: "operator",
          },
          { id: "w5", symbol: "f", name_km: "ប្រេកង់", name_en: "Frequency", unit: "Hz" },
          { id: "w6", symbol: "T", name_km: "ខួប", name_en: "Period", unit: "s" },
          { id: "w7", symbol: "E", name_km: "ថាមពល", name_en: "Energy", unit: "J" },
        ],
        target_sequence_ids: ["w1", "w2", "w3", "w4", "w5"],
        formula_badge: "λ = v / f",
        socratic_clue_km:
          "ប្រវែងរលក λ (ម៉ែត្រ) ស្មើនឹងល្បឿន v (m/s) ចែកនឹងប្រេកង់ f (Hz)។ ផ្គុំតាមលំដាប់៖ λ = v / f។",
        socratic_clue_en: "Wavelength λ equals velocity v divided by frequency f: λ = v / f.",
        explanation_km: "ប្រវែងរលកគឺជាចម្ងាយដែលរលកសាយភាយបានក្នុងមួយខួប៖ λ = v × T = v / f។",
        explanation_en: "Wavelength is the spatial period of a wave: λ = v · T = v / f.",
      },
      {
        id: "wave-lab-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ការវិភាគទំនាក់ទំនងប្រេកង់ និងប្រវែងរលក",
        stage_name_en: "Stage 2 • Frequency & Wavelength Intuition",
        prompt_km:
          "ប្រសិនបើរលកមួយសាយភាយក្នុងមជ្ឈដ្ឋានដដែល (ល្បឿន v ថេរ) ហើយប្រេកង់ f កើនឡើង ២ដង តើប្រវែងរលក λ នឹងប្រែប្រួលដូចម្តេច?",
        prompt_en:
          "If a wave propagates in the same medium (speed v is constant) and its frequency f doubles, how does wavelength λ change?",
        options_km: [
          "ថយចុះពាក់កណ្តាល (ព្រោះ λ ច្រាសសមាមាត្រនឹង f)",
          "កើនឡើង ២ដងដែរ (ព្រោះ λ សមាមាត្រនឹង f)",
          "នៅដដែល មិនប្រែប្រួលទេ (ព្រោះ v ថេរ)",
          "កើនឡើង ៤ដង",
        ],
        options_en: [
          "Halves (because wavelength λ is inversely proportional to frequency f)",
          "Doubles as well (proportional to frequency)",
          "Remains unchanged",
          "Quadruples",
        ],
        correct_index: 0,
        scientific_analogy_km:
          "ដូចជាការបោះជំហាន៖ កាលណាអ្នកបោះជំហានញាប់ (ប្រេកង់ខ្ពស់) ជំហាននីមួយៗនឹងកាន់តែខ្លី (ប្រវែងរលកតូច)។",
        scientific_analogy_en:
          "Like taking footsteps: if you step twice as rapidly, each individual stride must shrink by half to keep constant speed.",
        formula_badge: "λ = v / f",
        socratic_clue_km: "តាមរូបមន្ត λ = v / f៖ កាលណា v ថេរ នោះ λ និង f ច្រាសសមាមាត្រគ្នា។",
        socratic_clue_en:
          "From λ = v / f: under constant speed, wavelength and frequency are inversely related.",
        explanation_km:
          "កាលណាប្រេកង់ f កើនឡើង ២ដង ប្រវែងរលក λ ត្រូវតែថយចុះ ២ដង ដើម្បីរក្សាល្បឿន v = λ × f ឱ្យនៅថេរ។",
        explanation_en:
          "Doubling frequency halves the wavelength to preserve constant wave speed in that medium.",
      },
      {
        id: "wave-lab-3",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៣ • ខ្សែសង្វាក់ទាញរកខួបរលក (T)",
        stage_name_en: "Stage 3 • Wave Period Derivation Chain",
        prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការទាញរកខួបរលក T ចេញពីរូបមន្តល្បឿនរលក ឱ្យបានត្រឹមត្រូវ៖",
        prompt_en: "Arrange the 4 steps of algebraic derivation to isolate wave period T:",
        steps_km: [
          "សរសេរសមីការចម្ងាយសាយភាយក្នុងមួយខួប (λ = v × T)",
          "ចែកអង្គទាំងពីរនៃសមីការនឹងល្បឿន v (λ / v = T)",
          "បញ្ច្រាសសមីការដើម្បីទាញរកខួប (T = λ / v)",
          "ផ្ទៀងផ្ទាត់ខ្នាតអន្តរជាតិ (s = m / (m/s))",
        ],
        steps_en: [
          "Write the fundamental wave definition equation (λ = v × T)",
          "Divide both sides of the equation by speed v (λ / v = T)",
          "Isolate the wave period variable (T = λ / v)",
          "Verify SI dimensions (seconds = meters / (meters/second))",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "T = λ / v",
        socratic_clue_km: "ចាប់ផ្តើមពី λ = v × T -> ចែកនឹង v -> ទាញបាន T = λ / v។",
        socratic_clue_en: "Start from λ = v × T -> divide by v -> isolate T = λ / v.",
        explanation_km:
          "ខួបរលក T គឺជារយៈពេលដែលរលកចំណាយដើម្បីធ្វើដំណើរបានចម្ងាយមួយប្រវែងរលក៖ T = λ / v = 1 / f។",
        explanation_en:
          "The period T is the time required to travel one full wavelength: T = λ / v = 1 / f.",
      },
      {
        id: "wave-lab-4",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាក្នុងបន្ទប់ពិសោធន៍រលក",
        stage_name_en: "Stage 4 • Wave Lab Bench Calculation",
        prompt_km:
          "នៅក្នុងបន្ទប់ពិសោធន៍ រលកសំឡេងមួយសាយភាយក្នុងខ្យល់ដោយល្បឿន v = 340 m/s និងមានប្រេកង់ f = 170 Hz។ គណនាប្រវែងរលក λ៖",
        prompt_en:
          "In the acoustics lab, a sound wave travels through air at v = 340 m/s with frequency f = 170 Hz. Calculate wavelength λ:",
        given_values_km: [
          { label: "ល្បឿនរលក (v)", value: "340 m/s" },
          { label: "ប្រេកង់រលក (f)", value: "170 Hz" },
        ],
        given_values_en: [
          { label: "Wave Velocity (v)", value: "340 m/s" },
          { label: "Frequency (f)", value: "170 Hz" },
        ],
        options_km: [
          "λ = 2 m (តាមរូបមន្ត λ = v / f = 340 / 170)",
          "λ = 0.5 m (តាមរូបមន្ត λ = f / v = 170 / 340)",
          "λ = 57,800 m (តាមរូបមន្ត λ = v × f = 340 × 170)",
          "λ = 170 m (តាមរូបមន្ត λ = v - f = 340 - 170)",
        ],
        options_en: [
          "λ = 2.0 m (via λ = v / f = 340 / 170)",
          "λ = 0.5 m (via λ = f / v = 170 / 340)",
          "λ = 57,800 m (via λ = v × f = 340 × 170)",
          "λ = 170 m (via λ = v - f = 340 - 170)",
        ],
        correct_index: 0,
        formula_badge: "λ = 2 m",
        socratic_clue_km: "យកល្បឿន 340 ចែកនឹងប្រេកង់ 170។",
        socratic_clue_en: "Divide speed 340 by frequency 170.",
        explanation_km: "λ = v / f = 340 m/s / 170 Hz = 2 m (ម៉ែត្រ)។",
        explanation_en: "λ = v / f = 340 / 170 = 2.0 meters.",
      },
    ];
  }

  // 5A. Grade 7 Physics: Measurements & Density (ការវាស់វែង និងដង់ស៊ីតេ D = m / V)
  if (id.includes("g7-phys-01") || id.includes("density")) {
    return [
      {
        id: "g7-phys-01-q1",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី១ • ខ្នាតអន្តរជាតិ SI នៃម៉ាស",
        stage_name_en: "Stage 1 • SI Base Unit of Mass",
        prompt_km: "ក្នុងប្រព័ន្ធខ្នាតអន្តរជាតិ (SI) តើខ្នាតគោលនៃម៉ាសជាអ្វី?",
        prompt_en: "In the International System of Units (SI), what is the base unit of mass?",
        options_km: ["គីឡូក្រាម (kg)", "ក្រាម (g)", "តោន (t)", "មីលីក្រាម (mg)"],
        options_en: ["Kilogram (kg)", "Gram (g)", "Tonne (t)", "Milligram (mg)"],
        correct_index: 0,
        socratic_clue_km: "ខ្នាតគោល SI នៃម៉ាសគឺគីឡូក្រាម (kg) មិនមែនក្រាមទេ។",
        socratic_clue_en: "SI base unit for mass is the kilogram (kg).",
        explanation_km:
          "ក្នុងប្រព័ន្ធខ្នាតអន្តរជាតិ SI ខ្នាតគោលនៃម៉ាសគឺ គីឡូក្រាម (kg) នៃប្រវែងគឺម៉ែត្រ (m) និងនៃពេលវេលាគឺវិនាទី (s)។",
        explanation_en: "The standard SI base unit of mass is the kilogram (kg).",
      },
      {
        id: "g7-phys-01-q2",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី២ • គណនាម៉ាសមាឌ (ដង់ស៊ីតេ D = m / V)",
        stage_name_en: "Stage 2 • Density Calculation (D = m / V)",
        prompt_km: "ដុំដែកមួយមានម៉ាស m = 150 g និងមាឌ V = 30 cm³។ គណនាម៉ាសមាឌ D នៃដុំដែកនេះ៖",
        prompt_en:
          "An iron block has mass m = 150 g and volume V = 30 cm³. Calculate its density D:",
        given_values_km: [
          { label: "ម៉ាស (m)", value: "150 g" },
          { label: "មាឌ (V)", value: "30 cm³" },
        ],
        given_values_en: [
          { label: "Mass (m)", value: "150 g" },
          { label: "Volume (V)", value: "30 cm³" },
        ],
        options_km: ["5 g/cm³", "4500 g/cm³", "120 g/cm³", "0.2 g/cm³"],
        options_en: ["5 g/cm³", "4500 g/cm³", "120 g/cm³", "0.2 g/cm³"],
        correct_index: 0,
        socratic_clue_km: "រូបមន្តម៉ាសមាឌ៖ D = m / V = 150 / 30 = 5 g/cm³។",
        socratic_clue_en: "Density D = m / V = 150 / 30 = 5 g/cm³.",
        explanation_km: "D = m / V = 150 g / 30 cm³ = 5 g/cm³។",
        explanation_en: "D = 150 / 30 = 5 g/cm³.",
      },
    ];
  }

  // 5B. Ohm's Law & Circuits (Grade 9 Physics)
  if (id.includes("g9-phys-01") || id.includes("ohm")) {
    return [
      {
        id: "ohm-lab-1",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់អូម",
        stage_name_en: "Stage 1 • Ohm's Circuit Synthesizer",
        prompt_km: "ចូរផ្គុំរូបមន្តសមីការច្បាប់អូម (Ohm's Law)៖",
        prompt_en: "Assemble the formula for Ohm's Law (U = R · I):",
        spoken_theorem_km: "តង់ស្យុង ស្មើនឹង រេស៊ីស្តង់ គុណនឹង អាំងតង់ស៊ីតេចរន្ត",
        spoken_theorem_en: "Voltage equals Resistance multiplied by Electric Current",
        variables_pool: [
          { id: "o1", symbol: "U", name_km: "តង់ស្យុង", name_en: "Voltage", unit: "V" },
          {
            id: "o2",
            symbol: "=",
            name_km: "ស្មើនឹង",
            name_en: "Equals",
            unit: "Equivalence",
            category: "operator",
          },
          { id: "o3", symbol: "R", name_km: "រេស៊ីស្តង់", name_en: "Resistance", unit: "Ω" },
          {
            id: "o4",
            symbol: "×",
            name_km: "គុណនឹង",
            name_en: "Multiplied by",
            unit: "Product",
            category: "operator",
          },
          { id: "o5", symbol: "I", name_km: "ចរន្ត", name_en: "Current", unit: "A" },
          { id: "o6", symbol: "P", name_km: "អនុភាព", name_en: "Power", unit: "W" },
          { id: "o7", symbol: "t", name_km: "ពេល", name_en: "Time", unit: "s" },
        ],
        target_sequence_ids: ["o1", "o2", "o3", "o4", "o5"],
        formula_badge: "U = R · I",
        socratic_clue_km:
          "តង់ស្យុង U (Volt) ស្មើនឹងផលគុណរវាងរេស៊ីស្តង់ R (Ohm) និងចរន្ត I (Ampere)។",
        socratic_clue_en: "Voltage U is the product of electrical resistance R and current I.",
        explanation_km:
          "ច្បាប់អូមចែងថា តង់ស្យុងសងខាងរេស៊ីស្ត័រមួយ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តឆ្លងកាត់វា៖ U = R × I។",
        explanation_en:
          "Ohm's law proves the direct linearity between potential difference U and electric current I.",
      },
      {
        id: "ohm-lab-2",
        type: "lab_calculation",
        stage_name_km: "ដំណាក់កាលទី២ • ការពិសោធន៍តេស្តអំពូលភ្លើង",
        stage_name_en: "Stage 2 • Circuit Bench Test",
        prompt_km:
          "នៅក្នុងបន្ទប់ពិសោធន៍ អំពូលភ្លើងមួយមានរេស៊ីស្តង់ R = 10 Ω ភ្ជាប់ទៅនឹងថ្មពិល U = 20 V។ គណនាចរន្ត I៖",
        prompt_en:
          "On the test bench, a filament bulb with R = 10 Ω is connected across U = 20 V. Calculate current I:",
        given_values_km: [
          { label: "តង់ស្យុង (U)", value: "20 V" },
          { label: "រេស៊ីស្តង់ (R)", value: "10 Ω" },
        ],
        given_values_en: [
          { label: "Voltage (U)", value: "20 V" },
          { label: "Resistance (R)", value: "10 Ω" },
        ],
        options_km: [
          "I = 2 A (តាមរូបមន្ត I = U / R = 20 / 10)",
          "I = 200 A (តាមរូបមន្ត I = U × R = 20 × 10)",
          "I = 0.5 A (តាមរូបមន្ត I = R / U = 10 / 20)",
          "I = 10 A (តាមរូបមន្ត I = U - R = 20 - 10)",
        ],
        options_en: [
          "I = 2.0 A (via I = U / R = 20 / 10)",
          "I = 200 A (via I = U × R = 20 × 10)",
          "I = 0.5 A (via I = R / U = 10 / 20)",
          "I = 10 A (via I = U - R = 20 - 10)",
        ],
        correct_index: 0,
        formula_badge: "I = 2 A",
        socratic_clue_km: "បំបែកចរន្ត I ដោយយកតង់ស្យុង U ចែកនឹងរេស៊ីស្តង់ R។",
        socratic_clue_en: "Isolate current I by dividing voltage U by resistance R.",
        explanation_km: "I = U / R = 20 V / 10 Ω = 2 A (អំពែ)។",
        explanation_en: "Current equals 20 Volts divided by 10 Ohms = 2.0 Amperes.",
      },
    ];
  }

  // ============================================================================
  // 6. KHMER LITERATURE & POETRY LABS (ភាសាខ្មែរ និងអក្សរសាស្ត្រ)
  // ============================================================================
  if (subjectSlug === "khmer" || id.includes("khmer")) {
    return [
      {
        id: "khmer-lab-1",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី១ • រចនាសម្ព័ន្ធកាព្យខ្មែរ (បទកាកគតិ)",
        stage_name_en: "Stage 1 • Khmer Poetic Structure (Kak-Kati Meter)",
        prompt_km: "តើបទកាកគតិក្នុងមួយល្បះមានចំនួនប៉ុន្មានឃ្លា និងប៉ុន្មានព្យាង្គសរុប?",
        prompt_en:
          "How many phrases and total syllables comprise one stanza of the Kak-Kati poetic meter?",
        options_km: [
          "៧ ឃ្លា (ឃ្លានីមួយៗមាន ៤ ព្យាង្គ សរុប ២៨ ព្យាង្គ)",
          "៤ ឃ្លា (ឃ្លានីមួយៗមាន ៧ ព្យាង្គ សរុប ២៨ ព្យាង្គ)",
          "៨ ឃ្លា (ឃ្លានីមួយៗមាន ៥ ព្យាង្គ សរុប ៤០ ព្យាង្គ)",
          "៦ ឃ្លា (ឃ្លានីមួយៗមាន ៦ ព្យាង្គ សរុប ៣៦ ព្យាង្គ)",
        ],
        options_en: [
          "7 phrases (4 syllables each, 28 syllables total)",
          "4 phrases (7 syllables each, 28 syllables total)",
          "8 phrases (5 syllables each, 40 syllables total)",
          "6 phrases (6 syllables each, 36 syllables total)",
        ],
        correct_index: 0,
        socratic_clue_km: "បទកាកគតិមាន ៧ ឃ្លា ក្នុងមួយឃ្លាមាន ៤ ព្យាង្គ៖ ៧ × ៤ = ២៨ ព្យាង្គ។",
        socratic_clue_en: "Kak-Kati features 7 phrases of 4 syllables each: 7 × 4 = 28 syllables.",
        explanation_km:
          "បទកាកគតិ គឺជាបទកាព្យបុរាណខ្មែរដែលមាន ៧ ឃ្លាក្នុងមួយល្បះ ហើយឃ្លានីមួយៗមាន ៤ ព្យាង្គ។",
        explanation_en:
          "Kak-Kati is a classical Khmer meter with 7 lines of 4 syllables each per stanza.",
      },
      {
        id: "khmer-lab-2",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី២ • ចំណាប់ចុងចួនផ្ទៃក្នុងល្បះ",
        stage_name_en: "Stage 2 • Internal Rhyme Rules",
        prompt_km: "ក្នុងបទកាកគតិ តើព្យាង្គទី៤ នៃឃ្លាទី១ ត្រូវចាប់ចួននឹងព្យាង្គណា?",
        prompt_en: "In Kak-Kati meter, which syllable does the 4th syllable of line 1 rhyme with?",
        options_km: [
          "ព្យាង្គទី៤ នៃឃ្លាទី២",
          "ព្យាង្គទី២ នៃឃ្លាទី២",
          "ព្យាង្គទី១ នៃឃ្លាទី៣",
          "ព្យាង្គទី៤ នៃឃ្លាទី៧",
        ],
        options_en: [
          "4th syllable of line 2",
          "2nd syllable of line 2",
          "1st syllable of line 3",
          "4th syllable of line 7",
        ],
        correct_index: 0,
        socratic_clue_km: "វិធានចួនបទកាកគតិ៖ ឃ្លា១ ចួនឃ្លា២ ត្រង់ព្យាង្គចុងក្រោយ (ទី៤)។",
        socratic_clue_en: "Line 1 syllable 4 rhymes directly with line 2 syllable 4.",
        explanation_km: "ព្យាង្គទី៤ នៃឃ្លាទី១ ចួននឹងព្យាង្គទី៤ នៃឃ្លាទី២ តាមក្បួនកាព្យឃ្លោងខ្មែរ។",
        explanation_en:
          "Line 1 and line 2 end in identical vowel sounds in standard Khmer poetics.",
      },
      {
        id: "khmer-lab-3",
        type: "synthesizer",
        stage_name_km: "ដំណាក់កាលទី៣ • សំយោគឃ្លាកាព្យបទកាកគតិ",
        stage_name_en: "Stage 3 • Poetic Verse Synthesizer",
        prompt_km: "ចូរផ្គុំឃ្លាកាព្យអប់រំតាមលំដាប់បទកាកគតិលើរនាំង៖",
        prompt_en: "Assemble the educational Kak-Kati poem in correct rhythmic sequence:",
        spoken_theorem_km: "កើតមកជាកូន ត្រូវស្គាល់គុណគ្រូ ខំរៀនសូត្រធម៌",
        spoken_theorem_en: "Born as a child, know teachers virtues, study diligently",
        variables_pool: [
          { id: "k1", symbol: "កើតមកជាកូន", name_km: "ឃ្លាទី១", name_en: "Line 1", unit: "Phrase" },
          {
            id: "k2",
            symbol: "ត្រូវស្គាល់",
            name_km: "ពាក់កណ្តាល",
            name_en: "Half-line",
            unit: "Fragment",
          },
          { id: "k3", symbol: "គុណគ្រូ", name_km: "ចុងឃ្លា២", name_en: "Rhyme 2", unit: "Rhyme" },
          {
            id: "k4",
            symbol: "ខំរៀនសូត្រធម៌",
            name_km: "ឃ្លាទី៣",
            name_en: "Line 3",
            unit: "Phrase",
          },
          {
            id: "k5",
            symbol: "ឥតប្រយោជន៍",
            name_km: "ពាក្យខុស",
            name_en: "Distractor",
            unit: "Distractor",
          },
        ],
        target_sequence_ids: ["k1", "k2", "k3", "k4"],
        formula_badge: "បទកាកគតិ",
        socratic_clue_km:
          "ផ្គុំតាមលំដាប់៖ កើតមកជាកូន (ឃ្លា១) -> ត្រូវស្គាល់ (កូន/ស្គាល់) -> គុណគ្រូ -> ខំរៀនសូត្រធម៌ (គ្រូ/សូត្រ)។",
        socratic_clue_en: "Sequence lines to align internal assonance and rhythm.",
        explanation_km:
          "កំណាព្យខ្មែរតម្រូវឱ្យមានចំណាប់ចួនរវាងព្យាង្គចុង និងព្យាង្គក្នុងយ៉ាងត្រឹមត្រូវ។",
        explanation_en:
          "Traditional meters require strict adherence to rhyme matrices and semantic balance.",
      },
      {
        id: "khmer-lab-4",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី៤ • ជំហានតែងសេចក្តីបែបពន្យល់ (វិញ្ញាសាឌីប្លូម & បាក់ឌុប)",
        stage_name_en: "Stage 4 • MoEYS Expository Essay Writing Protocol",
        prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការសរសេរតែងសេចក្តីបែបពន្យល់ឱ្យបានត្រឹមត្រូវតាមស្ដង់ដារជាតិ៖",
        prompt_en: "Arrange the 4 steps of formal Khmer expository essay structure:",
        steps_km: [
          "សេចក្តីផ្តើម៖ លំនាំបញ្ហា ចំណូលបញ្ហា និងចំណោទបញ្ហា",
          "តួសេចក្តី (ពន្យល់ពាក្យគន្លឹះ និងន័យរួមនៃប្រធាន)",
          "បកស្រាយអំណះអំណាង និងលើកឧទាហរណ៍ក្នុងសង្គម/អក្សរសិល្ប៍មកបញ្ជាក់",
          "សេចក្តីបញ្ចប់៖ វាយតម្លៃប្រធាន និងមតិផ្ទាល់ខ្លួន",
        ],
        steps_en: [
          "Introduction: Context, thesis statement, and focal question",
          "Body: Define keywords and overall semantic meaning of the prompt",
          "Body Arguments: Provide concrete literary/social evidence and citations",
          "Conclusion: Synthesize evaluation, societal moral, and personal perspective",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "ស្តង់ដារតែងសេចក្តី MoEYS",
        socratic_clue_km:
          "លំដាប់តែងសេចក្តី៖ សេចក្តីផ្តើម -> ពន្យល់ន័យប្រធាន -> អំណះអំណាង -> សេចក្តីបញ្ចប់។",
        socratic_clue_en: "Introduction -> Definitions -> Evidence/Analysis -> Conclusion.",
        explanation_km:
          "រចនាសម្ព័ន្ធ ៤ ជំហាននេះជាមូលដ្ឋានគ្រឹះក្នុងការទទួលបានពិន្ទុអតិបរមាក្នុងវិញ្ញាសាភាសាខ្មែរឌីប្លូម និងបាក់ឌុប។",
        explanation_en:
          "This standard 4-step framework guarantees highest marks on national examinations.",
      },
    ];
  }

  // ============================================================================
  // 7. CAMBODIAN & WORLD HISTORY LABS (ប្រវត្តិវិទ្យា)
  // ============================================================================
  if (subjectSlug === "history" || id.includes("hist")) {
    return [
      {
        id: "hist-lab-1",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី១ • បុរេប្រវត្តិសាស្ត្រកម្ពុជា",
        stage_name_en: "Stage 1 • Prehistoric Cambodia",
        prompt_km:
          "តើស្ថានីយបុរាណវិទ្យាណាដែលផ្តល់ភស្តុតាងចាស់ជាងគេបំផុតនៃការរស់នៅរបស់មនុស្សនៅកម្ពុជា (ប្រមាណ ៧០០០ ឆ្នាំមុនគ.ស.)?",
        prompt_en:
          "Which archaeological site provides the earliest evidence of human habitation in Cambodia (~7000 BCE)?",
        options_km: [
          "ស្ថានីយល្អាងស្ពាន (ខេត្តបាត់ដំបង)",
          "ស្ថានីយសំរោងសែន (ខេត្តកំពង់ឆ្នាំង)",
          "ស្ថានីយភូមិស្នាយ (ខេត្តបន្ទាយមានជ័យ)",
          "ស្ថានីយប្រាសាទអង្គរវត្ត",
        ],
        options_en: [
          "Laang Spean Cave (Battambang Province)",
          "Samrong Sen (Kampong Chhnang Province)",
          "Phum Snay (Banteay Meanchey Province)",
          "Angkor Wat",
        ],
        correct_index: 0,
        socratic_clue_km: "ល្អាងភ្នំនៅខេត្តបាត់ដំបង ដែលជាវប្បធម៌ហ័រពិញៀន គឺជាស្ថានីយល្អាងស្ពាន។",
        socratic_clue_en: "Laang Spean cave in Battambang is the premier Hoabinhian culture site.",
        explanation_km:
          "ស្ថានីយល្អាងស្ពានត្រូវបានរកឃើញនៅខេត្តបាត់ដំបង ដោយមានស្លាកស្នាមឧបករណ៍ថ្មបំបែកតាំងពី ៧០០០ ឆ្នាំមុនគ.ស.។",
        explanation_en:
          "Laang Spean provides definitive evidence of human habitation dating to the Hoabinhian era.",
      },
      {
        id: "hist-lab-2",
        type: "derivation_chain",
        stage_name_km: "ដំណាក់កាលទី២ • ខ្សែសង្វាក់កាលប្បវត្តិប្រវត្តិសាស្ត្រកម្ពុជា",
        stage_name_en: "Stage 2 • Chronological Chain of Cambodian Eras",
        prompt_km:
          "ចូររៀបចំសម័យកាលប្រវត្តិសាស្ត្រកម្ពុជាទាំង ៤ តាមលំដាប់កាលប្បវត្តិពីបុរាណមកបច្ចុប្បន្ន៖",
        prompt_en: "Arrange the 4 Cambodian historical eras in correct chronological sequence:",
        steps_km: [
          "សម័យបុរេអង្គរ (នគរភ្នំ ហ្វូណន និងចេនឡា)",
          "សម័យអង្គរ (សតវត្សទី ៩ ដល់ទី ១៥)",
          "សម័យកណ្តាល (ចតុមុខ លង្វែក ឧដុង្គ)",
          "សម័យទំនើប និងព្រះរាជាណាចក្រកម្ពុជាទី២ (១៩៩៣-បច្ចុប្បន្ន)",
        ],
        steps_en: [
          "Pre-Angkorian Period (Funan & Chenla kingdoms)",
          "Angkorian Empire (9th to 15th centuries)",
          "Middle Period (Chaktomuk, Longvek, Oudong capitals)",
          "Modern Era & Second Kingdom of Cambodia (1993–present)",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "កាលប្បវត្តិប្រវត្តិសាស្ត្រ",
        socratic_clue_km: "បុរេអង្គរ -> អង្គរ -> សម័យកណ្តាល -> សម័យទំនើប។",
        socratic_clue_en: "Pre-Angkor -> Angkor -> Middle Period -> Modern Kingdom.",
        explanation_km:
          "ការយល់ដឹងពីលំដាប់កាលប្បវត្តិនេះជាស្នូលសំខាន់នៃការប្រឡងប្រវត្តិវិទ្យាថ្នាក់ជាតិ។",
        explanation_en:
          "Mastering chronological continuity is essential for MoEYS historical competencies.",
      },
      {
        id: "hist-lab-3",
        type: "concept_choice",
        stage_name_km: "ដំណាក់កាលទី៣ • កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១",
        stage_name_en: "Stage 3 • Paris Peace Agreements (1991)",
        prompt_km:
          "តើកិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១ នាំមកនូវសមិទ្ធផលអ្វីធំជាងគេបំផុតសម្រាប់កម្ពុជា?",
        prompt_en:
          "What was the most significant achievement of the October 23, 1991 Paris Peace Agreements for Cambodia?",
        options_km: [
          "ការបញ្ចប់សង្គ្រាមស៊ីវិល ការបង្រួបបង្រួមជាតិ និងការរៀបចំការបោះឆ្នោតប្រជាធិបតេយ្យឆ្នាំ ១៩៩៣",
          "ការកសាងប្រាសាទអង្គរវត្ត",
          "ការបង្កើតសមាគមអាស៊ាន",
          "ការធ្វើសង្គ្រាមលោកលើកទី២",
        ],
        options_en: [
          "Ending civil war, national reconciliation, and establishing the 1993 democratic elections",
          "Construction of Angkor Wat",
          "Creation of the ASEAN alliance",
          "Outbreak of World War II",
        ],
        correct_index: 0,
        socratic_clue_km:
          "កិច្ចព្រមព្រៀងប៉ារីសបានបញ្ចប់ជម្លោះប្រដាប់អាវុធ និងបើកផ្លូវឱ្យមានការបោះឆ្នោត UNTAC ឆ្នាំ ១៩៩៣។",
        socratic_clue_en:
          "The Paris Accords ended decades of war, paving the way for UNTAC elections and the 1993 constitution.",
        explanation_km:
          "កិច្ចព្រមព្រៀង ២៣ តុលា ១៩៩១ គឺជាមូលដ្ឋានគ្រឹះនៃសន្តិភាព ឯកភាពជាតិ និងការស្ថាបនារដ្ឋធម្មនុញ្ញឆ្នាំ ១៩៩៣។",
        explanation_en:
          "The 1991 Paris Agreements established the framework for modern peace and constitutional democracy.",
      },
    ];
  }

  // 5C. Dynamic curriculum-aligned 10-Question Master Lab for any lesson in the 150-lesson MoEYS bank
  if (lesson) {
    return [
      {
        id: `${lesson.id}-q1`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី១ • គោលគំនិតគ្រឹះនៃ${lesson.title_km}`,
        stage_name_en: `Stage 1 • Core Concept: ${lesson.title_en}`,
        prompt_km: `តើខ្លឹមសារសំខាន់នៃមេរៀន «${lesson.title_km}» ផ្តោតលើអ្វី?`,
        prompt_en: `What is the primary scientific focus of "${lesson.title_en}"?`,
        options_km: [
          lesson.summary_km || `ការយល់ដឹងស៊ីជម្រៅអំពី${lesson.title_km}`,
          "ទ្រឹស្តីទូទៅដែលគ្មានទំនាក់ទំនងជាក់ស្តែងក្នុងធម្មជាតិ",
          "ការសិក្សាផ្តោតលើប្រធានបទក្រៅកម្មវិធីសិក្សាជាតិ",
          "គ្មានចម្លើយណាមួយត្រឹមត្រូវឡើយ",
        ],
        options_en: [
          lesson.summary_en || `Core principles of ${lesson.title_en}`,
          "Theoretical concepts with no practical applications",
          "External topics outside the national syllabus",
          "None of the above",
        ],
        correct_index: 0,
        socratic_clue_km: `សូមពិនិត្យសេចក្តីសង្ខេបមេរៀន ៖ ${lesson.summary_km}`,
        socratic_clue_en: `Review the lesson focus: ${lesson.summary_en}`,
        explanation_km: `មេរៀននេះបង្រៀនអំពី៖ ${lesson.summary_km}`,
        explanation_en: `This lesson covers: ${lesson.summary_en}`,
      },
      {
        id: `${lesson.id}-q2`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី២ • ការវិភាគទ្រឹស្តីស្តង់ដារ MoEYS`,
        stage_name_en: `Stage 2 • MoEYS Theoretical Standards`,
        prompt_km: `ក្នុងកម្រិតថ្នាក់ទី ${lesson.grade} នៃមុខវិជ្ជា ${lesson.subject.name_km} តើគោលបំណងចម្បងនៃការរៀន «${lesson.title_km}» គឺដើម្បីអ្វី?`,
        prompt_en: `In Grade ${lesson.grade} ${lesson.subject.name_en}, what is the main objective of mastering "${lesson.title_en}"?`,
        options_km: [
          `ដើម្បីក្តាប់បានច្បាស់លាស់នូវមូលដ្ឋានគ្រឹះស្ដង់ដារ MoEYS សម្រាប់ប្រឡង និងអនុវត្តជាក់ស្តែង`,
          "ដើម្បីទន្ទេញចាំរូបមន្តដោយមិនចាំបាច់យល់ន័យ",
          "ដើម្បីរៀនទ្រឹស្តីកម្រិតខ្ពស់ហួសពីកម្រិតថ្នាក់",
          "គ្មានសារៈសំខាន់ក្នុងការសិក្សាឡើយ",
        ],
        options_en: [
          `To master MoEYS national curriculum competencies for examinations and practical application`,
          "To memorize formulas mechanically without conceptual understanding",
          "To study advanced concepts beyond the grade level",
          "No significant relevance to curriculum standards",
        ],
        correct_index: 0,
        socratic_clue_km:
          "ស្តង់ដារកម្មវិធីសិក្សាជាតិ MoEYS តម្រូវឱ្យសិស្សយល់ដឹងច្បាស់លាស់ពីគោលការណ៍គ្រឹះ។",
        socratic_clue_en:
          "MoEYS national standards require conceptual mastery and problem-solving readiness.",
        explanation_km: `ការយល់ដឹងអំពី ${lesson.title_km} ជួយឱ្យសិស្សមានមូលដ្ឋានរឹងមាំក្នុងការប្រឡង និងបន្តថ្នាក់ខ្ពស់។`,
        explanation_en: `Understanding ${lesson.title_en} provides solid foundations for national exams.`,
      },
      {
        id: `${lesson.id}-q3`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី៣ • ការអនុវត្តជាក់ស្តែងក្នុងវិទ្យាសាស្ត្រ STEM`,
        stage_name_en: `Stage 3 • Real-World STEM Application`,
        prompt_km: `តើការអនុវត្តជាក់ស្តែងនៃមេរៀន «${lesson.title_km}» ផ្តល់សារប្រយោជន៍អ្វីក្នុងវិទ្យាសាស្ត្រ?`,
        prompt_en: `What is the real-world significance of mastering "${lesson.title_en}" in STEM?`,
        options_km: [
          `ជួយពន្យល់បាតុភូតធម្មជាតិ និងដោះស្រាយលំហាត់ជាក់ស្តែងតាមស្តង់ដារជាតិ`,
          "មិនមានប្រយោជន៍ក្នុងការអនុវត្តជីវភាពរស់នៅឡើយ",
          "គ្រាន់តែជាការគណនាលើក្រដាសដោយគ្មានន័យវិទ្យាសាស្ត្រ",
          "មិនអាចយកទៅប្រើប្រាស់ក្នុងការស្រាវជ្រាវបានទេ",
        ],
        options_en: [
          `Enables explanation of natural phenomena and rigorous problem solving according to national standards`,
          "No practical relevance to real-world science",
          "Merely abstract paper calculations without empirical backing",
          "Cannot be applied to scientific inquiry",
        ],
        correct_index: 0,
        socratic_clue_km:
          "វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យាផ្សារភ្ជាប់ទ្រឹស្តីទៅនឹងការអនុវត្តជាក់ស្តែងជានិច្ច។",
        socratic_clue_en:
          "STEM education always bridges theoretical principles with real-world applications.",
        explanation_km: `មេរៀន «${lesson.title_km}» បង្ហាញពីការផ្សារភ្ជាប់ទ្រឹស្តីវិទ្យាសាស្ត្រទៅនឹងការដោះស្រាយបញ្ហាជាក់ស្តែង។`,
        explanation_en: `Mastering "${lesson.title_en}" bridges theory with real-world problem solving.`,
      },
      {
        id: `${lesson.id}-q4`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី៤ • វិធាន និងគោលការណ៍គ្រឹះ`,
        stage_name_en: `Stage 4 • Fundamental Principles`,
        prompt_km: `តើវិធីសាស្ត្រសិក្សាដ៏មានប្រសិទ្ធភាពបំផុតសម្រាប់ «${lesson.title_km}» គឺជាអ្វី?`,
        prompt_en: `What is the most effective approach for studying "${lesson.title_en}"?`,
        options_km: [
          "យល់ច្បាស់ពីនិយមន័យ វិភាគរូបមន្ត និងអនុវត្តលំហាត់ជាប្រព័ន្ធ",
          "ទន្ទេញចាំចម្លើយដោយមិនដឹងពីវិធីគណនា",
          "រំលងទ្រឹស្តីហើយចាំតែមើលចម្លើយកែ",
          "រង់ចាំមើលតែពេលប្រឡង",
        ],
        options_en: [
          "Understand definitions, analyze core formulas, and practice systematic problem solving",
          "Rote memorize answers without calculation steps",
          "Skip theory and look only at answer keys",
          "Wait until exam day without regular practice",
        ],
        correct_index: 0,
        socratic_clue_km: "ការយល់ដឹងពីដើមចម និងរូបមន្តធ្វើឱ្យការចងចាំមាននិរន្តរភាព។",
        socratic_clue_en: "Deep understanding of derivations yields permanent intuition.",
        explanation_km: "ការអនុវត្តលំហាត់ជាប្រចាំជួយពង្រឹងការយល់ដឹង និងបង្កើនល្បឿនក្នុងការប្រឡង។",
        explanation_en: "Regular guided practice reinforces conceptual foundations and exam speed.",
      },
      {
        id: `${lesson.id}-q5`,
        type: "lab_calculation",
        stage_name_km: `ដំណាក់កាលទី៥ • ការវិភាគទិន្នន័យ និងកម្រិតថ្នាក់`,
        stage_name_en: `Stage 5 • Academic Bench Evaluation`,
        prompt_km: `សម្រាប់មេរៀន «${lesson.title_km}» តើកម្រិតថ្នាក់ទី ${lesson.grade} ត្រូវចំណាយពេលប៉ុន្មាននាទីដើម្បីសិក្សាស្វែងយល់ពេញលេញ?`,
        prompt_en: `For "${lesson.title_en}", what is the standard recommended study duration in Grade ${lesson.grade}?`,
        given_values_km: [
          { label: "កម្រិតថ្នាក់", value: `ថ្នាក់ទី ${lesson.grade}` },
          { label: "ថាមពល XP ទទួលបាន", value: `+${lesson.xp_reward} XP` },
        ],
        given_values_en: [
          { label: "Target Grade", value: `Grade ${lesson.grade}` },
          { label: "Reward", value: `+${lesson.xp_reward} XP` },
        ],
        options_km: [
          `${lesson.estimated_minutes} នាទី (តាមការណែនាំស្តង់ដារកម្មវិធីសិក្សាជាតិ)`,
          "២ នាទី (រហ័សពេក មិនអាចក្តាប់បាន)",
          "១២០ នាទី (យូរហួសកំណត់)",
          "គ្មានពេលកំណត់ច្បាស់លាស់",
        ],
        options_en: [
          `${lesson.estimated_minutes} minutes (standard MoEYS curricular module)`,
          "2 minutes (too brief to retain)",
          "120 minutes (over extended)",
          "Undefined duration",
        ],
        correct_index: 0,
        socratic_clue_km: `មេរៀននេះត្រូវបានរៀបចំឡើងសម្រាប់រយៈពេល ${lesson.estimated_minutes} នាទី។`,
        socratic_clue_en: `Standard benchmark duration is ${lesson.estimated_minutes} minutes.`,
        explanation_km: `ការរៀនតាមពេលវេលាកំណត់ ${lesson.estimated_minutes} នាទីជួយបង្កើនប្រសិទ្ធភាពនៃការចងចាំខ្ពស់បំផុត។`,
        explanation_en: `Studying in structured ${lesson.estimated_minutes}-minute modules optimizes cognitive retention.`,
      },
      {
        id: `${lesson.id}-q6`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី៦ • ការការពារការយល់ច្រឡំទូទៅ`,
        stage_name_en: `Stage 6 • Common Misconceptions`,
        prompt_km: `នៅពេលដោះស្រាយលំហាត់ទាក់ទងនឹង «${lesson.title_km}» តើកំហុសអ្វីដែលសិស្សតែងតែជួបប្រទះញឹកញាប់បំផុត?`,
        prompt_en: `When solving problems in "${lesson.title_en}", what is the most common student pitfall?`,
        options_km: [
          "ច្រឡំសញ្ញា (+/-) ឬខ្នាតរង្វាស់ និងមិនបានផ្ទៀងផ្ទាត់លក្ខខណ្ឌព្រំដែន",
          "ការអានប្រធានលំហាត់យ៉ាងយកចិត្តទុកដាក់",
          "ការសរសេរជំហានគណនាតាមលំដាប់លំដោយ",
          "ការត្រួតពិនិត្យចម្លើយចុងក្រោយ",
        ],
        options_en: [
          "Confusing algebraic signs (+/-), mixing units, or failing to check boundary conditions",
          "Carefully reading the prompt",
          "Writing clear step-by-step reasoning",
          "Verifying the final result",
        ],
        correct_index: 0,
        socratic_clue_km: "កំហុសទូទៅបំផុតក្នុងវិទ្យាសាស្ត្រគឺការធ្វេសប្រហែសលើសញ្ញា និងខ្នាត។",
        socratic_clue_en: "Sign errors and unit inconsistencies are the most frequent pitfalls.",
        explanation_km:
          "ការយកចិត្តទុកដាក់លើខ្នាតអន្តរជាតិ (SI) និងវិធានសញ្ញា ជួយកាត់បន្ថយកំហុសក្នុងការប្រឡងជាតិ។",
        explanation_en:
          "Rigorous attention to SI units and sign conventions prevents common test errors.",
      },
      {
        id: `${lesson.id}-q7`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី៧ • ទំនាក់ទំនងអន្តរវិស័យ STEM`,
        stage_name_en: `Stage 7 • Cross-Disciplinary STEM Links`,
        prompt_km: `តើមុខវិជ្ជា ${lesson.subject.name_km} តាមរយៈមេរៀន «${lesson.title_km}» ផ្សារភ្ជាប់ជាមួយមុខវិជ្ជា STEM ណាខ្លះ?`,
        prompt_en: `How does ${lesson.subject.name_en} in "${lesson.title_en}" connect across STEM disciplines?`,
        options_km: [
          "ផ្សារភ្ជាប់គណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា ជាមូលដ្ឋានរួមនៃធម្មជាតិ",
          "នៅដាច់ដោយឡែកទាំងស្រុង គ្មានទំនាក់ទំនងជាមួយមុខវិជ្ជាដទៃ",
          "ទាក់ទងតែជាមួយការប្រឡងសរសេរប៉ុណ្ណោះ",
          "គ្មានការផ្សារភ្ជាប់វិទ្យាសាស្ត្រឡើយ",
        ],
        options_en: [
          "Connects mathematics, physics, chemistry, and biology as shared foundations of nature",
          "Completely isolated from other scientific disciplines",
          "Only relevant to standardized written tests",
          "No scientific linkages",
        ],
        correct_index: 0,
        socratic_clue_km:
          "មុខវិជ្ជា STEM ទាំងអស់សុទ្ធតែមានមូលដ្ឋានតក្កវិទ្យា និងច្បាប់ធម្មជាតិផ្សារភ្ជាប់គ្នាទៅវិញទៅមក។",
        socratic_clue_en:
          "All STEM disciplines share core physical principles and quantitative logic.",
        explanation_km:
          "ការយល់ដឹងអន្តរវិស័យជួយឱ្យសិស្សមានទស្សនវិស័យទូលំទូលាយក្នុងការស្រាវជ្រាវ និងការច្នៃប្រឌិត។",
        explanation_en:
          "Interdisciplinary STEM literacy unlocks creative problem solving and engineering aptitude.",
      },
      {
        id: `${lesson.id}-q8`,
        type: "derivation_chain",
        stage_name_km: `ដំណាក់កាលទី៨ • លំដាប់ ៤ ជំហានដោះស្រាយបញ្ហាវិទ្យាសាស្ត្រ`,
        stage_name_en: `Stage 8 • 4-Step Scientific Problem Solving Protocol`,
        prompt_km: `ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយលំហាត់ប្រឡងក្នុងមេរៀន «${lesson.title_km}» ឱ្យបានត្រឹមត្រូវ៖`,
        prompt_en: `Arrange the 4 steps of rigorous scientific derivation for "${lesson.title_en}":`,
        steps_km: [
          "អានប្រធាន និងស្រង់ទិន្នន័យបម្រាប់ព្រមទាំងខ្នាត (Given Values & Units)",
          "កំណត់រូបមន្ត ឬទ្រឹស្តីបទដែលត្រូវអនុវត្ត (Identify Principle / Formula)",
          "បំប្លែងសមីការ និងជំនួសលេខដោយប្រុងប្រយ័ត្ន (Substitute & Calculate)",
          "ផ្ទៀងផ្ទាត់ចម្លើយ និងសរសេរខ្នាតចុងក្រោយឱ្យបានច្បាស់លាស់ (Verify & State SI Unit)",
        ],
        steps_en: [
          "Read prompt and record given data with standard units (SI)",
          "Select appropriate theorem, formula, or governing equation",
          "Perform algebraic transformation and numeric substitution",
          "Verify numerical plausibility and write unit clearly",
        ],
        correct_chain_order: [0, 1, 2, 3],
        formula_badge: "MoEYS Protocol",
        socratic_clue_km: "ស្រង់បម្រាប់ -> រើសរូបមន្ត -> ជំនួសលេខ -> ផ្ទៀងផ្ទាត់ខ្នាត។",
        socratic_clue_en: "Extract data -> Select formula -> Substitute -> State final unit.",
        explanation_km:
          "ការអនុវត្តតាមលំដាប់ ៤ ជំហាននេះជួយកាត់បន្ថយកំហុស និងទទួលបានពិន្ទុពេញក្នុងការប្រឡងជាតិ។",
        explanation_en:
          "Following this 4-step protocol guarantees maximum marks on MoEYS national exams.",
      },
      {
        id: `${lesson.id}-q9`,
        type: "lab_calculation",
        stage_name_km: `ដំណាក់កាលទី៩ • ការគណនាកម្រិតពិន្ទុ និងការវាយតម្លៃ`,
        stage_name_en: `Stage 9 • Scoring Metric Mastery`,
        prompt_km: `ប្រសិនបើសិស្សម្នាក់ឆ្លើយត្រូវគ្រប់សំណួរទាំងអស់ក្នុងបន្ទប់ពិសោធន៍នៃមេរៀន «${lesson.title_km}» តើសិស្សទទួលបានអត្ថប្រយោជន៍អ្វី?`,
        prompt_en: `If a student completes all lab stages in "${lesson.title_en}" with 100% accuracy, what do they achieve?`,
        given_values_km: [
          { label: "មេរៀន", value: lesson.title_km },
          { label: "ពិន្ទុភាពស្ទាត់ជំនាញ", value: "100% Mastery" },
        ],
        given_values_en: [
          { label: "Lesson", value: lesson.title_en },
          { label: "Mastery Level", value: "100% Mastery" },
        ],
        options_km: [
          `ទទួលបាន +${lesson.xp_reward} XP, បង្កើនសន្ទុះ Streak, និងដោះសោមេរៀនបន្ទាប់`,
          "មិនទទួលបានអ្វីទាំងអស់",
          "ត្រូវចាប់ផ្តើមរៀនពីថ្នាក់ទី៧ ឡើងវិញ",
          "បាត់បង់ថាមពលទាំងអស់",
        ],
        options_en: [
          `Earn +${lesson.xp_reward} XP, increase daily streak, and unlock the next milestone on the roadmap`,
          "No reward earned",
          "Forced to restart from Grade 7",
          "Loss of all energy",
        ],
        correct_index: 0,
        socratic_clue_km: "ការបញ្ចប់មេរៀនដោយជោគជ័យផ្តល់រង្វាន់ XP និងដោះសោដំណើរទៅមុខ។",
        socratic_clue_en:
          "Completing lessons unlocks XP rewards and advances the learning roadmap.",
        explanation_km:
          "ការអនុវត្តជាប្រចាំជួយរក្សា Streak និងធ្វើឱ្យការសិក្សាក្លាយជាទម្លាប់ដ៏មានតម្លៃ។",
        explanation_en:
          "Daily consistency builds habits, secures leaderboard rankings, and guarantees mastery.",
      },
      {
        id: `${lesson.id}-q10`,
        type: "concept_choice",
        stage_name_km: `ដំណាក់កាលទី១០ • ការត្រៀមខ្លួនប្រឡងថ្នាក់ជាតិ`,
        stage_name_en: `Stage 10 • National Examination Readiness`,
        prompt_km: `ដើម្បីទទួលបាននិទ្ទេសល្អ (A ឬ B) ក្នុងការប្រឡងថ្នាក់ជាតិ តើសិស្សត្រូវត្រៀមខ្លួនចំពោះមេរៀន «${lesson.title_km}» យ៉ាងណា?`,
        prompt_en: `To achieve top honours (Grade A or B) on national examinations, how should one prepare "${lesson.title_en}"?`,
        options_km: [
          "ធ្វើស្វ័យវាយតម្លៃជាប្រចាំ ហាត់ដោះស្រាយវិញ្ញាសាចាស់ៗ និងយល់ច្បាស់ពីខ្លឹមសារមេរៀន",
          "រង់ចាំជិតដល់ថ្ងៃប្រឡងទើបចាប់ផ្តើមមើលសៀវភៅ",
          "មើលតែចម្លើយសង្ខេបដោយមិនបានអនុវត្តផ្ទាល់ដៃ",
          "សង្ឃឹមលើសំណាងក្នុងការប្រឡង",
        ],
        options_en: [
          "Self-assess frequently, practice past national exam archives, and understand foundational principles",
          "Cram only a few days before the official exam",
          "Read brief answer summaries without practicing by hand",
          "Rely on luck on examination day",
        ],
        correct_index: 0,
        socratic_clue_km:
          "ការដោះស្រាយវិញ្ញាសាចាស់ៗ និងការអនុវត្តផ្ទាល់ដៃ គឺជាគន្លឹះឆ្ពោះទៅកាន់និទ្ទេស A។",
        socratic_clue_en:
          "Consistent practice with past exam papers and deep comprehension secures Grade A.",
        explanation_km:
          "ការយល់ដឹងស៊ីជម្រៅលើមេរៀន «${lesson.title_km}» រួមផ្សំជាមួយការអនុវត្តវិញ្ញាសាជាក់ស្តែង ជួយធានានូវលទ្ធផលឆ្នើមបំផុត។",
        explanation_en:
          "Deep comprehension of '${lesson.title_en}' combined with authentic exam practice guarantees top results.",
      },
    ];
  }

  // 5D. Default Physics (Newton's Second Law F = m · a)
  return [
    {
      id: "phys-lab-1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់ចលនាញូតុន",
      stage_name_en: "Stage 1 • Newton's Second Law Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តច្បាប់ញូតុនទី២ (Newton's Second Law) លើរនាំង៖",
      prompt_en: "Assemble the formula for Newton's Second Law (F = m · a):",
      spoken_theorem_km: "កម្លាំងផ្គួប ស្មើនឹង ម៉ាស គុណនឹង សំទុះ",
      spoken_theorem_en: "Net external force equals mass multiplied by acceleration vector",
      variables_pool: [
        { id: "p1", symbol: "F", name_km: "កម្លាំង", name_en: "Net Force", unit: "N" },
        {
          id: "p2",
          symbol: "=",
          name_km: "ស្មើនឹង",
          name_en: "Equals",
          unit: "Equivalence",
          category: "operator",
        },
        { id: "p3", symbol: "m", name_km: "ម៉ាស", name_en: "Mass", unit: "kg" },
        {
          id: "p4",
          symbol: "×",
          name_km: "គុណនឹង",
          name_en: "Multiplied by",
          unit: "Product",
          category: "operator",
        },
        { id: "p5", symbol: "a", name_km: "សំទុះ", name_en: "Acceleration", unit: "m/s²" },
        { id: "p6", symbol: "v", name_km: "ល្បឿន", name_en: "Velocity", unit: "m/s" },
        { id: "p7", symbol: "g", name_km: "ទំនាញ", name_en: "Gravity", unit: "9.8 m/s²" },
        { id: "p8", symbol: "t", name_km: "ពេល", name_en: "Time", unit: "s" },
      ],
      target_sequence_ids: ["p1", "p2", "p3", "p4", "p5"],
      formula_badge: "F = m · a",
      socratic_clue_km:
        "កម្លាំងផ្គួប F (ញូតុន) ស្មើនឹងម៉ាស m គុណនឹងសំទុះ a។ ផ្គុំតាមលំដាប់៖ F = m × a។",
      socratic_clue_en:
        "Net force F in Newtons is the product of mass m and acceleration a: F = m × a.",
      explanation_km:
        "ច្បាប់ញូតុនទី២ ចែងថាកម្លាំងផ្គួបមានអំពើលើវត្ថុមួយ ស្មើនឹងផលគុណរវាងម៉ាស m និងសំទុះ a របស់វា (F = m × a)។",
      explanation_en: "Newton's Second Law defines force as F = m · a.",
    },
    {
      id: "phys-lab-2",
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ការវិភាគនិចលភាព និងសំទុះ",
      stage_name_en: "Stage 2 • Inertia & Acceleration Analysis",
      prompt_km:
        "ប្រសិនបើអ្នករុញរទេះពីរដោយកម្លាំងស្មើគ្នា៖ រទេះទី១ មានម៉ាសតូច និងរទេះទី២ មានម៉ាសធំ។ តើរទេះណានឹងមានសំទុះលឿនជាង?",
      prompt_en:
        "Equal force is applied to two carts: Cart 1 is light (small mass), Cart 2 is heavy (large mass). Which experiences greater acceleration?",
      options_km: [
        "រទេះទី១ (ម៉ាសតូច មាននិចលភាពតូច ងាយផ្លាស់ប្តូរល្បឿនជាង)",
        "រទេះទី២ (ម៉ាសធំ រត់លឿនជាង)",
        "រទេះទាំងពីរមានសំទុះស្មើគ្នាជានិច្ច ព្រោះកម្លាំងស្មើគ្នា",
        "គ្មានរទេះណាមានសំទុះទេ ព្រោះគ្មានកកិត",
      ],
      options_en: [
        "Cart 1 (smaller mass has less inertia, accelerating faster)",
        "Cart 2 (larger mass accelerates faster)",
        "Both carts accelerate at the exact same rate",
        "Neither cart moves",
      ],
      correct_index: 0,
      scientific_analogy_km:
        "ដូចការរុញកង់ធៀបនឹងការរុញរថយន្ត៖ វត្ថុដែលស្រាលងាយរុញឱ្យលឿនជាងវត្ថុធ្ងន់។",
      scientific_analogy_en:
        "Like pushing a bicycle versus a heavy freight truck: smaller mass responds with vastly greater velocity change.",
      formula_badge: "a = F / m",
      socratic_clue_km:
        "តាមសមីការ a = F / m៖ កាលណាកម្លាំង F ថេរ ហើយម៉ាស m កាន់តែតូច នោះសំទុះ a នឹងកាន់តែធំ។",
      socratic_clue_en:
        "From a = F / m: acceleration is inversely proportional to mass under constant force.",
      explanation_km: "ម៉ាសកាន់តែតូច និចលភាពកាន់តែតូច នាំឱ្យសំទុះ a = F / m កាន់តែធំ។",
      explanation_en:
        "With constant applied force, smaller mass results directly in higher acceleration.",
    },
    {
      id: "phys-lab-3",
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ខ្សែសង្វាក់ទាញរកសំទុះ",
      stage_name_en: "Stage 3 • Acceleration Derivation Chain",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការទាញរកសំទុះ a ឱ្យបានត្រឹមត្រូវតាមលំដាប់តក្កវិទ្យា៖",
      prompt_en: "Arrange the 4 steps of algebraic derivation to isolate acceleration a:",
      steps_km: [
        "កំណត់កម្លាំងសរុបមានអំពើលើអង្គធាតុ (ΣF)",
        "សរសេរសមីការច្បាប់ញូតុនទី២ (ΣF = m × a)",
        "ធ្វើចំណោលពិជគណិតលើទិសដៅចលនា (F = m × a)",
        "ចែកអង្គទាំងពីរនឹងម៉ាស m ដើម្បីបាន a = F / m",
      ],
      steps_en: [
        "Identify all net external forces (ΣF)",
        "State Newton's Second Law equation (ΣF = m × a)",
        "Project scalar forces along line of motion (F = m × a)",
        "Divide both sides by mass (m) to isolate a = F / m",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "a = F / m",
      socratic_clue_km: "វិភាគកម្លាំងសរុប -> សរសេរសមីការ -> ធ្វើចំណោល -> ទាញរក a = F/m។",
      socratic_clue_en:
        "Order: Force summation -> Vector law -> Axis projection -> Isolate acceleration.",
      explanation_km:
        "ការដោះស្រាយលំហាត់មេកានិចតម្រូវឱ្យវិភាគកម្លាំងសរុប សរសេរសមីការ ធ្វើចំណោលពិជគណិត រួចទាញរក a = F/m។",
      explanation_en:
        "Dynamic analysis requires vector statement, 1D projection, and algebraic isolation.",
    },
    {
      id: "phys-lab-4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាក្នុងបន្ទប់ពិសោធន៍",
      stage_name_en: "Stage 4 • Dynamic Bench Calculation",
      prompt_km:
        "រទេះពិសោធន៍មួយមានម៉ាស m = 2 kg ទទួលរងកម្លាំងរុញផ្គួប F = 6 N។ គណនាសំទុះ a ដែលរទេះទទួលបាន៖",
      prompt_en:
        "A lab cart with mass m = 2 kg experiences a net horizontal force F = 6 N. Calculate its acceleration a:",
      given_values_km: [
        { label: "កម្លាំងផ្គួប (F)", value: "6 N" },
        { label: "ម៉ាសរទេះ (m)", value: "2 kg" },
      ],
      given_values_en: [
        { label: "Force (F)", value: "6 N" },
        { label: "Mass (m)", value: "2 kg" },
      ],
      options_km: [
        "a = 3 m/s² (តាមរូបមន្ត a = F / m = 6 / 2)",
        "a = 12 m/s² (តាមរូបមន្ត a = F × m = 6 × 2)",
        "a = 0.33 m/s² (តាមរូបមន្ត a = m / F = 2 / 6)",
        "a = 4 m/s² (តាមរូបមន្ត a = F - m = 6 - 2)",
      ],
      options_en: [
        "a = 3 m/s² (via a = F / m = 6 / 2)",
        "a = 12 m/s² (via a = F × m = 6 × 2)",
        "a = 0.33 m/s² (via a = m / F = 2 / 6)",
        "a = 4 m/s² (via a = F - m = 6 - 2)",
      ],
      correct_index: 0,
      formula_badge: "a = 3 m/s²",
      socratic_clue_km: "សំទុះ a ស្មើនឹងកម្លាំង 6 ចែកនឹងម៉ាស 2។",
      socratic_clue_en: "Acceleration a is force 6 divided by mass 2.",
      explanation_km: "a = F / m = 6 N / 2 kg = 3 m/s² (ម៉ែត្រក្នុងមួយវិនាទីការ៉េ)។",
      explanation_en: "a = F / m = 6 N / 2 kg = 3 m/s².",
    },
  ];
}

/**
 * Duolingo-Style Deck Expander:
 * Ensures every single quiz block contains 10 to 12 questions.
 * Preserves custom handcrafted decks and appends authentic MoEYS
 * pedagogical stages (misconceptions, practical application, derivation protocol,
 * calculation mastery, and national exam readiness).
 */
function ensureDuolingoQuestionCount(
  deck: QuizQuestionItem[],
  lessonId: string,
): QuizQuestionItem[] {
  if (deck.length >= 10) return deck;

  const lesson = getCuratedLesson(lessonId);
  const titleKm = lesson?.title_km || "មេរៀនស្ដង់ដារ MoEYS";
  const titleEn = lesson?.title_en || "MoEYS Standard Module";
  const subjectKm = lesson?.subject?.name_km || "វិទ្យាសាស្ត្រ";
  const subjectEn = lesson?.subject?.name_en || "Science";
  const grade = lesson?.grade || 7;
  const isBrevet = grade === 9;
  const isBacII = grade === 12;
  const examNameKm = isBrevet
    ? "ឌីប្លូម (Grade 9)"
    : isBacII
      ? "បាក់ឌុប (Grade 12)"
      : `ថ្នាក់ទី ${grade}`;
  const examNameEn = isBrevet
    ? "Brevet (Grade 9)"
    : isBacII
      ? "Bac II (Grade 12)"
      : `Grade ${grade}`;

  const augmented: QuizQuestionItem[] = [...deck];
  let stageNum = augmented.length + 1;

  // Question 5: Concept Precision & Definition Check
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ការផ្ទៀងផ្ទាត់គំនិតលម្អិត`,
      stage_name_en: `Stage ${stageNum} • Concept Precision Check`,
      prompt_km: `ក្នុងមេរៀន «${titleKm}» តើគោលការណ៍គ្រឹះណាដែលជាមូលដ្ឋានសំខាន់បំផុតក្នុងការដោះស្រាយលំហាត់?`,
      prompt_en: `In "${titleEn}", which foundational principle is essential for systematic problem solving?`,
      options_km: [
        "ការក្តាប់បាននូវនិយមន័យច្បាស់លាស់ វិធានសញ្ញា និងទំនាក់ទំនងតក្កវិទ្យា",
        "ការទន្ទេញចាំចម្លើយដោយមិនយល់ពីហេតុផល",
        "ការរំលងជំហានដោះស្រាយហើយសរសេរតែចម្លើយចុងក្រោយ",
        "ការប្រើរូបមន្តខុសពីកម្រិតថ្នាក់",
      ],
      options_en: [
        "Mastering precise definitions, sign conventions, and logical relationships",
        "Memorizing answers without conceptual understanding",
        "Skipping intermediate steps and guessing final values",
        "Applying unrelated formulas beyond syllabus",
      ],
      correct_index: 0,
      scientific_analogy_km:
        "ដូចគ្រឹះផ្ទះ៖ គ្រឹះទ្រឹស្តីរឹងមាំ ទើបអាចសាងសង់ចំណេះដឹងកម្រិតខ្ពស់បានរឹងមាំ។",
      scientific_analogy_en:
        "Like building foundations: rock-solid core principles support advanced understanding.",
      socratic_clue_km: "និយមន័យ និងវិធានសញ្ញាត្រឹមត្រូវ គឺជាគ្រឹះនៃភាពជោគជ័យ។",
      socratic_clue_en:
        "Precise definitions and rigorous sign conventions are the bedrock of exam success.",
      explanation_km: `ការយល់ច្បាស់ពីនិយមន័យ និងវិធានគ្រឹះនៃ «${titleKm}» ជួយឱ្យសិស្សដោះស្រាយលំហាត់បានត្រឹមត្រូវ ១០០%។`,
      explanation_en: `Clear comprehension of foundational principles in "${titleEn}" ensures 100% accuracy.`,
    });
    stageNum++;
  }

  // Question 6: Common Misconception & Exam Trap
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ចំណុចងាយភាន់ច្រឡំក្នុងការប្រឡង`,
      stage_name_en: `Stage ${stageNum} • Exam Trap & Misconception Check`,
      prompt_km: `នៅពេលដោះស្រាយវិញ្ញាសាប្រឡងលើមេរៀន «${titleKm}» តើកំហុសទូទៅណាដែលសិស្សតែងតែប្រព្រឹត្ត?`,
      prompt_en: `When tackling examination problems on "${titleEn}", which common pitfall must students actively avoid?`,
      options_km: [
        "ច្រឡំខ្នាតរង្វាស់ (Units) មិនបានបំប្លែងទៅជាប្រព័ន្ធ SI ឬភ្លេចវិធានសញ្ញា",
        "អានប្រធានលំហាត់យ៉ាងហ្មត់ចត់ច្រើនដង",
        "គូសបន្ទាត់ក្រោមទិន្នន័យបម្រាប់ក្នុងប្រធាន",
        "ផ្ទៀងផ្ទាត់ចម្លើយចុងក្រោយដោយវិធីជំនួសត្រឡប់",
      ],
      options_en: [
        "Confusing measurement units, failing to convert to SI, or misapplying sign rules",
        "Reading the problem statement carefully multiple times",
        "Underlining given data points in the exam prompt",
        "Verifying final numeric values through back-substitution",
      ],
      correct_index: 0,
      socratic_clue_km: "ការមិនបំប្លែងខ្នាត និងកំហុសសញ្ញាគឺជាអន្ទាក់ពិន្ទុធំបំផុត។",
      socratic_clue_en:
        "Unit conversion oversights and sign slips are the leading source of mark deductions.",
      explanation_km: `ក្នុងការប្រឡងជាតិ MoEYS ការបំប្លែងខ្នាតទៅតាមប្រព័ន្ធអន្តរជាតិ (SI) និងការប្រយ័ត្នសញ្ញា (+) (-) ជួយធានាមិនឱ្យបាត់ពិន្ទុឡើយ។`,
      explanation_en: `Strictly converting to standard SI units and monitoring operational signs guarantees zero penalty deductions.`,
    });
    stageNum++;
  }

  // Question 7: Cambodian Context & Real-World Application
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ការអនុវត្តជាក់ស្តែងក្នុងបរិបទកម្ពុជា`,
      stage_name_en: `Stage ${stageNum} • Real-World Cambodian Application`,
      prompt_km: `តើចំណេះដឹងពីមេរៀន «${titleKm}» អាចយកទៅអនុវត្តជាក់ស្តែងក្នុងជីវភាព ឬការអភិវឌ្ឍប្រទេសកម្ពុជាយ៉ាងដូចម្តេច?`,
      prompt_en: `How can competencies from "${titleEn}" be directly applied to everyday life or national development in Cambodia?`,
      options_km: [
        "ជួយពន្យល់បាតុភូតធម្មជាតិ អនុវត្តក្នុងការងារបច្ចេកវិទ្យា វិស្វកម្ម កសិកម្ម និងការគ្រប់គ្រងធនធាន",
        "គ្មានការអនុវត្តជាក់ស្តែងអ្វីក្នុងប្រទេសកម្ពុជាឡើយ",
        "គ្រាន់តែជាចំណេះដឹងលើក្រដាសសម្រាប់ការប្រឡងប៉ុណ្ណោះ",
        "មិនអាចយកទៅប្រើប្រាស់ក្រៅសាលារៀនបានទេ",
      ],
      options_en: [
        "Informs scientific understanding, technology, civil engineering, agriculture, and natural resource management",
        "Has zero practical relevance to Cambodia",
        "Merely abstract textbook facts exclusively for test-taking",
        "Cannot be utilized outside the school classroom",
      ],
      correct_index: 0,
      scientific_analogy_km:
        "ចំណេះដឹងវិទ្យាសាស្ត្រ និងសង្គមគឺជាឧបករណ៍កសាងសង្គមជាតិ និងសេដ្ឋកិច្ច។",
      scientific_analogy_en:
        "Academic competencies are tools driving national infrastructure, technology, and economic growth.",
      socratic_clue_km: "ទ្រឹស្តីតែងតែបម្រើដល់ការអភិវឌ្ឍជាក់ស្តែងក្នុងសង្គម។",
      socratic_clue_en:
        "Theoretical knowledge bridges directly into industrial and societal development.",
      explanation_km: `មុខវិជ្ជា ${subjectKm} តាមរយៈមេរៀន «${titleKm}» ផ្តល់មូលដ្ឋានគ្រឹះដល់វិស្វករ អ្នកស្រាវជ្រាវ និងពលរដ្ឋក្នុងការកសាងសង្គមជាតិកម្ពុជា។`,
      explanation_en: `Competencies from ${subjectEn} ("${titleEn}") form the engineering and scientific bedrock of Cambodian national modernization.`,
    });
    stageNum++;
  }

  // Question 8: 4-Step Problem Solving Protocol (Derivation Chain)
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "derivation_chain",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • សង្វាក់តក្កវិទ្យា ៤ ជំហានដោះស្រាយបញ្ហា`,
      stage_name_en: `Stage ${stageNum} • 4-Step Problem-Solving Protocol`,
      prompt_km: `ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយលំហាត់ប្រឡងក្នុងមេរៀន «${titleKm}» ឱ្យបានត្រឹមត្រូវតាមលំដាប់តក្កវិទ្យា៖`,
      prompt_en: `Arrange the 4 steps of rigorous derivation and problem solving for "${titleEn}":`,
      steps_km: [
        "អានប្រធាន និងស្រង់ទិន្នន័យបម្រាប់ព្រមទាំងខ្នាត (Given Values & Units)",
        "កំណត់រូបមន្ត ឬទ្រឹស្តីបទដែលត្រូវអនុវត្ត (Identify Principle / Formula)",
        "បំប្លែងសមីការ និងជំនួសលេខដោយប្រុងប្រយ័ត្ន (Substitute & Calculate)",
        "ផ្ទៀងផ្ទាត់ចម្លើយ និងសរសេរខ្នាតចុងក្រោយឱ្យបានច្បាស់លាស់ (Verify & State Unit)",
      ],
      steps_en: [
        "Extract given values, identify constraints, and record standard units",
        "Select governing formula, theorem, or grammatical/historical rule",
        "Perform algebraic transposition and careful numerical substitution",
        "Verify solution plausibility and clearly state final units/conclusion",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "MoEYS Protocol",
      socratic_clue_km: "ស្រង់បម្រាប់ -> រើសរូបមន្ត -> ជំនួសលេខ -> ផ្ទៀងផ្ទាត់ចម្លើយ។",
      socratic_clue_en: "Extract data -> Select principle -> Compute -> Conclude.",
      explanation_km: `ការអនុវត្តតាមលំដាប់ ៤ ជំហាននេះជួយកាត់បន្ថយកំហុស និងធានាបានពិន្ទុពេញក្នុងការប្រឡងជាតិ។`,
      explanation_en: `Following this 4-step protocol guarantees maximum marks on MoEYS national exams.`,
    });
    stageNum++;
  }

  // Question 9: Quantitative Benchmark / Evaluation Mastery
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "lab_calculation",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ការគណនាកម្រិតពិន្ទុ និងការវាយតម្លៃ`,
      stage_name_en: `Stage ${stageNum} • Mastery Calculation & Evaluation`,
      prompt_km: `ប្រសិនបើសិស្សម្នាក់ឆ្លើយត្រូវគ្រប់សំណួរទាំងអស់ក្នុងបន្ទប់ពិសោធន៍នៃមេរៀន «${titleKm}» តើសិស្សទទួលបានអត្ថប្រយោជន៍អ្វី?`,
      prompt_en: `If a student completes all discovery lab stages in "${titleEn}" with full accuracy, what do they achieve?`,
      given_values_km: [
        { label: "មេរៀន", value: titleKm },
        { label: "ពិន្ទុភាពស្ទាត់ជំនាញ", value: "100% Mastery" },
      ],
      given_values_en: [
        { label: "Module", value: titleEn },
        { label: "Mastery Level", value: "100% Mastery" },
      ],
      options_km: [
        `ទទួលបាន +${lesson?.xp_reward || 35} XP, បង្កើនសន្ទុះ Streak, និងដោះសោមេរៀនបន្ទាប់`,
        "មិនទទួលបានអ្វីទាំងអស់",
        "ត្រូវចាប់ផ្តើមរៀនពីថ្នាក់ទី៧ ឡើងវិញ",
        "បាត់បង់ថាមពលទាំងអស់",
      ],
      options_en: [
        `Earn +${lesson?.xp_reward || 35} XP, advance daily streak, and unlock the next milestone`,
        "No rewards granted",
        "Forced to restart from Grade 7",
        "Loss of all energy hearts",
      ],
      correct_index: 0,
      formula_badge: "100% Mastery",
      socratic_clue_km: "ការបញ្ចប់មេរៀនដោយជោគជ័យផ្តល់រង្វាន់ XP និងដោះសោដំណើរទៅមុខ។",
      socratic_clue_en:
        "Completing lessons unlocks XP rewards and advances the learning roadmap.",
      explanation_km: `ការអនុវត្តជាប្រចាំជួយរក្សា Streak និងធ្វើឱ្យការសិក្សាក្លាយជាទម្លាប់ដ៏មានតម្លៃ។`,
      explanation_en: `Daily consistency builds habits, secures leaderboard rankings, and guarantees mastery.`,
    });
    stageNum++;
  }

  // Question 10: National Examination Readiness Challenge
  if (augmented.length < 10) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ការត្រៀមខ្លួនប្រឡងថ្នាក់ជាតិ`,
      stage_name_en: `Stage ${stageNum} • National Exam Readiness Challenge`,
      prompt_km: `ដើម្បីទទួលបាននិទ្ទេសល្អ (A ឬ B) ក្នុងការប្រឡង ${examNameKm} តើសិស្សត្រូវត្រៀមខ្លួនចំពោះមេរៀន «${titleKm}» យ៉ាងណា?`,
      prompt_en: `To achieve top honors (Grade A or B) on the ${examNameEn} examinations, how should one prepare for "${titleEn}"?`,
      options_km: [
        "ធ្វើស្វ័យវាយតម្លៃជាប្រចាំ ហាត់ដោះស្រាយវិញ្ញាសាចាស់ៗ និងយល់ច្បាស់ពីខ្លឹមសារមេរៀន",
        "រង់ចាំជិតដល់ថ្ងៃប្រឡងទើបចាប់ផ្តើមមើលសៀវភៅ",
        "មើលតែចម្លើយសង្ខេបដោយមិនបានអនុវត្តផ្ទាល់ដៃ",
        "សង្ឃឹមលើសំណាងក្នុងការប្រឡង",
      ],
      options_en: [
        "Self-assess frequently, practice past national exam archives, and understand foundational principles",
        "Cram only a few days before the official exam",
        "Read brief answer summaries without practicing by hand",
        "Rely on luck on examination day",
      ],
      correct_index: 0,
      socratic_clue_km:
        "ការដោះស្រាយវិញ្ញាសាចាស់ៗ និងការអនុវត្តផ្ទាល់ដៃ គឺជាគន្លឹះឆ្ពោះទៅកាន់និទ្ទេស A។",
      socratic_clue_en:
        "Consistent practice with past exam papers and deep comprehension secures Grade A.",
      explanation_km: `ការយល់ដឹងស៊ីជម្រៅលើមេរៀន «${titleKm}» រួមផ្សំជាមួយការអនុវត្តវិញ្ញាសាជាក់ស្តែង ជួយធានានូវលទ្ធផលឆ្នើមបំផុត។`,
      explanation_en: `Deep comprehension of "${titleEn}" combined with authentic exam practice guarantees top results.`,
    });
    stageNum++;
  }

  // Question 11: Real-World Scenario Reasoning
  if (augmented.length < 11) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • ការវិភាគហេតុផលបែបវិទ្យាសាស្ត្រ`,
      stage_name_en: `Stage ${stageNum} • Real-World Scenario Reasoning`,
      prompt_km: `នៅពេលជួបប្រទះស្ថានភាពជាក់ស្តែងទាក់ទងនឹងមេរៀន «${titleKm}» តើការវិនិច្ឆ័យបែបណាដែលត្រឹមត្រូវតាមស្ដង់ដារ MoEYS?`,
      prompt_en: `When encountering a practical situation related to "${titleEn}", which reasoned judgement aligns with MoEYS standards?`,
      options_km: [
        "ផ្អែកលើភស្តុតាង វិភាគហេតុនិងផល និងប្រើប្រាស់រូបមន្តច្បាស់លាស់",
        "ស្មានតាមអារម្មណ៍ដោយគ្មានទិន្នន័យ",
        "សន្និដ្ឋានដោយផ្អែកលើពាក្យចចាមអារ៉ាម",
        "មិនយកចិត្តទុកដាក់លើការពិតវិទ្យាសាស្ត្រ",
      ],
      options_en: [
        "Base conclusions on empirical evidence, cause-and-effect logic, and verified principles",
        "Guess impulsively without verifying parameters",
        "Rely on hearsay without experimental backing",
        "Disregard physical and empirical realities",
      ],
      correct_index: 0,
      socratic_clue_km: "ការគិតបែបវិទ្យាសាស្ត្រតម្រូវឱ្យមានភស្តុតាង និងតក្កវិទ្យាច្បាស់លាស់។",
      socratic_clue_en:
        "Scientific thinking demands empirical evidence and sound logical reasoning.",
      explanation_km: `ការអប់រំតាមកម្មវិធីសិក្សាជាតិ MoEYS បណ្តុះបណ្តាលសិស្សឱ្យមានការគិតស៊ីជម្រៅ និងចេះវិនិច្ឆ័យដោយសមហេតុផល។`,
      explanation_en: `MoEYS national education cultivates critical thinking and evidence-based decision making.`,
    });
    stageNum++;
  }

  // Question 12: Comprehensive Capstone Synthesis
  if (augmented.length < 12) {
    augmented.push({
      id: `${lessonId}-stage-${stageNum}`,
      type: "concept_choice",
      stage_name_km: `ដំណាក់កាលទី${stageNum} • សំយោគចំណេះដឹងទូទៅនៃមេរៀន`,
      stage_name_en: `Stage ${stageNum} • Comprehensive Capstone Synthesis`,
      prompt_km: `ជាសរុប តើអ្វីជាសារៈសំខាន់ដ៏ធំបំផុតនៃការបញ្ចប់ការសិក្សាមេរៀន «${titleKm}» ដោយជោគជ័យ?`,
      prompt_en: `In summary, what is the greatest benefit of successfully mastering "${titleEn}"?`,
      options_km: [
        "កសាងចំណេះដឹងរឹងមាំ ត្រៀមប្រឡងជាតិប្រកបដោយទំនុកចិត្ត និងដោះសោមេរៀនបន្ទាប់លើ Learning Path",
        "គ្រាន់តែទទួលបានពិន្ទុបណ្តោះអាសន្នដោយគ្មានប្រយោជន៍យូរអង្វែង",
        "មិនមានឥទ្ធិពលលើការសិក្សាទៅមុខឡើយ",
        "ត្រូវចាប់ផ្តើមឡើងវិញគ្រប់ពេល",
      ],
      options_en: [
        "Build durable mastery, approach national exams with confidence, and advance through the roadmap",
        "Merely temporary score points with no lasting academic value",
        "Zero effect on future studies or grade advancement",
        "Requires resetting every single time",
      ],
      correct_index: 0,
      socratic_clue_km:
        "ការតស៊ូរៀនសូត្រពីមួយកម្រិតទៅមួយកម្រិតនាំមកនូវភាពជោគជ័យយូរអង្វែង។",
      socratic_clue_en:
        "Step-by-step milestone progression leads to lifelong academic and professional success.",
      explanation_km: `អបអរសាទរ! អ្នកបានឆ្លងកាត់ការសិក្សាយ៉ាងហ្មត់ចត់លើមេរៀន «${titleKm}»។ អ្នកបានត្រៀមខ្លួនរួចរាល់សម្រាប់មេរៀនបន្ទាប់!`,
      explanation_en: `Outstanding! You have thoroughly completed all discovery stages for "${titleEn}". You are ready for the next milestone!`,
    });
  }

  return augmented;
}

/**
 * Master Subject & Topic Aware Discovery Lab Deck Generator
 * Fully aligned with MoEYS Curriculum Standards (10–12 questions per lesson block)
 */
export function getCurriculumLabQuestions(lessonId: string): QuizQuestionItem[] {
  const rawDeck = getRawCurriculumLabQuestions(lessonId);
  return ensureDuolingoQuestionCount(rawDeck, lessonId);
}

