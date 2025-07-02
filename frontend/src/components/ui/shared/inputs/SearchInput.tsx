import React from "react";

export default function SearchInput() {
  return (
    <input
      type='text'
      className='rounded-[5px] px-5 border border-black opacity-40 h-[46px] w-[420px] bg-[url("/icons/loupe.svg")] bg-no-repeat bg-[95%_50%]'
      placeholder='Найти интересную книгу'
    />
  );
}
