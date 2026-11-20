-- ==============================================================================
-- Migration: Study Reference Library (Academic Knowledge Warehouse)
-- MoEYS National Curriculum Standards for Grades 7–12
-- Reusable schema for Formulas, Symbols, Definitions, Laws, Theorems, Chemical
-- Elements, Grammar, History, and Diagrams with Verified Source Attribution.
-- ==============================================================================

-- 1. Grades Reference Table
CREATE TABLE IF NOT EXISTS public.reference_grades (
  id INT PRIMARY KEY, -- 7, 8, 9, 10, 11, 12
  level_name_km TEXT NOT NULL,
  level_name_en TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('lower_secondary', 'upper_secondary')),
  exam_target_km TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

INSERT INTO public.reference_grades (id, level_name_km, level_name_en, tier, exam_target_km, sort_order) VALUES
  (7,  'ថ្នាក់ទី ៧',  'Grade 7',  'lower_secondary', 'ត្រៀមប្រឡងឆមាស (Semester Exam)', 1),
  (8,  'ថ្នាក់ទី ៨',  'Grade 8',  'lower_secondary', 'ត្រៀមប្រឡងឆមាស (Semester Exam)', 2),
  (9,  'ថ្នាក់ទី ៩',  'Grade 9',  'lower_secondary', 'ត្រៀមប្រឡងឌីប្លូម (MoEYS Brevet)', 3),
  (10, 'ថ្នាក់ទី ១០', 'Grade 10', 'upper_secondary', 'ត្រៀមប្រឡងឆមាស (Semester Exam)', 4),
  (11, 'ថ្នាក់ទី ១១', 'Grade 11', 'upper_secondary', 'ត្រៀមប្រឡងឆមាស (Semester Exam)', 5),
  (12, 'ថ្នាក់ទី ១២', 'Grade 12', 'upper_secondary', 'ត្រៀមប្រឡងបាក់ឌុប (MoEYS Bac II)', 6)
ON CONFLICT (id) DO UPDATE SET
  level_name_km = EXCLUDED.level_name_km,
  level_name_en = EXCLUDED.level_name_en,
  tier = EXCLUDED.tier,
  exam_target_km = EXCLUDED.exam_target_km,
  sort_order = EXCLUDED.sort_order;

-- 2. Curriculum Versions Table
CREATE TABLE IF NOT EXISTS public.curriculum_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_code TEXT NOT NULL UNIQUE,
  name_km TEXT NOT NULL,
  name_en TEXT NOT NULL,
  authority TEXT NOT NULL DEFAULT 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)',
  is_current BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.curriculum_versions (version_code, name_km, name_en, authority, is_current) VALUES
  ('moeys_standard_2026', 'កម្មវិធីសិក្សាគោលជាតិ MoEYS ២០២៦', 'MoEYS National Curriculum Framework 2026', 'ក្រសួងអប់រំ យុវជន និងកីឡា', true)
ON CONFLICT (version_code) DO NOTHING;

-- 3. Official Source Documents Table
CREATE TABLE IF NOT EXISTS public.source_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_km TEXT NOT NULL,
  title_en TEXT NOT NULL,
  organization TEXT NOT NULL DEFAULT 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)',
  grade INT REFERENCES public.reference_grades(id),
  subject_slug TEXT REFERENCES public.subjects(slug),
  edition TEXT NOT NULL DEFAULT 'បោះពុម្ពលើកទី ១',
  publication_year INT NOT NULL DEFAULT 2024,
  official_url TEXT,
  sala_url TEXT,
  is_official_moeys BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Reference Topics Table
CREATE TABLE IF NOT EXISTS public.reference_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  grade INT NOT NULL REFERENCES public.reference_grades(id),
  slug TEXT NOT NULL,
  name_km TEXT NOT NULL,
  name_en TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(subject_slug, grade, slug)
);

-- 5. Reference Entries Table (The Central Knowledge Warehouse)
CREATE TABLE IF NOT EXISTS public.reference_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  original_title_kh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  topic_id UUID REFERENCES public.reference_topics(id) ON DELETE SET NULL,
  reference_type TEXT NOT NULL CHECK (
    reference_type IN (
      'formula',
      'symbol',
      'definition',
      'rule',
      'law_principle',
      'theorem',
      'unit_measurement',
      'chemical_element',
      'chemical_formula',
      'equation',
      'diagram',
      'table',
      'vocabulary',
      'historical_event',
      'date_timeline',
      'grammar_rule',
      'concept',
      'procedure',
      'classification',
      'other'
    )
  ),
  stream_applicability TEXT NOT NULL DEFAULT 'all' CHECK (stream_applicability IN ('all', 'science', 'social_science')),
  short_description_kh TEXT NOT NULL,
  explanation_kh TEXT NOT NULL,
  explanation_en TEXT,
  student_friendly_guide_kh TEXT, -- ScienceKH pedagogical easy-to-digest guide
  supplementary_notes_kh TEXT,   -- Context beyond official MoEYS syllabus
  key_terms TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  structured_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  diagram_url TEXT,
  verification_status TEXT NOT NULL DEFAULT 'draft' CHECK (
    verification_status IN ('draft', 'pending_review', 'verified', 'needs_correction', 'archived')
  ),
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMPTZ,
  curriculum_version_id UUID REFERENCES public.curriculum_versions(id),
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Reference Grade Applicability (Many-to-Many Bridge Table)
CREATE TABLE IF NOT EXISTS public.reference_grade_applicability (
  reference_id UUID NOT NULL REFERENCES public.reference_entries(id) ON DELETE CASCADE,
  grade INT NOT NULL REFERENCES public.reference_grades(id) ON DELETE CASCADE,
  primary_introduced_grade BOOLEAN NOT NULL DEFAULT false,
  exam_focus_grade BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (reference_id, grade)
);

-- 7. Reference Sources Table (Direct Textbook Citation & Proof)
CREATE TABLE IF NOT EXISTS public.reference_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id UUID NOT NULL REFERENCES public.reference_entries(id) ON DELETE CASCADE,
  source_document_id UUID REFERENCES public.source_documents(id) ON DELETE SET NULL,
  chapter_km TEXT,
  chapter_number INT,
  page_start INT,
  page_end INT,
  quoted_passage_km TEXT,
  external_url TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Reference Bookmarks Table
CREATE TABLE IF NOT EXISTS public.reference_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reference_id UUID NOT NULL REFERENCES public.reference_entries(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, reference_id)
);

-- 9. Recently Viewed References Table
CREATE TABLE IF NOT EXISTS public.recently_viewed_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reference_id UUID NOT NULL REFERENCES public.reference_entries(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, reference_id)
);

-- 10. Indexes for High-Speed Retrieval & Search
CREATE INDEX IF NOT EXISTS idx_reference_entries_subject ON public.reference_entries(subject_slug);
CREATE INDEX IF NOT EXISTS idx_reference_entries_type ON public.reference_entries(reference_type);
CREATE INDEX IF NOT EXISTS idx_reference_entries_status ON public.reference_entries(verification_status);
CREATE INDEX IF NOT EXISTS idx_reference_grade_app_grade ON public.reference_grade_applicability(grade);
CREATE INDEX IF NOT EXISTS idx_reference_sources_ref ON public.reference_sources(reference_id);
CREATE INDEX IF NOT EXISTS idx_reference_bookmarks_user ON public.reference_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_recent_views_user ON public.recently_viewed_references(user_id);

-- Row-Level Security (RLS) Policies
ALTER TABLE public.reference_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_grade_applicability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed_references ENABLE ROW LEVEL SECURITY;

-- Read policies for public/authenticated users
DO $$ BEGIN
  CREATE POLICY "Public read for reference grades" ON public.reference_grades FOR SELECT USING (true);
  CREATE POLICY "Public read for curriculum versions" ON public.curriculum_versions FOR SELECT USING (true);
  CREATE POLICY "Public read for source documents" ON public.source_documents FOR SELECT USING (true);
  CREATE POLICY "Public read for reference topics" ON public.reference_topics FOR SELECT USING (true);
  CREATE POLICY "Public read for verified or published reference entries" ON public.reference_entries FOR SELECT USING (true);
  CREATE POLICY "Public read for reference grade applicability" ON public.reference_grade_applicability FOR SELECT USING (true);
  CREATE POLICY "Public read for reference sources" ON public.reference_sources FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- User specific bookmark and recent view policies
DO $$ BEGIN
  CREATE POLICY "Users can manage their own bookmarks" ON public.reference_bookmarks
    FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "Users can manage their recent views" ON public.recently_viewed_references
    FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;
