// ==============================================================================
// ScienceKH — STEM Fundamentals Warehouse (Codex)
// Duolingo-style core foundation database for Math, Physics, Chemistry & Biology.
// Covers chemical symbols, ions, Greek physical notations, SI units & formulas.
// Fully mapped and filtered strictly by student Grade Level (Grades 7 to 12).
// Aligned strictly with the Cambodian Ministry of Education, Youth and Sport (MoEYS).
// ==============================================================================

export type StemSubject = "chemistry" | "physics" | "mathematics" | "biology";
export type FundamentalCategory =
  | "all"
  | "symbols"
  | "units"
  | "formulas"
  | "elements"
  | "radicals"
  | "constants"
  | "theorems"
  | "rules"
  | "laws";

export interface StemFundamentalItem {
  id: string;
  subject: StemSubject;
  grades: number[]; // e.g. [7], [8], [9], [10], [11], [12]
  category: "symbols" | "units" | "formulas" | "elements" | "radicals" | "constants" | "theorems" | "rules" | "laws";
  symbol: string;
  isLatex?: boolean;
  nameKm: string;
  nameEn: string;
  pronunciationKm: string;
  pronunciationEn?: string;
  meaningKm: string;
  meaningEn: string;
  unitKm?: string;
  formula?: string;
  examSignificanceKm: string;
  memoryHookKm: string;
  tags: string[];
}

export const STEM_SUBJECT_CONFIG: Record<
  StemSubject,
  {
    nameKm: string;
    nameEn: string;
    accentBg: string;
    accentBorder: string;
    accentText: string;
    badgeBg: string;
    badgeText: string;
    iconEmoji: string;
    descriptionKm: string;
  }
> = {
  chemistry: {
    nameKm: "គីមីវិទ្យា",
    nameEn: "Chemistry",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    accentText: "text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/50",
    badgeText: "text-emerald-800 dark:text-emerald-200",
    iconEmoji: "🧪",
    descriptionKm: "ធាតុគីមី អ៊ីយ៉ុង រ៉ាឌីកាល់ វ៉ាឡង់ និងរូបមន្តគីមីគ្រឹះ",
  },
  physics: {
    nameKm: "រូបវិទ្យា",
    nameEn: "Physics",
    accentBg: "bg-purple-50 dark:bg-purple-950/40",
    accentBorder: "border-purple-200 dark:border-purple-800",
    accentText: "text-purple-700 dark:text-purple-300",
    badgeBg: "bg-purple-100 dark:bg-purple-900/50",
    badgeText: "text-purple-800 dark:text-purple-200",
    iconEmoji: "⚛️",
    descriptionKm: "អក្សរក្រិក ខ្នាតអន្តរជាតិ (SI) ថេរធម្មជាតិ និងសមីការគ្រឹះ",
  },
  mathematics: {
    nameKm: "គណិតវិទ្យា",
    nameEn: "Mathematics",
    accentBg: "bg-blue-50 dark:bg-blue-950/40",
    accentBorder: "border-blue-200 dark:border-blue-800",
    accentText: "text-blue-700 dark:text-blue-300",
    badgeBg: "bg-blue-100 dark:bg-blue-900/50",
    badgeText: "text-blue-800 dark:text-blue-200",
    iconEmoji: "📐",
    descriptionKm: "និមិត្តសញ្ញាតក្កវិទ្យា អាំងតេក្រាល លីមីត និងមុំត្រីកោណមាត្រ",
  },
  biology: {
    nameKm: "ជីវវិទ្យា",
    nameEn: "Biology",
    accentBg: "bg-teal-50 dark:bg-teal-950/40",
    accentBorder: "border-teal-200 dark:border-teal-800",
    accentText: "text-teal-700 dark:text-teal-300",
    badgeBg: "bg-teal-100 dark:bg-teal-900/50",
    badgeText: "text-teal-800 dark:text-teal-200",
    iconEmoji: "🧬",
    descriptionKm: "អាសូតបាស DNA/RNA ពន្ធុវិទ្យា ក្រូម៉ូសូម និងថាមពលកោសិកា",
  },
};

export const STEM_WAREHOUSE_DATABASE: StemFundamentalItem[] = [
  {
    "id": "phys-g7-length",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "units",
    "symbol": "\\text{m}",
    "isLatex": true,
    "nameKm": "ម៉ែត្រ (Meter)",
    "nameEn": "Meter (SI Unit of Length)",
    "pronunciationKm": "ម៉ែត្រ",
    "meaningKm": "ខ្នាតគោលអន្តរជាតិ (SI) សម្រាប់វាស់ប្រវែង ចម្ងាយ និងកម្ពស់។",
    "meaningEn": "The fundamental SI unit of length or distance.",
    "formula": "1\\,\\text{km} = 1000\\,\\text{m}, \\quad 1\\,\\text{m} = 100\\,\\text{cm}",
    "examSignificanceKm": "លំហាត់ទាំងអស់តម្រូវឱ្យប្តូរខ្នាតប្រវែងមកជាម៉ែត្រ (m) ជាមុនសិន។",
    "memoryHookKm": "ម៉ែត្រ (m) ជាមេខ្នាតប្រវែង — ដើរ ១ ជំហានវែង ប្រហែល ១ ម៉ែត្រ!",
    "tags": [
      "length",
      "unit",
      "si",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-mass",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "units",
    "symbol": "\\text{kg}",
    "isLatex": true,
    "nameKm": "គីឡូក្រាម (Kilogram)",
    "nameEn": "Kilogram (SI Unit of Mass)",
    "pronunciationKm": "គី-ឡូ-ក្រាម",
    "meaningKm": "ខ្នាតគោលអន្តរជាតិ (SI) សម្រាប់វាស់បរិមាណរូបធាតុ (ម៉ាស)។",
    "meaningEn": "The fundamental SI unit of mass.",
    "formula": "1\\,\\text{kg} = 1000\\,\\text{g}, \\quad 1\\,\\text{tonne} = 1000\\,\\text{kg}",
    "examSignificanceKm": "ក្នុងការគណនារូបវិទ្យា ម៉ាសត្រូវតែគិតជាគីឡូក្រាម (kg) ជានិច្ច។",
    "memoryHookKm": "ទិញអង្ករ ១ គីឡូ (1 kg) ស្មើនឹង ១០០០ ក្រាម!",
    "tags": [
      "mass",
      "unit",
      "si",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-time",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "units",
    "symbol": "\\text{s}",
    "isLatex": true,
    "nameKm": "វិនាទី (Second)",
    "nameEn": "Second (SI Unit of Time)",
    "pronunciationKm": "វិ-នា-ទី",
    "meaningKm": "ខ្នាតគោលអន្តរជាតិ (SI) សម្រាប់វាស់រយៈពេល ឬពេលវេលា។",
    "meaningEn": "The fundamental SI unit of time.",
    "formula": "1\\,\\text{mn} = 60\\,\\text{s}, \\quad 1\\,\\text{h} = 3600\\,\\text{s}",
    "examSignificanceKm": "បើប្រធានលំហាត់ឱ្យពេលជានាទី ឬម៉ោង ត្រូវប្តូរទៅជាវិនាទី (s)។",
    "memoryHookKm": "ទ្រនិចវិនាទីដើរ ១ ខ្ទាស់ = ១ វិនាទី (1 s)!",
    "tags": [
      "time",
      "unit",
      "si",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-volume",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "V = l \\cdot w \\cdot h",
    "isLatex": true,
    "nameKm": "មាឌប្រអប់កែង (Volume of Rectangular Solid)",
    "nameEn": "Volume of Rectangular Solid",
    "pronunciationKm": "វេ ស្មើ អិល គុណ ដាប៊លយូ គុណ អាស",
    "meaningKm": "ទំហំហាលំហដែលអង្គធាតុប្រអប់កែងកាន់កាប់៖ បណ្តោយ (l) គុណ ទទឹង (w) គុណ កម្ពស់ (h)។",
    "meaningEn": "Volume calculated as length times width times height.",
    "unitKm": "\\text{m}^3 \\text{ (ម៉ែត្រគូប) ឬ } \\text{L} \\text{ (លីត្រ)}",
    "formula": "V = l \\cdot w \\cdot h, \\quad 1\\,\\text{m}^3 = 1000\\,\\text{L}",
    "examSignificanceKm": "រូបមន្តស្នូលក្នុងការវាស់មាឌសូលីត និងគណនាម៉ាសមាឌថ្នាក់ទី ៧។",
    "memoryHookKm": "ប្រអប់កែងមាន ៣ វិមាត្រ៖ បណ្តោយ (l) ទទឹង (w) កម្ពស់ (h) — គុណទាំង ៣ បញ្ចូលគ្នាបានមាឌ!",
    "tags": [
      "volume",
      "geometry",
      "solid",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-water-disp",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "V = V_2 - V_1",
    "isLatex": true,
    "nameKm": "រង្វាស់មាឌសូលីតដោយបំពង់កែវវាស់ (Water Displacement)",
    "nameEn": "Volume by Water Displacement",
    "pronunciationKm": "វេ ស្មើ វេពីរ ដក វេមួយ",
    "meaningKm": "មាឌនៃអង្គធាតុមិនទៀងទាត់ (ដុំថ្ម) ស្មើនឹងកម្រិតទឹកកើនឡើងក្នុងបំពង់កែវវាស់។",
    "meaningEn": "Volume of an irregular object measured by fluid displacement.",
    "unitKm": "\\text{mL} \\text{ ឬ } \\text{cm}^3",
    "formula": "V_{\\text{object}} = V_2 - V_1",
    "examSignificanceKm": "សំណួរពិសោធន៍ជាក់ស្តែងសៀវភៅពុម្ពរូបវិទ្យាថ្នាក់ទី ៧ ជំពូកទី ១។",
    "memoryHookKm": "ដាក់ដុំថ្មចូលទឹក កម្ពស់ទឹកឡើង — យកកម្រិតក្រោយ (V₂) ដកកម្រិតមុន (V₁) ឃើញមាឌថ្ម!",
    "tags": [
      "measurement",
      "displacement",
      "fluid",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-density",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "\\rho = \\frac{m}{V}",
    "isLatex": true,
    "nameKm": "ម៉ាសមាឌ (Mass Density)",
    "nameEn": "Mass Density Formula",
    "pronunciationKm": "រ៉ូ ស្មើ អឹម លើ វេ (ឬ ដេ ស្មើ អឹម លើ វេ)",
    "meaningKm": "ម៉ាសនៃអង្គធាតុក្នុងមួយឯកតាមាឌ (តាងដោយអក្សរក្រិក ρ ឬ D ក្នុងសៀវភៅមួយចំនួន)។",
    "meaningEn": "Mass per unit volume of a uniform substance.",
    "unitKm": "\\text{kg/m}^3 \\text{ ឬ } \\text{g/cm}^3",
    "formula": "\\rho = \\frac{m}{V} \\implies m = \\rho \\cdot V, \\quad V = \\frac{m}{\\rho}",
    "examSignificanceKm": "រូបមន្តស្នូលក្នុងការកំណត់ភាពលិច-អណ្តែតនៃអង្គធាតុក្នុងទឹក។",
    "memoryHookKm": "ម៉ាស (m) នៅលើ, មាឌ (V) នៅក្រោម — គីឡូក្រាមចែកនឹងម៉ែត្រគូប!",
    "tags": [
      "density",
      "fluids",
      "mass",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-rel-density",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "d = \\frac{\\rho}{\\rho_{\\text{water}}}",
    "isLatex": true,
    "nameKm": "ដង់ស៊ីតេធៀប (Relative Density)",
    "nameEn": "Relative Density / Specific Gravity",
    "pronunciationKm": "ដេ ស្មើ រ៉ូ លើ រ៉ូទឹក",
    "meaningKm": "ផលធៀបរវាងម៉ាសមាឌអង្គធាតុ នឹងម៉ាសមាឌទឹកសុទ្ធ (d គ្មានខ្នាត)។ បើ d < 1 អណ្តែត, បើ d > 1 លិច។",
    "meaningEn": "Ratio of a substance's density to the density of pure water (dimensionless).",
    "unitKm": "\\text{គ្មានខ្នាត (Dimensionless)}",
    "formula": "d = \\frac{\\rho}{\\rho_{\\text{water}}}, \\quad \\rho_{\\text{water}} = 1000\\,\\text{kg/m}^3 = 1\\,\\text{g/cm}^3",
    "examSignificanceKm": "លក្ខខណ្ឌវិនិច្ឆ័យការអណ្តែត-លិចនៃអង្គធាតុក្នុងទឹកថ្នាក់ទី ៧។",
    "memoryHookKm": "ដង់ស៊ីតេ d តូចជាង ១ ដូចប្រេងនិងឈើ អណ្តែតលើទឹក! ធំជាង ១ ដូចដែក លិចកប់បាត!",
    "tags": [
      "relative-density",
      "buoyancy",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-weight",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "W = m \\cdot g",
    "isLatex": true,
    "nameKm": "ទម្ងន់នៃអង្គធាតុ (Weight Formula)",
    "nameEn": "Weight Formula",
    "pronunciationKm": "ដាប៊លយូ ស្មើ អឹម គុណ សេ (W = m · g)",
    "meaningKm": "ទម្ងន់ (W ឬ P) គឺជាកម្លាំងទំនាញដីទាញទម្លាក់អង្គធាតុមួយដែលមានម៉ាស m។",
    "meaningEn": "The downward gravitational force exerted on an object of mass m.",
    "unitKm": "\\text{N (ញូតុន)}",
    "formula": "W = m \\cdot g, \\quad g \\approx 9.8\\,\\text{N/kg} \\text{ ឬ } 10\\,\\text{N/kg}",
    "examSignificanceKm": "ជួយសិស្សបែងចែកច្បាស់រវាង ម៉ាស (គិតជា kg) និង ទម្ងន់ (គិតជា N)។",
    "memoryHookKm": "ម៉ាស (m) នៅលើដីឬព្រះចន្ទមិនប្រែប្រួលទេ! ឯទម្ងន់ (W) អាស្រ័យនឹងទំនាញដី (g)!",
    "tags": [
      "weight",
      "gravity",
      "force",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-lever",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "F_1 \\cdot d_1 = F_2 \\cdot d_2",
    "isLatex": true,
    "nameKm": "ច្បាប់លំនឹងឃ្នាស់ (Principle of the Lever)",
    "nameEn": "Law of the Lever (Simple Machines)",
    "pronunciationKm": "អេហ្វមួយ គុណ ដេមួយ ស្មើ អេហ្វពីរ គុណ ដេពីរ",
    "meaningKm": "លក្ខខណ្ឌលំនឹងនៃឃ្នាស់៖ ផលគុណកម្លាំងនឹងដៃឃ្នាស់សងខាងទ្រនល់ត្រូវតែស្មើគ្នា។",
    "meaningEn": "Rotational equilibrium of a lever where opposing torques balance.",
    "unitKm": "\\text{N}\\cdot\\text{m}",
    "formula": "F_1 \\cdot d_1 = F_2 \\cdot d_2",
    "examSignificanceKm": "មេរៀនម៉ាស៊ីនសាមញ្ញ (ជំពូកទី ២ រូបវិទ្យាថ្នាក់ទី ៧)។",
    "memoryHookKm": "ដៃឃ្នាស់កាន់តែវែង (d ធំ) ចំណេញកម្លាំងកាន់តែច្រើន (ប្រើ F តូច) — ក្បួនគាស់ដុំថ្ម!",
    "tags": [
      "lever",
      "machines",
      "mechanics",
      "grade7"
    ]
  },
  {
    "id": "phys-g7-temp",
    "subject": "physics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "T = t + 273",
    "isLatex": true,
    "nameKm": "សីតុណ្ហភាពដាច់ខាត (Kelvin to Celsius)",
    "nameEn": "Absolute Temperature (Kelvin Scale)",
    "pronunciationKm": "តេធំ ស្មើ តេតូច បូក ពីររយចិតសិบบី",
    "meaningKm": "រូបមន្តបំប្លែងសីតុណ្ហភាពពីអង្សាសេ (t គិតជា °C) ទៅខ្នាតដាច់ខាតកែលវិន (T គិតជា K)។",
    "meaningEn": "Formula for converting Celsius temperature to the Kelvin scale.",
    "unitKm": "\\text{K (កែលវិន)}",
    "formula": "T(\\text{K}) = t(^\\circ\\text{C}) + 273.15 \\approx t + 273",
    "examSignificanceKm": "ខ្នាតសីតុណ្ហភាពកែលវិន (K) ជាខ្នាតគោល SI ក្នុងរូបវិទ្យា។",
    "memoryHookKm": "ទឹកកករលាយនៅ 0°C = 273 K; ទឹកពុះនៅ 100°C = 373 K — បូក ២៧៣ ជានិច្ច!",
    "tags": [
      "temperature",
      "kelvin",
      "heat",
      "grade7"
    ]
  },
  {
    "id": "math-g7-integers",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "symbols",
    "symbol": "\\mathbb{Z} = \\{..., -2, -1, 0, 1, 2, ...\\}",
    "isLatex": true,
    "nameKm": "សំណុំចំនួនគត់រ៉ឺឡាទីវ (Set of Integers)",
    "nameEn": "Set of Integers (Z)",
    "pronunciationKm": "សេដ (Z) សំណុំចំនួនគត់",
    "meaningKm": "សំណុំរួមមានចំនួនគត់វិជ្ជមាន ចំនួនសូន្យ និងចំនួនគត់អវិជ្ជមាន។",
    "meaningEn": "The set of whole numbers including positives, zero, and negatives.",
    "formula": "(-a) \\times (-b) = +(a \\times b), \\quad (-a) \\times (+b) = -(a \\times b)",
    "examSignificanceKm": "គ្រឹះនៃការគណនាពីជគណិត និងប្រមាណវិធីលើសញ្ញាទាំងអស់។",
    "memoryHookKm": "ដក គុណ ដក ចេញ បូក! សញ្ញាដូចគ្នាគុណគ្នាបានបូក សញ្ញាផ្ទុយគ្នាគុណគ្នាបានដក!",
    "tags": [
      "integers",
      "signs",
      "algebra",
      "grade7"
    ]
  },
  {
    "id": "math-g7-linear-eq",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "ax + b = 0 \\implies x = -\\frac{b}{a}",
    "isLatex": true,
    "nameKm": "សមីការដឺក្រេទី ១ មានមួយអថេរ (Linear Equation)",
    "nameEn": "Linear Equation with One Unknown",
    "pronunciationKm": "អា អ៊ិច បូក បេ ស្មើ សូន្យ",
    "meaningKm": "សមីការដែលអថេរ x មានស្វ័យគុណ ១។ ដោះស្រាយដោយបោះតួថេរប្តូរសញ្ញា រួចចែកនឹងមេគុណ a។",
    "meaningEn": "A first-degree polynomial equation with a single unique solution.",
    "formula": "ax + b = 0 \\iff ax = -b \\iff x = -\\frac{b}{a} \\quad (a \\neq 0)",
    "examSignificanceKm": "ចេញក្នុងវិញ្ញាសាប្រឡងឆមាសទី ១ និងទី ២ ថ្នាក់ទី ៧។",
    "memoryHookKm": "ឆ្លងសញ្ញាស្មើ (=) ត្រូវប្តូរសញ្ញា៖ បូកទៅជាដក, គុណទៅជាចែក!",
    "tags": [
      "linear",
      "equation",
      "algebra",
      "grade7"
    ]
  },
  {
    "id": "math-g7-rect-area",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "A = l \\times w",
    "isLatex": true,
    "nameKm": "ផ្ទៃក្រឡាចតុកោណកែង (Rectangle Area)",
    "nameEn": "Area of a Rectangle",
    "pronunciationKm": "អា ស្មើ អិល គុណ ដាប៊លយូ (បណ្តោយ គុណ ទទឹង)",
    "meaningKm": "ទំហំផ្ទៃប្លង់ចតុកោណកែង ស្មើនឹងរង្វាស់បណ្តោយ (l) គុណនឹងទទឹង (w)។",
    "meaningEn": "Planar area calculated by multiplying length and width.",
    "unitKm": "\\text{m}^2 \\text{ ឬ } \\text{cm}^2",
    "formula": "A = l \\times w, \\quad P = 2(l + w) \\text{ (បរិមាត្រ)}",
    "examSignificanceKm": "លំហាត់ចំណោទដីស្រែ ចម្ការ និងផ្ទៃបន្ទប់ក្នុងកម្មវិធីគណិតវិទ្យាថ្នាក់ទី ៧។",
    "memoryHookKm": "ចតុកោណកែង៖ ផ្ទៃក្រឡាយកបណ្តោយគុណទទឹង, បរិមាត្រយកបូកចូលគ្នាគុណនឹងពីរ!",
    "tags": [
      "geometry",
      "area",
      "rectangle",
      "grade7"
    ]
  },
  {
    "id": "math-g7-tri-area",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "A = \\frac{1}{2} b \\cdot h",
    "isLatex": true,
    "nameKm": "ផ្ទៃក្រឡាត្រីកោណ (Triangle Area)",
    "nameEn": "Area of a Triangle",
    "pronunciationKm": "អា ស្មើ កន្លះ បេ គុណ អាស",
    "meaningKm": "ផ្ទៃក្រឡាត្រីកោណស្មើកន្លះបាត (b) គុណនឹងកម្ពស់ត្រូវគ្នា (h)។",
    "meaningEn": "Area of a triangle evaluated as half of base times height.",
    "unitKm": "\\text{m}^2",
    "formula": "A = \\frac{b \\cdot h}{2}",
    "examSignificanceKm": "រូបមន្តធរណីមាត្រគ្រឹះសម្រាប់គណនាផ្ទៃពហុកោណផ្សំគ្រប់ទម្រង់។",
    "memoryHookKm": "ត្រីកោណជាពាក់កណ្តាលចតុកោណកែង — កុំភ្លេចចែកនឹង ២!",
    "tags": [
      "geometry",
      "triangle",
      "area",
      "grade7"
    ]
  },
  {
    "id": "math-g7-circle-area",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "A = \\pi r^2",
    "isLatex": true,
    "nameKm": "ផ្ទៃក្រឡារង្វង់ (Circle Area)",
    "nameEn": "Area of a Circle",
    "pronunciationKm": "អា ស្មើ ភី អ៊ែរការ៉េ",
    "meaningKm": "ទំហំផ្ទៃខាងក្នុងរង្វង់ដែលមានកាំ r ដោយប្រើតម្លៃថេរ ភី (pi ≈ 3.14)។",
    "meaningEn": "Surface area bounded by a circle with radius r.",
    "unitKm": "\\text{m}^2",
    "formula": "A = \\pi r^2, \\quad C = 2\\pi r = \\pi d \\text{ (បរិមាត្រ)}",
    "examSignificanceKm": "សំណួរគណនាផ្ទៃ និងបរិមាត្ររង្វង់ក្នុងជំពូកធរណីមាត្រថ្នាក់ទី ៧។",
    "memoryHookKm": "ផ្ទៃក្រឡាមានការ៉េ (π r²), បរិមាត្រគ្មានការ៉េ (2π r)!",
    "tags": [
      "circle",
      "geometry",
      "area",
      "grade7"
    ]
  },
  {
    "id": "math-g7-parallel-perp",
    "subject": "mathematics",
    "grades": [
      7
    ],
    "category": "symbols",
    "symbol": "\\parallel \\quad \\text{និង} \\quad \\perp",
    "isLatex": true,
    "nameKm": "បន្ទាត់ស្រប និងបន្ទាត់កែង (Parallel & Perpendicular)",
    "nameEn": "Parallel and Perpendicular Lines",
    "pronunciationKm": "ស្របគ្នា (//) និង កែងគ្នា (⊥)",
    "meaningKm": "បន្ទាត់ស្របពីរមិនជួបគ្នាឡើយ (//)។ បន្ទាត់កែងពីរកាត់គ្នាបង្កើតបានមុំកែង ៩០ ដឺក្រេ (⊥)។",
    "meaningEn": "Geometric symbols for parallel lines (never intersecting) and perpendicular lines (90°).",
    "formula": "d_1 \\parallel d_2, \\quad d_1 \\perp d_2 \\implies \\angle = 90^\\circ",
    "examSignificanceKm": "ទ្រឹស្តីបទមុំឆ្លាស់ក្នុង មុំស្រប និងមុំកែងក្នុងធរណីមាត្រថ្នាក់ទី ៧។",
    "memoryHookKm": "សញ្ញា // ដូចផ្លូវរថភ្លើងរត់ទន្ទឹមគ្នា; សញ្ញា ⊥ ដូចបង្គោលភ្លើងកែងនឹងដី!",
    "tags": [
      "geometry",
      "lines",
      "angles",
      "grade7"
    ]
  },
  {
    "id": "chem-g7-matter-states",
    "subject": "chemistry",
    "grades": [
      7
    ],
    "category": "symbols",
    "symbol": "(s), \\; (l), \\; (g), \\; (aq)",
    "isLatex": true,
    "nameKm": "សភាពរូបនៃរូបធាតុ (States of Matter)",
    "nameEn": "States of Matter Physical States",
    "pronunciationKm": "រឹង (s), រាវ (l), ឧស្ម័ន (g), សូលុយស្យុងទឹក (aq)",
    "meaningKm": "សញ្ញាសម្គាល់សភាពរូបធាតុក្នុងវិទ្យាសាស្ត្រ៖ Solid (រឹង), Liquid (រាវ), Gas (ឧស្ម័ន), Aqueous (រលាយក្នុងទឹក)។",
    "meaningEn": "Standard scientific notations indicating physical phase state of matter.",
    "examSignificanceKm": "ជួយសិស្សកំណត់សភាពរូបធាតុក្នុងបាតុភូតរូប និងបាតុភូតគីមី។",
    "memoryHookKm": "s = solid (រឹង), l = liquid (រាវ), g = gas (ឧស្ម័ន), aq = aqueous (ក្នុងទឹក)!",
    "tags": [
      "matter",
      "states",
      "grade7"
    ]
  },
  {
    "id": "chem-g7-water",
    "subject": "chemistry",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "\\text{H}_2\\text{O}",
    "isLatex": true,
    "nameKm": "ទឹក (Water Molecule)",
    "nameEn": "Water Molecule",
    "pronunciationKm": "អាស-ពីរ-អូ (H-two-O)",
    "meaningKm": "ម៉ូលេគុលផ្សំដោយអាតូមអ៊ីដ្រូសែន ២ និងអាតូមអុកស៊ីសែន ១។ សារធាតុរំលាយដ៏សំខាន់បំផុតក្នុងធម្មជាតិ។",
    "meaningEn": "Compound consisting of two hydrogen atoms and one oxygen atom.",
    "formula": "2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}",
    "examSignificanceKm": "ជាមូលដ្ឋាននៃមេរៀនសារធាតុបរិសុទ្ធ ទឹក និងខ្យល់ថ្នាក់ទី ៧។",
    "memoryHookKm": "ក្បាលមូលត្រចៀកពីរដូច Mickey Mouse៖ អុកស៊ីសែននៅកណ្តាល អ៊ីដ្រូសែនសងខាង!",
    "tags": [
      "water",
      "molecule",
      "grade7"
    ]
  },
  {
    "id": "chem-g7-air-comp",
    "subject": "chemistry",
    "grades": [
      7
    ],
    "category": "constants",
    "symbol": "\\text{N}_2 \\approx 78\\%, \\; \\text{O}_2 \\approx 21\\%",
    "isLatex": true,
    "nameKm": "សមាសភាពបរិយាកាសខ្យល់ (Air Composition)",
    "nameEn": "Atmospheric Air Composition",
    "pronunciationKm": "អាសូត ៧៨ ភាគរយ, អុកស៊ីសែន ២១ ភាគរយ",
    "meaningKm": "ខ្យល់បរិយាកាសជាល្បាយស្មើភាពនៃឧស្ម័នអាសូត (N₂ ~ 78%), អុកស៊ីសែន (O₂ ~ 21%), និងឧស្ម័នផ្សេងៗ (1%)។",
    "meaningEn": "Composition of dry atmospheric air: mostly nitrogen and oxygen.",
    "formula": "\\text{Air} = 78\\%\\,\\text{N}_2 + 21\\%\\,\\text{O}_2 + 0.93\\%\\,\\text{Ar} + 0.04\\%\\,\\text{CO}_2",
    "examSignificanceKm": "សំណួរពន្យល់ជំពូកខ្យល់ និងការដកដង្ហើមក្នុងវិទ្យាសាស្ត្រថ្នាក់ទី ៧។",
    "memoryHookKm": "ខ្យល់ដកដង្ហើមភាគច្រើនជា អាសូត (ជិត ៨០%) ឯ អុកស៊ីសែន មានត្រឹមជាង ២០% ប៉ុណ្ណោះ!",
    "tags": [
      "air",
      "atmosphere",
      "gases",
      "grade7"
    ]
  },
  {
    "id": "bio-g7-cell",
    "subject": "biology",
    "grades": [
      7
    ],
    "category": "symbols",
    "symbol": "\\text{Cell (កោសិកា)}",
    "isLatex": true,
    "nameKm": "កោសិការុក្ខជាតិ និងកោសិកាសត្វ (Plant & Animal Cells)",
    "nameEn": "Plant and Animal Cell Structures",
    "pronunciationKm": "កោ-សិ-កា",
    "meaningKm": "ឯកតារចនាសម្ព័ន្ធ និងមុខងារតូចបំផុតនៃភាវៈរស់។ កោសិការុក្ខជាតិមាន ភ្នាសកោសិកា (Cell Wall) និងក្លរ៉ូប្លាស ខុសពីសត្វ។",
    "meaningEn": "Basic structural, functional, and biological unit of all living organisms.",
    "formula": "\\text{Plant Cell} = \\text{Animal Cell} + \\text{ភ្នាសសែលុយឡូស} + \\text{ក្លរ៉ូប្លាស} + \\text{វ៉ាកុយអូលធំ}",
    "examSignificanceKm": "សំណួរប្រៀបធៀបកោសិការុក្ខជាតិ និងសត្វចេញប្រឡងរៀងរាល់ឆ្នាំនៅថ្នាក់ទី ៧។",
    "memoryHookKm": "រុក្ខជាតិមានពណ៌បៃតងព្រោះមាន ក្លរ៉ូប្លាស; រុក្ខជាតិរឹងមាំព្រោះមាន ភ្នាសសែលុយឡូស!",
    "tags": [
      "cell",
      "biology",
      "structure",
      "grade7"
    ]
  },
  {
    "id": "bio-g7-photo",
    "subject": "biology",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\rightarrow \\text{C}_6\\text{H}_{12}\text{O}_6 + 6\\text{O}_2",
    "isLatex": true,
    "nameKm": "សមីការរស្មីសំយោគ (Photosynthesis Equation)",
    "nameEn": "Photosynthesis Overall Equation",
    "pronunciationKm": "ប្រាំមួយ សេ-អូ-ពីរ បូក ប្រាំមួយ អាស-ពីរ-អូ នាំឱ្យ គ្លុយកូស បូក ប្រាំមួយ អូ-ពីរ",
    "meaningKm": "ដំណើរការដែលរុក្ខជាតិបៃតងប្រើពន្លឺព្រះអាទិត្យ កាបូនិច និងទឹក បង្កើតជាតិស្ករ និងបញ្ចេញអុកស៊ីសែន។",
    "meaningEn": "Equation for photosynthesis producing glucose and oxygen from carbon dioxide and water.",
    "formula": "6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{ពន្លឺ, ក្លរ៉ូភីល}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2",
    "examSignificanceKm": "សមីការជីវសាស្ត្រគ្រឹះបំផុតក្នុងជំពូករុក្ខជាតិ និងអេកូឡូស៊ី។",
    "memoryHookKm": "រុក្ខជាតិស្រូបឧស្ម័នកខ្វក់ (CO₂) បញ្ចេញខ្យល់បរិសុទ្ធ (O₂) ឱ្យមនុស្សដកដង្ហើម!",
    "tags": [
      "photosynthesis",
      "plants",
      "grade7"
    ]
  },
  {
    "id": "bio-g7-microscope",
    "subject": "biology",
    "grades": [
      7
    ],
    "category": "formulas",
    "symbol": "M = M_{\\text{oc}} \\times M_{\\text{obj}}",
    "isLatex": true,
    "nameKm": "កម្រិតពង្រីកមីក្រូទស្សន៍ (Microscope Magnification)",
    "nameEn": "Total Microscope Magnification",
    "pronunciationKm": "អឹម ស្មើ អឹម កែវភ្នែក គុណ អឹម កែវវត្ថុ",
    "meaningKm": "កម្រិតពង្រីកសរុបនៃមីក្រូទស្សន៍ ស្មើនឹងកម្រិតពង្រីកកែវភ្នែក (Ocular) គុណនឹងកម្រិតពង្រីកកែវវត្ថុ (Objective)។",
    "meaningEn": "Total magnification equals ocular lens magnification multiplied by objective lens magnification.",
    "unitKm": "\\times \\text{ (ដង)}",
    "formula": "M_{\\text{total}} = M_{\\text{ocular}} \\times M_{\\text{objective}}",
    "examSignificanceKm": "សំណួរគណនាជាក់ស្តែងក្នុងបន្ទប់ពិសោធន៍ជីវវិទ្យាថ្នាក់ទី ៧។",
    "memoryHookKm": "កែវភ្នែកពង្រីក ១០ ដង, កែវវត្ថុពង្រីក ៤០ ដង — គុណចូលគ្នាពង្រីករូបភាពបាន ៤០០ ដង!",
    "tags": [
      "microscope",
      "magnification",
      "lab",
      "grade7"
    ]
  },
  {
    "id": "phys-g8-speed",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "v = \\frac{s}{t}",
    "isLatex": true,
    "nameKm": "ល្បឿនមធ្យម (Average Speed)",
    "nameEn": "Average Speed Formula",
    "pronunciationKm": "វេ ស្មើ អេស លើ តេ",
    "meaningKm": "ផលធៀបរវាងចម្ងាយចរសរុប (s) និងរយៈពេលដែលធ្វើដំណើរ (t)។",
    "meaningEn": "The ratio of total distance traveled to total time elapsed.",
    "unitKm": "\\text{m/s (ម៉ែត្រក្នុងមួយវិនាទី) ឬ } \\text{km/h}",
    "formula": "v = \\frac{s}{t} \\implies s = v \\cdot t, \\quad t = \\frac{s}{v}",
    "examSignificanceKm": "រូបមន្តស្នូលក្នុងការដោះស្រាយលំហាត់ចលនាត្រង់ស្មើថ្នាក់ទី ៨។",
    "memoryHookKm": "ត្រីកោណចលនា៖ ចម្ងាយ (s) នៅកំពូល, ល្បឿន (v) និងពេល (t) នៅបាត!",
    "tags": [
      "speed",
      "kinematics",
      "motion",
      "grade8"
    ]
  },
  {
    "id": "phys-g8-moment",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "M = F \\cdot d",
    "isLatex": true,
    "nameKm": "ម៉ូម៉ង់នៃកម្លាំង (Moment of Force / Torque)",
    "nameEn": "Moment of a Force",
    "pronunciationKm": "អឹម ស្មើ អេហ្វ គុណ ដេ",
    "meaningKm": "ប្រសិទ្ធភាពរង្វិលនៃកម្លាំង F ធៀបនឹងអ័ក្សបង្វិលមួយ៖ កម្លាំង គុណនឹងដៃកម្លាំង d។",
    "meaningEn": "The turning effect of a force around a pivot or axis of rotation.",
    "unitKm": "\\text{N}\\cdot\\text{m}",
    "formula": "M = F \\cdot d",
    "examSignificanceKm": "មេរៀនលំនឹងអង្គធាតុបង្វិលសៀវភៅពុម្ពរូបវិទ្យាថ្នាក់ទី ៨ ជំពូកទី ១។",
    "memoryHookKm": "ចង់មួលប៊ូឡុងងាយស្រួល ត្រូវប្រើសោវែង (d ធំ) បង្កើតម៉ូម៉ង់បង្វិលធំ!",
    "tags": [
      "moment",
      "torque",
      "forces",
      "grade8"
    ]
  },
  {
    "id": "phys-g8-pressure",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "P = \\frac{F}{A}",
    "isLatex": true,
    "nameKm": "សម្ពាធលើផ្ទៃ (Pressure Formula)",
    "nameEn": "Pressure Formula",
    "pronunciationKm": "ប៉េ ស្មើ អេហ្វ លើ អា (ឬ អេហ្វ លើ អេស)",
    "meaningKm": "កម្លាំងសង្កត់កែងលើមួយឯកតាផ្ទៃរងសម្ពាធ A (ឬ S)។",
    "meaningEn": "Perpendicular force applied per unit area.",
    "unitKm": "\\text{Pa (ប៉ាស្កាល់) = N/m}^2",
    "formula": "P = \\frac{F}{A} \\implies F = P \\cdot A, \\quad A = \\frac{F}{P}",
    "examSignificanceKm": "ពន្យល់មូលហេតុដែលកាំបិតមុត (A តូច) ងាយកាត់ដាច់ជាងកាំបិតរឹល (A ធំ)។",
    "memoryHookKm": "ផ្ទៃកាន់តែតូច មុតស្រួច (A តូច) សម្ពាធធ្លាក់មកកាន់តែខ្លាំង (P ធំ)!",
    "tags": [
      "pressure",
      "fluids",
      "mechanics",
      "grade8"
    ]
  },
  {
    "id": "phys-g8-liquid-p",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "P = \\rho \\cdot g \\cdot h",
    "isLatex": true,
    "nameKm": "សម្ពាធក្នុងអង្គធាតុរាវ (Hydrostatic Fluid Pressure)",
    "nameEn": "Fluid Hydrostatic Pressure",
    "pronunciationKm": "ប៉េ ស្មើ រ៉ូ សេ អាស",
    "meaningKm": "សម្ពាធដែលបង្កដោយទម្ងន់នៃជួរទឹកនៅជម្រៅ h ពីផ្ទៃខាងលើនៃអង្គធាតុរាវ។",
    "meaningEn": "Pressure exerted by a fluid at equilibrium due to gravity at depth h.",
    "unitKm": "\\text{Pa (ប៉ាស្កាល់)}",
    "formula": "P = \\rho \\cdot g \\cdot h, \\quad P_{\\text{total}} = P_0 + \\rho g h",
    "examSignificanceKm": "ពន្យល់មូលហេតុដែលទំនប់ទឹកត្រូវសង់បាតក្រោមក្រាស់ជាងផ្នែកខាងលើ។",
    "memoryHookKm": "មុជទឹកកាន់តែជ្រៅ (h កើន) សម្ពាធសង្កត់កាន់តែធ្ងន់ — ឈឺត្រចៀកព្រោះ ρ · g · h!",
    "tags": [
      "fluid-pressure",
      "hydrostatics",
      "grade8"
    ]
  },
  {
    "id": "phys-g8-archimedes",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "F_A = \\rho \\cdot V \\cdot g",
    "isLatex": true,
    "nameKm": "កម្លាំងរុញអាកស៊ីម៉ែត (Archimedes' Principle Upthrust)",
    "nameEn": "Archimedes' Buoyant Force",
    "pronunciationKm": "អេហ្វ អា ស្មើ រ៉ូ គុណ វេ គុណ សេ",
    "meaningKm": "កម្លាំងរុញបញ្ឈរឡើងលើដែលអង្គធាតុរាវជះលើវត្ថុដែលលិចក្នុងវា ស្មើនឹងទម្ងន់ទឹកដែលត្រូវជម្លៀស។",
    "meaningEn": "Upward buoyant force exerted on an object immersed in a fluid.",
    "unitKm": "\\text{N (ញូតុន)}",
    "formula": "F_A = \\rho_{\\text{fluid}} \\cdot V_{\\text{immersed}} \\cdot g",
    "examSignificanceKm": "លំហាត់លិច-អណ្តែតនៃកប៉ាល់ និងដុំឈើក្នុងទឹកថ្នាក់ទី ៨។",
    "memoryHookKm": "អាកស៊ីម៉ែតស្រែក Eureka! ពេលចុះត្រាំអាងទឹក៖ កម្លាំងរុញឡើង = ទម្ងន់ទឹកហៀរចេញ!",
    "tags": [
      "archimedes",
      "buoyancy",
      "fluids",
      "grade8"
    ]
  },
  {
    "id": "phys-g8-work-power",
    "subject": "physics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "W = F \\cdot d, \\quad P = \\frac{W}{t}",
    "isLatex": true,
    "nameKm": "ការងារ និងអានុភាពមេកានិច (Work & Power)",
    "nameEn": "Mechanical Work and Power",
    "pronunciationKm": "ដាប៊លយូ ស្មើ អេហ្វ គុណ ដេ, ប៉េ ស្មើ ដាប៊លយូ លើ តេ",
    "meaningKm": "ការងារ (W) កើតឡើងពេលកម្លាំងរុញអង្គធាតុឱ្យផ្លាស់ទីបានចម្ងាយ d។ អានុភាព (P) គឺជាល្បឿននៃការធ្វើការងារក្នុងមួយវិនាទី។",
    "meaningEn": "Mechanical work done by a force over displacement, and rate of work.",
    "unitKm": "\\text{ការងារ: J (ស៊ូល), អានុភាព: W (វ៉ាត់)}",
    "formula": "W = F \\cdot d, \\quad P = \\frac{W}{t} = F \\cdot v",
    "examSignificanceKm": "រូបមន្តថាមពលស្នូលសម្រាប់ប្រឡងឆមាស និងការត្រៀមឡើងថ្នាក់ទី ៩។",
    "memoryHookKm": "១ វ៉ាត់ (1 W) = ធ្វើការងារបាន ១ ស៊ូល (1 J) ក្នុង ១ វិនាទី (1 s)!",
    "tags": [
      "work",
      "power",
      "energy",
      "grade8"
    ]
  },
  {
    "id": "math-g8-powers",
    "subject": "mathematics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}",
    "isLatex": true,
    "nameKm": "វិធានស្វ័យគុណ (Exponent Laws)",
    "nameEn": "Laws of Exponents",
    "pronunciationKm": "អា ស្វ័យគុណ អឹម គុណ អា ស្វ័យគុណ អិន ស្មើ អា ស្វ័យគុណ អឹម បូក អិន",
    "meaningKm": "គុណស្វ័យគុណគោលដូចគ្នាត្រូវបូកនិទស្សន្ត; ចែកស្វ័យគុណគោលដូចគ្នាត្រូវដកនិទស្សន្ត។",
    "meaningEn": "Exponent product and quotient rules for identical bases.",
    "formula": "a^m \\cdot a^n = a^{m+n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}",
    "examSignificanceKm": "ប្រើប្រាស់ជាប្រចាំក្នុងការពន្លាតកន្សោមពីជគណិត និងការដោះស្រាយសមីការ។",
    "memoryHookKm": "គោលដូចគ្នា៖ គុណគ្នា យកស្វ័យគុណបូក! ចែកគ្នា យកស្វ័យគុណដក!",
    "tags": [
      "exponents",
      "powers",
      "algebra",
      "grade8"
    ]
  },
  {
    "id": "math-g8-identities",
    "subject": "mathematics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "(a \\pm b)^2 = a^2 \\pm 2ab + b^2",
    "isLatex": true,
    "nameKm": "រូបមន្តផលគុណគួរឱ្យកត់សម្គាល់ (Remarkable Identities)",
    "nameEn": "Special Algebraic Products",
    "pronunciationKm": "អា បូក បេ លើកជាការ៉េ ស្មើ អាការ៉េ បូក ពីរ អា បេ បូក បេការ៉េ",
    "meaningKm": "រូបមន្តពន្លាតពីជគណិតស្វ័យគុណការេ និងផលដកពីរការេ $a^2 - b^2 = (a-b)(a+b)$។",
    "meaningEn": "Fundamental algebraic identities for binomial expansion and factorization.",
    "formula": "(a+b)^2 = a^2 + 2ab + b^2, \\quad (a-b)^2 = a^2 - 2ab + b^2, \\quad a^2 - b^2 = (a-b)(a+b)",
    "examSignificanceKm": "មេរៀនស្នូលបំផុតនៃការដាក់ជាផលគុណកត្តា និងការដោះស្រាយសមីការថ្នាក់ទី ៨–៩។",
    "memoryHookKm": "កុំច្រឡំ (a+b)² = a² + b² ឱ្យសោះ! ត្រូវមានតួកណ្តាល ២ab ជានិច្ច!",
    "tags": [
      "identities",
      "algebra",
      "polynomials",
      "grade8"
    ]
  },
  {
    "id": "math-g8-pythagoras",
    "subject": "mathematics",
    "grades": [
      8
    ],
    "category": "theorems",
    "symbol": "a^2 + b^2 = c^2",
    "isLatex": true,
    "nameKm": "ទ្រឹស្តីបទពីតាករ (Pythagorean Theorem)",
    "nameEn": "Pythagorean Theorem",
    "pronunciationKm": "អាការ៉េ បូក បេការ៉េ ស្មើ សេការ៉េ",
    "meaningKm": "ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុស (c) ស្មើនឹងផលបូកការ៉េនៃជ្រុងជាប់មុំកែងទាំងពីរ (a, b)។",
    "meaningEn": "In a right-angled triangle, the hypotenuse squared equals sum of the squares of the other two sides.",
    "formula": "c^2 = a^2 + b^2 \\implies c = \\sqrt{a^2 + b^2}",
    "examSignificanceKm": "ចេញប្រឡង ១០០% ទាំងថ្នាក់ទី ៨ និងការប្រឡងឌីប្លូមថ្នាក់ទី ៩។",
    "memoryHookKm": "ជ្រុងវែងជាងគេ (អ៊ីប៉ូតេនុស) លើកជាការ៉េ ស្មើជ្រុងខ្លីទាំងពីរបូកបញ្ចូលគ្នា!",
    "tags": [
      "pythagoras",
      "geometry",
      "triangles",
      "grade8"
    ]
  },
  {
    "id": "math-g8-cylinder-vol",
    "subject": "mathematics",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "V = \\pi r^2 h",
    "isLatex": true,
    "nameKm": "មាឌស៊ីឡាំង (Volume of a Cylinder)",
    "nameEn": "Volume of a Cylinder",
    "pronunciationKm": "វេ ស្មើ ភី អ៊ែរការ៉េ គុណ អាស",
    "meaningKm": "មាឌស៊ីឡាំងស្មើនឹងផ្ទៃបាតរង្វង់ (π r²) គុណនឹងកម្ពស់ស៊ីឡាំង (h)។",
    "meaningEn": "Volume of a circular cylinder equal to base circle area times height.",
    "unitKm": "\\text{m}^3 \\text{ ឬ } \\text{L}",
    "formula": "V = \\pi r^2 h, \\quad A_{\\text{lateral}} = 2\\pi r h",
    "examSignificanceKm": "លំហាត់គណនាមាឌធុងទឹកស៊ីឡាំង និងកំប៉ុងក្នុងជីវភាពរស់នៅ។",
    "memoryHookKm": "ស៊ីឡាំងដូចជាសន្លឹកកាក់រង្វង់ (π r²) ត្រួតលើគ្នាបានកម្ពស់ h — គុណចូលគ្នាបានមាឌ!",
    "tags": [
      "cylinder",
      "geometry",
      "volume",
      "grade8"
    ]
  },
  {
    "id": "chem-g8-atom-parts",
    "subject": "chemistry",
    "grades": [
      8
    ],
    "category": "symbols",
    "symbol": "p^+, \\; n^0, \\; e^-",
    "isLatex": true,
    "nameKm": "ភាគល្អិតរងអាតូម (Subatomic Particles)",
    "nameEn": "Subatomic Particles (Proton, Neutron, Electron)",
    "pronunciationKm": "ប្រូតុង, ណឺត្រុង, អេឡិចត្រុង",
    "meaningKm": "ស្នូលអាតូមផ្សំដោយប្រូតុង (បន្ទុក +) និងណឺត្រុង (គ្មានបន្ទុក)។ អេឡិចត្រុង (បន្ទុក -) វិលជុំវិញស្នូល។",
    "meaningEn": "The three primary subatomic constituents: protons, neutrons, and electrons.",
    "formula": "\\text{Mass Number } A = Z + N, \\quad Z = p^+ = e^-",
    "examSignificanceKm": "គ្រឹះនៃមេរៀនអាតូម និងម៉ូលេគុលសៀវភៅពុម្ពគីមីវិទ្យាថ្នាក់ទី ៨ ជំពូកទី ១។",
    "memoryHookKm": "p = Positive (វិជ្ជមាន), n = Neutral (អព្យាក្រឹត), e = Negative (អវិជ្ជមាន)!",
    "tags": [
      "atom",
      "subatomic",
      "proton",
      "grade8"
    ]
  },
  {
    "id": "chem-g8-valency-rule",
    "subject": "chemistry",
    "grades": [
      8
    ],
    "category": "rules",
    "symbol": "\\text{A}_x\\text{B}_y \\quad (a \\cdot x = b \\cdot y)",
    "isLatex": true,
    "nameKm": "វិធានវ៉ាឡង់ និងរូបមន្តគីមី (Valency Criss-Cross Rule)",
    "nameEn": "Valency Rule for Chemical Formulas",
    "pronunciationKm": "អា អ៊ិច បេ អ៊ីក្រិក",
    "meaningKm": "ក្នុងរូបមន្តគីមី AxBy ផលគុណរវាងសន្ទស្សន៍ និងវ៉ាឡង់នៃធាតុទីមួយ ស្មើនឹងផលគុណរវាងសន្ទស្សន៍ និងវ៉ាឡង់នៃធាតុទីពីរ។",
    "meaningEn": "Criss-cross valency method to determine subscripts in binary chemical formulas.",
    "formula": "\\text{Al}^{3+} + \\text{O}^{2-} \\longrightarrow \\text{Al}_2\\text{O}_3",
    "examSignificanceKm": "ជួយសិស្សសរសេររូបមន្តគីមីនៃសមាសធាតុបានត្រឹមត្រូវ ១០០%។",
    "memoryHookKm": "វ៉ាឡង់ខ្វែងគ្នា៖ វ៉ាឡង់អ្នកទីមួយ ក្លាយជាជើង (សន្ទស្សន៍) របស់អ្នកទីពីរ!",
    "tags": [
      "valency",
      "formula",
      "crisscross",
      "grade8"
    ]
  },
  {
    "id": "chem-g8-lavoisier",
    "subject": "chemistry",
    "grades": [
      8
    ],
    "category": "constants",
    "symbol": "\\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}",
    "isLatex": true,
    "nameKm": "ច្បាប់រក្សាម៉ាសឡាវ័រហ្ស៊ីយេ (Law of Conservation of Mass)",
    "nameEn": "Lavoisier's Law of Conservation of Mass",
    "pronunciationKm": "ផលបូកម៉ាសប្រតិករ ស្មើ ផលបូកម៉ាសកកើត",
    "meaningKm": "ក្នុងប្រតិកម្មគីមី គ្មានអ្វីកើតឡើងថ្មី និងគ្មានអ្វីបាត់បង់ឡើយ គឺមានតែការផ្លាស់ប្តូរទម្រង់។",
    "meaningEn": "Mass is neither created nor destroyed in chemical reactions.",
    "formula": "m_A + m_B = m_C + m_D",
    "examSignificanceKm": "មូលដ្ឋានគ្រឹះក្នុងការថ្លឹងសមីការគីមី និងគណនាម៉ាសដែលបាត់។",
    "memoryHookKm": "ថ្លឹងសមីការគីមីដូចថ្លឹងជញ្ជីង៖ ខាងឆ្វេងមានប៉ុន្មាន ខាងស្តាំត្រូវតែមានប៉ុណ្ណឹង!",
    "tags": [
      "lavoisier",
      "conservation-of-mass",
      "grade8"
    ]
  },
  {
    "id": "chem-g8-neutralization",
    "subject": "chemistry",
    "grades": [
      8
    ],
    "category": "formulas",
    "symbol": "\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}",
    "isLatex": true,
    "nameKm": "ប្រតិកម្មបន្សាបអាស៊ីត-បាស (Neutralization Reaction)",
    "nameEn": "Acid-Base Neutralization",
    "pronunciationKm": "អាស៊ីត បូក បាស បាន អំបិល បូក ទឹក",
    "meaningKm": "អាស៊ីតមានប្រតិកម្មជាមួយបាស បង្កើតបានជាអំបិល និងទឹក ព្រមទាំងបាត់បង់លក្ខណៈអាស៊ីត-បាស។",
    "meaningEn": "Neutralization reaction where acid reacts with base yielding salt and water.",
    "formula": "\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{Water}",
    "examSignificanceKm": "សំណួរប្រតិកម្មគីមីលក្ខណៈពិសេសចេញរៀងរាល់ឆ្នាំក្នុងវិញ្ញាសាគីមី។",
    "memoryHookKm": "អាស៊ីតជូរ ជួប បាសចត់ បន្សាបគ្នាបាន អំបិលប្រៃ និងទឹកសាប!",
    "tags": [
      "acid",
      "base",
      "neutralization",
      "grade8"
    ]
  },
  {
    "id": "bio-g8-digestive-enzymes",
    "subject": "biology",
    "grades": [
      8
    ],
    "category": "symbols",
    "symbol": "\\text{Amylase, Pepsin, Lipase}",
    "isLatex": true,
    "nameKm": "អង់ស៊ីមរំលាយអាហារ (Digestive Enzymes)",
    "nameEn": "Human Digestive Enzymes",
    "pronunciationKm": "អាមីឡាស, ប៉ិបស៊ីន, លីប៉ាស",
    "meaningKm": "កាតាលីករជីវសាស្ត្របំបែកសារធាតុចិញ្ចឹម៖ អាមីឡាស (បំបែកម្សៅ), ប៉ិបស៊ីន (បំបែកប្រូតេអ៊ីន), លីប៉ាស (បំបែកខ្លាញ់)។",
    "meaningEn": "Biological catalysts that break down dietary macromolecules into absorbable nutrients.",
    "examSignificanceKm": "សំណួររៀបរាប់ដំណើរការរំលាយអាហារតាមសរីរាង្គ (មាត់ ក្រពះ ពោះវៀនតូច)។",
    "memoryHookKm": "ទំពាពីមាត់មាន អាមីឡាស, ធ្លាក់ដល់ក្រពះមាន ប៉ិបស៊ីន, ពោះវៀនតូចមាន លីប៉ាស!",
    "tags": [
      "digestive",
      "enzymes",
      "human-biology",
      "grade8"
    ]
  },
  {
    "id": "bio-g8-circulatory-heart",
    "subject": "biology",
    "grades": [
      8
    ],
    "category": "symbols",
    "symbol": "\\text{Heart (4 Chambers: RA, LA, RV, LV)}",
    "isLatex": true,
    "nameKm": "រចនាសម្ព័ន្ធបេះដូង ៤ ថត (Human Heart 4 Chambers)",
    "nameEn": "Human Heart Four-Chamber Anatomy",
    "pronunciationKm": "ថតលើស្តាំ-ឆ្វេង, ថតក្រោមស្តាំ-ឆ្វេង",
    "meaningKm": "បេះដូងមនុស្សមាន ៤ ថត៖ ថតលើ (Atria) ទទួលឈាម, ថតក្រោម (Ventricles) ច្របាច់ឈាមទៅសួត និងពេញរាងកាយ។ ថតក្រោមឆ្វេងក្រាស់ជាងគេ។",
    "meaningEn": "Four cardiac chambers pumping deoxygenated blood to lungs and oxygenated blood systemically.",
    "examSignificanceKm": "គំនូសបំព្រួញប្រព័ន្ធរបត់ឈាមធំ និងរបត់ឈាមតូចថ្នាក់ទី ៨។",
    "memoryHookKm": "ថតក្រោមឆ្វេង (LV) ជើងខ្លាំងក្រាស់ជាងគេ ព្រោះត្រូវច្របាច់ឈាមទៅចិញ្ចឹមទូទាំងរាងកាយ!",
    "tags": [
      "heart",
      "circulation",
      "cardiovascular",
      "grade8"
    ]
  },
  {
    "id": "math-g9-delta",
    "subject": "mathematics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "\\Delta = b^2 - 4ac",
    "isLatex": true,
    "nameKm": "ឌីស្គ្រីមីណង់ ដេលតា (Discriminant)",
    "nameEn": "Quadratic Discriminant Delta",
    "pronunciationKm": "ដេលតា ស្មើ បេការ៉េ ដក បួន អា បេ (Δ = b² - 4ac)",
    "meaningKm": "កំណត់ចំនួន និងលក្ខណៈនៃឫសសមីការដឺក្រេទី ២ (ax² + bx + c = 0)។ បើ Δ > 0 មានឫសពីរ, បើ Δ = 0 មានឫសឌុប, បើ Δ < 0 គ្មានឫសក្នុង R។",
    "meaningEn": "The discriminant determining the nature and number of quadratic roots.",
    "formula": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}",
    "examSignificanceKm": "វិញ្ញាសាប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម) ចេញ ១០០% ជារៀងរាល់ឆ្នាំ!",
    "memoryHookKm": "ពិនិត្យសញ្ញា ដេលតា (Δ) មុនគេ៖ វិជ្ជមានបាន ២ ឫស, សូន្យបាន ១ ឫសឌុប, អវិជ្ជមានគ្មានឫសក្នុងចំនួនពិត!",
    "tags": [
      "algebra",
      "quadratic",
      "discriminant",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "math-g9-vieta",
    "subject": "mathematics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "S = x_1 + x_2 = -\\frac{b}{a}, \\quad P = x_1 x_2 = \\frac{c}{a}",
    "isLatex": true,
    "nameKm": "ទំនាក់ទំនងវីយែត (Vieta's Formulas)",
    "nameEn": "Vieta's Formulas for Quadratic Roots",
    "pronunciationKm": "អេស ស្មើ ដក បេ លើ អា, ប៉េ ស្មើ សេ លើ អា",
    "meaningKm": "ផលបូក (S) និងផលគុណ (P) នៃឫសទាំងពីរនៃសមីការដឺក្រេទីពីរ ax² + bx + c = 0។",
    "meaningEn": "Relations between the roots and coefficients of a quadratic polynomial.",
    "formula": "x^2 - Sx + P = 0",
    "examSignificanceKm": "លំហាត់រកពីរចំនួនដែលស្គាល់ផលបូក និងផលគុណក្នុងការប្រឡងឌីប្លូម។",
    "memoryHookKm": "ផលបូកមានដក (-b/a), ផលគុណគ្មានដក (c/a) — ស្គាល់ S និង P ផ្គុំសមីការ x² - Sx + P = 0!",
    "tags": [
      "vieta",
      "roots",
      "algebra",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "math-g9-trig",
    "subject": "mathematics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "\\sin = \\frac{\\text{ឈម}}{\\text{អ៊ី}}, \\; \\cos = \\frac{\\text{ជាប់}}{\\text{អ៊ី}}, \\; \\tan = \\frac{\\text{ឈម}}{\\text{ជាប់}}",
    "isLatex": true,
    "nameKm": "អនុបាតត្រីកោណមាត្រក្នងត្រីកោណកែង (SOH CAH TOA)",
    "nameEn": "Trigonometric Ratios in Right Triangles",
    "pronunciationKm": "ស៊ីនុស ស្មើ ឈមលើអ៊ី, កូស៊ីនុស ស្មើ ជាប់លើអ៊ី, តង់សង់ ស្មើ ឈមលើជាប់",
    "meaningKm": "ផលធៀបរវាងជ្រុងឈម ជ្រុងជាប់ និងអ៊ីប៉ូតេនុសនៃមុំស្រួចក្នុងត្រីកោណកែង។",
    "meaningEn": "Sine, cosine, and tangent trigonometric definitions in right triangles.",
    "formula": "\\sin^2\\alpha + \\cos^2\\alpha = 1, \\quad \\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}",
    "examSignificanceKm": "លំហាត់គណនាប្រវែងជ្រុង និងមុំក្នុងវិញ្ញាសាធរណីមាត្រប្រឡងឌីប្លូម។",
    "memoryHookKm": "ស៊ី-ឈម-អ៊ី, កូ-ជាប់-អ៊ី, តង់-ឈម-ជាប់ — សូត្រឱ្យចាំឡើងរត់មាត់!",
    "tags": [
      "trigonometry",
      "geometry",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "math-g9-dist-midpoint",
    "subject": "mathematics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
    "isLatex": true,
    "nameKm": "ចម្ងាយរវាងពីរចំណុចក្នុងប្លង់កូអរដោណេ (Distance Formula)",
    "nameEn": "Distance Between Two Points",
    "pronunciationKm": "ដេ ស្មើ ឫសការេ អ៊ិចពីរ ដក អ៊ិចមួយ លើកជាការ៉េ បូក អ៊ីក្រិកពីរ ដក អ៊ីក្រិកមួយ លើកជាការ៉េ",
    "meaningKm": "ប្រវែងអង្កត់តភ្ជាប់រវាងចំណុច A(x₁, y₁) និង B(x₂, y₂) ក្នុងប្លង់កូអរដោណេដេកាត Oxy។",
    "meaningEn": "Euclidean distance between two coordinate points in the plane.",
    "formula": "AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}, \\quad I\\left(\\frac{x_A+x_B}{2}, \\frac{y_A+y_B}{2}\\right)",
    "examSignificanceKm": "សំណួររកប្រវែងជ្រុង និងផ្ទៀងផ្ទាត់ប្រភេទត្រីកោណក្នុងប្លង់កូអរដោណេឌីប្លូម។",
    "memoryHookKm": "ដកអាប់ស៊ីសលើកជាការ៉េ បូក ដកអរដោណេលើកជាការ៉េ រួចបំពាក់ឫសការេ!",
    "tags": [
      "coordinate",
      "distance",
      "geometry",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "phys-g9-newton2",
    "subject": "physics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "F = m \\cdot a",
    "isLatex": true,
    "nameKm": "ច្បាប់ទី ២ ញូតុន (Newton's Second Law)",
    "nameEn": "Newton's Second Law of Motion",
    "pronunciationKm": "អេហ្វ ស្មើ អឹម គុណ អា (F = m · a)",
    "meaningKm": "ផលបូកកម្លាំងក្រៅធ្វើអំពើលើអង្គធាតុមួយ ស្មើនឹងផលគុណរវាងម៉ាស និងសំទុះរបស់វា។",
    "meaningEn": "Force equals mass times acceleration.",
    "unitKm": "\\text{N (ញូតុន) = kg}\\cdot\\text{m/s}^2",
    "formula": "F = m \\cdot a \\implies a = \\frac{F}{m}, \\quad m = \\frac{F}{a}",
    "examSignificanceKm": "ច្បាប់ស្នូលនៃមេកានិច និងចលនាត្រង់ស្ទុះស្មើក្នុងការប្រឡងឌីប្លូម។",
    "memoryHookKm": "ចង់រុញរបស់ធ្ងន់ (m ធំ) ឱ្យស្ទុះលឿន (a ធំ) ត្រូវបញ្ចេញកម្លាំងខ្លាំង (F ធំ)!",
    "tags": [
      "newton",
      "force",
      "mechanics",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "phys-g9-kinetic-energy",
    "subject": "physics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "E_k = \\frac{1}{2} m v^2",
    "isLatex": true,
    "nameKm": "ថាមពលស៊ីនេទិច (Kinetic Energy)",
    "nameEn": "Kinetic Energy Formula",
    "pronunciationKm": "អឺ កា ស្មើ កន្លះ អឹម វេការ៉េ",
    "meaningKm": "ថាមពលដែលអង្គធាតុមានដោយសារចលនារបស់វា។ សមាមាត្រនឹងម៉ាស និងការ៉េនៃល្បឿន។",
    "meaningEn": "The kinetic energy possessed by an object due to its motion.",
    "unitKm": "\\text{J (ស៊ូល)}",
    "formula": "E_k = \\frac{1}{2}mv^2, \\quad E_p = mgh \\text{ (ថាមពលប៉ូតង់ស្យែល)}",
    "examSignificanceKm": "លំហាត់គណនាថាមពលមេកានិច Em = Ek + Ep ក្នុងវិញ្ញាសារូបវិទ្យាឌីប្លូម។",
    "memoryHookKm": "ល្បឿនកើន ២ ដង ថាមពលស៊ីនេទិចកើនដល់ ៤ ដង (ព្រោះមាន v²)! បើកបរលឿនគ្រោះថ្នាក់ណាស់!",
    "tags": [
      "kinetic",
      "energy",
      "mechanics",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "phys-g9-ohm",
    "subject": "physics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "U = R \\cdot I",
    "isLatex": true,
    "nameKm": "ច្បាប់អូម (Ohm's Law)",
    "nameEn": "Ohm's Law",
    "pronunciationKm": "អ៊ុយ ស្មើ អ៊ែរ គុណ អ៊ី",
    "meaningKm": "តង់ស្យុងអគ្គិសនីរវាងចុងទាំងពីរនៃរេស៊ីស្តង់ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តឆ្លងកាត់វា។",
    "meaningEn": "Voltage across a conductor is proportional to current through resistance.",
    "unitKm": "\\text{តង់ស្យុង: V (វ៉ុល), ចរន្ត: A (អំពែ), ភាពធន់: } \\Omega \\text{ (អូម)}",
    "formula": "U = R \\cdot I \\implies I = \\frac{U}{R}, \\quad R = \\frac{U}{I}",
    "examSignificanceKm": "រូបមន្តស្នូលលេខ ១ នៃជំពូកអគ្គិសនីត្រៀមប្រឡងឌីប្លូម។",
    "memoryHookKm": "អ៊ុយ (U) នៅលើគេ! ចង់រក I យក U/R, ចង់រក R យក U/I!",
    "tags": [
      "ohm",
      "electricity",
      "circuit",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "phys-g9-elec-power",
    "subject": "physics",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "P = U \\cdot I = R \\cdot I^2",
    "isLatex": true,
    "nameKm": "អានុភាព និងថាមពលអគ្គិសនី (Electric Power & Energy)",
    "nameEn": "Electric Power and Joule's Law",
    "pronunciationKm": "ប៉េ ស្មើ អ៊ុយ គុណ អ៊ី, ដាប៊លយូ ស្មើ ប៉េ គុណ តេ",
    "meaningKm": "អានុភាពអគ្គិសនីជាផលគុណតង់ស្យុងនឹងចរន្ត។ ថាមពលអគ្គិសនីប្រើប្រាស់ W = P · t (គិតជា J ឬ kWh)។",
    "meaningEn": "Electric power dissipation and energy consumption over time.",
    "unitKm": "\\text{P: W (វ៉ាត់), W: J (ស៊ូល) ឬ kWh (គីឡូវ៉ាត់ម៉ោង)}",
    "formula": "P = U \\cdot I = R I^2 = \\frac{U^2}{R}, \\quad W = P \\cdot t",
    "examSignificanceKm": "លំហាត់គណនាថ្លៃភ្លើងប្រើប្រាស់ប្រចាំខែក្នុងគ្រួសារ (ឌីប្លូម)។",
    "memoryHookKm": "១ គីឡូវ៉ាត់ម៉ោង (1 kWh) ស្មើនឹង ៣,៦០០,០០០ ស៊ូល — ជា ១ គីឡូភ្លើងលើកុងទ័រ!",
    "tags": [
      "power",
      "electricity",
      "joule",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "chem-g9-mole",
    "subject": "chemistry",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "n = \\frac{m}{M}",
    "isLatex": true,
    "nameKm": "រូបមន្តចំនួនម៉ូល (Mole Formula)",
    "nameEn": "Chemical Amount in Moles",
    "pronunciationKm": "អិន ស្មើ អឹមតូច លើ អឹមធំ",
    "meaningKm": "ចំនួនម៉ូល (n) ស្មើនឹងម៉ាសជាក្រាម (m) ចែកនឹងម៉ាសម៉ូល (M គិតជា g/mol)។",
    "meaningEn": "Chemical amount in moles calculated from mass and molar mass.",
    "unitKm": "\\text{mol (ម៉ូល)}",
    "formula": "n = \\frac{m}{M} \\implies m = n \\cdot M, \\quad N = n \\times 6.02 \\times 10^{23}",
    "examSignificanceKm": "រូបមន្តមាសក្នុងគីមីវិទ្យា — ៩០% នៃលំហាត់គីមីឌីប្លូម និងបាក់ឌុបត្រូវរក n មុនគេ!",
    "memoryHookKm": "អិនតូច (n) ស្មើ អឹមតូច (m) លើ អឹមធំ (M) — គិតជាម៉ូលជានិច្ច!",
    "tags": [
      "mole",
      "stoichiometry",
      "chemistry",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "chem-g9-molar-gas",
    "subject": "chemistry",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "V = n \\times 22.4\\,\\text{L}",
    "isLatex": true,
    "nameKm": "មាឌម៉ូលនៃឧស្ម័ននៅលក្ខខណ្ឌធម្មតា (Molar Gas Volume at STP)",
    "nameEn": "Molar Gas Volume at STP",
    "pronunciationKm": "វេ ស្មើ អិន គុណ ម្ភៃពីរចុចបួន",
    "meaningKm": "នៅលក្ខខណ្ឌធម្មតា (0°C, 1 atm) ឧស្ម័ន ១ ម៉ូលមានមាឌ ២២.៤ លីត្រ។",
    "meaningEn": "Volume occupied by one mole of any ideal gas at standard temperature and pressure.",
    "unitKm": "\\text{L (លីត្រ)}",
    "formula": "V = n \\times 22.4\\,\\text{L/mol} \\implies n = \\frac{V}{22.4}",
    "examSignificanceKm": "លំហាត់គណនាមាឌឧស្ម័ន O₂, H₂, CO₂ ភាយឡើងក្នុងប្រតិកម្មគីមីឌីប្លូម។",
    "memoryHookKm": "ឧស្ម័ននៅ STP: ចង់បានមាឌ យក n គុណ ២២.៤; ចង់បានម៉ូល យក V ចែក ២២.៤!",
    "tags": [
      "gas",
      "molar-volume",
      "stp",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "chem-g9-concentration",
    "subject": "chemistry",
    "grades": [
      9
    ],
    "category": "formulas",
    "symbol": "C = \\frac{n}{V}, \\quad C\\% = \\frac{m_{\\text{ct}}}{m_{\\text{dd}}} \\times 100\\%",
    "isLatex": true,
    "nameKm": "កំហាប់សូលុយស្យុង (Molar & Percentage Concentration)",
    "nameEn": "Solution Concentration",
    "pronunciationKm": "សេ ស្មើ អិន លើ វេ, សេភាគរយ",
    "meaningKm": "កំហាប់ជាម៉ូល (C ឬ M គិតជា mol/L) និងកំហាប់ជាភាគរយម៉ាស (C%) នៃសារធាតុរលាយក្នុងសូលុយស្យុង។",
    "meaningEn": "Molarity and mass percent concentration expressions.",
    "unitKm": "\\text{mol/L (M) និង \\%}",
    "formula": "C = \\frac{n}{V}, \\quad C\\% = \\frac{m_{\\text{solute}}}{m_{\\text{solution}}} \\times 100\\%",
    "examSignificanceKm": "លំហាត់លាយសូលុយស្យុង និងគណនាកំហាប់ប្រឡងឌីប្លូម។",
    "memoryHookKm": "កំហាប់ម៉ូល C យកម៉ូល (n) ចែកមាឌលីត្រ (V)! កុំភ្លេចប្តូរ mL ទៅ L!",
    "tags": [
      "concentration",
      "molarity",
      "solutions",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "chem-g9-reactivity-series",
    "subject": "chemistry",
    "grades": [
      9
    ],
    "category": "rules",
    "symbol": "\\text{K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au}",
    "isLatex": true,
    "nameKm": "ជួរប្រតិកម្មគីមីនៃលោហៈ (Reactivity Series of Metals)",
    "nameEn": "Metal Reactivity Activity Series",
    "pronunciationKm": "ប៉ូតាស្យូម សូដ្យូម កាល់ស្យូម ម៉ាញ៉េស្យូម អាលុយមីញ៉ូម ស័ង្កសី ដែក សំណ (អ៊ីដ្រូសែន) ទង់ដែង ប្រាក់ មាស",
    "meaningKm": "លោហៈដែលនៅមុខខ្លាំងជាងលោហៈនៅក្រោយ។ លោហៈនៅមុខអ៊ីដ្រូសែន (H) អាចរុញច្រាន H ចេញពីអាស៊ីតបាន។",
    "meaningEn": "Activity series ordering metals by reactivity and ability to displace hydrogen from acids.",
    "examSignificanceKm": "វិនិច្ឆ័យថាតើប្រតិកម្មលោហៈជាមួយទឹក ឬអាស៊ីតអាចប្រព្រឹត្តទៅបានឬទេ។",
    "memoryHookKm": "ពៅ-សុំ-កា-ម៉ាក់-អាល័យ-ស័ង្កសី-ដែក-សំណ-(ហាម)-ទិញ-ប្រាក់-មាស (អក្សរកាត់ចាំលោហៈ)!",
    "tags": [
      "metals",
      "reactivity",
      "displacement",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "bio-g9-mendel",
    "subject": "biology",
    "grades": [
      9
    ],
    "category": "rules",
    "symbol": "P_1 \\rightarrow F_1 \\rightarrow F_2 \\quad (3:1)",
    "isLatex": true,
    "nameKm": "ច្បាប់តំណពូជរបស់ម៉ង់ដែល (Mendel's Laws of Inheritance)",
    "nameEn": "Mendel's Laws of Monohybrid Inheritance",
    "pronunciationKm": "ច្បាប់ឯកសណ្ឋានភាព និងច្បាប់បំបែកលក្ខណៈ",
    "meaningKm": "ការបង្កាត់ពូជសុទ្ធលក្ខណៈផ្ទុយគ្នា៖ F₁ ទទួលបានកូនកាត់ដូចគ្នាមួយរយភាគរយ (លុប), F₂ បំបែកលក្ខណៈតាមសមាមាត្រ ៣ លុប ៖ ១ លិច។",
    "meaningEn": "Mendelian inheritance laws of uniformity and segregation yielding a 3:1 phenotypic ratio.",
    "formula": "F_2: \\quad 3\\,[\\text{Dominant}] : 1\\,[\\text{Recessive}] \\quad (1AA : 2Aa : 1aa)",
    "examSignificanceKm": "លំហាត់ពន្ធុវិទ្យាសណ្តែកពណ៌ផ្កា ឬគ្រាប់រលីង-ជ្រីវ ប្រឡងឌីប្លូម។",
    "memoryHookKm": "F1 ចេញលក្ខណៈលុប ១០០%, បង្កាត់ F1 នឹង F1 បាន F2 សមាមាត្រ ៣ លុប ៖ ១ លិច ជានិច្ច!",
    "tags": [
      "mendel",
      "genetics",
      "inheritance",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "bio-g9-chromosomes",
    "subject": "biology",
    "grades": [
      9
    ],
    "category": "constants",
    "symbol": "2n = 46 \\quad (44A + XX \\; / \\; 44A + XY)",
    "isLatex": true,
    "nameKm": "ក្រូម៉ូសូមមនុស្ស និងការកំណត់ភេទ (Human Chromosomes & Sex Determination)",
    "nameEn": "Human Karyotype and Sex Determination",
    "pronunciationKm": "ពីរ អិន ស្មើ សែសិបប្រាំមួយ",
    "meaningKm": "កោសិកាលូតលាស់របស់មនុស្សមាន ៤៦ ក្រូម៉ូសូម (២៣ គូ)៖ ៤៤ អូតូសូម + គូទី ២៣ ជាក្រូម៉ូសូមភេទ (XX ស្រី, XY ប្រុស)។",
    "meaningEn": "Human diploid chromosome count with 22 autosome pairs and sex chromosomes XX/XY.",
    "formula": "2n = 46 \\implies n = 23 \\text{ (កាម៉ែត: ស្ពែម៉ាតូសូអ៊ីត ឬអូវុល)}",
    "examSignificanceKm": "សំណួរពន្យល់អំពីការកំណត់ភេទកូនដោយមេជីវិតឈ្មោល (X ឬ Y)។",
    "memoryHookKm": "ឪពុកជាអ្នកកំណត់ភេទកូន! បើស្ពែម៉ាតូសូអ៊ីត Y ជួបអូវុល X បានកូនប្រុស (XY); បើ X ជួប X បានកូនស្រី (XX)!",
    "tags": [
      "chromosomes",
      "sex-determination",
      "genetics",
      "brevet",
      "grade9"
    ]
  },
  {
    "id": "phys-g10-kinematics",
    "subject": "physics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "x = x_0 + v_0 t + \\frac{1}{2}at^2, \\quad v^2 - v_0^2 = 2as",
    "isLatex": true,
    "nameKm": "សមីការចលនាត្រង់ប្រែប្រួលស្មើ (Uniformly Accelerated Motion)",
    "nameEn": "Kinematics Equations for Constant Acceleration",
    "pronunciationKm": "អ៊ិច ស្មើ អ៊ិចសូន្យ បូក វេយសូន្យ តេ បូក កន្លះ អា តេការ៉េ",
    "meaningKm": "សមីការបន្លាស់ទី និងទំនាក់ទំនងគ្មានកាលរវាងល្បឿន សំទុះ និងចម្ងាយចរ។",
    "meaningEn": "Equations of motion under uniform constant linear acceleration.",
    "unitKm": "\\text{a: m/s}^2, \\; \\text{v: m/s}, \\; \\text{s: m}",
    "formula": "v = v_0 + at, \\quad x = x_0 + v_0 t + \\frac{1}{2}at^2, \\quad v^2 - v_0^2 = 2a(x - x_0)",
    "examSignificanceKm": "រូបមន្តស្នូលនៃមេកានិចថ្នាក់ទី ១០ និងការត្រៀមប្រឡងឆមាស។",
    "memoryHookKm": "រូបមន្តគ្មានកាល v² - v₀² = 2as ប្រើពេលដែលប្រធានមិនបានប្រាប់ពេលវេលា t!",
    "tags": [
      "kinematics",
      "motion",
      "acceleration",
      "grade10"
    ]
  },
  {
    "id": "phys-g10-freefall",
    "subject": "physics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "v = gt, \\quad h = \\frac{1}{2}gt^2, \\quad v^2 = 2gh",
    "isLatex": true,
    "nameKm": "ចលនាធ្លាក់សេរី (Free Fall Motion)",
    "nameEn": "Free Fall Equations",
    "pronunciationKm": "វេ ស្មើ សេ តេ, អាស ស្មើ កន្លះ សេ តេការ៉េ",
    "meaningKm": "ចលនាធ្លាក់នៃអង្គធាតុក្រោមឥទ្ធិពលតែមួយគត់នៃទំនាញដី (សំទុះ a = g ≈ 9.8 m/s²) ដោយគ្មានកកិតខ្យល់។",
    "meaningEn": "Motion of an object falling solely under gravitational acceleration.",
    "unitKm": "\\text{v: m/s, h: m, g: 9.8 m/s}^2",
    "formula": "v = gt, \\quad h = \\frac{1}{2}gt^2 \\implies t = \\sqrt{\\frac{2h}{g}}, \\quad v = \\sqrt{2gh}",
    "examSignificanceKm": "លំហាត់ទម្លាក់ដុំថ្មពីលើស្ពាន ឬអគារខ្ពស់ក្នុងរូបវិទ្យាថ្នាក់ទី ១០។",
    "memoryHookKm": "ធ្លាក់សេរីគ្មានល្បឿនដើម (v₀ = 0)៖ កម្ពស់ធ្លាក់ h = ½gt², ល្បឿនប៉ះដី v = √(2gh)!",
    "tags": [
      "freefall",
      "gravity",
      "grade10"
    ]
  },
  {
    "id": "phys-g10-gravitation",
    "subject": "physics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "F = G \\frac{m_1 m_2}{r^2}",
    "isLatex": true,
    "nameKm": "ច្បាប់ទំនាញសកលញូតុន (Newton's Universal Law of Gravitation)",
    "nameEn": "Newton's Universal Gravitation Law",
    "pronunciationKm": "អេហ្វ ស្មើ សេធំ គុណ អឹមមួយ អឹមពីរ លើ អ៊ែរការ៉េ",
    "meaningKm": "គ្រប់អង្គធាតុទាំងអស់ក្នុងសកលលោកទាក់ទាញគ្នាទៅវិញទៅមកដោយកម្លាំងសមាមាត្រនឹងផលគុណម៉ាស និងច្រាសសមាមាត្រនឹងការ៉េនៃចម្ងាយរវាងវា។",
    "meaningEn": "Gravitational attraction between any two masses across distance r.",
    "unitKm": "\\text{G} = 6.67 \\times 10^{-11}\\,\\text{N}\\cdot\\text{m}^2/\\text{kg}^2",
    "formula": "F = G \\frac{m_1 m_2}{r^2}, \\quad g = G \\frac{M_{\\text{Earth}}}{R^2}",
    "examSignificanceKm": "ពន្យល់ចលនាភពរណបវិលជុំវិញផែនដី និងគន្លងភពក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
    "memoryHookKm": "ចម្ងាយរវាងភពកើន ២ ដង កម្លាំងទំនាញថយចុះ ៤ ដង (ព្រោះ r នៅភាគបែងមានការ៉េ)! ",
    "tags": [
      "gravitation",
      "newton",
      "astronomy",
      "grade10"
    ]
  },
  {
    "id": "phys-g10-momentum",
    "subject": "physics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "\\vec{p} = m \\vec{v}, \\quad \\vec{J} = \\vec{F}\\Delta t = \\Delta\\vec{p}",
    "isLatex": true,
    "nameKm": "បរិមាណចលនា និងអាំងពុលស្យុង (Linear Momentum & Impulse)",
    "nameEn": "Linear Momentum and Impulse",
    "pronunciationKm": "ប៉េ ស្មើ អឹម វេ",
    "meaningKm": "បរិមាណចលនាជាផលគុណម៉ាសនិងល្បឿន។ ក្នុងប្រព័ន្ធដាច់តែឯង បរិមាណចលនាសរុបត្រូវបានរក្សាទុកជានិច្ច (មុនបុក = ក្រោយបុក)។",
    "meaningEn": "Product of mass and velocity; conserved in isolated physical collisions.",
    "unitKm": "\\text{kg}\\cdot\\text{m/s}",
    "formula": "\\vec{p}_1 + \\vec{p}_2 = \\vec{p}'_1 + \\vec{p}'_2",
    "examSignificanceKm": "លំហាត់បាញ់គ្រាប់កាំភ្លើង និងការបុកគ្នានៃរថយន្តពីរថ្នាក់ទី ១០។",
    "memoryHookKm": "កាំភ្លើងបាញ់ទៅមុខ កាំភ្លើងធាក់មកក្រោយ — ច្បាប់រក្សាបរិមាណចលនា!",
    "tags": [
      "momentum",
      "impulse",
      "collision",
      "grade10"
    ]
  },
  {
    "id": "phys-g10-heat",
    "subject": "physics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "Q = mc\\Delta T",
    "isLatex": true,
    "nameKm": "បរិមាណកម្តៅស្រូប-បញ្ចេញ (Heat Transfer Formula)",
    "nameEn": "Heat Capacity and Transfer",
    "pronunciationKm": "គ្យូ ស្មើ អឹម សេ ដេលតា តេ",
    "meaningKm": "បរិមាណកម្តៅដែលអង្គធាតុស្រូបយក ឬបញ្ចេញពេលសីតុណ្ហភាពប្រែប្រួល ΔT (គិតជា K ឬ °C)។",
    "meaningEn": "Thermal energy transferred to change temperature by ΔT.",
    "unitKm": "\\text{J (ស៊ូល), } c: \\text{J}/(\\text{kg}\\cdot\\text{K})",
    "formula": "Q = mc(T_2 - T_1), \\quad Q_{\\text{latent}} = mL",
    "examSignificanceKm": "លំហាត់លំនឹងកម្តៅ (Qស្រូប = Qបញ្ចេញ) ក្នុងកាឡូរីម៉ែត្រថ្នាក់ទី ១០ និងបាក់ឌុប។",
    "memoryHookKm": "ទឹកមានកម្តៅម៉ាសធំ (c = 4180 J/kg·K) ទើបគេយកទឹកមកធ្វើជាប្រព័ន្ធត្រជាក់ម៉ាស៊ីនឡាន!",
    "tags": [
      "thermodynamics",
      "heat",
      "calorimetry",
      "grade10"
    ]
  },
  {
    "id": "math-g10-parabola",
    "subject": "mathematics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "S\\left(-\\frac{b}{2a}, \\; -\\frac{\\Delta}{4a}\\right)",
    "isLatex": true,
    "nameKm": "កំពូលប៉ារ៉ាបូល (Parabola Vertex Coordinates)",
    "nameEn": "Vertex of a Quadratic Parabola",
    "pronunciationKm": "កំពូល អេស ដក បេ លើ ពីរ អា, ដក ដេលតា លើ បួន អា",
    "meaningKm": "កូអរដោណេនៃចំណុចកំពូល (អប្បបរមា ឬអតិបរមា) នៃក្រាបអនុគមន៍ដឺក្រេទី ២ y = ax² + bx + c។",
    "meaningEn": "Coordinates of the extreme vertex of a parabola.",
    "formula": "x_S = -\\frac{b}{2a}, \\quad y_S = f(x_S) = -\\frac{\\Delta}{4a}",
    "examSignificanceKm": "មេរៀនសង់ក្រាបប៉ារ៉ាបូល និងការរកតម្លៃបរមាក្នុងគណិតវិទ្យាថ្នាក់ទី ១០។",
    "memoryHookKm": "បើ a > 0 ប៉ារ៉ាបូលផ្ងារឡើង (មានអប្បបរមា); បើ a < 0 ប៉ារ៉ាបូលផ្កាប់ចុះ (មានអតិបរមា)!",
    "tags": [
      "parabola",
      "vertex",
      "quadratic",
      "grade10"
    ]
  },
  {
    "id": "math-g10-dotproduct",
    "subject": "mathematics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta = xx' + yy'",
    "isLatex": true,
    "nameKm": "ផលគុណស្កាលែនៃពីរវ៉ិចទ័រ (Dot Product of Vectors)",
    "nameEn": "Scalar Dot Product of Vectors",
    "pronunciationKm": "អ៊ុយ ស្កាលែ វេ ស្មើ ប្រវែងអ៊ុយ គុណ ប្រវែងវេ គុណ កូស៊ីនុស តេតា",
    "meaningKm": "ផលគុណរវាងម៉ូឌុលវ៉ិចទ័រទាំងពីរ និងកូស៊ីនុសមុំផ្គុំរវាងវា។ វ៉ិចទ័រពីរកែងគ្នា លុះត្រាតែផលគុណស្កាលែស្មើ ០។",
    "meaningEn": "Scalar product of two vectors in planar Euclidean geometry.",
    "formula": "\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff xx' + yy' = 0",
    "examSignificanceKm": "លំហាត់បញ្ជាក់បន្ទាត់កែងគ្នា និងគណនាមុំក្នុងប្លង់កូអរដោណេថ្នាក់ទី ១០។",
    "memoryHookKm": "វ៉ិចទ័រកែងគ្នា ផលគុណស្កាលែស្មើ ០ ជានិច្ច! រូបមន្តកូអរដោណេ៖ យកអាប់ស៊ីសគុណអាប់ស៊ីស បូក អរដោណេគុណអរដោណេ!",
    "tags": [
      "vectors",
      "dotproduct",
      "geometry",
      "grade10"
    ]
  },
  {
    "id": "math-g10-trig-circle",
    "subject": "mathematics",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "\\sin^2 x + \\cos^2 x = 1, \\quad 1 + \\tan^2 x = \\frac{1}{\\cos^2 x}",
    "isLatex": true,
    "nameKm": "រូបមន្តគ្រឹះត្រីកោណមាត្រ (Fundamental Trigonometric Identities)",
    "nameEn": "Pythagorean Trigonometric Identity",
    "pronunciationKm": "ស៊ីនុសការ៉េ អ៊ិច បូក កូស៊ីនុសការ៉េ អ៊ិច ស្មើ មួយ",
    "meaningKm": "រូបមន្តស្នូលនៅលើរង្វង់ត្រីកោណមាត្រ (កាំ R = 1) សម្រាប់គ្រប់មុំ x។",
    "meaningEn": "Fundamental trigonometric Pythagorean relationship on unit circle.",
    "formula": "\\sin^2 x + \\cos^2 x = 1 \\implies \\cos^2 x = 1 - \\sin^2 x",
    "examSignificanceKm": "ប្រើក្នុងការសម្រួលកន្សោម និងដោះស្រាយសមីការត្រីកោណមាត្រថ្នាក់ទី ១០–១២។",
    "memoryHookKm": "ស៊ីនុសការ៉េ បូក កូស៊ីនុសការ៉េ ស្មើ ១ គ្រប់មុំទាំងអស់!",
    "tags": [
      "trigonometry",
      "circle",
      "identities",
      "grade10"
    ]
  },
  {
    "id": "math-g10-radians",
    "subject": "mathematics",
    "grades": [
      10
    ],
    "category": "constants",
    "symbol": "180^\\circ = \\pi\\,\\text{rad}",
    "isLatex": true,
    "nameKm": "ការបំប្លែងរ៉ាដ្យង់ និងដឺក្រេ (Radian to Degree Conversion)",
    "nameEn": "Radian Measure Conversion",
    "pronunciationKm": "មួយរយប៉ែតសិបដឺក្រេ ស្មើ ភី រ៉ាដ្យង់",
    "meaningKm": "ខ្នាតរ៉ាដ្យង់ (rad) ជាខ្នាតអន្តរជាតិនៃមុំ។ មុំ ១ ជុំរង្វង់ = 360° = 2π rad។",
    "meaningEn": "Conversion constant connecting angular degrees and radians.",
    "formula": "\\frac{D}{180^\\circ} = \\frac{R}{\\pi} \\implies R = \\frac{D \\cdot \\pi}{180^\\circ}",
    "examSignificanceKm": "លំហាត់ប្តូរមុំពិសេស 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2។",
    "memoryHookKm": "ឃើញ π គិតដល់ ១៨០ ដឺក្រេ! ចង់បាន π/2 យក ១៨០ ចែក ២ = ៩០ ដឺក្រេ!",
    "tags": [
      "radians",
      "degrees",
      "angles",
      "grade10"
    ]
  },
  {
    "id": "chem-g10-idealgas",
    "subject": "chemistry",
    "grades": [
      10
    ],
    "category": "formulas",
    "symbol": "PV = nRT",
    "isLatex": true,
    "nameKm": "សមីការឧស្ម័នបរិសុទ្ធ (Ideal Gas Law)",
    "nameEn": "Ideal Gas Law Equation",
    "pronunciationKm": "ប៉េ វេ ស្មើ អិន អ៊ែរ តេ",
    "meaningKm": "ទំនាក់ទំនងរវាងសម្ពាធ (P), មាឌ (V), ចំនួនម៉ូល (n), និងសីតុណ្ហភាពដាច់ខាត (T គិតជា K)។",
    "meaningEn": "Equation of state of a hypothetical ideal gas.",
    "unitKm": "R = 0.082\\,\\text{atm}\\cdot\\text{L}/(\\text{mol}\\cdot\\text{K})",
    "formula": "PV = nRT \\implies n = \\frac{PV}{RT}, \\quad P = \\frac{nRT}{V}",
    "examSignificanceKm": "លំហាត់គណនាសម្ពាធ ឬមាឌឧស្ម័ននៅលក្ខខណ្ឌមិនធម្មតា (t ≠ 0°C, P ≠ 1 atm)។",
    "memoryHookKm": "កុំភ្លេចប្តូរសីតុណ្ហភាពទៅ K ជានិច្ច (T = t + 273) និងមាឌទៅជាលីត្រ (L)!",
    "tags": [
      "gas",
      "idealgas",
      "chemistry",
      "grade10"
    ]
  },
  {
    "id": "chem-g10-bonding",
    "subject": "chemistry",
    "grades": [
      10
    ],
    "category": "rules",
    "symbol": "\\text{Ionic vs Covalent Bonds}",
    "isLatex": true,
    "nameKm": "សម្ព័ន្ធអ៊ីយ៉ុង និងសម្ព័ន្ធកូវ៉ាឡង់ (Chemical Bonding)",
    "nameEn": "Ionic and Covalent Chemical Bonds",
    "pronunciationKm": "សម្ព័ន្ធអ៊ីយ៉ុង និង សម្ព័ន្ធកូវ៉ាឡង់",
    "meaningKm": "សម្ព័ន្ធអ៊ីយ៉ុងកើតពីការផ្ទេរអេឡិចត្រុង (លោហៈ + អលោហៈ)។ សម្ព័ន្ធកូវ៉ាឡង់កើតពីការរួមគ្នានៃគូអេឡិចត្រុង (អលោហៈ + អលោហៈ)។",
    "meaningEn": "Fundamental bonding mechanisms: electron transfer vs electron sharing.",
    "formula": "\\text{NaCl (Ionic)}, \\quad \\text{H}_2\\text{O, CO}_2\\text{ (Covalent)}",
    "examSignificanceKm": "សំណួរពន្យល់អំពីសម្ព័ន្ធគីមី និងរចនាសម្ព័ន្ធឡឺវីស (Lewis structures) ថ្នាក់ទី ១០។",
    "memoryHookKm": "អ៊ីយ៉ុង = ផ្ទេរដាច់ (ដូចឱ្យលុយដាច់); កូវ៉ាឡង់ = ចែករំលែករួមគ្នា (ដូចហ៊ុនគ្នាទិញរបស់)!",
    "tags": [
      "bonding",
      "ionic",
      "covalent",
      "grade10"
    ]
  },
  {
    "id": "bio-g10-mitosis",
    "subject": "biology",
    "grades": [
      10
    ],
    "category": "symbols",
    "symbol": "\\text{PMAT (Prophase, Metaphase, Anaphase, Telophase)}",
    "isLatex": true,
    "nameKm": "វគ្គទាំង ៤ នៃមីតូស (Phases of Mitosis)",
    "nameEn": "Four Phases of Mitosis",
    "pronunciationKm": "ប្រូផាស, មេតាផាស, អាណាផាស, តេឡូផាស",
    "meaningKm": "ដំណើរការបែងចែកកោសិកាលូតលាស់ (Somatic Cells) ពីកោសិកាមេ ១ (2n) បង្កើតបានកោសិកាកូន ២ (2n) ដែលមានក្រូម៉ូសូមដូចគ្នាបេះបិទ។",
    "meaningEn": "Stages of eukaryotic somatic nuclear cell division maintaining diploid count.",
    "formula": "\\text{កោសិកាមេ } (2n) \\xrightarrow{\\text{Mitosis}} 2 \\times \\text{កោសិកាកូន } (2n)",
    "examSignificanceKm": "សំណួររៀបរាប់ និងគូរដ្យាក្រាមក្រូម៉ូសូមក្នុងវគ្គមេតាផាស (តម្រៀបនៅប្លង់អេក្វាទ័រ)។",
    "memoryHookKm": "ចាំពាក្យកាត់ PMAT៖ P (ផ្ដើម), M (កណ្ដាល-មេតា), A (បែកចេញ-អាណា), T (ចប់-តេឡូ)!",
    "tags": [
      "mitosis",
      "cell-division",
      "genetics",
      "grade10"
    ]
  },
  {
    "id": "bio-g10-atp",
    "subject": "biology",
    "grades": [
      10
    ],
    "category": "symbols",
    "symbol": "\\text{ATP} \\rightleftharpoons \\text{ADP} + \\text{P}_i + \\text{Energy}",
    "isLatex": true,
    "nameKm": "អាដេណូស៊ីនទ្រីផូស្វាត (ATP - Cellular Energy Currency)",
    "nameEn": "Adenosine Triphosphate (ATP)",
    "pronunciationKm": "អា-តេ-ប៉េ (ATP)",
    "meaningKm": "ម៉ូលេគុលស្តុកថាមពលគីមីផ្ទាល់របស់កោសិកា។ ពេលផ្តាច់ចំណងផូស្វាត ១ បញ្ចេញថាមពលប្រហែល 7.3 kcal/mol សម្រាប់សកម្មភាពជីវិត។",
    "meaningEn": "High-energy molecular currency driving biological reactions.",
    "formula": "\\text{ATP} + \\text{H}_2\\text{O} \\longrightarrow \\text{ADP} + \\text{P}_i + 7.3\\,\\text{kcal/mol}",
    "examSignificanceKm": "មេរៀនមេតាបូលីសកោសិកា និងការដកដង្ហើមក្នុងមីតូកុងឌ្រីថ្នាក់ទី ១០។",
    "memoryHookKm": "ATP ដូចជាថ្មពិលសាកពេញ; ប្រើរួចក្លាយជា ADP (អស់ថ្ម) រួចសាកថាមពលឡើងវិញតាមរយៈដង្ហើមកោសិកា!",
    "tags": [
      "atp",
      "energy",
      "respiration",
      "grade10"
    ]
  },
  {
    "id": "phys-g11-circular",
    "subject": "physics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "\\omega = \\frac{2\\pi}{T} = 2\\pi f, \\quad a_n = \\frac{v^2}{r} = r\\omega^2",
    "isLatex": true,
    "nameKm": "ចលនារង្វង់ស្មើ និងសំទុះចូលផ្ចិត (Uniform Circular Motion)",
    "nameEn": "Uniform Circular Motion Kinematics",
    "pronunciationKm": "អូមេហ្គា ស្មើ ពីរ ភី លើ តេ, អា អិន ស្មើ វេការ៉េ លើ អ៊ែរ",
    "meaningKm": "ល្បឿនមុំ (ω គិតជា rad/s) និងសំទុះចូលផ្ចិតដែលបង្វែរទិសដៅល្បឿនឆ្ពោះទៅផ្ចិតរង្វង់ជានិច្ច។",
    "meaningEn": "Angular frequency and centripetal acceleration in circular trajectories.",
    "unitKm": "\\omega: \\text{rad/s}, \\quad a_n: \\text{m/s}^2",
    "formula": "v = r\\omega, \\quad a_n = \\frac{v^2}{r} = r\\omega^2, \\quad F_n = m a_n",
    "examSignificanceKm": "រូបមន្តស្នូលសម្រាប់ដោះស្រាយចលនារណប និងកម្លាំងចូលផ្ចិត។",
    "memoryHookKm": "ល្បឿនបន្ទាត់ស្មើកាំគុណល្បឿនមុំ (v = rω); សំទុះចូលផ្ចិត a = v²/r ឆ្ពោះទៅកណ្តាលរង្វង់!",
    "tags": [
      "circular-motion",
      "angular-velocity",
      "centripetal",
      "grade11"
    ]
  },
  {
    "id": "phys-g11-coulomb",
    "subject": "physics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "F = k \\frac{|q_1 q_2|}{r^2}",
    "isLatex": true,
    "nameKm": "ច្បាប់គូឡុំ (Coulomb's Law of Electrostatics)",
    "nameEn": "Coulomb's Law of Electrostatic Force",
    "pronunciationKm": "អេហ្វ ស្មើ កា គុណ ម៉ូឌុល គ្យូមួយ គ្យូពីរ លើ អ៊ែរការ៉េ",
    "meaningKm": "កម្លាំងអន្តរកម្មរវាងបន្ទុកអគ្គិសនីពីរ៖ បន្ទុកសញ្ញាដូចគ្នាច្រានគ្នា បន្ទុកសញ្ញាផ្ទុយគ្នាទាញគ្នា។",
    "meaningEn": "Electrostatic force between two point charges separated by distance r.",
    "unitKm": "k = 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2",
    "formula": "F = k \\frac{|q_1 q_2|}{r^2}, \\quad E = \\frac{F}{|q|} = k \\frac{|Q|}{r^2}",
    "examSignificanceKm": "រូបមន្តស្នូលលេខ ១ នៃជំពូកអេឡិចត្រូស្តាទិចថ្នាក់ទី ១១។",
    "memoryHookKm": "រូបរាងដូចច្បាប់ទំនាញសកលរបស់ញូតុនបេះបិទ! តែ k ធំខ្លាំង (9 × 10⁹) ព្រោះកម្លាំងអគ្គិសនីខ្លាំងជាងទំនាញដីឆ្ងាយណាស់!",
    "tags": [
      "coulomb",
      "electrostatics",
      "charge",
      "grade11"
    ]
  },
  {
    "id": "phys-g11-capacitor",
    "subject": "physics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "C = \\frac{Q}{U}, \\quad W = \\frac{1}{2}CU^2",
    "isLatex": true,
    "nameKm": "កាប៉ាស៊ីទ័រ និងថាមពលស្តុក (Capacitance & Stored Energy)",
    "nameEn": "Capacitor and Electrostatic Energy",
    "pronunciationKm": "សេ ស្មើ គ្យូ លើ អ៊ុយ, ដាប៊លយូ ស្មើ កន្លះ សេ អ៊ុយការ៉េ",
    "meaningKm": "សមត្ថភាពផ្ទុកបន្ទុកអគ្គិសនីនៃកុងដង់សាទ័រ (C គិតជា Farad: F) និងថាមពលអគ្គិសនីស្តុកក្នុងដែនអគ្គិសនីរបស់វា។",
    "meaningEn": "Capacitance definition and electrostatic potential energy stored in a capacitor.",
    "unitKm": "\\text{C: F (ហ្វារ៉ា), W: J (ស៊ូល)}",
    "formula": "C = \\frac{Q}{U}, \\quad W = \\frac{1}{2}CU^2 = \\frac{1}{2}QU = \\frac{1}{2}\\frac{Q^2}{C}",
    "examSignificanceKm": "លំហាត់តកុងដង់សាទ័រជាស៊េរី-ខ្នែង និងការគណនាថាមពល។",
    "memoryHookKm": "កុងដង់សាទ័រដូចអាងស្តុកបន្ទុកអគ្គិសនី — ថាមពល W = ½CU² ដូចរូបមន្តស៊ីនេទិច ½mv² ដែរ!",
    "tags": [
      "capacitor",
      "capacitance",
      "energy",
      "grade11"
    ]
  },
  {
    "id": "phys-g11-faraday",
    "subject": "physics",
    "grades": [
      11
    ],
    "category": "laws",
    "symbol": "e = -\\frac{\\Delta\\Phi}{\\Delta t}, \\quad \\Phi = B \\cdot S \\cdot \\cos\\alpha",
    "isLatex": true,
    "nameKm": "ច្បាប់ហ្វារ៉ាដេ និងភ្លុចម៉ាញេទិច (Faraday's Law of Induction)",
    "nameEn": "Faraday's Law of Electromagnetic Induction",
    "pronunciationKm": "អឺ ស្មើ ដក ដេលតា ហ្វី លើ ដេលតា តេ",
    "meaningKm": "កាលណាមានបម្រែបម្រួលភ្លុចម៉ាញេទិច (Φ) ឆ្លងកាត់សៀគ្វីបិទជិត នោះនឹងបង្កើតឱ្យមានកម្លាំងអគ្គិសនីចលករเหนាំងនាំ (e) ក្នុងសៀគ្វីនោះ។ សញ្ញា (-) បង្ហាញពីច្បាប់ឡិន។",
    "meaningEn": "Induced electromotive force resulting from changing magnetic flux over time.",
    "unitKm": "\\Phi: \\text{Wb (វេប៊ែរ), } e: \\text{V (វ៉ុល)}",
    "formula": "e = -\\frac{\\Delta\\Phi}{\\Delta t}, \\quad \\Phi = B S \\cos\\alpha",
    "examSignificanceKm": "គោលការណ៍គ្រឹះនៃម៉ាស៊ីនភ្លើង ឌីណាម៉ូ និងត្រង់ស្វូម៉ាទ័រ។",
    "memoryHookKm": "ផ្លាស់ប្តូរមេដែកក្បែរប៉ូប៊ីនបង្កើតភ្លើងអគ្គិសនី! ភ្លុចប្រែប្រួលកាន់តែលឿន ភ្លើងចេញកាន់តែខ្លាំង!",
    "tags": [
      "induction",
      "faraday",
      "magnetism",
      "grade11"
    ]
  },
  {
    "id": "phys-g11-lens",
    "subject": "physics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}, \\quad \\gamma = -\\frac{d'}{d}",
    "isLatex": true,
    "nameKm": "រូបមន្តឡង់ទីស្តើង (Thin Lens Equation)",
    "nameEn": "Thin Lens Formula and Magnification",
    "pronunciationKm": "មួយលើអេហ្វ ស្មើ មួយលើដេ បូក មួយលើដេប្រែម",
    "meaningKm": "ទំនាក់ទំនងរវាងកម្រិតប្រសព្វ (f), ចម្ងាយវត្ថុ (d), និងចម្ងាយរូបភាព (d') នៃឡង់ទីស្តើង។ γ ជាកម្រិតពង្រីក។",
    "meaningEn": "Relates focal length to object and image distances for thin spherical lenses.",
    "unitKm": "\\text{f, d, d': m ឬ cm; } D = \\frac{1}{f} \\text{ (ដ្យុបត្រ: } \\delta)",
    "formula": "\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}, \\quad \\gamma = \\frac{\\overline{A'B'}}{\\overline{AB}} = -\\frac{d'}{d}",
    "examSignificanceKm": "លំហាត់អុបទិចធរណីមាត្រសង់រូបភាពតាមឡង់ទីប្រមូល និងឡង់ទីពង្រាយ។",
    "memoryHookKm": "ឡង់ទីប្រមូល f > 0 (កែវពង្រីក), ឡង់ទីពង្រាយ f < 0! មួយលើ f ស្មើ មួយលើ d បូក មួយលើ d'!",
    "tags": [
      "optics",
      "lens",
      "focal-length",
      "grade11"
    ]
  },
  {
    "id": "math-g11-arith-seq",
    "subject": "mathematics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "u_n = u_1 + (n-1)d, \\quad S_n = \\frac{n(u_1 + u_n)}{2}",
    "isLatex": true,
    "nameKm": "ស្វ៊ីតនព្វន្ត (Arithmetic Progression)",
    "nameEn": "Arithmetic Sequence & Series",
    "pronunciationKm": "អ៊ុយ អិន ស្មើ អ៊ុយមួយ បូក អិន ដកមួយ ដេ",
    "meaningKm": "ស្វ៊ីតដែលតួនីមួយៗស្មើនឹងតូមុនបូកនឹងចំនួនថេរ d (ផលសងរួម)។ Sn ជាផលបូក n តួដំបូង។",
    "meaningEn": "Sequence where each term equals previous term plus constant difference d.",
    "formula": "u_n = u_1 + (n-1)d, \\quad S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n-1)d]}{2}",
    "examSignificanceKm": "ចេញក្នុងវិញ្ញាសាគណិតវិទ្យាប្រចាំខែ ឆមាស និងការប្រឡងសិស្សពូកែ។",
    "memoryHookKm": "ស្វ៊ីតនព្វន្ត = បូកថែមចំនួនដដែលៗ (d)! ផលបូក Sn យកចំនួនតួ (n) ចែក ២ គុណនឹង (តួដើម + តួចុង)!",
    "tags": [
      "progression",
      "arithmetic",
      "sequences",
      "grade11"
    ]
  },
  {
    "id": "math-g11-geom-seq",
    "subject": "mathematics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "u_n = u_1 \\cdot q^{n-1}, \\quad S_n = u_1 \\frac{1 - q^n}{1 - q}",
    "isLatex": true,
    "nameKm": "ស្វ៊ីតធរណីមាត្រ (Geometric Progression)",
    "nameEn": "Geometric Sequence & Series",
    "pronunciationKm": "អ៊ុយ អិន ស្មើ អ៊ុយមួយ គុណ គ្យូ ស្វ័យគុណ អិន ដកមួយ",
    "meaningKm": "ស្វ៊ីតដែលតួនីមួយៗស្មើនឹងតូមុនគុណនឹងចំនួនថេរ q (រ៉េស៊ីយ៉ូ)។",
    "meaningEn": "Sequence where each term is multiplied by common ratio q.",
    "formula": "u_n = u_1 \\cdot q^{n-1}, \\quad S_n = u_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)",
    "examSignificanceKm": "គំរូគណិតវិទ្យានៃការកើនឡើងប្រជាជន និងការប្រាក់ទ្វេក្នុងសេដ្ឋកិច្ច។",
    "memoryHookKm": "ស្វ៊ីតធរណីមាត្រ = គុណថែមចំនួនដដែលៗ (q)! ដូចការបំបែកកោសិកា ២ ទៅ ៤ ទៅ ៨ ទៅ ១៦!",
    "tags": [
      "progression",
      "geometric",
      "sequences",
      "grade11"
    ]
  },
  {
    "id": "math-g11-derivatives",
    "subject": "mathematics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "(x^n)' = n x^{n-1}, \\quad (uv)' = u'v + uv', \\quad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
    "isLatex": true,
    "nameKm": "រូបមន្តគ្រឹះនៃដេរីវេ (Fundamental Derivative Rules)",
    "nameEn": "Basic Derivative Formulas",
    "pronunciationKm": "ដេរីវេ អ៊ិចស្វ័យគុណ អិន ស្មើ អិន អ៊ិច ស្វ័យគុណ អិន ដកមួយ",
    "meaningKm": "អត្រាបម្រែបម្រួលភ្លាមៗនៃអនុគមន៍ និងមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះក្រាបត្រង់ចំណុចមួយ។",
    "meaningEn": "Calculus derivative rules for power, product, and quotient of functions.",
    "formula": "(c)' = 0, \\quad (x^n)' = nx^{n-1}, \\quad (uv)' = u'v + uv', \\quad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
    "examSignificanceKm": "គ្រឹះដ៏សំខាន់បំផុតសម្រាប់សិក្សាអថេរភាពអនុគមន៍ថ្នាក់ទី ១១ និងបាក់ឌុបថ្នាក់ទី ១២។",
    "memoryHookKm": "ដេរីវេទម្លាក់ស្វ័យគុណមកមុខ រួចបន្ថយស្វ័យគុណ ១ (nxⁿ⁻¹)! ផលគុណ (uv)' = u'v + uv'!",
    "tags": [
      "derivatives",
      "calculus",
      "analysis",
      "grade11"
    ]
  },
  {
    "id": "math-g11-combinations",
    "subject": "mathematics",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "C(n, k) = \\frac{n!}{k!(n - k)!}",
    "isLatex": true,
    "nameKm": "បន្សំនៃ k ធាតុពី n ធាតុ (Combinations Formula)",
    "nameEn": "Combinations Formula C(n, k)",
    "pronunciationKm": "សេ អិន កា ស្មើ អិន ហ្វាក់តូរីយ៉ែល លើ កា ហ្វាក់តូរីយ៉ែល គុណ អិន ដកកា ហ្វាក់តូរីយ៉ែល",
    "meaningKm": "ចំនួនវិធីជ្រើសរើស k ធាតុចេញពី n ធាតុ ដោយមិនគិតពីលំដាប់នៃការជ្រើសរើស។",
    "meaningEn": "Number of ways to choose k unordered items from a set of n elements.",
    "formula": "C_n^k = \\frac{n!}{k!(n-k)!}, \\quad P(A) = \\frac{n(A)}{n(S)} \\text{ (ប្រូបាប)}",
    "examSignificanceKm": "លំហាត់ចាប់បាល់ ចាប់សន្លឹកបៀ និងជ្រើសរើសសិស្សតំណាងថ្នាក់ទី ១១–១២។",
    "memoryHookKm": "បន្សំមិនគិតលំដាប់ (ជ្រើសរើសក្រុមមនុស្ស); ចម្លាស់គិតលំដាប់ (រៀបជួរ ឬលេខកូដសម្ងាត់)!",
    "tags": [
      "combinations",
      "probability",
      "combinatorics",
      "grade11"
    ]
  },
  {
    "id": "chem-g11-hydrocarbons",
    "subject": "chemistry",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "\\text{Alkanes: C}_n\\text{H}_{2n+2}, \\quad \\text{Alkenes: C}_n\\text{H}_{2n}, \\quad \\text{Alkynes: C}_n\\text{H}_{2n-2}",
    "isLatex": true,
    "nameKm": "រូបមន្តទូទៅអ៊ីដ្រូកាបួ (General Formulas of Hydrocarbons)",
    "nameEn": "Hydrocarbons Homologous Series Formulas",
    "pronunciationKm": "អាល់កាន, អាល់សែន, អាល់ស៊ីន",
    "meaningKm": "សមាសធាតុសរីរាង្គផ្សំឡើងតែពីកាបូន និងអ៊ីដ្រូសែន៖ អាល់កាន (ចំណងទោល), អាល់សែន (ចំណងភ្លោះ), អាល់ស៊ីន (ចំណងបី)។",
    "meaningEn": "General formulas for saturated and unsaturated aliphatic hydrocarbon families.",
    "formula": "\\text{C}_n\\text{H}_{2n+2} \\; (n \\ge 1), \\quad \\text{C}_n\\text{H}_{2n} \\; (n \\ge 2), \\quad \\text{C}_n\\text{H}_{2n-2} \\; (n \\ge 2)",
    "examSignificanceKm": "គ្រឹះនៃគីមីសរីរាង្គថ្នាក់ទី ១១ និងការត្រៀមប្រឡងបាក់ឌុបថ្នាក់ទី ១២។",
    "memoryHookKm": "អាល់កានបូកពីរ (+2), អាល់សែនស្មើ (2n), អាល់ស៊ីនដកពីរ (-2) — ចំណងទោល ភ្លោះ បី!",
    "tags": [
      "organic",
      "hydrocarbons",
      "alkanes",
      "alkenes",
      "grade11"
    ]
  },
  {
    "id": "chem-g11-equilibrium",
    "subject": "chemistry",
    "grades": [
      11
    ],
    "category": "formulas",
    "symbol": "K_c = \\frac{[\\text{C}]^c [\\text{D}]^d}{[\\text{A}]^a [\\text{B}]^b}",
    "isLatex": true,
    "nameKm": "ថេរលំនឹងគីមី (Chemical Equilibrium Constant Kc)",
    "nameEn": "Chemical Equilibrium Constant Expression",
    "pronunciationKm": "កា សេ ស្មើ ផលគុណកំហាប់កកើត លើ ផលគុណកំហាប់ប្រតិករ",
    "meaningKm": "ក្នុងប្រតិកម្មទ្វេទិស aA + bB ⇌ cC + dD នៅលំនឹង ផលធៀបកំហាប់ស្មើថេរ Kc ដែលអាស្រ័យតែនឹងសីតុណ្ហភាពប៉ុណ្ណោះ។",
    "meaningEn": "Ratio of product concentrations to reactant concentrations at dynamic equilibrium.",
    "formula": "a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D} \\implies K_c = \\frac{[\\text{C}]^c [\\text{D}]^d}{[\\text{A}]^a [\\text{B}]^b}",
    "examSignificanceKm": "មេរៀនលំនឹងគីមី និងគោលការណ៍ឡឺឆាតឺលីយេថ្នាក់ទី ១១។",
    "memoryHookKm": "កំហាប់សារធាតុរឹងសុទ្ធ (s) និងរាវសុទ្ធ (l) មិនបាច់ដាក់ក្នុងកន្សោម Kc ទេ!",
    "tags": [
      "equilibrium",
      "kinetics",
      "lechatelier",
      "grade11"
    ]
  },
  {
    "id": "bio-g11-dna-structure",
    "subject": "biology",
    "grades": [
      11
    ],
    "category": "rules",
    "symbol": "\\text{DNA: } A = T, \\quad G \\equiv C",
    "isLatex": true,
    "nameKm": "ច្បាប់បំពេញបាស Chargaff (Complementary Base Pairing)",
    "nameEn": "Chargaff's Rules of Complementary Bases",
    "pronunciationKm": "អា បំពេញ តេ (សម្ព័ន្ធអ៊ីដ្រូសែន ២), សេ បំពេញ ហ្ស៊ី (សម្ព័ន្ធអ៊ីដ្រូសែន ៣)",
    "meaningKm": "ក្នុងម៉ូលេគុល DNA ច្រវាក់ទ្វេ អាដេនីន (A) ភ្ជាប់ជាមួយទីមីន (T) ដោយសម្ព័ន្ធអ៊ីដ្រូសែន ២; ក្វានីន (G) ភ្ជាប់ជាមួយស៊ីតូស៊ីន (C) ដោយសម្ព័ន្ធ ៣។",
    "meaningEn": "Complementary hydrogen-bonded nitrogenous base pairing rules in DNA.",
    "formula": "A = T, \\quad G = C \\implies A + G = T + C = 50\\%",
    "examSignificanceKm": "លំហាត់គណនាចំនួននុយក្លេអូទីត និងប្រវែងម៉ូលេគុល DNA ថ្នាក់ទី ១១–១២។",
    "memoryHookKm": "A ភ្ជាប់ T ដូច Apple in Tree (ចំណង ២); C ភ្ជាប់ G ដូច Car in Garage (ចំណង ៣)!",
    "tags": [
      "dna",
      "chargaff",
      "molecular-biology",
      "grade11"
    ]
  },
  {
    "id": "bio-g11-central-dogma",
    "subject": "biology",
    "grades": [
      11
    ],
    "category": "rules",
    "symbol": "\\text{DNA} \\xrightarrow{\\text{Transcription}} \\text{mRNA} \\xrightarrow{\\text{Translation}} \\text{Protein}",
    "isLatex": true,
    "nameKm": "គោលការណ៍កណ្តាលនៃពន្ធុវិទ្យាម៉ូលេគុល (Central Dogma)",
    "nameEn": "Central Dogma of Molecular Biology",
    "pronunciationKm": "ចម្លងក្រម (Transcription) និង បកប្រែក្រម (Translation)",
    "meaningKm": "ព័ត៌មានពន្ធុពី DNA ត្រូវចម្លងទៅជា mRNA ក្នុងស្នូលកោសិកា រួចបញ្ជូនទៅរីបូសូមដើម្បីបកប្រែជាច្រវាក់អាស៊ីតអាមីនេ (ប្រូតេអ៊ីន)។",
    "meaningEn": "Flow of genetic information: DNA to messenger RNA to functional protein.",
    "formula": "\\text{DNA (Gene)} \\longrightarrow \\text{mRNA (Codon)} \\longrightarrow \\text{Polypeptide (Phenotype)}",
    "examSignificanceKm": "សំណួរពិពណ៌នាដំណាក់កាលសំយោគប្រូតេអ៊ីនសៀវភៅពុម្ពជីវវិទ្យាថ្នាក់ទី ១១–១២។",
    "memoryHookKm": "DNA ជាសៀវភៅដើមក្នុងបណ្ណាល័យស្នូល, mRNA ជាសេចក្តីចម្លងយួរទៅរោងចក្ររីបូសូមបង្កើតប្រូតេអ៊ីន!",
    "tags": [
      "central-dogma",
      "transcription",
      "translation",
      "grade11"
    ]
  },
  {
    "id": "phys-g12-pendulum",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "T = 2\\pi \\sqrt{\\frac{l}{g}}",
    "isLatex": true,
    "nameKm": "រូបមន្តខួបប៉ោលទោល (Period of a Simple Pendulum)",
    "nameEn": "Period of a Simple Pendulum",
    "pronunciationKm": "តេ ស្មើ ពីរ ភី ឫសការេ អិល លើ សេ",
    "meaningKm": "ខួបលំយោលប៉ោលទោលក្នុងមុំលំយោលតូច (α ≤ 10°) អាស្រ័យតែនឹងប្រវែងខ្សែ (l) និងសំទុះទំនាញដី (g) ដោយមិនអាស្រ័យនឹងម៉ាសឡើយ។",
    "meaningEn": "Period of small-angle simple pendulum oscillation.",
    "unitKm": "\\text{s (វិនាទី)}",
    "formula": "T = 2\\pi \\sqrt{\\frac{l}{g}} \\implies l = \\frac{g T^2}{4\\pi^2}",
    "examSignificanceKm": "ប្រឡងបាក់ឌុបចេញរៀងរាល់ឆ្នាំក្នុងជំពូកទី ១ (ចលនាលំយោល)។",
    "memoryHookKm": "ប៉ោលខ្សែវែង លំយោលយឺត (ខួបធំ)! មិនថាព្យួរដុំថ្មធ្ងន់ ឬស្រាលទេ បើប្រវែងខ្សែស្មើគ្នា ខួបដូចគ្នា!",
    "tags": [
      "pendulum",
      "oscillations",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "phys-g12-spring-pendulum",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "T = 2\\pi \\sqrt{\\frac{m}{k}}",
    "isLatex": true,
    "nameKm": "ខួបប៉ោលរ៉ឺស័រ (Period of Spring Oscillator)",
    "nameEn": "Period of a Mass-Spring System",
    "pronunciationKm": "តេ ស្មើ ពីរ ភី ឫសការេ អឹម លើ កា",
    "meaningKm": "ខួបនៃលំយោលប៉ោលអេឡាស្ទិច អាស្រ័យនឹងម៉ាសអង្គធាតុ (m) និងថេររឹងនៃរ៉ឺស័រ (k គិតជា N/m)។",
    "meaningEn": "Natural period of harmonic mass-spring mechanical oscillation.",
    "unitKm": "\\text{s (វិនាទី), } k: \\text{N/m}",
    "formula": "T = 2\\pi \\sqrt{\\frac{m}{k}}, \\quad \\omega = \\sqrt{\\frac{k}{m}}, \\quad f = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
    "examSignificanceKm": "លំហាត់គណនាថេររឹង k ឬម៉ាស m ក្នុងប្រឡងបាក់ឌុប។",
    "memoryHookKm": "ម៉ាសកាន់តែធ្ងន់ (m ធំ) រ៉ឺស័រយោលកាន់តែយឺត (T កើន); រ៉ឺស័រកាន់តែរឹង (k ធំ) យោលកាន់តែញាប់!",
    "tags": [
      "spring",
      "harmonic",
      "oscillations",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "phys-g12-waves",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "v = \\lambda f = \\frac{\\lambda}{T} \\implies \\lambda = \\frac{v}{f}",
    "isLatex": true,
    "nameKm": "ល្បឿន និងប្រវែងរលក (Wave Speed & Wavelength)",
    "nameEn": "Wave Speed and Wavelength Relationship",
    "pronunciationKm": "វេ ស្មើ ឡាំដា គុណ អេហ្វ",
    "meaningKm": "ប្រវែងរលក (λ) គឺជាចម្ងាយដែលរលកធ្វើដំណើរបានក្នុងមួយខួប (T)។ សមាមាត្រនឹងល្បឿន និងច្រាសសមាមាត្រនឹងប្រេកង់។",
    "meaningEn": "Universal wave equation relating propagation velocity, wavelength, and frequency.",
    "unitKm": "\\lambda: \\text{m, nm}; \\; v: \\text{m/s}; \\; f: \\text{Hz}",
    "formula": "v = \\lambda \\cdot f \\implies \\lambda = \\frac{v}{f} = v \\cdot T",
    "examSignificanceKm": "ចេញក្នុងវិញ្ញាសាបាក់ឌុបជំពូករលកមេកានិច និងរលកអេឡិចត្រូម៉ាញេទិច។",
    "memoryHookKm": "ឡាំដា (λ) ជើងពីរបោះជំហានបានប្រវែងរលកមួយ (m) — គុណនឹងប្រេកង់ (f) បានល្បឿនរលក (v)!",
    "tags": [
      "waves",
      "wavelength",
      "frequency",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "phys-g12-rlc",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "Z = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}",
    "isLatex": true,
    "nameKm": "អាំព៉េដង់សៀគ្វីឆ្លាស់ RLC (RLC Circuit Impedance)",
    "nameEn": "AC Series RLC Circuit Total Impedance",
    "pronunciationKm": "ហ្សិត ស្មើ ឫសការេ អ៊ែរការ៉េ បូក អិលអូមេហ្គា ដក មួយលើសេអូមេហ្គា លើកជាការ៉េ",
    "meaningKm": "ភាពធន់សរុបនៃសៀគ្វីចរន្តឆ្លាស់ដែលតជាស៊េរីនូវ រេស៊ីស្តង់ (R), ប៊ូប៊ីន (L), និងកុងដង់សាទ័រ (C)។",
    "meaningEn": "Total AC impedance combining resistive, inductive, and capacitive reactances.",
    "unitKm": "\\Omega \\text{ (អូម)}",
    "formula": "Z = \\sqrt{R^2 + (Z_L - Z_C)^2}, \\quad Z_L = L\\omega, \\quad Z_C = \\frac{1}{C\\omega}",
    "examSignificanceKm": "លំហាត់ធំប្រឡងបាក់ឌុប (២៥ ពិន្ទុ) ជារៀងរាល់ឆ្នាំ!",
    "memoryHookKm": "ពេល ZL = ZC សៀគ្វីមាន រ៉េសូណង់៖ អាំព៉េដង់តូចបំផុត Z = R ហើយចរន្តអគ្គិសនីឡើងធំបំផុត!",
    "tags": [
      "ac-circuits",
      "rlc",
      "impedance",
      "resonance",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "phys-g12-einstein",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "E = mc^2, \\quad E_b = \\Delta m \\cdot c^2",
    "isLatex": true,
    "nameKm": "សមីការសមមូលម៉ាស-ថាមពលអែងស្តាំង (Einstein's Mass-Energy Equivalence)",
    "nameEn": "Einstein Mass-Energy Relation & Binding Energy",
    "pronunciationKm": "អឺ ស្មើ អឹម សេការ៉េ",
    "meaningKm": "ម៉ាសអាចបំប្លែងទៅជាថាមពលដ៏មហិមា។ ឱនភាពម៉ាសក្នុងស្នូលអាតូមបំប្លែងទៅជាថាមពលសម្ព័ន្ធនុយក្លេអ៊ែរ (Eb)។",
    "meaningEn": "Fundamental relativistic equivalence between mass defect and nuclear binding energy.",
    "unitKm": "c = 3 \\times 10^8\\,\\text{m/s}, \\quad 1\\,\\text{u} = 931.5\\,\\text{MeV}",
    "formula": "E = mc^2, \\quad \\Delta m = (Z m_p + N m_n) - m_X, \\quad E_b = \\Delta m \\times 931.5\\,\\text{MeV}",
    "examSignificanceKm": "លំហាត់រូបវិទ្យានុយក្លេអ៊ែរត្រៀមប្រឡងបាក់ឌុប។",
    "memoryHookKm": "សមីការល្បីល្បាញបំផុតក្នុងពិភពលោក! ម៉ាសបន្តិចបន្តួចអាចបង្កើតថាមពលនុយក្លេអ៊ែរយ៉ាងមហាសាល!",
    "tags": [
      "nuclear",
      "einstein",
      "energy",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "phys-g12-radioactivity",
    "subject": "physics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "N(t) = N_0 e^{-\\lambda t} = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}",
    "isLatex": true,
    "nameKm": "ច្បាប់បំបែកវិទ្យុសកម្ម (Radioactive Decay Law)",
    "nameEn": "Radioactive Decay Law and Half-Life",
    "pronunciationKm": "អិន ស្មើ អិនសូន្យ គុណ អឺ ស្វ័យគុណ ដក ឡាំដា តេ",
    "meaningKm": "ចំនួនស្នូលវិទ្យុសកម្មដែលនៅសល់ថយចុះជាអនុគមន៍អិចស្ប៉ូណង់ស្យែលធៀបនឹងពេល។ T ជាកាលពាក់កណ្តាលជីវិត។",
    "meaningEn": "Exponential decay of radioactive nuclei as a function of half-life T.",
    "unitKm": "T: \\text{s, ឆ្នាំ; } \\lambda = \\frac{\\ln 2}{T} \\approx \\frac{0.693}{T}",
    "formula": "N(t) = N_0 \\cdot 2^{-t/T}, \\quad A(t) = \\lambda N(t) \\text{ (សកម្មភាព: Bq)}",
    "examSignificanceKm": "លំហាត់កំណត់អាយុកាលផូស៊ីល ឬវត្ថុបុរាណដោយកាបូន-១៤ ក្នុងវិញ្ញាសាបាក់ឌុប។",
    "memoryHookKm": "ឆ្លងផុតកាលពាក់កណ្តាលជីវិត T មួយដង ស្នូលនៅសល់ពាក់កណ្តាល (½); ឆ្លងផុត 2T នៅសល់ ¼!",
    "tags": [
      "radioactivity",
      "halflife",
      "nuclear",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "math-g12-integral",
    "subject": "mathematics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\int u\\,dv = uv - \\int v\\,du",
    "isLatex": true,
    "nameKm": "អាំងតេក្រាលកំណត់ និងអាំងតេក្រាលដោយផ្នែក (Definite Integrals & Parts)",
    "nameEn": "Definite Integrals and Integration by Parts",
    "pronunciationKm": "អាំងតេក្រាលពី អា ទៅ បេ នៃ អេហ្វ ដឺ អ៊ិច ស្មើ អេហ្វធំនៃ បេ ដក អេហ្វធំនៃ អា",
    "meaningKm": "ប្រតិបត្តិការច្រាសនៃដេរីវេ ប្រើសម្រាប់គណនាផ្ទៃក្រឡារវាងខ្សែកោង និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស Ox។",
    "meaningEn": "Fundamental theorem of calculus and integration by parts technique.",
    "formula": "\\int_a^b f(x)dx = [F(x)]_a^b = F(b) - F(a), \\quad V = \\pi \\int_a^b [f(x)]^2 dx",
    "examSignificanceKm": "វិញ្ញាសាគណិតវិទ្យាបាក់ឌុបចេញរៀងរាល់ឆ្នាំ (២០–២៥ ពិន្ទុ)! គណនាផ្ទៃក្រឡា និងមាឌ!",
    "memoryHookKm": "អាំងតេក្រាលដោយផ្នែក៖ 'អ៊ុយ គុណ វេ ដក អាំងតេក្រាល វេ ឌេអ៊ុយ' (uv - ∫v du)!",
    "tags": [
      "integrals",
      "calculus",
      "volume",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "math-g12-complex",
    "subject": "mathematics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "z = a + bi = r(\\cos\\theta + i\\sin\\theta), \\quad z^n = r^n(\\cos n\\theta + i\\sin n\\theta)",
    "isLatex": true,
    "nameKm": "ចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ (Complex Numbers & De Moivre)",
    "nameEn": "Complex Numbers Trigonometric Form & De Moivre",
    "pronunciationKm": "ហ្សិត ស្មើ អា បូក បេ អ៊ី, រូបមន្តដឺម័រ",
    "meaningKm": "ចំនួនក្នុងប្លង់កុំផ្លិចដែលមាន i² = -1។ ទម្រង់ត្រីកោណមាត្រជួយគណនាស្វ័យគុណ n និងឫសទី n យ៉ាងងាយស្រួល។",
    "meaningEn": "Trigonometric representation and De Moivre's theorem for complex powers.",
    "formula": "|z| = r = \\sqrt{a^2 + b^2}, \\quad \\tan\\theta = \\frac{b}{a}, \\quad [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)",
    "examSignificanceKm": "លំហាត់ចំនួនកុំផ្លិចប្រឡងបាក់ឌុប (១៥–២០ ពិន្ទុ)។",
    "memoryHookKm": "ស្វ័យគុណដឺម័រ៖ ម៉ូឌុល r លើកជាស្វ័យគុណ n, ឯអាគុយម៉ង់ θ គុណនឹង n!",
    "tags": [
      "complex",
      "demoivre",
      "algebra",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "math-g12-diff-eq",
    "subject": "mathematics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "y' + ay = 0 \\implies y = C e^{-ax}, \\quad y'' + \\omega^2 y = 0 \\implies y = A\\cos\\omega t + B\\sin\\omega t",
    "isLatex": true,
    "nameKm": "សមីការឌីផេរ៉ង់ស្យែល (Differential Equations)",
    "nameEn": "First & Second Order Differential Equations",
    "pronunciationKm": "អ៊ីក្រិកប្រែម បូក អា អ៊ីក្រិក ស្មើ សូន្យ",
    "meaningKm": "សមីការដែលទាក់ទងរវាងអនុគមន៍ និងដេរីវេរបស់វា។ ជាគំរូនៃចលនាលំយោល និងការថយចុះវិទ្យុសកម្ម។",
    "meaningEn": "Linear ordinary differential equations of first and second order.",
    "formula": "y' + ay = 0 \\implies y = C e^{-ax}, \\quad y'' + \\omega^2 y = 0 \\implies y = A\\cos\\omega t + B\\sin\\omega t",
    "examSignificanceKm": "ចេញក្នុងវិញ្ញាសាគណិតវិទ្យាបាក់ឌុប (១០–១៥ ពិន្ទុ)។",
    "memoryHookKm": "លំដាប់ទី ១ (y' + ay = 0) ចេញចម្លើយជាអិចស្ប៉ូណង់ស្យែល (e⁻ᵃˣ); លំដាប់ទី ២ (y'' + ω²y = 0) ចេញស៊ីនុសនិងកូស៊ីនុស!",
    "tags": [
      "differential-equations",
      "calculus",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "math-g12-exp-ln",
    "subject": "mathematics",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "(e^u)' = u' e^u, \\quad (\\ln u)' = \\frac{u'}{u}, \\quad \\ln(ab) = \\ln a + \\ln b",
    "isLatex": true,
    "nameKm": "អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីតនេពែ (Exponential & Natural Log)",
    "nameEn": "Exponential and Natural Logarithm Rules",
    "pronunciationKm": "អឺ ស្វ័យគុណ អ៊ុយ, អិលអិន នៃ អ៊ុយ",
    "meaningKm": "អនុគមន៍គ្រឹះក្នុងការសិក្សាអនុគមន៍បាក់ឌុប។ ដេរីវេនៃ eˣ គឺ eˣ ដដែល, ឯដេរីវេនៃ ln x គឺ 1/x។",
    "meaningEn": "Derivatives and properties of natural exponential and logarithmic functions.",
    "formula": "(e^x)' = e^x, \\quad (\\ln x)' = \\frac{1}{x}, \\quad \\ln(e) = 1, \\quad \\ln(1) = 0",
    "examSignificanceKm": "ជាស្នូលនៃប្រធានលំហាត់សិក្សាអនុគមន៍ធំ (៤០ ពិន្ទុ) ក្នុងប្រឡងបាក់ឌុប!",
    "memoryHookKm": "ដេរីវេ eᵘ ត្រូវគុណ u' ពីមុខ; ដេរីវេ ln u យក u' នៅលើ u នៅក្រោម!",
    "tags": [
      "exponential",
      "logarithm",
      "calculus",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "chem-g12-ph",
    "subject": "chemistry",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+], \\quad K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14}",
    "isLatex": true,
    "nameKm": "រូបមន្តកំហាប់ pH និងផលគុណអ៊ីយ៉ុងនៃទឹក (pH Formula & Kw)",
    "nameEn": "pH Scale and Ionic Product of Water",
    "pronunciationKm": "ប៉េ អាស ស្មើ ដក ឡូក កំហាប់ អាស-បី-អូ បូក",
    "meaningKm": "រង្វាស់កម្រិតអាស៊ីត-បាសនៃសូលុយស្យុងទឹក។ នៅ 25°C ផលគុណអ៊ីយ៉ុងនៃទឹក Kw = 10⁻¹⁴ ជានិច្ច នាំឱ្យ pH + pOH = 14។",
    "meaningEn": "Logarithmic measure of hydronium concentration and water autoionization constant.",
    "unitKm": "\\text{pH (គ្មានខ្នាត, 0–14)}",
    "formula": "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] \\implies [\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}, \\quad \\text{pH} + \\text{pOH} = 14",
    "examSignificanceKm": "លំហាត់អាស៊ីត-បាស និងគណនា pH ក្នុងវិញ្ញាសាគីមីបាក់ឌុប (២៥ ពិន្ទុ)។",
    "memoryHookKm": "pH < 7 = អាស៊ីត; pH = 7 = អព្យាក្រឹត; pH > 7 = បាស! កំហាប់ [H₃O⁺] កើន ១០ ដង pH ថយចុះ ១ ខ្នាត!",
    "tags": [
      "ph",
      "acids",
      "bases",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "chem-g12-henderson",
    "subject": "chemistry",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "\\text{pH} = pK_a + \\log\\frac{[\\text{A}^-]}{[\\text{HA}]}",
    "isLatex": true,
    "nameKm": "សមីការហិនឌើរសុន-ហាសែលបាល (Henderson-Hasselbalch Equation)",
    "nameEn": "Henderson-Hasselbalch Buffer Equation",
    "pronunciationKm": "ប៉េ អាស ស្មើ ប៉េ កា អា បូក ឡូក កំហាប់ បាសលើអាស៊ីត",
    "meaningKm": "គណនា pH នៃសូលុយស្យុងទ្រនាប់ (Buffer) ដែលផ្សំដោយគូអាស៊ីតខ្សោយ (HA) និងបាសឆ្លាស់ (A⁻)។",
    "meaningEn": "Calculates pH of buffer solutions using pKa and acid/conjugate base ratio.",
    "formula": "pK_a = -\\log K_a, \\quad \\text{pH} = pK_a + \\log\\frac{[\\text{Base}]}{[\\text{Acid}]}",
    "examSignificanceKm": "លំហាត់គណនា pH សូលុយស្យុងទ្រនាប់ និងសូចនាករពណ៌បាក់ឌុប។",
    "memoryHookKm": "ពេលកំហាប់បាសស្មើកំហាប់អាស៊ីត ([A⁻] = [HA]) នោះ log(1) = 0 នាំឱ្យ pH = pKa!",
    "tags": [
      "buffer",
      "pka",
      "henderson",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "chem-g12-titration",
    "subject": "chemistry",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "C_A V_A = C_B V_B",
    "isLatex": true,
    "nameKm": "ចំណុចសមមូលនៃការក្រិតអាស៊ីត-បាស (Titration Equivalence)",
    "nameEn": "Acid-Base Titration Equivalence",
    "pronunciationKm": "សេ អា វេ អា ស្មើ សេ បេ វេ បេ",
    "meaningKm": "នៅចំណុចសមមូលនៃការក្រិត ចំនួនម៉ូល H₃O⁺ របស់អាស៊ីត ស្មើនឹងចំនួនម៉ូល OH⁻ របស់បាស (n_acid = n_base)។",
    "meaningEn": "Stoichiometric equivalence condition in acid-base volumetric titration.",
    "formula": "n_A = n_B \\iff C_A \\cdot V_A = C_B \\cdot V_B",
    "examSignificanceKm": "សំណួរពិសោធន៍ជាក់ស្តែង និងលំហាត់គណនាកំហាប់មិនស្គាល់ក្នុងប្រឡងបាក់ឌុប។",
    "memoryHookKm": "CA · VA = CB · VB ប្រើបានសម្រាប់អាស៊ីតទោល និងបាសទោល (ដូច HCl និង NaOH)!",
    "tags": [
      "titration",
      "equivalence",
      "stoichiometry",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "chem-g12-ester",
    "subject": "chemistry",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "\\text{R-COOH} + \\text{R'-OH} \\rightleftharpoons \\text{R-COO-R'} + \\text{H}_2\\text{O}",
    "isLatex": true,
    "nameKm": "ប្រតិកម្មអេស្ទែរកម្ម និងសាប៊ូកម្ម (Esterification & Saponification)",
    "nameEn": "Esterification and Saponification",
    "pronunciationKm": "អាស៊ីតកាបុកស៊ីលិច បូក អាល់កុល បាន អេស្ទែ បូក ទឹក",
    "meaningKm": "ប្រតិកម្មទ្វេទិសយឺតរវាងអាស៊ីតកាបុកស៊ីលិច និងអាល់កុល បង្កើតបានជាអេស្ទែដែលមានក្លិនក្រអូប។ សាប៊ូកម្មជាប្រតិកម្មរវាងខ្លាញ់និងបាស NaOH។",
    "meaningEn": "Reversible ester synthesis and base-catalyzed triglyceride saponification.",
    "formula": "\\text{Triglyceride} + 3\\text{NaOH} \\xrightarrow{\\Delta} \\text{Glycerol} + 3\\text{Soap (R-COONa)}",
    "examSignificanceKm": "លំហាត់គីមីសរីរាង្គប្រឡងបាក់ឌុប (២៥–៣០ ពិន្ទុ) ជារៀងរាល់ឆ្នាំ!",
    "memoryHookKm": "អេស្ទែមានក្លិនក្រអូបផ្លែឈើ (ចេកទុំ ម្នាស់ ប៉ោម); ខ្លាញ់បូកសូដាភ្លើង (NaOH) ស្ងោរបានសាប៊ូដុសខ្លួន!",
    "tags": [
      "ester",
      "saponification",
      "organic",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "bio-g12-dna-dimensions",
    "subject": "biology",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "N = 2A + 2G, \\quad L = \\frac{N}{2} \\times 3.4\\,\\text{Å}, \\quad M = N \\times 300\\,\\text{đvC}",
    "isLatex": true,
    "nameKm": "រូបមន្តគណនាវិមាត្រ DNA (DNA Dimension Calculations)",
    "nameEn": "DNA Structural Dimension Formulas",
    "pronunciationKm": "អិន ស្មើ ពីរ អា បូក ពីរ ហ្ស៊ី, អិល ស្មើ អិនលើពីរ គុណ បីចុចបួន អង់ស្ត្រូម",
    "meaningKm": "រូបមន្តគណនាចំនួននុយក្លេអូទីតសរុប (N), ប្រវែងម៉ូលេគុល DNA (L គិតជា Å), ម៉ាសម៉ូលេគុល (M), និងចំនួនជុំវង់ (C = N/20)។",
    "meaningEn": "Mathematical relationships for total nucleotides, physical length in Angstroms, and molecular mass.",
    "unitKm": "1\\,\\text{Å} = 10^{-10}\\,\\text{m} = 10^{-4}\\,\\mu\\text{m}, \\quad 1\\,\\text{nm} = 10\\,\\text{Å}",
    "formula": "N = 2A + 2G, \\quad L = \\frac{N}{2} \\times 3.4\\,\\text{Å}, \\quad M = N \\times 300\\,\\text{đvC}, \\quad C = \\frac{N}{20}",
    "examSignificanceKm": "លំហាត់គណនាជីវវិទ្យាបាក់ឌុបលេខ ១ (២០–២៥ ពិន្ទុ) ចេញស្ទើររាល់ឆ្នាំ!",
    "memoryHookKm": "ចងចាំតួលេខមាស DNA៖ ១ គូ = 3.4 Å, ១ នុយក្លេអូទីត = 300 đvC, ១ ជុំវង់ = 10 គូ = 20 នុយក្លេអូទីត = 34 Å!",
    "tags": [
      "dna",
      "calculations",
      "molecular-genetics",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "bio-g12-amino-calc",
    "subject": "biology",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "N_{\\text{aa}} = \\frac{N}{6} - 1 = \\frac{rN}{3} - 1",
    "isLatex": true,
    "nameKm": "ចំនួនអាស៊ីតអាមីនេក្នុងប្រូតេអ៊ីន (Amino Acids Count in Protein)",
    "nameEn": "Amino Acid Synthesis Calculation",
    "pronunciationKm": "ចំនួនអាស៊ីតអាមីនេ ស្មើ អិនលើប្រាំមួយ ដក មួយ",
    "meaningKm": "កូដុង ៣ នុយក្លេអូទីតនៅលើ mRNA កំណត់អាស៊ីតអាមីនេ ១។ ដក ១ ដោយសារកូដុងបញ្ចប់ (Stop Codon: UAA, UAG, UGA) មិនបកប្រែជាអាស៊ីតអាមីនេឡើយ។",
    "meaningEn": "Calculates synthesized amino acids from DNA nucleotide count excluding stop codon.",
    "formula": "N_{\\text{aa}} = \\frac{N_{\\text{DNA}}}{6} - 1 = \\frac{N_{\\text{mRNA}}}{3} - 1",
    "examSignificanceKm": "លំហាត់គណនាប្រូតេអ៊ីន និងច្រវាក់ប៉ូលីប៉ិបទីតក្នុងការប្រឡងបាក់ឌុប។",
    "memoryHookKm": "កុំភ្លេចដក ១ ឱ្យសោះ! កូដុងបញ្ឈប់ (Stop Codon) ដូចភ្លើងស្តុបក្រហម បញ្ឈប់ការបកប្រែ មិនបង្កើតអាស៊ីតអាមីនេទេ!",
    "tags": [
      "translation",
      "protein",
      "amino-acids",
      "bacii",
      "grade12"
    ]
  },
  {
    "id": "bio-g12-hardy-weinberg",
    "subject": "biology",
    "grades": [
      12
    ],
    "category": "formulas",
    "symbol": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
    "isLatex": true,
    "nameKm": "ទ្រឹស្តីបទលំនឹងហាឌី-វ៉ាំងប៊ឺក (Hardy-Weinberg Principle)",
    "nameEn": "Hardy-Weinberg Population Equilibrium",
    "pronunciationKm": "ប៉េ បូក គ្យូ ស្មើ មួយ, ប៉េការ៉េ បូក ពីរ ប៉េ គ្យូ បូក គ្យូការ៉េ ស្មើ មួយ",
    "meaningKm": "ក្នុងប្រជាភិវឌ្ឍន៍ធំ បង្កាត់ដោយចៃដន្យ និងគ្មានការជ្រើសរើសដោយធម្មជាតិ ប្រេកង់អាឡែល (p, q) និងប្រេកង់សេណូទីបនៅថេរពីជំនាន់មួយទៅជំនាន់មួយ។",
    "meaningEn": "Calculates allele frequencies (p, q) and genotype frequencies (p², 2pq, q²) at genetic equilibrium.",
    "formula": "p(A) + q(a) = 1, \\quad p^2(AA) + 2pq(Aa) + q^2(aa) = 1",
    "examSignificanceKm": "លំហាត់ពន្ធុវិទ្យាប្រជាភិវឌ្ឍន៍បាក់ឌុប (១៥ ពិន្ទុ)។",
    "memoryHookKm": "រក q² (ប្រេកង់សេណូទីបអន់ aa) មុនគេ! រួចបំពាក់ឫសការេបាន q -> យក 1 - q ឃើញ p!",
    "tags": [
      "hardy-weinberg",
      "population-genetics",
      "bacii",
      "grade12"
    ]
  }
];
