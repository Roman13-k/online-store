"use client";
import { categories } from "@/utils/catalogPage";
import { findCategoryBySlug } from "@/utils/findCategoryBySlug";
import { usePathname } from "next/navigation";

export default function CatalogPath() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const categorySlug = parts.length >= 3 ? parts[parts.length - 2] : parts[parts.length - 1];

  const categoryName = findCategoryBySlug(categories, categorySlug);

  return (
    <p className='mb-9 text-[18px]'>
      <span className='text-black/40'>Главная — Каталог — </span>
      <span className='text-orange-main font-medium'>{categoryName}</span>
    </p>
  );
}
