import Image from "next/image";
import React from "react";

export default function RateRender({ rate }: { rate: number }) {
  const fixedRate = Math.floor(rate);
  return (
    <div className='flex'>
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <Image
            width={20}
            height={20}
            key={index}
            alt='rate.svg'
            src={index < fixedRate ? "/icons/bookCard/rate.svg" : "/icons/bookCard/rateGrey.svg"}
          />
        );
      })}
    </div>
  );
}
