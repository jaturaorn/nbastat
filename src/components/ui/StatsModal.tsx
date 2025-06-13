import { X, TrendingUp, Award, Target, Clock, Hash } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Player } from "@/types/nba";
import {
  generateRealisticStats,
  getPerGameChartData,
  getShootingChartData,
} from "@/utils/mockStatsGenerator";

interface DataMock {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

const StatsModal = ({ player, isOpen, onClose }: DataMock) => {
  if (!isOpen) return null;

  // ✨ Generate realistic stats based on player data
  const stats = generateRealisticStats(player);
  const perGameData = getPerGameChartData(stats);
  const shootingData = getShootingChartData(stats);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header - ใช้ข้อมูลจริง */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {player.first_name[0]}
              {player.last_name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {player.first_name} {player.last_name}
              </h2>
              <p className="text-gray-600">
                {player.team?.full_name || "Free Agent"} • #
                {player.jersey_number || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                {player.position} • {player.height || "N/A"} •{" "}
                {player.weight || "N/A"} lbs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Player Info Cards - ข้อมูลจริง */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Hash className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-900">
                {player.draft_number || "Undrafted"}
              </div>
              <div className="text-blue-700 text-xs">Draft Pick</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-900">
                {player.draft_year || "N/A"}
              </div>
              <div className="text-green-700 text-xs">Draft Year</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Award className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-900">
                {stats.games_played}
              </div>
              <div className="text-orange-700 text-xs">Games Played</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-900">
                {stats.minutes_per_game}
              </div>
              <div className="text-purple-700 text-xs">Minutes/Game</div>
            </div>
          </div>

          {/* Key Stats Cards - Generated Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {stats.points_per_game}
              </div>
              <div className="text-blue-700 text-sm">Points Per Game</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                {stats.assists_per_game}
              </div>
              <div className="text-green-700 text-sm">Assists Per Game</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">
                {stats.rebounds_per_game}
              </div>
              <div className="text-orange-700 text-sm">Rebounds Per Game</div>
            </div>
          </div>

          {/* Per Game Stats Chart */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Per Game Statistics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={perGameData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value, name) => [`${value}`, name]}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Shooting Percentages Chart */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shooting Efficiency (%)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={shootingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value, name) => [
                    `${Number(value).toFixed(1)}%`,
                    name,
                  ]}
                />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Advanced Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Advanced Statistics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-900">
                  {stats.player_efficiency_rating}
                </div>
                <div className="text-purple-700 text-sm">
                  Player Efficiency Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">
                  {(stats.true_shooting_percentage * 100).toFixed(1)}%
                </div>
                <div className="text-blue-700 text-sm">True Shooting %</div>
              </div>
            </div>
          </div>

          {/* Player Background - Real Data */}
          {(player.college || player.country) && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Background
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {player.college && (
                  <div>
                    <span className="font-medium text-gray-700">College:</span>
                    <span className="ml-2 text-gray-600">{player.college}</span>
                  </div>
                )}
                {player.country && (
                  <div>
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="ml-2 text-gray-600">{player.country}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
