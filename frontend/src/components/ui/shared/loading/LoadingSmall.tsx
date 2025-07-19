import React from "react";

export default function LoadingSmall() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-12 h-12 block border-t-2 border-b-2 border-orange-main animate-spin rounded-full'></div>
    </div>
  );
}
