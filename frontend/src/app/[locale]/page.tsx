"use client";
import { useTranslations } from "next-intl";
import { Button, Chip } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { BookGrid } from "@/components/books/BookCard";
import { Loader, Page } from "@/components/common";
import { useBooksQuery, useGenresQuery } from "@/store/api";

function Section({ title, sort }: { title: string; sort: "new" | "rating" }) {
  const t = useTranslations("home");
  const { data, isLoading } = useBooksQuery({ sort, dir: "desc", limit: 5 });
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <Link href={`/catalog?sort=${sort}&dir=desc`} className='text-orange-main'>
          {t("showAll")}
        </Link>
      </div>
      {isLoading ? <Loader /> : <BookGrid books={data?.items ?? []} />}
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const { data: genres = [] } = useGenresQuery();
  return (
    <Page>
      <section className='rounded-lg bg-gradient-to-r from-[#f35935] to-[#fb9026] p-10 text-white'>
        <h1 className='text-4xl font-semibold font-second max-w-[640px]'>{t("heroTitle")}</h1>
        <p className='mt-3 max-w-[560px] text-lg opacity-90'>{t("heroText")}</p>
        <Button as={Link} href='/catalog' className='mt-6 bg-white text-orange-main font-semibold' radius='sm'>
          {t("heroButton")}
        </Button>
      </section>
      <section className='flex flex-col gap-3'>
        <h2 className='text-2xl font-semibold'>{t("genres")}</h2>
        <div className='flex flex-wrap gap-2'>
          {genres.map((g) => (
            <Chip key={g.genre_id} as={Link} href={`/catalog?genre=${g.genre_id}`} variant='bordered' className='cursor-pointer'>
              {g.name} · {g.books}
            </Chip>
          ))}
        </div>
      </section>
      <Section title={t("newBooks")} sort='new' />
      <Section title={t("popular")} sort='rating' />
    </Page>
  );
}
