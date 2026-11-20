// ==============================================================================
// ScienceKH — Grade-Stratified Mathematics Discovery Decks (Grades 7–12)
// Strictly aligned with MoEYS Curriculum Standards — Zero Cross-Grade Redundancy
// ==============================================================================

import type { CuratedLesson } from "../curated-lessons";
import type { QuizQuestionItem } from "./types";

// ==============================================================================
// 1. GRADE 12 MATHEMATICS (BAC II LEVEL)
// ==============================================================================

export function getG12LimitsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-lim-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តលីមីតត្រីកោណមាត្រ",
      stage_name_en: "Stage 1 • Fundamental Trig Limit Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តលីមីតគ្រឹះនៃ (sin x)/x កាលណា x ខិតជិត 0 លើរនាំងសមីការ៖",
      prompt_en: "Assemble the fundamental trigonometric limit formula as x approaches 0:",
      spoken_theorem_km: "លីមីត អិច ខិតជិត សូន្យ នៃ ស៊ីនុស អិច លើ អិច ស្មើនឹង មួយ",
      spoken_theorem_en: "Limit of sin x over x as x approaches 0 equals 1",
      variables_pool: [
        { id: "l1", symbol: "lim_{x→0}", name_km: "លីមីត x→0", name_en: "Limit x->0", unit: "Operator", category: "operator" },
        { id: "l2", symbol: "sin(x)", name_km: "ស៊ីនុស x", name_en: "sin(x)", unit: "Numerator" },
        { id: "l3", symbol: "/", name_km: "ចែកនឹង", name_en: "over", unit: "Division", category: "operator" },
        { id: "l4", symbol: "x", name_km: "អថេរ x", name_en: "variable x", unit: "Denominator" },
        { id: "l5", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "l6", symbol: "1", name_km: "មួយ", name_en: "one", unit: "Constant", category: "constant" },
        { id: "l7", symbol: "0", name_km: "សូន្យ", name_en: "zero", unit: "Distractor" },
      ],
      target_sequence_ids: ["l1", "l2", "l3", "l4", "l5", "l6"],
      formula_badge: "lim_{x→0} (sin x)/x = 1",
      socratic_clue_km: "លីមីតគ្រឹះត្រីកោណមាត្រ៖ កាលណា x ខិតជិត 0 នោះ sin(x)/x ខិតជិត 1។",
      socratic_clue_en: "The standard fundamental trigonometric limit identity equals 1 as x approaches 0.",
      explanation_km: "ទ្រឹស្តីបទគ្រឹះបាក់ឌុប៖ lim_{x→0} (sin x)/x = 1 (មុំ x គិតជា រ៉ាដ្យង់)។",
      explanation_en: "The foundational Bac II calculus theorem states lim_{x->0} (sin x)/x = 1 (where x is in radians).",
    },
    {
      id: `${lessonId}-lim-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ការវិភាគរាងមិនកំណត់ 0/0 និងវិធីសាស្ត្រដោះស្រាយ",
      stage_name_en: "Stage 2 • Indeterminate Form 0/0 Analysis",
      prompt_km: "នៅពេលជំនួសតម្លៃផ្ទាល់ឃើញរាងមិនកំណត់ [0/0] លើប្រភាគពហុធា ឬប្រភាគមានរ៉ាឌីកាល់ តើត្រូវដោះស្រាយតាមវិធីណា?",
      prompt_en: "When direct substitution yields an indeterminate form [0/0] for algebraic or radical functions, what is the correct strategy?",
      options_km: [
        "បំបែកជាកត្តា (x - a) រួចសម្រួល ឬគុណនឹងកន្សោមកំប្លេប្រសិនបើមានរ៉ាឌីកាល់ (Conjugate)",
        "សន្មតថាចម្លើយស្មើនឹង ០ ភ្លាមៗដោយមិនបាច់គណនា",
        "សន្និដ្ឋានថាលីមីតមិនមានតម្លៃជានិច្ច",
        "បូកភាគយក និងភាគបែងបញ្ចូលគ្នា",
      ],
      options_en: [
        "Factor out the common term (x - a) to cancel, or multiply by the conjugate if radicals are present",
        "Assume the answer is immediately 0 without evaluation",
        "Conclude that the limit never exists",
        "Add numerator and denominator together",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចការដោះសោទ្វារ៖ រាង 0/0 បង្ហាញថាកត្តា (x - a) ទាំងសងខាងកំពុងលាក់តម្លៃពិត ត្រូវសម្រួលចេញសិន!",
      scientific_analogy_en: "Like opening a locked door: cancelling the vanishing factor (x - a) reveals the true finite limit value.",
      formula_badge: "Form [0/0] Protocol",
      socratic_clue_km: "បំបែកកត្តាសម្រួលកត្តាសូន្យ ឬគុណកន្សោមកំប្លេដើម្បីបំបាត់រ៉ាឌីកាល់។",
      socratic_clue_en: "Factorization or conjugate multiplication removes the singularity at x = a.",
      explanation_km: "រាងមិនកំណត់ [0/0] ត្រូវតែលុបបំបាត់កត្តា (x - a) ដែលធ្វើឱ្យភាគបែងសូន្យតាមរយៈការបំបែកជាកត្តា ឬគុណកន្សោមកំប្លេ។",
      explanation_en: "The indeterminate form 0/0 must be lifted by factoring (x - a) or multiplying by the algebraic conjugate.",
    },
    {
      id: `${lessonId}-lim-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានគណនាលីមីតរាង 0/0",
      stage_name_en: "Stage 3 • 4-Step Factoring Limit Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការគណនាលីមីត lim_{x→2} (x² - 4)/(x - 2) ឱ្យបានត្រឹមត្រូវ៖",
      prompt_en: "Arrange the 4 steps to evaluate the rational limit lim_{x->2} (x² - 4)/(x - 2):",
      steps_km: [
        "ជំនួស x = 2 ចូលដើម្បីផ្ទៀងផ្ទាត់រាងមិនកំណត់ [0/0]",
        "បំបែកភាគយកជាកត្តា៖ x² - 4 = (x - 2)(x + 2)",
        "សម្រួលកត្តារួម (x - 2) នៅភាគយក និងភាគបែង",
        "ជំនួស x = 2 ចូលកន្សោមសល់ lim_{x→2} (x + 2) = 2 + 2 = 4",
      ],
      steps_en: [
        "Substitute x = 2 directly to detect the indeterminate form [0/0]",
        "Factor the difference of squares: x² - 4 = (x - 2)(x + 2)",
        "Cancel the common non-zero vanishing factor (x - 2)",
        "Evaluate remaining continuous linear expression: 2 + 2 = 4",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "lim_{x→2} (x²-4)/(x-2) = 4",
      socratic_clue_km: "ផ្ទៀងផ្ទាត់រាង 0/0 -> បំបែកកត្តា (x-2)(x+2) -> សម្រួល (x-2) -> ជំនួស 2+2 = 4។",
      socratic_clue_en: "Verify 0/0 -> Factor numerator -> Cancel singularity -> Substitute to obtain 4.",
      explanation_km: "ជំហានទាំង ៤ នេះជាវិធីសាស្ត្រស្ដង់ដារដែលក្រសួងអប់រំ MoEYS ផ្តល់ពិន្ទុពេញក្នុងការប្រឡងបាក់ឌុប។",
      explanation_en: "This 4-step derivation matches the official MoEYS Bac II scoring rubric.",
    },
    {
      id: `${lessonId}-lim-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាលីមីតត្រីកោណមាត្រជាក់ស្តែង",
      stage_name_en: "Stage 4 • Trig Limit Evaluation",
      prompt_km: "គណនាតម្លៃលីមីត៖ lim_{x→0} (sin 5x)/(2x) = ?",
      prompt_en: "Evaluate the limit: lim_{x->0} (sin 5x)/(2x) = ?",
      given_values_km: [
        { label: "កន្សោមលីមីត", value: "lim_{x→0} sin(5x) / (2x)" },
        { label: "ទ្រឹស្តីបទជំនួយ", value: "lim_{u→0} (sin u)/u = 1" },
      ],
      given_values_en: [
        { label: "Limit Expression", value: "lim_{x->0} sin(5x) / (2x)" },
        { label: "Governing Identity", value: "lim_{u->0} (sin u)/u = 1" },
      ],
      options_km: [
        "5/2 (តាមរូបមន្ត (5/2) · lim sin(5x)/(5x) = 5/2)",
        "1",
        "2/5",
        "0",
      ],
      options_en: [
        "5/2 (via (5/2) · lim_{x->0} sin(5x)/(5x) = 5/2)",
        "1",
        "2/5",
        "0",
      ],
      correct_index: 0,
      formula_badge: "L = 5/2",
      socratic_clue_km: "គុណនិងចែកនឹង 5៖ (5/2) · (sin 5x / 5x) នាំឱ្យបាន 5/2 · 1 = 5/2។",
      socratic_clue_en: "Rescale argument: (5/2) * (sin 5x / 5x) -> (5/2) * 1 = 5/2.",
      explanation_km: "lim_{x→0} \\frac{\\sin 5x}{2x} = \\frac{5}{2} \\lim_{x→0} \\frac{\\sin 5x}{5x} = \\frac{5}{2} \\times 1 = \\frac{5}{2}។",
      explanation_en: "Rescaling yields (5/2) * lim (sin 5x / 5x) = 5/2 * 1 = 5/2.",
    },
  ];
}

export function getG12DerivativesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-der-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តដេរីវេអនុគមន៍បណ្តាក់",
      stage_name_en: "Stage 1 • Chain Rule Power Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តដេរីវេនៃអនុគមន៍បណ្តាក់ (uⁿ)' លើរនាំងសមីការ៖",
      prompt_en: "Assemble the generalized power chain rule derivative on the rail:",
      spoken_theorem_km: "ដេរីវេនៃ អ៊ុយ ស្វ័យគុណ អិន ស្មើនឹង អិន គុណ អ៊ុយ ព្រីម គុណ អ៊ុយ ស្វ័យគុណ អិន ដកមួយ",
      spoken_theorem_en: "Derivative of u to the n equals n times u prime times u to the n minus one",
      variables_pool: [
        { id: "d1", symbol: "(uⁿ)'", name_km: "ដេរីវេ uⁿ", name_en: "(u^n)'", unit: "LHS" },
        { id: "d2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "d3", symbol: "n", name_km: "ស្វ័យគុណ n", name_en: "exponent n", unit: "Factor" },
        { id: "d4", symbol: "·", name_km: "គុណនឹង", name_en: "times", unit: "Multiply", category: "operator" },
        { id: "d5", symbol: "u'", name_km: "ដេរីវេខាងក្នុង u'", name_en: "inner derivative u'", unit: "Differential" },
        { id: "d6", symbol: "·", name_km: "គុណនឹង", name_en: "times", unit: "Multiply", category: "operator" },
        { id: "d7", symbol: "uⁿ⁻¹", name_km: "អ៊ុយស្វ័យគុណ n-1", name_en: "u^(n-1)", unit: "Term" },
      ],
      target_sequence_ids: ["d1", "d2", "d3", "d4", "d5", "d6", "d7"],
      formula_badge: "(uⁿ)' = n · u' · uⁿ⁻¹",
      socratic_clue_km: "កុំភ្លេចគុណនឹង u' (ដេរីវេនៃកន្សោមខាងក្នុង)!",
      socratic_clue_en: "Never forget the inner derivative factor u' when applying the chain rule.",
      explanation_km: "រូបមន្តបណ្តាក់៖ (uⁿ)' = n · u' · uⁿ⁻¹ ដែល u = u(x) ជាអនុគមន៍មានដេរីវេ។",
      explanation_en: "Generalized power chain rule: d/dx [u(x)^n] = n * u'(x) * u(x)^(n-1).",
    },
    {
      id: `${lessonId}-der-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ន័យធរណីមាត្រនៃដេរីវេ និងបន្ទាត់ប៉ះ",
      stage_name_en: "Stage 2 • Geometric Meaning of Derivative & Tangent",
      prompt_km: "តើតម្លៃដេរីវេ f'(x₀) ត្រង់ចំណុច x = x₀ តំណាងឱ្យអ្វីក្នុងធរណីមាត្រ?",
      prompt_en: "What does the numerical derivative f'(x₀) at point x₀ represent geometrically?",
      options_km: [
        "មេគុណប្រាប់ទិស (Slope) នៃបន្ទាត់ប៉ះក្រាប (C) ត្រង់ចំណុច M₀(x₀, f(x₀))",
        "ផ្ទៃក្រឡាក្រោមខ្សែកោងពី 0 ទៅ x₀",
        "ប្រវែងអង្កត់ផ្ចិតនៃរង្វង់ត្រីកោណមាត្រ",
        "កូអរដោនេនៃចំណុចកំពូលរបស់អ័ក្សដេក",
      ],
      options_en: [
        "The slope of the tangent line to curve (C) at point M₀(x₀, f(x₀))",
        "The area enclosed beneath the curve from 0 to x₀",
        "The diameter of the unit circle",
        "The coordinate of the horizontal origin",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចទិសដៅល្បឿនខណៈ៖ ដេរីវេប្រាប់ថាក្រាបកំពុងងើបឡើង ឬទោរចុះខ្លាំងប៉ុណ្ណាត្រង់ចំណុចនោះ។",
      scientific_analogy_en: "Like instantaneous velocity: derivative measures instantaneous rate of incline or decline.",
      formula_badge: "y = f'(x₀)(x - x₀) + y₀",
      socratic_clue_km: "f'(x₀) គឺជាមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះក្រាប (C)។",
      socratic_clue_en: "f'(x₀) is the gradient slope m of the tangent line at x₀.",
      explanation_km: "សមីការបន្ទាត់ប៉ះក្រាប (C) ត្រង់ x₀ គឺ y = f'(x₀)(x - x₀) + f(x₀)។",
      explanation_en: "The tangent line equation is given by y - y₀ = f'(x₀)(x - x₀).",
    },
    {
      id: `${lessonId}-der-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ជំហានសិក្សាអថេរភាព និងរកចំណុចបរមា",
      stage_name_en: "Stage 3 • Curve Variation & Extrema Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការរកចំណុចបរមា (អតិបរមា/អប្បបរមា) នៃអនុគមន៍ f(x)៖",
      prompt_en: "Arrange the 4 steps to locate local extrema of a differentiable function f(x):",
      steps_km: [
        "គណនាដេរីវេទី ១ f'(x) លើដែនកំណត់ D",
        "ដោះស្រាយសមីការ f'(x) = 0 ដើម្បីរកចំណុចគ្រោះថ្នាក់ (Critical Points)",
        "គូសតារាងសញ្ញា f'(x) និងកំណត់ទិសដៅអថេរភាព (ឡើង ឬចុះ)",
        "សន្និដ្ឋានតម្លៃបរមាធៀប៖ អតិបរមាកាលណា f' ប្តូរសញ្ញាពី (+) ទៅ (-) និងអប្បបរមាកាលណា (-) ទៅ (+)",
      ],
      steps_en: [
        "Compute first derivative f'(x) over domain D",
        "Solve f'(x) = 0 to identify stationary critical points",
        "Construct sign table of f'(x) to determine intervals of increase/decrease",
        "Conclude local extrema: maximum where f' changes (+) to (-), minimum where (-) to (+)",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "f'(x) = 0 ➔ Extrema",
      socratic_clue_km: "រក f'(x) -> រកឬស f'=0 -> សង់តារាងអថេរភាព -> សន្និដ្ឋានបរមា។",
      socratic_clue_en: "Compute f'(x) -> Solve f'=0 -> Sign table -> Deduce extrema.",
      explanation_km: "ការប្តូរសញ្ញានៃដេរីវេទីមួយ f'(x) ឆ្លងកាត់ឫស ជាលក្ខខណ្ឌបញ្ជាក់តម្លៃអតិបរមា ឬអប្បបរមាធៀប។",
      explanation_en: "The first derivative test classifies local extrema based on sign transitions across critical points.",
    },
    {
      id: `${lessonId}-der-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាដេរីវេអនុគមន៍បណ្តាក់ជាក់ស្តែង",
      stage_name_en: "Stage 4 • Chain Rule Evaluation",
      prompt_km: "គណនាដេរីវេនៃអនុគមន៍ g(x) = (2x + 1)⁵ ៖",
      prompt_en: "Calculate the derivative of g(x) = (2x + 1)⁵:",
      given_values_km: [
        { label: "អនុគមន៍ដើម", value: "g(x) = (2x + 1)⁵" },
        { label: "កន្សោមខាងក្នុង (u)", value: "2x + 1" },
        { label: "ដេរីវេ u'", value: "(2x + 1)' = 2" },
      ],
      given_values_en: [
        { label: "Function", value: "g(x) = (2x + 1)⁵" },
        { label: "Inner Expression (u)", value: "2x + 1" },
        { label: "Inner Derivative u'", value: "2" },
      ],
      options_km: [
        "10(2x + 1)⁴ (តាមរូបមន្ត 5 · 2 · (2x + 1)⁴)",
        "5(2x + 1)⁴ (ភ្លេចគុណដេរីវេខាងក្នុង u'=2)",
        "2(2x + 1)⁴",
        "10(2x + 1)⁵",
      ],
      options_en: [
        "10(2x + 1)⁴ (via 5 * 2 * (2x + 1)⁴ = 10(2x + 1)⁴)",
        "5(2x + 1)⁴ (forgot inner derivative u'=2)",
        "2(2x + 1)⁴",
        "10(2x + 1)⁵",
      ],
      correct_index: 0,
      formula_badge: "g'(x) = 10(2x+1)⁴",
      socratic_clue_km: "ទម្លាក់ស្វ័យគុណ 5 គុណនឹងដេរីវេខាងក្នុង 2 ស្មើ 10 រួចបន្ថយស្វ័យគុណសល់ 4។",
      socratic_clue_en: "Multiply power 5 by inner derivative 2 to get 10, power drops to 4.",
      explanation_km: "g'(x) = 5 · (2x + 1)' · (2x + 1)⁴ = 5 · 2 · (2x + 1)⁴ = 10(2x + 1)⁴។",
      explanation_en: "g'(x) = 5 * 2 * (2x + 1)⁴ = 10(2x + 1)⁴.",
    },
  ];
}

export function getG12ComplexDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-cplx-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តដឺម័រ (De Moivre)",
      stage_name_en: "Stage 1 • De Moivre's Theorem Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តដឺម័រសម្រាប់ស្វ័យគុណនៃចំនួនកុំផ្លិច (cos θ + i sin θ)ⁿ៖",
      prompt_en: "Assemble De Moivre's formula for powers of complex numbers on the rail:",
      spoken_theorem_km: "កូស៊ីនុស តេតា បូក អ៊ី ស៊ីនុស តេតា ស្វ័យគុណ អិន ស្មើនឹង កូស៊ីនុស អិន តេតា បូក អ៊ី ស៊ីនុស អិន តេតា",
      spoken_theorem_en: "Cosine theta plus i sine theta to the n equals cosine n theta plus i sine n theta",
      variables_pool: [
        { id: "cm1", symbol: "(cos θ + i sin θ)ⁿ", name_km: "កន្សោមស្វ័យគុណ n", name_en: "power n", unit: "LHS" },
        { id: "cm2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "cm3", symbol: "cos(nθ)", name_km: "កូស៊ីនុស nθ", name_en: "cos(nθ)", unit: "Real Part" },
        { id: "cm4", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Add", category: "operator" },
        { id: "cm5", symbol: "i", name_km: "ឯកតានិម្មិត i", name_en: "imaginary unit i", unit: "Constant", category: "constant" },
        { id: "cm6", symbol: "sin(nθ)", name_km: "ស៊ីនុស nθ", name_en: "sin(nθ)", unit: "Imaginary Part" },
      ],
      target_sequence_ids: ["cm1", "cm2", "cm3", "cm4", "cm5", "cm6"],
      formula_badge: "[cis(θ)]ⁿ = cis(nθ)",
      socratic_clue_km: "រូបមន្តដឺម័រពង្រីកមុំ θ ដោយគុណនឹងស្វ័យគុណ n៖ cos(nθ) + i sin(nθ)។",
      socratic_clue_en: "De Moivre multiplies argument theta by exponent n.",
      explanation_km: "រូបមន្តដឺម័រ៖ ចំពោះគ្រប់ n ∈ ℤ ៖ [r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ)។",
      explanation_en: "De Moivre's theorem: (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ).",
    },
    {
      id: `${lessonId}-cplx-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ម៉ូឌុល និងអាគុយម៉ង់នៃចំនួនកុំផ្លិច",
      stage_name_en: "Stage 2 • Modulus & Argument of Complex Numbers",
      prompt_km: "ចំពោះចំនួនកុំផ្លិច z = a + bi តើម៉ូឌុល |z| កំណត់ដោយរូបមន្តណា?",
      prompt_en: "For a complex number z = a + bi, which formula defines its modulus |z|?",
      options_km: [
        "|z| = √(a² + b²) (ចម្ងាយពីចំណុចគល់ O ទៅរូបភាព M(a, b))",
        "|z| = a + b",
        "|z| = a² + b²",
        "|z| = √(a - b)",
      ],
      options_en: [
        "|z| = √(a² + b²) (Euclidean distance from origin O to affix point M(a, b))",
        "|z| = a + b",
        "|z| = a² + b²",
        "|z| = √(a - b)",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចទ្រឹស្តីបទពីតាក័រ៖ ម៉ូឌុលគឺជាប្រវែងអ៊ីប៉ូតេនុសនៃត្រីកោណកែងដែលមានជ្រុង a និង b។",
      scientific_analogy_en: "Like Pythagoras: the modulus is the hypotenuse vector length with sides a and b.",
      formula_badge: "|z| = √(a² + b²)",
      socratic_clue_km: "ម៉ូឌុលគឺជាឫសការេនៃផលបូកការេផ្នែកពិត និងផ្នែកនិម្មិត។",
      socratic_clue_en: "Modulus is the square root of the sum of squared real and imaginary parts.",
      explanation_km: "ម៉ូឌុលនៃ z = a + bi គឺ |z| = r = √(a² + b²) ≥ 0។",
      explanation_en: "The modulus represents magnitude: |z| = √(Re(z)² + Im(z)²).",
    },
    {
      id: `${lessonId}-cplx-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ជំហានបំប្លែងទម្រង់ពិជគណិតទៅជាទម្រង់ត្រីកោណមាត្រ",
      stage_name_en: "Stage 3 • Conversion to Trigonometric Form",
      prompt_km: "ចូររៀបចំ ៤ ជំហានដើម្បីបំប្លែង z = 1 + i√3 ទៅជាទម្រង់ត្រីកោណមាត្រ៖",
      prompt_en: "Arrange the 4 steps to convert z = 1 + i√3 into trigonometric form:",
      steps_km: [
        "គណនាម៉ូឌុល r = √(1² + (√3)²) = √(1 + 3) = √4 = 2",
        "គណនា cos θ = a/r = 1/2 និង sin θ = b/r = √3/2",
        "កំណត់អាគុយម៉ង់ θ = π/3 (ព្រោះ cos θ > 0 និង sin θ > 0 ក្នុងកាដ្រង់ទី ១)",
        "សរសេរទម្រង់ត្រីកោណមាត្រ៖ z = 2(cos(π/3) + i sin(π/3))",
      ],
      steps_en: [
        "Calculate modulus r = √(1² + (√3)²) = √4 = 2",
        "Determine angle components: cos θ = 1/2, sin θ = √3/2",
        "Identify principal argument θ = π/3 in quadrant I",
        "Assemble trigonometric form: z = 2(cos(π/3) + i sin(π/3))",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "z = r(cos θ + i sin θ)",
      socratic_clue_km: "រក r=2 -> រក cos=1/2, sin=√3/2 -> ទាញរក θ=π/3 -> សរសេរ 2(cos π/3 + i sin π/3)។",
      socratic_clue_en: "Compute r=2 -> trig ratios -> argument π/3 -> assemble polar expression.",
      explanation_km: "ទម្រង់ត្រីកោណមាត្រ z = r(cos θ + i sin θ) ជួយឱ្យការគណនាស្វ័យគុណតាមដឺម័រមានភាពរហ័ស។",
      explanation_en: "Trigonometric form enables effortless powers via De Moivre's formula.",
    },
    {
      id: `${lessonId}-cplx-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាម៉ូឌុលជាក់ស្តែង",
      stage_name_en: "Stage 4 • Modulus Calculation",
      prompt_km: "គណនាម៉ូឌុលនៃចំនួនកុំផ្លិច z = 3 + 4i ៖",
      prompt_en: "Calculate the modulus of the complex number z = 3 + 4i:",
      given_values_km: [
        { label: "ផ្នែកពិត (a)", value: "3" },
        { label: "ផ្នែកនិម្មិត (b)", value: "4" },
      ],
      given_values_en: [
        { label: "Real Part (a)", value: "3" },
        { label: "Imaginary Part (b)", value: "4" },
      ],
      options_km: [
        "5 (តាមរូបមន្ត √(3² + 4²) = √(9 + 16) = √25 = 5)",
        "7 (ច្រឡំបូក 3 + 4)",
        "25",
        "1",
      ],
      options_en: [
        "5 (via √(3² + 4²) = √(9 + 16) = √25 = 5)",
        "7 (confusing with 3 + 4)",
        "25",
        "1",
      ],
      correct_index: 0,
      formula_badge: "|z| = 5",
      socratic_clue_km: "ការ៉េ 3 បាន 9 ការ៉េ 4 បាន 16៖ 9 + 16 = 25 រួចបំពាក់ឫសការេស្មើ 5។",
      socratic_clue_en: "3 squared is 9, 4 squared is 16: √(9 + 16) = √25 = 5.",
      explanation_km: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5។",
      explanation_en: "|z| = √(3² + 4²) = √25 = 5.",
    },
  ];
}

// ==============================================================================
// 2. GRADE 10 MATHEMATICS
// ==============================================================================

export function getG10ParabolaDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-para-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគកូអរដោនេកំពូលប៉ារ៉ាបូល",
      stage_name_en: "Stage 1 • Parabola Vertex Synthesizer",
      prompt_km: "ចូរផ្គុំកូអរដោនេកំពូល S នៃប៉ារ៉ាបូល y = ax² + bx + c លើរនាំងសមីការ៖",
      prompt_en: "Assemble the vertex coordinates S of parabola y = ax² + bx + c:",
      spoken_theorem_km: "កំពូល អេស មានកូអរដោនេ ដក បេ លើ ពីរ អា និង ដក ដេលតា លើ បួន អា",
      spoken_theorem_en: "Vertex S has coordinates minus b over two a and minus Delta over four a",
      variables_pool: [
        { id: "pv1", symbol: "S(", name_km: "កំពូល S", name_en: "Vertex S", unit: "Point" },
        { id: "pv2", symbol: "-b / (2a)", name_km: "អាប់ស៊ីស x", name_en: "abscissa x", unit: "X-coord" },
        { id: "pv3", symbol: ",", name_km: "ក្បៀស", name_en: "comma", unit: "Separator", category: "operator" },
        { id: "pv4", symbol: "-Δ / (4a)", name_km: "អរដោនេ y", name_en: "ordinate y", unit: "Y-coord" },
        { id: "pv5", symbol: ")", name_km: "វង់ក្រចកបិទ", name_en: "close bracket", unit: "Bracket" },
        { id: "pv6", symbol: "b / a", name_km: "ផលបូកឬស", name_en: "distractor", unit: "Distractor" },
      ],
      target_sequence_ids: ["pv1", "pv2", "pv3", "pv4", "pv5"],
      formula_badge: "S(-b/2a, -Δ/4a)",
      socratic_clue_km: "កំពូលប៉ារ៉ាបូលមានអាប់ស៊ីស x = -b/(2a) និងអរដោនេ y = -Δ/(4a)។",
      socratic_clue_en: "Parabola vertex coordinates are given by x = -b/(2a) and y = -Δ/(4a).",
      explanation_km: "ក្រាហ្វនៃ y = ax² + bx + c ជាប៉ារ៉ាបូលមានកំពូល S(-b/2a, -Δ/4a) និងអ័ក្សឆ្លុះ x = -b/2a។",
      explanation_en: "The vertex S(-b/(2a), -Δ/(4a)) is the turning point of the quadratic parabola.",
    },
    {
      id: `${lessonId}-para-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ភាពកោង និងអ័ក្សឆ្លុះនៃប៉ារ៉ាបូល",
      stage_name_en: "Stage 2 • Parabola Concavity & Symmetry",
      prompt_km: "ចំពោះប៉ារ៉ាបូល y = ax² + bx + c តើមេគុណ a កំណត់ទិសដៅភាពកោងយ៉ាងដូចម្តេច?",
      prompt_en: "For parabola y = ax² + bx + c, how does leading coefficient a determine concavity?",
      options_km: [
        "បើ a > 0 ប៉ារ៉ាបូលបែរភាពកោងឡើងលើ (មានអប្បបរមា) ហើយបើ a < 0 បែរចុះក្រោម (មានអតិបរមា)",
        "បើ a > 0 ប៉ារ៉ាបូលជាបន្ទាត់ត្រង់កាត់គល់អ័ក្ស",
        "មេគុណ a គ្មានឥទ្ធិពលលើរូបរាងក្រាហ្វទេ",
        "ប៉ារ៉ាបូលតែងតែបែរទៅស្តាំជានិច្ច",
      ],
      options_en: [
        "If a > 0, opens upwards with a minimum; if a < 0, opens downwards with a maximum",
        "If a > 0, the graph degenerates into a straight line",
        "Coefficient a has zero influence on graph geometry",
        "Parabolas always open horizontally rightwards",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចពែងទឹក៖ a > 0 ដូចពែងផ្ងារឡើង (ដាក់ទឹកបាន មានបាតអប្បបរមា), a < 0 ដូចពែងផ្កាប់ (ទឹកហូរចេញ មានកំពូលអតិបរមា)។",
      scientific_analogy_en: "Like a cup: a > 0 holds water with a bottom minimum; a < 0 sheds water with a top peak maximum.",
      formula_badge: "a > 0 ➔ ∪ | a < 0 ➔ ∩",
      socratic_clue_km: "a វិជ្ជមាន -> ផ្ងារឡើងលើ (អប្បបរមា); a អវិជ្ជមាន -> ផ្កាប់ចុះក្រោម (អតិបរមា)។",
      socratic_clue_en: "Positive a curves up (min); negative a curves down (max).",
      explanation_km: "សញ្ញានៃ a កំណត់ភាពកោង៖ a > 0 ក្រាហ្វមានចំណុចទាបបំផុត (អប្បបរមា) ហើយ a < 0 មានចំណុចខ្ពស់បំផុត (អតិបរមា)។",
      explanation_en: "The sign of leading coefficient a controls opening direction and global extremum type.",
    },
    {
      id: `${lessonId}-para-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ៤ ជំហានសង់ក្រាបប៉ារ៉ាបូល",
      stage_name_en: "Stage 3 • 4-Step Parabola Graphing Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការសង់ក្រាបប៉ារ៉ាបូល y = x² - 4x + 3 ឱ្យបានត្រឹមត្រូវ៖",
      prompt_en: "Arrange the 4 steps to plot the parabola y = x² - 4x + 3:",
      steps_km: [
        "គណនាកំពូល S ៖ x = -b/(2a) = 2, ជំនួសចូល y = 2² - 4(2) + 3 = -1 នាំឱ្យ S(2, -1)",
        "កំណត់សមីការអ័ក្សឆ្លុះ ៖ បន្ទាត់ឈរ x = 2",
        "រកចំណុចប្រសព្វនឹងអ័ក្ស ៖ ប្រសព្វ Oy ត្រង់ (0, 3) និងប្រសព្វ Ox ត្រង់ x = 1, x = 3",
        "គូសខ្សែប៉ារ៉ាបូលកោងរលូនឆ្លងកាត់ចំណុចទាំងនោះដោយស៊ីមេទ្រីធៀបនឹងបន្ទាត់ x = 2",
      ],
      steps_en: [
        "Calculate vertex S: x = -b/(2a) = 2, evaluate y = -1 to get S(2, -1)",
        "Identify axis of symmetry: vertical line x = 2",
        "Find axis intercepts: y-intercept at (0, 3) and x-intercepts at x = 1, x = 3",
        "Draw smooth symmetrical curve through identified points about axis x = 2",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "Graph Protocol",
      socratic_clue_km: "រកកំពូល S(2, -1) -> អ័ក្ស x=2 -> ចំណុចប្រសព្វ (0,3), (1,0), (3,0) -> គូសខ្សែក្រាហ្វ។",
      socratic_clue_en: "Find vertex -> symmetry axis -> intercepts -> plot curve.",
      explanation_km: "លំដាប់ ៤ ជំហាននេះជាគ្រឹះធរណីមាត្រវិភាគថ្នាក់ទី ១០ នៃកម្មវិធីសិក្សាជាតិ MoEYS។",
      explanation_en: "This systematic protocol ensures accurate parabolic curve construction.",
    },
    {
      id: `${lessonId}-para-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាកំពូលប៉ារ៉ាបូលជាក់ស្តែង",
      stage_name_en: "Stage 4 • Vertex Coordinate Calculation",
      prompt_km: "រកកូអរដោនេកំពូល S នៃអនុគមន៍ f(x) = x² - 6x + 5 ៖",
      prompt_en: "Find the coordinates of vertex S for function f(x) = x² - 6x + 5:",
      given_values_km: [
        { label: "សមីការប៉ារ៉ាបូល", value: "y = x² - 6x + 5" },
        { label: "មេគុណ a, b, c", value: "a = 1, b = -6, c = 5" },
      ],
      given_values_en: [
        { label: "Parabola Equation", value: "y = x² - 6x + 5" },
        { label: "Coefficients", value: "a = 1, b = -6, c = 5" },
      ],
      options_km: [
        "S(3, -4) (ព្រោះ x = -(-6)/(2·1) = 3 និង y = 3² - 6(3) + 5 = -4)",
        "S(-3, 4)",
        "S(6, 5)",
        "S(0, 5)",
      ],
      options_en: [
        "S(3, -4) (via x = -(-6)/(2*1) = 3, y = 3² - 6(3) + 5 = -4)",
        "S(-3, 4)",
        "S(6, 5)",
        "S(0, 5)",
      ],
      correct_index: 0,
      formula_badge: "S(3, -4)",
      socratic_clue_km: "អាប់ស៊ីស x = -b/(2a) = -(-6)/2 = 3 រួចជំនួស x=3 រក y= -4។",
      socratic_clue_en: "x = -(-6)/(2*1) = 3; substitute into equation to get y = 9 - 18 + 5 = -4.",
      explanation_km: "x_S = -b/(2a) = 6/2 = 3; y_S = f(3) = 9 - 18 + 5 = -4 នាំឱ្យកំពូលគឺ S(3, -4)។",
      explanation_en: "Vertex abscissa x = 3 and ordinate y = f(3) = -4, giving vertex S(3, -4).",
    },
  ];
}

export function getG10VectorsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-vec-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តផលគុណស្កាលែក្នុងប្លង់",
      stage_name_en: "Stage 1 • Dot Product Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តផលគុណស្កាលែនៃវ៉ិចទ័រ u(x, y) និង v(x', y') លើរនាំងសមីការ៖",
      prompt_en: "Assemble the analytical dot product formula for u(x, y) and v(x', y'):",
      spoken_theorem_km: "ផលគុណស្កាលែ វ៉ិចទ័រ អ៊ុយ គុណ វ៉ិចទ័រ វេ ស្មើនឹង អិច គុណ អិច ព្រីម បូក អ៊ីក្រិក គុណ អ៊ីក្រិក ព្រីម",
      spoken_theorem_en: "Dot product u dot v equals x times x prime plus y times y prime",
      variables_pool: [
        { id: "v1", symbol: "u · v", name_km: "u · v", name_en: "u · v", unit: "Scalar" },
        { id: "v2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "v3", symbol: "x · x'", name_km: "x · x'", name_en: "x · x'", unit: "Product" },
        { id: "v4", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Add", category: "operator" },
        { id: "v5", symbol: "y · y'", name_km: "y · y'", name_en: "y · y'", unit: "Product" },
        { id: "v6", symbol: "-", name_km: "ដក", name_en: "minus", unit: "Distractor" },
      ],
      target_sequence_ids: ["v1", "v2", "v3", "v4", "v5"],
      formula_badge: "u · v = xx' + yy'",
      socratic_clue_km: "ផលគុណស្កាលែគណនាដោយបូកផលគុណអាប់ស៊ីស និងផលគុណអរដោនេ។",
      socratic_clue_en: "Analytical dot product is the sum of component-wise products: xx' + yy'.",
      explanation_km: "កន្សោមវិភាគនៃផលគុណស្កាលែក្នុងតម្រុយអរតូណរម៉ាល់គឺ u · v = xx' + yy'។",
      explanation_en: "The dot product in orthonormal coordinates is strictly u · v = x*x' + y*y'.",
    },
    {
      id: `${lessonId}-vec-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • លក្ខខណ្ឌកែងគ្នានៃវ៉ិចទ័រពីរ",
      stage_name_en: "Stage 2 • Orthogonality Condition",
      prompt_km: "តើវ៉ិចទ័រមិនសូន្យពីរ u និង v កែងគ្នា (u ⊥ v) លុះត្រាតែលក្ខខណ្ឌណាត្រូវបានបំពេញ?",
      prompt_en: "Two nonzero vectors u and v are orthogonal (u ⊥ v) if and only if which condition holds?",
      options_km: [
        "ផលគុណស្កាលែស្មើនឹងសូន្យ ៖ u · v = 0 (ឬ xx' + yy' = 0)",
        "ប្រវែងវ៉ិចទ័រទាំងពីរស្មើគ្នា",
        "ផលបូកវ៉ិចទ័រស្មើនឹងសូន្យ",
        "មេគុណប្រាប់ទិសស្មើគ្នា",
      ],
      options_en: [
        "Their dot product is zero: u · v = 0 (i.e., xx' + yy' = 0)",
        "Both vector lengths are identical",
        "Their vector sum is zero",
        "Their slopes are equal",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចមុំកែង 90° ៖ cos(90°) = 0 នាំឱ្យ u · v = |u||v|cos(90°) = 0។",
      scientific_analogy_en: "Cos of 90° is zero: u · v = |u||v|cos(90°) = 0.",
      formula_badge: "u ⊥ v ⟺ u · v = 0",
      socratic_clue_km: "វ៉ិចទ័រកែងគ្នា <-> ផលគុណស្កាលែស្មើ 0។",
      socratic_clue_en: "Orthogonal vectors have zero dot product.",
      explanation_km: "u ⊥ v ⟺ u · v = 0 ⟺ xx' + yy' = 0 ព្រោះ cos(90°) = 0។",
      explanation_en: "Two vectors are perpendicular if and only if their scalar dot product vanishes.",
    },
    {
      id: `${lessonId}-vec-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ជំហានគណនាប្រវែងវ៉ិចទ័រ និងផលគុណស្កាលែ",
      stage_name_en: "Stage 3 • Vector Norm & Angle Derivation",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការរកមុំ θ រវាងវ៉ិចទ័រពីរ u និង v៖",
      prompt_en: "Arrange the 4 steps to determine the angle θ between vectors u and v:",
      steps_km: [
        "គណនាផលគុណស្កាលែ u · v = xx' + yy'",
        "គណនាប្រវែង (Norm) នៃវ៉ិចទ័រនីមួយៗ ៖ ||u|| = √(x² + y²) និង ||v|| = √(x'² + y'²)",
        "ប្រើរូបមន្ត cos θ = (u · v) / (||u|| · ||v||)",
        "ទាញរកមុំ θ = arccos(...) ក្នុងចន្លោះ [0, π]",
      ],
      steps_en: [
        "Calculate scalar product u · v = xx' + yy'",
        "Compute individual norms: ||u|| = √(x² + y²) and ||v|| = √(x'² + y'²)",
        "Apply geometric identity cos θ = (u · v) / (||u|| · ||v||)",
        "Deduce enclosed angle θ = arccos(...) in [0, π]",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "cos θ = (u·v)/(||u|| ||v||)",
      socratic_clue_km: "គណនា u·v -> គណនាប្រវែង ||u||, ||v|| -> ជំនួសក្នុង cos θ -> រកមុំ θ។",
      socratic_clue_en: "Dot product -> Norms -> Cosine ratio -> Enclosed angle.",
      explanation_km: "រូបមន្ត cos θ = (u · v) / (||u|| ||v||) អនុវត្តបានទាំងក្នុងប្លង់ និងក្នុងលំហ។",
      explanation_en: "The cosine formula determines the exact planar angle between two non-zero vectors.",
    },
    {
      id: `${lessonId}-vec-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាផលគុណស្កាលែជាក់ស្តែង",
      stage_name_en: "Stage 4 • Dot Product Evaluation",
      prompt_km: "គណនាផលគុណស្កាលែនៃវ៉ិចទ័រ u(3, 4) និង v(2, -1) ៖",
      prompt_en: "Calculate the dot product of vectors u(3, 4) and v(2, -1):",
      given_values_km: [
        { label: "វ៉ិចទ័រ u", value: "(3, 4)" },
        { label: "វ៉ិចទ័រ v", value: "(2, -1)" },
      ],
      given_values_en: [
        { label: "Vector u", value: "(3, 4)" },
        { label: "Vector v", value: "(2, -1)" },
      ],
      options_km: [
        "2 (តាមរូបមន្ត 3(2) + 4(-1) = 6 - 4 = 2)",
        "10",
        "-2",
        "6",
      ],
      options_en: [
        "2 (via 3*2 + 4*(-1) = 6 - 4 = 2)",
        "10",
        "-2",
        "6",
      ],
      correct_index: 0,
      formula_badge: "u · v = 2",
      socratic_clue_km: "គុណអាប់ស៊ីស 3·2 = 6, គុណអរដោនេ 4·(-1) = -4៖ 6 + (-4) = 2។",
      socratic_clue_en: "Multiply x-components (3*2 = 6) and y-components (4*-1 = -4): 6 - 4 = 2.",
      explanation_km: "u · v = 3 · 2 + 4 · (-1) = 6 - 4 = 2។",
      explanation_en: "u · v = 3(2) + 4(-1) = 6 - 4 = 2.",
    },
  ];
}

// ==============================================================================
// 3. GRADE 11 MATHEMATICS
// ==============================================================================

export function getG11SequencesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-seq-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តតួទូទៅនៃស្វ៊ីតនព្វន្ត",
      stage_name_en: "Stage 1 • Arithmetic Progression Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តតួទូទៅ uₙ នៃស្វ៊ីតនព្វន្តដែលមានតួទីមួយ u₁ និងផលសងរួម d ៖",
      prompt_en: "Assemble the general term formula u_n for an arithmetic progression:",
      spoken_theorem_km: "តួទូទៅ អ៊ុយ អិន ស្មើនឹង អ៊ុយ មួយ បូក កត្តា អិន ដក មួយ គុណនឹង ដេ",
      spoken_theorem_en: "General term u_n equals u_1 plus n minus one times d",
      variables_pool: [
        { id: "s1", symbol: "uₙ", name_km: "តួទី n", name_en: "u_n", unit: "Term" },
        { id: "s2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "s3", symbol: "u₁", name_km: "តួទីមួយ", name_en: "u_1", unit: "First Term" },
        { id: "s4", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Add", category: "operator" },
        { id: "s5", symbol: "(n - 1)", name_km: "កត្តា n-1", name_en: "factor (n-1)", unit: "Steps" },
        { id: "s6", symbol: "· d", name_km: "គុណនឹងផលសង d", name_en: "times d", unit: "Common Difference" },
      ],
      target_sequence_ids: ["s1", "s2", "s3", "s4", "s5", "s6"],
      formula_badge: "uₙ = u₁ + (n - 1)d",
      socratic_clue_km: "ស្វ៊ីតនព្វន្តកើនឡើងដោយការបូកថេរ d ចំនួន (n - 1) ដង។",
      socratic_clue_en: "An arithmetic progression adds constant difference d exactly (n - 1) times.",
      explanation_km: "តួទូទៅនៃស្វ៊ីតនព្វន្តគឺ uₙ = u₁ + (n - 1)d ដែល d = uₙ₊₁ - uₙ ជាផលសងរួម។",
      explanation_en: "Arithmetic sequence formula: u_n = u_1 + (n - 1)d with common difference d.",
    },
    {
      id: `${lessonId}-seq-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ភាពខុសគ្នារវាងស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ",
      stage_name_en: "Stage 2 • Arithmetic vs Geometric Progression",
      prompt_km: "តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានរវាងស្វ៊ីតនព្វន្ត (AP) និងស្វ៊ីតធរណីមាត្រ (GP)?",
      prompt_en: "What is the core distinction between an arithmetic (AP) and a geometric progression (GP)?",
      options_km: [
        "ស្វ៊ីតនព្វន្តកើតឡើងដោយការបូកចំនួនថេរ d (ផលសងរួម) រីឯស្វ៊ីតធរណីមាត្រកើតឡើងដោយការគុណចំនួនថេរ q (ផលធៀបរួម)",
        "ស្វ៊ីតទាំងពីរមានរូបមន្តដូចគ្នាគ្មានអ្វីខុសគ្នាទេ",
        "ស្វ៊ីតធរណីមាត្រប្រើសម្រាប់តែលេខអវិជ្ជមាន",
        "ស្វ៊ីតនព្វន្តមិនអាចគណនាផលបូកបានឡើយ",
      ],
      options_en: [
        "AP advances by adding constant difference d, while GP advances by multiplying constant ratio q",
        "Both progressions share identical algebraic properties",
        "GP applies strictly to negative numbers",
        "AP cannot be summed over finite intervals",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចជណ្តើរ និងការរីកធំធាត់នៃកោសិកា៖ ជណ្តើរឡើងមួយកាំៗស្មើគ្នា (AP), កោសិកាបំបែកជាពីរជាបួន (GP)។",
      scientific_analogy_en: "Like steps vs cell division: steps add fixed height (AP); cells double exponentially (GP).",
      formula_badge: "AP: +d | GP: ×q",
      socratic_clue_km: "នព្វន្តបូក d ថេរ; ធរណីមាត្រគុណ q ថេរ។",
      socratic_clue_en: "Arithmetic adds d; geometric multiplies q.",
      explanation_km: "ក្នុងស្វ៊ីតនព្វន្ត uₙ₊₁ = uₙ + d, ក្នុងស្វ៊ីតធរណីមាត្រ uₙ₊₁ = uₙ · q។",
      explanation_en: "AP increments linearly via d; GP scales exponentially via ratio q.",
    },
    {
      id: `${lessonId}-seq-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ៤ ជំហានគណនាផលបូក n តួដំបូងនៃស្វ៊ីតនព្វន្ត",
      stage_name_en: "Stage 3 • Arithmetic Summation Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការគណនាផលបូក Sₙ = u₁ + u₂ + ... + uₙ ៖",
      prompt_en: "Arrange the 4 steps to compute the sum S_n of an arithmetic progression:",
      steps_km: [
        "ស្រង់តម្លៃតួទីមួយ u₁ និងផលសងរួម d",
        "គណនាតម្លៃតួចុងក្រោយ uₙ = u₁ + (n - 1)d",
        "អនុវត្តរូបមន្តផលបូក Sₙ = n(u₁ + uₙ) / 2",
        "គណនាតម្លៃលេខចុងក្រោយនៃផលបូក Sₙ",
      ],
      steps_en: [
        "Identify first term u_1 and common difference d",
        "Calculate the n-th boundary term u_n = u_1 + (n - 1)d",
        "Apply Gauss sum formula S_n = n * (u_1 + u_n) / 2",
        "Evaluate the final numerical total S_n",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "Sₙ = n(u₁ + uₙ)/2",
      socratic_clue_km: "រក u1, d -> គណនា un -> ជំនួសក្នុង S_n = n(u1 + un)/2 -> គណនាចប់។",
      socratic_clue_en: "Find u1, d -> Compute un -> Substitute in sum formula -> Final total.",
      explanation_km: "រូបមន្តហ្គោស Sₙ = n(u₁ + uₙ)/2 = n[2u₁ + (n - 1)d]/2 ផ្តល់លទ្ធផលរហ័ស 100%។",
      explanation_en: "Gauss pairing yields S_n = n*(u_1 + u_n)/2 for all finite arithmetic sequences.",
    },
    {
      id: `${lessonId}-seq-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាតួស្វ៊ីតជាក់ស្តែង",
      stage_name_en: "Stage 4 • Sequence Term Calculation",
      prompt_km: "ស្វ៊ីតនព្វន្តមួយមាន u₁ = 3 និងផលសងរួម d = 4។ គណនាតម្លៃនៃតួទី 5 (u₅) ៖",
      prompt_en: "An arithmetic progression has u_1 = 3 and common difference d = 4. Compute term u_5:",
      given_values_km: [
        { label: "តួទីមួយ (u₁)", value: "3" },
        { label: "ផលសងរួម (d)", value: "4" },
        { label: "លំដាប់តួ (n)", value: "5" },
      ],
      given_values_en: [
        { label: "First Term (u_1)", value: "3" },
        { label: "Common Difference (d)", value: "4" },
        { label: "Term Index (n)", value: "5" },
      ],
      options_km: [
        "19 (តាមរូបមន្ត u₅ = 3 + (5 - 1)·4 = 3 + 16 = 19)",
        "23",
        "15",
        "20",
      ],
      options_en: [
        "19 (via u_5 = 3 + (5 - 1)*4 = 3 + 16 = 19)",
        "23",
        "15",
        "20",
      ],
      correct_index: 0,
      formula_badge: "u₅ = 19",
      socratic_clue_km: "u₅ = u₁ + 4d = 3 + 4(4) = 3 + 16 = 19។",
      socratic_clue_en: "u_5 = 3 + 4*4 = 3 + 16 = 19.",
      explanation_km: "u₅ = u₁ + (5 - 1)d = 3 + 4 · 4 = 3 + 16 = 19។",
      explanation_en: "u_5 = 3 + 4(4) = 19.",
    },
  ];
}

// ==============================================================================
// 4. GRADE 9 MATHEMATICS (BREVET / DIPLOMA LEVEL)
// ==============================================================================

export function getG9SystemsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-sys-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគទម្រង់ទូទៅនៃប្រព័ន្ធសមីការ",
      stage_name_en: "Stage 1 • Linear System Form Synthesizer",
      prompt_km: "ចូរផ្គុំទម្រង់ស្តង់ដារនៃប្រព័ន្ធសមីការលីនេអ៊ែរមានពីរអញ្ញាត x និង y ៖",
      prompt_en: "Assemble the standard form of a 2-variable linear equation system:",
      spoken_theorem_km: "ប្រព័ន្ធសមីការ អា អិច បូក បេ អ៊ីក្រិក ស្មើ សេ",
      spoken_theorem_en: "System of equations ax plus by equals c",
      variables_pool: [
        { id: "sy1", symbol: "ax", name_km: "ax", name_en: "ax", unit: "Term" },
        { id: "sy2", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Add", category: "operator" },
        { id: "sy3", symbol: "by", name_km: "by", name_en: "by", unit: "Term" },
        { id: "sy4", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "sy5", symbol: "c", name_km: "ចំនួនថេរ c", name_en: "constant c", unit: "Constant", category: "constant" },
      ],
      target_sequence_ids: ["sy1", "sy2", "sy3", "sy4", "sy5"],
      formula_badge: "ax + by = c",
      socratic_clue_km: "ទម្រង់ស្ដង់ដារនៃសមីការបន្ទាត់ក្នុងប្រព័ន្ធសមីការគឺ ax + by = c។",
      socratic_clue_en: "The standard linear equation form is ax + by = c.",
      explanation_km: "ប្រព័ន្ធសមីការដឺក្រេទី ១ មានពីរអញ្ញាតមានទម្រង់រួម {ax + by = c ; a'x + b'y = c'}។",
      explanation_en: "A standard 2x2 linear system models two lines in the Cartesian coordinate plane.",
    },
    {
      id: `${lessonId}-sys-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ន័យធរណីមាត្រនៃចម្លើយប្រព័ន្ធសមីការ",
      stage_name_en: "Stage 2 • Geometric Meaning of System Solution",
      prompt_km: "ក្នុងប្លង់កូអរដោនេ តើគូដោះស្រាយ (x, y) នៃប្រព័ន្ធសមីការពីរបន្ទាត់តំណាងឱ្យអ្វី?",
      prompt_en: "In the coordinate plane, what does the unique solution (x, y) to a 2-variable system represent?",
      options_km: [
        "កូអរដោនេនៃចំណុចប្រសព្វរវាងបន្ទាត់ទាំងពីរ (Point of Intersection)",
        "ប្រវែងនៃបន្ទាត់ទាំងពីរ",
        "មុំដែលបន្ទាត់ទាំងពីរបង្កើតជាមួយអ័ក្សដេក",
        "ផ្ទៃក្រឡារវាងបន្ទាត់ទាំងពីរ",
      ],
      options_en: [
        "The coordinate point where the two lines intersect",
        "The infinite length of both straight lines",
        "The slope angle relative to the horizontal axis",
        "The planar area enclosed between both lines",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចផ្លូវបំបែកពីរប្រសព្វគ្នា៖ ចំណុចកាត់គ្នានោះជាកន្លែងតែមួយគត់ដែលបំពេញលក្ខខណ្ឌផ្លូវទាំងពីរ។",
      scientific_analogy_en: "Like a road intersection: the crossing point is the only location shared by both trajectories.",
      formula_badge: "Intersection Point (x, y)",
      socratic_clue_km: "ចម្លើយ (x, y) គឺជាចំណុចប្រសព្វរវាងបន្ទាត់ទាំងពីរ។",
      socratic_clue_en: "The unique solution coordinates are the geometric intersection of both lines.",
      explanation_km: "គូដោះស្រាយ (x, y) គឺជាកូអរដោនេចំណុចប្រសព្វតែមួយគត់នៃបន្ទាត់ទាំងពីរ (ករណីបន្ទាត់មិនស្របគ្នា)។",
      explanation_en: "The system's unique solution is the coordinates of the intersection point between the two lines.",
    },
    {
      id: `${lessonId}-sys-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ៤ ជំហានដោះស្រាយតាមវិធីបូកបំបាត់ (Elimination)",
      stage_name_en: "Stage 3 • Elimination Method Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយប្រព័ន្ធសមីការតាមវិធីបូកបំបាត់៖",
      prompt_en: "Arrange the 4 steps to solve a system by algebraic elimination:",
      steps_km: [
        "គុណសមីការមួយ ឬទាំងពីរដោយមេគុណសមស្របដើម្បីឱ្យមេគុណមុខអញ្ញាតមួយមានតម្លៃស្មើគ្នា ឬផ្ទុយគ្នា",
        "បូក ឬដកសមីការទាំងពីរដើម្បីបំបាត់អញ្ញាតនោះចេញ សល់សមីការមានតែមួយអញ្ញាត",
        "ដោះស្រាយសមីការមួយអញ្ញាតនោះដើម្បីរកតម្លៃអញ្ញាតទីមួយ",
        "យកតម្លៃដែលទើបតែរកឃើញជំនួសចូលសមីការដើមដើម្បីរកតម្លៃអញ្ញាតទីពីរ រួចសរសេរគូដោះស្រាយ (x, y)",
      ],
      steps_en: [
        "Multiply one or both equations by factors to make coefficients of one variable opposites",
        "Add or subtract the two equations to eliminate that variable",
        "Solve the resulting single-variable equation",
        "Substitute the found value back into either original equation to solve for the second variable",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "Elimination Method",
      socratic_clue_km: "តម្រូវមេគុណ -> បូកដកបំបាត់ -> រកអញ្ញាតទី ១ -> ជំនួសរកអញ្ញាតទី ២។",
      socratic_clue_en: "Match coefficients -> Add/subtract to eliminate -> Solve single variable -> Back-substitute.",
      explanation_km: "វិធីបូកបំបាត់ជួយកាត់បន្ថយកំហុសលេខ និងផ្តល់ល្បឿនលឿនក្នុងការប្រឡងឌីប្លូម។",
      explanation_en: "The elimination method provides rapid, error-resilient solutions on national exams.",
    },
    {
      id: `${lessonId}-sys-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាដោះស្រាយប្រព័ន្ធសមីការជាក់ស្តែង",
      stage_name_en: "Stage 4 • System Solution Evaluation",
      prompt_km: "ដោះស្រាយប្រព័ន្ធសមីការ៖ { x + y = 10 ; x - y = 4 }។ តើតម្លៃ (x, y) ស្មើប៉ុន្មាន?",
      prompt_en: "Solve the linear system: { x + y = 10 ; x - y = 4 }. What is the solution pair (x, y)?",
      given_values_km: [
        { label: "សមីការទី ១", value: "x + y = 10" },
        { label: "សមីការទី ២", value: "x - y = 4" },
      ],
      given_values_en: [
        { label: "Equation 1", value: "x + y = 10" },
        { label: "Equation 2", value: "x - y = 4" },
      ],
      options_km: [
        "(x = 7, y = 3) (បូកសមីការទាំងពីរ៖ 2x = 14 នាំឱ្យ x = 7, y = 10 - 7 = 3)",
        "(x = 8, y = 2)",
        "(x = 6, y = 4)",
        "(x = 5, y = 5)",
      ],
      options_en: [
        "(x = 7, y = 3) (add equations: 2x = 14 -> x = 7, y = 10 - 7 = 3)",
        "(x = 8, y = 2)",
        "(x = 6, y = 4)",
        "(x = 5, y = 5)",
      ],
      correct_index: 0,
      formula_badge: "(x=7, y=3)",
      socratic_clue_km: "បូកសមីការទាំងពីរ៖ (x+y) + (x-y) = 10+4 នាំឱ្យ 2x = 14 => x = 7។",
      socratic_clue_en: "Add both equations: 2x = 14 -> x = 7, so y = 10 - 7 = 3.",
      explanation_km: "បូកសមីការទាំងពីរអង្គនឹងអង្គ៖ 2x = 14 នាំឱ្យ x = 7។ ជំនួស x = 7 ចូលសមីការទី ១៖ y = 10 - 7 = 3។ គូដោះស្រាយគឺ (7, 3)។",
      explanation_en: "Adding both equations yields 2x = 14 => x = 7. Then y = 10 - 7 = 3.",
    },
  ];
}

// ==============================================================================
// 5. GRADE 8 MATHEMATICS
// ==============================================================================

export function getG8RationalDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-rat-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគនិយមន័យចំនួនសនិទាន",
      stage_name_en: "Stage 1 • Rational Number Definition Synthesizer",
      prompt_km: "ចូរផ្គុំទម្រង់គណិតវិទ្យានៃចំនួនសនិទាន a/b លើរនាំងសមីការ៖",
      prompt_en: "Assemble the standard definition of a rational number a/b:",
      spoken_theorem_km: "ចំនួនសនិទាន អា លើ បេ ដែល បេ ខុសពីសូន្យ",
      spoken_theorem_en: "Rational number a over b where b is not equal to zero",
      variables_pool: [
        { id: "rn1", symbol: "a", name_km: "ចំនួនគត់ a", name_en: "integer a", unit: "Numerator" },
        { id: "rn2", symbol: "/", name_km: "ចែកនឹង", name_en: "divided by", unit: "Division", category: "operator" },
        { id: "rn3", symbol: "b", name_km: "ចំនួនគត់ b", name_en: "integer b", unit: "Denominator" },
        { id: "rn4", symbol: "(b ≠ 0)", name_km: "លក្ខខណ្ឌ b ខុសពី 0", name_en: "constraint b ≠ 0", unit: "Condition" },
      ],
      target_sequence_ids: ["rn1", "rn2", "rn3", "rn4"],
      formula_badge: "Q = {a/b | a, b ∈ Z, b ≠ 0}",
      socratic_clue_km: "ចំនួនសនិទានអាចសរសេរជាផលធៀប a/b ដោយភាគបែង b មិនអាចសូន្យឡើយ។",
      socratic_clue_en: "A rational number is any fraction a/b where denominator b is nonzero.",
      explanation_km: "សំណុំចំនួនសនិទាន ℚ គឺជាសំណុំចំនួនដែលអាចសរសេរជាទម្រង់ប្រភាគ a/b ដែល a, b ∈ ℤ និង b ≠ 0។",
      explanation_en: "Rational numbers can be written as a fraction of two integers with non-zero denominator.",
    },
    {
      id: `${lessonId}-rat-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ភាពខុសគ្នារវាងចំនួនសនិទាន និងអសនិទាន",
      stage_name_en: "Stage 2 • Rational vs Irrational Numbers",
      prompt_km: "តើតម្លៃណាខាងក្រោមនេះជាចំនួនអសនិទាន (Irrational Number)?",
      prompt_en: "Which of the following is an irrational number?",
      options_km: [
        "√2 និង π (ជាទសភាគមិនកំណត់ និងមិនខួប)",
        "3/4 (ប្រភាគសនិទាន)",
        "0.333... (ទសភាគខួប ស្មើ 1/3)",
        "-7 (ចំនួនគត់រ៉ឺឡាទីវ)",
      ],
      options_en: [
        "√2 and π (infinite non-repeating decimal expansions)",
        "3/4 (finite terminating rational fraction)",
        "0.333... (repeating rational decimal equal to 1/3)",
        "-7 (rational integer)",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចលេខកូដមិនចេះចប់មិនចេះហើយ៖ ចំនួនអសនិទានមិនអាចសរសេរជាប្រភាគ a/b បានឡើយ។",
      scientific_analogy_en: "Like an endless non-repeating sequence: irrational numbers cannot be expressed as a/b.",
      formula_badge: "√2, π ∉ ℚ",
      socratic_clue_km: "√2 និង π មិនអាចសរសេរជាប្រភាគ a/b ឡើយ ទើបជាចំនួនអសនិទាន។",
      socratic_clue_en: "√2 and π cannot be expressed as a ratio of integers.",
      explanation_km: "ចំនួនអសនិទានមានកន្ទុយទសភាគមិនកំណត់ និងគ្មានខួប ដូចជា √2, √3, π ជាដើម។",
      explanation_en: "Irrational numbers have infinite non-periodic decimal digits that never terminate.",
    },
    {
      id: `${lessonId}-rat-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ៤ ជំហានសម្រួលកន្សោមរ៉ាឌីកាល់",
      stage_name_en: "Stage 3 • Radical Simplification Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការសម្រួលកន្សោមរ៉ាឌីកាល់ √72 ៖",
      prompt_en: "Arrange the 4 steps to simplify the radical expression √72:",
      steps_km: [
        "បំបែកលេខ 72 ជាផលគុណកត្តាដែលមានការេពេញលេញ ៖ 72 = 36 × 2",
        "អនុវត្តរូបមន្ត √(A × B) = √A × √B ៖ √72 = √(36 × 2) = √36 × √2",
        "គណនាឫសការេពេញលេញ ៖ √36 = 6",
        "សរសេរលទ្ធផលចុងក្រោយសម្រួលរួច ៖ 6√2",
      ],
      steps_en: [
        "Factor 72 using largest perfect square: 72 = 36 * 2",
        "Apply radical product rule: √72 = √(36 * 2) = √36 * √2",
        "Extract perfect square root: √36 = 6",
        "State final simplified radical: 6√2",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "√72 = 6√2",
      socratic_clue_km: "បំបែក 72 = 36 × 2 -> បញ្ចេញ √36 = 6 -> បាន 6√2។",
      socratic_clue_en: "72 = 36 * 2 -> extract √36 = 6 -> result 6√2.",
      explanation_km: "√72 = √(36 · 2) = √36 · √2 = 6√2 ព្រោះ 36 ជាការេពេញលេញធំបំផុត។",
      explanation_en: "Factoring out perfect square 36 yields √72 = 6√2.",
    },
    {
      id: `${lessonId}-rat-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាប្រមាណវិធីលើរ៉ាឌីកាល់",
      stage_name_en: "Stage 4 • Radical Calculation",
      prompt_km: "គណនាតម្លៃនៃកន្សោម៖ √64 + √25 = ?",
      prompt_en: "Calculate the value of the expression: √64 + √25 = ?",
      given_values_km: [
        { label: "តួទី ១", value: "√64" },
        { label: "តួទី ២", value: "√25" },
      ],
      given_values_en: [
        { label: "First Term", value: "√64" },
        { label: "Second Term", value: "√25" },
      ],
      options_km: ["13 (8 + 5 = 13)", "89", "11", "√89"],
      options_en: ["13 (8 + 5 = 13)", "89", "11", "√89"],
      correct_index: 0,
      formula_badge: "8 + 5 = 13",
      socratic_clue_km: "√64 = 8 និង √25 = 5 នាំឱ្យ 8 + 5 = 13។",
      socratic_clue_en: "√64 = 8, √25 = 5, thus 8 + 5 = 13.",
      explanation_km: "√64 = 8 និង √25 = 5 នាំឱ្យ 8 + 5 = 13។",
      explanation_en: "√64 = 8, √25 = 5. Therefore 8 + 5 = 13.",
    },
  ];
}


// ==============================================================================
// 5. GRADE 8 MATHEMATICS EXPANDED TOPIC DECKS (MOEYS STRATIFIED)
// ==============================================================================

// G8 Math 02: Algebraic Identities (រូបមន្តពន្លាតពីជគណិត)
export function getG8IdentitiesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-id-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តការេនៃផលបូក",
      stage_name_en: "Stage 1 • Square of Binomial Sum Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តពន្លាតការេនៃផលបូក (a + b)² លើរនាំងសមីការ៖",
      prompt_en: "Assemble the binomial expansion formula (a + b)² on the equation rail:",
      spoken_theorem_km: "អា បូក បេ លើកជាការេ ស្មើនឹង អាការេ បូក ពីរដង អា បេ បូក បេការេ",
      spoken_theorem_en: "a plus b squared equals a squared plus two a b plus b squared",
      variables_pool: [
        { id: "i1", symbol: "(a + b)²", name_km: "(a + b)²", name_en: "(a + b)²", unit: "Binomial" },
        { id: "i2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "i3", symbol: "a²", name_km: "a²", name_en: "a²", unit: "First Term" },
        { id: "i4", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Operator", category: "operator" },
        { id: "i5", symbol: "2ab", name_km: "2ab", name_en: "2ab", unit: "Middle Term" },
        { id: "i6", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Operator", category: "operator" },
        { id: "i7", symbol: "b²", name_km: "b²", name_en: "b²", unit: "Last Term" },
      ],
      target_sequence_ids: ["i1", "i2", "i3", "i4", "i5", "i6", "i7"],
      formula_badge: "(a + b)² = a² + 2ab + b²",
      socratic_clue_km: "កុំភ្លេចតួកណ្តាលពីរដងផលគុណ 2ab!",
      socratic_clue_en: "Do not forget the doubled middle cross-term 2ab!",
      explanation_km: "(a + b)² = a² + 2ab + b² ជាសមភាពគួរចងចាំទី ១ ក្នុងកម្មវិធីថ្នាក់ទី ៨ MoEYS។",
      explanation_en: "(a + b)² = a² + 2ab + b² is the 1st standard algebraic identity in MoEYS Grade 8.",
    },
    {
      id: `${lessonId}-id-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាពន្លាតកន្សោមជាក់ស្តែង",
      stage_name_en: "Stage 2 • Expand Binomial Identity",
      prompt_km: "ចូរគណនាពន្លាតនៃកន្សោមពីជគណិត៖ (2x + 3)² = ?",
      prompt_en: "Evaluate the binomial expansion: (2x + 3)² = ?",
      options_km: [
        "4x² + 12x + 9 (តាមរូបមន្ត a² + 2ab + b²)",
        "4x² + 9 (ភ្លេចតួកណ្តាល 2ab)",
        "2x² + 6x + 9",
        "4x² + 6x + 9",
      ],
      options_en: [
        "4x² + 12x + 9 (via a² + 2ab + b²)",
        "4x² + 9 (missing middle cross-term)",
        "2x² + 6x + 9",
        "4x² + 6x + 9",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចផ្ទៃក្រឡាការ៉េធំមួយ៖ ផ្សំឡើងពីការ៉េតូចពីរ (4x² និង 9) និងចតុកោណកែងពីរ (6x + 6x = 12x)។",
      scientific_analogy_en: "Geometric area of a subdivided square: sum of two squares and two identical rectangles.",
      formula_badge: "(2x + 3)² = 4x² + 12x + 9",
      socratic_clue_km: "a = 2x នាំឱ្យ a² = 4x²; 2ab = 2(2x)(3) = 12x; b² = 3² = 9។",
      socratic_clue_en: "a = 2x -> a² = 4x²; 2ab = 2(2x)(3) = 12x; b² = 9.",
      explanation_km: "(2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9។",
      explanation_en: "(2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9.",
    },
    {
      id: `${lessonId}-id-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានគណនាផលដកការេ",
      stage_name_en: "Stage 3 • 4-Step Difference of Squares Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការគណនាពន្លាត (3x - 5)(3x + 5) ឱ្យបានត្រឹមត្រូវ៖",
      prompt_en: "Arrange the 4 steps to evaluate the product (3x - 5)(3x + 5):",
      steps_km: [
        "កំណត់ទម្រង់រូបមន្តផលដកការេ ៖ (a - b)(a + b) = a² - b²",
        "កំណត់តម្លៃតួទីមួយ a = 3x និងតួទីពីរ b = 5",
        "លើកជាការេលើតួនីមួយៗ ៖ (3x)² = 9x² និង 5² = 25",
        "សរសេរចម្លើយសម្រេច ៖ 9x² - 25",
      ],
      steps_en: [
        "Identify difference of squares identity: (a - b)(a + b) = a² - b²",
        "Identify terms: a = 3x and b = 5",
        "Square each individual term: (3x)² = 9x² and 5² = 25",
        "Write final simplified expression: 9x² - 25",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "(3x-5)(3x+5) = 9x² - 25",
      socratic_clue_km: "(a-b)(a+b) = a² - b² នាំឱ្យ (3x)² - 5² = 9x² - 25។",
      socratic_clue_en: "(a - b)(a + b) = a² - b² leads to (3x)² - 5² = 9x² - 25.",
      explanation_km: "រូបមន្តផលដកការេពីរតួ៖ a² - b² = (a - b)(a + b)។",
      explanation_en: "Standard difference of squares identity: a² - b² = (a - b)(a + b).",
    },
    {
      id: `${lessonId}-id-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនារហ័សតាមរូបមន្តពន្លាត",
      stage_name_en: "Stage 4 • Mental Math via Binomial Identity",
      prompt_km: "ប្រើរូបមន្ត (a + b)² ដើម្បីគណនាតម្លៃលេខ៖ 101² = (100 + 1)² = ?",
      prompt_en: "Use (a + b)² to calculate mentally: 101² = (100 + 1)² = ?",
      given_values_km: [
        { label: "ការេទីមួយ a²", value: "100² = 10,000" },
        { label: "ពីរដងផលគុណ 2ab", value: "2(100)(1) = 200" },
        { label: "ការេទីពីរ b²", value: "1² = 1" },
      ],
      given_values_en: [
        { label: "First square a²", value: "100² = 10,000" },
        { label: "Cross-term 2ab", value: "2(100)(1) = 200" },
        { label: "Second square b²", value: "1² = 1" },
      ],
      options_km: [
        "10,201 (10,000 + 200 + 1 = 10,201)",
        "10,101",
        "10,001",
        "10,401",
      ],
      options_en: [
        "10,201 (10,000 + 200 + 1 = 10,201)",
        "10,101",
        "10,001",
        "10,401",
      ],
      correct_index: 0,
      formula_badge: "101² = 10,201",
      socratic_clue_km: "10,000 + 200 + 1 = 10,201។",
      socratic_clue_en: "10,000 + 200 + 1 = 10,201.",
      explanation_km: "101² = (100 + 1)² = 100² + 2(100)(1) + 1² = 10,000 + 200 + 1 = 10,201។",
      explanation_en: "101² = (100 + 1)² = 10,000 + 200 + 1 = 10,201.",
    },
  ];
}

// G8 Math 06: Polynomial Factoring (ផលគុណកត្តា)
export function getG8FactoringDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-fac-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តចាប់កត្តារួម",
      stage_name_en: "Stage 1 • Common Factor Factoring Synthesizer",
      prompt_km: "ចូរផ្គុំកន្សោមដាក់ជាផលគុណកត្តានៃ 3x² + 6x លើរនាំងសមីការ៖",
      prompt_en: "Assemble the factored form of 3x² + 6x on the equation rail:",
      spoken_theorem_km: "បី អិច ការេ បូក ប្រាំមួយ អិច ស្មើនឹង បី អិច កត្តា អិច បូក ពីរ",
      spoken_theorem_en: "Three x squared plus six x equals three x times x plus two",
      variables_pool: [
        { id: "f1", symbol: "3x² + 6x", name_km: "3x² + 6x", name_en: "3x² + 6x", unit: "Polynomial" },
        { id: "f2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "f3", symbol: "3x", name_km: "3x (កត្តារួម)", name_en: "3x (Common factor)", unit: "Factor" },
        { id: "f4", symbol: "(x + 2)", name_km: "(x + 2)", name_en: "(x + 2)", unit: "Binomial" },
      ],
      target_sequence_ids: ["f1", "f2", "f3", "f4"],
      formula_badge: "3x² + 6x = 3x(x + 2)",
      socratic_clue_km: "ទាញកត្តារួមអតិបរមា 3x ចេញក្រៅវង់ក្រចក។",
      socratic_clue_en: "Factor out the greatest common factor 3x.",
      explanation_km: "3x² + 6x = 3x(x) + 3x(2) = 3x(x + 2)។",
      explanation_en: "3x² + 6x = 3x(x) + 3x(2) = 3x(x + 2).",
    },
    {
      id: `${lessonId}-fac-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ដាក់ជាផលគុណកត្តាតាម a² - b²",
      stage_name_en: "Stage 2 • Difference of Squares Factoring",
      prompt_km: "ចូរដាក់កន្សោម x² - 16 ជាផលគុណកត្តា៖",
      prompt_en: "Factor the polynomial: x² - 16 = ?",
      options_km: [
        "(x - 4)(x + 4) (តាមរូបមន្ត a² - b² = (a-b)(a+b))",
        "(x - 4)²",
        "(x + 4)²",
        "(x - 8)(x + 8)",
      ],
      options_en: [
        "(x - 4)(x + 4) (via a² - b² = (a-b)(a+b))",
        "(x - 4)²",
        "(x + 4)²",
        "(x - 8)(x + 8)",
      ],
      correct_index: 0,
      scientific_analogy_km: "ការ៉េ x² កាត់ជ្រុងការ៉េ 16 ចេញ អាចផ្គុំឡើងវិញជាចតុកោណកែងដែលមានជ្រុង (x - 4) និង (x + 4)។",
      scientific_analogy_en: "A square with a smaller square cut out can be rearranged into a rectangle of (x-4) by (x+4).",
      formula_badge: "x² - 16 = (x - 4)(x + 4)",
      socratic_clue_km: "16 = 4² នាំឱ្យ x² - 4² = (x - 4)(x + 4)។",
      socratic_clue_en: "16 = 4², so x² - 4² = (x - 4)(x + 4).",
      explanation_km: "x² - 16 = x² - 4² = (x - 4)(x + 4)។",
      explanation_en: "x² - 16 = x² - 4² = (x - 4)(x + 4).",
    },
    {
      id: `${lessonId}-fac-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានបំបែកតួកណ្តាលត្រីធា",
      stage_name_en: "Stage 3 • 4-Step Trinomial Factoring Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការបំបែកកត្តាត្រីធាដឺក្រេទី២ ៖ x² + 5x + 6",
      prompt_en: "Arrange the 4 steps to factor the quadratic trinomial: x² + 5x + 6:",
      steps_km: [
        "ស្វែងរកពីរចំនួន p និង q ដែល p + q = 5 និង p × q = 6 (បាន p = 2, q = 3)",
        "បំបែកតួកណ្តាល ៖ x² + 2x + 3x + 6",
        "ផ្តុំជាក្រុមចាប់កត្តារួម ៖ x(x + 2) + 3(x + 2)",
        "ទាញកត្តារួម (x + 2) ចេញ ៖ (x + 2)(x + 3)",
      ],
      steps_en: [
        "Find two numbers with sum = 5 and product = 6 (p = 2, q = 3)",
        "Split the middle term: x² + 2x + 3x + 6",
        "Group by pairs: x(x + 2) + 3(x + 2)",
        "Extract common binomial: (x + 2)(x + 3)",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "x² + 5x + 6 = (x+2)(x+3)",
      socratic_clue_km: "ផលបូក 5 និង ផលគុណ 6 គឺ 2 និង 3 នាំឱ្យបាន (x + 2)(x + 3)។",
      socratic_clue_en: "Sum 5 and product 6 are 2 and 3, yielding (x + 2)(x + 3).",
      explanation_km: "វិធីបំបែកតួកណ្តាលជួយដោះស្រាយសមីការដឺក្រេទី ២ បានយ៉ាងរហ័ស។",
      explanation_en: "Splitting the linear term allows factoring quadratic trinomials by grouping.",
    },
    {
      id: `${lessonId}-fac-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាតម្លៃលេខតាមការបំបែកកត្តា",
      stage_name_en: "Stage 4 • Evaluate via Factored Form",
      prompt_km: "កន្សោម A = x² - 49។ ចូរគណនាតម្លៃ A នៅពេល x = 17 ដោយប្រើផលគុណកត្តា៖",
      prompt_en: "Given A = x² - 49. Calculate A when x = 17 using its factored form:",
      given_values_km: [
        { label: "ទម្រង់ផលគុណកត្តា", value: "(x - 7)(x + 7)" },
        { label: "តម្លៃជំនួស x", value: "x = 17" },
      ],
      given_values_en: [
        { label: "Factored identity", value: "(x - 7)(x + 7)" },
        { label: "Evaluation point", value: "x = 17" },
      ],
      options_km: [
        "240 ((17 - 7)(17 + 7) = 10 × 24 = 240)",
        "289",
        "200",
        "300",
      ],
      options_en: [
        "240 ((17 - 7)(17 + 7) = 10 x 24 = 240)",
        "289",
        "200",
        "300",
      ],
      correct_index: 0,
      formula_badge: "A = 10 × 24 = 240",
      socratic_clue_km: "17 - 7 = 10 និង 17 + 7 = 24; 10 × 24 = 240។",
      socratic_clue_en: "17 - 7 = 10 and 17 + 7 = 24; 10 x 24 = 240.",
      explanation_km: "A = (x - 7)(x + 7) = (17 - 7)(17 + 7) = 10 × 24 = 240។",
      explanation_en: "A = (17 - 7)(17 + 7) = 10 x 24 = 240.",
    },
  ];
}

// G8 Math 03: Pythagorean Theorem (ទ្រឹស្តីបទពីតាក័រ)
export function getG8PythagorasDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-pyth-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តទ្រឹស្តីបទពីតាក័រ",
      stage_name_en: "Stage 1 • Pythagorean Theorem Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តទ្រឹស្តីបទពីតាក័រសម្រាប់ត្រីកោណកែង (អ៊ីប៉ូតេនុស c) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the Pythagorean theorem for a right triangle (hypotenuse c):",
      spoken_theorem_km: "សេការេ ស្មើនឹង អាការេ បូក បេការេ",
      spoken_theorem_en: "c squared equals a squared plus b squared",
      variables_pool: [
        { id: "p1", symbol: "c²", name_km: "c² (ការេអ៊ីប៉ូតេនុស)", name_en: "c² (hypotenuse squared)", unit: "Hypotenuse" },
        { id: "p2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "p3", symbol: "a²", name_km: "a² (ជ្រុងជាប់មុំកែងទី១)", name_en: "a² (leg 1 squared)", unit: "Leg 1" },
        { id: "p4", symbol: "+", name_km: "បូក", name_en: "plus", unit: "Operator", category: "operator" },
        { id: "p5", symbol: "b²", name_km: "b² (ជ្រុងជាប់មុំកែងទី២)", name_en: "b² (leg 2 squared)", unit: "Leg 2" },
      ],
      target_sequence_ids: ["p1", "p2", "p3", "p4", "p5"],
      formula_badge: "c² = a² + b²",
      socratic_clue_km: "ការេអ៊ីប៉ូតេនុសស្មើផលបូកការេនៃជ្រុងជាប់មុំកែងទាំងពីរ។",
      socratic_clue_en: "Hypotenuse squared equals the sum of squares of both legs.",
      explanation_km: "ទ្រឹស្តីបទពីតាក័រអនុវត្តចំពោះតែត្រីកោណកែងប៉ុណ្ណោះ ៖ c² = a² + b²។",
      explanation_en: "The Pythagorean theorem strictly governs right-angled triangles: c² = a² + b².",
    },
    {
      id: `${lessonId}-pyth-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាប្រវែងអ៊ីប៉ូតេនុសត្រីកោណកែង",
      stage_name_en: "Stage 2 • Calculate Hypotenuse Length",
      prompt_km: "ត្រីកោណកែង ABC មានជ្រុងជាប់មុំកែង a = 6 cm និង b = 8 cm។ គណនាប្រវែងអ៊ីប៉ូតេនុស c ៖",
      prompt_en: "A right triangle has legs a = 6 cm and b = 8 cm. Find hypotenuse c:",
      options_km: [
        "c = 10 cm (c = √(6² + 8²) = √(36 + 64) = √100 = 10)",
        "c = 14 cm (6 + 8)",
        "c = 12 cm",
        "c = √28 cm",
      ],
      options_en: [
        "c = 10 cm (c = √(6² + 8²) = √(36 + 64) = √100 = 10)",
        "c = 14 cm",
        "c = 12 cm",
        "c = √28 cm",
      ],
      correct_index: 0,
      scientific_analogy_km: "ត្រីកោណកែងគំរូ 3 - 4 - 5 គុណនឹង 2 គឺ 6 - 8 - 10 cm។",
      scientific_analogy_en: "The classic 3-4-5 right triangle scaled by factor 2 yields 6-8-10.",
      formula_badge: "c = √(36 + 64) = 10 cm",
      socratic_clue_km: "c² = 6² + 8² = 36 + 64 = 100 នាំឱ្យ c = √100 = 10 cm។",
      socratic_clue_en: "c² = 36 + 64 = 100, thus c = 10 cm.",
      explanation_km: "c = √(a² + b²) = √(36 + 64) = √100 = 10 cm។",
      explanation_en: "c = √(6² + 8²) = √100 = 10 cm.",
    },
    {
      id: `${lessonId}-pyth-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានរកជ្រុងជាប់មុំកែង",
      stage_name_en: "Stage 3 • 4-Step Leg Length Derivation",
      prompt_km: "ត្រីកោណកែងមួយមានអ៊ីប៉ូតេនុស c = 13 cm និងជ្រុងមួយ a = 5 cm។ រៀបចំ ៤ ជំហានរកជ្រុង b ៖",
      prompt_en: "A right triangle has c = 13 cm and a = 5 cm. Arrange 4 steps to find leg b:",
      steps_km: [
        "សរសេររូបមន្តទាញរកជ្រុង b ៖ b² = c² - a²",
        "ជំនួសតម្លៃលេខ ៖ b² = 13² - 5²",
        "គណនាការេ ៖ b² = 169 - 25 = 144",
        "បំពាក់ឬសការេ ៖ b = √144 = 12 cm",
      ],
      steps_en: [
        "Rearrange formula for leg b: b² = c² - a²",
        "Substitute numeric values: b² = 13² - 5²",
        "Compute difference of squares: b² = 169 - 25 = 144",
        "Extract square root: b = √144 = 12 cm",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "b = √(169 - 25) = 12 cm",
      socratic_clue_km: "b² = c² - a² = 169 - 25 = 144 នាំឱ្យ b = 12 cm។",
      socratic_clue_en: "b² = 169 - 25 = 144, so b = 12 cm.",
      explanation_km: "ត្រីកោណកែង 5 - 12 - 13 ជាត្រីកោណពីតាក័រពិសេស។",
      explanation_en: "The 5-12-13 right triangle is a fundamental Pythagorean triple.",
    },
    {
      id: `${lessonId}-pyth-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាប្រវែងជណ្តើរផ្អែកជញ្ជាំង",
      stage_name_en: "Stage 4 • Real-World Ladder Calculation",
      prompt_km: "ជណ្តើរមួយផ្អែកនឹងជញ្ជាំងផ្ទះ។ គល់ជណ្តើរនៅឆ្ងាយពីជញ្ជាំង 9 m ហើយចុងជណ្តើរប៉ះជញ្ជាំងកម្ពស់ 12 m។ គណនាប្រវែងជណ្តើរ៖",
      prompt_en: "A ladder leans against a wall. The foot is 9 m from the wall and the top reaches 12 m high. Find ladder length:",
      given_values_km: [
        { label: "ចម្ងាយពីជញ្ជាំង (a)", value: "9 m" },
        { label: "កម្ពស់ជញ្ជាំង (b)", value: "12 m" },
      ],
      given_values_en: [
        { label: "Distance from wall (a)", value: "9 m" },
        { label: "Wall height (b)", value: "12 m" },
      ],
      options_km: [
        "15 m (c = √(9² + 12²) = √(81 + 144) = √225 = 15 m)",
        "21 m (9 + 12)",
        "18 m",
        "14 m",
      ],
      options_en: [
        "15 m (c = √(9² + 12²) = √(81 + 144) = √225 = 15 m)",
        "21 m",
        "18 m",
        "14 m",
      ],
      correct_index: 0,
      formula_badge: "c = √225 = 15 m",
      socratic_clue_km: "9² + 12² = 81 + 144 = 225 នាំឱ្យ √225 = 15 m។",
      socratic_clue_en: "81 + 144 = 225, √225 = 15 m.",
      explanation_km: "ប្រវែងជណ្តើរជាអ៊ីប៉ូតេនុស c = √(9² + 12²) = √225 = 15 m។",
      explanation_en: "The ladder forms the hypotenuse: c = √(81 + 144) = 15 m.",
    },
  ];
}

// G8 Math 04: Linear Equations & Inequalities (សមីការ និងវិសមីការ)
export function getG8LinearEquationsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-eq-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តឬសសមីការដឺក្រេទី១",
      stage_name_en: "Stage 1 • Linear Equation Root Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តដោះស្រាយសមីការ ax + b = 0 (a ≠ 0) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the solution to ax + b = 0 (a != 0) on the equation rail:",
      spoken_theorem_km: "អិច ស្មើនឹង ដក បេ ចែកនឹង អា",
      spoken_theorem_en: "x equals negative b over a",
      variables_pool: [
        { id: "e1", symbol: "x", name_km: "អថេរ x", name_en: "variable x", unit: "Variable" },
        { id: "e2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "e3", symbol: "-", name_km: "សញ្ញាដក", name_en: "minus", unit: "Sign", category: "operator" },
        { id: "e4", symbol: "b", name_km: "តួថេរ b", name_en: "constant b", unit: "Constant" },
        { id: "e5", symbol: "/", name_km: "ចែកនឹង", name_en: "over", unit: "Operator", category: "operator" },
        { id: "e6", symbol: "a", name_km: "មេគុណ a", name_en: "coefficient a", unit: "Coefficient" },
      ],
      target_sequence_ids: ["e1", "e2", "e3", "e4", "e5", "e6"],
      formula_badge: "x = -b / a",
      socratic_clue_km: "បោះ b ទៅខាងស្តាំបាន -b រួចចែកនឹង a។",
      socratic_clue_en: "Move constant b across to get -b, then divide by a.",
      explanation_km: "ax + b = 0 នាំឱ្យ ax = -b នាំឱ្យ x = -b/a។",
      explanation_en: "ax + b = 0 -> ax = -b -> x = -b/a.",
    },
    {
      id: `${lessonId}-eq-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ដោះស្រាយសមីការមានមួយអញ្ញាត",
      stage_name_en: "Stage 2 • Solve Linear Equation",
      prompt_km: "ចូររកតម្លៃ x នៃសមីការ៖ 4x - 7 = 17",
      prompt_en: "Solve for x: 4x - 7 = 17",
      options_km: [
        "x = 6 (4x = 17 + 7 = 24 នាំឱ្យ x = 24/4 = 6)",
        "x = 2.5",
        "x = 5",
        "x = -6",
      ],
      options_en: [
        "x = 6 (4x = 24 -> x = 6)",
        "x = 2.5",
        "x = 5",
        "x = -6",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចតុល្យភាពជញ្ជីង៖ បូក 7 ទាំងសងខាង រួចចែកនឹង 4 ស្មើៗគ្នា។",
      scientific_analogy_en: "Balancing scales: add 7 to both sides, then divide equally by 4.",
      formula_badge: "4x = 24 ⟹ x = 6",
      socratic_clue_km: "4x = 17 + 7 = 24 នាំឱ្យ x = 6។",
      socratic_clue_en: "4x = 24 -> x = 6.",
      explanation_km: "4x - 7 = 17 នាំឱ្យ 4x = 24 នាំឱ្យ x = 6។",
      explanation_en: "4x - 7 = 17 -> 4x = 24 -> x = 6.",
    },
    {
      id: `${lessonId}-eq-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានដោះស្រាយវិសមីការប្តូរសញ្ញា",
      stage_name_en: "Stage 3 • 4-Step Inequality Sign Inversion Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការដោះស្រាយវិសមីការ ៖ -3x + 5 < 14",
      prompt_en: "Arrange the 4 steps to solve the linear inequality: -3x + 5 < 14:",
      steps_km: [
        "ផ្ទេរតួថេរ 5 ទៅខាងស្តាំ ៖ -3x < 14 - 5",
        "គណនាតម្លៃផលដក ៖ -3x < 9",
        "ចែកអង្គទាំងសងខាងនឹង -3 និងប្តូរទិសដៅសញ្ញាវិសមភាព (< ទៅជា >)",
        "សរសេរចម្លើយចុងក្រោយ ៖ x > -3",
      ],
      steps_en: [
        "Transfer constant 5: -3x < 14 - 5",
        "Evaluate right side: -3x < 9",
        "Divide both sides by -3 and reverse inequality (< to >)",
        "State final solution: x > -3",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "-3x < 9 ⟹ x > -3",
      socratic_clue_km: "វិធានមាសវិសមីការ៖ ពេលគុណ ឬចែកនឹងចំនួនអវិជ្ជមាន (-) ត្រូវត្រឡប់សញ្ញាវិសមភាព!",
      socratic_clue_en: "Golden inequality rule: multiplying or dividing by a negative number inverts the sign!",
      explanation_km: "ពេលចែកនឹង -3 សញ្ញា < ប្តូរទៅជា > នាំឱ្យ x > -3។",
      explanation_en: "Dividing by -3 flips the strictly less-than sign to strictly greater-than: x > -3.",
    },
    {
      id: `${lessonId}-eq-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាសមីការប្រភាគ",
      stage_name_en: "Stage 4 • Solve Fractional Linear Equation",
      prompt_km: "ដោះស្រាយសមីការ ៖ (2x - 3) / 5 = 3",
      prompt_en: "Solve the equation: (2x - 3) / 5 = 3",
      given_values_km: [
        { label: "សមីការដើម", value: "(2x - 3) / 5 = 3" },
        { label: "គុណខ្វែងនឹងភាគបែង 5", value: "2x - 3 = 15" },
      ],
      given_values_en: [
        { label: "Initial equation", value: "(2x - 3) / 5 = 3" },
        { label: "Cross-multiply by 5", value: "2x - 3 = 15" },
      ],
      options_km: [
        "x = 9 (2x = 18 នាំឱ្យ x = 9)",
        "x = 6",
        "x = 12",
        "x = 7.5",
      ],
      options_en: [
        "x = 9 (2x = 18 -> x = 9)",
        "x = 6",
        "x = 12",
        "x = 7.5",
      ],
      correct_index: 0,
      formula_badge: "2x = 18 ⟹ x = 9",
      socratic_clue_km: "2x - 3 = 15 នាំឱ្យ 2x = 18 នាំឱ្យ x = 9។",
      socratic_clue_en: "2x - 3 = 15 -> 2x = 18 -> x = 9.",
      explanation_km: "(2x - 3) / 5 = 3 នាំឱ្យ 2x - 3 = 15 នាំឱ្យ 2x = 18 នាំឱ្យ x = 9។",
      explanation_en: "(2x - 3) / 5 = 3 -> 2x - 3 = 15 -> 2x = 18 -> x = 9.",
    },
  ];
}

// G8 Math 08: Curved Solids Volumes (ធរណីមាត្រមាឌ ស៊ីឡាំង កោន ស្វ៊ែរ)
export function getG8VolumesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-vol-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តមាឌស៊ីឡាំង",
      stage_name_en: "Stage 1 • Cylinder Volume Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាមាឌស៊ីឡាំង (កាំបាត r, កម្ពស់ h) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the cylinder volume formula (radius r, height h):",
      spoken_theorem_km: "វី ស្មើនឹង ពី គុណនឹង អ៊ែរការេ គុណនឹង អាស់",
      spoken_theorem_en: "V equals pi r squared h",
      variables_pool: [
        { id: "v1", symbol: "V", name_km: "មាឌ V", name_en: "Volume V", unit: "Volume" },
        { id: "v2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "v3", symbol: "π", name_km: "ចំនួនថេរ ពី (pi)", name_en: "pi", unit: "Constant", category: "constant" },
        { id: "v4", symbol: "r²", name_km: "r² (ការេកាំ)", name_en: "r²", unit: "Radius squared" },
        { id: "v5", symbol: "h", name_km: "h (កម្ពស់)", name_en: "h (height)", unit: "Height" },
      ],
      target_sequence_ids: ["v1", "v2", "v3", "v4", "v5"],
      formula_badge: "V = π r² h",
      socratic_clue_km: "មាឌស៊ីឡាំងស្មើផ្ទៃក្រឡាបាត (πr²) គុណនឹងកម្ពស់ (h)។",
      socratic_clue_en: "Cylinder volume is base circular area (πr²) times height (h).",
      explanation_km: "V = π r² h ជាមាឌស្តង់ដារនៃស៊ីឡាំងបាតរង្វង់។",
      explanation_en: "V = π r² h is the standard volume of a circular cylinder.",
    },
    {
      id: `${lessonId}-vol-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាមាឌស៊ីឡាំងជាក់ស្តែង",
      stage_name_en: "Stage 2 • Calculate Cylinder Volume",
      prompt_km: "ស៊ីឡាំងមួយមានកាំបាត r = 3 cm និងកម្ពស់ h = 10 cm។ គណនាមាឌ V នៃស៊ីឡាំងនេះ៖",
      prompt_en: "A cylinder has radius r = 3 cm and height h = 10 cm. Find its volume V:",
      options_km: [
        "V = 90π cm³ (π × 3² × 10 = π × 9 × 10 = 90π)",
        "V = 30π cm³",
        "V = 60π cm³",
        "V = 180π cm³",
      ],
      options_en: [
        "V = 90π cm³ (π x 3² x 10 = 90π)",
        "V = 30π cm³",
        "V = 60π cm³",
        "V = 180π cm³",
      ],
      correct_index: 0,
      scientific_analogy_km: "ស្រមៃឃើញកាក់រាងរង្វង់ផ្ទៃ 9π ត្រួតគ្នាឡើងលើចំនួន 10 ជាន់បានមាឌ 90π cm³។",
      scientific_analogy_en: "Stacking 10 circular coin slices of area 9π yields 90π cm³.",
      formula_badge: "V = 90π cm³",
      socratic_clue_km: "r² = 3² = 9 នាំឱ្យ 9 × 10 × π = 90π cm³។",
      socratic_clue_en: "r² = 9, so 9 x 10 x π = 90π cm³.",
      explanation_km: "V = π r² h = π(3²)(10) = 90π cm³ ≈ 282.7 cm³។",
      explanation_en: "V = π r² h = π(9)(10) = 90π cm³.",
    },
    {
      id: `${lessonId}-vol-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានគណនាមាឌកោន",
      stage_name_en: "Stage 3 • 4-Step Cone Volume Derivation",
      prompt_km: "កោនមួយមានកាំបាត r = 6 cm និងកម្ពស់ h = 8 cm។ រៀបចំ ៤ ជំហានគណនាមាឌកោន ៖",
      prompt_en: "A cone has base radius r = 6 cm and height h = 8 cm. Arrange 4 steps to find volume:",
      steps_km: [
        "សរសេររូបមន្តមាឌកោន ៖ V = (1/3) π r² h",
        "គណនាការេកាំបាត ៖ r² = 6² = 36 cm²",
        "គុណនឹងកម្ពស់ ៖ 36 × 8 = 288",
        "ចែកនឹង 3 ៖ (1/3) × 288 π = 96π cm³",
      ],
      steps_en: [
        "State cone volume formula: V = (1/3) π r² h",
        "Compute base radius squared: r² = 6² = 36 cm²",
        "Multiply by height: 36 x 8 = 288",
        "Divide by 3: (1/3) x 288 π = 96π cm³",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "V = (1/3) π r² h = 96π cm³",
      socratic_clue_km: "មាឌកោនស្មើ 1/3 នៃមាឌស៊ីឡាំងដែលមានបាត និងកម្ពស់ស្មើគ្នា។",
      socratic_clue_en: "A cone occupies exactly 1/3 the volume of an equal-base cylinder.",
      explanation_km: "V = (1/3)π(36)(8) = 96π cm³។",
      explanation_en: "V = (1/3)π(36)(8) = 96π cm³.",
    },
    {
      id: `${lessonId}-vol-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាមាឌស្វ៊ែរ",
      stage_name_en: "Stage 4 • Sphere Volume Calculation",
      prompt_km: "គណនាមាឌ V នៃស្វ៊ែរមួយដែលមានកាំ r = 3 cm (រូបមន្ត V = (4/3) π r³) ៖",
      prompt_en: "Calculate volume V of a sphere with radius r = 3 cm (formula V = (4/3) π r³):",
      given_values_km: [
        { label: "កាំស្វ៊ែរ r", value: "3 cm" },
        { label: "គូបកាំ r³", value: "3³ = 27 cm³" },
      ],
      given_values_en: [
        { label: "Sphere radius r", value: "3 cm" },
        { label: "Cube of radius r³", value: "3³ = 27 cm³" },
      ],
      options_km: [
        "V = 36π cm³ ((4/3) × π × 27 = 4 × 9 × π = 36π)",
        "V = 27π cm³",
        "V = 108π cm³",
        "V = 12π cm³",
      ],
      options_en: [
        "V = 36π cm³ ((4/3) x π x 27 = 36π)",
        "V = 27π cm³",
        "V = 108π cm³",
        "V = 12π cm³",
      ],
      correct_index: 0,
      formula_badge: "V = 36π cm³",
      socratic_clue_km: "(4/3) × 27 = 4 × 9 = 36 នាំឱ្យ V = 36π cm³។",
      socratic_clue_en: "(4/3) x 27 = 36, thus V = 36π cm³.",
      explanation_km: "V = (4/3)π(3)³ = (4/3)π(27) = 36π cm³ ≈ 113.1 cm³។",
      explanation_en: "V = (4/3)π(27) = 36π cm³.",
    },
  ];
}

// G8 Math 09: Descriptive Statistics & Mean (ស្ថិតិ និងមធ្យមនព្វន្ត)
export function getG8StatisticsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-stat-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តមធ្យមនព្វន្ត",
      stage_name_en: "Stage 1 • Arithmetic Mean Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាមធ្យមនព្វន្ត x̄ នៃទិន្នន័យ N ចំនួនលើរនាំងសមីការ៖",
      prompt_en: "Assemble the formula for arithmetic mean x̄ of N values on the equation rail:",
      spoken_theorem_km: "អិចបារ ស្មើនឹង ផលបូក អិច អ៊ី ចែកនឹង អិន ធំ",
      spoken_theorem_en: "x bar equals sum of x i divided by N",
      variables_pool: [
        { id: "s1", symbol: "x̄", name_km: "x̄ (មធ្យម)", name_en: "Mean x̄", unit: "Average" },
        { id: "s2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "s3", symbol: "Σx_i", name_km: "Σx_i (ផលបូកតម្លៃទាំងអស់)", name_en: "Sum of values", unit: "Sum" },
        { id: "s4", symbol: "/", name_km: "ចែកនឹង", name_en: "divided by", unit: "Operator", category: "operator" },
        { id: "s5", symbol: "N", name_km: "N (ចំនួនទិន្នន័យសរុប)", name_en: "Total count N", unit: "Count" },
      ],
      target_sequence_ids: ["s1", "s2", "s3", "s4", "s5"],
      formula_badge: "x̄ = Σx_i / N",
      socratic_clue_km: "មធ្យមស្មើផលបូកតម្លៃទិន្នន័យទាំងអស់ ចែកនឹងចំនួនទិន្នន័យសរុប។",
      socratic_clue_en: "Mean is the sum of all data values divided by the sample size N.",
      explanation_km: "x̄ = (x₁ + x₂ + ... + x_N) / N ជាមធ្យមនព្វន្តគ្រឹះ។",
      explanation_en: "x̄ = (x₁ + x₂ + ... + x_N) / N is the foundational arithmetic mean.",
    },
    {
      id: `${lessonId}-stat-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាមធ្យមពិន្ទុជាក់ស្តែង",
      stage_name_en: "Stage 2 • Evaluate Mean Test Score",
      prompt_km: "សិស្សម្នាក់ទទួលបានពិន្ទុ ៤ លើកគឺ៖ 12, 14, 16, 18។ គណនាមធ្យមពិន្ទុ x̄ ៖",
      prompt_en: "A student scored 12, 14, 16, and 18 on 4 quizzes. Find the mean score x̄:",
      options_km: [
        "x̄ = 15 (ផលបូក = 60; 60 / 4 = 15)",
        "x̄ = 14",
        "x̄ = 16",
        "x̄ = 14.5",
      ],
      options_en: [
        "x̄ = 15 (Sum = 60; 60 / 4 = 15)",
        "x̄ = 14",
        "x̄ = 16",
        "x̄ = 14.5",
      ],
      correct_index: 0,
      scientific_analogy_km: "បូកពិន្ទុទាំង ៤ ចូលគ្នាបាន 60 រួចចែកចែករំលែកស្មើៗគ្នាឱ្យ 4 លើក គឺបាន 15 ក្នុងមួយលើក។",
      scientific_analogy_en: "Total points 60 redistributed evenly across 4 tests gives 15.",
      formula_badge: "x̄ = 60 / 4 = 15",
      socratic_clue_km: "12 + 14 + 16 + 18 = 60; 60 / 4 = 15។",
      socratic_clue_en: "Sum is 60; 60 / 4 = 15.",
      explanation_km: "x̄ = (12 + 14 + 16 + 18) / 4 = 60 / 4 = 15។",
      explanation_en: "x̄ = (12 + 14 + 16 + 18) / 4 = 60 / 4 = 15.",
    },
    {
      id: `${lessonId}-stat-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានស្វែងរកទិន្នន័យបាត់",
      stage_name_en: "Stage 3 • 4-Step Missing Score Derivation",
      prompt_km: "ពិន្ទុ ៥ លើកមានមធ្យម x̄ = 20។ ដឹងថាពិន្ទុ ៤ លើកដំបូងគឺ 15, 18, 22, 25។ រកពិន្ទុលើកទី ៥ ៖",
      prompt_en: "Mean of 5 test scores is 20. First 4 scores are 15, 18, 22, 25. Arrange 4 steps to find 5th score:",
      steps_km: [
        "គណនាផលបូកសរុបនៃ ៥ លើក ៖ 5 × 20 = 100",
        "គណនាផលបូកនៃ ៤ លើកដំបូង ៖ 15 + 18 + 22 + 25 = 80",
        "ធ្វើប្រមាណវិធីដកដើម្បីរកពិន្ទុទី ៥ ៖ 100 - 80",
        "សរសេរចម្លើយចុងក្រោយ ៖ ពិន្ទុលើកទី ៥ គឺ 20",
      ],
      steps_en: [
        "Calculate total target sum: 5 x 20 = 100",
        "Sum the first 4 known scores: 15 + 18 + 22 + 25 = 80",
        "Subtract known sum from total: 100 - 80",
        "Conclude final 5th score: 20",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "x₅ = 100 - 80 = 20",
      socratic_clue_km: "ផលបូក 100 ដកផលបូកស្គាល់ 80 សល់ 20។",
      socratic_clue_en: "100 - 80 = 20.",
      explanation_km: "ផលបូក = 5 × 20 = 100; 100 - 80 = 20 នាំឱ្យពិន្ទុទី ៥ គឺ 20។",
      explanation_en: "Total sum 100 minus 80 yields 20.",
    },
    {
      id: `${lessonId}-stat-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាគម្លាតទិន្នន័យ (Range)",
      stage_name_en: "Stage 4 • Statistical Range Calculation",
      prompt_km: "គណនាគម្លាត (Range = តម្លៃធំបំផុត - តូចបំផុត) នៃទិន្នន័យ៖ 4, 7, 12, 19, 25 ៖",
      prompt_en: "Calculate the range (Max - Min) of dataset: 4, 7, 12, 19, 25:",
      given_values_km: [
        { label: "តម្លៃអតិបរមា Max", value: "25" },
        { label: "តម្លៃអប្បបរមា Min", value: "4" },
      ],
      given_values_en: [
        { label: "Maximum value", value: "25" },
        { label: "Minimum value", value: "4" },
      ],
      options_km: [
        "21 (25 - 4 = 21)",
        "29 (25 + 4)",
        "13.4 (មធ្យម)",
        "12",
      ],
      options_en: [
        "21 (25 - 4 = 21)",
        "29",
        "13.4",
        "12",
      ],
      correct_index: 0,
      formula_badge: "Range = 25 - 4 = 21",
      socratic_clue_km: "យក 25 ដក 4 បាន 21។",
      socratic_clue_en: "25 - 4 = 21.",
      explanation_km: "គម្លាតស្ថិតិ = Max - Min = 25 - 4 = 21។",
      explanation_en: "Range = Maximum - Minimum = 25 - 4 = 21.",
    },
  ];
}

// ==============================================================================
// MASTER MATH SELECTOR DISPATCHER
// ==============================================================================


// ============================================================================
// 12. GRADE 8 GEOMETRY: ANGLES, POLYGONS & AREAS (les-g8-math-05)
// ============================================================================
export function getG8GeometryAnglesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-math-05-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តក្រឡាផ្ទៃចតុកោណស្មើ",
      stage_name_en: "Stage 1 • Rhombus Area Formula",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាក្រឡាផ្ទៃចតុកោណស្មើ តាមរយៈអង្កត់ទ្រូងទាំងពីរ (d₁, d₂)៖",
      prompt_en: "Assemble the area formula of a rhombus using diagonals (d₁, d₂):",
      spoken_theorem_km: "ក្រឡាផ្ទៃចតុកោណស្មើ ស្មើនឹង ដេមួយ គុណ ដេពីរ ចែកនឹង ពីរ",
      spoken_theorem_en: "Area of a rhombus equals d one times d two divided by two",
      variables_pool: [
        { id: "v1", symbol: "S", name_km: "ក្រឡាផ្ទៃ", name_en: "Area", unit: "Area" },
        { id: "v2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "v3", symbol: "d₁ · d₂", name_km: "ផលគុណអង្កត់ទ្រូង", name_en: "Diagonals Product", unit: "Numerator" },
        { id: "v4", symbol: "/", name_km: "ចែកនឹង", name_en: "Divided by", unit: "Division", category: "operator" },
        { id: "v5", symbol: "2", name_km: "ពីរ", name_en: "Two", unit: "Denominator" },
      ],
      target_sequence_ids: ["v1", "v2", "v3", "v4", "v5"],
      scientific_analogy_km: "ដូចកាត់ក្រដាសខ្លែងជាពីរត្រីកោណបាតដូចគ្នា៖ ក្រឡាផ្ទៃសរុប = (d₁ × d₂) / 2។",
      scientific_analogy_en: "Like dividing a kite into two identical triangles: Area = (d₁ × d₂) / 2.",
      socratic_clue_km: "រូបមន្តក្រឡាផ្ទៃចតុកោណស្មើ៖ S = (d₁ · d₂) / 2។",
      socratic_clue_en: "Rhombus area: S = (d₁ · d₂) / 2.",
      explanation_km: "ក្រឡាផ្ទៃចតុកោណស្មើគណនាតាម៖ S = (d₁ · d₂) / 2។",
      explanation_en: "Area of a rhombus is half the product of its diagonals: S = (d₁ · d₂) / 2.",
    },
    {
      id: "g8-math-05-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាបរិមាត្រ និងក្រឡាផ្ទៃចតុកោណកែង",
      stage_name_en: "Stage 2 • Rectangle Perimeter & Area Calculation",
      prompt_km: "ចតុកោណកែងមួយមានបណ្តោយ L = 12 cm និងទទឹង W = 5 cm។ គណនាបរិមាត្រ P និងក្រឡាផ្ទៃ S៖",
      prompt_en: "A rectangle has length L = 12 cm and width W = 5 cm. Calculate perimeter P and area S:",
      given_values_km: [
        { label: "បណ្តោយ (L)", value: "12 cm" },
        { label: "ទទឹង (W)", value: "5 cm" },
      ],
      given_values_en: [
        { label: "Length (L)", value: "12 cm" },
        { label: "Width (W)", value: "5 cm" },
      ],
      options_km: [
        "P = 34 cm និង S = 60 cm²",
        "P = 17 cm និង S = 60 cm²",
        "P = 34 cm និង S = 120 cm²",
        "P = 60 cm និង S = 34 cm²",
      ],
      options_en: [
        "P = 34 cm and S = 60 cm²",
        "P = 17 cm and S = 60 cm²",
        "P = 34 cm and S = 120 cm²",
        "P = 60 cm and S = 34 cm²",
      ],
      correct_index: 0,
      formula_badge: "P = 2(L+W), S = L·W",
      socratic_clue_km: "P = 2 × (12 + 5) = 2 × 17 = 34 cm។ S = 12 × 5 = 60 cm²។",
      socratic_clue_en: "P = 2(12 + 5) = 34 cm. S = 12 × 5 = 60 cm².",
      explanation_km: "បរិមាត្រ P = 2(12 + 5) = 34 cm; ក្រឡាផ្ទៃ S = 12 × 5 = 60 cm²។",
      explanation_en: "P = 2(L+W) = 34 cm, S = L × W = 60 cm².",
    },
    {
      id: "g8-math-05-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាក្រឡាផ្ទៃចតុកោណស្មើ",
      stage_name_en: "Stage 3 • Rhombus Area Calculation",
      prompt_km: "ចតុកោណស្មើមួយមានអង្កត់ទ្រូង d₁ = 8 cm និង d₂ = 6 cm។ គណនាក្រឡាផ្ទៃ S៖",
      prompt_en: "A rhombus has diagonals d₁ = 8 cm and d₂ = 6 cm. Calculate area S:",
      given_values_km: [
        { label: "អង្កត់ទ្រូងទី១ (d₁)", value: "8 cm" },
        { label: "អង្កត់ទ្រូងទី២ (d₂)", value: "6 cm" },
      ],
      given_values_en: [
        { label: "Diagonal 1 (d₁)", value: "8 cm" },
        { label: "Diagonal 2 (d₂)", value: "6 cm" },
      ],
      options_km: [
        "S = 24 cm² (តាម (8 × 6) / 2)",
        "S = 48 cm² (ភ្លេចចែកនឹង 2)",
        "S = 14 cm²",
        "S = 28 cm²",
      ],
      options_en: [
        "S = 24 cm² (via (8 × 6) / 2)",
        "S = 48 cm² (omitted division by 2)",
        "S = 14 cm²",
        "S = 28 cm²",
      ],
      correct_index: 0,
      formula_badge: "S = (d₁·d₂)/2 = 24 cm²",
      socratic_clue_km: "S = (8 × 6) / 2 = 48 / 2 = 24 cm²។",
      socratic_clue_en: "S = (8 × 6) / 2 = 24 cm².",
      explanation_km: "S = (d₁ · d₂) / 2 = (8 × 6) / 2 = 24 cm²។",
      explanation_en: "S = (8 × 6) / 2 = 24 cm².",
    },
    {
      id: "g8-math-05-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាក្រឡាផ្ទៃការ៉េពីបរិមាត្រ",
      stage_name_en: "Stage 4 • Square Area from Perimeter",
      prompt_km: "ការ៉េមួយមានបរិមាត្រ P = 36 cm។ គណនាជ្រុង a និងក្រឡាផ្ទៃ S នៃការ៉េនោះ៖",
      prompt_en: "A square has perimeter P = 36 cm. Find side length a and area S:",
      given_values_km: [{ label: "បរិមាត្រការ៉េ (P)", value: "36 cm" }],
      given_values_en: [{ label: "Perimeter (P)", value: "36 cm" }],
      options_km: [
        "a = 9 cm និង S = 81 cm²",
        "a = 6 cm និង S = 36 cm²",
        "a = 9 cm និង S = 36 cm²",
        "a = 18 cm និង S = 324 cm²",
      ],
      options_en: [
        "a = 9 cm and S = 81 cm²",
        "a = 6 cm and S = 36 cm²",
        "a = 9 cm and S = 36 cm²",
        "a = 18 cm and S = 324 cm²",
      ],
      correct_index: 0,
      formula_badge: "a = 9, S = 81 cm²",
      socratic_clue_km: "ការ៉េមាន 4 ជ្រុងស្មើគ្នា៖ a = 36 / 4 = 9 cm។ ក្រឡាផ្ទៃ S = a² = 9² = 81 cm²។",
      socratic_clue_en: "Square side a = 36 / 4 = 9 cm. Area S = a² = 81 cm².",
      explanation_km: "ជ្រុង a = 36 / 4 = 9 cm។ ក្រឡាផ្ទៃ S = 9² = 81 cm²។",
      explanation_en: "Side a = 36 / 4 = 9 cm. Area S = 9² = 81 cm².",
    },
  ];
}

// ============================================================================
// 13. GRADE 8 GEOMETRY: CONGRUENT TRIANGLES (les-g8-math-07)
// ============================================================================
export function getG8CongruentTrianglesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-math-07-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគផលបូកមុំក្នុងត្រីកោណ",
      stage_name_en: "Stage 1 • Triangle Angle Sum Formula",
      prompt_km: "ចូរផ្គុំរូបមន្តផលបូករង្វាស់មុំក្នុងទាំងបីនៃត្រីកោណ (∠A + ∠B + ∠C = 180°)៖",
      prompt_en: "Assemble the triangle interior angles sum formula (∠A + ∠B + ∠C = 180°):",
      spoken_theorem_km: "មុំ អា បូក មុំ បេ បូក មុំ សេ ស្មើនឹង មួយរយប៉ែតសិបដឺក្រេ",
      spoken_theorem_en: "Angle A plus Angle B plus Angle C equals 180 degrees",
      variables_pool: [
        { id: "a1", symbol: "∠A + ∠B", name_km: "ផលបូកពីរមុំ", name_en: "Sum of 2 Angles", unit: "Angle" },
        { id: "a2", symbol: "+", name_km: "បូក", name_en: "Plus", unit: "Operator", category: "operator" },
        { id: "a3", symbol: "∠C", name_km: "មុំទីបី", name_en: "Third Angle", unit: "Angle" },
        { id: "a4", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "a5", symbol: "180°", name_km: "១៨០ ដឺក្រេ", name_en: "180 Degrees", unit: "Total" },
      ],
      target_sequence_ids: ["a1", "a2", "a3", "a4", "a5"],
      scientific_analogy_km: "បត់មុំទាំងបីផ្កាប់ចូលគ្នាលើបន្ទាត់ត្រង់មួយ៖ ផលបូកគឺតែងតែស្មើ 180°។",
      scientific_analogy_en: "Folding all three angles onto a straight line forms exactly 180°.",
      socratic_clue_km: "ផលបូកមុំក្នុងត្រីកោណ = 180° ជានិច្ច។",
      socratic_clue_en: "Triangle angle sum is always 180°.",
      explanation_km: "គ្រប់ត្រីកោណទាំងអស់មានផលបូករង្វាស់មុំក្នុង ∠A + ∠B + ∠C = 180°។",
      explanation_en: "Interior angles of any Euclidean triangle sum to 180°.",
    },
    {
      id: "g8-math-07-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនារង្វាស់មុំទី៣ នៃត្រីកោណ",
      stage_name_en: "Stage 2 • Calculate Third Angle",
      prompt_km: "ក្នុងត្រីកោណ ABC មាន ∠A = 65° និង ∠B = 75°។ គណនារង្វាស់មុំ ∠C៖",
      prompt_en: "In triangle ABC, ∠A = 65° and ∠B = 75°. Calculate angle ∠C:",
      given_values_km: [
        { label: "មុំ ∠A", value: "65°" },
        { label: "មុំ ∠B", value: "75°" },
      ],
      given_values_en: [
        { label: "Angle ∠A", value: "65°" },
        { label: "Angle ∠B", value: "75°" },
      ],
      options_km: [
        "∠C = 40° (តាម 180° - 140°)",
        "∠C = 50°",
        "∠C = 45°",
        "∠C = 35°",
      ],
      options_en: [
        "∠C = 40° (via 180° - 140°)",
        "∠C = 50°",
        "∠C = 45°",
        "∠C = 35°",
      ],
      correct_index: 0,
      formula_badge: "∠C = 180° - 140° = 40°",
      socratic_clue_km: "∠C = 180° - (65° + 75°) = 180° - 140° = 40°។",
      socratic_clue_en: "∠C = 180° - (65° + 75°) = 40°.",
      explanation_km: "∠C = 180° - (65° + 75°) = 180° - 140° = 40°។",
      explanation_en: "∠C = 180° - (65° + 75°) = 40°.",
    },
    {
      id: "g8-math-07-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាប្រវែងជ្រុងត្រីកោណប៉ុនគ្នា",
      stage_name_en: "Stage 3 • Congruent Triangles Side Length",
      prompt_km: "គេឱ្យ △ABC ≅ △DEF។ ប្រសិនបើ AB = 7 cm, BC = 9 cm និង AC = 6 cm នោះប្រវែងជ្រុង EF ស្មើនឹងប៉ុន្មាន?",
      prompt_en: "Given △ABC ≅ △DEF. If AB = 7 cm, BC = 9 cm, and AC = 6 cm, what is the length of EF?",
      given_values_km: [
        { label: "លក្ខខណ្ឌ", value: "△ABC ≅ △DEF" },
        { label: "ជ្រុង BC", value: "9 cm" },
      ],
      given_values_en: [
        { label: "Condition", value: "△ABC ≅ △DEF" },
        { label: "Side BC", value: "9 cm" },
      ],
      options_km: [
        "EF = 9 cm (ត្រូវគ្នានឹងជ្រុង BC)",
        "EF = 7 cm",
        "EF = 6 cm",
        "EF = 16 cm",
      ],
      options_en: [
        "EF = 9 cm (corresponding to BC)",
        "EF = 7 cm",
        "EF = 6 cm",
        "EF = 16 cm",
      ],
      correct_index: 0,
      formula_badge: "EF = BC = 9 cm",
      socratic_clue_km: "ត្រីកោណប៉ុនគ្នា ជ្រុងត្រូវគ្នាស្មើគ្នា៖ BC ត្រូវគ្នានឹង EF ដូច្នេះ EF = 9 cm។",
      socratic_clue_en: "In congruent triangles, corresponding sides are equal: EF = BC = 9 cm.",
      explanation_km: "△ABC ≅ △DEF នាំឱ្យជ្រុងត្រូវគ្នា EF = BC = 9 cm។",
      explanation_en: "Corresponding sides of congruent triangles are equal: EF = BC = 9 cm.",
    },
    {
      id: "g8-math-07-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាក្រឡាផ្ទៃត្រីកោណដូចគ្នា",
      stage_name_en: "Stage 4 • Similar Triangles Area Scaling",
      prompt_km: "ត្រីកោណពីរដូចគ្នាមានផលធៀបដូចគ្នា k = 3។ បើក្រឡាផ្ទៃត្រីកោណតូច S₁ = 12 cm² គណនាក្រឡាផ្ទៃត្រីកោណធំ S₂៖",
      prompt_en: "Two similar triangles have similarity ratio k = 3. If the smaller area S₁ = 12 cm², calculate larger area S₂:",
      given_values_km: [
        { label: "ផលធៀបដូចគ្នា (k)", value: "3" },
        { label: "ក្រឡាផ្ទៃតូច (S₁)", value: "12 cm²" },
      ],
      given_values_en: [
        { label: "Ratio (k)", value: "3" },
        { label: "Small Area (S₁)", value: "12 cm²" },
      ],
      options_km: [
        "S₂ = 108 cm² (តាម k² × S₁ = 9 × 12)",
        "S₂ = 36 cm² (ច្រឡំយក k × S₁)",
        "S₂ = 72 cm²",
        "S₂ = 144 cm²",
      ],
      options_en: [
        "S₂ = 108 cm² (via k² × S₁ = 9 × 12)",
        "S₂ = 36 cm² (confused with k × S₁)",
        "S₂ = 72 cm²",
        "S₂ = 144 cm²",
      ],
      correct_index: 0,
      formula_badge: "S₂ = 3² × 12 = 108 cm²",
      socratic_clue_km: "ផលធៀបក្រឡាផ្ទៃស្មើនឹង k²៖ S₂ = 3² × 12 = 9 × 12 = 108 cm²។",
      socratic_clue_en: "Area ratio equals k²: S₂ = 3² × 12 = 108 cm².",
      explanation_km: "ផលធៀបក្រឡាផ្ទៃនៃត្រីកោណដូចគ្នាគឺ k² ដូច្នេះ S₂ = 9 × 12 = 108 cm²។",
      explanation_en: "Ratio of areas is k²: S₂ = k² × S₁ = 9 × 12 = 108 cm².",
    },
  ];
}

// ============================================================================
// 14. GRADE 8 WORD PROBLEMS & LINEAR SYSTEMS (les-g8-math-10)
// ============================================================================
export function getG8WordProblemsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-math-10-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគសមីការចំណោទសត្វ",
      stage_name_en: "Stage 1 • Word Problem Equation Formulation",
      prompt_km: "កសិដ្ឋានមួយមានមាន់ (x) និងគោ (y) សរុប 20 ក្បាល។ ចូរផ្គុំសមីការចំនួនក្បាលសរុប៖",
      prompt_en: "A farm has chickens (x) and cows (y) totaling 20 heads. Assemble the total head equation:",
      spoken_theorem_km: "អិច បូក អ៊ីក្រិក ស្មើនឹង ម្ភៃ",
      spoken_theorem_en: "x plus y equals twenty",
      variables_pool: [
        { id: "w1", symbol: "x", name_km: "ចំនួនមាន់", name_en: "Chickens", unit: "Variable" },
        { id: "w2", symbol: "+", name_km: "បូក", name_en: "Plus", unit: "Operator", category: "operator" },
        { id: "w3", symbol: "y", name_km: "ចំនួនគោ", name_en: "Cows", unit: "Variable" },
        { id: "w4", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "w5", symbol: "20", name_km: "ម្ភៃ", name_en: "Twenty", unit: "Total" },
      ],
      target_sequence_ids: ["w1", "w2", "w3", "w4", "w5"],
      scientific_analogy_km: "សត្វមួយមានក្បាលមួយ៖ ចំនួនក្បាលសរុប = ចំនួនមាន់ (x) + ចំនួនគោ (y) = 20។",
      scientific_analogy_en: "Each animal has one head: total heads = x + y = 20.",
      socratic_clue_km: "សមីការក្បាលសរុប៖ x + y = 20។",
      socratic_clue_en: "Total heads equation: x + y = 20.",
      explanation_km: "តាង x ជាចំនួនមាន់ និង y ជាចំនួនគោ៖ x + y = 20។",
      explanation_en: "Let x be chickens and y be cows: x + y = 20.",
    },
    {
      id: "g8-math-10-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាចំនួនមាន់ និងគោ (ប្រព័ន្ធសមីការ)",
      stage_name_en: "Stage 2 • Chickens and Cows Problem",
      prompt_km: "មាន់ (x) និងគោ (y) មាន 20 ក្បាល និងជើងសរុប 56 (មាន់ជើង 2 គោជើង 4)។ គណនាចំនួនគោ (y)៖",
      prompt_en: "Chickens (x) and cows (y) have 20 heads and 56 total legs (chickens have 2 legs, cows have 4). Find number of cows (y):",
      given_values_km: [
        { label: "សមីការក្បាល", value: "x + y = 20" },
        { label: "សមីការជើង", value: "2x + 4y = 56" },
      ],
      given_values_en: [
        { label: "Heads Equation", value: "x + y = 20" },
        { label: "Legs Equation", value: "2x + 4y = 56" },
      ],
      options_km: [
        "y = 8 ក្បាល (មាន់ x = 12 ក្បាល)",
        "y = 10 ក្បាល (មាន់ x = 10 ក្បាល)",
        "y = 6 ក្បាល (មាន់ x = 14 ក្បាល)",
        "y = 12 ក្បាល (មាន់ x = 8 ក្បាល)",
      ],
      options_en: [
        "y = 8 cows (chickens x = 12)",
        "y = 10 cows (chickens x = 10)",
        "y = 6 cows (chickens x = 14)",
        "y = 12 cows (chickens x = 8)",
      ],
      correct_index: 0,
      formula_badge: "y = (56 - 40) / 2 = 8",
      socratic_clue_km: "2(x + y) = 40 ជើង។ ជើងលើស 56 - 40 = 16 ជើង ជារបស់គោ៖ 16 / 2 = 8 គោ។",
      socratic_clue_en: "Subtract 2(20) = 40 from 56 legs: 16 legs / 2 extra legs per cow = 8 cows.",
      explanation_km: "2x + 4y = 56 និង 2x + 2y = 40 នាំឱ្យ 2y = 16 ⟹ y = 8 (គោ) និង x = 12 (មាន់)។",
      explanation_en: "2y = 56 - 40 = 16 ⟹ y = 8 cows and x = 12 chickens.",
    },
    {
      id: "g8-math-10-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាចំនួនពីរស្គាល់ផលបូក និងផលដក",
      stage_name_en: "Stage 3 • Sum and Difference of Two Numbers",
      prompt_km: "ចំនួនពីរមានផលបូក x + y = 35 និងផលដក x - y = 11។ គណនាតម្លៃនៃចំនួនធំ x៖",
      prompt_en: "Two numbers have sum x + y = 35 and difference x - y = 11. Find larger number x:",
      given_values_km: [
        { label: "ផលបូក (x + y)", value: "35" },
        { label: "ផលដក (x - y)", value: "11" },
      ],
      given_values_en: [
        { label: "Sum (x + y)", value: "35" },
        { label: "Difference (x - y)", value: "11" },
      ],
      options_km: [
        "x = 23 (និង y = 12)",
        "x = 24 (និង y = 11)",
        "x = 22 (និង y = 13)",
        "x = 26 (និង y = 9)",
      ],
      options_en: [
        "x = 23 (and y = 12)",
        "x = 24 (and y = 11)",
        "x = 22 (and y = 13)",
        "x = 26 (and y = 9)",
      ],
      correct_index: 0,
      formula_badge: "2x = 46 ⟹ x = 23",
      socratic_clue_km: "បូកសមីការទាំងពីរចូលគ្នា៖ 2x = 35 + 11 = 46 ⟹ x = 23។",
      socratic_clue_en: "Add both equations: 2x = 35 + 11 = 46 ⟹ x = 23.",
      explanation_km: "(x + y) + (x - y) = 35 + 11 ⟹ 2x = 46 ⟹ x = 23 (y = 35 - 23 = 12)។",
      explanation_en: "2x = 46 ⟹ x = 23, y = 12.",
    },
    {
      id: "g8-math-10-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • ចំណោទអាយុឪពុក និងកូន",
      stage_name_en: "Stage 4 • Father and Son Age Problem",
      prompt_km: "ឪពុកមានអាយុស្មើ 3 ដងនៃអាយុកូន (F = 3S)។ ផលបូកអាយុអ្នកទាំងពីរគឺ 48 ឆ្នាំ (F + S = 48)។ តើកូនមានអាយុប៉ុន្មានឆ្នាំ?",
      prompt_en: "A father is 3 times as old as his son (F = 3S). The sum of their ages is 48 (F + S = 48). How old is the son (S)?",
      given_values_km: [
        { label: "ទំនាក់ទំនងអាយុ", value: "F = 3S" },
        { label: "ផលបូកអាយុ", value: "F + S = 48" },
      ],
      given_values_en: [
        { label: "Relation", value: "F = 3S" },
        { label: "Sum of Ages", value: "F + S = 48" },
      ],
      options_km: [
        "S = 12 ឆ្នាំ (ឪពុក F = 36 ឆ្នាំ)",
        "S = 16 ឆ្នាំ (ឪពុក F = 32 ឆ្នាំ)",
        "S = 10 ឆ្នាំ (ឪពុក F = 38 ឆ្នាំ)",
        "S = 14 ឆ្នាំ (ឪពុក F = 34 ឆ្នាំ)",
      ],
      options_en: [
        "S = 12 years (Father F = 36)",
        "S = 16 years (Father F = 32)",
        "S = 10 years (Father F = 38)",
        "S = 14 years (Father F = 34)",
      ],
      correct_index: 0,
      formula_badge: "4S = 48 ⟹ S = 12",
      socratic_clue_km: "ជំនួស F = 3S ចូល៖ 3S + S = 48 ⟹ 4S = 48 ⟹ S = 12 ឆ្នាំ។",
      socratic_clue_en: "Substitute F = 3S: 4S = 48 ⟹ S = 12.",
      explanation_km: "3S + S = 48 ⟹ 4S = 48 ⟹ S = 12 ឆ្នាំ (ឪពុក = 3 × 12 = 36 ឆ្នាំ)។",
      explanation_en: "4S = 48 ⟹ S = 12 years (Father is 36 years old).",
    },
  ];
}

export function getGradeStratifiedMathDeck(
  lessonId: string,
  lesson?: CuratedLesson,
): QuizQuestionItem[] {
  const id = lessonId.toLowerCase();
  const grade = lesson?.grade || 12;
  const title = ((lesson?.title_km || "") + " " + (lesson?.title_en || "")).toLowerCase();

  // ----------------------------------------------------------------------------
  // GRADE 12 MATHEMATICS
  // ----------------------------------------------------------------------------
  if (grade === 12 || id.includes("g12-math")) {
    if (
      id.includes("math-11") ||
      id.includes("math-12") ||
      id.includes("math-13") ||
      title.includes("លីមីត") ||
      title.includes("limit")
    ) {
      return getG12LimitsDeck(lessonId);
    }
    if (
      id.includes("math-14") ||
      id.includes("math-15") ||
      id.includes("math-16") ||
      title.includes("ដេរីវេ") ||
      title.includes("derivative")
    ) {
      return getG12DerivativesDeck(lessonId);
    }
    if (
      id.includes("math-02") ||
      id.includes("math-08") ||
      id.includes("math-19") ||
      title.includes("កុំផ្លិច") ||
      title.includes("complex")
    ) {
      return getG12ComplexDeck(lessonId);
    }
  }

  // ----------------------------------------------------------------------------
  // GRADE 11 MATHEMATICS
  // ----------------------------------------------------------------------------
  if (grade === 11 || id.includes("g11-math")) {
    if (
      id.includes("math-01") ||
      id.includes("math-07") ||
      id.includes("math-15") ||
      id.includes("math-16") ||
      id.includes("math-17") ||
      title.includes("ស្វ៊ីត") ||
      title.includes("sequence") ||
      title.includes("progression")
    ) {
      return getG11SequencesDeck(lessonId);
    }
  }

  // ----------------------------------------------------------------------------
  // GRADE 10 MATHEMATICS
  // ----------------------------------------------------------------------------
  if (grade === 10 || id.includes("g10-math")) {
    if (
      id.includes("math-01") ||
      id.includes("math-07") ||
      id.includes("math-13") ||
      title.includes("ប៉ារ៉ាបូល") ||
      title.includes("parabola") ||
      title.includes("quadratic function")
    ) {
      return getG10ParabolaDeck(lessonId);
    }
    if (
      id.includes("math-02") ||
      id.includes("math-14") ||
      title.includes("វ៉ិចទ័រ") ||
      title.includes("vector") ||
      title.includes("dot product")
    ) {
      return getG10VectorsDeck(lessonId);
    }
  }

  // ----------------------------------------------------------------------------
  // GRADE 9 MATHEMATICS
  // ----------------------------------------------------------------------------
  if (grade === 9 || id.includes("g9-math")) {
    if (
      id.includes("math-01") ||
      id.includes("math-16") ||
      title.includes("ប្រព័ន្ធសមីការ") ||
      title.includes("system")
    ) {
      return getG9SystemsDeck(lessonId);
    }
  }

  // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------
  // GRADE 8 MATHEMATICS (TOPIC-SPECIFIC STRATIFICATION - ZERO REDUNDANCY)
  // ----------------------------------------------------------------------------
  if (grade === 8 || id.includes("g8-math")) {
    if (
      id.includes("math-02") ||
      title.includes("ពន្លាត") ||
      title.includes("identities") ||
      title.includes("កន្សោម")
    ) {
      return getG8IdentitiesDeck(lessonId);
    }
    if (
      id.includes("math-06") ||
      title.includes("ផលគុណកត្តា") ||
      title.includes("factor") ||
      title.includes("បំបែកតួ")
    ) {
      return getG8FactoringDeck(lessonId);
    }
    if (
      id.includes("math-03") ||
      title.includes("ពីតាក័រ") ||
      title.includes("pythagor")
    ) {
      return getG8PythagorasDeck(lessonId);
    }
    if (
      id.includes("math-04") ||
      title.includes("វិសមីការ") ||
      title.includes("inequalit")
    ) {
      return getG8LinearEquationsDeck(lessonId);
    }
    if (
      id.includes("math-05") ||
      title.includes("ចតុកោណ") ||
      title.includes("ការ៉េ") ||
      title.includes("polygon") ||
      title.includes("quadrilateral")
    ) {
      return getG8GeometryAnglesDeck(lessonId);
    }
    if (
      id.includes("math-07") ||
      title.includes("ប៉ុនគ្នា") ||
      title.includes("congruen") ||
      title.includes("similar")
    ) {
      return getG8CongruentTrianglesDeck(lessonId);
    }
    if (
      id.includes("math-08") ||
      title.includes("មាឌ") ||
      title.includes("volume") ||
      title.includes("ស៊ីឡាំង") ||
      title.includes("កោន") ||
      title.includes("ស្វ៊ែរ")
    ) {
      return getG8VolumesDeck(lessonId);
    }
    if (
      id.includes("math-09") ||
      title.includes("ស្ថិតិ") ||
      title.includes("statistic") ||
      title.includes("មធ្យម") ||
      title.includes("mean")
    ) {
      return getG8StatisticsDeck(lessonId);
    }
    if (
      id.includes("math-10") ||
      title.includes("ចំណោទ") ||
      title.includes("word problem")
    ) {
      return getG8WordProblemsDeck(lessonId);
    }
    if (
      id.includes("math-01") ||
      title.includes("សនិទាន") ||
      title.includes("rational") ||
      title.includes("radical")
    ) {
      return getG8RationalDeck(lessonId);
    }
  }

  // Default fallback for Grade 10: Parabola & quadratic functions
  if (grade === 10) {
    return getG10ParabolaDeck(lessonId);
  }

  // Default fallback for Grade 11: Sequences
  if (grade === 11) {
    return getG11SequencesDeck(lessonId);
  }

  // Default fallback for Grade 8: Rational numbers
  if (grade === 8) {
    return getG8RationalDeck(lessonId);
  }

  // Default fallback for Grade 9: Systems
  if (grade === 9) {
    return getG9SystemsDeck(lessonId);
  }

  // Default fallback for Grade 12: Limits
  return getG12LimitsDeck(lessonId);
}
