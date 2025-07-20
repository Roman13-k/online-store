"use client";
import React, { useState } from "react";
import Fieldset from "@/components/ui/shared/fieldset/Fieldset";
import MainButton from "../../../shared/buttons/MainButton";
import BookPrice from "./BookPrice";
import BookAuthor from "./BookAuthor";
import { useGetFiltersQuery } from "@/store/api/filtersApi";

export default function Filters() {
  const { data, isError, isLoading } = useGetFiltersQuery("");
  const [priceValue, setPriceValue] = useState<number[]>([5000, 15000]);

  const filters = data?.data?.[0];

  return (
    <aside className='py-5 px-6 bg-grey-f5f7 shadow-normal flex flex-col gap-5 min-w-[333px] rounded-[5px]'>
      <Fieldset
        legend='Тип книги'
        fieldsetData={filters?.BookType ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <BookPrice priceValue={priceValue} setPriceValue={setPriceValue} />
      <BookAuthor />
      <Fieldset
        legend='Возраст читателя'
        fieldsetData={filters?.AgeOfReader ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <Fieldset
        legend='Язык'
        fieldsetData={filters?.BookLanguages ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <Fieldset
        legend='Тип обложки'
        fieldsetData={filters?.BookCovers ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <MainButton className='mt-2'>Применить</MainButton>
      <MainButton btnColor='white'>Очистить</MainButton>
    </aside>
  );
}
