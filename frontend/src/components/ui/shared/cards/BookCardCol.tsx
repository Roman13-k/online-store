import Image from "next/image";
import React from "react";
import LikeButton from "../buttons/LikeButton";
import { P1 } from "../text";
import MainButton from "../buttons/MainButton";
import CopyButton from "../buttons/CopyButton";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface BookCardColProps {
  price: number;
  title: string;
  comments: number;
  rating: number;
  images: string[];
  id: string;
  category_slug: string;
}

export function CommentAndRating({
  comments,
  rating,
  title,
  isNeedCopy = true,
}: {
  comments: number;
  rating: number;
  title: string;
  isNeedCopy?: boolean;
}) {
  return (
    <div className='flex w-full gap-6'>
      <div className='flex gap-1'>
        <Image width={18} height={18} alt='icon.svg' src={"/icons/bookCard/rate.svg"} />
        <P1 className='opacity-40'>{rating.toFixed(1)}</P1>
      </div>
      <div className='flex gap-1'>
        <Image width={18} height={18} alt='icon.svg' src={"/icons/bookCard/comment.svg"} />
        <P1 className='opacity-40'>{comments}</P1>
      </div>
      {isNeedCopy && <CopyButton textToCopy={title} className='ml-auto' />}
    </div>
  );
}

export default function BookCardCol({
  price,
  title,
  comments,
  rating,
  images,
  id,
  category_slug,
}: BookCardColProps) {
  const t = useTranslations("shared");
  return (
    <Link
      href={`/catalog/${category_slug}/${id}`}
      className='p-3 bg-grey-f5f7 rounded-[5px] shadow-normal flex flex-col items-center relative font-first w-[281px] min-w-[280px]'>
      <LikeButton className='absolute top-3 right-3' />
      <Image
        width={166}
        height={253}
        className='object-contain mb-[14px]'
        src={images[0]}
        alt='book.png'
      />
      <P1 className='mb-[11px] line-clamp-2'>{title}</P1>
      <div className='flex w-full gap-6'>
        <div className='flex gap-1'>
          <Image width={18} height={18} alt='icon.svg' src={"/icons/bookCard/rate.svg"} />
          <P1 className='opacity-40'>{rating.toFixed(1)}</P1>
        </div>
        <div className='flex gap-1'>
          <Image width={18} height={18} alt='icon.svg' src={"/icons/bookCard/comment.svg"} />
          <P1 className='opacity-40'>{comments}</P1>
        </div>
        <CopyButton textToCopy={title} className='ml-auto' />
      </div>
      <p className='text-black font-semibold text-[22px] mb-[11px] self-start'>{price} ₽</p>
      <MainButton className='w-full'>{t("backet")}</MainButton>
    </Link>
  );
}
