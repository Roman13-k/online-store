import Image from "next/image";
import React from "react";

export default function SortArrow({ isFullOpen }: { isFullOpen: boolean }) {
  return (
    <Image
      width={12}
      height={6}
      src={isFullOpen ? "/icons/arrows/sortArrowOrange.svg" : "/icons/arrows/sortArrowBlack.svg"}
      alt='sortArrow.svg'
    />
  );
}
