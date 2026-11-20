import { ApiClient } from "./client";
import type { LeaderboardEntry } from "@/types/gamification";

export class LeaderboardApiService {
  /**
   * Fetch current leaderboard standings
   */
  static async getStandings(filter?: { province?: string; grade?: number }) {
    return ApiClient.get<LeaderboardEntry[]>("/api/leaderboard/standings", filter);
  }
}

