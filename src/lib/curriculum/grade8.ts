import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_8_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 8 — MATHEMATICS (គណិតវិទ្យា)
  // ============================================================================
  {
    id: "les-g8-math-01",
    grade: 8,
    sort_order: 1,
    title_km: "ចំនួនសនិទាន និងចំនួនអសនិទាន",
    title_en: "Rational & Irrational Numbers",
    summary_km: "និយមន័យសំណុំចំនួនសនិទាន Q ចំនួនទសភាគខួប និងឬសការេអសនិទាន √2, √3, π",
    summary_en: "Rational number set Q, repeating decimals, square roots, and irrational numbers √2, √3, π",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-01" },
    body_km: `## ១. ចំនួនសនិទាន (Rational Numbers $\\mathbb{Q}$)
ចំនួនសនិទាន គឺជាចំនួនដែលអាចសរសេរជាទម្រង់ប្រភាគ $\\frac{a}{b}$ ដែល $a, b \\in \\mathbb{Z}$ និង $b \\neq 0$។
- ចំនួនគត់៖ $5 = \\frac{5}{1}, \\quad -3 = \\frac{-3}{1}$
- ទសភាគកម្រិត៖ $0.75 = \\frac{3}{4}$
- ទសភាគខួប៖ $0.333... = 0.\\bar{3} = \\frac{1}{3}$

## ២. ចំនួនអសនិទាន (Irrational Numbers)
ចំនួនអសនិទាន គឺជាចំនួនដែល **មិនអាច** សរសេរជាទម្រង់ប្រភាគបានឡើយ (ជាទសភាគមិនកំណត់ និងមិនខួប)៖
$$\\sqrt{2} \\approx 1.414213..., \\quad \\sqrt{3} \\approx 1.732..., \\quad \\pi \\approx 3.14159...$$`,
    body_en: `## Rational vs Irrational
Rational numbers ($\\mathbb{Q}$) can be expressed as $a/b$ ($b \\neq 0$). Irrational numbers cannot be written as fractions (e.g., $\\sqrt{2}, \\pi$).`,
  },
  {
    id: "les-g8-math-02",
    grade: 8,
    sort_order: 2,
    title_km: "រូបមន្តពន្លាតពីជគណិត និងកន្សោមពីជគណិត",
    title_en: "Algebraic Identities & Factorization",
    summary_km: "សមភាពគួរចងចាំទាំង ៣ ៖ (a + b)², (a - b)² និង a² - b² ព្រមទាំងការដាក់ជាផលគុណកត្តា",
    summary_en: "Remarkable algebraic identities (a + b)², (a - b)², and a² - b² with polynomial factorization",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-02" },
    body_km: `## ១. រូបមន្តពន្លាតគួរចងចាំទាំង ៣
1. ការេនៃផលបូក៖
   $$(a + b)^2 = a^2 + 2ab + b^2$$
2. ការេនៃផលដក៖
   $$(a - b)^2 = a^2 - 2ab + b^2$$
3. ផលដកការេពីរតួ៖
   $$a^2 - b^2 = (a - b)(a + b)$$

## ២. ការដាក់ជាផលគុណកត្តា (Factorization)
- ចាប់កត្តារួម៖ $3x^2 + 6x = 3x(x + 2)$
- ប្រើរូបមន្ត $a^2 - b^2$៖ $x^2 - 9 = (x - 3)(x + 3)$`,
    body_en: `## Algebraic Identities
$(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, and $a^2 - b^2 = (a - b)(a + b)$.`,
  },
  {
    id: "les-g8-math-03",
    grade: 8,
    sort_order: 3,
    title_km: "ទ្រឹស្តីបទពីតាក័រ និងការអនុវត្ត",
    title_en: "Pythagorean Theorem & Geometry Applications",
    summary_km: "ទំនាក់ទំនងជ្រុងត្រីកោណកែង a² + b² = c² និងទ្រឹស្តីបទច្រាសដើម្បីបញ្ជាក់ត្រីកោណកែង",
    summary_en: "Hypotenuse formula a² + b² = c² in right-angled triangles and converse theorem proofs",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-03" },
    body_km: `## ១. ទ្រឹស្តីបទពីតាក័រ (Pythagoras' Theorem)
ក្នុងត្រីកោណកែងមួយ ការេនៃអ៊ីប៉ូតេនុស ($c$) ស្មើនឹងផលបូកការេនៃជ្រុងជាប់មុំកែងទាំងពីរ ($a$ និង $b$)៖
$$c^2 = a^2 + b^2 \\implies c = \\sqrt{a^2 + b^2}$$

> **ឧទាហរណ៍៖** បើ $a = 3$ និង $b = 4$
> $$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$

## ២. ទ្រឹស្តីបទច្រាសពីតាក័រ
បើក្នុងត្រីកោណមួយ ជ្រុងវែងបំផុតមានការេស្មើនឹងផលបូកការេជ្រុងពីរទៀត ($c^2 = a^2 + b^2$) នោះត្រីកោណនោះគឺជា **ត្រីកោណកែង**។`,
    body_en: `## Pythagorean Theorem
In right triangle: $c^2 = a^2 + b^2$. The converse verifies if a triangle contains a $90^\\circ$ angle.`,
  },
  {
    id: "les-g8-math-04",
    grade: 8,
    sort_order: 4,
    title_km: "សមីការ និងវិសមីការដឺក្រេទី១",
    title_en: "Linear Equations & Inequalities",
    summary_km: "ការដោះស្រាយសមីការមានភាគបែង វិសមីការ និងការប្តូរសញ្ញានៅពេលគុណនឹងចំនួនអវិជ្ជមាន",
    summary_en: "Solving linear equations with denominators, inequalities, and sign reversal when multiplying negatives",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-04" },
    body_km: `## ១. វិសមីការដឺក្រេទី១ (Inequalities)
វិសមីការមានសញ្ញា៖ $<, \\leq, >, \\geq$។

> **វិធានមាសគួរចងចាំ៖**
> នៅពេលគុណ ឬចែកអង្គទាំងពីរនៃវិសមីការនឹង **ចំនួនអវិជ្ជមាន (Negative Number)** យើងត្រូវ **ប្តូរទិសដៅសញ្ញា** ជានិច្ច!
> $$-2x < 6 \\implies x > \\frac{6}{-2} \\implies x > -3$$`,
    body_en: `## Inequalities
When multiplying or dividing both sides by a negative number, always reverse the inequality symbol.`,
  },
  {
    id: "les-g8-math-05",
    grade: 8,
    sort_order: 5,
    title_km: "ចតុកោណកែង ចតុកោណស្មើ និងការ៉េ",
    title_en: "Quadrilaterals: Rectangles, Rhombuses & Squares",
    summary_km: "លក្ខណៈសម្គាល់នៃប្រលេឡូក្រាម ចតុកោណកែង ចតុកោណស្មើ ការ៉េ និងរូបមន្តក្រឡាផ្ទៃ",
    summary_en: "Properties of parallelograms, rectangles, rhombuses, squares, diagonals, and area formulas",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-05" },
    body_km: `## ១. លក្ខណៈនៃចតុកោណពិសេស
- **ប្រលេឡូក្រាម៖** ជ្រុងឈមស្របគ្នា និងស្មើគ្នា អង្កត់ទ្រូងកាត់គ្នាត្រង់ចំណុចកណ្តាល
- **ចតុកោណកែង៖** ជាប្រលេឡូក្រាមដែលមានមុំកែង អង្កត់ទ្រូងទាំងពីរស្មើគ្នា
- **ចតុកោណស្មើ (Rhombus)៖** ជ្រុងទាំង ៤ ស្មើគ្នា អង្កត់ទ្រូងកាត់គ្នាកែង
- **ការ៉េ (Square)៖** ទាំងជ្រុងទាំង ៤ ស្មើគ្នា និងទាំងមុំទាំង ៤ កែង ($90^\\circ$)

## ២. រូបមន្តក្រឡាផ្ទៃ
- ចតុកោណកែង៖ $S = L \\times w$
- ការ៉េ៖ $S = a^2$
- ចតុកោណស្មើ៖ $S = \\frac{d_1 \\times d_2}{2}$`,
    body_en: `## Quadrilaterals
Parallelogram properties expand to rectangles (equal diagonals), rhombuses (perpendicular diagonals), and squares.`,
  },
  {
    id: "les-g8-math-06",
    grade: 8,
    sort_order: 6,
    title_km: "ផលគុណកត្តានៃកន្សោមពីជគណិត និងការបំបែកតួ",
    title_en: "Polynomial Factorization & Grouping",
    summary_km: "វិធីចាប់កត្តារួម ការប្រើប្រាស់រូបមន្ត a² - b² និងវិធីបំបែកតួកណ្តាលនៃត្រីធា ax² + bx + c",
    summary_en: "Common factor extraction, difference of squares a² - b², and splitting middle terms in quadratic trinomials",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-06" },
    body_km: `## ១. វិធីចាប់កត្តារួម (Common Factors)
$$ab + ac = a(b + c)$$
- **ឧទាហរណ៍៖** $6x^2 - 9x = 3x(2x - 3)$

## ២. ប្រើប្រាស់រូបមន្តផលដកការេ
$$a^2 - b^2 = (a - b)(a + b)$$
- **ឧទាហរណ៍៖** $4x^2 - 25 = (2x - 5)(2x + 5)$

## ៣. វិធីបំបែកតួកណ្តាល
ដើម្បីដាក់ $x^2 + 5x + 6$ ជាផលគុណកត្តា យើងរកពីរចំនួនដែលមានផលបូក $5$ និងផលគុណ $6$ (គឺ $2$ និង $3$)៖
$$x^2 + 5x + 6 = (x + 2)(x + 3)$$`,
    body_en: `## Factorization Methods
Extract greatest common factor, apply $a^2 - b^2 = (a-b)(a+b)$, and decompose middle terms to factor quadratic polynomials.`,
  },
  {
    id: "les-g8-math-07",
    grade: 8,
    sort_order: 7,
    title_km: "ត្រីកោណប៉ុនគ្នា (លក្ខខណ្ឌ ជ្រ-ជ្រ-ជ្រ, ជ្រ-ម-ជ្រ, ម-ជ្រ-ម)",
    title_en: "Triangle Congruence (SSS, SAS, ASA Criteria)",
    summary_km: "លក្ខណៈត្រីកោណប៉ុនគ្នា ជ្រុងត្រូវគ្នា មុំត្រូវគ្នា និងការអនុវត្តក្នុងការបញ្ជាក់ធរណីមាត្រ",
    summary_en: "Criteria for triangle congruence: Side-Side-Side, Side-Angle-Side, Angle-Side-Angle, and geometric proofs",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-07" },
    body_km: `## ១. និយមន័យត្រីកោណប៉ុនគ្នា
ត្រីកោណពីរហៅថាប៉ុនគ្នា លុះត្រាតែជ្រុងត្រូវគ្នាស្មើៗគ្នា និងមុំត្រូវគ្នាស្មើៗគ្នា។

## ២. ករណីប៉ុនគ្នាទាំង ៣
១. **ករណីទី១ (ជ្រុង-ជ្រុង-ជ្រុង / SSS)៖** ជ្រុងទាំងបីនៃត្រីកោណមួយស្មើនឹងជ្រុងទាំងបីនៃត្រីកោណមួយទៀត
២. **ករណីទី២ (ជ្រុង-មុំ-ជ្រុង / SAS)៖** ជ្រុងពីរ និងមុំផ្គុំដោយជ្រុងទាំងពីរនៃត្រីកោណមួយ ស្មើនឹងជ្រុងពីរ និងមុំផ្គុំនៃត្រីកោណមួយទៀត
៣. **ករណីទី៣ (មុំ-ជ្រុង-មុំ / ASA)៖** ជ្រុងមួយ និងមុំជាប់ជ្រុងនោះពីរនៃត្រីកោណមួយ ស្មើនឹងជ្រុងមួយ និងមុំជាប់នៃត្រីកោណមួយទៀត។`,
    body_en: `## Triangle Congruence
Two triangles are congruent if they satisfy SSS (Side-Side-Side), SAS (Side-Angle-Side), or ASA (Angle-Side-Angle) conditions.`,
  },
  {
    id: "les-g8-math-08",
    grade: 8,
    sort_order: 8,
    title_km: "ធរណីមាត្រមាឌ ស៊ីឡាំង កោន និងស្វ៊ែរ",
    title_en: "Volumes of Cylinders, Cones & Spheres",
    summary_km: "រូបមន្តមាឌស៊ីឡាំង V = πr²h មាឌកោន V = (1/3)πr²h និងមាឌស្វ៊ែរ V = (4/3)πr³",
    summary_en: "Solid volume and surface area formulas for cylinders, cones, and spheres with practical calculation examples",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-08" },
    body_km: `## ១. ស៊ីឡាំង (Cylinder)
- ក្រឡាផ្ទៃខាង៖ $S_l = 2\\pi rh$
- មាឌ៖ $V = \\pi r^2 h$ (ផ្ទៃបាត $\\times$ កម្ពស់)

## ២. កោន (Cone)
- មាឌ៖ $V = \\frac{1}{3} \\pi r^2 h$ (មួយភាគបីនៃមាឌស៊ីឡាំងដែលមានកាំបាត និងកម្ពស់ដូចគ្នា)

## ៣. ស្វ៊ែរ (Sphere)
- ក្រឡាផ្ទៃស្វ៊ែរ៖ $S = 4\\pi r^2$
- មាឌស្វ៊ែរ៖ $V = \\frac{4}{3} \\pi r^3$`,
    body_en: `## Curved Solids
Cylinder: $V = \\pi r^2 h$. Cone: $V = \\frac{1}{3}\\pi r^2 h$. Sphere: $V = \\frac{4}{3}\\pi r^3$.`,
  },
  {
    id: "les-g8-math-09",
    grade: 8,
    sort_order: 9,
    title_km: "ស្ថិតិ មធ្យមនព្វន្ត និងដ្យាក្រាមទិន្នន័យ",
    title_en: "Descriptive Statistics, Mean & Histograms",
    summary_km: "ការគណនាមធ្យមនព្វន្ត ម៉ូត ថ្នាក់ទិន្នន័យ តារាងប្រេកង់ និងអ៊ីស្តូក្រាម",
    summary_en: "Mean calculation, modal classes, continuous frequency distribution tables, and histogram representations",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-09" },
    body_km: `## ១. មធ្យមនព្វន្ត (Arithmetic Mean)
$$\\bar{x} = \\frac{\\sum f_i x_i}{N} = \\frac{f_1 x_1 + f_2 x_2 + ... + f_k x_k}{f_1 + f_2 + ... + f_k}$$
- $x_i$ ៖ តម្លៃទិន្នន័យ (ឬចំណុចកណ្តាលថ្នាក់)
- $f_i$ ៖ ប្រេកង់នៃទិន្នន័យនីមួយៗ
- $N$ ៖ ចំនួនទិន្នន័យសរុប

## ២. អ៊ីស្តូក្រាម (Histogram)
អ៊ីស្តូក្រាម គឺជាដ្យាក្រាមចតុកោណកែងជាប់ៗគ្នា ដែលផ្ទៃក្រឡាចតុកោណកែងនីមួយៗសមាមាត្រនឹងប្រេកង់នៃថ្នាក់នីមួយៗ។`,
    body_en: `## Grouped Statistics
Calculate the weighted mean $\\bar{x} = \\frac{\\sum f_i x_i}{N}$ and plot frequency density on histograms.`,
  },
  {
    id: "les-g8-math-10",
    grade: 8,
    sort_order: 10,
    title_km: "ចំណោទគណិតវិទ្យាដោះស្រាយដោយប្រព័ន្ធសមីការបឋម",
    title_en: "Applied Math Word Problems (Systems)",
    summary_km: "ការបង្កើត និងដោះស្រាយចំណោទសេដ្ឋកិច្ច ការទិញលក់ និងធរណីមាត្រតាមរយៈសមីការលីនេអ៊ែរ",
    summary_en: "Mathematical modeling of commercial transactions, perimeter constraints, and linear system formulation",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g8-math-10" },
    body_km: `## ១. វិធីសាស្ត្របង្កើតប្រព័ន្ធសមីការ
១. កំណត់អញ្ញាតពីរ $x$ និង $y$ ព្រមទាំងខ្នាត
២. បកប្រែលក្ខខណ្ឌទាំងពីរនៃប្រធានចំណោទទៅជាសមីការពីរ
៣. ដោះស្រាយប្រព័ន្ធសមីការតាមវិធីបូកបំបាត់ ឬវិធីជំនួស
៤. ផ្ទៀងផ្ទាត់ចម្លើយ និងឆ្លើយសំណួរ។

> **ឧទាហរណ៍៖** សៀវភៅ ២ ក្បាល និងប៊ិច ៣ ដើម តម្លៃ $8000$ រៀល។ សៀវភៅ ៣ ក្បាល និងប៊ិច ២ ដើម តម្លៃ $9500$ រៀល។ រកតម្លៃសៀវភៅ ១ ក្បាល និងប៊ិច ១ ដើម។
> $$\\begin{cases} 2x + 3y = 8000 \\\\ 3x + 2y = 9500 \\end{cases}$$
> ដោះស្រាយបាន $x = 2500$ រៀល (សៀវភៅ) និង $y = 1000$ រៀល (ប៊ិច)។`,
    body_en: `## Problem Solving with Linear Systems
Formulate two equations with two unknowns ($x, y$), eliminate or substitute variables, and verify economic reality.`,
  },

  // ============================================================================
  // GRADE 8 — PHYSICS (រូបវិទ្យា)
  // ============================================================================
  {
    id: "les-g8-phys-01",
    grade: 8,
    sort_order: 1,
    title_km: "សម្ពាធក្នុងសូលីត និងសន្ទនីយ៍ (P = F / S)",
    title_en: "Solid & Hydrostatic Pressure (P = F / S)",
    summary_km: "និយមន័យសម្ពាធ រូបមន្ត P = F / S សម្ពាធក្នុងទឹក P = ρ · g · h និងខ្នាតប៉ាស្កាល់ (Pa)",
    summary_en: "Pressure formula P = F/S, Pascal unit (Pa), and hydrostatic fluid depth pressure P = ρgh",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g8-phys-01" },
    body_km: `## ១. សម្ពាធក្នុងសូលីត (Pressure in Solids)
សម្ពាធ $P$ គឺជាកម្លាំងសង្កត់កែងលើផ្ទៃមួយខ្នាតក្រឡាផ្ទៃ $S$៖
$$P = \\frac{F}{S}$$
- $P$ ៖ សម្ពាធ (ប៉ាស្កាល់ $Pa$ ឬ $N/m^2$)
- $F$ ៖ កម្លាំងសង្កត់កែង ($N$)
- $S$ ៖ ក្រឡាផ្ទៃប៉ះ ($m^2$)

## ២. សម្ពាធសន្ទនីយ៍ក្នុងអង្គធាតុរាវ (Hydrostatic Pressure)
សម្ពាធក្នុងអង្គធាតុរាវកើនឡើងតាមជម្រៅទឹក $h$៖
$$P = \\rho \\cdot g \\cdot h$$
- $\\rho$ ៖ ម៉ាសមាឌរាវ ($kg/m^3$)
- $g = 9.8\\text{ m/s}^2$ ៖ សំទុះទំនាញដី
- $h$ ៖ ជម្រៅទឹក ($m$)`,
    body_en: `## Pressure
$P = F/S$ measured in Pascals ($Pa$). Hydrostatic liquid pressure increases with depth: $P = \\rho g h$.`,
  },
  {
    id: "les-g8-phys-02",
    grade: 8,
    sort_order: 2,
    title_km: "កម្លាំងរុញអាកស៊ីម៉ែត និងលក្ខខណ្ឌអណ្តែត",
    title_en: "Archimedes' Buoyancy Principle",
    summary_km: "ច្បាប់អាកស៊ីម៉ែត FA = ρ · V · g ទម្ងន់ជាក់ស្តែងក្នុងទឹក និងលក្ខខណ្ឌអណ្តែត-លិច",
    summary_en: "Buoyancy force FA = ρ·V·g equal to weight of displaced fluid, apparent weight, and flotation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g8-phys-02" },
    body_km: `## ១. គោលការណ៍អាកស៊ីម៉ែត (Archimedes' Principle)
អង្គធាតុមួយដែលពន្លិចក្នុងអង្គធាតុរាវ រងកម្លាំងរុញច្រានពីក្រោមឡើងលើ ហៅថា **កម្លាំងរុញអាកស៊ីម៉ែត ($F_A$)** ដែលស្មើនឹងទម្ងន់នៃអង្គធាតុរាវដែលត្រូវផ្លាស់ទី៖

$$F_A = \\rho \\cdot V \\cdot g$$
- $\\rho$ ៖ ម៉ាសមាឌអង្គធាតុរាវ ($kg/m^3$)
- $V$ ៖ មាឌផ្នែកដែលលិចក្នុងទឹក ($m^3$)
- $g$ ៖ សំទុះទំនាញ ($9.8\\text{ m/s}^2$)

## ២. លក្ខខណ្ឌអណ្តែត និងលិច
- បើ $F_A > P$ (ទម្ងន់វត្ថុ) ៖ អង្គធាតុ **អណ្តែតឡើងលើ**
- បើ $F_A = P$ ៖ អង្គធាតុ **អណ្តែតត្រឹមផ្ទៃទឹក (លំនឹង)**
- បើ $F_A < P$ ៖ អង្គធាតុ **លិចចុះបាត**`,
    body_en: `## Archimedes' Principle
$F_A = \\rho V g$. Buoyant force equals the weight of displaced liquid. Floating happens when $F_A = Weight$.`,
  },
  {
    id: "les-g8-phys-03",
    grade: 8,
    sort_order: 3,
    title_km: "ការងារ និងអានុភាពមេកានិច (W = F · d, P = W / t)",
    title_en: "Mechanical Work & Power (W = F · d, P = W / t)",
    summary_km: "និយមន័យការងារមេកានិច ខ្នាតស៊ូល (J) និងអានុភាពគិតជាវ៉ាត់ (W)",
    summary_en: "Work W = F·d measured in Joules (J), and power P = W/t measured in Watts (W)",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g8-phys-03" },
    body_km: `## ១. ការងារមេកានិច (Work $W$)
កម្លាំងមួយធ្វើការងារ លុះត្រាតែកម្លាំងនោះធ្វើឱ្យវត្ថុផ្លាស់ទីតាមទិសដៅនៃកម្លាំង៖
$$W = F \\cdot d$$
- $W$ ៖ ការងារ (ស៊ូល $J$)
- $F$ ៖ កម្លាំង ($N$)
- $d$ ៖ ចម្ងាយផ្លាស់ទី ($m$)

## ២. អានុភាពមេកានិច (Power $P$)
អានុភាព គឺជាល្បឿននៃការបំពេញការងារក្នុងមួយឯកតាពេល៖
$$P = \\frac{W}{t}$$
- $P$ ៖ អានុភាព (វ៉ាត់ $W$)
- $t$ ៖ រយៈពេល ($s$)
- $1\\text{ kW} = 1000\\text{ W}$, $1\\text{ សេះ (HP)} \\approx 746\\text{ W}$`,
    body_en: `## Work & Power
Work $W = F \\cdot d$ (Joules). Power $P = W/t$ (Watts). One horsepower is roughly $746\\text{ W}$.`,
  },
  {
    id: "les-g8-phys-04",
    grade: 8,
    sort_order: 4,
    title_km: "ទែរម៉ូម៉ែត្រ និងការចម្លងកម្តៅ",
    title_en: "Thermal Physics & Heat Transfer",
    summary_km: "ការចម្លងកម្តៅតាមរយៈ បន្សាយកម្តៅ ចរន្តវិលវល់ និងវិទ្យុសកម្មកម្តៅ",
    summary_en: "Three modes of thermal energy transfer: conduction, convection currents, and infrared radiation",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g8-phys-04" },
    body_km: `## ១. របៀបទាំង ៣ នៃការបញ្ជូនកម្តៅ
1. **ការចម្លងកម្តៅ (Conduction)៖** កើតឡើងក្នុងអង្គធាតុរឹង (លោហៈចម្លងកម្តៅបានល្អជាងគេ)
2. **ចរន្តវិលវល់ (Convection)៖** កើតឡើងក្នុងអង្គធាតុរាវ និងឧស្ម័ន (សារធាតុរាវក្តៅស្រាលអណ្តែតឡើង សារធាតុរាវត្រជាក់ធ្លាក់ចុះ)
3. **វិទ្យុសកម្ម (Radiation)៖** ការបញ្ជូនតាមរលកអេឡិចត្រូម៉ាញេទិច មិនត្រូវការមជ្ឈដ្ឋានកណ្តាលឡើយ (ដូចកម្តៅព្រះអាទិត្យមកផែនដី)`,
    body_en: `## Heat Transfer
Conduction (solids), Convection (fluids), and Radiation (electromagnetic infrared across vacuum).`,
  },
  {
    id: "les-g8-phys-05",
    grade: 8,
    sort_order: 5,
    title_km: "អគ្គិសនីស្ទាទិច និងសៀគ្វីអគ្គិសនីបឋម",
    title_en: "Electrostatics & Elementary Circuits",
    summary_km: "បន្ទុកវិជ្ជមាន អវិជ្ជមាន ការឆក់អេឡិចត្រូស្ទាទិច និងគ្រឿងបង្គុំសៀគ្វីអគ្គិសនី",
    summary_en: "Electric charge properties, attraction/repulsion, conductors vs insulators, and basic series circuits",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g8-phys-05" },
    body_km: `## ១. បន្ទុកអគ្គិសនី (Electric Charges)
- មានពីរប្រភេទ៖ **បន្ទុកវិជ្ជមាន ($+$)** និង **បន្ទុកអវិជ្ជមាន ($-$)**
- បន្ទុកដូចគ្នា **ច្រានគ្នា** ($+ \\leftrightarrow +$ ឬ $- \\leftrightarrow -$)
- បន្ទុកផ្ទុយគ្នា **ទាញគ្នា** ($+ \\rightarrow \\leftarrow -$)

## ២. សៀគ្វីអគ្គិសនីសាមញ្ញ
សៀគ្វីអគ្គិសនីត្រូវតែបិទជិត ដើម្បីឱ្យចរន្តអគ្គិសនីហូរបាន៖
- **ប្រភពអគ្គិសនី (ថ្មពិល)៖** ផ្តល់តង់ស្យុង
- **ខ្សែចម្លង (ទង់ដែង)៖** ដឹកនាំអេឡិចត្រុងសេរី
- **អ្នកទទួល (អំពូលភ្លើង)៖** បំប្លែងថាមពលអគ្គិសនីទៅជាពន្លឺ`,
    body_en: `## Electrostatics & Circuits
Opposite charges attract; like charges repel. Closed circuits allow electron current to illuminate bulbs.`,
  },

  // ============================================================================
  // GRADE 8 — CHEMISTRY (គីមីវិទ្យា)
  // ============================================================================
  {
    id: "les-g8-chem-01",
    grade: 8,
    sort_order: 1,
    title_km: "អាតូម ម៉ូលេគុល និងរូបមន្តគីមី",
    title_en: "Atoms, Chemical Formulas & Valency",
    summary_km: "និមិត្តសញ្ញាគីមី វ៉ាឡង់នៃធាតុ រូបមន្តគីមី និងម៉ាសម៉ូលេគុល M",
    summary_en: "Chemical element symbols, valency rules, writing compound formulas, and molecular weight M",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g8-chem-01" },
    body_km: `## ១. និមិត្តសញ្ញាធាតុ និងវ៉ាឡង់
- អ៊ីដ្រូសែន ($H$) ៖ វ៉ាឡង់ I
- អុកស៊ីសែន ($O$) ៖ វ៉ាឡង់ II
- កាបូន ($C$) ៖ វ៉ាឡង់ IV
- សូដ្យូម ($Na$) ៖ វ៉ាឡង់ I

## ២. វិធានខ្វែងវ៉ាឡង់ដើម្បីសរសេររូបមន្តគីមី
$$\\text{ធាតុ A (វ៉ាឡង់ } x) + \\text{ធាតុ B (វ៉ាឡង់ } y) \\implies A_y B_x$$
> **ឧទាហរណ៍៖** អាលុយមីញ៉ូម ($Al$ វ៉ាឡង់ III) ផ្សំជាមួយអុកស៊ីសែន ($O$ វ៉ាឡង់ II) ៖
> $$\\implies Al_2O_3$$`,
    body_en: `## Chemical Formulas
Cross-valency rule: element A (valency x) and element B (valency y) form compound $A_y B_x$ (e.g. $Al_2O_3$).`,
  },
  {
    id: "les-g8-chem-02",
    grade: 8,
    sort_order: 2,
    title_km: "ច្បាប់រក្សាម៉ាស និងតុល្យភាពសមីការគីមី",
    title_en: "Conservation of Mass & Equation Balancing",
    summary_km: "ច្បាប់ឡាវ៉្វាស៊ីយេ ម៉ាសមុនប្រតិកម្មស្មើម៉ាសក្រោយប្រតិកម្ម និងមេគុណស្ទ័រគ្យូម៉េទ្រី",
    summary_en: "Lavoisier's Law of Mass Conservation: total mass of reactants equals total mass of products",
    xp_reward: 35,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g8-chem-02" },
    body_km: `## ១. ច្បាប់រក្សាម៉ាស (ច្បាប់ឡាវ៉្វាស៊ីយេ)
> «គ្មានអ្វីបាត់បង់ គ្មានអ្វីកើតឡើងថ្មី គ្រប់យ៉ាងប្រែប្រួល»
> ផលបូកម៉ាសនៃអង្គធាតុប្រតិករ តែងតែស្មើនឹងផលបូកម៉ាសនៃអង្គធាតុកកើត៖
> $$\\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}$$

## ២. តុល្យភាពសមីការគីមី
ចំនួនអាតូមនៃធាតុនីមួយៗនៅខាងឆ្វេង (ប្រតិករ) ត្រូវតែស្មើនឹងចំនួនអាតូមនៅខាងស្តាំ (កកើត)៖
$$2\\text{ H}_2 + \\text{O}_2 \\rightarrow 2\\text{ H}_2\\text{O}$$
- ខាងឆ្វេង៖ $4\\text{ H}, 2\\text{ O}$
- ខាងស្តាំ៖ $4\\text{ H}, 2\\text{ O}$ (មានតុល្យភាព!)`,
    body_en: `## Conservation of Mass
Lavoisier's law: Mass is conserved in chemical reactions. Balance equations by matching atom counts on both sides.`,
  },
  {
    id: "les-g8-chem-03",
    grade: 8,
    sort_order: 3,
    title_km: "អុកស៊ីសែន និងប្រតិកម្មឆេះ",
    title_en: "Oxygen Chemistry & Combustion",
    summary_km: "លក្ខណៈរូប និងគីមីនៃអុកស៊ីសែន ប្រតិកម្មអុកស៊ីតកម្ម និងលក្ខខណ្ឌនៃការឆេះ",
    summary_en: "Properties of O2, complete vs incomplete combustion of carbon and metals, forming oxides",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g8-chem-03" },
    body_km: `## ១. លក្ខណៈនៃអុកស៊ីសែន ($O_2$)
អុកស៊ីសែនជាឧស្ម័នគ្មានពណ៌ គ្មានក្លិន ធ្ងន់ជាងខ្យល់បន្តិច និងទ្រទ្រង់អំពើឆេះ។

## ២. ប្រតិកម្មឆេះ (Combustion)
- ឆេះកាបូន៖
  $$\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2$$
- ឆេះដែក៖
  $$3\\text{Fe} + 2\\text{O}_2 \\rightarrow \\text{Fe}_3\\text{O}_4$$
- ឆេះឧស្ម័នមេតាន (ហ្គាសផ្ទះបាយ)៖
  $$\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$$`,
    body_en: `## Combustion
Oxygen supports rapid exothermic oxidation reactions. Complete hydrocarbon burning yields $CO_2$ and $H_2O$.`,
  },
  {
    id: "les-g8-chem-04",
    grade: 8,
    sort_order: 4,
    title_km: "អ៊ីដ្រូសែន និងប្រតិកម្មជាមួយលោហៈ",
    title_en: "Hydrogen Properties & Metal Reactions",
    summary_km: "ឧស្ម័នស្រាលជាងគេ ការផលិត H₂ ដោយឱ្យអាស៊ីតមានអំពើលើលោហៈសកម្ម (Zn, Fe)",
    summary_en: "Lightest gas H2, acid-metal single displacement reactions Zn + 2HCl → ZnCl2 + H2, pop test",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g8-chem-04" },
    body_km: `## ១. ឧស្ម័នអ៊ីដ្រូសែន ($H_2$)
អ៊ីដ្រូសែន គឺជាឧស្ម័នដែល **ស្រាលជាងគេបំផុត** ក្នុងសកលលោក។ នៅពេលឆេះក្នុងខ្យល់ វាបញ្ចេញសំឡេងផ្ទុះ «ផូង» យ៉ាងលក្ខណៈសម្គាល់។

## ២. ការទាញយកអ៊ីដ្រូសែនក្នុងបន្ទប់ពិសោធន៍
គេឱ្យលោហៈសកម្ម (ស័ង្កសី $Zn$, ដែក $Fe$) មានប្រតិកម្មជាមួយអាស៊ីតក្លរីឌ្រិច ($HCl$)៖
$$\\text{Zn} + 2\\text{HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2 \\uparrow$$`,
    body_en: `## Hydrogen
Lightest element. Prepared via acid + metal displacement: $Zn + 2HCl \\rightarrow ZnCl_2 + H_2$.`,
  },
  {
    id: "les-g8-chem-05",
    grade: 8,
    sort_order: 5,
    title_km: "អាស៊ីត និងបាសបឋម",
    title_en: "Introductory Acids, Bases & Indicators",
    summary_km: "ក្រដាសលីតមុស ពណ៌ប្រែប្រួល រសជាតិជូរនៃអាស៊ីត និងរអិលនៃបាស",
    summary_en: "Litmus paper indicators (red for acid, blue for base), sensory properties, and common household chemicals",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g8-chem-05" },
    body_km: `## ១. អាស៊ីត (Acids)
- មានរសជាតិជូរ (ឧ. ទឹកក្រូចឆ្មា $HCl$)
- ធ្វើឱ្យ **ក្រដាសលីតមុសប្តូរពីពណ៌ខៀវ ទៅជាពណ៌ក្រហម**

## ២. បាស (Bases)
- មានរសជាតិចត់ និងរអិលដូចសាប៊ូ (ឧ. សូដ្យូមអ៊ីដ្រុកស៊ីត $NaOH$, ទឹកកំបោរ $Ca(OH)_2$)
- ធ្វើឱ្យ **ក្រដាសលីតមុសប្តូរពីពណ៌ក្រហម ទៅជាពណ៌ខៀវ**`,
    body_en: `## Acids & Bases
Acids turn blue litmus red. Bases turn red litmus blue and feel slippery like soap.`,
  },

  // ============================================================================
  // GRADE 8 — BIOLOGY (ជីវវិទ្យា)
  // ============================================================================
  {
    id: "les-g8-bio-01",
    grade: 8,
    sort_order: 1,
    title_km: "ប្រព័ន្ធរំលាយអាហាររបស់មនុស្ស",
    title_en: "Human Digestive Anatomy & Enzymatic Breakdown",
    summary_km: "ដំណើររំលាយអាហារមេកានិច និងគីមីពីមាត់ ក្រពះ ពោះវៀនតូច និងការស្រូបសារធាតុចិញ្ចឹម",
    summary_en: "Mechanical chewing, gastric acid, digestive enzymes (amylase, pepsin), small intestine villi absorption",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g8-bio-01" },
    body_km: `## ១. ផ្លូវរំលាយអាហារ
$$\\text{មាត់} \\rightarrow \\text{បំពង់អាហារ} \\rightarrow \\text{ក្រពះ} \\rightarrow \\text{ពោះវៀនតូច} \\rightarrow \\text{ពោះវៀនធំ} \\rightarrow \\text{ទ្វារធំ}$$

## ២. មុខងារសំខាន់ៗ
- **មាត់៖** ទំពារបំបែកអាហារ និងអង់ស៊ីមអាមីឡាសក្នុងទឹកមាត់រំលាយជាតិម្សៅ
- **ក្រពះ៖** បញ្ចេញអាស៊ីត $HCl$ និងអង់ស៊ីមប៉ិបស៊ីនរំលាយប្រូតេអ៊ីន
- **ពោះវៀនតូច៖** កន្លែងបញ្ចប់ការរំលាយអាហារ និង **ស្រូបយកសារធាតុចិញ្ចឹម** ចូលក្នុងចរន្តឈាមតាមបណ្តោយរោមពោះវៀន`,
    body_en: `## Digestive System
Food breaks down mechanically and chemically. The small intestine completes digestion and absorbs nutrients into blood.`,
  },
  {
    id: "les-g8-bio-02",
    grade: 8,
    sort_order: 2,
    title_km: "ប្រព័ន្ធរបត់ឈាម និងបេះដូង",
    title_en: "Human Circulatory System & Cardiac Pumping",
    summary_km: "រចនាសម្ព័ន្ធបេះដូងថតទាំង ៤ សរសៃឈាមអាទែ វ៉ែន និងគោលិកាក្រហមដឹកនាំ O₂",
    summary_en: "4 heart chambers (atria, ventricles), arteries, veins, capillaries, red blood cells and hemoglobin",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g8-bio-02" },
    body_km: `## ១. បេះដូងមនុស្ស (Human Heart)
បេះដូងមាន ៤ ថត៖
- **ថតលើស្តាំ និងថតលើឆ្វេង (Atria)៖** ទទួលឈាម
- **ថតក្រោមក្តៅ និងថតក្រោមឆ្វេង (Ventricles)៖** ច្របាច់បញ្ជូនឈាម (ថតក្រោមឆ្វេងមានសាច់ដុំក្រាស់ជាងគេ ព្រោះត្រូវបាញ់ឈាមទៅទូទាំងរាងកាយ)

## ២. សរសៃឈាម និងសមាសភាគឈាម
- **អាទែ (Arteries)៖** នាំឈាមសម្បូរ $O_2$ ចេញពីបេះដូង
- **វ៉ែន (Veins)៖** នាំឈាមសម្បូរ $CO_2$ ត្រឡប់មកបេះដូងវិញ
- **គោលិកាឈាមក្រហម៖** ផ្ទុកអេម៉ូក្លូប៊ីន ដឹកនាំអុកស៊ីសែន`,
    body_en: `## Circulatory System
4-chambered heart pumps oxygenated blood via arteries and returns deoxygenated blood via veins.`,
  },
  {
    id: "les-g8-bio-03",
    grade: 8,
    sort_order: 3,
    title_km: "ប្រព័ន្ធដង្ហើម និងការផ្លាស់ប្តូរឧស្ម័ន",
    title_en: "Human Respiratory Mechanics",
    summary_km: "សួត ទងសួត ថង់ខ្យល់អាល់វេអូល និងការផ្លាស់ប្តូរឧស្ម័ន O₂ និង CO₂ ជាមួយឈាម",
    summary_en: "Trachea, bronchi, alveoli capillary diffusion, diaphragm movement, and oxygen-CO2 exchange",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g8-bio-03" },
    body_km: `## ១. ការផ្លាស់ប្តូរឧស្ម័ននៅថង់ខ្យល់សួត (Alveoli)
សួតរបស់មនុស្សមានថង់ខ្យល់តូចៗរាប់រយលាន៖
- អុកស៊ីសែន ($O_2$) ជ្រាបពីថង់ខ្យល់ចូលទៅក្នុងសរសៃឈាមប្តូរ
- ឧស្ម័នកាបូនិក ($CO_2$) ជ្រាបពីឈាមចូលមកក្នុងថង់ខ្យល់សួត ដើម្បីដកដង្ហើមបញ្ចេញមកក្រៅ`,
    body_en: `## Respiratory System
Gas exchange occurs across alveolar membranes: $O_2$ diffuses into blood capillaries; $CO_2$ diffuses out.`,
  },
  {
    id: "les-g8-bio-04",
    grade: 8,
    sort_order: 4,
    title_km: "ប្រព័ន្ធបញ្ចេញចោល និងតម្រងនោម",
    title_en: "Excretory System & Renal Nephron Filtration",
    summary_km: "មុខងារតម្រងនោម ច្រោះឈាម បញ្ចេញអ៊ុយរ៉េ និងការថែរក្សាលំនឹងទឹកក្នុងសារពាង្គកាយ",
    summary_en: "Nephron blood filtration, urea waste excretion, urine formation, and homeostasis osmoregulation",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g8-bio-04" },
    body_km: `## ១. តម្រងនោម (Kidneys)
មនុស្សមានតម្រងនោមមួយគូ រាងដូចគ្រាប់សណ្តែកក្រហម មានមុខងារ៖
- ច្រោះជាតិពុល និងអ៊ុយរ៉េចេញពីឈាម
- រក្សាលំនឹងទឹក និងជាតិអំបិលក្នុងសារពាង្គកាយ (Homeostasis)
- បង្កើតទឹកនោមបញ្ជូនទៅកាន់ប្លោកនោម`,
    body_en: `## Excretory System
Kidneys filter urea and metabolic wastes from blood to regulate fluid balance and form urine.`,
  },
  {
    id: "les-g8-bio-05",
    grade: 8,
    sort_order: 5,
    title_km: "ការបន្តពូជរបស់រុក្ខជាតិ និងសត្វ",
    title_en: "Reproduction in Plants and Animals",
    summary_km: "ការបន្តពូជដោយភេទ និងឥតភេទ លំអងផ្កា ការបង្កកំណើត និងការលូតលាស់នៃអំប្រ៊ីយ៉ុង",
    summary_en: "Sexual vs asexual reproduction, flower pollination, gamete fertilization, and embryonic stages",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g8-bio-05" },
    body_km: `## ១. ការបន្តពូជឥតភេទ (Asexual)
មិនត្រូវការមេជីវិតឈ្មោល និងញីទេ (កូនបង្កើតមកដូចមេបេះបិទ) ដូចជា ការបំបែកកោសិកា ការលូតមែក ផ្សាំ ឫសដំឡូង។

## ២. ការបន្តពូជដោយភេទ (Sexual)
ត្រូវការការបង្កកំណើតរវាង **ស្ពែម៉ាតូសូអ៊ីត ($n$)** និង **អូវុល ($n$)** បង្កើតបានជា **ស៊ីហ្គោត ($2n$)** ដែលមានលក្ខណៈចម្រុះពីមេបាទាំងពីរ។`,
    body_en: `## Reproduction
Asexual produces identical clones. Sexual involves fertilization of sperm and egg, ensuring genetic diversity.`,
  },

  // ============================================================================
  // GRADE 8 — EARTH SCIENCE (ផែនដីវិទ្យា)
  // ============================================================================
  {
    id: "les-g8-earth-01",
    grade: 8,
    sort_order: 1,
    title_km: "ផ្លាកតិចតូនិច និងចលនាទ្វីប",
    title_en: "Plate Tectonics & Continental Drift",
    summary_km: "ទ្រឹស្តី Alfred Wegener បន្ទះសំបកផែនដី រលកវិលវល់កម្តៅក្នុងអាវផែនដី",
    summary_en: "Wegener's continental drift, mantle thermal convection driving lithospheric tectonic plates",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g8-earth-01" },
    body_km: `## ១. ទ្រឹស្តីរសាត់ទ្វីប (Continental Drift)
នៅអតីតកាលរាប់រយលានឆ្នាំមុន ទ្វីបទាំងអស់ធ្លាប់ភ្ជាប់គ្នាជាមហាទ្វីបតែមួយ ហៅថា **ផង់ស៊ា (Pangaea)**។

## ២. ចលនានៃផ្លាកតិចតូនិច
សំបកផែនដីបែកជាបន្ទះធំៗ (Tectonic Plates) ដែលអណ្តែតលើអាវផែនដី ដោយសារ **ចរន្តវិលវល់កម្តៅ (Convection Currents)**៖
- បន្ទះរំកិលចេញពីគ្នា (Divergent) ៖ បង្កើតជួរភ្នំក្រោមសមុទ្រ
- បន្ទះរំកិលបុកគ្នា (Convergent) ៖ បង្កើតជួរភ្នំខ្ពស់ៗ (ដូចជាភ្នំហិម៉ាឡៃ)
- បន្ទះរអិលកកិតគ្នា (Transform) ៖ បង្កឱ្យមានការរញ្ជួយដីខ្លាំង`,
    body_en: `## Plate Tectonics
Convection currents in mantle drive tectonic plates: convergent boundaries push up mountains; divergent create rifts.`,
  },
  {
    id: "les-g8-earth-02",
    grade: 8,
    sort_order: 2,
    title_km: "បន្ទុះភ្នំភ្លើង និងការរញ្ជួយដី",
    title_en: "Volcanoes, Seismic Waves & Richter Scale",
    summary_km: "ចំណុចកណ្តាលរញ្ជួយដី អេពីសង់ រលកភូមិរញ្ជួយ P និង S និងខ្សែក្រវាត់ភ្លើងប៉ាស៊ីហ្វិក",
    summary_en: "Seismic epicenters, P and S body waves, Richter magnitude scale, and Pacific Ring of Fire",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g8-earth-02" },
    body_km: `## ១. ការរញ្ជួយដី (Earthquakes)
កើតឡើងនៅពេលថាមពលសំពាធក្នុងថ្មរំដោះភ្លាមៗតាមបណ្តោយស្នាមប្រេះ (Faults)៖
- **ហ្វូយេ (Focus) ៖** ចំណុចចាប់ផ្តើមរញ្ជួយដីក្នុងដី
- **អេពីសង់ (Epicenter) ៖** ចំណុចលើផ្ទៃដីចំពីលើហ្វូយេ (រងគ្រោះធ្ងន់ជាងគេ)
- វាស់កម្លាំងរញ្ជួយដីតាម **មាត្រដ្ឋានរិចទ័រ (Richter Scale)**`,
    body_en: `## Seismology
Earthquakes release elastic strain energy from faults measured on the Richter scale. Epicenter is surface point directly above focus.`,
  },
  {
    id: "les-g8-earth-03",
    grade: 8,
    sort_order: 3,
    title_km: "ការសឹករិចរិល និងកំណកកម្ទេចថ្ម",
    title_en: "Weathering, Erosion & Deposition",
    summary_km: "ការបំបែកដោយអាកាសធាតុ ទឹកភ្លៀង ខ្យល់ និងការបង្កើតដីល្បាប់មានជីជាតិនៅកម្ពុជា",
    summary_en: "Mechanical vs chemical weathering, fluvial sediment transport, and Mekong delta alluvial plains",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g8-earth-03" },
    body_km: `## ១. ការសឹករិចរិល (Weathering & Erosion)
- **ការបំបែកដោយរូបវិទ្យា៖** ទឹកកកកក ឫសឈើចោះថ្ម
- **ការបំបែកដោយគីមី៖** ទឹកភ្លៀងអាស៊ីតរំលាយថ្មកំបោរ (បង្កើតជារូងភ្នំ karst)
- **ដីល្បាប់ទន្លេមេគង្គ៖** ទឹកជំនន់ប្រចាំឆ្នាំនាំដីល្បាប់ពណ៌ត្នោតសម្បូរជីវជាតិមកចាក់ស្រោចវាលស្រែកម្ពុជា`,
    body_en: `## Weathering & Erosion
Physical and chemical breakdown of bedrock. Mekong floodwaters deposit nutrient-rich alluvium across Cambodian basins.`,
  },
  {
    id: "les-g8-earth-04",
    grade: 8,
    sort_order: 4,
    title_km: "មហាសមុទ្រ និងជំនោរទឹកសមុទ្រ",
    title_en: "Oceanography, Salinity & Gravitational Tides",
    summary_km: "កំហាប់អំបិលសមុទ្រ ៣៥ ភាគពាន់ ឥទ្ធិពលទំនាញព្រះចន្ទ និងព្រះអាទិត្យលើជំនោរនាច",
    summary_en: "Ocean salinity 35 ppt, thermohaline dynamics, and lunar/solar gravitational tidal bulges",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g8-earth-04" },
    body_km: `## ១. ទឹកសមុទ្រ
ទឹកសមុទ្រគ្របដណ្តប់ $71\\%$ នៃផ្ទៃផែនដី មានកំហាប់អំបិលជាមធ្យម $3.5\\%$ ($35\\text{ g/L}$) ដែលភាគច្រើនជាអំបិល $NaCl$។

## ២. ជំនោរ និងនាច (Tides)
កើតឡើងដោយសារ **កម្លាំងទំនាញទំនាញរបស់ព្រះចន្ទ** និងព្រះអាទិត្យទាញទឹកសមុទ្រ។ រៀងរាល់ថ្ងៃមានជំនោរឡើង ២ ដង និងនាចស្រក ២ ដង។`,
    body_en: `## Oceans & Tides
Lunar gravitational pull drives ocean tides twice daily. Mean ocean salinity is 35 parts per thousand.`,
  },
  {
    id: "les-g8-earth-05",
    grade: 8,
    sort_order: 5,
    title_km: "ឥទ្ធិពលផ្ទះកញ្ចក់ និងការប្រែប្រួលអាកាសធាតុ",
    title_en: "Greenhouse Effect & Climate Dynamics",
    summary_km: "ឧស្ម័ន CO₂, CH₄ ទប់កម្តៅព្រះអាទិត្យ កម្តៅផែនដីកើនឡើង និងផលប៉ះពាល់លើកម្ពុជា",
    summary_en: "Atmospheric thermal trapping via CO2 and CH4, global warming trends, and climate risks for Cambodia",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g8-earth-05" },
    body_km: `## ១. ឥទ្ធិពលផ្ទះកញ្ចក់ធម្មជាតិ (Natural Greenhouse Effect)
ឧស្ម័នផ្ទះកញ្ចក់ ($CO_2, CH_4, H_2O$) ស្រូបកម្តៅកាំរស្មីអាំងហ្វ្រារ៉េដពីដី ជួយឱ្យផែនដីមានសីតុណ្ហភាពមធ្យម $+15^\\circ\\text{C}$ ដែលទ្រទ្រង់ជីវិតបាន។

## ២. កម្តៅសកលកើនឡើង (Global Warming)
ការដុតប្រេង ធ្យូងថ្ម និងការកាប់បំផ្លាញព្រៃឈើ បង្កើន $CO_2$ ហួសប្រមាណ នាំឱ្យ៖
- ទឹកកកប៉ូលរលាយ កម្ពស់ទឹកសមុទ្រឡើង
- គ្រោះរាំងស្ងួត និងទឹកជំនន់ធ្ងន់ធ្ងរនៅតំបន់ដីសណ្តទន្លេមេគង្គ`,
    body_en: `## Greenhouse Effect
Greenhouse gases trap infrared radiation. Excessive anthropogenic $CO_2$ causes global warming and severe weather anomalies.`,
  },
];
