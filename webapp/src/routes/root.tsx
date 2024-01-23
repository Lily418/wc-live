import React from "react";
import { useEffect, useState } from "react";
import {
  FixtureSummaryDto,
  FixturesDto,
} from "../../../shared-types/fixtures-dto";
import { Card, CardBody, CardHeader, Container, Text } from "@chakra-ui/react";
import { groupByDate } from "../groupByDate";
import { Fixture } from "../components/Fixture";
import { Link } from "react-router-dom";

export default function FixturesList() {
  const [fixtures, setFixtures] = useState<FixturesDto | null>(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      const fixtures = await fetch("http://127.0.0.1:3333/fixtures");
      const result = await fixtures.json();
      setFixtures(result);
    };
    fetchFixtures();
  }, []);

  return !fixtures ? (
    <div>Loading...</div>
  ) : (
    <Container maxWidth="container.xl">
      {Object.entries(groupByDate(["kickoff"], fixtures.fixtures)).map(
        ([date, fixturesOnDate]) => (
          <Card>
            <CardHeader>
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </CardHeader>
            <CardBody>
              {fixturesOnDate.map((fixture: FixtureSummaryDto) => (
                <Link to={`/fixture/${fixture.id}`}>
                  <Fixture key={fixture.id} fixture={fixture} />
                </Link>
              ))}
            </CardBody>
          </Card>
        )
      )}
    </Container>
  );
}
