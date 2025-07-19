import CategoryScreen from "@/components/screens/CategoryScreen";
import { CategoriesInterface } from "@/interface/catalogpage/categories";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/categories?populate=*`);
  const json = await res.json();
  const category: CategoriesInterface = json.data.find(
    (category: CategoriesInterface) => category.category_slug === params.category_slug,
  );
  return {
    title: category.category,
    openGraph: {
      title: category.category,
      type: "website",
      url: `/catalog/${category.category_slug}`,
      images: `${process.env.NEXT_PUBLIC_ADMIN_URL}${category.share_img.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: category.category,
      images: `${process.env.NEXT_PUBLIC_ADMIN_URL}${category.share_img.url}`,
    },
  };
}

export default function page({ params }: { params: { category_slug: string } }) {
  return <CategoryScreen params={params} />;
}
