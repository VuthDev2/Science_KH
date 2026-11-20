/**
 * MoEYS National Curriculum Subject Definitions & Grade Topics (Grades 7–12)
 * Aligned with the official Cambodian Ministry of Education, Youth and Sport (MoEYS) standard.
 */

export type MoeysSubjectSlug =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "khmer"
  | "english"
  | "ict"
  | "history"
  | "geography";

export type MoeysSubjectCategory = "stem" | "languages" | "social" | "tech";

export interface MoeysSubject {
  slug: MoeysSubjectSlug;
  nameKm: string;
  nameEn: string;
  shortKm: string;
  shortEn: string;
  icon: string;
  category: MoeysSubjectCategory;
  categoryKm: string;
  categoryEn: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  sortOrder: number;
  grades: number[];
  descriptionKm: string;
  descriptionEn: string;
}

export const MOEYS_SUBJECTS: MoeysSubject[] = [
  {
    slug: "mathematics",
    nameKm: "គណិតវិទ្យា",
    nameEn: "Mathematics",
    shortKm: "គណិត",
    shortEn: "Math",
    icon: "Calculator",
    category: "stem",
    categoryKm: "វិទ្យាសាស្ត្រពិត",
    categoryEn: "STEM Science",
    color: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeText: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
    sortOrder: 1,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "ពីជគណិត ធរណីមាត្រ ត្រីកោណមាត្រ ស្ថិតិ អនុគមន៍ ដេរីវេ និងអាំងតេក្រាល",
    descriptionEn: "Algebra, Geometry, Trigonometry, Statistics, Functions, Derivatives, and Integrals",
  },
  {
    slug: "physics",
    nameKm: "រូបវិទ្យា",
    nameEn: "Physics",
    shortKm: "រូប",
    shortEn: "Phys",
    icon: "Atom",
    category: "stem",
    categoryKm: "វិទ្យាសាស្ត្រពិត",
    categoryEn: "STEM Science",
    color: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-300",
    borderColor: "border-sky-200 dark:border-sky-800",
    sortOrder: 2,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "មេកានិច ចលនា កម្លាំង អគ្គិសនី ម៉ាញេទិច រលក អុបទិច និងទែរម៉ូឌីណាមិច",
    descriptionEn: "Mechanics, Motion, Forces, Electricity, Magnetism, Waves, Optics, and Thermodynamics",
  },
  {
    slug: "chemistry",
    nameKm: "គីមីវិទ្យា",
    nameEn: "Chemistry",
    shortKm: "គីមី",
    shortEn: "Chem",
    icon: "FlaskConical",
    category: "stem",
    categoryKm: "វិទ្យាសាស្ត្រពិត",
    categoryEn: "STEM Science",
    color: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    sortOrder: 3,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "អាតូម ម៉ូលេគុល សម្ព័ន្ធគីមី អាស៊ីត-បាស សូលុយស្យុង គីមីសរីរាង្គ និងអេឡិចត្រូគីមី",
    descriptionEn: "Atoms, Molecules, Chemical Bonds, Acids-Bases, Solutions, Organic Chemistry, and Electrochemistry",
  },
  {
    slug: "biology",
    nameKm: "ជីវវិទ្យា",
    nameEn: "Biology",
    shortKm: "ជីវៈ",
    shortEn: "Bio",
    icon: "Dna",
    category: "stem",
    categoryKm: "វិទ្យាសាស្ត្រពិត",
    categoryEn: "STEM Science",
    color: "from-green-600 to-emerald-700",
    badgeBg: "bg-green-50 dark:bg-green-950/40",
    badgeText: "text-green-700 dark:text-green-300",
    borderColor: "border-green-200 dark:border-green-800",
    sortOrder: 4,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "កោសិកា សរីរវិទ្យា ហ្សែននិងតំណពូជ អេកូឡូស៊ី និងជីវសាស្ត្រមនុស្ស",
    descriptionEn: "Cells, Physiology, Genetics, Heredity, Ecology, and Human Biology",
  },
  {
    slug: "earth",
    nameKm: "ផែនដី និងបរិស្ថានវិទ្យា",
    nameEn: "Earth Science",
    shortKm: "ផែនដី",
    shortEn: "Earth",
    icon: "Globe2",
    category: "stem",
    categoryKm: "វិទ្យាសាស្ត្រពិត",
    categoryEn: "STEM Science",
    color: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
    sortOrder: 5,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "ភូគព្ភវិទ្យា បរិយាកាស វដ្តទឹក ធនធានធម្មជាតិ បម្រែបម្រួលអាកាសធាតុ និងតារាសាស្ត្រ",
    descriptionEn: "Geology, Atmosphere, Hydrology, Natural Resources, Climate Change, and Astronomy",
  },
  {
    slug: "khmer",
    nameKm: "ភាសាខ្មែរ",
    nameEn: "Khmer Literature",
    shortKm: "ខ្មែរ",
    shortEn: "Khmer",
    icon: "BookOpen",
    category: "languages",
    categoryKm: "ភាសា និងអក្សរសាស្ត្រ",
    categoryEn: "Languages & Literature",
    color: "from-rose-500 to-red-600",
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-200 dark:border-rose-800",
    sortOrder: 6,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "វេយ្យាករណ៍ខ្មែរ ការតែងសេចក្តី អក្សរសិល្ប៍ វប្បធម៌ និងអរិយធម៌ខ្មែរ",
    descriptionEn: "Khmer Grammar, Essay Composition, Classical & Modern Literature, Culture, and Civilization",
  },
  {
    slug: "english",
    nameKm: "ភាសាអង់គ្លេស",
    nameEn: "English",
    shortKm: "អង់គ្លេស",
    shortEn: "English",
    icon: "Languages",
    category: "languages",
    categoryKm: "ភាសា និងអក្សរសាស្ត្រ",
    categoryEn: "Languages & Literature",
    color: "from-purple-500 to-indigo-600",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-200 dark:border-purple-800",
    sortOrder: 7,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "វេយ្យាករណ៍ភាសាអង់គ្លេស ការអានយល់ន័យ វាក្យសព្ទវិទ្យាសាស្ត្រ និងការសរសេរ",
    descriptionEn: "English Grammar, Reading Comprehension, STEM Vocabulary, and Academic Writing",
  },
  {
    slug: "ict",
    nameKm: "ព័ត៌មានវិទ្យា (ICT)",
    nameEn: "ICT & Computing",
    shortKm: "ICT",
    shortEn: "ICT",
    icon: "Laptop",
    category: "tech",
    categoryKm: "បច្ចេកវិទ្យាឌីជីថល",
    categoryEn: "Digital Technology",
    color: "from-cyan-500 to-teal-600",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/40",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    sortOrder: 8,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "កុំព្យូទ័រ សុវត្ថិភាពឌីជីថល ក្បួនដោះស្រាយ ការសរសេរកូដ និងប្រព័ន្ធបណ្តាញ",
    descriptionEn: "Computer Fundamentals, Digital Safety, Algorithms, Programming, and Networking",
  },
  {
    slug: "history",
    nameKm: "ប្រវត្តិវិទ្យា",
    nameEn: "History",
    shortKm: "ប្រវត្តិ",
    shortEn: "Hist",
    icon: "Landmark",
    category: "social",
    categoryKm: "វិទ្យាសាស្ត្រសង្គម",
    categoryEn: "Social Studies",
    color: "from-amber-600 to-yellow-700",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-800 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
    sortOrder: 9,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "ប្រវត្តិសាស្ត្រខ្មែរ (សម័យបុរេប្រវត្តិ អង្គរ កណ្តាល និងទំនើប) និងប្រវត្តិសាស្ត្រពិភពលោក",
    descriptionEn: "Cambodian History (Pre-Angkor, Angkorian, Middle & Modern Eras) and World History",
  },
  {
    slug: "geography",
    nameKm: "ភូមិវិទ្យា",
    nameEn: "Geography",
    shortKm: "ភូមិ",
    shortEn: "Geo",
    icon: "Compass",
    category: "social",
    categoryKm: "វិទ្យាសាស្ត្រសង្គម",
    categoryEn: "Social Studies",
    color: "from-teal-600 to-emerald-700",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40",
    badgeText: "text-teal-700 dark:text-teal-300",
    borderColor: "border-teal-200 dark:border-teal-800",
    sortOrder: 10,
    grades: [7, 8, 9, 10, 11, 12],
    descriptionKm: "ភូមិវិទ្យារូបវន្តកម្ពុជា ប្រជាសាស្ត្រ សេដ្ឋកិច្ច អាស៊ាន និងការអភិវឌ្ឍប្រកបដោយចីរភាព",
    descriptionEn: "Physical Geography of Cambodia, Demography, Economy, ASEAN Region, and Sustainability",
  },
];

/**
 * Authentic MoEYS Curriculum Topics per Grade (Grades 7–12) for all 10 subjects
 */
export const MOEYS_GRADE_TOPICS: Record<
  number,
  Record<MoeysSubjectSlug, { km: string[]; en: string[] }>
> = {
  7: {
    mathematics: {
      km: [
        "ចំនួនគត់រ៉ឺឡាទីវ និងប្រមាណវិធី",
        "ប្រភាគ ចំនួនទសភាគ និងភាគរយ",
        "កន្សោមពីជគណិត និងសមីការដឺក្រេទី១",
        "បន្ទាត់កាត់ កែង និងមុំក្នុងប្លង់",
      ],
      en: [
        "Integers and Operations",
        "Fractions, Decimals, and Percentages",
        "Algebraic Expressions and Linear Equations",
        "Lines, Angles, and Planar Geometry",
      ],
    },
    physics: {
      km: [
        "ការវាស់វែង និងរូបធាតុជុំវិញខ្លួន (ប្រព័ន្ធ SI)",
        "ម៉ាស៊ីនសាមញ្ញ (រ៉ក ឃ្នាស់ របងជម្រាល)",
        "កម្ដៅ និងការរីកមាឌនៃរូបធាតុ",
      ],
      en: [
        "Measurement and SI Standard Units",
        "Simple Machines (Levers, Pulleys, Incline)",
        "Heat and Thermal Expansion of Matter",
      ],
    },
    chemistry: {
      km: [
        "សារធាតុបរិសុទ្ធ និងល្បាយ",
        "បាតុភូតរូប និងបាតុភូតគីមី",
        "ទឹក និងខ្យល់ក្នុងបរិស្ថានធម្មជាតិ",
      ],
      en: [
        "Pure Substances and Mixtures",
        "Physical vs. Chemical Changes",
        "Water and Air Composition",
      ],
    },
    biology: {
      km: [
        "រចនាសម្ព័ន្ធកោសិការុក្ខជាតិ និងកោសិកាសត្វ",
        "ការចាត់ថ្នាក់ភាវៈរស់ទាំង ៥ អាណាចក្រ",
        "មូលដ្ឋានគ្រឹះនៃអេកូឡូស៊ី និងច្រវាក់អាហារ",
      ],
      en: [
        "Plant and Animal Cell Structures",
        "Classification of Living Organisms",
        "Ecosystem Basics and Food Chains",
      ],
    },
    earth: {
      km: [
        "រចនាសម្ព័ន្ធស្រទាប់ខាងក្នុងរបស់ផែនដី",
        "វដ្តថ្ម និងប្រភេទថ្មទាំង ៣ ប្រភេទ",
        "វដ្តទឹក និងបាតុភូតអាកាសធាតុ",
      ],
      en: [
        "Internal Structure of the Earth",
        "Rock Cycle (Igneous, Sedimentary, Metamorphic)",
        "Water Cycle and Weather Phenomena",
      ],
    },
    khmer: {
      km: [
        "កាព្យឃ្លោងខ្មែរ (បទកាកគតិ បទពាក្យ ៧)",
        "ថ្នាក់ពាក្យ នាម កិរិយា និងគុណនាម",
        "តែងសេចក្តីពណ៌នាទេសភាព និងមនុស្ស",
      ],
      en: [
        "Classical Khmer Poetry Meters",
        "Khmer Parts of Speech (Nouns, Verbs, Adjectives)",
        "Descriptive Essay Composition",
      ],
    },
    english: {
      km: [
        "Present Simple & Continuous Tenses",
        "School and Daily Routine Vocabulary",
        "Reading Short STEM & Nature Stories",
      ],
      en: [
        "Present Simple & Continuous Tenses",
        "School and Daily Routine Vocabulary",
        "Reading Short STEM & Nature Stories",
      ],
    },
    ict: {
      km: [
        "ផ្នែករឹង និងផ្នែកទន់នៃកុំព្យូទ័រ (Hardware & Software)",
        "ការវាយអត្ថបទជាអក្សរខ្មែរ (Khmer Unicode)",
        "ការប្រើប្រាស់អ៊ីនធឺណិត និងសុវត្ថិភាពឌីជីថល",
      ],
      en: [
        "Computer Hardware and Software Basics",
        "Khmer Unicode Typing and Documents",
        "Internet Browsing and Digital Safety",
      ],
    },
    history: {
      km: [
        "បុរេប្រវត្តិសាស្ត្រកម្ពុជា (ស្ថានីយសំរោងសែន ល្អាងស្ពាន)",
        "ការកកើតនគរភ្នំ (ហ្វូណន) និងចេនឡា",
        "អរិយធម៌ដំបូងនៅជ្រោយឥណ្ឌូចិន",
      ],
      en: [
        "Prehistoric Cambodia (Samrong Sen, Laang Spean)",
        "Funan and Chenla Kingdoms",
        "Early Civilizations of Indochina",
      ],
    },
    geography: {
      km: [
        "ទីតាំងភូមិសាស្ត្រ និងព្រំប្រទល់ប្រទេសកម្ពុជា",
        "ទម្រង់ដីខ្ពង់រាប តំបន់ទំនាបកណ្តាល និងឆ្នេរសមុទ្រ",
        "ទន្លេមេគង្គ និងបឹងទន្លេសាប",
      ],
      en: [
        "Geographic Location and Borders of Cambodia",
        "Plains, Plateaus, and Coastal Regions",
        "Mekong River and Tonle Sap Lake Systems",
      ],
    },
  },
  8: {
    mathematics: {
      km: [
        "ចំនួនសនិទាន និងចំនួនអសនិទាន",
        "រូបមន្តពន្លាតពីជគណិត (a ± b)² និង a² - b²",
        "ទ្រឹស្តីបទពីតាក័រ (Pythagorean Theorem)",
        "ស្ថិតិ និងដ្យាក្រាមទិន្នន័យ",
      ],
      en: [
        "Rational and Irrational Numbers",
        "Algebraic Expansions (a ± b)² and a² - b²",
        "Pythagorean Theorem in Right Triangles",
        "Statistics, Mean, and Data Charts",
      ],
    },
    physics: {
      km: [
        "កម្លាំង និងសម្ពាធ (សម្ពាធទឹក & បរិយាកាស)",
        "ការងារមេកានិច និងអានុភាព (W = F · d)",
        "ចលនាមូលដ្ឋាន និងល្បឿនមធ្យម (v = d / t)",
      ],
      en: [
        "Forces and Fluid Pressure",
        "Mechanical Work and Power (W = F · d)",
        "Basic Motion and Average Speed (v = d / t)",
      ],
    },
    chemistry: {
      km: [
        "អាតូម ម៉ូលេគុល និងធាតុគីមី",
        "តារាងខួបនៃធាតុគីមី (ធាតុ ២០ ដំបូង)",
        "ច្បាប់រក្សាម៉ាស និងតុល្យភាពសមីការគីមី",
      ],
      en: [
        "Atoms, Molecules, and Chemical Elements",
        "Periodic Table (First 20 Elements)",
        "Conservation of Mass and Balancing Equations",
      ],
    },
    biology: {
      km: [
        "ប្រព័ន្ធរំលាយអាហាររបស់មនុស្ស",
        "ប្រព័ន្ធរបត់ឈាម និងប្រព័ន្ធដង្ហើម",
        "ការលូតលាស់ និងសារធាតុចិញ្ចឹមរុក្ខជាតិ",
      ],
      en: [
        "Human Digestive System",
        "Circulatory and Respiratory Systems",
        "Plant Growth and Nutrient Transport",
      ],
    },
    earth: {
      km: [
        "ផ្លាកតិចតូនិច និងចលនាផែនដី",
        "បន្ទុះភ្នំភ្លើង និងការរញ្ជួយដី",
        "បរិយាកាស និងការប្រែប្រួលអាកាសធាតុ",
      ],
      en: [
        "Plate Tectonics and Continental Drift",
        "Volcanoes and Earthquakes",
        "Atmospheric Layers and Global Climate",
      ],
    },
    khmer: {
      km: [
        "រឿងទុំទាវ (ការវិភាគតួអង្គ និងសង្គម)",
        "ការប្រើប្រាស់សំនួនវោហារ និងពាក្យកម្ចីបាលី-សំស្ក្រឹត",
        "តែងសេចក្តីពន្យល់ និងពិភាក្សា",
      ],
      en: [
        "Tum Teav Literature Analysis",
        "Pali and Sanskrit Loanwords in Khmer",
        "Explanatory and Discussion Essays",
      ],
    },
    english: {
      km: [
        "Past Simple & Past Continuous Tenses",
        "Comparatives and Superlatives",
        "Environmental and Science Vocabulary",
      ],
      en: [
        "Past Simple & Past Continuous Tenses",
        "Comparatives and Superlatives",
        "Environmental and Science Vocabulary",
      ],
    },
    ict: {
      km: [
        "កម្មវិធីគណនាបញ្ជី (Spreadsheet / Microsoft Excel)",
        "ការបង្កើតបទបង្ហាញស្លាយ (Slide Presentation)",
        "សុវត្ថិភាពអ៊ីមែល និងគណនីអនឡាញ",
      ],
      en: [
        "Spreadsheet Data & Formulas",
        "Presentation Design and Slides",
        "Email Etiquette and Account Security",
      ],
    },
    history: {
      km: [
        "ការបង្រួបបង្រួមជាតិ និងការកកើតអាណាចក្រអង្គរ",
        "ព្រះបាទជ័យវរ្ម័នទី ២ និងព្រះបាទសូរ្យវរ្ម័នទី ២",
        "សង្គម សេដ្ឋកិច្ច និងប្រព័ន្ធធារាសាស្ត្រអង្គរ",
      ],
      en: [
        "Rise of the Angkor Empire (Jayavarman II)",
        "Reign of Suryavarman II and Angkor Wat",
        "Angkorian Society, Economy, and Hydrology",
      ],
    },
    geography: {
      km: [
        "អាកាសធាតុខ្យល់មូសុងនៅកម្ពុជា",
        "ធនធានជលផល និងកសិកម្មដាំដុះស្រូវ",
        "ការគ្រប់គ្រងទឹកជំនន់ និងគ្រោះរាំងស្ងួត",
      ],
      en: [
        "Monsoon Climate and Seasons in Cambodia",
        "Fisheries and Rice Agriculture",
        "Flood and Drought Management",
      ],
    },
  },
  9: {
    mathematics: {
      km: [
        "ប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអញ្ញាត (ត្រៀមឌីប្លូម)",
        "សមីការដឺក្រេទី២ និងរូបមន្តឌីសគ្រីមីណង់ Δ",
        "ត្រីកោណប៉ុនគ្នា ត្រីកោណដូចគ្នា និងទ្រឹស្តីបទតាលែស",
        "ប្រូបាប៊ីលីតេបឋម និងស្ថិតិអនុវត្ត",
      ],
      en: [
        "Systems of Linear Equations (Brevet)",
        "Quadratic Equations and Discriminant Δ",
        "Triangle Congruence, Similarity, and Thales Theorem",
        "Basic Probability and Applied Statistics",
      ],
    },
    physics: {
      km: [
        "ច្បាប់អូម និងសៀគ្វីអគ្គិសនី (U = R · I ត្រៀមឌីប្លូម)",
        "ថាមពលអគ្គិសនី និងអានុភាព (P = U · I, E = P · t)",
        "ម៉ាញេទិច និងបាតុភូតเหนែអគ្គិសនី",
      ],
      en: [
        "Ohm's Law (U = R · I Brevet Exam)",
        "Electric Power and Energy (P = U · I, E = P · t)",
        "Magnetism and Electromagnetic Induction",
      ],
    },
    chemistry: {
      km: [
        "អាស៊ីត បាស និងកម្រិត pH ពី ០ ដល់ ១៤",
        "ប្រតិកម្មបន្សាបអាស៊ីត-បាស (HCl + NaOH → NaCl + H₂O)",
        "លោហៈ អលោហៈ និងស៊េរីសកម្មភាពលោហៈ",
      ],
      en: [
        "Acids, Bases, and pH Scale (0–14)",
        "Neutralization Reactions (Brevet Prep)",
        "Metals, Non-metals, and Activity Series",
      ],
    },
    biology: {
      km: [
        "ប្រព័ន្ធប្រសាទ និងសរីរាង្គវិញ្ញាណរបស់មនុស្ស",
        "ប្រព័ន្ធអង់ដូគ្រីន និងអ័រម៉ូន",
        "ការបន្តពូជរបស់មនុស្ស និងសុខភាពបន្តពូជ",
      ],
      en: [
        "Human Nervous System and Sense Organs",
        "Endocrine System and Hormones",
        "Human Reproductive System & Health",
      ],
    },
    earth: {
      km: [
        "ធនធានរ៉ែ ថាមពលប្រេងកាត និងឧស្ម័នធម្មជាតិ",
        "ប្រព័ន្ធព្រះអាទិត្យ ភព និងផ្កាយរណប",
        "ការបំពុលបរិស្ថាន និងការអភិរក្សធម្មជាតិ",
      ],
      en: [
        "Mineral, Petroleum, and Gas Resources",
        "Solar System, Planets, and Satellites",
        "Environmental Conservation in Cambodia",
      ],
    },
    khmer: {
      km: [
        "រឿងកុលាបប៉ៃលិន (ញ៉ុក ថែម - វិញ្ញាសាឌីប្លូម)",
        "វេយ្យាករណ៍ និងការវិភាគកន្សោមឃ្លា",
        "តែងសេចក្តីអត្ថាធិប្បាយ និងតែងសេចក្តីប្រៀបធៀប",
      ],
      en: [
        "Kolab Pailin Literature Analysis (Brevet)",
        "Khmer Advanced Syntax and Grammar",
        "Commentary and Comparative Essay Writing",
      ],
    },
    english: {
      km: [
        "Present Perfect & Future Forms (will / going to)",
        "First & Second Conditionals (If Clauses)",
        "Academic & Examination Writing Skills (Brevet Prep)",
      ],
      en: [
        "Present Perfect & Future Forms",
        "First & Second Conditionals",
        "National Brevet English Examination Skills",
      ],
    },
    ict: {
      km: [
        "មូលដ្ឋានគ្រឹះក្បួនដោះស្រាយ (Algorithm & Flowchart)",
        "ការសរសេរកូដដំបូង (Scratch / Python Basics)",
        "ការបង្កើតគេហទំព័រមូលដ្ឋាន (HTML & CSS Basics)",
      ],
      en: [
        "Algorithm and Flowchart Logic",
        "Introduction to Programming (Scratch / Python)",
        "Web Foundations (HTML & CSS Basics)",
      ],
    },
    history: {
      km: [
        "សម័យមហានគរ និងរជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧",
        "សម័យកណ្តាល (ចតុមុខ លង្វែក ឧដុង្គ)",
        "កម្ពុជាក្រោមអាណាព្យាបាលបារាំង (១៨៦៣-១៩៥៣)",
      ],
      en: [
        "Angkorian Golden Age (Jayavarman VII)",
        "Post-Angkor Period (Longvek, Oudong)",
        "French Protectorate Era (1863–1953)",
      ],
    },
    geography: {
      km: [
        "ប្រជាសាស្ត្រ និងការធ្វើចំណាកស្រុកនៅកម្ពុជា",
        "សក្តានុពលទេសចរណ៍វប្បធម៌ និងធម្មជាតិ",
        "កម្ពុជាក្នុងសមាហរណកម្មសេដ្ឋកិច្ចអាស៊ាន",
      ],
      en: [
        "Demographics and Migration in Cambodia",
        "Ecotourism and Cultural Tourism",
        "Cambodia in the ASEAN Economic Community",
      ],
    },
  },
  10: {
    mathematics: {
      km: [
        "តក្កវិទ្យា និងទ្រឹស្តីសំណុំ (Sets and Logic)",
        "អនុគមន៍ដឺក្រេទី២ ប៉ារ៉ាបូល និងអថេរភាព",
        "វ៉ិចទ័រក្នុងប្លង់ និងផលគុណស្កាលែ",
        "ត្រីកោណមាត្រ (រូបមន្តបូក និងរូបមន្តទ្វេមុំ)",
      ],
      en: [
        "Mathematical Logic and Set Theory",
        "Quadratic Functions and Parabolas",
        "Vectors in Plane and Dot Product",
        "Trigonometric Identities (Sum & Double Angles)",
      ],
    },
    physics: {
      km: [
        "ស៊ីនេម៉ាទិច ៖ ចលនាត្រង់ប្រែប្រួលស្មើ (v = at + v₀)",
        "ច្បាប់ញូតុនទាំង ៣ និងកម្លាំងកកិត",
        "ការងារ ថាមពលស៊ីនេទិច និងថាមពលប៉ូតង់ស្យែល",
      ],
      en: [
        "Kinematics: Uniformly Accelerated Motion",
        "Newton's Three Laws and Friction Forces",
        "Work, Kinetic, and Potential Energy",
      ],
    },
    chemistry: {
      km: [
        "រចនាសម្ព័ន្ធអាតូម និងការកំណត់ការកំណត់អេឡិចត្រុង",
        "សម្ព័ន្ធអ៊ីយ៉ុង និងសម្ព័ន្ធកូវ៉ាឡង់",
        "បរិមាណសារធាតុ ម៉ូល និងកំហាប់សូលុយស្យុង",
      ],
      en: [
        "Atomic Structure & Electron Configuration",
        "Ionic and Covalent Chemical Bonding",
        "Mole Concept and Solution Concentrations",
      ],
    },
    biology: {
      km: [
        "ជីវម៉ូលេគុល (កាបូអ៊ីដ្រាត ប្រូតេអ៊ីន ខ្លាញ់ DNA)",
        "អង់ស៊ីម និងកាតាលីករជីវសាស្ត្រ",
        "មីតូស និងមេយ៉ូស (ការបែងចែកកោសិកា)",
      ],
      en: [
        "Biomolecules (Carbohydrates, Lipids, Proteins)",
        "Enzymes and Metabolic Catalysts",
        "Cell Division: Mitosis and Meiosis",
      ],
    },
    earth: {
      km: [
        "ភូគព្ភសាស្ត្រប្រវត្តិ និងផូស៊ីល",
        "វដ្តធារាសាស្ត្រ និងការគ្រប់គ្រងអាងទន្លេ",
        "ធនធានថាមពលកកើតឡើងវិញនៅកម្ពុជា",
      ],
      en: [
        "Historical Geology and Fossil Records",
        "Hydrological Cycles and River Basin Management",
        "Renewable Energy Resources in Cambodia",
      ],
    },
    khmer: {
      km: [
        "រឿងស៊ីមអ្នកបើកឡាន (អក្សរសិល្ប៍ទំនើប)",
        "ទស្សនវិជ្ជាព្រះពុទ្ធសាសនាក្នុងអក្សរសាស្ត្រខ្មែរ",
        "តែងសេចក្តីបែបប្រៀបធៀប និងវែកញែក",
      ],
      en: [
        "Sim the Driver Literature Analysis",
        "Buddhist Philosophy in Khmer Culture",
        "Comparative and Analytical Essay Writing",
      ],
    },
    english: {
      km: [
        "Passive Voice in Scientific Texts",
        "Relative Clauses (who, which, that, where)",
        "STEM Reading & Report Writing",
      ],
      en: [
        "Passive Voice in Scientific Texts",
        "Relative Clauses",
        "STEM Reading & Report Writing",
      ],
    },
    ict: {
      km: [
        "ការសរសេរកូដ Python ៖ អថេរ លក្ខខណ្ឌ និងរង្វិលជុំ",
        "មូលដ្ឋានទិន្នន័យបឋម (Database Concepts)",
        "សន្តិសុខសាយប័រ និងសុវត្ថិភាពទិន្នន័យ",
      ],
      en: [
        "Python Programming: Variables, Conditions, Loops",
        "Database Foundations and Tables",
        "Cybersecurity and Data Protection",
      ],
    },
    history: {
      km: [
        "ចលនាតស៊ូដើម្បីឯករាជ្យជាតិ (១៩៤៥-១៩៥៣)",
        "សម័យសង្គមរាស្ត្រនិយម (១៩៥៣-១៩៧០)",
        "បដិវត្តន៍ឧស្សាហកម្ម និងសង្គ្រាមលោកលើកទី ១",
      ],
      en: [
        "Cambodian Independence Movement (1945–1953)",
        "Sangkum Reastr Niyum Era (1953–1970)",
        "Industrial Revolution and World War I",
      ],
    },
    geography: {
      km: [
        "ការប្រើប្រាស់ដី និងគម្របព្រៃឈើនៅកម្ពុជា",
        "នគរូបនីយកម្ម និងការរីកលូតលាស់នៃរាជធានីភ្នំពេញ",
        "ភូមិសាស្ត្រសេដ្ឋកិច្ចតំបន់អាស៊ីប៉ាស៊ីហ្វិក",
      ],
      en: [
        "Land Use and Forest Cover in Cambodia",
        "Urbanization and Growth of Phnom Penh",
        "Economic Geography of Asia-Pacific",
      ],
    },
  },
  11: {
    mathematics: {
      km: [
        "ស្វ៊ីតចំនួនពិត (ស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ)",
        "លីមីតនៃអនុគមន៍ត្រង់ចំណុច និងអនន្ត",
        "ដេរីវេ និងការអនុវត្តដេរីវេលើក្រាហ្វិក",
        "ធរណីមាត្រក្នុងលំហ (ប្លង់ បន្ទាត់ និងមុំក្នុងលំហ)",
      ],
      en: [
        "Sequences (Arithmetic and Geometric)",
        "Limits of Functions at Points and Infinity",
        "Derivatives and Graphical Curve Sketching",
        "3D Space Geometry (Planes, Lines, Vectors)",
      ],
    },
    physics: {
      km: [
        "ទែរម៉ូឌីណាមិច និងទ្រឹស្តីស៊ីនេទិចនៃឧស្ម័ន",
        "អគ្គិសនីស្ទាទិច និងដែនអគ្គិសនី",
        "ដែនម៉ាញេទិច និងកម្លាំងឡូរ៉ិន (Lorentz Force)",
      ],
      en: [
        "Thermodynamics and Kinetic Theory of Gases",
        "Electrostatics, Coulomb's Law, and Electric Fields",
        "Magnetic Fields and Lorentz Force",
      ],
    },
    chemistry: {
      km: [
        "ស៊ីនេទិចគីមី និងល្បឿនប្រតិកម្ម",
        "សមតុល្យគីមី និងគោលការណ៍ Le Chatelier",
        "គីមីសរីរាង្គ ៖ អ៊ីដ្រូកាបួ (អាល់កាន អាល់សែន អាល់ស៊ីន)",
      ],
      en: [
        "Chemical Kinetics and Reaction Rates",
        "Chemical Equilibrium and Le Chatelier's Principle",
        "Organic Chemistry: Hydrocarbons (Alkanes, Alkenes)",
      ],
    },
    biology: {
      km: [
        "រស្មីសំយោគ និងដង្ហើមកោសិកា (ATP Production)",
        "ការសំយោគប្រូតេអ៊ីន ៖ ចម្លងកូដ និងបកប្រែកូដ",
        "ច្បាប់តំណពូជរបស់មែនដែល (Mendelian Genetics)",
      ],
      en: [
        "Photosynthesis and Cellular Respiration (ATP)",
        "Protein Synthesis: Transcription and Translation",
        "Mendelian Genetics and Monohybrid Crosses",
      ],
    },
    earth: {
      km: [
        "មហាសមុទ្រវិទ្យា និងចរន្តទឹកសមុទ្រពិភពលោក",
        "បាតុភូតអែលនីញ៉ូ និងឡានីញ៉ា (El Niño & La Niña)",
        "ការគ្រប់គ្រងគ្រោះមហន្តរាយធម្មជាតិនៅអាស៊ី",
      ],
      en: [
        "Oceanography and Global Ocean Currents",
        "El Niño and La Niña Climate Oscillations",
        "Disaster Risk Reduction in Southeast Asia",
      ],
    },
    khmer: {
      km: [
        "រឿងថៅកែចិត្រ (ការវិភាគវិសមភាពសង្គម)",
        "រឿងទន្សាយផ្ចាញ់ខ្លា (គតិបណ្ឌិតប្រជាប្រិយខ្មែរ)",
        "តែងសេចក្តីពន្យល់បែបអក្សរសិល្ប៍កម្រិតខ្ពស់",
      ],
      en: [
        "Thao Ke Chet Literature Analysis",
        "Khmer Folk Tales and Folkloric Wisdom",
        "Advanced Literary Exposition Essay",
      ],
    },
    english: {
      km: [
        "Reported Speech (Direct to Indirect)",
        "Modal Verbs of Deduction (must, can't, might)",
        "IELTS/TOEFL Style Reading Passages",
      ],
      en: [
        "Reported Speech",
        "Modal Verbs of Deduction",
        "IELTS/TOEFL Style Academic Reading",
      ],
    },
    ict: {
      km: [
        "រចនាសម្ព័ន្ធទិន្នន័យ (Lists, Dictionaries, Arrays)",
        "ការអភិវឌ្ឍគេហទំព័រអន្តរកម្ម (JavaScript)",
        "បញ្ញាសិប្បនិម្មិត (AI) និងទិន្នន័យធំ (Big Data)",
      ],
      en: [
        "Data Structures (Arrays, Lists, Dictionaries)",
        "Web Interactivity with JavaScript",
        "Artificial Intelligence & Big Data Basics",
      ],
    },
    history: {
      km: [
        "របបសាធារណរដ្ឋខ្មែរ (១៩៧០-១៩៧៥)",
        "របបកម្ពុជាប្រជាធិបតេយ្យ (១៩៧៥-១៩៧៩)",
        "សង្គ្រាមលោកលើកទី ២ និងសង្គ្រាមត្រជាក់",
      ],
      en: [
        "Khmer Republic Era (1970–1975)",
        "Democratic Kampuchea Regime (1975–1979)",
        "World War II and Cold War in Asia",
      ],
    },
    geography: {
      km: [
        "ការអភិវឌ្ឍខ្សែក្រវាត់សេដ្ឋកិច្ចតំបន់ឆ្នេរកម្ពុជា",
        "ច្រករបៀងសេដ្ឋកិច្ចមហាអនុតំបន់មេគង្គ (GMS)",
        "បញ្ហាបរិស្ថានសកល និងការអភិរក្សជីវចម្រុះ",
      ],
      en: [
        "Coastal Economic Zone Development in Cambodia",
        "Greater Mekong Subregion (GMS) Corridors",
        "Global Biodiversity and Conservation",
      ],
    },
  },
  12: {
    mathematics: {
      km: [
        "អាំងតេក្រាលកំណត់ និងការគណនាផ្ទៃក្រឡា-មាឌ (ត្រៀមបាក់ឌុប)",
        "ចំនួនកុំផ្លិច និងទម្រង់ត្រីកោណមាត្រ",
        "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ និងទី២",
        "ធរណីមាត្រក្នុងលំហ ៖ សមីការប្លង់ និងបន្ទាត់",
        "ប្រូបាប៊ីលីតេ (បន្សំ ច្រាស់ និងចៃដន្យ)",
      ],
      en: [
        "Definite Integrals & Volume Calculation (BacII Prep)",
        "Complex Numbers & Trigonometric Form",
        "First & Second Order Differential Equations",
        "Analytical 3D Geometry: Planes & Lines",
        "Probability: Combinations & Binomial Distribution",
      ],
    },
    physics: {
      km: [
        "លំយោលសេរី ៖ ប៉ោលទោល និងប៉ោលអេឡាស្ទិច (ត្រៀមបាក់ឌុប)",
        "សៀគ្វីចរន្តឆ្លាស់ RLC និងបាតុភូតរ៉េសូណង់",
        "រលកមេកានិច និងរលកអេឡិចត្រូម៉ាញេទិច",
        "រូបវិទ្យានុយក្លេអ៊ែរ ៖ វិទ្យុសកម្ម និងប្រតិកម្មបំបែក-ច្របល់",
      ],
      en: [
        "Free Oscillations: Pendulums (BacII Prep)",
        "AC Circuits: RLC & Resonance Phenomena",
        "Mechanical and Electromagnetic Waves",
        "Nuclear Physics: Radioactivity, Fission & Fusion",
      ],
    },
    chemistry: {
      km: [
        "អាស៊ីត-បាសខ្លាំងនិងខ្សោយ គណនា pH និង titration (ត្រៀមបាក់ឌុប)",
        "សមាសធាតុសរីរាង្គ ៖ អាល់កុល អាល់ដេអ៊ីត សេតូន អាស៊ីតកាបុកស៊ីលិច",
        "អេស្ទែរ ខ្លាញ់ និងប្រតិកម្មសាប៊ូកម្ម (Saponification)",
        "អេឡិចត្រូគីមី ៖ ពីលហ្គាល់វ៉ានិច និងអេឡិចត្រូលីស",
      ],
      en: [
        "Acids-Bases, pH Calculations & Titration (BacII)",
        "Organic Functional Groups: Alcohols, Aldehydes, Acids",
        "Esters, Lipids, and Saponification Reactions",
        "Electrochemistry: Galvanic Cells and Electrolysis",
      ],
    },
    biology: {
      km: [
        "ហ្សែនវិទ្យាម៉ូលេគុល (DNA Replication, RNA, Genetic Code ត្រៀមបាក់ឌុប)",
        "ការបំប្លែងហ្សែន (Mutations) និងវិស្វកម្មហ្សែន",
        "ទ្រឹស្តីវិវត្តន៍នៃភាវៈរស់ (Darwinism & Natural Selection)",
        "ប្រព័ន្ធការពាររាងកាយ (Immunology) និងវ៉ាក់សាំង",
      ],
      en: [
        "Molecular Genetics: DNA, RNA & Genetic Code (BacII)",
        "Genetic Mutations and Biotechnology",
        "Evolutionary Biology and Natural Selection",
        "Immunology, Antibodies, and Vaccines",
      ],
    },
    earth: {
      km: [
        "តារារូបវិទ្យា ជីវិតផ្កាយ និងប្រហោងខ្មៅ (Astrophysics)",
        "ការគ្រប់គ្រងធនធានទឹក និងទំនប់វារីអគ្គិសនីទន្លេមេគង្គ",
        "យុទ្ធសាស្ត្រជាតិស្តីពីការប្រែប្រួលអាកាសធាតុ (MoEYS Policy)",
      ],
      en: [
        "Astrophysics, Star Lifecycles, and Black Holes",
        "Water Governance & Mekong Hydropower Dams",
        "Cambodia Climate Change Strategic Plan",
      ],
    },
    khmer: {
      km: [
        "រឿងរាមកេរ្តិ៍ខ្មែរ (អក្សរសិល្ប៍បុរាណ - វិញ្ញាសាបាក់ឌុប)",
        "រឿងភូមិតិរច្ឆាន (ឌឹក គាម & ឌឿក អំ - វិញ្ញាសាបាក់ឌុប)",
        "ការតែងសេចក្តីបែបពន្យល់ ពិភាក្សា និងប្រៀបធៀបបាក់ឌុប",
      ],
      en: [
        "Reamker Classical Literature (BacII Exam)",
        "Phum Tirachhan Literature Analysis (BacII Exam)",
        "National BacII Advanced Essay Composition",
      ],
    },
    english: {
      km: [
        "Advanced Conditionals (Mixed Conditionals & Inversion)",
        "Academic STEM Essay Writing (BacII English Prep)",
        "Complex Sentence Structures & Formal Registers",
      ],
      en: [
        "Advanced Conditionals & Inversions",
        "Academic STEM Essay Writing (BacII Prep)",
        "Complex Reading Analysis & Formal Registers",
      ],
    },
    ict: {
      km: [
        "ការរចនា និងសរសេរសំណួរមូលដ្ឋានទិន្នន័យ SQL",
        "ការបង្កើតកម្មវិធីគេហទំព័រពេញលេញ (Full-Stack Web)",
        "សីលធម៌បញ្ញាសិប្បនិម្មិត (AI Ethics) និងអនាគតការងារឌីជីថល",
      ],
      en: [
        "Relational Databases and SQL Queries",
        "Full-Stack Web Application Architecture",
        "AI Ethics, Data Privacy, and Future of Work",
      ],
    },
    history: {
      km: [
        "ដំណើរការស្វែងរកសន្តិភាព និងកិច្ចព្រមព្រៀងប៉ារីស (១៩៩១)",
        "ការបង្កើតព្រះរាជាណាចក្រកម្ពុជាទី ២ (១៩៩៣-បច្ចុប្បន្ន)",
        "នយោបាយឈ្នះ-ឈ្នះ និងសន្តិភាពពេញលេញនៅកម្ពុជា",
      ],
      en: [
        "Paris Peace Accords (1991) and UNTAC Mission",
        "Kingdom of Cambodia Second Monarchy (1993–Present)",
        "Win-Win Policy and Complete Peace in Cambodia",
      ],
    },
    geography: {
      km: [
        "ប្លង់គោលអភិវឌ្ឍន៍សេដ្ឋកិច្ចសង្គមកម្ពុជាចក្ខុវិស័យ ២០៥០",
        "ច្រកទ្វារពាណិជ្ជកម្មអន្តរជាតិ និងកំពង់ផែស្វយ័តក្រុងព្រះសីហនុ",
        "ការអភិវឌ្ឍប្រកបដោយចីរភាព (SDGs) នៅអាស៊ីអាគ្នេយ៍",
      ],
      en: [
        "Cambodia Vision 2050 Socio-Economic Master Plan",
        "International Logistics & Sihanoukville Port",
        "Sustainable Development Goals (SDGs) in ASEAN",
      ],
    },
  },
};

