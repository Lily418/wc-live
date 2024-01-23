import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { EventDto, TeamDto } from "../../../shared-types/fixtures-dto";
import React from "react";
import { formatName } from "../utils/formatName";
import { Logo } from "./Logo";

export interface EventCardProps {
  event: EventDto;
  iconSrc: string;
  heading: string;
  cardBody: React.ReactNode;
  team: TeamDto;
}

export const EventCard = ({
  event,
  iconSrc,
  cardBody,
  heading,
  team,
}: EventCardProps) => {
  return (
    <Card padding="10px" margin="0">
      <CardHeader padding="4px 8px">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img width="20" height="20" src={iconSrc} alt="" />
            <Heading size="md" fontWeight="normal">
              {heading}
            </Heading>
          </div>
          <p
            style={{
              color: "gray",
            }}
          >
            {event.time_elapsed}
          </p>
        </div>
      </CardHeader>

      <CardBody padding="4px 8px">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 0px",
          }}
        >
          <Logo
            logoUrl={`https://media.api-sports.io/football/teams/${team.football_api_id}.png`}
            size={30}
          />
          <p>{`${formatName(team.name)}`}</p>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: "8px",
          }}
        >
          {cardBody}
        </div>
      </CardBody>
    </Card>
  );
};
