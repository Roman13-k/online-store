"use client";
import Image from "next/image";
import React, { PropsWithChildren, useEffect } from "react";

interface ModalLayoutProps extends PropsWithChildren {
  onClose?: () => void;
}

export default function ModalLayout({ onClose, children }: ModalLayoutProps) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 z-100 flex justify-center items-center bg-grey-e9-70'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center justify-start bg-white rounded-[45px] p-6 '>
        <button onClick={onClose} className='ml-auto'>
          <Image width={38} height={38} alt='close.svg' src='/icons/btns/close-btn.svg' />
        </button>
        {children}
      </div>
    </div>
  );
}
