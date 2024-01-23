import React from "react";
import { FixturesDto } from "../../../shared-types/fixtures-dto";
import {
  ScrollRestoration,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { DateTime } from "luxon";
import { FixtureList } from "../components/FixtureList";
import { groupByDate } from "../groupByDate";
import { Heading } from "@chakra-ui/react";

export default function Live() {
  const fixtures = useRouteLoaderData("root") as FixturesDto;

  const todaysFixtures = fixtures.fixtures.filter((fixture) => {
    return (
      new Date(fixture.kickoff!).getTime() >
        DateTime.now().setZone("Europe/London").startOf("day").toMillis() &&
      new Date(fixture.kickoff!).getTime() <
        DateTime.now().setZone("Europe/London").endOf("day").toMillis()
    );
  });

  const futureFixtures = fixtures.fixtures.filter((fixture) => {
    return (
      new Date(fixture.kickoff!).getTime() >
      DateTime.now().setZone("Europe/London").endOf("day").toMillis()
    );
  });

  const futureFixturesGrouped = groupByDate(["kickoff"], futureFixtures);

  const firstKey = Object.keys(futureFixturesGrouped)[0];

  return (
    <>
      {todaysFixtures.length > 0 && (
        <>
          <Heading>Today's Games</Heading>
          <FixtureList pressable={true} fixtures={todaysFixtures} />
        </>
      )}
      {todaysFixtures.length === 0 && (
        <>
          <Heading>Next Round</Heading>
          <FixtureList
            pressable={false}
            fixtures={futureFixturesGrouped[firstKey]}
          />
        </>
      )}
    </>
  );
}
