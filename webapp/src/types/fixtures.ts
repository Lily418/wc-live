export type FixturesTeam = {
  name: string;
  logo: string;
};

export type FixturesDocument = {
  teams: {
    away: FixturesTeam;
    home: FixturesTeam;
  };
};
