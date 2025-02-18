import React from "react";

export function AccountIcon({ stoke }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='33'
      height='33'
      viewBox='0 0 24 24'
      fill='none'
      stroke={stoke}
      strokeWidth='1.3333333333333333'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-circle-user-round'>
      <path d='M18 20a6 6 0 0 0-12 0' />
      <circle cx='12' cy='10' r='4' />
      <circle cx='12' cy='12' r='10' />
    </svg>
  );
}
