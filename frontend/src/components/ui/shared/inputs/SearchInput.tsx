import React, { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  isOpenUploadModal: boolean;
  setIsOpenUploadModal: Dispatch<SetStateAction<boolean>>;
}

export function UploadModal({ isOpenUploadModal }: { isOpenUploadModal: boolean }) {
  return (
    <div
      className={`absolute top-[123px] w-[270px] right-[288px] rounded-[5px] p-5 border border-dashed border-black  bg-white ${
        isOpenUploadModal ? "opacity-100 translate-y-0 z-50" : "opacity-0 -translate-y-full -z-40"
      } transition-all duration-300`}>
      <div className='flex flex-col w-full gap-3'>
        <label className='flex w-full gap-3 cursor-pointer items-center'>
          <input type='file' accept='image/*' className='hidden' />
          <img src='/icons/upload.svg' alt='Загрузить' />
          <p>
            <span className='text-orange-main'>Загрузите фото </span>
            книги или фрагмента из неё
          </p>
        </label>
        <div className='flex gap-3 items-center'>
          <span className='border border-black w-[90px] h-[1px]'></span>
          <p>или</p>
          <span className='border border-black w-[90px] h-[1px]'></span>
        </div>
        <label className='flex w-full gap-3 cursor-pointer items-center'>
          <input type='file' accept='image/*' capture='environment' className='hidden' />
          <img src='/icons/photo.svg' alt='' />
          <p>
            <span className='text-orange-main'>Наведите камеру </span>
            своего устройства на книгу
          </p>
        </label>
      </div>
    </div>
  );
}

export default function SearchInput({ isOpenUploadModal, setIsOpenUploadModal }: SearchInputProps) {
  return (
    <>
      <UploadModal isOpenUploadModal={isOpenUploadModal} />
      <div className='flex w-[520px] px-5 h-[46px] rounded-[5px] overflow-hidden border border-black opacity-40'>
        <input
          type='text'
          className="flex-1  bg-white outline-none bg-[url('/icons/loupe.svg')] bg-no-repeat bg-[95%_50%]"
          placeholder='Найти интересную книгу'
        />
        <button
          className='flex items-center gap-5'
          onClick={() => setIsOpenUploadModal((prev) => !prev)}>
          <span className='block border border-black w-[1px] h-[30px]'></span>
          <img src='/icons/search-icon.svg' alt='' />
        </button>
      </div>
    </>
  );
}
