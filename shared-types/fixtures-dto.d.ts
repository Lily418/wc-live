export interface TeamDto {
  name: string;
}

export interface EventDto {
  id: number;
  time_elapsed: number;
  time_elapsed_extra: number | null;
  type: "goal" | "card" | "subst";
  teamId: number;
  playerId: number;
  playerName: string;
  assistId: number | null;
  assistName: string | null;
  fixtureId: number;
}

export interface LineupPlayerDto {
  id: number;
  playerId: number;
  teamId: number;
  fixtureId: number;
  playerNumber: number;
  playerName: string;
  substitute: boolean;
}

export interface LineupCoachDto {
  id: number;
  fixtureId: number;
  teamId: number;
  name: string;
}

export interface FixtureSummaryDto {
  id: number;
  home_team_football_api_id: number;
  away_team_football_api_id: number;
  home_team_score: number | null;
  away_team_score: number | null;
  away_team: TeamDto;
  home_team: TeamDto;
  kickoff: string | null;
}

export type FixtureDto = FixtureSummaryDto & {
  events: EventDto[];
  lineupPlayers: LineupPlayerDto[];
  lineupCoaches: LineupCoachDto[];
};

export interface FixturesDto {
  fixtures: FixtureSummaryDto[];
}
