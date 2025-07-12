import { FieldSetContainer } from "@/components/ui/shared/fieldset/Fieldset";
import CurrencyInput from "@/components/ui/shared/inputs/CurrencyInput";
import RangeSlider from "@/components/ui/shared/inputs/RangeSlider";
import { BookPriceProps } from "@/interface/catalog/filters";
import React from "react";

export default function BookPrice({ priceValue, setPriceValue }: BookPriceProps) {
  return (
    <FieldSetContainer legend='Цена'>
      <div className='flex items-center gap-2 mb-4'>
        <CurrencyInput priceValue={priceValue} setPriceValue={setPriceValue} isMax={0} />
        <span className='text-black opacity-40'>—</span>{" "}
        <CurrencyInput priceValue={priceValue} setPriceValue={setPriceValue} isMax={1} />
      </div>
      <RangeSlider priceValue={priceValue} setPriceValue={setPriceValue} />
    </FieldSetContainer>
  );
}
