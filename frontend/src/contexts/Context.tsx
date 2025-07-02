"use client";

import { Loading } from "@/components/ui/shared/loading/Loading";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  isAuth: string;
  setIsAuth: (val: string) => void;
}

export const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (auth) setIsAuth(auth);
    setAuthLoading(false);
  }, []);

  if (authLoading) return <Loading />;

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}
