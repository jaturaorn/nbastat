"use client";

import { usePlayersQuery } from "@/hooks/useNBAQuery";
import type { Player } from "@/types/nba";
import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CardPlayers from "@/components/ui/CardPlayers";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, error } = usePlayersQuery(debouncedSearchTerm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto my-6 space-y-3">
        <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
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

        {!isLoading && data && data.data.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {data.data.map((player: Player) => (
              <CardPlayers key={player.id} play={player} />
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
