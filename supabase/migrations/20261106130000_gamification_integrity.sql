-- ==============================================================================
-- ScienceKH: Gamification Integrity & Strict Database Constraints
-- Enforces hearts, XP, and coin validation at the PostgreSQL engine level
-- ==============================================================================

-- 1. Ensure hearts and heart refill timestamp exist on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS hearts SMALLINT NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS last_heart_lost_at TIMESTAMPTZ;

-- 2. Add strict database-level check constraints
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS check_hearts_range,
  ADD CONSTRAINT check_hearts_range CHECK (hearts BETWEEN 0 AND 5);

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS check_xp_positive,
  ADD CONSTRAINT check_xp_positive CHECK (xp >= 0);

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS check_coins_positive,
  ADD CONSTRAINT check_coins_positive CHECK (coins >= 0);

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS check_streak_positive,
  ADD CONSTRAINT check_streak_positive CHECK (streak_days >= 0);

-- 3. Row-Level Security: Ensure students cannot directly update their own hearts or XP!
-- Updates to xp, coins, and hearts should only be processed via authenticated backend service_role
CREATE OR REPLACE FUNCTION public.protect_profile_gamification_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- If the mutation is performed by the service_role (backend API), allow all changes
  IF (auth.jwt() ->> 'role') = 'service_role' OR current_user = 'postgres' THEN
    RETURN NEW;
  END IF;

  -- Block client-side tampering of gamification scores
  IF NEW.xp <> OLD.xp OR NEW.hearts <> OLD.hearts OR NEW.coins <> OLD.coins THEN
    RAISE EXCEPTION 'Gamification metrics (XP, hearts, coins) can only be updated through verified backend evaluation.'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS tr_protect_profile_gamification ON public.profiles;
CREATE TRIGGER tr_protect_profile_gamification
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_gamification_fields();

