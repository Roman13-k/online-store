import React from "react";
import Link from "next/link";
import { H1 } from "../../shared/text";
import { collections } from "@/utils/bookPage/collections";

export default function Collections({
  category,
  category_slug,
}: {
  category: string;
  category_slug: string;
}) {
  return (
    <section className='flex flex-col gap-6'>
      <H1>Подборки книг в категории {category}</H1>
      <div className='flex flex-wrap gap-2'>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/catalog/${category_slug}/${collection.id}`}
            className='text-[14px] hover:opacity-80 font-second text-black px-[14px] py-2 rounded-[20px] bg-grey-e9'>
            {collection.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
