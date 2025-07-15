import CategoryScreen from "@/components/screens/CategoryScreen";
import { BookCards } from "@/utils/catalogPage";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: BookCards.category,
    openGraph: {
      title: BookCards.category,
      type: "website",
      url: `/catalog/${BookCards.category_slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: BookCards.category,
    },
  };
}

export default function page() {
  return <CategoryScreen />;
}
