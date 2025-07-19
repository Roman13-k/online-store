import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export default function FormInput({ className, children, label, ...props }: FormInputProps) {
  return (
    <label className='flex flex-col w-full'>
      {label && <p className='text-[18px] text-black font-first'>{label}</p>}
      <input
        className={`${className} p-3 text-[16px] text-black placeholder:text-black/40 focus:outline-none border-2 rounded-[5px]`}
        {...props}
      />
      {children}
    </label>
  );
}
