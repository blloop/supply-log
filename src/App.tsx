import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LogTable from "./LogTable";
import AddForm from "./AddForm";
import Loader from "./Loader";
import { Settings, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import Overview from "./Overview";

type Value = Date | null | [Date | null, Date | null];

export default function App() {  
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [screen, setScreen] = useState(0);

  const [value, setValue] = useState<Value>(new Date());
  const [buyerType, setBuyerType] = useState<String>("Buyer");
  const [unitType, setUnitType] = useState<"lb" | "kg">("lb");
  const [currency, setCurrency] = useState<String>("$");

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
    <div className="size-full min-h-screen bg-gray-100">
      {verifying && <Loader />}
      <header className="sticky top-0 z-10 border-b shadow-sm bg-white">
        <div className="w-full max-w-[1280px] mx-auto min-h-16 flex flex-wrap items-center justify-between px-4">
          <div className="flex items-center gap-2 p-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">Supply Log</h1>
          </div>
          <div className="flex items-center gap-2 p-2">
            <AddForm header={[buyerType, unitType, currency]} />
            {/* <Button className="sm:min-w-24" variant="ghost" size="icon">
              <p className="hidden sm:flex">Settings</p>
              <Settings className="h-8 w-8" />
            </Button> */}
            <Button className="sm:min-w-24" onClick={handleLogout} variant="ghost" size="icon">
              <p className="hidden sm:flex">Log Out</p>
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <div className="size-full max-w-[1280px] gap-8 p-8 mx-auto flex flex-col">
        <div className="size-full flex flex-col gap-8 lg:flex-row items-center lg:items-start lg:justify-center">
          <div className="flex flex-col gap-4">
            <Calendar className="py-2 px-1 rounded-xl text-card-foreground shadow-sm" calendarType="gregory" onChange={setValue} value={value} />
          </div>
          <div className="flex flex-col max-w-full overflow-y-auto">
            <h2 className="text-lg"><span className="font-bold">Transactions{": "}</span>{
                value ? ((value as Date).toLocaleDateString()) : ""
              }</h2>
            <LogTable header={[buyerType, unitType, currency]} />
          </div>
        </div>
        <Overview total={2000} max={600} date={value ? (value as Date) : new Date()} />
      </div>
    </div>
  );
}
