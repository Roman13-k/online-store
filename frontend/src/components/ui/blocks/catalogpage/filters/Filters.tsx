"use client";
import React, { useState } from "react";
import Fieldset from "@/components/ui/shared/fieldset/Fieldset";
import MainButton from "../../../shared/buttons/MainButton";
import BookPrice from "./BookPrice";
import BookAuthor from "./BookAuthor";
import { useGetFiltersQuery } from "@/store/api/filtersApi";
import { useLocale } from "next-intl";

export interface FiltersLocalization {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  BookType: string[];
  AgeOfReader: string[];
  BookLanguages: string[];
  BookCovers: string[];
}

export default function Filters() {
  const { data, isError, isLoading } = useGetFiltersQuery("");
  const locale = useLocale();
  const [priceValue, setPriceValue] = useState<number[]>([5000, 15000]);

  const filters = data?.data?.[0];
  if (!filters) return null;

  const localizedFilters =
    locale === "en"
      ? filters
      : filters.localizations?.find((loc: FiltersLocalization) => loc.locale === locale) ?? filters;

  return (
    <aside className='py-5 px-6 bg-grey-f5f7 shadow-normal flex flex-col gap-5 min-w-[333px] rounded-[5px]'>
      <Fieldset
        legend={locale === "ru" ? "Тип книги" : locale === "zh-CN" ? "书籍类型" : "Book Type"}
        fieldsetData={localizedFilters.BookType ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <BookPrice priceValue={priceValue} setPriceValue={setPriceValue} />
      <BookAuthor />
      <Fieldset
        legend={
          locale === "ru" ? "Возраст читателя" : locale === "zh-CN" ? "读者年龄" : "Age of Reader"
        }
        fieldsetData={localizedFilters.AgeOfReader ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <Fieldset
        legend={locale === "ru" ? "Язык" : locale === "zh-CN" ? "语言" : "Language"}
        fieldsetData={localizedFilters.BookLanguages ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <Fieldset
        legend={locale === "ru" ? "Тип обложки" : locale === "zh-CN" ? "封面类型" : "Cover Type"}
        fieldsetData={localizedFilters.BookCovers ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <MainButton className='mt-2'>
        {locale === "ru" ? "Применить" : locale === "zh-CN" ? "应用" : "Apply"}
      </MainButton>
      <MainButton btnColor='white'>
        {locale === "ru" ? "Очистить" : locale === "zh-CN" ? "清除" : "Clear"}
      </MainButton>
    </aside>
  );
}
