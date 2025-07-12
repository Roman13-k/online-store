"use client";
import { BookCards } from "@/utils/catalogPage";
import React, { useState } from "react";
import BookCardRow from "../../shared/cards/BookCardRow";
import BookCardCol from "../../shared/cards/BookCardCol";
import { DirectionType } from "@/types";
import Pagination from "../../shared/pagination/Pagination";

export default function CatalogData({ direction }: { direction: DirectionType }) {
  const [count, setCount] = useState(10);

  return (
    <section className='flex flex-wrap w-full gap-5'>
      {direction === "col" &&
        Array(count)
          .fill(BookCards)
          .map((book, index) => {
            return (
              <BookCardCol
                price={book.price}
                title={book.title}
                comments={book.comments}
                rating={book.rating}
                image={book.image}
                key={index}
              />
            );
          })}
      {direction === "row" &&
        Array(count)
          .fill(BookCards)
          .map((book, index) => {
            return (
              <BookCardRow
                key={index}
                price={book.price}
                title={book.title}
                comments={book.comments}
                rating={book.rating}
                image={book.image}
                author={book.author}
                publishing={book.publishing}
                isbn={book.isbn}
                series={book.series}
                year={book.year}
              />
            );
          })}
      <div className='flex flex-col gap-5 w-full'>
        <button
          onClick={() => setCount((prev) => prev + 10)}
          className='w-full py-4 shadow-normal bg-grey-f5f7 rounded-[5px] text-black font-first text-[18px]'>
          Показать ещё
        </button>
        <Pagination />
      </div>
    </section>
  );
}
