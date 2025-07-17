"use client";
import React, { useState } from "react";
import Comments from "./Comments";
import { DescriptionData } from "./DescriptionData";
import Characteristics from "./Characteristics";
import { comments } from "@/utils/catalogPage/comments";

export type VariantType = "description" | "characteristics" | "reviewsRatings";

export default function Description({
  description,
  characteristics,
}: {
  description: string;
  characteristics: string;
}) {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>("description");
  return (
    <section id='description' className='w-full font-first'>
      <div className='flex gap-3 text-[18px]'>
        <button
          onClick={() => setSelectedVariant("description")}
          className={`shadow-[0_-2px_3px_0_rgba(18,18,18,0.25)] flex-1 border-b-3 bg-grey-f5f7 rounded-t-[5px] py-[21px] transition-all duration-300 ${
            selectedVariant === "description"
              ? "text-orange-main  border-orange-main"
              : "text-black/50 border-grey-f5f7"
          }`}>
          Описание
        </button>
        <button
          onClick={() => setSelectedVariant("characteristics")}
          className={`shadow-[0_-2px_3px_0_rgba(18,18,18,0.25)] flex-1 bg-grey-f5f7 border-b-3 rounded-t-[5px] py-[21px] transition-all duration-300 ${
            selectedVariant === "characteristics"
              ? "text-orange-main  border-orange-main"
              : "text-black/50 border-grey-f5f7"
          }`}>
          Характеристики
        </button>
        <button
          onClick={() => setSelectedVariant("reviewsRatings")}
          className={`shadow-[0_-2px_3px_0_rgba(18,18,18,0.25)] flex-1 bg-grey-f5f7 rounded-t-[5px] py-[21px] transition-all duration-300 border-b-3 ${
            selectedVariant === "reviewsRatings"
              ? "text-orange-main  border-orange-main"
              : "text-black/50 border-grey-f5f7"
          }`}>
          Отзывы и оценки
        </button>
      </div>

      <div className='bg-grey-f5f7 shadow-normal rounded-b-[5px] px-6 py-7'>
        {selectedVariant === "description" && <DescriptionData description={description} />}
        {selectedVariant === "characteristics" && (
          <Characteristics characteristics={characteristics} />
        )}
        {selectedVariant === "reviewsRatings" && <Comments comments={comments} />}
      </div>
    </section>
  );
}
