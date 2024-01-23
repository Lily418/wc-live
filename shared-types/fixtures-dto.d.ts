export interface TeamDto {
  id: number;
  football_api_id: number;
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
  detail: string | null;
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
  home_team_score: number | null;
  away_team_score: number | null;
  away_team: TeamDto;
  home_team: TeamDto;
  kickoff: string | null;
}

export type FixtureDto = FixtureSummaryDto & {
  events: EventDto[];
  lineupPlayersHome: LineupPlayerDto[];
  lineupPlayersAway: LineupPlayerDto[];
  lineupCoachesHome: LineupCoachDto[];
  lineupCoachesAway: LineupCoachDto[];
};

export interface FixturesDto {
  fixtures: FixtureSummaryDto[];
}
