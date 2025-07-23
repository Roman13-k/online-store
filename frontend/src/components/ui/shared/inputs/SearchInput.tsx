import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import TextDivider from "../divider/TextDivider";
import { useTranslations } from "next-intl";

interface SearchInputProps {
  isOpenUploadModal: boolean;
  setIsOpenUploadModal: Dispatch<SetStateAction<boolean>>;
}

export function UploadModal({ isOpenUploadModal }: { isOpenUploadModal: boolean }) {
  const t = useTranslations("header");
  return (
    <div
      className={`absolute top-[123px] w-[270px] right-[288px] rounded-[5px] p-5 border border-dashed border-black  bg-white ${
        isOpenUploadModal ? "opacity-100 translate-y-0 z-50" : "opacity-0 -translate-y-full -z-40"
      } transition-all duration-300`}>
      <div className='flex flex-col w-full gap-3'>
        <label className='flex w-full gap-3 cursor-pointer items-center'>
          <input type='file' accept='image/*' className='hidden' />
          <Image width={46} height={46} src='/icons/search/upload.svg' alt='upload.svg' />
          <p>
            <span className='text-orange-main'>{t("upload.1")} </span>
            {t("upload.2")}
          </p>
        </label>
        <TextDivider className='flex items-center' />
        <label className='flex w-full gap-3 cursor-pointer items-center'>
          <input type='file' accept='image/*' capture='environment' className='hidden' />
          <Image width={46} height={46} src='/icons/search/photo.svg' alt='photo.svg' />
          <p>
            <span className='text-orange-main'>{t("photo.1")} </span>
            {t("photo.2")}
          </p>
        </label>
      </div>
    </div>
  );
}

export default function SearchInput({ isOpenUploadModal, setIsOpenUploadModal }: SearchInputProps) {
  const t = useTranslations("header");
  return (
    <>
      <UploadModal isOpenUploadModal={isOpenUploadModal} />
      <div className='flex w-[520px] px-5 h-[46px] rounded-[5px] overflow-hidden border border-black '>
        <input
          type='text'
          className="flex-1 text-black/40 dark:text-black placeholder:dark:text-black bg-white outline-none bg-[url('/icons/search/loupe.svg')] bg-no-repeat bg-[95%_50%]"
          placeholder={t("search-input")}
        />
        <button
          className='flex items-center gap-5'
          onClick={() => setIsOpenUploadModal((prev) => !prev)}>
          <span className='block border border-black w-[1px] h-[30px]'></span>
          <Image width={20} height={20} src='/icons/search/search-icon.svg' alt='search.svg' />
        </button>
      </div>
    </>
  );
}
