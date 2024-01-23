import { Card, Heading, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import {
  LineupCoachDto,
  LineupPlayerDto,
} from "../../../shared-types/fixtures-dto";
import { formatName } from "../utils/formatName";

export const Lineup = ({
  teamName,
  playerLineup,
  coach,
}: {
  teamName: string;
  playerLineup: LineupPlayerDto[];
  coach: LineupCoachDto[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-start",
        textAlign: "start",
      }}
    >
      <Heading as="h3" size="md">
        {formatName(teamName)}
      </Heading>
      <div>
        <Heading as="h4" size="sm">
          Coach
        </Heading>
        <div>
          {coach.map((coach) => (
            <p>{coach.name}</p>
          ))}
        </div>
      </div>
      <div>
        <Heading as="h4" size="sm">
          Starting XI
        </Heading>
        <div>
          {playerLineup
            .filter((player) => {
              return !player.substitute;
            })
            .map((player) => (
              <p>
                {player.playerNumber} {player.playerName}
              </p>
            ))}
        </div>
      </div>

      <div>
        <Heading as="h4" size="sm">
          Substitutions
        </Heading>
        <div>
          {playerLineup
            .filter((player) => {
              return player.substitute;
            })
            .map((player) => (
              <p>
                {player.playerNumber} {player.playerName}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};
