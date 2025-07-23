"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import SwitchButton from "../../shared/buttons/SwitchButton";
import { useTranslations } from "next-intl";

export default function NavBarProfile({
  navBarData,
  selectedVariant,
  setSelectedVariant,
  setProductAction,
  productAction,
  productActionData,
}: {
  navBarData: string[];
  selectedVariant: string;
  setSelectedVariant: Dispatch<SetStateAction<string>>;
  setProductAction?: Dispatch<SetStateAction<string>>;
  productAction?: string;
  productActionData?: string[];
}) {
  const t = useTranslations("main.sellerScreen");
  const [isActionSelected, setIsActionSelected] = useState(false);
  const handleProductActionSelect = (action: string) => {
    setProductAction?.(action);
    setIsActionSelected(true);
  };
  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full justify-between'>
        <span></span>

        <div className='flex gap-3 justify-center mx-auto text-[18px] font-first border-b text-black/40 shadow-normal mb-7'>
          {navBarData.map((value, index) => (
            <div key={index} className='flex flex-col items-center relative'>
              <button
                onClick={() => {
                  setSelectedVariant(value);
                  if (value === t("navBar.1")) setIsActionSelected(false);
                }}
                className={`${
                  selectedVariant === value
                    ? "text-orange-main font-medium border-orange-main"
                    : "text-black/40 font-normal border-none"
                } py-[14px] px-[65px] border-b-2 transition-all duration-300 whitespace-nowrap`}>
                {value}
              </button>

              {value === t("navBar.1") &&
                selectedVariant === t("navBar.1") &&
                setProductAction &&
                !isActionSelected && (
                  <div className='absolute top-full mt-2 flex flex-col rounded-[5px] border border-grey-e9  z-10'>
                    {productActionData?.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleProductActionSelect(action)}
                        className={`${
                          productAction === action
                            ? "text-orange-main bg-grey-e9"
                            : "text-black bg-grey-f5f7"
                        } px-6 py-3 text-[16px] whitespace-nowrap transition-all`}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        <SwitchButton />
      </div>
    </div>
  );
}
