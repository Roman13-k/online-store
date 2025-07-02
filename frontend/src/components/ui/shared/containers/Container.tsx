import React, { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className='flex flex-col gap-10 px-20 mx-auto max-w-[1440px] w-full'>{children}</div>;
}
