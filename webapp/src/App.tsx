import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as Realm from "realm-web";
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
import { LogoDocument } from "./types/logo";

const app = new Realm.App({ id: "wc-live-rnchj" });

function App() {
  const [fixtures, setFixtures] = useState<any[] | null>(null);
  const [logos, setLogos] = useState<LogoDocument[]>([]);

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());

      const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
      const db = mongodb.db("wc-live");

      const loadFixtures = async () => {
        const fixturesCollection = db.collection("fixtures");
        const fixtures = await fixturesCollection.find({});
        setFixtures(fixtures);
      };

      const loadLogos = async () => {
        const logosCollection = db.collection("logos");
        const logos = await logosCollection.find({});
        setLogos(logos);
      };

      await Promise.all([loadFixtures(), loadLogos()]);
    };
    login();
  }, []);

  console.log("fixtures", fixtures);
  console.log("logos", logos);

  return (
    <ChakraProvider>
      <div className="App">
        {!fixtures ? (
          <div>Loading...</div>
        ) : (
          <Container maxWidth="container.xl">
            {Object.entries(groupByDate(["fixture", "date"], fixtures)).map(
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
                    {fixturesOnDate.map((fixture) => (
                      <Fixture
                        key={fixture._id.toString()}
                        fixture={fixture}
                        logos={logos}
                      />
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
