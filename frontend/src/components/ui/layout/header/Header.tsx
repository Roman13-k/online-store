"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Context } from "@/contexts/Context";
import { RegOrLog } from "../../../RegOrLog";
import { BuyerOrSeller } from "../../../BuyerOrSeller";
import { Button } from "@heroui/react";

export function Header() {
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const [isOpenChoose, setIsOpenChoose] = useState<string | boolean>(false);
  const { isAuth, setIsAuth } = useContext(Context);

  return (
    <>
      {isOpenAuth && <RegOrLog setIsOpenAuth={setIsOpenAuth} setIsOpenChoose={setIsOpenChoose} />}
      {!!isOpenChoose && (
        <BuyerOrSeller setIsOpenChoose={setIsOpenChoose} isOpenChoose={isOpenChoose} />
      )}
      <header className='flex flex-col max-w-full min-h-[110px] text-sm pt-2 shadow-md pr-20 pl-20 relative'>
        <div className='flex justify-between mb-5'>
          <p className='relative before:content-[url("/icons/marker.svg")] before:mr-2'>
            Пункт выдачи — Центральная ул., 1
          </p>
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
        </div>
        <div className='flex items-center'>
          <Link href='/'>
            <h1 className='flex items-center justify-center text-[38px] bg-gradient-to-b from-[#f35935] to-[#fb9026] bg-clip-text text-transparent before:content-[url("/img/logo.png")] before:mr-2 font-semibold'>
              <span className='font-extrabold font-second'>ПРО</span>
              <span className='font-medium font-third'>Книги</span>
            </h1>
          </Link>
          <Button
            onPress={() => setIsOpenCatalog(!isOpenCatalog)}
            className='bg-[#F35935] rounded-[5px] px-3 w-[124px] h-[46px] font-medium text-white text-lg shadow-md ml-14 mr-5 active:translate-y-1 flex items-center justify-center'>
            Католог
            <img src='/icons/open-btn.svg' alt='Icon' className='ml-2' />
          </Button>
          <ul
            className={`absolute top-[123px] left-[388px] rounded-[5px] grid grid-rows-4 grid-cols-2 bg-[#f6f6f6] ${
              isOpenCatalog ? "opacity-100 translate-y-0 z-50" : "opacity-0 -translate-y-full -z-40"
            } transition-all duration-300`}>
            {[
              "Художественная литература",
              "Нехудожественная литература",
              "Учебная литература и словари",
              "Молодёжная литература",
              "Комиксы, манга, артбуки",
              "Книги для детей",
              "Периодические издания",
              "Все книги",
            ].map((item, index) => (
              <li
                key={index}
                className='bg-[url("/icons/arrow-up.svg")] bg-no-repeat bg-[95%_50%] text-[16px] w-[340px] h-[56px] border border-[#e9e9e9] flex justify-center items-center'>
                <Link href='' className='text-center'>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <input
            type='text'
            className='rounded-[5px] px-5 border border-black opacity-40 h-[46px] w-[420px] bg-[url("/icons/loupe.svg")] bg-no-repeat bg-[95%_50%]'
            placeholder='Найти интересную книгу'
          />
          <ul className='flex gap-3 ml-14'>
            <li>
              {!isAuth ? (
                <button
                  onClick={() => setIsOpenAuth(!isOpenAuth)}
                  className='flex flex-col items-center max-h-[53px]'>
                  {/* <AccountIcon stoke={"currentColor"} /> */}
                  <p className='font-normal text-sm'>Войти</p>
                </button>
              ) : (
                <Link
                  href={isAuth == "buyer" ? "/buyer" : "/seller"}
                  className='flex flex-col items-center max-h-[53px]'>
                  {/* <AccountIcon stoke={"#f35935"} /> */}
                  <p className='font-normal text-sm text-[#f35935]'>Аккаунт</p>
                </Link>
              )}
            </li>
            <li>
              <Link href='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/favorite.svg' className='w-[33px] h-[33px]' />
                <p>Избранное</p>
              </Link>
            </li>
            <li>
              <Link href='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/order.svg' className='w-[33px] h-[33px]' />
                <p>Заказы</p>
              </Link>
            </li>
            <li>
              <Link href='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/cart.svg' className='w-[33px] h-[33px]' />
                <p>Корзина</p>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
