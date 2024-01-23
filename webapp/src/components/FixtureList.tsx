import { Card, CardHeader, Text, CardBody } from "@chakra-ui/react";
import {
  FixtureSummaryDto,
  FixturesDto,
} from "../../../shared-types/fixtures-dto";
import { groupByDate } from "../groupByDate";
import { Link } from "react-router-dom";
import { Fixture } from "./Fixture";

export const FixtureList = ({
  fixtures,
  pressable,
}: {
  fixtures: FixtureSummaryDto[];
  pressable?: boolean;
}) => {
  return (
    <>
      {Object.entries(groupByDate(["kickoff"], fixtures)).map(
        ([date, fixturesOnDate]) => (
          <Card margin="20px 0">
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
              {fixturesOnDate.map((fixture: FixtureSummaryDto) =>
                pressable ? (
                  <Link to={`/fixture/${fixture.id}`}>
                    <Fixture key={fixture.id} fixture={fixture} />
                  </Link>
                ) : (
                  <Fixture key={fixture.id} fixture={fixture} />
                )
              )}
            </CardBody>
          </Card>
        )
      )}
    </>
  );
};
