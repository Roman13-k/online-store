import { BookInformation } from "@/components/ui/shared/cards/BookCardRow";
import { ShopInterface } from "@/interface/shoppage/shop";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BookData({
  series,
  publishing,
  year,
  author,
  isbn,
  typeBook,
  shop,
}: BookInformation & { shop: ShopInterface }) {
  return (
    <div className='flex flex-col min-w-[466px]'>
      <BookInformation
        typeBook={typeBook}
        author={author}
        series={series}
        publishing={publishing}
        year={year}
        isbn={isbn}
        isDot={true}
      />
      <Link href='#description' className='text-orange-main text-[16px] font-first self-start mt-4'>
        Перейти к описанию
      </Link>
      <span className='my-6 w-full h-[1px] bg-grey-d9'></span>
      <Link href={`/shop/${shop.id}`} className='flex gap-2 items-center'>
        <Image src={shop.cover} alt='shop.png' width={72} height={72} />
        <div className='flex flex-col gap-2 justify-center text-black'>
          <p className='text-[18px] font-semibold'>{shop.title}</p>
          <p className='opacity-50'>{shop.description}</p>
        </div>
      </Link>
    </div>
  );
}
