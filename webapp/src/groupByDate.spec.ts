import { groupByDate } from "./groupByDate";

describe("groupByDate", () => {
  it("should throw an error if the path is empty", () => {
    // GIVEN
    const path: string[] = [];
    const obj = [{}];

    // WHEN
    const result = () => groupByDate(path, obj);

    // THEN
    expect(result).toThrowError();
  });

  it("should throw an error if a path is not a valid date", () => {
    // GIVEN
    const path: string[] = ["date"];
    const obj = [
      {
        date: "not a date",
      },
    ];

    // WHEN
    const result = () => groupByDate(path, obj);

    // THEN
    expect(result).toThrowError();
  });

  it("should group by date", () => {
    // GIVEN
    const path: string[] = ["date"];
    const obj = [
      {
        date: "2020-01-01",
      },
      {
        date: "2020-01-01",
      },
      {
        date: "2020-01-02",
      },
    ];

    // WHEN
    const result = groupByDate(path, obj);

    // THEN
    expect(result).toStrictEqual({
      "2020-01-01": [
        {
          date: "2020-01-01",
        },
        {
          date: "2020-01-01",
        },
      ],
      "2020-01-02": [
        {
          date: "2020-01-02",
        },
      ],
    });
  });

  it("should group by date ignoring time", () => {
    // GIVEN
    const path: string[] = ["date"];
    const obj = [
      {
        date: "2020-01-01T13:00:00.000Z",
      },
      {
        date: "2020-01-01T12:00:00.000Z",
      },
      {
        date: "2020-01-02",
      },
    ];

    // WHEN
    const result = groupByDate(path, obj);

    // THEN
    expect(result).toStrictEqual({
      "2020-01-01": [
        {
          date: "2020-01-01T13:00:00.000Z",
        },
        {
          date: "2020-01-01T12:00:00.000Z",
        },
      ],
      "2020-01-02": [
        {
          date: "2020-01-02",
        },
      ],
    });
  });
});
