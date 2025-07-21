"use client";
import React, { PropsWithChildren, useState } from "react";
import Checkbox from "../checkboxes/Checkbox";
import LoadingSmall from "../loading/LoadingSmall";
import { useLocale } from "next-intl";

interface FieldsetProps {
  fieldsetData: string[] | undefined;
  legend: string;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
}

interface FieldSetContainerProps extends PropsWithChildren {
  className?: string;
  legend: string;
}

export function FieldSetContainer({ className, children, legend }: FieldSetContainerProps) {
  return (
    <fieldset className={`${className} flex flex-col font-first items-start`}>
      <legend className='text-black font-semibold text-[18px] mb-4'>{legend}</legend>
      {children}
    </fieldset>
  );
}

export default function Fieldset({
  className,
  legend,
  fieldsetData,
  isLoading,
  isError,
}: FieldsetProps) {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const locale = useLocale();

  const showAllText =
    locale === "ru"
      ? "Показать весь список"
      : locale === "zh-CN"
      ? "显示完整列表"
      : "Show full list";

  const hideText =
    locale === "ru" ? "Скрыть список" : locale === "zh-CN" ? "隐藏列表" : "Hide list";

  return (
    <FieldSetContainer className={className} legend={legend}>
      {isLoading && <LoadingSmall />}
      {isError && <div className='text-sm text-red-500'>Не удалось загрузить данные</div>}
      {!isLoading && !isError && fieldsetData && (
        <>
          <div>
            {fieldsetData.map((data, index) => {
              if (!isFullOpen && index > 5) return null;
              return <Checkbox key={index} data={data} />;
            })}
          </div>
          {fieldsetData.length > 6 && (
            <button
              onClick={() => setIsFullOpen((prev) => !prev)}
              className='text-orange-main text-[14px] font-semibold mt-2'>
              {isFullOpen ? hideText : showAllText}
            </button>
          )}
        </>
      )}
    </FieldSetContainer>
  );
}
