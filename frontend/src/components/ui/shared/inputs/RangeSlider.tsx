"use client";
import { BookPriceProps } from "@/interface/catalog/filters";
import { Slider } from "@heroui/react";
import React from "react";

export default function RangeSlider({ priceValue, setPriceValue }: BookPriceProps) {
  return (
    <Slider
      classNames={{
        base: "w-full gap-3",
        filler: "bg-orange-main",
      }}
      defaultValue={[1000, 5000]}
      maxValue={10000}
      aria-label='Диапазон цены'
      value={priceValue}
      onChange={(e) => {
        if (!Array.isArray(e)) return;
        setPriceValue(e);
      }}
      renderThumb={({ ...props }) => (
        <div
          {...props}
          className='group p-3 top-1/2 bg-orange-main shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing'></div>
      )}
      size='sm'
      step={5}
    />
  );
}
