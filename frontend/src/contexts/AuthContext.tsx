"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useBuyerProfileQuery, useSellerProfileQuery } from "@/store/userApi";
import { BuyerOrSeller } from "@/types";
import { isFromEnum } from "@/utils/isFromEnum";
import { Loading } from "@/components/ui/shared/loading/Loading";

interface AuthContextInterface {
  auth: BuyerOrSeller | null;
  setAuth: (role: BuyerOrSeller | null) => void;
  refetchProfile: (profile: BuyerOrSeller | null) => void;
}

export const AuthContext = createContext({} as AuthContextInterface);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<BuyerOrSeller | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("Auth");
      return isFromEnum<BuyerOrSeller>(stored, ["buyer", "seller"] as const) ? stored : null;
    }
    return null;
  });

  const {
    data: buyerData,
    isLoading: buyerLoading,
    isError: buyerError,
    refetch: refetchBuyer,
  } = useBuyerProfileQuery("");

  const {
    data: sellerData,
    isLoading: sellerLoading,
    isError: sellerError,
    refetch: refetchSeller,
  } = useSellerProfileQuery("");

  const refetchProfile = (profile: BuyerOrSeller | null) => {
    if (profile === "buyer") refetchBuyer();
    if (profile === "seller") refetchSeller();
  };

  const setAuth = (role: BuyerOrSeller | null) => {
    if (role) {
      localStorage.setItem("Auth", role);
    } else {
      localStorage.removeItem("Auth");
    }
    setAuthState(role);
  };

  useEffect(() => {
    if (auth === "buyer" && buyerData) {
      setAuthState("buyer");
    } else if (auth === "seller" && sellerData) {
      setAuthState("seller");
    } else if ((auth === "buyer" && buyerError) || (auth === "seller" && sellerError)) {
      setAuth(null);
    }
  }, [buyerData, sellerData, buyerError, sellerError]);

  if (buyerLoading || sellerLoading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        refetchProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
