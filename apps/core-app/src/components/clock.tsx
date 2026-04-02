import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function Clock({
  locale,
  timeZone,
}: {
  locale: string;
  timeZone: string;
}) {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
    dayPeriod: "",
  });
  const prev = usePrevious(time);
  const hourRef = useRef<HTMLSpanElement>(null);
  const minuteRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const dayPeriodRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
    });

    const update = () => {
      const parts = formatter.formatToParts(new Date());
      setTime({
        hour: parts.find((p) => p.type === "hour")?.value ?? "",
        minute: parts.find((p) => p.type === "minute")?.value ?? "",
        second: parts.find((p) => p.type === "second")?.value ?? "",
        dayPeriod: parts.find((p) => p.type === "dayPeriod")?.value ?? "",
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale, timeZone]);

  useLayoutEffect(() => {
    const parts = [
      { ref: hourRef, value: time.hour, prev: prev.hour },
      { ref: minuteRef, value: time.minute, prev: prev.minute },
      { ref: secondRef, value: time.second, prev: prev.second },
      { ref: dayPeriodRef, value: time.dayPeriod, prev: prev.dayPeriod },
    ];

    for (const { ref, value, prev } of parts) {
      if (!ref.current || value === prev) continue;
      gsap.killTweensOf(ref.current);
      gsap.to(ref.current, {
        duration: 0.5,
        scrambleText: { text: value, chars: "0123456789" },
      });
    }
  }, [time]);

  return (
    <time className="text-sm text-muted-foreground flex items-center gap-1">
      <span ref={hourRef}>{time.hour}</span>
      <span>:</span>
      <span ref={minuteRef}>{time.minute}</span>
      <span>:</span>
      <span ref={secondRef}>{time.second}</span>
      <span>--</span>
      <span ref={dayPeriodRef}>{time.dayPeriod}</span>
    </time>
  );
}
