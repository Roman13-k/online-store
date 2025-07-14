import React from "react";
import { H1 } from "../../../shared/text";
import { BookCardInterface } from "@/interface/catalogpage/bookCard";
import LikeButton from "../../../shared/buttons/LikeButton";
import CopyButton from "../../../shared/buttons/CopyButton";
import Image from "next/image";
import ShareButton from "../../../shared/buttons/ShareButton";
import RateRender from "../RateRender";
import BookImages from "./BookImages";
import BookData from "./BookData";
import BookPrice from "./BookPrice";

export default function MainInfo({ book }: { book: BookCardInterface }) {
  return (
    <section className='flex flex-col font-first'>
      <H1 className='mb-4'>{book.title}</H1>
      <div className='flex gap-[38px] items-center'>
        <div className='text-black text-[16px] flex gap-4 items-center'>
          <div className='flex gap-0.5'>
            <RateRender rate={book.rating} />
            <p>{book.rating.toFixed(1)}</p>
          </div>
          <div className='flex gap-0.5'>
            <Image width={20} height={22} src='/icons/bookCard/comment.svg' alt='commets.svg' />
            <p>{book.comments} отзывов</p>
          </div>
        </div>

        <div className='flex gap-3 items-center text-[16px]'>
          <LikeButton className='opacity-50' isNeedText={true} />
          <p className='flex gap-1 text-black/50'>
            <CopyButton textToCopy={book.title} />
            копировать
          </p>
          <ShareButton />
        </div>

        <p className='ml-auto font-first text-black text-[16px]'>
          <span className='opacity-40'>Код товара: </span>
          {book.id}
        </p>
      </div>

      <div className='flex gap-6 mt-[44px]'>
        <BookImages images={book.images} />
        <BookData
          author={book.shop.title}
          series={book.series}
          publishing={book.publishing}
          year={book.year}
          isbn={book.isbn}
          typeBook={book.typeBook}
          shop={book.shop}
        />
        <BookPrice price={book.price} />
      </div>
    </section>
  );
}
