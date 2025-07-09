"use client";
import Image from "next/image";
import React, { useState } from "react";

interface LikeButtonProps {
  className?: string;
}

export default function LikeButton({ className = "" }: LikeButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  return (
    <button onClick={toggleFavorite} className={`${className} z-[10]`}>
      <Image
        width={25}
        height={25}
        src={!isFavorite ? "/icons/like/like.svg" : "/icons/like/likeChecked.svg"}
        alt='like.svg'
      />
    </button>
  );
}
