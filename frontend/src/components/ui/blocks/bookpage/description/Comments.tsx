"use client";
import { CommentsIntrerface } from "@/interface/catalogpage/bookCard";
import React, { useState } from "react";
import CommentsRate from "./CommentsRate";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Image from "next/image";

type Variant = "deg" | "inc";

interface SortVariants {
  date: Variant | null;
  rate: Variant | null;
}

export default function Comments({ comments }: { comments: CommentsIntrerface }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState({ date: null, rate: null } as SortVariants);

  const handleSelectSort = (variant: "date" | "rate") => {
    if (!selectedSort[variant]) {
      setSelectedSort((prev) => ({ ...prev, [variant]: "deg" }));
    } else if (selectedSort[variant] === "deg") {
      setSelectedSort((prev) => ({ ...prev, [variant]: "inc" }));
    } else if (selectedSort[variant] === "inc") {
      setSelectedSort((prev) => ({ ...prev, [variant]: null }));
    }
  };

  return (
    <div className='flex gap-[24px] justify-between'>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-6 items-center'>
          <p className='text-[16px] font-first text-black'>Сортировать по:</p>
          <button
            onClick={() => handleSelectSort("date")}
            className={`${selectedSort.date ? "text-orange-main" : "text-black/40"} flex gap-2`}>
            дате
            {selectedSort.date && (
              <Image
                src='/icons/bookCard/Vector.svg'
                alt='vector.svg'
                width={12}
                height={6}
                className={selectedSort.date === "deg" ? "" : "rotate-180 transform"}
              />
            )}
          </button>
          <button
            onClick={() => handleSelectSort("rate")}
            className={`${selectedSort.rate ? "text-orange-main" : "text-black/40"} flex gap-2`}>
            рейтингу
            {selectedSort.rate && (
              <Image
                src='/icons/bookCard/Vector.svg'
                alt='vector.svg'
                width={12}
                height={6}
                className={selectedSort.rate === "deg" ? "" : "rotate-180 transform"}
              />
            )}
          </button>
        </div>

        <div className='flex flex-col gap-6'>
          {comments.result.map((comment, index) => (
            <Comment setIsFormOpen={setIsFormOpen} key={index} comment={comment} />
          ))}
        </div>
        <button className='w-full py-4 shadow-normal bg-grey-f5f7 rounded-[5px] text-black font-first text-[18px]'>
          Показать ещё
        </button>
      </div>
      <div className='flex flex-col gap-10 min-w-[380px]'>
        {!isFormOpen && (
          <CommentsRate
            rateArray={comments.rateArray}
            count={comments.count}
            setIsFormOpen={setIsFormOpen}
          />
        )}
        {isFormOpen && <CommentForm />}
      </div>
    </div>
  );
}
