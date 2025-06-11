// Base API Response from balldontlie
export interface APIResponse<T> {
  data: T[];
  meta: {
    next_cursor?: number;
    per_page: number;
  };
}

// Player (from balldontlie free tier)
export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height?: string;
  weight?: string;
  jersey_number?: string;
  college?: string;
  country?: string;
  draft_year?: number;
  draft_round?: number;
  draft_number?: number;
  team?: Team;
}

// Team (from balldontlie free tier)
export interface Team {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

// Game (from balldontlie free tier)
export interface Game {
  id: number;
  date: string;
  season: number;
  status: string;
  period?: number;
  time?: string;
  postseason: boolean;
  home_team_score?: number;
  visitor_team_score?: number;
  home_team: Team;
  visitor_team: Team;
}
