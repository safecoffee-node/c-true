import { useEffect, useState } from "react";

export function Clock({
  locale,
  timeZone,
}: {
  locale: string;
  timeZone: string;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
        }),
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale, timeZone]);

  return <time className="text-sm text-muted-foreground">{time}</time>;
}
