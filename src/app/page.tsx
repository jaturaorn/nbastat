"use client";

import { usePlayersQuery, useTeamsQuery } from "@/hooks/useNBAQuery";
import type { Player, Team } from "@/types/nba";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CardPlayers from "@/components/ui/CardPlayers";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useNBAStore } from "@/store/useStore";
import CardTeams from "@/components/ui/CardTeams";
import { Star, Trash2 } from "lucide-react";
import StatsModal from "@/components/ui/StatsModal";

export default function Home() {
  // Global state
  const {
    activeTab,
    searchTerm,
    showFavoritesOnly,
    favoritePlayerIds, // ✨ เพิ่มนี้
    favoriteTeamIds, // ✨ เพิ่มนี้
    setActiveTab,
    setSearchTerm,
    toggleFavoritesFilter,
    getFavoritesCount,
    clearAllFavorites,
  } = useNBAStore();

  // ✨ เพิ่ม hydration guard
  const [isClient, setIsClient] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // ✨ เฉพาะ client เท่านั้นที่ใช้ favorites count
  const favoritesCount = isClient
    ? getFavoritesCount()
    : { players: 0, teams: 0, total: 0 };

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // API calls ใช้ global state
  const playersQuery = usePlayersQuery(
    debouncedSearchTerm,
    activeTab === "players"
  );
  const teamsQuery = useTeamsQuery(debouncedSearchTerm, activeTab === "teams");

  // 🎯 Smart Data Selection
  const rawData = activeTab === "players" ? playersQuery.data : teamsQuery.data;
  const isLoading =
    activeTab === "players" ? playersQuery.isLoading : teamsQuery.isLoading;
  const error = activeTab === "players" ? playersQuery.error : teamsQuery.error;

  // ✨ Apply favorites filter
  const data = React.useMemo(() => {
    if (!rawData || !showFavoritesOnly) return rawData;

    if (activeTab === "players") {
      const filteredPlayers = (rawData.data as Player[]).filter(
        (player: Player) => favoritePlayerIds.includes(player.id)
      );
      return { ...rawData, data: filteredPlayers };
    } else {
      const filteredTeams = (rawData.data as Team[]).filter((team: Team) =>
        favoriteTeamIds.includes(team.id)
      );
      return { ...rawData, data: filteredTeams };
    }
  }, [
    rawData,
    showFavoritesOnly,
    activeTab,
    favoritePlayerIds,
    favoriteTeamIds,
  ]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  // ✨ Player click handler
  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  // ✨ Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto my-6 space-y-3">
        <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
        <div className="flex gap-3">
          <button
            className={`${
              activeTab == "players" ? "btn-primary" : "buttonSoftLight"
            } transition-colors`}
            onClick={() => setActiveTab("players")}
          >
            Players
          </button>
          <button
            className={`${
              activeTab == "teams" ? "btn-primary" : "buttonSoftLight"
            } transition-colors`}
            onClick={() => setActiveTab("teams")}
          >
            Teams
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">NBA Stats</h2>
          <div className="flex items-center gap-4">
            {/* Favorites Filter Button */}
            <button
              onClick={toggleFavoritesFilter}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showFavoritesOnly
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Star
                className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`}
              />
              {showFavoritesOnly ? "Show All" : "Favorites Only"}
              {favoritesCount.total > 0 && (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    showFavoritesOnly
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {favoritesCount.total}
                </span>
              )}
            </button>

            {/* Clear All Button */}
            {isClient && favoritesCount.total > 0 && (
              <button
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}

            {/* Favorites Counter */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>⭐ {favoritesCount.players} Players</span>
              <span>🏀 {favoritesCount.teams} Teams</span>
            </div>
          </div>
        </div>
        <input
          value={searchTerm}
          onChange={handleChange}
          className=" w-full bg-black/60 p-3 rounded-xl text-white outline-none"
          placeholder="Search players, teams"
        />
        {isLoading && (
          <div className="grid grid-cols-3 gap-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
          </div>
        )}

        {error && <p>there is err</p>}

        {/* ✅ Success State - Players */}
        {!isLoading &&
          data &&
          data.data.length > 0 &&
          activeTab === "players" && (
            <div className="grid grid-cols-3 gap-3 ">
              {(data.data as Player[]).map((player: Player) => (
                <CardPlayers
                  key={player.id}
                  play={player}
                  onClick={handlePlayerClick}
                />
              ))}
            </div>
          )}

        {/* ✅ Success State - Teams */}
        {!isLoading &&
          data &&
          data.data.length > 0 &&
          activeTab === "teams" && (
            <div className="grid grid-cols-3 gap-3 ">
              {(data.data as Team[]).map((team: Team) => (
                <CardTeams key={team.id} team={team} />
              ))}
            </div>
          )}

        {/* 🚫 Empty State */}
        {!isLoading && data && data.data.length === 0 && (
          <div className="text-center py-8">
            {showFavoritesOnly ? (
              <div>
                <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  No favorite {activeTab} yet
                </p>
                <p className="text-gray-400 text-sm">
                  Click the ❤️ on cards to add favorites
                </p>
              </div>
            ) : (
              <p className="text-gray-500">{`No ${activeTab} found for "${debouncedSearchTerm}"`}</p>
            )}
          </div>
        )}

        {isModalOpen && selectedPlayer && (
          <StatsModal
            player={selectedPlayer}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
