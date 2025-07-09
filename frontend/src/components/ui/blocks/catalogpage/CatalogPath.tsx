"use client";
import { categories } from "@/utils/catalogPage";
import { findCategoryBySlug } from "@/utils/findCategoryBySlug";
import { usePathname } from "next/navigation";
import React from "react";

export default function CatalogPath() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop();

  return (
    <p className='mb-9 text-[18px]'>
      <span className='text-black/40'>Главная — Каталог — </span>
      <span className='text-orange-main'>{findCategoryBySlug(categories, slug)}</span>
    </p>
  );
}
