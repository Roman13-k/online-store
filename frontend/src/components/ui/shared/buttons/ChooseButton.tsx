import React from "react";

interface ChooseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function ChooseButton({ children, className, ...props }: ChooseButtonProps) {
  return (
    <button
      className={`${className} text-[14px] hover:border-orange-main/40 border-2 font-light text-black px-[12px] py-1.5 rounded-[20px] bg-grey-e9`}
      {...props}>
      {children}
    </button>
  );
}
