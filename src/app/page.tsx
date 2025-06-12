"use client";

import { usePlayersQuery, useTeamsQuery } from "@/hooks/useNBAQuery";
import type { Player, Team } from "@/types/nba";
import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CardPlayers from "@/components/ui/CardPlayers";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [switchDisplay, setSwitchDisplay] = useState<"players" | "teams">(
    "players"
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const playersQuery = usePlayersQuery(
    debouncedSearchTerm,
    switchDisplay === "players"
  );
  const teamsQuery = useTeamsQuery(
    debouncedSearchTerm,
    switchDisplay === "teams"
  );

  // Get current data based on active tab
  const data =
    switchDisplay === "players" ? playersQuery.data : teamsQuery.data;
  const isLoading =
    switchDisplay === "players" ? playersQuery.isLoading : teamsQuery.isLoading;
  const error =
    switchDisplay === "players" ? playersQuery.error : teamsQuery.error;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function setActiveTAb(category: "players" | "teams") {
    setSwitchDisplay(category);
  }

  console.log("Current tab:", switchDisplay);
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto my-6 space-y-3">
        <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
        <div className="flex gap-3">
          <button
            className={`${
              switchDisplay == "players" ? "btn-primary" : "buttonSoftLight"
            } transition-colors`}
            onClick={() => setActiveTAb("players")}
          >
            Players
          </button>
          <button
            className={`${
              switchDisplay == "teams" ? "btn-primary" : "buttonSoftLight"
            } transition-colors`}
            onClick={() => setActiveTAb("teams")}
          >
            Teams
          </button>
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
          switchDisplay === "players" && (
            <div className="grid grid-cols-3 gap-3">
              {(data.data as Player[]).map((player: Player) => (
                <CardPlayers key={player.id} play={player} />
              ))}
            </div>
          )}

        {/* Success State - Teams */}
        {!isLoading &&
          data &&
          data.data.length > 0 &&
          switchDisplay === "teams" && (
            <div className="grid grid-cols-3 gap-3">
              {(data.data as Team[]).map((team: Team) => (
                <div
                  key={team.id}
                  className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl p-6"
                >
                  <h2 className="text-2xl">{team.full_name}</h2>
                  <p>Conference: {team.conference}</p>
                  <p>Division: {team.division}</p>
                  <p>City: {team.city}</p>
                </div>
              ))}
            </div>
          )}

        {/* No Results State - ไม่มี data */}
        {!isLoading && data && data.data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">{`No players found for "{debouncedSearchTerm}"`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
