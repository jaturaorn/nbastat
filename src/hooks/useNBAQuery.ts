"use client";

import { useQuery } from "@tanstack/react-query";
import { balldontlieAPI } from "@/utils/api";

// Hook สำหรับ fetch players
const usePlayersQuery = (search?: string, enabled = true) => {
  return useQuery({
    queryKey: ["players", search],
    queryFn: () => balldontlieAPI.getPlayers(search),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

const useTeamsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => balldontlieAPI.getTeams(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export { usePlayersQuery, useTeamsQuery };
