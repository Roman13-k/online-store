"use client";
import Image from "next/image";
import React, { useState } from "react";

interface CopyButtonProps {
  className?: string;
  textToCopy: string;
}

export default function CopyButton({ className = "", textToCopy }: CopyButtonProps) {
  const [isCopyed, setIsCopyed] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCopyed(true);

    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      setIsCopyed(false);
    }, 3000);
  };

  return (
    <button onClick={handleCopy} className={`${className}`}>
      <Image
        width={25}
        height={25}
        src={!isCopyed ? "/icons/copy/copy.svg" : "/icons/copy/copyed.svg"}
        alt='like.svg'
      />
    </button>
  );
}
