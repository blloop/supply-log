import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LogTable from "./LogTable";
import AddForm from "./AddForm";
import Loader from "./Loader";
import { Settings, ArrowLeft, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";
import { useLangContext } from "./LangContext";
import { Label } from "@radix-ui/react-label";

const BUYER_TITLE = import.meta.env.VITE_BUYER_TYPE || "Buyer";

export type Row = {
  id: number;
  date: string;
  buyer: string;
  unit: string;
  price: string;
  hours: number;
  notes: string;
};

export default function App() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState<Row[]>([]);
  const [value, setValue] = useState<Date>(new Date());

  const { lang, setLang, tl } = useLangContext();

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

  const deleteRow = (id: number) => {
    setRows(rows.filter((e) => e.id !== id));
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tl("Settings")}</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex items-center gap-4 mx-auto">
            <Label htmlFor="lang">{tl("Use Mandarin Language")}</Label>
            <input
              id="lang"
              type="checkbox"
              className="w-5 h-5 accent-blue-500 bg-white border-gray-300 rounded focus:ring focus:ring-blue-400"
              checked={lang === 1}
              onChange={(event) => setLang(event.target.checked ? 1 : 0)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {verifying && <Loader />}
      <header className="sticky top-0 z-10 border-b shadow-sm bg-white">
        <div className="w-full max-w-[1280px] mx-auto min-h-16 flex flex-wrap items-center justify-between px-4">
          <div className="flex items-center gap-2 p-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">{tl("Supply Log")}</h1>
          </div>
          <div className="flex items-center gap-2 p-2">
            <AddForm
              buyerType={BUYER_TITLE}
              defaultDate={value}
              addRow={addRow}
            />
            <Button
              onClick={() => setOpen(true)}
              className="sm:min-w-24"
              variant="ghost"
              size="icon"
            >
              <p className="hidden sm:flex">{tl("Settings")}</p>
              <Settings className="h-8 w-8" />
            </Button>
            <Button
              className="sm:min-w-24"
              onClick={handleLogout}
              variant="ghost"
              size="icon"
            >
              <p className="hidden sm:flex">{tl("Log Out")}</p>
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "relative size-full max-w-[1280px] gap-8 p-4 lg:p-8 mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-center",
          showAll
            ? "overflow-hidden gap-2 lg:gap-8"
            : "overflow-x-hidden overflow-y-auto",
        )}
      >
        {showAll ? (
          <>
            <Button
              className="self-start bg-transparent border-0 shadow-none"
              variant="outline"
              onClick={() => setShowAll(false)}
            >
              <ArrowLeft />
              {tl("Back")}
            </Button>
            <div className="p-2 md:p-4 size-full bg-white rounded-xl overflow-hidden">
              <LogTable
                buyerType={BUYER_TITLE}
                rows={rows}
                showDate={true}
                deleteRow={deleteRow}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <Calendar
                className="py-2 px-1 rounded-xl text-card-foreground shadow-lg"
                calendarType={lang === 0 ? "gregory" : "iso8601"}
                locale={lang === 0 ? "en-US" : "zh-CN"}
                onChange={(e) => setValue(e as Date)}
                value={value}
              />
              <Button
                onClick={() => setShowAll(true)}
                className="bg-white border border-neutral-200 shadow-lg hover:bg-neutral-300 text-blue-600"
              >
                {tl("Show all transactions")}
              </Button>
            </div>
            <div className="flex flex-col gap-1 max-h-96 max-w-full sm:min-w-[24rem]">
              <h2 className="flex flex-wrap gap-1 text-lg">
                <span className="font-bold">
                  {tl("Transactions")}
                  {": "}
                </span>
                {value.toLocaleDateString("en-CA")}
              </h2>
              <div className="w-full h-0.5 shrink-0 bg-neutral-600" />
              <LogTable
                buyerType={BUYER_TITLE}
                rows={rows.filter(
                  (e) =>
                    e.date === value.toLocaleDateString("en-CA").split("T")[0],
                )}
                showDate={false}
                deleteRow={deleteRow}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 供应日志
// 物资记录
// 库存日志
