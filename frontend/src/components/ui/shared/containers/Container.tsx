import React, { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

export default function Container({ children, className }: PropsWithChildren & ContainerProps) {
  return (
    <div className={`${className} flex flex-col gap-10 px-20 mx-auto max-w-[1440px] w-full`}>
      {children}
    </div>
  );
}
