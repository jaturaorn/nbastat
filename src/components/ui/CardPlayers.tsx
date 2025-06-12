import type { Player } from "@/types/nba";
import React from "react";

const CardPlayers = ({ play }: { play: Player }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl p-6">
        <h2 className="text-2xl ">{`${play.first_name} ${play.last_name}`}</h2>
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
