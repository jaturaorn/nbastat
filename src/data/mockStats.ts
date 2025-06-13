// Mock advanced stats data
const mockStats = {
  points_per_game: 25.7,
  assists_per_game: 7.3,
  rebounds_per_game: 8.3,
  steals_per_game: 1.3,
  blocks_per_game: 0.6,
  field_goal_percentage: 0.54,
  three_point_percentage: 0.41,
  free_throw_percentage: 0.731,
  player_efficiency_rating: 25.7,
  true_shooting_percentage: 0.618,
};

// Chart data transformation
const chartData = [
  { name: "PPG", value: mockStats.points_per_game, color: "#3B82F6" },
  { name: "APG", value: mockStats.assists_per_game, color: "#10B981" },
  { name: "RPG", value: mockStats.rebounds_per_game, color: "#F59E0B" },
  { name: "SPG", value: mockStats.steals_per_game, color: "#EF4444" },
  { name: "BPG", value: mockStats.blocks_per_game, color: "#8B5CF6" },
];

const percentageData = [
  {
    name: "FG%",
    value: mockStats.field_goal_percentage * 100,
    color: "#06B6D4",
  },
  {
    name: "3P%",
    value: mockStats.three_point_percentage * 100,
    color: "#84CC16",
  },
  {
    name: "FT%",
    value: mockStats.free_throw_percentage * 100,
    color: "#F97316",
  },
];

export { mockStats, chartData, percentageData };
