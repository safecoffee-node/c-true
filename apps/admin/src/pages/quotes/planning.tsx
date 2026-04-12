import clsx from "clsx";
import { timeDay, timeMonday, timeMonth } from "d3-time";
import { Button } from "@/components/ui/button.tsx";
export default function Planning() {
  const DAYS_IN_WEEK = 7;
  const now = new Date();
  const start = timeMonth.floor(now);
  const end = timeMonth.ceil(now);

  const startWeek = timeMonday.floor(start);
  const endWeek = timeMonday.ceil(end);

  const colIndex = (d: Date) => (d.getDay() + 6) % 7;

  const startDay = colIndex(start);

  const weekIndex = (d: Date) => {
    return Math.floor((timeDay.count(start, d) + startDay) / DAYS_IN_WEEK);
  };

  // const countWeeks = Math.floor(
  //   (timeDay.count(start, end) + startDay) / DAYS_IN_WEEK,
  // );
  // console.log(countWeeks);

  const dates = timeDay.range(startWeek, endWeek);

  const formatted = Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex grid grid-cols-1 gap-2">
          <h2 className="font-medium text-3xl">Planning</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            voluptas molestias quidem repudiandae sunt voluptatem ullam veniam
            a, quos cumque possimus rerum nisi deserunt enim ipsam quod adipisci
            alias illum.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium"> {formatted.format(now)} </h3>

          <div className="grid grid-cols-7 border-l border-t">
            {dates.map((d) => (
              <div
                key={d.getTime()}
                style={{
                  gridColumn: colIndex(d) + 1,
                  gridRow: weekIndex(d) + 1,
                }}
                className={clsx(
                  "p-4 text-sm aspect-square border-r border-b hover:bg-accent/60 transition-discrete",
                  weekIndex(d) === weekIndex(now) &&
                    "bg-accent/40 border-border",
                  +timeDay.floor(d) === +timeDay.floor(now) &&
                    "bg-primary text-primary-foreground hover:bg-primary/70 transition-discrete",
                )}
              >
                <span className={clsx((d < start || d >= end) && "opacity-20")}>
                  {d.getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
