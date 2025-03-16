import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LogTable from "./LogTable";
import AddForm from "./AddForm";
import Loader from "./Loader";
import { LogOut, Package } from "lucide-react";
// import { Settings, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button";
// import Overview from "./Overview";

const BUYER_TITLE = "Restaurant";

type Value = Date | null | [Date | null, Date | null];

export type Row = {
  date: string;
  buyer: string;
  unit: number;
  price: number;
  hours: number;
  notes: string;
};

export default function App() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [rows, setRows] = useState<Row[]>([]);
  const [value, setValue] = useState<Value>(new Date());

  const checkLogin = async () => {
    setVerifying(true);
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    const response =
      username && password
        ? await fetch("/api/verifyLocal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          })
        : await fetch("/api/verify", { credentials: "include" });

    const data = await response.json();
    if (data.success) {
      setVerified(true);
      setRows(data.values);
    }

    setVerifying(false);
  };

  const handleLogout = async () => {
    setVerifying(true);
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    setVerified(false);
    setVerifying(false);
  };

  const addRow = (row: Row) => {
    setRows([...rows, row]);
  };

  useEffect(() => {
    if (!verified) {
      checkLogin();
    }
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
            <AddForm
              buyerType={BUYER_TITLE}
              defaultDate={value ? (value as Date) : new Date()}
              addRow={addRow}
            />
            {/* <Button className="sm:min-w-24" variant="ghost" size="icon">
              <p className="hidden sm:flex">Settings</p>
              <Settings className="h-8 w-8" />
            </Button> */}
            <Button
              className="sm:min-w-24"
              onClick={handleLogout}
              variant="ghost"
              size="icon"
            >
              <p className="hidden sm:flex">Log Out</p>
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <div className="size-full max-w-[1280px] gap-8 p-8 mx-auto flex flex-col">
        <div className="size-full flex flex-col gap-8 lg:flex-row items-center lg:items-start lg:justify-center">
          <div className="flex flex-col gap-4">
            <Calendar
              className="py-2 px-1 rounded-xl text-card-foreground shadow-lg"
              calendarType="gregory"
              onChange={setValue}
              value={value}
            />
          </div>
          <div className="flex flex-col gap-1 max-w-full overflow-y-auto">
            <h2 className="text-lg">
              <span className="font-bold">Transactions{": "}</span>
              {(value ? (value as Date) : new Date()).toLocaleDateString()}
            </h2>
            <div className="w-full h-0.5 bg-neutral-600" />
            <LogTable
              date={value ? (value as Date) : new Date()}
              buyerType={BUYER_TITLE}
              rows={rows}
            />
          </div>
        </div>
        {/* <Overview rows={rows} date={value ? (value as Date) : new Date()} /> */}
      </div>
    </div>
  );
}
