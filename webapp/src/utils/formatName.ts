import { filter, join, pipe, split } from "ramda";

export const formatName = (name: string) => {
  return pipe(
    split(" "),
    filter((x) => x !== "W"),
    join(" ")
  )(name);
};
