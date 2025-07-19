"use client";
import MainButton from "@/components/ui/shared/buttons/MainButton";
import FormInput from "@/components/ui/shared/inputs/FormInput";
import TextEditor from "@/components/ui/shared/textareas/TextEditor";
import React, { useRef, useState } from "react";

/*
title *
description *
//!  year: number
//!  characteristics: string
//!  shop: ShopInterface;
//!  category: string;
type_book *
price *
author * 
age_reader *
language *
type_cover *
publishing *
isbn *
series *
images *
*/

export default function NewProduct() {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const characteristicsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-semibold text-[30px] text-black mb-5'>Добавить новый продукт</h2>

      <form className='max-w-[750px] flex flex-col gap-7'>
        {step === 0 && (
          <>
            <FormInput
              name='title'
              type='text'
              className='border-black/40'
              label='Название книги'
            />
            <TextEditor content={`<div>Введите описание</div>`} editorRef={descriptionRef} />
            <TextEditor
              content={`<div>Введите характеристики</div>`}
              editorRef={characteristicsRef}
            />
          </>
        )}

        {step === 1 && (
          <>
            <FormInput name='year' type='date' className='border-black/40' label='Год выпуска' />
            <FormInput name='category' type='text' className='border-black/40' label='Категория' />
            <FormInput name='type_book' type='text' className='border-black/40' label='Тип Книги' />
            <FormInput name='author' type='text' className='border-black/40' label='Автор' />
            <FormInput name='price' type='number' className='border-black/40' label='Цена (₽)' />
          </>
        )}

        {step === 2 && (
          <>
            <FormInput
              name='type_cover'
              type='text'
              className='border-black/40'
              label='Эт шо такое'
            />
            <FormInput
              name='publishing'
              type='text'
              className='border-black/40'
              label='Издательство'
            />
            <FormInput name='isbn' type='text' className='border-black/40' label='ISBN' />
            <FormInput name='series' type='text' className='border-black/40' label='Серия' />
            <p>images</p>
          </>
        )}

        <div className='flex w-full gap-3'>
          {step > 0 && (
            <MainButton className='flex-1' type='button' onPress={prevStep}>
              Назад
            </MainButton>
          )}
          {step < 2 ? (
            <MainButton className='flex-1' type='button' onPress={nextStep}>
              Далее
            </MainButton>
          ) : (
            <MainButton className='flex-1' type='button'>
              Сохранить
            </MainButton>
          )}
        </div>
      </form>
    </div>
  );
}
