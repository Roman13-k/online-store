"use client";

import ArrowButton from "./ArrowButton";

export default function ScrollToTopButton() {
  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ArrowButton
      onClick={handleScrollUp}
      className='fixed bottom-[80px] left-2.5 w-[60px] h-[60px] bg-colar p-[18px] z-50'
      imgSrc='/icons/arrows/arrowTop.svg'
    />
  );
}
