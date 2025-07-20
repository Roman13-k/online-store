import ShopScreen from "@/components/screens/ShopScreen";
import { BookCards } from "@/utils/catalogPage";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const shop = BookCards.shop;
  return {
    title: shop.title,
    description: shop.description,
    openGraph: {
      title: shop.title,
      description: shop.description,
      type: "website",
      url: `/shop/${shop.id}`,
      images: [
        {
          url: shop.cover,
          secureUrl: shop.cover,
          width: 1200,
          height: 630,
          alt: shop.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shop.title,
      description: shop.description,
      images: shop.cover,
    },
  };
}

export default function page() {
  return <ShopScreen />;
}
