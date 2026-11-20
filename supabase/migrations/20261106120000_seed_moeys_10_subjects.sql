-- ==============================================================================
-- Migration: Seed 10 MoEYS National Curriculum Subjects
-- Grades 7–12 (Mathematics, Physics, Chemistry, Biology, Earth, Khmer, English, ICT, History, Geography)
-- ==============================================================================

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

