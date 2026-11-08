import type { Metadata } from "next";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ПРОКниги — магазин книг",
  description: "Веб-приложение книжного магазина: каталог, корзина, заказы, отчёты и аналитика.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className='antialiased font-first bg-white text-black min-h-screen flex flex-col'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
