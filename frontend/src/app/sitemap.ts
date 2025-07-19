import { CategoriesInterface } from "@/interface/catalogpage/categories";
import { MetadataRoute } from "next";

export const URL = "https://online-store-one-rho.vercel.app";

async function getCategories(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/categories`);
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const json = await res.json();

    return json.data.map((category: CategoriesInterface) => ({
      url: `${URL}/catalog/${category.category_slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.warn("Не удалось получить категории для sitemap, вернем пустой список", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/faq", "/pickup-points", "/support", "/certificates", "/about"];

  const staticRoutes = staticPages.map((path) => ({
    url: `${URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  const dynamicRoutes = await getCategories();

  return [...staticRoutes, ...dynamicRoutes];
}
