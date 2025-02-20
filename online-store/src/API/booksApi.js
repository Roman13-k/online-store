import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fakeBooksList = [
  {
    name: "1984",
    count: 12,
    description:
      "Антиутопический роман Джорджа Оруэлла о тоталитарном государстве и контроле над сознанием.",
  },
  {
    name: "Мастер и Маргарита",
    count: 25,
    description:
      "Мистический роман Михаила Булгакова, соединяющий сатиру на общество и философские размышления о добре и зле.",
  },
  {
    name: "Преступление и наказание",
    count: 8,
    description:
      "Роман Фёдора Достоевского о борьбе совести и разума, преступлении и искуплении.",
  },
  {
    name: "Гарри Поттер и философский камень",
    count: 50,
    description:
      "Первая книга Джоан Роулинг о приключениях юного волшебника Гарри Поттера в школе Хогвартс.",
  },
  {
    name: "Война и мир",
    count: 5,
    description:
      "Эпический роман Льва Толстого, описывающий судьбы нескольких семей на фоне наполеоновских войн.",
  },
  {
    name: "Шерлок Холмс: Собрание рассказов",
    count: 40,
    description:
      "Сборник детективных рассказов Артура Конан Дойла о легендарном сыщике Шерлоке Холмсе.",
  },
  {
    name: "Алиса в Стране чудес",
    count: 30,
    description:
      "Классическая сказка Льюиса Кэрролла о приключениях девочки Алисы в волшебном мире.",
  },
  {
    name: "Три товарища",
    count: 18,
    description:
      "Роман Эриха Марии Ремарка о дружбе, любви и потерянном поколении после Первой мировой войны.",
  },
];

function fakeLoading() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export const booksApi = createApi({
  reducerPath: "book",
  baseQuery: () => {}, //fetchBaseQuery({baseUrl:""})
  endpoints: (build) => ({
    booksList: build.query({
      async queryFn() {
        await fakeLoading();
        return { data: fakeBooksList };
      },
      //   query:(data)=>({
      //     url:"",
      //     method:"GET",
      //     body:data,
      //   })
    }),
  }),
});

export const { useBooksListQuery } = booksApi;
