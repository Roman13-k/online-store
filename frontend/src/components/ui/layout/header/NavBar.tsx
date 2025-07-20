"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthInterface } from "@/interface/homePage/login";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import I18nSelect from "../../shared/selectes/I18nSelect";

export default function NavBar({ setAuthChoose, setBuyerOrSeller }: AuthInterface) {
  const { auth, setAuth } = useAuthContext();
  const t = useTranslations("header");
  const logout = () => {
    if (auth === "buyer") {
      localStorage.removeItem("buyer");
    } else if (auth === "seller") {
      localStorage.removeItem("seller");
    }
    setAuth(null);
    redirect("/");
  };

  return (
    <nav className='flex items-center opacity-40 gap-4 pr-1'>
      <button
        onClick={() => {
          setAuthChoose("registration");
          setBuyerOrSeller("seller");
        }}>
        {t("becomeSeller")}
      </button>
      <Link href='/certificates'>{t("certificates")}</Link>
      <Link href='/support'>{t("title")}</Link>
      <Link href='/pickup-points'>{t("pickupPoints")}</Link>
      {auth && (
        <button onClick={logout} className='text-red-500 bg-transparent'>
          {t("logout")}
        </button>
      )}
      <I18nSelect />
    </nav>
  );
}
