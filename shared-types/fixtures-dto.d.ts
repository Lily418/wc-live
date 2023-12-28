export interface TeamDto {
  name: string;
}

export interface FixtureDto {
  id: number;
  home_team_football_api_id: number;
  away_team_football_api_id: number;
  home_team_score: number | null;
  away_team_score: number | null;
  away_team: TeamDto;
  home_team: TeamDto;
  kickoff: string | null;
}

export interface FixturesDto {
  fixtures: FixtureDto[];
}
