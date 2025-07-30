import React from "react";

export default function Checkbox({ data }: { data: string }) {
  return (
    <label className='flex items-center gap-2 cursor-pointer relative'>
      <input type='checkbox' className='hidden peer' />
      <span className=' block w-4 h-4 rounded-[5px] bg-grey-d9 transition-colors duration-200 peer-checked:bg-orange-main'></span>
      <span className='absolute left-[5px] top-[4px] w-[6px] h-[11px] border-r-2 border-b-2 border-white rotate-45 scale-0 transition-transform duration-200 peer-checked:scale-100'></span>
      <span className='font-first text-black text-[16px]'>{data}</span>
    </label>
  );
}
