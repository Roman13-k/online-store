import React from "react";

interface FormInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export default function FormTextarea({ className, children, label, ...props }: FormInputProps) {
  return (
    <label className='flex flex-col w-full'>
      {label && <p className='text-[18px] text-black font-first'>{label}</p>}
      <textarea
        className={`${className} p-3 text-[16px] text-black placeholder:text-black/40 border-2 focus:outline-none rounded-[5px] `}
        {...props}
      />
      {children}
    </label>
  );
}
