import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_9_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 9 — MATHEMATICS (គណិតវិទ្យា — ត្រៀមប្រឡងឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-math-01",
    grade: 9,
    sort_order: 1,
    title_km: "ប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអញ្ញាត (ត្រៀមឌីប្លូម)",
    title_en: "Systems of Linear Equations (Diploma Exam)",
    summary_km: "វិធីជំនួស វិធីបូកបំបាត់ និងវិធីក្រាហ្វិកក្នុងការរកគូកូអរដោនេ (x, y)",
    summary_en: "Solving 2x2 linear systems using substitution, linear combination elimination, and graphing",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-01" },
    body_km: `## ១. ទម្រង់ទូទៅនៃប្រព័ន្ធសមីការ
$$\\begin{cases} ax + by = c \\\\ a'x + b'y = c' \\end{cases}$$

## ២. វិធីបូកបំបាត់ (Elimination Method)
គុណសមីការនឹងមេគុណសមស្រប ដើម្បីឱ្យមេគុណនៃអញ្ញាតមួយដូចគ្នា ឬផ្ទុយគ្នា រួចធ្វើប្រមាណវិធីបូក ឬដក៖

> **ឧទាហរណ៍៖**
> $$\\begin{cases} 2x + y = 7 \\quad (1) \\\\ x - y = 2 \\quad (2) \\end{cases}$$
> បូកសមីការ $(1) + (2)$៖
> $$(2x + x) + (y - y) = 7 + 2 \\implies 3x = 9 \\implies x = 3$$
> ជំនួស $x = 3$ ចូលក្នុង $(2)$៖
> $$3 - y = 2 \\implies y = 1$$
> ដូចនេះ គូដំណោះស្រាយគឺ $(x, y) = (3, 1)$។`,
    body_en: `## Systems of Linear Equations
Solve via substitution or elimination to find intersection coordinate $(x, y)$.`,
  },
  {
    id: "les-g9-math-02",
    grade: 9,
    sort_order: 2,
    title_km: "សមីការដឺក្រេទី២ និងរូបមន្តឌីសគ្រីមីណង់ Δ (ត្រៀមឌីប្លូម)",
    title_en: "Quadratic Equations & Discriminant Δ",
    summary_km: "ការគណនា Δ = b² - 4ac ការវិភាគចំនួនឬស និងរូបមន្តឬស x = (-b ± √Δ) / 2a",
    summary_en: "Discriminant formula Δ = b² - 4ac, root count analysis, and quadratic roots x = (-b ± √Δ) / 2a",
    xp_reward: 40,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-02" },
    body_km: `## ១. សមីការដឺក្រេទី២ ទម្រង់ទូទៅ
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

## ២. រូបមន្តឌីសគ្រីមីណង់ (Discriminant $\\Delta$)
$$\\Delta = b^2 - 4ac$$

## ៣. ការវិភាគឬសតាមសញ្ញា $\\Delta$
1. **បើ $\\Delta > 0$ ៖** សមីការមាន **ឬសពីរជាចំនួនពិតផ្សេងគ្នា**៖
   $$x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$$
2. **បើ $\\Delta = 0$ ៖** សមីការមាន **ឬសឌុបតែមួយ**៖
   $$x_1 = x_2 = -\\frac{b}{2a}$$
3. **បើ $\\Delta < 0$ ៖** សមីការ **គ្មានឬសក្នុងសំណុំចំនួនពិត $\\mathbb{R}$ ឡើយ**`,
    body_en: `## Quadratic Formula
$\\Delta = b^2 - 4ac$. If $\\Delta > 0$, two distinct real roots exist: $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. If $\\Delta = 0$, one double root.`,
  },
  {
    id: "les-g9-math-03",
    grade: 9,
    sort_order: 3,
    title_km: "ត្រីកោណដូចគ្នា និងទ្រឹស្តីបទតាលែស",
    title_en: "Similar Triangles & Thales' Theorem",
    summary_km: "លក្ខខណ្ឌត្រីកោណដូចគ្នា មុំ-មុំ ផលធៀបសមាមាត្រ និងទ្រឹស្តីបទតាលែសក្នុងត្រីកោណ",
    summary_en: "Angle-Angle similarity criteria, proportional side segments, and Thales' theorem",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-03" },
    body_km: `## ១. ទ្រឹស្តីបទតាលែស (Thales' Theorem)
បើបន្ទាត់មួយស្របនឹងជ្រុងមួយនៃត្រីកោណ ហើយកាត់ជ្រុងពីរទៀត នោះវានឹងចែកជ្រុងទាំងពីរជាកំណាត់សមាមាត្រគ្នា៖
$$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$$

## ២. ករណីត្រីកោណដូចគ្នា
ត្រីកោណពីរដូចគ្នា ប្រសិនបើ៖
- មុំពីររៀងគ្នាស្មើគ្នា (ករណី ម.ម)
- ជ្រុងទាំងបីសមាមាត្ររៀងគ្នា (ករណី ជ.ជ.ជ)`,
    body_en: `## Similar Triangles
Thales' theorem ensures parallel lines create proportional segments: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.`,
  },
  {
    id: "les-g9-math-04",
    grade: 9,
    sort_order: 4,
    title_km: "ផលធៀបត្រីកោណមាត្រ sin, cos, tan",
    title_en: "Right-Triangle Trigonometric Ratios",
    summary_km: "និយមន័យ ស៊ីនុស កូស៊ីនុស តង់សង់ ក្នុងត្រីកោណកែង និងរូបមន្តគ្រឹះ sin²θ + cos²θ = 1",
    summary_en: "Definitions of sine (opposite/hypotenuse), cosine (adjacent/hypotenuse), tangent, and sin²θ + cos²θ = 1",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-04" },
    body_km: `## ១. ផលធៀបត្រីកោណមាត្រក្នុងត្រីកោណកែង
- **ស៊ីនុស (Sine)៖**
  $$\\sin \\theta = \\frac{\\text{ជ្រុងឈម}}{\\text{អ៊ីប៉ូតេនុស}}$$
- **កូស៊ីនុស (Cosine)៖**
  $$\\cos \\theta = \\frac{\\text{ជ្រុងជាប់}}{\\text{អ៊ីប៉ូតេនុស}}$$
- **តង់សង់ (Tangent)៖**
  $$\\tan \\theta = \\frac{\\text{ជ្រុងឈម}}{\\text{ជ្រុងជាប់}} = \\frac{\\sin \\theta}{\\cos \\theta}$$

## ២. រូបមន្តគ្រឹះ
$$\\sin^2 \\theta + \\cos^2 \\theta = 1$$`,
    body_en: `## Trigonometric Ratios
$\\sin = \\text{Opp}/\\text{Hyp}$, $\\cos = \\text{Adj}/\\text{Hyp}$, $\\tan = \\text{Opp}/\\text{Adj}$. Identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.`,
  },
  {
    id: "les-g9-math-05",
    grade: 9,
    sort_order: 5,
    title_km: "រង្វង់ ៖ មុំផ្ចិត មុំចារឹកក្នុងរង្វង់ និងបន្ទាត់ប៉ះ",
    title_en: "Circles, Inscribed Angles & Tangents",
    summary_km: "ទំនាក់ទំនងរវាងមុំចារឹកក្នុងរង្វង់ និងមុំផ្ចិតស្ទាក់ធ្នូតែមួយ α = 1/2 θ",
    summary_en: "Inscribed angle theorem (inscribed angle is half the central angle), tangent perpendicularity",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-05" },
    body_km: `## ១. មុំចារឹកក្នុងរង្វង់ និងមុំផ្ចិត
រង្វាស់នៃមុំចារឹកក្នុងរង្វង់ ស្មើនឹងពាក់កណ្តាលនៃរង្វាស់មុំផ្ចិតដែលស្ទាក់ធ្នូជាមួយគ្នា៖
$$\\angle \\text{inscribed} = \\frac{1}{2} \\angle \\text{central}$$

> **លក្ខណៈពិសេស៖** មុំចារឹកក្នុងកន្លះរង្វង់ តែងតែជា **មុំកែង ($90^\\circ$)** ជានិច្ច!

## ២. បន្ទាត់ប៉ះរង្វង់ (Tangent)
បន្ទាត់ប៉ះរង្វង់កែងនឹងកាំរង្វង់ត្រង់ចំណុចប៉ះជានិច្ច។`,
    body_en: `## Circles
An inscribed angle intercepting an arc equals half the central angle. An angle inscribed in a semicircle is always $90^\\circ$.`,
  },
  {
    id: "les-g9-math-06",
    grade: 9,
    sort_order: 6,
    title_km: "ទំនាក់ទំនងវីយែត ផលបូក និងផលគុណឫសនៃសមីការដឺក្រេទី២",
    title_en: "Viète's Formulas & Factoring (Diploma)",
    summary_km: "ផលបូកឫស S = x₁ + x₂ = -b/a និងផលគុណឫស P = x₁ · x₂ = c/a ក្នុងការបង្កើតសមីការ X² - SX + P = 0",
    summary_en: "Viète's relations S = -b/a and P = c/a, finding mental roots, and reconstructing quadratic equations X² - SX + P = 0",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-06" },
    body_km: `## ១. រូបមន្តទំនាក់ទំនងវីយែត (Viète's Relations)
ចំពោះសមីការដឺក្រេទី២ $ax^2 + bx + c = 0$ ($a \\neq 0$) ដែលមានឫសពីរ $x_1, x_2$ (កាលណា $\\Delta \\ge 0$)៖
- **ផលបូកឫស (Sum of Roots)៖**
  $$S = x_1 + x_2 = -\\frac{b}{a}$$
- **ផលគុណឫស (Product of Roots)៖**
  $$P = x_1 \\cdot x_2 = \\frac{c}{a}$$

## ២. ការបង្កើតសមីការដឺក្រេទី២
បើគេស្គាល់ពីរចំនួនដែលមានផលបូក $S$ និងផលគុណ $P$ នោះចំនួនទាំងពីរគឺជាឫសនៃសមីការ៖
$$X^2 - SX + P = 0$$

## ៣. ករណីពិសេសគណនាឫសរហ័ស
- បើ $a + b + c = 0$ នោះសមីការមានឫស $x_1 = 1, \\quad x_2 = \\frac{c}{a}$
- បើ $a - b + c = 0$ នោះសមីការមានឫស $x_1 = -1, \\quad x_2 = -\\frac{c}{a}$`,
    body_en: `## Viète's Formulas
For $ax^2 + bx + c = 0$, the sum of roots is $S = -b/a$ and product is $P = c/a$. Reconstruct the quadratic via $X^2 - SX + P = 0$.`,
  },
  {
    id: "les-g9-math-07",
    grade: 9,
    sort_order: 7,
    title_km: "ចំណោទសមីការដឺក្រេទី២ ត្រៀមប្រឡងឌីប្លូម",
    title_en: "Applied Quadratic Word Problems (Brevet)",
    summary_km: "វិធីសាស្ត្រដោះស្រាយចំណោទធរណីមាត្រ ក្រឡាផ្ទៃ និងបញ្ហាល្បឿនដែលបង្កើតបានជាសមីការដឺក្រេទី២",
    summary_en: "Word problem modeling leading to quadratic forms: rectangle dimensions, speed-distance-time, and integer sequences",
    xp_reward: 40,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-07" },
    body_km: `## ១. ជំហានដោះស្រាយចំណោទដឺក្រេទី២
១. **ជ្រើសរើសអញ្ញាត៖** តាង $x$ ជាប្រវែង ឬបរិមាណមិនទាន់ស្គាល់ ($x > 0$)
២. **បង្កើតសមីការ៖** បកប្រែព័ត៌មានទៅជាសមីការដឺក្រេទី២ $ax^2 + bx + c = 0$
៣. **ដោះស្រាយរកឫស៖** គណនា $\\Delta = b^2 - 4ac$ រួចរក $x$
៤. **ជ្រើសរើសឫសសមស្រប៖** ច្រានចោលឫសអវិជ្ជមាន ឬមិនសមស្របនឹងលក្ខខណ្ឌជាក់ស្តែង។

> **ចំណោទគំរូឌីប្លូម៖** ចតុកោណកែងមួយមានបណ្តោយវែងជាងទទឹង $3\\text{ m}$ និងមានក្រឡាផ្ទៃ $54\\text{ m}^2$។ រកវិមាត្រនៃចតុកោណកែង។
> - តាងទទឹងដោយ $x$ ($x > 0$) នោះបណ្តោយគឺ $x + 3$
> - សមីការក្រឡាផ្ទៃ៖ $x(x + 3) = 54 \\iff x^2 + 3x - 54 = 0$
> - ផលបូក $S = -3$, ផលគុណ $P = -54 \\implies x_1 = 6, \\quad x_2 = -9$ (មិនយក)
> - ដូចនេះ ទទឹងគឺ $6\\text{ m}$ និងបណ្តោយគឺ $9\\text{ m}$។`,
    body_en: `## Solving Quadratic Word Problems
Assign positive variable $x$, formulate the area/distance equation, evaluate via discriminant, and discard physically impossible negative roots.`,
  },
  {
    id: "les-g9-math-08",
    grade: 9,
    sort_order: 8,
    title_km: "អនុគមន៍លីនេអ៊ែរ និងក្រាហ្វិក y = ax + b",
    title_en: "Linear Functions, Slopes & Coordinate Graphs",
    summary_km: "មេគុណប្រាប់ទិស a (Slope), កូអរដោនេដើម b, បន្ទាត់ស្របគ្នា និងបន្ទាត់កាត់កែងក្នុងប្លង់កូអរដោនេ",
    summary_en: "Slope $a$, $y$-intercept $b$, parallel slopes $a = a'$, and perpendicular slopes $a \\cdot a' = -1$",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-08" },
    body_km: `## ១. សមីការបន្ទាត់ទម្រង់ទូទៅ
$$y = ax + b$$
- $a$ ៖ **មេគុណប្រាប់ទិស (Slope)** បញ្ជាក់ពីកម្រិតជម្រាលនៃបន្ទាត់
  $$a = \\frac{y_2 - y_1}{x_2 - x_1}$$
- $b$ ៖ **អរដោនេដើម ($y$-intercept)** ជាចំណុចដែលបន្ទាត់កាត់អ័ក្ស $(y'Oy)$ ត្រង់ $(0, b)$

## ២. ទីតាំងធៀបនៃបន្ទាត់ពីរ
ចំពោះបន្ទាត់ $(d_1): y = a_1x + b_1$ និង $(d_2): y = a_2x + b_2$៖
- $(d_1) \\parallel (d_2) \\iff a_1 = a_2$ (មេគុណប្រាប់ទិសស្មើគ្នា)
- $(d_1) \\perp (d_2) \\iff a_1 \\cdot a_2 = -1$ (ផលគុណមេគុណប្រាប់ទិសស្មើ $-1$)`,
    body_en: `## Linear Functions & Lines
$y = ax + b$. Parallel lines share identical slopes: $a_1 = a_2$. Perpendicular lines satisfy $a_1 \\cdot a_2 = -1$.`,
  },
  {
    id: "les-g9-math-09",
    grade: 9,
    sort_order: 9,
    title_km: "ចតុកោណចារឹកក្នុងរង្វង់ និងមុំផ្គុំដោយបន្ទាត់ប៉ះ",
    title_en: "Cyclic Quadrilaterals & Tangent Angles",
    summary_km: "លក្ខណៈចតុកោណចារឹកក្នុងរង្វង់ មុំឈមបន្ថែមគ្នា ១៨០° និងមុំផ្គុំដោយបន្ទាត់ប៉ះនិងអង្កត់ធ្នូ",
    summary_en: "Opposite angle summation to 180° in cyclic quadrilaterals, tangent-chord angle theorems, and secant lines",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-09" },
    body_km: `## ១. ចតុកោណចារឹកក្នុងរង្វង់ (Cyclic Quadrilateral)
ចតុកោណមួយចារឹកក្នុងរង្វង់បាន លុះត្រាតែកំពូលទាំង ៤ របស់វាស្ថិតនៅលើរង្វង់តែមួយ។
- **ទ្រឹស្តីបទសំខាន់៖** ផលបូករង្វាស់មុំឈមទាំងពីរនៃចតុកោណចារឹកក្នុងរង្វង់ តែងតែស្មើនឹង $180^\\circ$៖
  $$\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ$$

## ២. មុំផ្គុំដោយបន្ទាត់ប៉ះ និងអង្កត់ធ្នូ
រង្វាស់មុំផ្គុំដោយបន្ទាត់ប៉ះ និងអង្កត់ធ្នូនៃរង្វង់មួយ ស្មើនឹងពាក់កណ្តាលនៃរង្វាស់ធ្នូដែលស្ទាក់ដោយអង្កត់ធ្នូនោះ៖
$$\\alpha = \\frac{1}{2} \\text{ធ្នូស្ទាក់}$$`,
    body_en: `## Cyclic Quadrilaterals
Opposite angles in any cyclic quadrilateral are supplementary: $\\angle A + \\angle C = 180^\\circ$.`,
  },
  {
    id: "les-g9-math-10",
    grade: 9,
    sort_order: 10,
    title_km: "ស្ថិតិអនុវត្ត និងប្រូបាប៊ីលីតេបឋម (ត្រៀមឌីប្លូម)",
    title_en: "Applied Statistics & Basic Probability (Brevet)",
    summary_km: "មធ្យមនព្វន្ត មេដ្យាន ម៉ូត និងការគណនាប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍ P(A) = n(A) / n(S)",
    summary_en: "Arithmetic mean, median, mode, and classic Laplace probability calculation P(A) = favorable / total",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-10" },
    body_km: `## ១. ប៉ារ៉ាម៉ែត្រស្ថិតិ
- **មធ្យមនព្វន្ត (Mean $\\bar{x}$)៖** $\\bar{x} = \\frac{\\sum f_i x_i}{N}$ (ផលបូកតម្លៃទាំងអស់ចែកនឹងចំនួនសរុប)
- **មេដ្យាន (Median)៖** តម្លៃទិន្នន័យដែលស្ថិតនៅចំកណ្តាលគេក្រោយពេលតម្រៀបតាមលំដាប់កើន
- **ម៉ូត (Mode)៖** តម្លៃទិន្នន័យណាដែលមានប្រេកង់ (ចំនួនកើតឡើង) ច្រើនជាងគេ

## ២. ប្រូបាប៊ីលីតេបឋម (Probability)
ប្រូបាបនៃព្រឹត្តិការណ៍ $A$ មួយ គឺ៖
$$P(A) = \\frac{\\text{ចំនួនករណីស្រប}}{\\text{ចំនួនករណីអាច (លំហសំណាក)}} = \\frac{n(A)}{n(S)}$$
- ជានិច្ចកាល៖ $0 \\le P(A) \\le 1$
- ព្រឹត្តិការណ៍មិនអាចកើតឡើង៖ $P = 0$; ព្រឹត្តិការណ៍ប្រាកដ៖ $P = 1$។`,
    body_en: `## Statistics and Basic Probability
Mean $\\bar{x} = \\sum f_i x_i / N$. Probability of event $A$ is $P(A) = n(A)/n(S)$, with $0 \\le P(A) \\le 1$.`,
  },

  // ============================================================================
  // GRADE 9 — PHYSICS (រូបវិទ្យា — ត្រៀមប្រឡងឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-phys-01",
    grade: 9,
    sort_order: 1,
    title_km: "ច្បាប់អូម និងសៀគ្វីអគ្គិសនី (U = R · I ត្រៀមឌីប្លូម)",
    title_en: "Ohm's Law & Circuit Analysis (Diploma Exam)",
    summary_km: "ទំនាក់ទំនង U = R · I ខ្នាតអូម (Ω) វ៉ុល (V) អំពែ (A) និងបន្ទាត់ចរិតលក្ខណៈ",
    summary_en: "Ohm's law U = R·I, resistance measurement in Ohms (Ω), Volts (V), Amperes (A), and I-V characteristics",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-01" },
    body_km: `## ១. ច្បាប់អូម (Ohm's Law)
តង់ស្យុងអគ្គិសនីសងខាងរេស៊ីស្ត័រមួយ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តដែលឆ្លងកាត់វា៖
$$U = R \\cdot I$$
- $U$ ៖ ផលសងប៉ូតង់ស្យែល ឬតង់ស្យុង (វ៉ុល $V$)
- $R$ ៖ រេស៊ីស្តង់អគ្គិសនី (អូម $\\Omega$)
- $I$ ៖ អាំងតង់ស៊ីតេចរន្ត (អំពែ $A$)

## ២. រូបមន្តទាញរក $I$ និង $R$
$$I = \\frac{U}{R}, \\quad R = \\frac{U}{I}$$`,
    body_en: `## Ohm's Law
$U = R \\cdot I$. Voltage equals resistance multiplied by electric current.`,
  },
  {
    id: "les-g9-phys-02",
    grade: 9,
    sort_order: 2,
    title_km: "ការតរេស៊ីស្ត័រជាស៊េរី និងជាខ្នែង",
    title_en: "Series & Parallel Resistor Networks",
    summary_km: "រេស៊ីស្តង់សមមូល R_eq = R₁ + R₂ (ស៊េរី) និង 1/R_eq = 1/R₁ + 1/R₂ (ខ្នែង)",
    summary_en: "Equivalent resistance formulas: series R_eq = R1 + R2 and parallel 1/R_eq = 1/R1 + 1/R2",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-02" },
    body_km: `## ១. ការតជាស៊េរី (Series)
ចរន្តឆ្លងកាត់ស្មើគ្នា ($I = I_1 = I_2$) តង់ស្យុងបូកបញ្ចូលគ្នា ($U = U_1 + U_2$)៖
$$R_{\\text{eq}} = R_1 + R_2 + ... + R_n$$

## ២. ការតជាខ្នែង (Parallel)
តង់ស្យុងស្មើគ្នា ($U = U_1 = U_2$) ចរន្តបូកបញ្ចូលគ្នា ($I = I_1 + I_2$)៖
$$\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$$
ចំពោះរេស៊ីស្ត័រពីរតជាខ្នែង៖
$$R_{\\text{eq}} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$`,
    body_en: `## Resistor Networks
Series: $R_{\\text{eq}} = R_1 + R_2$. Parallel: $R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2}$.`,
  },
  {
    id: "les-g9-phys-03",
    grade: 9,
    sort_order: 3,
    title_km: "ថាមពលអគ្គិសនី និងអានុភាព (P = U · I, W = P · t)",
    title_en: "Electrical Power & Energy Consumption",
    summary_km: "រូបមន្ត P = U · I ច្បាប់ស៊ូល W = R · I² · t និងការគណនាថ្លៃកុងទ័រភ្លើង (kWh)",
    summary_en: "Joule's heating law W = R·I²·t, electrical power P = U·I, and kilowatt-hour utility metering",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-03" },
    body_km: `## ១. អានុភាពអគ្គិសនី (Electric Power)
$$P = U \\cdot I = R \\cdot I^2 = \\frac{U^2}{R}$$
- $P$ ៖ អានុភាព (វ៉ាត់ $W$)

## ២. ថាមពលអគ្គិសនី (Electric Energy)
$$W = P \\cdot t = U \\cdot I \\cdot t = R \\cdot I^2 \\cdot t$$
- $W$ ៖ ថាមពល (ស៊ូល $J$ ឬ គីឡូវ៉ាត់ម៉ោង $kWh$)
- $1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J}$`,
    body_en: `## Electric Energy & Power
$P = U \\cdot I$. Energy $W = P \\cdot t = R I^2 t$. Electricity meters measure in kilowatt-hours ($kWh$).`,
  },
  {
    id: "les-g9-phys-04",
    grade: 9,
    sort_order: 4,
    title_km: "ដែនម៉ាញេទិច និងអេឡិចត្រូម៉ាញេទិច",
    title_en: "Magnetic Fields & Electromagnetism",
    summary_km: "ដែនម៉ាញេទិចនៃមេដែក ខ្សែដែន និងដែនម៉ាញេទិចបង្កើតដោយចរន្តអគ្គិសនី (សូលេណូអ៊ីត)",
    summary_en: "Magnetic field lines from North to South, Oersted's discovery, and solenoids with iron core",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-04" },
    body_km: `## ១. មេដែក និងខ្សែដែនម៉ាញេទិច
មេដែកមានប៉ូលពីរគឺ **ប៉ូលជើង ($N$)** និង **ប៉ូលត្បូង ($S$)**។ ខ្សែដែនម៉ាញេទិចតែងតែចេញពីប៉ូលជើង ចូលទៅប៉ូលត្បូង។

## ២. អេឡិចត្រូម៉ាញេទិច (Electromagnets)
នៅពេលចរន្តអគ្គិសនីឆ្លងកាត់ខ្សែលួសរុំជារង្វង់ (សូលេណូអ៊ីត) វាបង្កើតបានជាដែនម៉ាញេទិចដូចមេដែកធម្មជាតិ។ ការដាក់ស្នូលដែកទន់ខាងក្នុង ធ្វើឱ្យកម្លាំងទាញកើនឡើងរាប់ពាន់ដង (ប្រើក្នុងម៉ូទ័រ និងកណ្តឹងអគ្គិសនី)។`,
    body_en: `## Electromagnetism
Electric currents produce magnetic fields. Solenoids with soft iron cores form powerful electromagnets.`,
  },
  {
    id: "les-g9-phys-05",
    grade: 9,
    sort_order: 5,
    title_km: "ច្បាប់ឆ្លុះ និងងាកពន្លឺ",
    title_en: "Light Optics: Reflection & Refraction",
    summary_km: "ច្បាប់ដេកាត មុំឆ្លុះស្មើនឹងមុំធ្លាក់ i = r សន្ទស្សន៍ចំណាំងបែរ n₁ sin i₁ = n₂ sin i₂",
    summary_en: "Law of reflection i = r, Snell's law of refraction n1 sin i1 = n2 sin i2, and critical angle",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-05" },
    body_km: `## ១. ច្បាប់ឆ្លុះពន្លឺ (Reflection)
មុំឆ្លុះ ($r$) តែងតែស្មើនឹងមុំធ្លាក់ ($i$)៖
$$i = r$$

## ២. ច្បាប់ងាកពន្លឺ (ច្បាប់ដេកាត — Snell-Descartes Law)
នៅពេលពន្លឺឆ្លងកាត់ពីមជ្ឈដ្ឋានមួយទៅមជ្ឈដ្ឋានមួយទៀតដែលមានដង់ស៊ីតេអុបទិកខុសគ្នា កាំរស្មីនឹងងាកទិស៖
$$n_1 \\sin(i_1) = n_2 \\sin(i_2)$$`,
    body_en: `## Optics
Law of reflection: angle of incidence equals angle of reflection ($i = r$). Snell's law: $n_1 \\sin i_1 = n_2 \\sin i_2$.`,
  },

  // ============================================================================
  // GRADE 9 — CHEMISTRY (គីមីវិទ្យា — ត្រៀមប្រឡងឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-chem-01",
    grade: 9,
    sort_order: 1,
    title_km: "អាស៊ីត បាស និងកម្រិត pH ពី ០ ដល់ ១៤",
    title_en: "Acids, Bases & The pH Scale",
    summary_km: "អ៊ីយ៉ុង H⁺ និង OH⁻ មាត្រដ្ឋាន pH អព្យាក្រឹត្យ pH = 7 អាស៊ីត pH < 7 បាស pH > 7",
    summary_en: "Hydronium H+ and hydroxide OH- ions, pH = -log[H+], neutral water at 7, and universal indicators",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-01" },
    body_km: `## ១. មាត្រដ្ឋាន pH (pH Scale 0–14)
- **$0 \\leq \\text{pH} < 7$ ៖ សូលុយស្យុងអាស៊ីត** (សម្បូរអ៊ីយ៉ុង $H^+$)
- **$\\text{pH} = 7$ ៖ សូលុយស្យុងអព្យាក្រឹត** (ដូចជាទឹកសុទ្ធ)
- **$7 < \\text{pH} \\leq 14$ ៖ សូលុយស្យុងបាស** (សម្បូរអ៊ីយ៉ុង $OH^-$)

> **ចំណាំ៖** pH កាន់តែតូច អាស៊ីតកាន់តែខ្លាំង។ pH កាន់តែធំ បាសកាន់តែខ្លាំង!`,
    body_en: `## pH Scale
pH < 7 is acidic ($H^+$), pH = 7 is neutral, and pH > 7 is basic ($OH^-$). Logarithmic concentration scale.`,
  },
  {
    id: "les-g9-chem-02",
    grade: 9,
    sort_order: 2,
    title_km: "បរិមាណសារធាតុ ម៉ូល និងកំហាប់សូលុយស្យុង",
    title_en: "The Mole Concept & Molar Concentrations",
    summary_km: "ចំនួនអាវ៉ូហ្គាដ្រូ NA = 6.022 · 10²³ រូបមន្ត n = m / M, n = V / 22.4 និងកំហាប់ C = n / V",
    summary_en: "Avogadro's number 6.022x10²³, molar mass formulas n = m/M, gas molar volume 22.4 L, molarity C = n/V",
    xp_reward: 40,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-02" },
    body_km: `## ១. ម៉ូល (Mole) និងចំនួនអាវ៉ូហ្គាដ្រូ
១ ម៉ូល គឺជាបរិមាណសារធាតុដែលផ្ទុក $6.022 \\times 10^{23}$ ភាគល្អិត (អាតូម ឬម៉ូលេគុល)។

## ២. រូបមន្តគណនាម៉ូល
1. តាមម៉ាស៖
   $$n = \\frac{m}{M}$$
   ($m$ គិតជា $g$, $M$ គិតជា $g/mol$)
2. តាមមាឌឧស្ម័ននៅលក្ខខណ្ឌស្តង់ដារ (STP)៖
   $$n = \\frac{V}{22.4\\text{ L}}$$
3. កំហាប់ជាម៉ូល (Molarity $C$)៖
   $$C = \\frac{n}{V} \\quad (mol/L \\text{ ឬ } M)$$`,
    body_en: `## Mole Calculations
$n = m/M$, $n = V/22.4$ (at STP), and molar concentration $C = n/V$ ($mol/L$).`,
  },
  {
    id: "les-g9-chem-03",
    grade: 9,
    sort_order: 3,
    title_km: "លោហៈសកម្ម និងជួរប្រតិកម្មគីមី",
    title_en: "Metal Activity & Reactivity Series",
    summary_km: "ជួរសកម្មភាពលោហៈ K > Na > Ca > Mg > Al > Zn > Fe > H > Cu > Ag > Au",
    summary_en: "Electrochemical metal reactivity series, single displacement reactions with water and acids",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-03" },
    body_km: `## ១. ជួរសកម្មភាពលោហៈ (Reactivity Series)
$$\\text{K} > \\text{Na} > \\text{Ca} > \\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Fe} > \\text{Pb} > (\\text{H}) > \\text{Cu} > \\text{Ag} > \\text{Au}$$

## ២. ច្បាប់ប្រតិកម្មជំនួស
លោហៈណាដែលនៅខាងឆ្វេង (សកម្មជាង) អាចរុញលោហៈដែលនៅខាងស្តាំ (ខ្សោយជាង) ចេញពីសូលុយស្យុងអំបិលរបស់វាបាន៖
$$\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu} \\downarrow$$`,
    body_en: `## Reactivity Series
More reactive metals displace less reactive ones from salt solutions: $Fe + CuSO_4 \\rightarrow FeSO_4 + Cu$.`,
  },
  {
    id: "les-g9-chem-04",
    grade: 9,
    sort_order: 4,
    title_km: "អំបិល និងប្រតិកម្មបន្សាបអាស៊ីត-បាស",
    title_en: "Salts & Acid-Base Neutralization",
    summary_km: "ប្រតិកម្ម HCl + NaOH → NaCl + H₂O ការបង្កើតអំបិល និងការកកើតកករ",
    summary_en: "Classic neutralization acid + base → salt + water, precipitate formation rules",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-04" },
    body_km: `## ១. ប្រតិកម្មបន្សាប (Neutralization)
$$\\text{អាស៊ីត} + \\text{បាស} \\rightarrow \\text{អំបិល} + \\text{ទឹក}$$

> **ឧទាហរណ៍៖**
> $$\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$$
> អ៊ីយ៉ុង $H^+$ ពីអាស៊ីត បន្សាបជាមួយអ៊ីយ៉ុង $OH^-$ ពីបាស បង្កើតជាម៉ូលេគុលទឹក $H_2O$។`,
    body_en: `## Neutralization
$Acid + Base \\rightarrow Salt + Water$. $H^+ + OH^- \\rightarrow H_2O$.`,
  },
  {
    id: "les-g9-chem-05",
    grade: 9,
    sort_order: 5,
    title_km: "ប្រតិកម្មអុកស៊ីតកម្ម និងរេដុកកម្ម",
    title_en: "Oxidation & Reduction Fundamentals",
    summary_km: "ការបាត់បង់ និងការទទួលអេឡិចត្រុង ភ្នាក់ងារអុកស៊ីតករ និងភ្នាក់ងាររេដុករ",
    summary_en: "Electron transfer definitions (OIL RIG: Oxidation Is Loss, Reduction Is Gain of electrons)",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-05" },
    body_km: `## ១. និយមន័យអុកស៊ីត-រេដុក
- **អុកស៊ីតកម្ម (Oxidation)៖** គឺជាដំណើរការ **បាត់បង់អេឡិចត្រុង ($e^-$)**
- **រេដុកកម្ម (Reduction)៖** គឺជាដំណើរការ **ចាប់យកអេឡិចត្រុង ($e^-$)**

> **គន្លឹះចងចាំ៖**
> «អុកស៊ីតកម្ម **បាត់** — រេដុកកម្ម **ចាប់**»`,
    body_en: `## Redox
Oxidation is electron loss; Reduction is electron gain. They always occur simultaneously.`,
  },

  // ============================================================================
  // GRADE 9 — BIOLOGY (ជីវវិទ្យា — ត្រៀមប្រឡងឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-bio-01",
    grade: 9,
    sort_order: 1,
    title_km: "ប្រព័ន្ធប្រសាទ ណឺរ៉ូន និងខួរក្បាល",
    title_en: "Human Nervous System & Brain Anatomy",
    summary_km: "ណឺរ៉ូន ស៊ីណាប់ ចលនារេផ្លិច និងមជ្ឈមណ្ឌលបញ្ជាខួរក្បាល និងខួរឆ្អឹងខ្នង",
    summary_en: "Central nervous system, neuron axons and dendrites, neurotransmitter synapses, and reflex arcs",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-01" },
    body_km: `## ១. ណឺរ៉ូន (Neuron)
ណឺរ៉ូន គឺជាឯកតាមូលដ្ឋាននៃប្រព័ន្ធប្រសាទ ផ្សំឡើងពី៖
- តួកោសិកា (Cell Body)
- ដែនឌ្រីត (Dendrites ទទួលព័ត៌មាន)
- អាក់សូន (Axon បញ្ជូនព័ត៌មានទៅមុខ)

## ២. ចលនារេផ្លិច (Reflex Arc)
គឺជាចលនាឆ្លើយតបបន្ទាន់ដោយស្វ័យប្រវត្តិដោយមិនចាំបាច់ឆ្លងកាត់ការគិតរបស់ខួរក្បាល (ខួរឆ្អឹងខ្នងជាអ្នកបញ្ជាផ្ទាល់) ដូចជា ការដកដៃចេញភ្លាមៗពេលប៉ះរបស់ក្តៅ។`,
    body_en: `## Nervous System
Neurons transmit electrical action potentials across chemical synapses. Reflex arcs bypass brain thinking.`,
  },
  {
    id: "les-g9-bio-02",
    grade: 9,
    sort_order: 2,
    title_km: "ប្រព័ន្ធអង់ដូគ្រីន និងអ័រម៉ូន",
    title_en: "Endocrine System & Hormonal Balance",
    summary_km: "ក្រពេញអង់ដូគ្រីន អ៊ីប៉ូភីស ទីរ៉ូអ៊ីត អាំងស៊ុយលីន និងការគ្រប់គ្រងកម្រិតជាតិស្ករក្នុងឈាម",
    summary_en: "Pituitary master gland, thyroid, pancreas insulin and glucagon blood glucose regulation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-02" },
    body_km: `## ១. អ័រម៉ូន (Hormones)
អ័រម៉ូនជាសារធាតុគីមីបញ្ចេញដោយក្រពេញគ្មានបំពង់ (Endocrine Glands) ចូលក្នុងចរន្តឈាមដោយផ្ទាល់។

## ២. ការគ្រប់គ្រងជាតិស្ករដោយលំពែង
- **អាំងស៊ុយលីន (Insulin)៖** បញ្ចុះជាតិស្ករក្នុងឈាម (ពេលញ៉ាំបាយឆ្អែត)
- **គ្លូកាហ្គុង (Glucagon)៖** បង្កើនជាតិស្ករក្នុងឈាម (ពេលឃ្លាន)`,
    body_en: `## Endocrine System
Hormones are chemical messengers. The pancreas balances blood sugar via insulin (lowers glucose) and glucagon (raises glucose).`,
  },
  {
    id: "les-g9-bio-03",
    grade: 9,
    sort_order: 3,
    title_km: "សរីរាង្គវិញ្ញាណទាំង ៥",
    title_en: "The Five Sensory Organs",
    summary_km: "ភ្នែក (គំហើញ) ត្រចៀក (សោតវិញ្ញាណ) ច្រមុះ អណ្តាត និងស្បែក",
    summary_en: "Photoreceptors in retina, cochlear auditory hair cells, olfactory receptors, taste buds, and dermis",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-03" },
    body_km: `## ១. ភ្នែកមនុស្ស (Vision)
ពន្លឺឆ្លងកាត់កញ្ចក់ភ្នែក តាមប្រស្រីភ្នែក និងឡង់ទី ទៅផ្តុំរូបភាពបញ្ច្រាសលើ **រ៉េទីន (Retina)** ដែលផ្ទុកកោសិកាទទួលពន្លឺ រួចបញ្ជូនទៅខួរក្បាលតាមសរសៃប្រសាទអុបទិក។`,
    body_en: `## Sensory Organs
The eye focuses light onto retinal photoreceptors, transmitting impulses via the optic nerve to the visual cortex.`,
  },
  {
    id: "les-g9-bio-04",
    grade: 9,
    sort_order: 4,
    title_km: "ហ្សែន ក្រូម៉ូសូម និងការបញ្ជូនលក្ខណៈតំណពូជ",
    title_en: "Genetics, Chromosomes & Traits",
    summary_km: "ក្រូម៉ូសូមមនុស្ស ៤៦ ដើម (២៣ គូ) អាឡែល ហ្សែនត្រួត និងហ្សែនបន្ទាប់",
    summary_en: "Human 46 chromosomes (23 pairs), dominant vs recessive alleles, genotype and phenotype expressions",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-04" },
    body_km: `## ១. ក្រូម៉ូសូមមនុស្ស (Human Chromosomes)
កោសិកាមនុស្សធម្មតាមាន **៤៦ ក្រូម៉ូសូម (២៣ គូ)**៖
- គូទី ១ ដល់ ២២ ៖ ក្រូម៉ូសូមធម្មតា (Autosomes)
- គូទី ២៣ ៖ ក្រូម៉ូសូមភេទ ($XX$ ចំពោះស្រី, $XY$ ចំពោះប្រុស)

## ២. ហ្សែនត្រួត និងហ្សែនបន្ទាប់
- **ហ្សែនត្រួត (Dominant)៖** បង្ហាញលក្ខណៈរូបសូម្បីតែមានតែមួយ
- **ហ្សែនបន្ទាប់ (Recessive)៖** បង្ហាញលក្ខណៈរូបបាន លុះត្រាតែមានទាំងពីរដូចគ្នា`,
    body_en: `## Genetics
Humans have 46 chromosomes (23 pairs). Chromosome pair 23 determines sex ($XX$ female, $XY$ male).`,
  },
  {
    id: "les-g9-bio-05",
    grade: 9,
    sort_order: 5,
    title_km: "ប្រព័ន្ធការពាររាងកាយ និងជំងឺឆ្លង",
    title_en: "Immune Defenses & Infectious Diseases",
    summary_km: "របាំងស្បែក គោលិកាស leukocyte អង់ទីគ័រ និងគោលការណ៍នៃវ៉ាក់សាំង",
    summary_en: "Skin physical barrier, phagocytes, B-cell antibodies, pathogen antigens, and active vaccine immunity",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-05" },
    body_km: `## ១. របាំងការពាររាងកាយ
1. **របាំងទី១៖** ស្បែក និងទឹករំអិល
2. **របាំងទី២៖** គោលិកាឈាមស (ស៊ីមេរោគ)
3. **របាំងទី៣ (ភាពស៊ាំជាក់លាក់)៖** ផលិត **អង់ទីគ័រ (Antibodies)** ដើម្បីកម្ចាត់អង់ទីហ្សែនជាក់លាក់

## ២. វ៉ាក់សាំង (Vaccines)
វ៉ាក់សាំងផ្ទុកមេរោគដែលខ្សោយ ឬងាប់ ដើម្បីបង្រៀនប្រព័ន្ធការពាររាងកាយឱ្យបង្កើតអង់ទីគ័រទុកជាមុន។`,
    body_en: `## Immune System
White blood cells produce specific antibodies against pathogens. Vaccines train memory cells for future defense.`,
  },

  // ============================================================================
  // GRADE 9 — EARTH SCIENCE (ផែនដីវិទ្យា — ត្រៀមប្រឡងឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-earth-01",
    grade: 9,
    sort_order: 1,
    title_km: "បរិយាកាស និងស្រទាប់អូហ្សូន",
    title_en: "Earth's Atmosphere & The Ozone Shield",
    summary_km: "ស្រទាប់ត្រូប៉ូស្វ៊ែ ស្ត្រាតូស្វ៊ែ ស្រទាប់អូហ្សូន O₃ និងការទប់ស្កាត់កាំរស្មី UV",
    summary_en: "Troposphere, stratosphere, ozone layer (O3) shielding against mutagenic ultraviolet (UV) radiation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g9-earth-01" },
    body_km: `## ១. ស្រទាប់បរិយាកាស
1. **ត្រូប៉ូស្វ៊ែ (Troposphere 0–12 km)៖** កន្លែងកើតបាតុភូតអាកាសធាតុទាំងអស់ (ពពក ភ្លៀង ផ្គរ)
2. **ស្ត្រាតូស្វ៊ែ (Stratosphere 12–50 km)៖** ផ្ទុក **ស្រទាប់អូហ្សូន ($O_3$)** ដែលស្រូបយកកាំរស្មីយូវី ($UV$) ដ៏គ្រោះថ្នាក់ពីព្រះអាទិត្យ`,
    body_en: `## Atmosphere
Troposphere contains weather systems. Stratosphere houses the ozone layer ($O_3$) filtering harmful UV rays.`,
  },
  {
    id: "les-g9-earth-02",
    grade: 9,
    sort_order: 2,
    title_km: "ធនធានរ៉ែ ធ្យូងថ្ម និងប្រេងកាតនៅកម្ពុជា",
    title_en: "Cambodia's Mineral & Energy Resources",
    summary_km: "រ៉ែមាសនៅមណ្ឌលគិរី ប៉ៃលិន ថ្មកំបោរនៅកំពត និងប្រេងកាតប្លុក A ក្នុងឈូងសមុទ្រកម្ពុជា",
    summary_en: "Mondulkiri gold deposits, Kampot limestone for cement, and offshore Gulf of Thailand petroleum reserves",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g9-earth-02" },
    body_km: `## ១. ធនធានរ៉ែសំខាន់ៗនៅកម្ពុជា
- **រ៉ែមាស៖** នៅខេត្តមណ្ឌលគិរី ក្រចេះ និងត្បូងឃ្មុំ
- **ថ្មកំបោរ៖** នៅខេត្តកំពត និងបាត់ដំបង (សម្រាប់ផលិតស៊ីម៉ង់ត៍)
- **ត្បូងថ្មមានតម្លៃ៖** នៅខេត្តប៉ៃលិន និងរតនគិរី
- **ប្រេងកាត និងឧស្ម័នធម្មជាតិ៖** ក្នុងឈូងសមុទ្រកម្ពុជា`,
    body_en: `## Cambodia Resources
Limestone in Kampot supports national cement production; offshore basins hold oil and gas potential.`,
  },
  {
    id: "les-g9-earth-03",
    grade: 9,
    sort_order: 3,
    title_km: "បញ្ហាទឹកជំនន់ និងគ្រោះរាំងស្ងួតនៅកម្ពុជា",
    title_en: "Floods & Droughts Management in Cambodia",
    summary_km: "យន្តការទឹកជំនន់ទន្លេមេគង្គ ឥទ្ធិពលបឹងទន្លេសាប និងការគ្រប់គ្រងគ្រោះមហន្តរាយ",
    summary_en: "Mekong hydrological pulse, Tonle Sap buffer mechanism, drought prevention canals, and disaster management",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g9-earth-03" },
    body_km: `## ១. បឹងទន្លេសាបជាអាងស្តុកទឹកធម្មជាតិ
នៅរដូវវស្សា ទឹកទន្លេមេគង្គហូរច្រាសចូលបឹងទន្លេសាប ជួយកាត់បន្ថយទឹកជំនន់នៅតំបន់ដីសណ្តខាងក្រោម។ នៅរដូវប្រាំង ទឹកបឹងទន្លេសាបហូរត្រឡប់ចូលទន្លេមេគង្គវិញ ជួយកាត់បន្ថយគ្រោះរាំងស្ងួត។`,
    body_en: `## Tonle Sap Natural Buffer
During rainy monsoons, the Mekong reverses into Tonle Sap Lake, mitigating flooding and later feeding dry-season agriculture.`,
  },
  {
    id: "les-g9-earth-04",
    grade: 9,
    sort_order: 4,
    title_km: "ការគ្រប់គ្រងសំណល់រឹង និងការបំពុលបរិស្ថាន",
    title_en: "Solid Waste Management & Plastic Pollution",
    summary_km: "យុទ្ធនាការកាត់បន្ថយប្លាស្ទិក គោលការណ៍ 3R (Reduce, Reuse, Recycle) និងជីវចម្រុះ",
    summary_en: "Plastic breakdown hazards, microplastics, 3R circular economy, and community ecological stewardship",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g9-earth-04" },
    body_km: `## ១. គោលការណ៍ 3R
- **Reduce (កាត់បន្ថយ)៖** កាត់បន្ថយការប្រើប្រាស់ថង់ប្លាស្ទិកប្រើម្តងចោល
- **Reuse (ប្រើឡើងវិញ)៖** ប្រើប្រាស់ដបទឹក ឬប្រអប់ឡើងវិញ
- **Recycle (កែច្នៃ)៖** កែច្នៃសំណល់ដែក ក្រដាស កញ្ចក់ ទៅជាវត្ថុប្រើប្រាស់ថ្មី`,
    body_en: `## Waste Management
The 3R environmental framework: Reduce single-use plastics, Reuse sturdy containers, and Recycle recyclable scrap.`,
  },
  {
    id: "les-g9-earth-05",
    grade: 9,
    sort_order: 5,
    title_km: "ថាមពលព្រះអាទិត្យ និងតុល្យភាពថាមពលផែនដី",
    title_en: "Solar Radiation & Earth Energy Balance",
    summary_km: "ថាមពលពន្លឺព្រះអាទិត្យ អាល់បេដូ (Albedo) និងការស្រូប-បញ្ចេញថាមពលកម្តៅ",
    summary_en: "Incoming shortwave solar irradiance, terrestrial longwave re-radiation, planetary albedo, and energy balance",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g9-earth-05" },
    body_km: `## ១. តុល្យភាពថាមពលផែនដី
ថាមពលដែលផែនដីទទួលបានពីព្រះអាទិត្យ ត្រូវតែស្មើនឹងថាមពលដែលផែនដីបញ្ចេញត្រឡប់ទៅក្នុងលំហវិញ ដើម្បីរក្សាសីតុណ្ហភាពឱ្យនៅថេរ។
- ផ្ទៃព្រិល និងទឹកកកមាន **អាល់បេដូខ្ពស់** (ឆ្លុះពន្លឺបានរហូតដល់ $90\\%$)
- ផ្ទៃសមុទ្រមាន **អាល់បេដាទាប** (ស្រូបយកកម្តៅបានច្រើន)`,
    body_en: `## Earth Energy Balance
Equilibrium between incoming solar shortwave and outgoing infrared radiation keeps global mean temperatures stable.`,
  },

  // ============================================================================
  // ADDITIONAL OFFICIAL MOEYS NATIONAL CURRICULUM LESSONS (GRADE 9 BREVET)
  // ============================================================================

  {
    id: "les-g9-math-11",
    grade: 9,
    sort_order: 11,
    title_km: "សមីការដឺក្រេទី ២ ax² + bx + c = 0 និងឌីសគ្រីមីណង់ Δ",
    title_en: "Quadratic Equations ax² + bx + c = 0 & Discriminant Δ",
    summary_km: "រូបមន្តឌីសគ្រីមីណង់ Δ = b² - 4ac ការកំណត់ចំនួនឫស និងការដោះស្រាយសមីការប្រឡងឌីប្លូម",
    summary_en: "The discriminant formula Δ = b² - 4ac, root determination criteria, and quadratic problem solving for Grade 9 Brevet",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-11" },
    body_km: "## រូបមន្តដោះស្រាយសមីការដឺក្រេទី ២\n$$\\Delta = b^2 - 4ac$$\n- បើ $\\Delta > 0$ ៖ សមីការមានឫសពីរផ្សេងគ្នា $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$\n- បើ $\\Delta = 0$ ៖ សមីការមានឫសឌុប $x_0 = -\\frac{b}{2a}$\n- បើ $\\Delta < 0$ ៖ សមីការគ្មានឫសក្នុងសំណុំចំនួនពិត $\\mathbb{R}$ ឡើយ។",
    body_en: "## Quadratic Formula & Discriminant\nComplete real-number discriminant criteria for solving quadratic polynomials in Grade 9 national examinations.",
  },

  {
    id: "les-g9-math-12",
    grade: 9,
    sort_order: 12,
    title_km: "ទ្រឹស្តីបទតាឡែសក្នុងត្រីកោណ",
    title_en: "Thales' Theorem & Proportional Segments",
    summary_km: "ទ្រឹស្តីបទតាឡែស បន្ទាត់ស្របកាត់ជ្រុងពីរនៃត្រីកោណ និងផលធៀបសមាមាត្រ AM/AB = AN/AC = MN/BC",
    summary_en: "Thales' intercept theorem in triangles, proportional segment ratios, and computing unknown lengths",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-12" },
    body_km: "## ទ្រឹស្តីបទតាឡែសក្នុងត្រីកោណ\nក្នុងត្រីកោណ $ABC$ បើបន្ទាត់មួយកាត់ជ្រុង $AB$ ត្រង់ $M$ និងកាត់ $AC$ ត្រង់ $N$ ហើយស្របនឹងបាត $BC$ ($(MN) \\parallel (BC)$) នោះ៖\n$$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$$",
    body_en: "## Thales' Intercept Theorem\nParallel transversals cutting triangular sides producing proportional geometric segments.",
  },

  {
    id: "les-g9-phys-06",
    grade: 9,
    sort_order: 6,
    title_km: "សៀគ្វីតជាស៊េរី និងតជាខ្នែងនៃរេស៊ីស្តង់",
    title_en: "Series & Parallel Resistor Circuits",
    summary_km: "រូបមន្តរេស៊ីស្តង់សមមូល Req = R1 + R2 (ស៊េរី) និង 1/Req = 1/R1 + 1/R2 (ខ្នែង) ព្រមទាំងការគណនាចរន្ត",
    summary_en: "Equivalent resistance formulas for series Req = R1 + R2 and parallel 1/Req = 1/R1 + 1/R2 configurations",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g9-phys-06" },
    body_km: "## ១. សៀគ្វីតជាស៊េរី (Series)\n- $R_{\\text{eq}} = R_1 + R_2 + \\dots + R_n$\n- ចរន្តស្មើគ្នា ៖ $I = I_1 = I_2$\n- តង់ស្យុងបូកបញ្ចូលគ្នា ៖ $U = U_1 + U_2$\n\n## ២. សៀគ្វីតជាខ្នែង (Parallel)\n- $\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2}$\n- តង់ស្យុងស្មើគ្នា ៖ $U = U_1 = U_2$\n- ចរន្តបូកបញ្ចូលគ្នា ៖ $I = I_1 + I_2$",
    body_en: "## Resistor Networks\nDirect additive resistance in series loops versus reciprocal conductance summation in parallel branches.",
  },

  {
    id: "les-g9-chem-06",
    grade: 9,
    sort_order: 6,
    title_km: "សូលុយស្យុង និងកំហាប់ម៉ូល C = n/V",
    title_en: "Aqueous Solutions & Molar Concentration C = n/V",
    summary_km: "និយមន័យអង្គធាតុរលាយ ធាតុរំលាយ សូលុយស្យុង រូបមន្តកំហាប់ម៉ូល C = n/V និងការគណនាពង្រាវសូលុយស្យុង",
    summary_en: "Molar concentration formula C = n/V (mol/L), volumetric calculations, and dilution principle C1 V1 = C2 V2",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g9-chem-06" },
    body_km: "## រូបមន្តកំហាប់ម៉ូល\n$$C = \\frac{n}{V} = \\frac{m}{M \\cdot V} \\quad (\\text{mol/L ឬ M})$$\n- $n$ ៖ ចំនួនម៉ូល (mol)\n- $V$ ៖ មាឌសូលុយស្យុង (L)\n- **ច្បាប់ពង្រាវ ៖** នៅពេលបន្ថែមទឹក កំហាប់ថយចុះ ប៉ុន្តែចំនួនម៉ូលនៅថេរ ៖ $C_1 V_1 = C_2 V_2$",
    body_en: "## Solution Stoichiometry\nMolarity definition and dilution conservation formula C1 * V1 = C2 * V2.",
  },

  {
    id: "les-g9-bio-06",
    grade: 9,
    sort_order: 6,
    title_km: "ច្បាប់តំណពូជម៉ង់ដែល ៖ ការបង្កាត់កូនមួយលក្ខណៈ",
    title_en: "Mendel's First Law: Monohybrid Inheritance",
    summary_km: "ការពិសោធន៍បង្កាត់សណ្តែករបស់ម៉ង់ដែល អាឡែលលេចធ្លោ អាឡែលអន់ ជំនាន់ F1 និងផលធៀប 3:1 នៅជំនាន់ F2",
    summary_en: "Gregor Mendel's pea plant monohybrid crosses, dominant and recessive alleles, and the 3:1 phenotypic F2 ratio",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g9-bio-06" },
    body_km: "## ច្បាប់ឯកសណ្ឋានភាពជំនាន់កូនកាត់ទី ១ (F1)\nនៅពេលបង្កាត់ពូជសុទ្ធពីរបង្ហាញលក្ខណៈផ្ទុយគ្នា (ឧ. គ្រាប់មូល $AA$ គុណនឹង គ្រាប់ជ្រួញ $aa$)៖\n- ជំនាន់កូន $F_1$ បង្ហាញលក្ខណៈដូចគ្នាទាំងអស់ ១០០% ជា **គ្រាប់មូល ($Aa$)** (លក្ខណៈលេចធ្លោ)។\n- ជំនាន់ចៅ $F_2$ ($F_1 \\times F_1$) បង្ហាញផលធៀបរូបរាង ៖ **៣ គ្រាប់មូល ៖ ១ គ្រាប់ជ្រួញ**។",
    body_en: "## Mendelian Monohybrid Cross\nDominant and recessive phenotypic expression yielding uniform F1 hybrids and 3:1 segregation in the F2 generation.",
  },

  // ============================================================================
  // GRADE 9 MATHEMATICS EXPANDED MASTERY ROADMAP (MOEYS BREVET DIPLOMA)
  // ============================================================================

  // Unit 1: Radicals Expanded
  {
    id: "les-g9-math-13",
    grade: 9,
    sort_order: 13,
    title_km: "ប្រមាណវិធីលើរ៉ាឌីកាល់ និងការសម្រួលកន្សោម",
    title_en: "Radical Operations & Algebraic Simplifications",
    summary_km: "ប្រមាណវិធីបូក ដក គុណ ចែករ៉ាឌីកាល់ ការទាញកត្តាចេញក្រៅរ៉ាឌីកាល់ √(a²b) = |a|√b",
    summary_en: "Radical arithmetic, extracting perfect squares from radicals sqrt(a^2*b) = |a|*sqrt(b), and expression simplification",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-13" },
    body_km: `## ១. លក្ខណៈគ្រឹះនៃរ៉ាឌីកាល់
- $\\sqrt{a^2} = |a| = a$ (បើ $a \\ge 0$)
- $\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b} \\quad (a \\ge 0, b \\ge 0)$
- $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}} \\quad (a \\ge 0, b > 0)$
- $\\sqrt{a^2 b} = a\\sqrt{b} \\quad (a \\ge 0, b \\ge 0)$`,
    body_en: "## Radical Simplification\nFundamental properties for factoring square roots and simplifying radical expressions.",
  },

  {
    id: "les-g9-math-14",
    grade: 9,
    sort_order: 14,
    title_km: "ការបំបាត់រ៉ាឌីកាល់ពីភាគបែងនៃប្រភាគ",
    title_en: "Rationalizing Radical Denominators",
    summary_km: "វិធីគុណកន្សោមកំប្លេ √a/√a និង (√a - √b)/(√a - √b) ដើម្បីបំបាត់ឫសការេពីភាគបែង",
    summary_en: "Rationalization techniques using conjugates to eliminate square roots from denominators",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-14" },
    body_km: `## ១. ករណីភាគបែងមានទម្រង់ $\\sqrt{b}$
គុណភាគយក និងភាគបែងនឹង $\\sqrt{b}$៖
$$\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b} \\quad (b > 0)$$

## ២. ករណីភាគបែងមានទម្រង់ $\\sqrt{a} \\pm \\sqrt{b}$
គុណភាគយក និងភាគបែងនឹងកន្សោមកំប្លេ $(\\sqrt{a} \\mp \\sqrt{b})$៖
$$\\frac{c}{\\sqrt{a} + \\sqrt{b}} = \\frac{c(\\sqrt{a} - \\sqrt{b})}{(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})} = \\frac{c(\\sqrt{a} - \\sqrt{b})}{a - b}$$`,
    body_en: "## Rationalizing Fractions\nMultiplying by conjugate pairs (sqrt(a) - sqrt(b)) using the difference of squares identity.",
  },

  // Unit 2: Linear Systems Expanded
  {
    id: "les-g9-math-15",
    grade: 9,
    sort_order: 15,
    title_km: "សមីការ និងវិសមីការដឺក្រេទី ១ មានតម្លៃដាច់ខាត",
    title_en: "Linear Equations & Inequalities with Absolute Values",
    summary_km: "ដោះស្រាយ |ax + b| = c និង |ax + b| ≤ c ដោយបំបែកជាពីរករណីពិជគណិត",
    summary_en: "Solving absolute value equations |ax + b| = c and inequalities using piecewise definitions",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-15" },
    body_km: `## ១. សមីការ $|ax + b| = c$ ($c \\ge 0$)
$$|ax + b| = c \\iff ax + b = c \\quad \\text{ឬ} \\quad ax + b = -c$$

## ២. វិសមីការ $|ax + b| \\le c$ ($c > 0$)
$$|ax + b| \\le c \\iff -c \\le ax + b \\le c$$

## ៣. វិសមីការ $|ax + b| \\ge c$ ($c > 0$)
$$|ax + b| \\ge c \\iff ax + b \\le -c \\quad \\text{ឬ} \\quad ax + b \\ge c$$`,
    body_en: "## Absolute Value Equations\nRules for solving equations and double inequalities involving absolute values.",
  },

  {
    id: "les-g9-math-16",
    grade: 9,
    sort_order: 16,
    title_km: "ចំណោទប្រព័ន្ធសមីការដឺក្រេទី ១ ក្នុងវិញ្ញាសាឌីប្លូម",
    title_en: "Word Problems with 2x2 Linear Systems in Brevet",
    summary_km: "វិធីសាស្ត្រ ៤ ជំហាន ៖ តាងអថេរ x, y បង្កើតប្រព័ន្ធសមីការ ដោះស្រាយតាមវិធីបូកលុប និងផ្ទៀងផ្ទាត់",
    summary_en: "Four-step methodology: variable definition, constructing 2x2 equations, elimination/substitution solution, and verification",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-16" },
    body_km: `## វិធីសាស្ត្រដោះស្រាយចំណោទ ៤ ជំហាន
1. **ជំហានទី ១ ៖** ជ្រើសរើសអញ្ញាត $x$ និង $y$ ព្រមទាំងដាក់លក្ខខណ្ឌ និងខ្នាតរង្វាស់។
2. **ជំហានទី ២ ៖** បកប្រែប្រធានចំណោទទៅជាប្រព័ន្ធសមីការដឺក្រេទី ១ មានពីរអញ្ញាត។
3. **ជំហានទី ៣ ៖** ដោះស្រាយប្រព័ន្ធសមីការតាមវិធីបូកលុប (Elimination) ឬវិធីជំនួស (Substitution)។
4. **ជំហានទី ៤ ៖** ផ្ទៀងផ្ទាត់ចម្លើយនឹងលក្ខខណ្ឌដើម រួចឆ្លើយសំណួរចំណោទ។`,
    body_en: "## 2x2 Linear Word Problems\nStep-by-step mathematical modeling for age, coin, mixture, and perimeter word problems in Grade 9 Brevet.",
  },

  // Unit 3: Quadratic Brevet Mastery Expanded
  {
    id: "les-g9-math-17",
    grade: 9,
    sort_order: 17,
    title_km: "ការបំបែកត្រីធាដឺក្រេទី ២ ជាកត្តា a(x - x1)(x - x2)",
    title_en: "Factoring Quadratic Trinomials a(x - x1)(x - x2)",
    summary_km: "បំបែកកត្តាតាមផលបូក ផលគុណ និងតាមឫសនៃសមីការ ax² + bx + c = a(x - x1)(x - x2)",
    summary_en: "Factoring quadratic polynomials via sum/product grouping and roots factorization formula a(x - x1)(x - x2)",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-17" },
    body_km: `## រូបមន្តបំបែកជាកត្តា
បើត្រីធា $P(x) = ax^2 + bx + c$ ($a \\neq 0$) មានឌីសគ្រីមីណង់ $\\Delta \\ge 0$ និងមានឫសពីរ $x_1, x_2$ នោះ៖
$$ax^2 + bx + c = a(x - x_1)(x - x_2)$$
- បើ $\\Delta = 0$ (ឫសឌុប $x_1 = x_2 = x_0$) ៖ $ax^2 + bx + c = a(x - x_0)^2$
- បើ $\\Delta < 0$ ៖ មិនអាចបំបែកជាកត្តាដឺក្រេទី ១ ក្នុង $\\mathbb{R}$ បានឡើយ។`,
    body_en: "## Trinomial Factorization\nFactoring quadratics into linear factors using roots x1 and x2.",
  },

  {
    id: "les-g9-math-18",
    grade: 9,
    sort_order: 18,
    title_km: "ឌីសគ្រីមីណង់សម្រួល Δ' និងទំនាក់ទំនងវ្យែតថ្នាក់ទី ៩",
    title_en: "Reduced Discriminant Δ' & Grade 9 Vieta's Relations",
    summary_km: "ករណី b = 2b' រូបមន្ត Δ' = b'² - ac គណនាឫស x = (-b' ± √Δ')/a និងផលបូក-ផលគុណ S, P",
    summary_en: "Reduced discriminant formula Δ' = b'^2 - ac when b is even, and Vieta's relations S = -b/a, P = c/a",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-18" },
    body_km: `## ១. ឌីសគ្រីមីណង់សម្រួល $\\Delta'$ (នៅពេល $b$ ជាចំនួនគូ $b = 2b'$)
$$\\Delta' = (b')^2 - ac$$
- បើ $\\Delta' > 0$ ៖ $x_1 = \\frac{-b' - \\sqrt{\\Delta'}}{a}, \\quad x_2 = \\frac{-b' + \\sqrt{\\Delta'}}{a}$
- បើ $\\Delta' = 0$ ៖ $x_0 = -\\frac{b'}{a}$

## ២. ទំនាក់ទំនងវ្យែត (Vieta's Formulas)
$$S = x_1 + x_2 = -\\frac{b}{a}, \\quad P = x_1 \\cdot x_2 = \\frac{c}{a}$$`,
    body_en: "## Reduced Discriminant & Vieta\nFaster computation for even coefficients using Δ' = b'^2 - ac and root relations S and P.",
  },

  {
    id: "les-g9-math-19",
    grade: 9,
    sort_order: 19,
    title_km: "ចំណោទសមីការដឺក្រេទី ២ ក្នុងវិញ្ញាសាប្រឡងឌីប្លូម",
    title_en: "Quadratic Equation Word Problems in Brevet",
    summary_km: "ចំណោទផ្ទៃក្រឡាចតុកោណកែង ទ្រឹស្តីបទពីតាក័រក្នុងចំណោទ និងល្បឿនមធ្យម",
    summary_en: "Solving Brevet geometric area, motion speed, and Pythagorean word problems leading to quadratic equations",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-19" },
    body_km: `## គន្លឹះដោះស្រាយចំណោទធរណីមាត្រ
- **ចតុកោណកែង ៖** បើបណ្តោយ $x$ និងទទឹង $y$ មានបរិមាត្រ $2p$ នោះ $x + y = p \\implies y = p - x$។
  - ផ្ទៃក្រឡា ៖ $S = x(p - x) = px - x^2 \\implies x^2 - px + S = 0$។
- **ជ្រើសរើសឫសសមហេតុផល ៖** បោះបង់ឫសអវិជ្ជមាន ($x < 0$) ចោល ព្រោះប្រវែងជ្រុងមិនអាចអវិជ្ជមានឡើយ។`,
    body_en: "## Geometric Word Problems\nSetting up and solving quadratic equations derived from rectangular perimeters and area formulas.",
  },

  {
    id: "les-g9-math-20",
    grade: 9,
    sort_order: 20,
    title_km: "សមីការទ្វេដឺក្រេ ax⁴ + bx² + c = 0",
    title_en: "Biquadratic Equations ax⁴ + bx² + c = 0",
    summary_km: "វិធីសាស្ត្រផ្លាស់ប្តូរអថេរ តាង t = x² (t ≥ 0) ដោះស្រាយសមីការដឺក្រេទី ២ រួចទាញរកឫស x",
    summary_en: "Change of variable method: setting t = x^2 (t >= 0), solving the auxiliary quadratic, and extracting x roots",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-20" },
    body_km: `## វិធីសាស្ត្រដោះស្រាយសមីការទ្វេដឺក្រេ
$$ax^4 + bx^2 + c = 0 \\quad (a \\neq 0)$$
1. **ជំហានទី ១ ៖** តាង $t = x^2$ ដោយមានលក្ខខណ្ឌ $t \\ge 0$។
2. **ជំហានទី ២ ៖** ជំនួសចូលសមីការដើម បានសមីការដឺក្រេទី ២ ៖
   $$at^2 + bt + c = 0$$
3. **ជំហានទី ៣ ៖** រកឫស $t_1, t_2$ ហើយរក្សាទុកតែឫសវិជ្ជមាន ($t \\ge 0$)។
4. **ជំហានទី ៤ ៖** ទាញរក $x = \\pm\\sqrt{t}$។`,
    body_en: "## Biquadratic Equations\nSolve ax^4 + bx^2 + c = 0 by substitution t = x^2 (t >= 0) and taking square roots.",
  },

  // Unit 4: Pythagoras & Thales Mastery Expanded
  {
    id: "les-g9-math-21",
    grade: 9,
    sort_order: 21,
    title_km: "ច្រាសទ្រឹស្តីបទពីតាក័រ និងការបង្ហាញត្រីកោណកែង",
    title_en: "Converse Pythagorean Theorem for Right Triangles",
    summary_km: "លក្ខខណ្ឌបង្ហាញត្រីកោណកែង BC² = AB² + AC² និងត្រីកោណមាត្រកែង",
    summary_en: "Converse Pythagorean theorem criteria BC^2 = AB^2 + AC^2 to prove a triangle has a 90-degree right angle",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-21" },
    body_km: `## ច្រាសទ្រឹស្តីបទពីតាក័រ
ក្នុងត្រីកោណ $ABC$ បើជ្រុងវែងជាងគេគឺ $BC$ ហើយផ្ទៀងផ្ទាត់៖
$$BC^2 = AB^2 + AC^2$$
នោះត្រីកោណ $ABC$ ជា **ត្រីកោណកែងត្រង់ $A$**។
- បើ $BC^2 > AB^2 + AC^2$ ៖ មុំ $A$ ជា **មុំទាល** (> 90°
- បើ $BC^2 < AB^2 + AC^2$ ៖ ត្រីកោណ $ABC$ ជា **ត្រីកោណស្រួច** (< 90°)`,
    body_en: "## Converse Pythagorean Theorem\nTesting if a triangle is a right, obtuse, or acute triangle using side length squares.",
  },

  {
    id: "les-g9-math-22",
    grade: 9,
    sort_order: 22,
    title_km: "ទ្រឹស្តីបទតាឡែសក្នុងចតុកោណព្នាយ និងច្រាសតាឡែស",
    title_en: "Thales' Theorem in Trapezoids & Converse Thales",
    summary_km: "ច្រាសទ្រឹស្តីបទតាឡែសដើម្បីបង្ហាញបន្ទាត់ស្របគ្នា និងការអនុវត្តក្នុងចតុកោណព្នាយ",
    summary_en: "Converse Thales' theorem to prove parallelism, and proportional segment applications in trapezoids",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-22" },
    body_km: `## ១. ច្រាសទ្រឹស្តីបទតាឡែស
ក្នុងត្រីកោណ $ABC$ បើចំណុច $M \\in AB$ និង $N \\in AC$ តាមលំដាប់ដូចគ្នា ហើយផ្ទៀងផ្ទាត់៖
$$\\frac{AM}{AB} = \\frac{AN}{AC}$$
នោះបន្ទាត់ $(MN)$ **ស្របនឹងបន្ទាត់** $(BC)$ ($(MN) \\parallel (BC)$)។

## ២. អនុវត្តក្នុងចតុកោណព្នាយ
បន្ទាត់កាត់ទ្រូងស្របនឹងបាតទាំងពីរ ចែកជ្រុងទ្រេតជាអង្កត់សមាមាត្រគ្នា។`,
    body_en: "## Converse Thales' Theorem\nProving parallel lines via equal segment ratios and applications in trapezoids.",
  },

  {
    id: "les-g9-math-23",
    grade: 9,
    sort_order: 23,
    title_km: "ត្រីកោណដូចគ្នា ៖ ករណីដំណូចទាំង ៣ (ម.ម, ជ.ម.ជ, ជ.ជ.ជ)",
    title_en: "Similar Triangles: AA, SAS, SSS Similarity Criteria",
    summary_km: "លក្ខខណ្ឌត្រីកោណដូចគ្នា ផលធៀបដំណូច k ផលធៀបផ្ទៃក្រឡា k² និងការគណនាប្រវែងជ្រុង",
    summary_en: "Three triangle similarity theorems (AA, SAS, SSS), similarity ratio k, and area ratio k^2",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-23" },
    body_km: `## ករណីដំណូចនៃត្រីកោណ
1. **ករណីទី ១ (ម.ម) ៖** បើត្រីកោណពីរមានមុំពីររៀងគ្នាស្មើគ្នា នោះត្រីកោណទាំងពីរដូចគ្នា។
2. **ករណីទី ២ (ជ.ម.ជ) ៖** បើត្រីកោណពីរមានមុំមួយស្មើគ្នា ហើយជ្រុងជាប់មុំនោះសមាមាត្រគ្នា នោះត្រីកោណទាំងពីរដូចគ្នា។
3. **ករណីទី ៣ (ជ.ជ.ជ) ៖** បើជ្រុងទាំងបីនៃត្រីកោណមួយសមាមាត្រនឹងជ្រុងទាំងបីនៃត្រីកោណមួយទៀត នោះត្រីកោណទាំងពីរដូចគ្នា។
- **ផលធៀបផ្ទៃក្រឡា ៖** $\\frac{S'}{S} = k^2$ ($k$ ជាផលធៀបដំណូច)`,
    body_en: "## Triangle Similarity\nCriteria for triangle similarity and the square proportionality of areas S'/S = k^2.",
  },

  {
    id: "les-g9-math-24",
    grade: 9,
    sort_order: 24,
    title_km: "ទំនាក់ទំនងម៉េទ្រិចក្នុងត្រីកោណកែង",
    title_en: "Metric Relations in Right Triangles",
    summary_km: "រូបមន្ត h² = b'c', b² = ab', c² = ac', ah = bc និង 1/h² = 1/b² + 1/c²",
    summary_en: "Metric formulas in right triangles with altitude h: h^2 = b'c', b^2 = ab', c^2 = ac', ah = bc, and 1/h^2 = 1/b^2 + 1/c^2",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-24" },
    body_km: `## ទំនាក់ទំនងម៉េទ្រិចក្នុងត្រីកោណកែង $ABC$ កែងត្រង់ $A$ កម្ពស់ $AH = h$
តាង $BC = a, AC = b, AB = c$ និងចំណោលកែង $CH = b', BH = c'$៖
1. $b^2 = a \\cdot b' \\quad$ និង $\\quad c^2 = a \\cdot c'$
2. $h^2 = b' \\cdot c'$
3. $a \\cdot h = b \\cdot c$
4. $a^2 = b^2 + c^2$ (ពីតាក័រ)
5. $\\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}$`,
    body_en: "## Right Triangle Metric Relations\nGeometric relationships connecting legs, hypotenuse, altitude, and orthogonal projections.",
  },

  // Unit 5: Circles & Trigonometry Expanded
  {
    id: "les-g9-math-25",
    grade: 9,
    sort_order: 25,
    title_km: "មុំផ្ចិត មុំចារឹកក្នុងរង្វង់ និងធ្នូស្ទាក់",
    title_en: "Inscribed Angles, Central Angles & Intercepted Arcs",
    summary_km: "ទំនាក់ទំនងមុំចារឹកស្មើកន្លះមុំផ្ចិត មុំចារឹកក្នុងកន្លះរង្វង់ជាមុំកែង និងចតុកោណចារឹកក្នុងរង្វង់",
    summary_en: "Inscribed angle theorem (half the central angle), right angles subtending diameters, and cyclic quadrilaterals",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-25" },
    body_km: `## ១. ទ្រឹស្តីបទមុំចារឹកក្នុងរង្វង់
រង្វាស់មុំចារឹកក្នុងរង្វង់ស្មើនឹងកន្លះរង្វាស់មុំផ្ចិតដែលស្ទាក់ធ្នូជាមួយគ្នា៖
$$\\widehat{AMB} = \\frac{1}{2}\\widehat{AOB} = \\frac{1}{2}\\text{sd}\\wideparen{AB}$$

## ២. លក្ខណៈពិសេស
- មុំចារឹកទាំងឡាយណាដែលស្ទាក់ធ្នូតែមួយ មានរង្វាស់ស្មើគ្នា។
- មុំចារឹកដែលស្ទាក់កន្លះរង្វង់ (អង្កត់ផ្ចិត) គឺជា **មុំកែង** ($90^\\circ$)។
- ក្នុងចតុកោណចារឹកក្នុងរង្វង់ ផលបូកមុំទល់មុខស្មើ $180^\\circ$។`,
    body_en: "## Circle Inscribed Angles\nInscribed angle measures half the central angle. Triangles inscribed in semicircles are right triangles.",
  },

  {
    id: "les-g9-math-26",
    grade: 9,
    sort_order: 26,
    title_km: "អនុវត្តអនុបាតត្រីកោណមាត្រ ៖ មុំងើយ និងមុំទម្លាក់",
    title_en: "Applied Trigonometry: Angles of Elevation & Depression",
    summary_km: "ការគណនាកម្ពស់អគារ ដើមឈើ ចម្ងាយទូក ដោយប្រើ tan θ = ឈម/ជាប់ និង sin, cos",
    summary_en: "Real-world surveying calculations for building heights, tree elevations, and navigation distances using tangent ratios",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-26" },
    body_km: `## ១. មុំងើយ (Angle of Elevation)
មុំដែលបង្កើតឡើងរវាងខ្សែភ្នែកសម្លឹងឡើងលើ និងខ្សែបន្ទាត់ដេក។
$$\\tan\\alpha = \\frac{\\text{កម្ពស់ (ជ្រុងឈម)}}{\\text{ចម្ងាយដេក (ជ្រុងជាប់)}} \\implies \\text{កម្ពស់} = \\text{ចម្ងាយដេក} \\times \\tan\\alpha$$

## ២. មុំទម្លាក់ (Angle of Depression)
មុំដែលបង្កើតឡើងរវាងខ្សែភ្នែកសម្លឹងចុះក្រោម និងខ្សែបន្ទាត់ដេក។
- មុំទម្លាក់ពីកំពូលស្មើនឹងមុំងើយពីបាត (មុំឆ្លាស់ក្នុង)។`,
    body_en: "## Elevation & Depression Angles\nTrigonometric height and distance indirect surveying measurements.",
  },

  {
    id: "les-g9-math-27",
    grade: 9,
    sort_order: 27,
    title_km: "ស្ថិតិ ៖ មធ្យមនព្វន្ត តារាងប្រេកង់ និងអ៊ីស្តូក្រាមសម្រាប់ឌីប្លូម",
    title_en: "Descriptive Statistics: Mean, Frequencies & Histograms",
    summary_km: "ការគណនាមធ្យមនព្វន្ត x̄ = Σ(ni·xi)/N មេដ្យាន ម៉ូត និងការអានក្រាហ្វិកអ៊ីស្តូក្រាមក្នុងវិញ្ញាសាឌីប្លូម",
    summary_en: "Weighted arithmetic mean x_bar = sum(ni*xi)/N, median, mode, and frequency histogram interpretation for Brevet exams",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g9-math-27" },
    body_km: `## ១. មធ្យមនព្វន្តនៃទិន្នន័យមានប្រេកង់
$$\\bar{x} = \\frac{n_1 x_1 + n_2 x_2 + \\dots + n_k x_k}{n_1 + n_2 + \\dots + n_k} = \\frac{\\sum n_i x_i}{N}$$
- $x_i$ ៖ តម្លៃទិន្នន័យ (ឬតម្លៃកណ្តាលថ្នាក់)
- $n_i$ ៖ ប្រេកង់ (ចំនួនដងដែលតម្លៃកើតឡើង)
- $N = \\sum n_i$ ៖ ប្រេកង់សរុប (ចំនួនទិន្នន័យសរុប)

## ២. ម៉ូត (Mode) និងមេដ្យាន (Median)
- **ម៉ូត ($M_o$) ៖** តម្លៃទិន្នន័យណាដែលមានប្រេកង់ធំបំផុត។
- **មេដ្យាន ($M_e$) ៖** តម្លៃទិន្នន័យដែលស្ថិតនៅចំកណ្តាលគេ បន្ទាប់ពីរៀបតាមលំដាប់កើន។`,
    body_en: "## Grade 9 Statistics\nWeighted mean calculations, mode, median, and cumulative frequency analysis for national Brevet exams.",
  },
];
