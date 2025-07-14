import MainButton from "@/components/ui/shared/buttons/MainButton";
import Image from "next/image";
import React from "react";

export default function BookPrice({ price }: { price: number }) {
  return (
    <div className=' flex flex-col ml-auto p-6 rounded-[5px] shadow-normal bg-grey-f5f7 h-full min-w-[330px] text-black'>
      <div className='flex flex-col'>
        <p className='font-semibold text-[16px] mb-4'>Информация о получении заказа:</p>
        <div className='flex gap-2 items-start'>
          <Image
            className='mt-1'
            width={20}
            height={20}
            src='/icons/bookCard/delivery.svg'
            alt='delivery.svg'
          />
          <div className='flex flex-col gap-1 font-first'>
            <p className='text-black'>Пункты выдачи:</p>
            <p>
              <span className='text-orange-main'>доступны,</span>
              <span className='text-black/50'>
                послезавтра — <span className='font-semibold'>бесплатно</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <span className='my-5 w-full h-[1px] bg-grey-d9'></span>
      <div>
        <p className='font-semibold text-[16px] mb-4'>Итоговая цена:</p>
        <p className='font-semibold text-[28px] text-orange-main'>{price} ₽</p>
      </div>
      <MainButton className='mt-6'>Положить в корзину</MainButton>
    </div>
  );
}
