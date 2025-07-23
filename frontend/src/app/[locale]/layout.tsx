import type { Metadata } from "next";
import "../globals.css";
import { Footer } from "@/components/ui/layout/footer/Footer";
import { Header } from "@/components/ui/layout/header/Header";
import ScrollToTopButton from "@/components/ui/shared/buttons/ScrollToTopButton";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";

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
    locale: "ru",
  },
  twitter: {
    card: "summary_large_image",
    title: "ПРОКниги — интернет-магазин книг",
    description: "Лучшие книги с доставкой по всей стране. Заходите в ПРОКниги!",
    site: "@proknigi",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main>
              {children}
              <ScrollToTopButton />
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
