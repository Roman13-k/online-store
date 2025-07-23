"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
import { useTranslations } from "next-intl";

export default function SellerData() {
  const { sellerData } = useAuthContext();
  const { email, type_organization, country, itn, name, last_name, patronymic, company_name } =
    sellerData.profile;

  const t = useTranslations("main.sellerScreen.sellerData");

  return (
    <div className='self-start flex flex-col gap-7'>
      <h2 className='text-black text-[30px] font-first'>{t("title")}</h2>
      <ul className='flex flex-col gap-5 text-black text-[18px]'>
        <li>
          <span className='opacity-40'>{t("fields.email")}: </span>
          {email}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.type_organization")}: </span>
          {type_organization}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.country")}: </span>
          {country}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.itn")}: </span>
          {itn}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.name")}: </span>
          {name}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.last_name")}: </span>
          {last_name}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.patronymic")}: </span>
          {patronymic}
        </li>
        <li>
          <span className='opacity-40'>{t("fields.company_name")}: </span>
          {company_name}
        </li>
      </ul>
    </div>
  );
}
