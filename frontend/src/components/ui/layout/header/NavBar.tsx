"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthInterface } from "@/interface/homePage/login";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import I18nSelect from "../../shared/selectes/I18nSelect";
import ThemeSelect from "../../shared/selectes/ThemeSelect";

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
    <nav className='flex items-center gap-4 pr-1'>
      <button
        className='text-black/40 dark:text-black'
        onClick={() => {
          setAuthChoose("registration");
          setBuyerOrSeller("seller");
        }}>
        {t("becomeSeller")}
      </button>
      <Link className='text-black/40 dark:text-black' href='/certificates'>
        {t("certificates")}
      </Link>
      <Link className='text-black/40 dark:text-black' href='/support'>
        {t("title")}
      </Link>
      <Link className='text-black/40 dark:text-black' href='/pickup-points'>
        {t("pickupPoints")}
      </Link>
      {auth && (
        <button onClick={logout} className='text-red-500 bg-transparent'>
          {t("logout")}
        </button>
      )}
      <I18nSelect />
      <ThemeSelect />
    </nav>
  );
}
