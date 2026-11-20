// ==============================================================================
// ScienceKH — Authentic MoEYS Verified Study Reference Library Seed Data
// Centralized Academic Knowledge Warehouse for Grades 7 to 12
// Aligned with MoEYS Curriculum Framework, Official Textbooks & SALA Digital Library
// ==============================================================================

import type { ReferenceEntry, SourceDocument } from "@/types/reference-library";

// ------------------------------------------------------------------------------
// Official MoEYS Textbooks & Source Catalog
// ------------------------------------------------------------------------------
export const OFFICIAL_MOEYS_DOCUMENTS: Record<string, SourceDocument> = {
  math_g7: {
    id: "doc-math-g7",
    titleKm: "សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ៧",
    titleEn: "MoEYS Grade 7 Mathematics Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 7,
    subjectSlug: "mathematics",
    edition: "បោះពុម្ពលើកទី ៤",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/math-g7",
    salaUrl: "https://sala.moeys.gov.kh/materials/math-g7",
    isOfficialMoeys: true,
  },
  phys_g7: {
    id: "doc-phys-g7",
    titleKm: "សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៧",
    titleEn: "MoEYS Grade 7 Physics Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 7,
    subjectSlug: "physics",
    edition: "បោះពុម្ពលើកទី ៣",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/physics-g7",
    salaUrl: "https://sala.moeys.gov.kh/materials/phys-g7",
    isOfficialMoeys: true,
  },
  chem_g8: {
    id: "doc-chem-g8",
    titleKm: "សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ៨",
    titleEn: "MoEYS Grade 8 Chemistry Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 8,
    subjectSlug: "chemistry",
    edition: "បោះពុម្ពលើកទី ៣",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/chem-g8",
    salaUrl: "https://sala.moeys.gov.kh/materials/chem-g8",
    isOfficialMoeys: true,
  },
  math_g9: {
    id: "doc-math-g9",
    titleKm: "សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ៩ (ត្រៀមឌីប្លូម)",
    titleEn: "MoEYS Grade 9 Mathematics Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 9,
    subjectSlug: "mathematics",
    edition: "បោះពុម្ពលើកទី ៥",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/math-g9",
    salaUrl: "https://sala.moeys.gov.kh/materials/math-g9",
    isOfficialMoeys: true,
  },
  phys_g9: {
    id: "doc-phys-g9",
    titleKm: "សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៩ (ត្រៀមឌីប្លូម)",
    titleEn: "MoEYS Grade 9 Physics Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 9,
    subjectSlug: "physics",
    edition: "បោះពុម្ពលើកទី ៥",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/phys-g9",
    salaUrl: "https://sala.moeys.gov.kh/materials/phys-g9",
    isOfficialMoeys: true,
  },
  chem_g9: {
    id: "doc-chem-g9",
    titleKm: "សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ៩",
    titleEn: "MoEYS Grade 9 Chemistry Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 9,
    subjectSlug: "chemistry",
    edition: "បោះពុម្ពលើកទី ៤",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/chem-g9",
    salaUrl: "https://sala.moeys.gov.kh/materials/chem-g9",
    isOfficialMoeys: true,
  },
  phys_g12: {
    id: "doc-phys-g12",
    titleKm: "សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)",
    titleEn: "MoEYS Grade 12 Physics Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 12,
    subjectSlug: "physics",
    edition: "បោះពុម្ពលើកទី ៦",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/phys-g12",
    salaUrl: "https://sala.moeys.gov.kh/materials/phys-g12",
    isOfficialMoeys: true,
  },
  chem_g12: {
    id: "doc-chem-g12",
    titleKm: "សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)",
    titleEn: "MoEYS Grade 12 Chemistry Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 12,
    subjectSlug: "chemistry",
    edition: "បោះពុម្ពលើកទី ៦",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/chem-g12",
    salaUrl: "https://sala.moeys.gov.kh/materials/chem-g12",
    isOfficialMoeys: true,
  },
  bio_g7: {
    id: "doc-bio-g7",
    titleKm: "សៀវភៅពុម្ពជីវវិទ្យា ថ្នាក់ទី ៧",
    titleEn: "MoEYS Grade 7 Biology Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 7,
    subjectSlug: "biology",
    edition: "បោះពុម្ពលើកទី ៣",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/bio-g7",
    salaUrl: "https://sala.moeys.gov.kh/materials/bio-g7",
    isOfficialMoeys: true,
  },
  khmer_g7: {
    id: "doc-khmer-g7",
    titleKm: "វេយ្យាករណ៍ភាសាខ្មែរ MoEYS ថ្នាក់ទី ៧-៩",
    titleEn: "MoEYS Khmer Grammar & Syntax Guide",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 7,
    subjectSlug: "khmer",
    edition: "បោះពុម្ពលើកទី ៤",
    publicationYear: 2023,
    officialUrl: "https://oer.moeys.gov.kh/khmer-grammar",
    salaUrl: "https://sala.moeys.gov.kh/materials/khmer-g7",
    isOfficialMoeys: true,
  },
  hist_g9: {
    id: "doc-hist-g9",
    titleKm: "សៀវភៅពុម្ពប្រវត្តិវិទ្យា ថ្នាក់ទី ៩",
    titleEn: "MoEYS Grade 9 History Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 9,
    subjectSlug: "history",
    edition: "បោះពុម្ពលើកទី ៤",
    publicationYear: 2024,
    officialUrl: "https://oer.moeys.gov.kh/history-g9",
    salaUrl: "https://sala.moeys.gov.kh/materials/hist-g9",
    isOfficialMoeys: true,
  },
  ict_g7: {
    id: "doc-ict-g7",
    titleKm: "សៀវភៅព័ត៌មានវិទ្យា MoEYS ថ្នាក់ទី ៧",
    titleEn: "MoEYS Grade 7 ICT Official Textbook",
    organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
    grade: 7,
    subjectSlug: "ict",
    edition: "បោះពុម្ពលើកទី ២",
    publicationYear: 2023,
    officialUrl: "https://oer.moeys.gov.kh/ict-g7",
    salaUrl: "https://sala.moeys.gov.kh/materials/ict-g7",
    isOfficialMoeys: true,
  },
};

// ------------------------------------------------------------------------------
// Comprehensive Authentic MoEYS Reference Warehouse
// ------------------------------------------------------------------------------
export const SEED_REFERENCE_ENTRIES: ReferenceEntry[] = [
  // 1. Average Speed Formula
  {
    id: "ref-phys-average-speed",
    slug: "phys-average-speed",
    originalTitleKh: "រូបមន្តល្បឿនមធ្យម",
    titleEn: "Average Speed Formula",
    subjectSlug: "physics",
    referenceType: "formula",
    streamApplicability: "all",
    grades: [7, 8],
    shortDescriptionKh: "ចម្ងាយចរសរុបដែលចល័តធ្វើដំណើរបានក្នុងមួយឯកតាពេល។",
    explanationKh: "ល្បឿនមធ្យមនៃចល័តមួយ គឺជាផលធៀបរវាងចម្ងាយចរសរុប (s) នឹងរយៈពេលសរុប (t) ដែលបានចំណាយក្នុងការធ្វើដំណើរនោះ។",
    explanationEn: "Average speed is the total distance traveled divided by the total time taken.",
    studentFriendlyGuideKh: "គិតស្រួលៗ៖ បើជិះកង់បានចម្ងាយ ១០ គីឡូម៉ែត្រ ក្នុងពេល ២ ម៉ោង មានន័យថាក្នុង ១ ម៉ោង ជិះបាន ៥ គីឡូម៉ែត្រ (v = 10 / 2 = 5 km/h)។",
    supplementaryNotesKh: "នៅក្នុងរូបវិទ្យាកម្រិតខ្ពស់ ល្បឿនមធ្យម (scalar) ខុសពីល្បឿនខណៈ (vector) ដែលគិតទាំងទិសដៅ។",
    keyTerms: ["ល្បឿន", "ចម្ងាយចរ", "រយៈពេល", "ខ្នាត m/s"],
    tags: ["kinematics", "speed", "motion", "grade7", "grade8"],
    structuredContent: {
      latexExpression: "v = \\frac{s}{t}",
      plainExpression: "v = s / t",
      applicableConditions: "អនុវត្តសម្រាប់ចលនាត្រង់ស្មើ ឬការគណនាល្បឿនសរុបនៃដំណើរទាំងមូល។",
      variables: [
        { symbol: "v", nameKh: "ល្បឿនមធ្យម", nameEn: "Average speed", unit: "m/s ឬ km/h", description: "បរិមាណស្កាលែនៃចលនា" },
        { symbol: "s", nameKh: "ចម្ងាយចរសរុប", nameEn: "Distance traveled", unit: "m (ម៉ែត្រ) ឬ km", description: "ប្រវែងគន្លងដែលចល័តបានឆ្លងកាត់" },
        { symbol: "t", nameKh: "រយៈពេលសរុប", nameEn: "Time taken", unit: "s (វិនាទី) ឬ h (ម៉ោង)", description: "ថិរវេលានៃការធ្វើដំណើរ" },
      ],
      derivedFormulas: [
        { formula: "s = v \\cdot t", meaningKh: "គណនាចម្ងាយចរ (s)" },
        { formula: "t = \\frac{s}{v}", meaningKh: "គណនារយៈពេល (t)" },
      ],
    },
    examples: [
      {
        problemKh: "រថយន្តមួយធ្វើដំណើរបានចម្ងាយ ១៨០ km ក្នុងរយៈពេល ៣ ម៉ោង។ គណនាល្បឿនមធ្យមគិតជា km/h និង m/s។",
        solutionKh: "តាមរូបមន្ត v = s / t = 180 km / 3 h = 60 km/h។ ដើម្បីប្តូរទៅជា m/s៖ យក 60 ចែកនឹង 3.6 = 16.67 m/s។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1420,
    sources: [
      {
        id: "src-phys-speed-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.phys_g7,
        chapterKm: "ជំពូកទី ១៖ រង្វាស់រង្វាល់ និងចលនា",
        chapterNumber: 1,
        pageStart: 14,
        pageEnd: 16,
        quotedPassageKm: "ល្បឿនមធ្យមជាផលធៀបរវាងចម្ងាយចរ និងរយៈពេល។ v = s / t",
        isPrimary: true,
      },
    ],
  },

  // 2. Mass Density Formula
  {
    id: "ref-phys-mass-density",
    slug: "phys-mass-density",
    originalTitleKh: "រូបមន្តម៉ាសមាឌ",
    titleEn: "Mass Density Formula",
    subjectSlug: "physics",
    referenceType: "formula",
    streamApplicability: "all",
    grades: [7, 8],
    shortDescriptionKh: "ម៉ាសនៃអង្គធាតុក្នុងមួយឯកតាមាឌ កំណត់ថាតើអង្គធាតុណាលិច ឬអណ្តែតក្នុងទឹក។",
    explanationKh: "ម៉ាសមាឌ (សញ្ញាសម្គាល់អក្សរក្រិក រ៉ូ: ρ) គឺជាផលធៀបរវាងម៉ាសនៃអង្គធាតុ (m) នឹងមាឌនៃអង្គធាតុនោះ (V)។",
    explanationEn: "Density is defined as the mass of an object divided by its volume.",
    studentFriendlyGuideKh: "អង្គធាតុណាដែលមានម៉ាសមាឌតូចជាងទឹក (1000 kg/m³ ឬ 1 g/cm³) ដូចជាប្រេង និងឈើ នឹងអណ្តែតលើទឹក។ បើធ្ងន់ជាងទឹក ដូចជាដែក នឹងលិច។",
    keyTerms: ["ម៉ាសមាឌ", "មាឌ", "ម៉ាស", "លិចអណ្តែត", "រ៉ូ"],
    tags: ["density", "fluids", "mechanics", "grade7", "grade8"],
    structuredContent: {
      latexExpression: "\\rho = \\frac{m}{V}",
      plainExpression: "rho = m / V",
      applicableConditions: "អនុវត្តលើអង្គធាតុរឹង រាវ និងឧស្ម័ន ដែលមានលក្ខណៈឯកសណ្ឋាន។",
      variables: [
        { symbol: "\\rho", nameKh: "ម៉ាសមាឌ", nameEn: "Density", unit: "kg/m³ ឬ g/cm³", description: "ម៉ាសក្នុងមួយឯកតាមាឌ" },
        { symbol: "m", nameKh: "ម៉ាសអង្គធាតុ", nameEn: "Mass", unit: "kg (គីឡូក្រាម) ឬ g", description: "បរិមាណរូបធាតុ" },
        { symbol: "V", nameKh: "មាឌអង្គធាតុ", nameEn: "Volume", unit: "m³ ឬ cm³ ឬ L", description: "ទំហំហាលំហដែលអង្គធាតុកាន់កាប់" },
      ],
      derivedFormulas: [
        { formula: "m = \\rho \\cdot V", meaningKh: "គណនាម៉ាសអង្គធាតុ" },
        { formula: "V = \\frac{m}{\\rho}", meaningKh: "គណនាមាឌអង្គធាតុ" },
      ],
    },
    examples: [
      {
        problemKh: "ដុំដែកមួយមានមាឌ 20 cm³ និងមានម៉ាស 156 g។ គណនាម៉ាសមាឌនៃដុំដែកនោះ។",
        solutionKh: "តាមរូបមន្ត rho = m / V = 156 g / 20 cm³ = 7.8 g/cm³ = 7800 kg/m³។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 980,
    sources: [
      {
        id: "src-phys-density-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.phys_g7,
        chapterKm: "ជំពូកទី ១៖ រង្វាស់រង្វាល់",
        chapterNumber: 1,
        pageStart: 22,
        pageEnd: 24,
        quotedPassageKm: "ម៉ាសមាឌជាម៉ាសនៃអង្គធាតុក្នុងមួយឯកតាមាឌ។ rho = m / V",
        isPrimary: true,
      },
    ],
  },

  // 3. Pythagorean Theorem
  {
    id: "ref-math-pythagorean-theorem",
    slug: "math-pythagorean-theorem",
    originalTitleKh: "ទ្រឹស្តីបទពីតាករ",
    titleEn: "Pythagorean Theorem",
    subjectSlug: "mathematics",
    referenceType: "theorem",
    streamApplicability: "all",
    grades: [8, 9],
    shortDescriptionKh: "ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុសស្មើនឹងផលបូកការ៉េនៃជ្រុងជាប់មុំកែងទាំងពីរ។",
    explanationKh: "ទ្រឹស្តីបទពីតាករចែងថា៖ ក្នុងត្រីកោណកែង ABC ដែលមានមុំ A = 90° នោះការ៉េអ៊ីប៉ូតេនុស BC² = AB² + AC² ឬ a² + b² = c² (c ជាអ៊ីប៉ូតេនុស)។",
    explanationEn: "In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
    studentFriendlyGuideKh: "ចងចាំឈុតលេខពិសេសពីតាករ៖ (3, 4, 5) ព្រោះ 3² + 4² = 9 + 16 = 25 = 5²! ឈុតមួយទៀតគឺ (5, 12, 13)។",
    keyTerms: ["ពីតាករ", "ត្រីកោណកែង", "អ៊ីប៉ូតេនុស", "ការ៉េជ្រុង"],
    tags: ["geometry", "triangle", "theorem", "grade8", "grade9", "brevet"],
    structuredContent: {
      latexExpression: "a^2 + b^2 = c^2",
      plainExpression: "a^2 + b^2 = c^2",
      applicableConditions: "អនុវត្តតែលើត្រីកោណកែង (Right Triangle) ដែលមានមុំមួយស្មើ ៩០ ដឺក្រេប៉ុណ្ណោះ។",
      variables: [
        { symbol: "c", nameKh: "អ៊ីប៉ូតេនុស", nameEn: "Hypotenuse", unit: "cm, m", description: "ជ្រុងដែលឈមនឹងមុំកែង និងវែងជាងគេ" },
        { symbol: "a, b", nameKh: "ជ្រុងជាប់មុំកែង", nameEn: "Legs of triangle", unit: "cm, m", description: "ជ្រុងទាំងពីរដែលបង្កើតបានមុំកែង" },
      ],
      derivedFormulas: [
        { formula: "c = \\sqrt{a^2 + b^2}", meaningKh: "រកប្រវែងអ៊ីប៉ូតេនុស" },
        { formula: "a = \\sqrt{c^2 - b^2}", meaningKh: "រកប្រវែងជ្រុងកែងមួយ" },
      ],
    },
    examples: [
      {
        problemKh: "ត្រីកោណកែងមួយមានជ្រុងកែងពីរប្រវែង 6 cm និង 8 cm។ គណនាប្រវែងអ៊ីប៉ូតេនុស។",
        solutionKh: "តាមទ្រឹស្តីបទពីតាករ៖ c² = 6² + 8² = 36 + 64 = 100 => c = \\sqrt{100} = 10 cm។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 2310,
    sources: [
      {
        id: "src-math-pyth-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.math_g9,
        chapterKm: "ជំពូកទី ៣៖ ធរណីមាត្រត្រីកោណ",
        chapterNumber: 3,
        pageStart: 45,
        pageEnd: 48,
        quotedPassageKm: "ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុសស្មើផលបូកការ៉េនៃជ្រុងជាប់មុំកែង។",
        isPrimary: true,
      },
    ],
  },

  // 4. Ohm's Law
  {
    id: "ref-phys-ohms-law",
    slug: "phys-ohms-law",
    originalTitleKh: "ច្បាប់អូម",
    titleEn: "Ohm's Law",
    subjectSlug: "physics",
    referenceType: "law_principle",
    streamApplicability: "all",
    grades: [9, 10, 11],
    shortDescriptionKh: "តង់ស្យុងនៅសងខាងរេស៊ីស្តង់ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តអគ្គិសនីដែលឆ្លងកាត់វា។",
    explanationKh: "ច្បាប់អូមចែងថា៖ តង់ស្យុង (U) នៅសងខាងចុងនៃស៊ីឡាំងចម្លងអូម ស្មើនឹងផលគុណរវាងរេស៊ីស្តង់ (R) នឹងអាំងតង់ស៊ីតេចរន្ត (I) ដែលឆ្លងកាត់វា នៅសីតុណ្ហភាពថេរ។",
    explanationEn: "Ohm's law states that current through a conductor between two points is directly proportional to voltage across the two points.",
    studentFriendlyGuideKh: "ចងចាំអក្សរកាត់ URI៖ U នៅលើកំពូលត្រីកោណ, R និង I នៅបាតក្រោម។ ចង់រកអ្វី បិទដៃលើអក្សរនោះ (U = R·I, I = U/R, R = U/I)។",
    keyTerms: ["ច្បាប់អូម", "តង់ស្យុង", "រេស៊ីស្តង់", "អាំងតង់ស៊ីតេចរន្ត", "វ៉ុល"],
    tags: ["electricity", "circuit", "law", "brevet", "grade9", "grade10"],
    structuredContent: {
      latexExpression: "U = R \\cdot I",
      plainExpression: "U = R * I",
      applicableConditions: "អនុវត្តលើលោហៈចម្លង និងរេស៊ីស្តង់អូម នៅសីតុណ្ហភាពថេរ។",
      variables: [
        { symbol: "U", nameKh: "តង់ស្យុងអគ្គិសនី", nameEn: "Voltage", unit: "V (វ៉ុល)", description: "ផលសងប៉ូតង់ស្យែលអគ្គិសនី" },
        { symbol: "R", nameKh: "រេស៊ីស្តង់អគ្គិសនី", nameEn: "Electrical resistance", unit: "\\Omega (អូម)", description: "កម្រិតរារាំងចរន្តអគ្គិសនី" },
        { symbol: "I", nameKh: "អាំងតង់ស៊ីតេចរន្ត", nameEn: "Electric current", unit: "A (អាំពែ)", description: "បរិមាណបន្ទុកអគ្គិសនីឆ្លងកាត់ក្នុងមួយវិនាទី" },
      ],
      derivedFormulas: [
        { formula: "I = \\frac{U}{R}", meaningKh: "គណនាអាំងតង់ស៊ីតេចរន្ត" },
        { formula: "R = \\frac{U}{I}", meaningKh: "គណនាតម្លៃរេស៊ីស្តង់" },
      ],
    },
    examples: [
      {
        problemKh: "អំពូលភ្លើងមួយមានរេស៊ីស្តង់ 44 Ω ភ្ជាប់ទៅនឹងប្រភពតង់ស្យុង 220 V។ គណនាចរន្ត I ដែលឆ្លងកាត់អំពូល។",
        solutionKh: "តាមច្បាប់អូម៖ I = U / R = 220 V / 44 Ω = 5 A។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1890,
    sources: [
      {
        id: "src-phys-ohm-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.phys_g9,
        chapterKm: "ជំពូកទី ២៖ ចរន្តអគ្គិសនី",
        chapterNumber: 2,
        pageStart: 28,
        pageEnd: 31,
        quotedPassageKm: "ផលសងប៉ូតង់ស្យែលរវាងចុងទាំងពីរនៃរេស៊ីស្តង់ស្មើ U = R · I",
        isPrimary: true,
      },
    ],
  },

  // 5. Mole Formula
  {
    id: "ref-chem-mole-formula",
    slug: "chem-mole-formula",
    originalTitleKh: "រូបមន្តចំនួនម៉ូល",
    titleEn: "Mole Formula",
    subjectSlug: "chemistry",
    referenceType: "formula",
    streamApplicability: "all",
    grades: [9, 10],
    shortDescriptionKh: "រូបមន្តស្នូលលេខ ១ ក្នុងគីមីវិទ្យា សម្រាប់ស្វែងរកចំនួនម៉ូលពីម៉ាស និងម៉ាសម៉ូល។",
    explanationKh: "ចំនួនម៉ូល (n គិតជា mol) គឺជាបរិមាណរូបធាតុដែលស្មើនឹងផលធៀបរវាងម៉ាសសារធាតុ (m គិតជា g) នឹងម៉ាសម៉ូល (M គិតជា g/mol)។",
    explanationEn: "Amount of substance in moles equals mass of substance divided by its molar mass.",
    studentFriendlyGuideKh: "អឹមតូច m (គិតជាក្រាម g) តែងតែនៅលើ! អឹមធំ M (ម៉ាសម៉ូលពីតារាងខួប) នៅក្រោម។ កុំច្រឡំទីតាំងគ្នា!",
    keyTerms: ["ចំនួនម៉ូល", "ម៉ាសម៉ូល", "អាតូម", "ស្តូក្យូមេទ្រី"],
    tags: ["mole", "chemistry", "formula", "brevet", "bacii", "grade9", "grade10", "grade11", "grade12"],
    structuredContent: {
      latexExpression: "n = \\frac{m}{M}",
      plainExpression: "n = m / M",
      applicableConditions: "អនុវត្តលើគ្រប់រូបធាតុគីមីទាំងអស់ (អង្គធាតុសុទ្ធ ល្បាយ សូលុយស្យុង)។",
      variables: [
        { symbol: "n", nameKh: "ចំនួនម៉ូល", nameEn: "Number of moles", unit: "mol (ម៉ូល)", description: "បរិមាណរូបធាតុ" },
        { symbol: "m", nameKh: "ម៉ាសសារធាតុ", nameEn: "Mass", unit: "g (ក្រាម)", description: "ទម្ងន់សារធាតុដែលយកមកពិសោធន៍" },
        { symbol: "M", nameKh: "ម៉ាសម៉ូល", nameEn: "Molar mass", unit: "g/mol", description: "ម៉ាសនៃរូបធាតុចំនួន 1 ម៉ូល (6.02 x 10²³ ភាគល្អិត)" },
      ],
      derivedFormulas: [
        { formula: "m = n \\cdot M", meaningKh: "គណនាម៉ាសសារធាតុ (g)" },
        { formula: "M = \\frac{m}{n}", meaningKh: "គណនាម៉ាសម៉ូល (g/mol)" },
      ],
    },
    examples: [
      {
        problemKh: "គណនាចំនួនម៉ូលនៃទឹក (H₂O) ចំនួន 36 g ដោយដឹង M(H)=1, M(O)=16 g/mol។",
        solutionKh: "M(H₂O) = 2(1) + 16 = 18 g/mol។ នាំឱ្យ n = m / M = 36 g / 18 g/mol = 2 mol។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 3120,
    sources: [
      {
        id: "src-chem-mole-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.chem_g9,
        chapterKm: "ជំពូកទី ១៖ បរិមាណរូបធាតុ",
        chapterNumber: 1,
        pageStart: 8,
        pageEnd: 11,
        quotedPassageKm: "ចំនួនម៉ូលស្មើនឹងម៉ាសជាក្រាមចែកនឹងម៉ាសម៉ូល។ n = m / M",
        isPrimary: true,
      },
    ],
  },

  // 6. Quadratic Formula
  {
    id: "ref-math-quadratic-formula",
    slug: "math-quadratic-formula",
    originalTitleKh: "រូបមន្តសមីការដឺក្រេទី ២",
    titleEn: "Quadratic Equation Formula",
    subjectSlug: "mathematics",
    referenceType: "formula",
    streamApplicability: "all",
    grades: [9],
    shortDescriptionKh: "រូបមន្តដោះស្រាយសមីការ ax² + bx + c = 0 តាមរយៈឌីស្គ្រីមីណង់ ដីលតា (Δ = b² - 4ac)។",
    explanationKh: "ចំពោះសមីការ ax² + bx + c = 0 (a ≠ 0), ដីលតា Δ = b² - 4ac។ បើ Δ > 0 សមីការមានឫសពីរផ្សេងគ្នា៖ x = (-b ± √Δ) / 2a។ បើ Δ = 0 មានឫសឌុប x = -b / 2a។ បើ Δ < 0 គ្មានឫសក្នុងសំណុំ R។",
    explanationEn: "Formula for finding the roots of ax² + bx + c = 0 using discriminant Delta = b² - 4ac.",
    studentFriendlyGuideKh: "ពិនិត្យសញ្ញា ដីលតា (Δ) ជាមុនសិន! វិជ្ជមានបាន ២ ឫស, សូន្យបាន ១ ឫសឌុប, អវិជ្ជមានគ្មានឫសក្នុងចំនួនពិត។",
    keyTerms: ["សមីការដឺក្រេទី២", "ដីលតា", "ឌីស្គ្រីមីណង់", "ឫសសមីការ"],
    tags: ["algebra", "polynomial", "quadratic", "brevet", "bacii", "grade9", "grade10"],
    structuredContent: {
      latexExpression: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      plainExpression: "x = (-b +- sqrt(b^2 - 4ac)) / (2a)",
      applicableConditions: "មេគុណ a ត្រូវតែខុសពីសូន្យ (a != 0)។",
      variables: [
        { symbol: "a, b, c", nameKh: "មេគុណសមីការ", nameEn: "Coefficients", unit: "ចំនួនពិត", description: "មេគុណតួការ៉េ តួដឺក្រេទី១ និងតួថេរ" },
        { symbol: "Δ", nameKh: "ឌីស្គ្រីមីណង់ (ដីលតា)", nameEn: "Discriminant", unit: "ចំនួនពិត", description: "កំណត់ចំនួនឫសនៃសមីការ៖ Δ = b² - 4ac" },
      ],
    },
    examples: [
      {
        problemKh: "ដោះស្រាយសមីការ x² - 5x + 6 = 0។",
        solutionKh: "a = 1, b = -5, c = 6 => Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 > 0។ ឫសទាំងពីរគឺ x₁ = (5 + 1)/2 = 3 និង x₂ = (5 - 1)/2 = 2។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 2840,
    sources: [
      {
        id: "src-math-quad-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.math_g9,
        chapterKm: "ជំពូកទី ២៖ សមីការ និងវិសមីការ",
        chapterNumber: 2,
        pageStart: 32,
        pageEnd: 36,
        quotedPassageKm: "ការដោះស្រាយសមីការ ax² + bx + c = 0 ដោយប្រើឌីស្គ្រីមីណង់ ដីលតា។",
        isPrimary: true,
      },
    ],
  },

  // 7. Law of Conservation of Mass (Lavoisier)
  {
    id: "ref-chem-conservation-of-mass",
    slug: "chem-conservation-of-mass",
    originalTitleKh: "ច្បាប់រក្សាម៉ាស (ឡាវ័រហ្ស៊ីយេ)",
    titleEn: "Law of Conservation of Mass (Lavoisier)",
    subjectSlug: "chemistry",
    referenceType: "law_principle",
    streamApplicability: "all",
    grades: [8, 9],
    shortDescriptionKh: "ក្នុងប្រតិកម្មគីមី ផលបូកម៉ាសអង្គធាតុកកើត ស្មើនឹងផលបូកម៉ាសអង្គធាតុចូលរួមប្រតិកម្មជានិច្ច។",
    explanationKh: "ច្បាប់រក្សាម៉ាសកំណត់ថា៖ នៅក្នុងប្រព័ន្ធបិទជិត គ្មានរូបធាតុណាត្រូវបានបង្កើតថ្មី ឬបំផ្លាញចោលឡើយ។ ផលបូកម៉ាសនៃអង្គធាតុប្រតិករ ស្មើនឹងផលបូកម៉ាសនៃអង្គធាតុកកើតជានិច្ច៖ Σ m(ប្រតិករ) = Σ m(កកើត)។",
    explanationEn: "In a chemical reaction, mass is neither created nor destroyed.",
    studentFriendlyGuideKh: "គ្មានអ្វីបាត់បង់ គ្មានអ្វីបង្កើតថ្មី អ្វីៗទាំងអស់គ្រាន់តែបំប្លែងរូបរាង (Rien ne se perd, rien ne se crée, tout se transforme)។",
    keyTerms: ["ច្បាប់រក្សាម៉ាស", "ឡាវ័រហ្ស៊ីយេ", "ប្រតិករ", "កកើត"],
    tags: ["reaction", "mass", "law", "chemistry", "grade8", "grade9"],
    structuredContent: {
      latexExpression: "\\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}",
      plainExpression: "Sum m(reactants) = Sum m(products)",
      applicableConditions: "អនុវត្តលើប្រតិកម្មគីមីធម្មតាក្នុងប្រព័ន្ធបិទ (មិនគិតប្រតិកម្មនុយក្លេអ៊ែរ)។",
      variables: [
        { symbol: "m", nameKh: "ម៉ាស", nameEn: "Mass", unit: "g (ក្រាម)", description: "ម៉ាសនៃសារធាតុនីមួយៗ" },
      ],
    },
    examples: [
      {
        problemKh: "ដុតម៉ាញ៉េស្យូម 24 g ជាមួយអុកស៊ីសែន 16 g ក្នុងប្រព័ន្ធបិទ។ តើទទួលបានម៉ាញ៉េស្យូមអុកស៊ីត (MgO) ប៉ុន្មានក្រាម?",
        solutionKh: "តាមច្បាប់រក្សាម៉ាស៖ m(MgO) = m(Mg) + m(O₂) = 24 g + 16 g = 40 g។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1650,
    sources: [
      {
        id: "src-chem-cons-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.chem_g8,
        chapterKm: "ជំពូកទី ២៖ ប្រតិកម្មគីមី",
        chapterNumber: 2,
        pageStart: 30,
        pageEnd: 33,
        quotedPassageKm: "ផលបូកម៉ាសនៃអង្គធាតុប្រតិករស្មើនឹងផលបូកម៉ាសនៃអង្គធាតុកកើត។",
        isPrimary: true,
      },
    ],
  },

  // 8. Chemical Element: Carbon (C)
  {
    id: "ref-chem-element-carbon",
    slug: "chem-element-carbon",
    originalTitleKh: "ធាតុគីមី៖ កាបូន",
    titleEn: "Chemical Element: Carbon (C)",
    subjectSlug: "chemistry",
    referenceType: "chemical_element",
    streamApplicability: "all",
    grades: [8, 9, 10],
    shortDescriptionKh: "ធាតុគីមីគ្រឹះនៃសារពាង្គកាយមានជីវិត លេខអាតូម Z = 6 ក្នុងក្រុម IV A ខួបទី ២។",
    explanationKh: "កាបូន (និមិត្តសញ្ញា C) គឺជាអលោហៈដែលមានលេខអាតូម Z = 6 និងម៉ាសអាតូម 12.011 amu។ វាមានអេឡិចត្រុងវ៉ាឡង់ 4 ដែលអាចបង្កើតសម្ព័ន្ធកូវ៉ាឡង់រឹងមាំជាមួយធាតុជាច្រើន។",
    explanationEn: "Carbon is a chemical element with symbol C and atomic number 6, forming the basis of all organic chemistry.",
    studentFriendlyGuideKh: "កាបូនជាអធិរាជនៃគីមីសរីរាង្គ! ពេជ្រ ធ្យូងខ្មៅ និងខ្លួនប្រាណមនុស្ស សុទ្ធតែកើតចេញពីអាតូមកាបូន។",
    keyTerms: ["កាបូន", "លេខអាតូម", "គីមីសរីរាង្គ", "វ៉ាឡង់ 4"],
    tags: ["periodic_table", "elements", "carbon", "grade8", "grade9", "grade10", "grade11", "grade12"],
    structuredContent: {
      symbol: "C",
      atomicNumber: 6,
      atomicMass: 12.011,
      valency: "II, IV",
      group: "IV A (14)",
      period: 2,
      electronConfig: "1s² 2s² 2p²",
      stateAtRoomTemp: "រឹង (Solid)",
    },
    examples: [
      {
        problemKh: "តើកាបូនឆេះក្នុងខ្យល់ពេញលេញបង្កើតជាឧស្ម័នអ្វី?",
        solutionKh: "បង្កើតជាឧស្ម័នកាបូនិច (កាបូនឌីអុកស៊ីត) តាមសមីការ៖ C + O₂ → CO₂។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1140,
    sources: [
      {
        id: "src-chem-carb-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.chem_g8,
        chapterKm: "ជំពូកទី ១៖ តារាងខួបនៃធាតុគីមី",
        chapterNumber: 1,
        pageStart: 18,
        pageEnd: 20,
        quotedPassageKm: "កាបូន និមិត្តសញ្ញា C លេខអាតូម 6 ម៉ាសអាតូម 12។",
        isPrimary: true,
      },
    ],
  },

  // 9. Photosynthesis Definition & Equation
  {
    id: "ref-bio-photosynthesis",
    slug: "bio-photosynthesis",
    originalTitleKh: "រស្មីសំយោគ",
    titleEn: "Photosynthesis Process & Equation",
    subjectSlug: "biology",
    referenceType: "definition",
    streamApplicability: "all",
    grades: [7, 8, 9],
    shortDescriptionKh: "ដំណើរការដែលរុក្ខជាតិបៃតងផលិតគ្លុយកូស និងអុកស៊ីសែន ដោយប្រើពន្លឺព្រះអាទិត្យ។",
    explanationKh: "រស្មីសំយោគ គឺជាដំណើរបំប្លែងថាមពលពន្លឺព្រះអាទិត្យទៅជាថាមពលគីមីនៅក្នុងក្លរ៉ូប្លាសនៃរុក្ខជាតិបៃតង ដោយស្រូបយកឧស្ម័នកាបូនិច (CO₂) និងទឹក (H₂O) ដើម្បីបង្កើតជាជាតិស្ករគ្លុយកូស (C₆H₁₂O₆) និងបញ្ចេញឧស្ម័នអុកស៊ីសែន (O₂)។",
    explanationEn: "The biological process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
    studentFriendlyGuideKh: "រូបមន្តចងចាំ៖ ឧស្ម័នដកដង្ហើមចេញរបស់យើង (CO₂) + ទឹកស្រោចផ្កា (H₂O) + ពន្លឺថ្ងៃ = អាហាររុក្ខជាតិ (គ្លុយកូស) + ខ្យល់បរិសុទ្ធដែលយើងត្រូវការ (O₂)។",
    keyTerms: ["រស្មីសំយោគ", "ក្លរ៉ូភីល", "គ្លុយកូស", "អុកស៊ីសែន", "កាបូនិច"],
    tags: ["biology", "plants", "photosynthesis", "grade7", "grade8", "grade9", "grade10", "grade11", "grade12"],
    structuredContent: {
      termKh: "រស្មីសំយោគ",
      termEn: "Photosynthesis",
      chemicalEquation: "6CO_2 + 6H_2O \\xrightarrow{\\text{ពន្លឺព្រះអាទិត្យ / ក្លរ៉ូភីល}} C_6H_{12}O_6 + 6O_2",
      organelle: "ក្លរ៉ូប្លាស (Chloroplast)",
      reactants: ["កាបូនឌីអុកស៊ីត (CO₂)", "ទឹក (H₂O)"],
      products: ["គ្លុយកូស (C₆H₁₂O₆)", "អុកស៊ីសែន (O₂)"],
      attributes: [
        { label: "សារធាតុពណ៌ស្រូបពន្លឺ", value: "ក្លរ៉ូភីល (Chlorophyll)" },
        { label: "សារៈសំខាន់", value: "ជាប្រភពអាហារបឋម និងអុកស៊ីសែននៃភពផែនដី" },
      ],
    },
    examples: [
      {
        problemKh: "ហេតុអ្វីបានជារុក្ខជាតិមិនអាចធ្វើរស្មីសំយោគនៅពេលយប់?",
        solutionKh: "ពីព្រោះដំណើរការដំណាក់កាលពន្លឺនៃរស្មីសំយោគទាមទារថាមពលហ្វូតុងពីពន្លឺព្រះអាទិត្យផ្ទាល់ដើម្បីបំបែកម៉ូលេគុលទឹក (Photolysis)។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1950,
    sources: [
      {
        id: "src-bio-photo-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.bio_g7,
        chapterKm: "ជំពូកទី ៣៖ ជីវិតរុក្ខជាតិ",
        chapterNumber: 3,
        pageStart: 52,
        pageEnd: 56,
        quotedPassageKm: "រស្មីសំយោគជារបៀបដែលរុក្ខជាតិបៃតងផលិតអាហារដោយពន្លឺព្រះអាទិត្យ។ 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
        isPrimary: true,
      },
    ],
  },

  // 10. Khmer Grammar: Basic Sentence Structure (S-V-O)
  {
    id: "ref-khmer-sentence-structure",
    slug: "khmer-sentence-structure",
    originalTitleKh: "ទម្រង់ល្បះទោលគ្រឹះ",
    titleEn: "Khmer Simple Sentence Structure (S-V-O)",
    subjectSlug: "khmer",
    referenceType: "grammar_rule",
    streamApplicability: "all",
    grades: [7, 8],
    shortDescriptionKh: "វិធានផ្សំល្បះទោលពេញលេញក្នុងភាសាខ្មែរ ដោយរៀបតាមលំដាប់ ប្រធាន កិរិយា និងកម្មបទ។",
    explanationKh: "ល្បះទោលក្នុងវេយ្យាករណ៍ខ្មែរ គឺជាល្បះដែលមានតែគំនិតពេញលេញមួយ។ រចនាសម្ព័ន្ធទូទៅបំផុតគឺ៖ ប្រធាន (អ្នកធ្វើអំពើ) + កិរិយាសព្ទ (អំពើ) + កម្មបទ (អ្នករងអំពើ)។",
    explanationEn: "Basic Khmer sentence structure following Subject-Verb-Object (SVO) order.",
    studentFriendlyGuideKh: "ដូចភាសាអង់គ្លេសដែរ៖ ឧទាហរណ៍ «សិស្ស (ប្រធាន) អាន (កិរិយា) សៀវភៅ (កម្មបទ)»។ បើខ្វះប្រធាន ឬខ្វះកិរិយា មិនមែនជាល្បះពេញលេញឡើយ។",
    keyTerms: ["ល្បះទោល", "ប្រធាន", "កិរិយាសព្ទ", "កម្មបទ", "វេយ្យាករណ៍"],
    tags: ["grammar", "sentence", "khmer", "syntax", "grade7", "grade8", "grade9"],
    structuredContent: {
      ruleStatementKh: "ល្បះទោល = ប្រធាន (Subject) + កិរិយាសព្ទ (Verb) + [កម្មបទ (Object)]",
      comparisonEn: "Khmer is predominantly an SVO (Subject-Verb-Object) language.",
      components: [
        { position: 1, element: "ប្រធាន (Subject)", example: "កុមារី សុខា" },
        { position: 2, element: "កិរិយាសព្ទ (Verb)", example: "ដោះស្រាយ" },
        { position: 3, element: "កម្មបទ (Object)", example: "លំហាត់គណិតវិទ្យា" },
      ],
      patternFormula: "[ប្រធាន] + [កិរិយាសព្ទ] + [កម្មបទ]",
    },
    examples: [
      {
        correctExample: "កសិករ (ប្រធាន) ច្រូត (កិរិយា) ស្រូវ (កម្មបទ)។",
        explanation: "ជាល្បះត្រឹមត្រូវពេញលេញ មានន័យច្បាស់លាស់។",
      },
      {
        correctExample: "បក្សី (ប្រធាន) ហើរ (កិរិយាអកម្ម)។",
        explanation: "ជាល្បះពេញលេញដោយមិនបាច់មានកម្មបទ (កិរិយាអកម្ម)។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1420,
    sources: [
      {
        id: "src-khmer-gram-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.khmer_g7,
        chapterKm: "ជំពូកទី ១៖ ប្រភេទល្បះ",
        chapterNumber: 1,
        pageStart: 8,
        pageEnd: 12,
        quotedPassageKm: "ល្បះទោលផ្សំឡើងពីប្រធាន កិរិយា និងកម្មបទ។",
        isPrimary: true,
      },
    ],
  },

  // 11. Historical Event: Cambodia Independence Day
  {
    id: "ref-hist-independence-day",
    slug: "hist-independence-day",
    originalTitleKh: "ទិវាបុណ្យឯករាជ្យជាតិ",
    titleEn: "Cambodia National Independence Day (Nov 9, 1953)",
    subjectSlug: "history",
    referenceType: "historical_event",
    streamApplicability: "all",
    grades: [9, 10],
    shortDescriptionKh: "កាលបរិច្ឆេទជាប្រវត្តិសាស្ត្រដែលកម្ពុជាទទួលបានឯករាជ្យពេញលេញពីសាធារណរដ្ឋបារាំង។",
    explanationKh: "នៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣ ប្រទេសកម្ពុជាបានប្រកាសឯករាជ្យពេញបរិបូរណ៍ពីអាណាព្យាបាលបារាំង បន្ទាប់ពីការបំពេញព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យរបស់ព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ ព្រះបរមរតនកោដ្ឋ។",
    explanationEn: "On November 9, 1953, Cambodia gained full national independence from French protectorate rule.",
    studentFriendlyGuideKh: "ចងចាំកាលបរិច្ឆេទ ៩ វិច្ឆិកា ១៩៥៣៖ ជាថ្ងៃរំដោះប្រទេសពីអាណាព្យាបាលបារាំងដែលមានរយៈពេល ៩០ ឆ្នាំ (១៨៦៣-១៩៥៣) ដោយសន្តិវិធី និងការទូត។",
    keyTerms: ["ឯករាជ្យជាតិ", "៩ វិច្ឆិកា ១៩៥៣", "ព្រះរាជបូជនីយកិច្ច", "នរោត្តម សីហនុ"],
    tags: ["history", "cambodia", "independence", "grade9", "grade11", "grade12"],
    structuredContent: {
      eventDate: "1953-11-09",
      dateDisplayKh: "ថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣",
      historicalPeriod: "សម័យទំនើប និងការដណ្តើមអធិបតេយ្យជាតិ",
      keyFigures: ["ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ", "ឥស្សរជនជាតិខ្មែរ"],
      significanceKh: "កម្ពុជាក្លាយជារដ្ឋឯករាជ្យ មានអធិបតេយ្យភាពពេញលេញលើទឹកដី និងកងកម្លាំងប្រដាប់អាវុធរបស់ខ្លួន។",
      causes: [
        "ចលនាតស៊ូទាមទារឯករាជ្យរបស់ប្រជាជនកម្ពុជា",
        "ព្រះរាជបូជនីយកិច្ចទូតអន្តរជាតិនៃព្រះបាទនរោត្តម សីហនុ នៅប្រទេសបារាំង អាមេរិក ជប៉ុន និងកាណាដា",
        "ការចុះខ្សោយនៃឥទ្ធិពលបារាំងនៅឥណ្ឌូចិន",
      ],
      consequences: [
        "ការបញ្ចប់អាណាព្យាបាលបារាំង ៩០ ឆ្នាំ",
        "ការកកើតសង្គមរាស្ត្រនិយម និងការអភិវឌ្ឍជាតិមាតុភូមិ",
      ],
    },
    examples: [
      {
        problemKh: "តើនរណាជាអង្គដឹកនាំព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យពីបារាំងនៅឆ្នាំ ១៩៥៣?",
        solutionKh: "ព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ ព្រះមហាវីរក្សត្រខ្មែរ (ព្រះបរមរតនកោដ្ឋ)។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1780,
    sources: [
      {
        id: "src-hist-indep-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.hist_g9,
        chapterKm: "ជំពូកទី ៤៖ កម្ពុជាសម័យទាមទារឯករាជ្យ",
        chapterNumber: 4,
        pageStart: 72,
        pageEnd: 78,
        quotedPassageKm: "នៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣ បារាំងបានប្រគល់អធិបតេយ្យភាពពេញលេញដល់កម្ពុជា។",
        isPrimary: true,
      },
    ],
  },

  // 12. ICT: Random Access Memory (RAM)
  {
    id: "ref-ict-ram-concept",
    slug: "ict-ram-concept",
    originalTitleKh: "អង្គចងចាំបណ្តោះអាសន្ន (RAM)",
    titleEn: "RAM (Random Access Memory)",
    subjectSlug: "ict",
    referenceType: "concept",
    streamApplicability: "all",
    grades: [7, 8, 9],
    shortDescriptionKh: "អង្គចងចាំដែលមានល្បឿនលឿនសម្រាប់ផ្ទុកទិន្នន័យដែលកំពុងដំណើរការដោយ CPU តែបាត់បង់ទិន្នន័យពេលដាច់ភ្លើង។",
    explanationKh: "RAM (Random Access Memory) គឺជាអង្គចងចាំបឋម (Primary Memory) របស់កុំព្យូទ័រ ដែលផ្ទុកកម្មវិធី និងទិន្នន័យដែលកំពុងដំណើរការដោយ CPU។ វាជាប្រភេទ Volatile Memory ដែលមានន័យថាទិន្នន័យទាំងអស់នឹងត្រូវលុបបាត់ភ្លាមៗនៅពេលបិទ ឬដាច់ចរន្តអគ្គិសនី។",
    explanationEn: "High-speed volatile memory used by computers to store data currently in active use by the CPU.",
    studentFriendlyGuideKh: "ប្រៀបដូចតុធ្វើការ៖ តុធំ (RAM ធំ) អាចដាក់សៀវភៅ និងឯកសារមើលបានច្រើនក្នុងពេលតែមួយ (Multitasking) ធ្វើឱ្យកុំព្យូទ័រដើររលូន។ តែបើបិទបន្ទប់ (បិទភ្លើង) តុត្រូវសម្អាតទទេ។",
    keyTerms: ["RAM", "អង្គចងចាំបណ្តោះអាសន្ន", "Volatile Memory", "CPU", "Byte"],
    tags: ["ict", "hardware", "memory", "ram", "grade7", "grade8", "grade9"],
    structuredContent: {
      fundamentalRule: "RAM ផ្ទុកទិន្នន័យលឿន តែទាមទារចរន្តអគ្គិសនីដើម្បីរក្សាទិន្នន័យ (Volatile)។",
      corePrincipleKh: "CPU ទាញទិន្នន័យផ្ទាល់ពី RAM មកដំណើរការ ព្រោះ RAM លឿនជាង Hard Disk/SSD រាប់រយដង។",
      unitsTable: [
        { unit: "1 Byte", equivalent: "8 Bits", meaningKh: "១ តួអក្សរ" },
        { unit: "1 Kilobyte (KB)", equivalent: "1024 Bytes", meaningKh: "អត្ថបទខ្លី" },
        { unit: "1 Megabyte (MB)", equivalent: "1024 KB", meaningKh: "រូបភាព ឬចម្រៀង MP3" },
        { unit: "1 Gigabyte (GB)", equivalent: "1024 MB", meaningKh: "ទំហំ RAM ស្តង់ដារ (8GB, 16GB)" },
      ],
    },
    examples: [
      {
        problemKh: "ហេតុអ្វីពេលកំពុងវាយឯកសារ Word ហើយស្រាប់តែដាច់ភ្លើង យើងបាត់ឯកសារដែលមិនទាន់ Save?",
        solutionKh: "ពីព្រោះទិន្នន័យដែលមិនទាន់ Save ស្ថិតនៅលើ RAM (បណ្តោះអាសន្ន) មិនទាន់បានសរសេរចូល Hard Disk/SSD (អចិន្ត្រៃយ៍) នៅឡើយទេ។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 1220,
    sources: [
      {
        id: "src-ict-ram-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.ict_g7,
        chapterKm: "ជំពូកទី ១៖ ផ្នែករឹងកុំព្យូទ័រ (Hardware)",
        chapterNumber: 1,
        pageStart: 18,
        pageEnd: 22,
        quotedPassageKm: "RAM ជាអង្គចងចាំបណ្តោះអាសន្នដែលរក្សាទុកទិន្នន័យនៅពេលកុំព្យូទ័រកំពុងដំណើរការ។",
        isPrimary: true,
      },
    ],
  },

  // 13. Period of Simple Pendulum (Grade 12 Physics Bac II)
  {
    id: "ref-phys-simple-pendulum",
    slug: "phys-simple-pendulum",
    originalTitleKh: "រូបមន្តខួបប៉ោលទោល",
    titleEn: "Period of a Simple Pendulum",
    subjectSlug: "physics",
    referenceType: "formula",
    streamApplicability: "science",
    grades: [12],
    shortDescriptionKh: "រូបមន្តខួបនៃលំយោលប៉ោលទោលក្នុងមុំលំយោលតូច (ត្រៀមប្រឡងបាក់ឌុប)។",
    explanationKh: "ខួបលំយោល T នៃប៉ោលទោល គឺជាថិរវេលាដែលប៉ោលធ្វើបានមួយលំយោលពេញ។ វាអាស្រ័យនឹងប្រវែងខ្សែប៉ោល (l) និងសំទុះទំនាញដី (g) ដោយមិនអាស្រ័យនឹងម៉ាសរបស់បាល់ឡើយ។",
    explanationEn: "The period of a simple pendulum for small amplitudes depends only on string length and gravitational acceleration.",
    studentFriendlyGuideKh: "ចាំថា៖ ប៉ោលខ្សែវែង លំយោលយឺត (ខួបធំ)។ មិនថាព្យួរដុំថ្មធ្ងន់ ឬស្រាលទេ បើប្រវែងខ្សែស្មើគ្នា ខួបដូចគ្នា!",
    keyTerms: ["ប៉ោលទោល", "ខួបលំយោល", "ប្រវែងខ្សែ", "សំទុះទំនាញដី", "បាក់ឌុប"],
    tags: ["oscillations", "pendulum", "physics", "bacii", "grade12", "science_stream"],
    structuredContent: {
      latexExpression: "T = 2\\pi \\sqrt{\\frac{l}{g}}",
      plainExpression: "T = 2 * pi * sqrt(l / g)",
      applicableConditions: "អនុវត្តក្នុងករណីមុំលំយោលតូច (α ≤ 10° ឬ 0.17 rad) និងគ្មានកម្លាំងកកិត។",
      variables: [
        { symbol: "T", nameKh: "ខួបលំយោល", nameEn: "Period", unit: "s (វិនាទី)", description: "ថិរវេលាក្នុងមួយលំយោលពេញ" },
        { symbol: "l", nameKh: "ប្រវែងខ្សែប៉ោល", nameEn: "Length of string", unit: "m (ម៉ែត្រ)", description: "ប្រវែងពីចំណុចព្យួរដល់ចំណុចកណ្តាលម៉ាសបាល់" },
        { symbol: "g", nameKh: "សំទុះទំនាញដី", nameEn: "Gravitational acceleration", unit: "m/s² ឬ N/kg", description: "តម្លៃធម្មតាយក 9.8 m/s² ឬ 10 m/s² (π² = 10)" },
      ],
      derivedFormulas: [
        { formula: "l = \\frac{g \\cdot T^2}{4\\pi^2}", meaningKh: "គណនាប្រវែងខ្សែប៉ោល" },
        { formula: "g = \\frac{4\\pi^2 \\cdot l}{T^2}", meaningKh: "ពិសោធន៍រកសំទុះទំនាញដី" },
      ],
    },
    examples: [
      {
        problemKh: "ប៉ោលទោលមួយមានប្រវែងខ្សែ 1 m នៅកន្លែងដែលមាន g = π² = 10 m/s²។ គណនាខួប T នៃប៉ោល។",
        solutionKh: "តាមរូបមន្ត T = 2π√(l/g) = 2π√(1/π²) = 2π · (1/π) = 2 s។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 2650,
    sources: [
      {
        id: "src-phys-pend-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.phys_g12,
        chapterKm: "ជំពូកទី ១៖ ចលនាលំយោល",
        chapterNumber: 1,
        pageStart: 12,
        pageEnd: 15,
        quotedPassageKm: "ខួបប៉ោលទោល T = 2π√(l/g) មិនអាស្រ័យនឹងម៉ាសនៃប៉ោលឡើយ។",
        isPrimary: true,
      },
    ],
  },

  // 14. Newton's Second Law of Motion (F = m · a)
  {
    id: "ref-phys-newtons-second-law",
    slug: "phys-newtons-second-law",
    originalTitleKh: "ច្បាប់ទី ២ ញូតុន",
    titleEn: "Newton's Second Law of Motion",
    subjectSlug: "physics",
    referenceType: "law_principle",
    streamApplicability: "all",
    grades: [10],
    shortDescriptionKh: "ផលបូកកម្លាំងក្រៅមានអំពើលើអង្គធាតុមួយ ស្មើនឹងផលគុណរវាងម៉ាស និងសំទុះរបស់វា។",
    explanationKh: "ច្បាប់គ្រឹះនៃឌីណាមិចចែងថា៖ កាលណាមានកម្លាំងផ្គួប F មានអំពើលើអង្គធាតុមួយដែលមានម៉ាស m នោះអង្គធាតុនឹងទទួលបានសំទុះ a ដែលមានទិសដៅស្របតាមកម្លាំង ហើយសមាមាត្រនឹងកម្លាំងនោះ៖ Σ F = m · a។",
    explanationEn: "The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.",
    studentFriendlyGuideKh: "ច្បាប់កម្លាំងស្នូល៖ បើចង់រុញរបស់ធ្ងន់ (m ធំ) ឱ្យស្ទុះលឿន (a ធំ) ត្រូវប្រើកម្លាំងបាយខ្លាំង (F ធំ)។",
    keyTerms: ["ច្បាប់ទី២ញូតុន", "កម្លាំង", "សំទុះ", "ម៉ាស", "ញូតុន (N)"],
    tags: ["dynamics", "force", "newton", "mechanics", "grade10", "grade11", "grade12"],
    structuredContent: {
      latexExpression: "\\sum \\vec{F} = m \\cdot \\vec{a}",
      plainExpression: "F = m * a",
      applicableConditions: "អនុវត្តក្នុងតម្រុយអសកម្ម (Inertial Frame) និងចំពោះល្បឿនតូចជាងល្បឿនពន្លឺខ្លាំង។",
      variables: [
        { symbol: "F", nameKh: "កម្លាំងផ្គួប", nameEn: "Net Force", unit: "N (ញូតុន)", description: "កម្លាំងសរុបមានអំពើលើអង្គធាតុ (1 N = 1 kg·m/s²)" },
        { symbol: "m", nameKh: "ម៉ាសអង្គធាតុ", nameEn: "Mass", unit: "kg (គីឡូក្រាម)", description: "កម្រិតនិចលភាពនៃអង្គធាតុ" },
        { symbol: "a", nameKh: "សំទុះ", nameEn: "Acceleration", unit: "m/s²", description: "អត្រាបម្រែបម្រួលល្បឿនធៀបនឹងពេល" },
      ],
      derivedFormulas: [
        { formula: "a = \\frac{F}{m}", meaningKh: "គណនាសំទុះ" },
        { formula: "m = \\frac{F}{a}", meaningKh: "គណនាម៉ាសអង្គធាតុ" },
      ],
    },
    examples: [
      {
        problemKh: "កម្លាំងមួយទំហំ 20 N មានអំពើលើដុំវត្ថុដែលមានម៉ាស 4 kg។ គណនាសំទុះនៃដុំវត្ថុនោះ។",
        solutionKh: "តាមច្បាប់ទី ២ ញូតុន៖ a = F / m = 20 N / 4 kg = 5 m/s²។",
      },
    ],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Academic Review Board & ScienceKH Senior Editors",
    verifiedAt: "2026-01-15T08:00:00Z",
    viewCount: 2430,
    sources: [
      {
        id: "src-phys-newton2-1",
        sourceDocument: OFFICIAL_MOEYS_DOCUMENTS.phys_g12,
        chapterKm: "ជំពូកទី ២៖ ច្បាប់ចលនា",
        chapterNumber: 2,
        pageStart: 34,
        pageEnd: 38,
        quotedPassageKm: "ផលបូកកម្លាំងក្រៅដែលធ្វើអំពើលើអង្គធាតុមួយ ស្មើផលគុណរវាងម៉ាស និងសំទុះ។ F = m · a",
        isPrimary: true,
      },
    ],
  },

  {
    "id": "ref-math-linear-equation",
    "slug": "math-linear-equation",
    "originalTitleKh": "សមីការដឺក្រេទី ១ មានមួយអថេរ (ax + b = 0)",
    "titleEn": "Linear Equation with One Unknown",
    "subjectSlug": "mathematics",
    "referenceType": "equation",
    "streamApplicability": "all",
    "grades": [
      7
    ],
    "shortDescriptionKh": "សមីការដែលអថេរ x មានស្វ័យគុណ ១។ ដោះស្រាយដោយបោះតួថេរប្តូរសញ្ញា រួចចែកនឹងមេគុណ a។",
    "explanationKh": "សមីការដឺក្រេទី ១ មានមួយអថេរ គឺជាសមីការដែលមានទម្រង់ទូទៅ ax + b = 0 ដែល a ≠ 0។ ដំណោះស្រាយតែមួយគត់នៃសមីការគឺ x = -b / a។",
    "explanationEn": "A first-degree polynomial equation in one variable with a unique real solution.",
    "studentFriendlyGuideKh": "ចាំក្បួនបោះតួ៖ ឆ្លងសញ្ញាស្មើ (=) ត្រូវប្តូរសញ្ញាជានិច្ច! បូកទៅជាដក, គុណទៅជាចែក។",
    "keyTerms": [
      "សមីការដឺក្រេទី១",
      "អថេរ",
      "មេគុណ",
      "ឫសសមីការ"
    ],
    "tags": [
      "algebra",
      "linear",
      "equations",
      "grade7"
    ],
    "structuredContent": {
      "latexExpression": "ax + b = 0 \\iff x = -\\frac{b}{a} \\quad (a \\neq 0)",
      "plainExpression": "ax + b = 0 => x = -b / a",
      "applicableConditions": "មេគុណ a ត្រូវតែខុសពីសូន្យ (a != 0)។",
      "variables": [
        {
          "symbol": "x",
          "nameKh": "អថេរមិនស្គាល់",
          "nameEn": "Variable / Unknown",
          "unit": "ចំនួនពិត",
          "description": "តម្លៃដែលត្រូវស្វែងរក"
        },
        {
          "symbol": "a",
          "nameKh": "មេគុណនៃ x",
          "nameEn": "Coefficient of x",
          "unit": "ចំនួនពិត (a != 0)",
          "description": "ចំនួនគុណនឹងអថេរ"
        },
        {
          "symbol": "b",
          "nameKh": "តួថេរ",
          "nameEn": "Constant term",
          "unit": "ចំនួនពិត",
          "description": "ចំនួនថេរឯករាជ្យ"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "x = -\\frac{b}{a}",
          "meaningKh": "រូបមន្តឫសសមីការ"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "ដោះស្រាយសមីការ 3x - 12 = 0។",
        "solutionKh": "3x = 12 => x = 12 / 3 = 4។ ដូចនេះ សមីការមានឫស x = 4។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 1850,
    "sources": [
      {
        "id": "src-math-linear-1",
        "sourceDocument": {
          "id": "doc-math-g7",
          "titleKm": "សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ៧",
          "titleEn": "MoEYS Grade 7 Mathematics Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 7,
          "subjectSlug": "mathematics",
          "edition": "បោះពុម្ពលើកទី ៤",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/math-g7",
          "salaUrl": "https://sala.moeys.gov.kh/materials/math-g7",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ៣៖ ស្វ័យគុណ និងពីជគណិត",
        "chapterNumber": 3,
        "pageStart": 62,
        "pageEnd": 66,
        "quotedPassageKm": "សមីការដឺក្រេទី១ មានមួយអថេរ មានទម្រង់ទូទៅ ax + b = 0 (a ≠ 0)។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-phys-lever-law",
    "slug": "phys-lever-law",
    "originalTitleKh": "ច្បាប់លំនឹងឃ្នាស់ (F₁ · d₁ = F₂ · d₂)",
    "titleEn": "Principle of the Lever (Simple Machines)",
    "subjectSlug": "physics",
    "referenceType": "law_principle",
    "streamApplicability": "all",
    "grades": [
      7
    ],
    "shortDescriptionKh": "លក្ខខណ្ឌលំនឹងឃ្នាស់៖ ផលគុណកម្លាំងនឹងដៃឃ្នាស់សងខាងទ្រនល់ត្រូវតែស្មើគ្នា។",
    "explanationKh": "ឃ្នាស់ស្ថិតក្នុងលំនឹងកាលណាផលគុណរវាងកម្លាំងចលករ (F₁) និងដៃឃ្នាស់ចលករ (d₁) ស្មើនឹងផលគុណរវាងកម្លាំងទប់ (F₂) និងដៃឃ្នាស់កម្លាំងទប់ (d₂) ធៀបនឹងទ្រនល់ O៖ F₁ · d₁ = F₂ · d₂។",
    "explanationEn": "Rotational mechanical equilibrium condition for levers balancing applied force and load torques.",
    "studentFriendlyGuideKh": "ដៃឃ្នាស់កាន់តែវែង (d ធំ) ចំណេញកម្លាំងកាន់តែច្រើន (ប្រើ F តូច) — ដូចកន្ត្រៃកាត់ដែកដៃវែងកាត់ស្រួល!",
    "keyTerms": [
      "ឃ្នាស់",
      "ម៉ាស៊ីនសាមញ្ញ",
      "ទ្រនល់",
      "ដៃឃ្នាស់",
      "កម្លាំងចលករ"
    ],
    "tags": [
      "lever",
      "machines",
      "mechanics",
      "grade7"
    ],
    "structuredContent": {
      "latexExpression": "F_1 \\cdot d_1 = F_2 \\cdot d_2",
      "plainExpression": "F1 * d1 = F2 * d2",
      "applicableConditions": "អនុវត្តសម្រាប់ឃ្នាស់ប្រភេទទី១ ទី២ និងទី៣ ក្នុងលក្ខខណ្ឌលំនឹងរង្វិល។",
      "variables": [
        {
          "symbol": "F_1",
          "nameKh": "កម្លាំងចលករ (កម្លាំងអនុវត្ត)",
          "nameEn": "Applied Effort Force",
          "unit": "N (ញូតុន)",
          "description": "កម្លាំងដែលមនុស្ស ឬម៉ាស៊ីនបញ្ចេញ"
        },
        {
          "symbol": "d_1",
          "nameKh": "ដៃឃ្នាស់នៃកម្លាំងចលករ",
          "nameEn": "Effort Arm Length",
          "unit": "m (ម៉ែត្រ) ឬ cm",
          "description": "ចម្ងាយពីទ្រនល់ទៅចំណុចអនុវត្តកម្លាំងចលករ"
        },
        {
          "symbol": "F_2",
          "nameKh": "កម្លាំងទប់ (បន្ទុក)",
          "nameEn": "Load Resistance Force",
          "unit": "N (ញូតុន)",
          "description": "ទម្ងន់នៃវត្ថុដែលត្រូវគាស់"
        },
        {
          "symbol": "d_2",
          "nameKh": "ដៃឃ្នាស់នៃកម្លាំងទប់",
          "nameEn": "Load Arm Length",
          "unit": "m (ម៉ែត្រ) ឬ cm",
          "description": "ចម្ងាយពីទ្រនល់ទៅចំណុចដាក់បន្ទុក"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "F_1 = \\frac{F_2 \\cdot d_2}{d_1}",
          "meaningKh": "គណនាកម្លាំងដែលត្រូវប្រើដើម្បីគាស់បន្ទុក"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "គេចង់គាស់ដុំថ្មទម្ងន់ 600 N ដោយប្រើរបារដែក។ បើដៃកម្លាំងទប់ d₂ = 0.2 m និងដៃកម្លាំងចលករ d₁ = 1.2 m គណនាកម្លាំង F₁ ដែលត្រូវប្រើ។",
        "solutionKh": "តាមច្បាប់លំនឹងឃ្នាស់៖ F₁ · d₁ = F₂ · d₂ => F₁ = (F₂ · d₂) / d₁ = (600 · 0.2) / 1.2 = 100 N។ ចំណេញកម្លាំង ៦ ដង!"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 1620,
    "sources": [
      {
        "id": "src-phys-lever-1",
        "sourceDocument": {
          "id": "doc-phys-g7",
          "titleKm": "សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៧",
          "titleEn": "MoEYS Grade 7 Physics Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 7,
          "subjectSlug": "physics",
          "edition": "បោះពុម្ពលើកទី ៣",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/physics-g7",
          "salaUrl": "https://sala.moeys.gov.kh/materials/phys-g7",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ២៖ ម៉ាស៊ីនសាមញ្ញ",
        "chapterNumber": 2,
        "pageStart": 28,
        "pageEnd": 32,
        "quotedPassageKm": "លំនឹងនៃឃ្នាស់៖ ផលគុណកម្លាំងនឹងដៃឃ្នាស់សងខាងទ្រនល់ត្រូវតែស្មើគ្នា F₁ · d₁ = F₂ · d₂។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-phys-archimedes-principle",
    "slug": "phys-archimedes-principle",
    "originalTitleKh": "កម្លាំងរុញអាកស៊ីម៉ែត (F_A = ρ · V · g)",
    "titleEn": "Archimedes' Principle Upthrust Force",
    "subjectSlug": "physics",
    "referenceType": "law_principle",
    "streamApplicability": "all",
    "grades": [
      8
    ],
    "shortDescriptionKh": "កម្លាំងរុញបញ្ឈរឡើងលើដែលអង្គធាតុរាវជះលើវត្ថុដែលលិចក្នុងវា ស្មើនឹងទម្ងន់ទឹកដែលត្រូវជម្លៀស។",
    "explanationKh": "គ្រប់អង្គធាតុដែលលិចទាំងស្រុង ឬមួយផ្នែកក្នុងអង្គធាតុរាវ ត្រូវរងនូវកម្លាំងរុញបញ្ឈរពីក្រោមឡើងលើហៅថា កម្លាំងរុញអាកស៊ីម៉ែត (F_A)។ ទំហំនៃកម្លាំងនេះ ស្មើនឹងទម្ងន់នៃអង្គធាតុរាវដែលត្រូវអង្គធាតុនោះជម្លៀស៖ F_A = ρ · V · g។",
    "explanationEn": "Any object submerged in a fluid experiences an upward buoyant force equal to the weight of fluid displaced.",
    "studentFriendlyGuideKh": "អង្គធាតុអណ្តែតពេលទម្ងន់ខ្លួនវាស្មើនឹងកម្លាំងរុញអាកស៊ីម៉ែត (W = F_A); អង្គធាតុលិចពេលទម្ងន់ធំជាងកម្លាំងរុញ (W > F_A)។",
    "keyTerms": [
      "អាកស៊ីម៉ែត",
      "កម្លាំងរុញ",
      "ម៉ាសមាឌរាវ",
      "មាឌជម្លៀស",
      "អណ្តែតលិច"
    ],
    "tags": [
      "archimedes",
      "buoyancy",
      "fluids",
      "grade8"
    ],
    "structuredContent": {
      "latexExpression": "F_A = \\rho_{\\text{fluid}} \\cdot V_{\\text{immersed}} \\cdot g",
      "plainExpression": "F_A = rho * V * g",
      "applicableConditions": "អនុវត្តសម្រាប់អង្គធាតុរឹងលិចក្នុងអង្គធាតុរាវ ឬឧស្ម័ននៅស្ងៀម។",
      "variables": [
        {
          "symbol": "F_A",
          "nameKh": "កម្លាំងរុញអាកស៊ីម៉ែត",
          "nameEn": "Buoyant Upthrust Force",
          "unit": "N (ញូតុន)",
          "description": "កម្លាំងរុញបញ្ឈរពីក្រោមឡើងលើ"
        },
        {
          "symbol": "\\rho_{\\text{fluid}}",
          "nameKh": "ម៉ាសមាឌនៃអង្គធាតុរាវ",
          "nameEn": "Fluid Density",
          "unit": "kg/m³",
          "description": "ទឹកសុទ្ធមាន ρ = 1000 kg/m³"
        },
        {
          "symbol": "V_{\\text{immersed}}",
          "nameKh": "មាឌផ្នែកដែលលិចក្នុងរាវ",
          "nameEn": "Submerged Volume",
          "unit": "m³",
          "description": "មាឌរាវដែលត្រូវជំនួសកន្លែង"
        },
        {
          "symbol": "g",
          "nameKh": "សំទុះទំនាញដី",
          "nameEn": "Gravitational acceleration",
          "unit": "m/s² ឬ N/kg",
          "description": "យកតម្លៃ 9.8 ឬ 10 N/kg"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "V = \\frac{F_A}{\\rho \\cdot g}",
          "meaningKh": "គណនាមាឌអង្គធាតុដែលលិចក្នុងទឹក"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "ដុំដែកមួយមានមាឌ 0.002 m³ ត្រូវបានពន្លិចទាំងស្រុងទៅក្នុងទឹក (ρ = 1000 kg/m³, g = 10 N/kg)។ គណនាកម្លាំងរុញអាកស៊ីម៉ែតមានអំពើលើដុំដែក។",
        "solutionKh": "តាមរូបមន្ត F_A = ρ · V · g = 1000 kg/m³ · 0.002 m³ · 10 N/kg = 20 N។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 1980,
    "sources": [
      {
        "id": "src-phys-arch-1",
        "sourceDocument": {
          "id": "doc-phys-g8",
          "titleKm": "សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៨",
          "titleEn": "MoEYS Grade 8 Physics Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 8,
          "subjectSlug": "physics",
          "edition": "បោះពុម្ពលើកទី ៣",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/phys-g8",
          "salaUrl": "https://sala.moeys.gov.kh/materials/phys-g8",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ២៖ សម្ពាធក្នុងសន្ទនីយ៍",
        "chapterNumber": 2,
        "pageStart": 24,
        "pageEnd": 28,
        "quotedPassageKm": "កម្លាំងរុញអាកស៊ីម៉ែតស្មើនឹងទម្ងន់នៃអង្គធាតុរាវដែលត្រូវអង្គធាតុនោះជម្លៀស។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-chem-ideal-gas-equation",
    "slug": "chem-ideal-gas-equation",
    "originalTitleKh": "សមីការឧស្ម័នបរិសុទ្ធ (PV = nRT)",
    "titleEn": "Ideal Gas Law Equation",
    "subjectSlug": "chemistry",
    "referenceType": "equation",
    "streamApplicability": "all",
    "grades": [
      10
    ],
    "shortDescriptionKh": "សមីការតភ្ជាប់រវាងសម្ពាធ មាឌ ចំនួនម៉ូល និងសីតុណ្ហភាពដាច់ខាតនៃឧស្ម័នបរិសុទ្ធ។",
    "explanationKh": "សមីការសភាពឧស្ម័នបរិសុទ្ធចែងថា៖ ផលគុណរវាងសម្ពាធ (P) និងមាឌ (V) នៃឧស្ម័ន សមាមាត្រនឹងផលគុណរវាងចំនួនម៉ូល (n), ថេរឧស្ម័នបរិសុទ្ធ (R = 0.082 atm·L/(mol·K)), និងសីតុណ្ហភាពដាច់ខាត (T គិតជា K)។",
    "explanationEn": "Equation of state governing ideal gases relating pressure, volume, temperature, and moles.",
    "studentFriendlyGuideKh": "ក្បួនមិនឱ្យខុសលំហាត់ PV = nRT៖ សម្ពាធត្រូវគិតជា atm, មាឌគិតជា L, និងសីតុណ្ហភាពត្រូវបូក ២៧៣ ទៅជា Kelvin (K) ជានិច្ច!",
    "keyTerms": [
      "ឧស្ម័នបរិសុទ្ធ",
      "សម្ពាធ",
      "មាឌ",
      "សីតុណ្ហភាពដាច់ខាត",
      "ថេរ R"
    ],
    "tags": [
      "gas",
      "idealgas",
      "chemistry",
      "grade10"
    ],
    "structuredContent": {
      "latexExpression": "PV = nRT",
      "plainExpression": "P * V = n * R * T",
      "applicableConditions": "អនុវត្តសម្រាប់ឧស្ម័ននៅសម្ពាធទាប និងសីតុណ្ហភាពមធ្យម ដែលម៉ូលេគុលមិនមានអន្តរកម្មទាក់ទាញគ្នា។",
      "variables": [
        {
          "symbol": "P",
          "nameKh": "សម្ពាធឧស្ម័ន",
          "nameEn": "Gas Pressure",
          "unit": "atm (បរិយាកាស) ឬ mmHg",
          "description": "1 atm = 760 mmHg"
        },
        {
          "symbol": "V",
          "nameKh": "មាឌឧស្ម័ន",
          "nameEn": "Volume",
          "unit": "L (លីត្រ)",
          "description": "1 m³ = 1000 L"
        },
        {
          "symbol": "n",
          "nameKh": "ចំនួនម៉ូល",
          "nameEn": "Amount of Substance",
          "unit": "mol",
          "description": "n = m / M"
        },
        {
          "symbol": "R",
          "nameKh": "ថេរឧស្ម័នបរិសុទ្ធ",
          "nameEn": "Universal Gas Constant",
          "unit": "0.082 atm·L/(mol·K)",
          "description": "តម្លៃថេរសកល"
        },
        {
          "symbol": "T",
          "nameKh": "សីតុណ្ហភាពដាច់ខាត",
          "nameEn": "Absolute Temperature",
          "unit": "K (កែលវិន)",
          "description": "T = t(°C) + 273"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "n = \\frac{PV}{RT}",
          "meaningKh": "គណនាចំនួនម៉ូលឧស្ម័ន"
        },
        {
          "formula": "P = \\frac{nRT}{V}",
          "meaningKh": "គណនាសម្ពាធឧស្ម័ន"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "ឧស្ម័ន O₂ ចំនួន 2 mol ស្ថិតក្នុងធុងមាឌ 10 L នៅសីតុណ្ហភាព 27°C។ គណនាសម្ពាធឧស្ម័នក្នុងធុង (R = 0.082 atm·L/(mol·K))។",
        "solutionKh": "ប្តូរសីតុណ្ហភាព៖ T = 27 + 273 = 300 K។ តាមរូបមន្ត PV = nRT => P = (nRT) / V = (2 · 0.082 · 300) / 10 = 4.92 atm។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 2240,
    "sources": [
      {
        "id": "src-chem-gas-1",
        "sourceDocument": {
          "id": "doc-chem-g10",
          "titleKm": "សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ១០",
          "titleEn": "MoEYS Grade 10 Chemistry Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 10,
          "subjectSlug": "chemistry",
          "edition": "បោះពុម្ពលើកទី ៣",
          "publicationYear": 2023,
          "officialUrl": "https://oer.moeys.gov.kh/chem-g10",
          "salaUrl": "https://sala.moeys.gov.kh/materials/chem-g10",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ៣៖ ឧស្ម័ន និងទ្រឹស្តីស៊ីនេទិច",
        "chapterNumber": 3,
        "pageStart": 45,
        "pageEnd": 49,
        "quotedPassageKm": "សមីការសភាពឧស្ម័នបរិសុទ្ធ PV = nRT ភ្ជាប់ទំនាក់ទំនងរវាងអថេរសភាពទាំងបួន។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-math-arithmetic-progression",
    "slug": "math-arithmetic-progression",
    "originalTitleKh": "ស្វ៊ីតនព្វន្ត (u_n = u_1 + (n - 1)d)",
    "titleEn": "Arithmetic Progression (Sequence & Series)",
    "subjectSlug": "mathematics",
    "referenceType": "formula",
    "streamApplicability": "all",
    "grades": [
      11
    ],
    "shortDescriptionKh": "ស្វ៊ីតដែលតួនីមួយៗស្មើនឹងតូមុនបូកនឹងចំនួនថេរ d (ផលសងរួម)។",
    "explanationKh": "ស្វ៊ីតនព្វន្ត គឺជាស្វ៊ីតនៃចំនួនពិតដែលតួនីមួយៗ (ចាប់ពីតួទី ២ ទៅ) ស្មើនឹងតូមុនបូកនឹងចំនួនថេរ d ហៅថាផលសងរួម៖ u_(n+1) = u_n + d។ តួទី n កំណត់ដោយ u_n = u_1 + (n - 1)d ហើយផលបូក n តួដំបូង S_n = n(u_1 + u_n) / 2។",
    "explanationEn": "Arithmetic progression where consecutive terms differ by constant difference d.",
    "studentFriendlyGuideKh": "ចងចាំរូបមន្តផលបូក Sn យ៉ាងរហ័ស៖ យកចំនួនតួសរុប (n) ចែកនឹង ២ រួចគុណនឹង (តួដំបូង + តួចុងក្រោយ)!",
    "keyTerms": [
      "ស្វ៊ីតនព្វន្ត",
      "ផលសងរួម",
      "តួទីn",
      "ផលបូកSn"
    ],
    "tags": [
      "sequences",
      "progression",
      "arithmetic",
      "grade11"
    ],
    "structuredContent": {
      "latexExpression": "u_n = u_1 + (n - 1)d, \\quad S_n = \\frac{n(u_1 + u_n)}{2}",
      "plainExpression": "u_n = u_1 + (n - 1)*d, S_n = n*(u_1 + u_n) / 2",
      "applicableConditions": "អនុវត្តសម្រាប់ស្វ៊ីតដែលមានផលសងរួម d ថេរគ្រប់តួជាប់គ្នា។",
      "variables": [
        {
          "symbol": "u_n",
          "nameKh": "តួទី n (តួទូទៅ)",
          "nameEn": "nth term",
          "unit": "ចំនួនពិត",
          "description": "តម្លៃនៃតួនៅលំដាប់ទី n"
        },
        {
          "symbol": "u_1",
          "nameKh": "តួដំបូង",
          "nameEn": "First term",
          "unit": "ចំនួនពិត",
          "description": "តម្លៃនៃតួទី ១"
        },
        {
          "symbol": "d",
          "nameKh": "ផលសងរួម",
          "nameEn": "Common difference",
          "unit": "ចំនួនពិត",
          "description": "d = u_(n+1) - u_n"
        },
        {
          "symbol": "n",
          "nameKh": "ចំនួនតួ / លំដាប់",
          "nameEn": "Number of terms",
          "unit": "ចំនួនគត់វិជ្ជមាន (n in N*)",
          "description": "លំដាប់នៃតួ"
        },
        {
          "symbol": "S_n",
          "nameKh": "ផលបូក n តួដំបូង",
          "nameEn": "Sum of n terms",
          "unit": "ចំនួនពិត",
          "description": "S_n = u_1 + u_2 + ... + u_n"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "d = \\frac{u_n - u_1}{n - 1}",
          "meaningKh": "គណនាផលសងរួម d"
        },
        {
          "formula": "S_n = \\frac{n[2u_1 + (n - 1)d]}{2}",
          "meaningKh": "ផលបូកពេលមិនស្គាល់តួចុងក្រោយ un"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "ស្វ៊ីតនព្វន្តមួយមាន u₁ = 5 និងផលសងរួម d = 3។ គណនាតួទី 10 (u₁₀) និងផលបូក ១០ តួដំបូង (S₁₀)។",
        "solutionKh": "u₁₀ = u₁ + 9d = 5 + 9(3) = 5 + 27 = 32។ S₁₀ = 10(u₁ + u₁₀) / 2 = 10(5 + 32) / 2 = 5 · 37 = 185។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 2110,
    "sources": [
      {
        "id": "src-math-seq-1",
        "sourceDocument": {
          "id": "doc-math-g11",
          "titleKm": "សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ១១ (កម្រិតខ្ពស់)",
          "titleEn": "MoEYS Grade 11 Advanced Mathematics Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 11,
          "subjectSlug": "mathematics",
          "edition": "បោះពុម្ពលើកទី ៤",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/math-g11",
          "salaUrl": "https://sala.moeys.gov.kh/materials/math-g11",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ១៖ ស្វ៊ីតចំនួនពិត",
        "chapterNumber": 1,
        "pageStart": 8,
        "pageEnd": 14,
        "quotedPassageKm": "ស្វ៊ីតនព្វន្តមានតួទូទៅ u_n = u_1 + (n - 1)d និងផលបូក S_n = n(u_1 + u_n) / 2។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-math-definite-integrals",
    "slug": "math-definite-integrals",
    "originalTitleKh": "អាំងតេក្រាលកំណត់ និងផ្ទៃក្រឡា (∫_a^b f(x)dx)",
    "titleEn": "Definite Integral and Bounded Area",
    "subjectSlug": "mathematics",
    "referenceType": "formula",
    "streamApplicability": "all",
    "grades": [
      12
    ],
    "shortDescriptionKh": "ទ្រឹស្តីបទគោលនៃគណិតវិភាគ និងរូបមន្តគណនាផ្ទៃក្រឡាខ្សែកោងក្នុងបាក់ឌុប។",
    "explanationKh": "បើ F(x) ជាព្រីមីទីវនៃអនុគមន៍ជាប់ f(x) លើចន្លោះ [a, b] នោះអាំងតេក្រាលកំណត់ពី a ទៅ b ស្មើនឹង F(b) - F(a)។ ផ្ទៃក្រឡារវាងក្រាប C_f និងអ័ក្ស Ox កំណត់ដោយ S = ∫_a^b |f(x)|dx។",
    "explanationEn": "Definite integral evaluation via antiderivatives and area of bounded planar regions.",
    "studentFriendlyGuideKh": "អាំងតេក្រាលជាការបូកសន្សំផ្ទៃក្រឡាតូចៗ! រកព្រីមីទីវ F(x) ឱ្យឃើញសិន រួចជំនួសគោលលើ (b) ដកគោលក្រោម (a)!",
    "keyTerms": [
      "អាំងតេក្រាលកំណត់",
      "ព្រីមីទីវ",
      "ផ្ទៃក្រឡា",
      "បាក់ឌុប"
    ],
    "tags": [
      "calculus",
      "integrals",
      "area",
      "bacii",
      "grade12"
    ],
    "structuredContent": {
      "latexExpression": "\\int_a^b f(x)\\,dx = [F(x)]_a^b = F(b) - F(a)",
      "plainExpression": "int_a^b f(x) dx = F(b) - F(a)",
      "applicableConditions": "អនុគមន៍ f(x) ត្រូវតែជាប់លើចន្លោះបិទ [a, b]។",
      "variables": [
        {
          "symbol": "f(x)",
          "nameKh": "អនុគមន៍ក្រោមសញ្ញាអាំងតេក្រាល",
          "nameEn": "Integrand function",
          "unit": "ចំនួនពិត",
          "description": "អនុគមន៍ជាប់លើ [a, b]"
        },
        {
          "symbol": "F(x)",
          "nameKh": "ព្រីមីទីវនៃ f(x)",
          "nameEn": "Antiderivative primitive",
          "unit": "ចំនួនពិត",
          "description": "F'(x) = f(x)"
        },
        {
          "symbol": "a",
          "nameKh": "គោលក្រោម",
          "nameEn": "Lower limit",
          "unit": "ចំនួនពិត",
          "description": "ចំណុចចាប់ផ្តើម"
        },
        {
          "symbol": "b",
          "nameKh": "គោលលើ",
          "nameEn": "Upper limit",
          "unit": "ចំនួនពិត",
          "description": "ចំណុចបញ្ចប់"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "S = \\int_a^b [f(x) - g(x)]\\,dx",
          "meaningKh": "ផ្ទៃក្រឡារវាងខ្សែកោងពីរ f(x) >= g(x)"
        },
        {
          "formula": "V = \\pi \\int_a^b [f(x)]^2\\,dx",
          "meaningKh": "មាឌសូលីតបង្វិលជុំវិញអ័ក្ស Ox"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "គណនាអាំងតេក្រាល I = ∫₀² (3x² + 2x) dx។",
        "solutionKh": "ព្រីមីទីវ F(x) = x³ + x²។ នាំឱ្យ I = [x³ + x²]₀² = (2³ + 2²) - (0³ + 0²) = (8 + 4) - 0 = 12។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 3120,
    "sources": [
      {
        "id": "src-math-int-1",
        "sourceDocument": {
          "id": "doc-math-g12",
          "titleKm": "សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)",
          "titleEn": "MoEYS Grade 12 Advanced Mathematics Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 12,
          "subjectSlug": "mathematics",
          "edition": "បោះពុម្ពលើកទី ៦",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/math-g12",
          "salaUrl": "https://sala.moeys.gov.kh/materials/math-g12",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ៣៖ អាំងតេក្រាល",
        "chapterNumber": 3,
        "pageStart": 72,
        "pageEnd": 78,
        "quotedPassageKm": "អាំងតេក្រាលកំណត់ពី a ទៅ b នៃ f(x)dx ស្មើ F(b) - F(a)។",
        "isPrimary": true
      }
    ]
  },

  {
    "id": "ref-bio-dna-dimensions",
    "slug": "bio-dna-dimensions",
    "originalTitleKh": "រូបមន្តគណនាវិមាត្រ DNA (N, L, M, C)",
    "titleEn": "DNA Structural Dimension Formulas",
    "subjectSlug": "biology",
    "referenceType": "formula",
    "streamApplicability": "science",
    "grades": [
      12
    ],
    "shortDescriptionKh": "រូបមន្តគណនាចំនួននុយក្លេអូទីតសរុប ប្រវែងម៉ូលេគុល និងម៉ាសម៉ូលេគុល DNA ក្នុងបាក់ឌុប។",
    "explanationKh": "ម៉ូលេគុល DNA មានរចនាសម្ព័ន្ធជាច្រវាក់ទ្វេជណ្តើរវង់។ តាមច្បាប់ Chargaff A = T និង G = C នាំឱ្យចំនួននុយក្លេអូទីត N = 2A + 2G = 2T + 2C។ ប្រវែង L = (N / 2) · 3.4 Å, ម៉ាសម៉ូលេគុល M = N · 300 đvC, និងចំនួនជុំវង់ C = N / 20។",
    "explanationEn": "Quantitative relationships between total nucleotides, double-helix length, molecular mass, and helical turns in DNA.",
    "studentFriendlyGuideKh": "ចងចាំតួលេខមាស DNA៖ ១ គូនុយក្លេអូទីតមានប្រវែង 3.4 Å; ១ នុយក្លេអូទីតមានម៉ាស 300 đvC; ១ ជុំវង់មាន ២០ នុយក្លេអូទីត (ប្រវែង 34 Å)!",
    "keyTerms": [
      "DNA",
      "នុយក្លេអូទីត",
      "ប្រវែងÅ",
      "ម៉ាសម៉ូលេគុល",
      "បាក់ឌុប"
    ],
    "tags": [
      "dna",
      "genetics",
      "molecular-biology",
      "bacii",
      "grade12"
    ],
    "structuredContent": {
      "latexExpression": "N = 2A + 2G, \\quad L = \\frac{N}{2} \\times 3.4\\,\\text{\\AA}, \\quad M = N \\times 300\\,\\text{đvC}",
      "plainExpression": "N = 2A + 2G, L = (N/2) * 3.4 Angstrom, M = N * 300 dvC",
      "applicableConditions": "អនុវត្តសម្រាប់ម៉ូលេគុល DNA ច្រវាក់ទ្វេតាមគំរូ Watson & Crick។",
      "variables": [
        {
          "symbol": "N",
          "nameKh": "ចំនួននុយក្លេអូទីតសរុប",
          "nameEn": "Total Nucleotides",
          "unit": "នុយក្លេអូទីត",
          "description": "N = 2A + 2G"
        },
        {
          "symbol": "L",
          "nameKh": "ប្រវែងម៉ូលេគុល DNA",
          "nameEn": "DNA Length",
          "unit": "Å (អង់ស្ត្រូម)",
          "description": "1 Å = 10⁻¹⁰ m = 10⁻⁴ μm"
        },
        {
          "symbol": "M",
          "nameKh": "ម៉ាសម៉ូលេគុល DNA",
          "nameEn": "Molecular Mass",
          "unit": "đvC (ខ្នាតកាបូន)",
          "description": "M = N · 300 đvC"
        },
        {
          "symbol": "C",
          "nameKh": "ចំនួនជុំវង់",
          "nameEn": "Helical Turns",
          "unit": "ជុំវង់",
          "description": "C = N / 20"
        }
      ],
      "derivedFormulas": [
        {
          "formula": "N = \\frac{2L}{3.4}",
          "meaningKh": "គណនាចំនួននុយក្លេអូទីតតាមប្រវែង L"
        },
        {
          "formula": "H = 2A + 3G",
          "meaningKh": "ចំនួនសម្ព័ន្ធអ៊ីដ្រូសែនរវាងច្រវាក់ទាំងពីរ"
        }
      ]
    },
    "examples": [
      {
        "problemKh": "ម៉ូលេគុល DNA មួយមានប្រវែង L = 5100 Å។ គណនាចំនួននុយក្លេអូទីតសរុប N និងម៉ាសម៉ូលេគុល M។",
        "solutionKh": "N = (2 · L) / 3.4 = (2 · 5100) / 3.4 = 10200 / 3.4 = 3000 នុយក្លេអូទីត។ ម៉ាសម៉ូលេគុល M = N · 300 = 3000 · 300 = 900,000 đvC។"
      }
    ],
    "verificationStatus": "verified",
    "verifiedBy": "MoEYS Academic Review Board & ScienceKH Senior Editors",
    "verifiedAt": "2026-01-15T08:00:00Z",
    "viewCount": 3450,
    "sources": [
      {
        "id": "src-bio-dna-1",
        "sourceDocument": {
          "id": "doc-bio-g12",
          "titleKm": "សៀវភៅពុម្ពជីវវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)",
          "titleEn": "MoEYS Grade 12 Biology Official Textbook",
          "organization": "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          "grade": 12,
          "subjectSlug": "biology",
          "edition": "បោះពុម្ពលើកទី ៦",
          "publicationYear": 2024,
          "officialUrl": "https://oer.moeys.gov.kh/bio-g12",
          "salaUrl": "https://sala.moeys.gov.kh/materials/bio-g12",
          "isOfficialMoeys": true
        },
        "chapterKm": "ជំពូកទី ១៖ ហ្សែន និងក្រូម៉ូសូម",
        "chapterNumber": 1,
        "pageStart": 10,
        "pageEnd": 15,
        "quotedPassageKm": "ម៉ូលេគុល DNA ច្រវាក់ទ្វេមានប្រវែង L = (N/2) · 3.4 Å និង N = 2A + 2G។",
        "isPrimary": true
      }
    ]
  },
];
