import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_11_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 11 — MATHEMATICS (គណិតវិទ្យា)
  // ============================================================================
  {
    id: "les-g11-math-01",
    grade: 11,
    sort_order: 1,
    title_km: "ស្វ៊ីតចំនួនពិត ៖ ស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ",
    title_en: "Arithmetic & Geometric Sequences",
    summary_km: "តួទី n នៃស្វ៊ីតនព្វន្ត un = u₁ + (n-1)d ស្វ៊ីតធរណីមាត្រ un = u₁ · qⁿ⁻¹ និងផលបូក n តួដំបូង Sn",
    summary_en: "Arithmetic general term un = u1 + (n-1)d, geometric term un = u1·qⁿ⁻¹, and partial series sums Sn",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-01" },
    body_km: `## ១. ស្វ៊ីតនព្វន្ត (Arithmetic Sequence)
ស្វ៊ីតនព្វន្តមានផលសងរួម $d = u_{n+1} - u_n$ ថេរ៖
- **តួទី $n$ ៖**
  $$u_n = u_1 + (n - 1)d$$
- **ផលបូក $n$ តួដំបូង ($S_n$) ៖**
  $$S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n - 1)d]}{2}$$

## ២. ស្វ៊ីតធរណីមាត្រ (Geometric Sequence)
ស្វ៊ីតធរណីមាត្រមានផលធៀបរួម $q = \\frac{u_{n+1}}{u_n}$ ថេរ៖
- **តួទី $n$ ៖**
  $$u_n = u_1 \\cdot q^{n-1}$$
- **ផលបូក $n$ តួដំបូង ($S_n$, $q \\neq 1$) ៖**
  $$S_n = u_1 \\cdot \\frac{1 - q^n}{1 - q}$$`,
    body_en: `## Sequences & Series
Arithmetic: $u_n = u_1 + (n-1)d$, sum $S_n = \\frac{n(u_1+u_n)}{2}$. Geometric: $u_n = u_1 q^{n-1}$, sum $S_n = u_1\\frac{1-q^n}{1-q}$.`,
  },
  {
    id: "les-g11-math-02",
    grade: 11,
    sort_order: 2,
    title_km: "លីមីតនៃអនុគមន៍ និងភាពជាប់",
    title_en: "Limits of Functions & Continuity",
    summary_km: "រាងមិនកំណត់ 0/0, ∞/∞ វិធីបំបែកជាកត្តា គុណកន្សោមឆ្លាស់ និងលីមីតត្រីកោណមាត្រ lim (sin x)/x = 1",
    summary_en: "Indeterminate forms 0/0 and ∞/∞, factoring, conjugate multiplication, and trigonometric limit lim (sin x)/x = 1",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-02" },
    body_km: `## ១. រាងមិនកំណត់ $\\left[\\frac{0}{0}\\right]$
- **ពហុធា ៖** ដាក់ជាផលគុណកត្តា $(x - a)$ រួចសម្រួលចោល
- **កន្សោមរ៉ាឌីកាល់ ៖** គុណនឹងកន្សោមឆ្លាស់ (Conjugate)៖
  $$\\lim_{x \\to 0} \\frac{\\sqrt{x + 1} - 1}{x} = \\lim_{x \\to 0} \\frac{(x + 1) - 1}{x(\\sqrt{x + 1} + 1)} = \\frac{1}{2}$$

## ២. លីមីតគ្រឹះត្រីកោណមាត្រ
$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$$`,
    body_en: `## Limits
Overcoming indeterminate form 0/0 via factoring or conjugate rationalization. Fundamental identity $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.`,
  },
  {
    id: "les-g11-math-03",
    grade: 11,
    sort_order: 3,
    title_km: "ដេរីវេ និងរូបមន្តដេរីវេ",
    title_en: "Derivatives & Differentiation Rules",
    summary_km: "និយមន័យដេរីវេជាលីមីត រូបមន្ត (xⁿ)' = n · xⁿ⁻¹, (u · v)', (u / v)' និងដេរីវេបណ្តាក់",
    summary_en: "Limit definition of derivative, power rule (xⁿ)' = n·xⁿ⁻¹, product rule (uv)', quotient rule (u/v)', and chain rule",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-03" },
    body_km: `## ១. រូបមន្តដេរីវេគ្រឹះ
- $(c)' = 0$ (ថេរ)
- $(x^n)' = n \\cdot x^{n-1}$
- $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$
- $(\\sin x)' = \\cos x, \\quad (\\cos x)' = -\\sin x$

## ២. វិធានប្រមាណវិធី
- $(u + v)' = u' + v'$
- **ផលគុណ ៖** $(u \\cdot v)' = u'v + uv'$
- **ផលចែក ៖** $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$
- **ដេរីវេបណ្តាក់ ៖** $(u^n)' = n \\cdot u' \\cdot u^{n-1}$`,
    body_en: `## Differentiation
Power rule $(x^n)' = n x^{n-1}$, product rule $(uv)' = u'v + uv'$, and quotient rule $(u/v)' = \\frac{u'v - uv'}{v^2}$.`,
  },
  {
    id: "les-g11-math-04",
    grade: 11,
    sort_order: 4,
    title_km: "ការអនុវត្តដេរីវេ ៖ អថេរភាព បរមា និងខ្សែកោង",
    title_en: "Applications of Derivatives: Extrema & Graphing",
    summary_km: "ទិសដៅអថេរភាពតាមសញ្ញានៃ f'(x) ចំណុចអតិបរមា អប្បបរមា និងសមីការបន្ទាត់ប៉ះ y = f'(x₀)(x - x₀) + y₀",
    summary_en: "Monotonicity tests using f'(x) sign, local extrema, critical points, and tangent line equation y = f'(x0)(x - x0) + y0",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-04" },
    body_km: `## ១. ទិសដៅអថេរភាព
- បើ $f'(x) > 0$ លើចន្លោះ $I$ នោះអនុគមន៍ $f$ **កើនដាច់ខាត**
- បើ $f'(x) < 0$ លើចន្លោះ $I$ នោះអនុគមន៍ $f$ **ចុះដាច់ខាត**
- បើ $f'(x_0) = 0$ ហើយប្តូរសញ្ញាឆ្លងកាត់ $x_0$ នោះអនុគមន៍មាន **បរមា (Extremum)** ត្រង់ $x_0$

## ២. សមីការបន្ទាត់ប៉ះ (Tangent Line Equation)
សមីការបន្ទាត់ប៉ះនឹងខ្សែកោង $(C)$ ត្រង់ចំណុច $M(x_0, y_0)$ គឺ៖
$$y = f'(x_0)(x - x_0) + f(x_0)$$`,
    body_en: `## Curve Sketching
Sign of $f'(x)$ establishes increasing/decreasing intervals. Tangent line at $x_0$ is $y = f'(x_0)(x - x_0) + y_0$.`,
  },
  {
    id: "les-g11-math-05",
    grade: 11,
    sort_order: 5,
    title_km: "ត្រីកោណមាត្រកម្រិតខ្ពស់ ៖ សមីការត្រីកោណមាត្រ",
    title_en: "Advanced Trigonometric Equations",
    summary_km: "ការដោះស្រាយសមីការ sin x = sin α, cos x = cos α និងសមីការលីនេអ៊ែរ a sin x + b cos x = c",
    summary_en: "Solving fundamental periodic equations sin x = a, cos x = b, and auxiliary angle reduction a sin x + b cos x = c",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-05" },
    body_km: `## ១. សមីការគ្រឹះត្រីកោណមាត្រ
- $\\sin x = \\sin \\alpha \\iff x = \\alpha + 2k\\pi \\quad \\text{ឬ} \\quad x = \\pi - \\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$
- $\\cos x = \\cos \\alpha \\iff x = \\pm \\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$

## ២. សមីការទម្រង់ $a \\sin x + b \\cos x = c$
ចែកអង្គទាំងពីរនឹង $\\sqrt{a^2 + b^2}$ ដើម្បីបំប្លែងទៅជាទម្រង់ $\\sin(x + \\varphi) = \\frac{c}{\\sqrt{a^2 + b^2}}$ (លក្ខខណ្ឌមានឬស ៖ $a^2 + b^2 \\geq c^2$)។`,
    body_en: `## Trigonometric Equations
General periodic solutions $x = \\alpha + 2k\\pi$ and reduction of $a\\sin x + b\\cos x = c$ using $\\sqrt{a^2+b^2}$.`,
  },

  // ============================================================================
  // GRADE 11 — PHYSICS (រូបវិទ្យា)
  // ============================================================================
  {
    id: "les-g11-phys-01",
    grade: 11,
    sort_order: 1,
    title_km: "អគ្គិសនីស្ទាទិច និងច្បាប់គូឡុំ (Coulomb's Law)",
    title_en: "Electrostatics & Coulomb's Law",
    summary_km: "ច្បាប់គូឡុំ F = k · |q₁q₂| / r² ថេរ k = 9 · 10⁹ N · m² / C² និងអន្តរកម្មរវាងបន្ទុកចំនុច",
    summary_en: "Coulomb's electrostatic force law F = k|q1q2|/r², permittivity, and superposition of point charges",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-01" },
    body_km: `## ១. ច្បាប់គូឡុំ (Coulomb's Law)
កម្លាំងអន្តរកម្មអេឡិចត្រូស្ទាទិចរវាងបន្ទុកអគ្គិសនីចំនុចពីរ $q_1$ និង $q_2$ ក្នុងសុញ្ញាកាស៖
$$F = k \\cdot \\frac{|q_1 \\cdot q_2|}{r^2}$$
- $F$ ៖ កម្លាំងអគ្គិសនី ($N$)
- $k = 9 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$ ៖ ថេរគូឡុំ
- $q_1, q_2$ ៖ បរិមាណបន្ទុក (គូឡុំ $C$)
- $r$ ៖ ចម្ងាយរវាងបន្ទុកទាំងពីរ ($m$)`,
    body_en: `## Coulomb's Law
$F = k \\frac{|q_1 q_2|}{r^2}$ where $k = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$. Forces are attractive for opposite charges, repulsive for like charges.`,
  },
  {
    id: "les-g11-phys-02",
    grade: 11,
    sort_order: 2,
    title_km: "ដែនអគ្គិសនី និងប៉ូតង់ស្យែល (E = F / q, V = E · d)",
    title_en: "Electric Fields & Electric Potential",
    summary_km: "វ៉ិចទ័រដែនអគ្គិសនី E = k · |q| / r² ខ្សែដែនអគ្គិសនី និងការងារផ្លាស់ទីបន្ទុក W = q · U",
    summary_en: "Electric field vector E = F/q (V/m or N/C), uniform fields between parallel plates, and electric potential V",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-02" },
    body_km: `## ១. ដែនអគ្គិសនី (Electric Field $\\vec{E}$)
$$\\vec{E} = \\frac{\\vec{F}}{q} \\implies E = k \\cdot \\frac{|q|}{r^2} \\quad (V/m \\text{ ឬ } N/C)$$
- ខ្សែដែនអគ្គិសនីចេញពីបន្ទុកវិជ្ជមាន ($+$) ចូលទៅបន្ទុកអវិជ្ជមាន ($-$)

## ២. ទំនាក់ទំនងរវាងដែន និងផលសងប៉ូតង់ស្យែល
ក្នុងដែនអគ្គិសនីស្មើ (រវាងបន្ទះលោហៈស្របពីរ)៖
$$U = E \\cdot d \\implies E = \\frac{U}{d}$$
ការងារកម្លាំងអគ្គិសនី ៖ $W = q \\cdot U$`,
    body_en: `## Electric Fields
$\\vec{E} = \\vec{F}/q$. For uniform fields between parallel plates, $U = E \\cdot d$. Work done is $W = q \\cdot U$.`,
  },
  {
    id: "les-g11-phys-03",
    grade: 11,
    sort_order: 3,
    title_km: "កុងដង់សាទ័រ និងសមត្ថភាព (C = Q / U)",
    title_en: "Capacitors & Energy Storage",
    summary_km: "និយមន័យសមត្ថភាព C = Q / U ខ្នាតហ្វារ៉ាត់ (F) និងថាមពលស្តុកក្នុងកុងដង់សាទ័រ E = 1/2 CU²",
    summary_en: "Capacitance C = Q/U measured in Farads (F), parallel-plate geometry C = εA/d, and energy storage E = 1/2 CU²",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-03" },
    body_km: `## ១. សមត្ថភាពកុងដង់សាទ័រ (Capacitance $C$)
$$C = \\frac{Q}{U}$$
- $C$ ៖ សមត្ថភាព (ហ្វារ៉ាត់ $F$, មីក្រូហ្វារ៉ាត់ $\\mu F = 10^{-6}\\text{ F}$)
- $Q$ ៖ បន្ទុកអគ្គិសនី ($C$)
- $U$ ៖ តង់ស្យុងសងខាងកុងដង់សាទ័រ ($V$)

## ២. ថាមពលអគ្គិសនីស្តុកក្នុងកុងដង់សាទ័រ
$$E = \\frac{1}{2} C U^2 = \\frac{1}{2} Q U = \\frac{Q^2}{2C}$$`,
    body_en: `## Capacitors
$C = Q/U$. Energy stored in electrostatic field is $E = \\frac{1}{2} C U^2$.`,
  },
  {
    id: "les-g11-phys-04",
    grade: 11,
    sort_order: 4,
    title_km: "ដែនម៉ាញេទិច និងកម្លាំងឡូរ៉ិន (Lorentz Force)",
    title_en: "Magnetic Fields & Lorentz Force",
    summary_km: "កម្លាំងឡូរ៉ិនលើបន្ទុកផ្លាស់ទី F = |q| · v · B · sin α និងវិធានដៃស្តាំ",
    summary_en: "Lorentz force on moving charges F = q v B sin α, right-hand rule, and circular trajectory in uniform magnetic fields",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-04" },
    body_km: `## ១. កម្លាំងឡូរ៉ិន (Lorentz Magnetic Force)
បន្ទុកអគ្គិសនី $q$ ដែលផ្លាស់ទីដោយល្បឿន $v$ ក្នុងដែនម៉ាញេទិច $B$ រងកម្លាំងម៉ាញេទិច៖
$$F = |q| \\cdot v \\cdot B \\cdot \\sin(\\alpha)$$
- $F$ ៖ កម្លាំងឡូរ៉ិន ($N$)
- $B$ ៖ អាំងឌុចស្យុងម៉ាញេទិច (តេស្លា $T$)
- $\\alpha = (\\vec{v}, \\vec{B})$ ៖ មុំរវាងវ៉ិចទ័រល្បឿន និងដែនម៉ាញេទិច

> **ចំណាំ៖** បើ $\\vec{v} \\perp \\vec{B}$ ($\\alpha = 90^\\circ$) នោះចលនារបស់ភាគល្អិតជា **ចលនារង្វង់ស្មើ** ដែលមានកាំ $R = \\frac{m v}{|q| B}$!`,
    body_en: `## Lorentz Force
$F = |q| v B \\sin\\alpha$. Perpendicular charges undergo uniform circular motion with orbital radius $R = \\frac{mv}{|q|B}$.`,
  },
  {
    id: "les-g11-phys-05",
    grade: 11,
    sort_order: 5,
    title_km: "អាំងឌុចស្យុងអេឡិចត្រូម៉ាញេទិច និងច្បាប់ហ្វារ៉ាដេ",
    title_en: "Electromagnetic Induction & Faraday's Law",
    summary_km: "ភ្លុចម៉ាញេទិច Φ = B · S · cos θ ច្បាប់ហ្វារ៉ាដេ e = -ΔΦ / Δt និងច្បាប់ឡិនស៍",
    summary_en: "Magnetic flux Φ = B·S·cos θ (Weber), Faraday's law of induced EMF e = -dΦ/dt, and Lenz's direction law",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-05" },
    body_km: `## ១. ភ្លុចម៉ាញេទិច (Magnetic Flux $\\Phi$)
$$\\Phi = B \\cdot S \\cdot \\cos(\\theta)$$
- $\\Phi$ ៖ ភ្លុចម៉ាញេទិច (វ៉េប៊ែរ $Wb$)
- $\\theta$ ៖ មុំរវាងវ៉ិចទ័រដែន $\\vec{B}$ និងវ៉ិចទ័រណរម៉ាល់ $\\vec{n}$ នៃផ្ទៃ

## ២. ច្បាប់ហ្វារ៉ាដេ (Faraday's Law)
កម្លាំងអគ្គិសនីចលករអាំងឌ្វី ($e$) សមាមាត្រនឹងល្បឿនបម្រែបម្រួលភ្លុចម៉ាញេទិចកាត់ផ្ទៃសៀគ្វី៖
$$e = -\\frac{\\Delta \\Phi}{\\Delta t}$$
សញ្ញាដក ($-$) បញ្ជាក់ពី **ច្បាប់ឡិនស៍ (Lenz's Law)**៖ ចរន្តអាំងឌ្វីតែងតែបង្កើតដែនម៉ាញេទិចប្រឆាំងនឹងបម្រែបម្រួលភ្លុចដែលបង្កើតវា!`,
    body_en: `## Electromagnetic Induction
Faraday's law $e = -\\frac{\\Delta\\Phi}{\\Delta t}$. Lenz's negative sign dictates induced currents oppose changing magnetic flux.`,
  },

  // ============================================================================
  // GRADE 11 — CHEMISTRY (គីមីវិទ្យា)
  // ============================================================================
  {
    id: "les-g11-chem-01",
    grade: 11,
    sort_order: 1,
    title_km: "ស៊ីនេទិចគីមី និងល្បឿនប្រតិកម្ម",
    title_en: "Chemical Kinetics & Reaction Rates",
    summary_km: "ល្បឿនមធ្យមនៃការបាត់បង់ប្រតិករ និងការកកើតផល v = -Δ[A]/Δt = +Δ[P]/Δt",
    summary_en: "Average and instantaneous reaction rate definitions, concentration curves, and kinetic rate laws",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-01" },
    body_km: `## ១. ល្បឿនប្រតិកម្មគីមី (Reaction Rate $v$)
ចំពោះប្រតិកម្ម $A \\rightarrow B$៖
- ល្បឿននៃការបាត់បង់ប្រតិករ $A$៖
  $$v(A) = -\\frac{\\Delta [A]}{\\Delta t} = -\\frac{[A]_2 - [A]_1}{t_2 - t_1}$$
- ល្បឿននៃការកកើតផល $B$៖
  $$v(B) = +\\frac{\\Delta [B]}{\\Delta t} = +\\frac{[B]_2 - [B]_1}{t_2 - t_1}$$
ខ្នាតនៃល្បឿនគឺ $mol\\cdot L^{-1}\\cdot s^{-1}$ ឬ $M/s$។`,
    body_en: `## Chemical Kinetics
Rate of reaction measures concentration change over time: $v = -\\frac{\\Delta[A]}{\\Delta t} = +\\frac{\\Delta[B]}{\\Delta t}$ ($mol/(L\\cdot s)$).`,
  },
  {
    id: "les-g11-chem-02",
    grade: 11,
    sort_order: 2,
    title_km: "សមតុល្យគីមី និងគោលការណ៍ Le Chatelier",
    title_en: "Chemical Equilibrium & Le Chatelier's Principle",
    summary_km: "ប្រតិកម្មទៅមក ថេរលំនឹង Kc និងឥទ្ធិពលនៃកំហាប់ សម្ពាធ និងសីតុណ្ហភាព",
    summary_en: "Reversible reactions, dynamic equilibrium constant Kc, and Le Chatelier's stress response shifts",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-02" },
    body_km: `## ១. ថេរលំនឹង ($K_c$)
ចំពោះប្រតិកម្មទៅមក៖ $aA + bB \\rightleftharpoons cC + dD$
$$K_c = \\frac{[C]^c \\cdot [D]^d}{[A]^a \\cdot [B]^b}$$

## ២. គោលការណ៍ Le Chatelier
នៅពេលប្រព័ន្ធមួយស្ថិតក្នុងលំនឹងរងឥទ្ធិពលពីកត្តាខាងក្រៅ ប្រព័ន្ធនោះនឹងរំកិលតាមទិសដៅណាដែល **កាត់បន្ថយឥទ្ធិពលនោះ**៖
- បង្កើនកំហាប់ប្រតិករ $\\rightarrow$ រំកិលទៅ **ទិសដៅមុខ (បង្កើតផល)**
- បង្កើនសីតុណ្ហភាព $\\rightarrow$ រំកិលទៅ **ទិសដៅស្រូបកម្តៅ (Endothermic)**`,
    body_en: `## Chemical Equilibrium
Equilibrium expression $K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$. Le Chatelier's principle predicts dynamic response to external stresses.`,
  },
  {
    id: "les-g11-chem-03",
    grade: 11,
    sort_order: 3,
    title_km: "គីមីសរីរាង្គ ៖ អ៊ីដ្រូកាបួឆ្អែត អាល់កាន (CnH2n+2)",
    title_en: "Organic Chemistry: Alkanes (CnH2n+2)",
    summary_km: "រូបមន្តទូទៅ CnH2n+2 ការហៅឈ្មោះតាម IUPAC អ៊ីសូមែ និងប្រតិកម្មជំនួសជាមួយក្លរ",
    summary_en: "Alkane homologous series CnH2n+2, IUPAC nomenclature, structural isomers, and free radical halogenation",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-03" },
    body_km: `## ១. រូបមន្តទូទៅនៃអាល់កាន
$$C_n H_{2n+2} \\quad (n \\geq 1)$$
- $n = 1$ ៖ មេតាន ($CH_4$)
- $n = 2$ ៖ អេតាន ($C_2H_6$)
- $n = 3$ ៖ ប្រូប៉ាន ($C_3H_8$)
- $n = 4$ ៖ ប៊ុយតាន ($C_4H_{10}$)

## ២. ប្រតិកម្មជំនួស (Halogenation)
$$\\text{CH}_4 + \\text{Cl}_2 \\xrightarrow{\\text{ពន្លឺ UV}} \\text{CH}_3\\text{Cl} + \\text{HCl}$$`,
    body_en: `## Alkanes
Saturated hydrocarbons $C_n H_{2n+2}$. Single covalent bonds undergo substitution halogenation under UV light.`,
  },
  {
    id: "les-g11-chem-04",
    grade: 11,
    sort_order: 4,
    title_km: "គីមីសរីរាង្គ ៖ អាល់សែន និងអាល់ស៊ីន",
    title_en: "Unsaturated Hydrocarbons: Alkenes & Alkynes",
    summary_km: "សម្ព័ន្ធពីរ CnH2n (អាល់សែន) សម្ព័ន្ធបី CnH2n-2 (អាល់ស៊ីន) និងប្រតិកម្មបូក",
    summary_en: "Double bond alkenes CnH2n, triple bond alkynes CnH2n-2, Markovnikov's rule, and bromine addition decolorization",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-04" },
    body_km: `## ១. រូបមន្តទូទៅ
- **អាល់សែន (Alkenes) ៖** $C_n H_{2n}$ ($n \\geq 2$, មានសម្ព័ន្ធពីរ $C=C$) ឧ. អេទីឡែន ($C_2H_4$)
- **អាល់ស៊ីន (Alkynes) ៖** $C_n H_{2n-2}$ ($n \\geq 2$, មានសម្ព័ន្ធបី $C\\equiv C$) ឧ. អាសេទីឡែន ($C_2H_2$)

## ២. ប្រតិកម្មបូក (Addition Reactions)
ធ្វើឱ្យទឹកប្រូមបាត់ពណ៌ក្រហមត្នោត ៖
$$\\text{CH}_2=\\text{CH}_2 + \\text{Br}_2 \\rightarrow \\text{CH}_2\\text{Br}-\\text{CH}_2\\text{Br}$$`,
    body_en: `## Alkenes & Alkynes
Unsaturated bonds decolorize bromine water through electrophilic addition: $C_2H_4 + Br_2 \\rightarrow C_2H_4Br_2$.`,
  },
  {
    id: "les-g11-chem-05",
    grade: 11,
    sort_order: 5,
    title_km: "អាល់កុល និងអេទែ (R-OH, R-O-R')",
    title_en: "Alcohols, Ethers & Functional Groups",
    summary_km: "បង្គុំមុខងារអ៊ីដ្រុកស៊ីល -OH អេតាណុល C₂H₅OH និងប្រតិកម្មចំហេះ ប្រតិកម្មជាមួយសូដ្យូម",
    summary_en: "Hydroxyl functional group -OH, ethanol fermentation, physical hydrogen bonding, and sodium metal reactions",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-05" },
    body_km: `## ១. អាល់កុល (Alcohols)
មានបង្គុំមុខងារ **អ៊ីដ្រុកស៊ីល ($-OH$)** ភ្ជាប់នឹងកាបូនឆ្អែត ៖
$$R-OH \\quad (C_n H_{2n+1}OH)$$
- អេតាណុល ($C_2H_5OH$) ប្រើក្នុងវេជ្ជសាស្ត្រ និងគ្រឿងស្រវឹង

## ២. ប្រតិកម្មជាមួយលោហៈសូដ្យូម
$$2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\rightarrow 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2 \\uparrow$$`,
    body_en: `## Alcohols
Characterized by hydroxyl $-OH$ group. Alcohols react with sodium metal to release hydrogen gas: $2ROH + 2Na \\rightarrow 2RONa + H_2$.`,
  },

  // ============================================================================
  // GRADE 11 — BIOLOGY (ជីវវិទ្យា)
  // ============================================================================
  {
    id: "les-g11-bio-01",
    grade: 11,
    sort_order: 1,
    title_km: "រស្មីសំយោគស៊ីជម្រៅ ៖ ដំណាក់កាលពន្លឺ និងវដ្ត Calvin",
    title_en: "Deep Photosynthesis: Light Reactions & Calvin Cycle",
    summary_km: "ទីឡាកូអ៊ីត ផូតូស៊ីស្ទែម II និង I ការបំបែកទឹកដោយពន្លឺ NADPH និងការផលិតគ្លុយកូសក្នុងស្ត្រូម៉ា",
    summary_en: "Thylakoid light-dependent ATP/NADPH photolysis and stroma light-independent Calvin cycle (RuBisCO fixation)",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-01" },
    body_km: `## ១. ដំណាក់កាលពន្លឺ (Light-Dependent Reactions)
កើតឡើងលើភ្នាស **ទីឡាកូអ៊ីត (Thylakoid)** ក្នុងក្លរ៉ូប្លាស៖
- ពន្លឺព្រះអាទិត្យបំបែកម៉ូលេគុលទឹក (Photolysis)៖ $2H_2O \\rightarrow 4H^+ + 4e^- + O_2$
- ផលិតថាមពល **ATP** និងភ្នាក់ងាររេដុករ **NADPH**

## ២. ដំណាក់កាលងងឹត (វដ្តកាល់វីន / Calvin Cycle)
កើតឡើងក្នុង **ស្ត្រូម៉ា (Stroma)**៖
- អង់ស៊ីម RuBisCO ចាប់យក $CO_2$
- ប្រើ $ATP$ និង $NADPH$ ពីដំណាក់កាលពន្លឺដើម្បីសំយោគជាតិស្ករគ្លុយកូស ($C_6H_{12}O_6$)`,
    body_en: `## Advanced Photosynthesis
Light reactions on thylakoids produce ATP and NADPH via photolysis. The Calvin cycle in stroma fixes $CO_2$ into glucose using RuBisCO.`,
  },
  {
    id: "les-g11-bio-02",
    grade: 11,
    sort_order: 2,
    title_km: "ដង្ហើមកោសិកា ៖ Glycolysis, Krebs Cycle & ETC",
    title_en: "Cellular Respiration: Glycolysis, Krebs & ETC",
    summary_km: "គ្លីកូលីសក្នុងស៊ីតូប្លាស វដ្ត Krebs និងច្រវាក់ដឹកនាំអេឡិចត្រុងបង្កើត ៣៦ ទៅ ៣៨ ATP",
    summary_en: "Cytosolic glycolysis (pyruvate), mitochondrial matrix Krebs cycle, and inner membrane oxidative phosphorylation",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-02" },
    body_km: `## ១. ដំណាក់កាលទាំង ៣ នៃដង្ហើមកោសិកា
1. **គ្លីកូលីស (Glycolysis) ៖** កើតក្នុងស៊ីតូប្លាស បំបែកគ្លុយកូសជា ២ អាស៊ីតពីរូវិច ទទួលបាន $2\\text{ ATP}$
2. **វដ្តក្រិប (Krebs Cycle) ៖** កើតក្នុងម៉ាទ្រីសនៃមីតូកុងឌ្រី បញ្ចេញ $CO_2$ និងបង្កើត $NADH, FADH_2$
3. **ច្រវាក់ដឹកនាំអេឡិចត្រុង (ETC) ៖** កើតលើគ្រីស្តា ទទួលបានថាមពលច្រើនជាងគេ (ប្រហែល $32-34\\text{ ATP}$ ដោយអង់ស៊ីម ATP Synthase)`,
    body_en: `## Aerobic Respiration
Glycolysis (cytosol, 2 ATP) $\\rightarrow$ Krebs cycle (mitochondrial matrix, 2 ATP) $\\rightarrow$ Electron Transport Chain (cristae, 32-34 ATP).`,
  },
  {
    id: "les-g11-bio-03",
    grade: 11,
    sort_order: 3,
    title_km: "ការសំយោគប្រូតេអ៊ីន ៖ ចម្លងកូដ និងបកប្រែកូដ",
    title_en: "Protein Synthesis: Transcription & Translation",
    summary_km: "ការចម្លងកូដ DNA → mRNA ក្នុងណ្វៃយ៉ូ និងការបកប្រែកូដ mRNA → អាស៊ីតអាមីណេនៅរីបូសូម",
    summary_en: "RNA polymerase transcription from DNA template, mRNA codons, tRNA anticodons, and ribosome peptide translation",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-03" },
    body_km: `## ១. ការចម្លងកូដ (Transcription)
កើតឡើងក្នុងណ្វៃយ៉ូ ដោយអង់ស៊ីម RNA Polymerase ចម្លងខ្សែស្រឡាយ DNA ទៅជា **mRNA (messenger RNA)** តាមច្បាប់បំពេញបាស ($A-U, T-A, G-C, C-G$)។

## ២. ការបកប្រែកូដ (Translation)
កើតឡើងលើ **រីបូសូម (Ribosomes)** ក្នុងស៊ីតូប្លាស៖
- រីបូសូមអានកូដុង (Codon ត្រីធាតុបាសលើ mRNA)
- **tRNA** ដឹកនាំអាស៊ីតអាមីណេត្រឹមត្រូវមកផ្គុំគ្នាជាខ្សែប៉ូលីប៉ិបទីត (ប្រូតេអ៊ីន)`,
    body_en: `## Central Dogma
DNA $\\rightarrow$ mRNA via nuclear transcription. Ribosomes translate mRNA triplet codons into amino acid polypeptide chains.`,
  },
  {
    id: "les-g11-bio-04",
    grade: 11,
    sort_order: 4,
    title_km: "ហ្សែន និងការបំប្លែងហ្សែន Mutations",
    title_en: "Gene Mutations & Genetic Variations",
    summary_km: "ការបំប្លែងហ្សែនចំនុច ជំនួស បាត់ ថែមបាស កាំរស្មីយូវី និងជំងឺពន្ធុ",
    summary_en: "Point mutations (substitution, insertion, deletion), frameshift errors, mutagenic agents, and sickle cell anemia",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-04" },
    body_km: `## ១. ការបំប្លែងហ្សែន (Gene Mutations)
គឺជាបម្រែបម្រួលនៃលំដាប់តម្រៀបនុយក្លេអូទីតក្នុង DNA៖
- **ការជំនួសបាស (Substitution) ៖** ប្តូរបាសមួយដោយបាសមួយទៀត
- **ការលុប ឬបន្ថែមបាស (Deletion/Insertion) ៖** បណ្តាលឱ្យមានបាតុភូត **Frameshift** ធ្វើឱ្យប្រូតេអ៊ីនខូចទាំងស្រុង

## ២. មូលហេតុ
កត្តារូប (កាំរស្មី $X$, កាំរស្មីយូវី), កត្តាគីមី (ផ្សែងបារី សារជាតិគីមីពុល)។`,
    body_en: `## Mutations
Alterations in DNA nucleotide sequences. Frameshift insertions/deletions drastically disrupt downstream amino acid sequences.`,
  },
  {
    id: "les-g11-bio-05",
    grade: 11,
    sort_order: 5,
    title_km: "ការដឹកជញ្ជូនសារធាតុក្នុងរុក្ខជាតិ ៖ Xylem & Phloem",
    title_en: "Plant Vascular Transport: Xylem & Phloem",
    summary_km: "លំហូរទឹកតាមស៊ីឡែម (កម្លាំងបឺតពីការបញ្ចេញចំហាយទឹក) និងលំហូរអាហារតាមផ្លូអែម",
    summary_en: "Transpirational pull in xylem vessels, cohesion-tension theory, and pressure-flow hypothesis in phloem sieve tubes",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-05" },
    body_km: `## ១. ស៊ីឡែម (Xylem Vessels)
ដឹកជញ្ជូន **ទឹក និងអំបិលខនិជ (រដូវឆៅ)** ពីឫសឡើងទៅស្លឹក តាមរយៈយន្តការ៖
- កម្លាំងបឺតនៃការបញ្ចេញចំហាយទឹកតាមស្តូម៉ាត (Transpirational Pull)
- កម្លាំងភ្ជាប់គ្នានៃម៉ូលេគុលទឹក (Cohesion-Tension)

## ២. ផ្លូអែម (Phloem Sieve Tubes)
ដឹកជញ្ជូន **ជាតិស្ករសរីរាង្គ (រដូវឆ្អិន)** ពីស្លឹកទៅចិញ្ចឹមគ្រប់ផ្នែកនៃរុក្ខជាតិ។`,
    body_en: `## Plant Transport
Xylem carries water upwards powered by leaf transpirational suction. Phloem distributes photosynthesized sucrose systemically.`,
  },

  // ============================================================================
  // GRADE 11 — EARTH SCIENCE (ផែនដីវិទ្យា)
  // ============================================================================
  {
    id: "les-g11-earth-01",
    grade: 11,
    sort_order: 1,
    title_km: "មហាសមុទ្រវិទ្យា និងចរន្តទឹកសមុទ្រពិភពលោក",
    title_en: "Global Ocean Thermohaline Circulation",
    summary_km: "ខ្សែពានដឹកជញ្ជូនសកល ចរន្តទឹកក្តៅ Gulf Stream និងឥទ្ធិពលលើសីតុណ្ហភាពទ្វីបអឺរ៉ុប",
    summary_en: "Thermohaline conveyor belt driven by water density and salinity gradients, Gulf stream heat transport",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-01" },
    body_km: `## ១. ចរន្តទឹកសមុទ្រសកល (Thermohaline Circulation)
គឺជាប្រព័ន្ធខ្សែពានទឹកសមុទ្រពិភពលោកដែលដំណើរការដោយ **ដង់ស៊ីតេទឹក** (ខុសគ្នាតាមសីតុណ្ហភាព និងកំហាប់អំបិល)៖
- ទឹកត្រជាក់ប្រៃនៅប៉ូលខាងជើងធ្លាក់ចុះបាតសមុទ្រ
- ចរន្តទឹកក្តៅ **Gulf Stream** ហូរនាំកម្តៅពីអេក្វាទ័រទៅកាន់ទ្វីបអឺរ៉ុប ជួយឱ្យអឺរ៉ុបខាងលិចមានអាកាសធាតុកក់ក្តៅ។`,
    body_en: `## Ocean Circulation
Thermohaline circulation operates as a planetary conveyor belt driven by temperature and salinity density differentials.`,
  },
  {
    id: "les-g11-earth-02",
    grade: 11,
    sort_order: 2,
    title_km: "បាតុភូតអែលនីញ៉ូ និងឡានីញ៉ា (ENSO)",
    title_en: "El Niño & La Niña Dynamics (ENSO)",
    summary_km: "ការកើនឡើងកម្តៅទឹកសមុទ្រប៉ាស៊ីហ្វិក គ្រោះរាំងស្ងួត និងទឹកជំនន់នៅអាស៊ីអាគ្នេយ៍ និងកម្ពុជា",
    summary_en: "El Niño Southern Oscillation (ENSO), trade wind anomalies, severe droughts, and flash flood patterns in Cambodia",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-02" },
    body_km: `## ១. បាតុភូតអែលនីញ៉ូ (El Niño)
កើតឡើងនៅពេលផ្ទៃទឹកសមុទ្រប៉ាស៊ីហ្វិកកណ្តាល និងខាងកើតឡើងកម្តៅខុសប្រក្រតី ធ្វើឱ្យខ្យល់ជំនួញចុះខ្សោយ៖
- **នៅកម្ពុជា និងអាស៊ីអាគ្នេយ៍ ៖** កើតមាន **គ្រោះរាំងស្ងួត** កម្តៅហួតហែង និងភ្លៀងធ្លាក់យឺត
- **នៅឆ្នេរអាមេរិកខាងត្បូង (ប៉េរូ) ៖** កើតមានភ្លៀងធ្លាក់ជោកជាំ និងទឹកជំនន់

## ២. បាតុភូតឡានីញ៉ា (La Niña)
មានឥទ្ធិពលផ្ទុយគ្នា៖ បង្កឱ្យមានភ្លៀងធ្លាក់ខ្លាំងខុសធម្មតា និងទឹកជំនន់នៅកម្ពុជា។`,
    body_en: `## ENSO Patterns
El Niño warms Pacific waters, triggering droughts in Cambodia. La Niña cools equatorial waters, exacerbating heavy flooding.`,
  },
  {
    id: "les-g11-earth-03",
    grade: 11,
    sort_order: 3,
    title_km: "វដ្តជីវគីមី ៖ វដ្តកាបូន និងអាសូត",
    title_en: "Biogeochemical Cycles: Carbon & Nitrogen",
    summary_km: "ការផ្លាស់ប្តូរកាបូនរវាងបរិយាកាស ជីវមណ្ឌល និងសមុទ្រ ព្រមទាំងបាក់តេរីចាប់អាសូតក្នុងដី",
    summary_en: "Carbon sinks and fluxes, atmospheric reservoirs, and soil nitrogen-fixing bacteria (Rhizobium)",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-03" },
    body_km: `## ១. វដ្តកាបូន (Carbon Cycle)
កាបូន ($CO_2$) ត្រូវបានស្រូបដោយរុក្ខជាតិតាមរយៈរស្មីសំយោគ បញ្ជូនបន្តតាមខ្សែច្រវាក់ចំណីអាហារ និងត្រឡប់ទៅបរិយាកាសវិញតាមរយៈដង្ហើមភាវៈរស់ ការរលួយសាកសព និងការដុតឥន្ធនៈហ្វូស៊ីល។

## ២. វដ្តអាសូត (Nitrogen Cycle)
រុក្ខជាតិមិនអាចស្រូបយក $N_2$ ពីខ្យល់ដោយផ្ទាល់បានទេ។ បាក់តេរីចាប់អាសូត (Rhizobium នៅក្នុងឫសរុក្ខជាតិអំបូរផ្កាសណ្តែក) ជួយបំប្លែង $N_2$ ទៅជា **នីត្រាត ($NO_3^-$)** ដែលរុក្ខជាតិអាចស្រូបបាន។`,
    body_en: `## Biogeochemical Cycles
Carbon flows across atmosphere, oceans, and biosphere. Nitrogen fixation by Rhizobium enables biological protein synthesis.`,
  },
  {
    id: "les-g11-earth-04",
    grade: 11,
    sort_order: 4,
    title_km: "ការប្រែប្រួលអាកាសធាតុសកល និងឧស្ម័នផ្ទះកញ្ចក់",
    title_en: "Global Climate Change & Cryosphere Loss",
    summary_km: "ការកើនឡើងកំហាប់ CO₂ លើស ៤២០ ppm ការរលាយផ្ទាំងទឹកកកប៉ូល និងកម្ពស់ទឹកសមុទ្រឡើង",
    summary_en: "Keeling curve, CO2 exceeding 420 ppm, positive feedback loops, polar ice sheet melt, and sea level rise",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-04" },
    body_km: `## ១. ការកើនឡើងកំហាប់កាបូនិក
ទិន្នន័យពីស្ថានីយ Mauna Loa បង្ហាញថាកំហាប់ $CO_2$ បានកើនឡើងពី $280\\text{ ppm}$ (សម័យមុនបដិវត្តន៍ឧស្សាហកម្ម) ទៅលើស **$420\\text{ ppm}$** នៅពេលបច្ចុប្បន្ន។

## ២. ផលប៉ះពាល់ធ្ងន់ធ្ងរ
- សីតុណ្ហភាពមធ្យមផែនដីកើនឡើងលើស $1.1^\\circ\\text{C}$
- ការរលាយទឹកកកនៅហ្គ្រោអង់ឡង់ និងអង់តាក់ទិក គំរាមកំហែងដល់ទីក្រុងឆ្នេរសមុទ្រពិភពលោក`,
    body_en: `## Climate Change
Anthropogenic greenhouse emissions pushed atmospheric $CO_2$ past 420 ppm, destabilizing the polar cryosphere.`,
  },
  {
    id: "les-g11-earth-05",
    grade: 11,
    sort_order: 5,
    title_km: "តារាសាស្ត្រ ៖ ប្រព័ន្ធព្រះអាទិត្យ និងកាឡាក់ស៊ី Milky Way",
    title_en: "Astronomy: Stellar Systems & The Milky Way",
    summary_km: "កាឡាក់ស៊ីគូទខ្យង Milky Way ឆ្នាំពន្លឺ ផ្កាយព្រះអាទិត្យ និងប្រហោងខ្មៅកណ្តាលកាឡាក់ស៊ី",
    summary_en: "Spiral barred galaxy Milky Way, light-year distances, Sagittarius A* supermassive black hole, and stellar spectra",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-05" },
    body_km: `## ១. កាឡាក់ស៊ីមីលគីវេ (Milky Way Galaxy)
កាឡាក់ស៊ីរបស់យើងជារាងគូទខ្យង (Spiral Galaxy) ដែលមានផ្កាយជាង ២០០ ពាន់លានដួង៖
- អង្កត់ផ្ចិត ៖ ប្រហែល **១០០ ០០០ ឆ្នាំពន្លឺ (Light-years)**
- ១ ឆ្នាំពន្លឺ ៖ ចម្ងាយដែលពន្លឺធ្វើដំណើរក្នុងមួយឆ្នាំ (ប្រហែល $9.46 \\times 10^{12}\\text{ km}$)
- ចំកណ្តាលកាឡាក់ស៊ីមាន **ប្រហោងខ្មៅយក្ស (Supermassive Black Hole)** ឈ្មោះ Sagittarius A*។`,
    body_en: `## The Milky Way
A barred spiral galaxy 100,000 light-years in diameter with over 200 billion stars orbiting supermassive black hole Sagittarius A*.`,
  },

  // ============================================================================
  // ADDITIONAL OFFICIAL MOEYS NATIONAL CURRICULUM LESSONS (GRADE 11 COMPREHENSIVE)
  // ============================================================================

  {
    id: "les-g11-math-06",
    grade: 11,
    sort_order: 6,
    title_km: "រង្វង់ត្រីកោណមាត្រ និងរូបមន្តគ្រឹះ",
    title_en: "Trigonometric Circle & Fundamental Identities",
    summary_km: "និយមន័យស៊ីនុស កូស៊ីនុស តង់សង់ លើរង្វង់ត្រីកោណមាត្រ និងរូបមន្ត sin² x + cos² x = 1",
    summary_en: "Unit trigonometric circle definitions of sine, cosine, tangent, and fundamental Pythagorean trigonometric identities",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-06" },
    body_km: "## ១. រង្វង់ត្រីកោណមាត្រ\nរង្វង់មានផ្ចិតត្រង់គល់កូអរដោនេ $O$ និងមានកាំ $R = 1$ តម្រង់ទិសវិជ្ជមានច្រាសទ្រនិចនាឡិកា។\n- អ័ក្សដេក $Ox$ ៖ អ័ក្សកូស៊ីនុស ($\\cos x$)\n- អ័ក្សឈរ $Oy$ ៖ អ័ក្សស៊ីនុស ($\\sin x$)\n- រូបមន្តគ្រឹះ ៖ $\\sin^2 x + \\cos^2 x = 1$ និង $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$",
    body_en: "## Unit Circle & Identities\nCartesian unit circle framework. Cosine on horizontal axis and sine on vertical axis with core identity sin^2(x) + cos^2(x) = 1.",
  },

  {
    id: "les-g11-math-07",
    grade: 11,
    sort_order: 7,
    title_km: "ផលបូកតួនៃស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ Sn",
    title_en: "Series Sums of Arithmetic & Geometric Sequences",
    summary_km: "រូបមន្តផលបូក n តួដំបូង Sn = n/2(u1 + un) និង Sn = u1(1 - q^n)/(1 - q) ព្រមទាំងអនុវត្តន៍",
    summary_en: "Formulas for finite partial sums of arithmetic progressions Sn = n/2(u1 + un) and geometric sequences Sn = u1(1 - q^n)/(1 - q)",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-07" },
    body_km: "## ១. ផលបូក $n$ តួដំបូងនៃស្វ៊ីតនព្វន្ត\n$$S_n = u_1 + u_2 + \\dots + u_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n - 1)d]}{2}$$\n\n## ២. ផលបូក $n$ តួដំបូងនៃស្វ៊ីតធរណីមាត្រ\n$$S_n = u_1 + u_2 + \\dots + u_n = u_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)$$",
    body_en: "## Sequence Series Sums\nPartial summation formulas for arithmetic series and geometric series with common difference d and ratio q.",
  },

  {
    id: "les-g11-math-08",
    grade: 11,
    sort_order: 8,
    title_km: "បន្ទាត់ និងប្លង់ក្នុងលំហ",
    title_en: "Lines & Planes in Spatial Geometry",
    summary_km: "ទីតាំងធៀបរវាងបន្ទាត់ និងប្លង់ ភាពស្របគ្នាក្នុងលំហ និងលក្ខខណ្ឌបន្ទាត់កាត់ប្លង់",
    summary_en: "Relative spatial positions of lines and planes, parallelism theorems, and piercing intersections in 3D geometry",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-08" },
    body_km: "## ១. ទីតាំងធៀបរវាងបន្ទាត់ $(d)$ និងប្លង់ $(P)$\n1. បន្ទាត់ $(d)$ ស្របនឹងប្លង់ $(P)$ ៖ $(d) \\cap (P) = \\emptyset$\n2. បន្ទាត់ $(d)$ កាត់ប្លង់ $(P)$ ត្រង់ចំណុចមួយ ៖ $(d) \\cap (P) = \\{M\\}$\n3. បន្ទាត់ $(d)$ ស្ថិតក្នុងប្លង់ $(P)$ ៖ $(d) \\subset (P)$",
    body_en: "## Spatial Lines & Planes\nThree relative configurations: line parallel to plane, intersecting at single point, or lying entirely within the plane.",
  },

  {
    id: "les-g11-math-09",
    grade: 11,
    sort_order: 9,
    title_km: "បន្ទាត់កែងនឹងប្លង់ និងទ្រឹស្តីបទមុំបីកែង",
    title_en: "Perpendicular Lines to Planes & Three Perpendiculars Theorem",
    summary_km: "លក្ខខណ្ឌបន្ទាត់កែងនឹងប្លង់ ទ្រឹស្តីបទមុំបីកែង និងការគណនាមុំរវាងបន្ទាត់និងប្លង់",
    summary_en: "Criteria for perpendicularity between lines and planes, the theorem of three perpendiculars, and dihedral angles",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-09" },
    body_km: "## ១. លក្ខខណ្ឌបន្ទាត់កែងនឹងប្លង់\nបន្ទាត់ $(d)$ កែងនឹងប្លង់ $(P)$ លុះត្រាតែ $(d)$ កែងនឹងបន្ទាត់កាត់គ្នាពីរដែលស្ថិតក្នុងប្លង់ $(P)$។\n- បើ $(d) \\perp (P)$ នោះ $(d)$ កែងនឹងគ្រប់បន្ទាត់ទាំងអស់ដែលស្ថិតក្នុងប្លង់ $(P)$។",
    body_en: "## Perpendicularity in Space\nA line is perpendicular to a plane if and only if it is perpendicular to two intersecting lines lying within that plane.",
  },

  {
    id: "les-g11-math-10",
    grade: 11,
    sort_order: 10,
    title_km: "ព្រឹត្តិការណ៍ និងការគណនាប្រូបាប៊ីលីតេគ្រឹះ",
    title_en: "Events, Sample Space & Introductory Probability",
    summary_km: "លំហសំណាក Ω ព្រឹត្តិការណ៍ ច្បាប់ឡាប្លាស P(A) = n(A) / n(Ω) និងផលបូកប្រូបាប",
    summary_en: "Sample space Ω, event subsets, classical Laplace probability P(A) = n(A) / n(Ω), and addition rule of probability",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-10" },
    body_km: "## ១. រូបមន្តប្រូបាប៊ីលីតេក្លាស៊ិក (Laplace)\n$$P(A) = \\frac{\\text{ចំនួនករណីស្រប}}{\\text{ចំនួនករណីអាច}} = \\frac{n(A)}{n(\\Omega)}$$\n- $0 \\le P(A) \\le 1$\n- $P(\\emptyset) = 0$ (ព្រឹត្តិការណ៍មិនអាចកើតឡើង)\n- $P(\\Omega) = 1$ (ព្រឹត្តិការណ៍ប្រាកដ)",
    body_en: "## Classical Probability\nLaplace probability quotient of favorable outcomes over total possible elementary outcomes within sample space.",
  },

  {
    id: "les-g11-phys-06",
    grade: 11,
    sort_order: 6,
    title_km: "ច្បាប់អូមសម្រាប់សៀគ្វីទាំងមូល",
    title_en: "Ohm's Law for Complete Closed Circuits",
    summary_km: "កម្លាំងអគ្គិសនីចលករ E រេស៊ីស្តង់ក្នុង r និងច្បាប់អូមសម្រាប់សៀគ្វីទាំងមូល I = E / (R + r)",
    summary_en: "Electromotive force E, internal generator resistance r, and Ohm's law for complete closed loop circuits",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-06" },
    body_km: "## ច្បាប់អូមសម្រាប់សៀគ្វីបិទទាំងមូល\n$$I = \\frac{E}{R_{\\text{ext}} + r}$$\n- $E$ ៖ កម្លាំងអគ្គិសនីចលករនៃប្រភព (V)\n- $R_{\\text{ext}}$ ៖ រេស៊ីស្តង់សរុបខាងក្រៅ ($\\Omega$)\n- $r$ ៖ រេស៊ីស្តង់ក្នុងនៃប្រភព ($\\Omega$)\n- តង់ស្យុងរវាងប៉ូលប្រភព ៖ $U = E - rI$",
    body_en: "## Ohm's Law for Closed Circuits\nTotal circuit current determined by generator EMF divided by total external load plus internal resistance.",
  },

  {
    id: "les-g11-phys-07",
    grade: 11,
    sort_order: 7,
    title_km: "កម្លាំងអេឡិចត្រូម៉ាញេទិច ឬកម្លាំងឡាប្លាស",
    title_en: "Laplace Electromagnetic Force on Conductors",
    summary_km: "កម្លាំងឡាប្លាស F = I L B sin θ វិធានដៃស្តាំ និងគោលការណ៍ដំណើរការនៃម៉ូទ័រអគ្គិសនី",
    summary_en: "Laplace force F = I L B sin θ acting on current-carrying conductors in magnetic fields and DC electric motors",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g11-phys-07" },
    body_km: "## រូបមន្តកម្លាំងឡាប្លាស (Laplace Force)\n$$F = I \\cdot L \\cdot B \\cdot \\sin\\theta$$\n- $I$ ៖ អាំងតង់ស៊ីតេចរន្ត (A)\n- $L$ ៖ ប្រវែងខ្សែចម្លងក្នុងដែនម៉ាញេទិច (m)\n- $B$ ៖ អាំងឌុចស្យុងម៉ាញេទិច (Tesla - T)\n- $\\theta$ ៖ មុំរវាងទិសដៅចរន្ត និងដែនម៉ាញេទិច",
    body_en: "## Laplace Force\nMagnetic Lorentz force integrated over macroscopic conductors carrying electric current through uniform magnetic flux.",
  },

  {
    id: "les-g11-chem-06",
    grade: 11,
    sort_order: 6,
    title_km: "ច្បាប់ប៊យ-ម៉ារីយ៉ូត និងសមីការឧស្ម័នបរិសុទ្ធ PV = nRT",
    title_en: "Boyle-Mariotte Law & Ideal Gas Equation PV = nRT",
    summary_km: "លក្ខណៈនៃឧស្ម័នបរិសុទ្ធ ច្បាប់ Boyle-Mariotte ច្បាប់ Charles និងសមីការសភាព PV = nRT",
    summary_en: "Thermodynamic state equations for ideal gases, isothermal compression, and universal gas constant R = 0.082",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-06" },
    body_km: "## សមីការសភាពឧស្ម័នបរិសុទ្ធ\n$$P \\cdot V = n \\cdot R \\cdot T$$\n- $P$ ៖ សម្ពាធ (atm)\n- $V$ ៖ មាឌ (L)\n- $n$ ៖ ចំនួនម៉ូល (mol)\n- $R = 0.082 \\, \\text{L}\\cdot\\text{atm}/(\\text{mol}\\cdot\\text{K})$\n- $T = t(^\\circ\\text{C}) + 273.15$ (សីតុណ្ហភាពដាច់ខាតគិតជា Kelvin)",
    body_en: "## Ideal Gas Law\nUniversal gas state equation PV = nRT relating pressure, volume, temperature in Kelvin, and molar quantities.",
  },

  {
    id: "les-g11-chem-07",
    grade: 11,
    sort_order: 7,
    title_km: "អ៊ីដ្រូកាបួក្រអូប ៖ បង់សែន C6H6",
    title_en: "Aromatic Hydrocarbons: Benzene & Resonance",
    summary_km: "រចនាសម្ព័ន្ធបង់សែន Kekulé ភាពរ៉េសូណង់នៃសម្ព័ន្ធ π ប្រតិកម្មជំនួសនីត្រាតកម្ម និងក្លរកម្ម",
    summary_en: "Benzene planar ring geometry, conjugated pi-electron resonance delocalization, and aromatic electrophilic substitution",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g11-chem-07" },
    body_km: "## ១. រចនាសម្ព័ន្ធបង់សែន ($\\text{C}_6\\text{H}_6$)\n- រាងឆកោនស្មើប្លង់ មានអេឡិចត្រុង $\\pi$ ចំនួន ៦ វិលវល់សេរីលើរង្វង់ (Delocalized Electron Cloud) ធ្វើឱ្យបង់សែនមានស្ថេរភាពខ្ពស់។\n- **ប្រតិកម្មលក្ខណៈ ៖** ងាយចូលរួមក្នុងប្រតិកម្មជំនួស ពិបាកចូលរួមក្នុងប្រតិកម្មបូក។",
    body_en: "## Benzene & Aromaticity\nPlanar hexagonal resonance stabilized aromatic ring favoring electrophilic substitution over addition.",
  },

  {
    id: "les-g11-bio-06",
    grade: 11,
    sort_order: 6,
    title_km: "ការ fermentation ឬការឡើងមេ",
    title_en: "Anaerobic Fermentation: Alcoholic & Lactic",
    summary_km: "ការដោះដូរថាមពលក្នុងលក្ខខណ្ឌគ្មានអុកស៊ីសែន ការឡើងមេស្រា (Alcoholic) និងការឡើងមេទឹកដោះគោ (Lactic)",
    summary_en: "Anaerobic cellular respiration pathways, pyruvate conversion in yeast brewing and muscle lactic acidification",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g11-bio-06" },
    body_km: "## ការឡើងមេ (Fermentation)\nកើតឡើងនៅពេលគ្មានអុកស៊ីសែន ($O_2$) ក្នុងស៊ីតូប្លាស៖\n- **ការឡើងមេស្រា (Alcoholic Fermentation) ៖**\n  $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2 + 2\\text{ATP}$$\n- **ការឡើងមេឡាក់ទិច (Lactic Fermentation) ៖** កើតឡើងក្នុងសាច់ដុំមនុស្សពេលហាត់ប្រាណខ្លាំង និងក្នុងបាក់តេរីទឹកដោះគោជូរ។",
    body_en: "## Anaerobic Respiration\nFermentation mechanisms yielding ethanol or lactic acid with net 2 ATP yield in the absence of oxygen.",
  },

  {
    id: "les-g11-earth-06",
    grade: 11,
    sort_order: 6,
    title_km: "ស្រទាប់អូហ្សូន និងកិច្ចព្រមព្រៀងម៉ុងត្រេអាល់",
    title_en: "Stratospheric Ozone & The Montreal Protocol",
    summary_km: "តួនាទីស្រទាប់អូហ្សូន O3 ក្នុងការស្រូបកាំរស្មី UV ឧស្ម័ន CFCs និងជោគជ័យនៃកិច្ចព្រមព្រៀង Montreal",
    summary_en: "Stratospheric ozone UV filtration, CFC catalytic destruction mechanisms, and global recovery via the Montreal Protocol",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g11-earth-06" },
    body_km: "## ១. តួនាទីស្រទាប់អូហ្សូន ($\\text{O}_3$)\nស្ថិតនៅក្នុងស្រទាប់ស្ត្រាតូស៊្វែរ (កម្ពស់ ២០-៣០ គីឡូម៉ែត្រ) មាននាទីស្រូបយកកាំរស្មីស្វាយអ៊ុលត្រា (UV-B, UV-C) ដ៏គ្រោះថ្នាក់ពីព្រះអាទិត្យ មិនឱ្យមកប៉ះពាល់ស្បែក និងភ្នែកមនុស្សឡើយ។\n- សារធាតុ CFCs (ក្លរ៉ូភ្លុយអរ៉ូកាបូន) បំផ្លាញអូហ្សូន ត្រូវបានហាមឃាត់ជាសកលតាមកិច្ចព្រមព្រៀងម៉ុងត្រេអាល់ ១៩៨៧។",
    body_en: "## Stratospheric Ozone\nProtective shielding against high-energy solar UV radiation and the historic environmental success of CFC phaseout treaties.",
  },

  // ============================================================================
  // GRADE 11 MATHEMATICS EXPANDED MASTERY ROADMAP (MOEYS NATIONAL STANDARDS)
  // ============================================================================

  // Unit 1: Trigonometry Expanded
  {
    id: "les-g11-math-11",
    grade: 11,
    sort_order: 11,
    title_km: "រូបមន្តបម្លែងផលបូកទៅជាផលគុណ និងផលគុណទៅជាផលបូក",
    title_en: "Sum-to-Product & Product-to-Sum Trigonometric Identities",
    summary_km: "រូបមន្ត Simpson បម្លែង cos a + cos b, sin a + sin b និងការអនុវត្តសម្រួលកន្សោមត្រីកោណមាត្រ",
    summary_en: "Simpson's trigonometric transformation identities: converting sums to products and products to sums for algebraic simplification",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-11" },
    body_km: `## ១. រូបមន្តបម្លែងផលបូកទៅជាផលគុណ
- $\\cos p + \\cos q = 2\\cos\\frac{p+q}{2}\\cos\\frac{p-q}{2}$
- $\\cos p - \\cos q = -2\\sin\\frac{p+q}{2}\\sin\\frac{p-q}{2}$
- $\\sin p + \\sin q = 2\\sin\\frac{p+q}{2}\\cos\\frac{p-q}{2}$
- $\\sin p - \\sin q = 2\\sin\\frac{p-q}{2}\\cos\\frac{p+q}{2}$

## ២. រូបមន្តបម្លែងផលគុណទៅជាផលបូក
- $\\cos a \\cos b = \\frac{1}{2}[\\cos(a+b) + \\cos(a-b)]$
- $\\sin a \\sin b = -\\frac{1}{2}[\\cos(a+b) - \\cos(a-b)]$
- $\\sin a \\cos b = \\frac{1}{2}[\\sin(a+b) + \\sin(a-b)]$`,
    body_en: "## Simpson Trigonometric Transformations\nFormulas for converting trigonometric sums to products and products to sums, essential for solving trigonometric equations.",
  },

  {
    id: "les-g11-math-12",
    grade: 11,
    sort_order: 12,
    title_km: "សមីការលីនេអ៊ែរត្រីកោណមាត្រ a cos x + b sin x = c",
    title_en: "Linear Trigonometric Equations a cos x + b sin x = c",
    summary_km: "វិធីសាស្ត្រមុំជំនួយ ចែកអង្គទាំងពីរនឹង √(a² + b²) និងលក្ខខណ្ឌមានឫស a² + b² ≥ c²",
    summary_en: "Auxiliary angle method, dividing both sides by sqrt(a^2 + b^2), and solvability condition a^2 + b^2 >= c^2",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-12" },
    body_km: `## ១. ទម្រង់សមីការ
$$a\\cos x + b\\sin x = c \\quad (a^2 + b^2 \\neq 0)$$

## ២. លក្ខខណ្ឌមានឫស
សមីការមានឫសលុះត្រាតែ $a^2 + b^2 \\ge c^2$។

## ៣. វិធីសាស្ត្រដោះស្រាយ
ចែកអង្គទាំងពីរនឹង $\\sqrt{a^2 + b^2}$៖
$$\\frac{a}{\\sqrt{a^2+b^2}}\\cos x + \\frac{b}{\\sqrt{a^2+b^2}}\\sin x = \\frac{c}{\\sqrt{a^2+b^2}}$$
តាង $\\cos\\varphi = \\frac{a}{\\sqrt{a^2+b^2}}$ និង $\\sin\\varphi = \\frac{b}{\\sqrt{a^2+b^2}}$៖
$$\\cos(x - \\varphi) = \\frac{c}{\\sqrt{a^2+b^2}}$$`,
    body_en: "## Auxiliary Angle Method\nSolve a cos x + b sin x = c by dividing by sqrt(a^2+b^2) and reducing to a simple cosine equation.",
  },

  {
    id: "les-g11-math-13",
    grade: 11,
    sort_order: 13,
    title_km: "វិសមីការត្រីកោណមាត្រលើរង្វង់ត្រីកោណមាត្រ",
    title_en: "Trigonometric Inequalities on the Unit Circle",
    summary_km: "ការដោះស្រាយ sin x > a, cos x ≤ a តាមរយៈធ្នូរង្វង់ត្រីកោណមាត្រ និងកំណត់ចន្លោះចម្លើយ",
    summary_en: "Solving basic and compound trigonometric inequalities using circular arc projections on the unit circle",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-13" },
    body_km: `## ១. វិសមីការ $\\sin x > a$
- បើ $a > 1$ ៖ វិសមីការគ្មានចម្លើយ
- បើ $a < -1$ ៖ ផ្ទៀងផ្ទាត់គ្រប់ $x \\in \\mathbb{R}$
- បើ $-1 \\le a \\le 1$ ៖ គូសបន្ទាត់ដេក $y = a$ កាត់រង្វង់ត្រីកោណមាត្រ រួចយកធ្នូដែលនៅខាងលើបន្ទាត់នេះ។

## ២. វិសមីការ $\\cos x > a$
- គូសបន្ទាត់ឈរ $x = a$ កាត់រង្វង់ត្រីកោណមាត្រ រួចយកធ្នូដែលនៅខាងស្តាំបន្ទាត់នេះ។`,
    body_en: "## Circular Arc Inequalities\nDetermine solution sets for sin x > a and cos x > a using vertical and horizontal cutoff lines on the unit trigonometric circle.",
  },

  {
    id: "les-g11-math-14",
    grade: 11,
    sort_order: 14,
    title_km: "អនុគមន៍ខួប និងការអនុវត្តរលកស៊ីនុស",
    title_en: "Periodic Trigonometric Functions & Real-world Sine Waves",
    summary_km: "ខួប T = 2π/|ω| អំព្លីទុត A ដំណាក់ផាស និងការគំរូនីយកម្មរលកសំឡេង ចរន្តអគ្គិសនីឆ្លាស់",
    summary_en: "Period T = 2pi/|omega|, amplitude A, phase shift, and mathematical modeling of sound waves and AC alternating current",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-14" },
    body_km: `## ១. អនុគមន៍ស៊ីនុសទូទៅ
$$y = A\\sin(\\omega x + \\varphi) + D$$
- **អំព្លីទុត (Amplitude) ៖** $|A|$
- **ខួប (Period) ៖** $T = \\frac{2\\pi}{|\\omega|}$
- **ប្រេកង់ (Frequency) ៖** $f = \\frac{1}{T} = \\frac{|\\omega|}{2\\pi}$
- **ផាសដើម (Phase angle) ៖** $\\varphi$`,
    body_en: "## Sinusoidal Wave Modeling\nParameters of harmonic sinusoidal functions: Amplitude A, angular frequency omega, period T, and phase angle phi.",
  },

  // Unit 2: Sequences Expanded
  {
    id: "les-g11-math-15",
    grade: 11,
    sort_order: 15,
    title_km: "ស្វ៊ីតនព្វន្ត ៖ ផលសងរួម d និងតួទូទៅ un",
    title_en: "Arithmetic Progressions: Common Difference d & General Term un",
    summary_km: "និយមន័យ un+1 = un + d រូបមន្ត un = u1 + (n - 1)d និងការកំណត់ស្វ៊ីតពីតួពីរផ្សេងគ្នា",
    summary_en: "Arithmetic recurrence relation un+1 = un + d, general nth term formula un = u1 + (n - 1)d, and determining terms",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-15" },
    body_km: `## ១. និយមន័យស្វ៊ីតនព្វន្ត
ស្វ៊ីត $(u_n)$ ជាស្វ៊ីតនព្វន្ត លុះត្រាតែគ្រប់ $n \\ge 1$ ៖
$$u_{n+1} - u_n = d \\quad (d = \\text{ចំនួនថេរ ហៅថាផលសងរួម})$$

## ២. រូបមន្តតួទូទៅ
$$u_n = u_1 + (n - 1)d$$
បើគេស្គាល់តួទី $p$ ៖
$$u_n = u_p + (n - p)d$$

## ៣. លក្ខណៈសម្បត្តិ ៣ តួជាប់គ្នា
បើ $a, b, c$ ជាបីតួជាប់គ្នានៃស្វ៊ីតនព្វន្ត នោះ៖
$$a + c = 2b \\iff b = \\frac{a + c}{2}$$`,
    body_en: "## Arithmetic Progressions\nGeneral term un = u1 + (n - 1)d and arithmetic mean property: three consecutive terms satisfy a + c = 2b.",
  },

  {
    id: "les-g11-math-16",
    grade: 11,
    sort_order: 16,
    title_km: "ស្វ៊ីតធរណីមាត្រ ៖ ផលធៀបរួម q និងតួទូទៅ un",
    title_en: "Geometric Progressions: Common Ratio q & General Term un",
    summary_km: "និយមន័យ un+1 = un × q រូបមន្ត un = u1 × q^(n-1) និងលក្ខណៈ ៣ តួជាប់គ្នា b² = ac",
    summary_en: "Geometric recurrence un+1 = un * q, general term un = u1 * q^(n-1), and geometric mean property b^2 = ac",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-16" },
    body_km: `## ១. និយមន័យស្វ៊ីតធរណីមាត្រ
ស្វ៊ីត $(u_n)$ ជាស្វ៊ីតធរណីមាត្រ លុះត្រាតែគ្រប់ $n \\ge 1$ ៖
$$\\frac{u_{n+1}}{u_n} = q \\quad (q = \\text{ចំនួនថេរ ហៅថាផលធៀបរួម})$$

## ២. រូបមន្តតួទូទៅ
$$u_n = u_1 \\cdot q^{n-1}$$
បើគេស្គាល់តួទី $p$ ៖
$$u_n = u_p \\cdot q^{n-p}$$

## ៣. លក្ខណៈសម្បត្តិ ៣ តួជាប់គ្នា
បើ $a, b, c$ ជាបីតួជាប់គ្នានៃស្វ៊ីតធរណីមាត្រ នោះ៖
$$b^2 = ac \\iff b = \\pm\\sqrt{ac}$$`,
    body_en: "## Geometric Progressions\nGeneral nth term formula un = u1 * q^(n-1) and geometric mean property b^2 = ac.",
  },

  {
    id: "les-g11-math-17",
    grade: 11,
    sort_order: 17,
    title_km: "ផលបូកអនន្តនៃស្វ៊ីតធរណីមាត្រចុះអនន្ត |q| < 1",
    title_en: "Infinite Geometric Series Sum (|q| < 1)",
    summary_km: "លក្ខខណ្ឌរួមចូល |q| < 1 រូបមន្ត S = u1 / (1 - q) និងការបម្លែងចំនួនទសភាគខួបទៅជាប្រភាគ",
    summary_en: "Convergence condition |q| < 1, sum of infinite geometric series S = u1 / (1 - q), and converting repeating decimals to fractions",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-17" },
    body_km: `## ១. ផលបូកអនន្តនៃស្វ៊ីតធរណីមាត្រ
នៅពេល $n \\to +\\infty$ និង $|q| < 1$ នោះ $q^n \\to 0$៖
$$S = \\lim_{n\\to +\\infty} S_n = \\lim_{n\\to +\\infty} u_1\\frac{1 - q^n}{1 - q} = \\frac{u_1}{1 - q}$$

## ២. ការអនុវត្ត ៖ សរសេរចំនួនទសភាគខួបជាប្រភាគ
ឧទាហរណ៍ ៖ $0.333\\dots = 0.3 + 0.03 + 0.003 + \\dots$
- $u_1 = 0.3 = \\frac{3}{10}$
- $q = 0.1 = \\frac{1}{10} < 1$
$$S = \\frac{0.3}{1 - 0.1} = \\frac{0.3}{0.9} = \\frac{1}{3}$$`,
    body_en: "## Infinite Geometric Series\nWhen |q| < 1, the infinite geometric series converges to S = u1 / (1 - q). Applied to recurring decimal conversions.",
  },

  {
    id: "les-g11-math-18",
    grade: 11,
    sort_order: 18,
    title_km: "វិចារអនុមានរួមគណិតវិទ្យា (Mathematical Induction)",
    title_en: "Proof by Mathematical Induction",
    summary_km: "គោលការណ៍ ៣ ជំហាន ៖ ផ្ទៀងផ្ទាត់មូលដ្ឋាន n=1 សន្មតពិតចំពោះ n=k និងស្រាយបញ្ជាក់ចំពោះ n=k+1",
    summary_en: "Three-step principle of mathematical induction: base case n=1, inductive hypothesis n=k, and inductive step n=k+1",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-18" },
    body_km: `## ១. គោលការណ៍វិចារអនុមានរួមគណិតវិទ្យា
ដើម្បីស្រាយបញ្ជាក់ថាសំណើ $P(n)$ ពិតចំពោះគ្រប់ចំនួនគត់ធម្មជាតិ $n \\ge n_0$ ៖
1. **ជំហានទី ១ (មូលដ្ឋាន) ៖** បង្ហាញថា $P(n_0)$ ពិត។
2. **ជំហានទី ២ (សម្មតិកម្ម) ៖** សន្មតថា $P(k)$ ពិតចំពោះចំនួនគត់ $k \\ge n_0$។
3. **ជំហានទី ៣ (ការសន្និដ្ឋាន) ៖** បង្ហាញថា $P(k+1)$ ក៏ពិតដែរ។
ដូចនេះ $P(n)$ ពិតចំពោះគ្រប់ $n \\ge n_0$។`,
    body_en: "## Mathematical Induction\nRigorous proof technique verifying mathematical propositions for all integers n >= n0 in three formal steps.",
  },

  // Unit 3: Limits & Derivatives Expanded
  {
    id: "les-g11-math-19",
    grade: 11,
    sort_order: 19,
    title_km: "លីមីតរាងមិនកំណត់ 0/0 និង ∞/∞ ក្នុងថ្នាក់ទី ១១",
    title_en: "Indeterminate Limits 0/0 & Infinity/Infinity in Grade 11",
    summary_km: "វិធីសាស្ត្របំបែកជាកត្តា (x - a) គុណកន្សោមកំប្លេ និងការដាក់តួមានស្វ័យគុណធំបំផុតជាកត្តារួម",
    summary_en: "Techniques for 0/0 and inf/inf limits: polynomial factoring, radical conjugates, and highest-degree factorization",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-19" },
    body_km: `## ១. រាងមិនកំណត់ $\\left[\\frac{0}{0}\\right]$
- **កន្សោមពហុធា ៖** បំបែកភាគយក និងភាគបែងជាកត្តា $(x - a)$ រួចសម្រួលចោល។
- **កន្សោមមានរ៉ាឌីកាល់ ៖** គុណភាគយក និងភាគបែងនឹងកន្សោមកំប្លេ $(\\sqrt{A} + B)$ រួចសម្រួលកត្តាដែលធ្វើឱ្យស្មើ 0។

## ២. រាងមិនកំណត់ $\\left[\\frac{\\infty}{\\infty}\\right]$
- ទាញតួដែលមានស្វ័យគុណធំបំផុតនៅភាគយក និងភាគបែងជាកត្តា រួចប្រើលក្ខណៈ $\\lim_{x\\to\\infty} \\frac{1}{x^n} = 0$។`,
    body_en: "## Indeterminate Limits Techniques\nFactoring, rationalizing conjugates, and highest-power asymptotic dominance for solving Grade 11 limits.",
  },

  {
    id: "les-g11-math-20",
    grade: 11,
    sort_order: 20,
    title_km: "សមីការបន្ទាត់ប៉ះក្រាបតំណាងអនុគមន៍",
    title_en: "Equations of Tangent Lines to Function Curves",
    summary_km: "រូបមន្តបន្ទាត់ប៉ះ (T): y = f'(x0)(x - x0) + f(x0) មេគុណប្រាប់ទិសបន្ទាត់ប៉ះ k = f'(x0) និងចំណុចប៉ះ",
    summary_en: "Tangent line formula (T): y = f'(x0)(x - x0) + f(x0), slope of tangent k = f'(x0), and contact point coordinates",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-20" },
    body_km: `## ១. រូបមន្តសមីការបន្ទាត់ប៉ះ
សមីការបន្ទាត់ប៉ះ $(T)$ ទៅនឹងក្រាប $(C)$ នៃអនុគមន៍ $y = f(x)$ ត្រង់ចំណុច $M_0(x_0, y_0)$ គឺ៖
$$(T) : y = f'(x_0)(x - x_0) + y_0 \\quad (\\text{ដោយ } y_0 = f(x_0))$$

- **មេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះ ៖** $k = f'(x_0)$
- បើ $f'(x_0) = 0$ ៖ បន្ទាត់ប៉ះជា **បន្ទាត់ដេក** $y = y_0$ (ត្រង់ចំណុចបរមា)។`,
    body_en: "## Tangent Line Equations\nFormula (T): y = f'(x0)(x - x0) + f(x0). Geometric interpretation of derivative as slope of tangent.",
  },

  {
    id: "les-g11-math-21",
    grade: 11,
    sort_order: 21,
    title_km: "ទិសដៅអថេរភាព និងចំណុចបរមាធៀបនៃអនុគមន៍",
    title_en: "Monotonicity & Local Extrema of Functions",
    summary_km: "សញ្ញានៃ f'(x) អនុគមន៍ឡើង (f' > 0) អនុគមន៍ចុះ (f' < 0) និងលក្ខខណ្ឌមានតម្លៃអតិបរមា/អប្បបរមាធៀប",
    summary_en: "Sign of f'(x), increasing intervals (f' > 0), decreasing intervals (f' < 0), and local extrema criteria",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-21" },
    body_km: `## ១. ទិសដៅអថេរភាព
- បើ $f'(x) > 0$ លើចន្លោះ $I$ នោះ $f$ ជា **អនុគមន៍កើន** លើ $I$។
- បើ $f'(x) < 0$ លើចន្លោះ $I$ នោះ $f$ ជា **អនុគមន៍ចុះ** លើ $I$។
- បើ $f'(x) = 0$ លើចន្លោះ $I$ នោះ $f$ ជា **អនុគមន៍ថេរ** លើ $I$។

## ២. ចំណុចបរមាធៀប
បើ $f'(x_0) = 0$ ហើយ $f'(x)$ ប្តូរសញ្ញាកាត់តាម $x_0$ ៖
- ពី $(+)$ ទៅ $(-)$ ៖ $f(x_0)$ ជា **តម្លៃអតិបរមាធៀប**
- ពី $(-)$ ទៅ $(+)$ ៖ $f(x_0)$ ជា **តម្លៃអប្បបរមាធៀប**`,
    body_en: "## Function Monotonicity & Extrema\nFirst derivative test for increasing/decreasing intervals and classifying local maxima and minima.",
  },

  // Unit 4: Spatial Geometry Expanded
  {
    id: "les-g11-math-22",
    grade: 11,
    sort_order: 22,
    title_km: "ភាពស្របគ្នាក្នុងលំហ ៖ បន្ទាត់ និងប្លង់ស្របគ្នា",
    title_en: "Parallelism in 3D Space: Parallel Lines & Planes",
    summary_km: "បន្ទាត់ពីរស្របគ្នា បន្ទាត់ស្របនឹងប្លង់ ប្លង់ពីរស្របគ្នា និងទ្រឹស្តីបទដំបូលផ្ទះ (Roof Theorem)",
    summary_en: "Parallel spatial lines, line parallel to plane criteria, parallel planes, and the roof intersection theorem",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-22" },
    body_km: `## ១. បន្ទាត់ស្របនឹងប្លង់
បន្ទាត់ $(d)$ ស្របនឹងប្លង់ $(P)$ លុះត្រាតែ $(d)$ មិនស្ថិតក្នុង $(P)$ ហើយ $(d)$ ស្របនឹងបន្ទាត់ $(d')$ ណាមួយក្នុង $(P)$។

## ២. ប្លង់ពីរស្របគ្នា
ប្លង់ $(P)$ ស្របនឹងប្លង់ $(Q)$ លុះត្រាតែ $(P)$ មានផ្ទុកបន្ទាត់កាត់គ្នាពីរដែលស្របនឹងប្លង់ $(Q)$។
- បើប្លង់ទីបី $(R)$ កាត់ប្លង់ស្របគ្នាពីរ $(P)$ និង $(Q)$ នោះបន្ទាត់ប្រសព្វទាំងពីរស្របគ្នាជានិច្ច។`,
    body_en: "## Spatial Parallelism\nTheorems governing parallel lines, lines parallel to planes, and parallel plane configurations in solid geometry.",
  },

  {
    id: "les-g11-math-23",
    grade: 11,
    sort_order: 23,
    title_km: "ចម្ងាយក្នុងលំហ ៖ ពីចំណុចទៅបន្ទាត់ និងពីចំណុចទៅប្លង់",
    title_en: "Distances in 3D Space: Point to Line & Point to Plane",
    summary_km: "ចំណោលកែងលើប្លង់ ចម្ងាយខ្លីបំផុត និងការគណនាប្រវែងចំណោលកែងតាមទ្រឹស្តីបទពីតាករ",
    summary_en: "Orthogonal projection on planes, shortest spatial distance, and computing projection lengths via Pythagorean theorem",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-23" },
    body_km: `## ១. ចម្ងាយពីចំណុច $A$ ទៅប្លង់ $(P)$
តាង $H$ ជាចំណោលកែងនៃ $A$ លើប្លង់ $(P)$ ($AH \\perp (P)$ ត្រង់ $H$)៖
$$d(A, (P)) = AH$$
ចម្ងាយ $AH$ ជាចម្ងាយខ្លីបំផុតពីចំណុច $A$ ទៅកាន់ចំណុចទាំងឡាយនៃប្លង់ $(P)$។

## ២. ចម្ងាយរវាងបន្ទាត់ស្របពីរ និងប្លង់ស្របពីរ
ចម្ងាយរវាងប្លង់ស្របគ្នាពីរ $(P)$ និង $(Q)$ ស្មើនឹងចម្ងាយពីចំណុចណាមួយនៃ $(P)$ ទៅកាន់ $(Q)$។`,
    body_en: "## Spatial Distances\nDefinition and calculation of orthogonal projections and minimal Euclidean distance from points to planes.",
  },

  {
    id: "les-g11-math-24",
    grade: 11,
    sort_order: 24,
    title_km: "មាឌ និងផ្ទៃក្រឡានៃសូលីតក្នុងលំហ (ព្រីស ពីរ៉ាមីត កោន)",
    title_en: "Volumes & Surface Areas of Polyhedra (Prisms, Pyramids, Cones)",
    summary_km: "រូបមន្តមាឌ V = B × h (ព្រីស), V = 1/3 B × h (ពីរ៉ាមីត និងកោន) និងផ្ទៃក្រឡាខាង",
    summary_en: "Volume formulas V = B * h (prisms/cylinders), V = 1/3 B * h (pyramids/cones), and lateral surface areas",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-24" },
    body_km: `## ១. ព្រីសត្រង់ និងស៊ីឡាំង
- **មាឌ ៖** $V = B \\times h$ ($B$ = ក្រឡាផ្ទៃបាត, $h$ = កម្ពស់)
- **ផ្ទៃក្រឡាខាង ៖** $S_{\\text{lat}} = p \\times h$ ($p$ = បរិមាត្របាត)

## ២. ពីរ៉ាមីត និងកោន
- **មាឌ ៖** $V = \\frac{1}{3} B \\times h$
- **ផ្ទៃក្រឡាខាងកោន ៖** $S_{\\text{lat}} = \\pi r g$ ($g$ = អាប៉ូតែម $\\sqrt{r^2 + h^2}$)`,
    body_en: "## Solid Geometry Formulas\nVolume and surface area computations for standard polyhedra: prisms, cylinders, pyramids, and circular cones.",
  },

  // Unit 5: Combinatorics & Probability Expanded
  {
    id: "les-g11-math-25",
    grade: 11,
    sort_order: 25,
    title_km: "គោលការណ៍បូក និងគោលការណ៍គុណនៃការរាប់",
    title_en: "Fundamental Counting Principles: Addition & Multiplication",
    summary_km: "គោលការណ៍បូក (ករណីដាច់ដោយឡែក) និងគោលការណ៍គុណ (ដំណាក់កាលបន្តបន្ទាប់ m × n)",
    summary_en: "Rule of sum for mutually exclusive choices and rule of product for sequential multi-stage decision procedures",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-25" },
    body_km: `## ១. គោលការណ៍បូក (Rule of Sum)
បើកិច្ចការមួយអាចសម្រេចបានតាមវិធី $A$ ចំនួន $m$ របៀប ឬតាមវិធី $B$ ចំនួន $n$ របៀប ដោយវិធីទាំងពីរមិនអាចធ្វើព្រមគ្នាបានទេ នោះចំនួនរបៀបសរុបគឺ៖
$$N = m + n$$

## ២. គោលការណ៍គុណ (Rule of Product)
បើកិច្ចការមួយត្រូវឆ្លងកាត់ពីរដំណាក់កាល ៖ ដំណាក់កាលទី១ មាន $m$ ជម្រើស ហើយចំពោះជម្រើសនីមួយៗ ដំណាក់កាលទី២ មាន $n$ ជម្រើស នោះចំនួនជម្រើសសរុបគឺ៖
$$N = m \\times n$$`,
    body_en: "## Counting Foundations\nFundamental sum rule for disjoint alternative sets and product rule for multi-stage independent events.",
  },

  {
    id: "les-g11-math-26",
    grade: 11,
    sort_order: 26,
    title_km: "ចម្លាស់ Pn = n! និងការរៀប Ank",
    title_en: "Permutations Pn = n! & Arrangements Ank",
    summary_km: "កត្តាតាម n! ចម្លាស់នៃ n ធាតុ និងការរៀប k ធាតុចេញពី n ធាតុ Ank = n! / (n - k)!",
    summary_en: "Factorial n!, permutations of n distinct elements Pn = n!, and arrangements Ank = n! / (n - k)!",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-26" },
    body_km: `## ១. កត្តាតាម (Factorial)
$$n! = n \\times (n - 1) \\times (n - 2) \\times \\dots \\times 2 \\times 1 \\quad (0! = 1)$$

## ២. ចម្លាស់ (Permutations)
ចម្លាស់នៃ $n$ ធាតុខុសៗគ្នា គិតលំដាប់លំដោយ៖
$$P_n = n!$$

## ៣. ការរៀប (Arrangements)
ការជ្រើសរើស $k$ ធាតុចេញពី $n$ ធាតុខុសៗគ្នា ដោយ **គិតលំដាប់លំដោយ** ($0 \\le k \\le n$)៖
$$A_n^k = \\frac{n!}{(n - k)!} = n(n - 1)(n - 2)\\dots(n - k + 1)$$`,
    body_en: "## Permutations & Arrangements\nFormulas for ordered arrangements Ank and full permutations Pn = n!.",
  },

  {
    id: "les-g11-math-27",
    grade: 11,
    sort_order: 27,
    title_km: "បន្សំ Cnk និងត្រីកោណប៉ាស្កាល់",
    title_en: "Combinations Cnk & Pascal's Triangle",
    summary_km: "រូបមន្តបន្សំ Cnk = n! / [k!(n - k)!] លក្ខណៈ Cnk = Cnn-k និងរូបមន្តត្រីកោណប៉ាស្កាល់",
    summary_en: "Combination formula Cnk = n! / (k!(n - k)!), symmetry identity Cnk = Cnn-k, and Pascal's addition triangle",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-27" },
    body_km: `## ១. រូបមន្តបន្សំ (Combinations)
ការជ្រើសរើស $k$ ធាតុចេញពី $n$ ធាតុខុសៗគ្នា ដោយ **មិនគិតលំដាប់លំដោយ** ៖
$$C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n - k)!}$$

## ២. លក្ខណៈសម្បត្តិសំខាន់ៗ
1. $C_n^0 = C_n^n = 1$
2. $C_n^k = C_n^{n - k}$ (លក្ខណៈឆ្លុះ)
3. $C_n^k + C_n^{k + 1} = C_{n + 1}^{k + 1}$ (រូបមន្តប៉ាស្កាល់)`,
    body_en: "## Combinations & Pascal Identity\nUnordered selection count Cnk and Pascal triangle recurrence relation Cnk + Cnk+1 = Cn+1k+1.",
  },

  {
    id: "les-g11-math-28",
    grade: 11,
    sort_order: 28,
    title_km: "ប្រូបាបនៃព្រឹត្តិការណ៍ផ្ទុយ និងព្រឹត្តិការណ៍មិនចុះសម្រុង",
    title_en: "Probabilities of Complementary & Disjoint Events",
    summary_km: "រូបមន្ត P(Ā) = 1 - P(A) ផលបូកប្រូបាប P(A ∪ B) = P(A) + P(B) និងលក្ខខណ្ឌឯករាជ្យ",
    summary_en: "Complementary event probability P(A_bar) = 1 - P(A), addition rule for disjoint events, and independent probability",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g11-math-28" },
    body_km: `## ១. ព្រឹត្តិការណ៍ផ្ទុយ (Complementary Event)
តាង $\\bar{A}$ ជាព្រឹត្តិការណ៍ផ្ទុយនៃ $A$ ៖
$$P(\\bar{A}) = 1 - P(A)$$
- ប្រើប្រាស់ញឹកញាប់ពេលឃើញពាក្យ៖ «យ៉ាងហោចណាស់មួយ» ព្រោះ $P(\\text{យ៉ាងហោច១}) = 1 - P(\\text{គ្មានសោះ})$។

## ២. ព្រឹត្តិការណ៍មិនចុះសម្រុង (Disjoint Events)
បើ $A \\cap B = \\emptyset$ ៖
$$P(A \\cup B) = P(A) + P(B)$$

បើ $A$ និង $B$ ជាព្រឹត្តិការណ៍ទូទៅ ៖
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$`,
    body_en: "## Probability Rules\nComplementary event trick P(at least one) = 1 - P(none), and general addition rule P(A U B) = P(A) + P(B) - P(A ∩ B).",
  },
];
