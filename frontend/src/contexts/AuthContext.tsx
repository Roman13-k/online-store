"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useBuyerProfileQuery, useSellerProfileQuery } from "@/store/userApi";
import { BuyerOrSeller } from "@/types";
import { isFromEnum } from "@/utils/isFromEnum";
import { Loading } from "@/components/ui/shared/loading/Loading";
import { BuyerInterface, SellerInterface } from "@/interface/profilepage/profile";

interface AuthContextInterface {
  auth: BuyerOrSeller | null;
  setAuth: (role: BuyerOrSeller | null) => void;
  buyerData: BuyerInterface;
  sellerData: SellerInterface;
}

export const AuthContext = createContext({} as AuthContextInterface);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<BuyerOrSeller | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("Auth");
    if (isFromEnum<BuyerOrSeller>(stored, ["buyer", "seller"] as const)) {
      setAuthState(stored);
    }
    setAuthLoading(false);
  }, []);

  const buyerToken = typeof window !== "undefined" ? localStorage.getItem("buyer") : null;
  const {
    data: buyerData,
    isLoading: buyerLoading,
    isError: buyerError,
  } = useBuyerProfileQuery(buyerToken, {
    skip: auth !== "buyer" || !buyerToken,
  });

  const sellerToken = typeof window !== "undefined" ? localStorage.getItem("seller") : null;
  const {
    data: sellerData,
    isLoading: sellerLoading,
    isError: sellerError,
  } = useSellerProfileQuery(sellerToken, {
    skip: auth !== "seller" || !sellerToken,
  });

  const setAuth = (role: BuyerOrSeller | null) => {
    if (role) {
      localStorage.setItem("Auth", role);
    } else {
      localStorage.removeItem("Auth");
    }
    setAuthState(role);
  };

  useEffect(() => {
    if (buyerData) {
      setAuth("buyer");
    } else if (buyerError) {
      setAuth(null);
      const token = localStorage.getItem("buyer");
      if (token) localStorage.removeItem("buyer");
    } else if (sellerData) {
      setAuth("seller");
    } else if (sellerError) {
      setAuth(null);
      const token = localStorage.getItem("seller");
      if (token) localStorage.removeItem("seller");
    }
  }, [auth, buyerData, sellerData, buyerError, sellerError]);

  if (buyerLoading || sellerLoading || authLoading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        buyerData,
        sellerData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
