import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Registration({ setIsOpenReg }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        setIsOpenReg(false);
        navigate("/");
      }}
      className='absolute flex justify-center items-center bg-grey-e9-70 w-full h-screen overflow-hidden z-30'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center justify-start bg-white w-[503px] h-[535px] rounded-[45px] p-6'>
        <button onClick={() => navigate("/")} className='ml-auto'>
          <img src='/icons/close-btn.svg' />
        </button>
        <Link
          onClick={() => {
            setIsOpenReg(false);
            navigate("/");
          }}
          to='/registration/buyer'
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/buyer.svg' />
          <p className='font-bold text-[22px] leading-[88%] mt-3'>Покупатель</p>
        </Link>
        <div className='flex items-center mt-6 mb-6'>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
          <p className='ml-3 mr-3'>или</p>
          <span className='w-[169px] h-[1px] bg-grey-d9'></span>
        </div>
        <Link
          onClick={() => setIsOpenReg(false)}
          to='/registration/seller'
          className='flex flex-col items-center font-medium text-lg text-black'>
          <img src='/icons/seller.svg' className='' />
          <p className='font-bold text-[22px] leading-[88%]'>Продавец</p>
        </Link>
      </div>
    </div>
  );
}
