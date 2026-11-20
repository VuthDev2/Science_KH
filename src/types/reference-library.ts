// ==============================================================================
// ScienceKH — Study Reference Library (Academic Knowledge Warehouse) Types
// MoEYS National Curriculum Framework for Grades 7 to 12
// ==============================================================================

export type ReferenceType =
  | "formula"
  | "symbol"
  | "definition"
  | "rule"
  | "law_principle"
  | "theorem"
  | "unit_measurement"
  | "chemical_element"
  | "chemical_formula"
  | "equation"
  | "diagram"
  | "table"
  | "vocabulary"
  | "historical_event"
  | "date_timeline"
  | "grammar_rule"
  | "concept"
  | "procedure"
  | "classification"
  | "other";

export type VerificationStatus =
  | "draft"
  | "pending_review"
  | "verified"
  | "needs_correction"
  | "archived";

export type StreamApplicability = "all" | "science" | "social_science";

// ------------------------------------------------------------------------------
// Type-Specific Structured Content Schemas
// ------------------------------------------------------------------------------

export interface FormulaVariable {
  symbol: string;
  nameKh: string;
  nameEn?: string;
  unit?: string;
  description?: string;
}

export interface DerivedFormula {
  formula: string;
  meaningKh: string;
}

export interface FormulaContent {
  latexExpression: string;
  plainExpression: string;
  applicableConditions?: string;
  variables: FormulaVariable[];
  derivedFormulas?: DerivedFormula[];
}

export interface SymbolContent {
  symbol: string;
  phoneticKh?: string;
  phoneticEn?: string;
  associatedUnit?: string;
  subjectContext?: string;
  usageRules?: string;
}

export interface DefinitionContent {
  termKh: string;
  termEn?: string;
  chemicalEquation?: string;
  organelle?: string;
  reactants?: string[];
  products?: string[];
  attributes?: Array<{ label: string; value: string }>;
}

export interface ChemicalElementContent {
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  valency: string;
  group: number | string;
  period: number;
  electronConfig?: string;
  stateAtRoomTemp?: string;
  standardPotential?: string;
}

export interface HistoricalEventContent {
  eventDate: string;
  dateDisplayKh: string;
  historicalPeriod?: string;
  keyFigures?: string[];
  significanceKh: string;
  causes?: string[];
  consequences?: string[];
}

export interface GrammarRuleContent {
  ruleStatementKh: string;
  comparisonEn?: string;
  components?: Array<{ position: number; element: string; example: string }>;
  patternFormula?: string;
}

export interface ConceptContent {
  fundamentalRule?: string;
  unitsTable?: Array<{ unit: string; equivalent: string; meaningKh: string }>;
  corePrincipleKh?: string;
}

export interface ReferenceExample {
  problemKh?: string;
  solutionKh?: string;
  correctExample?: string;
  explanation?: string;
}

export interface SourceDocument {
  id: string;
  titleKm: string;
  titleEn: string;
  organization: string;
  grade?: number;
  subjectSlug?: string;
  edition: string;
  publicationYear: number;
  officialUrl?: string;
  salaUrl?: string;
  isOfficialMoeys: boolean;
}

export interface ReferenceSource {
  id: string;
  sourceDocument?: SourceDocument;
  chapterKm?: string;
  chapterNumber?: number;
  pageStart?: number;
  pageEnd?: number;
  quotedPassageKm?: string;
  externalUrl?: string;
  isPrimary: boolean;
}

export interface ReferenceEntry {
  id: string;
  slug: string;
  originalTitleKh: string;
  titleEn: string;
  subjectSlug: string;
  referenceType: ReferenceType;
  streamApplicability: StreamApplicability;
  grades: number[]; // e.g. [7], [7, 8], [9, 10, 11, 12]
  shortDescriptionKh: string;
  explanationKh: string;
  explanationEn?: string;
  studentFriendlyGuideKh?: string; // ScienceKH pedagogical easy-to-digest guide
  supplementaryNotesKh?: string;   // Context beyond official syllabus
  keyTerms: string[];
  tags: string[];
  structuredContent: FormulaContent | SymbolContent | DefinitionContent | ChemicalElementContent | HistoricalEventContent | GrammarRuleContent | ConceptContent | Record<string, unknown>;
  examples: ReferenceExample[];
  diagramUrl?: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  viewCount: number;
  sources: ReferenceSource[];
  isBookmarked?: boolean;
}

// ------------------------------------------------------------------------------
// Filter Configuration & Meta
// ------------------------------------------------------------------------------

export interface ReferenceFilterState {
  grade: number; // 7 to 12
  stream: StreamApplicability;
  subjectSlug: string | "all";
  referenceType: ReferenceType | "all";
  searchQuery: string;
}

export const REFERENCE_TYPE_LABELS: Record<
  ReferenceType,
  { labelKm: string; labelEn: string; emoji: string; badgeColor: string }
> = {
  formula: { labelKm: "រូបមន្ត", labelEn: "Formula", emoji: "📐", badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200" },
  symbol: { labelKm: "និមិត្តសញ្ញា", labelEn: "Symbol", emoji: "🔣", badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200" },
  definition: { labelKm: "និយមន័យ", labelEn: "Definition", emoji: "📖", badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200" },
  rule: { labelKm: "វិធាន", labelEn: "Rule", emoji: "📜", badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200" },
  law_principle: { labelKm: "គោលការណ៍ / ច្បាប់", labelEn: "Law or Principle", emoji: "⚖️", badgeColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200" },
  theorem: { labelKm: "ទ្រឹស្តីបទ", labelEn: "Theorem", emoji: "🔺", badgeColor: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200" },
  unit_measurement: { labelKm: "ខ្នាតរង្វាស់រង្វាល់", labelEn: "Unit of Measurement", emoji: "📏", badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200" },
  chemical_element: { labelKm: "ធាតុគីមី", labelEn: "Chemical Element", emoji: "⚛️", badgeColor: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200" },
  chemical_formula: { labelKm: "រូបមន្តគីមី", labelEn: "Chemical Formula", emoji: "🧪", badgeColor: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200" },
  equation: { labelKm: "សមីការ", labelEn: "Equation", emoji: "➗", badgeColor: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200" },
  diagram: { labelKm: "ដ្យាក្រាម", labelEn: "Diagram", emoji: "📊", badgeColor: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 border-orange-200" },
  table: { labelKm: "តារាងទិន្នន័យ", labelEn: "Table", emoji: "📋", badgeColor: "bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300 border-lime-200" },
  vocabulary: { labelKm: "វាក្យសព្ទគន្លឹះ", labelEn: "Vocabulary", emoji: "🔤", badgeColor: "bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300 border-yellow-200" },
  historical_event: { labelKm: "ព្រឹត្តិការណ៍ប្រវត្តិសាស្ត្រ", labelEn: "Historical Event", emoji: "🏛️", badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border-amber-300" },
  date_timeline: { labelKm: "កាលប្បវត្តិ / បន្ទាត់ពេល", labelEn: "Date or Timeline", emoji: "⏳", badgeColor: "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-200" },
  grammar_rule: { labelKm: "វិធានវេយ្យាករណ៍", labelEn: "Grammar Rule", emoji: "✍️", badgeColor: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-300" },
  concept: { labelKm: "សញ្ញាណគន្លឹះ", labelEn: "Key Concept", emoji: "💡", badgeColor: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200" },
  procedure: { labelKm: "នីតិវិធី / វិធីសាស្ត្រ", labelEn: "Procedure", emoji: "🪜", badgeColor: "bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 border-blue-300" },
  classification: { labelKm: "ចំណាត់ថ្នាក់", labelEn: "Classification", emoji: "🗂️", badgeColor: "bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border-pink-200" },
  other: { labelKm: "ឯកសារយោងផ្សេងៗ", labelEn: "Other Reference", emoji: "📌", badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200" },
};
