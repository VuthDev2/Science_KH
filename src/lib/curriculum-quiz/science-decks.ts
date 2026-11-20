// ==============================================================================
// ScienceKH — Grade-Stratified Science Discovery Decks (Grades 7–12)
// Physics, Chemistry, Biology, Earth Science — MoEYS Standards
// ==============================================================================

import type { CuratedLesson } from "../curated-lessons";
import type { QuizQuestionItem } from "./types";

// ==============================================================================
// 1. BIOLOGY DECKS BY GRADE
// ==============================================================================

export function getG12BiologyDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-bio12-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់បំពេញបាស DNA",
      stage_name_en: "Stage 1 • DNA Base Pairing Synthesizer",
      prompt_km: "ចូរផ្គុំសម្ព័ន្ធគូរបាសអាសូតនៃ DNA តាមច្បាប់បំពេញបាស Chargaff៖",
      prompt_en: "Assemble Watson-Crick DNA complementary base pairs on the rail:",
      spoken_theorem_km: "អាដេនីន ភ្ជាប់នឹង ទីមីន ហើយ ហ្គានីន ភ្ជាប់នឹង ស៊ីតូស៊ីន",
      spoken_theorem_en: "Adenine pairs with Thymine and Guanine pairs with Cytosine",
      variables_pool: [
        { id: "b1", symbol: "A", name_km: "អាដេនីន", name_en: "Adenine", unit: "Purine" },
        { id: "b2", symbol: "=", name_km: "សម្ព័ន្ធ ២", name_en: "2 H-bonds", unit: "Double Bond", category: "operator" },
        { id: "b3", symbol: "T", name_km: "ទីមីន", name_en: "Thymine", unit: "Pyrimidine" },
        { id: "b4", symbol: "&", name_km: "និង", name_en: "And", unit: "Conjunction", category: "operator" },
        { id: "b5", symbol: "G", name_km: "ហ្គានីន", name_en: "Guanine", unit: "Purine" },
        { id: "b6", symbol: "≡", name_km: "សម្ព័ន្ធ ៣", name_en: "3 H-bonds", unit: "Triple Bond", category: "operator" },
        { id: "b7", symbol: "C", name_km: "ស៊ីតូស៊ីន", name_en: "Cytosine", unit: "Pyrimidine" },
      ],
      target_sequence_ids: ["b1", "b2", "b3", "b4", "b5", "b6", "b7"],
      formula_badge: "A = T & G ≡ C",
      socratic_clue_km: "A ភ្ជាប់ T ដោយសម្ព័ន្ធអ៊ីដ្រូសែន ២ ហើយ G ភ្ជាប់ C ដោយសម្ព័ន្ធ ៣។",
      socratic_clue_en: "Adenine bonds with Thymine via 2 H-bonds; Guanine bonds with Cytosine via 3 H-bonds.",
      explanation_km: "ច្បាប់បំពេញបាស Chargaff ចែងថា A តែងតែភ្ជាប់នឹង T ហើយ G តែងតែភ្ជាប់នឹង C ក្នុងទ្វេវង់ DNA។",
      explanation_en: "Complementary base pairing (A=T and G≡C) maintains uniform double helix diameter.",
    },
    {
      id: `${lessonId}-bio12-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • ភាពខុសគ្នារវាង DNA និង RNA",
      stage_name_en: "Stage 2 • Nucleic Acid Comparison",
      prompt_km: "តើបាសអាសូតណាដែលមានតែនៅក្នុង RNA ហើយមិនមានក្នុង DNA ឡើយ?",
      prompt_en: "Which nitrogenous base is present exclusively in RNA and never in DNA?",
      options_km: [
        "អ៊ុយរ៉ាស៊ីល (Uracil - U ជំនួស Thymine)",
        "អាដេនីន (Adenine - A)",
        "ហ្គានីន (Guanine - G)",
        "ស៊ីតូស៊ីន (Cytosine - C)",
      ],
      options_en: ["Uracil (U replaces Thymine)", "Adenine (A)", "Guanine (G)", "Cytosine (C)"],
      correct_index: 0,
      scientific_analogy_km: "ដូចសំបុត្រផ្ញើសារបណ្តោះអាសន្ន៖ RNA ប្រើ U ជំនួស T ដើម្បីងាយស្រួលបំបែកចោលក្រោយបកប្រែរួច។",
      scientific_analogy_en: "Like a disposable messenger: RNA incorporates Uracil rather than energetic Thymine.",
      formula_badge: "Uracil (U) in RNA",
      socratic_clue_km: "ក្នុង RNA បាស Thymine (T) ត្រូវបានជំនួសដោយ Uracil (U)។",
      socratic_clue_en: "In RNA transcripts, Uracil (U) replaces Thymine (T) across from Adenine.",
      explanation_km: "RNA មានបាស ៤ គឺ A, U, G, C (អ៊ុយរ៉ាស៊ីល U ជំនួស ទីមីន T) និងមានស្កររីបូស។",
      explanation_en: "RNA uniquely uses Uracil instead of Thymine and ribose instead of deoxyribose.",
    },
    {
      id: `${lessonId}-bio12-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • លំដាប់សំយោគប្រូតេអ៊ីន (Central Dogma)",
      stage_name_en: "Stage 3 • Protein Synthesis Flow",
      prompt_km: "ចូររៀបចំ ៤ ដំណាក់កាលនៃការសំយោគប្រូតេអ៊ីនតាមលំដាប់លំហូរព័ត៌មានពន្ធុ៖",
      prompt_en: "Arrange the 4 sequential stages of the Central Dogma of Molecular Biology:",
      steps_km: [
        "ការចម្លងកូដ (Transcription) ពីពុម្ព DNA ទៅជា mRNA ក្នុងស្នូលកោសិកា",
        "mRNA ចាកចេញពីស្នូលឆ្លងកាត់រន្ធភ្នាសស្នូល ទៅកាន់ស៊ីតូប្លាស",
        "mRNA ភ្ជាប់ជាមួយរីបូសូម (Ribosome) ដើម្បីចាប់ផ្តើមបកប្រែកូដ",
        "tRNA ដឹកនាំអាស៊ីតអាមីណូមកផ្គុំជាច្រវាក់ប៉ូលីប៉ិបទីត (ប្រូតេអ៊ីន)",
      ],
      steps_en: [
        "Transcription of DNA template strand into pre-mRNA in nucleus",
        "mRNA transcript exits nucleus through nuclear pores into cytoplasm",
        "mRNA binds to small ribosomal subunit to initiate translation",
        "tRNA matches anticodons and elongates nascent polypeptide protein chain",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "DNA ➔ mRNA ➔ Protein",
      socratic_clue_km: "ចម្លងកូដក្នុងស្នូល -> mRNA ចេញក្រៅ -> ភ្ជាប់រីបូសូម -> tRNA បកប្រែជាប្រូតេអ៊ីន។",
      socratic_clue_en: "Nuclear transcription -> cytoplasmic export -> ribosomal docking -> tRNA translation.",
      explanation_km: "ព័ត៌មានពន្ធុហូរពី DNA ទៅ mRNA តាមការចម្លងកូដ រួចបកប្រែជារូបរាងប្រូតេអ៊ីននៅរីបូសូម។",
      explanation_en: "The Central Dogma describes unidirectional information transfer: DNA -> RNA -> Protein.",
    },
    {
      id: `${lessonId}-bio12-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • ការគណនាកូដុង និងអាស៊ីតអាមីណូ",
      stage_name_en: "Stage 4 • Codon Translation Calculation",
      prompt_km: "ខ្សែ mRNA មួយមានប្រវែង ៣០០ នុយក្លេអូទីដ (មិនគិតកូដុងបញ្ចប់)។ តើវាសំយោគបានប្រូតេអ៊ីនដែលមានអាស៊ីតអាមីណូចំនួនប៉ុន្មាន?",
      prompt_en: "An mRNA strand consists of 300 coding nucleotides (excluding stop codon). How many amino acids will be in the translated peptide?",
      given_values_km: [
        { label: "ចំនួននុយក្លេអូទីដ (N)", value: "300" },
        { label: "នុយក្លេអូទីដក្នុង ១ កូដុង", value: "3" },
      ],
      given_values_en: [
        { label: "Coding Nucleotides (N)", value: "300" },
        { label: "Bases per Codon", value: "3" },
      ],
      options_km: [
        "១០០ អាស៊ីតអាមីណូ (ព្រោះ ៣ នុយក្លេអូទីដ = ១ កូដុង = ១ អាស៊ីតអាមីណូ)",
        "៣០០ អាស៊ីតអាមីណូ",
        "៩០០ អាស៊ីតអាមីណូ",
        "៥០ អាស៊ីតអាមីណូ",
      ],
      options_en: [
        "100 amino acids (via 300 / 3 = 100 codons)",
        "300 amino acids",
        "900 amino acids",
        "50 amino acids",
      ],
      correct_index: 0,
      formula_badge: "100 Amino Acids",
      socratic_clue_km: "កូដពន្ធុជាកូដត្រីធាតុ (Triplet Code)៖ យក 300 ចែកនឹង 3។",
      socratic_clue_en: "Genetic code is triplet-based: divide total nucleotides by 3.",
      explanation_km: "ចំនួនអាស៊ីតអាមីណូ = ៣០០ / ៣ = ១០០ អាស៊ីតអាមីណូ។",
      explanation_en: "Triplet reading frame translates 300 nucleotides into exactly 100 amino acids.",
    },
  ];
}

export function getG10CellBiologyDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-bio10-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តដង្ហើមកោសិកា",
      stage_name_en: "Stage 1 • Cellular Respiration Synthesizer",
      prompt_km: "ចូរផ្គុំសមីការគីមីនៃការដកដង្ហើមកោសិកា (Cellular Respiration)៖",
      prompt_en: "Assemble the chemical equation for cellular respiration:",
      spoken_theorem_km: "គ្លុយកូស បូក ប្រាំមួយ អុកស៊ីសែន បង្កើតបានជា ប្រាំមួយ កាបូនិក បូក ប្រាំមួយ ទឹក បូក ថាមពល ATP",
      spoken_theorem_en: "Glucose plus six Oxygen yields six Carbon Dioxide plus six Water plus ATP",
      variables_pool: [
        { id: "cr1", symbol: "C₆H₁₂O₆", name_km: "គ្លុយកូស", name_en: "Glucose", unit: "Substrate" },
        { id: "cr2", symbol: "+", name_km: "បូក", name_en: "Plus", unit: "Add", category: "operator" },
        { id: "cr3", symbol: "6 O₂", name_km: "អុកស៊ីសែន", name_en: "Oxygen", unit: "Gas" },
        { id: "cr4", symbol: "→", name_km: "បង្កើតជា", name_en: "Yields", unit: "Reaction", category: "operator" },
        { id: "cr5", symbol: "6 CO₂ + 6 H₂O", name_km: "កាបូនិក និងទឹក", name_en: "Products", unit: "Molecules" },
        { id: "cr6", symbol: "+ ATP", name_km: "ថាមពល ATP", name_en: "Energy ATP", unit: "Energy", category: "constant" },
      ],
      target_sequence_ids: ["cr1", "cr2", "cr3", "cr4", "cr5", "cr6"],
      formula_badge: "C₆H₁₂O₆ + 6O₂ ➔ 6CO₂ + 6H₂O + ATP",
      socratic_clue_km: "ដង្ហើមកោសិកាបំបែកគ្លុយកូសជាមួយអុកស៊ីសែនដើម្បីផលិតថាមពល ATP ក្នុងមីតូកុងឌ្រី។",
      socratic_clue_en: "Cellular respiration metabolizes glucose with oxygen to synthesize ATP energy.",
      explanation_km: "ដង្ហើមកោសិកាប្រព្រឹត្តទៅក្នុងមីតូកុងឌ្រី បញ្ចេញថាមពល ATP សម្រាប់ទ្រទ្រង់សកម្មភាពជីវិត។",
      explanation_en: "Cellular respiration occurs in mitochondria, yielding usable biological ATP energy.",
    },
    {
      id: `${lessonId}-bio10-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • មុខងារនៃមីតូកុងឌ្រីក្នុងកោសិកា",
      stage_name_en: "Stage 2 • Mitochondria Organelle Function",
      prompt_km: "ហេតុអ្វីបានជាមីតូកុងឌ្រី (Mitochondria) ត្រូវបានគេប្រសិទ្ធនាមថាជា «រោងចក្រថាមពល» នៃកោសិកា?",
      prompt_en: "Why is the mitochondrion termed the 'powerhouse' of eukaryotic cells?",
      options_km: [
        "ព្រោះវាជាទីតាំងសំយោគម៉ូលេគុលថាមពល ATP តាមរយៈដង្ហើមកោសិកាអ៊ែរ៉ូប៊ី",
        "ព្រោះវាផ្ទុកសារធាតុពណ៌បៃតងស្រូបពន្លឺថ្ងៃ",
        "ព្រោះវាបញ្ជាការបែងចែកកោសិកាទាំងអស់",
        "ព្រោះវាបង្កើតភ្នាសកោសិកាថ្មី",
      ],
      options_en: [
        "It synthesizes bulk cellular ATP energy through aerobic respiration phosphorylation",
        "It houses green chlorophyll pigments capturing sunlight",
        "It directly commands cell division replication",
        "It constructs the outer lipid bilayer membrane",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចរោងចក្រអគ្គិសនីនៃទីក្រុង៖ មីតូកុងឌ្រីដុតបំផ្លាញឥន្ធនៈ (ស្ករ) ដើម្បីបង្កើតថាមពល (ATP)។",
      scientific_analogy_en: "Like a power plant: mitochondria burn chemical fuel to generate usable energy.",
      formula_badge: "ATP Factory",
      socratic_clue_km: "មីតូកុងឌ្រីជាកន្លែងផលិតថាមពល ATP របស់កោសិកា។",
      socratic_clue_en: "Mitochondria execute oxidative phosphorylation to yield ATP.",
      explanation_km: "មីតូកុងឌ្រីជាសរីរាង្គកោសិកាដែលផលិត ATP ច្រើនបំផុតតាមរយៈខ្សែច្រវាក់ដឹកជញ្ជូនអេឡិចត្រុង។",
      explanation_en: "Mitochondria produce cellular ATP through the Krebs cycle and electron transport chain.",
    },
    {
      id: `${lessonId}-bio10-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • វដ្តចែកកោសិកាមីតូស (Mitosis Sequence)",
      stage_name_en: "Stage 3 • Mitotic Phase Sequence",
      prompt_km: "ចូររៀបចំ ៤ ដំណាក់កាលនៃការចែកកោសិកាមីតូសតាមលំដាប់លំដោយ (PMAT)៖",
      prompt_en: "Arrange the 4 mitotic cell division phases in order (PMAT):",
      steps_km: [
        "Prophase ៖ ក្រូម៉ាទីនកកើតជាក្រូម៉ូសូម ភ្នាសស្នូលរលាយបាត់",
        "Metaphase ៖ ក្រូម៉ូសូមតម្រង់ជួរនៅប្លង់អេក្វាទ័រកណ្តាលកោសិកា",
        "Anaphase ៖ ក្រូម៉ាទីតបងប្អូនបែកចេញពីគ្នា ឆ្ពោះទៅប៉ូលទាំងសងខាង",
        "Telophase ៖ ស្នូលថ្មីកកើតឡើងវិញ កោសិកាបំបែកជាពីរ",
      ],
      steps_en: [
        "Prophase: Chromatin condenses into visible chromosomes, nuclear envelope dissolves",
        "Metaphase: Chromosomes align along equatorial metaphase plate",
        "Anaphase: Sister chromatids pulled apart toward opposite spindle poles",
        "Telophase: Nuclear envelopes reform, cytokinesis completes cell separation",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "P ➔ M ➔ A ➔ T",
      socratic_clue_km: "ចាំពាក្យកាត់ PMAT ៖ Prophase -> Metaphase -> Anaphase -> Telophase។",
      socratic_clue_en: "Mnemonic PMAT: Prophase -> Metaphase -> Anaphase -> Telophase.",
      explanation_km: "មីតូសឆ្លងកាត់ ៤ ដំណាក់កាលជាប់ៗគ្នា (PMAT) ដើម្បីបែងចែកក្រូម៉ូសូមស្មើគ្នាទៅកោសិកាកូនទាំងពីរ។",
      explanation_en: "Mitotic PMAT order ensures exact chromosomal distribution without genetic anomalies.",
    },
    {
      id: `${lessonId}-bio10-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាចំនួនកោសិកាកូនក្រោយការចែកមីតូស",
      stage_name_en: "Stage 4 • Mitotic Exponential Growth",
      prompt_km: "កោសិកាមួយធ្វើការចែកកោសិកាតាមមីតូសចំនួន ៤ លើកជាប់ៗគ្នា។ តើកកើតបានកោសិកាកូនសរុបប៉ុន្មាន?",
      prompt_en: "A somatic cell undergoes 4 successive mitotic divisions. How many daughter cells are produced?",
      given_values_km: [
        { label: "ចំនួនកោសិកាដើម", value: "1" },
        { label: "ចំនួនលើកនៃការចែក (n)", value: "4 លើក" },
        { label: "រូបមន្តចំនួនកោសិកា", value: "2ⁿ" },
      ],
      given_values_en: [
        { label: "Initial Cells", value: "1" },
        { label: "Division Cycles (n)", value: "4" },
        { label: "Growth Formula", value: "2^n" },
      ],
      options_km: [
        "១៦ កោសិកា (តាមរូបមន្ត 2⁴ = 2 × 2 × 2 × 2 = 16)",
        "៨ កោសិកា (ច្រឡំ 2 × 4)",
        "៤ កោសិកា",
        "៣២ កោសិកា",
      ],
      options_en: [
        "16 cells (via 2^4 = 16)",
        "8 cells (confusing 2 * 4)",
        "4 cells",
        "32 cells",
      ],
      correct_index: 0,
      formula_badge: "N = 2ⁿ = 16",
      socratic_clue_km: "រាល់លើកកោសិកាកើនឡើងទ្វេដង៖ 1 -> 2 -> 4 -> 8 -> 16 (2⁴ = 16)។",
      socratic_clue_en: "Cells double each round: 2^4 = 16.",
      explanation_km: "ចំនួនកោសិកាកូនក្រោយការចែក n លើកតាមមីតូសគឺ N = 2ⁿ = 2⁴ = 16 កោសិកា។",
      explanation_en: "Mitotic binary division yields N = 2^n = 2^4 = 16 daughter cells.",
    },
  ];
}

// ==============================================================================
// 2. CHEMISTRY DECKS BY GRADE
// ==============================================================================

export function getG12ChemistryDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-chem12-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តល្បឿនប្រតិកម្មគីមី",
      stage_name_en: "Stage 1 • Reaction Rate Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាល្បឿនមធ្យមនៃការបាត់បង់អង្គធាតុប្រតិករ A ៖",
      prompt_en: "Assemble the average reaction rate equation for consumption of reactant A:",
      spoken_theorem_km: "ល្បឿន ស្មើនឹង ដក បម្រែបម្រួលកំហាប់ អា លើ បម្រែបម្រួលពេល ឌីតេ",
      spoken_theorem_en: "Rate equals minus delta concentration A over delta t",
      variables_pool: [
        { id: "ch1", symbol: "v_moy", name_km: "ល្បឿនមធ្យម", name_en: "v_moy", unit: "Rate" },
        { id: "ch2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "ch3", symbol: "- Δ[A]", name_km: "ដក បម្រែបម្រួលកំហាប់ A", name_en: "-Δ[A]", unit: "Concentration" },
        { id: "ch4", symbol: "/", name_km: "ចែកនឹង", name_en: "over", unit: "Division", category: "operator" },
        { id: "ch5", symbol: "Δt", name_km: "បម្រែបម្រួលពេល", name_en: "Δt", unit: "Time" },
      ],
      target_sequence_ids: ["ch1", "ch2", "ch3", "ch4", "ch5"],
      formula_badge: "v = -Δ[A]/Δt",
      socratic_clue_km: "អង្គធាតុប្រតិករបាត់បង់តាមពេលវេលា ដូច្នេះត្រូវមានសញ្ញាដក (-) ដើម្បីឱ្យល្បឿនវិជ្ជមាន។",
      socratic_clue_en: "Reactants are consumed over time; the negative sign ensures a positive rate.",
      explanation_km: "ល្បឿនបាត់បង់ប្រតិករ A គិតជា v = -Δ[A]/Δt (mol·L⁻¹·s⁻¹)។",
      explanation_en: "Reaction rate for reactant consumption is defined as -d[A]/dt.",
    },
    {
      id: `${lessonId}-chem12-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • កត្តាជះឥទ្ធិពលលើល្បឿនប្រតិកម្ម",
      stage_name_en: "Stage 2 • Factors Influencing Reaction Kinetics",
      prompt_km: "តើកត្តាណាខាងក្រោមនេះដែលជួយបង្កើនល្បឿនប្រតិកម្មគីមី?",
      prompt_en: "Which of the following interventions systematically accelerates a chemical reaction?",
      options_km: [
        "ការបង្កើនសីតុណ្ហភាព កំហាប់ប្រតិករ ផ្ទៃប៉ះ និងការប្រើកាតាលីករ",
        "ការបន្ថយសីតុណ្ហភាពឱ្យត្រជាក់ខ្លាំង",
        "ការកាត់បន្ថយកំហាប់ប្រតិករ",
        "ការបន្ថយផ្ទៃប៉ះនៃអង្គធាតុរឹង",
      ],
      options_en: [
        "Elevating temperature, increasing reactant concentrations, enlarging surface area, and adding catalysts",
        "Lowering temperature toward freezing",
        "Diluting reactant concentrations",
        "Compacting solid surface contact area",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចចរាចរណ៍លើដងផ្លូវ៖ សីតុណ្ហភាពខ្ពស់ធ្វើឱ្យម៉ូលេគុលរត់ញាប់ ប៉ះទង្គិចគ្នាញឹកញាប់ និងមានប្រសិទ្ធភាព។",
      scientific_analogy_en: "Like dense highway traffic: higher thermal kinetic energy drives more frequent effective collisions.",
      formula_badge: "Arrhenius Kinetics",
      socratic_clue_km: "កម្តៅ កំហាប់ ផ្ទៃប៉ះ និងកាតាលីករ បង្កើនល្បឿនប្រតិកម្មជានិច្ច។",
      socratic_clue_en: "Temperature, concentration, surface area, and catalysts elevate reaction kinetics.",
      explanation_km: "តាមទ្រឹស្តីប៉ះទង្គិច ការបង្កើនកម្តៅ និងកំហាប់បង្កើនចំនួនទង្គិចប្រសិទ្ធភាពក្នុងមួយឯកតាពេល។",
      explanation_en: "According to collision theory, higher temperature increases the proportion of molecules exceeding activation energy.",
    },
    {
      id: `${lessonId}-chem12-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • ៤ ជំហានគណនា pH នៃសូលុយស្យុង",
      stage_name_en: "Stage 3 • pH Evaluation Protocol",
      prompt_km: "ចូររៀបចំ ៤ ជំហាននៃការគណនា pH នៃសូលុយស្យុងអាស៊ីតខ្លាំង HCl ៖",
      prompt_en: "Arrange the 4 steps to determine the pH of a strong acid HCl solution:",
      steps_km: [
        "សរសេរសមីការអ៊ីយ៉ុងកម្មពេញលេញ ៖ HCl + H₂O → H₃O⁺ + Cl⁻",
        "កំណត់កំហាប់អ៊ីយ៉ុងអ៊ីដ្រូញ៉ូម ៖ [H₃O⁺] = C_a",
        "អនុវត្តរូបមន្តនិយមន័យ ៖ pH = -log[H₃O⁺]",
        "គណនាតម្លៃលេខ និងផ្ទៀងផ្ទាត់លក្ខខណ្ឌ 0 ≤ pH < 7",
      ],
      steps_en: [
        "Write full stoichiometric dissociation: HCl + H₂O -> H₃O⁺ + Cl⁻",
        "Equate hydronium ion concentration: [H₃O⁺] = C_a",
        "Apply definition formula: pH = -log[H₃O⁺]",
        "Evaluate numeric logarithm and confirm acidic range 0 <= pH < 7",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "pH = -log[H₃O⁺]",
      socratic_clue_km: "សរសេរសមីការ -> ទាញ [H₃O⁺] -> ជំនួសក្នុង -log[H₃O⁺] -> បាន pH។",
      socratic_clue_en: "Dissociation equation -> hydronium concentration -> -log[H₃O⁺] -> pH.",
      explanation_km: "អាស៊ីតខ្លាំងបំបែកទាំងស្រុងក្នុងទឹក នាំឱ្យ [H₃O⁺] ស្មើនឹងកំហាប់ដើមរបស់អាស៊ីត។",
      explanation_en: "Strong monoprotic acids dissociate completely, so [H₃O⁺] matches analytical acid concentration.",
    },
    {
      id: `${lessonId}-chem12-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាតម្លៃ pH ជាក់ស្តែង",
      stage_name_en: "Stage 4 • Quantitative pH Evaluation",
      prompt_km: "សូលុយស្យុង HCl មួយមានកំហាប់ [H₃O⁺] = 1.0 × 10⁻³ M។ គណនាតម្លៃ pH នៃសូលុយស្យុងនេះ៖",
      prompt_en: "A hydrochloric acid solution has [H₃O⁺] = 1.0 x 10⁻³ M. Calculate its pH value:",
      given_values_km: [
        { label: "កំហាប់អ៊ីយ៉ុង [H₃O⁺]", value: "1.0 × 10⁻³ mol/L" },
        { label: "រូបមន្ត pH", value: "pH = -log[H₃O⁺]" },
      ],
      given_values_en: [
        { label: "Hydronium Concentration", value: "1.0 x 10⁻³ M" },
        { label: "pH Identity", value: "pH = -log[H₃O⁺]" },
      ],
      options_km: [
        "pH = 3 (តាមរូបមន្ត -log(10⁻³) = 3)",
        "pH = 7 (អព្យាក្រឹត)",
        "pH = 11 (បាស)",
        "pH = 1",
      ],
      options_en: [
        "pH = 3 (via -log(10⁻³) = 3)",
        "pH = 7 (neutral)",
        "pH = 11 (basic)",
        "pH = 1",
      ],
      correct_index: 0,
      formula_badge: "pH = 3.0",
      socratic_clue_km: "ស្វ័យគុណដក 3 នៃគោល 10 ក្លាយជា pH = 3។",
      socratic_clue_en: "Negative exponent of 10⁻³ directly gives pH = 3.",
      explanation_km: "pH = -log[H₃O⁺] = -log(10⁻³) = -(-3) = 3។ សូលុយស្យុងមានលក្ខណៈអាស៊ីត។",
      explanation_en: "pH = -log(1.0 x 10⁻³) = 3.0, confirming an acidic solution.",
    },
  ];
}


// ==============================================================================
// 4. GRADE 8 PHYSICS QUANTITATIVE CALCULATION DECKS
// ==============================================================================

// G8 Phys 01: Pressure in Solids and Fluids (P = F / S)
export function getG8PhysicsPressureDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-p-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តសម្ពាធមេកានិច",
      stage_name_en: "Stage 1 • Pressure Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាសម្ពាធ P (កម្លាំងសង្កត់ F, ផ្ទៃរងសង្កត់ S) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the mechanical pressure formula P = F / S on the equation rail:",
      spoken_theorem_km: "ប៉េ ស្មើនឹង អែហ្វ ចែកនឹង អែស",
      spoken_theorem_en: "P equals F over S",
      variables_pool: [
        { id: "pr1", symbol: "P", name_km: "សម្ពាធ P (Pa)", name_en: "Pressure P", unit: "Pascal" },
        { id: "pr2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "pr3", symbol: "F", name_km: "កម្លាំងសង្កត់ F (N)", name_en: "Force F", unit: "Newton" },
        { id: "pr4", symbol: "/", name_km: "ចែកនឹង", name_en: "divided by", unit: "Operator", category: "operator" },
        { id: "pr5", symbol: "S", name_km: "ផ្ទៃរងសម្ពាធ S (m²)", name_en: "Area S", unit: "Square meter" },
      ],
      target_sequence_ids: ["pr1", "pr2", "pr3", "pr4", "pr5"],
      formula_badge: "P = F / S",
      socratic_clue_km: "សម្ពាធស្មើនឹងកម្លាំងកាត់កែងចែកនឹងផ្ទៃរងសម្ពាធ (Pa = N/m²)។",
      socratic_clue_en: "Pressure is perpendicular force divided by surface area (Pa = N/m²).",
      explanation_km: "P = F / S ដែល F គិតជា ញូតុន (N), S គិតជា ម៉ែត្រការេ (m²), P គិតជា ប៉ាស្កាល់ (Pa)។",
      explanation_en: "P = F / S where F is in Newtons (N), S in m², and P in Pascals (Pa).",
    },
    {
      id: `${lessonId}-p-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាតម្លៃសម្ពាធជាក់ស្តែង",
      stage_name_en: "Stage 2 • Quantitative Pressure Evaluation",
      prompt_km: "វត្ថុមួយមានទម្ងន់ F = 600 N សង្កត់លើផ្ទៃរាបស្មើ S = 0.03 m²។ គណនាសម្ពាធ P លើផ្ទៃនោះ៖",
      prompt_en: "A block exerts a force of F = 600 N on an area S = 0.03 m². Calculate pressure P:",
      options_km: [
        "P = 20,000 Pa (600 / 0.03 = 20,000 Pa)",
        "P = 18 Pa",
        "P = 2,000 Pa",
        "P = 200,000 Pa",
      ],
      options_en: [
        "P = 20,000 Pa (600 / 0.03 = 20,000 Pa)",
        "P = 18 Pa",
        "P = 2,000 Pa",
        "P = 200,000 Pa",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដូចកែងស្បែកជើងចោត៖ ផ្ទៃប៉ះកាន់តែតូច សម្ពាធធ្លាក់លើដីកាន់តែខ្លាំង!",
      scientific_analogy_en: "Like high heels: smaller contact area produces massively higher pressure.",
      formula_badge: "P = 600 / 0.03 = 20,000 Pa",
      socratic_clue_km: "P = F / S = 600 / 0.03 = 20,000 Pa = 20 kPa។",
      socratic_clue_en: "P = 600 / 0.03 = 20,000 Pa.",
      explanation_km: "P = F / S = 600 N / 0.03 m² = 20,000 Pa (ឬ 20 kPa)។",
      explanation_en: "P = 600 N / 0.03 m² = 20,000 Pa (or 20 kPa).",
    },
    {
      id: `${lessonId}-p-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានទាញរកផ្ទៃរងសម្ពាធ S",
      stage_name_en: "Stage 3 • 4-Step Surface Area Derivation",
      prompt_km: "ម៉ាស៊ីនមួយមានទម្ងន់ F = 4,000 N បង្កើតសម្ពាធ P = 80,000 Pa។ រៀបចំ ៤ ជំហានរកផ្ទៃបាត S ៖",
      prompt_en: "A machine with weight F = 4,000 N exerts pressure P = 80,000 Pa. Arrange 4 steps to find area S:",
      steps_km: [
        "សរសេររូបមន្តគ្រឹះ ៖ P = F / S",
        "ទាញរកអថេរមិនស្គាល់ S ៖ S = F / P",
        "ជំនួសតម្លៃលេខ ៖ S = 4,000 / 80,000",
        "សម្រួលប្រភាគ និងសរសេរខ្នាត ៖ S = 0.05 m² (ឬ 500 cm²)",
      ],
      steps_en: [
        "State governing equation: P = F / S",
        "Isolate unknown variable S: S = F / P",
        "Substitute numerical values: S = 4,000 / 80,000",
        "Simplify arithmetic and state SI unit: S = 0.05 m²",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "S = F / P = 0.05 m²",
      socratic_clue_km: "S = F / P = 4,000 / 80,000 = 1/20 = 0.05 m²។",
      socratic_clue_en: "S = F / P = 4,000 / 80,000 = 0.05 m².",
      explanation_km: "ពី P = F / S ទាញបាន S = F / P = 4,000 / 80,000 = 0.05 m²។",
      explanation_en: "From P = F/S, S = F/P = 0.05 m².",
    },
    {
      id: `${lessonId}-p-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាសម្ពាធអ៊ីដ្រូស្តាទិចក្នុងអង្គធាតុរាវ",
      stage_name_en: "Stage 4 • Hydrostatic Fluid Pressure Evaluation",
      prompt_km: "គណនាសម្ពាធទឹកនៅជម្រៅ h = 5 m (ដឹងថា ម៉ាសមាឌទឹក ρ = 1,000 kg/m³, g = 10 m/s², រូបមន្ត P = ρ·g·h) ៖",
      prompt_en: "Find hydrostatic pressure at depth h = 5 m (water density ρ = 1,000 kg/m³, g = 10 m/s², formula P = ρ·g·h):",
      given_values_km: [
        { label: "ម៉ាសមាឌទឹក ρ", value: "1,000 kg/m³" },
        { label: "សំទុះទំនាញដី g", value: "10 m/s²" },
        { label: "ជម្រៅទឹក h", value: "5 m" },
      ],
      given_values_en: [
        { label: "Water density ρ", value: "1,000 kg/m³" },
        { label: "Gravity acceleration g", value: "10 m/s²" },
        { label: "Depth h", value: "5 m" },
      ],
      options_km: [
        "P = 50,000 Pa (1,000 × 10 × 5 = 50,000 Pa = 50 kPa)",
        "P = 5,000 Pa",
        "P = 15,000 Pa",
        "P = 500,000 Pa",
      ],
      options_en: [
        "P = 50,000 Pa (1,000 x 10 x 5 = 50,000 Pa)",
        "P = 5,000 Pa",
        "P = 15,000 Pa",
        "P = 500,000 Pa",
      ],
      correct_index: 0,
      formula_badge: "P = ρ·g·h = 50 kPa",
      socratic_clue_km: "P = 1,000 × 10 × 5 = 50,000 Pa = 50 kPa។",
      socratic_clue_en: "P = 1,000 x 10 x 5 = 50,000 Pa.",
      explanation_km: "P = ρ·g·h = 1,000 × 10 × 5 = 50,000 Pa = 50 kPa។",
      explanation_en: "P = ρ·g·h = 1,000 x 10 x 5 = 50,000 Pa = 50 kPa.",
    },
  ];
}

// G8 Phys 02: Archimedes Buoyant Force (F_A = ρ · g · V)
export function getG8PhysicsArchimedesDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-fa-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តកម្លាំងរុញអាកស៊ីម៉ែត",
      stage_name_en: "Stage 1 • Archimedes Buoyancy Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តកម្លាំងរុញអាកស៊ីម៉ែត F_A លើរនាំងសមីការ៖",
      prompt_en: "Assemble Archimedes buoyant force formula F_A on the equation rail:",
      spoken_theorem_km: "អែហ្វ អា ស្មើនឹង រ៉ូ គុណនឹង ហ្សេ គុណនឹង វី",
      spoken_theorem_en: "F A equals rho g V",
      variables_pool: [
        { id: "a1", symbol: "F_A", name_km: "កម្លាំងរុញ F_A (N)", name_en: "Buoyant Force", unit: "Newton" },
        { id: "a2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "a3", symbol: "ρ", name_km: "ម៉ាសមាឌរាវ ρ (kg/m³)", name_en: "Fluid density", unit: "kg/m³" },
        { id: "a4", symbol: "g", name_km: "សំទុះ g (m/s²)", name_en: "Gravity", unit: "m/s²" },
        { id: "a5", symbol: "V", name_km: "មាឌលិច V (m³)", name_en: "Displaced volume", unit: "m³" },
      ],
      target_sequence_ids: ["a1", "a2", "a3", "a4", "a5"],
      formula_badge: "F_A = ρ · g · V",
      socratic_clue_km: "កម្លាំងរុញអាកស៊ីម៉ែតស្មើទម្ងន់នៃអង្គធាតុរាវដែលត្រូវវត្ថុជំនួសកន្លែង។",
      socratic_clue_en: "Buoyant force equals the weight of displaced liquid.",
      explanation_km: "F_A = ρ · g · V (ច្បាប់អាកស៊ីម៉ែតគ្រឹះ)។",
      explanation_en: "F_A = ρ · g · V (fundamental Archimedes principle).",
    },
    {
      id: `${lessonId}-fa-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាកម្លាំងរុញអាកស៊ីម៉ែត",
      stage_name_en: "Stage 2 • Quantitative Buoyancy Evaluation",
      prompt_km: "ដុំដែកមួយមានមាឌ V = 0.005 m³ ត្រូវបានពន្លិចទាំងស្រុងក្នុងទឹក (ρ = 1,000 kg/m³, g = 9.8 m/s²)។ គណនាកម្លាំងរុញ F_A ៖",
      prompt_en: "An iron block of V = 0.005 m³ is submerged in water (ρ = 1,000 kg/m³, g = 9.8 m/s²). Find buoyant force F_A:",
      options_km: [
        "F_A = 49 N (1,000 × 9.8 × 0.005 = 49 N)",
        "F_A = 490 N",
        "F_A = 9.8 N",
        "F_A = 50 N",
      ],
      options_en: [
        "F_A = 49 N (1,000 x 9.8 x 0.005 = 49 N)",
        "F_A = 490 N",
        "F_A = 9.8 N",
        "F_A = 50 N",
      ],
      correct_index: 0,
      scientific_analogy_km: "ដុំដែកដេញទឹកចេញមាឌ 5 លីត្រ (ទម្ងន់ 49 N) ដូច្នេះទឹកច្រានត្រឡប់មកវិញដោយកម្លាំង 49 N ស្មើគ្នា។",
      scientific_analogy_en: "Displacing 5 liters of water (weight 49 N) creates an equal upward reaction force of 49 N.",
      formula_badge: "F_A = 49 N",
      socratic_clue_km: "1,000 × 0.005 = 5 kg; 5 kg × 9.8 = 49 N។",
      socratic_clue_en: "1,000 x 0.005 = 5 kg; 5 x 9.8 = 49 N.",
      explanation_km: "F_A = ρ · g · V = 1,000 × 9.8 × 0.005 = 49 N។",
      explanation_en: "F_A = ρ · g · V = 1,000 x 9.8 x 0.005 = 49 N.",
    },
    {
      id: `${lessonId}-fa-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានទាញរកមាឌលិច V",
      stage_name_en: "Stage 3 • 4-Step Displaced Volume Derivation",
      prompt_km: "វត្ថុមួយទទួលកម្លាំងរុញអាកស៊ីម៉ែត F_A = 20 N ក្នុងទឹក (ρ = 1,000 kg/m³, g = 10 m/s²)។ រៀបចំ ៤ ជំហានរកមាឌ V ៖",
      prompt_en: "An object experiences buoyant force F_A = 20 N in water (ρ = 1,000, g = 10). Arrange 4 steps to find V:",
      steps_km: [
        "សរសេររូបមន្តច្បាប់អាកស៊ីម៉ែត ៖ F_A = ρ · g · V",
        "ទាញរកមាឌមិនស្គាល់ V ៖ V = F_A / (ρ · g)",
        "ជំនួសតម្លៃលេខ ៖ V = 20 / (1,000 × 10)",
        "គណនាលទ្ធផលសម្រេច ៖ V = 0.002 m³ (ឬ 2 dm³ = 2 L)",
      ],
      steps_en: [
        "State Archimedes principle: F_A = ρ · g · V",
        "Isolate unknown volume V: V = F_A / (ρ · g)",
        "Substitute numeric values: V = 20 / (1,000 x 10)",
        "Evaluate final volume: V = 0.002 m³ (2 Liters)",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "V = 20 / 10,000 = 0.002 m³",
      socratic_clue_km: "V = 20 / 10,000 = 0.002 m³ = 2 លីត្រ។",
      socratic_clue_en: "V = 20 / 10,000 = 0.002 m³ = 2 Liters.",
      explanation_km: "V = F_A / (ρ·g) = 20 / 10,000 = 0.002 m³ = 2 L។",
      explanation_en: "V = 20 / 10,000 = 0.002 m³ = 2 Liters.",
    },
    {
      id: `${lessonId}-fa-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • វិភាគលក្ខខណ្ឌអណ្តែតនៃអង្គធាតុ",
      stage_name_en: "Stage 4 • Equilibrium Floating Condition Evaluation",
      prompt_km: "ដុំឈើមួយមានទម្ងន់ P = 15 N អណ្តែតនឹងថ្កល់លើផ្ទៃទឹក។ គណនាកម្លាំងរុញអាកស៊ីម៉ែត F_A ដែលទឹក tác dụng លើដុំឈើ៖",
      prompt_en: "A wood block weighing P = 15 N floats at rest in water. Calculate buoyant force F_A:",
      given_values_km: [
        { label: "ទម្ងន់ដុំឈើ P", value: "15 N" },
        { label: "ស្ថានភាពលំនឹង", value: "អណ្តែតនឹងថ្កល់ (F_A = P)" },
      ],
      given_values_en: [
        { label: "Wood block weight P", value: "15 N" },
        { label: "Equilibrium state", value: "Floating at rest (F_A = P)" },
      ],
      options_km: [
        "F_A = 15 N (ពេលអណ្តែតនឹងថ្កល់ កម្លាំងរុញស្មើទម្ងន់វត្ថុ)",
        "F_A = 0 N",
        "F_A = 150 N",
        "F_A = 1.5 N",
      ],
      options_en: [
        "F_A = 15 N (at equilibrium float, buoyant force equals weight)",
        "F_A = 0 N",
        "F_A = 150 N",
        "F_A = 1.5 N",
      ],
      correct_index: 0,
      formula_badge: "F_A = P = 15 N",
      socratic_clue_km: "លក្ខខណ្ឌអណ្តែតនឹងថ្កល់៖ កម្លាំងរុញអាកស៊ីម៉ែតមានទិសដៅឡើងលើស្មើទម្ងន់វត្ថុចុះក្រោម។",
      socratic_clue_en: "Floating equilibrium condition: upward buoyant force balances downward gravitational weight.",
      explanation_km: "នៅពេលវត្ថុអណ្តែតនឹងថ្កល់ កម្លាំងទាំងពីរមានតុល្យភាព៖ F_A = P = 15 N។",
      explanation_en: "In floating equilibrium: F_A = P = 15 N.",
    },
  ];
}

// G8 Phys 03: Mechanical Work & Power (W = F · d, P = W / t)
export function getG8PhysicsWorkPowerDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-wp-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តការងារមេកានិច",
      stage_name_en: "Stage 1 • Mechanical Work Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាការងារមេកានិច W លើរនាំងសមីការ៖",
      prompt_en: "Assemble the mechanical work formula W = F · d on the equation rail:",
      spoken_theorem_km: "ដូប៊លវេ ស្មើនឹង អែហ្វ គុណនឹង ដេ",
      spoken_theorem_en: "W equals F times d",
      variables_pool: [
        { id: "w1", symbol: "W", name_km: "ការងារ W (J)", name_en: "Work W", unit: "Joule" },
        { id: "w2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "w3", symbol: "F", name_km: "កម្លាំង F (N)", name_en: "Force F", unit: "Newton" },
        { id: "w4", symbol: "·", name_km: "គុណនឹង", name_en: "times", unit: "Operator", category: "operator" },
        { id: "w5", symbol: "d", name_km: "ចម្ងាយប្តូរទី d (m)", name_en: "Displacement d", unit: "Meter" },
      ],
      target_sequence_ids: ["w1", "w2", "w3", "w4", "w5"],
      formula_badge: "W = F · d",
      socratic_clue_km: "ការងារមេកានិចកើតឡើងនៅពេលកម្លាំងរុញវត្ថុឱ្យផ្លាស់ទីតាមទិសដៅកម្លាំង (Joule = N · m)។",
      socratic_clue_en: "Work occurs when a force displaces an object along its line of action (J = N · m).",
      explanation_km: "W = F · d (ការងារគិតជា ស៊ូល J, កម្លាំងគិតជា N, ចម្ងាយគិតជា m)។",
      explanation_en: "W = F · d (Work in Joules J, Force in N, Displacement in m).",
    },
    {
      id: `${lessonId}-wp-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាការងារមេកានិចជាក់ស្តែង",
      stage_name_en: "Stage 2 • Quantitative Work Evaluation",
      prompt_km: "កម្មករម្នាក់ប្រើកម្លាំង F = 200 N រុញរទេះឱ្យផ្លាស់ទីបានចម្ងាយ d = 5 m។ គណនាការងារមេកានិច W ៖",
      prompt_en: "A worker pushes a cart with force F = 200 N over displacement d = 5 m. Calculate work W:",
      options_km: [
        "W = 1,000 J (200 × 5 = 1,000 J)",
        "W = 40 J",
        "W = 205 J",
        "W = 10,000 J",
      ],
      options_en: [
        "W = 1,000 J (200 x 5 = 1,000 J)",
        "W = 40 J",
        "W = 205 J",
        "W = 10,000 J",
      ],
      correct_index: 0,
      scientific_analogy_km: "ថាមពលមេកានិច 1,000 ស៊ូល ត្រូវបានផ្ទេរទៅកាន់រទេះដើម្បីបង្កើតចលនា។",
      scientific_analogy_en: "1,000 Joules of mechanical energy is transferred to accelerate the cart.",
      formula_badge: "W = 200 × 5 = 1,000 J",
      socratic_clue_km: "W = F · d = 200 × 5 = 1,000 J = 1 kJ។",
      socratic_clue_en: "W = 200 x 5 = 1,000 J.",
      explanation_km: "W = F · d = 200 N × 5 m = 1,000 J (ឬ 1 kJ)។",
      explanation_en: "W = 200 N x 5 m = 1,000 J (or 1 kJ).",
    },
    {
      id: `${lessonId}-wp-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានគណនាអានុភាពមេកានិច P",
      stage_name_en: "Stage 3 • 4-Step Mechanical Power Derivation",
      prompt_km: "ម៉ូទ័រមួយបំពេញការងារ W = 1,200 J ក្នុងរយៈពេល t = 6 s។ រៀបចំ ៤ ជំហានគណនាអានុភាព P ៖",
      prompt_en: "A motor performs work W = 1,200 J in time t = 6 s. Arrange 4 steps to find power P:",
      steps_km: [
        "សរសេររូបមន្តអានុភាពមេកានិច ៖ P = W / t",
        "ជំនួសតម្លៃការងារ W = 1,200 J និងរយៈពេល t = 6 s",
        "ធ្វើប្រមាណវិធីចែក ៖ 1,200 / 6",
        "សរសេរចម្លើយជាមួយខ្នាតវ៉ាត់ ៖ P = 200 W",
      ],
      steps_en: [
        "State mechanical power equation: P = W / t",
        "Substitute values W = 1,200 J and t = 6 s",
        "Perform division arithmetic: 1,200 / 6",
        "State final value in Watts: P = 200 W",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "P = W / t = 200 W",
      socratic_clue_km: "អានុភាពគឺជាល្បឿននៃការបំពេញការងារក្នុង ១ វិនាទី (Watt = J/s)។",
      socratic_clue_en: "Power measures the rate of work done per second (Watt = J/s).",
      explanation_km: "P = W / t = 1,200 / 6 = 200 W។",
      explanation_en: "P = 1,200 / 6 = 200 Watts.",
    },
    {
      id: `${lessonId}-wp-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាការងារ និងអានុភាពស្ទូចវត្ថុ",
      stage_name_en: "Stage 4 • Hoist Work & Power Quantitative Problem",
      prompt_km: "ស្ទូចមួយលើកទំនិញម៉ាស m = 50 kg ឡើងលើកម្ពស់ h = 4 m ក្នុងរយៈពេល t = 10 s (យក g = 10 m/s²)។ គណនាអានុភាព P នៃស្ទូច៖",
      prompt_en: "A crane lifts load m = 50 kg to height h = 4 m in t = 10 s (g = 10 m/s²). Find power P:",
      given_values_km: [
        { label: "ទម្ងន់ទំនិញ P = m·g", value: "50 × 10 = 500 N" },
        { label: "ការងារលើក W = F·h", value: "500 × 4 = 2,000 J" },
        { label: "រយៈពេល t", value: "10 s" },
      ],
      given_values_en: [
        { label: "Weight F = m·g", value: "50 x 10 = 500 N" },
        { label: "Work W = F·h", value: "500 x 4 = 2,000 J" },
        { label: "Duration t", value: "10 s" },
      ],
      options_km: [
        "P = 200 W (W = 2,000 J; P = 2,000 / 10 = 200 W)",
        "P = 2,000 W",
        "P = 20 W",
        "P = 500 W",
      ],
      options_en: [
        "P = 200 W (W = 2,000 J; P = 2,000 / 10 = 200 W)",
        "P = 2,000 W",
        "P = 20 W",
        "P = 500 W",
      ],
      correct_index: 0,
      formula_badge: "P = 2,000 / 10 = 200 W",
      socratic_clue_km: "កម្លាំងលើក = 500 N; ការងារ = 500 × 4 = 2,000 J; អានុភាព = 2,000 / 10 = 200 W។",
      socratic_clue_en: "Force = 500 N; Work = 2,000 J; Power = 2,000 / 10 = 200 W.",
      explanation_km: "W = m·g·h = 50 × 10 × 4 = 2,000 J នាំឱ្យ P = W / t = 2,000 / 10 = 200 W។",
      explanation_en: "W = mgh = 2,000 J, Power P = W/t = 200 W.",
    },
  ];
}

// ==============================================================================
// 5. GRADE 8 CHEMISTRY QUANTITATIVE CALCULATION DECKS
// ==============================================================================

// G8 Chem 01: Molar Mass & Mole Calculation (M, n = m / M)
export function getG8ChemistryMolarMassDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: `${lessonId}-mol-1`,
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តចំនួនម៉ូលគីមី",
      stage_name_en: "Stage 1 • Molar Quantity Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាចំនួនម៉ូល n (ម៉ាស m, ម៉ាសម៉ូល M) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the mole calculation formula n = m / M on the equation rail:",
      spoken_theorem_km: "អិន ស្មើនឹង អឹមតូច ចែកនឹង អឹមធំ",
      spoken_theorem_en: "n equals m over M",
      variables_pool: [
        { id: "m1", symbol: "n", name_km: "ចំនួនម៉ូល n (mol)", name_en: "Amount of substance n", unit: "Mole" },
        { id: "m2", symbol: "=", name_km: "ស្មើនឹង", name_en: "equals", unit: "Operator", category: "operator" },
        { id: "m3", symbol: "m", name_km: "ម៉ាស m (g)", name_en: "Mass m", unit: "Gram" },
        { id: "m4", symbol: "/", name_km: "ចែកនឹង", name_en: "divided by", unit: "Operator", category: "operator" },
        { id: "m5", symbol: "M", name_km: "ម៉ាសម៉ូល M (g/mol)", name_en: "Molar mass M", unit: "g/mol" },
      ],
      target_sequence_ids: ["m1", "m2", "m3", "m4", "m5"],
      formula_badge: "n = m / M",
      socratic_clue_km: "ចំនួនម៉ូលស្មើនឹងម៉ាសគិតជាក្រាម ចែកនឹងម៉ាសម៉ូល (mol = g / (g/mol))។",
      socratic_clue_en: "Amount in moles equals mass in grams divided by molar mass.",
      explanation_km: "n = m / M ជារូបមន្តគ្រឹះបំផុតក្នុងគីមីវិទ្យា MoEYS។",
      explanation_en: "n = m / M is the foundational stoichiometric mole equation.",
    },
    {
      id: `${lessonId}-mol-2`,
      type: "concept_choice",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាម៉ាសម៉ូលនៃឧស្ម័នកាបូនិច CO₂",
      stage_name_en: "Stage 2 • Compute Molar Mass of CO₂",
      prompt_km: "គណនាម៉ាសម៉ូល M នៃឧស្ម័នកាបូនិច CO₂ (ដឹងថា ម៉ាសអាតូម C = 12, O = 16) ៖",
      prompt_en: "Find molar mass M of carbon dioxide CO₂ (atomic masses C = 12, O = 16):",
      options_km: [
        "M = 44 g/mol (12 + 2 × 16 = 12 + 32 = 44 g/mol)",
        "M = 28 g/mol (12 + 16)",
        "M = 32 g/mol",
        "M = 56 g/mol",
      ],
      options_en: [
        "M = 44 g/mol (12 + 2 x 16 = 44 g/mol)",
        "M = 28 g/mol",
        "M = 32 g/mol",
        "M = 56 g/mol",
      ],
      correct_index: 0,
      scientific_analogy_km: "ម៉ូលេគុល CO₂ មួយមានអាតូមកាបូន ១ និងអុកស៊ីសែន ២ ផ្សំគ្នា៖ 12 + 32 = 44 g/mol។",
      scientific_analogy_en: "One C atom plus two O atoms gives 12 + 32 = 44 g/mol.",
      formula_badge: "M(CO₂) = 44 g/mol",
      socratic_clue_km: "M = 12 + 2(16) = 12 + 32 = 44 g/mol។",
      socratic_clue_en: "M = 12 + 2(16) = 44 g/mol.",
      explanation_km: "M(CO₂) = 12 + 2(16) = 44 g/mol។",
      explanation_en: "M(CO₂) = 12 + 2(16) = 44 g/mol.",
    },
    {
      id: `${lessonId}-mol-3`,
      type: "derivation_chain",
      stage_name_km: "ដំណាក់កាលទី៣ • សង្វាក់ ៤ ជំហានគណនាចំនួនម៉ូលពីម៉ាស",
      stage_name_en: "Stage 3 • 4-Step Moles from Mass Derivation",
      prompt_km: "មានឧស្ម័ន CO₂ ចំនួន m = 88 g។ រៀបចំ ៤ ជំហានគណនាចំនួនម៉ូល n ៖",
      prompt_en: "Given m = 88 g of CO₂ (M = 44 g/mol). Arrange 4 steps to find amount in moles n:",
      steps_km: [
        "សរសេររូបមន្តចំនួនម៉ូល ៖ n = m / M",
        "កំណត់ម៉ាសម៉ូលនៃ CO₂ ៖ M = 44 g/mol",
        "ជំនួសតម្លៃលេខ ៖ n = 88 / 44",
        "សរសេរលទ្ធផលជាមួយខ្នាត ៖ n = 2 mol",
      ],
      steps_en: [
        "State mole formula: n = m / M",
        "Identify molar mass: M = 44 g/mol",
        "Substitute numeric mass: n = 88 / 44",
        "State final value: n = 2 mol",
      ],
      correct_chain_order: [0, 1, 2, 3],
      formula_badge: "n = 88 / 44 = 2 mol",
      socratic_clue_km: "88 / 44 = 2 នាំឱ្យ n = 2 mol។",
      socratic_clue_en: "88 / 44 = 2 mol.",
      explanation_km: "n = m / M = 88 g / 44 g/mol = 2 mol។",
      explanation_en: "n = m / M = 88 / 44 = 2 mol.",
    },
    {
      id: `${lessonId}-mol-4`,
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាម៉ាសម៉ូល និងម៉ាសនៃថ្មកំបោរ CaCO₃",
      stage_name_en: "Stage 4 • Calcium Carbonate Molar Mass Calculation",
      prompt_km: "គណនាម៉ាស m នៃថ្មកំបោរ CaCO₃ ចំនួន n = 0.5 mol (ដឹងថា Ca = 40, C = 12, O = 16) ៖",
      prompt_en: "Calculate mass m of n = 0.5 mol of calcium carbonate CaCO₃ (Ca = 40, C = 12, O = 16):",
      given_values_km: [
        { label: "ម៉ាសម៉ូល CaCO₃", value: "40 + 12 + 3(16) = 100 g/mol" },
        { label: "ចំនួនម៉ូល n", value: "0.5 mol" },
      ],
      given_values_en: [
        { label: "Molar mass M", value: "40 + 12 + 48 = 100 g/mol" },
        { label: "Amount n", value: "0.5 mol" },
      ],
      options_km: [
        "m = 50 g (m = n × M = 0.5 × 100 = 50 g)",
        "m = 200 g",
        "m = 100 g",
        "m = 25 g",
      ],
      options_en: [
        "m = 50 g (m = n x M = 0.5 x 100 = 50 g)",
        "m = 200 g",
        "m = 100 g",
        "m = 25 g",
      ],
      correct_index: 0,
      formula_badge: "m = 0.5 × 100 = 50 g",
      socratic_clue_km: "M = 100 g/mol; m = 0.5 × 100 = 50 g។",
      socratic_clue_en: "M = 100 g/mol; m = 0.5 x 100 = 50 g.",
      explanation_km: "M(CaCO₃) = 40 + 12 + 48 = 100 g/mol នាំឱ្យ m = n × M = 0.5 × 100 = 50 g។",
      explanation_en: "M = 100 g/mol; m = n x M = 50 g.",
    },
  ];
}

// ==============================================================================
// 3. MASTER SCIENCE SELECTOR DISPATCHER
// ==============================================================================


// ============================================================================
// 8. GRADE 8 PHYSICS: HEAT AND THERMODYNAMICS (les-g8-phys-04)
// ============================================================================
export function getG8PhysicsHeatDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-phys-04-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តបរិមាណកម្តៅ (Q = m · c · ΔT)",
      stage_name_en: "Stage 1 • Heat Energy Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាបរិមាណកម្តៅស្រូប ឬបញ្ចេញ (Q = m · c · ΔT) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the heat energy formula (Q = m · c · ΔT):",
      spoken_theorem_km: "បរិមាណកម្តៅ គុយ ស្មើនឹង ម៉ាស អិម គុណ កម្តៅជាក់លាក់ សេ គុណ បម្រែបម្រួលសីតុណ្ហភាព ដីលតា តេ",
      spoken_theorem_en: "Heat energy Q equals mass m times specific heat capacity c times temperature change Delta T",
      variables_pool: [
        { id: "h1", symbol: "Q", name_km: "បរិមាណកម្តៅ (J)", name_en: "Heat Energy", unit: "Joules (J)" },
        { id: "h2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "h3", symbol: "m · c", name_km: "ម៉ាស × កម្តៅជាក់លាក់", name_en: "Mass × Specific Heat", unit: "Capacity" },
        { id: "h4", symbol: "·", name_km: "គុណនឹង", name_en: "Multiplied by", unit: "Operator", category: "operator" },
        { id: "h5", symbol: "ΔT", name_km: "បម្រែបម្រួលសីតុណ្ហភាព", name_en: "Temp Change", unit: "°C or K" },
      ],
      target_sequence_ids: ["h1", "h2", "h3", "h4", "h5"],
      scientific_analogy_km: "ដូចដាំទឹក៖ ទឹកកាន់តែច្រើន (m ធំ) ហើយចង់ឱ្យក្តៅខ្លាំង (ΔT ធំ) ត្រូវចំណាយភ្លើង ឬកម្តៅកាន់តែច្រើន (Q ធំ)។",
      scientific_analogy_en: "Like boiling water: more water (m) and higher temperature change (ΔT) requires more heat energy (Q).",
      socratic_clue_km: "រូបមន្តបរិមាណកម្តៅ៖ Q = m · c · ΔT (J)។",
      socratic_clue_en: "Heat energy formula: Q = m · c · ΔT.",
      explanation_km: "រូបមន្តបរិមាណកម្តៅគឺ Q = m · c · ΔT ដែល m គិតជា kg, c គិតជា J/(kg·°C) និង ΔT គិតជា °C។",
      explanation_en: "Heat absorbed or released is calculated as Q = m · c · ΔT in Joules.",
    },
    {
      id: "g8-phys-04-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាបរិមាណកម្តៅស្រូបដោយទឹក",
      stage_name_en: "Stage 2 • Water Heat Absorption Calculation",
      prompt_km: "ទឹកម៉ាស m = 2 kg ត្រូវបានដុតកម្តៅឱ្យកើនសីតុណ្ហភាព ΔT = 10°C (កម្តៅជាក់លាក់ទឹក c = 4200 J/kg·°C)។ គណនាបរិមាណកម្តៅ Q៖",
      prompt_en: "Water of mass m = 2 kg is heated by ΔT = 10°C (c = 4200 J/kg·°C). Calculate heat energy Q:",
      given_values_km: [
        { label: "ម៉ាសទឹក (m)", value: "2 kg" },
        { label: "កម្តៅជាក់លាក់ (c)", value: "4200 J/kg·°C" },
        { label: "បម្រែបម្រួលសីតុណ្ហភាព (ΔT)", value: "10°C" },
      ],
      given_values_en: [
        { label: "Water Mass (m)", value: "2 kg" },
        { label: "Specific Heat (c)", value: "4200 J/kg·°C" },
        { label: "Temp Change (ΔT)", value: "10°C" },
      ],
      options_km: [
        "Q = 84,000 J (ឬ 84 kJ)",
        "Q = 42,000 J",
        "Q = 8,400 J",
        "Q = 21,000 J",
      ],
      options_en: [
        "Q = 84,000 J (or 84 kJ)",
        "Q = 42,000 J",
        "Q = 8,400 J",
        "Q = 21,000 J",
      ],
      correct_index: 0,
      formula_badge: "Q = 2 × 4200 × 10 = 84,000 J",
      socratic_clue_km: "Q = m · c · ΔT = 2 × 4200 × 10 = 84,000 J = 84 kJ។",
      socratic_clue_en: "Q = 2 × 4200 × 10 = 84,000 Joules.",
      explanation_km: "Q = 2 kg × 4200 J/kg·°C × 10°C = 84,000 J = 84 kJ។",
      explanation_en: "Q = m · c · ΔT = 84,000 J.",
    },
    {
      id: "g8-phys-04-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាកម្តៅជាក់លាក់នៃលោហៈ (c = Q / (m·ΔT))",
      stage_name_en: "Stage 3 • Specific Heat Capacity of Metal",
      prompt_km: "ដុំដែកម៉ាស m = 0.5 kg ស្រូបកម្តៅ Q = 4,600 J ធ្វើឱ្យសីតុណ្ហភាពកើនឡើង ΔT = 20°C។ គណនាកម្តៅជាក់លាក់ c នៃដែក៖",
      prompt_en: "A 0.5 kg metal block absorbs Q = 4,600 J resulting in ΔT = 20°C. Calculate specific heat c:",
      given_values_km: [
        { label: "ម៉ាស (m)", value: "0.5 kg" },
        { label: "កម្តៅស្រូប (Q)", value: "4,600 J" },
        { label: "កំណើនសីតុណ្ហភាព (ΔT)", value: "20°C" },
      ],
      given_values_en: [
        { label: "Mass (m)", value: "0.5 kg" },
        { label: "Heat Absorbed (Q)", value: "4,600 J" },
        { label: "Temp Rise (ΔT)", value: "20°C" },
      ],
      options_km: [
        "c = 460 J/kg·°C (តាម 4600 / (0.5 × 20))",
        "c = 920 J/kg·°C",
        "c = 230 J/kg·°C",
        "c = 4,600 J/kg·°C",
      ],
      options_en: [
        "c = 460 J/kg·°C (via 4600 / (0.5 × 20))",
        "c = 920 J/kg·°C",
        "c = 230 J/kg·°C",
        "c = 4,600 J/kg·°C",
      ],
      correct_index: 0,
      formula_badge: "c = 4600 / 10 = 460 J/kg·°C",
      socratic_clue_km: "c = Q / (m · ΔT) = 4600 / (0.5 × 20) = 4600 / 10 = 460 J/kg·°C។",
      socratic_clue_en: "c = 4600 / (0.5 × 20) = 460 J/kg·°C.",
      explanation_km: "c = Q / (m · ΔT) = 4,600 / 10 = 460 J/kg·°C។",
      explanation_en: "Specific heat c = Q / (m · ΔT) = 460 J/kg·°C.",
    },
    {
      id: "g8-phys-04-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាកំណើនសីតុណ្ហភាព (ΔT = Q / (m·c))",
      stage_name_en: "Stage 4 • Temperature Increase Calculation",
      prompt_km: "ផ្តល់កម្តៅ Q = 1,800 J ទៅលើដុំអាលុយមីញ៉ូមម៉ាស m = 0.2 kg (c = 900 J/kg·°C)។ តើសីតុណ្ហភាពរបស់វាកើនឡើង ΔT ប៉ុន្មាន?",
      prompt_en: "Supplying Q = 1,800 J to 0.2 kg of aluminum (c = 900 J/kg·°C). What is temperature increase ΔT?",
      given_values_km: [
        { label: "កម្តៅផ្តល់ (Q)", value: "1,800 J" },
        { label: "ម៉ាស (m)", value: "0.2 kg" },
        { label: "កម្តៅជាក់លាក់ (c)", value: "900 J/kg·°C" },
      ],
      given_values_en: [
        { label: "Heat (Q)", value: "1,800 J" },
        { label: "Mass (m)", value: "0.2 kg" },
        { label: "Specific Heat (c)", value: "900 J/kg·°C" },
      ],
      options_km: [
        "ΔT = 10°C (តាម 1800 / (0.2 × 900))",
        "ΔT = 5°C",
        "ΔT = 20°C",
        "ΔT = 2°C",
      ],
      options_en: [
        "ΔT = 10°C (via 1800 / (0.2 × 900))",
        "ΔT = 5°C",
        "ΔT = 20°C",
        "ΔT = 2°C",
      ],
      correct_index: 0,
      formula_badge: "ΔT = 1800 / 180 = 10°C",
      socratic_clue_km: "ΔT = Q / (m · c) = 1800 / (0.2 × 900) = 1800 / 180 = 10°C។",
      socratic_clue_en: "ΔT = 1800 / (0.2 × 900) = 10°C.",
      explanation_km: "ΔT = 1,800 / 180 = 10°C។",
      explanation_en: "ΔT = Q / (m·c) = 10°C.",
    },
  ];
}

// ============================================================================
// 9. GRADE 8 PHYSICS: ELECTRIC CIRCUITS & OHMS LAW (les-g8-phys-05)
// ============================================================================
export function getG8PhysicsCircuitsDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-phys-05-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់អូម (U = R · I)",
      stage_name_en: "Stage 1 • Ohms Law Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តច្បាប់អូមសម្រាប់ខ្សែចម្លង (U = R · I) លើរនាំងសមីការ៖",
      prompt_en: "Assemble Ohms Law formula (U = R · I):",
      spoken_theorem_km: "តង់ស្យុង អ៊ុយ ស្មើនឹង រេស៊ីស្តង់ អ៊ែរ គុណ អាំងតង់ស៊ីតេចរន្ត អ៊ី",
      spoken_theorem_en: "Voltage U equals resistance R times current I",
      variables_pool: [
        { id: "e1", symbol: "U", name_km: "តង់ស្យុង (V)", name_en: "Voltage (V)", unit: "Volts" },
        { id: "e2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "e3", symbol: "R", name_km: "រេស៊ីស្តង់ (Ω)", name_en: "Resistance (Ω)", unit: "Ohms" },
        { id: "e4", symbol: "·", name_km: "គុណនឹង", name_en: "Multiplied by", unit: "Operator", category: "operator" },
        { id: "e5", symbol: "I", name_km: "អាំងតង់ស៊ីតេចរន្ត (A)", name_en: "Current (A)", unit: "Amperes" },
      ],
      target_sequence_ids: ["e1", "e2", "e3", "e4", "e5"],
      scientific_analogy_km: "ដូចលំហូរទឹកក្នុងបំពង់៖ តង់ស្យុង U ដូចសម្ពាធទឹក ចរន្ត I ដូចបរិមាណទឹកហូរ និងរេស៊ីស្តង់ R ដូចទំហំកកិតបំពង់។",
      scientific_analogy_en: "Like water pipes: Voltage is pressure, Current is flow rate, and Resistance is pipe friction.",
      socratic_clue_km: "ច្បាប់អូម៖ U = R · I (V)។",
      socratic_clue_en: "Ohms Law: U = R · I.",
      explanation_km: "តង់ស្យុងអគ្គិសនីគណនាតាមច្បាប់អូម៖ U = R · I។",
      explanation_en: "Ohms Law relates voltage, current, and resistance: U = R · I.",
    },
    {
      id: "g8-phys-05-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាតង់ស្យុងអគ្គិសនី (U = R · I)",
      stage_name_en: "Stage 2 • Voltage Calculation",
      prompt_km: "រេស៊ីស្ទ័រមួយមានរេស៊ីស្តង់ R = 12 Ω មានចរន្តឆ្លងកាត់ I = 2 A។ គណនាតង់ស្យុង U រវាងគោលទាំងពីរ៖",
      prompt_en: "A resistor has resistance R = 12 Ω and current I = 2 A. Calculate voltage U across its terminals:",
      given_values_km: [
        { label: "រេស៊ីស្តង់ (R)", value: "12 Ω" },
        { label: "ចរន្ត (I)", value: "2 A" },
      ],
      given_values_en: [
        { label: "Resistance (R)", value: "12 Ω" },
        { label: "Current (I)", value: "2 A" },
      ],
      options_km: [
        "U = 24 V (តាម 12 × 2)",
        "U = 6 V (ច្រឡំយក R / I)",
        "U = 14 V",
        "U = 10 V",
      ],
      options_en: [
        "U = 24 V (via 12 × 2)",
        "U = 6 V (confused with R / I)",
        "U = 14 V",
        "U = 10 V",
      ],
      correct_index: 0,
      formula_badge: "U = 12 × 2 = 24 V",
      socratic_clue_km: "U = R · I = 12 Ω × 2 A = 24 V។",
      socratic_clue_en: "U = 12 × 2 = 24 V.",
      explanation_km: "តង់ស្យុង U = R · I = 12 × 2 = 24 V។",
      explanation_en: "U = R · I = 12 × 2 = 24 Volts.",
    },
    {
      id: "g8-phys-05-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាអានុភាពអគ្គិសនី (P = U · I)",
      stage_name_en: "Stage 3 • Electric Power Calculation",
      prompt_km: "អំពូលភ្លើងមួយប្រើប្រាស់តង់ស្យុង U = 220 V និងមានចរន្តអគ្គិសនីឆ្លងកាត់ I = 0.5 A។ គណនាអានុភាពអគ្គិសនី P៖",
      prompt_en: "A lamp operates at voltage U = 220 V with current I = 0.5 A. Calculate electric power P:",
      given_values_km: [
        { label: "តង់ស្យុង (U)", value: "220 V" },
        { label: "ចរន្ត (I)", value: "0.5 A" },
      ],
      given_values_en: [
        { label: "Voltage (U)", value: "220 V" },
        { label: "Current (I)", value: "0.5 A" },
      ],
      options_km: [
        "P = 110 W (តាម 220 × 0.5)",
        "P = 440 W (ច្រឡំចែក 0.5)",
        "P = 220 W",
        "P = 55 W",
      ],
      options_en: [
        "P = 110 W (via 220 × 0.5)",
        "P = 440 W (confused with dividing by 0.5)",
        "P = 220 W",
        "P = 55 W",
      ],
      correct_index: 0,
      formula_badge: "P = 220 × 0.5 = 110 W",
      socratic_clue_km: "P = U · I = 220 V × 0.5 A = 110 W។",
      socratic_clue_en: "P = 220 × 0.5 = 110 W.",
      explanation_km: "អានុភាព P = U · I = 220 × 0.5 = 110 W។",
      explanation_en: "Power P = U · I = 110 Watts.",
    },
    {
      id: "g8-phys-05-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនារេស៊ីស្តង់សមមូលតជាស៊េរី (Req = R1 + R2)",
      stage_name_en: "Stage 4 • Series Resistors Calculation",
      prompt_km: "រេស៊ីស្ទ័រពីរ R₁ = 4 Ω និង R₂ = 6 Ω តជាស៊េរីភ្ជាប់នឹងប្រភព U = 20 V។ គណនាចរន្ត I ក្នុងសៀគ្វី៖",
      prompt_en: "Two resistors R₁ = 4 Ω and R₂ = 6 Ω in series are connected to U = 20 V. Find circuit current I:",
      given_values_km: [
        { label: "រេស៊ីស្តង់ R₁", value: "4 Ω" },
        { label: "រេស៊ីស្តង់ R₂", value: "6 Ω" },
        { label: "តង់ស្យុងសរុប (U)", value: "20 V" },
      ],
      given_values_en: [
        { label: "Resistor R₁", value: "4 Ω" },
        { label: "Resistor R₂", value: "6 Ω" },
        { label: "Total Voltage (U)", value: "20 V" },
      ],
      options_km: [
        "I = 2 A (តាម Req = 10 Ω, I = 20/10)",
        "I = 5 A",
        "I = 1 A",
        "I = 4 A",
      ],
      options_en: [
        "I = 2 A (via Req = 10 Ω, I = 20/10)",
        "I = 5 A",
        "I = 1 A",
        "I = 4 A",
      ],
      correct_index: 0,
      formula_badge: "Req = 10 Ω, I = 2 A",
      socratic_clue_km: "Req = 4 + 6 = 10 Ω។ ចរន្ត I = U / Req = 20 / 10 = 2 A។",
      socratic_clue_en: "Req = 4 + 6 = 10 Ω. Current I = 20 / 10 = 2 A.",
      explanation_km: "Req = 4 + 6 = 10 Ω នាំឱ្យចរន្ត I = 20 / 10 = 2 A។",
      explanation_en: "Req = 10 Ω, Current I = 20 / 10 = 2 A.",
    },
  ];
}

// ============================================================================
// 10. GRADE 8 CHEMISTRY: LAW OF CONSERVATION OF MASS (les-g8-chem-02)
// ============================================================================
export function getG8ChemistryConservationMassDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-chem-02-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគច្បាប់រក្សាម៉ាសឡាវ័រហ្ស៊ីយេ",
      stage_name_en: "Stage 1 • Law of Conservation of Mass",
      prompt_km: "ចូរផ្គុំរូបមន្តច្បាប់រក្សាម៉ាស (m_អង្គធាតុចូលប្រតិកម្ម = m_អង្គធាតុកើត)៖",
      prompt_en: "Assemble the Law of Conservation of Mass formula:",
      spoken_theorem_km: "ផលបូកម៉ាសអង្គធាតុចូលប្រតិកម្ម ស្មើនឹង ផលបូកម៉ាសអង្គធាតុកើត",
      spoken_theorem_en: "Total mass of reactants equals total mass of products",
      variables_pool: [
        { id: "m1", symbol: "m(អង្គធាតុចូល)", name_km: "ម៉ាសអង្គធាតុចូល", name_en: "Reactants Mass", unit: "Mass" },
        { id: "m2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "m3", symbol: "m(អង្គធាតុកើត)", name_km: "ម៉ាសអង្គធាតុកើត", name_en: "Products Mass", unit: "Mass" },
      ],
      target_sequence_ids: ["m1", "m2", "m3"],
      scientific_analogy_km: "ឡាវ័រហ្ស៊ីយេបានចែងថា៖ «គ្មានអ្វីបាត់បង់ គ្មានអ្វីកើតឡើងដោយឯកឯង គ្រប់យ៉ាងសុទ្ធតែបម្លែងរូប»។",
      scientific_analogy_en: "Lavoisier: Nothing is lost, nothing is created, everything is transformed.",
      socratic_clue_km: "ច្បាប់រក្សាម៉ាស៖ ម៉ាសអង្គធាតុចូល = ម៉ាសអង្គធាតុកើត។",
      socratic_clue_en: "Reactants mass = Products mass.",
      explanation_km: "ក្នុងប្រតិកម្មគីមីបិទជិត ម៉ាសសរុបនៃអង្គធាតុចូលប្រតិកម្ម តែងតែស្មើនឹងម៉ាសសរុបនៃអង្គធាតុកើត។",
      explanation_en: "Total mass remains strictly constant throughout chemical reactions.",
    },
    {
      id: "g8-chem-02-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាម៉ាសអង្គធាតុកើត (2Mg + O₂ → 2MgO)",
      stage_name_en: "Stage 2 • Mass of Product Calculation",
      prompt_km: "គេដុតម៉ាញ៉េស្យូម m(Mg) = 4.8 g ក្នុងអុកស៊ីសែន m(O₂) = 3.2 g ដោយប្រតិកម្មពេញលេញ។ គណនាម៉ាសម៉ាញ៉េស្យូមអុកស៊ីត m(MgO) កើតឡើង៖",
      prompt_en: "Burning 4.8 g of Mg in 3.2 g of O₂ completely: 2Mg + O₂ → 2MgO. Calculate mass of MgO formed:",
      given_values_km: [
        { label: "ម៉ាស Mg ចូល", value: "4.8 g" },
        { label: "ម៉ាស O₂ ចូល", value: "3.2 g" },
      ],
      given_values_en: [
        { label: "Reactant Mg", value: "4.8 g" },
        { label: "Reactant O₂", value: "3.2 g" },
      ],
      options_km: [
        "m(MgO) = 8.0 g (តាម 4.8 + 3.2)",
        "m(MgO) = 1.6 g (ច្រឡំដក)",
        "m(MgO) = 7.6 g",
        "m(MgO) = 9.6 g",
      ],
      options_en: [
        "m(MgO) = 8.0 g (via 4.8 + 3.2)",
        "m(MgO) = 1.6 g (confused with subtraction)",
        "m(MgO) = 7.6 g",
        "m(MgO) = 9.6 g",
      ],
      correct_index: 0,
      formula_badge: "m = 4.8 + 3.2 = 8.0 g",
      socratic_clue_km: "តាមច្បាប់រក្សាម៉ាស៖ m(MgO) = m(Mg) + m(O₂) = 4.8 + 3.2 = 8.0 g។",
      socratic_clue_en: "By mass conservation: m(MgO) = 4.8 + 3.2 = 8.0 g.",
      explanation_km: "m(MgO) = 4.8 g + 3.2 g = 8.0 g។",
      explanation_en: "m(MgO) = 4.8 + 3.2 = 8.0 g.",
    },
    {
      id: "g8-chem-02-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាម៉ាសឧស្ម័នភាយចេញ (បំបែកកម្តៅ CaCO₃)",
      stage_name_en: "Stage 3 • Gas Released Mass Calculation",
      prompt_km: "ដុតកម្តៅថ្មបูน CaCO₃ ចំនួន 100 g បំបែកបានកំបោររស់ CaO ចំនួន 56 g និងឧស្ម័ន CO₂។ គណនាម៉ាសឧស្ម័ន CO₂ ភាយចេញ៖",
      prompt_en: "Heating 100 g of CaCO₃ yields 56 g of CaO and CO₂ gas. Calculate mass of CO₂ gas produced:",
      given_values_km: [
        { label: "ម៉ាស CaCO₃ ចូល", value: "100 g" },
        { label: "ម៉ាស CaO កើត", value: "56 g" },
      ],
      given_values_en: [
        { label: "Reactant CaCO₃", value: "100 g" },
        { label: "Product CaO", value: "56 g" },
      ],
      options_km: [
        "m(CO₂) = 44 g (តាម 100 - 56)",
        "m(CO₂) = 56 g",
        "m(CO₂) = 156 g",
        "m(CO₂) = 22 g",
      ],
      options_en: [
        "m(CO₂) = 44 g (via 100 - 56)",
        "m(CO₂) = 56 g",
        "m(CO₂) = 156 g",
        "m(CO₂) = 22 g",
      ],
      correct_index: 0,
      formula_badge: "m(CO₂) = 100 - 56 = 44 g",
      socratic_clue_km: "m(CaCO₃) = m(CaO) + m(CO₂) នាំឱ្យ m(CO₂) = 100 - 56 = 44 g។",
      socratic_clue_en: "m(CO₂) = 100 - 56 = 44 g.",
      explanation_km: "m(CO₂) = 100 g - 56 g = 44 g។",
      explanation_en: "m(CO₂) = 100 - 56 = 44 g.",
    },
    {
      id: "g8-chem-02-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាចំនួនម៉ូលឧស្ម័ន CO₂ ភាយចេញ",
      stage_name_en: "Stage 4 • Moles of Released Gas",
      prompt_km: "ឧស្ម័នកាបូនិច CO₂ ភាយចេញមានម៉ាស m = 44 g (ម៉ាសម៉ូល M = 44 g/mol)។ គណនាចំនួនម៉ូល n នៃ CO₂៖",
      prompt_en: "CO₂ gas produced has mass m = 44 g (M = 44 g/mol). Calculate number of moles n:",
      given_values_km: [
        { label: "ម៉ាស CO₂ (m)", value: "44 g" },
        { label: "ម៉ាសម៉ូល CO₂ (M)", value: "44 g/mol" },
      ],
      given_values_en: [
        { label: "Mass (m)", value: "44 g" },
        { label: "Molar Mass (M)", value: "44 g/mol" },
      ],
      options_km: [
        "n = 1.0 mol (តាម 44 / 44)",
        "n = 2.0 mol",
        "n = 0.5 mol",
        "n = 44 mol",
      ],
      options_en: [
        "n = 1.0 mol (via 44 / 44)",
        "n = 2.0 mol",
        "n = 0.5 mol",
        "n = 44 mol",
      ],
      correct_index: 0,
      formula_badge: "n = 44 / 44 = 1.0 mol",
      socratic_clue_km: "n = m / M = 44 / 44 = 1.0 mol។",
      socratic_clue_en: "n = 44 / 44 = 1.0 mol.",
      explanation_km: "n = m / M = 44 g / 44 g/mol = 1.0 mol។",
      explanation_en: "n = m / M = 1.0 mol.",
    },
  ];
}

// ============================================================================
// 11. GRADE 8 CHEMISTRY: COMBUSTION & GAS VOLUMES (les-g8-chem-03)
// ============================================================================
export function getG8ChemistryCombustionDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-chem-03-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តមាឌឧស្ម័នលក្ខខណ្ឌធម្មតា (V = n · 22.4)",
      stage_name_en: "Stage 1 • Molar Gas Volume Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាមាឌឧស្ម័ននៅលក្ខខណ្ឌធម្មតា STP (V = n · 22.4 L)៖",
      prompt_en: "Assemble the molar gas volume formula at STP (V = n · 22.4 L):",
      spoken_theorem_km: "មាឌឧស្ម័ន វេ ស្មើនឹង ចំនួនម៉ូល អិន គុណ ម្ភៃពីរចុចបួន",
      spoken_theorem_en: "Gas volume V equals number of moles n times 22.4",
      variables_pool: [
        { id: "g1", symbol: "V", name_km: "មាឌឧស្ម័ន (L)", name_en: "Gas Volume", unit: "Liters (L)" },
        { id: "g2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "g3", symbol: "n", name_km: "ចំនួនម៉ូល (mol)", name_en: "Moles", unit: "mol" },
        { id: "g4", symbol: "·", name_km: "គុណនឹង", name_en: "Multiplied by", unit: "Operator", category: "operator" },
        { id: "g5", symbol: "22.4", name_km: "មាឌម៉ូល (L/mol)", name_en: "Molar Volume", unit: "L/mol" },
      ],
      target_sequence_ids: ["g1", "g2", "g3", "g4", "g5"],
      scientific_analogy_km: "នៅលក្ខខណ្ឌធម្មតា (0°C, 1 atm) ឧស្ម័ន 1 mol ណាក៏ដោយតែងតែមានមាឌ 22.4 L។",
      scientific_analogy_en: "At STP (0°C, 1 atm), exactly 1 mole of any ideal gas occupies 22.4 Liters.",
      socratic_clue_km: "មាឌឧស្ម័ននៅ STP៖ V = n · 22.4 L។",
      socratic_clue_en: "Gas volume at STP: V = n · 22.4 L.",
      explanation_km: "នៅលក្ខខណ្ឌធម្មតា (STP)៖ V = n × 22.4 L។",
      explanation_en: "At standard conditions (STP), 1 mole of gas occupies 22.4 L: V = n · 22.4 L.",
    },
    {
      id: "g8-chem-03-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាមាឌឧស្ម័នអុកស៊ីសែន (STP)",
      stage_name_en: "Stage 2 • Oxygen Gas Volume Calculation",
      prompt_km: "គណនាមាឌឧស្ម័នអុកស៊ីសែន O₂ ចំនួន n = 0.5 mol នៅលក្ខខណ្ឌធម្មតា (STP)៖",
      prompt_en: "Calculate the volume of n = 0.5 mol of oxygen gas O₂ at STP:",
      given_values_km: [
        { label: "ចំនួនម៉ូល (n)", value: "0.5 mol" },
        { label: "មាឌម៉ូល STP (Vm)", value: "22.4 L/mol" },
      ],
      given_values_en: [
        { label: "Moles (n)", value: "0.5 mol" },
        { label: "Molar Volume STP (Vm)", value: "22.4 L/mol" },
      ],
      options_km: [
        "V = 11.2 L (តាម 0.5 × 22.4)",
        "V = 44.8 L (ច្រឡំគុណនឹង 2)",
        "V = 22.4 L",
        "V = 5.6 L",
      ],
      options_en: [
        "V = 11.2 L (via 0.5 × 22.4)",
        "V = 44.8 L (confused with doubling)",
        "V = 22.4 L",
        "V = 5.6 L",
      ],
      correct_index: 0,
      formula_badge: "V = 0.5 × 22.4 = 11.2 L",
      socratic_clue_km: "V = n · 22.4 = 0.5 × 22.4 = 11.2 L។",
      socratic_clue_en: "V = 0.5 × 22.4 = 11.2 L.",
      explanation_km: "V = 0.5 mol × 22.4 L/mol = 11.2 L។",
      explanation_en: "V = 0.5 × 22.4 = 11.2 Liters.",
    },
    {
      id: "g8-chem-03-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • សមាមាត្រម៉ូលក្នុងប្រតិកម្មឆេះ (2H₂ + O₂ → 2H₂O)",
      stage_name_en: "Stage 3 • Stoichiometric Moles in Combustion",
      prompt_km: "ក្នុងប្រតិកម្មឆេះ 2H₂ + O₂ → 2H₂O បើគេប្រើអ៊ីដ្រូសែន n(H₂) = 4.0 mol តើត្រូវការអុកស៊ីសែន n(O₂) ប៉ុន្មានម៉ូល?",
      prompt_en: "In combustion 2H₂ + O₂ → 2H₂O, if 4.0 mol of H₂ is used, how many moles of O₂ are required?",
      given_values_km: [
        { label: "សមីការតុល្យការ", value: "2H₂ + O₂ → 2H₂O" },
        { label: "ម៉ូល H₂", value: "4.0 mol" },
      ],
      given_values_en: [
        { label: "Balanced Equation", value: "2H₂ + O₂ → 2H₂O" },
        { label: "Moles H₂", value: "4.0 mol" },
      ],
      options_km: [
        "n(O₂) = 2.0 mol (តាម 4.0 / 2)",
        "n(O₂) = 4.0 mol",
        "n(O₂) = 8.0 mol",
        "n(O₂) = 1.0 mol",
      ],
      options_en: [
        "n(O₂) = 2.0 mol (via 4.0 / 2)",
        "n(O₂) = 4.0 mol",
        "n(O₂) = 8.0 mol",
        "n(O₂) = 1.0 mol",
      ],
      correct_index: 0,
      formula_badge: "n(O₂) = 4.0 / 2 = 2.0 mol",
      socratic_clue_km: "តាមសមាមាត្រមេគុណ៖ 2 mol H₂ ត្រូវការ 1 mol O₂ ដូច្នេះ 4 mol H₂ ត្រូវការ 4 / 2 = 2.0 mol O₂។",
      socratic_clue_en: "Mole ratio H₂ : O₂ is 2 : 1. So 4.0 / 2 = 2.0 mol O₂.",
      explanation_km: "n(O₂) = n(H₂) / 2 = 4.0 / 2 = 2.0 mol។",
      explanation_en: "n(O₂) = 4.0 / 2 = 2.0 moles.",
    },
    {
      id: "g8-chem-03-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាម៉ាសទឹកកកើត (m = n · M)",
      stage_name_en: "Stage 4 • Mass of Water Formed",
      prompt_km: "ប្រតិកម្មខាងលើកកើតទឹកបាន n(H₂O) = 4.0 mol (ម៉ាសម៉ូលទឹក M = 18 g/mol)។ គណនាម៉ាសទឹក m កើតឡើង៖",
      prompt_en: "Reaction forms n(H₂O) = 4.0 mol of water (M = 18 g/mol). Calculate mass of water produced:",
      given_values_km: [
        { label: "ម៉ូលទឹក (n)", value: "4.0 mol" },
        { label: "ម៉ាសម៉ូលទឹក (M)", value: "18 g/mol" },
      ],
      given_values_en: [
        { label: "Moles (n)", value: "4.0 mol" },
        { label: "Molar Mass (M)", value: "18 g/mol" },
      ],
      options_km: [
        "m = 72 g (តាម 4.0 × 18)",
        "m = 36 g (ច្រឡំយក 2 ម៉ូល)",
        "m = 18 g",
        "m = 54 g",
      ],
      options_en: [
        "m = 72 g (via 4.0 × 18)",
        "m = 36 g (confused with 2 moles)",
        "m = 18 g",
        "m = 54 g",
      ],
      correct_index: 0,
      formula_badge: "m = 4 × 18 = 72 g",
      socratic_clue_km: "m = n · M = 4.0 mol × 18 g/mol = 72 g។",
      socratic_clue_en: "m = 4.0 × 18 = 72 grams.",
      explanation_km: "m = n · M = 4.0 × 18 = 72 g។",
      explanation_en: "Mass of water formed is 72 grams.",
    },
  ];
}

// ============================================================================
// 12. GRADE 8 CHEMISTRY: ACIDS AND BASES (les-g8-chem-05)
// ============================================================================
export function getG8ChemistryAcidBaseDeck(lessonId: string): QuizQuestionItem[] {
  return [
    {
      id: "g8-chem-05-q1",
      type: "synthesizer",
      stage_name_km: "ដំណាក់កាលទី១ • សំយោគរូបមន្តកំហាប់ម៉ូលែ (C = n / V)",
      stage_name_en: "Stage 1 • Molarity Formula Synthesizer",
      prompt_km: "ចូរផ្គុំរូបមន្តគណនាកំហាប់ជាម៉ូលនៃសូលុយស្យុង (C = n / V) លើរនាំងសមីការ៖",
      prompt_en: "Assemble the molarity concentration formula (C = n / V):",
      spoken_theorem_km: "កំហាប់ជាម៉ូល សេ ស្មើនឹង ចំនួនម៉ូល អិន ចែកនឹង មាឌសូលុយស្យុង វេ",
      spoken_theorem_en: "Molar concentration C equals number of moles n divided by solution volume V",
      variables_pool: [
        { id: "c1", symbol: "C", name_km: "កំហាប់ម៉ូលែ (M)", name_en: "Molarity", unit: "mol/L (M)" },
        { id: "c2", symbol: "=", name_km: "ស្មើនឹង", name_en: "Equals", unit: "Operator", category: "operator" },
        { id: "c3", symbol: "n", name_km: "ចំនួនម៉ូល (mol)", name_en: "Moles", unit: "Numerator" },
        { id: "c4", symbol: "/", name_km: "ចែកនឹង", name_en: "Divided by", unit: "Division", category: "operator" },
        { id: "c5", symbol: "V", name_km: "មាឌសូលុយស្យុង (L)", name_en: "Volume", unit: "Denominator" },
      ],
      target_sequence_ids: ["c1", "c2", "c3", "c4", "c5"],
      scientific_analogy_km: "ដូចឆុងទឹកស្ករ៖ ស្ករកាន់តែច្រើន (n ធំ) ក្នុងទឹកតិច (V តូច) នាំឱ្យទឹកផ្អែមខ្លាំង (កំហាប់ C ធំ)។",
      scientific_analogy_en: "Like dissolving sugar: more solute in less volume produces higher concentration.",
      socratic_clue_km: "កំហាប់ម៉ូលែ៖ C = n / V (mol/L ឬ M)។",
      socratic_clue_en: "Molarity: C = n / V.",
      explanation_km: "កំហាប់ជាម៉ូលនៃសូលុយស្យុងគឺ C = n / V ដែល n គិតជា mol និង V គិតជា L។",
      explanation_en: "Molarity is defined as moles of solute divided by liters of solution: C = n / V.",
    },
    {
      id: "g8-chem-05-q2",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី២ • គណនាចំនួនម៉ូលអាស៊ីតក្នុងសូលុយស្យុង",
      stage_name_en: "Stage 2 • Acid Moles Calculation",
      prompt_km: "សូលុយស្យុងអាស៊ីត HCl មានកំហាប់ C = 0.5 M និងមាឌ V = 200 mL (= 0.2 L)។ គណនាចំនួនម៉ូល n នៃ HCl៖",
      prompt_en: "An HCl solution has C = 0.5 M and V = 200 mL (= 0.2 L). Calculate moles n of HCl:",
      given_values_km: [
        { label: "កំហាប់ (C)", value: "0.5 M" },
        { label: "មាឌ (V)", value: "200 mL = 0.2 L" },
      ],
      given_values_en: [
        { label: "Concentration (C)", value: "0.5 M" },
        { label: "Volume (V)", value: "0.2 L" },
      ],
      options_km: [
        "n = 0.1 mol (តាម 0.5 × 0.2)",
        "n = 1.0 mol",
        "n = 0.25 mol",
        "n = 2.5 mol",
      ],
      options_en: [
        "n = 0.1 mol (via 0.5 × 0.2)",
        "n = 1.0 mol",
        "n = 0.25 mol",
        "n = 2.5 mol",
      ],
      correct_index: 0,
      formula_badge: "n = 0.5 × 0.2 = 0.1 mol",
      socratic_clue_km: "n = C · V = 0.5 M × 0.2 L = 0.1 mol។",
      socratic_clue_en: "n = 0.5 × 0.2 = 0.1 mol.",
      explanation_km: "n = C · V = 0.5 × 0.2 = 0.1 mol។",
      explanation_en: "n = C · V = 0.1 moles.",
    },
    {
      id: "g8-chem-05-q3",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៣ • គណនាកំហាប់បាសបន្សាប (CA·VA = CB·VB)",
      stage_name_en: "Stage 3 • Neutralization Titration Calculation",
      prompt_km: "បន្សាបអាស៊ីត HCl មាឌ VA = 20 mL កំហាប់ CA = 0.1 M ដោយប្រើបាស NaOH មាឌ VB = 10 mL។ គណនាកំហាប់ CB នៃបាស៖",
      prompt_en: "Neutralizing VA = 20 mL of CA = 0.1 M HCl requires VB = 10 mL of NaOH. Calculate base concentration CB:",
      given_values_km: [
        { label: "មាឌអាស៊ីត (VA)", value: "20 mL" },
        { label: "កំហាប់អាស៊ីត (CA)", value: "0.1 M" },
        { label: "មាឌបាស (VB)", value: "10 mL" },
      ],
      given_values_en: [
        { label: "Acid Volume (VA)", value: "20 mL" },
        { label: "Acid Conc (CA)", value: "0.1 M" },
        { label: "Base Volume (VB)", value: "10 mL" },
      ],
      options_km: [
        "CB = 0.2 M (តាម (0.1 × 20) / 10)",
        "CB = 0.05 M",
        "CB = 0.1 M",
        "CB = 0.5 M",
      ],
      options_en: [
        "CB = 0.2 M (via (0.1 × 20) / 10)",
        "CB = 0.05 M",
        "CB = 0.1 M",
        "CB = 0.5 M",
      ],
      correct_index: 0,
      formula_badge: "CB = (0.1 × 20) / 10 = 0.2 M",
      socratic_clue_km: "CA · VA = CB · VB នាំឱ្យ CB = (0.1 × 20) / 10 = 0.2 M។",
      socratic_clue_en: "CB = (CA · VA) / VB = (0.1 × 20) / 10 = 0.2 M.",
      explanation_km: "CB = (0.1 × 20) / 10 = 0.2 M។",
      explanation_en: "CB = (CA · VA) / VB = 0.2 M.",
    },
    {
      id: "g8-chem-05-q4",
      type: "lab_calculation",
      stage_name_km: "ដំណាក់កាលទី៤ • គណនាតម្លៃ pH និងលក្ខណៈសូលុយស្យុង",
      stage_name_en: "Stage 4 • pH Value Calculation",
      prompt_km: "សូលុយស្យុងអាស៊ីតមួយមានកំហាប់អ៊ីយ៉ុង [H⁺] = 10⁻³ M។ គណនាតម្លៃ pH នៃសូលុយស្យុង៖",
      prompt_en: "An acid solution has [H⁺] = 10⁻³ M. Calculate the pH of the solution:",
      given_values_km: [{ label: "កំហាប់អ៊ីយ៉ុង H⁺", value: "[H⁺] = 10⁻³ M" }],
      given_values_en: [{ label: "H⁺ Ion Concentration", value: "[H⁺] = 10⁻³ M" }],
      options_km: [
        "pH = 3 (សូលុយស្យុងអាស៊ីត)",
        "pH = 11 (សូលុយស្យុងបាស)",
        "pH = 7 (ណឺត)",
        "pH = -3",
      ],
      options_en: [
        "pH = 3 (Acidic solution)",
        "pH = 11 (Basic solution)",
        "pH = 7 (Neutral)",
        "pH = -3",
      ],
      correct_index: 0,
      formula_badge: "pH = -log(10⁻³) = 3",
      socratic_clue_km: "pH = -log[H⁺] = -log(10⁻³) = 3 < 7 គឺជាសូលុយស្យុងអាស៊ីត។",
      socratic_clue_en: "pH = -log(10⁻³) = 3 (acidic).",
      explanation_km: "pH = -log[H⁺] = 3 < 7 គឺជាសូលុយស្យុងអាស៊ីត។",
      explanation_en: "pH = -log[H⁺] = 3 confirms an acidic environment.",
    },
  ];
}

export function getGradeStratifiedScienceDeck(
  subjectSlug: string,
  lessonId: string,
  lesson?: CuratedLesson,
): QuizQuestionItem[] | null {
  const grade = lesson?.grade || 12;
  const id = lessonId.toLowerCase();
  const title = ((lesson?.title_km || "") + " " + (lesson?.title_en || "")).toLowerCase();

  // PHYSICS (រូបវិទ្យា)
  if (subjectSlug === "physics" || id.includes("phys")) {
    if (
      id.includes("phys-01") ||
      title.includes("សម្ពាធ") ||
      title.includes("pressure")
    ) {
      return getG8PhysicsPressureDeck(lessonId);
    }
    if (
      id.includes("phys-02") ||
      title.includes("អាកស៊ីម៉ែត") ||
      title.includes("archimede") ||
      title.includes("buoyan")
    ) {
      return getG8PhysicsArchimedesDeck(lessonId);
    }
    if (
      id.includes("phys-03") ||
      title.includes("ការងារ") ||
      title.includes("អានុភាព") ||
      title.includes("work") ||
      title.includes("power")
    ) {
      return getG8PhysicsWorkPowerDeck(lessonId);
    }
    if (
      id.includes("phys-04") ||
      title.includes("កម្តៅ") ||
      title.includes("ទែរម៉ូ") ||
      title.includes("heat") ||
      title.includes("thermo")
    ) {
      return getG8PhysicsHeatDeck(lessonId);
    }
    if (
      id.includes("phys-05") ||
      title.includes("អគ្គិសនី") ||
      title.includes("សៀគ្វី") ||
      title.includes("electric") ||
      title.includes("circuit")
    ) {
      return getG8PhysicsCircuitsDeck(lessonId);
    }
    // Default physics fallback for G8: pressure
    return getG8PhysicsPressureDeck(lessonId);
  }

  // CHEMISTRY (គីមីវិទ្យា)
  if (subjectSlug === "chemistry" || id.includes("chem")) {
    if (grade === 12 || id.includes("g12-chem")) {
      return getG12ChemistryDeck(lessonId);
    }
    if (
      id.includes("chem-01") ||
      title.includes("អាតូម") ||
      title.includes("ម៉ូលេគុល")
    ) {
      return getG8ChemistryMolarMassDeck(lessonId);
    }
    if (
      id.includes("chem-02") ||
      title.includes("រក្សាម៉ាស") ||
      title.includes("conservation") ||
      title.includes("សមីការគីមី")
    ) {
      return getG8ChemistryConservationMassDeck(lessonId);
    }
    if (
      id.includes("chem-03") ||
      title.includes("អុកស៊ីសែន") ||
      title.includes("ឆេះ") ||
      title.includes("combustion")
    ) {
      return getG8ChemistryCombustionDeck(lessonId);
    }
    if (
      id.includes("chem-05") ||
      title.includes("អាស៊ីត") ||
      title.includes("បាស") ||
      title.includes("ph") ||
      title.includes("acid")
    ) {
      return getG8ChemistryAcidBaseDeck(lessonId);
    }
    return getG8ChemistryMolarMassDeck(lessonId);
  }

  // BIOLOGY (ជីវវិទ្យា)
  if (subjectSlug === "biology" || id.includes("bio")) {
    if (grade === 12 || id.includes("g12-bio")) return getG12BiologyDeck(lessonId);
    if (grade === 10 || id.includes("g10-bio")) return getG10CellBiologyDeck(lessonId);
    return getG10CellBiologyDeck(lessonId);
  }

  return null;
}
