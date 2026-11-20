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
// MASTER MATH SELECTOR DISPATCHER
// ==============================================================================

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
  // GRADE 8 MATHEMATICS
  // ----------------------------------------------------------------------------
  if (grade === 8 || id.includes("g8-math")) {
    if (
      id.includes("math-01") ||
      id.includes("math-04") ||
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
