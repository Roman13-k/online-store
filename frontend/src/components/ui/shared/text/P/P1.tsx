import React, { PropsWithChildren } from "react";

export default function P1(props: PropsWithChildren<{ className?: string }>) {
  return (
    <p className={`${props.className} text-[16px] font-first text-black leading-[150%]`}>
      {props.children}
    </p>
  );
}
