import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/ui/layout/footer/Footer";
import { Header } from "@/components/ui/layout/header/Header";
import ScrollToTopButton from "@/components/ui/shared/buttons/ScrollToTopButton";

export const metadata: Metadata = {
  title: "ПРОКниги — интернет-магазин книг",
  description:
    "ПРОКниги — это интернет-магазин книг на любой вкус. Покупайте художественную, научную, учебную и деловую литературу с доставкой по всей стране.",
  keywords: [
    "ПРОКниги",
    "интернет-магазин книг",
    "купить книги",
    "книги с доставкой",
    "литература",
    "чтение",
    "художественные книги",
    "учебники",
    "деловая литература",
  ],
  authors: [{ name: "ПРОКниги", url: "https://online-store-one-rho.vercel.app/" }],
  creator: "ПРОКниги",
  metadataBase: new URL("https://online-store-one-rho.vercel.app/"),
  openGraph: {
    title: "ПРОКниги — интернет-магазин книг",
    description:
      "Большой выбор книг с доставкой. Художественная, научная, учебная литература и многое другое в магазине ПРОКниги.",
    url: "https://online-store-one-rho.vercel.app/",
    siteName: "ПРОКниги",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ПРОКниги — интернет-магазин книг",
    description: "Лучшие книги с доставкой по всей стране. Заходите в ПРОКниги!",
    site: "@proknigi",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ru'>
      <body className={`antialiased`}>
        <Providers>
          <Header />
          <main>
            {children}
            <ScrollToTopButton />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
