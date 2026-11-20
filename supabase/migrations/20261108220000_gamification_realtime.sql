-- Add streak tracking column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS streak_last_updated_at timestamptz DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS coins integer NOT NULL DEFAULT 50;

-- Create a leaderboard view that aggregates real XP from profiles
CREATE OR REPLACE VIEW public.leaderboard_top AS
  SELECT
    p.id,
    p.display_name,
    p.full_name,
    p.xp,
    p.streak_days,
    p.coins,
    p.grade,
    COUNT(lp.id) FILTER (WHERE lp.status = 'completed') AS lessons_completed
  FROM profiles p
  LEFT JOIN lesson_progress lp ON lp.user_id = p.id
  GROUP BY p.id, p.display_name, p.full_name, p.xp, p.streak_days, p.coins, p.grade
  ORDER BY p.xp DESC;

-- RLS: users can read leaderboard  
GRANT SELECT ON public.leaderboard_top TO authenticated;
