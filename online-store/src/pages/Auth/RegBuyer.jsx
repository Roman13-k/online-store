import React, { useRef, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { customValidator } from "../../utils/customValidator";
import { customSubmit } from "../../utils/customSubmit";
import { SubEvent } from "../../components/SubEvent";

export function RegBuyer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const formRef = useRef(null);

  return (
    <div className='flex flex-col justify-start items-center h-full mt-[150px]'>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>Регистрация</h2>
      <Form
        ref={formRef}
        className='max-w-xs flex flex-col items-center gap-4'
        validationBehavior='native'
        onSubmit={(e) =>
          customSubmit(
            e,
            formRef,
            setIsSuccess,
            "/registration/buyer",
            setIsLoading,
          )
        }>
        <Input
          isRequired
          errorMessage='Укажите верную почту'
          placeholder='Укажите почту'
          type='email'
          name='email'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          validate={customValidator}
          placeholder='Укажите пароль'
          type='password'
          name='password'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Button
          isLoading={isLoading}
          type='submit'
          className='bg-[#F35935] rounded-[5px] pl-3 pr-3 w-[340px] h-[58px] font-medium text-white text-lg shadow-normal active:translate-y-1'>
          Начать регистрацию
        </Button>
      </Form>
      <SubEvent
        isSuccess={isSuccess}
        textFalse={"Упс!.. такая почта уже занята"}
        textTrue={"Регистрация успешна!"}
      />
    </div>
  );
}
