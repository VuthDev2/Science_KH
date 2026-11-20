# ScienceKH — Grade 12 Science Stream (ថ្នាក់វិទ្យាសាស្ត្រ ថ្នាក់ទី ១២)
## កម្មវិធីសិក្សាផ្លូវការ និងវិញ្ញាសាត្រៀមប្រឡងបាក់ឌុប ៥០០ ពិន្ទុ MoEYS

---

## 1. Mathematics (គណិតវិទ្យា ថ្នាក់ទី ១២ — ១២៥ ពិន្ទុ / 150 នាទី)

### Units & Lessons Breakdown:
#### Unit 1: គណិតវិភាគ អាំងតេក្រាល និងមាឌ (Calculus, Integrals & Volumes)
- **Lesson 1.1 (`les-g12-math-01`):** អាំងតេក្រាលកំណត់ និងព្រីមីទីវ (Definite Integrals & Fundamental Theorem)
  - *Fundamental Theorem:* $\int_a^b f(x)dx = [F(x)]_a^b = F(b) - F(a)$.
  - *Integration by Parts:* $\int u dv = uv - \int v du$. Priority order LIATE (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential).
- **Lesson 1.2 (`les-g12-math-06`):** ក្រឡាផ្ទៃ និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស Ox (Volumes of Solids of Revolution)
  - *Bounded Area:* $S = \int_a^b |f(x) - g(x)| dx$.
  - *Volume of Revolution:* $V = \pi \int_a^b [f(x)]^2 dx$ (revolving about the horizontal $Ox$ axis between $x = a$ and $x = b$).
- **Lesson 1.3 (`les-g12-math-03`):** អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត (Exponential & Logarithmic Functions)
  - *Derivatives:* $(\ln x)' = \frac{1}{x}$; $(e^x)' = e^x$; $(\ln u)' = \frac{u'}{u}$; $(e^u)' = u' e^u$. Limits: $\lim_{x \to 0} \frac{e^x - 1}{x} = 1$; $\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1$.

#### Unit 2: សមីការឌីផេរ៉ង់ស្យែល និងចំនួនកុំផ្លិច (Differential Equations & Complex Numbers)
- **Lesson 2.1 (`les-g12-math-07`):** សមីការឌីផេរ៉ង់ស្យែលលំដាប់១ និងលំដាប់២ (First & Second Order ODEs)
  - *1st Order:* $y' + ay = 0 \implies y = C e^{-ax}$.
  - *2nd Order Homogeneous:* $ay'' + by' + cy = 0$ with characteristic equation $ar^2 + br + c = 0$:
    - If $\Delta > 0$: Two real roots $r_1, r_2 \implies y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$.
    - If $\Delta = 0$: Double root $r_0 \implies y = (C_1 x + C_2) e^{r_0 x}$.
    - If $\Delta < 0$: Complex roots $\alpha \pm i\beta \implies y = e^{\alpha x} (C_1 \cos\beta x + C_2 \sin\beta x)$.
- **Lesson 2.2 (`les-g12-math-02`):** ចំនួនកុំផ្លិច ទម្រង់ត្រីកោណមាត្រ និងដឺម័រ (Complex Trigonometric Form & De Moivre)
  - *Algebraic Form:* $z = a + bi$; Modulus $r = |z| = \sqrt{a^2 + b^2}$; Argument $\theta = \arg(z)$ where $\cos\theta = \frac{a}{r}, \sin\theta = \frac{b}{r}$.
  - *Trigonometric Form:* $z = r(\cos\theta + i\sin\theta)$.
  - *De Moivre's Theorem:* $[r(\cos\theta + i\sin\theta)]^n = r^n (\cos n\theta + i\sin n\theta)$.
- **Lesson 2.3 (`les-g12-math-08`):** ការអនុវត្តកុំផ្លិច និងឫសទី n (Roots of Unity & Applications)

#### Unit 3: ធរណីមាត្រក្នុងលំហ Oxyz (3D Analytic Space Geometry)
- **Lesson 3.1 (`les-g12-math-04`):** ផលគុណវ៉ិចទ័រ និងសមីការប្លង់ក្នុងលំហ (Cross Product & Plane Equations)
  - *Cross Product:* $\vec{u} \times \vec{v} = (y z' - z y', z x' - x z', x y' - y x')$. Produces a normal vector $\vec{n} \perp \vec{u}$ and $\vec{n} \perp \vec{v}$.
  - *Plane Equation:* $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \iff Ax + By + Cz + D = 0$.
- **Lesson 3.2 (`les-g12-math-09`):** ចម្ងាយពីចំណុចទៅប្លង់ និងសមីការស្វ៊ែរ (Distance to Plane & Sphere Equations)
  - *Distance Formula:* $d(M_0, (P)) = \frac{|A x_0 + B y_0 + C z_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$.
  - *Sphere Equation:* $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ centered at $I(a, b, c)$ with radius $R$.

#### Unit 4: ប្រូបាប៊ីលីតេ និងអថេរចៃដន្យ (Probability & Random Variables)
- **Lesson 4.1 (`les-g12-math-05`):** ចម្លាស់ បន្សំ និងប្រូបាបលក្ខខណ្ឌ (Combinatorics & Conditional Probability)
  - *Formulas:* $C_n^k = \frac{n!}{k!(n-k)!}$; Conditional $P(A|B) = \frac{P(A \cap B)}{P(B)}$ ($P(B) > 0$).
- **Lesson 4.2 (`les-g12-math-10`):** អថេរចៃដន្យដាច់ សង្ឃឹមគណិត និងវ៉ារ្យ៉ង់ (Discrete Random Variables)
  - *Expectation:* $E(X) = \sum x_i P(X = x_i)$; Variance $V(X) = E(X^2) - [E(X)]^2$; Standard Deviation $\sigma(X) = \sqrt{V(X)}$.

---

## 2. Physics (រូបវិទ្យា — ៧៥ ពិន្ទុ / 90 នាទី)

### Key Exam Chapters:
1. **លំយោលសេរី (Free Oscillations):**
   - Simple pendulum: $T = 2\pi\sqrt{\frac{l}{g}}$; Elastic spring: $T = 2\pi\sqrt{\frac{m}{k}}$; Differential equation: $\ddot{x} + \omega_0^2 x = 0$.
2. **រលក និងសៀគ្វីចរន្តឆ្លាស់ RLC (Waves & AC Circuits):**
   - Mechanical wave speed $v = \frac{\lambda}{T} = \lambda f$.
   - Series RLC impedance: $Z = \sqrt{R^2 + (L\omega - \frac{1}{C\omega})^2}$.
   - Resonance frequency: $f_0 = \frac{1}{2\pi\sqrt{LC}}$ when $L\omega = \frac{1}{C\omega}$ (impedance minimized to $Z = R$).
3. **រូបវិទ្យានុយក្លេអ៊ែរ (Nuclear Physics & Radioactivity):**
   - Radioactive decay law: $N(t) = N_0 e^{-\lambda t}$; Half-life $T_{1/2} = \frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}$.
   - Einstein mass-energy equivalence: $E = mc^2$; Mass defect $\Delta m = [Z m_p + (A - Z) m_n] - m_{\text{nucleus}}$; Binding energy $E_b = \Delta m \cdot c^2$.

---

## 3. Chemistry (គីមីវិទ្យា — ៧៥ ពិន្ទុ / 90 នាទី)

### Key Exam Chapters:
1. **ស៊ីនេទិចគីមី និងលំនឹង (Chemical Kinetics & Equilibrium):**
   - Average rate of reaction $v = -\frac{1}{a}\frac{\Delta [A]}{\Delta t} = \frac{1}{c}\frac{\Delta [C]}{\Delta t}$.
   - Equilibrium constant: For $aA + bB \rightleftharpoons cC + dD$, $K_c = \frac{[C]^c [D]^d}{[A]^a [B]^b}$.
   - Le Chatelier's Principle: When a dynamic equilibrium is disturbed, the system shifts to counteract the disturbance.
2. **អាស៊ីត-បាស និងអត្រាកម្ម (Acids-Bases & pH Titrations):**
   - Strong acid: $\text{pH} = -\log[H_3O^+]$; Strong base: $\text{pH} = 14 + \log[OH^-]$.
   - Equivalence point in titration: $C_A V_A = C_B V_B$.
3. **គីមីសរីរាង្គ អេស្ទែរ និងខ្លាញ់ (Organic Esters & Lipids):**
   - Esterification: $\text{Carboxylic Acid} + \text{Alcohol} \xrightleftharpoons{H_2SO_4, \Delta} \text{Ester} + \text{Water}$ (reversible, slow).
   - Saponification: $\text{Triglyceride} + 3NaOH \xrightarrow{\Delta} \text{Glycerol} + 3\text{Soap (Sodium Carboxylate)}$ (irreversible, complete).

---

## 4. Biology (ជីវវិទ្យា — ៧៥ ពិន្ទុ / 90 នាទី)

### Key Exam Chapters:
1. **ហ្សែនវិទ្យាម៉ូលេគុល (Molecular Genetics):**
   - DNA structure: Double helix with complementary base pairing ($A=T$ with 2 hydrogen bonds, $G \equiv C$ with 3 bonds).
   - Central Dogma: DNA $\xrightarrow{\text{Transcription}} \text{mRNA} \xrightarrow{\text{Translation}} \text{Protein}$. Genetic code is triplet, degenerate, and universal.
2. **ច្បាប់តំណពូជរបស់ម៉ង់ដែល (Mendelian Genetics):**
   - Dihybrid cross phenotypic ratio for two unlinked heterozygous genes ($AaBb \times AaBb$): $9 : 3 : 3 : 1$.
3. **ប្រព័ន្ធភាពស៊ាំ (Human Immunology):**
   - Cell-mediated immunity (T-lymphocytes) vs Humoral immunity (B-lymphocytes producing specific antibodies).
   - Vaccines introduce inactivated/attenuated antigens, eliciting memory B-cells for permanent immunity.

---

## 5. Authentic Bac II Examination Practice Problems

### Bac II Mathematics Model (25 Marks)
គណនាអាំងតេក្រាលដោយប្រើវិធីអាំងតេក្រាលដោយផ្នែក៖
$$I = \int_1^e x \ln x \, dx$$
- **Solution:**
  1. Let $u = \ln x \implies du = \frac{1}{x} dx$.
  2. Let $dv = x dx \implies v = \frac{x^2}{2}$.
  3. Formula: $\int u dv = uv - \int v du$.
  4. Calculation:
     $$I = \left[ \frac{x^2}{2} \ln x \right]_1^e - \int_1^e \frac{x^2}{2} \cdot \frac{1}{x} dx$$
     $$I = \left( \frac{e^2}{2} \ln e - \frac{1^2}{2} \ln 1 \right) - \frac{1}{2} \int_1^e x dx$$
     $$I = \frac{e^2}{2}(1) - 0 - \frac{1}{2} \left[ \frac{x^2}{2} \right]_1^e = \frac{e^2}{2} - \frac{1}{4}(e^2 - 1) = \frac{2e^2 - e^2 + 1}{4} = \frac{e^2 + 1}{4}$$
  5. Final Result: $I = \frac{e^2 + 1}{4}$.
