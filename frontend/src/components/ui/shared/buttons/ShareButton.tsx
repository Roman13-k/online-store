"use client";
import Image from "next/image";
import React from "react";

export default function ShareButton() {
  const handleShare = async () => {
    await navigator.share({
      title: document.title,
      url: window.location.href,
    });
  };

  return (
    <button onClick={handleShare} className='flex items-center gap-0.5'>
      <Image
        className='opacity-50'
        width={25}
        height={25}
        src='/icons/bookCard/share.svg'
        alt='share.svg'
      />
      <p className='text-black/50'>рассказать</p>
    </button>
  );
}
