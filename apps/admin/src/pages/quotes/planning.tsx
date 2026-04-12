import { timeDay, timeMonday, timeMonth, timeWeek, utcMonth } from "d3-time";

export default function Planning() {
  const now = new Date();
  const start = timeMonth.floor(now);
  const end = timeMonth.ceil(now);

  const startWeek = timeMonday.floor(start);
  const endWeek = timeMonday.ceil(end);

  const colIndex = (d: Date) => (d.getDay() + 6) % 7;

  const startDay = start.getDay() + (6 % 7);

  const weekIndex = (d: Date) => {
    return Math.floor((timeDay.count(start, d) + startDay) / 7);
  };

  const countWeeks = Math.floor((timeDay.count(start, end) + startDay) / 7);
  console.log(countWeeks);

  const dates = timeDay.range(startWeek, endWeek);

  return (
    <>
      <div className="grid grid-cols-7 border-collapse border border-accent">
        {dates.map((d, i) => (
          <div
            className={`p-2 text-end aspect-square border border-accent 
              ${weekIndex(d) === weekIndex(now) ? "bg-accent/50 border-black/5" : ""}
              ${+timeDay.floor(d) === +timeDay.floor(now) ? "bg-sky-700/50 text-primary-foreground" : ""}`}
            key={i}
            style={{
              gridColumn: colIndex(d) + 1,
              gridRow: weekIndex(d) + 1,
            }}
          >
            <span className={`${d < start || d >= end ? "opacity-20" : ""}`}>
              {d.getDate()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
