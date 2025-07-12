"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthInterface } from "@/interface/homePage/login";
import Link from "next/link";
import React from "react";

export default function NavBar({ setAuthChoose, setBuyerOrSeller }: AuthInterface) {
  const { auth, setAuth } = useAuthContext();

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
        <button
          onClick={() => {
            //!! logout
            setAuth(null);
          }}
          className='text-red-500 bg-transparent'>
          Выйти
        </button>
      )}
    </nav>
  );
}
