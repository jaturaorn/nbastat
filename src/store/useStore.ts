// src/store/useStore.ts
import { create } from "zustand";
import type { Player, Team } from "@/types/nba";

interface NBAStore {
  // UI State
  activeTab: "players" | "teams";
  searchTerm: string;

  // Selected Data
  selectedPlayer: Player | null;
  selectedTeam: Team | null;

  // Favorites
  favoritePlayerIds: number[];
  favoriteTeamIds: number[];

  // Actions - UI
  setActiveTab: (tab: "players" | "teams") => void;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;

  // Actions - Selected Data
  setSelectedPlayer: (player: Player | null) => void;
  setSelectedTeam: (team: Team | null) => void;

  // Actions - Favorites
  togglePlayerFavorite: (playerId: number) => void;
  toggleTeamFavorite: (teamId: number) => void;
  isPlayerFavorite: (playerId: number) => boolean;
  isTeamFavorite: (teamId: number) => boolean;
  clearAllFavorites: () => void;
}

export const useNBAStore = create<NBAStore>((set, get) => ({
  // Initial State
  activeTab: "players",
  searchTerm: "",
  selectedPlayer: null,
  selectedTeam: null,
  favoritePlayerIds: [],
  favoriteTeamIds: [],

  // UI Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  clearSearch: () => set({ searchTerm: "" }),

  // Selected Data Actions
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setSelectedTeam: (team) => set({ selectedTeam: team }),

  // Favorites Actions
  togglePlayerFavorite: (playerId) =>
    set((state) => ({
      favoritePlayerIds: state.favoritePlayerIds.includes(playerId)
        ? state.favoritePlayerIds.filter((id) => id !== playerId)
        : [...state.favoritePlayerIds, playerId],
    })),

  toggleTeamFavorite: (teamId) =>
    set((state) => ({
      favoriteTeamIds: state.favoriteTeamIds.includes(teamId)
        ? state.favoriteTeamIds.filter((id) => id !== teamId)
        : [...state.favoriteTeamIds, teamId],
    })),

  isPlayerFavorite: (playerId) => get().favoritePlayerIds.includes(playerId),
  isTeamFavorite: (teamId) => get().favoriteTeamIds.includes(teamId),

  clearAllFavorites: () =>
    set({
      favoritePlayerIds: [],
      favoriteTeamIds: [],
    }),
}));
