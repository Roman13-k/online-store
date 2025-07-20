"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CommentAndRating } from "./BookCardCol";
import CopyButton from "../buttons/CopyButton";
import LikeButton from "../buttons/LikeButton";
import MainButton from "../buttons/MainButton";
import { useTranslations } from "next-intl";

interface BookCardRowProps {
  id: string;
  price: number;
  title: string;
  comments: number;
  rating: number;
  images: string[];

  author: string;
  publishing: string;
  isbn: string;
  series: string;
  year: number;
  category_slug: string;
}

export interface BookInformation {
  publishing: string;
  isbn: string;
  series: string;
  year: number;
  author: string;
  typeBook?: string;
  isDot?: boolean;
}

function DotRow({
  label,
  value,
  isDot = false,
}: {
  label: string;
  value: string | number;
  isDot?: boolean;
}) {
  return (
    <li className='flex items-end text-[16px] text-black'>
      <span className='text-black/40 whitespace-nowrap'>{label}: </span>
      {isDot && <span className='flex-1 border-b border-dotted border-black/40 mx-2 mb-1'></span>}
      <span className='whitespace-nowrap'>{value}</span>
    </li>
  );
}

export function BookInformation({
  publishing,
  isbn,
  series,
  author,
  year,
  typeBook,
  isDot,
}: BookInformation) {
  return (
    <ul className='flex flex-col gap-2'>
      {typeBook && <DotRow isDot={isDot} label='Тип книги' value={typeBook} />}
      <DotRow isDot={isDot} label='Издательство' value={publishing} />
      <DotRow isDot={isDot} label='ISBN' value={isbn} />
      <DotRow isDot={isDot} label='Серия' value={series} />
      <DotRow isDot={isDot} label='Автор' value={author} />
      <DotRow isDot={isDot} label='Год издания' value={year} />
    </ul>
  );
}

export default function BookCardRow({
  price,
  title,
  comments,
  rating,
  images,
  author,
  publishing,
  isbn,
  series,
  year,
  id,
  category_slug,
}: BookCardRowProps) {
  const t = useTranslations("shared");
  return (
    <Link
      href={`/catalog/${category_slug}/${id}`}
      className='py-[30px] px-[28px] bg-grey-f5f7 rounded-[5px] shadow-normal flex items-center gap-[28px] font-first w-full'>
      <Image
        className='object-contain flex-shrink-0'
        height={217}
        width={143}
        src={images[0]}
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
            <BookInformation
              isbn={isbn}
              publishing={publishing}
              series={series}
              author={author}
              year={year}
            />
          </div>
          <div className='flex flex-col gap-4 items-start justify-end'>
            <div className='flex gap-5 self-end mb-auto'>
              <CopyButton textToCopy={title} />
              <LikeButton />
            </div>
            <p className='text-orange-main font-semibold text-[28px] '>{price} ₽</p>
            <MainButton className='min-w-[274px]'>{t("backet")}</MainButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
