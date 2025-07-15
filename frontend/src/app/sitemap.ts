import { categories } from "@/utils/catalogPage";
import { MetadataRoute } from "next";

export const URL = "https://online-store-one-rho.vercel.app";

async function getCategories(): Promise<MetadataRoute.Sitemap> {
  return categories.map((category) => ({
    url: `${URL}/catalog/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
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
