"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function TextDivider({ className }: { className?: string }) {
  const t = useTranslations("shared");
  return (
    <div className={`${className ? className : "flex items-center mt-6 mb-6"} `}>
      <span className='w-[169px] h-[1px] bg-grey-d9'></span>
      <p className='ml-3 mr-3'>{t("or")}</p>
      <span className='w-[169px] h-[1px] bg-grey-d9'></span>
    </div>
  );
}
