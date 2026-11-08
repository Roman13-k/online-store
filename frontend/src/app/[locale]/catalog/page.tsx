"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Checkbox, Input, Pagination, Select, SelectItem } from "@heroui/react";
import { BookGrid } from "@/components/books/BookCard";
import { Loader, Page } from "@/components/common";
import { BookQuery, useBooksQuery, useGenresQuery } from "@/store/api";
import { usePathname, useRouter } from "@/i18n/navigation";

const SORTS = ["title", "price", "year", "rating", "new"] as const;
const LIMIT = 15;

function Catalog() {
  const t = useTranslations("catalog");
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: genres = [] } = useGenresQuery();

  const query: BookQuery = {
    q: sp.get("q") ?? undefined,
    genre: sp.get("genre") ? Number(sp.get("genre")) : undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    inStock: sp.get("inStock") === "true" || undefined,
    sort: (sp.get("sort") as BookQuery["sort"]) ?? "title",
    dir: (sp.get("dir") as BookQuery["dir"]) ?? "asc",
    page: Number(sp.get("page") ?? 1),
    limit: LIMIT,
  };
  const { data, isFetching } = useBooksQuery(query);
  const [minPrice, setMin] = useState(sp.get("minPrice") ?? "");
  const [maxPrice, setMax] = useState(sp.get("maxPrice") ?? "");
  useEffect(() => {
    setMin(sp.get("minPrice") ?? "");
    setMax(sp.get("maxPrice") ?? "");
  }, [sp]);

  // Фильтры хранятся в адресной строке, поэтому ссылку на выборку можно сохранить
  const update = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(sp.toString());
    Object.entries({ ...patch, page: patch.page ?? undefined }).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    router.replace(`${pathname}?${next.toString()}`);
  };

  return (
    <Page title={t("title")}>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]'>
        <aside className='flex flex-col gap-4'>
          <Select
            label={t("genre")}
            selectedKeys={query.genre ? [String(query.genre)] : ["all"]}
            onChange={(e) => update({ genre: e.target.value === "all" ? undefined : e.target.value })}>
            {[{ genre_id: "all", name: t("allGenres") }, ...genres].map((g) => (
              <SelectItem key={String(g.genre_id)}>{g.name}</SelectItem>
            ))}
          </Select>
          <Input type='number' label={t("priceFrom")} value={minPrice} onValueChange={setMin} min={0} />
          <Input type='number' label={t("priceTo")} value={maxPrice} onValueChange={setMax} min={0} />
          <Button radius='sm' variant='flat' onPress={() => update({ minPrice: minPrice || undefined, maxPrice: maxPrice || undefined })}>
            OK
          </Button>
          <Checkbox isSelected={!!query.inStock} onValueChange={(v) => update({ inStock: v ? "true" : undefined })}>
            {t("inStockOnly")}
          </Checkbox>
          <Button radius='sm' variant='light' className='text-orange-main' onPress={() => router.replace(pathname)}>
            {t("reset")}
          </Button>
        </aside>
        <section className='flex flex-col gap-4'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <span className='text-grey-price'>{t("found", { count: data?.total ?? 0 })}</span>
            <div className='flex gap-2'>
              <Select
                aria-label={t("sort")}
                className='w-[220px]'
                size='sm'
                selectedKeys={[query.sort!]}
                onChange={(e) => update({ sort: e.target.value })}>
                {SORTS.map((s) => (
                  <SelectItem key={s}>{t(`sort${s[0].toUpperCase()}${s.slice(1)}` as "sortTitle")}</SelectItem>
                ))}
              </Select>
              <Select
                aria-label={t("sort")}
                className='w-[170px]'
                size='sm'
                selectedKeys={[query.dir!]}
                onChange={(e) => update({ dir: e.target.value })}>
                <SelectItem key='asc'>{t("asc")}</SelectItem>
                <SelectItem key='desc'>{t("desc")}</SelectItem>
              </Select>
            </div>
          </div>
          {isFetching && !data ? <Loader /> : <BookGrid books={data?.items ?? []} />}
          {data && data.total > LIMIT && (
            <Pagination
              className='self-center'
              total={Math.ceil(data.total / LIMIT)}
              page={query.page}
              onChange={(p) => update({ page: String(p) })}
              color='warning'
            />
          )}
        </section>
      </div>
    </Page>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Catalog />
    </Suspense>
  );
}
