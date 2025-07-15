"use client";
import { CommentInterface } from "@/interface/catalogpage/bookCard";
import React, { Dispatch, SetStateAction } from "react";
import RateRender from "../RateRender";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Comment({
  comment,
  setIsFormOpen,
}: {
  comment: CommentInterface;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <div className='flex gap-3 items-start'>
      <div className='flex flex-col gap-3 min-w-[100px]'>
        <RateRender rate={comment.rate} />
        <p className='text-black/40 font-first'>
          {comment.date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className='flex flex-col items-start gap-3 text-[16px] font-first'>
        <p>{comment.userName}</p>
        <p>{comment.text}</p>
        {comment.cover && (
          <Image
            width={270}
            height={270}
            className='object-contain rounded-[5px]'
            src={comment.cover}
            alt='comment.png'
          />
        )}
        <button
          className='font-first text-[16px] text-orange-main'
          onClick={() => {
            setIsFormOpen(true);
            router.push("#description");
          }}>
          Комментировать
        </button>
      </div>
    </div>
  );
}
