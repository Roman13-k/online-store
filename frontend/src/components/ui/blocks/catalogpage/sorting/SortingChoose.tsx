"use client";
import ChooseButton from "@/components/ui/shared/buttons/ChooseButton";
import SortArrow from "@/components/ui/shared/icons/SortArrow";
import LoadingSmall from "@/components/ui/shared/loading/LoadingSmall";
import { useGetSortingChooseQuery } from "@/store/api/sortingApi";
import { useLocale, useTranslations } from "next-intl";
import React, { useState, useMemo } from "react";

type ChooseData = {
  choose: string[];
};

type DataItem = {
  id: number;
  documentId: string;
  choose: ChooseData;
  locale: string;
  localizations?: DataItem[];
};

export default function SortingChoose() {
  const locale = useLocale();
  const t = useTranslations();
  const { data, isLoading, isError } = useGetSortingChooseQuery("");
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [chooseCriterion, setChooseCriterion] = useState<null | number>(null);

  const handleChoose = (index: number) => {
    setChooseCriterion((prev) => (prev === index ? null : index));
  };

  //думаю всё же стоило создать функцию для локализации данных
  const chooseList = useMemo(() => {
    if (!data) return [];
    const mainData: DataItem = data.data;
    if (mainData.locale === locale) {
      return mainData.choose.choose;
    }
    const localized = mainData.localizations?.find((loc) => loc.locale === locale);
    if (localized) {
      return localized.choose.choose;
    }
    if (mainData.locale === "en") return mainData.choose.choose;
    const enLocalization = mainData.localizations?.find((loc) => loc.locale === "en");
    return enLocalization?.choose.choose ?? mainData.choose.choose;
  }, [data, locale]);

  return (
    <div className='flex justify-between gap-5'>
      {isLoading ? (
        <LoadingSmall />
      ) : isError ? (
        <p className='text-[18px] text-red-500'>Загрузка не удалась</p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {chooseList.map((item, index) => {
            if (index > 5 && !isFullOpen) return null;
            return (
              <ChooseButton
                key={index}
                onClick={() => handleChoose(index)}
                className={`${
                  chooseCriterion === index ? "border-orange-main" : "border-grey-e9"
                }`}>
                {item}
              </ChooseButton>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setIsFullOpen((prev) => !prev)}
        className={`${
          isFullOpen ? "text-orange-main font-normal" : "text-black font-light"
        } text-[14px] self-start mt-2 flex items-center justify-center gap-1`}>
        {isFullOpen ? t("collapse") : t("showMore")}
        <SortArrow isFullOpen={isFullOpen} />
      </button>
    </div>
  );
}
