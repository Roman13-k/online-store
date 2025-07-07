import Image from "next/image";
import React from "react";

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  imgSrc: string;
}

export default function ArrowButton({
  className = "",
  imgSrc,
  children,
  ...props
}: ArrowButtonProps) {
  return (
    <button className={`${className} rounded-full `} {...props}>
      <Image width={100} height={100} src={imgSrc} alt='arrow.svg' />
      {children}
    </button>
  );
}
