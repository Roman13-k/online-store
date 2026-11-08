"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button, Divider, Textarea, addToast } from "@heroui/react";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cover, Rating, useAddToCart } from "@/components/books/BookCard";
import { Loader, Page } from "@/components/common";
import { formatDate, useCurrency } from "@/lib/currency";
import { errorMessage, useBookQuery, useDeleteReviewMutation, useMeQuery, useReviewsQuery, useSaveReviewMutation } from "@/store/api";

function Stars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type='button' aria-label={String(n)} onClick={() => onChange(n)}>
          <Star size={26} className={n <= value ? "fill-yellow text-yellow" : "text-grey-d9"} />
        </button>
      ))}
    </div>
  );
}

function Reviews({ bookId }: { bookId: number }) {
  const t = useTranslations("book");
  const locale = useLocale();
  const { data: me } = useMeQuery();
  const { data: reviews = [] } = useReviewsQuery(bookId);
  const mine = reviews.find((r) => r.user_id === me?.user?.id);
  const [rating, setRating] = useState(mine?.rating ?? 5);
  const [body, setBody] = useState(mine?.body ?? "");
  const [save, saving] = useSaveReviewMutation();
  const [remove] = useDeleteReviewMutation();
  useEffect(() => {
    if (mine) {
      setRating(mine.rating);
      setBody(mine.body);
    }
  }, [mine?.review_id]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async () => {
    try {
      await save({ bookId, rating, body }).unwrap();
      addToast({ title: t("yourReview"), color: "success" });
    } catch (e) {
      addToast({ title: errorMessage(e), color: "danger" });
    }
  };

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold'>{t("reviews")}</h2>
      {me?.user?.role === "buyer" ? (
        <div className='flex flex-col gap-2 rounded-md bg-grey-f5f7 p-4'>
          <p className='font-medium'>{t("yourReview")}</p>
          <Stars value={rating} onChange={setRating} />
          <Textarea label={t("reviewText")} value={body} onValueChange={setBody} maxLength={2000} />
          <div className='flex gap-2'>
            <Button radius='sm' className='bg-orange-main text-white' isLoading={saving.isLoading} onPress={submit}>
              {t("sendReview")}
            </Button>
            {mine && (
              <Button radius='sm' variant='light' color='danger' onPress={() => remove(bookId)}>
                {t("deleteReview")}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p className='text-grey-price'>{t("loginToReview")}</p>
      )}
      {reviews.length === 0 && <p className='text-grey-price'>{t("noReviews")}</p>}
      {reviews.map((r) => (
        <div key={r.review_id} className='flex flex-col gap-1'>
          <div className='flex items-center gap-3'>
            <b>
              {r.first_name} {r.last_name}
            </b>
            <Rating value={r.rating} />
            <span className='text-sm text-grey-price'>{formatDate(r.created_at, locale)}</span>
          </div>
          {r.body && <p>{r.body}</p>}
          <Divider className='mt-2' />
        </div>
      ))}
    </section>
  );
}

export default function BookPage() {
  const t = useTranslations();
  const id = Number(useParams<{ id: string }>().id);
  const { data: book, isLoading, isError } = useBookQuery(id);
  const { format } = useCurrency();
  const { add, inCart } = useAddToCart();
  if (isLoading) return <Loader />;
  if (isError || !book) return <Page title={t("book.notFound")} />;

  const facts: [string, React.ReactNode][] = [
    [t("book.authors"), book.authors],
    [t("book.genres"), book.genreList.map((g, i) => (
      <span key={g.genre_id}>
        {i > 0 && ", "}
        <Link className='text-orange-main' href={`/catalog?genre=${g.genre_id}`}>{g.name}</Link>
      </span>
    ))],
    [t("book.publisher"), book.publisher],
    [t("book.year"), book.publish_year ?? "—"],
    [t("book.pages"), book.pages ?? "—"],
    [t("book.isbn"), book.isbn],
  ];

  return (
    <Page>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-[320px_1fr]'>
        <Cover src={book.cover_url} title={book.title} className='h-[460px] w-full rounded-md shadow-normal' />
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-semibold'>{book.title}</h1>
          <Rating value={book.rating} count={book.reviews_count} />
          <dl className='grid grid-cols-[160px_1fr] gap-y-2'>
            {facts.map(([k, v]) => (
              <div key={k} className='contents'>
                <dt className='text-grey-price'>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className='flex items-center gap-6'>
            <span className='text-3xl font-semibold'>{format(book.price_byn)}</span>
            <span className={book.stock > 0 ? "text-green-700" : "text-red"}>
              {book.stock > 0 ? t("common.inStock", { count: book.stock }) : t("common.outOfStock")}
            </span>
          </div>
          {book.stock > 0 && (
            <Button radius='sm' size='lg' className='w-fit bg-orange-main text-white' onPress={() => add(book.book_id)}>
              {inCart(book.book_id) ? t("book.inCart") : t("book.addToCart")}
            </Button>
          )}
          {book.annotation && (
            <>
              <h2 className='mt-4 text-xl font-semibold'>{t("book.annotation")}</h2>
              <p className='leading-relaxed'>{book.annotation}</p>
            </>
          )}
        </div>
      </div>
      <Reviews key={book.book_id} bookId={book.book_id} />
    </Page>
  );
}
