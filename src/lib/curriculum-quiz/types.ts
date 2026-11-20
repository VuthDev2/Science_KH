// ==============================================================================
// ScienceKH — Interactive Curriculum Quiz & Lab Types
// ==============================================================================

export type QuestionType =
  | "synthesizer"
  | "concept_choice"
  | "derivation_chain"
  | "lab_calculation";

export type QuantumVariable = {
  id: string;
  symbol: string;
  name_en: string;
  name_km: string;
  unit: string;
  category?: "variable" | "operator" | "constant";
};

export type BaseQuestion = {
  id: string;
  type: QuestionType;
  stage_name_km: string;
  stage_name_en: string;
  prompt_km: string;
  prompt_en: string;
  socratic_clue_km?: string;
  socratic_clue_en?: string;
  formula_badge?: string;
  explanation_km: string;
  explanation_en: string;
};

export type SynthesizerQuestion = BaseQuestion & {
  type: "synthesizer";
  spoken_theorem_km: string;
  spoken_theorem_en: string;
  variables_pool: QuantumVariable[];
  target_sequence_ids: string[];
};

export type ConceptChoiceQuestion = BaseQuestion & {
  type: "concept_choice";
  options_km: string[];
  options_en: string[];
  correct_index: number;
  scientific_analogy_km?: string;
  scientific_analogy_en?: string;
};

export type DerivationChainQuestion = BaseQuestion & {
  type: "derivation_chain";
  steps_km: string[];
  steps_en: string[];
  correct_chain_order: number[];
};

export type LabCalculationQuestion = BaseQuestion & {
  type: "lab_calculation";
  given_values_km?: { label: string; value: string }[];
  given_values_en?: { label: string; value: string }[];
  options_km: string[];
  options_en: string[];
  correct_index: number;
};

export type QuizQuestionItem =
  | SynthesizerQuestion
  | ConceptChoiceQuestion
  | DerivationChainQuestion
  | LabCalculationQuestion;
