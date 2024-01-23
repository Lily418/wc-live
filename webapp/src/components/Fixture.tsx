import { Card, CardBody, Text } from "@chakra-ui/react";
import { split, pipe, filter, join } from "ramda";
import { Logo } from "./Logo";
import { FixtureSummaryDto } from "../../../shared-types/fixtures-dto";
import { Link } from "react-router-dom";
import { formatName } from "../utils/formatName";

export const Fixture = ({ fixture }: { fixture: FixtureSummaryDto }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 50px",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      <Logo
        logoUrl={`https://media.api-sports.io/football/teams/${fixture.home_team.football_api_id}.png`}
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
        logoUrl={`https://media.api-sports.io/football/teams/${fixture.away_team.football_api_id}.png`}
      />
    </div>
  );
};
