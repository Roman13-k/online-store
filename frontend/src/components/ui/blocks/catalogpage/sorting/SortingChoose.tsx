"use client";
import ChooseButton from "@/components/ui/shared/buttons/ChooseButton";
import SortArrow from "@/components/ui/shared/icons/SortArrow";
import { sortingChoose } from "@/utils/catalogPage/sorting";
import React, { useState } from "react";

export default function SortingChoose() {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [chooseСriterion, setChooseСriterion] = useState<null | number>(null);

  const handleChoose = (index: number) => {
    setChooseСriterion((prev) => (prev === index ? null : index));
  };
  return (
    <div className='flex justify-between gap-5'>
      <div className='flex flex-wrap gap-2'>
        {sortingChoose.map((choose, index) => {
          if (index > 5 && !isFullOpen) return;
          return (
            <ChooseButton
              key={index}
              onClick={() => handleChoose(index)}
              className={`${chooseСriterion == index ? "border-orange-main" : "border-grey-e9 "}`}>
              {choose}
            </ChooseButton>
          );
        })}
      </div>
      <button
        onClick={() => setIsFullOpen((prev) => !prev)}
        className={`${
          isFullOpen ? "text-orange-main font-normal " : " text-black font-light "
        } text-[14px] self-start mt-2  flex items-center justify-center gap-1`}>
        {isFullOpen ? "Свернуть " : "Показать ещё "}
        <SortArrow isFullOpen={isFullOpen} />
      </button>
    </div>
  );
}
