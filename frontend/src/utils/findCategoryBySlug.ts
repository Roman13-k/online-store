import { CategoriesInterface } from "@/interface/catalog/categories";

export const findCategoryBySlug = (categories: CategoriesInterface[], slug: string | undefined) => {
  return categories.find((category) => category.slug === slug)?.category;
};
