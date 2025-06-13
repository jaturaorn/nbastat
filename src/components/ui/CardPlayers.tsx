import type { Player } from "@/types/nba";
import React from "react";
import { Heart } from "lucide-react";
import { useNBAStore } from "@/store/useStore";

const CardPlayers = ({
  play,
  onClick,
}: {
  play: Player;
  onClick?: (player: Player) => void;
}) => {
  const { isPlayerFavorite, togglePlayerFavorite } = useNBAStore();
  const isFavorite = isPlayerFavorite(play.id);

  // ✨ Handler function ที่ wrap onClick prop
  const handleCardClick = () => {
    if (onClick) {
      onClick(play); // ส่ง player object ไป
    }
  };
  return (
    <React.Fragment>
      <div
        onClick={handleCardClick}
        className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl p-6 relative cursor-pointer"
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ป้องกัน card click
            togglePlayerFavorite(play.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorite
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <h2 className="text-2xl pr-12">{`${play.first_name} ${play.last_name}`}</h2>
        <h4 className="text-lg">draftNumber: {play.draft_number}</h4>
        <p>Position: {play.position}</p>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl">Team Info</h3>
          <div className="flex justify-between items-center">
            <h4 className="text-lg">{play.team?.full_name}</h4>
            <h4 className="text-lg">#{play?.jersey_number}</h4>
          </div>
          <div className="flex justify-between">
            <h4 className="text-lg">{play?.height}</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardPlayers;
