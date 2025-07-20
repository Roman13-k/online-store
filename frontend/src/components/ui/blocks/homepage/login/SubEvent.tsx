import React from "react";

interface SubEvent {
  isSuccess: boolean | null;
  textFalse: string;
}

export function SubEvent({ isSuccess, textFalse }: SubEvent) {
  return (
    <div className='relative h-5 w-full mt-5 '>
      <p
        className={`
          absolute left-[50%] top-0 text-sm transform -translate-x-1/2 whitespace-nowrap
          text-red-500
          ${isSuccess === false ? "block" : "hidden"}
        `}>
        {!isSuccess && textFalse}
      </p>
    </div>
  );
}
