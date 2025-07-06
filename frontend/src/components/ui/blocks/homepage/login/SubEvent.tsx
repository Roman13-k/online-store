import React from "react";

interface SubEvent {
  isSuccess: boolean | null;
  textTrue: string;
  textFalse: string;
}

export function SubEvent({ isSuccess, textTrue, textFalse }: SubEvent) {
  return (
    <div className='relative h-5 w-full mt-5 '>
      <p
        className={`
          absolute left-[50%] top-0 text-sm transform -translate-x-1/2 whitespace-nowrap
          ${isSuccess === true ? "text-green-400" : "text-red"}
          ${isSuccess !== null ? "block" : "hidden"}
        `}>
        {isSuccess === true ? textTrue : textFalse}
      </p>
    </div>
  );
}
