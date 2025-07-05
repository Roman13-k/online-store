import React, { PropsWithChildren } from "react";

interface ModalLayoutProps extends PropsWithChildren {
  onClose?: () => void;
}

export default function ModalLayout({ onClose, children }: ModalLayoutProps) {
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 z-100 flex justify-center items-center bg-grey-e9-70'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center justify-start bg-white rounded-[45px] p-6 '>
        <button onClick={onClose} className='ml-auto'>
          <img src='/icons/close-btn.svg' />
        </button>
        {children}
      </div>
    </div>
  );
}
