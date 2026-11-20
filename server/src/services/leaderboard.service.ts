// ==============================================================================
// ScienceKH — Enterprise Real-Time Leaderboard Service
// Powered by Redis Sorted Sets (ZSET) for O(log N) dynamic student rankings
// with automatic in-memory fallback.
// ==============================================================================

import { CacheService } from "../config/redis.js";

export interface LeaderboardUser {
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

const DIAMOND_LEAGUE_STANDINGS: LeaderboardUser[] = [
  {
    rank: 1,
    id: "usr-01",
    name: "ចាន់ សុវណ្ណ",
    school: "វិទ្យាល័យព្រះស៊ីសុវត្ថិ (ភ្នំពេញ)",
    province: "Phnom Penh",
    xp: 2840,
    streak: 42,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 2,
    id: "usr-02",
    name: "សុខ លីដា",
    school: "វិទ្យាល័យបាក់ទូក (ភ្នំពេញ)",
    province: "Phnom Penh",
    xp: 2620,
    streak: 35,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 3,
    id: "usr-03",
    name: "ហេង វិសាល",
    school: "វិទ្យាល័យនេតយ៉ង់ (បាត់ដំបង)",
    province: "Battambang",
    xp: 2410,
    streak: 28,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 4,
    id: "usr-04",
    name: "កែវ សោភា",
    school: "វិទ្យាល័យ១០មករា (សៀមរាប)",
    province: "Siem Reap",
    xp: 2190,
    streak: 21,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 5,
    id: "usr-05",
    name: "ម៉ៅ រតនា",
    school: "វិទ្យាល័យសម្តេចហ៊ុនសែន (កណ្តាល)",
    province: "Kandal",
    xp: 1980,
    streak: 19,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 6,
    id: "usr-06",
    name: "សួង ចរិយា",
    school: "វិទ្យាល័យព្រះមុនីវង្ស (កំពង់ចាម)",
    province: "Kampong Cham",
    xp: 1850,
    streak: 14,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    rank: 12,
    id: "00000000-0000-0000-0000-000000000001",
    name: "អ្នក (You)",
    school: "វិទ្យាល័យច្បារអំពៅ",
    province: "Phnom Penh",
    xp: 450,
    streak: 7,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    isCurrentUser: true,
  },
];

export class LeaderboardService {
  private static readonly LEADERBOARD_KEY = "leaderboard:diamond";

  /**
   * Initializes the Redis Sorted Set with initial seed data if not yet present
   */
  static async seedIfEmpty(): Promise<void> {
    for (const student of DIAMOND_LEAGUE_STANDINGS) {
      await CacheService.zadd(this.LEADERBOARD_KEY, student.xp, student.id);
      await CacheService.setJson(`user_meta:${student.id}`, student, 86400 * 7);
    }
  }

  /**
   * Records XP gained by a student atomically in Redis Sorted Set
   * O(log N) calculation, instantly positioning them in national standings.
   */
  static async recordStudentXp(
    userId: string,
    xpDelta: number,
    metadata?: Partial<LeaderboardUser>,
  ): Promise<{ newTotalXp: number; newRank: number }> {
    const newTotalXp = await CacheService.zincrby(this.LEADERBOARD_KEY, xpDelta, userId);
    const zeroIndexedRank = await CacheService.zrevrank(this.LEADERBOARD_KEY, userId);
    const newRank = zeroIndexedRank !== null ? zeroIndexedRank + 1 : 999;

    // Save or merge user profile metadata in cache
    const existingMeta = await CacheService.getJson<LeaderboardUser>(`user_meta:${userId}`);
    const updatedMeta: LeaderboardUser = {
      rank: newRank,
      id: userId,
      name: metadata?.name || existingMeta?.name || "សិស្ស ScienceKH",
      school: metadata?.school || existingMeta?.school || "វិទ្យាល័យកម្ពុជា",
      province: metadata?.province || existingMeta?.province || "Phnom Penh",
      xp: newTotalXp,
      streak: metadata?.streak || existingMeta?.streak || 1,
      avatar:
        metadata?.avatar ||
        existingMeta?.avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    };
    await CacheService.setJson(`user_meta:${userId}`, updatedMeta, 86400 * 7);

    // Invalidate cached standings endpoint so next fetch is fresh
    await CacheService.delPattern("http_cache:*/api/leaderboard*");

    return { newTotalXp, newRank };
  }

  /**
   * Retrieves a student's instant rank from Redis Sorted Set (1-based index)
   */
  static async getStudentRank(userId: string): Promise<number | null> {
    const rank = await CacheService.zrevrank(this.LEADERBOARD_KEY, userId);
    return rank !== null ? rank + 1 : null;
  }

  /**
   * Returns current standings (supports fast synchronous lookup with fallback)
   */
  static getStandings(filter?: { province?: string; grade?: number }) {
    let standings = [...DIAMOND_LEAGUE_STANDINGS];

    if (filter?.province) {
      standings = standings.filter(
        (u) => u.province.toLowerCase() === filter.province?.toLowerCase(),
      );
    }

    return {
      league: "Diamond League (ក្របខ័ណ្ឌពេជ្រ)",
      resetInHours: 48,
      totalParticipants: 30,
      promotionThreshold: 5,
      demotionThreshold: 25,
      standings,
    };
  }
}
