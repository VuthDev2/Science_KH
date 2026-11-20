import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const GRADE_10_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 10 — MATHEMATICS (គណិតវិទ្យា)
  // ============================================================================
  {
    id: "les-g10-math-01",
    grade: 10,
    sort_order: 1,
    title_km: "អនុគមន៍ដឺក្រេទី២ ប៉ារ៉ាបូល និងអថេរភាព",
    title_en: "Quadratic Functions & Parabola Geometry",
    summary_km: "ទម្រង់ y = ax² + bx + c កំពូលប៉ារ៉ាបូល (-b/2a, -Δ/4a) អ័ក្សឆ្លុះ និងតារាងអថេរភាព",
    summary_en: "Parabola vertex form, axis of symmetry x = -b/2a, concavity, and quadratic variation tables",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: `## ១. ទម្រង់ទូទៅនៃអនុគមន៍ដឺក្រេទី២
$$f(x) = ax^2 + bx + c \\quad (a \\neq 0)$$
ក្រាហ្វនៃអនុគមន៍ដឺក្រេទី២ គឺជាខ្សែ **ប៉ារ៉ាបូល (Parabola)**។

## ២. កំពូល និងអ័ក្សឆ្លុះ
- **កំពូល $S$ ៖**
  $$S\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right) \\quad \\text{ដែល } \\Delta = b^2 - 4ac$$
- **អ័ក្សឆ្លុះ ៖** បន្ទាត់ឈរ $x = -\\frac{b}{2a}$
- **ទិសដៅភាពកោង ៖**
  - បើ $a > 0$ ៖ ប៉ារ៉ាបូលបែរភាពកោងឡើងលើ (មានតម្លៃអប្បបរមា)
  - បើ $a < 0$ ៖ ប៉ារ៉ាបូលបែរភាពកោងចុះក្រោម (មានតម្លៃអតិបរមា)`,
    body_en: `## Quadratic Functions
Graph is a parabola with vertex at $x = -b/(2a)$. Concave up if $a > 0$, concave down if $a < 0$.`,
  },
  {
    id: "les-g10-math-02",
    grade: 10,
    sort_order: 2,
    title_km: "វ៉ិចទ័រក្នុងប្លង់ និងផលគុណស្កាលែ",
    title_en: "Vectors in the Plane & Dot Product",
    summary_km: "កូអរដោនេវ៉ិចទ័រ ផលបូកវ៉ិចទ័រ ប្រវែងវ៉ិចទ័រ និងផលគុណស្កាលែ u · v = |u||v|cos θ",
    summary_en: "Vector magnitude, orthogonal dot product u · v = 0, and analytical formula x x' + y y'",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-02" },
    body_km: `## ១. ផលគុណស្កាលែ (Dot Product)
ផលគុណស្កាលែនៃវ៉ិចទ័រពីរ $\\vec{u}$ និង $\\vec{v}$ កំណត់ដោយ៖
$$\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| \\cdot ||\\vec{v}|| \\cdot \\cos(\\theta)$$

ក្នុងប្លង់កូអរដោនេ បើ $\\vec{u} = (x, y)$ និង $\\vec{v} = (x', y')$ នោះ៖
$$\\vec{u} \\cdot \\vec{v} = x \\cdot x' + y \\cdot y'$$

## ២. លក្ខខណ្ឌកែងគ្នានៃវ៉ិចទ័រពីរ
$$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff x \\cdot x' + y \\cdot y' = 0$$`,
    body_en: `## Vectors & Dot Product
$\\vec{u} \\cdot \\vec{v} = x x' + y y'$. Two nonzero vectors are orthogonal perpendicular if and only if $\\vec{u} \\cdot \\vec{v} = 0$.`,
  },
  {
    id: "les-g10-math-03",
    grade: 10,
    sort_order: 3,
    title_km: "ត្រីកោណមាត្រកម្រិតខ្ពស់ និងរូបមន្តបំប្លែង",
    title_en: "Advanced Trigonometry & Addition Formulas",
    summary_km: "រូបមន្តបូក cos(a ± b), sin(a ± b) និងរូបមន្តមុំទ្វេ sin 2a, cos 2a",
    summary_en: "Angle addition theorems, double-angle formulas sin 2a = 2 sin a cos a, cos 2a = cos²a - sin²a",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-03" },
    body_km: `## ១. រូបមន្តបូកត្រីកោណមាត្រ
$$\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$$
$$\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b$$
$$\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b$$
$$\\sin(a - b) = \\sin a \\cos b - \\cos a \\sin b$$

## ២. រូបមន្តមុំទ្វេ (Double-Angle Formulas)
$$\\sin(2a) = 2\\sin a \\cos a$$
$$\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$$`,
    body_en: `## Trigonometric Formulas
Angle sum identities and double-angle expressions: $\\sin 2a = 2\\sin a \\cos a$, $\\cos 2a = \\cos^2 a - \\sin^2 a$.`,
  },
  {
    id: "les-g10-math-04",
    grade: 10,
    sort_order: 4,
    title_km: "សមីការបន្ទាត់ និងចម្ងាយពីចំណុចទៅបន្ទាត់",
    title_en: "Linear Equations & Point-to-Line Distance",
    summary_km: "សមីការទូទៅ ax + by + c = 0 វ៉ិចទ័រប្រាប់ទិស វ៉ិចទ័រណរម៉ាល់ និងរូបមន្តចម្ងាយ d",
    summary_en: "General line equation ax + by + c = 0, normal vector (a, b), and distance formula d = |ax0 + by0 + c| / √(a² + b²)",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-04" },
    body_km: `## ១. សមីការទូទៅនៃបន្ទាត់
$$ax + by + c = 0$$
- វ៉ិចទ័រណរម៉ាល់ (កែងនឹងបន្ទាត់) ៖ $\\vec{n} = (a, b)$
- វ៉ិចទ័រប្រាប់ទិស (ស្របនឹងបន្ទាត់) ៖ $\\vec{u} = (-b, a)$

## ២. រូបមន្តចម្ងាយពីចំណុច $M_0(x_0, y_0)$ ទៅបន្ទាត់
$$d(M_0, \\Delta) = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$$`,
    body_en: `## Distance to Line
The perpendicular distance from point $(x_0, y_0)$ to line $ax + by + c = 0$ is $d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.`,
  },
  {
    id: "les-g10-math-05",
    grade: 10,
    sort_order: 5,
    title_km: "វិសមីការដឺក្រេទី២ និងតារាងសញ្ញា",
    title_en: "Quadratic Inequalities & Sign Analysis",
    summary_km: "សញ្ញានៃត្រីធាដឺក្រេទី២ ax² + bx + c វិធាន «ក្នុងផ្ទុយ ក្រៅដូច» និងសំណុំដំណោះស្រាយ",
    summary_en: "Sign table rules for quadratic trinomials: sign between roots is opposite to a, sign outside is same as a",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-05" },
    body_km: `## ១. សញ្ញានៃត្រីធាដឺក្រេទី២
ចំពោះត្រីធា $f(x) = ax^2 + bx + c$ ($a \\neq 0$) ដែលមានឬសពីរ $x_1 < x_2$ (ករណី $\\Delta > 0$)៖
- **ចន្លោះខាងក្នុងឬស ($x_1 < x < x_2$) ៖** មានសញ្ញា **ផ្ទុយនឹងសញ្ញា $a$**
- **ចន្លោះខាងក្រៅឬស ($x < x_1$ ឬ $x > x_2$) ៖** មានសញ្ញា **ដូចសញ្ញា $a$**

> **គន្លឹះចងចាំ៖** «ក្នុងផ្ទុយ — ក្រៅដូច»!`,
    body_en: `## Quadratic Inequalities
Between the roots, the sign is opposite to $a$. Outside the roots, the sign matches $a$.`,
  },

  // ============================================================================
  // GRADE 10 — PHYSICS (រូបវិទ្យា)
  // ============================================================================
  {
    id: "les-g10-phys-01",
    grade: 10,
    sort_order: 1,
    title_km: "ស៊ីនេម៉ាទិច ៖ ចលនាត្រង់ប្រែប្រួលស្មើ (v = at + v₀)",
    title_en: "Kinematics: Uniformly Accelerated Motion",
    summary_km: "សំទុះ a = const សមីការល្បឿន v = at + v₀ និងសមីការពេល x = 1/2 at² + v₀t + x₀",
    summary_en: "Constant acceleration a, velocity-time equation v = at + v0, and displacement x = 1/2 at² + v0t",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-01" },
    body_km: `## ១. សំទុះ (Acceleration $a$)
សំទុះគឺជាបម្រែបម្រួលល្បឿនក្នុងមួយឯកតាពេល៖
$$a = \\frac{v - v_0}{t - t_0} \\quad (m/s^2)$$

## ២. សមីការនៃចលនាត្រង់ប្រែប្រួលស្មើ
1. សមីការល្បឿន៖
   $$v = at + v_0$$
2. សមីការពេលនៃចលនា (ចម្ងាយចរ)៖
   $$x = \\frac{1}{2}at^2 + v_0 t + x_0$$
3. រូបមន្តឯករាជ្យពីពេល៖
   $$v^2 - v_0^2 = 2a(x - x_0)$$`,
    body_en: `## Accelerated Motion
$v = at + v_0$, $x = \\frac{1}{2}at^2 + v_0 t$, and $v^2 - v_0^2 = 2a\\Delta x$. Acceleration in $m/s^2$.`,
  },
  {
    id: "les-g10-phys-02",
    grade: 10,
    sort_order: 2,
    title_km: "ច្បាប់ញូតុនទាំង ៣ នៃចលនា",
    title_en: "Newton's Three Laws of Motion",
    summary_km: "ច្បាប់ទី១ (និចលភាព) ច្បាប់ទី២ (F = ma) និងច្បាប់ទី៣ (សកម្មភាព និងប្រតិកម្ម)",
    summary_en: "First law (inertia), second law (F = ma net force dynamics), and third law (action-reaction pairs)",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-02" },
    body_km: `## ១. ច្បាប់ទី១ ញូតុន (ច្បាប់និចលភាព)
បើគ្មានកម្លាំងក្រៅមានអំពើលើអង្គធាតុទេ (ឬកម្លាំងផ្គួបស្មើ $0$) នោះអង្គធាតុដែលនៅស្ងៀមនឹងបន្តនៅស្ងៀម អង្គធាតុដែលកំពុងធ្វើចលនានឹងបន្តធ្វើចលនាត្រង់ស្មើ។

## ២. ច្បាប់ទី២ ញូតុន (គោលការណ៍គ្រឹះឌីណាមិច)
$$\\sum \\vec{F} = m \\cdot \\vec{a}$$
កម្លាំងផ្គួបស្មើនឹងម៉ាសគុណនឹងសំទុះ។

## ៣. ច្បាប់ទី៣ ញូតុន (សកម្មភាព និងប្រតិកម្ម)
$$\\vec{F}_{A/B} = -\\vec{F}_{B/A}$$
កម្លាំងសកម្មភាព និងប្រតិកម្មកើតឡើងជាគូជានិច្ច មានទិសដូចគ្នា ទិសដៅផ្ទុយគ្នា និងអាំងតង់ស៊ីតេស្មើគ្នា។`,
    body_en: `## Newton's Laws
1. Inertia ($\sum F = 0 \implies v = \text{const}$). 2. Momentum dynamics ($\sum F = ma$). 3. Action-Reaction ($F_{AB} = -F_{BA}$).`,
  },
  {
    id: "les-g10-phys-03",
    grade: 10,
    sort_order: 3,
    title_km: "កម្លាំងកកិត និងកម្លាំងទំនាញសកល",
    title_en: "Friction Forces & Universal Gravitation",
    summary_km: "កកិតទប់ កកិតរអិល f = μ · N និងច្បាប់ទំនាញសកលរបស់ញូតុន F = G · (m₁m₂)/r²",
    summary_en: "Static and kinetic friction f = μN, normal force, and Newton's Universal Gravitation law",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-03" },
    body_km: `## ១. កម្លាំងកកិតរអិល (Kinetic Friction)
$$f_k = \\mu_k \\cdot N$$
- $\\mu_k$ ៖ មេគុណកកិតរអិល (គ្មានខ្នាត)
- $N$ ៖ កម្លាំងប្រតិកម្មកែង ($N$)

## ២. ច្បាប់ទំនាញសកល (Universal Gravitation)
គ្រប់អង្គធាតុទាំងអស់ក្នុងចក្រវាលទាញគ្នាទៅវិញទៅមកដោយកម្លាំងមួយសមាមាត្រនឹងផលគុណម៉ាស និងច្រាសសមាមាត្រនឹងការេនៃចម្ងាយ៖
$$F = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$
- $G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$ ៖ ថេរទំនាញសកល`,
    body_en: `## Gravitation & Friction
$f = \\mu N$. Universal gravitation: $F = G \\frac{m_1 m_2}{r^2}$ where $G = 6.674 \\times 10^{-11}\\text{ N m}^2/\\text{kg}^2$.`,
  },
  {
    id: "les-g10-phys-04",
    grade: 10,
    sort_order: 4,
    title_km: "ការងារ ថាមពលស៊ីនេទិច និងថាមពលប៉ូតង់ស្យែល",
    title_en: "Kinetic & Potential Energy Conservation",
    summary_km: "ថាមពលស៊ីនេទិច Ek = 1/2 mv² ថាមពលប៉ូតង់ស្យែលទំនាញ Ep = mgh និងទ្រឹស្តីបទថាមពលស៊ីនេទិច",
    summary_en: "Kinetic energy Ek = 1/2 mv², gravitational potential energy Ep = mgh, and work-energy theorem",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-04" },
    body_km: `## ១. ថាមពលស៊ីនេទិច (Kinetic Energy $E_k$)
$$E_k = \\frac{1}{2}m v^2$$
- $m$ ៖ ម៉ាស ($kg$), $v$ ៖ ល្បឿន ($m/s$), $E_k$ ៖ គិតជាស៊ូល ($J$)

## ២. ថាមពលប៉ូតង់ស្យែលទំនាញដី ($E_p$)
$$E_p = m \\cdot g \\cdot h$$
- $h$ ៖ កម្ពស់ធៀបនឹងកម្រិតយោង ($m$)

## ៣. ទ្រឹស្តីបទថាមពលស៊ីនេទិច (Work-Energy Theorem)
បម្រែបម្រួលថាមពលស៊ីនេទិច ស្មើនឹងផលបូកការងារនៃកម្លាំងក្រៅទាំងអស់៖
$$\\Delta E_k = E_{k2} - E_{k1} = \\sum W$$`,
    body_en: `## Energy Concepts
$E_k = \\frac{1}{2}mv^2$, $E_p = mgh$. Work-energy theorem: $\\Delta E_k = W_{\\text{net}}$.`,
  },
  {
    id: "les-g10-phys-05",
    grade: 10,
    sort_order: 5,
    title_km: "ច្បាប់រក្សាថាមពលមេកានិច (Em = Ek + Ep)",
    title_en: "Conservation of Mechanical Energy",
    summary_km: "ថាមពលមេកានិចសរុប Em = Ek + Ep = ថេរ ក្នុងដែនទំនាញដី (គ្មានកម្លាំងកកិត)",
    summary_en: "Mechanical energy conservation in conservative gravitational fields: kinetic transforms to potential",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-05" },
    body_km: `## ១. ច្បាប់រក្សាថាមពលមេកានិច
ក្នុងប្រព័ន្ធដាច់ខាតដែលគ្មានកម្លាំងកកិត (មានតែកម្លាំងអភិរក្ស ដូចជាទំនាញដី) ថាមពលមេកានិចសរុប $E_m$ រក្សាតម្លៃថេរជានិច្ច៖
$$E_m = E_k + E_p = \\frac{1}{2}mv^2 + mgh = \\text{ថេរ (Constant)}$$

> **ឧទាហរណ៍៖** វត្ថុធ្លាក់ចុះមកក្រោម កម្ពស់ $h$ ថយចុះ (ប៉ូតង់ស្យែលបាត់បង់) បំប្លែងទៅជាល្បឿន $v$ កើនឡើង (ស៊ីនេទិចកើនឡើង)!`,
    body_en: `## Mechanical Energy Conservation
In the absence of dissipative friction, total mechanical energy is conserved: $E_m = E_k + E_p = \\text{constant}$.`,
  },

  // ============================================================================
  // GRADE 10 — CHEMISTRY (គីមីវិទ្យា)
  // ============================================================================
  {
    id: "les-g10-chem-01",
    grade: 10,
    sort_order: 1,
    title_km: "រចនាសម្ព័ន្ធអាតូម និងការកំណត់អេឡិចត្រុង",
    title_en: "Atomic Structure & Electron Configurations",
    summary_km: "លេខអាតូម Z ស្រទាប់ K, L, M, N អ័រប៊ីតាល់ s, p, d, f និងគោលការណ៍ Aufbau",
    summary_en: "Atomic number Z, mass number A, s/p/d/f subshells, Aufbau diagonal principle, Pauli exclusion",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-01" },
    body_km: `## ១. និមិត្តសញ្ញានុយក្លេអ៊ែរ
$$^A_Z X$$
- $Z$ ៖ លេខអាតូម (ចំនួនប្រូតុង = ចំនួនអេឡិចត្រុងក្នុងអាតូមណឺត)
- $A$ ៖ លេខម៉ាស ($A = Z + N$, ចំនួនប្រូតុង + ណឺត្រុង)

## ២. ការកំណត់អេឡិចត្រុងតាមស្រទាប់រង (s, p, d, f)
- ស្រទាប់រង $s$ ផ្ទុកអតិបរមា $2e^-$
- ស្រទាប់រង $p$ ផ្ទុកអតិបរមា $6e^-$
- ស្រទាប់រង $d$ ផ្ទុកអតិបរមា $10e^-$
លំដាប់ថាមពល Aufbau៖ $1s^2 \\rightarrow 2s^2 \\rightarrow 2p^6 \\rightarrow 3s^2 \\rightarrow 3p^6 \\rightarrow 4s^2 \\rightarrow 3d^{10}$`,
    body_en: `## Electron Configuration
Orbitals s (2 max), p (6 max), d (10 max). Aufbau rule fills lowest energy subshells first: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^{10}$.`,
  },
  {
    id: "les-g10-chem-02",
    grade: 10,
    sort_order: 2,
    title_km: "តារាងខួបនៃធាតុគីមី និងច្បាប់ Mendeleev",
    title_en: "Periodic Trends & Chemical Periodicity",
    summary_km: "ខួប (Periods) ក្រុម (Groups) អេឡិចត្រុងវ៉ាឡង់ និងបម្រែបម្រួលកាំអាតូម និងអេឡិចត្រូអវិជ្ជមាន",
    summary_en: "Periods, alkali/halogen groups, electronegativity trends, ionization energy, and atomic radii",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-02" },
    body_km: `## ១. រចនាសម្ព័ន្ធតារាងខួប
- **ខួប (Periods) ទាំង ៧៖** តំណាងឱ្យចំនួនស្រទាប់អេឡិចត្រុង
- **ក្រុម (Groups) ទាំង ១៨៖** ធាតុក្នុងក្រុមតែមួយមានចំនួន **អេឡិចត្រុងវ៉ាឡង់ស្មើគ្នា** នាំឱ្យមានលក្ខណៈគីមីដូចគ្នា

## ២. ច្បាប់បម្រែបម្រួល (Trends)
- **កាំអាតូម (Atomic Radius) ៖** កើនឡើងពីលើចុះក្រោមក្នុងក្រុម និងថយចុះពីឆ្វេងទៅស្តាំក្នុងខួប
- **អេឡិចត្រូអវិជ្ជមាន (Electronegativity) ៖** កើនឡើងពីឆ្វេងទៅស្តាំក្នុងខួប (ធាតុ $F$ ខ្លាំងជាងគេ)`,
    body_en: `## Periodic Table
Group number corresponds to valence electrons. Electronegativity increases across a period and decreases down a group.`,
  },
  {
    id: "les-g10-chem-03",
    grade: 10,
    sort_order: 3,
    title_km: "សម្ព័ន្ធគីមី ៖ សម្ព័ន្ធអ៊ីយ៉ុង និងកូវ៉ាឡង់",
    title_en: "Chemical Bonding: Ionic vs Covalent",
    summary_km: "ការផ្ទេរអេឡិចត្រុង (សម្ព័ន្ធអ៊ីយ៉ុង) និងការចូលរួមអេឡិចត្រុងរួម (សម្ព័ន្ធកូវ៉ាឡង់)",
    summary_en: "Octet rule, ionic crystal lattices via electron transfer, and polar/nonpolar covalent molecular sharing",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-03" },
    body_km: `## ១. សម្ព័ន្ធអ៊ីយ៉ុង (Ionic Bond)
កើតឡើងរវាង **លោហៈ** និង **អលោហៈ** ដោយសារការផ្ទេរអេឡិចត្រុង បង្កើតជាកាចុង ($+$) និងអានីយ៉ុង ($-$) ទាញគ្នាដោយកម្លាំងអេឡិចត្រូស្ទាទិច (ឧ. $Na^+ + Cl^- \\rightarrow NaCl$)។

## ២. សម្ព័ន្ធកូវ៉ាឡង់ (Covalent Bond)
កើតឡើងរវាង **អលោហៈ** និង **អលោហៈ** ដោយសារការ **ចូលរួមអេឡិចត្រុងរួមគ្នា** ដើម្បីសម្រេចក្បួនអoctet ៨ អេឡិចត្រុង (ឧ. $H_2O, CO_2, CH_4$)។`,
    body_en: `## Chemical Bonds
Ionic bonds transfer electrons between metals and nonmetals. Covalent bonds share electron pairs between nonmetals.`,
  },
  {
    id: "les-g10-chem-04",
    grade: 10,
    sort_order: 4,
    title_km: "ប្រតិកម្មអុកស៊ីដូរេដុកកម្ម និងតុល្យភាពអេឡិចត្រុង",
    title_en: "Redox Reactions & Oxidation States",
    summary_km: "ការគណនាលេខអុកស៊ីតកម្ម (N.O) វិធីតុល្យភាពកន្លះសមីការអេឡិចត្រុង",
    summary_en: "Determining oxidation states, balancing complex redox equations via ion-electron half-reaction method",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-04" },
    body_km: `## ១. លេខអុកស៊ីតកម្ម (Oxidation State)
- អុកស៊ីសែនក្នុងសមាសធាតុភាគច្រើនមាន N.O $= -2$
- អ៊ីដ្រូសែនក្នុងសមាសធាតុភាគច្រើនមាន N.O $= +1$
- ផលបូក N.O ក្នុងម៉ូលេគុលណឺត ស្មើ $0$ជានិច្ច

## ២. តុល្យភាពប្រតិកម្មអុកស៊ីដូរេដុក
ចំនួនអេឡិចត្រុងដែលរេដុករ **បោះបង់** ត្រូវតែស្មើនឹងចំនួនអេឡិចត្រុងដែលអុកស៊ីតករ **ចាប់យក**៖
$$\\text{Cu} + 2\\text{Ag}^+ \\rightarrow \\text{Cu}^{2+} + 2\\text{Ag}$$`,
    body_en: `## Redox Balancing
Equate electrons lost in oxidation half-reaction to electrons gained in reduction half-reaction.`,
  },
  {
    id: "les-g10-chem-05",
    grade: 10,
    sort_order: 5,
    title_km: "សូលុយស្យុង និងកំហាប់ម៉ូល (C = n / V)",
    title_en: "Molar Solutions & Dilution Dynamics",
    summary_km: "ការរៀបចំសូលុយស្យុង ការរំលាយសារធាតុ និងរូបមន្តពង្រាវសូលុយស្យុង C₁ · V₁ = C₂ · V₂",
    summary_en: "Solution preparation, volumetric flasks, molarity C = n/V, and dilution equation C1·V1 = C2·V2",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-05" },
    body_km: `## ១. រូបមន្តពង្រាវសូលុយស្យុង (Dilution Formula)
នៅពេលបន្ថែមទឹកសុទ្ធទៅក្នុងសូលុយស្យុងដើម ចំនួនម៉ូលសារធាតុរលាយរក្សាដដែល ($n_1 = n_2$)៖
$$C_1 \\cdot V_1 = C_2 \\cdot V_2$$
- $C_1, C_2$ ៖ កំហាប់ម៉ូលដើម និងកំហាប់ក្រោយពង្រាវ ($mol/L$)
- $V_1, V_2$ ៖ មាឌសូលុយស្យុងដើម និងមាឌសរុបក្រោយពង្រាវ ($L$ ឬ $mL$)`,
    body_en: `## Dilution Law
$C_1 \\cdot V_1 = C_2 \\cdot V_2$. Adding water preserves the total dissolved moles of solute.`,
  },

  // ============================================================================
  // GRADE 10 — BIOLOGY (ជីវវិទ្យា)
  // ============================================================================
  {
    id: "les-g10-bio-01",
    grade: 10,
    sort_order: 1,
    title_km: "ម៉ាក្រូម៉ូលេគុលជីវសាស្រ្ត ៖ កាបូអ៊ីដ្រាត ប្រូតេអ៊ីន ខ្លាញ់",
    title_en: "Biological Macromolecules & Nutrition",
    summary_km: "ម៉ូណូមែ ប៉ូលីមែ អាស៊ីតអាមីណេ អាស៊ីតខ្លាញ់ និងសារៈសំខាន់ក្នុងរាងកាយ",
    summary_en: "Carbohydrates (monosaccharides, starch), proteins (amino acids), lipids (fatty acids, glycerol), nucleic acids",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-01" },
    body_km: `## ១. ម៉ាក្រូម៉ូលេគុលទាំង ៤ នៃជីវិត
1. **កាបូអ៊ីដ្រាត (Carbohydrates)៖** ផ្តល់ថាមពលលឿន (គ្លុយកូស $C_6H_{12}O_6$, ម្សៅ)
2. **ប្រូតេអ៊ីន (Proteins)៖** បង្កើតជាសាច់ដុំ អង់ស៊ីម សរសៃសក់ (ផ្សំពីអាស៊ីតអាមីណេ ២០ ប្រភេទ)
3. **លីពីដ / ខ្លាញ់ (Lipids)៖** ស្តុកថាមពលយូរអង្វែង ផ្សំពីគ្លីសេរ៉ូល និងអាស៊ីតខ្លាញ់
4. **អាស៊ីតនុយក្លេអ៊ិច (Nucleic Acids)៖** ផ្ទុកព័ត៌មានពន្ធុ (DNA, RNA)`,
    body_en: `## Biological Macromolecules
Carbohydrates (energy), Proteins (structural & enzymatic), Lipids (long-term storage), Nucleic acids (genetic code).`,
  },
  {
    id: "les-g10-bio-02",
    grade: 10,
    sort_order: 2,
    title_km: "អង់ស៊ីម និងកាតាលីករជីវសាស្ត្រ",
    title_en: "Enzyme Catalysis & Substrate Specificity",
    summary_km: "យន្តការសោ និងកូនសោ (Lock-and-Key) ឥទ្ធិពលសីតុណ្ហភាព និង pH លើល្បឿនអង់ស៊ីម",
    summary_en: "Enzyme active site, lowering activation energy, denaturation with high temperature and pH fluctuations",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-02" },
    body_km: `## ១. អង់ស៊ីម (Enzymes)
អង់ស៊ីមគឺជាកាតាលីករជីវសាស្ត្រធម្មជាតិ (ប្រូតេអ៊ីន) ដែលជួយពន្លឿនប្រតិកម្មគីមីក្នុងរាងកាយរាប់លានដង ដោយ **បន្ថយថាមពលសកម្មកម្ម**។

## ២. យន្តការសោ និងកូនសោ
អង់ស៊ីមនីមួយៗមាន **តំបន់សកម្ម (Active Site)** ដែលភ្ជាប់តែមួយគត់ជាមួយ **ស្រទាប់ខាងក្រោម (Substrate)** ជាក់លាក់។ កម្តៅខ្ពស់លើស $45^\\circ\\text{C}$ ធ្វើឱ្យអង់ស៊ីមខូចទ្រង់ទ្រាយ (Denaturation)។`,
    body_en: `## Enzymes
Biological catalysts reduce reaction activation energy. Active sites bind substrates via lock-and-key specificity.`,
  },
  {
    id: "les-g10-bio-03",
    grade: 10,
    sort_order: 3,
    title_km: "មេតាបូលីសកោសិកា ៖ ATP និងដង្ហើមកោសិកា",
    title_en: "Cellular Metabolism & ATP Synthesis",
    summary_km: "រូបិយប័ណ្ណថាមពលកោសិកា ATP ដង្ហើមត្រូវការអុកស៊ីសែន C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36 ATP",
    summary_en: "Cellular energy currency ATP, mitochondrial aerobic respiration producing 36-38 ATP per glucose",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-03" },
    body_km: `## ១. អាដេណូស៊ីនទ្រីផូស្វាត (ATP)
ATP គឺជា «រូបិយប័ណ្ណថាមពល» របស់កោសិកា។ នៅពេលចំណងផូស្វាតចុងក្រោយផ្តាច់ចេញ ($ATP \\rightarrow ADP + P_i$) វាបញ្ចេញថាមពលសម្រាប់សកម្មភាពកោសិកា។

## ២. សមីការដង្ហើមកោសិកា (Cellular Respiration)
$$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{ ATP}$$
ដំណើរការនេះកើតឡើងក្នុង **មីតូកុងឌ្រី (Mitochondria)**។`,
    body_en: `## Cellular Respiration
Glucose + $6O_2 \\rightarrow 6CO_2 + 6H_2O$ generating 36-38 ATP molecules inside cellular mitochondria.`,
  },
  {
    id: "les-g10-bio-04",
    grade: 10,
    sort_order: 4,
    title_km: "វដ្តកោសិកា និងការបែងចែកកោសិកា មីតូស",
    title_en: "Cell Cycle & Mitotic Division",
    summary_km: "ដំណាក់កាលអាំងទែផាស ៤ ដំណាក់កាលនៃមីតូស ៖ ប្រូផាស មេតាផាស អាណាផាស និងតេឡូផាស",
    summary_en: "Interphase (G1, S, G2 DNA synthesis) and 4 mitotic stages: Prophase, Metaphase, Anaphase, Telophase",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-04" },
    body_km: `## ១. មីតូស (Mitosis)
ការបែងចែកកោសិកាលូតលាស់ ($2n \\rightarrow 2n$) បង្កើតបានកោសិកាកូន ២ ដែលដូចគ្នាបេះបិទនឹងកោសិកាមេ៖
1. **ប្រូផាស (Prophase) ៖** ក្រូម៉ូសូមកកខាប់ខ្លី ភ្នាសណ្វៃយ៉ូរលាយ
2. **មេតាផាស (Metaphase) ៖** ក្រូម៉ូសូមតម្រង់ជួរត្រង់ប្លង់អេក្វាទ័រកោសិកា
3. **អាណាផាស (Anaphase) ៖** ក្រូម៉ាទីតបងប្អូនបែកចេញពីគ្នា ឆ្ពោះទៅប៉ូលសងខាង
4. **តេឡូផាស (Telophase) ៖** បង្កើតភ្នាសណ្វៃយ៉ូថ្មី និងស៊ីតូប្លាសចែកជាពីរ`,
    body_en: `## Mitosis
Somatic cell division ($2n \\rightarrow 2n$). Four continuous phases: Prophase, Metaphase, Anaphase, and Telophase.`,
  },
  {
    id: "les-g10-bio-05",
    grade: 10,
    sort_order: 5,
    title_km: "មេយ៉ូស និងការបង្កើតស្ពែម៉ាតូសូអ៊ីត អូវុល",
    title_en: "Meiosis & Gametogenesis",
    summary_km: "ការបែងចែកកាត់បន្ថយក្រូម៉ូសូម 2n → n ការឆ្លាស់ប្តូរហ្សែន Crossing-over និងបំរែបំរួលពន្ធុ",
    summary_en: "Reduction division from 2n diploid to n haploid gametes, homologous crossing-over, and genetic diversity",
    xp_reward: 40,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-05" },
    body_km: `## ១. មេយ៉ូស (Meiosis)
គឺជាការបែងចែកកោសិកាភេទដើម្បីបង្កើត **ហ្គាម៉ែត ($n$)** ពីកោសិកាមេ ($2n$)។ មានពីរដំណាក់កាលជាប់គ្នាគឺ មេយ៉ូស I និង មេយ៉ូស II។
- កោសិកាមេ $1$ ($2n$) បង្កើតបានកោសិកាកូន $4$ ($n$)
- ក្នុងប្រូផាស I មានបាតុភូត **ក្រូស៊ីងអូវ័រ (Crossing-over)** ផ្លាស់ប្តូរផ្នែកក្រូម៉ូសូម បង្កើតភាពចម្រុះនៃពន្ធុ!`,
    body_en: `## Meiosis
Produces 4 haploid gametes ($n$) from 1 diploid cell ($2n$). Crossing-over in prophase I reshuffles genetic variation.`,
  },

  // ============================================================================
  // GRADE 10 — EARTH SCIENCE (ផែនដីវិទ្យា)
  // ============================================================================
  {
    id: "les-g10-earth-01",
    grade: 10,
    sort_order: 1,
    title_km: "ភូមិសាស្ត្ររូបវិទ្យា ៖ បន្ទះតិចតូនិចកម្រិតខ្ពស់",
    title_en: "Advanced Lithospheric Plate Tectonics",
    summary_km: "តំបន់រុញច្រានក្រោម (Subduction Zones) ក្រវាត់ភ្លើងប៉ាស៊ីហ្វិក និងរណ្តៅសមុទ្រម៉ារីយ៉ាណា",
    summary_en: "Deep ocean subduction trenches, Mariana trench 11 km depth, volcanic island arcs, and slab pull",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g10-earth-01" },
    body_km: `## ១. តំបន់រុញច្រានចូលក្រោម (Subduction Zone)
នៅពេលបន្ទះមហាសមុទ្រ (ដង់ស៊ីតេធ្ងន់) បុកជាមួយបន្ទះទ្វីប (ស្រាល) បន្ទះមហាសមុទ្រនឹង **រអិលចូលក្រោម** អាវផែនដី រលាយជាម៉ាក់ម៉ា បង្កើតបានជា៖
- រណ្តៅសមុទ្រជ្រៅបំផុត (ដូចជា **រណ្តៅសមុទ្រម៉ារីយ៉ាណា** ជម្រៅជិត $11\\text{ km}$)
- ជួរភ្នំភ្លើងសកម្ម និងការរញ្ជួយដីកម្រិតធ្ងន់`,
    body_en: `## Subduction Tectonics
Dense oceanic crust sinks beneath lighter continental crust, forging volcanic mountain belts and deep oceanic trenches.`,
  },
  {
    id: "les-g10-earth-02",
    grade: 10,
    sort_order: 2,
    title_km: "រចនាសម្ព័ន្ធភូគព្ភសាស្ត្រ ៖ ផ្នត់ និងកំហុស",
    title_en: "Geological Structures: Folds & Faults",
    summary_km: "អង់ទីគ្លីណាល់ ស៊ីងគ្លីណាល់ កំហុសធម្មតា កំហុសច្រាស និងកំហុសរអិលកាត់",
    summary_en: "Anticline arches, syncline troughs, normal faults, reverse thrust faults, and strike-slip shear boundaries",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g10-earth-02" },
    body_km: `## ១. ផ្នត់ (Folds)
កើតឡើងនៅពេលស្រទាប់ថ្មរងកម្លាំងសង្កត់យឺតៗ ធ្វើឱ្យកោង៖
- **អង់ទីគ្លីណាល់ (Anticline) ៖** ផ្នត់ប៉ោងឡើងលើដូចដំបូល
- **ស៊ីងគ្លីណាល់ (Syncline) ៖** ផ្នត់ទ្រុឌចុះក្រោមដូចស្នូក

## ២. កំហុស (Faults)
នៅពេលថ្មរឹងរងកម្លាំងខ្លាំងលើសកំណត់ វានឹងប្រេះបាក់ និងរអិលផ្លាស់ទី (ឧ. កំហុស San Andreas)។`,
    body_en: `## Folds & Faults
Compressional stress causes anticlines (upfolds) and synclines (downfolds). Brittle failure produces fault scarps.`,
  },
  {
    id: "les-g10-earth-03",
    grade: 10,
    sort_order: 3,
    title_km: "ធារាសាស្ត្រ និងជលសាស្រ្តទឹកក្រោមដី",
    title_en: "Hydrogeology, Aquifers & Groundwater",
    summary_km: "ស្រទាប់ផ្ទុកទឹក អណ្តូងធម្មជាតិ កម្រិតទឹកក្រោមដី និងបញ្ហាជាតិអាសេនិចនៅកម្ពុជា",
    summary_en: "Unconfined vs confined aquifers, water table recharge, and natural arsenic contamination along Mekong",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g10-earth-03" },
    body_km: `## ១. ស្រទាប់ផ្ទុកទឹកក្រោមដី (Aquifers)
ទឹកភ្លៀងជ្រាបចូលក្នុងដីកកកុញក្នុងស្រទាប់ដីខ្សាច់ ឬថ្មប្រហោង បង្កើតជា **ស្រទាប់ផ្ទុកទឹក (Aquifer)**។

## ២. បញ្ហាជាតិអាសេនិច (Arsenic) នៅកម្ពុជា
នៅតាមតំបន់ទំនាបមាត់ទន្លេមេគង្គ និងទន្លេបាសាក់ (កណ្តាល ព្រៃវែង) ទឹកក្រោមដីខ្លះមានផ្ទុកសារធាតុពុល **អាសេនិច ($As$)** ធម្មជាតិ ដែលទាមទារការពិនិត្យ និងចម្រោះមុនពេលបរិភោគ។`,
    body_en: `## Groundwater & Aquifers
Rainwater charges underground aquifers. Arsenic mitigation along Mekong alluvial floodplains protects drinking wells.`,
  },
  {
    id: "les-g10-earth-04",
    grade: 10,
    sort_order: 4,
    title_km: "ប្រព័ន្ធអាកាសធាតុកម្ពុជា ៖ ខ្យល់មូសុងនិរតី និងឦសាន",
    title_en: "Cambodia Monsoon Climatology",
    summary_km: "សម្ពាធទាបឥណ្ឌា សម្ពាធខ្ពស់ស៊ីបេរី របបទឹកភ្លៀង និងឥទ្ធិពលលើកសិកម្មស្រូវ",
    summary_en: "Intertropical Convergence Zone (ITCZ), Southwest wet monsoon, Northeast dry monsoon, and paddy rice agriculture",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g10-earth-04" },
    body_km: `## ១. យន្តការខ្យល់មូសុងកម្ពុជា
- **ខ្យល់មូសុងនិរតី (Southwest Monsoon)៖** បក់ពីមហាសមុទ្រឥណ្ឌា នាំខ្យល់ក្តៅសើម បង្កើតរដូវវស្សា ផ្តល់ទឹកភ្លៀងជាង $80\\%$ នៃបរិមាណទឹកភ្លៀងប្រចាំឆ្នាំ។
- **ខ្យល់មូសុងឦសាន (Northeast Monsoon)៖** បក់ពីទ្វីបអាស៊ីខាងជើង (ស៊ីបេរី) នាំមកនូវខ្យល់ស្ងួត និងត្រជាក់ បង្កើតរដូវប្រាំង។`,
    body_en: `## Monsoonal Dynamics
Southwest monsoons deliver over 80% of Cambodia's annual precipitation, driving the national rice production cycle.`,
  },
  {
    id: "les-g10-earth-05",
    grade: 10,
    sort_order: 5,
    title_km: "ភូគព្ភប្រវត្តិ និងផូស៊ីល",
    title_en: "Geologic Time Scale & Index Fossils",
    summary_km: "មហាយុគ (Eras) សម័យកាល ផូស៊ីលណែនាំ និងការកំណត់អាយុកាលតាមវិទ្យុសកម្ម C-14",
    summary_en: "Paleozoic, Mesozoic, Cenozoic eras, index fossils, and carbon-14 radiometric dating principles",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.earth,
    quiz: { id: "quiz-g10-earth-05" },
    body_km: `## ១. ផូស៊ីល (Fossils)
ផូស៊ីលគឺជាសំណល់ ឬស្លាកស្នាមនៃភាវៈរស់បុរាណដែលកប់ជាប់ក្នុងថ្មកម្ទេចកំណ។

## ២. ការកំណត់អាយុកាល
- **អាយុកាលធៀប (Relative Age) ៖** ច្បាប់ជាន់លើ (ស្រទាប់ថ្មខាងក្រោមចាស់ជាងស្រទាប់ថ្មខាងលើ)
- **អាយុកាលដាច់ខាត (Absolute Age) ៖** កំណត់ដោយការរលាយនៃអ៊ីសូតូបវិទ្យុសកម្ម ដូចជា កាបូន-១៤ ($^{14}C$) សម្រាប់សំណល់ជីវសាស្រ្ត។`,
    body_en: `## Geologic Time
Law of superposition establishes relative chronology. Carbon-14 half-life radioactive decay determines absolute dates.`,
  },

  // ============================================================================
  // ADDITIONAL OFFICIAL MOEYS NATIONAL CURRICULUM LESSONS (GRADE 10 COMPREHENSIVE)
  // ============================================================================

  {
    id: "les-g10-math-06",
    grade: 10,
    sort_order: 6,
    title_km: "សំណុំ និងប្រមាណវិធីលើសំណុំ",
    title_en: "Sets & Operations on Sets (Union, Intersection)",
    summary_km: "និយមន័យសំណុំ ប្រមាណវិធីប្រជុំ (A ∪ B) ប្រសព្វ (A ∩ B) ផលដក និងដ្យាក្រាមវ៉ែន (Venn)",
    summary_en: "Set theory fundamentals, union, intersection, set differences, complements, and Venn diagram analysis",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## ប្រមាណវិធីលើសំណុំ\n- **ប្រជុំ (Union) ៖** $A \\cup B = \\{x \\mid x \\in A \\text{ ឬ } x \\in B\\}$\n- **ប្រសព្វ (Intersection) ៖** $A \\cap B = \\{x \\mid x \\in A \\text{ និង } x \\in B\\}$\n- **រូបមន្តកាឌីណាល់ ៖** $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$",
    body_en: "## Set Theory\nCore set operations including union, intersection, and cardinal set inclusion-exclusion principles.",
  },

  {
    id: "les-g10-math-07",
    grade: 10,
    sort_order: 7,
    title_km: "ទម្រង់កាណូនិច កំពូល និងអ័ក្សឆ្លុះនៃប៉ារ៉ាបូល",
    title_en: "Canonical Form & Parabola Geometry",
    summary_km: "ទម្រង់កាណូនិច y = a(x - α)² + β កំពូល S(α, β) អ័ក្សឆ្លុះ x = α និងការសង់ក្រាបប៉ារ៉ាបូល",
    summary_en: "Canonical vertex form y = a(x - α)² + β, parabola orientation, symmetry axis x = α, and vertex coordinates",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-07" },
    body_km: "## ទម្រង់កាណូនិចនៃអនុគមន៍ដឺក្រេទី ២\n$$y = ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}$$\n- កំពូលប៉ារ៉ាបូល ៖ $S\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right)$\n- អ័ក្សឆ្លុះ ៖ $x = -\\frac{b}{2a}$\n- $a > 0 \\implies$ ប៉ារ៉ាបូលបែរភាពប៉ោងឡើងលើ (កំពូលជាចំណុចអប្បបរមា)\n- $a < 0 \\implies$ ប៉ារ៉ាបូលបែរភាពប៉ោងចុះក្រោម (កំពូលជាចំណុចអតិបរមា)",
    body_en: "## Parabola Characteristics\nVertex formula S(-b/2a, -Δ/4a), axis of symmetry x = -b/2a, and concavity orientation governed by leading coefficient a.",
  },

  {
    id: "les-g10-phys-06",
    grade: 10,
    sort_order: 6,
    title_km: "ចលនាត្រង់ប្រែប្រួលស្មើ និងការធ្លាក់សេរី",
    title_en: "Uniformly Accelerated Motion & Free Fall",
    summary_km: "រូបមន្ត v = at + v0, x = 1/2at² + v0t, v² - v0² = 2ad និងចលនាធ្លាក់សេរីក្រោមទំនាញ g",
    summary_en: "Kinematic equations for linear accelerated motion and gravitational free fall under constant g = 9.8 m/s²",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.physics,
    quiz: { id: "quiz-g10-phys-06" },
    body_km: "## រូបមន្តចលនាត្រង់ប្រែប្រួលស្មើ\n1. $v = at + v_0$\n2. $x = \\frac{1}{2}at^2 + v_0 t + x_0$\n3. $v^2 - v_0^2 = 2a(x - x_0) = 2ad$\n- ក្នុងចលនាធ្លាក់សេរី យក $a = g = 9.8 \\, \\text{m/s}^2$។",
    body_en: "## Accelerated Motion Kinematics\nEquations of uniformly accelerated rectilinear motion and free fall kinematics without initial velocity.",
  },

  {
    id: "les-g10-chem-06",
    grade: 10,
    sort_order: 6,
    title_km: "ការរៀបចំអេឡិចត្រុងក្នុងស្រទាប់ s, p, d, f",
    title_en: "Electron Configurations in Shells s, p, d, f",
    summary_km: "គោលការណ៍ Aufbau ច្បាប់ Pauli ច្បាប់ Hund និងការសរសេរកម្រងអេឡិចត្រុងនៃធាតុគីមី",
    summary_en: "Aufbau building-up principle, Pauli exclusion principle, Hund's rule, and atomic electron configuration notation",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.chemistry,
    quiz: { id: "quiz-g10-chem-06" },
    body_km: "## គោលការណ៍បំពេញអេឡិចត្រុង Aufbau\nលំដាប់ថាមពលកើនឡើង ៖\n$$1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < \\dots$$\n- ស្រទាប់រង $s$ ផ្ទុកអតិបរមា ២ អេឡិចត្រុង\n- ស្រទាប់រង $p$ ផ្ទុកអតិបរមា ៦ អេឡិចត្រុង\n- ស្រទាប់រង $d$ ផ្ទុកអតិបរមា ១០ អេឡិចត្រុង",
    body_en: "## Electron Orbital Configurations\nOrbital filling according to the Aufbau diagonal rule, Pauli exclusion rule, and maximum capacity of subshells.",
  },

  {
    id: "les-g10-bio-06",
    grade: 10,
    sort_order: 6,
    title_km: "ការបែងចែកកោសិកា ៖ មីតូស និងមេយ៉ូស",
    title_en: "Cell Division: Mitosis & Meiosis",
    summary_km: "វដ្តកោសិកា ដំណាក់កាលមីតូសទាំង ៤ (Prophase, Metaphase, Anaphase, Telophase) និងការបែងចែកកាម៉ែតមេយ៉ូស",
    summary_en: "Cell cycle regulation, 4 phases of mitotic replication maintaining 2n diploidy, and meiotic haploid gamete formation",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.biology,
    quiz: { id: "quiz-g10-bio-06" },
    body_km: "## ១. ការបែងចែកកោសិកាមីតូស (Mitosis)\n- ផ្តល់កោសិកាកូន ២ ដែលមានចំនួនក្រូម៉ូសូមឌីប្លូអ៊ីត ($2n$) ដូចកោសិកាមេបេះបិទ។\n- បម្រើឱ្យការលូតលាស់ និងការជួសជុលជាលិការាងកាយ។\n\n## ២. ការបែងចែកកោសិកាមេយ៉ូស (Meiosis)\n- កើតលើកោសិកាបន្តពូជ បង្កើតបានកាម៉ែត ៤ ដែលមានចំនួនក្រូម៉ូសូមអាប្លូអ៊ីត ($n$)។",
    body_en: "## Mitosis & Meiosis\nSomatic diploid replication via mitosis contrasted with meiotic reductional division generating haploid reproductive gametes.",
  },

  // ============================================================================
  // EXPANDED GRADE 10 ROADMAP — COMPREHENSIVE NATIONAL MOEYS CURRICULUM
  // Full 6–7 Lessons per Unit for Mastery & Real Calculation Practice
  // ============================================================================

  // --- UNIT 1: SETS & MATHEMATICAL LOGIC EXPANSIONS ---
  {
    id: "les-g10-math-06-p1",
    grade: 10,
    sort_order: 61,
    title_km: "ប្រមាណវិធីលើសំណុំ ៖ ប្រជុំ ប្រសព្វ ផលដក និងបំពេញ",
    title_en: "Operations on Sets: Union, Intersection, Difference & Complement",
    summary_km: "និយមន័យជាក់ស្តែងនៃ A ∪ B, A ∩ B, A \\ B និងសំណុំបំពេញ A' ជាមួយដ្យាក្រាមវ៉ែន",
    summary_en: "Set operations: union, intersection, set difference, and universe complement with Venn diagrams",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## ១. ប្រមាណវិធីគ្រឹះលើសំណុំ\n- **ប្រជុំ (Union) $A \\cup B$ ៖** សំណុំនៃធាតុទាំងអស់ដែលជារបស់ $A$ ឬជារបស់ $B$។\n- **ប្រសព្វ (Intersection) $A \\cap B$ ៖** សំណុំនៃធាតុរួមដែលជារបស់ $A$ ផង និងជារបស់ $B$ ផង។\n- **ផលដក (Difference) $A \\setminus B$ ៖** សំណុំនៃធាតុជារបស់ $A$ តែមិនជារបស់ $B$។\n- **សំណុំបំពេញ (Complement) $A'$ ឬ $C_E A$ ៖** សំណុំនៃធាតុក្នុងសំណុំសកល $E$ ដែលមិនជារបស់ $A$។\n\n## ២. លក្ខណៈដឺម៉កង់ (De Morgan's Laws)\n$$(A \\cup B)' = A' \\cap B', \\quad (A \\cap B)' = A' \\cup B'$$",
    body_en: "## Set Operations\nUnion, intersection, set differences, and complement sets along with De Morgan's fundamental dual laws.",
  },
  {
    id: "les-g10-math-06-p2",
    grade: 10,
    sort_order: 62,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ គណនាចំនួនធាតុក្នុងសំណុំ (Cardinality)",
    title_en: "Practice Lab: Cardinality & Venn Diagram Calculations",
    summary_km: "រូបមន្ត n(A ∪ B) = n(A) + n(B) - n(A ∩ B) និងការដោះស្រាយចំណោទសិស្សជាក់ស្តែង",
    summary_en: "Inclusion-exclusion formula and practical student survey Venn diagram problem solving",
    xp_reward: 45,
    estimated_minutes: 22,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## រូបមន្តកាឌីណាល់ (Cardinality Formulas)\nចំពោះសំណុំកំណត់ពីរ $A$ និង $B$ ៖\n$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$$\nបើ $A \\cap B = \\emptyset$ (សំណុំដាច់គ្នា) នោះ ៖ $n(A \\cup B) = n(A) + n(B)$។\n\n> **លំហាត់គំរូ ៖** ក្នុងថ្នាក់រៀនមួយមានសិស្ស ៤០ នាក់។ សិស្ស ២៥ នាក់ចូលចិត្តគណិតវិទ្យា, ២០ នាក់ចូលចិត្តរូបវិទ្យា, និង ១០ នាក់ចូលចិត្តទាំងពីរមុខ។ តើមានសិស្សប៉ុន្មាននាក់ចូលចិត្តយ៉ាងហោចណាស់មួយមុខ?\n> **ដំណោះស្រាយ ៖**\n> $$n(M \\cup P) = n(M) + n(P) - n(M \\cap P) = 25 + 20 - 10 = 35 \\text{ នាក់}$$",
    body_en: "## Cardinality Practice\nInclusion-exclusion principle applied to two-set word problems and Venn diagram partitioning.",
  },
  {
    id: "les-g10-math-06-p3",
    grade: 10,
    sort_order: 63,
    title_km: "តក្កវិទ្យាគណិតវិទ្យា ៖ សំណើ និងតារាងតម្លៃសច្ចភាព",
    title_en: "Mathematical Logic: Propositions & Truth Tables",
    summary_km: "សញ្ញាណសំណើ ឈ្នាប់តក្កវិទ្យា ឈ្នាប់ «និង» (∧) «ឬ» (∨) បដិសេធ (¬) និងតារាងសច្ចភាព",
    summary_en: "Propositions, logical truth values (True/False), conjunction (AND), disjunction (OR), and negation tables",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## ១. និយមន័យសំណើ (Proposition)\nសំណើ គឺជាល្បះថ្លែងដែលពិត ឬមិនពិតតែមួយគត់ (មិនអាចទាំងពិតផង មិនពិតផង)។\n\n## ២. ឈ្នាប់តក្កវិទ្យាគ្រឹះ\n- **បដិសេធ (Negation) $\\neg P$ ៖** ពិតពេល $P$ មិនពិត, មិនពិតពេល $P$ ពិត។\n- **ឈ្នាប់ «និង» (Conjunction) $P \\land Q$ ៖** ពិតលុះត្រាតែ $P$ និង $Q$ ពិតទាំងពីរ។\n- **ឈ្នាប់ «ឬ» (Disjunction) $P \\lor Q$ ៖** ពិតបើមានយ៉ាងហោចណាស់សំណើមួយពិត។",
    body_en: "## Logic & Truth Tables\nTruth evaluations for basic logical connectives: NOT, AND, and OR with truth tables.",
  },
  {
    id: "les-g10-math-06-p4",
    grade: 10,
    sort_order: 64,
    title_km: "លក្ខខណ្ឌចាំបាច់ និងគ្រប់គ្រាន់ សំណើទាញរក និងសមមូល",
    title_en: "Conditional Statements: Implication & Logical Equivalence",
    summary_km: "សំណើ P ⇒ Q សំណើបញ្ច្រាស សំណើប្រឆាំង សមមូល P ⇔ Q និងលក្ខខណ្ឌចាំបាច់-គ្រប់គ្រាន់",
    summary_en: "Implication P => Q, converse, contrapositive, logical equivalence P <=> Q, and necessary/sufficient conditions",
    xp_reward: 50,
    estimated_minutes: 24,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## ១. សំណើទាញរក (Implication) $P \\implies Q$\nសំណើ $P \\implies Q$ មិនពិតតែមួយករណីគត់ គឺពេល $P$ ពិតតែ $Q$ មិនពិត។\n- $P$ ជាលក្ខខណ្ឌ **គ្រប់គ្រាន់** សម្រាប់ $Q$\n- $Q$ ជាលក្ខខណ្ឌ **ចាំបាច់** សម្រាប់ $P$\n\n## ២. សំណើប្រឆាំងពីសម្មតិកម្ម (Contrapositive)\nសំណើ $P \\implies Q$ មានតម្លៃសច្ចភាពស្មើនឹងសំណើប្រឆាំង $\\neg Q \\implies \\neg P$ ជានិច្ច។",
    body_en: "## Conditional Logic\nImplication truth tables, contrapositive equivalences, and logical definitions of necessary versus sufficient conditions.",
  },
  {
    id: "les-g10-math-06-p5",
    grade: 10,
    sort_order: 65,
    title_km: "វិញ្ញាសាអនុវត្តជំពូកទី ១ ៖ សំណុំ និងតក្កវិទ្យា",
    title_en: "Unit 1 Mastery Challenge: Sets & Mathematical Logic",
    summary_km: "លំហាត់សរុបជំពូកទី ១ ដ្យាក្រាមវ៉ែន ស្រាយបញ្ជាក់សំណើ និងតារាងសច្ចភាពស្មុគស្មាញ",
    summary_en: "Comprehensive problem set on set operations, Venn diagrams, logical proofs, and compound truth tables",
    xp_reward: 60,
    estimated_minutes: 25,
    lessonType: "exam_prep",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-06" },
    body_km: "## វិញ្ញាសាជំពូកទី ១\nផ្នែកនេះរួមបញ្ចូលលំហាត់សរុបលើសំណុំ និងតក្កវិទ្យា ដើម្បីត្រៀមប្រឡងឆមាសទី ១ ថ្នាក់ទី ១០៖\n1. ការស្រាយបញ្ជាក់រូបមន្តដឺម៉កង់ដោយប្រើដ្យាក្រាមវ៉ែន\n2. ការបង្កើតតារាងសច្ចភាពសម្រាប់ $(P \\implies Q) \\land (Q \\implies R) \\implies (P \\implies R)$\n3. ការដោះស្រាយចំណោទសិស្សពហុសំណុំ",
    body_en: "## Unit 1 Mastery Exam\nSynthesis exam set covering multi-set operations, logical implication proofs, and transitivity theorems.",
  },

  // --- UNIT 2: QUADRATIC EQUATIONS & INEQUALITIES EXPANSIONS ---
  {
    id: "les-g10-math-11",
    grade: 10,
    sort_order: 110,
    title_km: "សមីការដឺក្រេទី ២ និងវិធីដោះស្រាយតាមឌីសគ្រីមីណង់ Δ",
    title_en: "Quadratic Equations & Discriminant Method (ax² + bx + c = 0)",
    summary_km: "ទម្រង់ទូទៅ ax² + bx + c = 0 ឌីសគ្រីមីណង់ Δ = b² - 4ac និងរូបមន្តឬស x = (-b ± √Δ)/(2a)",
    summary_en: "General form of quadratics, discriminant Δ = b² - 4ac analysis, and standard root evaluation formulas",
    xp_reward: 45,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: "## ១. រូបមន្តឌីសគ្រីមីណង់ $\\Delta$\nចំពោះសមីការ $ax^2 + bx + c = 0$ ($a \\neq 0$) ៖\n$$\\Delta = b^2 - 4ac$$\n- **បើ $\\Delta > 0$ ៖** សមីការមានឫសពីរផ្សេងគ្នា ៖\n  $$x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$$\n- **បើ $\\Delta = 0$ ៖** សមីការមានឫសឌុប ៖\n  $$x_1 = x_2 = -\\frac{b}{2a}$$\n- **បើ $\\Delta < 0$ ៖** សមីការគ្មានឫសក្នុងសំណុំចំនួនពិត $\\mathbb{R}$ ឡើយ។",
    body_en: "## Discriminant Method\nRoot characterization based on discriminant Delta: two real roots (Delta > 0), one double root (Delta = 0), or no real roots (Delta < 0).",
  },
  {
    id: "les-g10-math-11-p1",
    grade: 10,
    sort_order: 111,
    title_km: "ឌីសគ្រីមីណង់សម្រួល Δ' និងវិធីដោះស្រាយកាត់",
    title_en: "Reduced Discriminant Δ' & Factoring Shortcuts",
    summary_km: "ករណីមេគុណ b = 2b' ប្រើ Δ' = b'² - ac និងរូបមន្តពិសេស a + b + c = 0, a - b + c = 0",
    summary_en: "Reduced discriminant formula Δ' = b'² - ac when b is even, and special root shortcuts when sum of coefficients is 0",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: "## ១. ឌីសគ្រីមីណង់សម្រួល $\\Delta'$\nពេលមេគុណ $b$ ជាចំនួនគូ តាង $b = 2b'$ (ឬ $b' = \\frac{b}{2}$) ៖\n$$\\Delta' = b'^2 - ac$$\n- បើ $\\Delta' > 0$ ៖ $x = \\frac{-b' \\pm \\sqrt{\\Delta'}}{a}$\n- បើ $\\Delta' = 0$ ៖ $x = -\\frac{b'}{a}$\n\n## ២. ករណីពិសេសរហ័ស\n- បើ $a + b + c = 0 \\implies x_1 = 1, \\quad x_2 = \\frac{c}{a}$\n- បើ $a - b + c = 0 \\implies x_1 = -1, \\quad x_2 = -\\frac{c}{a}$",
    body_en: "## Reduced Discriminant\nComputing roots when b is even using Delta' = b'^2 - ac, and rapid mental root identification when a + b + c = 0.",
  },
  {
    id: "les-g10-math-11-p2",
    grade: 10,
    sort_order: 112,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ គណនាឫសសមីការដឺក្រេទី ២",
    title_en: "Practice Lab: Solving Quadratic Equations by Delta & Vieta",
    summary_km: "លំហាត់គណនាជាក់ស្តែង វិធីជ្រើសរើស Δ ឬ Δ' និងការផ្ទៀងផ្ទាត់ឫស",
    summary_en: "Hands-on calculation lab solving quadratic equations using standard and reduced discriminant methods",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: "## លំហាត់គំរូជាក់ស្តែង\n### លំហាត់ទី ១\nដោះស្រាយសមីការ $2x^2 - 7x + 3 = 0$\n- $a = 2, b = -7, c = 3$\n- $\\Delta = (-7)^2 - 4(2)(3) = 49 - 24 = 25 = 5^2 > 0$\n- $x_1 = \\frac{7 - 5}{2(2)} = \\frac{2}{4} = \\frac{1}{2}$\n- $x_2 = \\frac{7 + 5}{4} = \\frac{12}{4} = 3$\n- ដូចនេះ សមីការមានឫសពីរ ៖ $x = \\frac{1}{2}$ ឬ $x = 3$។",
    body_en: "## Step-by-Step Practice\nDetailed worked examples solving quadratics with distinct rational and radical roots.",
  },
  {
    id: "les-g10-math-12",
    grade: 10,
    sort_order: 120,
    title_km: "រូបមន្តវ្យែត (Vieta) ៖ ផលបូក S និងផលគុណ P នៃឫស",
    title_en: "Vieta's Formulas: Sum & Product of Quadratic Roots",
    summary_km: "រូបមន្ត S = x1 + x2 = -b/a, P = x1 · x2 = c/a និងការគណនាកន្សោមឆ្លុះ x1² + x2²",
    summary_en: "Vieta's theorem relations: root sum S = -b/a, product P = c/a, and evaluating symmetric expressions",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: "## ១. ទ្រឹស្តីបទវ្យែត (Vieta's Theorem)\nបើ $x_1, x_2$ ជាឫសនៃសមីការ $ax^2 + bx + c = 0$ ($a \\neq 0$) នោះ ៖\n$$S = x_1 + x_2 = -\\frac{b}{a}, \\quad P = x_1 \\cdot x_2 = \\frac{c}{a}$$\n\n## ២. កន្សោមឆ្លុះសំខាន់ៗ\n$$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = S^2 - 2P$$\n$$\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{S}{P}$$",
    body_en: "## Vieta's Theorem\nExpressions for the sum and product of quadratic roots and evaluating symmetric polynomial relations without explicitly solving.",
  },
  {
    id: "les-g10-math-12-p1",
    grade: 10,
    sort_order: 121,
    title_km: "ការបង្កើតសមីការដឺក្រេទី ២ តាមផលបូក S និងផលគុណ P",
    title_en: "Forming Quadratic Equations Given Sum & Product (x² - Sx + P = 0)",
    summary_km: "ទ្រឹស្តីបទស្វែងរកចំនួនពីរ x² - Sx + P = 0 លក្ខខណ្ឌមានចំនួនពិត S² - 4P ≥ 0",
    summary_en: "Reconstructing quadratic equations from root sums and products: x² - Sx + P = 0 when S² - 4P ≥ 0",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-01" },
    body_km: "## ទ្រឹស្តីបទបង្កើតសមីការ\nបើចំនួនពីរ $u$ និង $v$ មានផលបូក $S = u + v$ និងផលគុណ $P = u \\cdot v$ នោះ $u$ និង $v$ គឺជាឫសនៃសមីការ ៖\n$$X^2 - S X + P = 0$$\nលក្ខខណ្ឌដើម្បីឱ្យមានចំនួនពិត $u, v$ គឺ ៖ $S^2 - 4P \\ge 0$។\n\n> **លំហាត់គំរូ ៖** រកចំនួនពីរដែលមានផលបូកស្មើ $7$ និងផលគុណស្មើ $12$។\n> សមីការបង្កើត ៖ $X^2 - 7X + 12 = 0 \\implies (X - 3)(X - 4) = 0$\n> ដូចនេះ ចំនួនទាំងពីរនោះគឺ $3$ និង $4$។",
    body_en: "## Quadratic Reconstruction\nDetermining two unknowns from their known sum and product via the standard auxiliary equation X² - SX + P = 0.",
  },
  {
    id: "les-g10-math-05-p1",
    grade: 10,
    sort_order: 122,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ វិសមីការដឺក្រេទី ២ និងវិសមីការសនិទាន",
    title_en: "Practice Lab: Quadratic & Rational Fractional Inequalities",
    summary_km: "ការដោះស្រាយវិសមីការដឺក្រេទី ២ និងវិសមីការប្រភាគសនិទាន P(x)/Q(x) > 0 ដោយប្រើតារាងសញ្ញា",
    summary_en: "Hands-on sign table method solving quadratic inequalities and rational fractional inequalities",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-05" },
    body_km: "## វិធីសាស្ត្រតារាងសញ្ញាសម្រាប់វិសមីការ\n### ជំហានដោះស្រាយ ៖\n1. បម្លែងវិសមីការឱ្យអង្គម្ខាងស្មើ $0$ ៖ $f(x) > 0$ ឬ $f(x) \\le 0$\n2. រកឫសនៃកត្តានីមួយៗ (ភាគយក និងភាគបែង)\n3. គូសតារាងសញ្ញា និងអនុវត្តវិធានសញ្ញា\n4. សរសេរសំណុំដំណោះស្រាយជាចន្លោះ\n\n> **ឧទាហរណ៍ ៖** ដោះស្រាយ $x^2 - 5x + 6 > 0$\n> ឫស ៖ $x = 2, x = 3$។ មេគុណ $a = 1 > 0$។\n> តាមវិធាន «ក្នុងផ្ទុយ ក្រៅដូច» ៖ ចន្លោះខាងក្រៅឫសមានសញ្ញាវិជ្ជមាន $(+)$។\n> ដូចនេះ សំណុំដំណោះស្រាយគឺ ៖ $x \\in (-\\infty, 2) \\cup (3, +\\infty)$។",
    body_en: "## Sign Tables & Rational Inequalities\nStep-by-step methods for resolving polynomial and rational inequalities using interval test tables.",
  },

  // --- UNIT 3: QUADRATIC FUNCTIONS & PARABOLAS EXPANSIONS ---
  {
    id: "les-g10-math-07-p1",
    grade: 10,
    sort_order: 131,
    title_km: "កំពូល អ័ក្សឆ្លុះ និងតារាងអថេរភាពនៃប៉ារ៉ាបូល",
    title_en: "Parabola Symmetry, Extrema & Variation Tables",
    summary_km: "ការគណនាកំពូល S(-b/2a, -Δ/4a) អ័ក្សឆ្លុះ x = -b/2a និងការបង្កើតតារាងអថេរភាពកើន-ចុះ",
    summary_en: "Calculating parabola vertex coordinates, symmetry line, and constructing variation tables for extrema",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-07" },
    body_km: "## តារាងអថេរភាពនៃអនុគមន៍ដឺក្រេទី ២\n### ករណី $a > 0$ ៖\n- អនុគមន៍ចុះលើ $(-\\infty, -\\frac{b}{2a})$ និងកើនលើ $(-\\frac{b}{2a}, +\\infty)$\n- តម្លៃអប្បបរមាស្មើ $y_{min} = -\\frac{\\Delta}{4a}$ ត្រង់ $x = -\\frac{b}{2a}$\n\n### ករណី $a < 0$ ៖\n- អនុគមន៍កើនលើ $(-\\infty, -\\frac{b}{2a})$ និងចុះលើ $(-\\frac{b}{2a}, +\\infty)$\n- តម្លៃអតិបរមាស្មើ $y_{max} = -\\frac{\\Delta}{4a}$ ត្រង់ $x = -\\frac{b}{2a}$",
    body_en: "## Parabola Extrema\nMonotonicity direction and maximum/minimum value calculation determined by vertex S(-b/2a, -Δ/4a).",
  },
  {
    id: "les-g10-math-07-p2",
    grade: 10,
    sort_order: 132,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ ការសង់ក្រាបប៉ារ៉ាបូលក្នុងប្លង់កូអរដោនេ",
    title_en: "Practice Lab: Plotting Parabolas in the Cartesian Plane",
    summary_km: "ចំណុចពិសេស ៖ កំពូល ចំណុចប្រសព្វអ័ក្ស Ox, Oy និងការសង់ក្រាបប៉ារ៉ាបូលជាក់ស្តែង",
    summary_en: "Hands-on curve plotting: locating the vertex, Cartesian axis intercepts, and drawing symmetric parabolas",
    xp_reward: 50,
    estimated_minutes: 24,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-07" },
    body_km: "## ជំហានសង់ក្រាបប៉ារ៉ាបូល\n1. កំណត់កំពូល $S\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right)$\n2. រកអ័ក្សឆ្លុះ $x = -\\frac{b}{2a}$\n3. រកប្រសព្វនឹងអ័ក្ស $Oy$ ៖ ជំនួស $x = 0 \\implies y = c$\n4. រកប្រសព្វនឹងអ័ក្ស $Ox$ ៖ ដោះស្រាយ $ax^2 + bx + c = 0$\n5. ជ្រើសរើសចំណុចជំនួយឆ្លុះគ្នាមួយចំនួន រួចគូសខ្សែប៉ារ៉ាបូលរលូន។",
    body_en: "## Plotting Cartesian Parabolas\nFive-step procedure to draw exact parabolic curves from quadratic equations.",
  },
  {
    id: "les-g10-math-13",
    grade: 10,
    sort_order: 133,
    title_km: "ទីតាំងធៀបរវាងប៉ារ៉ាបូល និងបន្ទាត់ត្រង់",
    title_en: "Relative Positions of a Parabola and a Straight Line",
    summary_km: "សមីការអាប់ស៊ីសប្រសព្វ កាត់គ្នា ២ ចំណុច ប៉ះគ្នា (បន្ទាត់ប៉ះ) ឬគ្មានចំណុចរួម",
    summary_en: "Intersection of parabola y = ax² + bx + c and line y = mx + p via discriminant analysis of the abscissa equation",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-07" },
    body_km: "## សមីការអាប់ស៊ីសនៃចំណុចប្រសព្វ\nចំពោះប៉ារ៉ាបូល $(P): y = ax^2 + bx + c$ និងបន្ទាត់ $(D): y = mx + p$ ៖\n$$ax^2 + bx + c = mx + p \\iff ax^2 + (b - m)x + (c - p) = 0$$\n- **$\\Delta > 0$ ៖** $(D)$ កាត់ $(P)$ ត្រង់ពីរចំណុចផ្សេងគ្នា\n- **$\\Delta = 0$ ៖** $(D)$ ប៉ះ $(P)$ ត្រង់មួយចំណុច (បន្ទាត់ប៉ះ)\n- **$\\Delta < 0$ ៖** $(D)$ និង $(P)$ គ្មានចំណុចរួមឡើយ",
    body_en: "## Parabola-Line Intersections\nDetermining geometric intersections: secant line (Delta > 0), tangent line (Delta = 0), or non-intersecting line (Delta < 0).",
  },
  {
    id: "les-g10-math-13-p1",
    grade: 10,
    sort_order: 134,
    title_km: "លំហាត់អនុវត្ត ៖ ចំណោទបរមាអតិបរមា និងអប្បបរមា",
    title_en: "Practice Lab: Real-World Optimization & Extrema Word Problems",
    summary_km: "ការអនុវត្តកំពូលប៉ារ៉ាបូលដោះស្រាយចំណោទផ្ទៃក្រឡាអតិបរមា និងចលនាគ្រាប់ផ្លោង",
    summary_en: "Real-world optimization problems: maximum rectangular enclosure area and parabolic projectile height",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-07" },
    body_km: "## ចំណោទគំរូអតិបរមា\n> **ចំណោទ ៖** កសិករម្នាក់មានរបងប្រវែង $40\\,\\text{m}$ ចង់ធ្វើរោងចតុកោណកែងជាប់ជញ្ជាំងថ្ម (មិនបាច់ធ្វើរបងជញ្ជាំងម្ខាង)។ រកវិមាត្រដើម្បីឱ្យបានផ្ទៃក្រឡាធំបំផុត។\n> **ដំណោះស្រាយ ៖**\n> តាងទទឹងស្មើ $x$ ($x > 0$) $\\implies$ បណ្តោយស្មើ $40 - 2x$។\n> ផ្ទៃក្រឡា ៖ $S(x) = x(40 - 2x) = -2x^2 + 40x$\n> មេគុណ $a = -2 < 0 \\implies S$ មានតម្លៃអតិបរមាត្រង់ ៖\n> $$x = -\\frac{b}{2a} = -\\frac{40}{2(-2)} = 10\\,\\text{m}$$\n> បណ្តោយស្មើ $40 - 2(10) = 20\\,\\text{m}$។\n> ផ្ទៃក្រឡាធំបំផុតគឺ ៖ $S_{max} = 10 \\times 20 = 200\\,\\text{m}^2$។",
    body_en: "## Optimization Word Problems\nApplying quadratic vertices to maximize geometry areas and model ballistic trajectory peaks.",
  },

  // --- UNIT 4: VECTORS IN THE PLANE & ANALYTIC GEOMETRY EXPANSIONS ---
  {
    id: "les-g10-math-14",
    grade: 10,
    sort_order: 140,
    title_km: "ផលគុណស្កាលែនៃវ៉ិចទ័រពីរ និងកន្សោមវិភាគ",
    title_en: "Scalar Dot Product & Geometric Angle Formula",
    summary_km: "និយមន័យ u · v = |u||v|cos θ រូបមន្តកូអរដោនេ u · v = xx' + yy' និងលក្ខណៈផលគុណស្កាលែ",
    summary_en: "Geometric dot product u · v = |u||v|cos θ, coordinate formula xx' + yy', and algebraic bilinearity properties",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-02" },
    body_km: "## ផលគុណស្កាលែ (Dot Product)\n### ១. និយមន័យធរណីមាត្រ ៖\n$$\\vec{u} \\cdot \\vec{v} = ||\\vec{u}|| \\cdot ||\\vec{v}|| \\cdot \\cos(\\theta)$$\n\n### ២. កន្សោមកូអរដោនេក្នុងតម្រុយអរតូណរម៉ាល់ ៖\nបើ $\\vec{u} = (x, y)$ និង $\\vec{v} = (x', y')$ នោះ ៖\n$$\\vec{u} \\cdot \\vec{v} = x x' + y y'$$\n\n### ៣. រូបមន្តគណនាមុំ $\\theta$ ៖\n$$\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{||\\vec{u}|| \\cdot ||\\vec{v}||} = \\frac{x x' + y y'}{\\sqrt{x^2 + y^2} \\cdot \\sqrt{x'^2 + y'^2}}$$",
    body_en: "## Dot Product Analysis\nGeometric angle calculation between 2D planar vectors and algebraic coordinate computation.",
  },
  {
    id: "les-g10-math-14-p1",
    grade: 10,
    sort_order: 141,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ លក្ខខណ្ឌកែង និងប្រវែងវ៉ិចទ័រ",
    title_en: "Practice Lab: Vector Orthogonality & Norm Calculations",
    summary_km: "អនុវត្ត u ⊥ v ⇔ xx' + yy' = 0 និងការគណនាចម្ងាយរវាងចំណុចពីរក្នុងប្លង់",
    summary_en: "Hands-on exercises applying the orthogonality condition u · v = 0 and distance between coordinates",
    xp_reward: 45,
    estimated_minutes: 20,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-02" },
    body_km: "## លំហាត់គំរូកែងគ្នា\n> **លំហាត់ ៖** គេឱ្យវ៉ិចទ័រ $\\vec{u} = (m, 3)$ និង $\\vec{v} = (2, -4)$។ រកតម្លៃ $m$ ដើម្បីឱ្យ $\\vec{u} \\perp \\vec{v}$។\n> **ដំណោះស្រាយ ៖**\n> $$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$$\n> $$\\iff (m)(2) + (3)(-4) = 0$$\n> $$\\iff 2m - 12 = 0 \\implies 2m = 12 \\implies m = 6$$\n> ដូចនេះ តម្លៃ $m$ ដែលត្រូវរកគឺ $m = 6$។",
    body_en: "## Orthogonality Practice\nWorked calculations finding unknown vector coordinates given perpendicularity conditions.",
  },
  {
    id: "les-g10-math-15",
    grade: 10,
    sort_order: 150,
    title_km: "ទីតាំងធៀបនៃបន្ទាត់ពីរ និងមុំរវាងបន្ទាត់",
    title_en: "Relative Positions of Two Lines & Angle of Intersection",
    summary_km: "បន្ទាត់ស្របគ្នា បន្ទាត់កែងគ្នា ប្រសព្វគ្នា និងរូបមន្តគណនាមុំរវាងបន្ទាត់ពីរតាមវ៉ិចទ័រណរម៉ាល់",
    summary_en: "Parallel, perpendicular, and intersecting lines; acute angle formula between two lines via normal vectors",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-04" },
    body_km: "## មុំរវាងបន្ទាត់ពីរ\nចំពោះបន្ទាត់ពីរ $(D_1): a_1 x + b_1 y + c_1 = 0$ និង $(D_2): a_2 x + b_2 y + c_2 = 0$ ដែលមានវ៉ិចទ័រណរម៉ាល់រៀងគ្នា $\\vec{n}_1 = (a_1, b_1)$ និង $\\vec{n}_2 = (a_2, b_2)$ ៖\n$$\\cos(\\alpha) = \\frac{|a_1 a_2 + b_1 b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$$\n- $(D_1) \\perp (D_2) \\iff a_1 a_2 + b_1 b_2 = 0$\n- $(D_1) \\parallel (D_2) \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$",
    body_en: "## Angle Between Lines\nCalculating acute intersection angles between two planar lines using scalar products of normal vectors.",
  },
  {
    id: "les-g10-math-15-p1",
    grade: 10,
    sort_order: 151,
    title_km: "វិញ្ញាសាអនុវត្តជំពូកទី ៤ ៖ វ៉ិចទ័រ និងធរណីមាត្រវិភាគ",
    title_en: "Unit 4 Mastery Challenge: Vectors & Coordinate Geometry",
    summary_km: "លំហាត់សរុបវ៉ិចទ័រ ចម្ងាយពីចំណុចទៅបន្ទាត់ សមីការបន្ទាត់ និងផ្ទៃក្រឡាត្រីកោណ",
    summary_en: "Comprehensive problem set on vector dot products, normal vectors, distances, and analytic geometry",
    xp_reward: 60,
    estimated_minutes: 25,
    lessonType: "exam_prep",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-04" },
    body_km: "## វិញ្ញាសាជំពូកទី ៤\nលំហាត់ត្រៀមប្រឡងឆមាស ៖\n1. គណនាចម្ងាយពីចំណុច $A(1, -2)$ ទៅបន្ទាត់ $3x - 4y + 5 = 0$\n2. រកសមីការបន្ទាត់កាត់តាមចំណុចមួយ និងកែងនឹងបន្ទាត់ដែលឱ្យ\n3. ស្រាយបញ្ជាក់លក្ខណៈត្រីកោណកែងដោយប្រើផលគុណស្កាលែ",
    body_en: "## Unit 4 Synthesis Exam\nIntegrated assessment on analytic line distances, perpendicular bisectors, and dot product properties.",
  },

  // --- UNIT 5: ADVANCED TRIGONOMETRY & GENERAL TRIANGLES EXPANSIONS ---
  {
    id: "les-g10-math-16",
    grade: 10,
    sort_order: 160,
    title_km: "រូបមន្តមុំទ្វេ sin 2a, cos 2a និងរូបមន្តបន្ថយដឺក្រេ",
    title_en: "Double-Angle Formulas & Power-Reduction Identities",
    summary_km: "រូបមន្ត sin 2a = 2 sin a cos a, cos 2a = cos²a - sin²a និងរូបមន្តបន្ថយដឺក្រេ cos²a = (1 + cos 2a)/2",
    summary_en: "Double-angle identities, power-reduction formulas, and tangent half-angle parameterizations",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-03" },
    body_km: "## រូបមន្តមុំទ្វេ និងបន្ថយដឺក្រេ\n### ១. មុំទ្វេ ៖\n$$\\sin(2a) = 2\\sin a \\cos a$$\n$$\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$$\n$$\\tan(2a) = \\frac{2\\tan a}{1 - \\tan^2 a}$$\n\n### ២. បន្ថយដឺក្រេ (Power-Reduction) ៖\n$$\\cos^2 a = \\frac{1 + \\cos(2a)}{2}, \\quad \\sin^2 a = \\frac{1 - \\cos(2a)}{2}$$",
    body_en: "## Double-Angle & Linearization\nStandard double-angle identities and power reduction techniques for simplifying trigonometric expressions.",
  },
  {
    id: "les-g10-math-17",
    grade: 10,
    sort_order: 170,
    title_km: "ទ្រឹស្តីបទស៊ីនុស និងកូស៊ីនុសក្នុងត្រីកោណទូទៅ",
    title_en: "Laws of Sines & Cosines in General Triangles",
    summary_km: "ទ្រឹស្តីបទស៊ីនុស a/sin A = b/sin B = c/sin C = 2R និងទ្រឹស្តីបទកូស៊ីនុស a² = b² + c² - 2bc cos A",
    summary_en: "Law of Sines with circumradius R, and Law of Cosines for resolving oblique triangles",
    xp_reward: 50,
    estimated_minutes: 24,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-03" },
    body_km: "## ១. ទ្រឹស្តីបទស៊ីនុស (Law of Sines)\nក្នុងត្រីកោណ $ABC$ ណាមួយ ៖\n$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$\nដែល $R$ ជាកាំរង្វង់ចារឹកក្រៅត្រីកោណ។\n\n## ២. ទ្រឹស្តីបទកូស៊ីនុស (Law of Cosines)\n$$a^2 = b^2 + c^2 - 2bc \\cos A$$\n$$b^2 = a^2 + c^2 - 2ac \\cos B$$\n$$c^2 = a^2 + b^2 - 2ab \\cos C$$",
    body_en: "## Laws of Sines & Cosines\nFundamental formulas connecting side lengths, angles, and circumradii in arbitrary triangles.",
  },
  {
    id: "les-g10-math-17-p1",
    grade: 10,
    sort_order: 171,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ គណនាផ្ទៃក្រឡាត្រីកោណ និងរូបមន្តហេរ៉ុង",
    title_en: "Practice Lab: Triangle Area Formulas & Heron's Formula",
    summary_km: "រូបមន្ត S = 1/2 ab sin C និងរូបមន្តហេរ៉ុង S = √(p(p-a)(p-b)(p-c)) ដែល p ជាកន្លះបរិមាត្រ",
    summary_en: "Calculating oblique triangle area using sine formulas and Heron's semi-perimeter formula",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-03" },
    body_km: "## រូបមន្តផ្ទៃក្រឡាត្រីកោណ\n1. **តាមស៊ីនុស ៖** $S = \\frac{1}{2}ab \\sin C = \\frac{1}{2}bc \\sin A = \\frac{1}{2}ac \\sin B$\n2. **រូបមន្តហេរ៉ុង (Heron's Formula) ៖**\n   $$S = \\sqrt{p(p - a)(p - b)(p - c)}$$\n   ដែល $p = \\frac{a + b + c}{2}$ ជាកន្លះបរិមាត្រ។\n\n> **លំហាត់គំរូ ៖** ត្រីកោណមួយមានជ្រុង $a = 5, b = 6, c = 7$។ គណនាផ្ទៃក្រឡា។\n> $p = \\frac{5 + 6 + 7}{2} = 9$\n> $S = \\sqrt{9(9 - 5)(9 - 6)(9 - 7)} = \\sqrt{9 \\times 4 \\times 3 \\times 2} = \\sqrt{216} = 6\\sqrt{6} \\approx 14.7$",
    body_en: "## Triangle Area Practice\nHeron's theorem and trigonometric area formulas applied to oblique triangle calculations.",
  },

  // --- UNIT 6: DESCRIPTIVE STATISTICS EXPANSIONS ---
  {
    id: "les-g10-math-18",
    grade: 10,
    sort_order: 180,
    title_km: "ស្ថិតិពិពណ៌នា ៖ មធ្យមនព្វន្ត មេដ្យាន និងម៉ូត",
    title_en: "Measures of Central Tendency: Mean, Median & Mode",
    summary_km: "ការគណនាមធ្យមនព្វន្ត x̄ មេដ្យាន Me និងម៉ូត Mo សម្រាប់ទិន្នន័យដាច់ និងទិន្នន័យចែកជាថ្នាក់",
    summary_en: "Calculating statistical mean, median, and mode for discrete and continuous grouped frequency data",
    xp_reward: 45,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-05" },
    body_km: "## រង្វាស់និន្នាការកណ្តាល\n1. **មធ្យមនព្វន្ត (Mean) ៖**\n   $$\\bar{x} = \\frac{\\sum_{i=1}^k n_i x_i}{N} = \\frac{n_1 x_1 + n_2 x_2 + \\dots + n_k x_k}{N}$$\n2. **មេដ្យាន (Median $Me$) ៖** តម្លៃទិន្នន័យដែលនៅចំកណ្តាលគេ បន្ទាប់ពីរៀបតាមលំដាប់កើន។\n3. **ម៉ូត (Mode $Mo$) ៖** តម្លៃទិន្នន័យណាដែលមានប្រេកង់ (ចំនួនដង) ច្រើនជាងគេបំផុត។",
    body_en: "## Central Tendency\nFormulas for weighted mean, median position, and modal values in statistical distributions.",
  },
  {
    id: "les-g10-math-18-p1",
    grade: 10,
    sort_order: 181,
    title_km: "វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារនៃទិន្នន័យស្ថិតិ",
    title_en: "Measures of Dispersion: Variance & Standard Deviation",
    summary_km: "រូបមន្តវ៉ារ្យ៉ង់ V = ∑ ni(xi - x̄)² / N និងគម្លាតស្តង់ដារ σ = √V សម្រាប់វាស់កម្រិតលំអៀង",
    summary_en: "Measuring statistical dispersion using variance V and standard deviation σ = √V",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "concept",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-05" },
    body_km: "## រង្វាស់កម្រិតលំអៀង (Dispersion)\n1. **វ៉ារ្យ៉ង់ (Variance $V$ ឬ $\\sigma^2$) ៖**\n   $$V = \\frac{\\sum_{i=1}^k n_i (x_i - \\bar{x})^2}{N} = \\frac{\\sum n_i x_i^2}{N} - \\bar{x}^2$$\n2. **គម្លាតស្តង់ដារ (Standard Deviation $\\sigma$) ៖**\n   $$\\sigma = \\sqrt{V}$$\n   - $\\sigma$ កាន់តែតូច $\\implies$ ទិន្នន័យកាន់តែប្រមូលផ្តុំក្បែរមធ្យម (មានស្ថិរភាពខ្ពស់)។",
    body_en: "## Statistical Dispersion\nVariance and standard deviation formulas measuring data scatter around the mean.",
  },
  {
    id: "les-g10-math-18-p2",
    grade: 10,
    sort_order: 182,
    title_km: "លំហាត់អនុវត្តខ្លីៗ ៖ គណនាមធ្យម និងគម្លាតស្តង់ដារ",
    title_en: "Practice Lab: Calculating Grouped Mean & Standard Deviation",
    summary_km: "លំហាត់គណនាជាក់ស្តែងជាមួយតារាងប្រេកង់សិស្សប្រឡង MoEYS",
    summary_en: "Worked statistics problem set calculating mean and standard deviation from frequency distributions",
    xp_reward: 50,
    estimated_minutes: 22,
    lessonType: "practice",
    subject: SUBJECT_METADATA.mathematics,
    quiz: { id: "quiz-g10-math-05" },
    body_km: "## លំហាត់គំរូស្ថិតិ\nពិន្ទុប្រឡងគណិតវិទ្យារបស់សិស្ស ៥ នាក់ ៖ $12, 14, 15, 16, 18$។\n1. មធ្យមនព្វន្ត ៖\n   $$\\bar{x} = \\frac{12 + 14 + 15 + 16 + 18}{5} = \\frac{75}{5} = 15$$\n2. វ៉ារ្យ៉ង់ ៖\n   $$V = \\frac{(12-15)^2 + (14-15)^2 + (15-15)^2 + (16-15)^2 + (18-15)^2}{5}$$\n   $$V = \\frac{9 + 1 + 0 + 1 + 9}{5} = \\frac{20}{5} = 4$$\n3. គម្លាតស្តង់ដារ ៖ $\\sigma = \\sqrt{4} = 2$។",
    body_en: "## Statistics Calculation Lab\nStep-by-step evaluation of mean, squared deviations, variance, and standard deviation.",
  },
];
