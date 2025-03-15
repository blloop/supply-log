import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LogTable from "./LogTable";
import Settings from "./Settings";
import AddForm from "./AddForm";
import Loader from "./Loader";

type Value = Date | null | [Date | null, Date | null];

export default function App() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [buyerType, setBuyerType] = useState<String>("Buyer");
  const [unitType, setUnitType] = useState<"lb" | "kg">("lb");
  const [currency, setCurrency] = useState<String>("$");

  const [value, setValue] = useState<Value>(new Date());

  const checkLogin = async () => {
    setVerifying(true);
    const response = await fetch("/api/verify", { credentials: "include" });
    const data = await response.json();
    if (data.success) {
      setVerified(true);
    }
    setVerifying(false);
  };

  const handleLogout = async () => {
    setVerifying(true);
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setVerified(false);
    setVerifying(false);
    window.location.reload();
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (!verified) {
    return (
      <>
        <LoginForm />
        {verifying && <Loader />}
      </>
    );
  }

  return (
    <>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      {verifying && <Loader />}
      <p>{value?.toString()}</p>
      <Calendar onChange={setValue} value={value} />
      <LogTable header={[buyerType, unitType, currency]} />
      <AddForm header={[buyerType, unitType, currency]} />
      <Settings />
    </>
  );
}
