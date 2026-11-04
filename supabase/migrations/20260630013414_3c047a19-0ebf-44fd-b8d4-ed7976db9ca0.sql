
-- First-user-becomes-admin trigger
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

-- Seed a sample lesson + quiz
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
    E'## What is a force?\n\nA **force** is a push or a pull. Forces can:\n\n- start an object moving\n- stop a moving object\n- change the direction or speed of an object\n\n## Newton''s First Law\n\n> An object at rest stays at rest, and an object in motion stays in motion, unless acted on by an outside force.\n\nThis is also called the **law of inertia**. The bigger the mass, the more inertia an object has.\n\n## Real-life examples\n\n1. A football stays still until you kick it.\n2. A bicycle slows down because of **friction** between the tires and the road.\n3. A ball thrown up falls back down because of **gravity**.\n\nTry to spot forces around you today!',
    E'## តើកម្លាំងជាអ្វី?\n\n**កម្លាំង** គឺការរុញ ឬទាញ។ កម្លាំងអាច៖\n\n- ធ្វើឱ្យវត្ថុចាប់ផ្តើមផ្លាស់ទី\n- បញ្ឈប់វត្ថុដែលកំពុងផ្លាស់ទី\n- ផ្លាស់ប្តូរទិសដៅ ឬល្បឿនរបស់វត្ថុ\n\n## ច្បាប់ទីមួយរបស់ Newton\n\n> វត្ថុដែលឈប់នឹងនៅឈប់ ហើយវត្ថុដែលផ្លាស់ទីនឹងបន្តផ្លាស់ទី លុះត្រាតែមានកម្លាំងខាងក្រៅ។\n\nនេះហៅថា **ច្បាប់នៃ inertia** ផងដែរ។',
    8, 25, true, 1
  ) RETURNING id INTO v_lesson;

  INSERT INTO public.quizzes (lesson_id) VALUES (v_lesson) RETURNING id INTO v_quiz;

  INSERT INTO public.quiz_questions (quiz_id, prompt_en, prompt_km, options_en, options_km, correct_index, explanation_en, sort_order) VALUES
  (v_quiz,
    'What is a force?',
    'តើកម្លាំងជាអ្វី?',
    '["A type of energy","A push or a pull","A unit of mass","A kind of light"]'::jsonb,
    '["ប្រភេទថាមពល","ការរុញ ឬទាញ","ឯកតាម៉ាស់","ប្រភេទពន្លឺ"]'::jsonb,
    1,
    'A force is any push or pull that can change an object''s motion.',
    0),
  (v_quiz,
    'Newton''s First Law is also called the law of...',
    'ច្បាប់ទីមួយរបស់ Newton ត្រូវបានហៅផងដែរថាជាច្បាប់នៃ...',
    '["gravity","friction","inertia","light"]'::jsonb,
    '["ទំនាញ","កកិត","inertia","ពន្លឺ"]'::jsonb,
    2,
    'Inertia is an object''s tendency to keep doing what it is doing.',
    1),
  (v_quiz,
    'Why does a bicycle slow down without pedaling?',
    'ហេតុអ្វីបានជារ៉ឺម៉កថយយឺតពេលឈប់ឈ្នាន់?',
    '["Gravity pulls it back","Friction with the road","It runs out of fuel","Air pushes it"]'::jsonb,
    '["ទំនាញទាញវាមកវិញ","កកិតជាមួយផ្លូវ","អស់ប្រេង","ខ្យល់រុញវា"]'::jsonb,
    1,
    'Friction between the tires and road surface converts motion into heat.',
    2);
END $$;
