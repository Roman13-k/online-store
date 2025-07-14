"use client";
import Image from "next/image";
import React, { useState } from "react";

interface LikeButtonProps {
  className?: string;
  isNeedText?: boolean;
}

export default function LikeButton({ className = "", isNeedText = false }: LikeButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`${className} z-[5] ${isNeedText ? "flex gap-0.5 items-center" : ""}`}>
      <Image
        width={25}
        height={25}
        src={!isFavorite ? "/icons/like/like.svg" : "/icons/like/likeChecked.svg"}
        alt='like.svg'
      />
      {isNeedText && (
        <p className={`${isFavorite ? "text-red" : "text-black"}`}>
          {isFavorite ? "В «Избранном»" : "Добавить в избранное"}
        </p>
      )}
    </button>
  );
}
