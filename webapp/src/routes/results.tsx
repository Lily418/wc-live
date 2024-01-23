import React from "react";
import { FixturesDto } from "../../../shared-types/fixtures-dto";
import { useRouteLoaderData } from "react-router-dom";
import { FixtureList } from "../components/FixtureList";
import { DateTime } from "luxon";

export default function Results() {
  const fixtures = useRouteLoaderData("root") as FixturesDto;

  return (
    <FixtureList
      pressable={true}
      fixtures={fixtures.fixtures.filter((fixture) => {
        return (
          new Date(fixture.kickoff!).getTime() <
          DateTime.now().setZone("Europe/London").startOf("day").toMillis()
        );
      })}
    />
  );
}
