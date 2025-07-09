"use client";

import { useRef, useState, useEffect } from "react";
import ArrowButton from "../buttons/ArrowButton";

export default function ScrollableSection({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollByPercent = (percent: number) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: percent * containerWidth, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", updateArrows);
    return () => ref.removeEventListener("scroll", updateArrows);
  }, []);

  return (
    <div className='relative w-full'>
      {showLeft && (
        <div className='absolute left-0 top-0 h-full z-10 flex items-center'>
          <div className='absolute inset-0 bg-grey-f5f7/50 blur-sm rounded' />
          <ArrowButton
            onClick={() => scrollByPercent(-0.8)}
            className='relative z-10'
            imgSrc='/icons/arrows/arrowLeft.svg'
          />
        </div>
      )}

      {showRight && (
        <div className='absolute right-0 top-0 h-full z-10 flex items-center'>
          <div className='absolute inset-0 bg-grey-f5f7/50 blur-sm rounded' />
          <ArrowButton
            onClick={() => scrollByPercent(0.8)}
            className='relative z-10'
            imgSrc='/icons/arrows/arrowRight.svg'
          />
        </div>
      )}

      <div
        ref={scrollRef}
        style={{ scrollbarWidth: "none" }}
        className='flex gap-6 overflow-x-auto w-full p-1 scroll-smooth'>
        {children}
      </div>
    </div>
  );
}
