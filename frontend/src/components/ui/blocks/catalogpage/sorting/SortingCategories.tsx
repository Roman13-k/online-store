"use client";

import SortSelect from "@/components/ui/shared/selectes/SortSelect";
import { P2 } from "@/components/ui/shared/text";
import { DirectionProps } from "@/interface/catalogpage/sorting";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SortingCategories({ direction, setDirection }: DirectionProps) {
  const t = useTranslations("sortingCategories");
  const [selected, setSelected] = useState<Record<string, string>>({});

  return (
    <div className='flex w-full items-center'>
      <P2 className='font-light mr-8'>{t("sortBy")}</P2>
      <div className='flex gap-6'>
        <SortSelect selected={selected} setSelected={setSelected} />
      </div>
      <div className='ml-auto flex gap-3'>
        <button onClick={() => setDirection("row")}>
          <Image
            width={22}
            height={22}
            src={
              direction === "row" ? "/icons/direction/rowActive.svg" : "/icons/direction/row.svg"
            }
            alt='row.svg'
          />
        </button>
        <button onClick={() => setDirection("col")}>
          <Image
            width={22}
            height={22}
            src={
              direction === "row" ? "/icons/direction/col.svg" : "/icons/direction/colActive.svg"
            }
            alt='col.svg'
          />
        </button>
      </div>
    </div>
  );
}
