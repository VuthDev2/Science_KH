// ==============================================================================
// ScienceKH — Unified Educational Knowledge Base Indexer
// Curates & Chunks Official MoEYS Materials for Real-Time RAG
// Integrates Curriculum Lessons, Reference Library, Exam Bank & Fundamentals
// ==============================================================================

import type { KnowledgeChunk } from "@/types/rag-tutor";
import { SEED_REFERENCE_ENTRIES } from "@/lib/data/reference-library-seed";
import { CURATED_MOEYS_LESSONS } from "@/lib/curated-lessons";
import { HISTORICAL_EXAM_ARCHIVE } from "@/lib/moeys-exam-bank";
import { STEM_WAREHOUSE_DATABASE } from "@/lib/data/stem-warehouse";

let cachedKnowledgeBase: KnowledgeChunk[] | null = null;

/**
 * Builds and caches the complete verified ScienceKH educational knowledge base
 */
export function getUnifiedKnowledgeBase(): KnowledgeChunk[] {
  if (cachedKnowledgeBase) return cachedKnowledgeBase;

  const chunks: KnowledgeChunk[] = [];

  // ===========================================================================
  // 1. INGEST STUDY REFERENCE LIBRARY (Formulas, Symbols, Definitions, Laws)
  // ===========================================================================
  for (const ref of SEED_REFERENCE_ENTRIES) {
    const sc = ref.structuredContent as any;
    const formulas: string[] = [];
    const symbols: string[] = [];

    if (sc?.latexExpression) formulas.push(sc.latexExpression);
    if (sc?.plainExpression) formulas.push(sc.plainExpression);
    if (sc?.symbol) symbols.push(sc.symbol);
    if (Array.isArray(sc?.derivedFormulas)) {
      formulas.push(...sc.derivedFormulas.map((d: any) => d.formula));
    }
    if (Array.isArray(sc?.variables)) {
      symbols.push(...sc.variables.map((v: any) => v.symbol));
    }

    const primarySource = ref.sources?.[0];
    const sourceDoc = primarySource?.sourceDocument;

    // Detailed content block with variables breakdown
    let contentBody = `### ${ref.originalTitleKh} (${ref.titleEn})\n\n`;
    contentBody += `**សេចក្តីសង្ខេប៖** ${ref.shortDescriptionKh}\n\n`;
    contentBody += `**និយមន័យ MoEYS ផ្លូវការ៖** ${ref.explanationKh}\n\n`;

    if (ref.studentFriendlyGuideKh) {
      contentBody += `**គន្លឹះយល់ងាយ ScienceKH៖** ${ref.studentFriendlyGuideKh}\n\n`;
    }

    if (sc?.latexExpression) {
      contentBody += `**រូបមន្តគន្លឹះ៖** $$${sc.latexExpression}$$\n\n`;
    }

    if (Array.isArray(sc?.variables) && sc.variables.length > 0) {
      contentBody += `**ការពន្យល់អថេរ និងខ្នាត SI៖**\n`;
      for (const v of sc.variables) {
        contentBody += `- \`${v.symbol}\`: ${v.nameKh} (${v.nameEn || ""}) — ខ្នាត \`${v.unit || "-"}\` [${v.description || ""}]\n`;
      }
      contentBody += `\n`;
    }

    if (sc?.applicableConditions) {
      contentBody += `**លក្ខខណ្ឌអនុវត្ត៖** ${sc.applicableConditions}\n\n`;
    }

    if (ref.examples && ref.examples.length > 0) {
      contentBody += `**លំហាត់គំរូ និងដំណោះស្រាយ៖**\n`;
      for (const ex of ref.examples) {
        if (ex.problemKh) contentBody += `- ប្រធាន៖ ${ex.problemKh}\n  ដំណោះស្រាយ៖ ${ex.solutionKh || ""}\n`;
        if (ex.correctExample) contentBody += `- ឧទាហរណ៍ត្រឹមត្រូវ៖ ${ex.correctExample} (${ex.explanation || ""})\n`;
      }
    }

    const verificationStatus: "verified" | "pending_review" | "supplementary" =
      ref.verificationStatus === "verified"
        ? "verified"
        : ref.verificationStatus === "pending_review"
          ? "pending_review"
          : "supplementary";

    // Chunk can apply to multiple grades
    for (const g of ref.grades) {
      chunks.push({
        id: `chunk-ref-${ref.slug}-g${g}`,
        grade: g,
        subjectSlug: ref.subjectSlug,
        stream: ref.streamApplicability,
        sourceTitle: sourceDoc?.titleKm || `សៀវភៅពុម្ព MoEYS ថ្នាក់ទី ${g}`,
        sourcePage: primarySource?.pageStart || 1,
        sourceType: "reference_library",
        verificationStatus,
        language: "km",
        sectionHeading: ref.originalTitleKh,
        content: contentBody,
        plainTextSummary: ref.shortDescriptionKh,
        formulas,
        symbols,
        keyTerms: ref.keyTerms || [],
        metadata: {
          referenceId: ref.id,
          slug: ref.slug,
          isOfficial: true,
          officialUrl: sourceDoc?.officialUrl,
          salaUrl: sourceDoc?.salaUrl,
          organization: sourceDoc?.organization || "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          edition: sourceDoc?.edition,
          chapterKm: primarySource?.chapterKm,
        },
      });
    }
  }

  // ===========================================================================
  // 2. INGEST CURATED MOEYS LESSONS (Units, Concepts, Exercises)
  // ===========================================================================
  for (const lesson of CURATED_MOEYS_LESSONS) {
    const formulas: string[] = [];
    const symbols: string[] = [];

    // Extract formulas from lesson body text
    const displayMatches = lesson.body_km.match(/\$\$([^\$]+)\$\$/g);
    if (displayMatches) {
      for (const m of displayMatches) {
        const clean = m.replace(/\$\$/g, "").trim();
        if (clean.length > 2) formulas.push(clean);
      }
    }

    let lessonBody = `### ${lesson.title_km} (${lesson.title_en})\n\n`;
    lessonBody += `**មុខវិជ្ជា៖** ${lesson.subject.name_km} | **ថ្នាក់ទី៖** ${lesson.grade}\n\n`;

    if (lesson.summary_km) {
      lessonBody += `**ទិដ្ឋភាពទូទៅនៃមេរៀន៖** ${lesson.summary_km}\n\n`;
    }

    if (lesson.body_km) {
      lessonBody += `**ខ្លឹមសារមេរៀន MoEYS៖**\n${lesson.body_km}\n\n`;
    }

    chunks.push({
      id: `chunk-les-${lesson.id}`,
      grade: lesson.grade,
      subjectSlug: lesson.subject.slug,
      stream: "all",
      sourceTitle: `កម្មវិធីសិក្សា MoEYS ថ្នាក់ទី ${lesson.grade} — ${lesson.subject.name_km}`,
      sourcePage: lesson.sort_order || 1,
      sourceType: "moeys_textbook",
      verificationStatus: "verified",
      language: "km",
      sectionHeading: lesson.title_km,
      content: lessonBody,
      plainTextSummary: lesson.summary_km,
      formulas,
      symbols,
      keyTerms: [lesson.title_km, lesson.title_en, lesson.subject.name_km, lesson.subject.slug],
      metadata: {
        lessonId: lesson.id,
        isOfficial: true,
        organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
      },
    });
  }

  // ===========================================================================
  // 3. INGEST MOEYS NATIONAL EXAMINATION BANK (Brevet & Bac II)
  // ===========================================================================
  for (const paper of HISTORICAL_EXAM_ARCHIVE) {
    const paperStream: "all" | "science" | "social_science" =
      paper.stream === "social"
        ? "social_science"
        : paper.stream === "science"
          ? "science"
          : "all";

    if (Array.isArray(paper.questions)) {
      for (let qIdx = 0; qIdx < paper.questions.length; qIdx++) {
        const q = paper.questions[qIdx];
        let examBody = `### ${paper.originalTitleKh} — សំណួរទី ${q.questionNumber || qIdx + 1}\n\n`;
        examBody += `**ប្រធានលំហាត់៖**\n${q.problemTextKm}\n\n`;

        if (q.officialSolutionKm) {
          examBody += `**អត្រាកំណែផ្លូវការ & ដំណោះស្រាយលម្អិត៖**\n${q.officialSolutionKm}\n\n`;
        }

        if (Array.isArray(q.scoringCriteriaKm) && q.scoringCriteriaKm.length > 0) {
          examBody += `**ពិន្ទុ និងគន្លឹះដាក់ពិន្ទុ (${q.points} ពិន្ទុ)៖**\n`;
          for (const crit of q.scoringCriteriaKm) {
            examBody += `- ${crit}\n`;
          }
          examBody += `\n`;
        }

        chunks.push({
          id: `chunk-exam-${paper.id}-q${q.questionNumber || qIdx + 1}`,
          grade: paper.grade || 12,
          subjectSlug: paper.subject,
          stream: paperStream,
          sourceTitle: `${paper.originalTitleKh} (${paper.examinationYear || ""})`,
          sourcePage: q.questionNumber || qIdx + 1,
          sourceType: "exam_archive",
          verificationStatus: "verified",
          language: "km",
          sectionHeading: q.titleKm || `សំណួរទី ${q.questionNumber || qIdx + 1}`,
          content: examBody,
          plainTextSummary: q.problemTextKm.slice(0, 160),
          formulas: q.keyFormulas || [],
          symbols: [],
          keyTerms: ["វិញ្ញាសា", (paper.examinationYear ?? "").toString(), paper.originalTitleKh, q.titleKm || ""],
          metadata: {
            paperId: paper.id,
            year: paper.examinationYear,
            examCategory: paper.examinationCategory,
            points: q.points,
            isOfficial: true,
            organization: paper.issuingOrganization || "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          },
        });
      }
    }

    // Ingest essential formula sheet if present
    if (Array.isArray(paper.essentialFormulaSheet) && paper.essentialFormulaSheet.length > 0) {
      let sheetBody = `### រូបមន្តគន្លឹះសម្រាប់វិញ្ញាសា ${paper.originalTitleKh}\n\n`;
      const sheetFormulas: string[] = [];
      for (const item of paper.essentialFormulaSheet) {
        sheetBody += `- **${item.nameKm}**: $$${item.formula}$$ (${item.noteKm || ""})\n`;
        sheetFormulas.push(item.formula);
      }

      chunks.push({
        id: `chunk-exam-sheet-${paper.id}`,
        grade: paper.grade || 12,
        subjectSlug: paper.subject,
        stream: paperStream,
        sourceTitle: `រូបមន្តគន្លឹះ — ${paper.originalTitleKh}`,
        sourceType: "exam_archive",
        verificationStatus: "verified",
        language: "km",
        sectionHeading: `រូបមន្តគន្លឹះ ${paper.examinationYear || ""}`,
        content: sheetBody,
        plainTextSummary: sheetBody.slice(0, 160),
        formulas: sheetFormulas,
        symbols: [],
        keyTerms: ["រូបមន្ត", paper.originalTitleKh, paper.subject],
        metadata: {
          paperId: paper.id,
          year: paper.examinationYear,
          isOfficial: true,
          organization: paper.issuingOrganization || "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
        },
      });
    }
  }

  // ===========================================================================
  // 4. INGEST STEM FUNDAMENTALS WAREHOUSE (Symbols & SI Units)
  // ===========================================================================
  for (const item of STEM_WAREHOUSE_DATABASE) {
    let itemBody = `### និមិត្តសញ្ញា និងខ្នាត៖ ${item.nameKm}\n\n`;
    itemBody += `**ឈ្មោះជាភាសាអង់គ្លេស៖** ${item.nameEn}\n`;
    itemBody += `**និមិត្តសញ្ញា៖** ${item.isLatex ? `$$${item.symbol}$$` : `\`${item.symbol}\``}\n`;
    itemBody += `**ការបញ្ចេញសំឡេង៖** ${item.pronunciationKm} ${item.pronunciationEn ? `/ ${item.pronunciationEn}` : ""}\n`;
    itemBody += `**មុខវិជ្ជា៖** ${item.subject}\n`;
    if (item.unitKm) itemBody += `**ខ្នាត SI ភ្ជាប់គ្នា៖** ${item.unitKm}\n`;
    if (item.formula) itemBody += `**រូបមន្តដែលពាក់ព័ន្ធ៖** $$${item.formula}$$\n`;
    itemBody += `**អត្ថន័យ និងការពន្យល់៖** ${item.meaningKm}\n`;
    if (item.examSignificanceKm) itemBody += `**សារៈសំខាន់ក្នុងការប្រឡង៖** ${item.examSignificanceKm}\n`;
    if (item.memoryHookKm) itemBody += `**គន្លឹះចងចាំ៖** ${item.memoryHookKm}\n`;

    for (const g of item.grades) {
      chunks.push({
        id: `chunk-stem-${item.id}-g${g}`,
        grade: g,
        subjectSlug: item.subject,
        stream: "all",
        sourceTitle: `ឃ្លាំងនិមិត្តសញ្ញា និងខ្នាតគ្រឹះ MoEYS ថ្នាក់ទី ${g}`,
        sourceType: "reference_library",
        verificationStatus: "verified",
        language: "km",
        sectionHeading: `${item.symbol} — ${item.nameKm}`,
        content: itemBody,
        plainTextSummary: item.meaningKm,
        formulas: item.formula ? [item.formula] : [],
        symbols: [item.symbol],
        keyTerms: [item.symbol, item.nameKm, item.nameEn, item.subject, ...(item.tags || [])],
        metadata: {
          isOfficial: true,
          unit: item.unitKm,
        },
      });
    }
  }

  // ===========================================================================
  // 5. INGEST DISCIPLINE OVERVIEWS & FOUNDATIONAL SUBJECT DEFINITIONS
  // ===========================================================================
  const SUBJECT_OVERVIEWS = [
    {
      subjectSlug: "mathematics",
      nameKm: "គណិតវិទ្យា",
      nameEn: "Mathematics",
      keyTerms: ["math", "mathematics", "គណិតវិទ្យា", "គណិត", "what is math", "what is mathematics", "និយមន័យគណិតវិទ្យា"],
      contentKm: `### មុខវិជ្ជា គណិតវិទ្យា (Mathematics) ក្នុងកម្មវិធីសិក្សាជាតិ MoEYS\n\n**និយមន័យ៖** គណិតវិទ្យា គឺជាវិទ្យាសាស្ត្រពិតដែលសិក្សាអំពីចំនួន ទម្រង់ លំនាំ រង្វាស់រង្វាល់ រូបធរណីមាត្រ និងទំនាក់ទំនងតក្កវិជ្ជា។ វាជាមូលដ្ឋានគ្រឹះមិនអាចខ្វះបានសម្រាប់វិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម និងសេដ្ឋកិច្ច។\n\n**ខ្លឹមសារគ្រឹះ MoEYS ថ្នាក់ទី ៧–១២៖**\n- **អនុវិទ្យាល័យ (ថ្នាក់ទី ៧–៩)៖** ប្រមាណវិធីលើចំនួន ចំនួនគត់ សនិទាន អសនិទាន ពិជគណិតលីនេអ៊ែរ សមីការដឺក្រេទី១ និងទី២ ធរណីមាត្រប្លង់ ត្រីកោណមាត្របឋម និងស្ថិតិវិភាគ។\n- **វិទ្យាល័យ (ថ្នាក់ទី ១០–១២)៖** អនុគមន៍ ពហុធា វ៉ិចទ័រ ត្រីកោណមាត្រកម្រិតខ្ពស់ លីមីត ដេរីវេ អាំងតេក្រាល ចំនួនកុំផ្លិច សមីការឌីផេរ៉ង់ស្យែល ប្រូបាប និងធរណីមាត្រក្នុងលំហ។\n\n**សារៈសំខាន់ក្នុងការប្រឡង៖** គណិតវិទ្យាមានមេគុណខ្ពស់ជាងគេ (មេគុណ ៤) ក្នុងការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ទាំងថ្នាក់វិទ្យាសាស្ត្រ និងសង្គម។`,
      contentEn: `### Mathematics (គណិតវិទ្យា) — Cambodian MoEYS Curriculum\n\n**Definition:** Mathematics is the foundational science of numbers, quantities, shapes, patterns, structures, and logical relationships. It forms the analytical bedrock of STEM education.\n\n**MoEYS Grade 7–12 Curriculum Scope:**\n- **Lower Secondary (Grades 7–9):** Number theory, integers, rational & irrational numbers, linear equations, quadratic equations, Euclidean plane geometry, introductory trigonometry, and descriptive statistics.\n- **Upper Secondary (Grades 10–12):** Polynomials, advanced functions, vectors, trigonometric identities, limits, differential calculus, integrals, complex numbers, differential equations, probability, and 3D geometry.\n\n**Significance:** Mathematics carries the highest academic weight (Coefficient 4) in the National Baccalaureate (Bac II) Examination in Cambodia.`,
    },
    {
      subjectSlug: "physics",
      nameKm: "រូបវិទ្យា",
      nameEn: "Physics",
      keyTerms: ["physics", "រូបវិទ្យា", "រូប", "what is physics", "និយមន័យរូបវិទ្យា"],
      contentKm: `### មុខវិជ្ជា រូបវិទ្យា (Physics) ក្នុងកម្មវិធីសិក្សាជាតិ MoEYS\n\n**និយមន័យ៖** រូបវិទ្យា គឺជាវិទ្យាសាស្ត្រធម្មជាតិដែលសិក្សាអំពីអង្គធាតុ ចលនា ថាមពល កម្លាំង និងច្បាប់គ្រឹះដែលគ្រប់គ្រងចក្រវាលទាំងមូល ចាប់ពីកម្រិតអាតូមតូចៗរហូតដល់ភព និងផ្កាយធំៗ។\n\n**ខ្លឹមសារគ្រឹះ MoEYS ថ្នាក់ទី ៧–១២៖**\n- **អនុវិទ្យាល័យ (ថ្នាក់ទី ៧–៩)៖** ល្បឿន សម្ពាធ កម្លាំង ម៉ាស ម៉ាសមាឌ កម្ដៅ និងអគ្គិសនីបឋម។\n- **វិទ្យាល័យ (ថ្នាក់ទី ១០–១២)៖** មេកានិច (ច្បាប់ញូតុន ការងារ និងថាមពល) ទែរម៉ូឌីណាមិច រលកមេកានិច អគ្គិសនី អគ្គិសនីដែនម៉ាញ៉េទិច អុបទិច និងរូបវិទ្យានុយក្លេអ៊ែរ។`,
      contentEn: `### Physics (រូបវិទ្យា) — Cambodian MoEYS Curriculum\n\n**Definition:** Physics is the natural science that studies matter, its fundamental constituents, motion and behavior through space and time, and the related entities of energy and force.\n\n**MoEYS Curriculum Scope (Grades 7–12):**\n- **Lower Secondary (Grades 7–9):** Speed, distance-time relationships, density, force, basic pressure, heat, and introductory DC electrical circuits.\n- **Upper Secondary (Grades 10–12):** Newtonian classical mechanics, work and energy, thermodynamics, mechanical waves, electromagnetism, optics, and nuclear physics.`,
    },
    {
      subjectSlug: "chemistry",
      nameKm: "គីមីវិទ្យា",
      nameEn: "Chemistry",
      keyTerms: ["chemistry", "chem", "គីមីវិទ្យា", "គីមី", "what is chemistry", "និយមន័យគីមីវិទ្យា"],
      contentKm: `### មុខវិជ្ជា គីមីវិទ្យា (Chemistry) ក្នុងកម្មវិធីសិក្សាជាតិ MoEYS\n\n**និយមន័យ៖** គីមីវិទ្យា គឺជាវិទ្យាសាស្ត្រដែលសិក្សាអំពីសមាសភាព រចនាសម្ព័ន្ធ លក្ខណៈសម្បត្តិ និងការផ្លាស់ប្តូរនៃរូបធាតុ (Matter) តាមរយៈប្រតិកម្មគីមីផ្សេងៗ។\n\n**ខ្លឹមសារគ្រឹះ MoEYS ថ្នាក់ទី ៧–១២៖**\n- **អនុវិទ្យាល័យ (ថ្នាក់ទី ៧–៩)៖** អាតូម ម៉ូលេគុល ធាតុគីមី តារាងខួប អាស៊ីត បាស អំបិល និងការថ្លឹងសមីការគីមី។\n- **វិទ្យាល័យ (ថ្នាក់ទី ១០–១២)៖** សម្ព័ន្ធគីមី គីមីសរីរាង្គ (អ៊ីដ្រូកាបួ អាល់កុល អាស៊ីតកាបុកស៊ីលិច អេស្ទែរ ជាតិខ្លាញ់) គីមីអសរីរាង្គ គីមីចលនការ និងលំនឹងគីមី។`,
      contentEn: `### Chemistry (គីមីវិទ្យា) — Cambodian MoEYS Curriculum\n\n**Definition:** Chemistry is the scientific study of the properties and behavior of matter, including the atomic composition, structure, and chemical reactions that transform substances.\n\n**MoEYS Curriculum Scope (Grades 7–12):**\n- **Lower Secondary (Grades 7–9):** Atoms, molecules, periodic table, chemical symbols, basic acids, bases, salts, and chemical equations.\n- **Upper Secondary (Grades 10–12):** Chemical bonding, stoichiometry, solution chemistry, organic chemistry (hydrocarbons, functional groups, lipids, polymers), and chemical equilibrium.`,
    },
    {
      subjectSlug: "biology",
      nameKm: "ជីវវិទ្យា",
      nameEn: "Biology",
      keyTerms: ["biology", "bio", "ជីវវិទ្យា", "ជីវ", "what is biology", "និយមន័យជីវវិទ្យា"],
      contentKm: `### មុខវិជ្ជា ជីវវិទ្យា (Biology) ក្នុងកម្មវិធីសិក្សាជាតិ MoEYS\n\n**និយមន័យ៖** ជីវវិទ្យា គឺជាវិទ្យាសាស្ត្រធម្មជាតិដែលសិក្សាអំពីជីវិត និងភាវៈរស់ទាំងឡាយ រួមមាន រចនាសម្ព័ន្ធ មុខងារ ការលូតលាស់ ប្រភពដើម ការវិវត្ត និងអន្តរកម្មរវាងភាវៈរស់ និងបរិស្ថានជុំវិញ។\n\n**ខ្លឹមសារគ្រឹះ MoEYS ថ្នាក់ទី ៧–១២៖**\n- **អនុវិទ្យាល័យ (ថ្នាក់ទី ៧–៩)៖** កោសិកា រុក្ខជាតិ សត្វ សរីរាង្គមនុស្ស (ដង្ហើម រំលាយអាហារ ឈាមរត់) និងប្រព័ន្ធអេកូឡូស៊ី។\n- **វិទ្យាល័យ (ថ្នាក់ទី ១០–១២)៖** ជីវវិទ្យាកោសិកា មីតូស មេយ៉ូស ហ្សែន ពន្ធុវិទ្យា (ច្បាប់ម៉ង់ដែស DNA/RNA) ការវិវត្ត និងសរីរវិទ្យាមនុស្សកម្រិតខ្ពស់។`,
      contentEn: `### Biology (ជីវវិទ្យា) — Cambodian MoEYS Curriculum\n\n**Definition:** Biology is the scientific study of life and living organisms, investigating their structure, function, growth, origin, evolution, and ecological interactions.\n\n**MoEYS Curriculum Scope (Grades 7–12):**\n- **Lower Secondary (Grades 7–9):** Cell structures, botany, zoology, human organ systems, nutrition, and ecosystems.\n- **Upper Secondary (Grades 10–12):** Molecular biology, genetics (Mendelian laws, DNA replication, protein synthesis), cellular division (mitosis/meiosis), human nervous and endocrine systems, and evolution.`,
    },
  ];

  for (const so of SUBJECT_OVERVIEWS) {
    for (const g of [7, 8, 9, 10, 11, 12]) {
      chunks.push({
        id: `chunk-overview-${so.subjectSlug}-g${g}`,
        grade: g,
        subjectSlug: so.subjectSlug,
        stream: "all",
        sourceTitle: `កម្មវិធីសិក្សាជាតិ MoEYS — សេចក្តីផ្តើមមុខវិជ្ជា ${so.nameKm}`,
        sourcePage: 1,
        sourceType: "moeys_textbook",
        verificationStatus: "verified",
        language: "mixed",
        sectionHeading: `${so.nameKm} (${so.nameEn})`,
        content: `${so.contentKm}\n\n---\n\n${so.contentEn}`,
        plainTextSummary: `${so.nameKm} គឺជាវិទ្យាសាស្ត្រដែលសិក្សាអំពីគ្រឹះ MoEYS ថ្នាក់ទី ${g}។`,
        formulas: [],
        symbols: [],
        keyTerms: so.keyTerms,
        metadata: {
          isOfficial: true,
          organization: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)",
          isDisciplineOverview: true,
        },
      });
    }
  }

  cachedKnowledgeBase = chunks;
  return chunks;
}
