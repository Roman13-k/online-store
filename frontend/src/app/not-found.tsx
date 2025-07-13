"use client";
import { Button } from "@heroui/react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Страница не найдена | ПРОКниги",
  description: "Похоже, такой страницы не существует. Вернитесь на главную.",
  robots: {
    index: false,
    follow: false,
  },
}; // если не ошибибаюсь Next по умолчанию not-found не индексирует

export default function NotFound() {
  return (
    <div className='flex flex-col items-center w-full h-full mt-[50px] gap-7'>
      <h2 className='text-xl font-semibold'>Что вы тут делаете?!</h2>
      <div className='flex justify-center items-center'>
        <span className='text-[#ff4f03] text-[300px] font-bold'>4</span>
        <Image
          width={457}
          height={327}
          className='bg-transparent'
          src='/img/error.png'
          alt='error.png'
        />
        <span className='text-[#ff4f03] text-[300px] font-bold'>4</span>
      </div>
      <Button
        className='font-semibold text-lg p-6 flex items-center gap-2'
        onPress={() => redirect("/")}
        startContent={
          <Image width={20} height={20} src={"icons/arrows/back.svg"} alt='back.svg' />
        }>
        Вернуться домой
      </Button>
    </div>
  );
}
