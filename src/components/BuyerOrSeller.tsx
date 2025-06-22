"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function BuyerOrSeller({ setIsOpenChoose, isOpenChoose }) {
  const navigate = useRouter();
  return (
    <div
      onClick={() => {
        setIsOpenChoose(false);
        navigate.push("/");
      }}
      className='absolute flex justify-center items-center bg-grey-e9-70 w-full h-screen overflow-hidden z-30'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center justify-start bg-white w-[503px] h-[535px] rounded-[45px] p-6'>
        <button
          onClick={() => {
            setIsOpenChoose(false), navigate.push("/");
          }}
          className='ml-auto'>
          <img src='/icons/close-btn.svg' />
        </button>
        <Link
          onClick={() => {
            setIsOpenChoose(false);
          }}
          href={`${isOpenChoose}/buyer`}
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/buyer.svg' />
          <p className='font-bold text-[22px] leading-[88%] mt-3'>Покупатель</p>
        </Link>
        <div className='flex items-center mt-6 mb-6'>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
          <p className='ml-3 mr-3'>или</p>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
        </div>
        <Link
          onClick={() => setIsOpenChoose(false)}
          href={`${isOpenChoose}/seller`}
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/seller.svg' className='' />
          <p className='font-bold text-[22px] leading-[88%]'>Продавец</p>
        </Link>
      </div>
    </div>
  );
}
