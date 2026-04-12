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
            className="p-2 text-end aspect-square border-collapse border border-accent"
            key={i}
            style={{
              gridColumn: colIndex(d) + 1,
              gridRow: weekIndex(d) + 1,
            }}
          >
            {d.getDate()}
          </div>
        ))}
      </div>
    </>
  );
}
