"use client";

import { Loading } from "@/components/ui/shared/loading/Loading";
import { BuyerOrSeller } from "@/types";
import { isFromEnum } from "@/utils/isFromEnum";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  isAuth: null | BuyerOrSeller;
  setIsAuth: Dispatch<SetStateAction<null | BuyerOrSeller>>;
}

export const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<null | BuyerOrSeller>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (isFromEnum<BuyerOrSeller>(auth, ["buyer", "seller"] as const)) setIsAuth(auth);
    setAuthLoading(false);
  }, []);

  if (authLoading) return <Loading />;

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}
