import React, { Dispatch, SetStateAction } from "react";

interface HorizontalScrollProps {
  selectedBanner: number;
  setSelectedBanner: Dispatch<SetStateAction<number>>;
  count: number;
}

export default function HorizontalScroll({
  selectedBanner,
  setSelectedBanner,
  count,
}: HorizontalScrollProps) {
  return (
    <div className='flex gap-8'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          onClick={() => setSelectedBanner(index)}
          className={`block transition-all cursor-pointer duration-300 rounded-full ${
            selectedBanner === index
              ? "w-[22px] h-[22px] bg-grey-d9"
              : "w-[15px] h-[15px] bg-grey-e9"
          }`}></div>
      ))}
    </div>
  );
}
