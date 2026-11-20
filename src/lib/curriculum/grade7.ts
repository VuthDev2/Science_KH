import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_7_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 7 — MATHEMATICS (គណិតវិទ្យា ថ្នាក់ទី ៧) — Official MoEYS Curriculum
  // Based on the Official MoEYS Student Textbook (សៀវភៅសិក្សាគោល ក្រសួងអប់រំ យុវជន និងកីឡា)
  // Structured into 5 Official Units (ជំពូក) and 22 Standard Lessons
  // ============================================================================

  // ----------------------------------------------------------------------------
  // ជំពូកទី ១ ៖ ចំនួនគត់ និងចំនួនគត់រ៉ឺឡាទីប (Unit 1: Integers & Signed Numbers)
  // ----------------------------------------------------------------------------
  {
    id: "les-g7-math-01",
    grade: 7,
    sort_order: 1,
    title_km: "ចំនួនគត់ (សញ្ញាណ ឫសការេ និងឫសគូប)",
    title_en: "Whole Numbers, Square Roots & Cube Roots",
    summary_km: "ស្វែងយល់ចំនួនគត់ធម្មជាតិ បន្ទាត់ចំនួន ស្វ័យគុណការេ គូប ឫសការេ និងឫសគូប",
    summary_en: "Natural whole numbers, number lines, square numbers, cube numbers, and evaluating square & cube roots",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-01" },
    body_km: `## ១. សញ្ញាណចំនួនគត់ធម្មជាតិ
សំណុំចំនួនគត់ធម្មជាតិ $\\mathbb{N} = \\{0, 1, 2, 3, 4, 5, ...\\}$។
- ចំនួនគត់ត្រូវបានតាងដោយចំណុចស្មើៗគ្នានៅលើបន្ទាត់ចំនួន។
- ការប្រៀបធៀប៖ ចំនួនដែលនៅខាងស្តាំតែងតែធំជាងចំនួននៅខាងឆ្វេង។

## ២. ចំនួនការេ និងឫសការេ (Square & Square Roots)
- **ចំនួនការេ៖** គឺជាផលគុណនៃចំនួនមួយនឹងខ្លួនវា៖ $a^2 = a \\times a$
  - ឧទាហរណ៍៖ $1^2 = 1, \\; 2^2 = 4, \\; 3^2 = 9, \\; 4^2 = 16, \\; 5^2 = 25, \\; 6^2 = 36$
- **ឫសការេ ($\\sqrt{\\phantom{a}}$)៖** បើ $b = a^2$ នោះ $\\sqrt{b} = a$ (ចំពោះ $a \\ge 0$)
  - $\\sqrt{49} = 7$ ពីព្រោះ $7^2 = 49$
  - $\\sqrt{81} = 9$ ពីព្រោះ $9^2 = 81$

## ៣. ចំនួនគូប និងឫសគូប (Cube & Cube Roots)
- **ចំនួនគូប៖** គឺជាផលគុណនៃ ៣ កត្តាស្មើគ្នា៖ $a^3 = a \\times a \\times a$
  - ឧទាហរណ៍៖ $1^3 = 1, \\; 2^3 = 8, \\; 3^3 = 27, \\; 4^3 = 64, \\; 5^3 = 125$
- **ឫសគូប ($\\sqrt[3]{\\phantom{a}}$)៖** បើ $b = a^3$ នោះ $\\sqrt[3]{b} = a$
  - $\\sqrt[3]{27} = 3$ ពីព្រោះ $3^3 = 27$
  - $\\sqrt[3]{64} = 4$ ពីព្រោះ $4^3 = 64$`,
    body_en: `## 1. Natural Whole Numbers
The set of whole numbers $\\mathbb{N} = \\{0, 1, 2, 3, 4, ...\\}$. Values are plotted at equal intervals along the number line.

## 2. Square Numbers & Square Roots
- A square number is a number multiplied by itself: $a^2 = a \\times a$. Example: $6^2 = 36$.
- The square root symbol $\\sqrt{\\phantom{a}}$ reverses squaring: $\\sqrt{49} = 7$ because $7^2 = 49$.

## 3. Cube Numbers & Cube Roots
- A cube number is formed by multiplying three identical factors: $a^3 = a \\times a \\times a$. Example: $3^3 = 27$.
- The cube root $\\sqrt[3]{\\phantom{a}}$ satisfies $\\sqrt[3]{b} = a \\iff a^3 = b$. Example: $\\sqrt[3]{64} = 4$.`,
  },
  {
    id: "les-g7-math-02",
    grade: 7,
    sort_order: 2,
    title_km: "តួចែក និងពហុគុណ (ប.ម.ធ និង ព.គ.ទ)",
    title_en: "Divisors & Multiples (GCD & LCM)",
    summary_km: "កត្តាបឋម ការបំបែកជាផលគុណកត្តាបឋម តួចែករួមធំបំផុត (ប.ម.ធ) និងពហុគុណរួមតូចបំផុត (ព.គ.ទ)",
    summary_en: "Prime numbers, prime factorization, greatest common divisor (GCD), and least common multiple (LCM)",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-02" },
    body_km: `## ១. ចំនួនបឋម និងកត្តាបឋម
- **ចំនួនបឋម (Prime Number)៖** គឺជាចំនួនគត់ធម្មជាតិធំជាង $1$ ដែលមានតួចែកតែពីរគត់ គឺ $1$ និងខ្លួនវា ($2, 3, 5, 7, 11, 13, 17, 19, ...$)។
- **ការបំបែកជាកត្តាបឋម៖**
  $$24 = 2^3 \\times 3, \\quad 36 = 2^2 \\times 3^2$$

## ២. តួចែករួមធំបំផុត — ប.ម.ធ (GCD / GCF)
ប.ម.ធ គឺជាផលគុណនៃ **កត្តាបឋមរួម ដែលមានស្វ័យគុណតូចជាងគេ**។
- រក ប.ម.ធ(២៤, ៣៦)៖
  $$\\text{កត្តារួម៖ } 2 \\text{ និង } 3 \\implies \\text{ប.ម.ធ} = 2^2 \\times 3 = 12$$

## ៣. ពហុគុណរួមតូចបំផុត — ព.គ.ទ (LCM)
ព.គ.ទ គឺជាផលគុណនៃ **កត្តាបឋមរួម និងមិនរួមទាំងអស់ ដោយយកស្វ័យគុណធំជាងគេ**។
- រក ព.គ.ទ(២៤, ៣៦)៖
  $$\\text{ព.គ.ទ} = 2^3 \\times 3^2 = 8 \\times 9 = 72$$`,
    body_en: `## 1. Prime Numbers & Factorization
A prime number has exactly two factors: 1 and itself ($2, 3, 5, 7, 11, ...$). Prime factorization writes a number as a product of primes: $24 = 2^3 \\times 3$.

## 2. Greatest Common Divisor (GCD)
Take common prime factors with their lowest exponents: $\\text{GCD}(24, 36) = 2^2 \\times 3 = 12$.

## 3. Least Common Multiple (LCM)
Take all prime factors with their highest exponents: $\\text{LCM}(24, 36) = 2^3 \\times 3^2 = 72$.`,
  },
  {
    id: "les-g7-math-03",
    grade: 7,
    sort_order: 3,
    title_km: "ចំនួនគត់រ៉ឺឡាទីប និងប្រមាណវិធី",
    title_en: "Signed Integers & Operations",
    summary_km: "ចំនួនគត់វិជ្ជមាន ចំនួនសូន្យ ចំនួនគត់អវិជ្ជមាន តម្លៃដាច់ខាត វិធីបូក ដក គុណ ចែក",
    summary_en: "Signed integers, order on the number line, absolute value |a|, and basic integer arithmetic (+, -, ×, ÷)",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-03" },
    body_km: `## ១. និយមន័យចំនួនគត់រ៉ឺឡាទីប
សំណុំចំនួនគត់រ៉ឺឡាទីប $\\mathbb{Z}$ រួមមាន៖
- ចំនួនគត់វិជ្ជមាន៖ $+1, +2, +3, ...$
- ចំនួនសូន្យ៖ $0$
- ចំនួនគត់អវិជ្ជមាន៖ $-1, -2, -3, ...$

## ២. តម្លៃដាច់ខាត (Absolute Value)
$|a|$ គឺជាចម្ងាយពីចំណុច $a$ ទៅ $0$ លើបន្ទាត់ចំនួន។ $|a| \\ge 0$ ជានិច្ច។
- $|+5| = 5, \\quad |-5| = 5, \\quad |0| = 0$

## ៣. វិធានប្រមាណវិធី
- **វិធីបូក៖**
  - សញ្ញាដូចគ្នា៖ $(+4) + (+6) = +10, \\; (-3) + (-5) = -8$
  - សញ្ញាផ្ទុយគ្នា៖ $(-7) + (+15) = +8, \\; (+6) + (-11) = -5$
- **វិធីដក៖** $a - b = a + (-b)$
  - $5 - (-4) = 5 + 4 = 9$
- **វិធីគុណ និងចែក៖**
  - សញ្ញាដូចគ្នាបានវិជ្ជមាន៖ $(+) \\times (+) = (+), \\; (-) \\times (-) = (+)$
  - សញ្ញាខុសគ្នាបានអវិជ្ជមាន៖ $(+) \\times (-) = (-), \\; (-) \\times (+) = (-)$`,
    body_en: `## 1. Signed Integers
$\\mathbb{Z} = \\{..., -3, -2, -1, 0, +1, +2, +3, ...\\}$. Values to the right on the number line are strictly greater.

## 2. Absolute Value
$|a|$ measures distance from zero: $|-5| = 5$ and $|+5| = 5$.

## 3. Operations
- Addition: Like signs add magnitudes and keep sign. Opposite signs subtract smaller from larger magnitude and keep the sign of the larger.
- Subtraction: $a - b = a + (-b)$.
- Multiplication & Division: Same signs produce $+$; opposite signs produce $-$.`,
  },

  // ----------------------------------------------------------------------------
  // ជំពូកទី ២ ៖ ប្រភាគ ចំនួនទសភាគ និងភាគរយ (Unit 2: Fractions, Decimals & Percentages)
  // ----------------------------------------------------------------------------
  {
    id: "les-g7-math-04",
    grade: 7,
    sort_order: 4,
    title_km: "ប្រភាគ និងប្រមាណវិធីលើប្រភាគ",
    title_en: "Fractions & Fraction Operations",
    summary_km: "ប្រភាគស្មើគ្នា ការសម្រួលប្រភាគ វិធីបូក ដក គុណ និងចែកប្រភាគចម្រុះ",
    summary_en: "Equivalent fractions, simplest forms, mixed numbers, and arithmetic (+, -, ×, ÷) across unlike denominators",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-04" },
    body_km: `## ១. ប្រភាគសមមូល និងការសម្រួល
ប្រភាគ $\\frac{a}{b} = \\frac{a \\times k}{b \\times k} = \\frac{a \\div d}{b \\div d}$ ($k, d \\ne 0$)។
- សម្រួលប្រភាគ $\\frac{24}{36}$ ដោយចែកនឹង ប.ម.ធ $= 12$៖
  $$\\frac{24 \\div 12}{36 \\div 12} = \\frac{2}{3} \\quad (\\text{ប្រភាគសម្រួលលែងបាន})$$

## ២. វិធីបូក និងដកប្រភាគ
- ភាគបែងដូចគ្នា៖ $\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}$
- ភាគបែងខុសគ្នា (តម្រូវភាគបែងដោយរក ព.គ.ទ)៖
  $$\\frac{3}{4} + \\frac{1}{6} = \\frac{3 \\times 3}{12} + \\frac{1 \\times 2}{12} = \\frac{9 + 2}{12} = \\frac{11}{12}$$

## ៣. វិធីគុណ និងចែកប្រភាគ
- វិធីគុណ៖ $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$
- វិធីចែក៖ គុណនឹងចម្រាស $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$`,
    body_en: `## 1. Equivalent & Simplified Fractions
Multiply or divide numerator and denominator by the same non-zero integer. Simplest form is reached by dividing by GCD.

## 2. Addition & Subtraction
Find common denominator using LCM: $\\frac{3}{4} + \\frac{1}{6} = \\frac{9}{12} + \\frac{2}{12} = \\frac{11}{12}$.

## 3. Multiplication & Division
- Multiplication: multiply across numerators and denominators: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$.
- Division: multiply by reciprocal: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.`,
  },
  {
    id: "les-g7-math-05",
    grade: 7,
    sort_order: 5,
    title_km: "ចំនួនទសភាគ និងការបំប្លែង",
    title_en: "Decimals & Decimal Conversions",
    summary_km: "សញ្ញាណចំនួនទសភាគ ប្រមាណវិធីលើទសភាគ និងការបំប្លែងរវាងប្រភាគនិងទសភាគ",
    summary_en: "Decimal place values, rounding rules, arithmetic operations, and converting fractions to decimals",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-05" },
    body_km: `## ១. ខ្ទង់ និងតម្លៃលេខនៃទសភាគ
ចំនួនទសភាគមានផ្នែកគត់ និងផ្នែកទសភាគ ដែលខណ្ឌដោយសញ្ញាក្បៀស (ឧទាហរណ៍៖ $14.725$)៖
- $7$ ខ្ទង់ភាគដប់ ($0.1$)
- $2$ ខ្ទង់ភាគរយ ($0.01$)
- $5$ ខ្ទង់ភាគពាន់ ($0.001$)

## ២. ការបំប្លែងប្រភាគទៅជាទសភាគ
យកភាគយកចែកនឹងភាគបែង៖
- $\\frac{3}{4} = 3 \\div 4 = 0.75$
- $\\frac{5}{8} = 5 \\div 8 = 0.625$

## ៣. ប្រមាណវិធីលើទសភាគ
- វិធីបូក/ដក៖ តម្រង់ក្បៀសឱ្យចំគ្នា រួចអនុវត្តដូចចំនួនគត់។
- វិធីគុណ៖ គុណដូចចំនួនគត់ រួចរាប់ចំនួនខ្ទង់ទសភាគសរុបដើម្បីដាក់ក្បៀស៖
  $$2.4 \\times 0.3 = 0.72 \\quad (1 + 1 = 2 \\text{ ខ្ទង់ទសភាគ})$$`,
    body_en: `## 1. Decimal Place Values
Decimals separate integer and fractional parts via decimal point: tenths ($0.1$), hundredths ($0.01$), and thousandths ($0.001$).

## 2. Converting Fractions to Decimals
Divide numerator by denominator: $\\frac{3}{4} = 0.75$.

## 3. Operations
Align decimal points for addition/subtraction. For multiplication, count total decimal places across factors: $2.4 \\times 0.3 = 0.72$.`,
  },
  {
    id: "les-g7-math-06",
    grade: 7,
    sort_order: 6,
    title_km: "ភាគរយ និងចំណោទជាក់ស្តែង",
    title_en: "Percentages & Real-World Applications",
    summary_km: "សញ្ញាណភាគរយ (%) ការគណនាភាគរយនៃការបញ្ចុះតម្លៃ ពន្ធ និងការប្រាក់សាមញ្ញ",
    summary_en: "Percentage calculations, sales discounts, taxes, markups, and simple interest formulas",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-06" },
    body_km: `## ១. និយមន័យភាគរយ
ភាគរយ គឺជាប្រភាគដែលមានភាគបែងស្មើ $100$ ($P\\% = \\frac{P}{100}$)៖
- $25\\% = \\frac{25}{100} = 0.25$
- $75\\% = \\frac{75}{100} = \\frac{3}{4}$

## ២. ស្វែងរកតម្លៃភាគរយនៃបរិមាណមួយ
$$\\text{តម្លៃ} = \\text{បរិមាណសរុប} \\times \\frac{P}{100}$$
- គណនា $20\\%$ នៃ $150000$ រៀល៖
  $$150000 \\times \\frac{20}{100} = 30000 \\text{ រៀល}$$

## ៣. ការបញ្ចុះតម្លៃ និងការប្រាក់សាមញ្ញ
- **ការបញ្ចុះតម្លៃ (Discount)៖**
  $$\\text{ថ្លៃទិញ} = \\text{ថ្លៃដើម} \\times (1 - \\text{អត្រាបញ្ចុះ})$$
- **ការប្រាក់សាមញ្ញ (Simple Interest)៖**
  $$I = P \\times r \\times t$$
  ($P$: ប្រាក់ដើម, $r$: អត្រាការប្រាក់ប្រចាំឆ្នាំ, $t$: រយៈពេលគិតជាឆ្នាំ)`,
    body_en: `## 1. Percent Definition
A percentage represents a ratio per 100: $P\\% = \\frac{P}{100}$. Example: $25\\% = 0.25 = \\frac{1}{4}$.

## 2. Percentage of an Amount
$\\text{Value} = \\text{Total} \\times \\frac{P}{100}$. $20\\%$ of $150,000$ is $30,000$.

## 3. Real-World Applications
Discount price equals original price times $(1 - \\text{rate})$. Simple interest formula: $I = P \\cdot r \\cdot t$.`,
  },

  // ----------------------------------------------------------------------------
  // ជំពូកទី ៣ ៖ ស្វ័យគុណ និងពីជគណិត (Unit 3: Powers & Algebra)
  // ----------------------------------------------------------------------------
  {
    id: "les-g7-math-07",
    grade: 7,
    sort_order: 7,
    title_km: "ស្វ័យគុណនៃចំនួន",
    title_en: "Powers & Exponent Laws",
    summary_km: "វិធានស្វ័យគុណ aᵐ · aⁿ, aᵐ / aⁿ, ស្វ័យគុណនៃស្វ័យគុណ (aᵐ)ⁿ និងស្វ័យគុណសូន្យ a⁰ = 1",
    summary_en: "Exponent laws for products, quotients, powers of powers, and zero exponent definition",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-07" },
    body_km: `## ១. និយមន័យស្វ័យគុណ
$a^n = \\underbrace{a \\times a \\times ... \\times a}_{n \\text{ កត្តា}}$ ($a$: គោល, $n$: និទស្សន្ត)។
- វិធានពិសេស៖ $a^1 = a$ និង $a^0 = 1$ (ចំពោះ $a \\ne 0$)

## ២. វិធានគ្រឹះនៃស្វ័យគុណ
១. **ផលគុណស្វ័យគុណមានគោលដូចគ្នា៖**
   $$a^m \\times a^n = a^{m+n}$$
   ឧទាហរណ៍៖ $3^2 \\times 3^4 = 3^{2+4} = 3^6$

២. **ផលចែកស្វ័យគុណមានគោលដូចគ្នា៖**
   $$\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\ne 0, \\; m \\ge n)$$
   ឧទាហរណ៍៖ $5^7 \\div 5^3 = 5^{7-3} = 5^4$

៣. **ស្វ័យគុណនៃស្វ័យគុណ៖**
   $$(a^m)^n = a^{m \\times n}$$
   ឧទាហរណ៍៖ $(2^3)^2 = 2^{3 \\times 2} = 2^6 = 64$

៤. **ស្វ័យគុណនៃផលគុណ និងផលចែក៖**
   $$(a \\times b)^n = a^n \\times b^n, \\quad \\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$$`,
    body_en: `## 1. Exponent Definition
$a^n$ represents $n$ repeated factors of base $a$. Special rules: $a^1 = a$ and $a^0 = 1$ ($a \\ne 0$).

## 2. Product and Quotient Rules
- Product: $a^m \\cdot a^n = a^{m+n}$.
- Quotient: $a^m / a^n = a^{m-n}$.
- Power of a power: $(a^m)^n = a^{m \\cdot n}$.
- Power of a product: $(ab)^n = a^n b^n$.`,
  },
  {
    id: "les-g7-math-08",
    grade: 7,
    sort_order: 8,
    title_km: "កន្សោមពីជគណិត និងតម្លៃលេខ",
    title_en: "Algebraic Expressions & Evaluation",
    summary_km: "សញ្ញាណអថេរ កន្សោមពីជគណិត ការជំនួសតម្លៃលេខ ឯកធា និងពហុធា",
    summary_en: "Variables, forming algebraic expressions, numerical substitution, and grouping like terms",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-08" },
    body_km: `## ១. សញ្ញាណកន្សោមពីជគណិត
កន្សោមពីជគណិតផ្សំឡើងពីលេខ អក្សរ (អថេរ) និងសញ្ញាប្រមាណវិធី៖
- ឧទាហរណ៍៖ $3x + 5, \\; 2a^2 - 4ab + b^2$

## ២. ការគណនាតម្លៃលេខនៃកន្សោម
ដើម្បីគណនាតម្លៃលេខ ត្រូវជំនួសអថេរដោយតម្លៃដែលបានកំណត់៖
- គណនា $E = 2x^2 - 3x + 4$ ត្រង់ $x = 3$៖
  $$E = 2(3)^2 - 3(3) + 4 = 2(9) - 9 + 4 = 18 - 9 + 4 = 13$$

## ៣. ការបង្រួមកន្សោម (Like Terms)
តួដូចគ្នា គឺជាតួដែលមានផ្នែកអថេរ និងនិទស្សន្តដូចគ្នាបេះបិទ៖
- $5x + 3y + 2x - y = (5x + 2x) + (3y - y) = 7x + 2y$`,
    body_en: `## 1. Algebraic Expressions
Combinations of constants, variables, and operators: $3x + 5$ or $2a^2 - 4ab$.

## 2. Numerical Evaluation
Substitute given numerical values into the variables:
For $E = 2x^2 - 3x + 4$ at $x = 3$: $E = 2(9) - 9 + 4 = 13$.

## 3. Combining Like Terms
Group terms with identical variable factors: $5x + 2x = 7x$.`,
  },
  {
    id: "les-g7-math-09",
    grade: 7,
    sort_order: 9,
    title_km: "សមីការដឺក្រេទី១ មានមួយអញ្ញាត",
    title_en: "Linear Equations with One Unknown",
    summary_km: "ទម្រង់ទូទៅ ax + b = c វិធានប្តូរអង្គ ឫសសមីការ និងចំណោទអនុវត្ត",
    summary_en: "Solving linear equations ax + b = c, transposition principles, root verification, and real-world word problems",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-09" },
    body_km: `## ១. សញ្ញាណសមីការ
សមីការដឺក្រេទី១ មានមួយអញ្ញាត $x$ មានទម្រង់ទូទៅ $ax + b = c$ ($a \\ne 0$)។
- អង្គទី១ គឺ $ax + b$ និងអង្គទី២ គឺ $c$។
- **ឫសនៃសមីការ៖** គឺជាតម្លៃ $x$ ដែលធ្វើឱ្យសមភាពពិត។

## ២. វិធានប្តូរអង្គ (Transposition Rules)
- ប្តូរតួបូកទៅជាដក៖ $x + 5 = 12 \\iff x = 12 - 5 = 7$
- ប្តូរតួដកទៅជាបូក៖ $x - 4 = 9 \\iff x = 9 + 4 = 13$
- ប្តូរតួគុណទៅជាចែក៖ $3x = 18 \\iff x = \\frac{18}{3} = 6$
- ប្តូរតួចែកទៅជាគុណ៖ $\\frac{x}{5} = 7 \\iff x = 7 \\times 5 = 35$

## ៣. ដោះស្រាយសមីការចម្រុះ
$$4x - 7 = 2x + 9$$
$$4x - 2x = 9 + 7$$
$$2x = 16 \\implies x = 8$$`,
    body_en: `## 1. Linear Equations
Equations of degree 1 have the form $ax + b = c$ ($a \\ne 0$). The solution satisfies both sides.

## 2. Transposition Principles
- Addition flips to subtraction across $=$ ($x + 5 = 12 \\implies x = 7$).
- Multiplication flips to division ($3x = 18 \\implies x = 6$).

## 3. General Form
$4x - 7 = 2x + 9 \\implies 2x = 16 \\implies x = 8$.`,
  },
  {
    id: "les-g7-math-10",
    grade: 7,
    sort_order: 10,
    title_km: "វិសមភាព និងលក្ខណៈ",
    title_en: "Inequalities & Properties",
    summary_km: "សញ្ញាណវិសមភាព (<, >, ≤, ≥) លក្ខណៈបូក ដក គុណ ចែក និងការតាងលើបន្ទាត់ចំនួន",
    summary_en: "Inequality symbols, addition/multiplication properties, sign reversals with negative multipliers, and number line graphs",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-10" },
    body_km: `## ១. សញ្ញាណវិសមភាព
វិសមភាពប្រើសញ្ញាប្រៀបធៀប៖
- $a < b$ ($a$ តូចជាង $b$)
- $a > b$ ($a$ ធំជាង $b$)
- $a \\le b$ ($a$ តូចជាងឬស្មើ $b$)
- $a \\ge b$ ($a$ ធំជាងឬស្មើ $b$)

## ២. លក្ខណៈនៃវិសមភាព
១. **បូក ឬដកចំនួនដូចគ្នា៖** ទិសដៅវិសមភាពមិនប្រែប្រួលឡើយ
   $$a < b \\iff a + c < b + c$$
២. **គុណ ឬចែកនឹងចំនួនវិជ្ជមាន ($c > 0$)៖** ទិសដៅរក្សាដដែល
   $$a < b \\iff ac < bc$$
៣. **គុណ ឬចែកនឹងចំនួនអវិជ្ជមាន ($c < 0$)៖** ត្រូវ **ប្តូរទិសដៅ** វិសមភាព!
   $$-2x < 10 \\iff x > \\frac{10}{-2} \\iff x > -5$$`,
    body_en: `## 1. Inequality Symbols
Inequalities compare quantities using $<$, $>$, $\\le$, and $\\ge$.

## 2. Properties
- Adding or subtracting any real number preserves inequality direction.
- Multiplying or dividing by positive values preserves direction.
- **CRITICAL RULE**: Multiplying or dividing by a negative flips the inequality direction: $-2x < 10 \\iff x > -5$.`,
  },
  {
    id: "les-g7-math-11",
    grade: 7,
    sort_order: 11,
    title_km: "ផលធៀប និងសមាមាត្រ",
    title_en: "Ratios, Rates & Proportions",
    summary_km: "ផលធៀបពីរទំហំ អត្រាល្បឿន v = d/t សមាមាត្រ a/b = c/d និងសមាមាត្រច្រាស",
    summary_en: "Ratios of quantities, unit rates, speed relations, proportion cross-multiplication, and inverse variation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-11" },
    body_km: `## ១. ផលធៀប និងអត្រា
- **ផលធៀប (Ratio)៖** ការប្រៀបធៀបបរិមាណពីរតាមវិធីចែក $\\frac{a}{b}$ ឬ $a : b$ ($b \\ne 0$)។
- **អត្រាល្បឿន (Rate & Speed)៖**
  $$v = \\frac{d}{t} \\quad (d: \\text{ចម្ងាយផ្លូវ}, \\; t: \\text{រយៈពេល})$$

## ២. សមាមាត្រ (Proportions)
សមាមាត្រ គឺជាសមភាពនៃផលធៀបពីរ៖ $\\frac{a}{b} = \\frac{c}{d}$
- **លក្ខណៈគ្រឹះ (ផលគុណខ្វែង)៖**
  $$\\frac{a}{b} = \\frac{c}{d} \\iff a \\times d = b \\times c$$
- ឧទាហរណ៍៖ រក $x$ បើ $\\frac{x}{6} = \\frac{10}{15}$៖
  $$15x = 6 \\times 10 = 60 \\implies x = \\frac{60}{15} = 4$$`,
    body_en: `## 1. Ratios & Rates
A ratio compares two quantities $a:b$ or $a/b$. Rate pairs different units, such as velocity $v = d/t$.

## 2. Proportions
A proportion states that two ratios are equal: $\\frac{a}{b} = \\frac{c}{d}$.
Cross-multiplication rule: $a \\cdot d = b \\cdot c$. Example: $\\frac{x}{6} = \\frac{10}{15} \\implies x = 4$.`,
  },

  // ----------------------------------------------------------------------------
  // ជំពូកទី ៤ ៖ ធរណីមាត្រក្នុងប្លង់ និងសូលីត (Unit 4: Geometry & 3D Solids)
  // ----------------------------------------------------------------------------
  {
    id: "les-g7-math-12",
    grade: 7,
    sort_order: 12,
    title_km: "សញ្ញាណដំបូងនៃរូបធរណីមាត្រ",
    title_en: "Basic Geometric Concepts",
    summary_km: "ចំណុច បន្ទាត់ កន្លះបន្ទាត់ អង្កត់ ចំណុចកណ្តាល និងប្លង់",
    summary_en: "Fundamental geometric elements: points, lines, rays, segments, midpoints, and collinear relations",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-12" },
    body_km: `## ១. ចំណុច និងបន្ទាត់
- **ចំណុច (Point)៖** តាងដោយអក្សរធំ ($A, B, C$) គ្មានវិមាត្រ។
- **បន្ទាត់ (Line)៖** បន្ទាត់កាត់តាមពីរចំណុច $(AB)$ គ្មានទីបញ្ចប់ទាំងសងខាង។
- **ចំណុចរត់ត្រង់ជួរគ្នា (Collinear)៖** ចំណុចទាំងឡាយដែលស្ថិតនៅលើបន្ទាត់តែមួយ។

## ២. កន្លះបន្ទាត់ និងអង្កត់
- **កន្លះបន្ទាត់ (Ray)៖** មានចំណុចគល់មួយ និងលាតសន្ធឹងគ្មានដែនកំណត់ទៅទិសម្ខាង $[Ax)$។
- **អង្កត់ (Segment)៖** ផ្នែកនៃបន្ទាត់ដែលខណ្ឌដោយពីរចំណុចចុង $[AB]$។
- **ចំណុចកណ្តាលនៃអង្កត់ (Midpoint)៖** ចំណុច $M \\in [AB]$ ដែល $AM = MB = \\frac{AB}{2}$។`,
    body_en: `## 1. Points & Lines
Points are dimensionless locations. A straight line extends infinitely in both directions through any two distinct points.

## 2. Rays, Segments & Midpoints
- A ray has an endpoint and extends infinitely in one direction.
- A line segment $[AB]$ is bounded by two distinct endpoints.
- The midpoint $M$ divides the segment into two congruent halves: $AM = MB = AB / 2$.`,
  },
  {
    id: "les-g7-math-13",
    grade: 7,
    sort_order: 13,
    title_km: "មុំ និងប្រភេទមុំ",
    title_en: "Angles & Angle Classifications",
    summary_km: "រង្វាស់មុំ (ដឺក្រេ) មុំស្រួច មុំកែង មុំទាល មុំរាប មុំជាប់ មុំបន្ថែម មុំបំពេញ និងមុំទល់កំពូល",
    summary_en: "Angle measurement in degrees, classifications (acute, right, obtuse, straight), complementary, supplementary, and vertical angles",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-13" },
    body_km: `## ១. និយមន័យ និងរង្វាស់មុំ
មុំបង្កើតឡើងដោយកន្លះបន្ទាត់ពីរដែលមានគល់រួមមួយ (កំពូល)។ ខ្នាតរង្វាស់គិតជាដឺក្រេ ($^\\circ$)។

## ២. ចំណាត់ថ្នាក់មុំ
- **មុំស្រួច (Acute Angle)៖** $0^\\circ < \\alpha < 90^\\circ$
- **មុំកែង (Right Angle)៖** $\\alpha = 90^\\circ$
- **មុំទាល (Obtuse Angle)៖** $90^\\circ < \\alpha < 180^\\circ$
- **មុំរាប (Straight Angle)៖** $\\alpha = 180^\\circ$

## ៣. ទំនាក់ទំនងរវាងមុំ
- **មុំបំពេញគ្នា (Complementary Angles)៖** ផលបូកស្មើ $90^\\circ$ ($\\angle A + \\angle B = 90^\\circ$)
- **មុំបន្ថែមគ្នា (Supplementary Angles)៖** ផលបូកស្មើ $180^\\circ$ ($\\angle A + \\angle B = 180^\\circ$)
- **មុំទល់កំពូល (Vertical Angles)៖** មានរង្វាស់ស្មើគ្នាជានិច្ច!`,
    body_en: `## 1. Angle Definition
An angle is formed by two rays sharing a common vertex.

## 2. Classifications
- Acute: $0^\\circ < \\alpha < 90^\\circ$.
- Right: $\\alpha = 90^\\circ$.
- Obtuse: $90^\\circ < \\alpha < 180^\\circ$.
- Straight: $\\alpha = 180^\\circ$.

## 3. Angle Pairs
- Complementary: sum to $90^\\circ$.
- Supplementary: sum to $180^\\circ$.
- Vertically opposite angles are always congruent.`,
  },
  {
    id: "les-g7-math-14",
    grade: 7,
    sort_order: 14,
    title_km: "បន្ទាត់ស្រប និងបន្ទាត់កែង",
    title_en: "Parallel & Perpendicular Lines",
    summary_km: "និយមន័យបន្ទាត់ស្រប កែង បន្ទាត់ខ្វែង មុំឆ្លាស់ក្នុង មុំឆ្លាស់ក្រៅ និងមុំស្រប",
    summary_en: "Parallel and perpendicular line properties, transversal lines, alternate interior/exterior angles, and corresponding angles",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-14" },
    body_km: `## ១. បន្ទាត់កែង និងបន្ទាត់ស្រប
- **បន្ទាត់កែង ($d_1 \\perp d_2$)៖** កាត់គ្នាបង្កើតបានមុំកែង $90^\\circ$។
- **បន្ទាត់ស្រប ($d_1 \\parallel d_2$)៖** ស្ថិតក្នុងប្លង់តែមួយ ហើយមិនកាត់គ្នាឡើយ។

## ២. បន្ទាត់ខ្វែងកាត់បន្ទាត់ស្របពីរ
នៅពេលបន្ទាត់ខ្វែង $(\\Delta)$ កាត់បន្ទាត់ស្របពីរ $(d_1) \\parallel (d_2)$ វានឹងបង្កើតបាន៖
- **មុំឆ្លាស់ក្នុងស្មើគ្នា៖** $\\angle A_1 = \\angle B_2$
- **មុំឆ្លាស់ក្រៅស្មើគ្នា៖** $\\angle A_2 = \\angle B_1$
- **មុំស្របគ្នាស្មើគ្នា៖** $\\angle A_1 = \\angle B_1$
- **មុំរួមខាងក្នុងបន្ថែមគ្នា៖** ផលបូកស្មើ $180^\\circ$`,
    body_en: `## 1. Perpendicular & Parallel Lines
- Perpendicular ($d_1 \\perp d_2$): intersect at $90^\\circ$.
- Parallel ($d_1 \\parallel d_2$): co-planar lines that never intersect.

## 2. Transversal Angle Relationships
A transversal cutting parallel lines produces:
- Congruent alternate interior angles.
- Congruent alternate exterior angles.
- Congruent corresponding angles.
- Consecutive interior angles sum to $180^\\circ$.`,
  },
  {
    id: "les-g7-math-15",
    grade: 7,
    sort_order: 15,
    title_km: "រូបធរណីមាត្រដែលមានវិមាត្រពីរ (ត្រីកោណ និងពហុកោណ)",
    title_en: "2D Geometric Shapes: Triangles & Polygons",
    summary_km: "លក្ខណៈត្រីកោណសម័ង្ស សមបាត កែង ផលបូកមុំក្នុងត្រីកោណ ១៨០° និងចតុកោណ",
    summary_en: "Properties of triangles (equilateral, isosceles, right), triangle angle sum theorem (180°), and polygon classifications",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-15" },
    body_km: `## ១. ត្រីកោណ និងលក្ខណៈមុំ
- **ទ្រឹស្តីបទផលបូកមុំក្នុងត្រីកោណ៖** ក្នុងគ្រប់ត្រីកោណ ផលបូករង្វាស់មុំក្នុងទាំងបីស្មើ $180^\\circ$ ជានិច្ច៖
  $$\\angle A + \\angle B + \\angle C = 180^\\circ$$

## ២. ប្រភេទត្រីកោណពិសេស
- **ត្រីកោណសមបាត (Isosceles)៖** មានជ្រុងពីរស្មើគ្នា និងមុំបាតពីរស្មើគ្នា។
- **ត្រីកោណសម័ង្ស (Equilateral)៖** មានជ្រុងទាំងបីស្មើគ្នា និងមុំទាំងបីស្មើ $60^\\circ$។
- **ត្រីកោណកែង (Right Triangle)៖** មានមុំកែងមួយ ($90^\\circ$)។

## ៣. ចតុកោណ និងពហុកោណ
- ផលបូកមុំក្នុងចតុកោណស្មើ $360^\\circ$។
- ប្រភេទចតុកោណ៖ ប្រលេឡូក្រាម ចតុកោណកែង ចតុកោណស្មើ ការេ និងចតុកោណព្នាយ។`,
    body_en: `## 1. Triangle Angle Sum Theorem
The interior angles of any planar triangle sum to $180^\\circ$: $\\angle A + \\angle B + \\angle C = 180^\\circ$.

## 2. Special Triangles
- Isosceles: two equal sides and equal base angles.
- Equilateral: three equal sides; each angle equals $60^\\circ$.
- Right triangle: contains one $90^\\circ$ angle.

## 3. Quadrilaterals
Interior angles sum to $360^\\circ$. Key types: parallelogram, rectangle, rhombus, square, and trapezoid.`,
  },
  {
    id: "les-g7-math-16",
    grade: 7,
    sort_order: 16,
    title_km: "បរិមាត្រ និងផ្ទៃក្រឡាពហុកោណ",
    title_en: "Perimeters & Areas of Polygons",
    summary_km: "រូបមន្តបរិមាត្រ និងផ្ទៃក្រឡាចតុកោណកែង ការេ ប្រលេឡូក្រាម ត្រីកោណ និងចតុកោណព្នាយ",
    summary_en: "Standard formulas for perimeters and areas of rectangles, squares, parallelograms, triangles, and trapezoids",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-16" },
    body_km: `## ១. រូបមន្តបរិមាត្រ (Perimeter)
បរិមាត្រ គឺជាប្រវែងជុំវិញនៃពហុកោណ (ផលបូកប្រវែងជ្រុងទាំងអស់)៖
- ចតុកោណកែង៖ $P = 2(a + b)$
- ការេ៖ $P = 4a$

## ២. រូបមន្តផ្ទៃក្រឡា (Area)
- **ចតុកោណកែង៖** $S = a \\times b$ (បណ្តោយ $\\times$ ទទឹង)
- **ការេ៖** $S = a^2$
- **ត្រីកោណ៖** $S = \\frac{b \\times h}{2}$ (បាត $\\times$ កម្ពស់ $\\div 2$)
- **ប្រលេឡូក្រាម៖** $S = b \\times h$
- **ចតុកោណព្នាយ៖** $S = \\frac{(B + b) \\times h}{2}$`,
    body_en: `## 1. Perimeter Formulas
Perimeter sums boundary lengths: Rectangle $P = 2(l + w)$, Square $P = 4s$.

## 2. Area Formulas
- Rectangle: $A = l \\times w$.
- Square: $A = s^2$.
- Triangle: $A = \\frac{1}{2} b \\cdot h$.
- Parallelogram: $A = b \\cdot h$.
- Trapezoid: $A = \\frac{(B + b) \\cdot h}{2}$.`,
  },
  {
    id: "les-g7-math-17",
    grade: 7,
    sort_order: 17,
    title_km: "រង្វង់ បរិមាត្រ និងផ្ទៃក្រឡា",
    title_en: "Circles, Circumference & Area",
    summary_km: "កាំ (r) អង្កត់ផ្ចិត (d = 2r) ចំនួន π ≈ 3.1416 បរិមាត្រ C = 2πr និងផ្ទៃក្រឡា S = πr²",
    summary_en: "Circle definitions, diameter, circumference formula C = 2πr, area formula S = πr², and circular sectors",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-17" },
    body_km: `## ១. ធាតុផ្សំនៃរង្វង់
- **កាំ ($r$)៖** ចម្ងាយពីផ្ចិតទៅចំណុចលើរង្វង់។
- **អង្កត់ផ្ចិត ($d$)៖** អង្កត់កាត់តាមផ្ចិត ($d = 2r$)។
- **ចំនួន $\\pi$ (ពី)៖** $\\pi \\approx 3.14$ ឬ $\\frac{22}{7}$។

## ២. បរិមាត្ររង្វង់ (Circumference)
$$C = 2\\pi r = \\pi d$$
- ឧទាហរណ៍៖ រង្វង់មានកាំ $r = 7\\text{ cm}$៖
  $$C = 2 \\times \\frac{22}{7} \\times 7 = 44\\text{ cm}$$

## ៣. ផ្ទៃក្រឡារង្វង់ (Area of Circle)
$$S = \\pi r^2$$
- ឧទាហរណ៍៖ រង្វង់មានកាំ $r = 10\\text{ cm}$៖
  $$S = 3.14 \\times 10^2 = 314\\text{ cm}^2$$`,
    body_en: `## 1. Circle Properties
Radius $r$, diameter $d = 2r$, and constant $\\pi \\approx 3.1416$.

## 2. Circumference
$C = 2\\pi r = \\pi d$.

## 3. Area of a Circle
$S = \\pi r^2$. For $r = 10\\text{ cm}$, $S = 3.14 \\times 100 = 314\\text{ cm}^2$.`,
  },
  {
    id: "les-g7-math-18",
    grade: 7,
    sort_order: 18,
    title_km: "មាឌ និងផ្ទៃក្រឡាខាងនៃសូលីត",
    title_en: "Surface Area & Volume of 3D Solids",
    summary_km: "គូប ប្រលេពីប៉ែតកែង ផ្ទៃក្រឡាខាង ផ្ទៃក្រឡាសរុប និងមាឌ V = a³ ឬ V = l × w × h",
    summary_en: "Surface area and volume of three-dimensional solids: cubes and rectangular parallelepipeds/prisms",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-18" },
    body_km: `## ១. រូបគូប (Cube)
រូបគូបមានមុខទាំង ៦ ជាការេស្មើៗគ្នា (ទ្រនុង $a$)៖
- **ផ្ទៃក្រឡាខាង៖** $S_L = 4a^2$
- **ផ្ទៃក្រឡាសរុប៖** $S_T = 6a^2$
- **មាឌគូប៖** $V = a^3$

## ២. ប្រលេពីប៉ែតកែង (Rectangular Prism)
មានវិមាត្រ បណ្តោយ $l$, ទទឹង $w$, និងកម្ពស់ $h$៖
- **ផ្ទៃក្រឡាខាង៖** $S_L = 2(l + w) \\times h$ (បរិមាត្របាត $\\times$ កម្ពស់)
- **ផ្ទៃក្រឡាសរុប៖** $S_T = S_L + 2(l \\times w)$
- **មាឌ៖** $V = l \\times w \\times h$ (ផ្ទៃបាត $\\times$ កម្ពស់)`,
    body_en: `## 1. The Cube
Six congruent square faces of edge $a$:
- Lateral area: $S_L = 4a^2$.
- Total area: $S_T = 6a^2$.
- Volume: $V = a^3$.

## 2. Rectangular Prism
Dimensions: length $l$, width $w$, height $h$:
- Lateral area: $S_L = 2(l + w)h$.
- Total area: $S_T = S_L + 2lw$.
- Volume: $V = l \\cdot w \\cdot h$.`,
  },
  {
    id: "les-g7-math-19",
    grade: 7,
    sort_order: 19,
    title_km: "ភាពឆ្លុះក្នុងប្លង់",
    title_en: "Planar Reflections & Symmetry",
    summary_km: "អ័ក្សឆ្លុះ ភាពឆ្លុះធៀបនឹងបន្ទាត់ ភាពឆ្លុះធៀបនឹងចំណុច និងរូបភាពឆ្លុះនៃអង្កត់/មុំ",
    summary_en: "Axial symmetry, central point symmetry, mirror image reflections, and preserving length and angle measures",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-19" },
    body_km: `## ១. ភាពឆ្លុះធៀបនឹងបន្ទាត់ (Axial Symmetry)
បន្ទាត់ $(d)$ ជាអ័ក្សឆ្លុះនៃពីរចំណុច $A$ និង $A'$ លុះត្រាតែ $(d)$ ជាមេឌីយ៉ាទ័រនៃអង្កត់ $[AA']$។
- ចំណុចនៅលើអ័ក្សឆ្លុះមានរូបភាពជាខ្លួនវា។
- រូបភាពឆ្លុះនៃអង្កត់មួយ គឺជាអង្កត់មួយទៀតដែលមានប្រវែងស្មើគ្នា ($AB = A'B'$)។
- រូបភាពឆ្លុះនៃមុំមួយ គឺជាមុំមួយទៀតដែលមានរង្វាស់ស្មើគ្នា។

## ២. ភាពឆ្លុះធៀបនឹងចំណុច (Central Symmetry)
ចំណុច $O$ ជាផ្ចិតឆ្លុះនៃពីរចំណុច $A$ និង $A'$ លុះត្រាតែ $O$ ជាចំណុចកណ្តាលនៃអង្កត់ $[AA']$។`,
    body_en: `## 1. Line Reflection (Axial Symmetry)
Line $d$ is the reflection axis for $A$ and $A'$ iff $d$ is the perpendicular bisector of segment $[AA']$.
Reflections preserve distances, collinearity, and angle measures.

## 2. Point Symmetry (Central Symmetry)
$O$ is the center of symmetry for $A$ and $A'$ iff $O$ is the midpoint of $[AA']$.`,
  },

  // ----------------------------------------------------------------------------
  // ជំពូកទី ៥ ៖ ស្ថិតិ និងប្រូបាប (Unit 5: Statistics & Probability)
  // ----------------------------------------------------------------------------
  {
    id: "les-g7-math-20",
    grade: 7,
    sort_order: 20,
    title_km: "ប្រូបាបបឋម",
    title_en: "Introduction to Probability",
    summary_km: "ការពិសោធន៍ចៃដន្យ លំហសំណាក ព្រឹត្តិការណ៍ និងរូបមន្តប្រូបាប P(A) = m / n",
    summary_en: "Random experiments, sample spaces, favorable outcomes, and classical probability calculation P(A) = m / n",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-20" },
    body_km: `## ១. ការពិសោធន៍ចៃដន្យ និងលំហសំណាក
- **ការពិសោធន៍ចៃដន្យ (Random Experiment)៖** សកម្មភាពដែលគេមិនអាចដឹងលទ្ធផលជាមុនបាន (ដូចជាការបោះកាក់ ឬបោះគ្រាប់ឡុកឡាក់)។
- **លំហសំណាក ($S$)៖** សំណុំនៃលទ្ធផលដែលអាចកើតមានទាំងអស់។
  - បោះគ្រាប់ឡុកឡាក់មួយគ្រាប់៖ $S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6$

## ២. រូបមន្តប្រូបាប
ប្រូបាបនៃព្រឹត្តិការណ៍ $A$ គណនាតាមរូបមន្ត៖
$$P(A) = \\frac{n(A)}{n(S)} = \\frac{\\text{ចំនួនករណីស្រប}}{\\text{ចំនួនករណីអាច}}$$
- លក្ខណៈ៖ $0 \\le P(A) \\le 1$
  - $P(A) = 0$៖ ព្រឹត្តិការណ៍មិនអាចកើតឡើងបាន
  - $P(A) = 1$៖ ព្រឹត្តិការណ៍ប្រាកដ`,
    body_en: `## 1. Random Experiments & Sample Spaces
The sample space $S$ contains all possible outcomes. For rolling a die: $S = \\{1, 2, 3, 4, 5, 6\\}$.

## 2. Probability Formula
$P(A) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Possible Outcomes}} = \\frac{n(A)}{n(S)}$.
Always bounded: $0 \\le P(A) \\le 1$.`,
  },
  {
    id: "les-g7-math-21",
    grade: 7,
    sort_order: 21,
    title_km: "ក្រាបសសរ និងការបកស្រាយទិន្នន័យ",
    title_en: "Bar Charts & Frequency Distributions",
    summary_km: "ការប្រមូលទិន្នន័យ តារាងប្រេកង់ ដ្យាក្រាមសសរទោល និងដ្យាក្រាមសសរទ្វេ",
    summary_en: "Data organization, frequency distribution tables, single and double bar charts, and data interpretation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-21" },
    body_km: `## ១. ការរៀបចំទិន្នន័យ និងតារាងប្រេកង់
- **ទិន្នន័យ (Data)៖** តម្លៃលេខ ឬព័ត៌មានដែលប្រមូលបានពីការអង្កេត។
- **ប្រេកង់ (Frequency)៖** ចំនួនដងដែលទិន្នន័យនីមួយៗបានកើតឡើង។
- **ប្រេកង់សរុប ($N$)៖** ផលបូកនៃប្រេកង់ទាំងអស់ ($N = \\sum f_i$)។

## ២. ក្រាបសសរ (Bar Chart)
ក្រាបសសរប្រើប្រាស់បង្គោលចតុកោណកែងដែលមានទទឹងស្មើៗគ្នា ដើម្បីប្រៀបធៀបបរិមាណ៖
- អ័ក្សដេក៖ តាងប្រភេទ ឬអថេរ
- អ័ក្សឈរ៖ តាងប្រេកង់ (ចំនួនដង)
- កម្ពស់នៃសសរនីមួយៗសមាមាត្រទៅនឹងប្រេកង់របស់វា។`,
    body_en: `## 1. Frequency Tables
Frequencies track occurrences of each category or value. Total frequency $N = \\sum f_i$.

## 2. Bar Charts
Bar charts plot rectangular columns of uniform width. Column height is directly proportional to category frequency.`,
  },
  {
    id: "les-g7-math-22",
    grade: 7,
    sort_order: 22,
    title_km: "ក្រាបផ្ចិត និងដ្យាក្រាមរង្វង់",
    title_en: "Pie Charts & Circular Diagrams",
    summary_km: "ការគណនាមុំផ្ចិតតាមភាគរយ (360° × %) ការគូរដ្យាក្រាមរង្វង់ និងការវិភាគទិន្នន័យស្ថិតិ",
    summary_en: "Converting percentages to central angles (360° × %), drawing circular pie charts, and statistical inference",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g7-math-22" },
    body_km: `## ១. សញ្ញាណក្រាបផ្ចិត (Pie Chart)
ក្រាបផ្ចិត គឺជាដ្យាក្រាមរាងជារង្វង់ដែលបែងចែកជាចម្រៀកផ្ចិតផ្សេងៗ ដើម្បីបង្ហាញសមាមាត្រនៃផ្នែកនីមួយៗធៀបនឹងទិន្នន័យសរុប ($100\\% = 360^\\circ$)។

## ២. របៀបគណនាមុំផ្ចិត
$$\\text{មុំផ្ចិត} = \\frac{\\text{ប្រេកង់}}{N} \\times 360^\\circ = \\text{ភាគរយ} \\times 3.6^\\circ$$
- ឧទាហរណ៍៖ ទិន្នន័យមាន $25\\%$ នៃសរុប៖
  $$\\text{មុំផ្ចិត} = 25 \\times 3.6^\\circ = 90^\\circ \\quad (\\text{មុំកែងមួយភាគបួននៃរង្វង់})$$
- ទិន្នន័យមាន $50\\%$ នៃសរុប៖
  $$\\text{មុំផ្ចិត} = 50 \\times 3.6^\\circ = 180^\\circ \\quad (\\text{ពាក់កណ្តាលរង្វង់})$$`,
    body_en: `## 1. Pie Charts
Pie charts divide a circular disc into sectors representing relative proportions ($100\\% = 360^\\circ$).

## 2. Central Angle Calculation
$$\\text{Angle} = \\frac{\\text{Frequency}}{N} \\times 360^\\circ = \\text{Percentage} \\times 3.6^\\circ$$
A category representing $25\\%$ corresponds to $25 \\times 3.6^\\circ = 90^\\circ$ (a quarter-circle sector).`,
  },

  // ============================================================================
  // GRADE 7 — PHYSICS (រូបវិទ្យា)
  // ============================================================================
  {
    id: "les-g7-phys-01",
    grade: 7,
    sort_order: 1,
    title_km: "ការវាស់វែង និងប្រព័ន្ធខ្នាតអន្តរជាតិ SI",
    title_en: "Measurement & SI Standard Units",
    summary_km: "ខ្នាតគោល SI ប្រវែង ម៉ាស ពេលវេលា និងឧបករណ៍វាស់ជាក់ស្តែង",
    summary_en: "International System of Units (SI), metric prefixes, length, mass, and time measurements",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g7-phys-01" },
    body_km: `## ១. ប្រព័ន្ធខ្នាតអន្តរជាតិ (SI)
ក្នុងវិទ្យាសាស្ត្រ ដើម្បីឱ្យការវាស់វែងមានស្តង់ដាររួមទូទាំងពិភពលោក យើងប្រើប្រព័ន្ធ **SI (Système International)**៖
- **ប្រវែង (Length)៖** ម៉ែត្រ ($m$)
- **ម៉ាស (Mass)៖** គីឡូក្រាម ($kg$)
- **ពេលវេលា (Time)៖** វិនាទី ($s$)

## ២. បុព្វបទខ្នាត (Prefixes)
- គីឡូ ($k$) $= 10^3 = 1000$ (ឧ. $1\\text{ km} = 1000\\text{ m}$)
- សង់ទី ($c$) $= 10^{-2} = 0.01$ (ឧ. $1\\text{ m} = 100\\text{ cm}$)
- មីលី ($m$) $= 10^{-3} = 0.001$ (ឧ. $1\\text{ g} = 1000\\text{ mg}$)`,
    body_en: `## SI Units
Base units: meter ($m$), kilogram ($kg$), second ($s$). Use standard metric conversions.`,
  },
  {
    id: "les-g7-phys-02",
    grade: 7,
    sort_order: 2,
    title_km: "ម៉ាស៊ីនសាមញ្ញ ៖ ឃ្នាស់ រ៉ក និងរបងជម្រាល",
    title_en: "Simple Machines: Levers & Mechanical Advantage",
    summary_km: "គោលការណ៍លំនឹងឃ្នាស់ F₁ · d₁ = F₂ · d₂ ចំណុចទម្រ និងប្រយោជន៍មេកានិច",
    summary_en: "Lever equilibrium F1·d1 = F2·d2, fulcrum principles, pulleys, and inclined planes",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g7-phys-02" },
    body_km: `## ១. ឃ្នាស់ (Lever)
ឃ្នាស់មានចំណុចសំខាន់ ៣៖
1. **ចំណុចទម្រ ($O$ / Fulcrum)**
2. **ចំណុចរងកម្លាំងចលករ ($F_1$)**
3. **ចំណុចទប់ទម្ងន់ ($F_2$)**

## ២. ច្បាប់លំនឹងនៃឃ្នាស់
នៅពេលឃ្នាស់មានលំនឹងផ្ដេក៖
$$F_1 \\cdot d_1 = F_2 \\cdot d_2$$
- $F_1, F_2$ ៖ កម្លាំងទាំងសងខាង ($N$)
- $d_1, d_2$ ៖ ប្រវែងដៃឃ្នាស់ពីចំណុចទម្រទៅកាន់កម្លាំងនីមួយៗ ($m$)

> **ចំណុចគន្លឹះ៖** កាលណាដៃឃ្នាស់ $d_1$ កាន់តែវែង យើងប្រើកម្លាំង $F_1$ កាន់តែតូច ដើម្បីលើកវត្ថុធ្ងន់!`,
    body_en: `## Levers
Equilibrium rule: $F_1 \\cdot d_1 = F_2 \\cdot d_2$. Longer effort arm multiplies mechanical force.`,
  },
  {
    id: "les-g7-phys-03",
    grade: 7,
    sort_order: 3,
    title_km: "ម៉ាសមាឌ និងដង់ស៊ីតេ (D = m / V)",
    title_en: "Mass, Volume & Density (D = m / V)",
    summary_km: "និយមន័យដង់ស៊ីតេ រូបមន្ត D = m / V និងលក្ខខណ្ឌអណ្តែត-លិចក្នុងទឹក",
    summary_en: "Density equation D = m/V, pure water benchmark 1000 kg/m³, and flotation criteria",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g7-phys-03" },
    body_km: `## ១. និយមន័យម៉ាសមាឌ (ដង់ស៊ីតេ)
ម៉ាសមាឌ (Density) គឺជាម៉ាសនៃអង្គធាតុក្នុងមួយខ្នាតមាឌ៖
$$D = \\frac{m}{V}$$
- $D$ ៖ ម៉ាសមាឌ ($kg/m^3$ ឬ $g/cm^3$)
- $m$ ៖ ម៉ាសអង្គធាតុ ($kg$ ឬ $g$)
- $V$ ៖ មាឌអង្គធាតុ ($m^3$ ឬ $cm^3$)

## ២. ដង់ស៊ីតេនៃទឹកសុទ្ធ
ទឹកសុទ្ធមានដង់ស៊ីតេ $D_{\\text{water}} = 1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$។
- អង្គធាតុណាដែលមាន $D < D_{\\text{water}}$ នឹង **អណ្តែត** (ឧ. ប្រេង ឈើ)
- អង្គធាតុណាដែលមាន $D > D_{\\text{water}}$ នឹង **លិច** (ឧ. ដែក ដុំថ្ម)`,
    body_en: `## Density
$D = m/V$. Density of pure water is $1000\\text{ kg/m}^3$. Objects with $D < 1000\\text{ kg/m}^3$ float.`,
  },
  {
    id: "les-g7-phys-04",
    grade: 7,
    sort_order: 4,
    title_km: "កម្លាំង និងចលនា",
    title_en: "Forces and Motion",
    summary_km: "កម្លាំងទាញ កម្លាំងរុញ កម្លាំងកកិត និងឥទ្ធិពលលើល្បឿននៃចលនា",
    summary_en: "Pushes and pulls, friction resistance, gravity, and velocity changes",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g7-phys-04" },
    body_km: `## ១. តើកម្លាំងជាអ្វី?
**កម្លាំង (Force)** គឺជាអំពើរុញ ឬទាញលើអង្គធាតុមួយ។ កម្លាំងមានខ្នាតគិតជា **ញូតុន ($N$)**។

## ២. ឥទ្ធិពលនៃកម្លាំង
កម្លាំងអាចធ្វើឱ្យអង្គធាតុ៖
1. ចាប់ផ្តើមផ្លាស់ទី (ពីនៅស្ងៀមទៅផ្លាស់ទី)
2. បង្កើនល្បឿន ឬបន្ថយល្បឿន
3. ប្តូរទិសដៅនៃចលនា
4. ប្តូររូបរាង (ខូចទ្រង់ទ្រាយ)

## ៣. កម្លាំងកកិត (Friction)
កម្លាំងកកិតកើតឡើងរវាងផ្ទៃប៉ះនៃវត្ថុពីរ ហើយតែងតែមានទិសដៅ **ប្រឆាំងនឹងចលនា**។`,
    body_en: `## Forces
Forces are vector pushes or pulls measured in Newtons ($N$). Friction always opposes motion.`,
  },
  {
    id: "les-g7-phys-05",
    grade: 7,
    sort_order: 5,
    title_km: "កម្តៅ និងការរីកមាឌនៃអង្គធាតុ",
    title_en: "Heat & Thermal Expansion of Matter",
    summary_km: "ឥទ្ធិពលកម្តៅលើសូលីត រាវ ឧស្ម័ន និងទែរម៉ូម៉ែត្រវាស់សីតុណ្ហភាព",
    summary_en: "Thermal expansion in solids, liquids, gases, and Celsius temperature scales",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g7-phys-05" },
    body_km: `## ១. ការរីកមាឌដោយសារកម្តៅ
នៅពេលអង្គធាតុក្តៅឡើង ម៉ូលេគុលរបស់វាញ័រខ្លាំង និងឃ្លាតឆ្ងាយពីគ្នា ធ្វើឱ្យអង្គធាតុ **រីកមាឌ**។ នៅពេលត្រជាក់វិញ អង្គធាតុ **រួមមាឌ**។

- **ឧស្ម័ន** រីកមាឌខ្លាំងជាងគេ
- **អង្គធាតុរាវ** រីកមាឌមធ្យម
- **អង្គធាតុរឹង** រីកមាឌតិចជាងគេ

## ២. ការអនុវត្តក្នុងវិស្វកម្ម
- ផ្លូវដែកតែងតែទុកចន្លោះតូចមួយរវាងរនាំងដែក ដើម្បីកុំឱ្យកោងនៅពេលក្តៅថ្ងៃ
- ខ្សែភ្លើងត្រូវបង្ហូតឱ្យធូរល្មម ដើម្បីកុំឱ្យដាច់នៅរដូវរងា`,
    body_en: `## Thermal Expansion
Heating causes matter to expand; cooling causes contraction. Gases expand the most.`,
  },

  // ============================================================================
  // GRADE 7 — CHEMISTRY (គីមីវិទ្យា)
  // ============================================================================
  {
    id: "les-g7-chem-01",
    grade: 7,
    sort_order: 1,
    title_km: "សារធាតុបរិសុទ្ធ និងល្បាយ",
    title_en: "Pure Substances & Mixtures",
    summary_km: "ភាពខុសគ្នារវាងសារធាតុបរិសុទ្ធ ល្បាយស្មើសាច់ និងល្បាយមិនស្មើសាច់",
    summary_en: "Pure substances, elements, compounds, homogeneous and heterogeneous mixtures",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g7-chem-01" },
    body_km: `## ១. សារធាតុបរិសុទ្ធ (Pure Substances)
សារធាតុបរិសុទ្ធ មានសមាសភាពគីមីថេរ និងមានលក្ខណៈរូបច្បាស់លាស់ (ចំណុចរលាយ និងចំណុចពុះថេរ) ដូចជា ទឹកសុទ្ធ ($H_2O$), អុកស៊ីសែន ($O_2$), មាស ($Au$)។

## ២. ល្បាយ (Mixtures)
ល្បាយកើតពីសារធាតុតាំងពីពីរឡើងទៅលាយចូលគ្នា ដោយគ្មានប្រតិកម្មគីមី៖
- **ល្បាយស្មើសាច់ (Homogeneous)៖** មើលមិនឃើញព្រំដែនខណ្ឌ (ឧ. ទឹកអំបិល ទឹកស្ករ ខ្យល់)
- **ល្បាយមិនស្មើសាច់ (Heterogeneous)៖** មើលឃើញផ្នែកផ្សេងគ្នាច្បាស់ (ឧ. ទឹកលាយប្រេង ទឹកភក់)`,
    body_en: `## Pure Substances & Mixtures
Pure substances have definite properties. Homogeneous mixtures look uniform; heterogeneous show distinct layers.`,
  },
  {
    id: "les-g7-chem-02",
    grade: 7,
    sort_order: 2,
    title_km: "បាតុភូតរូប និងបាតុភូតគីមី",
    title_en: "Physical vs. Chemical Changes",
    summary_km: "ការផ្លាស់ប្តូររូបរាង កំណក រលាយ និងប្រតិកម្មគីមីបង្កើតសារធាតុថ្មី",
    summary_en: "Phase transitions vs chemical reactions creating entirely new substances with energy transfer",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g7-chem-02" },
    body_km: `## ១. បាតុភូតរូប (Physical Change)
គឺជាការប្រែប្រួលដែល **មិនបង្កើតសារធាតុថ្មី** ឡើយ។ រូបមន្តគីមីនៅដដែល គ្រាន់តែផ្លាស់ប្តូរស្ថានភាព ឬរូបរាង៖
- ទឹកកករលាយជាទឹក ($H_2O_{(s)} \\rightarrow H_2O_{(l)}$)
- ការហួតទឹក ការកាត់ក្រដាស

## ២. បាតុភូតគីមី (Chemical Change)
គឺជាការប្រែប្រួលដែល **បង្កើតសារធាតុថ្មី** ដែលមានលក្ខណៈខុសពីសារធាតុដើម៖
- ការឆេះនៃទៀន ឬឈើ
- ដែកច្រែះ ($4Fe + 3O_2 \\rightarrow 2Fe_2O_3$)
- ការផ្អួរទឹកដោះគោ ឬការរលួយស្លឹកឈើ`,
    body_en: `## Physical vs Chemical Changes
Physical changes do not form new substances (e.g. melting ice). Chemical changes create new substances (e.g. rusting iron).`,
  },
  {
    id: "les-g7-chem-03",
    grade: 7,
    sort_order: 3,
    title_km: "ទឹក និងសារធាតុរំលាយ",
    title_en: "Water, Solvents & Solubility",
    summary_km: "ទឹកជាសារធាតុរំលាយសកល សូលុយស្យុង សារធាតុរលាយ និងកំហាប់",
    summary_en: "Universal solvent properties of water, solute, solvent, and saturation concentrations",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g7-chem-03" },
    body_km: `## ១. សមាសភាគនៃសូលុយស្យុង
$$\\text{សូលុយស្យុង (Solution)} = \\text{សារធាតុរំលាយ (Solvent)} + \\text{សារធាតុរលាយ (Solute)}$$
- **ទឹក (Water)** គឺជាសារធាតុរំលាយសកល ព្រោះវាអាចរំលាយសារធាតុជាច្រើន។

## ២. សូលុយស្យុងឆ្អែត
- **សូលុយស្យុងមិនទាន់ឆ្អែត៖** នៅតែអាចរំលាយសារធាតុបន្ថែមទៀតបាន
- **សូលុយស្យុងឆ្អែត៖** មិនអាចរំលាយសារធាតុរលាយបន្ថែមបានទៀតទេនៅសីតុណ្ហភាពនោះ`,
    body_en: `## Solutions
Solution = Solvent (liquid like water) + Solute (dissolved solid like salt). Saturated solutions can dissolve no more solute.`,
  },
  {
    id: "les-g7-chem-04",
    grade: 7,
    sort_order: 4,
    title_km: "ខ្យល់ និងសមាសភាគបរិយាកាស",
    title_en: "Air & Atmospheric Composition",
    summary_km: "សមាសភាគឧស្ម័ន អាសូត ៧៨% អុកស៊ីសែន ២១% និងឧស្ម័នផ្សេងៗ",
    summary_en: "Atmospheric composition: 78% Nitrogen, 21% Oxygen, Argon and Carbon dioxide traces",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g7-chem-04" },
    body_km: `## ១. សមាសភាគនៃខ្យល់ស្ងួត
ខ្យល់គឺជាល្បាយស្មើសាច់នៃឧស្ម័នជាច្រើន៖
- **ឧស្ម័នអាសូត ($N_2$)៖** ប្រហែល $78\\%$
- **ឧស្ម័នអុកស៊ីសែន ($O_2$)៖** ប្រហែល $21\\%$
- **ឧស្ម័នអាកុង ($Ar$)៖** ប្រហែល $0.9\\%$
- **ឧស្ម័នកាបូនិក ($CO_2$) និងឧស្ម័នផ្សេងៗ៖** ប្រហែល $0.1\\%$

## ២. សារៈសំខាន់នៃអុកស៊ីសែន
អុកស៊ីសែនចាំបាច់សម្រាប់ **ដង្ហើមភាវៈរស់** និង **អំពើឆេះ** នៃឥន្ធនៈ។`,
    body_en: `## Atmosphere
Air composition: 78% Nitrogen, 21% Oxygen, and trace gases. Oxygen sustains respiration and combustion.`,
  },
  {
    id: "les-g7-chem-05",
    grade: 7,
    sort_order: 5,
    title_km: "អាតូម និងម៉ូលេគុលបឋម",
    title_en: "Atoms & Molecules Fundamentals",
    summary_km: "រចនាសម្ព័ន្ធបឋមនៃអាតូម នុយក្លេអ៊ុង ប្រូតុង អេឡិចត្រុង និងម៉ូលេគុល",
    summary_en: "Introductory atomic structure: protons, neutrons, electrons, and simple molecular bonding",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g7-chem-05" },
    body_km: `## ១. អាតូម (Atom)
អាតូម គឺជាភាគល្អិតតូចបំផុតនៃរូបធាតុដែលមិនអាចបំបែកដោយវិធីគីមីធម្មតាបានឡើយ។
អាតូមផ្សំឡើងពី៖
- **ស្នូលកណ្តាល (Nucleus)៖** មានប្រូតុង ($p^+$, បន្ទុកវិជ្ជមាន) និងណឺត្រុង ($n^0$, គ្មានបន្ទុក)
- **ពពកអេឡិចត្រុង៖** មានអេឡិចត្រុង ($e^-$, បន្ទុកអវិជ្ជមាន) វិលជុំវិញស្នូល

## ២. ម៉ូលេគុល (Molecule)
ម៉ូលេគុល កើតពីអាតូមតាំងពីពីរឡើងទៅចងភ្ជាប់គ្នាដោយសម្ព័ន្ធគីមី៖
- ម៉ូលេគុលទោលធាតុ៖ $O_2, H_2, N_2$
- ម៉ូលេគុលសមាសធាតុ៖ $H_2O, CO_2, NaCl$`,
    body_en: `## Atoms & Molecules
Atoms have a nucleus (protons + neutrons) surrounded by electrons. Molecules are bonded atoms.`,
  },

  // ============================================================================
  // GRADE 7 — BIOLOGY (ជីវវិទ្យា)
  // ============================================================================
  {
    id: "les-g7-bio-01",
    grade: 7,
    sort_order: 1,
    title_km: "រចនាសម្ព័ន្ធកោសិការុក្ខជាតិ និងកោសិកាសត្វ",
    title_en: "Plant & Animal Cell Architecture",
    summary_km: "កោសិកាជាឯកតាមូលដ្ឋាន ភ្នាសកោសិកា ស៊ីតូប្លាស ណ្វៃយ៉ូ និងក្លរ៉ូប្លាស",
    summary_en: "Cell theory basics: cell wall, cell membrane, cytoplasm, nucleus, vacuole, chloroplast differences",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g7-bio-01" },
    body_km: `## ១. ទ្រឹស្តីកោសិកា
កោសិកា (Cell) គឺជា **ឯកតាមូលដ្ឋាននៃជីវិត** សម្រាប់គ្រប់ភាវៈរស់ទាំងអស់។

## ២. ផ្នែកសំខាន់ៗទាំង ៣ នៃកោសិកា
1. **ភ្នាសកោសិកា (Cell Membrane)៖** គ្រប់គ្រងការចេញចូលនៃសារធាតុ
2. **ស៊ីតូប្លាស (Cytoplasm)៖** សារធាតុរាវអន្ធិលផ្ទុកសរីរាង្គកោសិកា
3. **ណ្វៃយ៉ូ (Nucleus)៖** បញ្ជាសកម្មភាពកោសិកា និងផ្ទុកព័ត៌មានតំណពូជ DNA

## ៣. ភាពខុសគ្នារវាងកោសិការុក្ខជាតិ និងសត្វ
- **កោសិការុក្ខជាតិមាន៖** កោសិកាភ្នាសរឹង (Cell Wall), ក្លរ៉ូប្លាស (Chloroplasts សម្រាប់រស្មីសំយោគ), និងវ៉ាគុយអូលធំ
- **កោសិកាសត្វ៖** គ្មានកោសិកាភ្នាសរឹង និងគ្មានក្លរ៉ូប្លាសទេ`,
    body_en: `## Cell Biology
All living organisms are made of cells. Plant cells uniquely feature cell walls and chloroplasts for photosynthesis.`,
  },
  {
    id: "les-g7-bio-02",
    grade: 7,
    sort_order: 2,
    title_km: "ចំណាត់ថ្នាក់ភាវៈរស់ទាំង ៥ អាណាចក្រ",
    title_en: "Classification of Living Things (5 Kingdoms)",
    summary_km: "អាណាចក្របាក់តេរី ព្រូទីស ផ្សិត រុក្ខជាតិ និងសត្វ តាមប្រព័ន្ធ Whittaker",
    summary_en: "Whittaker's 5 Kingdom taxonomy: Monera, Protista, Fungi, Plantae, and Animalia",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g7-bio-02" },
    body_km: `## ១. ចំណាត់ថ្នាក់ជីវសាស្ត្រ
ភាវៈរស់នៅលើផែនដីត្រូវបានបែងចែកជា **៥ អាណាចក្រធំៗ**៖
1. **អាណាចក្រម៉ូណេរ៉ា (Monera)៖** បាក់តេរី (គ្មានណ្វៃយ៉ូច្បាស់លាស់ / Prokaryotes)
2. **អាណាចក្រប្រូទីស្តា (Protista)៖** អាមីប ប៉ារ៉ាមេស៊ី សារ៉ាយឯកកោសិកា
3. **អាណាចក្រផ្សិត (Fungi)៖** ផ្សិតចំបើង មេដំបែ (មិនធ្វើរស្មីសំយោគទេ)
4. **អាណាចក្ររុក្ខជាតិ (Plantae)៖** ស្វ័យជីព ធ្វើរស្មីសំយោគ
5. **អាណាចក្រសត្វ (Animalia)៖** បរជីព ផ្លាស់ទីបាន ចែកជាសត្វឥតឆ្អឹងកង និងមានឆ្អឹងកង`,
    body_en: `## The 5 Kingdoms
Monera (Bacteria), Protista (Single-cell eukaryotes), Fungi, Plantae (Plants), Animalia (Animals).`,
  },
  {
    id: "les-g7-bio-03",
    grade: 7,
    sort_order: 3,
    title_km: "សរីរាង្គរុក្ខជាតិ ៖ ឫស ដើម ស្លឹក",
    title_en: "Plant Anatomy: Roots, Stems & Leaves",
    summary_km: "មុខងារស្រូបទឹករបស់ឫស ការដឹកជញ្ជូន និងស្តូម៉ាតប្តូរឧស្ម័ននៅស្លឹក",
    summary_en: "Root absorption, xylem-phloem stem transport, and stomata gas exchange mechanics",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g7-bio-03" },
    body_km: `## ១. ឫស (Roots)
- ស្រូបទឹក និងអំបិលខនិជពីក្នុងដីតាមរយៈរោមបឺត
- ទប់រុក្ខជាតិឱ្យឈររឹងមាំក្នុងដី

## ២. ដើម (Stem)
- ទ្រទ្រង់មែក ស្លឹក ផ្កា ផ្លែ
- ដឹកជញ្ជូនទឹកតាម **ស៊ីឡែម (Xylem)** និងអាហារតាម **ផ្លូអែម (Phloem)**

## ៣. ស្លឹក (Leaves)
- ធ្វើរស្មីសំយោគផលិតអាហារ
- បញ្ចេញចំហាយទឹក និងផ្លាស់ប្តូរឧស្ម័នតាមរន្ធ **ស្តូម៉ាត (Stomata)**`,
    body_en: `## Plant Organs
Roots absorb water; stems transport via xylem/phloem; leaves photosynthesize and exchange gases via stomata.`,
  },
  {
    id: "les-g7-bio-04",
    grade: 7,
    sort_order: 4,
    title_km: "រស្មីសំយោគ និងការដកដង្ហើមរបស់រុក្ខជាតិ",
    title_en: "Plant Photosynthesis & Transpiration",
    summary_km: "សមីការ 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ ពន្លឺព្រះអាទិត្យ និងសារៈសំខាន់ចំពោះជីវិត",
    summary_en: "Photosynthesis chemical equation, solar photon absorption via chlorophyll, and oxygen release",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g7-bio-04" },
    body_km: `## ១. សមីការរស្មីសំយោគ (Photosynthesis)
រុក្ខជាតិបៃតងចាប់យកពន្លឺព្រះអាទិត្យតាមរយៈសារធាតុ **ក្លរ៉ូភីល (Chlorophyll)** ដើម្បីផលិតជាតិស្ករគ្លុយកូស និងអុកស៊ីសែន៖

$$6\\text{ CO}_2 + 6\\text{ H}_2\\text{O} \\xrightarrow{\\text{ពន្លឺ + ក្លរ៉ូភីល}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{ O}_2$$

## ២. សារៈសំខាន់
- ផ្តល់អុកស៊ីសែន ($O_2$) សម្រាប់គ្រប់ភាវៈរស់ដកដង្ហើម
- ជាប្រភពអាហារដំបូងគេបង្អស់នៃខ្សែច្រវាក់ចំណីអាហារលើផែនដី`,
    body_en: `## Photosynthesis
$6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2$. Chlorophyll converts solar energy into chemical energy.`,
  },
  {
    id: "les-g7-bio-05",
    grade: 7,
    sort_order: 5,
    title_km: "ប្រព័ន្ធអេកូឡូស៊ី និងខ្សែច្រវាក់ចំណីអាហារ",
    title_en: "Ecosystems, Trophic Levels & Food Webs",
    summary_km: "អ្នកផលិត អ្នកប្រើប្រាស់ អ្នករំលាយពុកផុយ និងលំហូរថាមពលក្នុងធម្មជាតិ",
    summary_en: "Producers, primary/secondary consumers, decomposers, and trophic energy pyramid flow",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g7-bio-05" },
    body_km: `## ១. ខ្សែច្រវាក់ចំណីអាហារ (Food Chain)
ខ្សែច្រវាក់ចំណីអាហារបង្ហាញពីទំនាក់ទំនងចំណីអាហារ និងលំហូរថាមពលរវាងភាវៈរស់៖
$$\\text{អ្នកផលិត (ស្មៅ)} \\rightarrow \\text{អ្នកប្រើទី១ (ទន្សាយ)} \\rightarrow \\text{អ្នកប្រើទី២ (កញ្ជ្រោង)}$$

- **អ្នកផលិត (Producers)៖** រុក្ខជាតិបៃតង ផលិតអាហារដោយខ្លួនឯង
- **អ្នកប្រើប្រាស់ (Consumers)៖** សត្វស៊ីរុក្ខជាតិ ឬសត្វស៊ីសាច់
- **អ្នករំលាយ (Decomposers)៖** បាក់តេរី និងផ្សិត រំលាយសាកសពភាវៈរស់ទៅជាជីជាតិក្នុងដី`,
    body_en: `## Food Chains & Trophic Levels
Producers (plants) $\\rightarrow$ Primary Consumers (herbivores) $\\rightarrow$ Secondary Consumers (carnivores) $\\rightarrow$ Decomposers.`,
  },

  // ============================================================================
  // GRADE 7 — EARTH SCIENCE (ផែនដីវិទ្យា)
  // ============================================================================
  {
    id: "les-g7-earth-01",
    grade: 7,
    sort_order: 1,
    title_km: "រចនាសម្ព័ន្ធស្រទាប់ខាងក្នុងរបស់ផែនដី",
    title_en: "Earth's Geosphere Layered Structure",
    summary_km: "សំបកផែនដី អាវផែនដី ស្នូលក្រៅ និងស្នូលក្នុងរឹង",
    summary_en: "Crust, mantle, liquid outer core, solid inner core, seismic discontinuities, and temperatures",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g7-earth-01" },
    body_km: `## ១. ស្រទាប់ធំៗទាំង ៣ នៃផែនដី
ផែនដីចែកជាស្រទាប់ពីក្រៅទៅក្នុង៖
1. **សំបកផែនដី (Crust)៖** ស្រទាប់រឹងស្តើងបំផុតពី $0 - 70\\text{ km}$ (សំបកទ្វីប និងសំបកមហាសមុទ្រ)
2. **អាវផែនដី (Mantle)៖** ស្រទាប់ក្រាស់ជាងគេ (ជម្រៅដល់ $2900\\text{ km}$) ផ្ទុកថ្មម៉ាក់ម៉ាក្តៅរាវ
3. **ស្នូលផែនដី (Core)៖**
   - **ស្នូលក្រៅ (Outer Core)៖** ជាដែក និងនីកែលរាវ បង្កើតដែនម៉ាញេទិចផែនដី
   - **ស្នូលក្នុង (Inner Core)៖** ជាដែករឹង ដោយសារសម្ពាធសង្កត់ដ៏មហាសាល`,
    body_en: `## Earth's Interior
Crust (solid surface) $\\rightarrow$ Mantle (convection currents) $\\rightarrow$ Outer Core (liquid iron) $\\rightarrow$ Inner Core (solid iron).`,
  },
  {
    id: "les-g7-earth-02",
    grade: 7,
    sort_order: 2,
    title_km: "វដ្តថ្ម និងប្រភេទថ្មទាំង ៣",
    title_en: "The Rock Cycle & Three Major Rock Types",
    summary_km: "ថ្មម៉ាក់ម៉ា ថ្មកម្ទេចកំណ និងថ្មប្រែក្លាយ ព្រមទាំងការបំលែងនៃវដ្តថ្ម",
    summary_en: "Igneous, sedimentary, and metamorphic rock genesis through heat, pressure, and cooling",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g7-earth-02" },
    body_km: `## ១. ប្រភេទថ្មទាំង ៣
1. **ថ្មម៉ាក់ម៉ា (Igneous Rocks)៖** កកើតពីការត្រជាក់ និងកកនៃម៉ាក់ម៉ា ឬកម្អែលភ្នំភ្លើង (ឧ. ថ្មក្រានីត ថ្មបាសាល់)
2. **ថ្មកម្ទេចកំណ (Sedimentary Rocks)៖** កកើតពីការកកកុញនៃកម្ទេចកំទី និងគ្រោងឆ្អឹងសត្វ (ឧ. ថ្មកំបោរ ថ្មភក់) មានផ្ទុកផូស៊ីល!
3. **ថ្មប្រែក្លាយ (Metamorphic Rocks)៖** កកើតពីថ្មដើមរងកម្តៅ និងសម្ពាធខ្លាំងក្នុងដី (ឧ. ថ្មម៉ាប)`,
    body_en: `## Rock Cycle
Igneous (cooled magma) $\\leftrightarrow$ Sedimentary (compacted sediments) $\\leftrightarrow$ Metamorphic (heat & pressure).`,
  },
  {
    id: "les-g7-earth-03",
    grade: 7,
    sort_order: 3,
    title_km: "វដ្តទឹក និងប្រភពទឹកលើផែនដី",
    title_en: "Hydrological Water Cycle & Global Reservoirs",
    summary_km: "ការហួត កំណកញើស ទឹកភ្លៀង និងលំហូរទឹកក្នុងទន្លេមេគង្គ និងបឹងទន្លេសាប",
    summary_en: "Evaporation, transpiration, condensation, precipitation, surface runoff, and Mekong water flow",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g7-earth-03" },
    body_km: `## ១. វដ្តទឹកធម្មជាតិ (Water Cycle)
ទឹកផ្លាស់ប្តូរស្ថានភាព និងចលនាឥតឈប់ឈរ៖
1. **ការហួត (Evaporation)៖** កម្តៅព្រះអាទិត្យធ្វើឱ្យទឹកសមុទ្រ និងទន្លេហួតជាចំហាយទឹក
2. **កំណកញើស (Condensation)៖** ចំហាយទឹកឡើងលើត្រជាក់បង្កើតជាពពក
3. **ធ្លាក់ទឹកភ្លៀង (Precipitation)៖** តំណក់ទឹកធ្លាក់មកដីជាភ្លៀង
4. **លំហូរ និងជ្រាបចូលដី (Runoff & Infiltration)៖** ទឹកហូរចូលស្ទឹង ទន្លេ និងជ្រាបទៅជាទឹកក្រោមដី`,
    body_en: `## Water Cycle
Solar heat drives continuous cycle: Evaporation $\\rightarrow$ Condensation (clouds) $\\rightarrow$ Precipitation $\\rightarrow$ Runoff.`,
  },
  {
    id: "les-g7-earth-04",
    grade: 7,
    sort_order: 4,
    title_km: "អាកាសធាតុ ខ្យល់ និងសម្ពាធបរិយាកាស",
    title_en: "Weather, Wind Systems & Atmospheric Pressure",
    summary_km: "សម្ពាធខ្ពស់ សម្ពាធទាប ការកកើតខ្យល់ និងខ្យល់មូសុងនៅប្រទេសកម្ពុជា",
    summary_en: "High and low pressure systems, isobaric wind generation, and seasonal monsoon cycles in Cambodia",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g7-earth-04" },
    body_km: `## ១. សម្ពាធបរិយាកាស និងខ្យល់
- **ខ្យល់ (Wind)៖** គឺជាចលនានៃខ្យល់ដែលបក់ពី **តំបន់សម្ពាធខ្ពស់ (High Pressure)** ទៅកាន់ **តំបន់សម្ពាធទាប (Low Pressure)**។

## ២. រដូវកាលនៅប្រទេសកម្ពុជា
កម្ពុជាស្ថិតក្នុងតំបន់ត្រូពិច មានខ្យល់មូសុងពីរដូវ៖
- **ខ្យល់មូសុងនិរតី (ខែឧសភា - តុលា)៖** នាំមកនូវសំណើមពីសមុទ្រ បង្កើតជារដូវវស្សា (ភ្លៀងធ្លាក់)
- **ខ្យល់មូសុងឦសាន (ខែវិច្ឆិកា - មេសា)៖** នាំមកនូវខ្យល់ស្ងួត និងត្រជាក់ បង្កើតជារដូវប្រាំង`,
    body_en: `## Weather & Monsoons
Winds blow from high to low pressure. Cambodia experiences Southwest rainy monsoons and Northeast dry monsoons.`,
  },
  {
    id: "les-g7-earth-05",
    grade: 7,
    sort_order: 5,
    title_km: "ភពក្នុងប្រព័ន្ធព្រះអាទិត្យ",
    title_en: "Planetary Systems in the Solar Orbit",
    summary_km: "ព្រះអាទិត្យ ភពទាំង ៨ ភពដី និងភពឧស្ម័នយក្ស ព្រមទាំងគន្លងតារាវិថី",
    summary_en: "The Sun, terrestrial inner planets (Mercury, Venus, Earth, Mars), gas giants (Jupiter, Saturn, Uranus, Neptune)",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g7-earth-05" },
    body_km: `## ១. ប្រព័ន្ធព្រះអាទិត្យ (Solar System)
ប្រព័ន្ធព្រះអាទិត្យមាន **ព្រះអាទិត្យ** ជាផ្កាយកណ្តាល និងមាន **ភពចំនួន ៨** វិលជុំវិញ៖

1. **ភពថ្ម (Terrestrial Planets)៖**
   - ពុធ (Mercury) ៖ កៀកព្រះអាទិត្យជាងគេ
   - សុក្រ (Venus) ៖ ក្តៅជាងគេដោយសារឥទ្ធិពលផ្ទះកញ្ចក់ក្រាស់
   - ផែនដី (Earth) ៖ មានទឹក និងជីវិត
   - អង្គារ (Mars) ៖ ភពក្រហម
2. **ភពឧស្ម័នយក្ស (Gas Giants)៖**
   - ព្រហស្បតិ៍ (Jupiter) ៖ ធំជាងគេបង្អស់
   - សៅរ៍ (Saturn) ៖ មានខ្សែក្រវាត់ដ៏ស្រស់ស្អាត
   - អ៊ុយរ៉ានុស (Uranus) និង ណិបទូន (Neptune) ៖ ភពទឹកកកត្រជាក់`,
    body_en: `## Solar System
8 planets orbit the Sun: Mercury, Venus, Earth, Mars (terrestrial), Jupiter, Saturn, Uranus, Neptune (gas giants).`,
  },
];
