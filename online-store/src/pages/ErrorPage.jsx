import { Button } from "@heroui/button";
import React from "react";
import { BackIcon } from "../UI/BackIcon";
import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center w-full h-full mt-[50px] gap-7'>
      <h2 className='text-xl font-semibold'>Что вы тут делаете?!</h2>
      <div className='flex justify-center items-center'>
        <span className='text-[#ff4f03] text-[300px] font-bold'>4</span>
        <img className='bg-transparent' src='/img/error.png' />
        <span className='text-[#ff4f03] text-[300px] font-bold'>4</span>
      </div>
      <Button
        className='font-semibold text-lg p-6'
        onPress={() => navigate("/")}
        startContent={<BackIcon />}>
        Вернуться домой
      </Button>
    </div>
  );
}
