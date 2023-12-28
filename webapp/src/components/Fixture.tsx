import { Card, CardBody, Text } from "@chakra-ui/react";
import { split, pipe, filter, join } from "ramda";
import { Logo } from "./Logo";
import { FixtureDto } from "../../../shared-types/fixtures-dto";

const formatName = (name: string) => {
  return pipe(
    split(" "),
    filter((x) => x !== "W"),
    join(" ")
  )(name);
};

export const Fixture = ({ fixture }: { fixture: FixtureDto }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 50px",
      }}
    >
      <Logo
        logoUrl={`https://media.api-sports.io/football/teams/${fixture.home_team_football_api_id}.png`}
      />
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {fixture.home_team_score}
      </Text>
      <Text>{`${formatName(fixture.home_team.name)} vs ${formatName(
        fixture.away_team.name
      )}`}</Text>
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {fixture.away_team_score}
      </Text>
      <Logo
        logoUrl={`https://media.api-sports.io/football/teams/${fixture.away_team_football_api_id}.png`}
      />
    </div>
  );
};
