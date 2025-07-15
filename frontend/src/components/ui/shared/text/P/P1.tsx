import React, { PropsWithChildren } from "react";

type P1Props = PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>;

export default function P1({ className = "", children, ...rest }: P1Props) {
  return (
    <p className={`${className} text-[16px] font-first text-black leading-[150%]`} {...rest}>
      {children}
    </p>
  );
}
