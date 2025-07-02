"use client";

import TextDivider from "@/components/ui/shared/divider/TextDivider";
import { AuthChoose } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

interface BuyerOrSellerModalProps {
  setIsOpenChoose: Dispatch<SetStateAction<boolean | AuthChoose>>;
  isOpenChoose: boolean | string;
}

export function BuyerOrSellerModal({ setIsOpenChoose, isOpenChoose }: BuyerOrSellerModalProps) {
  return (
    <div
      onClick={() => {
        setIsOpenChoose(false);
      }}
      className='absolute flex justify-center items-center bg-grey-e9-70 w-full h-screen overflow-hidden z-30'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center justify-start bg-white w-[503px] h-[535px] rounded-[45px] p-6'>
        <button
          onClick={() => {
            setIsOpenChoose(false);
          }}
          className='ml-auto'>
          <img src='/icons/close-btn.svg' />
        </button>
        <button
          onClick={() => {
            setIsOpenChoose(false);
          }}
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/buyer.svg' />
          <p className='font-bold text-[22px] leading-[88%] mt-3'>Покупатель</p>
        </button>
        <TextDivider />
        <button
          onClick={() => setIsOpenChoose(false)}
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/seller.svg' className='' />
          <p className='font-bold text-[22px] leading-[88%]'>Продавец</p>
        </button>
      </div>
    </div>
  );
}
