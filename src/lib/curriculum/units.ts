// ==============================================================================
// ScienceKH — Official MoEYS Curriculum Unit Architecture (Grades 7–12)
// Aligned with the National Ministry of Education, Youth and Sport Standards
// Structures subjects into sequential Units (ជំពូក) with prerequisites & milestones
// ==============================================================================

import type { LessonNode } from "@/components/features/curriculum/learning-path";

export interface CurriculumUnitDefinition {
  id: string;
  unitNumber: number;
  title_km: string;
  title_en: string;
  description_km: string;
  description_en: string;
  icon?: string;
  lessonIds: string[];
}

// Predefined official MoEYS Units for all 10+ core subjects (Grades 7–12)
export const MOEYS_UNITS_REGISTRY: Record<string, CurriculumUnitDefinition[]> = {
  // ============================================================================
  // GRADE 7 — JUNIOR HIGH FOUNDATION (អនុវិទ្យាល័យ ថ្នាក់ទី ៧)
  // ============================================================================
  "7-mathematics": [
    {
      id: "unit-g7-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ចំនួនគត់ និងចំនួនគត់រ៉ឺឡាទីប",
      title_en: "Unit 1: Integers & Signed Numbers",
      description_km: "សញ្ញាណចំនួនគត់ ឫសការេ ឫសគូប កត្តាបឋម ប.ម.ធ ព.គ.ទ និងប្រមាណវិធីលើចំនួនគត់រ៉ឺឡាទីប",
      description_en: "Natural numbers, square/cube roots, prime factorization, GCD, LCM, and signed integer arithmetic",
      icon: "🔢",
      lessonIds: ["les-g7-math-01", "les-g7-math-02", "les-g7-math-03"],
    },
    {
      id: "unit-g7-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ប្រភាគ ចំនួនទសភាគ និងភាគរយ",
      title_en: "Unit 2: Fractions, Decimals & Percentages",
      description_km: "ប្រភាគសមមូល ប្រមាណវិធីលើប្រភាគ ចំនួនទសភាគ និងការគណនាភាគរយ-ការប្រាក់",
      description_en: "Equivalent fractions, decimal operations, percentages, discounts, and simple commercial interest",
      icon: "🥧",
      lessonIds: ["les-g7-math-04", "les-g7-math-05", "les-g7-math-06"],
    },
    {
      id: "unit-g7-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ស្វ័យគុណ និងពីជគណិត",
      title_en: "Unit 3: Powers & Algebra",
      description_km: "វិធានស្វ័យគុណ កន្សោមពីជគណិត សមីការដឺក្រេទី១ វិសមភាព និងផលធៀប-សមាមាត្រ",
      description_en: "Exponent laws, algebraic expressions, linear equations ax+b=c, inequalities, and proportions",
      icon: "⚡",
      lessonIds: [
        "les-g7-math-07",
        "les-g7-math-08",
        "les-g7-math-09",
        "les-g7-math-10",
        "les-g7-math-11",
      ],
    },
    {
      id: "unit-g7-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ធរណីមាត្រក្នុងប្លង់ និងសូលីត",
      title_en: "Unit 4: Geometry & 3D Solids",
      description_km: "ចំណុច បន្ទាត់ មុំ បន្ទាត់ស្រប-កែង ត្រីកោណ បរិមាត្រ ផ្ទៃក្រឡា រង្វង់ មាឌគូប និងភាពឆ្លុះ",
      description_en: "Lines, angles, parallel transversals, triangles, polygon areas, circles, 3D solids, and reflections",
      icon: "📐",
      lessonIds: [
        "les-g7-math-12",
        "les-g7-math-13",
        "les-g7-math-14",
        "les-g7-math-15",
        "les-g7-math-16",
        "les-g7-math-17",
        "les-g7-math-18",
        "les-g7-math-19",
      ],
    },
    {
      id: "unit-g7-math-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ ស្ថិតិ និងប្រូបាប",
      title_en: "Unit 5: Statistics & Probability",
      description_km: "ការពិសោធន៍ចៃដន្យ គណនាប្រូបាប តារាងប្រេកង់ ដ្យាក្រាមក្រាបសសរ និងក្រាបផ្ចិត",
      description_en: "Random experiments, probability P(A)=m/n, frequency tables, bar charts, and circular pie charts",
      icon: "📊",
      lessonIds: ["les-g7-math-20", "les-g7-math-21", "les-g7-math-22"],
    },
  ],

  "7-khmer": [
    {
      id: "unit-g7-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ កាព្យឃ្លោងខ្មែរ និងវេយ្យាករណ៍គ្រឹះ",
      title_en: "Classical Poetic Meters & Grammar",
      description_km: "ចង្វាក់បទកាកគតិ បទពាក្យ ៧ ថ្នាក់ពាក្យ នាម កិរិយា និងគុណនាម",
      description_en: "Kak-Kati & 7-syllable poetic meters, parts of speech, and descriptive essays",
      icon: "📖",
      lessonIds: ["les-g7-khmer-01", "les-g7-khmer-02"],
    },
  ],

  "7-physics": [
    {
      id: "unit-g7-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ការវាស់វែង ខ្នាត SI និងដង់ស៊ីតេ",
      title_en: "Measurement, SI Units & Density",
      description_km: "ប្រព័ន្ធខ្នាតអន្តរជាតិ SI ម៉ាស មាឌ និងរូបមន្តដង់ស៊ីតេ",
      description_en: "Standard SI base units, mass, volume, and density calculations",
      icon: "⚖️",
      lessonIds: ["les-g7-phys-01", "les-g7-phys-02"],
    },
    {
      id: "unit-g7-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ម៉ាស៊ីនសាមញ្ញ និងកម្ដៅ",
      title_en: "Simple Machines & Thermal Expansion",
      description_km: "រ៉ក ឃ្នាស់ របងជម្រាល និងការរីកមាឌនៃរូបធាតុពេលត្រូវកម្ដៅ",
      description_en: "Levers, pulleys, inclined planes, and thermal expansion of matter",
      icon: "⚙️",
      lessonIds: ["les-g7-phys-03", "les-g7-phys-04", "les-g7-phys-05"],
    },
  ],

  "7-chemistry": [
    {
      id: "unit-g7-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សារធាតុបរិសុទ្ធ ល្បាយ និងវិធីញែក",
      title_en: "Pure Substances, Mixtures & Separation",
      description_km: "ល្បាយស្មើសាច់ មិនស្មើសាច់ វិធីច្រោះ ការរំហួត និងការបំណិត",
      description_en: "Homogeneous/heterogeneous mixtures, filtration, evaporation, and distillation",
      icon: "🧪",
      lessonIds: ["les-g7-chem-01", "les-g7-chem-02"],
    },
    {
      id: "unit-g7-chem-2",
      unitNumber: 2,
      title_km: "បាតុភូតរូប គីមី ទឹក និងខ្យល់",
      title_en: "Physical/Chemical Changes, Water & Air",
      description_km: "បម្រែបម្រួលរូប និងគីមី សមាសភាពទឹក និងខ្យល់ក្នុងបរិយាកាស",
      description_en: "Physical vs chemical reactions, water states, and atmospheric air gases",
      icon: "⚗️",
      lessonIds: ["les-g7-chem-03", "les-g7-chem-04", "les-g7-chem-05"],
    },
  ],

  "7-biology": [
    {
      id: "unit-g7-bio-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ កោសិកា និងចំណាត់ថ្នាក់ភាវៈរស់",
      title_en: "Cells & Classification of Living Things",
      description_km: "រចនាសម្ព័ន្ធកោសិការុក្ខជាតិ និងសត្វ ព្រមទាំងអាណាចក្រភាវៈរស់ទាំង ៥",
      description_en: "Plant and animal cell structures, organelles, and the five biological kingdoms",
      icon: "🔬",
      lessonIds: ["les-g7-bio-01", "les-g7-bio-02"],
    },
    {
      id: "unit-g7-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ រុក្ខជាតិ និងច្រវាក់អាហារអេកូឡូស៊ី",
      title_en: "Plant Physiology & Food Chains",
      description_km: "រចនាសម្ព័ន្ធរុក្ខជាតិ ការសំយោគពន្លឺ ច្រវាក់អាហារ និងបណ្តាញអាហារ",
      description_en: "Plant anatomy, photosynthesis basics, producers, consumers, and food webs",
      icon: "🌱",
      lessonIds: ["les-g7-bio-03", "les-g7-bio-04", "les-g7-bio-05"],
    },
  ],

  "7-earth": [
    {
      id: "unit-g7-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ស្រទាប់ផែនដី វដ្តថ្ម និងវដ្តទឹក",
      title_en: "Earth Layers, Rock & Water Cycles",
      description_km: "សំបកផែនដី ម៉ង់តូ ស្នូល ប្រភេទថ្មទាំង ៣ និងដំណាក់កាលនៃវដ្តទឹក",
      description_en: "Crust, mantle, core, igneous/sedimentary/metamorphic rocks, and water cycle",
      icon: "🌍",
      lessonIds: ["les-g7-earth-01", "les-g7-earth-02", "les-g7-earth-03"],
    },
    {
      id: "unit-g7-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ បរិយាកាស និងការប្រែប្រួលអាកាសធាតុ",
      title_en: "Atmosphere & Weather Systems",
      description_km: "ស្រទាប់បរិយាកាស សម្ពាធខ្យល់ របបពពក និងទឹកភ្លៀង",
      description_en: "Atmospheric strata, barometric pressure, cloud types, and precipitation",
      icon: "☁️",
      lessonIds: ["les-g7-earth-04", "les-g7-earth-05"],
    },
  ],

  "7-history": [
    {
      id: "unit-g7-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ បុរេប្រវត្តិសាស្ត្រកម្ពុជា និងការកកើតនគរភ្នំ",
      title_en: "Cambodian Prehistory & Rise of Funan",
      description_km: "ស្ថានីយល្អាងស្ពាន សំរោងសែន និងពាណិជ្ជកម្មកំពង់ផែអូរកែវនៃនគរភ្នំ",
      description_en: "Prehistoric archaeological sites and maritime commerce through the Oc Eo entrepôt",
      icon: "🏛️",
      lessonIds: ["les-g7-hist-01", "les-g7-hist-02"],
    },
  ],

  "7-geography": [
    {
      id: "unit-g7-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ភូមិសាស្ត្ររូបវន្តកម្ពុជា ជួរភ្នំ និងប្រព័ន្ធទឹក",
      title_en: "Physical Geography: Landforms & Hydrology",
      description_km: "ទន្លេមេគង្គ បឹងទន្លេសាប ជួរភ្នំក្រវាញ-ដងរែក និងរបបខ្យល់មូសុង",
      description_en: "Cardamom & Dangrek ranges, Mekong-Tonle Sap basin, and tropical monsoons",
      icon: "🗺️",
      lessonIds: ["les-g7-geo-01", "les-g7-geo-02"],
    },
  ],

  "7-english": [
    {
      id: "unit-g7-eng-1",
      unitNumber: 1,
      title_km: "Present & Past Tenses in Daily Life",
      title_en: "Present & Past Tenses in Daily Life",
      description_km: "កាលបច្ចុប្បន្ន និងអតីតកាលធម្មតា កិរិយាស័ព្ទប្រក្រតី/មិនប្រក្រតី និងការសន្ទនា",
      description_en: "Present simple, past simple narrative structures, and everyday school vocabulary",
      icon: "🔤",
      lessonIds: ["les-g7-eng-01", "les-g7-eng-02"],
    },
  ],

  "7-ict": [
    {
      id: "unit-g7-ict-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ផ្នែករឹងកុំព្យូទ័រ និងការវាយអក្សរខ្មែរយូនីកូដ",
      title_en: "Computer Hardware & Khmer Unicode Typing",
      description_km: "ស្ថាបត្យកម្ម CPU, RAM ប្លង់ក្តារចុចយូនីកូដ (Coeng) និងការរៀបចំឯកសារ",
      description_en: "Core processor architecture, memory, Khmer subscript typing, and word processing",
      icon: "💻",
      lessonIds: ["les-g7-ict-01", "les-g7-ict-02"],
    },
  ],

  "7-morality": [
    {
      id: "unit-g7-moral-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សីលធម៌ក្នុងគ្រួសារ និងសិទ្ធិកុមារ",
      title_en: "Family Ethics & Child Rights",
      description_km: "កតញ្ញូតាធម៌ សិទ្ធិទាំងបួនរបស់កុមារ និងកាតព្វកិច្ចសិស្សក្នុងសាលារៀន",
      description_en: "Filial piety, UNCRC four child rights pillars, and student civic duties",
      icon: "🤝",
      lessonIds: ["les-g7-moral-01", "les-g7-moral-02"],
    },
  ],

  // ============================================================================
  // GRADE 8 — JUNIOR HIGH INTERMEDIATE (អនុវិទ្យាល័យ ថ្នាក់ទី ៨)
  // ============================================================================
  "8-mathematics": [
    {
      id: "unit-g8-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ចំនួនសនិទាន និងពន្លាតពីជគណិត",
      title_en: "Rational Numbers & Algebraic Expansions",
      description_km: "ចំនួនសនិទាន អសនិទាន រូបមន្តពន្លាត (a±b)² និងការដាក់ជាផលគុណកត្តា",
      description_en: "Rational vs irrational numbers, remarkable binomial identities, and factorization",
      icon: "📐",
      lessonIds: ["les-g8-math-01", "les-g8-math-02", "les-g8-math-06"],
    },
    {
      id: "unit-g8-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ វិសមីការ និងចំណោទប្រព័ន្ធសមីការ",
      title_en: "Inequalities & Applied System Problems",
      description_km: "វិសមីការដឺក្រេទី១ មានមួយអញ្ញាត និងចំណោទដោះស្រាយដោយប្រព័ន្ធសមីការ",
      description_en: "Linear inequalities, negative sign reversal rules, and word problem modeling",
      icon: "⚖️",
      lessonIds: ["les-g8-math-04", "les-g8-math-10"],
    },
    {
      id: "unit-g8-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ទ្រឹស្តីបទពីតាក័រ និងត្រីកោណប៉ុនគ្នា",
      title_en: "Pythagorean Theorem & Triangle Congruence",
      description_km: "ទ្រឹស្តីបទពីតាក័រ c² = a² + b² ចតុកោណពិសេស និងករណីប៉ុនគ្នា (SSS, SAS, ASA)",
      description_en: "Pythagorean theorem, right-triangle geometry, and congruent triangle proofs",
      icon: "📏",
      lessonIds: ["les-g8-math-03", "les-g8-math-05", "les-g8-math-07"],
    },
    {
      id: "unit-g8-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ធរណីមាត្រមាឌ និងស្ថិតិអនុវត្ត",
      title_en: "Curved Solids & Grouped Statistics",
      description_km: "មាឌស៊ីឡាំង កោន ស្វ៊ែរ មធ្យមនព្វន្ត និងការសង់អ៊ីស្តូក្រាមទិន្នន័យ",
      description_en: "Cylinder, cone, and sphere volumes, weighted means, and frequency histograms",
      icon: "📊",
      lessonIds: ["les-g8-math-08", "les-g8-math-09"],
    },
  ],

  "8-khmer": [
    {
      id: "unit-g8-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ រឿងទុំទាវ និងពាក្យកម្ចីបាលី-សំស្ក្រឹត",
      title_en: "Tum Teav Literature & Classical Loanwords",
      description_km: "ការវិភាគតួអង្គទុំ ទាវ នោ ម៉ឺនងួន និងវិធានពាក្យកម្ចីបាលី-សំស្ក្រឹត",
      description_en: "Character analysis in Tum Teav and Pali-Sanskrit loanword identification rules",
      icon: "📜",
      lessonIds: ["les-g8-khmer-01", "les-g8-khmer-02"],
    },
  ],

  "8-physics": [
    {
      id: "unit-g8-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ កម្លាំង សម្ពាធ និងការងារមេកានិច",
      title_en: "Forces, Pressure & Mechanical Work",
      description_km: "សម្ពាធអង្គធាតុរាវ សម្ពាធបរិយាកាស និងការងារមេកានិច W = F · d",
      description_en: "Fluid pressure, hydrostatic laws, mechanical work W = F·d, and power",
      icon: "⚡",
      lessonIds: ["les-g8-phys-01", "les-g8-phys-02"],
    },
    {
      id: "unit-g8-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ អគ្គិសនីឋិតិវន្ត និងពន្លឺ",
      title_en: "Static Electricity & Optics",
      description_km: "បន្ទុកអគ្គិសនី អគ្គិសនីកម្ម ចរន្តអគ្គិសនី និងការសាយភាយពន្លឺ",
      description_en: "Electric charges, static discharge, electric current, and rectilinear light travel",
      icon: "💡",
      lessonIds: ["les-g8-phys-03", "les-g8-phys-04", "les-g8-phys-05"],
    },
  ],

  "8-chemistry": [
    {
      id: "unit-g8-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អាតូម ម៉ូលេគុល និងតារាងខួប",
      title_en: "Atoms, Molecules & Periodic Table",
      description_km: "រចនាសម្ព័ន្ធអាតូម និមិត្តសញ្ញាធាតុ និងតារាងខួប ២០ ធាតុដំបូង",
      description_en: "Atomic structure, chemical element symbols, and the first 20 periodic elements",
      icon: "⚛️",
      lessonIds: ["les-g8-chem-01", "les-g8-chem-02"],
    },
    {
      id: "unit-g8-chem-2",
      unitNumber: 2,
      title_km: "ច្បាប់រក្សាម៉ាស និងតុល្យភាពសមីការ",
      title_en: "Conservation of Mass & Chemical Equations",
      description_km: "ច្បាប់ឡាវ័រហ្ស៊ីយេ តុល្យភាពសមីការគីមី អុកស៊ីសែន និងអ៊ីដ្រូសែន",
      description_en: "Lavoisier law of mass conservation, stoichiometric equation balancing, and gases",
      icon: "⚖️",
      lessonIds: ["les-g8-chem-03", "les-g8-chem-04", "les-g8-chem-05"],
    },
  ],

  "8-biology": [
    {
      id: "unit-g8-bio-1",
      unitNumber: 1,
      title_km: "ប្រព័ន្ធរំលាយអាហារ និងប្រព័ន្ធរបត់ឈាម",
      title_en: "Digestive & Circulatory Systems",
      description_km: "សរីរាង្គរំលាយអាហារ ការបំប្លែងជីវជាតិ បេះដូង និងចរន្តឈាមរត់",
      description_en: "Digestive tract organs, nutrient assimilation, human heart anatomy, and blood loop",
      icon: "🫀",
      lessonIds: ["les-g8-bio-01", "les-g8-bio-02"],
    },
    {
      id: "unit-g8-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ប្រព័ន្ធដង្ហើម និងការបញ្ចេញចោល",
      title_en: "Respiratory & Excretory Systems",
      description_km: "សួត ការផ្លាស់ប្តូរឧស្ម័ន តម្រងនោម និងការបញ្ចេញកាកសំណល់ពីរាងកាយ",
      description_en: "Lungs, alveolar gas exchange, kidneys, nephron filtration, and homeostasis",
      icon: "🫁",
      lessonIds: ["les-g8-bio-03", "les-g8-bio-04", "les-g8-bio-05"],
    },
  ],

  "8-earth": [
    {
      id: "unit-g8-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ផ្លាកតិចតូនិច ភ្នំភ្លើង និងការរញ្ជួយដី",
      title_en: "Plate Tectonics, Volcanoes & Earthquakes",
      description_km: "ចលនាផ្លាកតិចតូនិច បន្ទុះភ្នំភ្លើង រលកស៊ូណាមិ និងគ្រោះរញ្ជួយដី",
      description_en: "Continental drift, fault lines, volcanic eruptions, and earthquake Richter scales",
      icon: "🌋",
      lessonIds: ["les-g8-earth-01", "les-g8-earth-02", "les-g8-earth-03"],
    },
    {
      id: "unit-g8-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ បរិយាកាស និងធនធានធម្មជាតិ",
      title_en: "Atmospheric Layers & Natural Reserves",
      description_km: "ស្រទាប់អូហ្សូន បាតុភូតផ្ទះកញ្ចក់ និងការគ្រប់គ្រងធនធានធម្មជាតិ",
      description_en: "Ozone layer protection, greenhouse effect, and sustainable natural resources",
      icon: "☀️",
      lessonIds: ["les-g8-earth-04", "les-g8-earth-05"],
    },
  ],

  "8-history": [
    {
      id: "unit-g8-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សម័យមហានគរ ការកកើត និងការកសាងអង្គរវត្ត",
      title_en: "Angkor Empire: Foundation & Angkor Wat",
      description_km: "ពិធីទេវរាជ គ.ស. ៨០២ រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ និងស្ថាបត្យកម្មប្រាសាទអង្គរវត្ត",
      description_en: "The 802 AD Devaraja consecration, reign of Suryavarman II, and Angkor Wat temple architecture",
      icon: "🏰",
      lessonIds: ["les-g8-hist-01", "les-g8-hist-02"],
    },
  ],

  "8-geography": [
    {
      id: "unit-g8-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អាកាសធាតុកម្ពុជា កសិកម្ម និងប្រព័ន្ធធារាសាស្ត្រ",
      title_en: "Climate, Paddy Agriculture & Irrigation",
      description_km: "ខ្យល់មូសុង របបទឹកភ្លៀង ការដាំដុះស្រូវវស្សា-ប្រាំង និងទំនើបកម្មកសិកម្ម",
      description_en: "Monsoon regimes, wet/dry season paddy cultivation, and national irrigation networks",
      icon: "🌧️",
      lessonIds: ["les-g8-geo-01", "les-g8-geo-02"],
    },
  ],

  "8-english": [
    {
      id: "unit-g8-eng-1",
      unitNumber: 1,
      title_km: "Narratives & Modal Auxiliaries in Action",
      title_en: "Narratives & Modal Auxiliaries in Action",
      description_km: "កិរិយាស័ព្ទមិនទៀងទាត់ កាលអតីតកាល និង modal verbs (Must, Should, Can)",
      description_en: "Irregular past narratives, obligations, prohibitions, and recommendation modals",
      icon: "📝",
      lessonIds: ["les-g8-eng-01", "les-g8-eng-02"],
    },
  ],

  "8-ict": [
    {
      id: "unit-g8-ict-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សន្លឹកកិច្ចការអេឡិចត្រូនិក និងការវិភាគទិន្នន័យ",
      title_en: "Spreadsheets & Numerical Analysis",
      description_km: "រូបមន្តគណិតវិទ្យា អនុគមន៍ SUM, AVERAGE, MAX និងការបង្កើតគំនូសតាង Charts",
      description_en: "Formulas, cell references, aggregate calculations, and visual data charting",
      icon: "📈",
      lessonIds: ["les-g8-ict-01", "les-g8-ict-02"],
    },
  ],

  // ============================================================================
  // GRADE 9 — NATIONAL BREVET EXAM (ឌីប្លូម)
  // ============================================================================
  "9-mathematics": [
    {
      id: "unit-g9-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ឫសការេ និងកន្សោមពីជគណិត",
      title_en: "Unit 1: Square Roots & Radical Expressions",
      description_km: "លក្ខណៈនៃឫសការេ ការសម្រួលរ៉ាឌីកាល់ រូបមន្តពន្លាតសំខាន់ៗ និងការបំបាត់រ៉ាឌីកាល់ពីភាគបែង",
      description_en: "Square root properties, radical operations, binomial identities, and rationalizing denominators",
      icon: "√",
      lessonIds: [
        "les-g9-math-01",
        "les-g9-math-02",
        "les-g9-math-03",
        "les-g9-math-13",
        "les-g9-math-14",
      ],
    },
    {
      id: "unit-g9-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ សមីការ និងប្រព័ន្ធសមីការដឺក្រេទី ១",
      title_en: "Unit 2: Linear Systems & Equations",
      description_km: "សមីការដឺក្រេទី១ ប្រព័ន្ធសមីការពីរអញ្ញាត សមីការតម្លៃដាច់ខាត និងចំណោទអនុវត្តជាក់ស្តែង",
      description_en: "First-degree linear equations, 2x2 systems, absolute value equations, and Brevet word problems",
      icon: "⚡",
      lessonIds: [
        "les-g9-math-04",
        "les-g9-math-05",
        "les-g9-math-06",
        "les-g9-math-15",
        "les-g9-math-16",
      ],
    },
    {
      id: "unit-g9-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ សមីការដឺក្រេទី ២ (ឌីប្លូម)",
      title_en: "Unit 3: Quadratic Equations (Brevet Prep)",
      description_km: "សមីការដឺក្រេទី ២ ឌីសគ្រីមីណង់ Δ, Δ' ការបំបែកជាកត្តា ចំណោទឌីប្លូម និងសមីការទ្វេដឺក្រេ",
      description_en: "Quadratic equations, discriminant Δ and Δ', factorization, Brevet word problems, and biquadratics",
      icon: "📐",
      lessonIds: [
        "les-g9-math-11",
        "les-g9-math-17",
        "les-g9-math-18",
        "les-g9-math-19",
        "les-g9-math-20",
      ],
    },
    {
      id: "unit-g9-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ទ្រឹស្តីបទពីតាក័រ និងតាឡែស",
      title_en: "Unit 4: Pythagoras & Thales' Theorems",
      description_km: "ទ្រឹស្តីបទពីតាក័រ ច្រាសពីតាក័រ ទ្រឹស្តីបទតាឡែស ត្រីកោណដូចគ្នា និងទំនាក់ទំនងម៉េទ្រិច",
      description_en: "Pythagorean theorem and converse, Thales' theorem, similar triangles criteria, and right triangle metrics",
      icon: "📐",
      lessonIds: [
        "les-g9-math-07",
        "les-g9-math-12",
        "les-g9-math-21",
        "les-g9-math-22",
        "les-g9-math-23",
        "les-g9-math-24",
      ],
    },
    {
      id: "unit-g9-math-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ ធរណីមាត្រ ៖ រង្វង់ ត្រីកោណមាត្រ និងស្ថិតិ",
      title_en: "Unit 5: Circles, Right-Triangle Trigonometry & Statistics",
      description_km: "មុំផ្ចិត មុំចារឹកក្នុងរង្វង់ អនុបាតត្រីកោណមាត្រ មុំងើយ មុំទម្លាក់ មធ្យមនព្វន្ត និងអ៊ីស្តូក្រាម",
      description_en: "Central/inscribed angles, right triangle trigonometry (sin, cos, tan), angle surveying, and statistics",
      icon: "⭕",
      lessonIds: [
        "les-g9-math-08",
        "les-g9-math-09",
        "les-g9-math-10",
        "les-g9-math-25",
        "les-g9-math-26",
        "les-g9-math-27",
      ],
    },
  ],

  "9-khmer": [
    {
      id: "unit-g9-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ រឿងទុំទាវ (ស្នេហាបរិសុទ្ធ និងសង្គមសក្តិភូមិ)",
      title_en: "Unit 1: Tum Teav Epic & Feudal Society",
      description_km: "ការវិភាគតួអង្គទុំ ទាវ មេយឺន ព្រះបាទរាមាធិបតី និងការរិះគន់ប្រព័ន្ធសក្តិភូមិខ្មែរបុរាណ",
      description_en: "Tum Teav epic character analysis, critique of feudal arranged marriage, and tragic romance",
      icon: "📜",
      lessonIds: ["les-g9-khmer-01", "les-g9-khmer-02"],
    },
    {
      id: "unit-g9-khmer-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ កាព្យបទពាក្យ ៨ និងតែងសេចក្តីពន្យល់ (ឌីប្លូម)",
      title_en: "Unit 2: 8-Syllable Poetry & Brevet Composition",
      description_km: "ចង្វាក់បទពាក្យ ៨ ក្បួនវេយ្យាករណ៍ខ្មែរ និងវិធីសាស្ត្រតែងសេចក្តីពន្យល់ប្រឡងឌីប្លូម",
      description_en: "8-syllable classical poetic meter rules, syntax parsing, and Brevet explanatory essay composition",
      icon: "✍️",
      lessonIds: ["les-g9-khmer-03", "les-g9-khmer-04"],
    },
  ],

  "9-physics": [
    {
      id: "unit-g9-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ចលនា និងកម្លាំង",
      title_en: "Unit 1: Motion & Forces",
      description_km: "ល្បឿន ចលនាស្មើ កម្លាំង ទំនាញផែនដី និងទម្ងន់ P = m · g",
      description_en: "Velocity, uniform rectilinear motion, forces, gravitational acceleration, and weight P = mg",
      icon: "🚀",
      lessonIds: ["les-g9-phys-01", "les-g9-phys-02"],
    },
    {
      id: "unit-g9-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ការងារ ថាមពល និងអានុភាព",
      title_en: "Unit 2: Work, Energy & Power",
      description_km: "ការងារមេកានិច W = F · d អានុភាព P = W/t និងថាមពលស៊ីនេទិច-ប៉ូតង់ស្យែល",
      description_en: "Mechanical work W = Fd, power P = W/t, and kinetic/gravitational potential energy",
      icon: "⚡",
      lessonIds: ["les-g9-phys-03"],
    },
    {
      id: "unit-g9-phys-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ អគ្គិសនី និងច្បាប់អូម (ឌីប្លូម)",
      title_en: "Unit 3: Electricity & Ohm's Law (Brevet)",
      description_km: "ច្បាប់អូម U = R · I សៀគ្វីតជាស៊េរី និងខ្នែង អានុភាពអគ្គិសនី P = U · I និងថាមពល E = P · t",
      description_en: "Ohm's law U = RI, series/parallel resistor networks, electric power, and Joule heating energy",
      icon: "🔌",
      lessonIds: ["les-g9-phys-04", "les-g9-phys-06"],
    },
    {
      id: "unit-g9-phys-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ពន្លឺ និងអុបទិកគ្រឹះ",
      title_en: "Unit 4: Light & Converging Lenses",
      description_km: "ការផ្សាយត្រង់នៃពន្លឺ ចំណាំងផ្លាត និងការបង្កើតរូបភាពតាមឡង់ទីប្រមូល",
      description_en: "Straight propagation of light, planar reflection laws, and image construction via converging lenses",
      icon: "💡",
      lessonIds: ["les-g9-phys-05"],
    },
  ],

  "9-chemistry": [
    {
      id: "unit-g9-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ម៉ូល និងការគណនាគីមី",
      title_en: "Unit 1: The Mole & Stoichiometry",
      description_km: "ចំនួនម៉ូល ម៉ាសម៉ូល មាឌម៉ូលឧស្ម័ន V = n · 22.4 និងក្បួនគណនាតាមសមីការគីមី",
      description_en: "Mole concept, molar mass, molar volume of gases (22.4 L/mol at STP), and stoichiometric calculations",
      icon: "⚖️",
      lessonIds: ["les-g9-chem-01", "les-g9-chem-02"],
    },
    {
      id: "unit-g9-chem-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ អាស៊ីត បាស និងសូលុយស្យុងទឹក",
      title_en: "Unit 2: Acids, Bases & Aqueous Solutions",
      description_km: "លក្ខណៈអាស៊ីត បាស អង្គធាតុចង្អុលពណ៌ ប្រតិកម្មបន្សាប និងកំហាប់ម៉ូល C = n/V",
      description_en: "Acid/base properties, color indicators, acid-base neutralization reactions, and molarity C = n/V",
      icon: "🧪",
      lessonIds: ["les-g9-chem-03", "les-g9-chem-06"],
    },
    {
      id: "unit-g9-chem-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ លោហៈ និងស៊េរីសកម្មភាព (ឌីប្លូម)",
      title_en: "Unit 3: Metals & Reactivity Series (Brevet)",
      description_km: "លក្ខណៈរូប និងគីមីនៃលោហៈ ស៊េរីសកម្មភាពលោហៈ ប្រតិកម្មជាមួយអាស៊ីត និងការទាញយកលោហៈ",
      description_en: "Physical and chemical properties of metals, reactivity series, acid displacement reactions, and metallurgy",
      icon: "🔩",
      lessonIds: ["les-g9-chem-04", "les-g9-chem-05"],
    },
  ],

  "9-biology": [
    {
      id: "unit-g9-bio-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ តំណពូជម៉ង់ដែល (Mendelian Genetics)",
      title_en: "Unit 1: Mendelian Inheritance (Brevet)",
      description_km: "ការពិសោធន៍បង្កាត់សណ្តែករបស់ម៉ង់ដែល អាឡែលលេចធ្លោ អាឡែលអន់ និងផលធៀប 3:1 នៅជំនាន់ F2",
      description_en: "Mendelian monohybrid genetics, dominance and recessiveness, and the classic 3:1 F2 phenotypic ratio",
      icon: "🌱",
      lessonIds: ["les-g9-bio-01", "les-g9-bio-06"],
    },
    {
      id: "unit-g9-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ក្រូម៉ូសូម និងការបន្តពូជមនុស្ស",
      title_en: "Unit 2: Chromosomes & Human Reproduction",
      description_km: "រចនាសម្ព័ន្ធក្រូម៉ូសូម ការកំណត់ភេទ XX/XY ប្រព័ន្ធបន្តពូជមនុស្ស និងអនាម័យបន្តពូជ",
      description_en: "Chromosomal structure, human sex determination (XX/XY), reproductive physiology, and adolescent health",
      icon: "🧬",
      lessonIds: ["les-g9-bio-02", "les-g9-bio-03"],
    },
    {
      id: "unit-g9-bio-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ប្រព័ន្ធអេកូឡូស៊ី និងបរិស្ថាន",
      title_en: "Unit 3: Ecosystems & Environmental Conservation",
      description_km: "កត្តាជីវៈ និងអជីវៈ ច្រវាក់អាហារ បណ្តាញអាហារ និងការអភិរក្សធនធានធម្មជាតិកម្ពុជា",
      description_en: "Biotic and abiotic ecosystem factors, trophic food webs, energy pyramids, and conservation in Cambodia",
      icon: "🌿",
      lessonIds: ["les-g9-bio-04", "les-g9-bio-05"],
    },
  ],

  "9-earth": [
    {
      id: "unit-g9-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ បរិយាកាស និងប្រព័ន្ធអាកាសធាតុ",
      title_en: "Unit 1: Atmosphere & Weather Systems",
      description_km: "ស្រទាប់បរិយាកាស សម្ពាធខ្យល់ របបខ្យល់មូសុងកម្ពុជា និងវដ្តទឹកក្នុងធម្មជាតិ",
      description_en: "Atmospheric layers, barometric pressure, tropical monsoons, and the global water cycle",
      icon: "☁️",
      lessonIds: ["les-g9-earth-01", "les-g9-earth-02", "les-g9-earth-03"],
    },
    {
      id: "unit-g9-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ធនធានធម្មជាតិ និងការការពារបរិស្ថាន",
      title_en: "Unit 2: Natural Resources & Environmental Protection",
      description_km: "ធនធានព្រៃឈើ រ៉ែ ទឹក ឧស្ម័នផ្ទះកញ្ចក់ ការប្រែប្រួលអាកាសធាតុ និងការអភិរក្ស",
      description_en: "Forest, mineral, and water resources, greenhouse gases, climate vulnerability, and conservation",
      icon: "🌍",
      lessonIds: ["les-g9-earth-04", "les-g9-earth-05"],
    },
  ],

  "9-history": [
    {
      id: "unit-g9-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ កម្ពុជាសម័យកណ្តាល (លង្វែក និងឧដុង្គ)",
      title_en: "Unit 1: Post-Angkorian Middle Period: Longvek & Oudong",
      description_km: "ការប្តូររាជធានីពីអង្គរ ពាណិជ្ជកម្មអន្តរជាតិនៅលង្វែក រាជធានីឧដុង្គ និងការបែកបាក់ផ្ទៃក្នុង",
      description_en: "Post-Angkorian capital relocation, maritime commerce in Longvek, royal Oudong era, and regional conflicts",
      icon: "🏯",
      lessonIds: ["les-g9-hist-01", "les-g9-hist-02"],
    },
  ],

  "9-geography": [
    {
      id: "unit-g9-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ប្រជាសាស្ត្រ និងសេដ្ឋកិច្ចកម្ពុជា",
      title_en: "Unit 1: Demographics & Cambodian Economy",
      description_km: "កំណើនប្រជាជន ការបែងចែកដង់ស៊ីតេ ការបម្លាស់ទីលំនៅ និងកម្លាំងពលកម្មកសិកម្ម-ឧស្សាហកម្ម",
      description_en: "Population growth, demographic pyramid, rural-urban migration, and agricultural-industrial workforce",
      icon: "👥",
      lessonIds: ["les-g9-geo-01", "les-g9-geo-02"],
    },
  ],

  "9-english": [
    {
      id: "unit-g9-eng-1",
      unitNumber: 1,
      title_km: "Unit 1: Present Perfect & Passive Voice Mastery",
      title_en: "Unit 1: Present Perfect & Passive Voice Mastery",
      description_km: "កាលបច្ចុប្បន្នបរិបូរណ៍ ទម្រង់ Passive Voice និងការសរសេរកថាខណ្ឌពិពណ៌នាប្រឡងឌីប្លូម",
      description_en: "Present perfect aspect, active-to-passive voice transformations, and structured Brevet paragraph composition",
      icon: "🔤",
      lessonIds: ["les-g9-eng-01", "les-g9-eng-02"],
    },
  ],

  "9-morality": [
    {
      id: "unit-g9-moral-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ នីតិរដ្ឋ ច្បាប់ចរាចរណ៍ និងសិទ្ធិពលរដ្ឋ",
      title_en: "Unit 1: Rule of Law, Traffic Safety & Civic Duties",
      description_km: "ការគោរពច្បាប់ចរាចរណ៍ផ្លូវគោក ផលប៉ះពាល់នៃគ្រឿងញៀន និងកាតព្វកិច្ចពលរដ្ឋល្អក្នុងសង្គម",
      description_en: "Road traffic safety regulations, drug abuse prevention, civic responsibilities, and rule of law",
      icon: "🤝",
      lessonIds: ["les-g9-moral-01", "les-g9-moral-02"],
    },
  ],

  "10-mathematics": [
    {
      id: "unit-g10-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សំណុំ និងតក្កវិទ្យា",
      title_en: "Unit 1: Sets & Mathematical Logic",
      description_km: "និយមន័យសំណុំ ប្រមាណវិធីប្រជុំ ប្រសព្វ ផលដក សំណើ និងតក្កវិទ្យាគណិតវិទ្យា",
      description_en: "Set operations (unions, intersections, complements), Venn diagrams, truth tables, and mathematical logic",
      icon: "🔢",
      lessonIds: [
        "les-g10-math-06",
        "les-g10-math-06-p1",
        "les-g10-math-06-p2",
        "les-g10-math-06-p3",
        "les-g10-math-06-p4",
        "les-g10-math-06-p5",
      ],
    },
    {
      id: "unit-g10-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ សមីការ និងវិសមីការដឺក្រេទី ២",
      title_en: "Unit 2: Quadratic Equations & Inequalities",
      description_km: "សមីការដឺក្រេទី ២ ឌីសគ្រីមីណង់ Δ រូបមន្តវ្យែត (Vieta) និងសញ្ញានៃត្រីធាដឺក្រេទី ២",
      description_en: "Quadratic equations, discriminant Δ, Vieta's root relations (S & P), and quadratic sign tables for inequalities",
      icon: "⚡",
      lessonIds: [
        "les-g10-math-11",
        "les-g10-math-11-p1",
        "les-g10-math-11-p2",
        "les-g10-math-12",
        "les-g10-math-12-p1",
        "les-g10-math-05",
        "les-g10-math-05-p1",
      ],
    },
    {
      id: "unit-g10-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ អនុគមន៍ដឺក្រេទី ២ និងប៉ារ៉ាបូល",
      title_en: "Unit 3: Quadratic Functions & Parabolas",
      description_km: "ទម្រង់កាណូនិច កំពូល អ័ក្សឆ្លុះ ទិសដៅអថេរភាព និងការសង់ក្រាបប៉ារ៉ាបូល y = ax² + bx + c",
      description_en: "Canonical vertex form, vertex coordinates S(-b/2a, -Δ/4a), symmetry axis, and plotting parabolas",
      icon: "📈",
      lessonIds: [
        "les-g10-math-01",
        "les-g10-math-07",
        "les-g10-math-07-p1",
        "les-g10-math-07-p2",
        "les-g10-math-13",
        "les-g10-math-13-p1",
      ],
    },
    {
      id: "unit-g10-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ វ៉ិចទ័រក្នុងប្លង់ និងកូអរដោនេ",
      title_en: "Unit 4: Vectors in the Plane & Coordinates",
      description_km: "កូអរដោនេនៃវ៉ិចទ័រ ប្រមាណវិធីបូកដក ផលគុណស្កាលែ និងលក្ខខណ្ឌកែងគ្នានៃវ៉ិចទ័រពីរ",
      description_en: "Vector coordinates, collinearity, scalar dot product, orthogonality, and angle between vectors",
      icon: "📐",
      lessonIds: [
        "les-g10-math-02",
        "les-g10-math-14",
        "les-g10-math-14-p1",
        "les-g10-math-04",
        "les-g10-math-15",
        "les-g10-math-15-p1",
      ],
    },
    {
      id: "unit-g10-math-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ ត្រីកោណមាត្រកម្រិតខ្ពស់",
      title_en: "Unit 5: Advanced Trigonometry & General Triangles",
      description_km: "រូបមន្តមុំឌុប ទ្រឹស្តីបទស៊ីនុស កូស៊ីនុស និងរូបមន្តហេរ៉ុងសម្រាប់ផ្ទៃក្រឡាត្រីកោណ",
      description_en: "Trigonometric identities, double-angle formulas, Law of Sines, Law of Cosines, and Heron's formula",
      icon: "📐",
      lessonIds: [
        "les-g10-math-03",
        "les-g10-math-16",
        "les-g10-math-17",
        "les-g10-math-17-p1",
      ],
    },
    {
      id: "unit-g10-math-6",
      unitNumber: 6,
      title_km: "ជំពូកទី ៦ ៖ ស្ថិតិពិពណ៌នា",
      title_en: "Unit 6: Descriptive Statistics",
      description_km: "មធ្យមនព្វន្ត មេដ្យាន ម៉ូត វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារនៃទិន្នន័យស្ថិតិ",
      description_en: "Mean, median, mode, variance, and standard deviation for statistical distributions",
      icon: "📊",
      lessonIds: [
        "les-g10-math-18",
        "les-g10-math-18-p1",
        "les-g10-math-18-p2",
      ],
    },
  ],

  "10-khmer": [
    {
      id: "unit-g10-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ រឿងរាមកេរ្តិ៍ខ្មែរ និងវេយ្យាករណ៍កម្រិតខ្ពស់",
      title_en: "Unit 1: Reamker Epic & Advanced Grammar",
      description_km: "ការវិភាគឈុតឆាកចម្បាំងក្រុងរាពណ៍ តម្លៃសិល្បៈអក្សរសិល្ប៍បុរាណ និងក្បួនវេយ្យាករណ៍",
      description_en: "Analysis of the Reamker epic battle scenes, aesthetic literary values, and complex Khmer syntactic clauses",
      icon: "👑",
      lessonIds: ["les-g10-khmer-01", "les-g10-khmer-02"],
    },
  ],

  "10-physics": [
    {
      id: "unit-g10-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ស៊ីនេម៉ាទិចនៃចលនាត្រង់",
      title_en: "Unit 1: Kinematics of Linear Motion",
      description_km: "ចលនាត្រង់ស្មើ ចលនាត្រង់ប្រែប្រួលស្មើ v = at + v0 និងចលនាធ្លាក់សេរីក្នុងខ្យល់",
      description_en: "Uniform motion, uniformly accelerated motion, kinematic velocity/position formulas, and gravitational free fall",
      icon: "🏎️",
      lessonIds: ["les-g10-phys-01", "les-g10-phys-06"],
    },
    {
      id: "unit-g10-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ឌីណាមិច និងច្បាប់ញូតុន",
      title_en: "Unit 2: Dynamics & Newton's Laws",
      description_km: "ច្បាប់ទាំងបីរបស់ញូតុន កម្លាំងកកិត កម្លាំងទំនាញសកល និងការអនុវត្តលើប្លង់ផ្ដេក-ទ្រេត",
      description_en: "Newton's three laws of motion (F = ma), friction coefficients, universal gravitation, and inclined planes",
      icon: "⚙️",
      lessonIds: ["les-g10-phys-02", "les-g10-phys-03"],
    },
    {
      id: "unit-g10-phys-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ការងារ ថាមពល និងច្បាប់រក្សាថាមពល",
      title_en: "Unit 3: Work & Mechanical Energy Conservation",
      description_km: "ការងារមេកានិច W = F · d · cos θ ថាមពលស៊ីនេទិច ប៉ូតង់ស្យែល និងច្បាប់រក្សាថាមពលមេកានិច",
      description_en: "Mechanical work W = Fd cos θ, kinetic energy, gravitational potential energy, and mechanical energy conservation",
      icon: "⚡",
      lessonIds: ["les-g10-phys-04", "les-g10-phys-05"],
    },
  ],

  "10-chemistry": [
    {
      id: "unit-g10-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ រចនាសម្ព័ន្ធអាតូម និងការរៀបចំអេឡិចត្រុង",
      title_en: "Unit 1: Atomic Structure & Electron Configurations",
      description_km: "ប្រូតុង ណឺត្រុង អេឡិចត្រុង លេខអាតូម Z លេខម៉ាស A និងកម្រងអេឡិចត្រុងក្នុងស្រទាប់ s, p, d, f",
      description_en: "Subatomic particles, atomic number Z, isotopes, Aufbau principle, and orbital electron configurations",
      icon: "⚛️",
      lessonIds: ["les-g10-chem-01", "les-g10-chem-06"],
    },
    {
      id: "unit-g10-chem-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ តារាងខួបនៃធាតុគីមី",
      title_en: "Unit 2: The Periodic Table & Trends",
      description_km: "ច្បាប់ខួប មែនដេឡេយែវ ការប្រែប្រួលកាំអាតូម ថាមពលអ៊ីយ៉ុងកម្ម និងអេឡិចត្រូអវិជ្ជមាន",
      description_en: "Periodic law, periods, groups, atomic radius variation, ionization energy, and electronegativity trends",
      icon: "📑",
      lessonIds: ["les-g10-chem-02"],
    },
    {
      id: "unit-g10-chem-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ សម្ព័ន្ធគីមី",
      title_en: "Unit 3: Chemical Bonding",
      description_km: "សម្ព័ន្ធកូវ៉ាឡង់ រូបមន្តឡឺវីស សម្ព័ន្ធអ៊ីយ៉ុង និងសម្ព័ន្ធលោហៈ",
      description_en: "Covalent bonding, Lewis electron dot diagrams, octet rule, ionic lattice bonding, and metallic bonds",
      icon: "🧪",
      lessonIds: ["les-g10-chem-03", "les-g10-chem-04", "les-g10-chem-05"],
    },
  ],

  "10-biology": [
    {
      id: "unit-g10-bio-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ម៉ាក្រូម៉ូលេគុលជីវសាស្ត្រ និងអង់ស៊ីម",
      title_en: "Unit 1: Biological Macromolecules & Enzymes",
      description_km: "គ្លុយស៊ីត លីពីត ប្រូតេអ៊ីន អាស៊ីតនុយក្លេអ៊ិច និងយន្តការកាតាលីករនៃអង់ស៊ីម",
      description_en: "Carbohydrates, lipids, proteins, nucleic acids, and enzyme catalyst lock-and-key action",
      icon: "🔬",
      lessonIds: ["les-g10-bio-01", "les-g10-bio-02"],
    },
    {
      id: "unit-g10-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ រចនាសម្ព័ន្ធកោសិកា និងការដោះដូរសារធាតុ",
      title_en: "Unit 2: Cell Anatomy & Membrane Transport",
      description_km: "ភ្នាសប្លាស្ម អង្គប្រណិតកោសិកា ការសាយភាយ អូស្មូស និងការដឹកជញ្ជូនសកម្ម",
      description_en: "Plasma membrane phospholipid bilayer, cellular organelles, passive diffusion, osmosis, and active transport",
      icon: "🧫",
      lessonIds: ["les-g10-bio-03", "les-g10-bio-04"],
    },
    {
      id: "unit-g10-bio-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ការបែងចែកកោសិកា ៖ មីតូស និងមេយ៉ូស",
      title_en: "Unit 3: Cell Division: Mitosis & Meiosis",
      description_km: "វដ្តកោសិកា ដំណាក់កាលទាំង ៤ នៃមីតូស និងការបង្កើតកាម៉ែតតាមមេយ៉ូស",
      description_en: "Cell cycle phases, mitotic somatic duplication, and meiotic haploid gametogenesis",
      icon: "🧬",
      lessonIds: ["les-g10-bio-06", "les-g10-bio-05"],
    },
  ],

  "10-earth": [
    {
      id: "unit-g10-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ភូគព្ភសាស្ត្ររូបវន្ត និងស្រទាប់ថ្ម",
      title_en: "Unit 1: Physical Geology & Rock Strata",
      description_km: "រចនាសម្ព័ន្ធផ្ទៃក្នុងផែនដី ស្រទាប់ថ្ម ផ្នត់ កំហុសតំបន់ និងផូស៊ីលកំណត់អាយុភូមិសាស្ត្រ",
      description_en: "Internal Earth layers, sedimentary rock stratification, geological folds, faults, and index fossils",
      icon: "⛰️",
      lessonIds: ["les-g10-earth-01", "les-g10-earth-02", "les-g10-earth-03"],
    },
    {
      id: "unit-g10-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ អាកាសធាតុវិទ្យា និងធនធានរ៉ែកម្ពុជា",
      title_en: "Unit 2: Meteorology & Mineral Resources of Cambodia",
      description_km: "ប្រព័ន្ធសម្ពាធអាកាសធាតុ ព្យុះត្រូពិច និងសក្តានុពលធនធានរ៉ែប្រេងកាតកម្ពុជា",
      description_en: "Atmospheric weather pressure systems, tropical typhoons, and mineral/petroleum resources of Cambodia",
      icon: "💎",
      lessonIds: ["les-g10-earth-04", "les-g10-earth-05"],
    },
  ],

  "10-history": [
    {
      id: "unit-g10-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សម័យកណ្តាល ពាណិជ្ជកម្មលង្វែក និងសម័យឧដុង្គ",
      title_en: "Unit 1: Middle Period: Longvek & Oudong Dynasty",
      description_km: "ការប្តូររាជធានីពីអង្គរ សេដ្ឋកិច្ចពាណិជ្ជកម្មអន្តរជាតិលង្វែក និងរាជធានីឧដុង្គ",
      description_en: "Post-Angkorian transition, maritime commerce in Longvek, and the royal Oudong period",
      icon: "🏯",
      lessonIds: ["les-g10-hist-01", "les-g10-hist-02"],
    },
  ],

  "10-geography": [
    {
      id: "unit-g10-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ធនធានធម្មជាតិ និងការអភិរក្សជីវចម្រុះ",
      title_en: "Unit 1: Natural Resources & Biodiversity Conservation",
      description_km: "សក្តានុពលរ៉ែ ទំនប់វារីអគ្គិសនី ឧទ្យានជាតិ និងតំបន់ការពារធម្មជាតិកម្ពុជា",
      description_en: "Hydropower potential, mineral resources, national parks, and wildlife sanctuaries",
      icon: "⛰️",
      lessonIds: ["les-g10-geo-01", "les-g10-geo-02"],
    },
  ],

  "10-english": [
    {
      id: "unit-g10-eng-1",
      unitNumber: 1,
      title_km: "Unit 1: Academic Grammar, Perfect Tenses & Conditionals",
      title_en: "Unit 1: Academic Grammar, Perfect Tenses & Conditionals",
      description_km: "Present Perfect vs Past Simple លក្ខខណ្ឌ Type 1 & 2 និងពាក្យភ្ជាប់គំនិតពិភាក្សា",
      description_en: "Tense contrasts, conditional logic, and formal cause-effect transition connectors",
      icon: "📖",
      lessonIds: ["les-g10-eng-01", "les-g10-eng-02"],
    },
  ],

  "10-ict": [
    {
      id: "unit-g10-ict-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ក្បួនដោះស្រាយបញ្ហា និងគំនូសតាង (Algorithms)",
      title_en: "Unit 1: Algorithms, Pseudocode & Flowcharts",
      description_km: "ការរៀបចំ Algorithm និមិត្តសញ្ញា Flowchart លក្ខខណ្ឌ និងរង្វិលជុំ Loops",
      description_en: "Algorithmic thinking, flowchart logic gates, conditional branching, and iteration loops",
      icon: "🔀",
      lessonIds: ["les-g10-ict-01", "les-g10-ict-02"],
    },
  ],

  "11-mathematics": [
    {
      id: "unit-g11-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អនុគមន៍ត្រីកោណមាត្រ និងសមីការ",
      title_en: "Unit 1: Trigonometric Functions & Equations",
      description_km: "រង្វង់ត្រីកោណមាត្រ រូបមន្តគ្រឹះ រូបមន្តបម្លែង សមីការត្រីកោណមាត្រ និងវិសមីការ",
      description_en: "Trigonometric circle, fundamental identities, Simpson transformations, auxiliary angles, and trigonometric inequalities",
      icon: "📐",
      lessonIds: [
        "les-g11-math-06",
        "les-g11-math-05",
        "les-g11-math-11",
        "les-g11-math-12",
        "les-g11-math-13",
        "les-g11-math-14",
      ],
    },
    {
      id: "unit-g11-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ស្វ៊ីតចំនួនពិត និងអនុមានរួម",
      title_en: "Unit 2: Real Number Sequences & Induction",
      description_km: "ស្វ៊ីតនព្វន្ត ស្វ៊ីតធរណីមាត្រ ផលបូក Sn ផលបូកអនន្ត និងវិចារអនុមានរួមគណិតវិទ្យា",
      description_en: "Arithmetic and geometric progressions, partial series sum Sn, infinite geometric series, and mathematical induction",
      icon: "📈",
      lessonIds: [
        "les-g11-math-01",
        "les-g11-math-15",
        "les-g11-math-07",
        "les-g11-math-16",
        "les-g11-math-17",
        "les-g11-math-18",
      ],
    },
    {
      id: "unit-g11-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ លីមីត និងដេរីវេនៃអនុគមន៍",
      title_en: "Unit 3: Limits & Derivatives of Functions",
      description_km: "លីមីតនៃអនុគមន៍ រាងមិនកំណត់ រូបមន្តដេរីវេ សមីការបន្ទាត់ប៉ះ និងទិសដៅអថេរភាព",
      description_en: "Limits of functions, indeterminate forms 0/0 and inf/inf, derivative formulas, tangent lines, and monotonicity extrema",
      icon: "⚡",
      lessonIds: [
        "les-g11-math-02",
        "les-g11-math-19",
        "les-g11-math-03",
        "les-g11-math-04",
        "les-g11-math-20",
        "les-g11-math-21",
      ],
    },
    {
      id: "unit-g11-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ធរណីមាត្រក្នុងលំហ និងសូលីត",
      title_en: "Unit 4: Spatial Geometry & Polyhedra",
      description_km: "ទីតាំងធៀប បន្ទាត់កែងនឹងប្លង់ ទ្រឹស្តីបទមុំបីកែង ចម្ងាយក្នុងលំហ និងរូបមន្តមាឌសូលីត",
      description_en: "Lines and planes in space, spatial perpendicularity, three perpendiculars theorem, spatial distances, and solid volumes",
      icon: "📐",
      lessonIds: [
        "les-g11-math-08",
        "les-g11-math-22",
        "les-g11-math-09",
        "les-g11-math-23",
        "les-g11-math-24",
      ],
    },
    {
      id: "unit-g11-math-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ បន្សំ និងប្រូបាប៊ីលីតេគ្រឹះ",
      title_en: "Unit 5: Combinatorics & Classical Probability",
      description_km: "គោលការណ៍រាប់ ចម្លាស់ ការរៀប បន្សំ C_n^k ត្រីកោណប៉ាស្កាល់ និងច្បាប់ប្រូបាប៊ីលីតេ",
      description_en: "Counting principles, permutations Pn, arrangements Ank, combinations Cnk, Pascal's triangle, and probability laws",
      icon: "🎲",
      lessonIds: [
        "les-g11-math-25",
        "les-g11-math-26",
        "les-g11-math-27",
        "les-g11-math-10",
        "les-g11-math-28",
      ],
    },
  ],

  "11-khmer": [
    {
      id: "unit-g11-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អក្សរសិល្ប៍ទំនើប៖ ស៊ីមអ្នកបរឡាន និងមាលាដួងចិត្ត",
      title_en: "Unit 1: Modern Realism: Sim the Driver & Mealea Doung Chett",
      description_km: "ការវិភាគវណ្ណៈកម្មករ ស្នេហាជាតិ និងទស្សនៈបញ្ញវន្តខ្មែរក្នុងអក្សរសិល្ប៍ទំនើប",
      description_en: "Working-class solidarity, patriotism, and modern realism in 20th-century literature",
      icon: "🚚",
      lessonIds: ["les-g11-khmer-01", "les-g11-khmer-02"],
    },
  ],

  "11-history": [
    {
      id: "unit-g11-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សម័យអាណាព្យាបាលបារាំង និងចលនាតស៊ូខ្មែរ",
      title_en: "Unit 1: French Protectorate & Anticolonial Movements",
      description_km: "សន្ធិសញ្ញាឆ្នាំ ១៨៦៣ ចលនាអាចារ្យស្វា ក្រឡាហោមគង់ និងឥទ្ធិពលសង្គ្រាមលោក",
      description_en: "The 1863 protectorate, peasant uprisings, monastic demonstrations, and wartime dynamics",
      icon: "🏛️",
      lessonIds: ["les-g11-hist-01", "les-g11-hist-02"],
    },
  ],

  "11-geography": [
    {
      id: "unit-g11-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ នគរូបនីយកម្ម និងតំបន់សេដ្ឋកិច្ចពិសេស",
      title_en: "Unit 1: Urbanization, SEZs & Infrastructure",
      description_km: "ការរីកចម្រើននៃរាជធានីភ្នំពេញ តំបន់សេដ្ឋកិច្ចពិសេស ផ្លូវល្បឿនលឿន និងកំពង់ផែទឹកជ្រៅ",
      description_en: "Urban growth, industrial SEZ corridors, expressway networks, and deep-sea ports",
      icon: "🏙️",
      lessonIds: ["les-g11-geo-01", "les-g11-geo-02"],
    },
  ],

  "11-physics": [
    {
      id: "unit-g11-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អគ្គិសនីស្ទាទិច និងកុងដង់សាទ័រ",
      title_en: "Unit 1: Electrostatics & Capacitance",
      description_km: "ច្បាប់គូឡុំ ដែនអគ្គិសនី ប៉ូតង់ស្យែល និងកាប៉ាស៊ីតង់កុងដង់សាទ័រ C = Q / U",
      description_en: "Coulomb's law, electric field/potential, and capacitance stored energy",
      icon: "⚡",
      lessonIds: ["les-g11-phys-01", "les-g11-phys-02", "les-g11-phys-03"],
    },
    {
      id: "unit-g11-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ចរន្តអគ្គិសនីជាប់ និងច្បាប់អូមសម្រាប់សៀគ្វីទាំងមូល",
      title_en: "Unit 2: DC Circuits & Closed Loop Ohm's Law",
      description_km: "កម្លាំងអគ្គិសនីចលករ E រេស៊ីស្តង់ក្នុង r ច្បាប់អូមសម្រាប់សៀគ្វីទាំងមូល I = E/(R+r)",
      description_en: "Internal resistance, closed circuit EMF, and generator power efficiency",
      icon: "🔋",
      lessonIds: ["les-g11-phys-06"],
    },
    {
      id: "unit-g11-phys-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ដែនម៉ាញេទិច និងកម្លាំងឡាប្លាស",
      title_en: "Unit 3: Magnetic Fields & Laplace Force",
      description_km: "ដែនម៉ាញេទិច កម្លាំងឡូរ៉ិន និងកម្លាំងឡាប្លាស F = I L B sin θ លើខ្សែចម្លង",
      description_en: "Magnetic flux, Lorentz force, and Laplace electromagnetic force on conductors",
      icon: "🧲",
      lessonIds: ["les-g11-phys-04", "les-g11-phys-07"],
    },
    {
      id: "unit-g11-phys-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ អាំងឌុចស្យុងអេឡិចត្រូម៉ាញេទិច",
      title_en: "Unit 4: Electromagnetic Induction",
      description_km: "ហ្វ្លុចម៉ាញេទិច ច្បាប់ហ្វារ៉ាដេ e = -dΦ/dt និងច្បាប់ឡិន្ស (Lenz)",
      description_en: "Faraday's law of electromagnetic induction, induced EMF, and Lenz's direction law",
      icon: "🔄",
      lessonIds: ["les-g11-phys-05"],
    },
  ],

  "11-chemistry": [
    {
      id: "unit-g11-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ឧស្ម័នបរិសុទ្ធ និងសមីការ PV = nRT",
      title_en: "Unit 1: Ideal Gas Laws & PV = nRT",
      description_km: "ច្បាប់ Boyle-Mariotte ច្បាប់ Charles សម្ពាធ មាឌ និងសមីការសភាព PV = nRT",
      description_en: "Gas laws, pressure-volume isothermal relationships, and ideal gas state equations",
      icon: "🎈",
      lessonIds: ["les-g11-chem-06"],
    },
    {
      id: "unit-g11-chem-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ស៊ីនេទិចគីមី និងសមតុល្យគីមី",
      title_en: "Unit 2: Chemical Kinetics & Equilibrium",
      description_km: "ល្បឿនប្រតិកម្មគីមី ថេរលំនឹង Kc និងគោលការណ៍ Le Chatelier",
      description_en: "Reaction rates, equilibrium constant expressions, and Le Chatelier shifts",
      icon: "⏳",
      lessonIds: ["les-g11-chem-01", "les-g11-chem-02"],
    },
    {
      id: "unit-g11-chem-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ គីមីសរីរាង្គ អ៊ីដ្រូកាបួ (អាល់កាន អាល់សែន)",
      title_en: "Unit 3: Hydrocarbons: Alkanes, Alkenes & Alkynes",
      description_km: "អាល់កាន CnH2n+2 អាល់សែន អាល់ស៊ីន និងប្រតិកម្មចំហេះ-ជំនួស",
      description_en: "Alkanes, alkenes, alkynes, combustion, and halogen substitution reactions",
      icon: "🔥",
      lessonIds: ["les-g11-chem-03", "les-g11-chem-04"],
    },
    {
      id: "unit-g11-chem-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ អ៊ីដ្រូកាបួក្រអូប ៖ បង់សែន និងអាល់កុល",
      title_en: "Unit 4: Aromatics: Benzene & Alcohols",
      description_km: "រចនាសម្ព័ន្ធបង់សែន C6H6 ប្រតិកម្មជំនួសលើបង់សែន អាល់កុល R-OH និងអេទែ",
      description_en: "Benzene resonance, electrophilic substitution, alcohols, and ethers",
      icon: "🧪",
      lessonIds: ["les-g11-chem-07", "les-g11-chem-05"],
    },
  ],

  "11-biology": [
    {
      id: "unit-g11-bio-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ថាមពលកោសិកា រស្មីសំយោគ និងដង្ហើម",
      title_en: "Unit 1: Photosynthesis & Cellular Respiration",
      description_km: "ដំណាក់កាលពន្លឺ វដ្ត Calvin Glycolysis វដ្ត Krebs និងការ fermentation ឡើងមេ",
      description_en: "Light reactions, Calvin cycle, glycolysis, Krebs cycle, and anaerobic fermentation",
      icon: "🌿",
      lessonIds: ["les-g11-bio-01", "les-g11-bio-02", "les-g11-bio-06"],
    },
    {
      id: "unit-g11-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ពន្ធុវិទ្យាម៉ូលេគុល និងការសំយោគប្រូតេអ៊ីន",
      title_en: "Unit 2: Molecular Genetics & Protein Synthesis",
      description_km: "ការចម្លងកូដ បកប្រែកូដ ហ្សែន និងបម្រែបម្រួលហ្សែន Mutations",
      description_en: "Transcription, translation, genetic code, and point/chromosomal mutations",
      icon: "🧬",
      lessonIds: ["les-g11-bio-03", "les-g11-bio-04"],
    },
    {
      id: "unit-g11-bio-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ សរីរវិទ្យារុក្ខជាតិ និងការដឹកជញ្ជូនសារធាតុ",
      title_en: "Unit 3: Plant Vascular Physiology",
      description_km: "ប្រព័ន្ធដឹកជញ្ជូនក្នុងរុក្ខជាតិ Xylem និង Phloem ការបឺតស្រូបទឹក និងរំហួតទឹក",
      description_en: "Xylem and phloem vascular transport, water suction, and transpiration",
      icon: "🌱",
      lessonIds: ["les-g11-bio-05"],
    },
  ],

  "11-earth": [
    {
      id: "unit-g11-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ មហាសមុទ្រវិទ្យា និងចរន្តទឹកសមុទ្រ",
      title_en: "Unit 1: Oceanography & Global Circulation",
      description_km: "ចរន្តទឹកសមុទ្រពិភពលោក បាតុភូត ENSO (El Niño / La Niña) និងតុល្យភាពកម្ដៅផែនដី",
      description_en: "Thermohaline circulation, ENSO climate oscillations, and oceanic thermal regulation",
      icon: "🌊",
      lessonIds: ["les-g11-earth-01", "les-g11-earth-02"],
    },
    {
      id: "unit-g11-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ វដ្តជីវគីមី និងស្រទាប់អូហ្សូន",
      title_en: "Unit 2: Biogeochemical Cycles & Ozone Layer",
      description_km: "វដ្តកាបូន វដ្តអាសូត ឧស្ម័នផ្ទះកញ្ចក់ និងស្រទាប់អូហ្សូន O3 ក្នុងស្ត្រាតូស៊្វែរ",
      description_en: "Carbon and nitrogen cycles, greenhouse forcing, and stratospheric ozone depletion/recovery",
      icon: "🌍",
      lessonIds: ["les-g11-earth-03", "les-g11-earth-04", "les-g11-earth-06"],
    },
    {
      id: "unit-g11-earth-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ តារាសាស្ត្រ និងកាឡាក់ស៊ី Milky Way",
      title_en: "Unit 3: Astronomy & The Milky Way Galaxy",
      description_km: "ប្រព័ន្ធព្រះអាទិត្យ ផ្កាយ ជីវិតផ្កាយ និងរចនាសម្ព័ន្ធកាឡាក់ស៊ី Milky Way",
      description_en: "Planetary solar system architecture, stellar lifecycles, and Milky Way spiral galaxy structure",
      icon: "🌌",
      lessonIds: ["les-g11-earth-05"],
    },
  ],

  "12-mathematics": [
    {
      id: "unit-g12-math-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ លីមីតនៃអនុគមន៍ និងភាពជាប់",
      title_en: "Unit 1: Limits & Continuity",
      description_km: "លីមីតនៃអនុគមន៍សនិទាន អសនិទាន ត្រីកោណមាត្រ រាងមិនកំណត់ 0/0, ∞/∞ ភាពជាប់ និងអាស៊ីមតូត",
      description_en: "Limits of functions, indeterminate forms (0/0, ∞/∞), intermediate value theorem, and curve asymptotes",
      icon: "📐",
      lessonIds: [
        "les-g12-math-11",
        "les-g12-math-11-p1",
        "les-g12-math-11-p2",
        "les-g12-math-12",
        "les-g12-math-12-p1",
        "les-g12-math-13",
        "les-g12-math-13-p1",
      ],
    },
    {
      id: "unit-g12-math-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ដេរីវេ និងការសិក្សាអនុគមន៍",
      title_en: "Unit 2: Derivatives & Curve Sketching",
      description_km: "រូបមន្តដេរីវេ អនុគមន៍បណ្តាក់ ទិសដៅអថេរភាព បរមាធៀប និងការសិក្សាសង់ក្រាបអនុគមន៍បាក់ឌុប",
      description_en: "Derivative formulas, chain rule, monotonicity intervals, local extrema, and full Cartesian curve sketching",
      icon: "📈",
      lessonIds: [
        "les-g12-math-14",
        "les-g12-math-14-p1",
        "les-g12-math-15",
        "les-g12-math-15-p1",
        "les-g12-math-16",
        "les-g12-math-16-p1",
      ],
    },
    {
      id: "unit-g12-math-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ព្រីមីទីវ និងអាំងតេក្រាល",
      title_en: "Unit 3: Primitives & Definite Integrals",
      description_km: "រូបមន្តព្រីមីទីវគ្រឹះ អាំងតេក្រាលដោយផ្នែក ការប្តូរអថេរ ផ្ទៃក្រឡា និងមាឌសូលីតបង្វិល",
      description_en: "Fundamental theorem of calculus, integration by parts, u-substitution, bounded areas, and revolution solids",
      icon: "∫",
      lessonIds: [
        "les-g12-math-01",
        "les-g12-math-06",
        "les-g12-math-17",
        "les-g12-math-17-p1",
        "les-g12-math-17-p2",
        "les-g12-math-17-p3",
      ],
    },
    {
      id: "unit-g12-math-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ សមីការឌីផេរ៉ង់ស្យែល",
      title_en: "Unit 4: Differential Equations",
      description_km: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ និងទី២ ឫសកុំផ្លិច សមីការមិនអូម៉ូសែន និងការអនុវត្តក្នុងរូបវិទ្យា",
      description_en: "First/second-order linear ODEs, complex roots, undetermined coefficients, and physics applications",
      icon: "⚙️",
      lessonIds: [
        "les-g12-math-03",
        "les-g12-math-07",
        "les-g12-math-18",
        "les-g12-math-18-p1",
        "les-g12-math-18-p2",
        "les-g12-math-18-p3",
      ],
    },
    {
      id: "unit-g12-math-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ ចំនួនកុំផ្លិច",
      title_en: "Unit 5: Complex Numbers",
      description_km: "ទម្រង់ពីជគណិត ទម្រង់ត្រីកោណមាត្រ រូបមន្តដឺម័រ ឫសទី n និងបកស្រាយធរណីមាត្រនៃកុំផ្លិច",
      description_en: "Algebraic form, polar form, De Moivre's theorem, complex nth roots, and geometric affixes",
      icon: "🔢",
      lessonIds: [
        "les-g12-math-02",
        "les-g12-math-08",
        "les-g12-math-19",
        "les-g12-math-19-p1",
        "les-g12-math-19-p2",
        "les-g12-math-19-p3",
      ],
    },
    {
      id: "unit-g12-math-6",
      unitNumber: 6,
      title_km: "ជំពូកទី ៦ ៖ បន្សំ និងប្រូបាប៊ីលីតេ",
      title_en: "Unit 6: Combinatorics & Probability",
      description_km: "គោលការណ៍រាប់ បន្សំ ប្រូបាបលក្ខខណ្ឌ អថេរចៃដន្យដាច់ E(X), V(X) និងបំណែងចែកទ្វេធា",
      description_en: "Combinatorics, conditional probability trees, discrete random variables, and binomial distributions",
      icon: "🎲",
      lessonIds: [
        "les-g12-math-05",
        "les-g12-math-10",
        "les-g12-math-20",
        "les-g12-math-20-p1",
        "les-g12-math-20-p2",
        "les-g12-math-20-p3",
      ],
    },
    {
      id: "unit-g12-math-7",
      unitNumber: 7,
      title_km: "ជំពូកទី ៧ ៖ ធរណីមាត្រក្នុងលំហ Oxyz",
      title_en: "Unit 7: 3D Analytic Geometry in Space",
      description_km: "ផលគុណស្កាលែ ផលគុណវ៉ិចទ័រ ផលគុណចម្រុះ សមីការប្លង់ សមីការបន្ទាត់ និងសមីការស្វ៊ែរ",
      description_en: "Dot/cross products, scalar triple product, plane/line equations, distances, and sphere geometry in Oxyz",
      icon: "📐",
      lessonIds: [
        "les-g12-math-04",
        "les-g12-math-09",
        "les-g12-math-21",
        "les-g12-math-21-p1",
        "les-g12-math-21-p2",
        "les-g12-math-21-p3",
      ],
    },
  ],

  "12-physics": [
    {
      id: "unit-g12-phys-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ មេកានិច និងលំយោលសេរី",
      title_en: "Unit 1: Mechanics & Oscillations",
      description_km: "ប៉ោលទោល ប៉ោលអេឡាស្ទិច ថាមពលមេកានិចនៃលំយោល លំយោលបង្ខំ និងបាតុភូតរ៉េសូណង់មេកានិច",
      description_en: "Simple harmonic motion, elastic springs, mechanical oscillation energy, forced oscillations, and resonance",
      icon: "⏱️",
      lessonIds: ["les-g12-phys-01", "les-g12-phys-04", "les-g12-phys-06"],
    },
    {
      id: "unit-g12-phys-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ រលកមេកានិច និងរលកសំឡេង",
      title_en: "Unit 2: Mechanical Waves & Sound",
      description_km: "ការផ្សាយរលកមេកានិច អន្តរាគមន៍រលក រលកឈរលើខ្សែ អាំងតង់ស៊ីតេសំឡេង និងបាតុភូតដុបផ្លែ",
      description_en: "Wave propagation, mechanical wave interference, standing waves, acoustic decibels, and Doppler effect",
      icon: "〰️",
      lessonIds: ["les-g12-phys-02", "les-g12-phys-07", "les-g12-phys-08"],
    },
    {
      id: "unit-g12-phys-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ អគ្គិសនីឆ្លាស់ និងសៀគ្វី RLC",
      title_en: "Unit 3: AC Circuits & Electromagnetism",
      description_km: "ចរន្តអគ្គិសនីឆ្លាស់ សៀគ្វី RLC ស៊េរី អាំប៉េដង់ រ៉េសូណង់អគ្គិសនី ត្រង់ស្វូ និងការបញ្ជូនថាមពល",
      description_en: "Alternating currents, series RLC circuits, impedance, electrical resonance, transformers, and grid transmission",
      icon: "⚡",
      lessonIds: ["les-g12-phys-03", "les-g12-phys-09", "les-g12-phys-10"],
    },
    {
      id: "unit-g12-phys-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ អុបទិក និងរលកពន្លឺ",
      title_en: "Unit 4: Optics & Wave Optics",
      description_km: "ចំណាំងផ្លាតពន្លឺ ព្រីស ឡង់ទីស្តើង និងការពិសោធន៍ប្រហោងយ៉ាំង (Young's Slits) បង្ហាញធម្មជាតិរលក",
      description_en: "Snell's refraction, prisms, thin lenses, and Young's double slit interference demonstrating light wave nature",
      icon: "🔬",
      lessonIds: ["les-g12-phys-11", "les-g12-phys-12", "les-g12-phys-13"],
    },
    {
      id: "unit-g12-phys-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ រូបវិទ្យានុយក្លេអ៊ែរ និងកង់ទិច",
      title_en: "Unit 5: Nuclear & Quantum Physics",
      description_km: "ភូតូអេឡិចត្រិច ហ្វូតុង វិទ្យុសកម្មធម្មជាតិ ថាមពល E = mc² ប្រតិកម្មហ្វីស្យុង និងហ្វុយស្យុង",
      description_en: "Photoelectric effect, photons, radioactive decay law, binding energy E = mc², fission, and fusion",
      icon: "☢️",
      lessonIds: ["les-g12-phys-05", "les-g12-phys-14", "les-g12-phys-15"],
    },
  ],

  "12-chemistry": [
    {
      id: "unit-g12-chem-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ស៊ីនេទិចគីមី",
      title_en: "Unit 1: Chemical Kinetics",
      description_km: "ល្បឿនមធ្យម និងខណៈនៃប្រតិកម្មគីមី កត្តាជះឥទ្ធិពលលើល្បឿន និងតួនាទីរបស់កាតាលីករ",
      description_en: "Instantaneous and average reaction rates, kinetic factors, activation energy, and catalytic pathways",
      icon: "⏱️",
      lessonIds: ["les-g12-chem-01", "les-g12-chem-06"],
    },
    {
      id: "unit-g12-chem-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ លំនឹងគីមី",
      title_en: "Unit 2: Chemical Equilibrium",
      description_km: "ប្រតិកម្មទៅមក លំនឹងថាមវន្ត ថេរលំនឹង Kc និង Kp ព្រមទាំងគោលការណ៍ឡឺឆាតឺលីយេ (Le Chatelier)",
      description_en: "Dynamic reversible equilibrium, Kc and Kp constants, and Le Chatelier perturbation response",
      icon: "⚖️",
      lessonIds: ["les-g12-chem-02", "les-g12-chem-07"],
    },
    {
      id: "unit-g12-chem-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ អាស៊ីត-បាស ក្នុងសូលុយស្យុងទឹក",
      title_en: "Unit 3: Acids & Bases in Aqueous Solutions",
      description_km: "ទ្រឹស្តីប្រុងស្ទែត-ឡូរី គូអាស៊ីត-បាស មាត្រដ្ឋាន pH អត្រាកម្មអាស៊ីត-បាស និងសូលុយស្យុងទ្រនាប់",
      description_en: "Brønsted-Lowry conjugate pairs, pH and pOH calculations, titration curves, and physiological buffer systems",
      icon: "🧪",
      lessonIds: ["les-g12-chem-03", "les-g12-chem-08", "les-g12-chem-09"],
    },
    {
      id: "unit-g12-chem-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ អេឡិចត្រូគីមី",
      title_en: "Unit 4: Electrochemistry",
      description_km: "ប្រតិកម្មរេដុក ពីលហ្គាល់វ៉ានិច កម្លាំងអគ្គិសនីចលករស្តង់ដារ E° និងអេឡិចត្រូលីសតាមច្បាប់ហ្វារ៉ាដេ",
      description_en: "Redox reaction balancing, galvanic Voltaic cells, standard EMF E°cell, and Faraday's electrolysis laws",
      icon: "🔋",
      lessonIds: ["les-g12-chem-04", "les-g12-chem-10"],
    },
    {
      id: "unit-g12-chem-5",
      unitNumber: 5,
      title_km: "ជំពូកទី ៥ ៖ គីមីសរីរាង្គ",
      title_en: "Unit 5: Organic Chemistry",
      description_km: "អាល់កុល អាល់ដេអ៊ីត អាស៊ីតកាបុកស៊ីលិច អេស្ទែរ ខ្លាញ់ទ្រីគ្លីសេរីត សាប៊ូកម្ម អាមីន និងប៉ូលីមែ",
      description_en: "Alcohols, aldehydes, carboxylic acids, esters, triglycerides, saponification, amines, and synthetic polymers",
      icon: "🧬",
      lessonIds: ["les-g12-chem-05", "les-g12-chem-11", "les-g12-chem-12"],
    },
  ],

  "12-biology": [
    {
      id: "unit-g12-bio-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ហ្សែនវិទ្យាម៉ូលេគុល",
      title_en: "Unit 1: Molecular Genetics",
      description_km: "រចនាសម្ព័ន្ធ DNA និង RNA ស្វ័យតម្រងទ្វេនៃ DNA ការចម្លងក្រម និងការបកប្រែក្រមបង្កើតប្រូតេអ៊ីន",
      description_en: "Nucleic acids structure, DNA replication mechanism, transcription, and ribosomal translation of mRNA",
      icon: "🧬",
      lessonIds: ["les-g12-bio-01", "les-g12-bio-06", "les-g12-bio-07"],
    },
    {
      id: "unit-g12-bio-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ តំណពូជម៉ង់ដែល និងការបំប្លែងហ្សែន",
      title_en: "Unit 2: Mendelian Genetics & Mutations",
      description_km: "ច្បាប់តំណពូជម៉ង់ដែល ការបង្កាត់កូនពីរលក្ខណៈ តំណពូជភ្ជាប់ភេទ និងបម្រែបម្រួលហ្សែន-ក្រូម៉ូសូម",
      description_en: "Mendelian inheritance laws, dihybrid crosses, sex-linked genetics, pedigrees, and chromosomal mutations",
      icon: "🌱",
      lessonIds: ["les-g12-bio-02", "les-g12-bio-03", "les-g12-bio-08"],
    },
    {
      id: "unit-g12-bio-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ ប្រព័ន្ធការពាររាងកាយ (Immunology)",
      title_en: "Unit 3: Immunology & Human Defenses",
      description_km: "ភាពស៊ាំធម្មជាតិ និងបង្ក កោសិកា B, T អង់ទីហ្សែន អង់ទីគ័រ វ៉ាក់សាំង សេរ៉ូម និងជំងឺអេដស៍ HIV",
      description_en: "Innate and adaptive immunity, B/T cell humoral and cell-mediated responses, vaccines, and HIV pathogenesis",
      icon: "🛡️",
      lessonIds: ["les-g12-bio-04", "les-g12-bio-09", "les-g12-bio-10"],
    },
    {
      id: "unit-g12-bio-4",
      unitNumber: 4,
      title_km: "ជំពូកទី ៤ ៖ ទ្រឹស្តីវិវត្តន៍នៃភាវៈរស់",
      title_en: "Unit 4: Organic Evolution",
      description_km: "ភស្តុតាងនៃការវិវត្តន៍ ទ្រឹស្តីជ្រើសរើសដោយធម្មជាតិរបស់ដាវីន និងយន្តការនៃការកកើតប្រភេទថ្មី",
      description_en: "Fossil and comparative anatomical evidence of evolution, Darwin's natural selection, and speciation",
      icon: "🌍",
      lessonIds: ["les-g12-bio-05", "les-g12-bio-11"],
    },
  ],

  "12-earth": [
    {
      id: "unit-g12-earth-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ភូគព្ភសាស្ត្រ និងកម្លាំងផែនដី",
      title_en: "Unit 1: Geology & Earth Dynamics",
      description_km: "ទ្រឹស្តីផ្លាកតិចតូនិច ចលនាសំបកផែនដី រញ្ជួយដី ភ្នំភ្លើង និងការកាត់បន្ថយគ្រោះមហន្តរាយធម្មជាតិ",
      description_en: "Plate tectonics theory, lithosphere boundaries, earthquakes, volcanism, and early disaster hazard mitigation",
      icon: "🌋",
      lessonIds: ["les-g12-earth-06", "les-g12-earth-05"],
    },
    {
      id: "unit-g12-earth-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ធនធានទឹក និងបរិស្ថានវិទ្យាកម្ពុជា",
      title_en: "Unit 2: Hydrology & Cambodia Environment",
      description_km: "អាងទន្លេមេគង្គ បឹងទន្លេសាប យុទ្ធសាស្ត្រជាតិប្រែប្រួលអាកាសធាតុ និងថាមពលកកើតឡើងវិញ",
      description_en: "Mekong-Tonle Sap river basin governance, national climate strategy, and renewable solar/hydro energy",
      icon: "💧",
      lessonIds: ["les-g12-earth-02", "les-g12-earth-03", "les-g12-earth-04"],
    },
    {
      id: "unit-g12-earth-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ តារារូបវិទ្យា ជីវិតផ្កាយ និងចក្រវាល",
      title_en: "Unit 3: Astrophysics & Astronomy",
      description_km: "ប្រព័ន្ធព្រះអាទិត្យ ច្បាប់កែប្លែ ជីវិតផ្កាយ ប្រហោងខ្មៅ និងទ្រឹស្តីបន្ទុះធំ Big Bang",
      description_en: "Solar system dynamics, Kepler's orbital laws, stellar evolution lifecycles, black holes, and the Big Bang",
      icon: "🌌",
      lessonIds: ["les-g12-earth-01", "les-g12-earth-07"],
    },
  ],

  "12-khmer": [
    {
      id: "unit-g12-khmer-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ អក្សរសិល្ប៍បុរាណ ៖ រឿងរាមកេរ្តិ៍ខ្មែរ",
      title_en: "Unit 1: Classical Literature: Reamker Epic",
      description_km: "ការវិភាគតួអង្គព្រះរាម នាងសិតា ក្រុងរាពណ៍ ទស្សនវិជ្ជាសីលធម៌ និងឥទ្ធិពលពុទ្ធសាសនាក្នុងអក្សរសិល្ប៍ជាតិ",
      description_en: "Literary and ethical analysis of the Reamker epic, archetypal heroics, and Buddhist moral philosophy",
      icon: "👑",
      lessonIds: ["les-g12-khmer-01", "les-g12-khmer-05"],
    },
    {
      id: "unit-g12-khmer-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ អក្សរសិល្ប៍ទំនើប និងខេមរនិយម",
      title_en: "Unit 2: Modern Realist Literature",
      description_km: "ចលនាតស៊ូកសិករក្នុងរឿងភូមិតិរច្ឆាន ទស្សនៈមនុស្សធម៌ក្នុងរឿងកុលាបប៉ៃលិន និងការអប់រំក្នុងរឿងគ្រូបង្រៀនស្រុកស្រែ",
      description_en: "Peasant anticolonial resistance in Phum Tirachan, humanist realism in Kolap Pailin, and rural uplift in Krou Bongrean Srok Sre",
      icon: "📖",
      lessonIds: ["les-g12-khmer-02", "les-g12-khmer-03", "les-g12-khmer-06"],
    },
    {
      id: "unit-g12-khmer-3",
      unitNumber: 3,
      title_km: "ជំពូកទី ៣ ៖ វិជ្ជាតែងសេចក្តីបាក់ឌុប",
      title_en: "Unit 3: Bac II Essay Writing Methodology",
      description_km: "ក្បួនតែងសេចក្តីពន្យល់ ពិភាក្សា និងប្រៀបធៀបតួអង្គ ស្របតាមកម្រងសំណួរ និងស្តង់ដារវិញ្ញាសាជាតិ MoEYS",
      description_en: "MoEYS national examination essay frameworks: expository, discursive dialectical, and comparative literary synthesis",
      icon: "✍️",
      lessonIds: ["les-g12-khmer-04", "les-g12-khmer-07"],
    },
  ],

  "12-history": [
    {
      id: "unit-g12-hist-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ប្រវត្តិសាស្ត្រកម្ពុជាសម័យទំនើប",
      title_en: "Unit 1: Modern Cambodian History",
      description_km: "អាណាព្យាបាលបារាំង សង្គមរាស្ត្រនិយម សាធារណរដ្ឋខ្មែរ របបកម្ពុជាប្រជាធិបតេយ្យ និងកិច្ចព្រមព្រៀងសន្តិភាពប៉ារីស",
      description_en: "French protectorate, Sangkum era, Khmer Republic, Khmer Rouge regime, 1991 Paris Peace Accords, and Win-Win reunification",
      icon: "🏛️",
      lessonIds: ["les-g12-hist-01", "les-g12-hist-02", "les-g12-hist-05", "les-g12-hist-06"],
    },
    {
      id: "unit-g12-hist-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ប្រវត្តិសាស្ត្រពិភពលោកសហសម័យ",
      title_en: "Unit 2: Contemporary World History",
      description_km: "សង្គ្រាមត្រជាក់ ការប្រកួតប្រជែងមហាអំណាច តួនាទីអង្គការសហប្រជាជាតិ UN និងសមាគមប្រជាជាតិអាស៊ីអាគ្នេយ៍ ASEAN",
      description_en: "Cold War geopolitical polarization, United Nations peacekeeping, and ASEAN regional multilateral integration",
      icon: "🌏",
      lessonIds: ["les-g12-hist-03", "les-g12-hist-04"],
    },
  ],

  "12-geography": [
    {
      id: "unit-g12-geo-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ ភូមិសាស្ត្រសេដ្ឋកិច្ចកម្ពុជា",
      title_en: "Unit 1: Economic Geography of Cambodia",
      description_km: "វិស័យកសិកម្ម ឧស្សាហកម្ម សេវាកម្ម តំបន់សេដ្ឋកិច្ចពិសេស ច្រករបៀងដឹកជញ្ជូន និងទេសចរណ៍បេតិកភណ្ឌ",
      description_en: "Four economic pillars, special economic zones, logistics connectivity, and cultural/ecotourism revenue engines",
      icon: "🗺️",
      lessonIds: ["les-g12-geo-01", "les-g12-geo-02", "les-g12-geo-05"],
    },
    {
      id: "unit-g12-geo-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ បរិស្ថាន និងការអភិវឌ្ឍប្រកបដោយចីរភាព",
      title_en: "Unit 2: Environment & Sustainable Development",
      description_km: "ប្រព័ន្ធទឹកទន្លេមេគង្គ-បឹងទន្លេសាប ការប្រែប្រួលអាកាសធាតុ នគរូបនីយកម្ម និងទីក្រុងបៃតងឆ្លាតវៃ",
      description_en: "Mekong-Tonle Sap hydrology, climate resilience adaptation, urban sprawl management, and smart green cities",
      icon: "🏙️",
      lessonIds: ["les-g12-geo-03", "les-g12-geo-04", "les-g12-geo-06"],
    },
  ],

  "12-ict": [
    {
      id: "unit-g12-ict-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ មូលដ្ឋានគ្រឹះសរសេរកម្មវិធី",
      title_en: "Unit 1: Foundations of Programming",
      description_km: "ក្បួនដោះស្រាយ Algorithm គំនូសតាងលំហូរ Flowchart និងមូលដ្ឋានគ្រឹះភាសាសរសេរកូដ Python សម្រាប់វិភាគទិន្នន័យ",
      description_en: "Algorithmic thinking, flowchart logic, and fundamental Python coding constructs for data and modern applications",
      icon: "💻",
      lessonIds: ["les-g12-ict-01", "les-g12-ict-03"],
    },
    {
      id: "unit-g12-ict-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ បណ្តាញ និងសន្តិសុខឌីជីថល",
      title_en: "Unit 2: Networks & Cybersecurity",
      description_km: "ប្រព័ន្ធមូលដ្ឋានទិន្នន័យ SQL បណ្តាញកុំព្យូទ័រ TCP/IP សុវត្ថិភាពព័ត៌មាន Cyber Hygiene និងច្បាប់ឌីជីថល",
      description_en: "Relational database SQL querying, computer networking TCP/IP, cybersecurity defenses, and digital ethics",
      icon: "🛡️",
      lessonIds: ["les-g12-ict-02", "les-g12-ict-04"],
    },
  ],

  "12-morality": [
    {
      id: "unit-g12-moral-1",
      unitNumber: 1,
      title_km: "ជំពូកទី ១ ៖ សីលធម៌ និងតម្លៃសង្គម",
      title_en: "Unit 1: Ethics & Societal Values",
      description_km: "មនសិការវិជ្ជាជីវៈ សច្ចធម៌ វប្បធម៌សន្តិភាព និងការដោះស្រាយវិវាទដោយអហិង្សា និងការសម្រុះសម្រួល",
      description_en: "Professional ethics, civic conscience, culture of peace, and nonviolent dialogue/mediation frameworks",
      icon: "🤝",
      lessonIds: ["les-g12-moral-01", "les-g12-moral-03"],
    },
    {
      id: "unit-g12-moral-2",
      unitNumber: 2,
      title_km: "ជំពូកទី ២ ៖ ច្បាប់ និងអភិបាលកិច្ច",
      title_en: "Unit 2: Law & Democratic Governance",
      description_km: "រដ្ឋធម្មនុញ្ញ នីតិរដ្ឋ សេចក្តីប្រកាសសកលស្តីពីសិទ្ធិមនុស្ស និងការចូលរួមជាពលរដ្ឋសកម្ម",
      description_en: "Constitutional democracy, rule of law, Universal Declaration of Human Rights, and active civic participation",
      icon: "⚖️",
      lessonIds: ["les-g12-moral-02", "les-g12-moral-04"],
    },
  ],

  "12-english": [
    {
      id: "unit-g12-eng-1",
      unitNumber: 1,
      title_km: "Unit 1: Advanced Academic Reading & Scientific Discourse",
      title_en: "Unit 1: Advanced Academic Reading & Scientific Discourse",
      description_km: "យុទ្ធសាស្ត្រអំណាន Skimming/Scanning ការវិភាគអត្ថបទវិទ្យាសាស្ត្រ និងសេដ្ឋកិច្ចសកលក្នុងវិញ្ញាសាបាក់ឌុប",
      description_en: "Advanced reading comprehension strategies, scientific and socio-economic texts for national examination prep",
      icon: "📖",
      lessonIds: ["les-g12-eng-01", "les-g12-eng-03"],
    },
    {
      id: "unit-g12-eng-2",
      unitNumber: 2,
      title_km: "Unit 2: Baccalaureate Exam Grammar & Composition",
      title_en: "Unit 2: Baccalaureate Exam Grammar & Composition",
      description_km: "វេយ្យាករណ៍បាក់ឌុប Inversion, Conditionals, Relative Clauses និងវិធីសាស្ត្រតែងសេចក្តី Argumentative ៥ កថាខណ្ឌ",
      description_en: "High-level grammatical structures and 5-paragraph argumentative essay composition with transitional cohesion",
      icon: "🎓",
      lessonIds: ["les-g12-eng-02", "les-g12-eng-04"],
    },
  ],
};

// Generic fallback unit partitioner
function buildGenericUnitsForSubject(
  lessons: LessonNode[],
  grade: number,
  subjectSlug: string,
): CurriculumUnitDefinition[] {
  if (lessons.length === 0) return [];

  // Break into 2 or 3 units (e.g. 2 lessons per unit)
  const units: CurriculumUnitDefinition[] = [];
  const chunkSize = lessons.length <= 3 ? lessons.length : 2;

  let unitNum = 1;
  for (let i = 0; i < lessons.length; i += chunkSize) {
    const chunk = lessons.slice(i, i + chunkSize);
    // If the final remaining chunk only has 1 lesson and we already have units,
    // merge it with the preceding unit so no unit ever has only 1 lonely lesson!
    if (chunk.length === 1 && units.length > 0) {
      units[units.length - 1].lessonIds.push(...chunk.map((l) => l.id));
      continue;
    }
    const firstLesson = chunk[0];
    const unitTitleKm =
      unitNum === 1
        ? `គ្រឹះមូលដ្ឋាន ${firstLesson.subject?.name_km || "មេរៀន"}`
        : unitNum === 2
          ? `ទ្រឹស្តីអនុវត្ត និងដំណោះស្រាយ ${firstLesson.subject?.name_km || "មេរៀន"}`
          : `ការអនុវត្តកម្រិតខ្ពស់ និងលំហាត់ត្រៀមប្រឡង`;

    const unitTitleEn =
      unitNum === 1
        ? `Foundations of ${firstLesson.subject?.name_en || "Subject"}`
        : unitNum === 2
          ? `Applied Principles & Problem Solving`
          : `Advanced Applications & Exam Practice`;

    units.push({
      id: `unit-g${grade}-${subjectSlug}-${unitNum}`,
      unitNumber: unitNum,
      title_km: unitTitleKm,
      title_en: unitTitleEn,
      description_km:
        firstLesson.summary_km || "សិក្សាស្វែងយល់តាមលំដាប់លំដោយ ពីកម្រិតគ្រឹះដល់កម្រិតខ្ពស់",
      description_en:
        firstLesson.summary_en ||
        "Step-by-step master track from core principles to advanced mastery",
      icon: unitNum === 1 ? "📘" : unitNum === 2 ? "📙" : "🎓",
      lessonIds: chunk.map((l) => l.id),
    });
    unitNum++;
  }

  return units;
}

export type UnitWithLessons = {
  unit: CurriculumUnitDefinition;
  lessons: LessonNode[];
  isLocked: boolean;
  isCompleted: boolean;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
};

/**
 * Partitions a list of lessons into authentic, sequential Units.
 * - When `subjectSlug` is provided: breaks down that subject's lessons into Unit 1, Unit 2, Unit 3...
 * - When `subjectSlug` is NOT provided (All Subjects view): breaks down by subject across all 11 MoEYS disciplines
 */
export function groupLessonsIntoUnits(
  lessons: LessonNode[],
  grade: number,
  subjectSlug?: string,
  completedIds: Set<string> = new Set(),
): UnitWithLessons[] {
  if (lessons.length === 0) return [];

  // ============================================================================
  // CASE A: ALL SUBJECTS VIEW (No specific subject selected)
  // Each MoEYS discipline forms a dedicated sequential Unit!
  // ============================================================================
  if (!subjectSlug || subjectSlug === "all") {
    const subjectsBase = [
      { slug: "mathematics", name_km: "គណិតវិទ្យា", name_en: "Mathematics", icon: "📐" },
      { slug: "khmer", name_km: "ភាសាខ្មែរ", name_en: "Khmer Literature", icon: "📖" },
      { slug: "physics", name_km: "រូបវិទ្យា", name_en: "Physics", icon: "⚛️" },
      { slug: "chemistry", name_km: "គីមីវិទ្យា", name_en: "Chemistry", icon: "🧪" },
      { slug: "biology", name_km: "ជីវវិទ្យា", name_en: "Biology", icon: "🧬" },
      { slug: "history", name_km: "ប្រវត្តិវិទ្យា", name_en: "History", icon: "🏛️" },
      { slug: "geography", name_km: "ភូមិវិទ្យា", name_en: "Geography", icon: "🗺️" },
      { slug: "english", name_km: "ភាសាអង់គ្លេស", name_en: "English", icon: "🔤" },
      { slug: "earth", name_km: "ផែនដីវិទ្យា", name_en: "Earth Science", icon: "🌍" },
      { slug: "ict", name_km: "ព័ត៌មានវិទ្យា", name_en: "ICT & Computing", icon: "💻" },
      { slug: "morality", name_km: "សីលធម៌ និងពលរដ្ឋវិជ្ជា", name_en: "Moral & Civics", icon: "🤝" },
    ];

    const getGradeSubjectSummary = (slug: string, g: number) => {
      switch (slug) {
        case "mathematics":
          if (g === 7) return { km: "ចំនួនគត់ ប្រភាគ សមីការដឺក្រេទី ១ និងធរណីមាត្រគ្រឹះ", en: "Integers, fractions, linear equations, and basic geometry" };
          if (g === 8) return { km: "ចំនួនសនិទាន ស្វ័យគុណ កន្សោមពីជគណិត និងទ្រឹស្តីបទពីតាក័រ", en: "Rational numbers, powers, polynomials, and Pythagorean theorem" };
          if (g === 9) return { km: "សមីការដឺក្រេទី ២ ប្រព័ន្ធសមីការ ត្រីកោណមាត្រគ្រឹះ និងរង្វង់", en: "Quadratic equations, linear systems, basic trigonometry, and circle geometry" };
          if (g === 10) return { km: "អនុគមន៍ដឺក្រេទី ២ ប៉ារ៉ាបូល វ៉ិចទ័រក្នុងប្លង់ និងត្រីកោណមាត្រ", en: "Quadratic functions, parabolas, plane vectors, and trigonometry" };
          if (g === 11) return { km: "ស្វ៊ីតចំនួន លីមីត ដេរីវេគ្រឹះ និងធរណីមាត្រក្នុងលំហ", en: "Sequences, limits, introductory derivatives, and spatial geometry" };
          return { km: "អាំងតេក្រាល ចំនួនកុំផ្លិច សមីការឌីផេរ៉ង់ស្យែល និងប្រូបាប៊ីលីតេ", en: "Definite integrals, complex numbers, differential equations, and probability" };

        case "khmer":
          if (g === 7) return { km: "ច្បាប់ប្រុស ច្បាប់ស្រី សញ្ញាវណ្ណយុត្តិ និងវេយ្យាករណ៍គ្រឹះ", en: "Didactic poetry, punctuation rules, and foundational Khmer grammar" };
          if (g === 8) return { km: "រឿងកុលាបប៉ៃលិន កាព្យ ៧ ពាក្យ និងតែងសេចក្តីពណ៌នា", en: "Kolab Pailin novel, 7-word poetic meter, and descriptive essays" };
          if (g === 9) return { km: "រឿងទុំទាវ កាព្យ ៨ ពាក្យ និងតែងសេចក្តីពន្យល់", en: "Tum Teav epic, 8-word meter, and explanatory essays" };
          if (g === 10) return { km: "រឿងរាមកេរ្តិ៍ខ្មែរ ក្បួនវេយ្យាករណ៍ស៊ីជម្រៅ និងតែងសេចក្តីពិភាក្សា", en: "Reamker epic, advanced grammar, and argumentative essay composition" };
          if (g === 11) return { km: "រឿងភូមិតិរច្ឆាន រឿងថៅកែចិត្តចោរ និងតែងសេចក្តីប្រៀបធៀប", en: "Phum Tirachan, Thao Ke Chet Chor, and comparative literary essays" };
          return { km: "អក្សរសិល្ប៍ តែងសេចក្តីបាក់ឌុប និងវិចារណកថាជាតិ", en: "Bac II examination essays, literary critiques, and analytical synthesis" };

        case "physics":
          if (g === 7) return { km: "រង្វាស់រង្វាល់ ម៉ាសមាឌ ដង់ស៊ីតេ និងកម្លាំងគ្រឹះ", en: "Units of measurement, mass density, force concepts, and temperature" };
          if (g === 8) return { km: "ល្បឿន សម្ពាធ កម្លាំងរុញអាកស៊ីម៉ែត ការងារ និងអានុភាព", en: "Speed, fluid pressure, Archimedes buoyant force, work, and power" };
          if (g === 9) return { km: "ច្បាប់ញូតុន ថាមពលស៊ីនេទិច ច្បាប់អូម និងអានុភាពអគ្គិសនី", en: "Newton's laws, kinetic energy, Ohm's law, and electric power" };
          if (g === 10) return { km: "ចលនាស្ទុះស្មើ ទំនាញសកល កម្លាំងកកិត និងច្បាប់រក្សាថាមពល", en: "Accelerated motion, gravitation, friction, and mechanical energy conservation" };
          if (g === 11) return { km: "អគ្គិសនីស្ទាទិច ច្បាប់គូឡុំ ដែនម៉ាញេទិច និងអាំងឌុចស្យុង", en: "Electrostatics, Coulomb's law, magnetic fields, and induction" };
          return { km: "លំយោលមេកានិច ប៉ោល រលក សៀគ្វី RLC និងរូបវិទ្យានុយក្លេអ៊ែរ", en: "Oscillations, wave propagation, AC circuits, and nuclear physics" };

        case "chemistry":
          if (g === 7) return { km: "រូបធាតុ ភាពរូប ទឹក បរិយាកាស និងបាតុភូតរូប-គីមី", en: "States of matter, water, air composition, and physical changes" };
          if (g === 8) return { km: "អាតូម ម៉ូលេគុល វ៉ាឡង់ និងច្បាប់រក្សាម៉ាសឡាវ័រហ្ស៊ីយេ", en: "Atoms, molecules, valency, and Lavoisier conservation of mass" };
          if (g === 9) return { km: "ម៉ូល សូលុយស្យុង កំហាប់ អាស៊ីត-បាស និងស៊េរីសកម្មភាពលោហៈ", en: "Mole calculations, molarity, acids-bases, and metal reactivity series" };
          if (g === 10) return { km: "រចនាសម្ព័ន្ធអាតូម តារាងខួប សម្ព័ន្ធគីមី និងឧស្ម័នបរិសុទ្ធ", en: "Atomic structure, periodic table, chemical bonds, and ideal gases" };
          if (g === 11) return { km: "ស៊ីនេទិចគីមី ល្បឿនប្រតិកម្ម លំនឹង និងអ៊ីដ្រូកាបួ (អាល់កាន)", en: "Reaction kinetics, chemical equilibrium, and organic hydrocarbons" };
          return { km: "លំនឹងគីមី គណនា pH អេស្ទែរ ខ្លាញ់ និងសាប៊ូកម្មបាក់ឌុប", en: "Chemical equilibrium, pH titration, esters, lipids, and polymers" };

        case "biology":
          if (g === 7) return { km: "កោសិកាភាវៈរស់ រចនាសម្ព័ន្ធរុក្ខជាតិ និងការធ្វើរស្មីសំយោគ", en: "Living cells, plant structures, and photosynthesis fundamentals" };
          if (g === 8) return { km: "ប្រព័ន្ធរំលាយអាហារ ប្រព័ន្ធឈាមរត់ និងដង្ហើមមនុស្ស", en: "Human digestive, circulatory, and respiratory systems" };
          if (g === 9) return { km: "ច្បាប់តំណពូជម៉ង់ដែល ក្រូម៉ូសូម និងការបន្តពូជ", en: "Mendelian genetics, chromosome inheritance, and reproduction" };
          if (g === 10) return { km: "ម៉ាក្រូម៉ូលេគុលជីវសាស្ត្រ អង់ស៊ីម ការបែងចែកកោសិកាមីតូស និងមេយ៉ូស", en: "Macromolecules, enzyme catalysts, mitosis, and meiosis" };
          if (g === 11) return { km: "រស្មីសំយោគស៊ីជម្រៅ ដង្ហើមកោសិកា ការសំយោគប្រូតេអ៊ីន និងហ្សែន", en: "Calvin cycle, cellular respiration, protein synthesis, and mutations" };
          return { km: "ហ្សែនវិទ្យាម៉ូលេគុល ការគណនាប្រវែង DNA ភាពស៊ាំ និងវិវត្តន៍", en: "Molecular genetics, DNA calculations, immunology, and evolution" };

        case "earth":
          if (g === 7) return { km: "ស្រទាប់ផែនដី ស្រទាប់បរិយាកាស និងវដ្តទឹក", en: "Earth layers, atmosphere strata, and hydrological cycle" };
          if (g === 8) return { km: "បន្ទះតិចតូនិក រញ្ជួយដី ភ្នំភ្លើង និងធនធានរ៉ែ", en: "Plate tectonics, earthquakes, volcanoes, and mineral resources" };
          if (g === 9) return { km: "អាកាសធាតុ ឧស្ម័នផ្ទះកញ្ចក់ និងបម្រែបម្រួលអាកាសធាតុ", en: "Atmospheric dynamics, greenhouse effect, and climate resilience" };
          if (g === 10) return { km: "ភូមិវិទ្យារូបវន្ត ស្រទាប់ថ្ម ផ្នត់ កំហុស និងផូស៊ីល", en: "Physical geology, rock strata, folds, faults, and fossils" };
          if (g === 11) return { km: "មហាសមុទ្រវិទ្យា ចរន្តទឹកសមុទ្រ វដ្តជីវគីមី និងតារាសាស្ត្រ", en: "Oceanography, ocean currents, biogeochemical cycles, and astronomy" };
          return { km: "តារារូបវិទ្យា ជីវិតផ្កាយ គ្រោះមហន្តរាយធម្មជាតិ និងថាមពលកកើតឡើងវិញ", en: "Astrophysics, stellar evolution, natural hazards, and renewable energy" };

        case "history":
          if (g === 7) return { km: "បុរេប្រវត្តិសាស្ត្រកម្ពុជា នគរភ្នំ និងចេនឡា", en: "Prehistoric Cambodia, Funan, and Chenla eras" };
          if (g === 8) return { km: "ចក្រភពអង្គរ រជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧ និងអរិយធម៌ខ្មែរ", en: "Angkorian Empire, King Jayavarman VII, and classical Khmer civilization" };
          if (g === 9) return { km: "សម័យកណ្តាល លង្វែក ឧដុង្គ និងការបែកបាក់ជាតិ", en: "Post-Angkorian middle period, Longvek, Oudong, and internal strife" };
          if (g === 10) return { km: "កម្ពុជាសម័យអាណាព្យាបាលបារាំង និងការទាមទារឯករាជ្យ", en: "French Protectorate era, administrative reforms, and anti-colonial movements" };
          if (g === 11) return { km: "សម័យសង្គមរាស្ត្រនិយម និងសម័យសាធារណរដ្ឋខ្មែរ (១៩៧០-១៩៧៥)", en: "Sangkum Reastr Niyum and the Khmer Republic period (1970–1975)" };
          return { km: "កម្ពុជាប្រជាធិបតេយ្យ កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស និងនយោបាយឈ្នះ-ឈ្នះ", en: "Democratic Kampuchea, 1991 Paris Peace Agreements, and Win-Win Policy" };

        case "geography":
          if (g === 7) return { km: "ផែនទី ភូមិសាស្ត្រធម្មជាតិកម្ពុជា ជួរភ្នំ និងប្រព័ន្ធទន្លេ", en: "Map projections, physical geography, mountain ranges, and rivers" };
          if (g === 8) return { km: "អាកាសធាតុកម្ពុជា ធនធានធម្មជាតិ និងកសិកម្មគ្រួសារ", en: "Climate patterns, natural resources, and agricultural economy" };
          if (g === 9) return { km: "ប្រជាសាស្ត្រ ការបម្លាស់ទីលំនៅ និងការអភិវឌ្ឍទីក្រុង", en: "Demographics, population migration, and urban development" };
          if (g === 10) return { km: "ភូមិសាស្ត្រសេដ្ឋកិច្ចកម្ពុជា ហេដ្ឋារចនាសម្ព័ន្ធ និងឧស្សាហកម្ម", en: "Economic geography, transport infrastructure, and industrial zones" };
          if (g === 11) return { km: "សមាហរណកម្មអាស៊ាន និងភូមិសាស្ត្រតំបន់អាស៊ីអាគ្នេយ៍", en: "ASEAN economic integration and Southeast Asian regional geography" };
          return { km: "សាកលភាវូបនីយកម្ម ភូមិសាស្ត្រនយោបាយពិពភលោក និងការអភិវឌ្ឍចីរភាព", en: "Economic globalization, world geopolitics, and sustainable development" };

        case "english":
          if (g === 7) return { km: "Present simple, classroom language, greetings & dialogs", en: "Basic present tense, classroom language, and daily conversations" };
          if (g === 8) return { km: "Past simple, comparative adjectives, and narrative reading", en: "Past narrative tenses, comparatives, and reading comprehension" };
          if (g === 9) return { km: "Present perfect, passive voice, and paragraph writing", en: "Present perfect, passive structures, and structured paragraphs" };
          if (g === 10) return { km: "Modal verbs, conditionals, and intermediate reading", en: "Modal auxiliaries, conditionals, and reading comprehension" };
          if (g === 11) return { km: "Relative clauses, reported speech, and argumentative essays", en: "Relative clauses, indirect speech, and opinion essay writing" };
          return { km: "Academic reading comprehension, advanced syntax, and Bac II mastery", en: "Advanced syntax, formal academic essays, and Bac II exam mastery" };

        case "ict":
          if (g <= 9) return { km: "ផ្នែករឹង ប្រព័ន្ធប្រតិបត្តិការ វាយអត្ថបទ និងសន្លឹកកិច្ចការគ្រឹះ", en: "Computer hardware, operating systems, word processing, and spreadsheets" };
          return { km: "ក្បួនដោះស្រាយ (Algorithms) គំនូសតាងលំហូរ មូលដ្ឋានទិន្នន័យ និងកូដគ្រឹះ", en: "Algorithms, flowcharts, relational databases, and coding" };

        case "morality":
          if (g <= 9) return { km: "សីលធម៌ក្នុងគ្រួសារ សាលារៀន វប្បធម៌ និងសិទ្ធិកុមារ", en: "Family ethics, school discipline, cultural heritage, and child rights" };
          return { km: "នីតិរដ្ឋ រដ្ឋធម្មនុញ្ញ សិទ្ធិមនុស្ស និងសីលធម៌សកល", en: "Rule of law, constitution, democratic institutions, and human rights" };

        default:
          return { km: "មេរៀនស្តង់ដារជាតិ MoEYS", en: "Official MoEYS curriculum module" };
      }
    };

    const subjectsOrder = subjectsBase.map((s) => {
      const summary = getGradeSubjectSummary(s.slug, grade);
      return {
        ...s,
        desc_km: summary.km,
        desc_en: summary.en,
      };
    });

    const result: UnitWithLessons[] = [];
    let unitIndex = 0;
    const handledSubjectSlugs = new Set<string>();

    for (const sub of subjectsOrder) {
      const subjectLessons = lessons.filter((l) => l.subject?.slug === sub.slug);
      if (subjectLessons.length === 0) continue;

      handledSubjectSlugs.add(sub.slug);
      unitIndex++;
      const unitDef: CurriculumUnitDefinition = {
        id: `unit-all-g${grade}-${sub.slug}`,
        unitNumber: unitIndex,
        title_km: sub.name_km,
        title_en: sub.name_en,
        description_km: sub.desc_km,
        description_en: sub.desc_en,
        icon: sub.icon,
        lessonIds: subjectLessons.map((l) => l.id),
      };

      const completedInUnit = subjectLessons.filter((l) => completedIds.has(l.id)).length;
      const isCompleted = completedInUnit === subjectLessons.length;
      // Sequential unit locking: Unit 1 unlocked, Unit N unlocked when previous is completed
      const isLocked = unitIndex > 1 && !result[unitIndex - 2]?.isCompleted;

      result.push({
        unit: unitDef,
        lessons: subjectLessons,
        isLocked,
        isCompleted,
        completedCount: completedInUnit,
        totalCount: subjectLessons.length,
        progressPercent:
          subjectLessons.length > 0
            ? Math.round((completedInUnit / subjectLessons.length) * 100)
            : 0,
      });
    }

    // Safety fallback: capture any custom/unlisted subjects so no lessons are ever dropped
    const leftoverLessons = lessons.filter(
      (l) => l.subject?.slug && !handledSubjectSlugs.has(l.subject.slug),
    );
    if (leftoverLessons.length > 0) {
      unitIndex++;
      const firstL = leftoverLessons[0];
      const leftoverDef: CurriculumUnitDefinition = {
        id: `unit-all-g${grade}-custom`,
        unitNumber: unitIndex,
        title_km: firstL.subject?.name_km || "មុខវិជ្ជាបន្ថែម",
        title_en: firstL.subject?.name_en || "Additional Studies",
        description_km: "មេរៀនស្តង់ដារជាតិ MoEYS បន្ថែម",
        description_en: "Supplementary MoEYS National Curriculum modules",
        icon: "📚",
        lessonIds: leftoverLessons.map((l) => l.id),
      };
      const completedLeft = leftoverLessons.filter((l) => completedIds.has(l.id)).length;
      result.push({
        unit: leftoverDef,
        lessons: leftoverLessons,
        isLocked: unitIndex > 1 && !result[unitIndex - 2]?.isCompleted,
        isCompleted: completedLeft === leftoverLessons.length,
        completedCount: completedLeft,
        totalCount: leftoverLessons.length,
        progressPercent:
          leftoverLessons.length > 0
            ? Math.round((completedLeft / leftoverLessons.length) * 100)
            : 0,
      });
    }

    return result;
  }

  // ============================================================================
  // CASE B: SPECIFIC SUBJECT VIEW (e.g. Mathematics Grade 9, Khmer Grade 12)
  // Partition lessons into official chapters starting from Unit 1 (ជំពូកទី ១)
  // ============================================================================
  const registryKey = `${grade}-${subjectSlug}`;
  let unitDefs = MOEYS_UNITS_REGISTRY[registryKey];

  if (!unitDefs || unitDefs.length === 0) {
    unitDefs = buildGenericUnitsForSubject(lessons, grade, subjectSlug);
  }

  const result: UnitWithLessons[] = [];
  const lessonMap = new Map(lessons.map((l) => [l.id, l]));
  const claimedLessonIds = new Set<string>();

  for (let i = 0; i < unitDefs.length; i++) {
    const def = unitDefs[i];
    const unitLessons: LessonNode[] = [];

    for (const id of def.lessonIds) {
      const found = lessonMap.get(id);
      if (found) {
        unitLessons.push(found);
        claimedLessonIds.add(id);
      }
    }

    if (unitLessons.length === 0) continue;

    const completedInUnit = unitLessons.filter((l) => completedIds.has(l.id)).length;
    const isCompleted = completedInUnit === unitLessons.length;
    // Sequential unit locking: Unit 1 is always unlocked. Unit N is locked until Unit N-1 is 100% completed!
    const isLocked = i > 0 && !result[i - 1]?.isCompleted;

    result.push({
      unit: def,
      lessons: unitLessons,
      isLocked,
      isCompleted,
      completedCount: completedInUnit,
      totalCount: unitLessons.length,
      progressPercent:
        unitLessons.length > 0 ? Math.round((completedInUnit / unitLessons.length) * 100) : 0,
    });
  }

  // Handle any remaining unclaimed lessons (e.g. newly added or custom)
  const remainingLessons = lessons.filter((l) => !claimedLessonIds.has(l.id));
  if (remainingLessons.length > 0) {
    const nextUnitNum = result.length + 1;
    const fallbackDef: CurriculumUnitDefinition = {
      id: `unit-g${grade}-${subjectSlug}-extra`,
      unitNumber: nextUnitNum,
      title_km: `ការអនុវត្ត និងលំហាត់បន្ថែម`,
      title_en: `Extended Practice & Mastery`,
      description_km: `លំហាត់អនុវត្តជាក់ស្តែង និងត្រៀមប្រឡងស្ដង់ដារ MoEYS`,
      description_en: `Applied exercises and MoEYS standard exam preparation modules`,
      icon: "🎯",
      lessonIds: remainingLessons.map((l) => l.id),
    };

    const completedInRemaining = remainingLessons.filter((l) => completedIds.has(l.id)).length;
    result.push({
      unit: fallbackDef,
      lessons: remainingLessons,
      isLocked: result.length > 0 && !result[result.length - 1]?.isCompleted,
      isCompleted: completedInRemaining === remainingLessons.length,
      completedCount: completedInRemaining,
      totalCount: remainingLessons.length,
      progressPercent:
        remainingLessons.length > 0
          ? Math.round((completedInRemaining / remainingLessons.length) * 100)
          : 0,
    });
  }

  return result;
}
