"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { AccountIcon } from "../../shared/icons/AccountIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { P2 } from "../../shared/text";
import { useTranslations } from "next-intl";

interface UserNavProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

export default function UserNav({ setLoginModal }: UserNavProps) {
  const { auth } = useAuthContext();
  const t = useTranslations("header");

  return (
    <ul className='flex gap-3 ml-14'>
      <li>
        {!auth ? (
          <button
            onClick={() => setLoginModal((prev) => !prev)}
            className='flex flex-col items-center max-h-[53px]'>
            <AccountIcon stroke={"currentColor"} />
            <P2 className='font-normal text-sm'>{t("login")}</P2>
          </button>
        ) : (
          <Link
            href={auth == "buyer" ? "/profile/buyer" : "/profile/seller"}
            className='flex flex-col items-center max-h-[53px]'>
            <AccountIcon stroke={"#f35935"} />
            <P2 className='font-normal text-sm text-[#f35935]'>{t("account")}</P2>
          </Link>
        )}
      </li>
      <li>
        <Link href='/profile/buyer?variant=sub' className='flex flex-col items-center max-h-[53px]'>
          <Image width={33} height={33} alt='favorite.svg' src='/icons/nav/favorite.svg' />
          <P2>{t("favorites")}</P2>
        </Link>
      </li>
      <li>
        <Link
          href='/profile/buyer?variant=orders'
          className='flex flex-col items-center max-h-[53px]'>
          <Image width={33} height={33} alt='order.svg' src='/icons/nav/order.svg' />
          <P2>{t("orders")}</P2>
        </Link>
      </li>
      <li>
        <Link
          href='/profile/buyer?variant=basket'
          className='flex flex-col items-center max-h-[53px]'>
          <Image width={33} height={33} alt='cart.svg' src='/icons/nav/cart.svg' />
          <P2>{t("cart")}</P2>
        </Link>
      </li>
    </ul>
  );
}
