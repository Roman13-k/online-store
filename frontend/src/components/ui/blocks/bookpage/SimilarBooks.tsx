import React from "react";
import BookCardCol from "../../shared/cards/BookCardCol";
import { BookCards } from "@/utils/catalogPage";
import { H1 } from "../../shared/text";
import BooksContainer from "@/components/ui/shared/containers/BooksContainer";

export default function SimilarBooks() {
  return (
    <section className='flex flex-col gap-6'>
      <H1>Похожие книги</H1>
      <BooksContainer>
        {Array(3)
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
      </BooksContainer>
    </section>
  );
}
