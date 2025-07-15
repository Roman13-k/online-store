"use client";
import MainButton from "@/components/ui/shared/buttons/MainButton";
import Image from "next/image";
import React, { useState } from "react";

export default function CommentForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <>
      <form className='flex flex-col gap-4 font-first'>
        <div>
          {Array.from({ length: 5 }, (_, index) => {
            const starNumber = index + 1;
            const isActive = hovered >= starNumber || rating >= starNumber;

            return (
              <button
                type='button'
                key={index}
                onClick={() => setRating(starNumber)}
                onMouseEnter={() => setHovered(starNumber)}
                onMouseLeave={() => setHovered(0)}
                className='w-8 h-8 p-0 border-none bg-transparent'>
                <Image
                  src={isActive ? "/icons/bookCard/rate.svg" : "/icons/bookCard/rateGrey.svg"}
                  alt='star'
                  width={32}
                  height={32}
                />
              </button>
            );
          })}
        </div>
        <input
          name='userName'
          className='p-3 text-[16px] text-black placeholder:text-black/40 border-2 rounded-[5px] border-black/40 '
          type='text'
          placeholder='Имя (необязательно)'
        />
        <textarea
          name='text'
          className='p-3 text-[16px] text-black placeholder:text-black/40 border-2  rounded-[5px] border-black/40 '
          placeholder='Отзыв'
        />
        <label className='flex items-center gap-2 cursor-pointer'>
          <input type='file' className='hidden' accept='*/image' />
          <Image
            className='opacity-40'
            width={40}
            height={40}
            src='/icons/bookCard/file.svg'
            alt='file.svg'
          />
          <p className='text-[16px] text-black/40'>Прикрепите фото или видео (по желанию)</p>
        </label>
      </form>
      <MainButton>Оставить отзыв</MainButton>
    </>
  );
}
