"use client";
import { BookCards } from "@/utils/catalogPage";
import React, { useState } from "react";
import BookCardRow from "../../shared/cards/BookCardRow";
import BookCardCol from "../../shared/cards/BookCardCol";
import { DirectionType } from "@/types";
import Pagination from "../../shared/pagination/Pagination";

export default function CatalogData({ direction }: { direction: DirectionType }) {
  const [count, setCount] = useState(4);
  const [page, setPage] = useState(1);
  const limit = 4;

  const handleShowMore = () => {
    setCount((prev) => prev + limit);
    setPage((prev) => prev + 1);
  };

  return (
    <section className='flex flex-wrap w-full gap-5'>
      {direction === "col" &&
        Array(count)
          .fill(BookCards)
          .map((book, index) => {
            return (
              <BookCardCol
                id={book.id}
                category_slug={book.category_slug}
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
                id={book.id}
                category_slug={book.category_slug}
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
          onClick={handleShowMore}
          className='w-full py-4 shadow-normal bg-grey-f5f7 rounded-[5px] text-black font-first text-[18px]'>
          Показать ещё
        </button>
        <Pagination page={page} setPage={setPage} count={Math.ceil(count / limit)} />
      </div>
    </section>
  );
}
