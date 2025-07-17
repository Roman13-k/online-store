import { BuyerInterface } from "@/interface/profilepage/profile";
import React from "react";

export default function PersonalData({ buyerData }: { buyerData: BuyerInterface }) {
  return (
    <div className='self-start flex flex-col gap-7'>
      <h2 className='text-black text-[30px] font-first'>Информация о пользователе</h2>
      <ul className='flex flex-col gap-5'>
        <li className='text-black text-[18px]'>
          <span className='opacity-40'>Email: </span>
          {buyerData?.profile.email}
        </li>
      </ul>
    </div>
  );
}
