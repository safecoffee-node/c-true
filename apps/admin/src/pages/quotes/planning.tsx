import clsx from "clsx";
import {
  timeDay,
  timeDays,
  timeMonday,
  timeMondays,
  timeMonth,
  timeWeek,
  timeWeeks,
} from "d3-time";
import { Button } from "@/components/ui/button.tsx";
import {
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
} from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function Planning() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragEnd, setDragEnd] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const formatted = Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  });

  const weekStarts = timeMonday.range(startWeek, endWeek);

  const getDates = (weekStart: Date) =>
    timeDay.range(weekStart, timeDay.offset(weekStart, DAYS_IN_WEEK));

  const handleClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    weekStart: Date,
  ) => {
    const currentDate = new Date(
      Number((e.target as HTMLElement).dataset.date),
    );
    const rect = containerRef.current!.getBoundingClientRect();
    const weekHeight = rect.height / weekStarts.length;
    const weekIdx = clamp(
      Math.floor((e.clientY - rect.top) / weekHeight),
      0,
      weekStarts.length - 1,
    );

    const weekDays = timeDay.range(
      timeMonday.floor(weekStart),
      timeDay.offset(weekStart, DAYS_IN_WEEK),
    );

    const rangeStart = timeDay.range(
      timeMonday.floor(currentDate),
      timeMonth.floor(currentDate),
    );

    const rangeEnd = timeDay.range(
      timeMonth.ceil(currentDate),
      timeMonday.ceil(timeMonth.ceil(currentDate)),
    );

    const endWeekOfCurrentDate = timeDay.offset(
      timeMonday.floor(currentDate),
      DAYS_IN_WEEK - 1,
    );

    const startWeekOfCurrenDate = timeMonday.floor(currentDate);

    const meta = {
      week: weekIdx,
      startWeekOfCurrenDate,
      endWeekOfCurrentDate,
      rangeweek: weekDays,
      rangeEnd: rangeEnd,
      rangeStart: rangeStart,
      targetDate: currentDate,
      targetNode: e.target,
      rangeOfcurrent: timeDay.range(startWeek, currentDate),
    };

    // console.log(meta);

    // console.log(weekDays);
    return;
    console.log(weekIndex(now));
    console.log(e);
  };

  const getSelectedDates = () => {
    if (!dragStart || !dragEnd) return [];
    const from = dragStart < dragEnd ? dragStart : dragEnd;
    const to = dragStart < dragEnd ? dragEnd : dragStart;
    return timeDay.range(from, timeDay.offset(to, 1));
  };

  const isInRange = (d: Date) => {
    if (!dragStart || !dragEnd) return false;
    const from = dragStart < dragEnd ? dragStart : dragEnd;
    const to = dragStart < dragEnd ? dragEnd : dragStart;
    return (
      +timeDay.floor(d) >= +timeDay.floor(from) &&
      +timeDay.floor(d) <= +timeDay.floor(to)
    );
  };

  const handleMouseDown = (d: Date) => {
    setIsDragging(true);
    setDragStart(d);
    setDragEnd(d);
  };

  const handleMouseEnter = (d: Date) => {
    if (!isDragging) return;
    setDragEnd(d);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    console.log(getSelectedDates());
  };

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

          <div
            ref={containerRef}
            onMouseUp={handleMouseUp}
            className="flex flex-col border-l border-t"
          >
            {weekStarts.map((weekStart) => (
              <div
                onClick={(e) => handleClick(e, weekStart)}
                key={weekStart.getTime()}
                className="grid grid-cols-7"
              >
                {getDates(weekStart).map((d) => (
                  <div
                    onMouseDown={() => handleMouseDown(d)}
                    onMouseEnter={() => handleMouseEnter(d)}
                    data-date={d.getTime()}
                    key={d.getTime()}
                    className={clsx(
                      "p-4 text-sm aspect-square border-r border-b hover:bg-accent/60 transition-discrete select-none",
                      weekIndex(d) === weekIndex(now) &&
                        "bg-accent/40 border-border",
                      +timeDay.floor(d) === +timeDay.floor(now) &&
                        "bg-primary text-primary-foreground hover:bg-primary/70 transition-discrete",
                      isInRange(d) && "bg-primary/30  transition",
                    )}
                  >
                    <span
                      className={clsx((d < start || d >= end) && "opacity-20")}
                    >
                      {d.getDate()}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
