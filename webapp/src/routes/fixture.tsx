import React, { useEffect } from "react";
import { useState } from "react";
import { FixtureDto } from "../../../shared-types/fixtures-dto";
import { useLoaderData, useParams } from "react-router-dom";
import { Fixture } from "../components/Fixture";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Lineup } from "../components/Lineup";
import { Events } from "../components/Events";

export default function FixtureDetails() {
  const fixture = useLoaderData() as FixtureDto;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!fixture) return <div>Loading...</div>;

  return (
    <Container maxWidth="container.xl">
      <Card margin={"20px 0"}>
        <CardBody>
          <Fixture key={fixture.id} fixture={fixture} />
        </CardBody>
      </Card>
      <Box padding="20px 0">
        <Heading as="h2" size="lg" textAlign="left" paddingBottom="20px">
          Lineups
        </Heading>
        <SimpleGrid gap={6} minChildWidth="140px">
          <Lineup
            teamName={fixture.home_team.name}
            playerLineup={fixture.lineupPlayersHome}
            coach={fixture.lineupCoachesHome}
          />
          <Lineup
            teamName={fixture.away_team.name}
            playerLineup={fixture.lineupPlayersAway}
            coach={fixture.lineupCoachesAway}
          />
        </SimpleGrid>
      </Box>
      <Box padding="20px 0">
        <Heading as="h2" size="lg" textAlign="left" paddingBottom="20px">
          Timeline
        </Heading>
        <Events
          events={fixture.events}
          teams={[fixture.home_team, fixture.away_team]}
        />
      </Box>
    </Container>
  );
}
