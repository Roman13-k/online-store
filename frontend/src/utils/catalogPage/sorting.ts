import { SortingOptionsIntrface } from "@/interface/catalog/sorting";

export const sortingChoose = [
  "В наличии",
  "Предзаказ",
  "Ожидаются",
  "Нет в продаже",
  "Новинки",
  "Лидеры продаж",
  "Fake",
  "Fake",
  "Fake",
];

export const sortingOptions: SortingOptionsIntrface[] = [
  {
    title: "Цене",
    options: [
      { value: "price-asc", label: "Сначала дешёвые" },
      { value: "price-desc", label: "Сначала дорогие" },
    ],
  },
  {
    title: "Рейтингу",
    options: [
      { value: "popular", label: "Популярные" },
      { value: "discussed", label: "Обсуждаемые" },
      { value: "top-rated", label: "С лучшей оценкой" },
    ],
  },
  {
    title: "Размеру скидки",
    options: [
      { value: "discount-desc", label: "C наибольшей скидкой" },
      { value: "discount-asc", label: "С наименьшей скидкой" },
    ],
  },
];
