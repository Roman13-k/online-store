import React from "react";

export function SubEvent({ isSuccess, textTrue, textFalse }) {
  return (
    <>
      <p
        className={`text-sm text-red transition-all duration-400  mb-5${
          isSuccess === false
            ? "opacity-100 translate-x-[5%]"
            : " -translate-x-full opacity-0"
        }`}>
        {textFalse}
      </p>
      <p
        className={`text-sm text-green-400 transition-transform duration-400 mb-5 ${
          !!isSuccess == true
            ? "opacity-100 translate-x-[5%]"
            : " -translate-x-full opacity-0"
        }`}>
        {textTrue}
      </p>
    </>
  );
}
