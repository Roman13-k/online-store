"use client";
import { Button, type ButtonProps } from "@heroui/react";
import React, { PropsWithChildren } from "react";

interface MainButtonProps extends ButtonProps {
  className?: string;
}

export default function MainButton({
  children,
  className,
  ...props
}: PropsWithChildren<MainButtonProps>) {
  return (
    <Button
      className={`${className} bg-[#F35935] rounded-[5px] px-3 h-[46px] font-medium text-white text-lg shadow-md active:translate-y-1 flex items-center justify-center`}
      {...props}>
      {children}
    </Button>
  );
}
