import { Card, CardBody, Text } from "@chakra-ui/react";
import { FixturesDocument } from "../types/fixtures";
import { split, pipe, filter, join } from "ramda";
import { LogoDocument } from "../types/logo";
import { Logo } from "./Logo";

const formatName = (name: string) => {
  return pipe(
    split(" "),
    filter((x) => x !== "W"),
    join(" ")
  )(name);
};

export const Fixture = ({
  fixture,
  logos,
}: {
  fixture: FixturesDocument;
  logos: LogoDocument[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: "10px",
      }}
    >
      <Logo logoUrl={fixture.teams.home.logo} logos={logos} />
      <Text>{`${formatName(fixture.teams.home.name)} vs ${formatName(
        fixture.teams.away.name
      )}`}</Text>
      <Logo logoUrl={fixture.teams.away.logo} logos={logos} />
    </div>
  );
};
