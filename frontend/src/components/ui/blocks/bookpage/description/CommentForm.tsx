"use client";
import MainButton from "@/components/ui/shared/buttons/MainButton";
import FormInput from "@/components/ui/shared/inputs/FormInput";
import FormTextarea from "@/components/ui/shared/textareas/FormTextarea";
import Image from "next/image";
import React, { useState } from "react";

export default function CommentForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const symbolLimit = { userName: 25, description: 750 };
  const [text, setText] = useState({ userName: "", description: "" });

  return (
    <>
      <form className='flex flex-col gap-3 font-first'>
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
        <FormInput
          onChange={(e) => setText((prev) => ({ ...prev, userName: e.target.value }))}
          value={text.userName}
          name='userName'
          className={` ${
            text.userName.length > symbolLimit.userName ? "border-red-500" : "border-black/40"
          }`}
          type='text'
          placeholder='Имя (необязательно)'>
          <p
            className={`${
              text.userName.length > symbolLimit.userName
                ? "text-red font-medium"
                : "text-black/50 font-normal"
            } ml-auto`}>
            {text.userName.length} / {symbolLimit.userName}
          </p>
        </FormInput>

        <FormTextarea
          onChange={(e) => setText((prev) => ({ ...prev, description: e.target.value }))}
          value={text.description}
          name='description'
          className={`${
            text.description.length > symbolLimit.description
              ? "border-red-500"
              : "border-black/40 "
          }`}
          placeholder='Отзыв'>
          <p
            className={`${
              text.description.length > symbolLimit.description
                ? "text-red font-medium"
                : "text-black/50 font-normal"
            } ml-auto`}>
            {text.description.length} / {symbolLimit.description}
          </p>
        </FormTextarea>

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
