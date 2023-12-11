import { groupBy, head, path, pipe, split } from "ramda";

const isoStringToDate = pipe(split("T"), head);

const rejectInvalidDate = (date: string) => {
  if (isNaN(Date.parse(date))) {
    throw new Error("Path is not a valid date");
  }
  return date;
};

export const groupByDate = (
  datePath: string[],
  obj: any[]
): Record<string, any[]> => {
  if (datePath.length === 0) {
    throw new Error("Path cannot be empty");
  }

  return groupBy(
    pipe(
      path(datePath) as () => string,
      rejectInvalidDate,
      isoStringToDate
    ) as () => string,
    obj
  ) as Record<string, any[]>;
};
