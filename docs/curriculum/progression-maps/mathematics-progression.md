# ScienceKH — MoEYS Mathematics Grade-to-Grade Progression Map (Grades 7–12)
## ផែនទីដំណើរវិវត្តន៍ចំណេះដឹងគណិតវិទ្យា ថ្នាក់ទី ៧ ដល់ ទី ១២ តាមស្ដង់ដារ MoEYS

> [!IMPORTANT]
> This map articulates the vertical progression of mathematical competencies from foundational junior concepts to advanced Baccalaureate II calculus and analytical geometry. It ensures prerequisite mastery, eliminates pedagogical blind spots, and aligns with the **Curriculum Framework of General Education and Technical Education (MoEYS)**.

---

## 1. High-Level Mathematical Progression Architecture

```mermaid
flowchart TD
    subgraph G7["ថ្នាក់ទី ៧ (Foundation)"]
        G7_Num["នព្វន្ត និងចំនួនគត់រ៉ឺឡាទីវ<br>(Signed Integers, Fractions, Decimals)"]
        G7_Alg["ពីជគណិត និងសមីការដឺក្រេទី១<br>(Linear Equations, Powers, Monomials)"]
        G7_Geo["ធរណីមាត្រក្នុងប្លង់<br>(Lines, Angles, Triangles 180°)"]
        G7_Stat["ស្ថិតិបឋម<br>(Frequency Tables, Bar Charts)"]
    end

    subgraph G8["ថ្នាក់ទី ៨ (Intermediate Extension)"]
        G8_Num["ចំនួនពិត និងរ៉ាឌីកាល់<br>(Real Numbers, Square Roots)"]
        G8_Alg["ពហុធា និងការដាក់ជាផលគុណកត្តា<br>(Factorization, Algebraic Fractions)"]
        G8_Geo["ត្រីកោណប៉ុនគ្នា និងពីតាក័រ<br>(Congruence, Pythagoras a²+b²=c²)"]
        G8_Sol["សូលីត និងផ្ទៃក្រឡា<br>(Prisms, Cylinders, Pyramids, Cones)"]
    end

    subgraph G9["ថ្នាក់ទី ៩ (Brevet / ឌីប្លូម)"]
        G9_Sys["ប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអថេរ<br>(2-Variable Linear Systems)"]
        G9_Quad["សមីការដឺក្រេទី២ និងទំនាក់ទំនងវ្យែត<br>(Quadratic Equations, Viète S & P)"]
        G9_Thales["ទ្រឹស្តីបទតាឡែស និងចតុកោណចារឹកក្នុងរង្វង់<br>(Thales Theorem, Cyclic Quads)"]
        G9_Prob["ប្រូបាប៊ីលីតេបឋម<br>(Laplace Probability P = n/N)"]
    end

    subgraph G10["ថ្នាក់ទី ១០ (Upper Secondary Core)"]
        G10_Poly["ឫសនៃពហុធា និងសញ្ញានៃត្រីធា<br>(Quadratic Trinomial Signs)"]
        G10_Trig["ត្រីកោណមាត្រក្នុងរង្វង់ត្រីកោណមាត្រ<br>(Unit Circle, Addition Formulas)"]
        G10_Vec["វ៉ិចទ័រក្នុងប្លង់ និងផលគុណស្កាលែ<br>(Planar Vectors, Dot Product)"]
    end

    subgraph G11["ថ្នាក់ទី ១១ (Stream Specialization)"]
        G11_Lim["លីមីតនៃអនុគមន៍ និងភាពជាប់<br>(Limits 0/0, ∞/∞, Continuity)"]
        G11_Deriv["ដេរីវេ និងការអនុវត្តរកបរមា<br>(Derivatives, Extrema, Curve Sketching)"]
        G11_Seq["ស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ<br>(Progressions, Induction)"]
        G11_Comb["ចម្លាស់ បន្សំ និងប្រូបាប<br>(Permutations, Combinations C(n,k))"]
    end

    subgraph G12["ថ្នាក់ទី ១២ (Bac II / បាក់ឌុប)"]
        G12_Int["អាំងតេក្រាលកំណត់ និងមាឌសូលីតបង្វិល<br>(Definite Integrals, Volumes of Revolution)"]
        G12_Diff["សមីការឌីផេរ៉ង់ស្យែលលំដាប់១ និង ២<br>(1st & 2nd Order Linear ODEs)"]
        G12_Comp["ចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ<br>(Complex Numbers, De Moivre Theorem)"]
        G12_Space["ធរណីមាត្រក្នុងលំហ Oxyz<br>(3D Planes, Vectors, Cross Product)"]
        G12_Rand["អថេរចៃដន្យ និងសង្ឃឹមគណិត E(X)<br>(Random Variables, Expectation)"]
    end

    G7_Num --> G8_Num --> G9_Quad --> G10_Poly --> G11_Lim --> G12_Int
    G7_Alg --> G8_Alg --> G9_Sys --> G10_Poly --> G11_Deriv --> G12_Diff
    G7_Geo --> G8_Geo --> G9_Thales --> G10_Trig & G10_Vec --> G12_Space
    G7_Stat --> G9_Prob --> G11_Comb --> G12_Rand
```

---

## 2. Topic-by-Topic Vertical Learning Progression Table

| Mathematical Domain | Grade 7 (ថ្នាក់ទី ៧) | Grade 8 (ថ្នាក់ទី ៨) | Grade 9 (ថ្នាក់ទី ៩) | Grade 10 (ថ្នាក់ទី ១០) | Grade 11 (ថ្នាក់ទី ១១) | Grade 12 (ថ្នាក់ទី ១២) |
|---|---|---|---|---|---|---|
| **Numbers & Operations**<br>*(នព្វន្ត និងចំនួន)* | ចំនួនគត់រ៉ឺឡាទីវ, ប្រភាគ, ទសភាគ, GCD/LCM | ចំនួនសនិទាន និងអសនិទាន, ឫសការ៉េ $\sqrt{a}$ | រ៉ាឌីកាល់ និងការគណនាកន្សោមរ៉ាឌីកាល់ | ចំនួនកុំផ្លិចកម្រិតដំបូង, ម៉ូឌុល | ទម្រង់ពីជគណិត និងត្រីកោណមាត្រ | រូបមន្តដឺម័រ $(\cos\theta + i\sin\theta)^n$, ឫសទី $n$ |
| **Algebra & Equations**<br>*(ពីជគណិត និងសមីការ)* | សមីការ $ax+b=c$, កន្សោមពីជគណិត | ពហុធា, ផលគុណកត្តា $(a\pm b)^2$, $a^2-b^2$ | សមីការដឺក្រេទី២ $ax^2+bx+c=0$, $\Delta$, វ្យែត $S, P$ | សញ្ញាត្រីធា, វិសមីការដឺក្រេទី២, ប៉ារ៉ាម៉ែត្រ | ស្វ៊ីតនព្វន្ត ($u_n=u_1+(n-1)d$), ស្វ៊ីតធរណីមាត្រ ($u_n=u_1q^{n-1}$) | សមីការឌីផេរ៉ង់ស្យែល $y'+ay=0$, $ay''+by'+cy=0$ |
| **Linear Systems**<br>*(ប្រព័ន្ធសមីការ)* | សមាមាត្រ និងផលធៀប | សមីការមានពីរអថេរកម្រិតបឋម | ប្រព័ន្ធសមីការ ២ អថេរ (ជំនួស បូកបំបាត់ ដេទែមីណង់) | ប្រព័ន្ធសមីការ ៣ អថេរ កម្រិតគ្រឹះ | ម៉ាទ្រីស និងប្រព័ន្ធសមីការលីនេអ៊ែរ | ការអនុវត្តប្រព័ន្ធសមីការក្នុងធរណីមាត្រ Oxyz |
| **Functions & Calculus**<br>*(អនុគមន៍ និងគណិតវិភាគ)* | គំនូសតាងចំណុចក្នុងប្លង់កូអរដោនេ | បន្ទាត់ត្រង់ $y=ax+b$, មេគុណប្រាប់ទិស | អនុគមន៍លីនេអ៊ែរ និងអនុគមន៍ថេរ | អនុគមន៍ដឺក្រេទី២ (ប៉ារ៉ាបូល កំពូល អ័ក្សឆ្លុះ) | លីមីត ($\frac{0}{0}, \frac{\infty}{\infty}$), ដេរីវេ ($u\cdot v, \frac{u}{v}, u^n$), បរមា | អនុគមន៍ $\ln x, e^x$, អាំងតេក្រាល $\int f(x)dx$, មាឌ $V=\pi\int f^2dx$ |
| **Geometry**<br>*(ធរណីមាត្រ)* | បន្ទាត់ស្រប បន្ទាត់កែង មុំ ផលបូកមុំត្រីកោណ $180^\circ$ | ត្រីកោណប៉ុនគ្នា, ពីតាក័រ $c^2=a^2+b^2$ | ទ្រឹស្តីបទតាឡែស, មុំចារឹកក្នុងរង្វង់, ចតុកោណចារឹក | វ៉ិចទ័រក្នុងប្លង់, ផលគុណស្កាលែ $\vec{u}\cdot\vec{v}$ | ប្លង់កោនិក (ប៉ារ៉ាបូល អេលីប អ៊ីពែបូល) | ធរណីមាត្រក្នុងលំហ Oxyz, សមីការប្លង់, ចម្ងាយទៅប្លង់ |
| **Trigonometry**<br>*(ត្រីកោណមាត្រ)* | ផលធៀបប្រវែងក្នុងត្រីកោណកែង | គំនិតត្រីកោណមាត្របឋម | ស៊ីនុស កូស៊ីនុស តង់សង់ ក្នុងត្រីកោណកែង | រង្វង់ត្រីកោណមាត្រ, រូបមន្តបូក, រូបមន្តគុណពីរ | សមីការត្រីកោណមាត្រ $\sin x=a, \cos x=b$, ដេរីវេ | អាំងតេក្រាលអនុគមន៍ត្រីកោណមាត្រ, កុំផ្លិច |
| **Statistics & Probability**<br>*(ស្ថិតិ និងប្រូបាប)* | តារាងប្រេកង់, ដ្យាក្រាមសសរ, មធ្យមភាគ | ប្រេកង់កើន, មេដ្យាន, ម៉ូត, ហ៊ីស្តូក្រាម | ប្រូបាប៊ីលីតេឡាផ្លាស $P=\frac{n(A)}{n(S)}$, ដើមឈើប្រូបាប | លំហសំណាក, ច្បាប់បូក និងគុណប្រូបាប | ចម្លាស់ $P_n$, ច្រន stets $A_n^k$, បន្សំ $C_n^k$ | អថេរចៃដន្យដាច់, សង្ឃឹមគណិត $E(X)$, វ៉ារ្យ៉ង់ $V(X)$ |

---

## 3. Prerequisite Knowledge & Transition Rules

1. **Grade 7 → Grade 8 Transition:**
   - Mastery of signed integer signs ($(-)\times(-) = (+)$) is required before factoring polynomials and evaluating radicals in Grade 8.
   - Fractions and LCM/GCD arithmetic must be solid before tackling algebraic fractions ($\frac{P(x)}{Q(x)}$).

2. **Grade 8 → Grade 9 (Brevet Readiness):**
   - Factoring identities ($(a-b)(a+b)=a^2-b^2$) form the direct mechanical basis for solving quadratic equations via $\Delta = b^2-4ac$ and Viète formulas in Grade 9.
   - Planar congruence and Pythagorean theorem are absolute prerequisites for Thales projections and circle theorems.

3. **Grade 9 → Grade 10 (Secondary Integration):**
   - Grade 9 quadratic solving unlocks Grade 10 polynomial analysis and trinomial sign tables ($f(x) > 0$).
   - Right-triangle trigonometry transitions to the general unit circle with signed angles in radians.

4. **Grade 10 → Grade 11 (Advanced Analysis):**
   - The functional concept and polynomial algebra prepare students for the delta-epsilon limit definition and differential calculus ($f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}$).

5. **Grade 11 → Grade 12 (Baccalaureate II Mastery):**
   - Derivatives and limits in Grade 11 directly enable indefinite and definite Riemann integration in Grade 12.
   - Vector dot products from Grade 10 expand into 3D cross products and normal vectors of planes ($\vec{n}=(A,B,C)$) in space.
