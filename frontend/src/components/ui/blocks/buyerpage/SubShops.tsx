import { BookCards } from "@/utils/catalogPage";
import Image from "next/image";
import React from "react";
import LikeButton from "../../shared/buttons/LikeButton";

export default function SubShops() {
  return (
    <div className='mt-5 flex flex-wrap gap-6 font-first'>
      {Array(7)
        .fill(BookCards.shop)
        .map((shop, index) => {
          return (
            <div
              key={index}
              className='rounded-[5px] shadow-normal py-3 px-5 bg-grey-f5f7 flex items-center gap-3'>
              <Image src={shop.cover} alt='shop.svg' width={62} height={62} />
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-[18px] text-black'>{shop.title}</p>
                <div className='flex gap-3'>
                  <p className='flex gap-1.5'>
                    <Image width={20} height={20} src={"/icons/bookCard/rate.svg"} alt='' />{" "}
                    {shop.rate.toFixed(1)}
                  </p>
                  <LikeButton initValue={true} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
