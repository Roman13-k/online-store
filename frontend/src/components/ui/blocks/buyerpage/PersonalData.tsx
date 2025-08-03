"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { BuyerInterface } from "@/interface/profilepage/profile";

export default function PersonalData({ buyerData }: { buyerData: BuyerInterface }) {
  const t = useTranslations("main.buyerScreen.personalData");

  return (
    <div className='self-start flex flex-col gap-7'>
      <h2 className='text-black text-[30px] font-first'>{t("title")}</h2>
      <ul className='flex flex-col gap-5'>
        <li className='text-black text-[18px]'>
          <span className='opacity-40'>{t("email")}: </span>
          {buyerData.email}
        </li>
      </ul>
    </div>
  );
}
