import { render } from "hono/jsx/dom";
import { useState } from "hono/jsx/dom";

export function Comments() {
  const [value, setValue] = useState(0);
  console.log(window);
  return <button onClick={() => setValue(value + 2)}>count {value}</button>;
}
