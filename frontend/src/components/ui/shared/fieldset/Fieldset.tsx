"use client";
import React, { PropsWithChildren, useState } from "react";
import Checkbox from "../checkboxes/Checkbox";

interface FieldsetProps {
  fieldsetData: string[];
  legend: string;
  className?: string;
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

export default function Fieldset({ className, legend, fieldsetData }: FieldsetProps) {
  const [isFullOpen, setIsFullOpen] = useState(false);

  return (
    <FieldSetContainer className={className} legend={legend}>
      <div>
        {fieldsetData.map((data, index) => {
          if (!isFullOpen && index > 5) return;
          return <Checkbox key={index} data={data} />;
        })}
      </div>
      <button
        onClick={() => setIsFullOpen((prev) => !prev)}
        className={`${
          fieldsetData.length < 7 ? "hidden" : "block"
        } text-orange-main text-[14px] font-semibold mt-2`}>
        {isFullOpen ? "Скрыть список" : "Показать весь список"}
      </button>
    </FieldSetContainer>
  );
}
