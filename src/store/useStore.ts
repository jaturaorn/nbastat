// src/store/useStore.ts
import { create } from "zustand";
import type { Player, Team } from "@/types/nba";
import { persist, createJSONStorage } from "zustand/middleware";

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

  showFavoritesOnly: boolean;

  toggleFavoritesFilter: () => void;
  getFavoritesCount: () => { players: number; teams: number; total: number };
}

export const useNBAStore = create<NBAStore>()(
  persist(
    (set, get) => ({
      // Initial State
      activeTab: "players",
      searchTerm: "",
      selectedPlayer: null,
      selectedTeam: null,
      favoritePlayerIds: [], // จะถูก restore จาก localStorage
      favoriteTeamIds: [], // จะถูก restore จาก localStorage
      showFavoritesOnly: false,

      // ... all existing actions (ไม่เปลี่ยนอะไร)
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      clearSearch: () => set({ searchTerm: "" }),

      setSelectedPlayer: (player) => set({ selectedPlayer: player }),
      setSelectedTeam: (team) => set({ selectedTeam: team }),

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

      isPlayerFavorite: (playerId) =>
        get().favoritePlayerIds.includes(playerId),
      isTeamFavorite: (teamId) => get().favoriteTeamIds.includes(teamId),

      clearAllFavorites: () =>
        set({
          favoritePlayerIds: [],
          favoriteTeamIds: [],
        }),

      toggleFavoritesFilter: () =>
        set((state) => ({
          showFavoritesOnly: !state.showFavoritesOnly,
        })),

      getFavoritesCount: () => {
        const state = get();
        return {
          players: state.favoritePlayerIds.length,
          teams: state.favoriteTeamIds.length,
          total: state.favoritePlayerIds.length + state.favoriteTeamIds.length,
        };
      },
    }),
    {
      name: "nba-app-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // เก็บเฉพาะ favorites ใน localStorage
        favoritePlayerIds: state.favoritePlayerIds,
        favoriteTeamIds: state.favoriteTeamIds,
      }),
    }
  )
);
