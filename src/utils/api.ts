import axios from "axios";
import type { APIResponse, Player, Team } from "@/types/nba";

const BASE_URL = "https://api.balldontlie.io/v1";

// Create axios instance with API key
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY || "",
  },
});

// ✅ Define proper parameter types
interface PlayerQueryParams {
  per_page: number;
  search?: string;
}

// Basic API functions
export const balldontlieAPI = {
  // Test connection
  getPlayers: async (search?: string) => {
    const params: PlayerQueryParams = { per_page: 10 };
    if (search) params.search = search;

    const response = await api.get<APIResponse<Player>>("/players", { params });
    return response.data;
  },

  // Get teams
  getTeams: async (search?: string) => {
    const params: { per_page: number; search?: string } = { per_page: 30 };
    if (search) params.search = search;
    const response = await api.get<APIResponse<Team>>("/teams", { params });
    const currentTeams = response.data.data.filter(
      (team) =>
        team.conference.trim() !== "" &&
        team.division.trim() !== "" &&
        team.conference !== "    " // ไม่ใช่ช่องว่าง
    );
    return {
      ...response.data,
      data: currentTeams,
    };
  },
};

// Test function
export const testAPIConnection = async () => {
  try {
    const data = await balldontlieAPI.getPlayers();
    console.log("✅ API Connection Success:", data);
    return true;
  } catch (error) {
    console.error("❌ API Connection Failed:", error);
    return false;
  }
};
