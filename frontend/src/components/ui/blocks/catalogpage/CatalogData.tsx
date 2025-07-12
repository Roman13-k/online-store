import { BookCards } from "@/utils/catalogPage";
import React from "react";
import BookCardRow from "../../shared/cards/BookCardRow";
import BookCardCol from "../../shared/cards/BookCardCol";
import { DirectionType } from "@/types";

export default function CatalogData({ direction }: { direction: DirectionType }) {
  return (
    <section className='flex flex-wrap w-full gap-5'>
      {direction === "col" &&
        Array(20)
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
        Array(20)
          .fill(BookCards)
          .map((card, index) => {
            return <BookCardRow key={index} />;
          })}
    </section>
  );
}
