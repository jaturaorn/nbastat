"use client";

import { usePlayersQuery, useTeamsQuery } from "@/hooks/useNBAQuery";
import type { Player, Team } from "@/types/nba";
import React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CardPlayers from "@/components/ui/CardPlayers";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useNBAStore } from "@/store/useStore";
import CardTeams from "@/components/ui/CardTeams";

export default function Home() {
  // Global state
  const {
    activeTab,
    searchTerm,
    setActiveTab,
    setSearchTerm,
    favoritePlayerIds,
    favoriteTeamIds,
  } = useNBAStore();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // API calls ใช้ global state
  const playersQuery = usePlayersQuery(
    debouncedSearchTerm,
    activeTab === "players"
  );
  const teamsQuery = useTeamsQuery(debouncedSearchTerm, activeTab === "teams");

  const data = activeTab === "players" ? playersQuery.data : teamsQuery.data;
  const isLoading =
    activeTab === "players" ? playersQuery.isLoading : teamsQuery.isLoading;
  const error = activeTab === "players" ? playersQuery.error : teamsQuery.error;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto my-6 space-y-3">
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
          <h1 className="text-3xl font-bold">NBA Stats</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>⭐ {favoritePlayerIds.length} Players</span>
            <span>🏀 {favoriteTeamIds.length} Teams</span>
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

        {/* Success State - Players */}
        {!isLoading &&
          data &&
          data.data.length > 0 &&
          activeTab === "players" && (
            <div className="grid grid-cols-3 gap-3 ">
              {(data.data as Player[]).map((player: Player) => (
                <CardPlayers key={player.id} play={player} />
              ))}
            </div>
          )}

        {/* Success State - Teams */}
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

        {/* No Results State - ไม่มี data */}
        {!isLoading && data && data.data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">{`No players found for "${debouncedSearchTerm}"`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
