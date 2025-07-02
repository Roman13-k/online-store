import React from "react";

export function Loading() {
  const delays = [0.6, 0.75, 0.9, 1.05, 1.2, 1.35, 1.5, 1.64];

  return (
    <div className='flex gap-[5px] justify-center items-center w-[570px] h-[30px] mx-auto'>
      {delays.map((delay, index) => (
        <div
          key={index}
          className='w-[30px] h-[30px] rounded-full'
          style={{
            backgroundColor: "#d43814",
            animation: `bounce-custom 1.5s ${delay}s infinite normal`,
          }}></div>
      ))}
      <style jsx>{`
        @keyframes bounce-custom {
          0% {
            transform: scale(1);
            background-color: #d43814;
          }
          100% {
            transform: scale(0.3);
            background-color: #ffffff;
          }
        }
      `}</style>
    </div>
  );
}
