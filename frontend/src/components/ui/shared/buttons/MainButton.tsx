"use client";
import { Button, type ButtonProps } from "@heroui/react";
import { PropsWithChildren } from "react";

type Variant = "orange" | "white";

interface MainButtonProps extends ButtonProps {
  className?: string;
  btnColor?: Variant;
}

export default function MainButton({
  children,
  className,
  btnColor = "orange",
  ...props
}: PropsWithChildren<MainButtonProps>) {
  return (
    <Button
      className={`${className} ${
        btnColor === "orange" ? "bg-orange-main text-[100px]  text-white" : " text-black bg-white"
      } rounded-[5px] px-3 h-[46px] font-medium  text-lg shadow-md active:translate-y-1 flex items-center justify-center`}
      {...props}>
      {children}
    </Button>
  );
}
