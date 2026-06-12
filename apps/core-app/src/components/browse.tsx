import { Calendar } from "@/components/ui/calendar";
import { navigate } from "astro:transitions/client";

export function Browse() {
  const handleOnSelect = (
    _: any,
    triggerDate: Date,
    modifiers: any,
    e: React.MouseEvent | React.KeyboardEvent,
  ) => {
    const year = triggerDate.getFullYear();

    const month = triggerDate.getMonth() + 1;
    const day = triggerDate.getDate();
    console.log(modifiers);
    navigate(`/browse/${month}-${day}`);
  };

  return (
    <Calendar
      mode="single"
      selected={new Date()}
      onSelect={handleOnSelect}
      className="rounded-lg border"
    ></Calendar>
  );
}
