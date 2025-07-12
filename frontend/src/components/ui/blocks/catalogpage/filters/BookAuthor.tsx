import { FieldSetContainer } from "@/components/ui/shared/fieldset/Fieldset";
import Image from "next/image";
import React from "react";

export default function BookAuthor() {
  return (
    <FieldSetContainer legend='Автор'>
      <div className='w-full relative'>
        <input
          placeholder='Поиск по имени автора'
          className='w-full rounded-[5px] py-[7px] px-[12px] text-black/40 font-first text-[16px] bg-grey-d9'
          type='text'
        />
        <Image
          className='absolute top-1/2 transform -translate-y-1/2 right-3 opacity-40'
          width={16}
          height={16}
          src='/icons/search/loupe.svg'
          alt='loupe.svg'
        />
      </div>
    </FieldSetContainer>
  );
}
