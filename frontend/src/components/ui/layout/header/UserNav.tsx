"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { AccountIcon } from "../../shared/icons/AccountIcon";
import { useAuthContext } from "@/contexts/Context";

interface UserNavProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

export default function UserNav({ setLoginModal }: UserNavProps) {
  const { isAuth } = useAuthContext();

  return (
    <ul className='flex gap-3 ml-14'>
      <li>
        {!isAuth ? (
          <button
            onClick={() => setLoginModal((prev) => !prev)}
            className='flex flex-col items-center max-h-[53px]'>
            <AccountIcon stroke={"currentColor"} />
            <p className='font-normal text-sm'>Войти</p>
          </button>
        ) : (
          <Link
            href={isAuth == "buyer" ? "/buyer" : "/seller"}
            className='flex flex-col items-center max-h-[53px]'>
            <AccountIcon stroke={"#f35935"} />
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
  );
}
