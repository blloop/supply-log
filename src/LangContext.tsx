"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LangContextType {
  lang: number;
  setLang: Dispatch<SetStateAction<number>>;
  tl: (input: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 0,
  setLang: () => {},
  tl: (input: string) => input,
});

const strings: Record<string, string> = {
  "Supply Log": "物资记录",
  "New Entry": "新条目",
  "Log Out": "退出登录",
  Settings: "设置",
  "Use Mandarin Language": "使用简体中文",
  "Add New Entry": "添加新条目",
  "Enter the details for the new entry": "输入新条目的详细信息",
  Restaurant: "餐厅",
  Buyer: "买家",
  Amount: "数量",
  Cost: "费用",
  Date: "日期",
  Total: "总计",
  Cancel: "取消",
  Save: "保存",
  "Show all transactions": "显示所有交易",
  Transactions: "交易",
  Back: "返回",
  "Confirm Deletion": "确认删除",
  "Are you sure you want to delete this row?": "你确定要删除这一行吗",
  Delete: "删除",
  "Sign in to your account to continue": "登录您的账户以继续",
  Username: "用户名",
  Password: "密码",
  "Remember me": "记住我",
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<number>(
    Number(localStorage.getItem("language")) || 0,
  );

  localStorage.setItem("language", lang.toString());

  function tl(input: string) {
    return lang > 0 && strings[input] ? strings[input] : input;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, tl }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLangContext = () => useContext(LangContext);
