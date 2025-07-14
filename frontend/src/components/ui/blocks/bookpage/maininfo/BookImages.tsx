"use client";
import ArrowButton from "@/components/ui/shared/buttons/ArrowButton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function BookImages({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const updateArrows = () => {
    if (!scrollRef.current) return;

    const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
    setShowTop(scrollTop > 0);
    setShowBottom(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 1);
  };

  const scrollByPercent = (percent: number) => {
    const ref = scrollRef.current;
    if (!ref) return;
    const containerHeight = ref.clientHeight;
    ref.scrollBy({ top: containerHeight * percent, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", updateArrows);
    return () => ref.removeEventListener("scroll", updateArrows);
  }, []);

  return (
    <div className='flex gap-[23px]'>
      <div className='relative flex flex-col h-[352px]'>
        {showTop && (
          <ArrowButton
            onClick={() => scrollByPercent(-0.8)}
            imgSrc='/icons/arrows/arrowRight.svg'
            className='w-24 h-24 -rotate-90 absolute -top-5 right-1/2 transform translate-x-1/2 opacity-70'
          />
        )}
        <div
          ref={scrollRef}
          className='flex flex-col gap-2 h-full overflow-y-auto'
          style={{ scrollbarWidth: "none" }}>
          {images.map((src, index) => (
            <button onClick={() => setSelectedPhoto(index)} key={index}>
              <Image width={72} height={101} src={src} alt='book.png' />
            </button>
          ))}
        </div>
        {showBottom && (
          <ArrowButton
            onClick={() => scrollByPercent(0.8)}
            imgSrc='/icons/arrows/arrowRight.svg'
            className='w-24 h-24 rotate-90 absolute -bottom-5 right-1/2 transform translate-x-1/2 opacity-70'
          />
        )}
      </div>
      <Image
        width={297}
        height={352}
        className='max-h-[352px]'
        src={images[selectedPhoto]}
        alt='book.png'
      />
    </div>
  );
}
