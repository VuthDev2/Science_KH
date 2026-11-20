export type LeagueTier =
  | "bronze"
  | "silver"
  | "gold"
  | "sapphire"
  | "ruby"
  | "emerald"
  | "diamond";

export interface StudentProfile {
  id: string;
  fullName: string;
  gradeLevel: number;
  xp: number;
  coins: number;
  hearts: number;
  lastHeartLostAt: string | null;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  leagueTier: LeagueTier;
  isPremium: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  school: string;
  province: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface LeaderboardResponse {
  league: string;
  resetInHours: number;
  totalParticipants: number;
  promotionThreshold: number;
  demotionThreshold: number;
  standings: LeaderboardEntry[];
}

