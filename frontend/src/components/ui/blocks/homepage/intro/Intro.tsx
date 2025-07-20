"use client";
import LoadingSmall from "@/components/ui/shared/loading/LoadingSmall";
import ScrollWrapperWithButtons from "@/components/ui/shared/scrolls/ScrollWrapperWithButtons";
import { IntroBanner } from "@/interface/homePage/banner";
import { useGetBannersQuery } from "@/store/api/introApi";
import Image from "next/image";
import React from "react";

export default function Intro() {
  const { data: IntroBanners, isLoading, isError } = useGetBannersQuery("");

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[540px] bg-white'>
        <LoadingSmall />
      </div>
    );
  }

  if (isError || !IntroBanners) {
    return <div className='text-center text-red-500'>Ошибка при загрузке баннеров</div>;
  }

  return (
    <ScrollWrapperWithButtons IntroBanners={IntroBanners.data.slider[0].files}>
      {IntroBanners.data.slider[0].files.map((banner: IntroBanner) => (
        <div key={banner.id} className='min-w-full flex-shrink-0'>
          <Image
            width={1280}
            height={540}
            className='object-contain w-full h-auto bg-white'
            src={"http://localhost:1337" + banner.url}
            alt={"http://localhost:1337" + banner.url}
          />
        </div>
      ))}
    </ScrollWrapperWithButtons>
  );
}
