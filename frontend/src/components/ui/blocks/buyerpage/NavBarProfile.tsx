import { SelectedVariantType } from "@/components/screens/BuyerScreen";
import React, { Dispatch, SetStateAction } from "react";
import SwitchButton from "../../shared/buttons/SwitchButton";

export default function NavBarProfile({
  navBarData,
  selectedVariant,
  setSelectedVariant,
}: {
  navBarData: SelectedVariantType[];
  selectedVariant: SelectedVariantType;
  setSelectedVariant: Dispatch<SetStateAction<SelectedVariantType>>;
}) {
  return (
    <div className='flex w-full'>
      <div className='flex gap-3 items-center justify-center text-[18px] font-first border-b text-black/40 shadow-normal mb-7'>
        {navBarData.map((value, index) => (
          <button
            key={index}
            onClick={() => setSelectedVariant(value)}
            className={`${
              selectedVariant === value
                ? "text-orange-main font-medium border-orange-main"
                : "text-black/40 font-normal border-none"
            } py-[14px] px-[60px] border-b-2 transition-all duration-300 whitespace-nowrap`}>
            {value}
          </button>
        ))}
      </div>
      <SwitchButton />
    </div>
  );
}
