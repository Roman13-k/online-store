import { BookCardInterface } from "@/interface/catalog/bookCard";

export const categories = [
  "Художественная литература",
  "Нехудожественная литература",
  "Учебная литература и словари",
  "Молодёжная литература",
  "Комиксы, манга, артбуки",
  "Книги для детей",
  "Периодические издания",
  "Все книги",
];

export const BookCards: BookCardInterface = {
  id: "0",
  title:
    "Отношения. Визуальный гид по любви и дружбе из серии Чему не учат в школе для подростков | Smart Reading",
  description:
    "Умение создавать и поддерживать отношения, без преувеличения, самый важный навык. Из отношений соткана вся жизнь. Близость с людьми является источником как истинного счастья и радости, так и самых глубоких ран и разочарований. Настоящие отношения — основа удовлетворения жизнью и долголетия (научно доказано Гарвардским исследованием).",
  price: 1083,
  // author: string,
  // age_reader: number,
  // language: string,
  // type_cover: string,
  // publishing: string,
  // isbn: number,
  // series: string,
  image: "/img/books/book.png",
  comments: 1123,
  rating: 5.0,
};
