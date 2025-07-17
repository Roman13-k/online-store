import MainButton from "@/components/ui/shared/buttons/MainButton";
import React from "react";

export default function NewProduct() {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-semibold text-[30px] text-black mb-5'>Добавить новый продукт</h2>
      <form className='max-w-[600px]'>
        <MainButton>Добавить</MainButton>
      </form>
    </div>
  );
}
