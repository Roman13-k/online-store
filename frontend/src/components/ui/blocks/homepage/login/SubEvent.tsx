import React from "react";

interface SubEvent {
  isError: boolean | null;
  textFalse: string;
}

export function SubEvent({ isError, textFalse }: SubEvent) {
  return (
    <div className='relative h-5 w-full mt-5 '>
      <p
        className={`
          absolute left-[50%] top-0 text-sm transform -translate-x-1/2 whitespace-nowrap
          text-red-500
          ${isError ? "block" : "hidden"}
        `}>
        {isError && textFalse}
      </p>
    </div>
  );
}
