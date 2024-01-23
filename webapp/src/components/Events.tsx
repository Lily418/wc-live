import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { EventDto, TeamDto } from "../../../shared-types/fixtures-dto";
import { EventCard } from "./EventCard";

export const typeToHumanReadable = (type: EventDto["type"]) => {
  switch (type) {
    case "goal":
      return "Goal";
    case "card":
      return "Card";
    case "subst":
      return "Substitution";
    default:
      return "Unknown";
  }
};

export const getTeamForEvent = (event: EventDto, teams: TeamDto[]): TeamDto => {
  return teams.find((team) => team.id === event.teamId)!;
};

export const Events = ({
  events,
  teams,
}: {
  events: EventDto[];
  teams: TeamDto[];
}) => {
  return (
    <div
      style={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "start",
      }}
    >
      {events.map((event) => {
        switch (event.type) {
          case "goal":
            return (
              <EventCard
                team={getTeamForEvent(event, teams)}
                event={event}
                iconSrc="https://img.icons8.com/ios-glyphs/30/football2--v1.png"
                heading={`${typeToHumanReadable(event.type)}`}
                cardBody={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {event.playerName}
                    </p>
                    {event.assistName && (
                      <p>
                        <span
                          style={{
                            color: "#555",
                            fontSize: "14px",
                          }}
                        >
                          Assist:
                        </span>{" "}
                        {event.assistName}
                      </p>
                    )}
                  </div>
                }
              />
            );
          case "card":
            return (
              <EventCard
                team={getTeamForEvent(event, teams)}
                event={event}
                iconSrc="https://img.icons8.com/ios-glyphs/30/red-yellow-cards.png"
                heading={`${event.detail}`}
                cardBody={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {event.playerName}
                    </p>
                    {event.assistName && (
                      <p>
                        <span
                          style={{
                            color: "#555",
                            fontSize: "14px",
                          }}
                        >
                          Assist:
                        </span>{" "}
                        {event.assistName}
                      </p>
                    )}
                  </div>
                }
              />
            );

          case "subst":
            return (
              <EventCard
                team={getTeamForEvent(event, teams)}
                event={event}
                iconSrc="https://img.icons8.com/external-gradak-royyan-wijaya/24/external-arrow-gradak-arrow-flad-gradak-royyan-wijaya-7.png"
                heading={`Substitution`}
                cardBody={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p>
                      <span
                        style={{
                          color: "#555",
                          fontSize: "14px",
                        }}
                      >
                        Off:
                      </span>{" "}
                      {event.playerName}
                    </p>
                    {event.assistName && (
                      <p>
                        <span
                          style={{
                            color: "#555",
                            fontSize: "14px",
                          }}
                        >
                          On:
                        </span>{" "}
                        {event.assistName}
                      </p>
                    )}
                  </div>
                }
              />
            );
        }
      })}
    </div>
  );
};
