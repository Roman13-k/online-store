import { BookPriceProps } from "@/interface/catalogpage/filters";
import React from "react";

interface CurrencyInputProps extends BookPriceProps {
  isMax: 0 | 1;
}

export default function CurrencyInput({ priceValue, setPriceValue, isMax }: CurrencyInputProps) {
  return (
    <div className='relative w-[130px]'>
      <input
        value={priceValue[isMax]}
        onChange={(e) => {
          if (Number(e.target.value) > 10000) {
            e.target.value = "10000";
            return;
          } else if (Number(e.target.value) < 0) {
            e.target.value = "0";
            return;
          }
          setPriceValue((prev) =>
            prev.map((val, i) => (i === isMax ? Number(e.target.value) : val)),
          );
        }}
        type='number'
        min='0'
        max='10000'
        className='w-full py-2 pr-6 pl-3 bg-grey-d9 text-black text-[16px] font-medium font-first rounded-[5px] appearance-none focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      />
      <span className='absolute right-2 top-1/2 opacity-40 -translate-y-1/2 text-black pointer-events-none text-[16px] font-medium font-first'>
        ₽
      </span>
    </div>
  );
}
