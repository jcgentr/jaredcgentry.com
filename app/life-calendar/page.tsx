"use client";

import { useState } from "react";

interface RowsCols {
  rows: number;
  cols: number;
  gridClassName: string;
  squareClassName: string;
  description: string;
}

interface TimeUnitMapping {
  years: RowsCols;
  months: RowsCols;
  weeks: RowsCols;
}

const timeUnitMapping: TimeUnitMapping = {
  years: {
    rows: 9, // 9 decades = if you live to 90
    cols: 10, // 10 years = 1 decade
    gridClassName: "grid-cols-10",
    squareClassName: "w-8 h-8 sm:w-10 sm:h-10",
    description: "9 rows of decades",
  },
  months: {
    rows: 30, // 3 years * 30 = 90
    cols: 36, // 36 months = 3 years
    gridClassName: "grid-cols-36",
    squareClassName: "w-2 h-2 sm:w-4 sm:h-4",
    description: "30 rows of 36 months or 3 years",
  },
  weeks: {
    rows: 90, // 90 years
    cols: 52, // 52 weeks per year
    gridClassName: "grid-cols-52",
    squareClassName: "w-1 h-1 sm:w-3 sm:h-3",
    description: "90 rows of 52 weeks or 1 year",
  },
};

export default function LifeCalendarPage() {
  const [timeUnit, setTimeUnit] = useState<"years" | "months" | "weeks">(
    "years"
  );
  const birthdate = new Date("1994-05-23");
  const today = new Date();

  let ageInTimeUnit: number;

  switch (timeUnit) {
    case "years":
      ageInTimeUnit = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        ageInTimeUnit--;
      }
      break;
    case "months":
      ageInTimeUnit = (today.getFullYear() - birthdate.getFullYear()) * 12;
      ageInTimeUnit += today.getMonth() - birthdate.getMonth();
      if (today.getDate() < birthdate.getDate()) {
        ageInTimeUnit--;
      }
      break;
    case "weeks":
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const ageInMilliseconds = today.getTime() - birthdate.getTime();
      ageInTimeUnit = Math.floor(ageInMilliseconds / oneWeek);
      break;
  }

  function calculateAgeString(birthdate: Date, currentDate: Date): JSX.Element {
    let years = currentDate.getFullYear() - birthdate.getFullYear();
    let months = currentDate.getMonth() - birthdate.getMonth();
    let days = currentDate.getDate() - birthdate.getDate();

    if (days < 0) {
      // Borrow days from the previous month
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
      months--;
    }

    if (months < 0) {
      // Borrow months from the previous year
      months += 12;
      years--;
    }

    // Calculate weeks as full weeks passed in the current month
    const startOfThisMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const weeks = Math.floor(
      (currentDate.getTime() - startOfThisMonth.getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    );

    // Adjust days to be the remainder after subtracting full weeks
    days = days % 7;

    // Apply highlight class based on the selected time unit
    const highlightClass = "text-blue-300 font-bold"; // Example highlight class
    const yearString =
      timeUnit === "years" ? (
        <span className={highlightClass}>{years} y</span>
      ) : (
        <span>{years} y</span>
      );
    const monthString =
      timeUnit === "months" ? (
        <span className={highlightClass}>{months} m</span>
      ) : (
        <span>{months} m</span>
      );
    const weekString =
      timeUnit === "weeks" ? (
        <span className={highlightClass}>{weeks} w</span>
      ) : (
        <span>{weeks} w</span>
      );

    return (
      <>
        {yearString} {monthString} {weekString} {days} d
      </>
    );
  }

  const ageString = calculateAgeString(birthdate, today);

  return (
    <main className="mx-auto max-w-fit dark:text-white">
      <h1 className="mt-10 mb-6 text-5xl">Life Calendar</h1>
      <p>
        *Based on{" "}
        <a
          className="underline underline-offset-4 hover:no-underline"
          href="https://waitbutwhy.com/2014/05/life-weeks.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          this article
        </a>
        . Assumes I live to 90 years old.
      </p>
      <h2 className="my-10 text-3xl">{ageString}</h2>

      <div>
        <div className="flex items-center gap-2">
          <span>My life in</span>
          <select
            value={timeUnit}
            onChange={(e) =>
              setTimeUnit(e.target.value as "years" | "months" | "weeks")
            }
            className="p-1 border border-gray-300 rounded-md cursor-pointer"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
        <p className="mt-4">{timeUnitMapping[timeUnit].description}</p>
      </div>

      <div
        className={`grid max-w-fit ${timeUnitMapping[timeUnit].gridClassName} gap-1 gap-y-1 mt-6 mb-12 mx-auto`}
      >
        {Array.from({
          length:
            timeUnitMapping[timeUnit].rows * timeUnitMapping[timeUnit].cols,
        }).map((_, index) => (
          <div
            key={index}
            className={`${timeUnitMapping[timeUnit].squareClassName} ${
              index + 1 <= ageInTimeUnit ? "bg-blue-500" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
    </main>
  );
}
