import React from "react";

interface SubEvent {
  isSuccess: boolean | null;
  textTrue: string;
  textFalse: string;
}

export function SubEvent({ isSuccess, textTrue, textFalse }: SubEvent) {
  return (
    <div className='relative h-5 mb-5 overflow-hidden'>
      <p
        className={`absolute left-0 top-0 text-sm text-red transition-all duration-400
          ${isSuccess === false ? "opacity-100 translate-x-[5%]" : "-translate-x-full opacity-0"}`}>
        {textFalse}
      </p>
      <p
        className={`absolute left-0 top-0 text-sm text-green-400 transition-all duration-400
          ${isSuccess === true ? "opacity-100 translate-x-[5%]" : "-translate-x-full opacity-0"}`}>
        {textTrue}
      </p>
    </div>
  );
}
