"use client";

import ModalLayout from "@/components/ui/layout/ModalLayout";
import TextDivider from "@/components/ui/shared/divider/TextDivider";
import { BuyerOrSeller } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface BuyerOrSellerModalProps {
  setNextLoginModal: Dispatch<SetStateAction<boolean>>;
  setBuyerOrSeller: Dispatch<SetStateAction<BuyerOrSeller | null>>;
}

export function BuyerOrSellerModal({
  setNextLoginModal,
  setBuyerOrSeller,
}: BuyerOrSellerModalProps) {
  const handleChoose = (choose: BuyerOrSeller) => {
    setNextLoginModal(false);
    setBuyerOrSeller(choose);
  };

  return (
    <ModalLayout onClose={() => setNextLoginModal(false)}>
      <button
        onClick={() => {
          handleChoose("buyer");
        }}
        className='flex flex-col items-center font-medium text-lg text-black'>
        <Image alt='buyer.svg' width={150} height={150} src='/icons/profile/buyer.svg' />
        <p className='font-bold text-[22px] leading-[88%] mt-3'>Покупатель</p>
      </button>
      <TextDivider />
      <button
        onClick={() => handleChoose("seller")}
        className='flex flex-col items-center font-medium text-lg text-black mb-[38px]'>
        <Image alt='seller.svg' width={150} height={150} src='/icons/profile/seller.svg' />
        <p className='font-bold text-[22px] leading-[88%]'>Продавец</p>
      </button>
    </ModalLayout>
  );
}
