import { sortingOptions } from "@/utils/catalogPage/sorting";
import React, { Dispatch, SetStateAction, useState } from "react";
import SortArrow from "../icons/SortArrow";

interface SortSelectProps {
  selected: Record<string, string>;
  setSelected: Dispatch<SetStateAction<Record<string, string>>>;
}

export default function SortSelect({ selected, setSelected }: SortSelectProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const handleSelect = (groupIndex: number, value: string) => {
    setSelected((prev) => ({ ...prev, [groupIndex]: value }));
  };

  return (
    <>
      {sortingOptions.map((group, index) => (
        <div key={index} className='relative font-first'>
          <button
            onClick={() => setActiveDropdown((prev) => (prev === index ? null : index))}
            className={`${
              activeDropdown === index ? "text-orange-main font-normal" : " text-black font-light "
            }   transition-all flex gap-2 items-center`}>
            {group.title}
            <SortArrow isFullOpen={activeDropdown === index} />
          </button>

          {activeDropdown === index && (
            <div className='flex flex-col gap-3 absolute z-10 mt-4 bg-grey-f5f7 border border-grey-e9 rounded-[5px] shadow-normal px-6 py-4 min-w-[220px]'>
              {group.options.map((option) => (
                <div key={option.value} className='flex items-center gap-2 cursor-pointer'>
                  <span
                    className={`${
                      selected[index] === option.value ? "border-orange-main" : "border-black/40"
                    } transition-all duration-300 w-5 h-5 border rounded-full flex-shrink-0 flex justify-center items-center`}>
                    <span
                      className={`${
                        selected[index] === option.value ? "opacity-100" : "opacity-0"
                      } blok w-2.5 h-2.5 rounded-full bg-orange-main flex-shrink-0 transition-all duration-300`}></span>
                  </span>
                  <button onClick={() => handleSelect(index, option.value)} className='block'>
                    {option.label}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
