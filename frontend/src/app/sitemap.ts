import { MetadataRoute } from "next";

export const URL = "https://online-store-one-rho.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/faq", "/pickup-points", "/support", "/certificates", "/about"];
  return staticPages.map((path) => ({
    url: `${URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
  }));
}
