import React from "react";
import { H1 } from "../../shared/text";
import { BookCards } from "@/utils/catalogPage";
import BooksContainer from "@/components/ui/shared/containers/BooksContainer";
import BookCardCol from "../../shared/cards/BookCardCol";

export default function CatalogResently() {
  return (
    <section className='flex flex-col gap-6'>
      <H1>Вы недавно интересовались</H1>
      <BooksContainer>
        {Array(3)
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
      </BooksContainer>
    </section>
  );
}
