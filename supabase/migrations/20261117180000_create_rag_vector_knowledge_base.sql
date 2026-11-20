-- ==============================================================================
-- ScienceKH — RAG Vector Knowledge Base & Document Ingestion Schema
-- MoEYS National Curriculum AI Tutor Infrastructure (Grades 7 to 12)
-- Supports pgvector semantic similarity, tsvector full-text search & RRF ranking
-- ==============================================================================

-- 1. Enable pgvector extension if available on PostgreSQL instance
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Educational Source Documents Registry (Admin Ingestion Management)
CREATE TABLE IF NOT EXISTS public.educational_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_km TEXT NOT NULL,
  title_en TEXT NOT NULL,
  organization TEXT NOT NULL DEFAULT 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)',
  grade INTEGER CHECK (grade >= 7 AND grade <= 12),
  subject_slug TEXT NOT NULL,
  stream TEXT NOT NULL DEFAULT 'all' CHECK (stream IN ('all', 'science', 'social_science')),
  document_type TEXT NOT NULL CHECK (document_type IN ('textbook', 'teacher_guide', 'curriculum_framework', 'exam_paper', 'answer_key', 'supplementary')),
  edition TEXT NOT NULL DEFAULT 'បោះពុម្ពលើកចុងក្រោយ',
  publication_year INTEGER NOT NULL DEFAULT 2024,
  file_url TEXT,
  file_size_bytes BIGINT,
  page_count INTEGER DEFAULT 0,
  ocr_status TEXT NOT NULL DEFAULT 'completed' CHECK (ocr_status IN ('pending', 'processing', 'completed', 'failed', 'manual_verified')),
  extraction_quality TEXT NOT NULL DEFAULT 'high' CHECK (extraction_quality IN ('low', 'medium', 'high', 'verified')),
  is_official_moeys BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_chunks INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Knowledge Chunks with Vector Embeddings & Full-Text Search
CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES public.educational_documents(id) ON DELETE CASCADE,
  curriculum_version_code TEXT NOT NULL DEFAULT 'moeys_standard_2026',
  grade INTEGER NOT NULL CHECK (grade >= 7 AND grade <= 12),
  subject_slug TEXT NOT NULL,
  stream TEXT NOT NULL DEFAULT 'all' CHECK (stream IN ('all', 'science', 'social_science')),
  unit_code TEXT,
  lesson_id UUID,
  reference_entry_id UUID REFERENCES public.reference_entries(id) ON DELETE SET NULL,
  source_title TEXT NOT NULL,
  source_page INTEGER,
  source_type TEXT NOT NULL CHECK (source_type IN (
    'moeys_textbook',
    'reference_library',
    'exam_archive',
    'worked_example',
    'sciencekh_supplementary',
    'teacher_rubric'
  )),
  language TEXT NOT NULL DEFAULT 'km' CHECK (language IN ('km', 'en', 'mixed')),
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_review', 'supplementary')),
  section_heading TEXT,
  content TEXT NOT NULL,
  plain_text_summary TEXT,
  formulas TEXT[] DEFAULT '{}',
  symbols TEXT[] DEFAULT '{}',
  key_terms TEXT[] DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Vector embedding column (1536 dimensions for text-embedding-3-small or Gemini embeddings)
  embedding vector(1536),
  -- Full-text search tsvector generated from content and metadata
  tsv_content tsvector GENERATED ALWAYS AS (
    to_tsvector('simple', content || ' ' || coalesce(source_title, '') || ' ' || coalesce(section_heading, ''))
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Fast Retrieval Indexes
CREATE INDEX IF NOT EXISTS idx_kc_grade_subject ON public.knowledge_chunks(grade, subject_slug);
CREATE INDEX IF NOT EXISTS idx_kc_source_type ON public.knowledge_chunks(source_type);
CREATE INDEX IF NOT EXISTS idx_kc_verification ON public.knowledge_chunks(verification_status);
CREATE INDEX IF NOT EXISTS idx_kc_tsv ON public.knowledge_chunks USING GIN(tsv_content);

-- Create HNSW vector index for high-speed cosine similarity lookup
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_kc_embedding_hnsw ON public.knowledge_chunks USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);';
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Fallback to IVFFlat or ignore if vector extension is restricted in sub-environment
  NULL;
END $$;

-- 5. Student AI Message Feedback Table (Helpful / Not Helpful)
CREATE TABLE IF NOT EXISTS public.ai_tutor_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.ai_messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  rating_score INTEGER CHECK (rating_score >= 1 AND rating_score <= 5),
  feedback_category TEXT CHECK (feedback_category IN ('inaccurate', 'confusing', 'unsupported_grade', 'great_explanation', 'too_complex', 'other')),
  feedback_comment TEXT,
  retrieved_chunk_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Row Level Security Policies
ALTER TABLE public.educational_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutor_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read verified educational documents"
  ON public.educational_documents FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public read knowledge chunks"
  ON public.knowledge_chunks FOR SELECT
  USING (true);

CREATE POLICY "Users can submit tutor feedback"
  ON public.ai_tutor_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tutor feedback"
  ON public.ai_tutor_feedback FOR SELECT
  USING (auth.uid() = user_id);

-- 7. Stored Procedure: Hybrid Retrieval with Reciprocal Rank Fusion (RRF)
CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
  query_text TEXT,
  query_embedding vector(1536) DEFAULT NULL,
  match_count INT DEFAULT 5,
  filter_grade INT DEFAULT NULL,
  filter_subject TEXT DEFAULT NULL,
  filter_stream TEXT DEFAULT 'all',
  filter_source_type TEXT DEFAULT NULL,
  min_similarity FLOAT DEFAULT 0.2
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  grade INT,
  subject_slug TEXT,
  stream TEXT,
  source_title TEXT,
  source_page INT,
  source_type TEXT,
  verification_status TEXT,
  section_heading TEXT,
  content TEXT,
  formulas TEXT[],
  symbols TEXT[],
  key_terms TEXT[],
  metadata JSONB,
  similarity FLOAT,
  rrf_score FLOAT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH vector_matches AS (
    SELECT
      kc.id,
      CASE
        WHEN query_embedding IS NOT NULL AND kc.embedding IS NOT NULL THEN
          1 - (kc.embedding <=> query_embedding)
        ELSE 0.0
      END AS sim,
      ROW_NUMBER() OVER (
        ORDER BY
          CASE
            WHEN query_embedding IS NOT NULL AND kc.embedding IS NOT NULL THEN
              1 - (kc.embedding <=> query_embedding)
            ELSE 0.0
          END DESC
      ) AS rank_vec
    FROM public.knowledge_chunks kc
    WHERE
      (filter_grade IS NULL OR kc.grade = filter_grade OR kc.grade = filter_grade - 1)
      AND (filter_subject IS NULL OR kc.subject_slug = filter_subject)
      AND (filter_stream = 'all' OR kc.stream = 'all' OR kc.stream = filter_stream)
      AND (filter_source_type IS NULL OR kc.source_type = filter_source_type)
    LIMIT match_count * 3
  ),
  keyword_matches AS (
    SELECT
      kc.id,
      ts_rank(kc.tsv_content, plainto_tsquery('simple', query_text)) AS kw_rank,
      ROW_NUMBER() OVER (
        ORDER BY ts_rank(kc.tsv_content, plainto_tsquery('simple', query_text)) DESC
      ) AS rank_kw
    FROM public.knowledge_chunks kc
    WHERE
      (filter_grade IS NULL OR kc.grade = filter_grade OR kc.grade = filter_grade - 1)
      AND (filter_subject IS NULL OR kc.subject_slug = filter_subject)
      AND (filter_stream = 'all' OR kc.stream = 'all' OR kc.stream = filter_stream)
      AND (filter_source_type IS NULL OR kc.source_type = filter_source_type)
      AND (
        kc.tsv_content @@ plainto_tsquery('simple', query_text)
        OR kc.content ILIKE '%' || query_text || '%'
      )
    LIMIT match_count * 3
  )
  SELECT
    kc.id,
    kc.document_id,
    kc.grade,
    kc.subject_slug,
    kc.stream,
    kc.source_title,
    kc.source_page,
    kc.source_type,
    kc.verification_status,
    kc.section_heading,
    kc.content,
    kc.formulas,
    kc.symbols,
    kc.key_terms,
    kc.metadata,
    COALESCE(vm.sim, 0.0)::FLOAT AS similarity,
    (
      COALESCE(1.0 / (60.0 + vm.rank_vec), 0.0) * 0.6 +
      COALESCE(1.0 / (60.0 + km.rank_kw), 0.0) * 0.4
    )::FLOAT AS rrf_score
  FROM public.knowledge_chunks kc
  LEFT JOIN vector_matches vm ON kc.id = vm.id
  LEFT JOIN keyword_matches km ON kc.id = km.id
  WHERE
    (vm.id IS NOT NULL OR km.id IS NOT NULL)
    AND (vm.sim IS NULL OR vm.sim >= min_similarity OR km.id IS NOT NULL)
  ORDER BY rrf_score DESC
  LIMIT match_count;
END;
$$;
