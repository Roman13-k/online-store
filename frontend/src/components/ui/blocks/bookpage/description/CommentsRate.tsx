import MainButton from "@/components/ui/shared/buttons/MainButton";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface RateBlockInterface {
  src: string;
  percent: number;
  rate: number;
}

export function RateBlock({ rate, src, percent }: RateBlockInterface) {
  return (
    <div className='flex items-center w-full gap-3'>
      <Image src={src} alt='rate.svg' width={100} height={20} />
      <div className='w-full h-1.5 bg-black/40 rounded-full overflow-hidden'>
        <div className='h-full bg-orange-main' style={{ width: `${percent * 100}%` }} />
      </div>
      <p className='text-[16px] text-black/40'>{rate}</p>
    </div>
  );
}

export default function CommentsRate({
  rateArray,
  count,
  setIsFormOpen,
}: {
  rateArray: number[];
  count: number;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className='flex flex-col gap-3 font-first'>
        <RateBlock src='/icons/rate/r5.svg' rate={rateArray[0]} percent={rateArray[0] / count} />
        <RateBlock src='/icons/rate/r4.svg' rate={rateArray[1]} percent={rateArray[1] / count} />
        <RateBlock src='/icons/rate/r3.svg' rate={rateArray[2]} percent={rateArray[2] / count} />
        <RateBlock src='/icons/rate/r2.svg' rate={rateArray[3]} percent={rateArray[3] / count} />
        <RateBlock src='/icons/rate/r1.svg' rate={rateArray[4]} percent={rateArray[4] / count} />
      </div>
      <MainButton onPress={() => setIsFormOpen(true)}>Написать отзыв</MainButton>
    </>
  );
}
