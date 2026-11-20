-- ==============================================================================
-- ScienceKH — Parameterized Security & Injection Protection Standards
-- Enforces PostgreSQL parameterized function calling and strict type-checked parameters
-- Reference: OWASP Top 10 - A03:2021 Injection Prevention
-- ==============================================================================

-- 1. Helper function: Detect and reject SQL injection signatures in dynamic inputs
CREATE OR REPLACE FUNCTION public.assert_safe_sql_param(input_text TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF input_text IS NULL THEN
    RETURN TRUE;
  END IF;

  -- Disallow semicolon chaining, SQL comments, UNION queries, and raw OR/AND injection patterns
  IF input_text ~* '(;|\-\-|\/\*|\*\/|\bUNION\s+SELECT\b|\bOR\s+[\d\w]+=[\d\w]+|\bAND\s+[\d\w]+=[\d\w]+|\bPG_SLEEP\b)' THEN
    RAISE EXCEPTION 'Security Error: Potential SQL injection pattern detected in input.'
      USING ERRCODE = '22023';
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path = public;

-- 2. Secure Parameterized Student Study Analytics Function
-- Demonstrates 100% parameterized query execution with strongly typed input arguments
CREATE OR REPLACE FUNCTION public.get_student_study_stats(
  _user_id UUID,
  _grade SMALLINT DEFAULT NULL
)
RETURNS TABLE (
  total_completed_lessons BIGINT,
  total_xp INT,
  current_streak INT,
  grade_completed_lessons BIGINT
) AS $$
BEGIN
  -- Strict Parameter Validation
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Security Error: _user_id parameter cannot be NULL.'
      USING ERRCODE = '22004';
  END IF;

  IF _grade IS NOT NULL AND (_grade < 7 OR _grade > 12) THEN
    RAISE EXCEPTION 'Security Error: _grade must be between 7 and 12.'
      USING ERRCODE = '22003';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM public.lesson_progress lp WHERE lp.user_id = _user_id AND lp.status = 'completed') AS total_completed_lessons,
    COALESCE(p.xp, 0) AS total_xp,
    COALESCE(p.streak_days, 0) AS current_streak,
    (
      SELECT COUNT(*)
      FROM public.lesson_progress lp
      JOIN public.lessons l ON l.id = lp.lesson_id
      WHERE lp.user_id = _user_id
        AND lp.status = 'completed'
        AND (_grade IS NULL OR l.grade = _grade)
    ) AS grade_completed_lessons
  FROM public.profiles p
  WHERE p.id = _user_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Revoke execute from public/anon, grant only to authenticated users and service_role
REVOKE EXECUTE ON FUNCTION public.get_student_study_stats(UUID, SMALLINT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_student_study_stats(UUID, SMALLINT) TO authenticated, service_role;
