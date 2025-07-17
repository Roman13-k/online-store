"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";

export default function SellerData() {
  const { sellerData } = useAuthContext();
  const { email, type_organization, country, itn, name, last_name, patronymic, company_name } =
    sellerData.profile;

  return (
    <div className='self-start flex flex-col gap-7'>
      <h2 className='text-black text-[30px] font-first'>Информация о пользователе</h2>
      <ul className='flex flex-col gap-5 text-black text-[18px]'>
        <li>
          <span className='opacity-40'>Email: </span>
          {email}
        </li>
        <li>
          <span className='opacity-40'>Тип организации: </span>
          {type_organization}
        </li>
        <li>
          <span className='opacity-40'>Страна: </span>
          {country}
        </li>
        <li>
          <span className='opacity-40'>ИНН: </span>
          {itn}
        </li>
        <li>
          <span className='opacity-40'>Имя: </span>
          {name}
        </li>
        <li>
          <span className='opacity-40'>Фамилия: </span>
          {last_name}
        </li>
        <li>
          <span className='opacity-40'>Отчество: </span>
          {patronymic}
        </li>
        <li>
          <span className='opacity-40'>Название компании: </span>
          {company_name}
        </li>
      </ul>
    </div>
  );
}
