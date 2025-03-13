import Calendar from "react-calendar";
import Login from "./login";
import { useState } from "react";

type Value = Date | null | [Date | null, Date | null];

export default function App() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <Login />
      <p>{value?.toString()}</p>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
