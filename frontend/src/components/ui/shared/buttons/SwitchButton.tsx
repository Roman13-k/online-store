"use client";
import { BuyerOrSeller } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

export default function SwitchButton() {
  const [auth, setAuth] = useState<BuyerOrSeller>("buyer");
  return (
    <button
      onClick={() => setAuth((prev) => (prev === "buyer" ? "seller" : "buyer"))}
      className='bg-colar py-[6px] px-3 justify-center rounded-[5px] flex items-center h-[56px] flex-shrink-0 ml-auto'>
      <Image
        width={44}
        height={44}
        className={`${auth === "buyer" ? "opacity-100" : "opacity-40 scale-80"}`}
        src={"/icons/profile/activeBuyer.svg"}
        alt='buyer.svg'
      />
      <Image width={17} height={17} src={"/icons/profile/switch.svg"} alt='' />
      <Image
        width={44}
        height={44}
        className={`${auth === "seller" ? "opacity-100" : "opacity-40 scale-80"}`}
        src={"/icons/profile/activeSeller.svg"}
        alt='seller.svg'
      />
    </button>
  );
}
