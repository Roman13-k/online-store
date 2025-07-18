"use client";
import ScrollWrapperWithButtons from "@/components/ui/shared/scrolls/ScrollWrapperWithButtons";
import { IntroBanners } from "@/utils/homePage";
import Image from "next/image";
import React from "react";

export default function Intro() {
  return (
    <ScrollWrapperWithButtons>
      {IntroBanners.map((banner) => (
        <div key={banner.id} className='min-w-full flex-shrink-0'>
          <Image
            width={1280}
            height={540}
            className='object-contain w-full h-auto bg-white'
            src={banner.src}
            alt={banner.src}
          />
        </div>
      ))}
    </ScrollWrapperWithButtons>
  );
}
