import { categories } from "@/utils/catalogPage";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface CatalogMenuProps {
  isOpenCatalog: boolean;
  setIsCatalogMenu: Dispatch<SetStateAction<boolean>>;
}

export default function CatologMenu({ isOpenCatalog, setIsCatalogMenu }: CatalogMenuProps) {
  return (
    <ul
      className={`absolute top-[123px] left-[388px] rounded-[5px] grid grid-rows-4 grid-cols-2 bg-[#f6f6f6] ${
        isOpenCatalog ? "opacity-100 translate-y-0 z-50" : "opacity-0 -translate-y-full -z-40"
      } transition-all duration-300`}>
      {categories.map((category) => (
        <li
          key={category.id}
          className='bg-[url("/icons/arrows/arrow-up.svg")] bg-no-repeat bg-[95%_50%] text-[16px] w-[340px] h-[56px] border border-[#e9e9e9] flex justify-center items-center'>
          <Link
            onClick={() => setIsCatalogMenu(false)}
            href={`/catalog/${category.slug}`}
            className='text-center'>
            {category.category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
