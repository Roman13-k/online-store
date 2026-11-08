"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, addToast } from "@heroui/react";
import { Star } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import type { BookCard as Book } from "@/lib/types";
import { useCurrency } from "@/lib/currency";
import { errorMessage, useCartQuery, useMeQuery, useSetCartItemMutation } from "@/store/api";

export function Cover({ src, title, className = "" }: { src: string | null; title: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={!src || failed ? "/img/books/book.png" : src}
      alt={title}
      onError={() => setFailed(true)}
      className={`object-contain bg-grey-f5f7 ${className}`}
      loading='lazy'
    />
  );
}

export function Rating({ value, count }: { value: number | null; count?: number }) {
  return (
    <span className='flex items-center gap-1 text-sm text-grey-price'>
      <Star size={16} className={value ? "fill-yellow text-yellow" : ""} />
      {value ? value.toFixed(1) : "—"}
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}

export function useAddToCart() {
  const t = useTranslations();
  const router = useRouter();
  const { data: me } = useMeQuery();
  const { data: cart } = useCartQuery(undefined, { skip: me?.user?.role !== "buyer" });
  const [setItem, state] = useSetCartItemMutation();
  const add = async (bookId: number) => {
    if (me?.user?.role !== "buyer") return router.push("/login");
    const current = cart?.find((i) => i.book_id === bookId)?.quantity ?? 0;
    try {
      await setItem({ bookId, quantity: current + 1 }).unwrap();
      addToast({ title: t("book.inCart"), color: "success" });
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };
  const inCart = (bookId: number) => cart?.some((i) => i.book_id === bookId) ?? false;
  return { add, inCart, isLoading: state.isLoading };
}

export function BookCard({ book }: { book: Book }) {
  const t = useTranslations();
  const { format } = useCurrency();
  const { add, inCart } = useAddToCart();
  return (
    <div className='flex flex-col rounded-md bg-grey-f5f7 p-3 shadow-normal'>
      <Link href={`/book/${book.book_id}`} className='flex flex-col gap-2 flex-1'>
        <Cover src={book.cover_url} title={book.title} className='h-[230px] w-full rounded' />
        <p className='font-medium line-clamp-2 min-h-[48px]'>{book.title}</p>
        <p className='text-sm text-grey-price line-clamp-1'>{book.authors}</p>
        <Rating value={book.rating} count={book.reviews_count} />
      </Link>
      <div className='mt-2 flex items-center justify-between gap-2'>
        <span className='text-lg font-semibold'>{format(book.price_byn)}</span>
        {book.stock > 0 ? (
          <Button size='sm' radius='sm' className='bg-orange-main text-white' onPress={() => add(book.book_id)}>
            {inCart(book.book_id) ? t("book.inCart") : t("book.addToCart")}
          </Button>
        ) : (
          <span className='text-sm text-red'>{t("common.outOfStock")}</span>
        )}
      </div>
    </div>
  );
}

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {books.map((b) => (
        <BookCard key={b.book_id} book={b} />
      ))}
    </div>
  );
}
