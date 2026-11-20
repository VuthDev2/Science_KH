-- ==============================================================================
-- ScienceKH (វិទ្យាសាស្ត្រ) — Consolidated Database Schema & Initial Seeds
-- For Cambodian Grades 7–12 STEM Learning Platform
-- ==============================================================================

-- 1. ENUMS
DO $$ BEGIN
  CREATE TYPE public.app_language AS ENUM ('km', 'en');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'student');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  language public.app_language NOT NULL DEFAULT 'km',
  grade SMALLINT CHECK (grade BETWEEN 7 AND 12),
  xp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 50,
  streak_days INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, display_name, avatar_url, grade, language)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'avatar_url',
    COALESCE((NEW.raw_user_meta_data ->> 'grade')::smallint, 12),
    COALESCE((NEW.raw_user_meta_data ->> 'language')::public.app_language, 'km'::public.app_language)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    display_name = EXCLUDED.display_name;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT, INSERT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage roles"
    ON public.user_roles FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- First user becomes admin, subsequent become student
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student')
      ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 5. SUBJECTS TABLE (MoEYS STEM 4 Disciplines)
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_km TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Atom',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subjects TO authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone authenticated can view subjects"
    ON public.subjects FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

INSERT INTO public.subjects (slug, name_en, name_km, icon, sort_order) VALUES
  ('mathematics', 'Mathematics',             'គណិតវិទ្យា',             'Calculator',    1),
  ('physics',     'Physics',                 'រូបវិទ្យា',               'Atom',          2),
  ('chemistry',   'Chemistry',               'គីមីវិទ្យា',              'FlaskConical',  3),
  ('biology',     'Biology',                 'ជីវវិទ្យា',               'Dna',           4),
  ('earth',       'Earth Science',           'ផែនដី និងបរិស្ថានវិទ្យា', 'Globe2',        5),
  ('khmer',       'Khmer Literature',        'ភាសាខ្មែរ',               'BookOpen',      6),
  ('english',     'English',                 'ភាសាអង់គ្លេស',            'Languages',     7),
  ('ict',         'ICT & Computing',         'ព័ត៌មានវិទ្យា',           'Laptop',        8),
  ('history',     'History',                 'ប្រវត្តិវិទ្យា',           'Landmark',      9),
  ('geography',   'Geography',               'ភូមិវិទ្យា',              'Compass',       10)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_km = EXCLUDED.name_km,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- 6. LESSONS TABLE
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
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lessons TO authenticated;
GRANT ALL ON public.lessons TO service_role;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Authenticated can view published lessons"
    ON public.lessons FOR SELECT TO authenticated
    USING (is_published OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DROP TRIGGER IF EXISTS update_lessons_updated_at ON public.lessons;
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. QUIZZES & QUESTIONS
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE REFERENCES public.lessons(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL DEFAULT 'Quiz',
  title_km TEXT NOT NULL DEFAULT 'កម្រងសំណួរ',
  pass_score INT NOT NULL DEFAULT 70,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.quizzes TO authenticated;
GRANT ALL ON public.quizzes TO service_role;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Authenticated can view quizzes"
    ON public.quizzes FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  prompt_en TEXT NOT NULL,
  prompt_km TEXT NOT NULL,
  options_en JSONB NOT NULL,
  options_km JSONB NOT NULL,
  correct_index SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  explanation_en TEXT,
  explanation_km TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_questions TO authenticated;
GRANT ALL ON public.quiz_questions TO service_role;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Authenticated can view quiz questions"
    ON public.quiz_questions FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 8. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users manage their own lesson progress"
    ON public.lesson_progress FOR ALL TO authenticated
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 9. AI TUTOR CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New chat',
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_conversations TO authenticated;
GRANT ALL ON public.ai_conversations TO service_role;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users manage their own conversations"
    ON public.ai_conversations FOR ALL TO authenticated
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_messages TO authenticated;
GRANT ALL ON public.ai_messages TO service_role;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users manage messages in their conversations"
    ON public.ai_messages FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 10. SEED STARTER LESSON + QUIZ (Grade 7 Physics)
DO $$
DECLARE
  v_physics UUID;
  v_lesson UUID;
  v_quiz UUID;
BEGIN
  SELECT id INTO v_physics FROM public.subjects WHERE slug = 'physics';
  IF v_physics IS NULL THEN RETURN; END IF;
  IF EXISTS (SELECT 1 FROM public.lessons WHERE title_en = 'Forces and Motion') THEN RETURN; END IF;

  INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
  VALUES (
    v_physics, 7,
    'Forces and Motion',
    'កម្លាំង និងចលនា',
    'Discover how forces change the motion of everyday objects.',
    'ស្វែងយល់ពីរបៀបដែលកម្លាំងផ្លាស់ប្តូរចលនាវត្ថុ។',
    E'## What is a force?\n\nA **force** is a push or a pull. Forces can start an object moving, stop it, or change its direction.\n\n## Newton''s First Law\n\n> An object at rest stays at rest, and an object in motion stays in motion, unless acted on by an outside force.',
    E'## តើកម្លាំងជាអ្វី?\n\n**កម្លាំង** គឺការរុញ ឬទាញ។ កម្លាំងអាចធ្វើឱ្យវត្ថុចាប់ផ្តើមផ្លាស់ទី បញ្ឈប់ ឬផ្លាស់ប្តូរទិសដៅ។',
    8, 25, true, 1
  ) RETURNING id INTO v_lesson;

  INSERT INTO public.quizzes (lesson_id) VALUES (v_lesson) RETURNING id INTO v_quiz;

  INSERT INTO public.quiz_questions (quiz_id, prompt_en, prompt_km, options_en, options_km, correct_index, explanation_en, explanation_km, sort_order) VALUES
  (v_quiz,
    'What is a force?',
    'តើកម្លាំងជាអ្វី?',
    '["A type of energy","A push or a pull","A unit of mass","A kind of light"]'::jsonb,
    '["ប្រភេទថាមពល","ការរុញ ឬទាញ","ឯកតាម៉ាស់","ប្រភេទពន្លឺ"]'::jsonb,
    1,
    'A force is any push or pull that can change an object''s motion.',
    'កម្លាំង គឺជាការរុញ ឬទាញដែលអាចផ្លាស់ប្តូរចលនារបស់វត្ថុ។',
    0);
END $$;

