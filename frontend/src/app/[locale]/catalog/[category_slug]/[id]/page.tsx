import BookScreen from "@/components/screens/BookScreen";
import { BookCards } from "@/utils/catalogPage";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const book = BookCards;
  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      type: "website",
      url: `/catalog/${book.category_slug}/${book.id}`,
      images: [
        {
          url: book.images[0],
          secureUrl: book.images[0],
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.description,
      images: book.images[0],
    },
  };
}

export default function page() {
  return <BookScreen />;
}
