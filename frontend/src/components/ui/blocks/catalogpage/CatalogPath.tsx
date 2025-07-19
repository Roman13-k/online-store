"use client";
import { useGetCategoriesQuery } from "@/store/categoriesApi";
import { findCategoryBySlug } from "@/utils/findCategoryBySlug";
import { usePathname } from "next/navigation";
import LoadingSmall from "../../shared/loading/LoadingSmall";

export default function CatalogPath({ className }: { className?: string }) {
  const { data: categories, isLoading, error } = useGetCategoriesQuery("");
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const categorySlug = parts.length >= 3 ? parts[parts.length - 2] : parts[parts.length - 1];

  if (isLoading) return <LoadingSmall />;
  if (error || !categories?.data) return <p className={className}>Категория не найдена</p>;

  const categoryName = findCategoryBySlug(categories.data, categorySlug);

  return (
    <p className={`${className} text-[18px]`}>
      <span className='text-black/40'>Главная — Каталог — </span>
      <span className='text-orange-main font-medium'>{categoryName ?? "NaN"}</span>
    </p>
  );
}
