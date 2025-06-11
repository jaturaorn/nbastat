"use client";

import { usePlayersQuery } from "@/hooks/useNBAQuery";
import type { Player } from "@/types/nba";
import React from "react";

export default function Home() {
  const { data, isLoading, error } = usePlayersQuery();
  // const [isLoading, setIsLoading] = useState(false);
  // const [result, setResult] = useState<string>("");

  // const handleTestAPI = async () => {
  //   setIsLoading(true);
  //   setResult("");

  //   try {
  //     const success = await testAPIConnection();
  //     setResult(
  //       success ? "✅ API Connection Success!" : "❌ API Connection Failed!"
  //     );
  //   } catch (error) {
  //     setResult(
  //       "❌ Error: " +
  //         (error instanceof Error ? error.message : "Unknown error")
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  console.log(data);
  console.log("First player:", data?.data[0]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto my-6">
        <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
        {isLoading && <p>Loading players...</p>}
        {error && <p>there is err</p>}
        <div className="grid grid-cols-3 gap-3">
          {data && (
            <>
              {data.data.map((player: Player) => (
                <React.Fragment key={player.id}>
                  <div className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl p-6">
                    <h2 className="text-2xl ">{`${player.first_name} ${player.last_name}`}</h2>
                    <h4 className="text-lg">
                      draftNumber: {player.draft_number}
                    </h4>
                    <p>Position: {player.position}</p>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl">Team Info</h3>
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg">{player.team?.full_name}</h4>
                        <h4 className="text-lg">#{player?.jersey_number}</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-lg">{player?.height}</h4>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
