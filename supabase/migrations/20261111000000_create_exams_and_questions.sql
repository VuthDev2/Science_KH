-- Migration: 20261111000000_create_exams_and_questions.sql

-- Create tables for national exams and questions (2011–2024)


CREATE TABLE IF NOT EXISTS public.exam_papers (
  id TEXT PRIMARY KEY,
  examination_category TEXT NOT NULL CHECK (examination_category IN ('bacii', 'brevet', 'outstanding_student')),
  grade INT NOT NULL,
  stream TEXT NOT NULL,
  subject TEXT NOT NULL,
  examination_year INT NOT NULL,
  session_date_km TEXT,
  original_title_kh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  duration_minutes INT,
  total_marks NUMERIC,
  pdf_url TEXT,
  local_file_path TEXT,
  has_official_answer_key BOOLEAN DEFAULT TRUE,
  source_verification_status TEXT DEFAULT 'verified_official',
  topics_km TEXT[] DEFAULT '{}',
  topics_en TEXT[] DEFAULT '{}',
  overview_km TEXT,
  overview_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exam_questions (
  id TEXT PRIMARY KEY,
  exam_paper_id TEXT REFERENCES public.exam_papers(id) ON DELETE CASCADE,
  question_number INT NOT NULL,
  points NUMERIC NOT NULL,
  title_km TEXT NOT NULL,
  title_en TEXT,
  problem_text_km TEXT NOT NULL,
  problem_text_en TEXT,
  official_solution_km TEXT,
  official_solution_en TEXT,
  scoring_criteria_km TEXT[] DEFAULT '{}',
  key_formulas TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.exam_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exam_papers' AND policyname = 'Allow public read access to exam papers') THEN
    CREATE POLICY "Allow public read access to exam papers" ON public.exam_papers FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exam_questions' AND policyname = 'Allow public read access to exam questions') THEN
    CREATE POLICY "Allow public read access to exam questions" ON public.exam_questions FOR SELECT USING (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_exam_papers_year_cat ON public.exam_papers(examination_year, examination_category);

CREATE INDEX IF NOT EXISTS idx_exam_papers_subject ON public.exam_papers(subject, stream);

CREATE INDEX IF NOT EXISTS idx_exam_questions_paper_id ON public.exam_questions(exam_paper_id);