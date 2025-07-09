import React, { PropsWithChildren } from "react";

export default function P2(props: PropsWithChildren<{ className?: string }>) {
  return (
    <p className={`${props.className} text-[14px] font-first text-black leading-[120%]`}>
      {props.children}
    </p>
  );
}
