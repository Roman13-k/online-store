import AboutScreen from "@/components/screens/AboutScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "О нас — ПроКниги",
  description:
    "ПроКниги — интернет-магазин книг в Беларуси. Узнайте больше о нашей миссии, ценностях и том, как мы выбираем лучшие книги для вас.",
  keywords: ["о нас", "интернет-магазин книг", "ПроКниги", "книги в Беларуси", "чтение"],
  creator: "Roman13-k",
  authors: [{ name: "ПроКниги", url: "https://online-store-one-rho.vercel.app/" }],

  openGraph: {
    title: "О нас — ПроКниги",
    description:
      "Интернет-магазин книг с душой. Читайте о нас, нашей миссии и подходе к выбору книг.",
    siteName: "ПроКниги",
    url: "https://online-store-one-rho.vercel.app/about",
    images: [
      {
        url: "https://online-store-one-rho.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ПроКниги — интернет-магазин книг",
      },
    ],
    type: "website",
    locale: "ru_BY",
  },

  twitter: {
    card: "summary_large_image",
    title: "О нас — ПроКниги",
    description: "Интернет-магазин книг в Беларуси. Узнайте больше о нас и наших ценностях.",
    images: ["https://online-store-one-rho.vercel.app/og-image.jpg"],
  },
};

export default function page() {
  return <AboutScreen />;
}
