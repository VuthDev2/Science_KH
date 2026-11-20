-- ==============================================================================
-- ScienceKH (វិទ្យាសាស្ត្រ) — Master Consolidated Database Schema (v1.0)
-- Production PostgreSQL / Supabase Schema for Cambodian Grades 7–12 STEM Platform
-- Supports:
--   1. Identity & Profile (Auth, Roles, Cambodia Localization)
--   2. MoEYS Academic Curriculum (Subjects, Lessons, Units)
--   3. Gamification & Progression (XP, Coins, Streaks, Hearts, Leagues)
--   4. Interactive Assessment (Quizzes, Questions, Submissions)
--   5. National Exam Prep (BacII Grade 12 & Brevet Grade 9)
--   6. AI Socratic Tutor (Conversations, Messages)
--   7. Monetization & KHQR Transactions (Bakong NBC Standards)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE public.app_language AS ENUM ('km', 'en');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'student');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.league_tier AS ENUM ('bronze', 'silver', 'gold', 'sapphire', 'ruby', 'emerald', 'diamond');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.exam_type AS ENUM ('brevet_grade_9', 'bacii_grade_12', 'olympiad');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 3. COMMON TRIGGER FUNCTION (Auto-update updated_at)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ==============================================================================
-- DOMAIN 1: IDENTITY, PROFILES & ROLES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  language public.app_language NOT NULL DEFAULT 'km',
  grade SMALLINT CHECK (grade BETWEEN 7 AND 12),
  xp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 50,
  hearts SMALLINT NOT NULL DEFAULT 5 CHECK (hearts BETWEEN 0 AND 5),
  last_heart_lost_at TIMESTAMPTZ,
  streak_days INTEGER NOT NULL DEFAULT 1,
  longest_streak INTEGER NOT NULL DEFAULT 1,
  league_tier public.league_tier NOT NULL DEFAULT 'bronze',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  school_name TEXT,
  province TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_grade_idx ON public.profiles(grade);
CREATE INDEX IF NOT EXISTS profiles_xp_idx ON public.profiles(xp DESC);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE INDEX IF NOT EXISTS user_roles_user_idx ON public.user_roles(user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Auto-provision profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, display_name, avatar_url, language, grade)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'សិស្សថ្មី (Student)'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE((NEW.raw_user_meta_data->>'language')::public.app_language, 'km'),
    COALESCE((NEW.raw_user_meta_data->>'grade')::SMALLINT, 12)
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- DOMAIN 2: MOEYS ACADEMIC CURRICULUM
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_km TEXT NOT NULL,
  description_en TEXT,
  description_km TEXT,
  icon TEXT,
  color TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subjects_sort_order_idx ON public.subjects(sort_order);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  grade SMALLINT NOT NULL CHECK (grade BETWEEN 7 AND 12),
  title_en TEXT NOT NULL,
  title_km TEXT NOT NULL,
  summary_en TEXT,
  summary_km TEXT,
  body_en TEXT NOT NULL DEFAULT '',
  body_km TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  estimated_minutes INT NOT NULL DEFAULT 10,
  xp_reward INT NOT NULL DEFAULT 20,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lessons_subject_grade_idx ON public.lessons(subject_id, grade);
CREATE INDEX IF NOT EXISTS lessons_published_sort_idx ON public.lessons(is_published, sort_order);

-- ==============================================================================
-- DOMAIN 3: INTERACTIVE ASSESSMENT & QUIZZES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE REFERENCES public.lessons(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL DEFAULT 'Quiz',
  title_km TEXT NOT NULL DEFAULT 'កម្រងសំណួរ',
  pass_score INT NOT NULL DEFAULT 60,
  xp_reward INT NOT NULL DEFAULT 40,
  coins_reward INT NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL DEFAULT 'mcq',
  prompt_en TEXT NOT NULL,
  prompt_km TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INT NOT NULL,
  explanation_en TEXT,
  explanation_km TEXT,
  formula_badge TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_questions_quiz_idx ON public.quiz_questions(quiz_id, sort_order);

CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INT NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_submissions_user_idx ON public.quiz_submissions(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  score INT NOT NULL DEFAULT 0,
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS user_lesson_progress_user_idx ON public.user_lesson_progress(user_id, is_completed);

-- ==============================================================================
-- DOMAIN 4: GAMIFICATION INTEGRITY (STREAKS, HEARTS, XP LEDGER)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT NOT NULL DEFAULT 1,
  longest_streak INT NOT NULL DEFAULT 1,
  streak_freezes_left INT NOT NULL DEFAULT 1,
  last_activity_date_ict DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_xp_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date_ict DATE NOT NULL DEFAULT CURRENT_DATE,
  total_xp_awarded INT NOT NULL DEFAULT 0,
  daily_cap INT NOT NULL DEFAULT 2000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, activity_date_ict)
);

-- ==============================================================================
-- DOMAIN 5: NATIONAL EXAM PREP (BACII GRADE 12 & BREVET GRADE 9)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.exam_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type public.exam_type NOT NULL,
  year INT NOT NULL,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title_km TEXT NOT NULL,
  title_en TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 90,
  total_marks INT NOT NULL DEFAULT 100,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_paper_id UUID NOT NULL REFERENCES public.exam_papers(id) ON DELETE CASCADE,
  question_number INT NOT NULL,
  prompt_km TEXT NOT NULL,
  prompt_en TEXT,
  solution_km TEXT,
  solution_en TEXT,
  marks INT NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_paper_id UUID NOT NULL REFERENCES public.exam_papers(id) ON DELETE CASCADE,
  score INT NOT NULL,
  time_spent_seconds INT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- DOMAIN 6: AI SOCRATIC TUTOR
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'ការសន្ទនាជាមួយគ្រូ AI',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_messages_conversation_idx ON public.ai_messages(conversation_id, created_at);

-- ==============================================================================
-- DOMAIN 7: MONETIZATION & BAKONG KHQR TRANSACTIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_ref TEXT NOT NULL UNIQUE,
  amount_khr INT NOT NULL,
  amount_usd NUMERIC(10, 2),
  plan_tier TEXT NOT NULL DEFAULT 'monthly',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'failed')),
  khqr_payload TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS transactions_user_idx ON public.transactions(user_id, status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_xp_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles
DO $$ BEGIN
  CREATE POLICY "Profiles are viewable by owner or public leaderboard"
    ON public.profiles FOR SELECT USING (true);
  CREATE POLICY "Profiles updateable only by owner"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Subjects & Lessons (Public read, admin write)
DO $$ BEGIN
  CREATE POLICY "Subjects are viewable by everyone"
    ON public.subjects FOR SELECT USING (true);
  CREATE POLICY "Published lessons are viewable by everyone"
    ON public.lessons FOR SELECT USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
  CREATE POLICY "Quizzes viewable by everyone"
    ON public.quizzes FOR SELECT USING (true);
  CREATE POLICY "Questions viewable by everyone"
    ON public.quiz_questions FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Submissions & Progress (Owner only)
DO $$ BEGIN
  CREATE POLICY "Submissions owner access"
    ON public.quiz_submissions FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "Lesson progress owner access"
    ON public.user_lesson_progress FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "Streaks owner access"
    ON public.user_streaks FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "XP ledger owner access"
    ON public.daily_xp_ledger FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "Exam attempts owner access"
    ON public.exam_attempts FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "AI conversations owner access"
    ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);
  CREATE POLICY "Transactions owner access"
    ON public.transactions FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- INITIAL SEED: 10 MOEYS CURRICULUM SUBJECTS
-- ==============================================================================

INSERT INTO public.subjects (slug, name_en, name_km, description_en, description_km, icon, color, sort_order)
VALUES
  ('mathematics', 'Mathematics', 'គណិតវិទ្យា', 'Core STEM: Algebra, Geometry, Calculus, Statistics', 'ពិជគណិត ធរណីមាត្រ គណិតវិភាគ និងស្ថិតិ', '📐', '#3b82f6', 1),
  ('physics', 'Physics', 'រូបវិទ្យា', 'Core STEM: Mechanics, Optics, Electricity, Modern Physics', 'មេកានិច អុបទិក អគ្គិសនី និងរូបវិទ្យាទំនើប', '⚛️', '#8b5cf6', 2),
  ('chemistry', 'Chemistry', 'គីមីវិទ្យា', 'Core STEM: Atomic Structure, Organic Chemistry, Reactions', 'រចនាសម្ព័ន្ធអាតូម គីមីសរីរាង្គ និងប្រតិកម្មគីមី', '🧪', '#10b981', 3),
  ('biology', 'Biology', 'ជីវវិទ្យា', 'Core STEM: Genetics, Cell Biology, Ecology, Physiology', 'ពន្ធុវិទ្យា ជីវវិទ្យាកោសិកា និងប្រព័ន្ធអេកូឡូស៊ី', '🧬', '#06b6d4', 4),
  ('earth', 'Earth Science', 'ផែនដីវិទ្យា', 'STEM: Geology, Meteorology, Astronomy, Environment', 'ភូគព្ភវិទ្យា ឧតុនិយម តារាសាស្ត្រ និងបរិស្ថាន', '🌍', '#14b8a6', 5),
  ('khmer', 'Khmer Literature', 'ភាសាខ្មែរ', 'National Language: Grammar, Literature Analysis, Essays', 'វេយ្យាករណ៍ខ្មែរ អក្សរសិល្ប៍ និងការតែងសេចក្តី', '📖', '#f59e0b', 6),
  ('english', 'English', 'ភាសាអង់គ្លេស', 'International Language: Grammar, STEM Vocabulary, Reading', 'វេយ្យាករណ៍ ពាក្យបច្ចេកទេសវិទ្យាសាស្ត្រ និងការអាន', '🌐', '#ec4899', 7),
  ('ict', 'ICT & Computer Science', 'ព័ត៌មានវិទ្យា', 'Technology: Algorithms, Programming, Digital Literacy', 'ក្បួនដោះស្រាយ ការសរសេរកូដ និងបច្ចេកវិទ្យាឌីជីថល', '💻', '#6366f1', 8),
  ('history', 'History', 'ប្រវត្តិវិទ្យា', 'Social Science: Cambodian & World History', 'ប្រវត្តិសាស្ត្រខ្មែរ និងប្រវត្តិសាស្ត្រពិភពលោក', '🏛️', '#d97706', 9),
  ('geography', 'Geography', 'ភូមិវិទ្យា', 'Social Science: Physical & Economic Geography', 'ភូមិវិទ្យារូបវន្ត និងភូមិវិទ្យាសេដ្ឋកិច្ចកម្ពុជា', '🧭', '#84cc16', 10)
ON CONFLICT (slug) DO UPDATE
SET
  name_en = EXCLUDED.name_en,
  name_km = EXCLUDED.name_km,
  description_en = EXCLUDED.description_en,
  description_km = EXCLUDED.description_km,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order;

