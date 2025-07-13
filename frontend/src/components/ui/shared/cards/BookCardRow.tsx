"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CommentAndRating } from "./BookCardCol";
import CopyButton from "../buttons/CopyButton";
import LikeButton from "../buttons/LikeButton";
import MainButton from "../buttons/MainButton";

interface BookCardRowProps {
  id: string;
  price: number;
  title: string;
  comments: number;
  rating: number;
  image: string;

  author: string;
  publishing: string;
  isbn: string;
  series: string;
  year: number;
  category_slug: string;
}

export default function BookCardRow({
  price,
  title,
  comments,
  rating,
  image,
  author,
  publishing,
  isbn,
  series,
  year,
  id,
  category_slug,
}: BookCardRowProps) {
  return (
    <Link
      href={`/catalog/${category_slug}/${id}`}
      className='py-[30px] px-[28px] bg-grey-f5f7 rounded-[5px] shadow-normal flex items-center gap-[28px] font-first w-full'>
      <Image
        className='object-contain flex-shrink-0'
        height={217}
        width={143}
        src={image}
        alt='book.png'
      />
      <div className='flex flex-col gap-3'>
        <p className='text-black text-[22px] font-medium leading-[120%]'>{title}</p>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-5'>
            <CommentAndRating
              isNeedCopy={false}
              comments={comments}
              rating={rating}
              title={title}
            />
            <ul className='flex flex-col gap-2 text-black text-[16px]'>
              <li>
                <span className='opacity-40'>Издательство: </span> {publishing}
              </li>
              <li>
                <span className='opacity-40'>ISBN: </span> {isbn}
              </li>
              <li>
                <span className='opacity-40'>Серия: </span> {series}
              </li>
              <li>
                <span className='opacity-40'>Автор: </span> {author}
              </li>
              <li>
                <span className='opacity-40'>Год издания: </span> {year}
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-4 items-start justify-end'>
            <div className='flex gap-5 self-end mb-auto'>
              <CopyButton textToCopy={title} />
              <LikeButton />
            </div>
            <p className='text-orange-main font-semibold text-[28px] '>{price} ₽</p>
            <MainButton className='min-w-[274px]'>Положить в корзину</MainButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
