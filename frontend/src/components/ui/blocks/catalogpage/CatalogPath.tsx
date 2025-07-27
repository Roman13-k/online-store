import { useGetCategoriesQuery } from "@/store/api/categoriesApi";
import { useLocale, useTranslations } from "next-intl";
import LoadingSmall from "../../shared/loading/LoadingSmall";
import { findCategoryBySlug } from "@/utils/findCategoryBySlug/findCategoryBySlug";
import { usePathname } from "@/i18n/navigation";

export default function CatalogPath({ className }: { className?: string }) {
  const { data: categories, isLoading, error } = useGetCategoriesQuery("");
  const locale = useLocale();
  const t = useTranslations();

  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const categorySlug = parts.length >= 3 ? parts[parts.length - 2] : parts[parts.length - 1];

  if (isLoading) return <LoadingSmall />;
  if (error || !categories?.data) return <p className={className}>Категория не найдена</p>;

  const categoryName = findCategoryBySlug(categories.data, categorySlug, locale);

  return (
    <p className={`${className} text-[18px]`}>
      <span className='text-black/40'>
        {t("breadcrumb.home")} — {t("breadcrumb.catalog")} —
      </span>
      <span className='text-orange-main font-medium'> {categoryName ?? "—"}</span>
    </p>
  );
}
