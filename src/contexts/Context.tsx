"use client";

import { Loading } from "@/components/Loading";
import { createContext, useEffect, useState } from "react";

export const Context = createContext<{
  isAuth: string;
  setIsAuth: (val: string) => void;
}>({
  isAuth: "",
  setIsAuth: () => {},
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (auth) setIsAuth(auth);
    setAuthLoading(false);
  }, []);

  if (authLoading) return <Loading />;

  return <Context.Provider value={{ isAuth, setIsAuth }}>{children}</Context.Provider>;
}
