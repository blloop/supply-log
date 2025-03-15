import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

type Value = Date | null | [Date | null, Date | null];

export default function App() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

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
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setVerified(false);
    window.location.reload();
  };
  
  useEffect(() => {
    checkLogin();
  }, []);

  if (!verified) {
    return (
      <>
      <LoginForm />
      </>
    )
  }

  return (
    <>
      <div>
        <button onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <p>{value?.toString()}</p>
      <Calendar onChange={setValue} value={value} />
    </>
  );
}
