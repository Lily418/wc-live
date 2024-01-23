import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Text,
  Container,
} from "@chakra-ui/react";
import { Fixture } from "./components/Fixture";
import { groupByDate } from "./groupByDate";
import {
  FixtureSummaryDto,
  FixturesDto,
} from "../../shared-types/fixtures-dto";

function App() {
  const [fixtures, setFixtures] = useState<FixturesDto | null>(null);

  useEffect(() => {
    const login = async () => {
      const fixtures = await fetch("http://127.0.0.1:3333/fixtures");
      const result = await fixtures.json();
      setFixtures(result);
    };
    login();
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        {!fixtures ? (
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
                      <Fixture key={fixture.id} fixture={fixture} />
                    ))}
                  </CardBody>
                </Card>
              )
            )}
          </Container>
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
