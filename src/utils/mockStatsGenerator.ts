// src/utils/mockStatsGenerator.ts
import type { Player } from "@/types/nba";

interface PlayerStats {
  // Per Game Stats
  points_per_game: number;
  assists_per_game: number;
  rebounds_per_game: number;
  steals_per_game: number;
  blocks_per_game: number;

  // Shooting Percentages
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;

  // Advanced Stats
  player_efficiency_rating: number;
  true_shooting_percentage: number;
  games_played: number;
  minutes_per_game: number;
}

// กำหนด type สำหรับ position keys
type PositionKey = "PG" | "SG" | "SF" | "PF" | "C" | "G" | "F" | "G-F" | "F-C";

// Seeded random number generator (consistent results)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Position-based stat multipliers
const positionMultipliers = {
  PG: { points: 0.9, assists: 1.4, rebounds: 0.7, blocks: 0.3 },
  SG: { points: 1.2, assists: 0.8, rebounds: 0.8, blocks: 0.4 },
  SF: { points: 1.1, assists: 1.0, rebounds: 1.0, blocks: 0.6 },
  PF: { points: 1.0, assists: 0.6, rebounds: 1.3, blocks: 1.0 },
  C: { points: 0.9, assists: 0.4, rebounds: 1.5, blocks: 1.4 },
  G: { points: 1.0, assists: 1.1, rebounds: 0.75, blocks: 0.35 },
  F: { points: 1.05, assists: 0.8, rebounds: 1.15, blocks: 0.8 },
  "G-F": { points: 1.0, assists: 0.95, rebounds: 0.9, blocks: 0.5 },
  "F-C": { points: 0.95, assists: 0.5, rebounds: 1.4, blocks: 1.2 },
};

// Helper function เพื่อตรวจสอบว่า position เป็น valid key หรือไม่
function isValidPosition(position: string): position is PositionKey {
  return position in positionMultipliers;
}

export function generateRealisticStats(player: Player): PlayerStats {
  const seed = player.id;
  const position = player.position || "SF";
  const multiplier = isValidPosition(position)
    ? positionMultipliers[position]
    : positionMultipliers["SF"];

  // Base stats with position adjustments
  const basePoints = 12 + seededRandom(seed) * 18; // 12-30 PPG
  const baseAssists = 2 + seededRandom(seed + 1) * 8; // 2-10 APG
  const baseRebounds = 4 + seededRandom(seed + 2) * 8; // 4-12 RPG
  const baseMinutes = 20 + seededRandom(seed + 3) * 18; // 20-38 MPG

  return {
    // Per Game Stats (adjusted by position)
    points_per_game: Number((basePoints * multiplier.points).toFixed(1)),
    assists_per_game: Number((baseAssists * multiplier.assists).toFixed(1)),
    rebounds_per_game: Number((baseRebounds * multiplier.rebounds).toFixed(1)),
    steals_per_game: Number((0.5 + seededRandom(seed + 4) * 2).toFixed(1)), // 0.5-2.5
    blocks_per_game: Number(
      (seededRandom(seed + 5) * 2.5 * multiplier.blocks).toFixed(1)
    ),

    // Shooting Percentages
    field_goal_percentage: Number(
      (0.35 + seededRandom(seed + 6) * 0.25).toFixed(3)
    ), // 35-60%
    three_point_percentage: Number(
      (0.25 + seededRandom(seed + 7) * 0.25).toFixed(3)
    ), // 25-50%
    free_throw_percentage: Number(
      (0.65 + seededRandom(seed + 8) * 0.25).toFixed(3)
    ), // 65-90%

    // Advanced Stats
    player_efficiency_rating: Number(
      (10 + seededRandom(seed + 9) * 20).toFixed(1)
    ), // 10-30
    true_shooting_percentage: Number(
      (0.45 + seededRandom(seed + 10) * 0.25).toFixed(3)
    ), // 45-70%

    // Game Info
    games_played: Math.floor(45 + seededRandom(seed + 11) * 35), // 45-80 games
    minutes_per_game: Number(baseMinutes.toFixed(1)),
  };
}

// Chart data transformers
export function getPerGameChartData(stats: PlayerStats) {
  return [
    { name: "PPG", value: stats.points_per_game, color: "#3B82F6" },
    { name: "APG", value: stats.assists_per_game, color: "#10B981" },
    { name: "RPG", value: stats.rebounds_per_game, color: "#F59E0B" },
    { name: "SPG", value: stats.steals_per_game, color: "#EF4444" },
    { name: "BPG", value: stats.blocks_per_game, color: "#8B5CF6" },
  ];
}

export function getShootingChartData(stats: PlayerStats) {
  return [
    { name: "FG%", value: stats.field_goal_percentage * 100, color: "#06B6D4" },
    {
      name: "3P%",
      value: stats.three_point_percentage * 100,
      color: "#84CC16",
    },
    { name: "FT%", value: stats.free_throw_percentage * 100, color: "#F97316" },
  ];
}
