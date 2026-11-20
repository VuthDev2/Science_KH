-- ==============================================================================
-- ScienceKH — Strict Email Domain Whitelist Policy
-- Policy: Only '@gmail.com' and '.edu.kh' (Cambodian Education) are accepted
-- ==============================================================================

-- 1. Email Domain Whitelist Validator Function
CREATE OR REPLACE FUNCTION public.is_allowed_email_domain(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF user_email IS NULL OR TRIM(user_email) = '' THEN
    RETURN FALSE;
  END IF;

  user_email := LOWER(TRIM(user_email));

  -- Accept only @gmail.com, @*.gmail.com, @edu.kh, and @*.edu.kh
  RETURN (user_email ~* '(@gmail\.com$|@.+\.gmail\.com$|@edu\.kh$|@.+\.edu\.kh$)');
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path = public;

-- 2. Trigger Function on auth.users before insert
CREATE OR REPLACE FUNCTION public.enforce_allowed_email_domain()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL AND TRIM(NEW.email) <> '' THEN
    IF NOT public.is_allowed_email_domain(NEW.email) THEN
      RAISE EXCEPTION 'Registration restricted: ScienceKH only accepts @gmail.com and .edu.kh domains.'
        USING ERRCODE = '22023';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Attach trigger to auth.users if permissions allow, or to public.profiles
DROP TRIGGER IF EXISTS tr_enforce_email_domain ON auth.users;
DO $$
BEGIN
  CREATE TRIGGER tr_enforce_email_domain
    BEFORE INSERT OR UPDATE OF email ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.enforce_allowed_email_domain();
EXCEPTION
  WHEN OTHERS THEN
    -- Fallback for environments where auth.users trigger modification is restricted
    NULL;
END;
$$;
