import BookCardCol from "@/components/ui/shared/cards/BookCardCol";
import BooksContainer from "@/components/ui/shared/containers/BooksContainer";
import { H1 } from "@/components/ui/shared/text";
import { BookCards } from "@/utils/catalogPage";
import React from "react";

export default function NewBooks() {
  return (
    <section className='flex flex-col gap-8'>
      <H1>Новинки</H1>
      <BooksContainer>
        {Array(20)
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
                images={book.images}
                key={index}
              />
            );
          })}
      </BooksContainer>
    </section>
  );
}
