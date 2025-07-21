import CategoryScreen from "@/components/screens/CategoryScreen";
import { CategoriesInterface } from "@/interface/catalogpage/categories";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ category_slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const { category_slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/categories?populate=*`);
  const json = await res.json();

  const baseCategory: CategoriesInterface = json.data.find(
    (category: CategoriesInterface) => category.category_slug === category_slug,
  );

  if (!baseCategory) {
    notFound();
  }

  const localized =
    locale === "en"
      ? baseCategory
      : baseCategory.localizations?.find((loc) => loc.locale === locale) || baseCategory;

  return {
    title: localized.category,
    openGraph: {
      title: localized.category,
      type: "website",
      url: `/catalog/${localized.category_slug}`,
      images: `http://localhost:1337${baseCategory.share_img?.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: localized.category,
      images: `http://localhost:1337${baseCategory.share_img?.url}`,
    },
  };
}

export default function page() {
  return <CategoryScreen />;
}
