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
// 3. MASTER SCIENCE SELECTOR DISPATCHER
// ==============================================================================

export function getGradeStratifiedScienceDeck(
  subjectSlug: string,
  lessonId: string,
  lesson?: CuratedLesson,
): QuizQuestionItem[] | null {
  const grade = lesson?.grade || 12;

  if (subjectSlug === "biology") {
    if (grade === 12) return getG12BiologyDeck(lessonId);
    if (grade === 10) return getG10CellBiologyDeck(lessonId);
  }

  if (subjectSlug === "chemistry") {
    if (grade === 12) return getG12ChemistryDeck(lessonId);
  }

  return null;
}
