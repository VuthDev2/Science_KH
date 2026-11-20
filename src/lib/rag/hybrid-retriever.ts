// ==============================================================================
// ScienceKH — Hybrid Educational Retriever (Semantic + Keyword + RRF)
// Grounded MoEYS Curriculum Knowledge Retrieval with Strict Grade/Subject Filtering
// ==============================================================================

import type {
  KnowledgeChunk,
  RetrievedContext,
  SourceCitation,
  StudentLearningContext,
} from "@/types/rag-tutor";
import { getUnifiedKnowledgeBase } from "./knowledge-base";

// Mathematical & scientific symbol regex detector
const SCIENTIFIC_SYMBOL_REGEX = /[\u0370-\u03FF\u1F00-\u1FFF\u2200-\u22FF\u2A00-\u2AFF=+\-/*^_√πΔΩλωρθα]/g;

// Common Khmer and English stop words in education questions that shouldn't distort ranking
const STOP_WORDS = new Set([
  // Khmer
  "តើ", "អ្វី", "ជា", "គឺជា", "ដូចម្តេច", "សូម", "ជួយ", "ប្រាប់",
  "ពន្យល់", "ខ្ញុំ", "ផង", "ចង់", "ដឹង", "អំពី", "នៃ", "ក្នុង", "និង",
  "ឬ", "ដែល", "មាន", "បាន", "ដោយ", "យ៉ាងណា", "ហេតុអ្វី", "របៀប",
  // English
  "what", "is", "are", "was", "were", "the", "a", "an", "in", "on",
  "of", "for", "to", "and", "or", "how", "why", "where", "can", "you",
  "tell", "me", "about", "please", "help", "explain", "define", "give", "study"
]);

export function detectQuerySubject(query: string): string | null {
  const q = query.toLowerCase();
  if (/\b(math|mathematics|algebra|geometry|calculus)\b/i.test(q) || /(គណិតវិទ្យា|គណិត|ពីជគណិត|ធរណីមាត្រ)/.test(q)) return "mathematics";
  if (/\b(physics|speed|velocity|newton|ohm|force|acceleration)\b/i.test(q) || /(រូបវិទ្យា|រូប|កម្លាំង|ល្បឿន|ញូតុន|អូម)/.test(q)) return "physics";
  if (/\b(chem|chemistry|reaction|mole|acid|base|atom)\b/i.test(q) || /(គីមីវិទ្យា|គីមី|អាស៊ីត|បាស|ម៉ូល|អាតូម)/.test(q)) return "chemistry";
  if (/\b(bio|biology|cell|dna|mitosis|meiosis|organ)\b/i.test(q) || /(ជីវវិទ្យា|ជីវ|កោសិកា|ហ្សែន|មីតូស)/.test(q)) return "biology";
  if (/\b(earth|geology|rock|climate|environment)\b/i.test(q) || /(ផែនដី|បរិស្ថាន|ភូមិសាស្ត្រ|ស្រទាប់)/.test(q)) return "earth";
  if (/\b(khmer|literature|grammar)\b/i.test(q) || /(អក្សរសាស្ត្រ|ភាសាខ្មែរ|វេយ្យាករណ៍|តែងសេចក្តី)/.test(q)) return "khmer";
  if (/\b(history|angkor|king|war|period)\b/i.test(q) || /(ប្រវត្តិវិទ្យា|ប្រវត្តិ|អង្គរ|សម័យ|ព្រះបាទ)/.test(q)) return "history";
  if (/\b(geography|map|river|climate)\b/i.test(q) || /(ភូមិវិទ្យា|ភូមិ|ផែនទី|ទន្លេ|អាកាសធាតុ)/.test(q)) return "geography";
  if (/\b(ict|computer|programming|coding|algorithm)\b/i.test(q) || /(ព័ត៌មានវិទ្យា|កុំព្យូទ័រ|កម្មវិធី)/.test(q)) return "ict";
  return null;
}

/**
 * Normalizes queries and extracts key search tokens for Khmer and English
 */
export function extractSearchTokens(query: string): {
  normalized: string;
  keywords: string[];
  symbols: string[];
  formulas: string[];
} {
  const normalized = query.trim().toLowerCase();

  // Extract scientific symbols
  const foundSymbols = Array.from(new Set(query.match(SCIENTIFIC_SYMBOL_REGEX) || []));

  // Extract candidate formulas (e.g., v=s/t, U=RI, F=ma, n=m/M)
  const formulaRegex = /[a-zA-Z\u0370-\u03FF]+\s*=\s*[a-zA-Z0-9\u0370-\u03FF/*+^_\-()\\.]+/g;
  const foundFormulas = Array.from(new Set(query.match(formulaRegex) || []));

  // Split keywords by whitespace and punctuation
  const rawWords = normalized
    .replace(/[?,.:;!'"()[\]{}]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  // Khmer compound educational keyword detector (handles unspaced Khmer text)
  const khmerVocab = [
    "គណិតវិទ្យា", "គណិត", "រូបវិទ្យា", "រូប", "គីមីវិទ្យា", "គីមី",
    "ជីវវិទ្យា", "ជីវ", "ផែនដីវិទ្យា", "ផែនដី", "ប្រវត្តិវិទ្យា", "ប្រវត្តិ",
    "ព័ត៌មានវិទ្យា", "អក្សរសាស្ត្រ", "ភាសាខ្មែរ", "ល្បឿន", "ចម្ងាយ",
    "កម្លាំង", "ម៉ាស", "មាឌ", "អាតូម", "ម៉ូលេគុល", "កោសិកា", "សមីការ",
    "រូបមន្ត", "ខ្នាត", "ច្បាប់", "ទ្រឹស្តីបទ", "ពីតាករ", "ដេរីវេ", "អាំងតេក្រាល"
  ];
  for (const kv of khmerVocab) {
    if (normalized.includes(kv)) {
      rawWords.push(kv);
    }
  }

  return {
    normalized,
    keywords: Array.from(new Set(rawWords)),
    symbols: foundSymbols,
    formulas: foundFormulas,
  };
}

/**
 * Executes Hybrid Retrieval across verified ScienceKH educational knowledge sources
 */
export async function retrieveCurriculumKnowledge(
  query: string,
  context: StudentLearningContext,
  limit = 4
): Promise<RetrievedContext> {
  const knowledgeBase = getUnifiedKnowledgeBase();
  const { normalized, keywords, symbols, formulas } = extractSearchTokens(query);

  if (keywords.length === 0 && symbols.length === 0 && formulas.length === 0) {
    return {
      chunks: [],
      citations: [],
      highestRelevance: 0,
      matchedCategories: [],
    };
  }

  const scoredChunks: Array<{
    chunk: KnowledgeChunk;
    keywordScore: number;
    semanticScore: number;
    combinedScore: number;
  }> = [];

  for (const chunk of knowledgeBase) {
    // 1. STRICT GRADE FILTERING
    // - Allow exact grade match
    // - Allow prerequisite knowledge (chunk.grade < context.grade)
    // - FORBID upper-secondary content leaking to lower-secondary students
    if (context.grade) {
      if (context.grade <= 9 && chunk.grade > 9) {
        // Do not leak Bac II / Upper Secondary concepts into Grade 7–9 Brevet!
        continue;
      }
      if (chunk.grade > context.grade + 1) {
        // Limit to current grade or immediate step
        continue;
      }
    }

    // 2. SUBJECT FILTERING & QUERY INTENT MATCHING
    const detectedSubject = detectQuerySubject(query);
    const targetSubject = detectedSubject || context.subjectSlug;

    let subjectBoost = 1.0;
    if (targetSubject && targetSubject !== "all") {
      if (chunk.subjectSlug === targetSubject) {
        subjectBoost = detectedSubject ? 2.5 : 1.5;
      } else {
        // Penalty for mismatched subject
        subjectBoost = 0.3;
      }
    }

    // High-priority boost for Discipline Overview chunks when asking "What is math/physics/etc."
    let overviewBoost = 1.0;
    const isSubjectOverviewQuery =
      keywords.some((k) =>
        ["math", "mathematics", "physics", "chemistry", "biology", "science", "គណិត", "រូប", "គីមី", "ជីវ"].includes(k)
      ) &&
      (keywords.length <= 3 ||
        query.toLowerCase().includes("what is") ||
        query.includes("ជាអ្វី") ||
        query.includes("និយមន័យ"));

    if (chunk.metadata?.isDisciplineOverview) {
      if (isSubjectOverviewQuery && chunk.subjectSlug === targetSubject) {
        overviewBoost = 6.0; // Strongly prioritize official MoEYS subject overview
      } else {
        overviewBoost = 0.2;
      }
    }

    // 3. GRADE AFFINITY BOOST
    let gradeBoost = 1.0;
    if (context.grade) {
      if (chunk.grade === context.grade) {
        gradeBoost = 1.4; // Prioritize student's current grade
      } else if (chunk.grade < context.grade) {
        gradeBoost = 0.9; // Foundational prerequisite
      }
    }

    // 4. KEYWORD & EXACT SYMBOL MATCHING
    let keywordScore = 0;
    const chunkHeading = (chunk.sectionHeading || "").toLowerCase();
    const chunkContent = chunk.content.toLowerCase();
    const chunkTerms = chunk.keyTerms.map((t) => t.toLowerCase());

    // Check exact formula matches
    for (const f of formulas) {
      const cleanF = f.replace(/\s+/g, "");
      if (chunk.formulas.some((cf) => cf.replace(/\s+/g, "").includes(cleanF))) {
        keywordScore += 15.0;
      }
    }

    // Check exact scientific symbol matches
    for (const s of symbols) {
      if (chunk.symbols.includes(s)) {
        keywordScore += 8.0;
      }
    }

    // Check keyword hits
    for (const word of keywords) {
      if (chunkHeading.includes(word)) {
        keywordScore += 5.0;
      }
      if (chunkTerms.some((t) => t.includes(word))) {
        keywordScore += 4.0;
      }
      if (chunkContent.includes(word)) {
        keywordScore += 1.5;
      }
    }

    // 5. SEMANTIC RELEVANCE PROXIMITY
    // Word overlap ratio across content
    let matchedTokenCount = 0;
    for (const word of keywords) {
      if (chunkContent.includes(word) || chunkHeading.includes(word)) {
        matchedTokenCount++;
      }
    }
    const semanticScore = keywords.length > 0 ? (matchedTokenCount / keywords.length) * 10.0 : 0;

    // Apply grade, subject & intent overview boosts
    const finalScore = (keywordScore * 0.6 + semanticScore * 0.4) * subjectBoost * gradeBoost * overviewBoost;

    if (finalScore > 1.5) {
      scoredChunks.push({
        chunk,
        keywordScore,
        semanticScore,
        combinedScore: finalScore,
      });
    }
  }

  // Sort by combined hybrid score descending
  scoredChunks.sort((a, b) => b.combinedScore - a.combinedScore);

  const topMatches = scoredChunks.slice(0, limit);

  // Build verified source citations
  const citations: SourceCitation[] = topMatches.map(({ chunk, combinedScore }) => {
    const meta = chunk.metadata || {};
    const isPrerequisite = context.grade && chunk.grade < context.grade;

    // Extract a 140-char clean snippet for transparency
    const cleanSnippet = chunk.content
      .replace(/[#*`$]/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 160)
      .trim() + "...";

    return {
      id: chunk.id,
      documentTitle: isPrerequisite
        ? `${chunk.sourceTitle} (មូលដ្ឋានគ្រឹះថ្នាក់ទី ${chunk.grade})`
        : chunk.sourceTitle,
      grade: chunk.grade,
      subjectSlug: chunk.subjectSlug,
      chapterOrLesson: (meta.chapterKm as string) || chunk.sectionHeading,
      pageNumber: chunk.sourcePage,
      organization: (meta.organization as string) || "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
      url: (meta.officialUrl as string) || (meta.salaUrl as string),
      isOfficial: chunk.verificationStatus === "verified",
      verificationStatus: chunk.verificationStatus,
      relevanceSnippet: cleanSnippet,
    };
  });

  const categories = Array.from(new Set(topMatches.map((m) => m.chunk.sourceType)));
  const highestScore = topMatches.length > 0 ? topMatches[0].combinedScore : 0;

  return {
    chunks: topMatches.map((m) => ({
      ...m.chunk,
      relevanceScore: Math.min(Math.round((m.combinedScore / 20) * 100), 100),
    })),
    citations,
    highestRelevance: highestScore,
    matchedCategories: categories,
  };
}
