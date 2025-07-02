"use client";
import { useAuthContext } from "@/contexts/Context";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const { isAuth, setIsAuth } = useAuthContext();

  return (
    <nav className='flex opacity-40 gap-4'>
      <Link href='/registration/seller'>Стать продавцом</Link>
      <Link href='/wholesale'>Оптовые закупки</Link>
      <Link href='/certificates'>Подарочные сертификаты</Link>
      <Link href='/support'>Помощь</Link>
      <Link href='/pickup-points'>Пункты выдачи</Link>
      {isAuth && (
        <button
          onClick={() => {
            setIsAuth("");
            localStorage.removeItem("Auth");
          }}
          className='text-red-500 bg-transparent'>
          Выйти
        </button>
      )}
    </nav>
  );
}
