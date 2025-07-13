"use client";
import React from "react";
import SortingChoose from "./SortingChoose";
import SortingCategories from "./SortingCategories";
import { DirectionProps } from "@/interface/catalogpage/sorting";

export default function Sorting({ direction, setDirection }: DirectionProps) {
  return (
    <section className='shadow-normal bg-grey-f5f7 p-5 w-full flex flex-col gap-4 font-first'>
      <SortingChoose />
      <span className='w-full h-[1px] bg-grey-d9 block'></span>
      <SortingCategories direction={direction} setDirection={setDirection} />
    </section>
  );
}
