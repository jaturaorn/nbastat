"use client";

import { usePlayersQuery } from "@/hooks/useNBAQuery";
import type { Player } from "@/types/nba";

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
        {isLoading && <p>Loading players...</p>}
        {error && <p>there is err</p>}
        {data && (
          <>
            {data.data.map((player: Player) => (
              <div key={player.id}>
                <h2 className="text-2xl ">{`${player.first_name} ${player.last_name}`}</h2>
                <h4 className="text-xl">draftNumber: {player.draft_number}</h4>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
