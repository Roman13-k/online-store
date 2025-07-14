import React, { PropsWithChildren } from "react";

export default function H1(props: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={`${props.className} font-semibold text-[38px] leading-[120%] font-first text-black`}>
      {props.children}
    </h1>
  );
}
