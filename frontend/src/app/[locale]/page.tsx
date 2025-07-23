import HomeScreen from "@/components/screens/HomeScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ПРОКниги — интернет-магазин книг",
  description:
    "ПРОКниги — ваш онлайн-магазин с широким выбором книг. Покупайте художественную, научную и детскую литературу с быстрой доставкой.",
  keywords: [
    "книги",
    "интернет-магазин книг",
    "купить книги",
    "ПРОКниги",
    "художественная литература",
    "детские книги",
    "научные книги",
  ],
  creator: "Roman13-k",
  authors: [{ name: "ПроКниги" }],
  openGraph: {
    title: "ПРОКниги — интернет-магазин книг",
    description:
      "Покупайте книги онлайн в магазине ПРОКниги. Художественная, научная, детская литература и многое другое.",
    url: "https://online-store-one-rho.vercel.app",
    siteName: "ПРОКниги",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://online-store-one-rho.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ПРОКниги — интернет-магазин книг",
      },
    ],
  },
};

export default function Home() {
  return <HomeScreen />;
}
