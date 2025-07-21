import { CategoriesInterface } from "@/interface/catalogpage/categories";

export const findCategoryBySlug = (
  categories: CategoriesInterface[],
  slug: string | undefined,
  locale: string,
): string | undefined => {
  const category = categories.find((category) => category.category_slug === slug);
  if (!category) return undefined;

  if (locale === "en") return category.category;

  const localized = category.localizations?.find((loc) => loc.locale === locale);
  return localized?.category || category.category;
};
