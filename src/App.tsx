import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LogTable from "./LogTable";
import AddForm from "./AddForm";
import Loader from "./Loader";
import { ArrowLeft, LogOut, Package } from "lucide-react";
// import { Settings, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";
// import Overview from "./Overview";

const BUYER_TITLE = import.meta.env.VITE_BUYER_TYPE || "Buyer";

console.log(import.meta.env.VITE_BUYER_TYPE)

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
  const [showAll, setShowAll] = useState(false);

  const [rows, setRows] = useState<Row[]>([]);
  const [value, setValue] = useState<Date>(new Date());

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
    <div className="flex flex-col w-screen h-screen bg-gray-100">
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
              defaultDate={value}
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
      <div className={cn("relative size-full max-w-[1280px] gap-8 p-4 lg:p-8 mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-center", 
        showAll ? "overflow-hidden gap-2 lg:gap-8" : "overflow-x-hidden overflow-y-auto"
      )}>
        {showAll ?
          <>
            <Button className="self-start" variant="outline" onClick={() => setShowAll(false)}><ArrowLeft />Back</Button>
            <div className="p-2 md:p-4 size-full bg-white rounded-xl">
              <LogTable
                buyerType={BUYER_TITLE}
                rows={rows}
                showDate={true}
              />
            </div>
          </>
        :
          <>
            <div className="flex flex-col gap-4">
              <Calendar
                className="py-2 px-1 rounded-xl text-card-foreground shadow-lg"
                calendarType="gregory"
                onChange={(e) => setValue(e as Date)}
                value={value}
              />
              <Button onClick={() => setShowAll(true)} className="bg-white border border-neutral-200 shadow-lg hover:bg-neutral-300 text-blue-600">
                Show all transactions
              </Button>
            </div>
            <div className="flex flex-col gap-1 max-h-96 max-w-full sm:min-w-[24rem]">
              <h2 className="flex flex-wrap gap-1 text-lg">
                <span className="font-bold">Transactions{": "}</span>
                {value.toLocaleDateString("en-CA")}
              </h2>
              <div className="w-full h-0.5 shrink-0 bg-neutral-600" />
              <LogTable
                buyerType={BUYER_TITLE}
                rows={rows.filter(
                  (e) => e.date === value.toLocaleDateString("en-CA").split("T")[0],
                )}
                showDate={false}
              />
            </div>
          </>
        }
      </div>
    </div>
  );
}
