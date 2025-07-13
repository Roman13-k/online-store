import { MetadataRoute } from "next";
import { URL } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/buyer/", "/seller/"],
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}
