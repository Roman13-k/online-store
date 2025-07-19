"use client";
import ArrowButton from "@/components/ui/shared/buttons/ArrowButton";
import HorizontalScroll from "@/components/ui/shared/scrolls/HorizontalScroll";
import { IntroBanners } from "@/utils/homePage";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function ScrollWrapperWithButtons({ children }: PropsWithChildren) {
  const [selectedBanner, setSelectedBanner] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleForward = () => {
    setSelectedBanner((prev) => (prev < IntroBanners.length - 1 ? prev + 1 : 0));
  };

  const handleBack = () => {
    setSelectedBanner((prev) => (prev > 0 ? prev - 1 : IntroBanners.length - 1));
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleForward();
    }, 10000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    resetInterval();
  }, [selectedBanner]);

  return (
    <section className='w-full bg-grey py-[52px] flex flex-col items-center gap-5 mb-10'>
      <div className='flex flex-row gap-0 justify-center mx-auto max-w-[1460px] w-full overflow-hidden'>
        <div className='relative w-[100px] z-10'>
          <ArrowButton
            onClick={handleBack}
            className='absolute top-1/2 -right-10 transform -translate-y-1/2'
            imgSrc='/icons/arrows/arrowLeft.svg'
          />
        </div>
        <div className='w-full overflow-hidden'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${selectedBanner * 100}%)` }}>
            {children}
          </div>
        </div>
        <div className='relative w-[100px] z-10'>
          <ArrowButton
            onClick={handleForward}
            className='absolute top-1/2 -left-10 transform -translate-y-1/2'
            imgSrc='/icons/arrows/arrowRight.svg'
          />
        </div>
      </div>
      <HorizontalScroll
        selectedBanner={selectedBanner}
        setSelectedBanner={setSelectedBanner}
        count={IntroBanners.length}
      />
    </section>
  );
}
