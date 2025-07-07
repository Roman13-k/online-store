import ArrowButton from "@/components/ui/shared/buttons/ArrowButton";
import { IntroBanners } from "@/utils/homePage";
import Image from "next/image";
import React from "react";

export default function Intro() {
  return (
    <section className='w-full bg-grey py-[52px]'>
      <div className='flex flex-row gap-0 justify-center px-20 mx-auto max-w-[1440px] w-full '>
        <div className='relative w-[100px]'>
          <ArrowButton
            className='absolute top-1/2 -right-10 transform -translate-y-1/2'
            imgSrc='/icons/arrows/arrowLeft.svg'
          />
        </div>
        <div className=''>
          {IntroBanners.map((banner) => {
            return (
              <Image
                width={1280}
                height={540}
                className='object-contain bg-white'
                key={banner.id}
                src={banner.src}
                alt={banner.src}
              />
            );
          })}
        </div>
        <div className='relative w-[100px]'>
          <ArrowButton
            className='absolute top-1/2 -left-10 transform -translate-y-1/2'
            imgSrc='/icons/arrows/arrowRight.svg'
          />
        </div>
      </div>
    </section>
  );
}
