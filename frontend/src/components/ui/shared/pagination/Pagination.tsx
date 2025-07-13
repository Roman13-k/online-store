"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
}

export default function Pagination({ page, setPage, count }: PaginationProps) {
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(7);

  const handleForward = () => {
    const newPage = page + 1;
    if (newPage > maxIndex + 1) {
      setMinIndex((prev) => prev + 1);
      setMaxIndex((prev) => prev + 1);
    }
    setPage(newPage);
  };

  const handleBack = () => {
    const newPage = page - 1;
    if (newPage < minIndex + 1) {
      setMinIndex((prev) => prev - 1);
      setMaxIndex((prev) => prev - 1);
    }
    setPage(newPage);
  };

  const offset = (page - 1 - minIndex) * 56;

  return (
    <div className='px-[68px] h-[60px] w-full bg-grey-f5f7 shadow-normal flex items-center justify-center'>
      <button
        onClick={() => {
          setPage(1);
          setMinIndex(0);
          setMaxIndex(7);
        }}
        disabled={page === 1}
        className='flex w-[56px] items-center justify-center disabled:opacity-40'>
        <Image
          className='transform rotate-180'
          width={7}
          height={13}
          src='/icons/arrows/arrow-up.svg'
          alt='arrow.svg'
        />
        <Image
          className='transform rotate-180'
          width={7}
          height={13}
          src='/icons/arrows/arrow-up.svg'
          alt='arrow.svg'
        />
      </button>

      <button
        onClick={handleBack}
        disabled={page === 1}
        className='w-[56px] flex items-center justify-center disabled:opacity-40'>
        <Image
          className='transform rotate-180'
          width={7}
          height={13}
          src='/icons/arrows/arrow-up.svg'
          alt='arrow.svg'
        />
      </button>

      <div className='relative h-full flex overflow-hidden'>
        <div
          style={{
            transform: `translateX(${offset}px)`,
          }}
          className='absolute inset-y-0 left-0 rounded-[5px] h-full border-3 border-orange-main w-[56px] transition-all duration-300 ease-in-out'></div>

        {Array.from({ length: count }, (_, index) => {
          if (index < minIndex || index > maxIndex) return null;
          return (
            <div
              key={index}
              onClick={() => setPage(index + 1)}
              className='w-[56px] h-full flex items-center justify-center font-first text-[18px] text-black cursor-pointer z-10'>
              {index + 1}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleForward}
        disabled={page === count}
        className='w-[56px] flex items-center justify-center disabled:opacity-40'>
        <Image width={7} height={13} src='/icons/arrows/arrow-up.svg' alt='arrow.svg' />
      </button>

      <button
        onClick={() => {
          setPage(count);
          const max = count - 1;
          const min = Math.max(0, count - 8);
          setMinIndex(min);
          setMaxIndex(max);
        }}
        disabled={page === count}
        className='flex w-[56px] items-center justify-center disabled:opacity-40'>
        <Image width={7} height={13} src='/icons/arrows/arrow-up.svg' alt='arrow.svg' />
        <Image width={7} height={13} src='/icons/arrows/arrow-up.svg' alt='arrow.svg' />
      </button>
    </div>
  );
}
