"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useBuyerProfileQuery, useSellerProfileQuery } from "@/store/api/userApi";
import { BuyerOrSeller } from "@/types";
import { isFromEnum } from "@/utils/isFromEnum/isFromEnum";
import { Loading } from "@/components/ui/shared/loading/Loading";
import { BuyerInterface, SellerInterface } from "@/interface/profilepage/profile";
import { useLoginContext } from "./LoginContext";
import { redirect } from "next/navigation";
import useAuthRefresh from "@/hooks/useAuthRefresh";

interface AuthContextInterface {
  auth: BuyerOrSeller | null;
  setAuth: (role: BuyerOrSeller | null) => void;
  buyerData: BuyerInterface;
  sellerData: SellerInterface;
  handleSwitchProfile: () => void;
}

export const AuthContext = createContext({} as AuthContextInterface);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<BuyerOrSeller | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { setLoginModal } = useLoginContext();

  useEffect(() => {
    const stored = localStorage.getItem("Auth");
    if (isFromEnum<BuyerOrSeller>(stored, ["buyer", "seller"] as const)) {
      setAuthState(stored);
    }
    setAuthLoading(false);
  }, []);

  const buyerToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token_buyer") : null;
  const {
    data: buyerData,
    isLoading: buyerLoading,
    isError: buyerError,
  } = useBuyerProfileQuery(buyerToken ?? "", {
    skip: auth !== "buyer" || !buyerToken,
  });
  useAuthRefresh("buyer");

  const sellerToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token_seller") : null;
  const {
    data: sellerData,
    isLoading: sellerLoading,
    isError: sellerError,
  } = useSellerProfileQuery(sellerToken ?? "", {
    skip: auth !== "seller" || !sellerToken,
  });
  useAuthRefresh("seller");

  const setAuth = (role: BuyerOrSeller | null) => {
    if (role) {
      localStorage.setItem("Auth", role);
    } else {
      localStorage.removeItem("Auth");
    }
    setAuthState(role);
  };

  const handleSwitchProfile = () => {
    if (auth === "seller" && buyerToken) {
      setAuth("buyer");
      redirect("/profile/buyer");
    } else if (auth === "buyer" && sellerToken) {
      setAuth("seller");
      redirect("/profile/seller");
    } else {
      setLoginModal(true);
    }
  };

  useEffect(() => {
    if (buyerError) {
      setAuth(null);
      const token = localStorage.getItem("access_token_buyer");
      if (token) localStorage.removeItem("access_token_buyer");
    } else if (sellerError) {
      setAuth(null);
      const token = localStorage.getItem("access_token_seller");
      if (token) localStorage.removeItem("access_token_seller");
    }
  }, [buyerError, sellerError]);

  if (buyerLoading || sellerLoading || authLoading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        buyerData,
        sellerData,
        handleSwitchProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
