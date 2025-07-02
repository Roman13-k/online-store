import MainButton from "@/components/ui/shared/buttons/MainButton";
import TextDivider from "@/components/ui/shared/divider/TextDivider";
import { AuthChoose } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

interface RegOrLogModalProps {
  setIsOpenAuth: Dispatch<SetStateAction<boolean>>;
  setIsOpenChoose: Dispatch<SetStateAction<AuthChoose | boolean>>;
}

export function RegOrLogModal({ setIsOpenAuth, setIsOpenChoose }: RegOrLogModalProps) {
  return (
    <section
      onClick={() => setIsOpenAuth(false)}
      className='absolute flex justify-center items-center bg-grey-e9-70 w-full h-screen overflow-hidden z-10'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center opacity-100 bg-white w-[503px] h-[393px] rounded-[45px] z-20 p-6'>
        <button onClick={() => setIsOpenAuth(false)} className='ml-auto'>
          <img src='/icons/close-btn.svg' />
        </button>
        <MainButton
          onPress={() => {
            setIsOpenAuth(false);
            setIsOpenChoose("registration");
          }}
          className='flex justify-center items-center min-h-[62px] min-w-[385px] text-white mt-[40px]'>
          Зарегистрироваться
        </MainButton>
        <TextDivider />
        <button
          onClick={() => {
            setIsOpenAuth(false), setIsOpenChoose("login");
          }}
          className='flex justify-center items-center h-[62px] w-[385px] bg-colar font-medium text-lg text-orange-main rounded-[5px]'>
          Войти
        </button>
      </div>
    </section>
  );
}
