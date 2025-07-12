"use client";
import { P2 } from "@/components/ui/shared/text";
import { DirectionProps } from "@/interface/catalog/sorting";
import { sortingOptions } from "@/utils/catalogPage/sorting";
import Image from "next/image";

export default function SortingCategories({ direction, setDirection }: DirectionProps) {
  return (
    <div className='flex w-full items-center'>
      <P2 className='font-light mr-8'>Сортировать по:</P2>
      <div className='flex gap-6'>
        {sortingOptions.map((group, index) => (
          <select key={index} defaultValue=''>
            <option disabled value=''>
              {group.title}
            </option>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
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
