"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function InfoButton({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Image src={"/icons/info.svg"} alt='info.svg' width={25} height={22} />
      {isHovered && (
        <div className='absolute left-1/2 top-full mt-2 -translate-x-1/2 z-10 w-max max-w-[200px] rounded-md bg-grey-f5f7 p-2 shadow-normal'>
          <p className='font-first text-[14px] text-black break-words'>{text}</p>
        </div>
      )}
    </button>
  );
}
