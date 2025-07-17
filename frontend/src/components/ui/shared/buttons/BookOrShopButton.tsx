import { StateInterface } from "@/interface";
import Image from "next/image";
import React from "react";

export default function BookOrShopButton({ state, setState }: StateInterface<"book" | "shop">) {
  return (
    <button
      onClick={() => setState((prev) => (prev === "book" ? "shop" : "book"))}
      className='flex gap-3'>
      <Image
        className={`${state === "book" ? "" : "opacity-40"} transition-all duration-300 scale-135`}
        src={"/icons/profile/book.svg"}
        alt='book.svg'
        width={21}
        height={23}
      />
      <div className='flex flex-col h-full justify-center items-center gap-2 mt-1'>
        <Image
          className={`${
            state === "book" ? "opacity-40" : ""
          } transition-all duration-300 transform rotate-180 scale-135`}
          width={14}
          height={4}
          src={"/icons/profile/vector.svg"}
          alt=''
        />
        <Image
          className={`${
            state === "book" ? "" : "opacity-40"
          } transition-all duration-300 scale-135`}
          width={14}
          height={4}
          src={"/icons/profile/vector.svg"}
          alt=''
        />
      </div>
      <Image
        className={`${state === "book" ? "opacity-40" : ""} transition-all duration-300 scale-135`}
        width={24}
        height={19}
        alt='shop.svg'
        src={"/icons/profile/shop.svg"}
      />
    </button>
  );
}
