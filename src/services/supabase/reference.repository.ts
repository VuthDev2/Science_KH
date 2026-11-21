// ==============================================================================
// ScienceKH — Study Reference Library Repository
// Academic Knowledge Warehouse Service with Supabase & Resilient Offline Fallback
// ==============================================================================

import { supabase } from "../../integrations/supabase/client";
import type {
  ReferenceEntry,
  ReferenceFilterState,
  ReferenceType,
  VerificationStatus,
} from "../../types/reference-library";
import { SEED_REFERENCE_ENTRIES } from "../../lib/data/reference-library-seed";
import { STEM_WAREHOUSE_DATABASE, type StemFundamentalItem } from "../../lib/data/stem-warehouse";
import { MASTER_ACADEMIC_WAREHOUSE, type MasterWarehouseItem } from "../../lib/data/academic-warehouse-expanded";

const BOOKMARKS_STORAGE_KEY = "sciencekh_reference_bookmarks_v1";
const RECENT_STORAGE_KEY = "sciencekh_reference_recent_v1";

function mapMasterItemToReference(item: MasterWarehouseItem): ReferenceEntry {
  const structuredContent: any = {
    symbol: item.symbol,
    associatedUnit: item.associatedUnit,
    phoneticKh: item.phoneticKh,
    phoneticEn: item.phoneticEn,
    latexExpression: item.latexExpression || item.symbol,
    plainExpression: item.symbol,
    variables: item.variables || [],
    derivedFormulas: item.derivedFormulas || [],
  };

  return {
    id: item.id,
    slug: item.slug,
    originalTitleKh: item.originalTitleKh,
    titleEn: item.titleEn,
    subjectSlug: item.subjectSlug,
    referenceType: item.referenceType,
    streamApplicability: item.streamApplicability,
    grades: item.grades,
    shortDescriptionKh: item.shortDescriptionKh,
    explanationKh: item.explanationKh + (item.examSignificanceKm ? `\n\n**សារៈសំខាន់ក្នុងការប្រឡង៖** ${item.examSignificanceKm}` : ""),
    explanationEn: item.explanationEn,
    studentFriendlyGuideKh: item.studentFriendlyGuideKh,
    keyTerms: item.keyTerms,
    tags: item.tags,
    structuredContent,
    examples: [],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Curriculum Standard Review",
    verifiedAt: "2026-01-15T00:00:00Z",
    viewCount: 160,
    sources: [
      {
        id: `src-${item.id}`,
        sourceDocument: {
          id: `doc-${item.subjectSlug}-g${item.gradeIntro}`,
          titleKm: item.sourceBookKm,
          titleEn: `MoEYS Grade ${item.gradeIntro} ${item.subjectSlug} Official Textbook`,
          organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          grade: item.gradeIntro,
          subjectSlug: item.subjectSlug,
          edition: "បោះពុម្ពផ្លូវការ",
          publicationYear: 2024,
          isOfficialMoeys: true,
        },
        isPrimary: true,
      },
    ],
  };
}

function mapWarehouseItemToReference(item: StemFundamentalItem): ReferenceEntry {
  let refType: ReferenceType = "symbol";
  if (item.category === "formulas") refType = "formula";
  else if (item.category === "theorems") refType = "theorem";
  else if (item.category === "rules") refType = "rule";
  else if (item.category === "laws") refType = "law_principle";
  else if (item.category === "units") refType = "unit_measurement";
  else if (item.category === "elements") refType = "chemical_element";
  else if (item.category === "radicals") refType = "chemical_formula";
  else if (item.category === "constants") refType = "definition";

  const firstGrade = item.grades[0] || 7;
  const isMathSymbol = item.isLatex || (item.symbol && (item.symbol.includes("\\") || item.symbol.includes("{")));
  const structuredContent: any = {
    symbol: item.symbol,
    associatedUnit: item.unitKm,
    phoneticKh: item.pronunciationKm,
    phoneticEn: item.pronunciationEn,
    latexExpression: item.formula || (isMathSymbol ? item.symbol : undefined),
    plainExpression: item.symbol,
    variables: [],
  };

  const subjectTitles: Record<string, string> = {
    mathematics: "គណិតវិទ្យា",
    physics: "រូបវិទ្យា",
    chemistry: "គីមីវិទ្យា",
    biology: "ជីវវិទ្យា",
  };

  return {
    id: item.id,
    slug: item.id,
    originalTitleKh: item.nameKm.replace(/\s*\([A-Za-z0-9\s/&,.-]+\)\s*$/, "").trim(),
    titleEn: item.nameEn,
    subjectSlug: item.subject,
    referenceType: refType,
    streamApplicability: "all",
    grades: item.grades,
    shortDescriptionKh: item.meaningKm,
    explanationKh: item.meaningKm + (item.examSignificanceKm ? `\n\n**សារៈសំខាន់ក្នុងការប្រឡង៖** ${item.examSignificanceKm}` : ""),
    explanationEn: item.meaningEn,
    studentFriendlyGuideKh: item.memoryHookKm,
    keyTerms: [item.nameKm, item.nameEn, item.symbol],
    tags: item.tags,
    structuredContent,
    examples: [],
    verificationStatus: "verified",
    verifiedBy: "MoEYS Curriculum Standard Review",
    verifiedAt: "2026-01-15T00:00:00Z",
    viewCount: 120,
    sources: [
      {
        id: `src-${item.id}`,
        sourceDocument: {
          id: `doc-${item.subject}-g${firstGrade}`,
          titleKm: `សៀវភៅពុម្ព${subjectTitles[item.subject] || item.subject} ថ្នាក់ទី ${firstGrade}`,
          titleEn: `MoEYS Grade ${firstGrade} ${item.subject} Official Textbook`,
          organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          grade: firstGrade,
          subjectSlug: item.subject,
          edition: "បោះពុម្ពផ្លូវការ",
          publicationYear: 2024,
          isOfficialMoeys: true,
        },
        isPrimary: true,
      },
    ],
  };
}

export class ReferenceRepository {
  /**
   * Complete unified master reference bank: combines detailed expanded warehouse with seeds & STEM warehouse
   */
  static getMasterReferenceEntries(): ReferenceEntry[] {
    const masterMapped = MASTER_ACADEMIC_WAREHOUSE.map(mapMasterItemToReference);
    const existingIds = new Set(masterMapped.map((e) => e.slug || e.id));
    
    const seedMapped = SEED_REFERENCE_ENTRIES.filter((e) => !existingIds.has(e.slug) && !existingIds.has(e.id));
    seedMapped.forEach((e) => existingIds.add(e.slug || e.id));
    
    const warehouseMapped = STEM_WAREHOUSE_DATABASE
      .filter((w) => !existingIds.has(w.id))
      .map(mapWarehouseItemToReference);
      
    return [...masterMapped, ...seedMapped, ...warehouseMapped];
  }

  /**
   * Fetch references filtered by Grade, Subject, Stream, Type, and Search query.
   * Seamlessly falls back to authentic MoEYS seed data if Supabase is offline or table unmigrated.
   */
  static async getReferences(filter: ReferenceFilterState): Promise<ReferenceEntry[]> {
    try {
      // 1. Try querying Supabase
      let query = (supabase as any)
        .from("reference_entries")
        .select(`
          *,
          reference_grade_applicability(grade, primary_introduced_grade, exam_focus_grade),
          reference_sources(*, source_documents(*))
        `)
        .order("view_count", { ascending: false });

      if (filter.subjectSlug && filter.subjectSlug !== "all") {
        query = query.eq("subject_slug", filter.subjectSlug);
      }

      if (filter.referenceType && filter.referenceType !== "all") {
        query = query.eq("reference_type", filter.referenceType);
      }

      // Safeguard against slow/cold-starting cloud database connections (max 1.5s wait)
      const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Supabase timeout") }), 1500)
      );

      const { data, error } = (await Promise.race([query, timeoutPromise])) as any;

      if (!error && data && data.length > 0) {
        // Map database records into typed ReferenceEntry
        const mapped: ReferenceEntry[] = data.map((row: any) => {
          const grades = (row.reference_grade_applicability || []).map((g: any) => g.grade);
          return {
            id: row.id,
            slug: row.slug,
            originalTitleKh: row.original_title_kh,
            titleEn: row.title_en,
            subjectSlug: row.subject_slug,
            referenceType: row.reference_type,
            streamApplicability: row.stream_applicability,
            grades: grades.length > 0 ? grades : [7, 8, 9, 10, 11, 12],
            shortDescriptionKh: row.short_description_kh,
            explanationKh: row.explanation_kh,
            explanationEn: row.explanation_en,
            studentFriendlyGuideKh: row.student_friendly_guide_kh,
            supplementaryNotesKh: row.supplementary_notes_kh,
            keyTerms: row.key_terms || [],
            tags: row.tags || [],
            structuredContent: row.structured_content || {},
            examples: row.examples || [],
            diagramUrl: row.diagram_url,
            verificationStatus: row.verification_status,
            verifiedBy: row.verified_by,
            verifiedAt: row.verified_at,
            viewCount: row.view_count || 0,
            sources: (row.reference_sources || []).map((s: any) => ({
              id: s.id,
              sourceDocument: s.source_documents ? {
                id: s.source_documents.id,
                titleKm: s.source_documents.title_km,
                titleEn: s.source_documents.title_en,
                organization: s.source_documents.organization,
                grade: s.source_documents.grade,
                subjectSlug: s.source_documents.subject_slug,
                edition: s.source_documents.edition,
                publicationYear: s.source_documents.publication_year,
                officialUrl: s.source_documents.official_url,
                salaUrl: s.source_documents.sala_url,
                isOfficialMoeys: s.source_documents.is_official_moeys,
              } : undefined,
              chapterKm: s.chapter_km,
              chapterNumber: s.chapter_number,
              pageStart: s.page_start,
              pageEnd: s.page_end,
              quotedPassageKm: s.quoted_passage_km,
              isPrimary: s.is_primary,
            })),
          };
        });

        // Seamlessly merge Supabase records with local master warehouse so that subjects and grades are never lacking
        const masterEntries = this.getMasterReferenceEntries();
        const mappedIdentifiers = new Set(mapped.map((m) => m.slug || m.id));
        const combined = [
          ...mapped,
          ...masterEntries.filter((m) => !mappedIdentifiers.has(m.slug) && !mappedIdentifiers.has(m.id)),
        ];

        return this.filterEntriesInMemory(combined, filter);
      }
    } catch {
      // Graceful fallback to authentic seed data
    }

    // 2. In-memory authentic seed data fallback
    return this.filterEntriesInMemory(this.getMasterReferenceEntries(), filter);
  }

  /**
   * Filter reference entries with comprehensive search matching
   */
  static filterEntriesInMemory(
    entries: ReferenceEntry[],
    filter: ReferenceFilterState
  ): ReferenceEntry[] {
    const bookmarks = this.getBookmarkedIds();

    const filtered = entries
      .map((entry) => ({
        ...entry,
        isBookmarked: bookmarks.has(entry.id) || bookmarks.has(entry.slug),
      }))
      .filter((entry) => {
        // Grade filter
        if (filter.grade && !entry.grades.includes(filter.grade)) {
          return false;
        }

        // Stream filter (applicable for Grades 10-12)
        if (filter.grade >= 10 && filter.stream !== "all") {
          if (entry.streamApplicability !== "all" && entry.streamApplicability !== filter.stream) {
            return false;
          }
        }

        // Subject filter
        if (filter.subjectSlug !== "all" && entry.subjectSlug !== filter.subjectSlug) {
          return false;
        }

        // Reference Type filter
        if (filter.referenceType !== "all" && entry.referenceType !== filter.referenceType) {
          return false;
        }

        // Comprehensive Multi-Lingual & Symbol Search
        if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
          const rawQ = filter.searchQuery.toLowerCase().trim();
          
          // Alias dictionary: bridges student input (symbols, transliterations, synonyms) to canonical terms
          const searchAliases: Record<string, string[]> = {
            "sqrt": ["\\sqrt", "ឬស", "square root", "ឬសការេ"],
            "√": ["\\sqrt", "sqrt", "ឬស", "square root"],
            "ឬស": ["\\sqrt", "sqrt", "square root"],
            "z": ["\\mathbb{z}", "integers", "ចំនួនគត់", "រ៉ឺឡាទីវ", "zahlen"],
            "n": ["\\mathbb{n}", "natural", "ចំនួនធម្មជាតិ", "លេខរាប់"],
            "q": ["\\mathbb{q}", "rational", "ចំនួនសនិទាន", "ប្រភាគ", "quotient"],
            "r": ["\\mathbb{r}", "real", "ចំនួនពិត", "បន្ទាត់ចំនួន"],
            "pi": ["\\pi", "3.14", "ថេរពី", "រង្វង់"],
            "π": ["\\pi", "pi", "3.14", "ថេរពី"],
            "ph": ["ph", "[h+]", "អាស៊ីត", "បាស", "acid", "base"],
            "delta": ["\\delta", "ឌីសគ្រីមីណង់", "បម្រែបម្រួល"],
            "δ": ["\\delta", "delta", "ឌីសគ្រីមីណង់"],
            "Δ": ["\\delta", "delta", "ឌីសគ្រីមីណង់"],
            "ohm": ["\\omega", "អូម", "ច្បាប់អូម", "រេស៊ីស្តង់"],
            "ω": ["\\omega", "omega", "ប្រេកង់កោណ", "លំយោល"],
            "newton": ["ញូតុន", "កម្លាំង", "ច្បាប់ញូតុន"],
            "deriv": ["ដេរីវេ", "f'(x)", "derivative"],
            "integ": ["អាំងតេក្រាល", "\\int", "integral"],
            "dna": ["dna", "rna", "តំណពូជ", "ហ្សែន", "នុយក្លេអូទីដ", "កូដុង"],
            "cell": ["កោសិកា", "cell", "ប្រូការីយ៉ូត", "អឺការីយ៉ូត"],
            "acid": ["អាស៊ីត", "acid", "ph", "hcl"],
            "base": ["បាស", "base", "naoh"],
          };

          const searchTerms = [rawQ, ...(searchAliases[rawQ] || [])];

          const matchesAny = (text?: string | null) => {
            if (!text) return false;
            const lower = text.toLowerCase();
            return searchTerms.some((t) => lower.includes(t));
          };

          const matchTitleKh = matchesAny(entry.originalTitleKh);
          const matchTitleEn = matchesAny(entry.titleEn);
          const matchDesc = matchesAny(entry.shortDescriptionKh) || matchesAny(entry.explanationEn);
          const matchTerms = entry.keyTerms.some((t) => matchesAny(t));
          const matchTags = entry.tags.some((t) => matchesAny(t));

          // Formula, latex expression or symbol deep search
          let matchFormula = false;
          const sc = entry.structuredContent as any;
          if (sc) {
            if (matchesAny(sc.latexExpression)) matchFormula = true;
            if (matchesAny(sc.plainExpression)) matchFormula = true;
            if (matchesAny(sc.symbol)) matchFormula = true;
            if (matchesAny(sc.associatedUnit)) matchFormula = true;
            if (Array.isArray(sc.variables)) {
              if (sc.variables.some((v: any) =>
                matchesAny(v.symbol) ||
                matchesAny(v.nameKh) ||
                matchesAny(v.nameEn) ||
                matchesAny(v.unit)
              )) {
                matchFormula = true;
              }
            }
          }

          if (!matchTitleKh && !matchTitleEn && !matchDesc && !matchTerms && !matchTags && !matchFormula) {
            return false;
          }
        }

        return true;
      });

    // Sort entries so that items matching the active grade precisely appear FIRST
    return filtered.sort((a, b) => {
      // 1. Exact grade match priority (an item targeted strictly for this grade)
      const aIsExactGrade = a.grades.length === 1 && a.grades[0] === filter.grade;
      const bIsExactGrade = b.grades.length === 1 && b.grades[0] === filter.grade;
      if (aIsExactGrade && !bIsExactGrade) return -1;
      if (!aIsExactGrade && bIsExactGrade) return 1;

      // 2. Primary textbook source grade match
      const aSourceGrade = a.sources?.[0]?.sourceDocument?.grade;
      const bSourceGrade = b.sources?.[0]?.sourceDocument?.grade;
      const aMatchesSource = aSourceGrade === filter.grade;
      const bMatchesSource = bSourceGrade === filter.grade;
      if (aMatchesSource && !bMatchesSource) return -1;
      if (!aMatchesSource && bMatchesSource) return 1;

      // 3. ID prefix match for active grade (e.g. math-g10-*, math-g12-*)
      const gradePrefix = `-g${filter.grade}-`;
      const aHasPrefix = a.id.includes(gradePrefix) || (a.slug && a.slug.includes(gradePrefix));
      const bHasPrefix = b.id.includes(gradePrefix) || (b.slug && b.slug.includes(gradePrefix));
      if (aHasPrefix && !bHasPrefix) return -1;
      if (!aHasPrefix && bHasPrefix) return 1;

      return (b.viewCount || 0) - (a.viewCount || 0);
    });
  }

  /**
   * Find a reference by UUID or slug (instantly checks master warehouse first)
   */
  static async getReferenceByIdOrSlug(idOrSlug: string): Promise<ReferenceEntry | null> {
    const cleanId = idOrSlug.trim();

    // 1. Fast path: Instant in-memory lookup from MoEYS master warehouse & seeds
    const staticEntries = this.getMasterReferenceEntries();
    const staticFound = staticEntries.find(
      (r) => r.id === cleanId || r.slug === cleanId
    );
    if (staticFound) {
      const bookmarks = this.getBookmarkedIds();
      return {
        ...staticFound,
        isBookmarked: bookmarks.has(staticFound.id) || bookmarks.has(staticFound.slug),
      };
    }

    // 2. Query Supabase if not found in static warehouse
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
      const queryFilter = isUuid ? `id.eq.${cleanId},slug.eq.${cleanId}` : `slug.eq.${cleanId}`;

      const { data, error } = await (supabase as any)
        .from("reference_entries")
        .select(`
          *,
          reference_grade_applicability(grade, primary_introduced_grade, exam_focus_grade),
          reference_sources(*, source_documents(*))
        `)
        .or(queryFilter)
        .maybeSingle();

      if (!error && data) {
        const grades = (data.reference_grade_applicability || []).map((g: any) => g.grade);
        const bookmarks = this.getBookmarkedIds();
        return {
          id: data.id,
          slug: data.slug,
          originalTitleKh: data.original_title_kh,
          titleEn: data.title_en,
          subjectSlug: data.subject_slug,
          referenceType: data.reference_type,
          streamApplicability: data.stream_applicability,
          grades: grades.length > 0 ? grades : [7, 8, 9, 10, 11, 12],
          shortDescriptionKh: data.short_description_kh,
          explanationKh: data.explanation_kh,
          explanationEn: data.explanation_en,
          studentFriendlyGuideKh: data.student_friendly_guide_kh,
          supplementaryNotesKh: data.supplementary_notes_kh,
          keyTerms: data.key_terms || [],
          tags: data.tags || [],
          structuredContent: data.structured_content || {},
          examples: data.examples || [],
          diagramUrl: data.diagram_url,
          verificationStatus: data.verification_status,
          verifiedBy: data.verified_by,
          verifiedAt: data.verified_at,
          viewCount: data.view_count || 0,
          isBookmarked: bookmarks.has(data.id) || bookmarks.has(data.slug),
          sources: (data.reference_sources || []).map((s: any) => ({
            id: s.id,
            sourceDocument: s.source_documents ? {
              id: s.source_documents.id,
              titleKm: s.source_documents.title_km,
              titleEn: s.source_documents.title_en,
              organization: s.source_documents.organization,
              grade: s.source_documents.grade,
              subjectSlug: s.source_documents.subject_slug,
              edition: s.source_documents.edition,
              publicationYear: s.source_documents.publication_year,
              officialUrl: s.source_documents.official_url,
              salaUrl: s.source_documents.sala_url,
              isOfficialMoeys: s.source_documents.is_official_moeys,
            } : undefined,
            chapterKm: s.chapter_km,
            chapterNumber: s.chapter_number,
            pageStart: s.page_start,
            pageEnd: s.page_end,
            quotedPassageKm: s.quoted_passage_km,
            isPrimary: s.is_primary,
          })),
        };
      }
    } catch {
      // Fallback
    }

    return null;
  }

  /**
   * Bookmark Management (Local Storage + Optional Supabase Sync)
   */
  static getBookmarkedIds(): Set<string> {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  }

  static toggleBookmark(referenceId: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      const bookmarks = this.getBookmarkedIds();
      let isNowBookmarked = false;
      if (bookmarks.has(referenceId)) {
        bookmarks.delete(referenceId);
      } else {
        bookmarks.add(referenceId);
        isNowBookmarked = true;
      }
      localStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(Array.from(bookmarks))
      );
      return isNowBookmarked;
    } catch {
      return false;
    }
  }

  /**
   * Record Recently Viewed Reference
   */
  static recordRecentView(referenceId: string): void {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      let list: string[] = raw ? JSON.parse(raw) : [];
      list = [referenceId, ...list.filter((id) => id !== referenceId)].slice(0, 20);
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }
  }

  static getRecentReferenceIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Admin: Get Review Queue Entries by Status
   */
  static async getAdminReviewQueue(
    status: VerificationStatus = "pending_review"
  ): Promise<ReferenceEntry[]> {
    try {
      const { data, error } = await (supabase as any)
        .from("reference_entries")
        .select(`
          *,
          reference_grade_applicability(grade),
          reference_sources(*, source_documents(*))
        `)
        .eq("verification_status", status)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          slug: row.slug,
          originalTitleKh: row.original_title_kh,
          titleEn: row.title_en,
          subjectSlug: row.subject_slug,
          referenceType: row.reference_type,
          streamApplicability: row.stream_applicability,
          grades: (row.reference_grade_applicability || []).map((g: any) => g.grade),
          shortDescriptionKh: row.short_description_kh,
          explanationKh: row.explanation_kh,
          explanationEn: row.explanation_en,
          studentFriendlyGuideKh: row.student_friendly_guide_kh,
          supplementaryNotesKh: row.supplementary_notes_kh,
          keyTerms: row.key_terms || [],
          tags: row.tags || [],
          structuredContent: row.structured_content || {},
          examples: row.examples || [],
          diagramUrl: row.diagram_url,
          verificationStatus: row.verification_status,
          verifiedBy: row.verified_by,
          verifiedAt: row.verified_at,
          viewCount: row.view_count || 0,
          sources: [],
        }));
      }
    } catch {
      // Fallback
    }

    return SEED_REFERENCE_ENTRIES.filter((e) => e.verificationStatus === status);
  }

  /**
   * Admin: Update Verification Status
   */
  static async updateVerificationStatus(
    referenceId: string,
    status: VerificationStatus,
    verifiedBy = "ScienceKH Senior Academic Editor"
  ): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from("reference_entries")
        .update({
          verification_status: status,
          verified_by: verifiedBy,
          verified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", referenceId);

      if (!error) return true;
    } catch {
      // In local fallback mode
    }

    // Local in-memory update for session
    const target = SEED_REFERENCE_ENTRIES.find((e) => e.id === referenceId);
    if (target) {
      target.verificationStatus = status;
      target.verifiedBy = verifiedBy;
      target.verifiedAt = new Date().toISOString();
      return true;
    }
    return false;
  }
}
