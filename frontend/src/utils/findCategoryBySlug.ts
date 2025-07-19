import { CategoriesInterface } from "@/interface/catalogpage/categories";

export const findCategoryBySlug = (categories: CategoriesInterface[], slug: string | undefined) => {
  return categories.find((category) => category.category_slug === slug)?.category;
};
