// ==============================================================================
// ScienceKH — Interactive Curriculum Short Practice Exercises Bank
// Hands-on calculation problems, worked examples, and step-by-step solutions
// Bridging theory with practical exercise mastery across MoEYS Grades 7–12
// ==============================================================================

import type { CuratedLesson, PracticeExercise } from "./types";

/**
 * Curated practice exercises for high-frequency MoEYS examination lessons
 */
export const CURATED_PRACTICE_BANK: Record<string, PracticeExercise[]> = {
  // G12 Math 11: Limits of Functions & Indeterminate Forms
  "les-g12-math-11": [
    {
      id: "ex-lim-1",
      titleKm: "លំហាត់ទី ១ ៖ លីមីតរាង 0/0 តាមវិធីបំបែកកត្តា",
      titleEn: "Exercise 1: 0/0 Form by Factoring",
      questionKm: "ចូរគណនាតម្លៃលីមីតនៃអនុគមន៍ខាងក្រោម៖",
      questionEn: "Evaluate the limit of the following rational function:",
      formulaOrContext: "L_1 = \\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}",
      options: [
        { labelKm: "L₁ = 2", labelEn: "L₁ = 2", isCorrect: false },
        { labelKm: "L₁ = 4", labelEn: "L₁ = 4", isCorrect: true },
        { labelKm: "L₁ = 0", labelEn: "L₁ = 0", isCorrect: false },
        { labelKm: "L₁ = ∞", labelEn: "L₁ = ∞", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (ផ្ទៀងផ្ទាត់រាងមិនកំណត់)៖**
ជំនួស $x = 2$ ចូល៖ $\\frac{2^2 - 4}{2 - 2} = \\left[\\frac{0}{0}\\right]$ (រាងមិនកំណត់)។

**ជំហានទី ២ (បំបែកកត្តា)៖**
ប្រើរូបមន្ត $a^2 - b^2 = (a - b)(a + b)$ នៅភាគយក៖
$$x^2 - 4 = (x - 2)(x + 2)$$

**ជំហានទី ៣ (សម្រួលកត្តា និងគណនា)៖**
$$L_1 = \\lim_{x \\to 2} \\frac{(x - 2)(x + 2)}{x - 2} = \\lim_{x \\to 2} (x + 2) = 2 + 2 = 4$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $L_1 = 4$`,
      stepByStepSolutionEn: "Direct substitution yields 0/0. Factor the numerator: x^2 - 4 = (x - 2)(x + 2). Cancel (x - 2) to get lim (x + 2) = 4.",
      tipKm: "ពេលឃើញរាង 0/0 លើប្រភាគពហុធា ត្រូវគិតដល់ការបំបែកជាកត្តា (x - a) ភ្លាម!",
    },
    {
      id: "ex-lim-2",
      titleKm: "លំហាត់ទី ២ ៖ លីមីតមានរ៉ាឌីកាល់ (គុណកន្សោមកំប្លេ)",
      titleEn: "Exercise 2: Radical Limit by Conjugate",
      questionKm: "ចូរគណនាតម្លៃលីមីតមានរ៉ាឌីកាល់ខាងក្រោម៖",
      questionEn: "Evaluate the following limit involving a square root:",
      formulaOrContext: "L_2 = \\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x}",
      options: [
        { labelKm: "L₂ = 1/3", labelEn: "L₂ = 1/3", isCorrect: false },
        { labelKm: "L₂ = 1/6", labelEn: "L₂ = 1/6", isCorrect: true },
        { labelKm: "L₂ = 3", labelEn: "L₂ = 3", isCorrect: false },
        { labelKm: "L₂ = 0", labelEn: "L₂ = 0", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (ផ្ទៀងផ្ទាត់រាង)៖**
ជំនួស $x = 0$ ចូល៖ $\\frac{\\sqrt{9} - 3}{0} = \\left[\\frac{0}{0}\\right]$។

**ជំហានទី ២ (គុណនឹងកន្សោមកំប្លេ)៖**
កន្សោមកំប្លេនៃ $\\sqrt{x + 9} - 3$ គឺ $\\sqrt{x + 9} + 3$៖
$$L_2 = \\lim_{x \\to 0} \\frac{(\\sqrt{x + 9} - 3)(\\sqrt{x + 9} + 3)}{x(\\sqrt{x + 9} + 3)}$$
$$= \\lim_{x \\to 0} \\frac{(x + 9) - 9}{x(\\sqrt{x + 9} + 3)} = \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x + 9} + 3)}$$

**ជំហានទី ៣ (សម្រួល និងជំនួស)៖**
$$L_2 = \\lim_{x \\to 0} \\frac{1}{\\sqrt{x + 9} + 3} = \\frac{1}{\\sqrt{9} + 3} = \\frac{1}{3 + 3} = \\frac{1}{6}$$`,
      stepByStepSolutionEn: "Multiply numerator and denominator by conjugate sqrt(x+9) + 3. Simplify (x+9)-9 = x, cancel x to get 1/(3+3) = 1/6.",
      tipKm: "រូបមន្តកំប្លេ៖ (√A - B)(√A + B) = A - B² ជួយបំបាត់ឫសការេជានិច្ច!",
    },
    {
      id: "ex-lim-3",
      titleKm: "លំហាត់ទី ៣ ៖ លីមីតត្រីកោណមាត្រគ្រឹះ",
      titleEn: "Exercise 3: Trigonometric Identity Limit",
      questionKm: "ចូរគណនាលីមីតត្រីកោណមាត្រ៖",
      questionEn: "Compute the trigonometric limit:",
      formulaOrContext: "L_3 = \\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}",
      options: [
        { labelKm: "L₃ = 1", labelEn: "L₃ = 1", isCorrect: false },
        { labelKm: "L₃ = 5/2", labelEn: "L₃ = 5/2", isCorrect: true },
        { labelKm: "L₃ = 2/5", labelEn: "L₃ = 2/5", isCorrect: false },
        { labelKm: "L₃ = 0", labelEn: "L₃ = 0", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (ប្រើទ្រឹស្តីបទគ្រឹះ)៖**
យើងដឹងថា $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$។

**ជំហានទី ២ (បំប្លែងមេគុណ)៖**
$$L_3 = \\lim_{x \\to 0} \\frac{\\sin(5x)}{2x} = \\lim_{x \\to 0} \\left( \\frac{5}{2} \\cdot \\frac{\\sin(5x)}{5x} \\right)$$
$$= \\frac{5}{2} \\cdot \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2} \\cdot (1) = \\frac{5}{2}$$`,
      stepByStepSolutionEn: "Apply lim (sin u)/u = 1. Multiply by 5/5 to get (5/2) * (sin 5x / 5x) = 5/2.",
      tipKm: "ត្រូវធ្វើឱ្យមុំក្នុង sin និងភាគបែងមានទម្រង់ដូចគ្នា (5x) មុននឹងទាញយកតម្លៃ 1!",
    },
  ],

  // G12 Math 14: Derivatives & Chain Rule
  "les-g12-math-14": [
    {
      id: "ex-der-1",
      titleKm: "លំហាត់ទី ១ ៖ ដេរីវេនៃអនុគមន៍ស្វ័យគុណ",
      titleEn: "Exercise 1: Power Rule Derivative",
      questionKm: "រកដេរីវេនៃអនុគមន៍ $f(x) = 3x^4 - 5x^2 + 7x - 9$៖",
      questionEn: "Find the first derivative of f(x) = 3x^4 - 5x^2 + 7x - 9:",
      formulaOrContext: "f'(x) = \\frac{d}{dx}(3x^4 - 5x^2 + 7x - 9)",
      options: [
        { labelKm: "f'(x) = 12x³ - 10x + 7", labelEn: "f'(x) = 12x³ - 10x + 7", isCorrect: true },
        { labelKm: "f'(x) = 12x³ - 10x", labelEn: "f'(x) = 12x³ - 10x", isCorrect: false },
        { labelKm: "f'(x) = 7x³ - 10x + 7", labelEn: "f'(x) = 7x³ - 10x + 7", isCorrect: false },
        { labelKm: "f'(x) = 12x⁴ - 5x + 7", labelEn: "f'(x) = 12x⁴ - 5x + 7", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (ប្រើរូបមន្ត $(x^n)' = n x^{n-1}$)៖**
- $(3x^4)' = 3 \\cdot 4x^3 = 12x^3$
- $(-5x^2)' = -5 \\cdot 2x = -10x$
- $(7x)' = 7$
- $(-9)' = 0$ (ដេរីវេនៃចំនួនថេរស្មើ ០)

**សរុបលទ្ធផល៖**
$$f'(x) = 12x^3 - 10x + 7$$`,
      stepByStepSolutionEn: "Apply (x^n)' = n*x^(n-1). d/dx(3x^4) = 12x^3, d/dx(-5x^2) = -10x, d/dx(7x) = 7, d/dx(-9) = 0.",
      tipKm: "ដេរីវេនៃចំនួនថេរបរិសុទ្ធគឺស្មើ ០ ជានិច្ច!",
    },
    {
      id: "ex-der-2",
      titleKm: "លំហាត់ទី ២ ៖ ដេរីវេអនុគមន៍បណ្តាក់ (Chain Rule)",
      titleEn: "Exercise 2: Chain Rule Derivative",
      questionKm: "រកដេរីវេនៃអនុគមន៍ $g(x) = (2x + 1)^5$៖",
      questionEn: "Calculate the derivative of g(x) = (2x + 1)^5:",
      formulaOrContext: "g'(x) = \\frac{d}{dx}\\left[(2x + 1)^5\\right]",
      options: [
        { labelKm: "g'(x) = 5(2x + 1)⁴", labelEn: "g'(x) = 5(2x + 1)⁴", isCorrect: false },
        { labelKm: "g'(x) = 10(2x + 1)⁴", labelEn: "g'(x) = 10(2x + 1)⁴", isCorrect: true },
        { labelKm: "g'(x) = 2(2x + 1)⁴", labelEn: "g'(x) = 2(2x + 1)⁴", isCorrect: false },
        { labelKm: "g'(x) = 10(2x + 1)⁵", labelEn: "g'(x) = 10(2x + 1)⁵", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តបណ្តាក់ $(u^n)' = n u' u^{n-1}$)៖**
តាង $u = 2x + 1 \\implies u' = (2x + 1)' = 2$។
$n = 5 \\implies n-1 = 4$។

**ជំហានទី ២ (ជំនួសចូលរូបមន្ត)៖**
$$g'(x) = 5 \\cdot (2x + 1)' \\cdot (2x + 1)^4 = 5 \\cdot 2 \\cdot (2x + 1)^4 = 10(2x + 1)^4$$`,
      stepByStepSolutionEn: "Chain rule (u^n)' = n * u' * u^(n-1). Here u = 2x+1, u' = 2, so 5 * 2 * (2x+1)^4 = 10(2x+1)^4.",
      tipKm: "កុំភ្លេចគុណនឹង u' (ដេរីវេខាងក្នុង)!",
    },
  ],

  // G12 Math 01: Definite Integrals
  "les-g12-math-01": [
    {
      id: "ex-int-1",
      titleKm: "លំហាត់ទី ១ ៖ គណនាអាំងតេក្រាលកម្រិត",
      titleEn: "Exercise 1: Definite Integral Evaluation",
      questionKm: "ចូរគណនាតម្លៃអាំងតេក្រាលកំណត់ខាងក្រោម៖",
      questionEn: "Evaluate the definite integral:",
      formulaOrContext: "I = \\int_{0}^{3} (2x + 1) \\, dx",
      options: [
        { labelKm: "I = 9", labelEn: "I = 9", isCorrect: false },
        { labelKm: "I = 12", labelEn: "I = 12", isCorrect: true },
        { labelKm: "I = 15", labelEn: "I = 15", isCorrect: false },
        { labelKm: "I = 6", labelEn: "I = 6", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រកព្រីមីទីវ)៖**
$$\\int (2x + 1) \\, dx = x^2 + x$$

**ជំហានទី ២ (ប្រើរូបមន្តញូតុន-ឡែបនីស $[F(x)]_a^b = F(b) - F(a)$)៖**
$$I = [x^2 + x]_0^3 = (3^2 + 3) - (0^2 + 0)$$
$$= (9 + 3) - 0 = 12$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $I = 12$`,
      stepByStepSolutionEn: "Antiderivative of 2x + 1 is x^2 + x. Evaluate from 0 to 3: (3^2 + 3) - (0) = 9 + 3 = 12.",
      tipKm: "គណនាតម្លៃគោលលើ F(b) ដកនឹងតម្លៃគោលក្រោម F(a)!",
    },
  ],

  // G12 Physics 01: Simple Harmonic Motion
  "les-g12-phys-01": [
    {
      id: "ex-phys-1",
      titleKm: "លំហាត់ទី ១ ៖ គណនាខួបនៃប៉ោលវិល ឬប៉ោលរ៉ឺស័រ",
      titleEn: "Exercise 1: Spring-Mass Oscillator Period",
      questionKm: "រ៉ឺស័រមួយមានថេររឹង $k = 100\\text{ N/m}$ ភ្ជាប់នឹងម៉ាស $m = 1\\text{ kg}$។ ចូរគណនាខួប $T$ នៃលំយោល៖",
      questionEn: "A spring with stiffness k = 100 N/m carries mass m = 1 kg. Calculate its oscillation period T:",
      formulaOrContext: "T = 2\\pi \\sqrt{\\frac{m}{k}} \\quad (\\text{យក } \\pi \\approx 3.14)",
      options: [
        { labelKm: "T ≈ 0.63 s", labelEn: "T ≈ 0.63 s", isCorrect: true },
        { labelKm: "T ≈ 1.25 s", labelEn: "T ≈ 1.25 s", isCorrect: false },
        { labelKm: "T ≈ 2.00 s", labelEn: "T ≈ 2.00 s", isCorrect: false },
        { labelKm: "T ≈ 0.10 s", labelEn: "T ≈ 0.10 s", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តខួបប៉ោលរ៉ឺស័រ)៖**
$$T = 2\\pi \\sqrt{\\frac{m}{k}}$$

**ជំហានទី ២ (ជំនួសតម្លៃលេខ)៖**
$$T = 2 \\pi \\sqrt{\\frac{1}{100}} = 2\\pi \\cdot \\frac{1}{10} = \\frac{\\pi}{5}$$
យក $\\pi \\approx 3.1416 \\implies T \\approx \\frac{3.1416}{5} \\approx 0.628\\text{ s} \\approx 0.63\\text{ s}$$`,
      stepByStepSolutionEn: "T = 2*pi*sqrt(m/k) = 2*pi*sqrt(1/100) = 2*pi/10 = pi/5 approx 0.628 s.",
      tipKm: "ខួប T មិនអាស្រ័យលើទំហំលំយោល (Amplitude) ទេ អាស្រ័យតែលើ m និង k!",
    },
  ],

  // G12 Chemistry 01: Chemical Equilibrium & Reaction Rate
  "les-g12-chem-01": [
    {
      id: "ex-chem-1",
      titleKm: "លំហាត់ទី ១ ៖ គណនាកំហាប់អ៊ីយ៉ុងអ៊ីដ្រូញ៉ូម និង pH",
      titleEn: "Exercise 1: Hydronium Concentration & pH",
      questionKm: "សូលុយស្យុងអាស៊ីតក្លរីឌ្រិច $HCl$ មានកំហាប់ $[H_3O^+] = 10^{-3}\\text{ M}$។ ចូរគណនាតម្លៃ pH៖",
      questionEn: "A hydrochloric acid solution has [H3O+] = 10^-3 M. Find its pH:",
      formulaOrContext: "\\text{pH} = -\\log[H_3O^+]",
      options: [
        { labelKm: "pH = 3", labelEn: "pH = 3", isCorrect: true },
        { labelKm: "pH = 11", labelEn: "pH = 11", isCorrect: false },
        { labelKm: "pH = 7", labelEn: "pH = 7", isCorrect: false },
        { labelKm: "pH = 1", labelEn: "pH = 1", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្ត pH របស់សូរ៉ិនសិន)៖**
$$\\text{pH} = -\\log[H_3O^+]$$

**ជំហានទី ២ (ជំនួសតម្លៃលេខ)៖**
$$\\text{pH} = -\\log(10^{-3}) = -(-3) = 3$$
សូលុយស្យុងនេះមានលក្ខណៈជា **អាស៊ីតខ្លាំង** (pH < 7)។`,
      stepByStepSolutionEn: "pH = -log[H3O+] = -log(10^-3) = 3. Strong acid solution.",
      tipKm: "នៅសីតុណ្ហភាព 25°C៖ pH + pOH = 14 ជានិច្ច!",
    },
  ],

  // G10 Math 06-p2: Sets Cardinality & Venn Diagrams
  "les-g10-math-06-p2": [
    {
      id: "ex-g10-set-1",
      titleKm: "លំហាត់ទី ១ ៖ រូបមន្តកាឌីណាល់នៃសំណុំប្រជុំ n(A ∪ B)",
      titleEn: "Exercise 1: Cardinality of Set Union n(A ∪ B)",
      questionKm: "គេឱ្យសំណុំពីរ A និង B ដោយមានកាឌីណាល់ n(A) = 28, n(B) = 35 និង n(A ∩ B) = 12។ ចូរគណនាកាឌីណាល់នៃសំណុំប្រជុំ n(A ∪ B)៖",
      questionEn: "Given n(A) = 28, n(B) = 35, and n(A ∩ B) = 12. Find n(A ∪ B):",
      formulaOrContext: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
      options: [
        { labelKm: "n(A ∪ B) = 51", labelEn: "n(A ∪ B) = 51", isCorrect: true },
        { labelKm: "n(A ∪ B) = 63", labelEn: "n(A ∪ B) = 63", isCorrect: false },
        { labelKm: "n(A ∪ B) = 45", labelEn: "n(A ∪ B) = 45", isCorrect: false },
        { labelKm: "n(A ∪ B) = 75", labelEn: "n(A ∪ B) = 75", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តកាឌីណាល់នៃសំណុំប្រជុំ)៖**
$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$$

**ជំហានទី ២ (ជំនួសតម្លៃលេខ)៖**
$$n(A \\cup B) = 28 + 35 - 12 = 63 - 12 = 51$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $n(A \\cup B) = 51$`,
      stepByStepSolutionEn: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 28 + 35 - 12 = 51.",
      tipKm: "កុំភ្លេចដកផ្នែកប្រសព្វ n(A ∩ B) ចេញមួយដង ព្រោះវាត្រូវបានរាប់ពីរដង!",
    },
  ],

  // G10 Math 11-p2: Quadratic Equations via Discriminant Δ
  "les-g10-math-11-p2": [
    {
      id: "ex-g10-quad-1",
      titleKm: "លំហាត់ទី ១ ៖ ដោះស្រាយសមីការដឺក្រេទី ២ តាមឌីសគ្រីមីណង់ Δ",
      titleEn: "Exercise 1: Solving Quadratic Equation using Discriminant Δ",
      questionKm: "ចូរដោះស្រាយសមីការដឺក្រេទី ២ ៖ $2x^2 - 7x + 3 = 0$",
      questionEn: "Solve the quadratic equation: 2x^2 - 7x + 3 = 0",
      formulaOrContext: "\\Delta = b^2 - 4ac, \\quad x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}",
      options: [
        { labelKm: "x₁ = 3, x₂ = 1/2", labelEn: "x₁ = 3, x₂ = 1/2", isCorrect: true },
        { labelKm: "x₁ = -3, x₂ = -1/2", labelEn: "x₁ = -3, x₂ = -1/2", isCorrect: false },
        { labelKm: "x₁ = 7, x₂ = 2", labelEn: "x₁ = 7, x₂ = 2", isCorrect: false },
        { labelKm: "សមីការគ្មានឫសក្នុង R", labelEn: "No real roots", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (កំណត់មេគុណ)៖**
$a = 2, \\quad b = -7, \\quad c = 3$

**ជំហានទី ២ (គណនាឌីសគ្រីមីណង់ $\\Delta$)៖**
$$\\Delta = b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25 > 0$$
ដោយ $\\Delta > 0$ សមីការមានឫសពីរផ្សេងគ្នា $\\sqrt{\\Delta} = \\sqrt{25} = 5$។

**ជំហានទី ៣ (គណនាឫសទាំងពីរ)៖**
$$x_1 = \\frac{-(-7) + 5}{2(2)} = \\frac{7 + 5}{4} = \\frac{12}{4} = 3$$
$$x_2 = \\frac{-(-7) - 5}{2(2)} = \\frac{7 - 5}{4} = \\frac{2}{4} = \\frac{1}{2}$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $x_1 = 3, \\quad x_2 = \\frac{1}{2}$`,
      stepByStepSolutionEn: "a=2, b=-7, c=3. Δ = (-7)^2 - 4(2)(3) = 49 - 24 = 25. x = (7 ± 5)/4 => x1 = 3, x2 = 1/2.",
      tipKm: "ពេលគណនា (-7)² ត្រូវចាំថាការេនៃចំនួនអវិជ្ជមានចេញវិជ្ជមាន (+) ជានិច្ច!",
    },
  ],

  // G10 Math 12-p1: Vieta's Root Relations S & P
  "les-g10-math-12-p1": [
    {
      id: "ex-g10-vieta-1",
      titleKm: "លំហាត់ទី ១ ៖ បង្កើតសមីការដឺក្រេទី ២ ពីផលបូក និងផលគុណ",
      titleEn: "Exercise 1: Forming Quadratic Equation from Sum & Product",
      questionKm: "ចូរបង្កើតសមីការដឺក្រេទី ២ ដែលមានផលបូកឫស $S = x_1 + x_2 = 7$ និងផលគុណឫស $P = x_1 \\cdot x_2 = 12$៖",
      questionEn: "Form a quadratic equation with root sum S = 7 and product P = 12:",
      formulaOrContext: "X^2 - SX + P = 0",
      options: [
        { labelKm: "X² - 7X + 12 = 0", labelEn: "X² - 7X + 12 = 0", isCorrect: true },
        { labelKm: "X² + 7X + 12 = 0", labelEn: "X² + 7X + 12 = 0", isCorrect: false },
        { labelKm: "X² - 12X + 7 = 0", labelEn: "X² - 12X + 7 = 0", isCorrect: false },
        { labelKm: "X² + 7X - 12 = 0", labelEn: "X² + 7X - 12 = 0", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តវ្យែតទូទៅ)៖**
សមីការដឺក្រេទី ២ ដែលមានឫស $x_1, x_2$ ផ្ទៀងផ្ទាត់ទម្រង់៖
$$X^2 - SX + P = 0$$

**ជំហានទី ២ (ជំនួស $S = 7$ និង $P = 12$)៖**
$$X^2 - 7X + 12 = 0$$

**ផ្ទៀងផ្ទាត់ឫស៖** $x_1 = 3, x_2 = 4 \\implies 3+4=7, 3\\times 4=12$ (ត្រឹមត្រូវ)។`,
      stepByStepSolutionEn: "Equation format: X^2 - SX + P = 0. Substituting S=7, P=12 gives X^2 - 7X + 12 = 0.",
      tipKm: "ចងចាំរូបមន្ត៖ ដកផលបូក បូកផលគុណ (X² - SX + P = 0)!",
    },
  ],

  // G10 Math 05-p1: Quadratic Inequalities & Sign Tables
  "les-g10-math-05-p1": [
    {
      id: "ex-g10-ineq-1",
      titleKm: "លំហាត់ទី ១ ៖ ដោះស្រាយវិសមីការដឺក្រេទី ២ តាមតារាងសញ្ញា",
      titleEn: "Exercise 1: Quadratic Inequality via Sign Table",
      questionKm: "ចូរដោះស្រាយវិសមីការដឺក្រេទី ២ ៖ $x^2 - 5x + 6 > 0$",
      questionEn: "Solve the quadratic inequality: x^2 - 5x + 6 > 0",
      formulaOrContext: "ax^2 + bx + c > 0 \\implies x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)",
      options: [
        { labelKm: "x ∈ (-∞, 2) ∪ (3, +∞)", labelEn: "x ∈ (-∞, 2) ∪ (3, +∞)", isCorrect: true },
        { labelKm: "x ∈ [2, 3]", labelEn: "x ∈ [2, 3]", isCorrect: false },
        { labelKm: "x ∈ (2, 3)", labelEn: "x ∈ (2, 3)", isCorrect: false },
        { labelKm: "x ∈ (-∞, +∞)", labelEn: "x ∈ (-∞, +∞)", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រកឫសនៃត្រីធា)៖**
$x^2 - 5x + 6 = 0 \\iff (x - 2)(x - 3) = 0 \\implies x_1 = 2, \\quad x_2 = 3$

**ជំហានទី ២ (វិភាគសញ្ញាតាមវិធាន «ក្រៅដូច ក្នុងផ្ទុយ»)៖**
មេគុណ $a = 1 > 0$ (សញ្ញា +)៖
- ក្រៅចន្លោះឫស ($x < 2$ ឬ $x > 3$)៖ យកសញ្ញា **ដូច** $a$ (សញ្ញា +)
- ក្នុងចន្លោះឫស ($2 < x < 3$)៖ យកសញ្ញា **ផ្ទុយ** $a$ (សញ្ញា -)

**ជំហានទី ៣ (ទាញសំណុំចម្លើយ)៖**
ប្រធានតម្រូវឱ្យយក $> 0$ (សញ្ញា +)៖
$$S = (-\\infty, 2) \\cup (3, +\\infty)$$`,
      stepByStepSolutionEn: "Roots are x1 = 2, x2 = 3. Since a = 1 > 0, the trinomial is positive outside the roots: (-inf, 2) U (3, +inf).",
      tipKm: "វិធានមាសត្រីធាដឺក្រេទី ២៖ «ក្រៅដូចសញ្ញា a, ក្នុងចន្លោះឫសផ្ទុយសញ្ញា a»!",
    },
  ],

  // G10 Math 07-p2: Parabola Vertex & Symmetry Axis
  "les-g10-math-07-p2": [
    {
      id: "ex-g10-parabola-1",
      titleKm: "លំហាត់ទី ១ ៖ កំណត់កូអរដោនេកំពូលប៉ារ៉ាបូល",
      titleEn: "Exercise 1: Coordinates of Parabola Vertex",
      questionKm: "រកកូអរដោនេកំពូល $S(x_0, y_0)$ នៃប៉ារ៉ាបូល $y = x^2 - 4x + 3$៖",
      questionEn: "Find the coordinates of the vertex S(x0, y0) of the parabola y = x^2 - 4x + 3:",
      formulaOrContext: "x_0 = -\\frac{b}{2a}, \\quad y_0 = f(x_0)",
      options: [
        { labelKm: "S(2, -1)", labelEn: "S(2, -1)", isCorrect: true },
        { labelKm: "S(-2, 1)", labelEn: "S(-2, 1)", isCorrect: false },
        { labelKm: "S(4, 3)", labelEn: "S(4, 3)", isCorrect: false },
        { labelKm: "S(2, 3)", labelEn: "S(2, 3)", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រកអាប់ស៊ីសកំពូល $x_0$)៖**
$a = 1, \\quad b = -4, \\quad c = 3$
$$x_0 = -\\frac{b}{2a} = -\\frac{-4}{2(1)} = \\frac{4}{2} = 2$$

**ជំហានទី ២ (រកអរដោនេកំពូល $y_0$)៖**
ជំនួស $x_0 = 2$ ចូលសមីការប៉ារ៉ាបូល៖
$$y_0 = (2)^2 - 4(2) + 3 = 4 - 8 + 3 = -1$$

**ចម្លើយត្រឹមត្រូវគឺ៖** កំពូល $S(2, -1)$ (ប៉ារ៉ាបូលមានតម្លៃអប្បបរមាស្មើ -1 ត្រង់ x = 2)`,
      stepByStepSolutionEn: "x0 = -b/(2a) = 4/2 = 2. y0 = f(2) = 4 - 8 + 3 = -1. Vertex S(2, -1).",
      tipKm: "បន្ទាត់ឆ្លុះនៃប៉ារ៉ាបូលមានសមីការ x = -b/(2a) ជានិច្ច!",
    },
  ],

  // G10 Math 14-p1: 2D Vectors Orthogonality
  "les-g10-math-14-p1": [
    {
      id: "ex-g10-vector-1",
      titleKm: "លំហាត់ទី ១ ៖ លក្ខខណ្ឌកែងគ្នានៃវ៉ិចទ័រពីរ",
      titleEn: "Exercise 1: Orthogonality of Two 2D Vectors",
      questionKm: "គេឱ្យវ៉ិចទ័រពីរ $\\vec{u} = (3, -2)$ និង $\\vec{v} = (4, m)$។ រកតម្លៃ $m$ ដើម្បីឱ្យ $\\vec{u} \\perp \\vec{v}$៖",
      questionEn: "Given u = (3, -2) and v = (4, m). Find m such that u ⊥ v:",
      formulaOrContext: "\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = xx' + yy' = 0",
      options: [
        { labelKm: "m = 6", labelEn: "m = 6", isCorrect: true },
        { labelKm: "m = -6", labelEn: "m = -6", isCorrect: false },
        { labelKm: "m = 4", labelEn: "m = 4", isCorrect: false },
        { labelKm: "m = 0", labelEn: "m = 0", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (លក្ខខណ្ឌកែងគ្នាតាមផលគុណស្កាលែ)៖**
$$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$$
$$xx' + yy' = 0$$

**ជំហានទី ២ (ជំនួសកូអរដោនេ)៖**
$$(3)(4) + (-2)(m) = 0$$
$$12 - 2m = 0 \\implies 2m = 12 \\implies m = 6$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $m = 6$`,
      stepByStepSolutionEn: "u . v = 0 => (3)(4) + (-2)(m) = 0 => 12 - 2m = 0 => m = 6.",
      tipKm: "វ៉ិចទ័រកែងគ្នា ផលគុណស្កាលែស្មើ 0 (xx' + yy' = 0)!",
    },
  ],

  // G11 Math 15: Arithmetic Progression General Term
  "les-g11-math-15": [
    {
      id: "ex-g11-ap-1",
      titleKm: "លំហាត់ទី ១ ៖ រកតួទី ១០ នៃស្វ៊ីតនព្វន្ត",
      titleEn: "Exercise 1: Find the 10th Term of an Arithmetic Progression",
      questionKm: "គេឱ្យស្វ៊ីតនព្វន្ត $(u_n)$ ដែលមានតួទីមួយ $u_1 = 3$ និងផលសងរួម $d = 4$។ ចូរគណនាតម្លៃនៃតួទី ១០ ($u_{10}$)៖",
      questionEn: "Given an arithmetic progression with u1 = 3 and d = 4. Find u10:",
      formulaOrContext: "u_n = u_1 + (n - 1)d",
      options: [
        { labelKm: "u₁₀ = 39", labelEn: "u₁₀ = 39", isCorrect: true },
        { labelKm: "u₁₀ = 43", labelEn: "u₁₀ = 43", isCorrect: false },
        { labelKm: "u₁₀ = 36", labelEn: "u₁₀ = 36", isCorrect: false },
        { labelKm: "u₁₀ = 40", labelEn: "u₁₀ = 40", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តតួទូទៅស្វ៊ីតនព្វន្ត)៖**
$$u_n = u_1 + (n - 1)d$$

**ជំហានទី ២ (ជំនួស $n = 10, u_1 = 3, d = 4$)៖**
$$u_{10} = 3 + (10 - 1)(4) = 3 + 9(4) = 3 + 36 = 39$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $u_{10} = 39$`,
      stepByStepSolutionEn: "u10 = u1 + (10 - 1)d = 3 + 9(4) = 3 + 36 = 39.",
      tipKm: "តួទី n ត្រូវគុណនឹង (n - 1) ដងនៃ d មិនមែនគុណនឹង n ទេ!",
    },
  ],

  // G11 Math 17: Infinite Geometric Series
  "les-g11-math-17": [
    {
      id: "ex-g11-gp-inf-1",
      titleKm: "លំហាត់ទី ១ ៖ គណនាផលបូកអនន្តនៃស្វ៊ីតធរណីមាត្រចុះ",
      titleEn: "Exercise 1: Sum of an Infinite Decreasing Geometric Series",
      questionKm: "ចូរគណនាផលបូកអនន្ត ៖ $S = 1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots$៖",
      questionEn: "Compute the sum of the infinite series: S = 1 + 1/2 + 1/4 + 1/8 + ...:",
      formulaOrContext: "S = \\frac{u_1}{1 - q} \\quad (|q| < 1)",
      options: [
        { labelKm: "S = 2", labelEn: "S = 2", isCorrect: true },
        { labelKm: "S = 1", labelEn: "S = 1", isCorrect: false },
        { labelKm: "S = 4", labelEn: "S = 4", isCorrect: false },
        { labelKm: "S = ∞", labelEn: "S = ∞", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (កំណត់តួដើម និងផលធៀបរួម)៖**
- តួដើម ៖ $u_1 = 1$
- ផលធៀបរួម ៖ $q = \\frac{1/2}{1} = \\frac{1}{2}$
ដោយ $|q| = \\frac{1}{2} < 1$ ស្វ៊ីតនេះជាស្វ៊ីតធរណីមាត្រចុះអនន្តដែលរួមចូល។

**ជំហានទី ២ (អនុវត្តរូបមន្តផលបូកអនន្ត)៖**
$$S = \\frac{u_1}{1 - q} = \\frac{1}{1 - \\frac{1}{2}} = \\frac{1}{\\frac{1}{2}} = 2$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $S = 2$`,
      stepByStepSolutionEn: "u1 = 1, q = 1/2. S = u1 / (1 - q) = 1 / (1 - 1/2) = 2.",
      tipKm: "រូបមន្ត S = u1 / (1 - q) ប្រើបានតែពេល |q| < 1 ប៉ុណ្ណោះ!",
    },
  ],

  // G11 Math 20: Tangent Line Equation
  "les-g11-math-20": [
    {
      id: "ex-g11-tangent-1",
      titleKm: "លំហាត់ទី ១ ៖ រកសមីការបន្ទាត់ប៉ះក្រាបពហុធា",
      titleEn: "Exercise 1: Find Tangent Line Equation to Parabola",
      questionKm: "រកសមីការបន្ទាត់ប៉ះ $(T)$ ទៅនឹងក្រាប $(C): y = x^2$ ត្រង់ចំណុចដែលមានអាប់ស៊ីស $x_0 = 1$៖",
      questionEn: "Find the equation of tangent line (T) to y = x^2 at x0 = 1:",
      formulaOrContext: "(T): y = f'(x_0)(x - x_0) + f(x_0)",
      options: [
        { labelKm: "(T): y = 2x - 1", labelEn: "(T): y = 2x - 1", isCorrect: true },
        { labelKm: "(T): y = 2x + 1", labelEn: "(T): y = 2x + 1", isCorrect: false },
        { labelKm: "(T): y = x", labelEn: "(T): y = x", isCorrect: false },
        { labelKm: "(T): y = 2x", labelEn: "(T): y = 2x", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (គណនាដេរីវេ $f'(x)$ និងមេគុណប្រាប់ទិស $k$)៖**
$f(x) = x^2 \\implies f'(x) = 2x$
ត្រង់ $x_0 = 1$ ៖ $k = f'(1) = 2(1) = 2$

**ជំហានទី ២ (គណនាអរដោនេ $y_0$)៖**
$y_0 = f(1) = (1)^2 = 1 \\implies$ ចំណុចប៉ះគឺ $M_0(1, 1)$

**ជំហានទី ៣ (សរសេរសមីការបន្ទាត់ប៉ះ)៖**
$$(T): y = f'(x_0)(x - x_0) + y_0$$
$$y = 2(x - 1) + 1 = 2x - 2 + 1 = 2x - 1$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $(T): y = 2x - 1$`,
      stepByStepSolutionEn: "f'(x) = 2x => f'(1) = 2, f(1) = 1. (T): y = 2(x - 1) + 1 = 2x - 1.",
      tipKm: "មេគុណប្រាប់ទិសបន្ទាត់ប៉ះ k = f'(x0) ជានិច្ច!",
    },
  ],

  // G11 Math 27: Combinations
  "les-g11-math-27": [
    {
      id: "ex-g11-comb-1",
      titleKm: "លំហាត់ទី ១ ៖ គណនាតម្លៃនៃបន្សំ C_n^k",
      titleEn: "Exercise 1: Evaluate Combination C_n^k",
      questionKm: "ចូរគណនាតម្លៃនៃបន្សំ ៖ $C_7^3$ (ជ្រើសរើស ៣ នាក់ចេញពី ៧ នាក់ដោយមិនគិតលំដាប់)៖",
      questionEn: "Evaluate the combination C_7^3:",
      formulaOrContext: "C_n^k = \\frac{n!}{k!(n - k)!}",
      options: [
        { labelKm: "C₇³ = 35", labelEn: "C₇³ = 35", isCorrect: true },
        { labelKm: "C₇³ = 210", labelEn: "C₇³ = 210", isCorrect: false },
        { labelKm: "C₇³ = 21", labelEn: "C₇³ = 21", isCorrect: false },
        { labelKm: "C₇³ = 42", labelEn: "C₇³ = 42", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តបន្សំ)៖**
$$C_7^3 = \\frac{7!}{3!(7 - 3)!} = \\frac{7!}{3! \\times 4!}$$

**ជំហានទី ២ (សម្រួលកត្តាតាម)៖**
$$C_7^3 = \\frac{7 \\times 6 \\times 5 \\times 4!}{3 \\times 2 \\times 1 \\times 4!} = \\frac{7 \\times 6 \\times 5}{6} = 7 \\times 5 = 35$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $C_7^3 = 35$`,
      stepByStepSolutionEn: "C_7^3 = (7 * 6 * 5) / (3 * 2 * 1) = 210 / 6 = 35.",
      tipKm: "សម្រួល 4! ចោលភ្លាម ដើម្បីកុំឱ្យលេខធំពិបាកគណនា!",
    },
  ],

  // G9 Math 14: Rationalizing Denominators
  "les-g9-math-14": [
    {
      id: "ex-g9-rad-1",
      titleKm: "លំហាត់ទី ១ ៖ បំបាត់រ៉ាឌីកាល់ពីភាគបែង",
      titleEn: "Exercise 1: Rationalize the Denominator",
      questionKm: "ចូរបំបាត់រ៉ាឌីកាល់ពីភាគបែងនៃប្រភាគ ៖ $A = \\frac{6}{\\sqrt{3}}$",
      questionEn: "Rationalize the denominator of the fraction: A = 6 / sqrt(3)",
      formulaOrContext: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}",
      options: [
        { labelKm: "A = 2√3", labelEn: "A = 2√3", isCorrect: true },
        { labelKm: "A = 3√3", labelEn: "A = 3√3", isCorrect: false },
        { labelKm: "A = 6√3", labelEn: "A = 6√3", isCorrect: false },
        { labelKm: "A = 2", labelEn: "A = 2", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (គុណភាគយក និងភាគបែងនឹង $\\sqrt{3}$)៖**
$$A = \\frac{6 \\times \\sqrt{3}}{\\sqrt{3} \\times \\sqrt{3}} = \\frac{6\\sqrt{3}}{3}$$

**ជំហានទី ២ (សម្រួល 6 នឹង 3)៖**
$$A = 2\\sqrt{3}$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $A = 2\\sqrt{3}$`,
      stepByStepSolutionEn: "Multiply numerator and denominator by sqrt(3): 6*sqrt(3)/3 = 2*sqrt(3).",
      tipKm: "√b × √b = b ជួយបំបាត់ឫសការេពីភាគបែងភ្លាម!",
    },
  ],

  // G9 Math 18: Reduced Discriminant Δ'
  "les-g9-math-18": [
    {
      id: "ex-g9-quad-red-1",
      titleKm: "លំហាត់ទី ១ ៖ ដោះស្រាយសមីការតាមឌីសគ្រីមីណង់សម្រួល Δ'",
      titleEn: "Exercise 1: Solve Equation via Reduced Discriminant Δ'",
      questionKm: "ចូរដោះស្រាយសមីការដឺក្រេទី ២ ៖ $x^2 - 6x + 8 = 0$ តាម $\\Delta'$៖",
      questionEn: "Solve the quadratic equation using reduced discriminant Δ': x^2 - 6x + 8 = 0",
      formulaOrContext: "\\Delta' = (b')^2 - ac, \\quad x = \\frac{-b' \\pm \\sqrt{\\Delta'}}{a}",
      options: [
        { labelKm: "x₁ = 2, x₂ = 4", labelEn: "x₁ = 2, x₂ = 4", isCorrect: true },
        { labelKm: "x₁ = -2, x₂ = -4", labelEn: "x₁ = -2, x₂ = -4", isCorrect: false },
        { labelKm: "x₁ = 1, x₂ = 8", labelEn: "x₁ = 1, x₂ = 8", isCorrect: false },
        { labelKm: "x₁ = 3, x₂ = 5", labelEn: "x₁ = 3, x₂ = 5", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (កំណត់មេគុណសម្រួល $b'$)៖**
$a = 1, \\quad b = -6 \\implies b' = \\frac{-6}{2} = -3, \\quad c = 8$

**ជំហានទី ២ (គណនាឌីសគ្រីមីណង់សម្រួល $\\Delta'$)៖**
$$\\Delta' = (b')^2 - ac = (-3)^2 - (1)(8) = 9 - 8 = 1 > 0$$
$\\sqrt{\\Delta'} = \\sqrt{1} = 1$

**ជំហានទី ៣ (គណនាឫសទាំងពីរ)៖**
$$x_1 = \\frac{-(-3) - 1}{1} = 3 - 1 = 2$$
$$x_2 = \\frac{-(-3) + 1}{1} = 3 + 1 = 4$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $x_1 = 2, \\quad x_2 = 4$`,
      stepByStepSolutionEn: "b' = -3. Δ' = 9 - 8 = 1. x = 3 ± 1 => x1 = 2, x2 = 4.",
      tipKm: "ប្រើ Δ' ពេល b ជាចំនួនគូ លេខគណនាតូចជាង និងលឿនជាង Δ ធម្មតា ៤ ដង!",
    },
  ],

  // G9 Math 24: Right Triangle Metric Relations
  "les-g9-math-24": [
    {
      id: "ex-g9-metric-1",
      titleKm: "លំហាត់ទី ១ ៖ រកប្រវែងកម្ពស់ h តាម h² = b'c'",
      titleEn: "Exercise 1: Find Altitude h via h² = b'c'",
      questionKm: "ក្នុងត្រីកោណកែង $ABC$ កែងត្រង់ $A$ កម្ពស់ $AH = h$ ចែកអ៊ីប៉ូតេនុសជាពីរអង្កត់ $b' = 4\\text{ cm}$ និង $c' = 9\\text{ cm}$។ រកប្រវែង $h$៖",
      questionEn: "In right triangle ABC with altitude h and projections b' = 4 cm, c' = 9 cm. Find h:",
      formulaOrContext: "h^2 = b' \\cdot c' \\implies h = \\sqrt{b' c'}",
      options: [
        { labelKm: "h = 6 cm", labelEn: "h = 6 cm", isCorrect: true },
        { labelKm: "h = 13 cm", labelEn: "h = 13 cm", isCorrect: false },
        { labelKm: "h = 36 cm", labelEn: "h = 36 cm", isCorrect: false },
        { labelKm: "h = 5 cm", labelEn: "h = 5 cm", isCorrect: false },
      ],
      stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តទំនាក់ទំនងម៉េទ្រិច)៖**
$$h^2 = b' \\cdot c'$$

**ជំហានទី ២ (ជំនួស $b' = 4, c' = 9$)៖**
$$h^2 = 4 \\times 9 = 36$$
$$h = \\sqrt{36} = 6\\text{ cm}$$

**ចម្លើយត្រឹមត្រូវគឺ៖** $h = 6\\text{ cm}$`,
      stepByStepSolutionEn: "h^2 = b' * c' = 4 * 9 = 36 => h = 6 cm.",
      tipKm: "កម្ពស់គិតជាមធ្យមធរណីមាត្រនៃចំណោលកែងទាំងពីរ (h = √(b'c'))!",
    },
  ],
};

/**
 * Universal fallback practice exercise generator that provides realistic,
 * topic-aligned calculation problems for ANY lesson across Grades 7 to 12.
 */
export function getLessonPracticeExercises(lesson: CuratedLesson): PracticeExercise[] {
  // 1. Check curated bank first
  if (CURATED_PRACTICE_BANK[lesson.id]) {
    return CURATED_PRACTICE_BANK[lesson.id];
  }

  // 2. Generate dynamic topic-based authentic calculations
  const title = (lesson.title_km + " " + lesson.title_en).toLowerCase();
  const grade = lesson.grade;
  const subj = lesson.subject.slug;

  // Mathematics
  if (subj === "mathematics") {
    if (title.includes("fraction") || title.includes("ប្រភាគ")) {
      return [
        {
          id: `ex-gen-${lesson.id}-1`,
          titleKm: "លំហាត់អនុវត្ត ៖ ផលបូកប្រភាគភាគបែងខុសគ្នា",
          titleEn: "Practice Exercise: Adding Unlike Fractions",
          questionKm: "ចូរគណនា និងសម្រួលប្រភាគខាងក្រោមឱ្យទៅជាប្រភាគសម្រួលលែងបាន៖",
          questionEn: "Compute and simplify the fraction sum:",
          formulaOrContext: "A = \\frac{2}{3} + \\frac{1}{6}",
          options: [
            { labelKm: "A = 5/6", labelEn: "A = 5/6", isCorrect: true },
            { labelKm: "A = 3/9", labelEn: "A = 3/9", isCorrect: false },
            { labelKm: "A = 1/2", labelEn: "A = 1/2", isCorrect: false },
            { labelKm: "A = 1", labelEn: "A = 1", isCorrect: false },
          ],
          stepByStepSolutionKm: `**ជំហានទី ១ (តម្រូវភាគបែងរួម)៖**
ភាគបែងរួមតូចបំផុត (LCM) នៃ 3 និង 6 គឺ 6។
$$\\frac{2}{3} = \\frac{2 \\times 2}{3 \\times 2} = \\frac{4}{6}$$

**ជំហានទី ២ (បូកភាគយក រក្សាភាគបែង)៖**
$$A = \\frac{4}{6} + \\frac{1}{6} = \\frac{4 + 1}{6} = \\frac{5}{6}$$`,
          stepByStepSolutionEn: "Common denominator is 6. 2/3 = 4/6. 4/6 + 1/6 = 5/6.",
          tipKm: "រកភាគបែងរួមតូចបំផុត (LCM) មុននឹងបូកភាគយក!",
        },
      ];
    }

    if (title.includes("equation") || title.includes("សមីការ")) {
      return [
        {
          id: `ex-gen-${lesson.id}-1`,
          titleKm: "លំហាត់អនុវត្ត ៖ ដោះស្រាយសមីការដឺក្រេទី ១",
          titleEn: "Practice Exercise: Linear Equation",
          questionKm: "ចូររកតម្លៃ $x$ នៃសមីការខាងក្រោម៖",
          questionEn: "Solve for x in the linear equation:",
          formulaOrContext: "3x - 7 = 11",
          options: [
            { labelKm: "x = 6", labelEn: "x = 6", isCorrect: true },
            { labelKm: "x = 4", labelEn: "x = 4", isCorrect: false },
            { labelKm: "x = -6", labelEn: "x = -6", isCorrect: false },
            { labelKm: "x = 18", labelEn: "x = 18", isCorrect: false },
          ],
          stepByStepSolutionKm: `**ជំហានទី ១ (ផ្ទេរតួថេរ)៖**
$$3x = 11 + 7 \\implies 3x = 18$$

**ជំហានទី ២ (ចែកនឹងមេគុណ 3)៖**
$$x = \\frac{18}{3} = 6$$`,
          stepByStepSolutionEn: "3x = 11 + 7 = 18. x = 18 / 3 = 6.",
          tipKm: "ពេលបោះលេខឆ្លងសញ្ញាស្មើ (=) ត្រូវប្តូរសញ្ញាពីដក (-) ទៅជាបូក (+)!",
        },
      ];
    }
  }

  // Physics
  if (subj === "physics") {
    return [
      {
        id: `ex-gen-${lesson.id}-1`,
        titleKm: "លំហាត់អនុវត្តរូបវិទ្យា ៖ ច្បាប់ញូតុន និងការគណនាកម្លាំង",
        titleEn: "Physics Practice: Newton's Second Law",
        questionKm: "វត្ថុមួយមានម៉ាស $m = 5\\text{ kg}$ ផ្លាស់ទីដោយសំទុះ $a = 3\\text{ m/s}^2$។ ចូរគណនាកម្លាំងចលករ $F$៖",
        questionEn: "A body of mass m = 5 kg accelerates at a = 3 m/s^2. Find the net force F:",
        formulaOrContext: "F = m \\cdot a",
        options: [
          { labelKm: "F = 15 N", labelEn: "F = 15 N", isCorrect: true },
          { labelKm: "F = 8 N", labelEn: "F = 8 N", isCorrect: false },
          { labelKm: "F = 1.67 N", labelEn: "F = 1.67 N", isCorrect: false },
          { labelKm: "F = 45 N", labelEn: "F = 45 N", isCorrect: false },
        ],
        stepByStepSolutionKm: `**ជំហានទី ១ (ប្រើរូបមន្តច្បាប់ទី ២ ញូតុន)៖**
$$F = m \\cdot a$$

**ជំហានទី ២ (ជំនួសតម្លៃលេខ)៖**
$$F = 5\\text{ kg} \\times 3\\text{ m/s}^2 = 15\\text{ N (ញូតុន)}$$`,
        stepByStepSolutionEn: "F = m * a = 5 kg * 3 m/s^2 = 15 N.",
        tipKm: "ខ្នាតស្តង់ដារ SI នៃកម្លាំងគឺ ញូតុន (N)!",
      },
    ];
  }

  // Chemistry
  if (subj === "chemistry") {
    return [
      {
        id: `ex-gen-${lesson.id}-1`,
        titleKm: "លំហាត់អនុវត្តគីមីវិទ្យា ៖ គណនាម៉ាសម៉ូល និងចំនួនម៉ូល",
        titleEn: "Chemistry Practice: Moles & Molar Mass",
        questionKm: "ចូរគណនាចំនួនម៉ូល $n$ ដែលមានក្នុងទឹក $H_2O$ ចំនួន $36\\text{ g}$ (ដឹងថា $M(H_2O) = 18\\text{ g/mol}$)៖",
        questionEn: "Find the amount of substance n in 36 g of water (M = 18 g/mol):",
        formulaOrContext: "n = \\frac{m}{M}",
        options: [
          { labelKm: "n = 2 mol", labelEn: "n = 2 mol", isCorrect: true },
          { labelKm: "n = 0.5 mol", labelEn: "n = 0.5 mol", isCorrect: false },
          { labelKm: "n = 54 mol", labelEn: "n = 54 mol", isCorrect: false },
          { labelKm: "n = 1 mol", labelEn: "n = 1 mol", isCorrect: false },
        ],
        stepByStepSolutionKm: `**ជំហានទី ១ (រូបមន្តចំនួនម៉ូល)៖**
$$n = \\frac{m}{M}$$

**ជំហានទី ២ (ជំនួសតម្លៃ)៖**
$$n = \\frac{36\\text{ g}}{18\\text{ g/mol}} = 2\\text{ mol}$$`,
        stepByStepSolutionEn: "n = m / M = 36 / 18 = 2 mol.",
        tipKm: "ចំនួនម៉ូល = ម៉ាស (g) ចែកនឹង ម៉ាសម៉ូល (g/mol)!",
      },
    ];
  }

  // Biology & General Fallback
  return [
    {
      id: `ex-gen-${lesson.id}-1`,
      titleKm: "លំហាត់អនុវត្តការយល់ដឹង និងការវិភាគ",
      titleEn: "Concept Analysis & Application Exercise",
      questionKm: `ផ្អែកលើខ្លឹមសារមេរៀន «${lesson.title_km}» តើមួយណាជាការអនុវត្តត្រឹមត្រូវបំផុត?`,
      questionEn: `Based on the lesson "${lesson.title_en}", which is the most accurate practical application?`,
      options: [
        {
          labelKm: "អនុវត្តរូបមន្ត និងទ្រឹស្តីបទត្រង់ចំណុចគោលដៅ ជាមួយខ្នាតរង្វាស់ត្រឹមត្រូវ",
          labelEn: "Apply formulas and theorems directly with proper units",
          isCorrect: true,
        },
        {
          labelKm: "ចងចាំតែនិយមន័យដោយមិនចាំបាច់ផ្ទៀងផ្ទាត់លក្ខខណ្ឌកំណត់",
          labelEn: "Memorize only definitions without boundary checks",
          isCorrect: false,
        },
        {
          labelKm: "សន្មត់លទ្ធផលដោយមិនបាច់គណនាជំហានគំរូ",
          labelEn: "Assume results without intermediate calculation",
          isCorrect: false,
        },
      ],
      stepByStepSolutionKm: `**វិធីសាស្ត្រដោះស្រាយត្រឹមត្រូវ៖**
១. កំណត់ទិន្នន័យដែលប្រធានប្រាប់ និងខ្នាតរង្វាស់។
២. ជ្រើសរើសរូបមន្តដែលត្រូវគ្នានឹងលក្ខខណ្ឌកំណត់។
៣. គណនាលទ្ធផលមួយជំហានម្តងៗ និងផ្ទៀងផ្ទាត់ភាពសមហេតុផល។`,
      stepByStepSolutionEn: "1. Identify given variables and units. 2. Select appropriate formula. 3. Calculate step-by-step.",
      tipKm: "ការយល់ដឹងពីលក្ខខណ្ឌកំណត់ជួយការពារការខុសបច្ចេកទេសក្នុងការប្រឡង!",
    },
  ];
}
