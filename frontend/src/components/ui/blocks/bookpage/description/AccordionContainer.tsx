"use client";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function AccordionContainer({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [isShouldAccordion, setIsShouldAccordion] = useState(false);
  const defaultHeight = 200;

  useEffect(() => {
    if (contentRef && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setIsShouldAccordion(contentRef.current.scrollHeight > defaultHeight);
    }
  }, []);

  return (
    <div className='flex flex-col items-start relative w-full'>
      {!isOpen && isShouldAccordion && (
        <div className='absolute bottom-[35px] left-0 w-full h-24 pointer-events-none bg-gradient-to-t from-white to-transparent blur-md' />
      )}

      <div
        ref={contentRef}
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden w-full `}
        style={{
          maxHeight: isOpen ? `${height}px` : `${defaultHeight}px`,
        }}>
        {children}
      </div>

      {isShouldAccordion && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className='text-[16px] text-orange-main mt-4'>
          {isOpen ? "Скрыть" : "Читать полностью"}
        </button>
      )}
    </div>
  );
}
