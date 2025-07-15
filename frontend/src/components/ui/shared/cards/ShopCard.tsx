import { ShopInterface } from "@/interface/shoppage/shop";
import Image from "next/image";
import React from "react";
import { H1 } from "../text";
import LikeButton from "../buttons/LikeButton";
import ShareButton from "../buttons/ShareButton";
import InfoButton from "../buttons/InfoButton";

export default function ShopCard({ shop }: { shop: ShopInterface }) {
  return (
    <div className='flex gap-2 items-center'>
      <Image src={shop.cover} alt='shop.png' width={72} height={72} />
      <div className='flex flex-col gap-2 justify-center text-black'>
        <H1 className='text-[18px] font-semibold'>{shop.title}</H1>
        <div className='flex gap-7'>
          <div className='flex gap-1 font-first text-[16px] text-black'>
            <Image width={20} height={20} src={"/icons/bookCard/rate.svg"} alt='rate.svg' />
            {shop.rate.toFixed(1)}
          </div>
          <div className='flex gap-3'>
            <LikeButton />
            <ShareButton isNeedText={false} />
            <InfoButton text={shop.description} />
          </div>
        </div>
      </div>
    </div>
  );
}
