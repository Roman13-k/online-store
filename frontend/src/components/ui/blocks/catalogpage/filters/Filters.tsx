"use client";
import React, { useState } from "react";
import { ageOfReader, bookCovers, bookLanguages, bookTypes } from "@/utils/catalogPage/filters";
import Fieldset from "@/components/ui/shared/fieldset/Fieldset";
import MainButton from "../../../shared/buttons/MainButton";
import BookPrice from "./BookPrice";
import BookAuthor from "./BookAuthor";

export default function Filters() {
  const [priceValue, setPriceValue] = useState<number[]>([1000, 5000]);
  return (
    <aside className='py-5 px-6 bg-grey-f5f7 shadow-normal flex flex-col gap-5 min-w-[333px] rounded-[5px]'>
      <Fieldset legend='Тип книги' fieldsetData={bookTypes} />
      <BookPrice priceValue={priceValue} setPriceValue={setPriceValue} />
      <BookAuthor />
      <Fieldset legend='Возраст читателя' fieldsetData={ageOfReader} />
      <Fieldset legend='Язык' fieldsetData={bookLanguages} />
      <Fieldset legend='Тип обложки' fieldsetData={bookCovers} />
      <MainButton className='mt-2'>Применить</MainButton>
      <MainButton btnColor='white'>Очистить</MainButton>
    </aside>
  );
}
