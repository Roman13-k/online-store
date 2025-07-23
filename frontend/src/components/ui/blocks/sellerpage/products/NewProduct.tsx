"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import FormInput from "@/components/ui/shared/inputs/FormInput";
import TextEditor from "@/components/ui/shared/textareas/TextEditor";
import MainButton from "@/components/ui/shared/buttons/MainButton";

export default function NewProduct() {
  const t = useTranslations("main.sellerScreen.newProduct");
  const descriptionRef = useRef<HTMLDivElement>(null);
  const characteristicsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-semibold text-[30px] text-black mb-5'>{t("title")}</h2>

      <form className='max-w-[750px] min-w-[500px] flex flex-col gap-7'>
        {step === 0 && (
          <>
            <FormInput
              name='title'
              type='text'
              className='border-black/40'
              label={t("bookTitle")}
            />
            <TextEditor
              content={`<div>${t("descriptionPlaceholder")}</div>`}
              editorRef={descriptionRef}
            />
            <TextEditor
              content={`<div>${t("characteristicsPlaceholder")}</div>`}
              editorRef={characteristicsRef}
            />
          </>
        )}

        {step === 1 && (
          <>
            <FormInput name='year' type='date' className='border-black/40' label={t("year")} />
            <FormInput
              name='category'
              type='text'
              className='border-black/40'
              label={t("category")}
            />
            <FormInput
              name='type_book'
              type='text'
              className='border-black/40'
              label={t("type_book")}
            />
            <FormInput name='author' type='text' className='border-black/40' label={t("author")} />
            <FormInput name='price' type='number' className='border-black/40' label={t("price")} />
          </>
        )}

        {step === 2 && (
          <>
            <FormInput
              name='type_cover'
              type='text'
              className='border-black/40'
              label={t("type_cover")}
            />
            <FormInput
              name='publishing'
              type='text'
              className='border-black/40'
              label={t("publishing")}
            />
            <FormInput name='isbn' type='text' className='border-black/40' label={t("isbn")} />
            <FormInput name='series' type='text' className='border-black/40' label={t("series")} />
            <p>{t("images")}</p>
          </>
        )}

        <div className='flex w-full gap-3'>
          {step > 0 && (
            <MainButton className='flex-1' type='button' onPress={prevStep}>
              {t("back")}
            </MainButton>
          )}
          {step < 2 ? (
            <MainButton className='flex-1' type='button' onPress={nextStep}>
              {t("next")}
            </MainButton>
          ) : (
            <div className='fixed inset-0 z-100 flex justify-center items-center '>
              <div className='flex flex-col bg-white shadow-normal rounded-[5px] border-2 border-black/40 p-5'>
                <MainButton className='flex-1' type='button'>
                  {t("save")}
                </MainButton>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
