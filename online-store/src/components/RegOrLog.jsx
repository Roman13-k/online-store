import { Button } from "@heroui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function RegOrLog({ setIsOpenAuth, setIsOpenChoose }) {
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
        <Link
          onClick={() => {
            setIsOpenAuth(false);
            setIsOpenChoose("/registration");
          }}
          to='/registration'
          className='flex justify-center items-center h-[62px] w-[385px] text-white font-medium text-lg bg-orange-main rounded-[5px] mt-[40px]'>
          Зарегистрироваться
        </Link>
        <div className='flex items-center mt-6 mb-6'>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
          <p className='ml-3 mr-3'>или</p>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
        </div>
        <Link
          to='/login'
          onClick={() => {
            setIsOpenAuth(false), setIsOpenChoose("/login");
          }}
          className='flex justify-center items-center h-[62px] w-[385px] bg-colar font-medium text-lg text-orange-main rounded-[5px]'>
          Войти
        </Link>
      </div>
    </section>
  );
}
