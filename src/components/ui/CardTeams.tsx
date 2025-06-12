import { Team } from "@/types/nba";
import { Heart } from "lucide-react";
import { useNBAStore } from "@/store/useStore";

const CardTeams = ({ team }: { team: Team }) => {
  const { isTeamFavorite, toggleTeamFavorite } = useNBAStore();
  const isFavorite = isTeamFavorite(team.id);
  return (
    <>
      <div className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl p-6 relative">
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTeamFavorite(team.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorite
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <h2 className="text-2xl">{team.full_name}</h2>
        <p>Conference: {team.conference}</p>
        <p>Division: {team.division}</p>
        <p>City: {team.city}</p>
      </div>
    </>
  );
};

export default CardTeams;
