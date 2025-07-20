import CategoryScreen from "@/components/screens/CategoryScreen";
import { CategoriesInterface } from "@/interface/catalogpage/categories";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ category_slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category_slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/categories?populate=*`);
  const json = await res.json();
  const category: CategoriesInterface = json.data.find(
    (category: CategoriesInterface) => category.category_slug === category_slug,
  );

  if (!category) {
    notFound();
  }

  return {
    title: category.category,
    openGraph: {
      title: category.category,
      type: "website",
      url: `/catalog/${category.category_slug}`,
      images: `http://localhost:1337${category.share_img.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: category.category,
      images: `http://localhost:1337${category.share_img.url}`,
    },
  };
}

export default function page() {
  return <CategoryScreen />;
}
