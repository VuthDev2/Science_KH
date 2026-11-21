import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_12_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 12 — MATHEMATICS (គណិតវិទ្យា — ត្រៀមប្រឡងបាក់ឌុប)
  // ============================================================================
  {
    id: "les-g12-math-01",
    grade: 12,
    sort_order: 1,
    title_km: "អាំងតេក្រាលកំណត់ និងព្រីមីទីវ (ត្រៀមបាក់ឌុប)",
    title_en: "Definite Integrals & Fundamental Theorem (Bac II)",
    summary_km: "រូបមន្តព្រីមីទីវគ្រឹះ ការគណនាអាំងតេក្រាលដោយផ្នែក ∫ u dv = uv - ∫ v du និងក្រឡាផ្ទៃ",
    summary_en: "Fundamental Theorem of Calculus ∫ f(x)dx = F(b) - F(a), integration by parts, and planar surface areas",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-01" },
    body_km: `## ១. ទ្រឹស្តីបទគ្រឹះនៃគណិតវិទ្យាវិភាគ
បើ $F(x)$ ជាព្រីមីទីវនៃ $f(x)$ លើចន្លោះ $[a, b]$ នោះ៖
$$\\int_a^b f(x) \\, dx = [F(x)]_a^b = F(b) - F(a)$$

## ២. រូបមន្តអាំងតេក្រាលដោយផ្នែក (Integration by Parts)
$$\\int u \\, dv = u \\cdot v - \\int v \\, du$$

> **ឧទាហរណ៍៖** គណនា $I = \\int_0^1 x e^x \\, dx$
> តាង $u = x \\implies du = dx$
> $dv = e^x dx \\implies v = e^x$
> $$I = [x e^x]_0^1 - \\int_0^1 e^x \\, dx = (1 \\cdot e^1 - 0) - [e^x]_0^1 = e - (e - 1) = 1$$

## ៣. ការគណនាក្រឡាផ្ទៃប្លង់ (Planar Area)
ក្រឡាផ្ទៃខណ្ឌដោយខ្សែកោង $y = f(x)$, អ័ក្ស $Ox$ និងបន្ទាត់ឈរ $x = a, x = b$ គឺ៖
$$S = \\int_a^b |f(x)| \\, dx$$`,
    body_en: `## Definite Integrals
Fundamental theorem $\\int_a^b f(x)dx = F(b) - F(a)$. Integration by parts $\\int u dv = uv - \\int v du$. Area under curve $S = \\int_a^b |f(x)|dx$.`,
  },
  {
    id: "les-g12-math-02",
    grade: 12,
    sort_order: 2,
    title_km: "ចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ (Complex Numbers)",
    title_en: "Complex Numbers & De Moivre's Theorem",
    summary_km: "ទម្រង់ពិជគណិត z = a + bi ទម្រង់ត្រីកោណមាត្រ z = r(cos θ + i sin θ) និងរូបមន្តដឺម័រ zⁿ = rⁿ(cos nθ + i sin nθ)",
    summary_en: "Algebraic form a + bi, modulus-argument polar form r(cos θ + i sin θ), and De Moivre's power theorem",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-02" },
    body_km: `## ១. ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច
$$z = a + bi = r(\\cos \\theta + i \\sin \\theta)$$
- ម៉ូឌុល ៖ $r = |z| = \\sqrt{a^2 + b^2}$
- អាគុយម៉ង់ ៖ $\\cos \\theta = \\frac{a}{r}, \\quad \\sin \\theta = \\frac{b}{r}$

## ២. រូបមន្តដឺម័រ (De Moivre's Theorem)
ចំពោះគ្រប់ចំនួនគត់រ៉ឺឡាទីវ $n \\in \\mathbb{Z}$៖
$$[r(\\cos \\theta + i \\sin \\theta)]^n = r^n [\\cos(n\\theta) + i \\sin(n\\theta)]$$

> **ឧទាហរណ៍៖** គណនា $(1 + i)^8$
> $1 + i = \\sqrt{2}\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$
> $$(1 + i)^8 = (\\sqrt{2})^8 [\\cos(2\\pi) + i\\sin(2\\pi)] = 16(1 + 0) = 16$$`,
    body_en: `## Complex Numbers
Polar form $z = r(\\cos\\theta + i\\sin\\theta)$. De Moivre's theorem computes integer powers: $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$.`,
  },
  {
    id: "les-g12-math-03",
    grade: 12,
    sort_order: 3,
    title_km: "សមីការឌីផេរ៉ង់ស្យែល (Differential Equations)",
    title_en: "First & Second Order Differential Equations",
    summary_km: "សមីការលីនេអ៊ែរដឺក្រេទី១ y' + ay = 0 និងដឺក្រេទី២ y'' + ay' + by = 0 តាមសមីការសម្គាល់ r² + ar + b = 0",
    summary_en: "First order ODE y' + ay = 0 (general solution y = Ce⁻ᵃˣ) and second order homogeneous characteristic equations",
    xp_reward: 45,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-03" },
    body_km: `## ១. សមីការលីនេអ៊ែរលំដាប់ទី១
$$y' + ay = 0 \\implies y(x) = C \\cdot e^{-ax} \\quad (C \\in \\mathbb{R})$$

## ២. សមីការលីនេអ៊ែរលំដាប់ទី២ អូម៉ូសែន
$$y'' + ay' + by = 0$$
សមីការសម្គាល់ ៖ $r^2 + ar + b = 0$
- **បើ $\\Delta > 0$ ៖** មានឬសពីរ $r_1 \\neq r_2$
  $$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$$
- **បើ $\\Delta = 0$ ៖** មានឬសឌុប $r_0$
  $$y = (C_1 x + C_2) e^{r_0 x}$$
- **បើ $\\Delta < 0$ ៖** មានឬសកុំផ្លិច $r = \\alpha \\pm i\\beta$
  $$y = e^{\\alpha x} (C_1 \\cos \\beta x + C_2 \\sin \\beta x)$$`,
    body_en: `## Differential Equations
Characteristic equation $r^2 + ar + b = 0$ governs 2nd order linear ODEs across real, repeated, and complex root cases.`,
  },
  {
    id: "les-g12-math-04",
    grade: 12,
    sort_order: 4,
    title_km: "ធរណីមាត្រក្នុងលំហ Oxyz ៖ សមីការប្លង់ និងបន្ទាត់",
    title_en: "3D Space Analytical Geometry: Planes & Lines",
    summary_km: "ផលគុណខ្វែងនៃពីរវ៉ិចទ័រ សមីការប្លង់ ax + by + cz + d = 0 និងសមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់",
    summary_en: "Cross product of vectors, normal plane equations ax + by + cz + d = 0, and parametric spatial lines",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-04" },
    body_km: `## ១. ផលគុណខ្វែង (Cross Product $\\vec{u} \\times \\vec{v}$)
$$\\vec{u} \\times \\vec{v} = \\left( yz' - zy', \\; zx' - xz', \\; xy' - yx' \\right)$$
ផលគុណខ្វែងបង្កើតបានជាវ៉ិចទ័រមួយដែល **កែងនឹងវ៉ិចទ័រទាំងពីរ** $\\vec{u}$ និង $\\vec{v}$។

## ២. សមីការប្លង់កាត់តាម $A(x_0, y_0, z_0)$ មានវ៉ិចទ័រណរម៉ាល់ $\\vec{n}=(a, b, c)$
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\implies ax + by + cz + d = 0$$

## ៣. ចម្ងាយពីចំណុច $M_0$ ទៅប្លង់ $(P)$
$$d(M_0, P) = \\frac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$`,
    body_en: `## 3D Geometry
Cross product $\\vec{u} \\times \\vec{v}$ gives normal vector $\\vec{n}$. Plane equation $ax + by + cz + d = 0$. Distance $d = \\frac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}$.`,
  },
  {
    id: "les-g12-math-05",
    grade: 12,
    sort_order: 5,
    title_km: "ប្រូបាប៊ីលីតេ និងបន្សំ (Probability & Combinations)",
    title_en: "Combinatorics & Classical Probability",
    summary_km: "ចម្លាស់ បន្សំ C_n^k = n! / (k!(n-k)!) ប្រូបាប P(A) = n(A) / n(S) និងទ្រឹស្តីបទប្រូបាបមានលក្ខខណ្ឌ",
    summary_en: "Permutations, combinations C(n, k), sample spaces, independent events, and conditional probability P(A|B)",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-05" },
    body_km: `## ១. បន្សំ (Combinations $C_n^k$)
បន្សំ $k$ ធាតុ យកពី $n$ ធាតុខុសៗគ្នា (ដោយមិនគិតពីលំដាប់) ៖
$$C_n^k = \\frac{n!}{k!(n - k)!}$$

## ២. និយមន័យប្រូបាបក្លាស៊ិក
$$P(A) = \\frac{\\text{ចំនួនករណីស្រប}}{\\text{ចំនួនករណីអាច}} = \\frac{n(A)}{n(S)}$$
- $0 \\leq P(A) \\leq 1$
- ព្រឹត្តិការណ៍ផ្ទុយ ៖ $P(\\bar{A}) = 1 - P(A)$
- ព្រឹត្តិការណ៍មិនចុះសម្រុងគ្នា ៖ $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$`,
    body_en: `## Probability
Combinations $C_n^k = \\frac{n!}{k!(n-k)!}$. Probability $P(A) = \\frac{n(A)}{n(S)}$. Complementary probability $P(\\bar{A}) = 1 - P(A)$.`,
  },
  {
    id: "les-g12-math-06",
    grade: 12,
    sort_order: 6,
    title_km: "គណនាផ្ទៃក្រឡា និងមាឌសូលីតបង្វិលដោយអាំងតេក្រាល",
    title_en: "Area & Solids of Revolution by Definite Integrals",
    summary_km: "រូបមន្តក្រឡាផ្ទៃ A = ∫|f(x) - g(x)|dx និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស (Ox) V = π∫[f(x)]²dx ត្រៀមបាក់ឌុប",
    summary_en: "Planar area bounded by curves and solid revolution volume V = π∫f(x)²dx about the x-axis for Bac II exam",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-06" },
    body_km: `## ១. ក្រឡាផ្ទៃខណ្ឌដោយខ្សែកោង
ក្រឡាផ្ទៃ $A$ នៃដែនកំណត់ដោយខ្សែកោង $y = f(x)$, $y = g(x)$ និងបន្ទាត់ឈរ $x = a, x = b$ ($a \\le b$)៖
$$A = \\int_a^b |f(x) - g(x)| \\, dx$$
បើ $f(x) \\ge g(x)$ លើ $[a, b]$ នោះ៖
$$A = \\int_a^b [f(x) - g(x)] \\, dx$$

## ២. មាឌសូលីតបង្វិលជុំវិញអ័ក្ស $(Ox)$
មាឌ $V$ នៃសូលីតបង្វិលដែលកើតឡើងពីការបង្វិលដែន $D$ ជុំវិញអ័ក្ស $(Ox)$ មួយជុំ ($360^\\circ$)៖
$$V = \\pi \\int_a^b [f(x)]^2 \\, dx$$

> **ឧទាហរណ៍បាក់ឌុប៖** គណនាមាឌសូលីតបង្វិលនៃ $y = \\sqrt{x}$ ជុំវិញ $(Ox)$ ពី $x = 0$ ដល់ $x = 4$
> $$V = \\pi \\int_0^4 (\\sqrt{x})^2 \\, dx = \\pi \\int_0^4 x \\, dx = \\pi \\left[ \\frac{x^2}{2} \\right]_0^4 = \\pi \\left(\\frac{16}{2}\\right) = 8\\pi \\text{ ឯកតាមាឌ}$$`,
    body_en: `## Area & Solid Volume of Revolution
Planar area: $A = \\int_a^b [f(x) - g(x)] dx$. Volume of revolution about x-axis: $V = \\pi \\int_a^b [f(x)]^2 dx$.`,
  },
  {
    id: "les-g12-math-07",
    grade: 12,
    sort_order: 7,
    title_km: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់២ y'' + ay' + by = 0",
    title_en: "Second-Order Linear ODEs (Bac II)",
    summary_km: "សមីការចរិតលក្ខណៈ r² + ar + b = 0 និងដំណោះស្រាយទូទៅចំពោះករណី Δ > 0, Δ = 0, Δ < 0",
    summary_en: "Characteristic equation r² + ar + b = 0, real distinct roots, repeated roots, and complex conjugate harmonic solutions",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-07" },
    body_km: `## ១. សមីការចរិតលក្ខណៈ (Characteristic Equation)
ចំពោះសមីការឌីផេរ៉ង់ស្យែលលំដាប់២ អូម៉ូសែន៖
$$y'' + ay' + by = 0$$
សមីការចរិតលក្ខណៈគឺ៖
$$r^2 + ar + b = 0 \\quad (\\Delta = a^2 - 4b)$$

## ២. ទម្រង់ដំណោះស្រាយទូទៅ
- **ករណី $\\Delta > 0$៖** មានឫសពីរខុសគ្នា $r_1, r_2$
  $$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$$
- **ករណី $\\Delta = 0$៖** មានឫសឌុប $r_0 = -\\frac{a}{2}$
  $$y = (C_1 x + C_2) e^{r_0 x}$$
- **ករណី $\\Delta < 0$៖** មានឫសកុំផ្លិចឆ្លាស់ $r = \\alpha \\pm i\\beta$
  $$y = e^{\\alpha x} (C_1 \\cos\\beta x + C_2 \\sin\\beta x)$$`,
    body_en: `## Second-Order Homogeneous ODEs
$y'' + ay' + by = 0$ with characteristic roots $r$. Solutions span exponential, critical damping, or sinusoidal harmonic combinations.`,
  },
  {
    id: "les-g12-math-08",
    grade: 12,
    sort_order: 8,
    title_km: "ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ",
    title_en: "Trigonometric Form & De Moivre's Theorem",
    summary_km: "ម៉ូឌុល r = |z|, អាគុយម៉ង់ θ, ទម្រង់ z = r(cos θ + i sin θ) និងរូបមន្តដឺម័រ zⁿ = rⁿ(cos nθ + i sin nθ)",
    summary_en: "Modulus r = √(a²+b²), argument θ, polar form z = r(cosθ + i sinθ), and De Moivre's theorem for powers and nth roots",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-08" },
    body_km: `## ១. ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច
ចំពោះចំនួនកុំផ្លិច $z = a + bi$ ($z \\neq 0$)៖
- **ម៉ូឌុល (Modulus)៖** $r = |z| = \\sqrt{a^2 + b^2}$
- **អាគុយម៉ង់ (Argument $\\theta$)៖** $\\cos\\theta = \\frac{a}{r}, \\quad \\sin\\theta = \\frac{b}{r}$
- **ទម្រង់ត្រីកោណមាត្រ៖**
  $$z = r(\\cos\\theta + i\\sin\\theta)$$

## ២. រូបមន្តដឺម័រ (De Moivre's Theorem)
ចំពោះគ្រប់ចំនួនគត់ $n \\in \\mathbb{Z}$៖
$$[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$

> **ឧទាហរណ៍បាក់ឌុប៖** គណនា $(1 + i\\sqrt{3})^{12}$
> - ម៉ូឌុល $r = \\sqrt{1 + 3} = 2$
> - អាគុយម៉ង់ $\\cos\\theta = \\frac{1}{2}, \\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3}$
> - $(1 + i\\sqrt{3})^{12} = 2^{12}\\left(\\cos 12\\frac{\\pi}{3} + i\\sin 12\\frac{\\pi}{3}\\right) = 4096(\\cos 4\\pi + i\\sin 4\\pi) = 4096(1 + 0) = 4096$`,
    body_en: `## Trigonometric Form & De Moivre
$z = r(\\cos\\theta + i\\sin\\theta)$. Powers of complex numbers simplify via De Moivre's theorem: $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$.`,
  },
  {
    id: "les-g12-math-09",
    grade: 12,
    sort_order: 9,
    title_km: "ធរណីមាត្រក្នុងលំហ Oxyz ៖ សមីការប្លង់ និងចម្ងាយ",
    title_en: "3D Space Geometry: Plane Equations & Distances",
    summary_km: "សមីការទូទៅនៃប្លង់ Ax + By + Cz + D = 0 វ៉ិចទ័រណរម៉ាល់ n(A, B, C) និងរូបមន្តចម្ងាយពីចំណុចទៅប្លង់",
    summary_en: "General plane equations Ax + By + Cz + D = 0, normal vectors, angle between planes, and distance formula",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-09" },
    body_km: `## ១. សមីការប្លង់ក្នុងលំហ $(Oxyz)$
ប្លង់ $(P)$ កាត់តាមចំណុច $M_0(x_0, y_0, z_0)$ និងមានវ៉ិចទ័រណរម៉ាល់ $\\vec{n}(A, B, C)$ មានសមីការ៖
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$
ឬជាទម្រង់ទូទៅ៖
$$Ax + By + Cz + D = 0 \\quad (A^2 + B^2 + C^2 \\neq 0)$$

## ២. ចម្ងាយពីចំណុចទៅប្លង់ (Distance Formula)
ចម្ងាយពីចំណុច $M_1(x_1, y_1, z_1)$ ទៅកាន់ប្លង់ $(P): Ax + By + Cz + D = 0$ គឺ៖
$$d(M_1, (P)) = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$`,
    body_en: `## 3D Planes in Space
General plane equation: $Ax + By + Cz + D = 0$. Distance from point $M_1$ to plane: $d = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.`,
  },
  {
    id: "les-g12-math-10",
    grade: 12,
    sort_order: 10,
    title_km: "អថេរចៃដន្យ និងបំណែងចែកប្រូបាបបាក់ឌុប",
    title_en: "Random Variables & Probability Distributions",
    summary_km: "អថេរចៃដន្យដាច់ X តារាងបំណែងចែកប្រូបាប សង្ឃឹមគណិត E(X) វ៉ារ្យ៉ង់ V(X) និងគម្លាតស្តង់ដារ σ(X)",
    summary_en: "Discrete random variables, probability mass function, expected value E(X), variance V(X), and standard deviation",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-10" },
    body_km: `## ១. អថេរចៃដន្យដាច់ (Discrete Random Variable $X$)
ជាអនុគមន៍ដែលភ្ជាប់លទ្ធផលនៃលំហសំណាកទៅនឹងចំនួនពិត $x_1, x_2, ..., x_n$ ដោយមានប្រូបាបរៀងគ្នា $p_1, p_2, ..., p_n$៖
$$\\sum_{i=1}^n p_i = 1$$

## ២. សង្ឃឹមគណិត (Expected Value $E(X)$)
$$E(X) = \\mu = \\sum_{i=1}^n x_i p_i = x_1 p_1 + x_2 p_2 + ... + x_n p_n$$

## ៣. វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារ
- **វ៉ារ្យ៉ង់ (Variance)៖**
  $$V(X) = E(X^2) - [E(X)]^2 = \\sum_{i=1}^n (x_i - \\mu)^2 p_i$$
- **គម្លាតស្តង់ដារ (Standard Deviation)៖**
  $$\\sigma(X) = \\sqrt{V(X)}$$`,
    body_en: `## Random Variables & Distributions
Expected value $E(X) = \\sum x_i p_i$. Variance $V(X) = E(X^2) - [E(X)]^2$, and standard deviation $\\sigma = \\sqrt{V(X)}$.`,
  },

  // ============================================================================
  // GRADE 12 — PHYSICS (រូបវិទ្យា — ត្រៀមប្រឡងបាក់ឌុប)
  // ============================================================================
  {
    id: "les-g12-phys-01",
    grade: 12,
    sort_order: 1,
    title_km: "ច្បាប់ញូតុនទី២ និងឌីណាមិចនៃចលនា (ត្រៀមបាក់ឌុប)",
    title_en: "Newton's Second Law & Dynamic Forces (Bac II)",
    summary_km: "កម្លាំងផ្គួប ΣF = m · a ចលនាលើប្លង់ជម្រាល កម្លាំងកកិត និងច្បាប់រក្សាបរិមាណចលនា",
    summary_en: "Dynamic vector equilibrium, inclined plane force projections, kinetic friction, and momentum conservation",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-01" },
    body_km: `## ១. ច្បាប់ញូតុនទី២ ក្នុងទម្រង់វ៉ិចទ័រ
$$\\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{a}$$

## ២. ចលនាលើប្លង់ជម្រាលមុំ $\\alpha$
នៅពេលទម្លាក់វត្ថុពីលើប្លង់ជម្រាលគ្មានកកិត៖
- ទម្ងន់បំបែកជាពីរភាគ ៖
  - តាមទិសកែងនឹងប្លង់ ៖ $P_y = P \\cos\\alpha = mg\\cos\\alpha$
  - តាមទិសស្របនឹងប្លង់ ៖ $P_x = P \\sin\\alpha = mg\\sin\\alpha$
- សំទុះចលនា ៖
  $$a = g \\sin\\alpha$$

## ៣. ច្បាប់រក្សាបរិមាណចលនា (Momentum Conservation)
ក្នុងប្រព័ន្ធដាច់ខាត ៖
$$\\vec{p} = m_1 \\vec{v}_1 + m_2 \\vec{v}_2 = \\text{ថេរ (Constant)}$$`,
    body_en: `## Newton's Second Law
$\\sum \\vec{F} = m\\vec{a}$. On an inclined frictionless slope, acceleration is $a = g\\sin\\alpha$. Total momentum is conserved in isolated systems.`,
  },
  {
    id: "les-g12-phys-02",
    grade: 12,
    sort_order: 2,
    title_km: "រលកមេកានិច និងរលកអេឡិចត្រូម៉ាញេទិច",
    title_en: "Mechanical & Electromagnetic Waves",
    summary_km: "ប្រវែងរលក λ = v / f ស្មើ v · T សមីការរលក រ៉េសូណង់ និងល្បឿនពន្លឺ c = 3 · 10⁸ m/s",
    summary_en: "Wave speed, wavelength λ = v/f, transverse vs longitudinal waves, wave interference, and the electromagnetic spectrum",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-02" },
    body_km: `## ១. ទំនាក់ទំនងគ្រឹះនៃរលក
$$\\lambda = v \\cdot T = \\frac{v}{f}$$
- $\\lambda$ ៖ ប្រវែងរលក (ម៉ែត្រ $m$)
- $v$ ៖ ល្បឿនរលក ($m/s$)
- $T$ ៖ ខួប ($s$), $f$ ៖ ប្រេកង់ (ហឺត $Hz$)

## ២. រលកអេឡិចត្រូម៉ាញេទិច (EM Waves)
រលកអេឡិចត្រូម៉ាញេទិចធ្វើដំណើរក្នុងសុញ្ញាកាសដោយល្បឿនពន្លឺ ៖
$$c = 3 \\times 10^8\\text{ m/s}$$
$$\\lambda = \\frac{c}{f}$$
តាមលំដាប់ប្រេកង់កើនឡើង ៖ រលកវិទ្យុ $\\rightarrow$ មីក្រូរលក $\\rightarrow$ អាំងហ្វ្រារ៉េដ $\\rightarrow$ ពន្លឺមើលឃើញ $\\rightarrow$ យូវី $\\rightarrow$ កាំរស្មី $X$ $\\rightarrow$ កាំរស្មីហ្គាម៉ា ($\\gamma$)។`,
    body_en: `## Wave Mechanics
$\\lambda = v/f$. In vacuum, electromagnetic waves travel at $c = 3 \\times 10^8\\text{ m/s}$. High frequency corresponds to shorter wavelength.`,
  },
  {
    id: "les-g12-phys-03",
    grade: 12,
    sort_order: 3,
    title_km: "សៀគ្វីចរន្តឆ្លាស់ RLC និងបាតុភូតរ៉េសូណង់",
    title_en: "Alternating Current RLC Circuits & Resonance",
    summary_km: "អាំងប៉េដង់ Z = √(R² + (Lω - 1/Cω)²) មុំផាស tan φ និងប្រេកង់រ៉េសូណង់ f₀ = 1 / (2π√(LC))",
    summary_en: "AC impedance, inductive reactance Lω, capacitive reactance 1/Cω, phasor diagrams, and resonance conditions",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-03" },
    body_km: `## ១. អាំងប៉េដង់សរុបនៃសៀគ្វី RLC
$$Z = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}$$
- $R$ ៖ រេស៊ីស្តង់ ($\\Omega$)
- $Z_L = L\\omega$ ៖ រេអាក់តង់អាំងឌុចទីវ
- $Z_C = \\frac{1}{C\\omega}$ ៖ រេអាក់តង់កាប៉ាស៊ីទីវ

## ២. បាតុភូតរ៉េសូណង់អគ្គិសនី (Electrical Resonance)
កើតឡើងនៅពេល $Z_L = Z_C \\iff L\\omega = \\frac{1}{C\\omega}$៖
- អាំងប៉េដង់តូចបំផុត ៖ $Z_{\\min} = R$
- ចរន្តធំបំផុត ៖ $I_{\\max} = \\frac{U}{R}$
- ប្រេកង់រ៉េសូណង់ ៖
  $$f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$$`,
    body_en: `## RLC Circuits
Impedance $Z = \\sqrt{R^2 + (L\\omega - 1/(C\\omega))^2}$. At resonance $L\\omega = 1/(C\\omega)$, impedance is minimized ($Z = R$) and current peaks.`,
  },
  {
    id: "les-g12-phys-04",
    grade: 12,
    sort_order: 4,
    title_km: "លំយោលសេរី ៖ ប៉ោលទោល និងប៉ោលអេឡាស្ទិច (ត្រៀមបាក់ឌុប)",
    title_en: "Simple Harmonic Motion: Pendulums & Springs",
    summary_km: "ខួបប៉ោលទោល T = 2π√(l/g) ខួបប៉ោលរ៉ឺស័រ T = 2π√(m/k) និងសមីការចលនាលំយោល x(t) = Xm cos(ωt + φ)",
    summary_en: "Simple pendulum period T = 2π√(l/g), spring-mass oscillation T = 2π√(m/k), and harmonic equation x(t) = Xm cos(ωt + φ)",
    xp_reward: 45,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-04" },
    body_km: `## ១. ប៉ោលអេឡាស្ទិច (Spring Oscillator)
$$T = 2\\pi \\sqrt{\\frac{m}{k}}$$
- $m$ ៖ ម៉ាស ($kg$), $k$ ៖ ថេររឹងរ៉ឺស័រ ($N/m$)
- ថាមពលមេកានិចសរុប ៖
  $$E_m = \\frac{1}{2} k X_m^2 = \\text{ថេរ}$$

## ២. ប៉ោលទោល (Simple Pendulum)
ចំពោះមុំលំយោលតូច ($\\alpha_0 \\leq 10^\\circ$) ៖
$$T = 2\\pi \\sqrt{\\frac{l}{g}}$$
- $l$ ៖ ប្រវែងខ្សែប៉ោល ($m$), $g$ ៖ សំទុះទំនាញដី ($m/s^2$)
- ខួបនៃប៉ោលទោល **មិនអាស្រ័យនឹងម៉ាស** នៃដុំប៉ោលឡើយ!`,
    body_en: `## Harmonic Oscillators
Spring period $T = 2\\pi\\sqrt{m/k}$. Simple pendulum period $T = 2\\pi\\sqrt{l/g}$ (independent of pendulum mass for small angles).`,
  },
  {
    id: "les-g12-phys-05",
    grade: 12,
    sort_order: 5,
    title_km: "រូបវិទ្យានុយក្លេអ៊ែរ ៖ វិទ្យុសកម្ម និង E = mc²",
    title_en: "Nuclear Physics: Radioactive Decay & E = mc²",
    summary_km: "កាំរស្មី α, β, γ ច្បាប់ពាក់កណ្តាលជីវិត N(t) = N₀ · 2^(-t/T) កំហាតម៉ាស និងសមភាពអែងស្តែង E = mc²",
    summary_en: "Alpha, beta, gamma decay, half-life decay law N(t) = N0 e^(-λt), mass defect, and Einstein's mass-energy equivalence",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-05" },
    body_km: `## ១. ច្បាប់បំបែកវិទ្យុសកម្ម (Radioactive Half-Life)
$$N(t) = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 \\cdot e^{-\\lambda t}$$
- $N_0$ ៖ ចំនួនណ្វៃយ៉ូដើម
- $T$ ៖ ថេរពាក់កណ្តាលជីវិត (Half-life)
- $\\lambda = \\frac{\\ln 2}{T} \\approx \\frac{0.693}{T}$ ៖ ថេរបំបែក

## ២. សមមូលម៉ាស និងថាមពល (សមភាព Einstein)
$$E = m \\cdot c^2$$
ថាមពលចងភ្ជាប់ណ្វៃយ៉ូ ៖
$$\\Delta E = \\Delta m \\cdot c^2 = (Z m_p + N m_n - M_{\\text{nucleus}}) \\cdot c^2$$
($1\\text{ u} \\approx 931.5\\text{ MeV}$)`,
    body_en: `## Nuclear Physics
Decay follows $N(t) = N_0 \\cdot 2^{-t/T}$. Einstein's relation $E = \\Delta m c^2$ explains immense binding energy from nuclear mass defect.`,
  },

  // ============================================================================
  // GRADE 12 — CHEMISTRY (គីមីវិទ្យា — ត្រៀមប្រឡងបាក់ឌុប)
  // ============================================================================
  {
    id: "les-g12-chem-01",
    grade: 12,
    sort_order: 1,
    title_km: "ស៊ីនេទិចគីមីកម្រិតខ្ពស់ និងល្បឿនប្រតិកម្ម (ត្រៀមបាក់ឌុប)",
    title_en: "Advanced Chemical Kinetics (Bac II)",
    summary_km: "ច្បាប់ល្បឿន v = k · [A]^m [B]^n លំដាប់ប្រតិកម្ម ថាមពលសកម្មកម្ម Ea និងសមីការ Arrhenius",
    summary_en: "Rate law expressions, reaction order, Arrhenius activation energy equation k = A e^(-Ea/RT), and catalysts",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-01" },
    body_km: `## ១. ច្បាប់ល្បឿនប្រតិកម្ម (Rate Law)
ចំពោះប្រតិកម្ម $aA + bB \\rightarrow \\text{Products}$៖
$$v = k \\cdot [A]^m [B]^n$$
- $k$ ៖ ថេរល្បឿន (ប្រែប្រួលតាមសីតុណ្ហភាព)
- $m, n$ ៖ លំដាប់ដោយផ្នែក (កំណត់ដោយការពិសោធន៍)
- លំដាប់ប្រតិកម្មសរុប ៖ $m + n$

## ២. សមីការ Arrhenius
$$k = A \\cdot e^{-\\frac{E_a}{R T}}$$
- $E_a$ ៖ ថាមពលសកម្មកម្ម ($J/mol$)
- កាតាលីករជួយពន្លឿនប្រតិកម្មដោយ **បន្ថយថាមពលសកម្មកម្ម $E_a$**។`,
    body_en: `## Advanced Kinetics
Rate law $v = k [A]^m [B]^n$. Arrhenius equation connects temperature and activation energy $E_a$: $k = A e^{-E_a/RT}$.`,
  },
  {
    id: "les-g12-chem-02",
    grade: 12,
    sort_order: 2,
    title_km: "សមតុល្យគីមី និងថេរលំនឹង Kc (ត្រៀមបាក់ឌុប)",
    title_en: "Chemical Equilibrium & Kc / Kp Calculations",
    summary_km: "ការគណនា Kc និង Kp តារាង ICE (Initial, Change, Equilibrium) ផលធៀបប្រតិកម្ម Q និងទិសដៅរំកិលលំនឹង",
    summary_en: "Equilibrium constant expressions Kc and Kp = Kc(RT)^Δn, ICE tables, and reaction quotient Q comparisons",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-02" },
    body_km: `## ១. ទំនាក់ទំនងរវាង $K_p$ និង $K_c$
$$K_p = K_c \\cdot (R T)^{\\Delta n}$$
- $\\Delta n = \\sum n_{\\text{gas (products)}} - \\sum n_{\\text{gas (reactants)}}$

## ២. ផលធៀបប្រតិកម្ម ($Q$)
- បើ $Q < K_c$ ៖ ប្រព័ន្ធរំកិលទៅ **ទិសដៅមុខ (បង្កើតផល)**
- បើ $Q = K_c$ ៖ ប្រព័ន្ធស្ថិតក្នុង **សមតុល្យ**
- បើ $Q > K_c$ ៖ ប្រព័ន្ធរំកិលទៅ **ទិសដៅច្រាស (បង្កើតប្រតិករ)**`,
    body_en: `## Equilibrium Dynamics
$K_p = K_c(RT)^{\\Delta n}$. Comparing reaction quotient $Q$ against $K_c$ predicts the thermodynamic shift direction.`,
  },
  {
    id: "les-g12-chem-03",
    grade: 12,
    sort_order: 3,
    title_km: "អាស៊ីត-បាស គណនា pH និង Titration (ត្រៀមបាក់ឌុប)",
    title_en: "Acid-Base Titration & pH Buffers (Bac II)",
    summary_km: "អាស៊ីតខ្លាំង-បាសខ្លាំង អាស៊ីតខ្សោយ Ka, pKa = -log Ka ចំណុចសមមូលទីត្រាស និងសមីការ Henderson-Hasselbalch",
    summary_en: "Weak acid ionization Ka, buffer solutions, titration equivalence point C_A·V_A = C_B·V_B, and Henderson-Hasselbalch",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-03" },
    body_km: `## ១. រូបមន្តគណនា pH
- **អាស៊ីតខ្លាំង ៖** $\\text{pH} = -\\log [H_3O^+]$
- **បាសខ្លាំង ៖** $\\text{pH} = 14 + \\log [OH^-]$
- **អាស៊ីតខ្សោយ ៖** $\\text{pH} = \\frac{1}{2}(\\text{p}K_a - \\log C_a)$
- **បាសខ្សោយ ៖** $\\text{pH} = 14 - \\frac{1}{2}(\\text{p}K_b - \\log C_b)$

## ២. ចំណុចសមមូលនៃការធ្វើទីត្រាស (Equivalence Point)
$$C_A \\cdot V_A = C_B \\cdot V_B$$
នៅចំណុចសមមូល ចំនួនម៉ូល $H^+$ ពីអាស៊ីត ស្មើនឹងចំនួនម៉ូល $OH^-$ ពីបាស។`,
    body_en: `## Acid-Base Calculations
Strong acids: $pH = -\\log[H_3O^+]$. Equivalence point in titration: $C_A V_A = C_B V_B$. Buffers follow $pH = pKa + \\log([A^-]/[HA])$.`,
  },
  {
    id: "les-g12-chem-04",
    grade: 12,
    sort_order: 4,
    title_km: "អេស្ទែរ ខ្លាញ់ និងប្រតិកម្មសាប៊ូកម្ម (Saponification)",
    title_en: "Esters, Triglycerides & Saponification",
    summary_km: "ប្រតិកម្មអេស្ទែរកម្ម RCOOH + R'OH ⇌ RCOOR' + H₂O ទ្រីគ្លីសេរីដ និងការផលិតសាប៊ូជាមួយ NaOH",
    summary_en: "Esterification equilibrium, pleasant fruit aromas, lipid triglycerides, and basic hydrolysis saponification",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-04" },
    body_km: `## ១. ប្រតិកម្មអេស្ទែរកម្ម (Esterification)
$$\\text{R-COOH} + \\text{R'-OH} \\xrightleftharpoons[\\Delta]{\\text{H}_2\\text{SO}_4} \\text{R-COO-R'} + \\text{H}_2\\text{O}$$
- អេស្ទែរមានក្លិនក្រអូបផ្លែឈើ (ឧ. ចេកទុំ ម្នាស់ ផ្លែប៉ោម)

## ២. ប្រតិកម្មសាប៊ូកម្ម (Saponification)
ការដុតកម្តៅខ្លាញ់ ឬប្រេង (Triglycerides) ជាមួយបាសខ្លាំង ($NaOH$ ឬ $KOH$) បង្កើតបានជា **សាប៊ូ (អំបិលអាស៊ីតខ្លាញ់)** និងគ្លីសេរ៉ូល ៖
$$\\text{ខ្លាញ់} + 3\\text{NaOH} \\rightarrow 3\\text{R-COONa (សាប៊ូ)} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$`,
    body_en: `## Esters & Saponification
Esters form from acid + alcohol. Alkaline hydrolysis of triglycerides produces fatty acid carboxylate salts (soap) and glycerol.`,
  },
  {
    id: "les-g12-chem-05",
    grade: 12,
    sort_order: 5,
    title_km: "អេឡិចត្រូគីមី ៖ ពីលហ្គាល់វ៉ានិច និងអេឡិចត្រូលីស",
    title_en: "Electrochemistry: Galvanic Cells & Electrolysis",
    summary_km: "ពីលដាញ៉ែល អានូត (-) កាតូត (+) កម្លាំងអគ្គិសនីចលករ E°_cell = E°_cathode - E°_anode និងច្បាប់ហ្វារ៉ាដេ",
    summary_en: "Daniell galvanic cells, standard reduction potentials E°, cell EMF, and Faraday's law of electrolysis m = (M·I·t)/(n·F)",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-05" },
    body_km: `## ១. ពីលហ្គាល់វ៉ានិច (Galvanic Cell)
បំប្លែងថាមពលគីមីទៅជាថាមពលអគ្គិសនី ៖
- **អានូត (Anode, ប៉ូល $-$) ៖** កន្លែងកើតអុកស៊ីតកម្ម (បោះបង់ $e^-$)
- **កាតូត (Cathode, ប៉ូល $+$) ៖** កន្លែងកើតរេដុកកម្ម (ទទួល $e^-$)
- កម្លាំងអគ្គិសនីចលករស្តង់ដារ ៖
  $$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$$

## ២. អេឡិចត្រូលីស និងច្បាប់ហ្វារ៉ាដេ
ម៉ាសសារធាតុរំដោះនៅអេឡិចត្រូត ៖
$$m = \\frac{M \\cdot I \\cdot t}{n \\cdot F}$$
($F = 96500\\text{ C/mol}$ ៖ ថេរហ្វារ៉ាដេ)`,
    body_en: `## Electrochemistry
Galvanic cells convert chemical potential into electricity: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$. Electrolysis mass follows $m = \\frac{MIt}{nF}$.`,
  },

  // ============================================================================
  // GRADE 12 — BIOLOGY (ជីវវិទ្យា — ត្រៀមប្រឡងបាក់ឌុប)
  // ============================================================================
  {
    id: "les-g12-bio-01",
    grade: 12,
    sort_order: 1,
    title_km: "ហ្សែនវិទ្យាម៉ូលេគុល ៖ DNA Replication & Genetic Code",
    title_en: "Molecular Genetics: Replication & Genetic Code (Bac II)",
    summary_km: "ទម្រង់ Helix ភ្លោះ Watson-Crick ការស្វ័យតម្រងទ្វេពាក់កណ្តាលរក្សាទុក DNA Polymerase និងកូដពន្ធុ ៦៤ កូដុង",
    summary_en: "Watson-Crick antiparallel double helix, semiconservative replication via DNA polymerase, and the universal 64-codon table",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-01" },
    body_km: `## ១. រចនាសម្ព័ន្ធ DNA (Watson & Crick, 1953)
DNA ជារាង Helix ភ្លោះស្របបញ្ច្រាសទិសគ្នា ($5' \\rightarrow 3'$ និង $3' \\rightarrow 5'$) ផ្សំឡើងពី ៤ នុយក្លេអូទីត ភ្ជាប់គ្នាដោយសម្ព័ន្ធអ៊ីដ្រូសែនតាមច្បាប់បំពេញបាស ៖
- $A$ ភ្ជាប់នឹង $T$ ដោយសម្ព័ន្ធអ៊ីដ្រូសែន $2$
- $G$ ភ្ជាប់នឹង $C$ ដោយសម្ព័ន្ធអ៊ីដ្រូសែន $3$

## ២. ការស្វ័យតម្រងទ្វេពាក់កណ្តាលរក្សាទុក (Semiconservative)
ខ្សែស្រឡាយកូននីមួយៗផ្សំឡើងពី **ខ្សែស្រឡាយមេ ១** និង **ខ្សែស្រឡាយថ្មី ១** ដែលសំយោគដោយអង់ស៊ីម DNA Polymerase។`,
    body_en: `## Molecular Genetics
Antiparallel double helix DNA binds via complementary base pairing: A=T (2 H-bonds) and G≡C (3 H-bonds). Replication is semiconservative.`,
  },
  {
    id: "les-g12-bio-02",
    grade: 12,
    sort_order: 2,
    title_km: "ច្បាប់តំណពូជរបស់ម៉ង់ដែល និងការបំប្លែងហ្សែន",
    title_en: "Mendelian Genetics & Dihybrid Crosses (Bac II)",
    summary_km: "ច្បាប់ឯកសណ្ឋានជំនាន់ F1 ច្បាប់បំបែកលក្ខណៈ F2 (3:1) និងច្បាប់ផ្គុំដោយឯករាជ្យនៃកូនកាត់ពីរគូ (9:3:3:1)",
    summary_en: "Mendel's laws of segregation (3:1 monohybrid) and independent assortment (9:3:3:1 dihybrid Punnett square ratios)",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-02" },
    body_km: `## ១. ច្បាប់ម៉ង់ដែល (Mendel's Laws)
1. **ច្បាប់ឯកសណ្ឋាននៃជំនាន់ $F_1$ ៖** កូនកាត់ជំនាន់ $F_1$ មានរូបរាងដូចគ្នាទាំងអស់ ($100\\%$ ដូចលក្ខណៈត្រួត)
2. **ច្បាប់បំបែកលក្ខណៈនៅជំនាន់ $F_2$ (កូនកាត់មួយគូ) ៖**
   - សមាមាត្ររូប (Phenotype) ៖ $3 \\text{ ត្រួត} : 1 \\text{ បន្ទាប់}$
   - សមាមាត្រពន្ធុ (Genotype) ៖ $1 AA : 2 Aa : 1 aa$
3. **ច្បាប់ផ្គុំដោយឯករាជ្យ (កូនកាត់ពីរគូ) ៖**
   - សមាមាត្ររូប $F_2$ ៖ $9 : 3 : 3 : 1$`,
    body_en: `## Mendelian Inheritance
Monohybrid $F_2$ yields a 3:1 phenotypic ratio (1:2:1 genotypic). Dihybrid crosses of independent unlinked traits yield 9:3:3:1.`,
  },
  {
    id: "les-g12-bio-03",
    grade: 12,
    sort_order: 3,
    title_km: "វិស្វកម្មហ្សែន និងបច្ចេកវិទ្យាជីវសាស្ត្រ",
    title_en: "Genetic Engineering, Recombinant DNA & PCR",
    summary_km: "អង់ស៊ីមកាត់កំណត់ (Restriction Enzymes) ប្លាស្មីតវ៉ិចទ័រ ក្លូនហ្សែន បច្ចេកទេស PCR និងសារពាង្គកាយកែប្រែហ្សែន (GMO)",
    summary_en: "Restriction endonucleases, plasmid DNA cloning, Polymerase Chain Reaction (PCR) DNA amplification, and transgenic GMOs",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-03" },
    body_km: `## ១. បច្ចេកវិទ្យា DNA រេកុំប៊ីណង់ (Recombinant DNA)
- ប្រើ **អង់ស៊ីមកាត់កំណត់ (Restriction Enzymes)** កាត់ហ្សែនដែលចង់បាន (ឧ. ហ្សែនផលិតអាំងស៊ុយលីនមនុស្ស)
- បញ្ចូលហ្សែននោះទៅក្នុង **ប្លាស្មីត (Plasmid)** របស់បាក់តេរី ដោយប្រើអង់ស៊ីម Ligase
- បញ្ចូលប្លាស្មីតទៅក្នុងបាក់តេរី $E. coli$ ដើម្បីផលិតអាំងស៊ុយលីនយ៉ាងច្រើនសន្ធឹកសន្ធាប់

## ២. បច្ចេកទេស PCR (Polymerase Chain Reaction)
ចម្លងបង្កើនបរិមាណបំណែក DNA រាប់លានដងក្នុងរយៈពេលប៉ុន្មានម៉ោង។`,
    body_en: `## Biotechnology
Recombinant DNA inserts target genes into bacterial plasmids for therapeutic synthesis. PCR amplifies DNA geometrically.`,
  },
  {
    id: "les-g12-bio-04",
    grade: 12,
    sort_order: 4,
    title_km: "ប្រព័ន្ធការពាររាងកាយ Immunology និងវ៉ាក់សាំង",
    title_en: "Immunology: Cellular Immunity & Vaccines",
    summary_km: "កោសិកា B ផលិតអង់ទីគ័រ កោសិកា T ស៊ីតូតុកស៊ីក ភាពស៊ាំកោសិកា និងវ៉ាក់សាំង mRNA សម័យទំនើប",
    summary_en: "Humoral B-cell antibody immunity, cell-mediated cytotoxic CD8+ T cells, MHC recognition, and mRNA vaccine platforms",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-04" },
    body_km: `## ១. ភាពស៊ាំកម្រិតខ្ពស់ (Adaptive Immunity)
1. **ភាពស៊ាំតាមរយៈសារធាតុរាវ (Humoral) ៖**
   - **កោសិកា B (B-cells) ៖** បំប្លែងជាប្លាស្មូស៊ីត ផលិត **អង់ទីគ័រ (Antibodies)** ទៅចងភ្ជាប់ និងបន្សាបអង់ទីហ្សែនមេរោគ
2. **ភាពស៊ាំតាមរយៈកោសិកា (Cell-Mediated) ៖**
   - **កោសិកា T ស៊ីតូតុកស៊ីក (Killer T-cells) ៖** កម្ទេចកោសិកាដែលផ្ទុកមេរោគ ឬកោសិកាមហារីកដោយផ្ទាល់`,
    body_en: `## Immunology
Adaptive immunity involves B-cell humoral antibodies and T-cell mediated cytotoxicity destroying infected host cells.`,
  },
  {
    id: "les-g12-bio-05",
    grade: 12,
    sort_order: 5,
    title_km: "វិវត្តន៍នៃភាវៈរស់ និងទ្រឹស្តី Darwin",
    title_en: "Evolutionary Biology & Natural Selection",
    summary_km: "ទ្រឹស្តីជម្រើសធម្មជាតិរបស់ Charles Darwin ការសម្របខ្លួន ភស្តុតាងផូស៊ីល និងការកកើតប្រភេទថ្មី",
    summary_en: "Darwin's natural selection theory, differential reproductive fitness, homologous structures, and speciation mechanisms",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-05" },
    body_km: `## ១. ទ្រឹស្តីជម្រើសធម្មជាតិ (Natural Selection)
Charles Darwin បានបង្ហាញថា ភាវៈរស់ណាដែលមានលក្ខណៈប្រែប្រួល **សម្របខ្លួនបានល្អបំផុតជាមួយបរិស្ថាន** នឹងមានឱកាសរស់រានមានជីវិតខ្ពស់ជាងគេ និងបន្តពូជបញ្ជូនហ្សែនល្អនោះទៅជំនាន់ក្រោយ។

## ២. ភស្តុតាងនៃការវិវត្តន៍
- **ផូស៊ីល ៖** បង្ហាញពីការវិវត្តន៍រូបរាងសត្វតាមយុគសម័យ
- **សរីរាង្គអូម៉ូឡូក (Homologous Structures) ៖** ដៃមនុស្ស ជើងសេះ ព្រុយត្រីបាឡែន និងស្លាបប្រចៀវ មានឆ្អឹងគ្រោងដូចគ្នាពីបុព្វបុរសរួម!`,
    body_en: `## Evolutionary Biology
Natural selection favors adaptive phenotypes. Homologous anatomical structures provide evidence of shared common ancestry.`,
  },

  // ============================================================================
  // GRADE 12 — EARTH SCIENCE (ផែនដីវិទ្យា — ត្រៀមប្រឡងបាក់ឌុប)
  // ============================================================================
  {
    id: "les-g12-earth-01",
    grade: 12,
    sort_order: 1,
    title_km: "តារារូបវិទ្យា ជីវិតផ្កាយ និង Big Bang",
    title_en: "Astrophysics, Stellar Evolution & The Big Bang",
    summary_km: "ការកកើតចក្រវាល Big Bang ច្បាប់ Hubble v = H₀ · d ការលាយនុយក្លេអ៊ែរក្នុងផ្កាយ និងប្រហោងខ្មៅ",
    summary_en: "The Big Bang theory 13.8 billion years ago, cosmic microwave background, stellar fusion, and Hubble expansion law",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-01" },
    body_km: `## ១. ទ្រឹស្តីបន្ទុះធំ (Big Bang Theory)
ចក្រវាលកកើតឡើងកាលពីប្រហែល **១៣.៨ ពាន់លានឆ្នាំមុន** ពីចំណុចតូចបំផុតដែលមានដង់ស៊ីតេ និងកម្តៅអនន្ត (Singularity)។
- **ច្បាប់ Hubble ៖** កាឡាក់ស៊ីកាន់តែឆ្ងាយ រំកិលចេញពីយើងកាន់តែលឿន ($v = H_0 \\cdot d$) បញ្ជាក់ថាចក្រវាលកំពុងរីកមាឌឥតឈប់ឈរ!

## ២. វដ្តជីវិតនៃផ្កាយ
ផ្កាយដូចព្រះអាទិត្យឆេះដោយសារ **ប្រតិកម្មច្របល់នុយក្លេអ៊ែរ (Nuclear Fusion)** ៖
$$4\\text{ }^1_1H \\rightarrow \\text{ }^4_2He + 2e^+ + 2\\nu + \\text{ថាមពលមហាសាល}$$
ផ្កាយធំៗពេលអស់ឥន្ធនៈ នឹងផ្ទុះជា **Supernova** បង្កើតជាផ្កាយណឺត្រុង ឬប្រហោងខ្មៅ (Black Hole)។`,
    body_en: `## Astrophysics & Cosmogenesis
The Big Bang initiated cosmic expansion 13.8 billion years ago ($v = H_0 d$). Stars generate energy via hydrogen fusion into helium.`,
  },
  {
    id: "les-g12-earth-02",
    grade: 12,
    sort_order: 2,
    title_km: "ការគ្រប់គ្រងធនធានទឹក និងទំនប់វារីអគ្គិសនីទន្លេមេគង្គ",
    title_en: "Mekong Basin Water Governance & Dam Impacts",
    summary_km: "លំហូរដីល្បាប់ធម្មជាតិ ការថយចុះ ៥០% ជម្រកត្រីបឹងទន្លេសាប និងគណៈកម្មការទន្លេមេគង្គ (MRC)",
    summary_en: "Sediment trapping behind upstream cascade dams, Tonle Sap pulse suppression, salinity intrusion, and MRC treaties",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-02" },
    body_km: `## ១. បញ្ហាប្រឈមនៃអាងទន្លេមេគង្គ
ទំនប់វារីអគ្គិសនីនៅផ្នែកខាងលើនៃទន្លេមេគង្គបានកាត់បន្ថយលំហូរដីល្បាប់ធម្មជាតិជាង $50\\%$ មកកាន់កម្ពុជា៖
- ធ្វើឱ្យបាត់បង់ជម្រកត្រី និងជីវចម្រុះក្នុងបឹងទន្លេសាប
- នាំឱ្យមានការជ្រៀតចូលនៃទឹកប្រៃនៅតំបន់ដីសណ្ត
- ដំណោះស្រាយ ៖ ការគ្រប់គ្រងធនធានទឹករួមគ្នាតាមរយៈគណៈកម្មការទន្លេមេគង្គ ($MRC$) និងការងាកទៅរកថាមពលកកើតឡើងវិញ។`,
    body_en: `## Mekong River Hydropolitics
Hydropower dams trap essential riverine sediments and dampen flood pulses, requiring multilateral Mekong River Commission coordination.`,
  },
  {
    id: "les-g12-earth-03",
    grade: 12,
    sort_order: 3,
    title_km: "យុទ្ធសាស្ត្រជាតិស្តីពីការប្រែប្រួលអាកាសធាតុ (MoEYS Policy)",
    title_en: "Cambodia National Climate Strategy & NDC",
    summary_km: "ការកាត់បន្ថយការបំភាយឧស្ម័នផ្ទះកញ្ចក់ ថាមពលព្រះអាទិត្យ ៦០% ឥណទានកាបូន REDD+ និងកិច្ចព្រមព្រៀងប៉ារីស",
    summary_en: "Cambodia Nationally Determined Contributions (NDC), renewable solar grid expansion, forest REDD+ carbon credits",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-03" },
    body_km: `## ១. ផែនការយុទ្ធសាស្ត្រអាកាសធាតុកម្ពុជា
កម្ពុជាបានដាក់ចេញផែនការយុទ្ធសាស្ត្រឆ្លើយតបនឹងការប្រែប្រួលអាកាសធាតុ ៖
1. **បង្កើនការប្រើប្រាស់ថាមពលកកើតឡើងវិញ ៖** ជំរុញថាមពលពន្លឺព្រះអាទិត្យ (Solar) ឱ្យបានលើស $60\\%$ នៃបណ្តាញជាតិ
2. **ការការពារព្រៃឈើ និង REDD+ ៖** ទប់ស្កាត់ការកាប់បំផ្លាញព្រៃឈើ និងលក់ឥណទានកាបូន
3. **កសិកម្មឆ្លាតវៃធន់នឹងអាកាសធាតុ ៖** ប្រើប្រាស់ពូជស្រូវធន់នឹងភាពរាំងស្ងួត និងទឹកជំនន់`,
    body_en: `## Cambodia Climate Framework
Targets include expanding grid solar past 60%, forest conservation financing via REDD+, and climate-resilient agricultural adaptation.`,
  },
  {
    id: "les-g12-earth-04",
    grade: 12,
    sort_order: 4,
    title_km: "គ្រោះមហន្តរាយធម្មជាតិ និងប្រព័ន្ធព្រមានទុកជាមុន",
    title_en: "Natural Disasters & Early Warning Systems",
    summary_km: "ព្យុះទីហ្វុង ទឹកជំនន់រហ័ស រលកយក្សស៊ូណាមិ ផ្កាយរណបឧតុនិយម និងប្រព័ន្ធឆ្លើយតបគ្រោះមហន្តរាយ",
    summary_en: "Tropical cyclones, flash flood hydrological modeling, tsunami buoys, and national early warning telemetry",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-04" },
    body_km: `## ១. ប្រព័ន្ធព្រមានទុកជាមុន (Early Warning Systems)
ការប្រើប្រាស់រូបភាពផ្កាយរណបឧតុនិយម រ៉ាដា និងស្ថានីយជលសាស្ត្រស្វ័យប្រវត្តិតាមបណ្តោយដងទន្លេ ដើម្បីព្យាករណ៍ និងជូនដំណឹងដល់ប្រជាពលរដ្ឋបានទាន់ពេលវេលា មុនពេលទឹកជំនន់ ឬព្យុះវាយប្រហារ ជួយសង្គ្រោះអាយុជីវិត និងទ្រព្យសម្បត្តិ។`,
    body_en: `## Disaster Preparedness
Satellite remote sensing, Doppler radar, and automated river stage telemetry provide life-saving early flood alerts.`,
  },
  {
    id: "les-g12-earth-05",
    grade: 12,
    sort_order: 5,
    title_km: "ថាមពលកកើតឡើងវិញ និងអនាគតបៃតងកម្ពុជា",
    title_en: "Renewable Energy & Cambodia's Green Future",
    summary_km: "ថាមពលពន្លឺព្រះអាទិត្យ ជីវម៉ាស វារីអគ្គិសនីខ្នាតតូច សេដ្ឋកិច្ចវិលជុំ និងអព្យាក្រឹតភាពកាបូនឆ្នាំ ២០៥០",
    summary_en: "Solar photovoltaics, biomass gasification, small run-of-river hydro, circular economy, and 2050 carbon neutrality roadmap",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-05" },
    body_km: `## ១. ផែនទីបង្ហាញផ្លូវអព្យាក្រឹតភាពកាបូនឆ្នាំ ២០៥០
កម្ពុជាបានប្តេជ្ញាចិត្តសម្រេចឱ្យបាន **អព្យាក្រឹតភាពកាបូន (Carbon Neutrality) នៅឆ្នាំ ២០៥០** តាមរយៈ៖
- ការបញ្ឈប់ការសាងសង់រោងចក្រអគ្គិសនីដុតធ្យូងថ្មថ្មី
- ការពង្រីកកសិដ្ឋានសូឡាខ្នាតធំនៅខេត្តកំពង់ឆ្នាំង កំពង់ស្ពឺ ពោធិ៍សាត់
- ការលើកកម្ពស់សេដ្ឋកិច្ចវិលជុំ (Circular Economy) កែច្នៃធនធាន`,
    body_en: `## Green Future Roadmap
Cambodia's Long-Term Strategy for Carbon Neutrality by 2050 commits to zero new coal plants, massive solar grid expansion, and circular waste recycling.`,
  },

  // ============================================================================
  // ADDITIONAL OFFICIAL MOEYS NATIONAL CURRICULUM LESSONS (BAC II COMPREHENSIVE)
  // ============================================================================

  {
    id: "les-g12-math-11",
    grade: 12,
    sort_order: 11,
    title_km: "លីមីតនៃអនុគមន៍ និងរាងមិនកំណត់ (0/0, ∞/∞)",
    title_en: "Limits of Functions & Indeterminate Forms",
    summary_km: "ការគណនាលីមីតនៃអនុគមន៍សនិទាន អសនិទាន និងត្រីកោណមាត្រ ការលុបរាងមិនកំណត់ 0/0, ∞/∞, ∞-∞, 0×∞",
    summary_en: "Limit evaluation techniques for rational, radical, and trigonometric functions; resolving indeterminate forms",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-11" },
    body_km: `## ១. រាងមិនកំណត់គ្រឹះទាំង ៤
ក្នុងគណិតវិទ្យាវិភាគថ្នាក់ទី ១២ រាងមិនកំណត់សំខាន់ៗដែលត្រូវប្រឡងបាក់ឌុបមាន៖
$$\\left[\\frac{0}{0}\\right], \\quad \\left[\\frac{\\infty}{\\infty}\\right], \\quad [\\infty - \\infty], \\quad [0 \\times \\infty]$$

## ២. វិធីសាស្ត្រលុបរាងមិនកំណត់
### ក. រាង $[\\frac{0}{0}]$ ចំពោះអនុគមន៍សនិទាន
- ដាក់ភាគយក និងភាគបែងជាផលគុណកត្តា $(x - a)$ រួចសម្រួលចោល។
- បើមានរ៉ាឌីកាល់ (ឫសការេ) ត្រូវគុណនឹងកន្សោមកំប្លេ (Conjugate)៖ $(\\sqrt{A} - B)(\\sqrt{A} + B) = A - B^2$។

### ខ. រាង $[\\frac{\\infty}{\\infty}]$
- ទាញតួដែលមានស្វ័យគុណខ្ពស់ជាងគេជាកត្តារួមទាំងនៅភាគយក និងភាគបែង រួចសម្រួល។
- ប្រើទ្រឹស្តីបទ៖ $\\lim_{x \\to \\pm\\infty} \\frac{1}{x^n} = 0$ ($n > 0$)។

### គ. លីមីតត្រីកោណមាត្រគ្រឹះ
$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}, \\quad \\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$$

> **ឧទាហរណ៍បាក់ឌុប៖** គណនា $L = \\lim_{x \\to 2} \\frac{\\sqrt{x + 2} - 2}{x - 2}$
> ជំនួស $x = 2 \\implies \\frac{\\sqrt{4} - 2}{2 - 2} = \\left[\\frac{0}{0}\\right]$
> គុណកន្សោមកំប្លេ៖
> $$L = \\lim_{x \\to 2} \\frac{(\\sqrt{x + 2} - 2)(\\sqrt{x + 2} + 2)}{(x - 2)(\\sqrt{x + 2} + 2)} = \\lim_{x \\to 2} \\frac{x + 2 - 4}{(x - 2)(\\sqrt{x + 2} + 2)}$$
> $$L = \\lim_{x \\to 2} \\frac{x - 2}{(x - 2)(\\sqrt{x + 2} + 2)} = \\lim_{x \\to 2} \\frac{1}{\\sqrt{x + 2} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$$`,
    body_en: `## Limits of Functions
Evaluating limits with indeterminate forms 0/0 and inf/inf. Conjugate multiplication for radicals and standard trigonometric limit identity lim (sin x)/x = 1 as x approaches 0.`,
  },

  {
    id: "les-g12-math-12",
    grade: 12,
    sort_order: 12,
    title_km: "ភាពជាប់នៃអនុគមន៍ និងទ្រឹស្តីបទតម្លៃកណ្តាល",
    title_en: "Continuity of Functions & Intermediate Value Theorem",
    summary_km: "លក្ខខណ្ឌភាពជាប់នៃអនុគមន៍ត្រង់ចំណុច និងលើចន្លោះ ទ្រឹស្តីបទតម្លៃកណ្តាល និងការស្រាយបញ្ជាក់ឬសសមីការ f(x) = 0",
    summary_en: "Continuity criteria at points and intervals, Intermediate Value Theorem (IVT), and proving roots of f(x) = 0",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-12" },
    body_km: "## ១. និយមន័យភាពជាប់ត្រង់ចំណុចមួយ\nអនុគមន៍ $f(x)$ ជាប់ត្រង់ចំណុច $x = x_0$ លុះត្រាតែបំពេញលក្ខខណ្ឌ ៣ យ៉ាង៖\n1. $f(x_0)$ មានន័យ (កំណត់)\n2. $\\lim_{x \\to x_0} f(x)$ មាន\n3. $\\lim_{x \\to x_0} f(x) = f(x_0)$\n\n> **ចំណាំ៖** $\\lim_{x \\to x_0} f(x)$ មាន លុះត្រាតែ $\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x)$។\n\n## ២. ទ្រឹស្តីបទតម្លៃកណ្តាល (Intermediate Value Theorem)\nបើអនុគមន៍ $f$ ជាប់លើចន្លោះបិទ $[a, b]$ ហើយ $k$ ជាចំនួនពិតមួយនៅចន្លោះ $f(a)$ និង $f(b)$ នោះយ៉ាងហោចណាស់មានចំនួនពិត $c \\in (a, b)$ មួយដែល៖\n$$f(c) = k$$\n\n### ករណីពិសេស (ការស្រាយបញ្ជាក់ឫសសមីការ)\nបើ $f$ ជាប់លើ $[a, b]$ ហើយ $f(a) \\times f(b) < 0$ នោះសមីការ $f(x) = 0$ យ៉ាងហោចណាស់មានឫសពិត $c$ មួយក្នុងចន្លោះបើក $(a, b)$។ បើ $f$ កើនដាច់ខាត ឬចុះដាច់ខាត នោះឫស $c$ មានតែមួយគត់ (ភាពទោលនៃឫស)។",
    body_en: "## Continuity & IVT\nCriteria for continuity at a point: defined value, existing bilateral limit, and equality. Intermediate Value Theorem ensures existence of solutions for f(x) = 0 when f(a) * f(b) < 0.",
  },

  {
    id: "les-g12-math-13",
    grade: 12,
    sort_order: 13,
    title_km: "អាស៊ីមតូតនៃក្រាបតំណាងអនុគមន៍ (ដេក ឈរ និងទ្រេត)",
    title_en: "Asymptotes of Functions: Horizontal, Vertical & Oblique",
    summary_km: "រូបមន្តរកអាស៊ីមតូតដេក y = b អាស៊ីមតូតឈរ x = a និងអាស៊ីមតូតទ្រេត y = ax + b សម្រាប់សង់ក្រាបបាក់ឌុប",
    summary_en: "Determining horizontal asymptotes y = b, vertical asymptotes x = a, and oblique slant asymptotes y = ax + b",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-13" },
    body_km: "## ១. អាស៊ីមតូតឈរ (Vertical Asymptote)\nបន្ទាត់ $x = a$ ជាអាស៊ីមតូតឈរនៃក្រាប $(C)$ បើ៖\n$$\\lim_{x \\to a^-} f(x) = \\pm\\infty \\quad \\text{ឬ} \\quad \\lim_{x \\to a^+} f(x) = \\pm\\infty$$\n\n## ២. អាស៊ីមតូតដេក (Horizontal Asymptote)\nបន្ទាត់ $y = b$ ជាអាស៊ីមតូតដេកនៃក្រាប $(C)$ ខាង $+\\infty$ ឬ $-\\infty$ បើ៖\n$$\\lim_{x \\to +\\infty} f(x) = b \\quad \\text{ឬ} \\quad \\lim_{x \\to -\\infty} f(x) = b$$\n\n## ៣. អាស៊ីមតូតទ្រេត (Oblique Asymptote)\nបន្ទាត់ $y = ax + b$ ($a \\neq 0$) ជាអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ បើ៖\n$$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$\n\n> **វិធីសាស្ត្រគណនា $a$ និង $b$៖**\n> $$a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}, \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$$",
    body_en: "## Asymptotes of Curves\nVertical asymptote at zeroes of denominator with infinite limits. Horizontal asymptote as x approaches infinity. Oblique asymptote y = ax + b when limit of [f(x) - (ax + b)] equals zero.",
  },

  {
    id: "les-g12-math-11-p1",
    grade: 12,
    sort_order: 111,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ គណនាលីមីតរាង 0/0 និង ∞/∞",
    title_en: "Practice Lab: Calculating Limits of Indeterminate Forms",
    summary_km: "លំហាត់គណនាលីមីតជាក់ស្តែង វិធីបំបែកកត្តា គុណកន្សោមកំប្លេ និងការលុបរាងមិនកំណត់",
    summary_en: "Hands-on calculation exercises for factoring, conjugate multiplication, and resolving 0/0 and inf/inf limits",
    xp_reward: 45,
    estimated_minutes: 18,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-11" },
    body_km: `## លំហាត់អនុវត្តលីមីតរាងមិនកំណត់
ផ្នែកនេះផ្តល់នូវលំហាត់គណនាជាក់ស្តែង ដើម្បីជួយសិស្សពង្រឹងជំនាញដោះស្រាយរាងមិនកំណត់ដែលចេញប្រឡងបាក់ឌុបញឹកញាប់បំផុត!

### លំហាត់គំរូទី ១ (បំបែកកត្តា)
គណនា $L_1 = \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$
- ជំនួស $x = 3 \\implies \\frac{9 - 9}{3 - 3} = \\left[\\frac{0}{0}\\right]$
- ភាគយក $x^2 - 9 = (x - 3)(x + 3)$
- សម្រួល $(x - 3) \\implies L_1 = \\lim_{x \\to 3} (x + 3) = 3 + 3 = 6$

### លំហាត់គំរូទី ២ (គុណកន្សោមកំប្លេ)
គណនា $L_2 = \\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$
- គុណកន្សោមកំប្លេ $(\\sqrt{x} + 2)$ ទាំងភាគយក និងភាគបែង៖
$$L_2 = \\lim_{x \\to 4} \\frac{(\\sqrt{x} - 2)(\\sqrt{x} + 2)}{(x - 4)(\\sqrt{x} + 2)} = \\lim_{x \\to 4} \\frac{x - 4}{(x - 4)(\\sqrt{x} + 2)}$$
$$L_2 = \\lim_{x \\to 4} \\frac{1}{\\sqrt{x} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$$`,
    body_en: `Practical problem sets on 0/0 and inf/inf indeterminate limit evaluations using factoring and conjugate identities.`,
  },

  {
    id: "les-g12-math-11-p2",
    grade: 12,
    sort_order: 112,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ លីមីតត្រីកោណមាត្រគ្រឹះ",
    title_en: "Practice Lab: Trigonometric Limits & Identities",
    summary_km: "អនុវត្តរូបមន្ត lim(sin u/u) = 1, lim(1 - cos u)/u² = 1/2 លើលំហាត់គណនាជាក់ស្តែង",
    summary_en: "Hands-on exercises applying fundamental trigonometric limits and algebraic transformations",
    xp_reward: 45,
    estimated_minutes: 18,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-11" },
    body_km: `## លំហាត់អនុវត្តលីមីតត្រីកោណមាត្រ
រូបមន្តគន្លឹះដែលត្រូវចងចាំ៖
$$\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1, \\quad \\lim_{u \\to 0} \\frac{1 - \\cos u}{u^2} = \\frac{1}{2}, \\quad \\lim_{u \\to 0} \\frac{\\tan u}{u} = 1$$

### លំហាត់គំរូទី ១
គណនា $L = \\lim_{x \\to 0} \\frac{\\sin 4x}{\\sin 3x}$
- ចែកភាគយក និងភាគបែងនឹង $x$៖
$$L = \\lim_{x \\to 0} \\frac{\\frac{\\sin 4x}{x}}{\\frac{\\sin 3x}{x}} = \\frac{4 \\cdot \\lim_{x \\to 0} \\frac{\\sin 4x}{4x}}{3 \\cdot \\lim_{x \\to 0} \\frac{\\sin 3x}{3x}} = \\frac{4 \\times 1}{3 \\times 1} = \\frac{4}{3}$$`,
    body_en: `Trigonometric limit exercises utilizing standard limits and variable substitution.`,
  },

  {
    id: "les-g12-math-12-p1",
    grade: 12,
    sort_order: 121,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ ភាពជាប់នៃអនុគមន៍ និងតម្លៃកណ្តាល",
    title_en: "Practice Lab: Continuity & Intermediate Value Calculations",
    summary_km: "លំហាត់រកតម្លៃប៉ារ៉ាម៉ែត្រ k ដើម្បីឱ្យ f(x) ជាប់ និងស្រាយបញ្ជាក់សមីការ f(x) = 0 មានឫស",
    summary_en: "Parametric continuity calculations and intermediate value theorem root bracket proofs",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-12" },
    body_km: "## លំហាត់អនុវត្តភាពជាប់ និងទ្រឹស្តីបទតម្លៃកណ្តាល\\n\\n### លំហាត់គំរូ ៖ រកតម្លៃប៉ារ៉ាម៉ែត្រ $k$\\nគេឱ្យអនុគមន៍ $f(x)$ កំណត់ដោយ៖\\n$$f(x) = \\\\begin{cases} \\\\frac{x^2 - 1}{x - 1} & \\\\text{បើ } x \\\\neq 1 \\\\\\\\ k & \\\\text{បើ } x = 1 \\\\end{cases}$$\\nរកតម្លៃ $k$ ដើម្បីឱ្យអនុគមន៍ $f$ ជាប់ត្រង់ $x = 1$។\\n\\n**ដំណោះស្រាយ៖**\\n- ដើម្បីឱ្យ $f$ ជាប់ត្រង់ $x = 1$ លុះត្រាតែ $\\\\lim_{x \\\\to 1} f(x) = f(1)$\\n- យើងមាន $f(1) = k$\\n- $\\\\lim_{x \\\\to 1} f(x) = \\\\lim_{x \\\\to 1} \\\\frac{(x - 1)(x + 1)}{x - 1} = \\\\lim_{x \\\\to 1} (x + 1) = 1 + 1 = 2$\\n- ដូចនេះ $k = 2$ ទើបអនុគមន៍ $f$ ជាប់ត្រង់ $x = 1$។",
    body_en: "Parametric exercises on continuity at a point and Intermediate Value Theorem.",
  },

  {
    id: "les-g12-math-13-p1",
    grade: 12,
    sort_order: 131,
    title_km: "វិញ្ញាសាអនុវត្តបាក់ឌុប ៖ លីមីត និងអាស៊ីមតូតខ្សែកោង",
    title_en: "Bac II Exam Challenge: Unit 1 Limits & Asymptotes Mastery",
    summary_km: "វិញ្ញាសាសាកល្បងបាក់ឌុបបូកសរុបបញ្ចប់ជំពូកទី ១ លីមីត ភាពជាប់ និងអាស៊ីមតូតទាំង ៣",
    summary_en: "Full Bac II examination problem covering unit 1 limits, continuity, and asymptotes",
    xp_reward: 65,
    estimated_minutes: 25,
    lessonType: "exam_prep",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-13" },
    body_km: "## វិញ្ញាសាអនុវត្តបាក់ឌុបបញ្ចប់ជំពូកទី ១ (ពិន្ទុពេញ ២០)\\nវិញ្ញាសានេះត្រូវបានដកស្រង់ពីការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ឆ្នាំកន្លងទៅ។\\n\\n### ប្រធានវិញ្ញាសា\\nគេមានអនុគមន៍ $f(x) = \\\\frac{2x^2 - 3x + 5}{x - 1}$ មានក្រាបតំណាង $(C)$។\\n1. រកដែនកំណត់នៃអនុគមន៍ $f$។\\n2. គណនាលីមីត $\\\\lim_{x \\\\to 1^+} f(x)$ និង $\\\\lim_{x \\\\to 1^-} f(x)$ រួចទាញរកសមីការអាស៊ីមតូតឈរ។\\n3. សរសេរ $f(x)$ ជាទម្រង់ $f(x) = ax + b + \\\\frac{c}{x - 1}$។\\n4. បង្ហាញថាបន្ទាត់ $(d): y = ax + b$ ជាអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ នៅ $\\\\pm\\\\infty$។\\n\\n**គន្លឹះដោះស្រាយ៖**\\n- អាស៊ីមតូតឈរគឺ $x = 1$ ព្រោះភាគបែងស្មើ ០។\\n- ធ្វើវិធីចែកពហុធា៖ $2x^2 - 3x + 5 = (x - 1)(2x - 1) + 4$\\n- នាំឱ្យ $f(x) = 2x - 1 + \\\\frac{4}{x - 1} \\\\implies (d): y = 2x - 1$ ជាអាស៊ីមតូតទ្រេត!",
    body_en: "Comprehensive Bac II standard problem analyzing rational function limits, vertical asymptote x = 1, and oblique asymptote y = 2x - 1.",
  },

  {
    id: "les-g12-math-14",
    grade: 12,
    sort_order: 14,
    title_km: "រូបមន្តដេរីវេ និងដេរីវេនៃអនុគមន៍បណ្តាក់",
    title_en: "Derivative Rules & The Chain Rule",
    summary_km: "រូបមន្តដេរីវេផលគុណ ផលចែក ស្វ័យគុណ អនុគមន៍បណ្តាក់ (u^n)', (e^u)', (ln u)', (sin u)', (cos u)'",
    summary_en: "Product, quotient, and chain rules for differentiating polynomial, composite, exponential, and trig functions",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-14" },
    body_km: "## ១. រូបមន្តដេរីវេគ្រឹះ និងអនុគមន៍បណ្តាក់\n- $(u^n)' = n u' u^{n-1}$\n- $(\\sqrt{u})' = \\frac{u'}{2\\sqrt{u}}$\n- $(e^u)' = u' e^u$\n- $(\\ln u)' = \\frac{u'}{u} \\quad (u > 0)$\n- $(\\sin u)' = u' \\cos u$\n- $(\\cos u)' = -u' \\sin u$\n\n## ២. រូបមន្តផលគុណ និងផលចែក\n$$(u \\cdot v)' = u'v + uv'$$\n$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\quad (v \\neq 0)$$\n\n## ៣. សមីការបន្ទាត់ប៉ះ (Tangent Line Equation)\nសមីការបន្ទាត់ប៉ះនឹងក្រាប $(C)$ ត្រង់ចំណុច $M(x_0, y_0)$ គឺ៖\n$$(T): y = f'(x_0)(x - x_0) + f(x_0)$$\nដែល $f'(x_0)$ គឺជាមេគុណប្រាប់ទិស (Slope) នៃបន្ទាត់ប៉ះ។",
    body_en: "## Derivative Formulas\nCore derivative operations including product, quotient, and chain rules. Tangent line equation y = f'(x_0)(x - x_0) + y_0 where f'(x_0) represents the instantaneous gradient.",
  },

  {
    id: "les-g12-math-15",
    grade: 12,
    sort_order: 15,
    title_km: "ទិសដៅអថេរភាព និងបរមាធៀបនៃអនុគមន៍",
    title_en: "Monotonicity & Local Extrema of Functions",
    summary_km: "សញ្ញាដេរីវេទីមួយ f'(x) ទិសដៅកើន-ចុះ តារាងអថេរភាព ចំណុចអតិបរមាធៀប និងអប្បបរមាធៀប",
    summary_en: "First derivative test, increasing/decreasing intervals, variation table, and relative local extrema",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-15" },
    body_km: "## ១. ទិសដៅអថេរភាពនៃអនុគមន៍\nឧបមាថា $f$ មានដេរីវេលើចន្លោះ $I$៖\n- បើ $f'(x) > 0$ ចំពោះគ្រប់ $x \\in I$ នោះ $f$ ជាអនុគមន៍ **កើនដាច់ខាត** លើ $I$។\n- បើ $f'(x) < 0$ ចំពោះគ្រប់ $x \\in I$ នោះ $f$ ជាអនុគមន៍ **ចុះដាច់ខាត** លើ $I$។\n- បើ $f'(x) = 0$ ចំពោះគ្រប់ $x \\in I$ នោះ $f$ ជាអនុគមន៍ **ថេរ** លើ $I$។\n\n## ២. ការស្រាវជ្រាវបរមាធៀប (Extrema)\n### លក្ខខណ្ឌគ្រប់គ្រាន់\nបើ $f'(x_0) = 0$ ហើយ $f'(x)$ ប្តូរសញ្ញានៅពេលឆ្លងកាត់ $x_0$ នោះ៖\n- ប្តូរសញ្ញាពី **$+$ ទៅ $-$** $\\implies f(x_0)$ ជា **តម្លៃអតិបរមាធៀប (Local Maximum)**\n- ប្តូរសញ្ញាពី **$-$ ទៅ $+$** $\\implies f(x_0)$ ជា **តម្លៃអប្បបរមាធៀប (Local Minimum)**\n\n> **ដេរីវេទីពីរ $f''(x)$៖**\n> - $f'(x_0) = 0$ និង $f''(x_0) < 0 \\implies$ អតិបរមា\n> - $f'(x_0) = 0$ និង $f''(x_0) > 0 \\implies$ អប្បបរមា",
    body_en: "## Monotonicity & Extrema\nFirst derivative sign determines intervals of increase and decrease. Sign change across critical points defines local maxima and minima.",
  },

  {
    id: "les-g12-math-16",
    grade: 12,
    sort_order: 16,
    title_km: "សិក្សា និងសង់ក្រាបនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត",
    title_en: "Curve Sketching: Exponential & Logarithmic Functions",
    summary_km: "ជំហានពេញលេញក្នុងការសិក្សាអនុគមន៍បាក់ឌុប ដែនកំណត់ ដេរីវេ តារាងអថេរភាព អាស៊ីមតូត និងសង់ក្រាប (C)",
    summary_en: "Step-by-step curve sketching protocol for Bac II: domain, limits, derivative, table of variation, and Cartesian plotting",
    xp_reward: 50,
    estimated_minutes: 30,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-16" },
    body_km: "## ជំហានទាំង ៥ នៃការសិក្សាអនុគមន៍បាក់ឌុប\n1. **ដែនកំណត់ (Domain) ៖** កំណត់ចន្លោះអត្ថិភាពនៃអនុគមន៍ $D_f$។\n2. **ទិសដៅអថេរភាព ៖**\n   - គណនាដេរីវេ $f'(x)$ និងរកឫស $f'(x) = 0$។\n   - សិក្សាសញ្ញា $f'(x)$ និងទាញរកតម្លៃបរមា។\n3. **លីមីត និងអាស៊ីមតូត ៖**\n   - គណនាលីមីតចុងដែនកំណត់។\n   - កំណត់សមីការអាស៊ីមតូតឈរ ដេក ឬទ្រេត (បើមាន)។\n4. **តារាងអថេរភាព (Variation Table) ៖**\n   - រៀបចំជួរដេក $x, f'(x), f(x)$ ឱ្យស្របតាមទិសដៅព្រួញ។\n5. **សង់ក្រាប $(C)$ ៖**\n   - រកចំណុចប្រសព្វរវាងក្រាប $(C)$ ជាមួយអ័ក្ស $Ox$ ($y = 0$) និង $Oy$ ($x = 0$)។\n   - សង់អាស៊ីមតូត ចំណុចកំពូល រួចគូសខ្សែកោងរលូន។",
    body_en: "## Complete Curve Sketching Protocol\nFollow the MoEYS standard 5-step analysis: domain identification, derivative and extrema test, boundary limits and asymptotes, variation table, and precision Cartesian curve plotting.",
  },

  {
    id: "les-g12-math-14-p1",
    grade: 12,
    sort_order: 141,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ រូបមន្តដេរីវេ និងអនុគមន៍បណ្តាក់",
    title_en: "Practice Lab: Differentiating Composite Functions",
    summary_km: "លំហាត់គណនាដេរីវេអនុគមន៍បណ្តាក់ (u^n)', (e^u)', (ln u)', (sin u)' និងសមីការបន្ទាត់ប៉ះ",
    summary_en: "Hands-on derivative exercises for chain rule, composite exponentials, and tangent line calculations",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-14" },
    body_km: "## លំហាត់អនុវត្តដេរីវេ និងអនុគមន៍បណ្តាក់\\n\\n### លំហាត់គំរូ ៖ គណនាដេរីវេ\\nរកដេរីវេនៃ $f(x) = (3x^2 - 1)^4$\\n- តាមរូបមន្ត $(u^n)' = n u' u^{n-1}$\\n- $u = 3x^2 - 1 \\implies u' = 6x$\\n- $f'(x) = 4 \\cdot (6x) \\cdot (3x^2 - 1)^3 = 24x(3x^2 - 1)^3$",
    body_en: "Practice calculating derivatives of composite functions using the chain rule.",
  },

  {
    id: "les-g12-math-15-p1",
    grade: 12,
    sort_order: 151,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ តារាងអថេរភាព និងចំណុចបរមា",
    title_en: "Practice Lab: Variation Tables & Finding Extrema",
    summary_km: "លំហាត់គណនាដេរីវេ សិក្សាសញ្ញា និងសង់តារាងអថេរភាពដើម្បីទាញរកតម្លៃអតិបរមា និងអប្បបរមា",
    summary_en: "Exercises on constructing variation tables and determining relative extrema",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-15" },
    body_km: "## លំហាត់អនុវត្តតារាងអថេរភាព និងបរមា\\n\\n### លំហាត់គំរូ\\nរកតម្លៃបរមានៃ $f(x) = x^3 - 3x + 2$\\n- $f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x - 1)(x + 1)$\\n- $f'(x) = 0 \\iff x = 1$ ឬ $x = -1$\\n- ត្រង់ $x = -1$៖ $f'(x)$ ប្តូរសញ្ញាពី $+$ ទៅ $-$ $\\implies f(-1) = 4$ ជាតម្លៃអតិបរមាធៀប\\n- ត្រង់ $x = 1$៖ $f'(x)$ ប្តូរសញ្ញាពី $-$ ទៅ $+$ $\\implies f(1) = 0$ ជាតម្លៃអប្បបរមាធៀប",
    body_en: "Constructing variation tables and identifying local extrema via first derivative signs.",
  },

  {
    id: "les-g12-math-16-p1",
    grade: 12,
    sort_order: 161,
    title_km: "វិញ្ញាសាអនុវត្តបាក់ឌុប ៖ សិក្សា និងសង់ក្រាបអនុគមន៍",
    title_en: "Bac II Exam Challenge: Curve Sketching Mastery",
    summary_km: "វិញ្ញាសាសាកល្បងបាក់ឌុបពេញលេញ ដែនកំណត់ ដេរីវេ អាស៊ីមតូត តារាងអថេរភាព និងសង់ក្រាប (C)",
    summary_en: "Complete Bac II standard examination problem on analytical function curve sketching",
    xp_reward: 65,
    estimated_minutes: 30,
    lessonType: "exam_prep",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-16" },
    body_km: "## វិញ្ញាសាអនុវត្តបាក់ឌុបបញ្ចប់ជំពូកទី ២ (ពិន្ទុពេញ ៣០)\\n\\n### ប្រធានវិញ្ញាសា\\nគេឱ្យអនុគមន៍ $f(x) = (x - 2)e^x$ មានក្រាបតំណាង $(C)$។\\n1. រកដែនកំណត់នៃអនុគមន៍ $f$។\\n2. គណនាលីមីតចុងដែន $\\lim_{x \\to +\\infty} f(x)$ និង $\\lim_{x \\to -\\infty} f(x)$។\\n3. គណនាដេរីវេ $f'(x)$ និងសង់តារាងអថេរភាព។\\n4. រកសមីការបន្ទាត់ប៉ះនឹងក្រាប $(C)$ ត្រង់ចំណុចប្រសព្វរវាង $(C)$ ជាមួយអ័ក្ស $Ox$។\\n5. សង់ក្រាប $(C)$ ក្នុងតម្រុយអរតូណរម៉េ។",
    body_en: "Bac II standard challenge problem studying exponential function f(x) = (x - 2)e^x and plotting its curve.",
  },

  {
    id: "les-g12-math-17",
    grade: 12,
    sort_order: 17,
    title_km: "វិធីសាស្ត្រអាំងតេក្រាលដោយផ្នែក និងប្តូរអថេរ",
    title_en: "Integration by Parts & Variable Substitution",
    summary_km: "បច្ចេកទេសគណនាអាំងតេក្រាលលំបាកក្នុងវិញ្ញាសាបាក់ឌុបតាមរូបមន្ត ∫ u dv = uv - ∫ v du និងតាងអថេរ t = g(x)",
    summary_en: "Advanced integration methods for Bac II exams: integration by parts ∫ u dv = uv - ∫ v du and algebraic u-substitution",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-17" },
    body_km: "## ១. រូបមន្តអាំងតេក្រាលដោយផ្នែក\n$$\\int_a^b u(x) v'(x) \\, dx = [u(x)v(x)]_a^b - \\int_a^b v(x) u'(x) \\, dx$$\n\n### គោលការណ៍ជ្រើសរើស $u$ តាមក្បួន «ALPET»\n1. **A**rc (អនុគមន៍ច្រាសត្រីកោណមាត្រ)\n2. **L**og (អនុគមន៍លោការីត $\\ln x$)\n3. **P**olynomial (ពហុធា $x^n, P(x)$)\n4. **E**xponential (អនុគមន៍អិចស្ប៉ូណង់ស្យែល $e^x$)\n5. **T**rigonometric (អនុគមន៍ត្រីកោណមាត្រ $\\sin x, \\cos x$)\n\n> **ឧទាហរណ៍៖** គណនា $J = \\int_1^e x \\ln x \\, dx$\n> តាង $u = \\ln x \\implies du = \\frac{1}{x} dx$\n> $dv = x dx \\implies v = \\frac{x^2}{2}$\n> $$J = \\left[ \\frac{x^2}{2} \\ln x \\right]_1^e - \\int_1^e \\frac{x^2}{2} \\cdot \\frac{1}{x} \\, dx = \\frac{e^2}{2} - \\left[ \\frac{x^2}{4} \\right]_1^e = \\frac{e^2}{2} - \\left(\\frac{e^2}{4} - \\frac{1}{4}\\right) = \\frac{e^2 + 1}{4}$$",
    body_en: "## Advanced Integration Techniques\nIntegration by parts using the ALPET precedence hierarchy for selecting u and dv. Definite evaluation protocols and changing integration bounds.",
  },

  {
    id: "les-g12-math-18",
    grade: 12,
    sort_order: 18,
    title_km: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់២ មិនអូម៉ូសែន",
    title_en: "Second-Order Non-Homogeneous Linear ODEs",
    summary_km: "ដោះស្រាយសមីការ ay'' + by' + cy = f(x) រកចម្លើយទូទៅ y = y_h + y_p ដែល y_h ជាចម្លើយអូម៉ូសែន និង y_p ជាចម្លើយដោយឡែក",
    summary_en: "Solving second-order non-homogeneous linear ODEs ay'' + by' + cy = f(x) via complementary solution plus particular integral",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-18" },
    body_km: "## ១. ទម្រង់ទូទៅនៃសមីការ\n$$ay'' + by' + cy = f(x) \\quad (a \\neq 0)$$\nចម្លើយទូទៅនៃសមីការមានរាង៖\n$$y(x) = y_h(x) + y_p(x)$$\n- $y_h(x)$ ៖ ចម្លើយទូទៅនៃសមីការអូម៉ូសែន $ay'' + by' + cy = 0$\n- $y_p(x)$ ៖ ចម្លើយដោយឡែកមួយនៃសមីការមិនអូម៉ូសែន\n\n## ២. វិធីសាស្ត្រស្វែងរកចម្លើយដោយឡែក $y_p(x)$\n- បើ $f(x) = P_n(x)$ ជាពហុធាដឺក្រេ $n$៖\n  - បើ $c \\neq 0$ យក $y_p = Q_n(x)$\n  - បើ $c = 0, b \\neq 0$ យក $y_p = x Q_n(x)$\n- បើ $f(x) = k e^{\\alpha x}$៖\n  - បើ $\\alpha$ មិនមែនជាឫសសមីការសម្គាល់ យក $y_p = A e^{\\alpha x}$\n  - បើ $\\alpha$ ជាឫសទោល យក $y_p = A x e^{\\alpha x}$\n  - បើ $\\alpha$ ជាឫសឌុប យក $y_p = A x^2 e^{\\alpha x}$",
    body_en: "## Non-Homogeneous Second-Order ODEs\nGeneral solution structure y = y_h + y_p. Characteristic equation solution for y_h combined with method of undetermined coefficients for particular solution y_p.",
  },

  {
    id: "les-g12-math-19",
    grade: 12,
    sort_order: 19,
    title_km: "ឫសទី n នៃចំនួនកុំផ្លិច និងសមីការដឺក្រេទី ២ ក្នុង C",
    title_en: "nth Roots of Complex Numbers & Quadratic Equations in C",
    summary_km: "រូបមន្តរកឬសទី n នៃចំនួនកុំផ្លិច w_k = r^(1/n) [cos((θ+2kπ)/n) + i sin((θ+2kπ)/n)] និងដោះស្រាយសមីការដឺក្រេទី២ ក្នុង C",
    summary_en: "nth roots of complex numbers, geometric vertices of regular polygons on the complex plane, and quadratic equations in C",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-19" },
    body_km: "## ១. រូបមន្តឫសទី $n$ នៃចំនួនកុំផ្លិច\nបើ $z = r(\\cos \\theta + i \\sin \\theta)$ នោះឫសទី $n$ ទាំង $n$ នៃ $z$ កំណត់ដោយ៖\n$$w_k = \\sqrt[n]{r} \\left[ \\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i \\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right) \\right], \\quad k = 0, 1, 2, \\dots, n-1$$\n- រូបភាពនៃឫសទាំង $n$ គឺជាកំពូលនៃពហុកោណទៀងទាត់មាន $n$ ជ្រុង ចារឹកក្នុងរង្វង់ផ្ចិត $O$ កាំ $R = \\sqrt[n]{r}$។\n\n## ២. សមីការដឺក្រេទី ២ ក្នុងសំណុំ $\\mathbb{C}$\nចំពោះសមីការ $az^2 + bz + c = 0$ ($a, b, c \\in \\mathbb{R}, a \\neq 0$)៖\n$$\\Delta = b^2 - 4ac$$\n- បើ $\\Delta > 0$ ៖ មានឫសពិតពីរ $z_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$\n- បើ $\\Delta = 0$ ៖ មានឫសឌុប $z_0 = -\\frac{b}{2a}$\n- បើ $\\Delta < 0$ ៖ មានឫសកុំផ្លិចឆ្លាស់គ្នាពីរ $z_{1,2} = \\frac{-b \\pm i\\sqrt{|\\Delta|}}{2a}$",
    body_en: "## Complex Roots and Quadratics in C\nDe Moivre nth roots formula generating regular polygons on the Argand plane. Quadratic solutions with negative discriminants producing complex conjugate root pairs.",
  },

  {
    id: "les-g12-math-20",
    grade: 12,
    sort_order: 20,
    title_km: "ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ និងរូបមន្តបេយេស",
    title_en: "Conditional Probability & Bayes' Formula",
    summary_km: "ប្រូបាបលក្ខខណ្ឌ P(A|B) = P(A ∩ B) / P(B) ព្រឹត្តិការណ៍ឯករាជ្យ ដ្យាក្រាមដើមឈើ និងរូបមន្តប្រូបាបសរុប",
    summary_en: "Conditional probability P(A|B), independent events, tree diagrams, law of total probability, and Bayes' theorem",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-20" },
    body_km: "## ១. និយមន័យប្រូបាបមានលក្ខខណ្ឌ\nប្រូបាបនៃព្រឹត្តិការណ៍ $A$ ដោយដឹងថាព្រឹត្តិការណ៍ $B$ បានកើតឡើងរួចហើយ ($P(B) > 0$) គឺ៖\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$\nទាញបានរូបមន្តគុណប្រូបាប៖ $P(A \\cap B) = P(B) \\times P(A|B) = P(A) \\times P(B|A)$\n\n## ២. ព្រឹត្តិការណ៍មិនទាក់ទងគ្នា (ឯករាជ្យ)\nព្រឹត្តិការណ៍ $A$ និង $B$ ឯករាជ្យគ្នា លុះត្រាតែ៖\n$$P(A \\cap B) = P(A) \\times P(B)$$\nឬ $P(A|B) = P(A)$\n\n## ៣. រូបមន្តប្រូបាបសរុប និងរូបមន្តបេយេស (Bayes)\nបើ $(B_1, B_2, \\dots, B_n)$ ជាប្រព័ន្ធពេញលេញនៃព្រឹត្តិការណ៍ នោះចំពោះគ្រប់ព្រឹត្តិការណ៍ $A$៖\n$$P(A) = \\sum_{i=1}^n P(B_i) \\cdot P(A|B_i)$$\n$$P(B_k|A) = \\frac{P(B_k) \\cdot P(A|B_k)}{\\sum_{i=1}^n P(B_i) \\cdot P(A|B_i)}$$",
    body_en: "## Conditional Probability & Bayes\nConditional probability definition P(A|B) = P(A ∩ B)/P(B), statistical independence criteria, and total probability law with Bayes' theorem.",
  },

  {
    id: "les-g12-math-21",
    grade: 12,
    sort_order: 21,
    title_km: "ផលគុណវ៉ិចទ័រ ផលគុណចម្រុះ និងមាឌប្រលេពីប៉ែតក្នុងលំហ Oxyz",
    title_en: "Cross Product, Mixed Product & Volume in Space Oxyz",
    summary_km: "ការគណនាផលគុណវ៉ិចទ័រ u ✕ v ក្រឡាផ្ទៃត្រីកោណ ក្រឡាផ្ទៃប្រឡេឡូក្រាម និងមាឌប្រលេពីប៉ែត V = |(u ✕ v) · w|",
    summary_en: "Vector cross products, planar triangle and parallelogram areas, scalar triple products, and parallelepiped volumes",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-21" },
    body_km: "## ១. ផលគុណវ៉ិចទ័រ (Cross Product)\nចំពោះ $\\vec{u} = (x_1, y_1, z_1)$ និង $\\vec{v} = (x_2, y_2, z_2)$៖\n$$\\vec{u} \\times \\vec{v} = \\left( \\begin{vmatrix} y_1 & z_1 \\\\ y_2 & z_2 \\end{vmatrix}, -\\begin{vmatrix} x_1 & z_1 \\\\ x_2 & z_2 \\end{vmatrix}, \\begin{vmatrix} x_1 & y_1 \\\\ x_2 & y_2 \\end{vmatrix} \\right)$$\n- $\\vec{u} \\times \\vec{v}$ ជាវ៉ិចទ័រកែងនឹងទាំង $\\vec{u}$ និង $\\vec{v}$។\n- $\\vec{u} \\parallel \\vec{v} \\iff \\vec{u} \\times \\vec{v} = \\vec{0}$\n\n## ២. អនុវត្តគណនាក្រឡាផ្ទៃ\n- ក្រឡាផ្ទៃប្រលេឡូក្រាមសង់លើ $\\vec{u}, \\vec{v}$ ៖ $S = ||\\vec{u} \\times \\vec{v}||$\n- ក្រឡាផ្ទៃត្រីកោណ $ABC$ ៖ $S_{\\triangle ABC} = \\frac{1}{2} ||\\vec{AB} \\times \\vec{AC}||$\n\n## ៣. ផលគុណចម្រុះ និងមាឌប្រលេពីប៉ែត (Mixed Product)\nមាឌប្រលេពីប៉ែតសង់លើវ៉ិចទ័រ $\\vec{u}, \\vec{v}, \\vec{w}$ គឺ៖\n$$V = |(\\vec{u} \\times \\vec{v}) \\cdot \\vec{w}|$$\n- មាឌតេត្រាអ៊ែត $ABCD$ ៖ $V = \\frac{1}{6} |(\\vec{AB} \\times \\vec{AC}) \\cdot \\vec{AD}|$",
    body_en: "## 3D Vector Cross and Mixed Products\nVector cross product calculation, orthogonality properties, area calculations for triangles and parallelograms, and scalar triple product for volumes.",
  },

  // ============================================================================
  // GRADE 12 MATHEMATICS EXPANDED MASTERY ROADMAP (MOEYS BAC II NATIONAL EXAM)
  // ============================================================================

  // Unit 3: Integrals Expanded
  {
    id: "les-g12-math-17-p1",
    grade: 12,
    sort_order: 22,
    title_km: "អាំងតេក្រាលដោយវិធីប្តូរអថេរ u = g(x)",
    title_en: "Integration by Substitution Method u = g(x)",
    summary_km: "វិធីសាស្ត្រជ្រើសរើស u = g(x) គណនា du = g'(x)dx និងការប្តូរព្រំដែនអាំងតេក្រាលកំណត់",
    summary_en: "Substitution technique u = g(x), differential transformation du = g'(x)dx, and limit transposition for definite integrals",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-17-p1" },
    body_km: `## ១. រូបមន្តប្តូរអថេរ
$$\\int f(g(x)) g'(x) dx = \\int f(u) du \\quad (\\text{ដោយ } u = g(x), du = g'(x) dx)$$

## ២. ចំពោះអាំងតេក្រាលកំណត់ (ប្តូរព្រំដែន)
$$\\int_a^b f(g(x)) g'(x) dx = \\int_{g(a)}^{g(b)} f(u) du$$
- នៅពេលប្តូរព្រំរួច **មិនបាច់ប្តូរត្រឡប់មកអថេរ $x$ វិញទេ** គឺជំនួសគណនាផ្ទាល់លើអថេរ $u$។`,
    body_en: "## Integration by Substitution\nu-substitution rule for indefinite and definite integrals with rigorous boundary transposition.",
  },

  {
    id: "les-g12-math-17-p2",
    grade: 12,
    sort_order: 23,
    title_km: "អាំងតេក្រាលដោយផ្នែកកម្រិតខ្ពស់ និងអាំងតេក្រាលវដ្ត",
    title_en: "Advanced Integration by Parts & Cyclic Integrals",
    summary_km: "អាំងតេក្រាលវដ្ត ∫e^(ax) cos(bx) dx វិធីសាស្ត្រតាង u, dv ពីរដង និងការទាញរកតម្លៃអាំងតេក្រាល I",
    summary_en: "Cyclic integration by parts for exponential-trigonometric products ∫e^(ax) cos(bx) dx, and two-stage integration loops",
    xp_reward: 50,
    estimated_minutes: 28,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-17-p2" },
    body_km: `## ១. រូបមន្តអាំងតេក្រាលដោយផ្នែក
$$\\int u dv = uv - \\int v du$$
- លំដាប់អាទិភាពជ្រើសរើស $u$ តាមក្បួន **LIATE** ៖
  1. $L$ (Logarithmic ៖ $\\ln x$)
  2. $I$ (Inverse trigonometric ៖ $\\arcsin x$)
  3. $A$ (Algebraic ៖ $x^n$)
  4. $T$ (Trigonometric ៖ $\\sin x, \\cos x$)
  5. $E$ (Exponential ៖ $e^x$)

## ២. អាំងតេក្រាលវដ្ត (Cyclic Integral)
ឧទាហរណ៍ ៖ $I = \\int e^x \\cos x dx$
- ធ្វើអាំងតេក្រាលដោយផ្នែក ២ ដង នឹងលេចឡើង $-I$ នៅអង្គខាងស្តាំ ៖
  $$I = e^x \\sin x + e^x \\cos x - I \\implies 2I = e^x(\\sin x + \\cos x) \\implies I = \\frac{e^x(\\sin x + \\cos x)}{2} + C$$`,
    body_en: "## Advanced Integration by Parts\nLIATE mnemonic hierarchy, cyclic recursions, and algebraic resolution of looped integrals.",
  },

  {
    id: "les-g12-math-17-p3",
    grade: 12,
    sort_order: 24,
    title_km: "ការគណនាផ្ទៃក្រឡាខណ្ឌដោយក្រាបពីរ និងមាឌសូលីតបង្វិល",
    title_en: "Bounded Areas Between Curves & Solids of Revolution",
    summary_km: "ផ្ទៃក្រឡា S = ∫|f(x) - g(x)|dx រកចំណុចប្រសព្វ និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស Ox: V = π∫f²(x)dx",
    summary_en: "Area bounded between intersecting curves S = ∫|f(x) - g(x)|dx and solid of revolution volume around Ox: V = pi ∫ f^2(x) dx",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-17-p3" },
    body_km: `## ១. ផ្ទៃក្រឡាខណ្ឌដោយក្រាបពីរ $(C_f)$ និង $(C_g)$
$$S = \\int_a^b [f(x) - g(x)] dx \\quad (\\text{បើ } f(x) \\ge g(x) \\text{ លើ } [a, b])$$
- បើមិនស្គាល់ព្រំដែន $a, b$ ៖ ដោះស្រាយសមីការអាប់ស៊ីសចំណុចប្រសព្វ $f(x) = g(x)$។

## ២. មាឌសូលីតបង្វិលជុំវិញអ័ក្ស $Ox$
$$V = \\pi \\int_a^b [f(x)]^2 dx$$
- បើខណ្ឌដោយក្រាបពីរ ៖ $V = \\pi \\int_a^b |[f(x)]^2 - [g(x)]^2| dx$`,
    body_en: "## Area & Revolution Volumes\nDefinite integral formulas for area between intersecting curves and solid revolution volumes around the horizontal x-axis.",
  },

  // Unit 4: Differential Equations Expanded
  {
    id: "les-g12-math-18-p1",
    grade: 12,
    sort_order: 25,
    title_km: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ២ មាន Δ < 0 (ឫសកុំផ្លិច)",
    title_en: "Second-Order Linear ODEs with Complex Roots (Δ < 0)",
    summary_km: "សមីការសម្គាល់មានឫសកុំផ្លិច r = α ± iβ ចម្លើយទូទៅ y = e^(αx)(A cos βx + B sin βx)",
    summary_en: "Characteristic equation with complex conjugate roots r = alpha ± i*beta, general harmonic-exponential solution",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-18-p1" },
    body_km: `## សមីការ $ay'' + by' + cy = 0$ ករណី $\\Delta < 0$
សមីការសម្គាល់ $ar^2 + br + c = 0$ មាន $\\Delta = b^2 - 4ac < 0$ នាំឱ្យមានឫសកុំផ្លិចឆ្លាស់គ្នា ៖
$$r_1 = \\alpha + i\\beta, \\quad r_2 = \\alpha - i\\beta \\quad (\\alpha = -\\frac{b}{2a}, \\beta = \\frac{\\sqrt{|\\Delta|}}{2a})$$

- **ចម្លើយទូទៅគឺ៖**
  $$y = e^{\\alpha x} (A \\cos \\beta x + B \\sin \\beta x) \\quad (A, B \\in \\mathbb{R})$$
- បើ $\\alpha = 0$ ($y'' + \\omega^2 y = 0$) ៖ ចម្លើយជាលំយោលសុទ្ធ $y = A\\cos\\omega x + B\\sin\\omega x$។`,
    body_en: "## Second-Order ODEs Complex Case\nGeneral solution for negative discriminant characteristic equations yielding damped harmonic oscillations.",
  },

  {
    id: "les-g12-math-18-p2",
    grade: 12,
    sort_order: 26,
    title_km: "សមីការឌីផេរ៉ង់ស្យែលមិនអូម៉ូសែន និងចម្លើយដោយឡែក",
    title_en: "Non-Homogeneous ODEs & Particular Solutions",
    summary_km: "ទម្រង់ y = yh + yp វិធីរកចម្លើយដោយឡែក yp ចំពោះអង្គទីពីរជាពហុធា P(x) ឬ ke^(αx)",
    summary_en: "Method of undetermined coefficients: full solution y = yh + yp, finding particular solution yp for polynomials and exponentials",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-18-p2" },
    body_km: `## ១. ទម្រង់ចម្លើយទូទៅ
$$y'' + ay' + by = f(x)$$
$$y = y_h + y_p$$
- $y_h$ ៖ ចម្លើយទូទៅនៃសមីការអូម៉ូសែន ($y'' + ay' + by = 0$)
- $y_p$ ៖ ចម្លើយដោយឡែកមួយនៃសមីការមិនអូម៉ូសែន

## ២. ការជ្រើសរើសទម្រង់ $y_p$
- បើ $f(x) = P_n(x)$ (ពហុធាដឺក្រេ $n$) ៖ សន្មត $y_p = Q_n(x)$
- បើ $f(x) = k e^{\\alpha x}$ (អនុគមន៍អិចស្បូណង់ស្យែល) ៖
  - បើ $\\alpha$ មិនមែនជាឫសសមីការសម្គាល់ ៖ $y_p = A e^{\\alpha x}$
  - បើ $\\alpha$ ជាឫសទោល ៖ $y_p = A x e^{\\alpha x}$`,
    body_en: "## Non-Homogeneous Differential Equations\nPrinciple of superposition y = yh + yp and method of undetermined coefficients for polynomial and exponential driving terms.",
  },

  {
    id: "les-g12-math-18-p3",
    grade: 12,
    sort_order: 27,
    title_km: "ការអនុវត្តសមីការឌីផេរ៉ង់ស្យែលក្នុងរូបវិទ្យា (លំយោល និងវិទ្យុសកម្ម)",
    title_en: "Physical Applications of Differential Equations",
    summary_km: "សមីការចលនាលំយោលប៉ោល m·x'' + k·x = 0 និងសមីការបំបែកវិទ្យុសកម្ម dN/dt = -λN",
    summary_en: "Harmonic oscillator equations m*x'' + k*x = 0 and nuclear radioactive decay dN/dt = -lambda*N in MoEYS Bac II exams",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-18-p3" },
    body_km: `## ១. ការបំបែកវិទ្យុសកម្ម
$$\\frac{dN}{dt} = -\\lambda N \\implies N(t) = N_0 e^{-\\lambda t}$$
- $N_0$ ៖ ចំនួនស្នូលវិទ្យុសកម្មដើមត្រង់ $t = 0$
- $T = \\frac{\\ln 2}{\\lambda}$ ៖ ខួបពាក់កណ្តាលជីវិត (Half-life)

## ២. ចលនាលំយោលមេកានិច
$$m x'' + k x = 0 \\iff x'' + \\omega_0^2 x = 0 \\quad (\\omega_0 = \\sqrt{\\frac{k}{m}})$$
$$x(t) = X_m \\cos(\\omega_0 t + \\varphi)$$`,
    body_en: "## Physics Modeling with ODEs\nExponential decay of radioactive isotopes and undamped harmonic spring oscillations.",
  },

  // Unit 5: Complex Numbers Expanded
  {
    id: "les-g12-math-19-p1",
    grade: 12,
    sort_order: 28,
    title_km: "រូបមន្តដឺម័រ (De Moivre) និងការគណនាស្វ័យគុណ zⁿ",
    title_en: "De Moivre's Theorem & High Exponents of Complex Numbers",
    summary_km: "រូបមន្ត [r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ) និងការអនុវត្តគណនា (1 + i√3)ⁿ ក្នុងបាក់ឌុប",
    summary_en: "De Moivre's formula [r(cos theta + i sin theta)]^n = r^n(cos n*theta + i sin n*theta) for evaluating high powers in Bac II",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-19-p1" },
    body_km: `## ១. ទ្រឹស្តីបទដឺម័រ (De Moivre's Theorem)
ចំពោះគ្រប់ចំនួនកុំផ្លិច $z = r(\\cos\\theta + i\\sin\\theta)$ និងគ្រប់ចំនួនគត់ $n \\in \\mathbb{Z}$៖
$$z^n = [r(\\cos\\theta + i\\sin\\theta)]^n = r^n [\\cos(n\\theta) + i\\sin(n\\theta)]$$

## ២. ជំហានគណនាស្វ័យគុណ $z^n$
1. បម្លែង $z$ ពីទម្រង់ពីជគណិត $a + bi$ ទៅជាទម្រង់ត្រីកោណមាត្រ $r(\\cos\\theta + i\\sin\\theta)$។
2. អនុវត្តរូបមន្តដឺម័រ ៖ ស្វ័យគុណលើម៉ូឌុល $r^n$ និងគុណ $n$ លើអាគុយម៉ង់ $n\\theta$។
3. បម្លែងត្រឡប់មកទម្រង់ពីជគណិតវិញ។`,
    body_en: "## De Moivre's Powers\nPowers of complex numbers calculated effortlessly in polar form by scaling modulus to r^n and multiplying argument by n.",
  },

  {
    id: "les-g12-math-19-p2",
    grade: 12,
    sort_order: 29,
    title_km: "ឫសទី n នៃចំនួនកុំផ្លិច និងពហុកោណនិយ័ត",
    title_en: "nth Roots of Complex Numbers & Regular Polygons",
    summary_km: "រូបមន្ត z_k = ⁿ√r [cos((θ+2kπ)/n) + i sin((θ+2kπ)/n)] និងការបង្ហាញចំណុចកំពូលពហុកោណ",
    summary_en: "Formula for the n distinct nth roots of z, complex nth roots of unity, and geometric representation as regular polygons",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-19-p2" },
    body_km: `## រូបមន្តឫសទី $n$ នៃចំនួនកុំផ្លិច
បើ $z = r(\\cos\\theta + i\\sin\\theta)$ ($r > 0$) នោះឫសទី $n$ នៃ $z$ មានចំនួន $n$ ឫសខុសៗគ្នា កំណត់ដោយ៖
$$z_k = \\sqrt[n]{r} \\left[ \\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right) \\right] \\quad (k = 0, 1, 2, \\dots, n - 1)$$

- **បកស្រាយធរណីមាត្រ ៖** រូបភាពតំណាងនៃឫសទាំង $n$ ស្ថិតនៅលើរង្វង់ផ្ចិត $O$ កាំ $R = \\sqrt[n]{r}$ ហើយជា **កំពូលនៃពហុកោណនិយ័តមាន $n$ ជ្រុង**។`,
    body_en: "## nth Roots of Complex Numbers\nThe n distinct complex roots evenly distributed along a circle of radius r^(1/n), forming vertices of an inscribed regular polygon.",
  },

  {
    id: "les-g12-math-19-p3",
    grade: 12,
    sort_order: 30,
    title_km: "បកស្រាយធរណីមាត្រនៃកុំផ្លិច ៖ ចម្ងាយ មុំ និងចំណុចរួមបន្ទាត់",
    title_en: "Geometric Applications of Complex Numbers: Distances & Collinearity",
    summary_km: "ចម្ងាយ AB = |zB - zA| មុំរវាងវ៉ិចទ័រ arg((zC - zA)/(zB - zA)) និងលក្ខខណ្ឌ ៣ ចំណុចរត់ត្រង់ជួរគ្នា",
    summary_en: "Distance between affixes |zB - zA|, angle of vectors via argument of quotients, and collinearity condition",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-19-p3" },
    body_km: `## ១. ប្រវែងអង្កត់ និងចម្ងាយ
$$AB = |z_B - z_A|$$

## ២. មុំតម្រង់ទិសរវាងវ៉ិចទ័រពីរ
$$(\\vec{AB}, \\vec{AC}) = \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right) \\pmod{2\\pi}$$

## ៣. លក្ខខណ្ឌ ៣ ចំណុចរត់ត្រង់ជួរគ្នា (Collinear Points)
ចំណុច $A, B, C$ រត់ត្រង់ជួរគ្នាលុះត្រាតែផលធៀបអាហ្វីចជា **ចំនួនពិត** ៖
$$\\frac{z_C - z_A}{z_B - z_A} \\in \\mathbb{R}$$
- បើ $\\frac{z_C - z_A}{z_B - z_A} \\in i\\mathbb{R}$ (ចំនួននិម្មិតសុទ្ធ) នោះ $AB \\perp AC$ (ត្រីកោណកែងត្រង់ $A$)។`,
    body_en: "## Geometric Affixes\nUsing complex affixes to compute Euclidean distances, angles between vectors, and collinearity checks.",
  },

  // Unit 6: Probability Expanded
  {
    id: "les-g12-math-20-p1",
    grade: 12,
    sort_order: 31,
    title_km: "ប្រូបាបលក្ខខណ្ឌ និងដ្យាក្រាមដើមឈើប្រូបាប",
    title_en: "Conditional Probability Trees & Sequential Trials",
    summary_km: "ការប្រើប្រាស់ដ្យាក្រាមដើមឈើ (Tree Diagram) គណនាប្រូបាបលក្ខខណ្ឌ និងការចាប់បាល់មានការសង និងគ្មានការសង",
    summary_en: "Probability tree diagrams for multi-stage sequential experiments: sampling with replacement versus without replacement",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-20-p1" },
    body_km: `## ១. ការចាប់បាល់គ្មានការសង (Without Replacement)
- ព្រឹត្តិការណ៍នីមួយៗ **អាស្រ័យគ្នា** (Dependent Events)។
- ចំនួនបាល់សរុប និងចំនួនបាល់នីមួយៗថយចុះ ១ បន្ទាប់ពីការចាប់ម្តងៗ។
- ប្រើដ្យាក្រាមដើមឈើដើម្បីគុណប្រូបាបតាមមែកធាង ៖ $P(A \\cap B) = P(A) \\cdot P(B|A)$។

## ២. ការចាប់បាល់ដោយមានការសង (With Replacement)
- ព្រឹត្តិការណ៍នីមួយៗ **ឯករាជ្យគ្នា** (Independent Events)។
- ប្រូបាបនៅតែដដែលគ្រប់ការសាកល្បងទាំងអស់ ៖ $P(A \\cap B) = P(A) \\cdot P(B)$។`,
    body_en: "## Probability Trees & Urn Models\nSampling with vs without replacement, conditional probabilities, and multiplication trees.",
  },

  {
    id: "les-g12-math-20-p2",
    grade: 12,
    sort_order: 32,
    title_km: "អថេរចៃដន្យដាច់ សង្ឃឹមគណិត E(X) និងវ៉ារ្យ៉ង់ V(X)",
    title_en: "Discrete Random Variables, Expectation E(X) & Variance V(X)",
    summary_km: "ច្បាប់បំណែងចែកប្រូបាប សង្ឃឹមគណិត E(X) = Σ xi·pi វ៉ារ្យ៉ង់ V(X) = E(X²) - [E(X)]² និងគម្លាតស្តង់ដារ",
    summary_en: "Probability mass functions, expected value E(X) = sum(xi*pi), variance V(X) = E(X^2) - [E(X)]^2, and standard deviation",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-20-p2" },
    body_km: `## ១. សង្ឃឹមគណិត (Mathematical Expectation)
$$E(X) = \\sum_{i=1}^n x_i \\cdot P(X = x_i)$$
- តំណាងឱ្យ **តម្លៃមធ្យម** នៃអថេរចៃដន្យ $X$ ក្នុងរយៈពេលវែង។

## ២. វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារ
$$V(X) = E(X^2) - [E(X)]^2 = \\sum_{i=1}^n x_i^2 P(X = x_i) - [E(X)]^2$$
$$\\sigma(X) = \\sqrt{V(X)}$$`,
    body_en: "## Discrete Random Variables\nProbability distributions, mathematical expectation as theoretical mean, and variance measuring spread.",
  },

  {
    id: "les-g12-math-20-p3",
    grade: 12,
    sort_order: 33,
    title_km: "បំណែងចែកទ្វេធា B(n, p) ក្នុងវិញ្ញាសាបាក់ឌុប",
    title_en: "Binomial Distribution B(n, p) for Bac II",
    summary_km: "ការសាកល្បងប៊ែរនូយី រូបមន្ត P(X = k) = C_n^k p^k (1 - p)^(n-k) សង្ឃឹមគណិត E(X) = np និង V(X) = np(1-p)",
    summary_en: "Bernoulli trials, binomial probability formula P(X = k) = C_n^k * p^k * q^(n-k), E(X) = np, and Bac II exam mastery",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-20-p3" },
    body_km: `## ១. លក្ខខណ្ឌនៃបំណែងចែកទ្វេធា
ការសាកល្បងមួយជាបំណែងចែកទ្វេធា $\\mathcal{B}(n, p)$ លុះត្រាតែ ៖
1. មានការសាកល្បង $n$ ដងដូចៗគ្នា និងឯករាជ្យគ្នា។
2. ការសាកល្បងនីមួយៗផ្តល់លទ្ធផលតែពីរយ៉ាង ៖ ជោគជ័យ (ប្រូបាប $p$) ឬ បរាជ័យ (ប្រូបាប $q = 1 - p$)។

## ២. រូបមន្តប្រូបាប
$$P(X = k) = C_n^k \\cdot p^k \\cdot (1 - p)^{n - k} \\quad (k = 0, 1, \\dots, n)$$
- **សង្ឃឹមគណិត ៖** $E(X) = np$
- **វ៉ារ្យ៉ង់ ៖** $V(X) = np(1 - p)$`,
    body_en: "## Binomial Probability\nFormulas for repeated independent Bernoulli trials, expectation np, and variance npq.",
  },

  // Unit 7: 3D Space Oxyz Expanded
  {
    id: "les-g12-math-21-p1",
    grade: 12,
    sort_order: 34,
    title_km: "សមីការប្លង់ក្នុងលំហ Oxyz និងចម្ងាយពីចំណុចទៅប្លង់",
    title_en: "Plane Equations & Point-to-Plane Distance in Oxyz",
    summary_km: "វ៉ិចទ័រណរម៉ាល់ n=(a,b,c) សមីការទូទៅ ax + by + cz + d = 0 និងរូបមន្តចម្ងាយ d(M, P)",
    summary_en: "Normal vector n = (a, b, c), general cartesian plane equation ax + by + cz + d = 0, and point-to-plane distance formula",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-21-p1" },
    body_km: `## ១. សមីការប្លង់កាត់តាម $M_0(x_0, y_0, z_0)$ មានវ៉ិចទ័រណរម៉ាល់ $\\vec{n} = (a, b, c)$
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$
$$\\iff ax + by + cz + d = 0 \\quad (\\text{ដោយ } d = -ax_0 - by_0 - cz_0)$$

## ២. រូបមន្តចម្ងាយពីចំណុច $M_0(x_0, y_0, z_0)$ ទៅប្លង់ $(P)$
$$d(M_0, (P)) = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$`,
    body_en: "## Plane Equations & Distances\nCartesian plane equations defined by normal vectors, and the standard point-to-plane distance formula.",
  },

  {
    id: "les-g12-math-21-p2",
    grade: 12,
    sort_order: 35,
    title_km: "សមីការបន្ទាត់ប៉ារ៉ាម៉ែត្រក្នុងលំហ និងចម្ងាយពីចំណុចទៅបន្ទាត់",
    title_en: "Parametric Line Equations & Point-to-Line Distance in Oxyz",
    summary_km: "វ៉ិចទ័រប្រាប់ទិស u=(a,b,c) សមីការប៉ារ៉ាម៉ែត្រ x = x0 + at, y = y0 + bt, z = z0 + ct និងចម្ងាយតាមផលគុណវ៉ិចទ័រ",
    summary_en: "Direction vectors, parametric line equations, symmetric equations, and distance from a point to a line via cross products",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-21-p2" },
    body_km: `## ១. សមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់ $(d)$ កាត់ $M_0(x_0, y_0, z_0)$ ទិស $\\vec{u} = (a, b, c)$
$$(d) : \\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\quad (t \\in \\mathbb{R})$$

## ២. ចម្ងាយពីចំណុច $A$ ទៅបន្ទាត់ $(d)$ កាត់ $M_0$ ទិស $\\vec{u}$
$$d(A, (d)) = \\frac{||\\vec{M_0 A} \\times \\vec{u}||}{||\\vec{u}||}$$`,
    body_en: "## 3D Parametric Lines\nVector representation of spatial lines and cross-product formula for perpendicular distance from a point to a line.",
  },

  {
    id: "les-g12-math-21-p3",
    grade: 12,
    sort_order: 36,
    title_km: "សមីការស្វ៊ែរ និងទីតាំងធៀបរវាងប្លង់ និងស្វ៊ែរក្នុងលំហ Oxyz",
    title_en: "Sphere Equations & Tangent Planes in Space Oxyz",
    summary_km: "សមីការស្វ៊ែរ (x-a)² + (y-b)² + (z-c)² = R² ផ្ចិត I(a,b,c) កាំ R និងលក្ខខណ្ឌប្លង់ប៉ះស្វ៊ែរ d(I, P) = R",
    summary_en: "Sphere equation centered at I(a,b,c) with radius R, and relative plane-sphere positioning criteria: intersecting circle vs tangent plane",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g12-math-21-p3" },
    body_km: `## ១. សមីការស្តង់ដានៃស្វ៊ែរ $(S)$ ផ្ចិត $I(a, b, c)$ កាំ $R$
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$
$$x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 \\quad (\\text{ដោយ } R = \\sqrt{a^2 + b^2 + c^2 - d})$$

## ២. ទីតាំងធៀបរវាងស្វ៊ែរ $(S)$ និងប្លង់ $(P)$
តាង $d = d(I, (P))$ ជាចម្ងាយពីផ្ចិតស្វ៊ែរទៅប្លង់៖
- $d > R$ ៖ ប្លង់ $(P)$ មិនកាត់ស្វ៊ែរ $(S)$ ទេ ($(P) \\cap (S) = \\emptyset$)
- $d = R$ ៖ ប្លង់ $(P)$ **ប៉ះស្វ៊ែរ** $(S)$ ត្រង់ចំណុចមួយ (ប្លង់ប៉ះ)
- $d < R$ ៖ ប្លង់ $(P)$ **កាត់ស្វ៊ែរ** $(S)$ តាមរង្វង់មួយដែលមានកាំ $r = \\sqrt{R^2 - d^2}$`,
    body_en: "## 3D Sphere Geometry\nEquations of spheres in Cartesian coordinates, plane-sphere intersection conditions, and tangent planes.",
  },

  {
    id: "les-g12-phys-06",
    grade: 12,
    sort_order: 6,
    title_km: "លំយោលបង្ខំ និងបាតុភូតរ៉េសូណង់មេកានិច",
    title_en: "Forced Oscillations & Mechanical Resonance",
    summary_km: "លំយោលបង្ខំដោយកម្លាំងក្រៅ ប្រេកង់ផ្ទាល់ ប្រេកង់បង្ខំ និងលក្ខខណ្ឌកើតបាតុភូតរ៉េសូណង់ក្នុងជីវភាពរស់នៅ",
    summary_en: "Forced oscillations driven by periodic external forces, natural vs driving frequency, and resonance phenomena",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-06" },
    body_km: "## ១. លំយោលបង្ខំ (Forced Oscillations)\nលំយោលបង្ខំ គឺជាលំយោលដែលកើតឡើងក្រោមឥទ្ធិពលនៃកម្លាំងកំហិតក្រៅខួប $F(t) = F_0 \\cos(\\omega t)$។\n- ប្រព័ន្ធលំយោលញ័រតាមប្រេកង់នៃកម្លាំងបង្ខំ $f$ មិនមែនប្រេកង់ផ្ទាល់ $f_0$ ឡើយ។\n\n## ២. បាតុភូតរ៉េសូណង់មេកានិច (Mechanical Resonance)\nបាតុភូតរ៉េសូណង់កើតឡើងនៅពេលប្រេកង់នៃកម្លាំងបង្ខំខិតទៅជិតស្មើនឹងប្រេកង់ផ្ទាល់នៃប្រព័ន្ធ ($f \\approx f_0$)៖\n- អំព្លីទុដនៃលំយោលកើនឡើងដល់កម្រិតអតិបរមា $A_{\\max}$។\n- ការកកិតកាន់តែតូច អំព្លីទុដរ៉េសូណង់កាន់តែស្រួច និងធំ។\n\n> **អនុវត្តជាក់ស្តែង៖** ការរចនាស្ពាន អគារខ្ពស់ៗត្រូវចៀសវាងរ៉េសូណង់ជាមួយកម្លាំងខ្យល់ ឬរញ្ជួយដី (ដូចករណីបាក់ស្ពាន Tacoma Narrows)។",
    body_en: "## Forced Oscillations & Resonance\nForced harmonic motion driven by periodic external forces. Resonance occurs when driving frequency matches natural frequency, driving oscillation amplitude to maximum.",
  },

  {
    id: "les-g12-phys-07",
    grade: 12,
    sort_order: 7,
    title_km: "រលកឈរលើខ្សែ និងបំពង់ខ្យល់",
    title_en: "Standing Waves on Strings & Air Columns",
    summary_km: "បាតុភូតរលកឈរ ថ្នាំងរលក ពោះរលក ចម្ងាយរវាងថ្នាំងពីរជាប់គ្នា λ/2 និងប្រេកង់រ៉េសូណង់នៃឧបករណ៍តន្ត្រី",
    summary_en: "Standing wave formation, nodes and antinodes, inter-node distance λ/2, and harmonic frequencies in musical acoustic systems",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-07" },
    body_km: "## ១. ការកកើតរលកឈរ (Standing Waves)\nរលកឈរកើតឡើងពីការជ្រៀតជ្រែកគ្នារវាងរលកដំណើរពីរមានអំព្លីទុដ និងប្រេកង់ដូចគ្នា ដែលផ្សាយកាត់គ្នាក្នុងទិសដៅផ្ទុយគ្នា។\n- **ថ្នាំង (Nodes) ៖** ចំណុចដែលនៅស្ងៀមជានិច្ច (អំព្លីទុដ $A = 0$)។\n- **ពោះ (Antinodes) ៖** ចំណុចដែលញ័រខ្លាំងបំផុត (អំព្លីទុដ $A = 2a$)។\n- ចម្ងាយរវាងថ្នាំងពីរជាប់គ្នា ឬពោះពីរជាប់គ្នាគឺ៖ $d = \\frac{\\lambda}{2}$\n\n## ២. លក្ខខណ្ឌរលកឈរលើខ្សែប្រវែង $L$\n### ក. ខ្សែចងភ្ជាប់សងខាង (ចុងទាំងពីរជាថ្នាំង)\n$$L = k \\frac{\\lambda}{2} = k \\frac{v}{2f} \\implies f_k = k \\frac{v}{2L} \\quad (k = 1, 2, 3, \\dots)$$\n- $k = 1$ ៖ សំឡេងគ្រឹះ (Fundamental Frequency)\n- $k > 1$ ៖ សំឡេងអាម៉ូនិចទី $k$",
    body_en: "## Standing Waves\nInterference of two identical counter-propagating waves producing stationary nodes and antinodes. Harmonic conditions on fixed strings and resonant air columns.",
  },

  {
    id: "les-g12-phys-08",
    grade: 12,
    sort_order: 8,
    title_km: "រលកសំឡេង កម្រិតអាំងតង់ស៊ីតេសំឡេង និងបាតុភូតដុបផ្លែ",
    title_en: "Sound Waves, Intensity Level & Doppler Effect",
    summary_km: "លក្ខណៈនៃរលកសំឡេង អាំងតង់ស៊ីតេ I = P / (4πr²) កម្រិតអាំងតង់ស៊ីតេ L = 10 log(I/I0) (dB) និងបាតុភូតដុបផ្លែ",
    summary_en: "Acoustic wave intensity, decibel scale L = 10 log(I/I0), threshold of hearing, and the Doppler frequency shift",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-08" },
    body_km: "## ១. អាំងតង់ស៊ីតេ និងកម្រិតអាំងតង់ស៊ីតេសំឡេង\n- អាំងតង់ស៊ីតេសំឡេង ៖ $I = \\frac{P}{S} = \\frac{P}{4\\pi r^2} \\quad (\\text{W/m}^2)$\n- កម្រិតអាំងតង់ស៊ីតេសំឡេងគិតជាដេស៊ីបែល (dB)៖\n$$L = 10 \\log_{10}\\left(\\frac{I}{I_0}\\right)$$\nដែល $I_0 = 10^{-12} \\, \\text{W/m}^2$ គឺជាអាំងតង់ស៊ីតេត្រចៀកចាប់ផ្តើមឮ (Hearing Threshold)។\n\n## ២. បាតុភូតដុបផ្លែ (Doppler Effect)\nការប្រែប្រួលប្រេកង់សំឡេងដែលអ្នកស្តាប់ទទួលឮ នៅពេលប្រភពសំឡេង និងអ្នកស្តាប់មានចលនាធៀបនឹងគ្នា៖\n$$f' = f \\left( \\frac{v \\pm v_O}{v \\mp v_S} \\right)$$\n- នៅពេលប្រភពខិតចូលជិតអ្នកស្តាប់ $\\implies f' > f$ (សំឡេងស្រួចជាងមុន)\n- នៅពេលប្រភពឃ្លាតឆ្ងាយពីអ្នកស្តាប់ $\\implies f' < f$ (សំឡេងគ្រលរជាងមុន)",
    body_en: "## Acoustics & Doppler Effect\nInverse square law for acoustic power spread. Decibel scale representation L = 10 log(I/I0). Frequency shift when observer or emitter moves relative to sound medium.",
  },

  {
    id: "les-g12-phys-09",
    grade: 12,
    sort_order: 9,
    title_km: "ដែនម៉ាញេទិច និងអាំងឌុចស្យុងអេឡិចត្រូម៉ាញេទិច",
    title_en: "Magnetic Fields & Electromagnetic Induction",
    summary_km: "ដែនម៉ាញេទិចនៃចរន្តអគ្គិសនី ហ្វ្លុចម៉ាញេទិច Φ = B S cos α ច្បាប់ហ្វារ៉ាដេ e = -dΦ/dt និងច្បាប់ឡិន្ស (Lenz)",
    summary_en: "Magnetic fields of currents, magnetic flux Φ = B · S, Faraday's law of induction e = -dΦ/dt, and Lenz's law",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-09" },
    body_km: "## ១. ហ្វ្លុចម៉ាញេទិច (Magnetic Flux)\nហ្វ្លុចម៉ាញេទិចកាត់ផ្ទៃ $S$ មួយក្នុងដែនម៉ាញេទិចឯកសណ្ឋាន $\\vec{B}$ គឺ៖\n$$\\Phi = B \\cdot S \\cdot \\cos\\alpha \\quad (\\text{Weber - Wb})$$\nដែល $\\alpha = (\\vec{n}, \\vec{B})$ ជាមុំរវាងវ៉ិចទ័រណរម៉ាល់នៃផ្ទៃ និងដែនម៉ាញេទិច។\n\n## ២. ច្បាប់ហ្វារ៉ាដេ និងច្បាប់ឡិន្ស\n- **ច្បាប់ហ្វារ៉ាដេ ៖** កម្លាំងអគ្គិសនីចលករអាំងឌ្វី $e$ សមាមាត្រនឹងល្បឿនបម្រែបម្រួលហ្វ្លុចម៉ាញេទិច៖\n$$e = -\\frac{d\\Phi}{dt} \\quad \\text{ឬ} \\quad e_{\\text{avg}} = -\\frac{\\Delta\\Phi}{\\Delta t}$$\n- **ច្បាប់ឡិន្ស ៖** ចរន្តអាំងឌ្វីតែងតែមានទិសដៅបង្កើតដែនម៉ាញេទិចអាំងឌ្វី $\\vec{B}_i$ ប្រឆាំងនឹងបម្រែបម្រួលហ្វ្លុចដែលបានបង្កើតវា។",
    body_en: "## Induction & Faraday's Law\nMagnetic flux definition through planar loops. Faraday's law stating electromotive force equals the negative time rate of flux change, governed by Lenz's conservation rule.",
  },

  {
    id: "les-g12-phys-10",
    grade: 12,
    sort_order: 10,
    title_km: "ត្រង់ស្វូ និងការបញ្ជូនថាមពលអគ្គិសនីផ្លូវឆ្ងាយ",
    title_en: "Transformers & High-Voltage Grid Transmission",
    summary_km: "គោលការណ៍ដំណើរការត្រង់ស្វូម៉ាទ័រ ផលធៀបបំលែង U2/U1 = N2/N1 = I1/I2 និងការកាត់បន្ថយការបាត់បង់ថាមពលកម្ដៅ Joule",
    summary_en: "Transformer principles, turns ratio equation U2/U1 = N2/N1 = I1/I2, and reducing Joule dissipation on power transmission grids",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-10" },
    body_km: "## ១. សមាមាត្របំលែងនៃត្រង់ស្វូ\nចំពោះត្រង់ស្វូសមស្រប (មិនគិតការបាត់បង់ថាមពល)៖\n$$\\frac{U_2}{U_1} = \\frac{N_2}{N_1} = \\frac{I_1}{I_2} = k$$\n- $k > 1$ ($N_2 > N_1$) ៖ ត្រង់ស្វូដំឡើងតង់ស្យុង (Step-Up Transformer)\n- $k < 1$ ($N_2 < N_1$) ៖ ត្រង់ស្វូបន្ថយតង់ស្យុង (Step-Down Transformer)\n\n## ២. ការបញ្ជូនថាមពលអគ្គិសនី និងការខាតបង់កម្ដៅហ្ស៊ូល\nអានុភាពបាត់បង់លើខ្សែបញ្ជូនតាមច្បាប់ហ្ស៊ូល គឺ៖\n$$P_{\\text{loss}} = R I^2 = R \\left( \\frac{P}{U \\cos\\varphi} \\right)^2$$\n- ដើម្បីកាត់បន្ថយ $P_{\\text{loss}}$ គេត្រូវ **ដំឡើងតង់ស្យុង $U$ ឱ្យខ្ពស់បំផុត** (តង់ស្យុងខ្ពស់ $500\\text{ kV}$) មុននឹងបញ្ជូនទៅកាន់បណ្តាញជាតិ។",
    body_en: "## Transformers & Grid Transmission\nTransformer turns ratio governing voltage stepping. High-voltage transmission drastically decreases current I, reducing Joule resistance heating loss by P = R * I^2.",
  },

  {
    id: "les-g12-phys-11",
    grade: 12,
    sort_order: 11,
    title_km: "ចំណាំងផ្លាតពន្លឺ និងព្រីស",
    title_en: "Refraction of Light & Prisms",
    summary_km: "ច្បាប់ដេកាត n1 sin i = n2 sin r ចំណាំងផ្លាតពេញលេញ និងរូបមន្តព្រីស A = r + r', D = i + i' - A",
    summary_en: "Snell-Descartes refraction law, total internal reflection, critical angle, and prism dispersion formulas",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-11" },
    body_km: "## ១. ច្បាប់ដេកាតស្តីពីចំណាំងផ្លាត\n$$n_1 \\sin i_1 = n_2 \\sin i_2$$\n- មុំកម្រិតចំណាំងផ្លាតពេញលេញ (Total Internal Reflection) កើតឡើងនៅពេលពន្លឺធ្វើដំណើរពីមជ្ឈដ្ឋានថ្លាជាងទៅមជ្ឈដ្ឋានរាវជាង ($n_1 > n_2$)៖\n$$\\sin i_{\\text{lim}} = \\frac{n_2}{n_1}$$\n\n## ២. រូបមន្តព្រីស (Prism Formulas)\n1. $\\sin i = n \\sin r$\n2. $\\sin i' = n \\sin r'$\n3. $A = r + r'$ (មុំកំពូលព្រីស)\n4. $D = i + i' - A$ (មុំលំងាក)",
    body_en: "## Refraction & Prism Optics\nSnell's law of refraction and total internal reflection criteria. Complete 4-formula prism framework for angular deviation and optical dispersion.",
  },

  {
    id: "les-g12-phys-12",
    grade: 12,
    sort_order: 12,
    title_km: "ឡង់ទីស្តើង និងឧបករណ៍អុបទិក",
    title_en: "Thin Lenses & Optical Instruments",
    summary_km: "រូបមន្តកុងស៊ូកង់ 1/f' = 1/d + 1/d' ពង្រីកធៀប γ = -d'/d និងដំណើរការនៃកែវយឹត និងមីក្រូទស្សន៍",
    summary_en: "Thin lens conjugation equation 1/f' = 1/d + 1/d', magnification ratio, and microscope/telescope optics",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-12" },
    body_km: "## ១. រូបមន្តកុងស៊ូកង់នៃឡង់ទីស្តើង\n$$\\frac{1}{f'} = \\frac{1}{d} + \\frac{1}{d'} \\quad \\text{ឬ} \\quad D = \\frac{1}{f'} \\quad (\\text{Diopter - } \\delta)$$\n- $f' > 0$ ៖ ឡង់ទីប្រមូល (Converging Lens)\n- $f' < 0$ ៖ ឡង់ទីបែក (Diverging Lens)\n- $d'$ វិជ្ជមាន $\\implies$ រូបភាពពិត (នៅខាងក្រោយឡង់ទី)\n- $d'$ អវិជ្ជមាន $\\implies$ រូបភាពនិម្មិត (នៅខាងមុខឡង់ទី)\n\n## ២. កត្តាពង្រីកធៀប (Magnification)\n$$\\gamma = \\frac{\\overline{A'B'}}{\\overline{AB}} = -\\frac{d'}{d}$$",
    body_en: "## Thin Lenses & Systems\nThin lens equation connecting object distance, image distance, and focal length. Transverse magnification calculations for microscopes and telescopes.",
  },

  {
    id: "les-g12-phys-13",
    grade: 12,
    sort_order: 13,
    title_km: "អន្តរាគមន៍ពន្លឺ និងឌីប្រាក់ស្យុងពន្លឺ",
    title_en: "Interference & Diffraction of Light",
    summary_km: "ការពិសោធន៍ប្រហោងយ៉ាំង (Young's Slits) ចន្លោះប្រឡោះ i = λD/a គម្លាតផ្លូវដើម δ = ax/D និងភស្តុតាងរលកនៃពន្លឺ",
    summary_en: "Young's double slit interference experiment, fringe spacing i = λD/a, path difference δ = ax/D, and wave nature of light",
    xp_reward: 50,
    estimated_minutes: 27,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-13" },
    body_km: "## ១. ការពិសោធន៍យ៉ាំង (Young's Double Slit)\n- គម្លាតផ្លូវដើមនៃកាំរស្មីពន្លឺពីប្រភពទាំងពីរទៅចំណុច $M$ លើអេក្រង់ គឺ៖\n$$\\delta = d_2 - d_1 = \\frac{a \\cdot x}{D}$$\n- **ប្រឡោះភ្លឺ (Bright Fringes) ៖** $\\delta = k \\lambda \\implies x_k = k \\frac{\\lambda D}{a} \\quad (k \\in \\mathbb{Z})$\n- **ប្រឡោះងងឹត (Dark Fringes) ៖** $\\delta = (2k + 1)\\frac{\\lambda}{2} \\implies x'_k = \\left(k + \\frac{1}{2}\\right) \\frac{\\lambda D}{a}$\n\n## ២. ចន្លោះប្រឡោះ (Fringe Width)\nចន្លោះរវាងប្រឡោះភ្លឺពីរជាប់គ្នា ឬប្រឡោះងងឹតពីរជាប់គ្នាគឺ៖\n$$i = \\frac{\\lambda D}{a}$$\n- បង្ហាញយ៉ាងច្បាស់ថាពន្លឺមាន **ធម្មជាតិជារលក** (Wave Nature of Light)។",
    body_en: "## Young's Slit Interference\nOptical path difference formulation. Constructive interference for bright fringes and destructive interference for dark fringes. Measurement of wavelength via fringe spacing.",
  },

  {
    id: "les-g12-phys-14",
    grade: 12,
    sort_order: 14,
    title_km: "ភូតូអេឡិចត្រិច និងកង់ទិចពន្លឺ",
    title_en: "Photoelectric Effect & Light Quanta",
    summary_km: "ការពិសោធន៍ហែក្ស សម្មតិកម្មផ្លង់ អែងស្តែង ថាមពលហ្វូតុង E = hf និងសមីការអែងស្តែង hf = W0 + Ec_max",
    summary_en: "Photoelectric threshold frequency, Planck hypothesis, Einstein's photon model, and kinetic equation hf = W0 + Kmax",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-14" },
    body_km: "## ១. សម្មតិកម្មហ្វូតុងរបស់អែងស្តែង\nពន្លឺផ្សាយចេញ និងស្រូបយកជាកញ្ចប់ថាមពលដាច់ៗពីគ្នា ហៅថា **ហ្វូតុង (Photon)** ៖\n$$E = hf = \\frac{hc}{\\lambda}$$\n- $h = 6.626 \\times 10^{-34} \\, \\text{J}\\cdot\\text{s}$ (ថេរផ្លង់)\n- $c = 3 \\times 10^8 \\, \\text{m/s}$ (ល្បឿនពន្លឺក្នុងសុញ្ញាកាស)\n\n## ២. សមីការភូតូអេឡិចត្រិចរបស់អែងស្តែង\n$$E = W_0 + E_{c,\\max} \\iff hf = hf_0 + \\frac{1}{2} m v_{\\max}^2$$\n- $W_0 = hf_0$ ៖ ការងារច្រានអេឡិចត្រុងចេញពីផ្ទៃលោហៈ (Work Function)\n- បាតុភូតភូតូអេឡិចត្រិចកើតឡើង លុះត្រាតែ $\\lambda \\le \\lambda_0$ ឬ $f \\ge f_0$។",
    body_en: "## Photoelectric Effect\nEinstein's photon energy E = hf. Work function barrier and threshold frequency governing photoelectron emission kinetic energy.",
  },

  {
    id: "les-g12-phys-15",
    grade: 12,
    sort_order: 15,
    title_km: "ប្រតិកម្មនុយក្លេអ៊ែរ ៖ ហ្វីស្យុង និងហ្វុយស្យុង",
    title_en: "Nuclear Reactions: Fission & Fusion",
    summary_km: "ច្បាប់រក្សា Soddy ក្នុងប្រតិកម្មនុយក្លេអ៊ែរ ប្រតិកម្មបំបែកស្នូលហ្វីស្យុង (Fission) និងប្រតិកម្មផ្សំស្នូលហ្វុយស្យុង (Fusion)",
    summary_en: "Nuclear conservation laws of Soddy, chain reaction fission mechanisms, and thermonuclear fusion energy",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g12-phys-15" },
    body_km: "## ១. ច្បាប់រក្សាសូឌី (Soddy's Conservation Laws)\nក្នុងប្រតិកម្មនុយក្លេអ៊ែរ $^{A_1}_{Z_1}X + ^{A_2}_{Z_2}Y \\to ^{A_3}_{Z_3}C + ^{A_4}_{Z_4}D$៖\n1. **រក្សាចំនួនម៉ាស (A) ៖** $A_1 + A_2 = A_3 + A_4$\n2. **រក្សាបន្ទុក (Z) ៖** $Z_1 + Z_2 = Z_3 + Z_4$\n\n## ២. ប្រតិកម្មហ្វីស្យុង (Nuclear Fission)\nស្នូលធ្ងន់ (ដូចជា $^{235}_{92}\\text{U}$) ស្រូបយកណឺត្រុងយឺតមួយ រួចបែកជាស្នូលស្រាលពីរ និងបញ្ចេញណឺត្រុង ២ ទៅ ៣ ទៀត ព្រមទាំងថាមពលកម្ដៅយ៉ាងមហាសាល។\n\n## ៣. ប្រតិកម្មហ្វុយស្យុង (Nuclear Fusion)\nស្នូលស្រាលពីរ (អ៊ីដ្រូសែន $^{2}_1\\text{H} + ^{3}_1\\text{H}$) រួបរួមគ្នាបង្កើតជាស្នូលធ្ងន់ជាង ($^{4}_2\\text{He} + ^{1}_0\\text{n}$) នៅក្រោមសីតុណ្ហភាពរាប់សិបលានអង្សា (ជាប្រភពថាមពលនៃព្រះអាទិត្យ)។",
    body_en: "## Nuclear Fission & Fusion\nSoddy's conservation laws for atomic mass and nuclear charge. Induced fission chain reactions and thermonuclear fusion powering stars.",
  },

  {
    id: "les-g12-chem-06",
    grade: 12,
    sort_order: 6,
    title_km: "កត្តាជះឥទ្ធិពលលើល្បឿនប្រតិកម្ម និងកាតាលីករ",
    title_en: "Factors Influencing Reaction Rates & Catalysis",
    summary_km: "ឥទ្ធិពលនៃកំហាប់ សីតុណ្ហភាព ផ្ទៃប៉ះ កាតាលីករ និងថាមពលសកម្មកម្ម Ea លើល្បឿនប្រតិកម្មគីមី",
    summary_en: "Effects of concentration, temperature, surface area, and catalysts on reaction kinetics and activation energy",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-06" },
    body_km: "## ១. កត្តាកំហាប់ និងសីតុណ្ហភាព\n- **កំហាប់អង្គធាតុប្រតិករ ៖** កាលណាកំហាប់កើនឡើង ចំនួនទង្គិចប្រសិទ្ធភាពក្នុងមួយខ្នាតមាឌកើនឡើង $\\implies$ ល្បឿនប្រតិកម្មកើនឡើង។\n- **សីតុណ្ហភាព ៖** សីតុណ្ហភាពកើនឡើង ភាគល្អិតមានថាមពលស៊ីនេទិចខ្ពស់ $\\implies$ ចំនួនទង្គិចមានថាមពលលើសថាមពលសកម្មកម្ម $E_a$ កើនឡើង។\n\n## ២. តួនាទីរបស់កាតាលីករ (Catalysts)\n- កាតាលីករជាសារធាតុដែលជួយបង្កើនល្បឿនប្រតិកម្មដោយ **បន្ទាបថាមពលសកម្មកម្ម $E_a$** ដោយមិនប្រែប្រួលម៉ាស ឬសមាសធាតុគីមីនៅចុងប្រតិកម្មឡើយ។",
    body_en: "## Reaction Rate Factors\nKinetic molecular collisions governed by concentration, temperature, and exposed area. Catalysts increase reaction rates by offering alternate pathways with lower activation energy.",
  },

  {
    id: "les-g12-chem-07",
    grade: 12,
    sort_order: 7,
    title_km: "គោលការណ៍ឡឺឆាតឺលីយេ និងការរំកិលលំនឹងគីមី",
    title_en: "Le Chatelier's Principle & Equilibrium Shift",
    summary_km: "ឥទ្ធិពលនៃការប្រែប្រួលកំហាប់ សីតុណ្ហភាព និងសម្ពាធ លើការរំកិលទិសដៅនៃលំនឹងគីមីតាមគោលការណ៍ Le Chatelier",
    summary_en: "Predicting chemical equilibrium shifts under perturbations in concentration, temperature, and pressure via Le Chatelier's principle",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-07" },
    body_km: "## គោលការណ៍ឡឺឆាតឺលីយេ (Le Chatelier's Principle)\nកាលណាគេធ្វើឱ្យមានការប្រែប្រួលលើកត្តាមួយ (កំហាប់ សីតុណ្ហភាព សម្ពាធ) នៃប្រព័ន្ធមួយដែលមានលំនឹង នោះប្រព័ន្ធនឹងរំកិលតាមទិសដៅណាដែល **ប្រឆាំងនឹងការប្រែប្រួលនោះ**។\n\n1. **ការប្រែប្រួលកំហាប់ ៖**\n   - បន្ថែមអង្គធាតុប្រតិករ $\\implies$ លំនឹងរំកិលទៅទិសដៅបង្កើតកកើត (ទិសដៅស្រប ១)\n   - បន្ថែមអង្គធាតុកកើត $\\implies$ លំនឹងរំកិលទៅទិសដៅបង្កើតប្រតិករ (ទិសដៅច្រាស ២)\n2. **ការប្រែប្រួលសីតុណ្ហភាព ៖**\n   - ដំឡើងសីតុណ្ហភាព $\\implies$ លំនឹងរំកិលទៅទិសដៅស្រូបកម្ដៅ (Endothermic $\\Delta H > 0$)\n   - បញ្ចុះសីតុណ្ហភាព $\\implies$ លំនឹងរំកិលទៅទិសដៅបញ្ចេញកម្ដៅ (Exothermic $\\Delta H < 0$)\n3. **ការប្រែប្រួលសម្ពាធ (ចំពោះឧស្ម័ន) ៖**\n   - បង្កើនសម្ពាធ $\\implies$ លំនឹងរំកិលទៅទិសដៅដែលមានចំនួនម៉ូលឧស្ម័នតិចជាង។",
    body_en: "## Le Chatelier's Principle\nDynamic equilibrium shifts counteracting external perturbations. Rules governing concentration, temperature shifts with enthalpy ΔH, and pressure shifts with stoichiometric gas moles.",
  },

  {
    id: "les-g12-chem-08",
    grade: 12,
    sort_order: 8,
    title_km: "ទ្រឹស្តីប្រុងស្ទែត-ឡូរី និងគូអាស៊ីត-បាស",
    title_en: "Brønsted-Lowry Acid-Base Theory & Conjugate Pairs",
    summary_km: "និយមន័យប្រុងស្ទែត-ឡូរី ការផ្ទេរប្រូតុង H+ គូអាស៊ីត-បាសឆ្លាស់ HA/A- និងការគណនាថេរកម្លាំង Ka, Kb",
    summary_en: "Brønsted-Lowry proton transfer model, conjugate acid-base pairs HA/A-, and ionization constants Ka, Kb and pKa",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-08" },
    body_km: "## ១. និយមន័យអាស៊ីត-បាសប្រុងស្ទែត-ឡូរី\n- **អាស៊ីត ៖** ជាប្រភេទគីមី (ម៉ូលេគុល ឬអ៊ីយ៉ុង) ដែលមានសមត្ថភាព **បោះបង់ប្រូតុង $H^+$**។\n- **បាស ៖** ជាប្រភេទគីមីដែលមានសមត្ថភាព **ទទួលយកប្រូតុង $H^+$**។\n\n## ២. គូអាស៊ីត-បាសឆ្លាស់ (Conjugate Pairs)\n$$\\text{Acid} \\rightleftharpoons \\text{Conjugate Base} + H^+$$\n- ឧទាហរណ៍ ៖ គូ $\\text{CH}_3\\text{COOH} / \\text{CH}_3\\text{COO}^-$, $\\text{NH}_4^+ / \\text{NH}_3$, $\\text{H}_3\\text{O}^+ / \\text{H}_2\\text{O}$\n\n## ៣. ទំនាក់ទំនងរវាង $K_a$ និង $K_b$\nចំពោះគូអាស៊ីត-បាសឆ្លាស់ក្នុងទឹកនៅ $25^\\circ\\text{C}$៖\n$$K_a \\times K_b = K_w = 1.0 \\times 10^{-14} \\iff pK_a + pK_b = 14$$",
    body_en: "## Brønsted-Lowry Theory\nProton donor and acceptor definitions. Conjugate acid-base pairs and the fundamental water equilibrium relation Ka * Kb = Kw = 10^-14.",
  },

  {
    id: "les-g12-chem-09",
    grade: 12,
    sort_order: 9,
    title_km: "សូលុយស្យុងទ្រនាប់ និងការគណនា pH ទ្រនាប់",
    title_en: "Buffer Solutions & Buffer Action",
    summary_km: "និយមន័យសូលុយស្យុងទ្រនាប់ សមាសភាព សមីការ Henderson-Hasselbalch pH = pKa + log([A-]/[HA]) និងសារៈសំខាន់ក្នុងឈាម",
    summary_en: "Buffer mechanisms, Henderson-Hasselbalch equation pH = pKa + log([A-]/[HA]), and physiological blood homeostasis",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-09" },
    body_km: "## ១. និយមន័យសូលុយស្យុងទ្រនាប់ (Buffer Solution)\nសូលុយស្យុងទ្រនាប់ គឺជាសូលុយស្យុងដែលមានសមត្ថភាពទប់ទល់នឹងការប្រែប្រួល $pH$ យ៉ាងខ្លាំង នៅពេលគេបន្ថែមអាស៊ីតខ្លាំង ឬបាសខ្លាំងបន្តិចបន្តួច ឬនៅពេលពង្រាវ។\n- **សមាសភាព ៖** ល្បាយនៃអាស៊ីតខ្សោយ និងបាសឆ្លាស់របស់វា (ឧ. $\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COONa}$)។\n\n## ២. សមីការ Henderson-Hasselbalch\n$$pH = pK_a + \\log_{10}\\left( \\frac{[\\text{Base}]}{[\\text{Acid}]} \\right)$$\n- នៅពេល $[\\text{Base}] = [\\text{Acid}] \\implies pH = pK_a$ (លក្ខខណ្ឌទ្រនាប់ល្អបំផុត)។\n- **សារៈសំខាន់ជីវសាស្ត្រ ៖** ទ្រនាប់កាបូណាត $\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-$ រក្សា $pH$ ឈាមមនុស្សនៅចន្លោះ $7.35 - 7.45$ ថេរជានិច្ច។",
    body_en: "## Buffer Chemistry\nResisting pH shifts upon acid or base addition. The Henderson-Hasselbalch formulation and bicarbonate buffering maintaining human blood pH.",
  },

  {
    id: "les-g12-chem-10",
    grade: 12,
    sort_order: 10,
    title_km: "កម្លាំងអគ្គិសនីចលករស្តង់ដារ E° និងសមីការរេដុក",
    title_en: "Standard Cell Potential & Balancing Redox",
    summary_km: "ការគណនាកម្លាំងអគ្គិសនីចលករ E°cell = E°cathode - E°anode ការទស្សន៍ទាយប្រតិកម្មរេដុកឯកឯង និងអេឡិចត្រូលីស",
    summary_en: "Standard electromotive potential E°cell = E°cathode - E°anode, predicting spontaneity, and quantitative electrolysis",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-10" },
    body_km: "## ១. កម្លាំងអគ្គិសនីចលករស្តង់ដារនៃពីល\n$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{red}} - E^\\circ_{\\text{ox}}$$\n- បើ $E^\\circ_{\\text{cell}} > 0$ $\\implies$ ប្រតិកម្មរេដុកកើតឡើង **ឯកឯង** (Spontaneous) ក្នុងលក្ខខណ្ឌស្តង់ដារ។\n\n## ២. ប៉ូលនៃពីលហ្គាល់វ៉ានិច\n- **អាណូត (Anode) ៖** ប៉ូលអវិជ្ជមាន $(-)$ កន្លែងកើតមានប្រតិកម្ម **អុកស៊ីតកម្ម** (បាត់បង់អេឡិចត្រុង)។\n- **កាតូត (Cathode) ៖** ប៉ូលវិជ្ជមាន $(+)$ កន្លែងកើតមានប្រតិកម្ម **រេដុកម្ម** (ទទួលយកអេឡិចត្រុង)។\n- ចរន្តអេឡិចត្រុងហូរពីអាណូត $(-)$ ទៅកាតូត $(+)$។",
    body_en: "## Redox Potentials & Galvanic Cells\nStandard cell potential determination E°cell = E°cathode - E°anode. Spontaneity criteria and anode oxidation vs cathode reduction polarity.",
  },

  {
    id: "les-g12-chem-11",
    grade: 12,
    sort_order: 11,
    title_km: "អាល់កុល អាល់ដេអ៊ីត និងអាស៊ីតកាបុកស៊ីលិច",
    title_en: "Alcohols, Aldehydes & Carboxylic Acids",
    summary_km: "ក្រុមមុខងារ -OH, -CHO, -COOH ប្រតិកម្មអុកស៊ីតកម្មសម្រាំងនៃអាល់កុលថ្នាក់ទី ១ និង ២ និងការរៀបចំអាស៊ីត",
    summary_en: "Functional groups -OH, -CHO, -COOH; selective catalytic oxidation of primary/secondary alcohols to aldehydes and acids",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-11" },
    body_km: "## ១. អាល់កុល (Alcohols: R-OH)\n- **ថ្នាក់ទី ១ ៖** $R-\\text{CH}_2-\\text{OH} \\xrightarrow{[O]} R-\\text{CHO} \\text{ (អាល់ដេអ៊ីត)} \\xrightarrow{[O]} R-\\text{COOH} \\text{ (អាស៊ីត)}$\n- **ថ្នាក់ទី ២ ៖** $R-\\text{CH(OH)}-R' \\xrightarrow{[O]} R-\\text{CO}-R' \\text{ (សេតូន)}$\n- **ថ្នាក់ទី ៣ ៖** មិនរងអុកស៊ីតកម្មក្នុងលក្ខខណ្ឌស្រាលឡើយ។\n\n## ២. អាស៊ីតកាបុកស៊ីលិច (Carboxylic Acids: R-COOH)\nមានចរិតជាអាស៊ីតខ្សោយ មានចំណុចរំពុះខ្ពស់ដោយសារសម្ព័ន្ធអ៊ីដ្រូសែនទ្វេ (Dimer) និងចូលរួមក្នុងប្រតិកម្មអេស្ទែរកម្ម។",
    body_en: "## Oxygenated Organic Functional Groups\nClassification of primary, secondary, tertiary alcohols. Stepwise oxidation pathways yielding aldehydes, ketones, and carboxylic acids.",
  },

  {
    id: "les-g12-chem-12",
    grade: 12,
    sort_order: 12,
    title_km: "អាមីន អាស៊ីតអាមីណេ និងប៉ូលីមែ",
    title_en: "Amines, Amino Acids & Synthetic Polymers",
    summary_km: "ក្រុមមុខងារអាមីន -NH2 អាស៊ីតអាមីណេ ធម្មជាតិអាំផូទែ សម្ព័ន្ធប៉ិបទីត និងប្រតិកម្មប៉ូលីមែកម្ម (បូក និងកណ្តាញ់)",
    summary_en: "Amine groups -NH2, amphoteric amino acid behavior, peptide bond formation, and addition/condensation polymer synthesis",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g12-chem-12" },
    body_km: "## ១. អាស៊ីតអាមីណេ (Amino Acids)\nរូបមន្តទូទៅ ៖ $R-\\text{CH}(\\text{NH}_2)-\\text{COOH}$\n- មានលក្ខណៈជា **អាំផូទែ (Amphoteric)** ៖ អាចដើរតួជាអាស៊ីតផង និងជាបាសផង ក្នុងទឹកបង្កើតជាអ៊ីយ៉ុងទ្វេប៉ូល (Zwitterion)។\n- បណ្តុំអាស៊ីតអាមីណេភ្ជាប់គ្នាដោយ **សម្ព័ន្ធប៉ិបទីត (-CO-NH-)** បង្កើតបានជាប្រូតេអ៊ីន។\n\n## ២. ប៉ូលីមែ (Polymers)\n- **ប៉ូលីមែកម្មបូក ៖** ម៉ូណូមែមានសម្ព័ន្ធទ្វេ $C=C$ បូកបញ្ចូលគ្នា (ឧ. ប៉ូលីអេទីឡែន PE, PVC)។\n- **ប៉ូលីមែកម្មកណ្តាញ់ ៖** ម៉ូណូមែមានក្រុមមុខងារពីរខុសគ្នាភ្ជាប់គ្នាដោយបញ្ចេញម៉ូលេគុលតូចដូចជា $\\text{H}_2\\text{O}$ (ឧ. ណៃឡុង-៦,៦, ប៉ូលីអេស្ទែរ)។",
    body_en: "## Nitrogenous Organics & Polymers\nAmphoteric nature of amino acids and peptide linkages forming proteins. Contrast between addition polymerization and condensation polymerization.",
  },

  {
    id: "les-g12-bio-06",
    grade: 12,
    sort_order: 6,
    title_km: "ស្វ័យតម្រងទ្វេនៃ DNA និងអង់ស៊ីម DNA Polymerase",
    title_en: "DNA Replication & The Semi-Conservative Mechanism",
    summary_km: "យន្តការតម្រងទ្វេពាក់កណ្តាលរក្សាទុក តួនាទី Helicase, DNA Polymerase, Ligase និងទិសដៅសំយោគ 5' -> 3'",
    summary_en: "Semi-conservative replication mechanics, replication fork, enzyme functions (Helicase, Polymerase, Ligase), and 5' to 3' synthesis",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-06" },
    body_km: "## ១. គំរូតម្រងទ្វេពាក់កណ្តាលរក្សាទុក (Semi-Conservative Model)\nការពិសោធន៍ Meselson-Stahl បានបង្ហាញថា ម៉ូលេគុល DNA កូននីមួយៗមានច្រវាក់ម្ខាងជាច្រវាក់ចាស់របស់ DNA មេ និងច្រវាក់ម្ខាងទៀតជាច្រវាក់ថ្មីដែលទើបសំយោគ។\n\n## ២. ដំណាក់កាល និងអង់ស៊ីមសំខាន់ៗ\n1. **DNA Helicase ៖** កាត់ផ្តាច់សម្ព័ន្ធអ៊ីដ្រូសែនរវាងបាសបំពេញ បំបែកច្រវាក់ទ្វេបង្កើតបានជាជំពុះតម្រងទ្វេ (Replication Fork)។\n2. **DNA Polymerase ៖** ភ្ជាប់នុយក្លេអូទីតសេរីថ្មីទៅតាមគោលការណ៍បំពេញបាស ($A=T, G\\equiv C$) ក្នុងទិសដៅពី $5' \\to 3'$ ជានិច្ច។\n3. **DNA Ligase ៖** ផ្សារភ្ជាប់កង់ Okazaki នៅលើច្រវាក់យឺត (Lagging Strand)។",
    body_en: "## DNA Replication\nMeselson-Stahl semi-conservative replication model. Roles of helicase unwinding, continuous leading strand vs lagging strand Okazaki fragments, and ligase sealing.",
  },

  {
    id: "les-g12-bio-07",
    grade: 12,
    sort_order: 7,
    title_km: "ការចម្លងក្រម និងការបកប្រែក្រម (Transcription & Translation)",
    title_en: "Transcription, mRNA & Protein Translation",
    summary_km: "ដំណាក់កាលចម្លងក្រមពី DNA ទៅ mRNA ការកែច្នៃ RNA និងការបកប្រែក្រមនៅរីបូសូមតាមកូដុង និងអង់ទីកូដុង",
    summary_en: "Transcription from DNA template to mRNA, post-transcriptional processing, and ribosomal translation with tRNA anticodons",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-07" },
    body_km: "## ១. ការចម្លងក្រម (Transcription)\nកើតឡើងក្នុងណ្វៃយ៉ូកោសិកា៖\n- អង់ស៊ីម **RNA Polymerase** ចម្លងព័ត៌មានពីច្រវាក់ពុម្ព DNA ($3' \\to 5'$) ទៅជាខ្សែ $mRNA$ ($5' \\to 3'$) តាមគោលការណ៍បំពេញបាស ($A-U, T-A, G-C, C-G$)។\n\n## ២. ការបកប្រែក្រម (Translation)\nកើតឡើងក្នុងស៊ីតូប្លាសត្រង់រីបូសូម (Ribosome)៖\n- **ចាប់ផ្តើម ៖** រីបូសូមអានកូដុងចាប់ផ្តើម $AUG$ (កូដសម្រាប់អាស៊ីតអាមីណេ មេធ្យូនីន)។\n- **ពន្លូត ៖** $tRNA$ នាំយកអាស៊ីតអាមីណេដែលត្រូវគ្នានឹងកូដុងមកតភ្ជាប់គ្នាតាមសម្ព័ន្ធប៉ិបទីត។\n- **បញ្ចប់ ៖** ជួបកូដុងបញ្ឈប់ ($UAA, UAG, UGA$) ច្រវាក់ប៉ូលីប៉ិបទីតត្រូវផ្តាច់ចេញទៅបត់បែនជារូបរាងប្រូតេអ៊ីនពេញលេញ។",
    body_en: "## Gene Expression\nTranscription by RNA polymerase in the nucleus followed by ribosomal translation where triplets of mRNA codons map to amino acids via tRNA anticodons.",
  },

  {
    id: "les-g12-bio-08",
    grade: 12,
    sort_order: 8,
    title_km: "តំណពូជភ្ជាប់ភេទ និងជំងឺតំណពូជលើមនុស្ស",
    title_en: "Sex-Linked Inheritance & Pedigree Analysis",
    summary_km: "ការផ្ទេរលក្ខណៈពូជលើក្រូម៉ូសូមភេទ X និង Y ជំងឺឈាមមិនកក (Hemophilia) ជំងឺខ្វាក់ពណ៌ និងការអានពង្សាវលី (Pedigree)",
    summary_en: "X-linked and Y-linked genetic inheritance patterns, hemophilia, red-green color blindness, and familial pedigree charts",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-08" },
    body_km: "## ១. តំណពូជភ្ជាប់ក្រូម៉ូសូមភេទ $X$\nហ្សែនបង្កជំងឺភាគច្រើនជាហ្សែនអន់ស្ថិតលើក្រូម៉ូសូម $X$ (គ្មានអាឡែលលើ $Y$)៖\n- មនុស្សប្រុស ($XY$) មានក្រូម៉ូសូម $X$ តែមួយ ដូច្នេះបើមានហ្សែនបង្កជំងឺ $X^h Y$ គឺ **កើតជំងឺភ្លាម**។\n- មនុស្សស្រី ($XX$) កើតជំងឺលុះត្រាតែមានហ្សែនអន់ទាំងពីរ $X^h X^h$។ បើ $X^H X^h$ គឺគ្រាន់តែជាអ្នកចម្លងជំងឺ (Carrier)។\n- **ជំងឺឧទាហរណ៍ ៖** ជំងឺខ្វាក់ពណ៌ (Color Blindness) និងជំងឺឈាមមិនកក (Hemophilia)។\n\n## ២. ការវិភាគពង្សាវលី (Pedigree Analysis)\n- ការតាមដានការឆ្លងជំងឺតំណពូជឆ្លងកាត់ជំនាន់គ្រួសារ៖\n  - រាងការ៉េ ៖ មនុស្សប្រុស\n  - រាងរង្វង់ ៖ មនុស្សស្រី\n  - ពណ៌ខ្មៅ/ស្រមោល ៖ បុគ្គលកើតជំងឺ",
    body_en: "## Sex-Linked Genetics & Pedigrees\nX-linked recessive disorders with higher incidence in males. Pedigree symbols and inheritance tracing for hemophilia and color blindness across generations.",
  },

  {
    id: "les-g12-bio-09",
    grade: 12,
    sort_order: 9,
    title_km: "កោសិកា B, T អង់ទីហ្សែន និងអង់ទីគ័រ",
    title_en: "Humoral & Cell-Mediated Immunity: B & T Cells",
    summary_km: "យន្តការភាពស៊ាំបង្ក កោសិកា B បង្កើតអង់ទីគ័រ (Humoral) និងកោសិកា T សម្លាប់មេរោគ (Cell-Mediated) ការចងចាំភាពស៊ាំ",
    summary_en: "Adaptive immune mechanisms: B-cell antibody humoral responses, cytotoxic T-cell attacks, and immunological memory",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-09" },
    body_km: "## ១. ភាពស៊ាំកំប្លែង (Humoral Immunity — កោសិកា B)\n- កោសិកា **B-Lymphocytes** ទទួលស្គាល់អង់ទីហ្សែន រួចបំប្លែងទៅជាប្លាស្មូស៊ីត (Plasma Cells) ដើម្បីផលិត **អង់ទីគ័រ (Antibodies)** ជាក់លាក់។\n- អង់ទីគ័រភ្ជាប់ទៅនឹងអង់ទីហ្សែន បន្សាបជាតិពុល និងបង្កភាពងាយស្រួលដល់ការលេបត្របាក់ដោយម៉ាក្រូផាស (Phagocytosis)។\n\n## ២. ភាពស៊ាំកោសិកា (Cell-Mediated Immunity — កោសិកា T)\n- កោសិកា **T-Cytotoxic ($T_8$ ឬ $CD8$) ៖** បញ្ចេញសារធាតុ Perforin បំផ្លាញកោសិកាដែលផ្ទុកវីរុស ឬកោសិកាមហារីកដោយផ្ទាល់។\n- កោសិកា **T-Helper ($T_4$ ឬ $CD4$) ៖** បញ្ចេញសារធាតុ Interleukin ជំរុញទាំងកោសិកា B និងកោសិកា T ឱ្យធ្វើសកម្មភាព។\n- កោសិកាចងចាំ (Memory Cells) ធានានូវការឆ្លើយតបយ៉ាងលឿន និងខ្លាំងក្លានៅពេលជួបមេរោគដដែលលើកក្រោយ។",
    body_en: "## Cellular & Humoral Immunity\nB-cell clonal expansion into antibody-secreting plasma cells vs cytotoxic T-cell lysis of infected host cells. Long-term memory cell retention.",
  },

  {
    id: "les-g12-bio-10",
    grade: 12,
    sort_order: 10,
    title_km: "វ៉ាក់សាំង សេរ៉ូម និងជំងឺអេដស៍ HIV/AIDS",
    title_en: "Vaccines, Serums & HIV/AIDS Pathogenesis",
    summary_km: "ភាពខុសគ្នារវាងវ៉ាក់សាំង និងសេរ៉ូម យន្តការវីរុស HIV បំផ្លាញកោសិកា CD4 និងដំណាក់កាលវិវត្តនៃជំងឺអេដស៍",
    summary_en: "Contrasting active vaccination with passive serotherapy, HIV retrovirus replication targeting CD4 T-cells, and AIDS progression",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-10" },
    body_km: "## ១. ការប្រៀបធៀបវ៉ាក់សាំង និងសេរ៉ូម\n| លក្ខណៈ | វ៉ាក់សាំង (Vaccine) | សេរ៉ូម (Serum) |\n|---|---|---|\n| **ធាតុផ្សំ** | អង់ទីហ្សែនខ្សោយ ឬស្លាប់ | អង់ទីគ័រស្រាប់ |\n| **ប្រភេទភាពស៊ាំ** | ភាពស៊ាំសកម្ម (Active) | ភាពស៊ាំអសកម្ម (Passive) |\n| **ប្រសិទ្ធភាព** | កើតឡើងយឺត (២-៣ សប្តាហ៍) | កើតឡើងភ្លាមៗ |\n| **រយៈពេលការពារ** | យូរអង្វែង (ច្រើនឆ្នាំ/មួយជីវិត) | ខ្លី (២-៣ សប្តាហ៍) |\n| **គោលបំណង** | បង្ការទុកជាមុន | ព្យាបាលបន្ទាន់ |\n\n## ២. វីរុសអេដស៍ (HIV) និងប្រព័ន្ធភាពស៊ាំ\n- វីរុស HIV ជាប្រភេទ Retrovirus ដែលផ្ទុក $RNA$ និងអង់ស៊ីម Reverse Transcriptase។\n- វីរុស HIV ជ្រៀតចូល និងបំផ្លាញជាពិសេស **កោសិកា $T_4$ ($CD4$)** ដែលជាមេបញ្ជាការនៃប្រព័ន្ធភាពស៊ាំ ធ្វើឱ្យរាងកាយបាត់បង់សមត្ថភាពការពារប្រឆាំងនឹងមេរោគឱកាសនិយម។",
    body_en: "## Vaccines, Serums & HIV\nActive immunity via attenuated antigen vaccination versus passive immediate protection via antiserum. Pathogenesis of HIV retrovirus destroying CD4 helper cells.",
  },

  {
    id: "les-g12-bio-11",
    grade: 12,
    sort_order: 11,
    title_km: "ភស្តុតាងនៃការវិវត្តន៍ និងយន្តការកកើតប្រភេទថ្មី",
    title_en: "Evidence of Evolution & Speciation Mechanisms",
    summary_km: "ភស្តុតាងពន្ធុវិទ្យាម៉ូលេគុល ភស្តុតាងកាយវិភាគវិទ្យាប្រៀបធៀប អវយវៈដូចគ្នានិងដូចគ្នាដោយភារកិច្ច និងការកកើតប្រភេទថ្មី",
    summary_en: "Molecular and morphological evidence of biological evolution, homologous vs analogous structures, and allopatric speciation",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g12-bio-11" },
    body_km: "## ១. ភស្តុតាងនៃការវិវត្តន៍នៃភាវៈរស់\n1. **ភស្តុតាងផូស៊ីល (Fossils) ៖** បង្ហាញពីប្រវត្តិរូបរាងនៃភាវៈរស់ពីបុរាណ និងដំណាក់កាលអន្តរកាល។\n2. **កាយវិភាគប្រៀបធៀប ៖**\n   - **អវយវៈដូចគ្នា (Homologous Structures) ៖** មានដើមកំណើតរួមគ្នា ប៉ុន្តែបំពេញមុខងារខុសគ្នា (ឧ. ដៃមនុស្ស ស្លាបប្រចៀវ ព្រុយត្រីបាឡែន) $\\implies$ បង្ហាញពីការវិវត្តន៍បែកចេញ (Divergent Evolution)។\n   - **អវយវៈដូចភារកិច្ច (Analogous Structures) ៖** មានដើមកំណើតខុសគ្នា ប៉ុន្តែបំពេញមុខងារដូចគ្នា (ឧ. ស្លាបបក្សី និងស្លាបសត្វល្អិត) $\\implies$ ការវិវត្តន៍ចូលគ្នា (Convergent Evolution)។\n3. **ភស្តុតាងជីវគីមី និងម៉ូលេគុល ៖** ភាពដូចគ្នានៃលំដាប់ DNA និងអាស៊ីតអាមីណេនៃប្រូតេអ៊ីន Cytochrome c។\n\n## ២. ការកកើតប្រភេទថ្មី (Speciation)\nការកកើតប្រភេទថ្មីកើតឡើងតាមរយៈ **ការកាត់ផ្តាច់ភូមិសាស្ត្រ (Geographic Isolation)** និងការប្រមូលផ្តុំបម្រែបម្រួលហ្សែន ឈានទៅរកការកាត់ផ្តាច់បន្តពូជ។",
    body_en: "## Evolutionary Evidence & Speciation\nFossil record, homologous vs analogous structural divergence, and molecular DNA homology. Reproductive isolation driving biological speciation.",
  },

  {
    id: "les-g12-earth-06",
    grade: 12,
    sort_order: 6,
    title_km: "ផ្លាកតិចតូនិច រញ្ជួយដី និងភ្នំភ្លើង",
    title_en: "Plate Tectonics, Earthquakes & Volcanism",
    summary_km: "ទ្រឹស្តីផ្លាកតិចតូនិច ព្រំដែនផ្លាកទាំង ៣ (បែកចេញ រួមចូល និងរអិលកាត់គ្នា) រលកសីសស្មិច P, S និងបន្ទុះភ្នំភ្លើង",
    summary_en: "Plate tectonics, divergent/convergent/transform plate boundaries, seismic body waves P and S, and volcanism",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-06" },
    body_km: "## ១. ទ្រឹស្តីផ្លាកតិចតូនិច (Plate Tectonics)\nលីតូស៊្វែរ (សំបកផែនដី និងផ្នែកខាងលើនៃម៉ង់តូ) បែកចែកជាផ្ទាំងបំណែកធំៗជាច្រើនដែលអណ្តែតលើអាស្តេណូស៊្វែររាវខាប់ ដោយសារចរន្តវិលវល់កម្ដៅ (Convection Currents) ក្នុងម៉ង់តូ។\n\n## ២. ប្រភេទព្រំដែនផ្លាកតិចតូនិច\n1. **ព្រំដែនបែកចេញ (Divergent) ៖** ផ្លាកទាំងពីររំកិលឃ្លាតពីគ្នា បង្កើតជាជួរភ្នំក្រោមបាតសមុទ្រ (Mid-Ocean Ridges)។\n2. **ព្រំដែនរួមចូល (Convergent) ៖** ផ្លាករំកិលបុកចូលគ្នា បង្កើតជាជួរភ្នំខ្ពស់ៗ (ដូចជួរភ្នំហិម៉ាឡៃ) ឬតំបន់ស្រុត (Subduction Zone)។\n3. **ព្រំដែនរអិលកាត់គ្នា (Transform) ៖** ផ្លាករអិលផ្ដេកកាត់គ្នា បង្កឱ្យមានការប្រេះស្រាំ និងរញ្ជួយដីខ្លាំង (ដូចខ្សែឆ្នូត San Andreas)។",
    body_en: "## Plate Tectonics & Seismic Dynamics\nMantle convection currents driving lithospheric plates. Divergent rift boundaries, convergent subduction zones, and transform fault lines causing seismic events.",
  },

  {
    id: "les-g12-earth-07",
    grade: 12,
    sort_order: 7,
    title_km: "ប្រព័ន្ធព្រះអាទិត្យ ភពនានា និងច្បាប់កែប្លែ",
    title_en: "The Solar System, Planets & Kepler's Laws",
    summary_km: "រចនាសម្ព័ន្ធប្រព័ន្ធព្រះអាទិត្យ ភពដី និងភពឧស្ម័ន និងច្បាប់ទាំងបីរបស់កែប្លែស្តីពីចលនាគន្លងភព",
    summary_en: "Terrestrial vs Jovian planets, solar system orbital dynamics, and Kepler's three laws of planetary motion",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g12-earth-07" },
    body_km: "## ១. ច្បាប់ទាំងបីរបស់កែប្លែ (Kepler's Laws)\n1. **ច្បាប់ទី ១ (ច្បាប់គន្លង) ៖** ភពទាំងអស់វិលជុំវិញព្រះអាទិត្យតាមគន្លងរាងពងក្រពើ (Ellipse) ដោយមានព្រះអាទិត្យស្ថិតនៅត្រង់ចំណុចកំណុំមួយ។\n2. **ច្បាប់ទី ២ (ច្បាប់ផ្ទៃក្រឡា) ៖** កាំវ៉ិចទ័រភ្ជាប់ពីព្រះអាទិត្យទៅភពមួយខ្វសបានផ្ទៃក្រឡាស្មើៗគ្នាក្នុងរយៈពេលស្មើគ្នា ($dA/dt = \\text{const}$)។\n3. **ច្បាប់ទី ៣ (ច្បាប់ខួប) ៖** ការ៉េនៃខួបវិលជុំវិញព្រះអាទិត្យ ($T$) សមាមាត្រនឹងគូបនៃកន្លះអ័ក្សធំ ($a$) នៃគន្លង៖\n$$\\frac{T^2}{a^3} = \\frac{4\\pi^2}{G M_S} = \\text{const}$$\n\n## ២. ចំណាត់ថ្នាក់ភពក្នុងប្រព័ន្ធព្រះអាទិត្យ\n- **ភពដី (Terrestrial) ៖** ពុធ សុក្រ ផែនដី អង្គារ (មានផ្ទៃរឹង ដង់ស៊ីតេខ្ពស់)។\n- **ភពឧស្ម័នយក្ស (Jovian) ៖** ព្រហស្បតិ៍ សៅរ៍ អ៊ុយរ៉ានុស ណិបទូន (មាឌធំ សម្បូរឧស្ម័ន H2, He)។",
    body_en: "## Kepler's Laws & Planetary Science\nElliptical orbital paths, equal area sweeping in equal time, and T^2 / a^3 harmonic constant relationship. Contrasting inner rocky terrestrial planets with outer gas giants.",
  },
];
