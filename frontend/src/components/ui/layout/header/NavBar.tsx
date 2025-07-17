"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthInterface } from "@/interface/homePage/login";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function NavBar({ setAuthChoose, setBuyerOrSeller }: AuthInterface) {
  const { auth, setAuth } = useAuthContext();

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
    <nav className='flex opacity-40 gap-4'>
      <button
        onClick={() => {
          setAuthChoose("registration");
          setBuyerOrSeller("seller");
        }}>
        Стать продавцом
      </button>
      <Link href='/certificates'>Подарочные сертификаты</Link>
      <Link href='/support'>Помощь</Link>
      <Link href='/pickup-points'>Пункты выдачи</Link>
      {auth && (
        <button onClick={logout} className='text-red-500 bg-transparent'>
          Выйти
        </button>
      )}
    </nav>
  );
}
