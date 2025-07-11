import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { customValidator } from "../../../../../utils/login/customValidator";
import { customSubmit } from "../../../../../utils/login/customSubmit";
import { SubEvent } from "./SubEvent";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { AuthChoose, BuyerOrSeller } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

interface LoginModalProps {
  buyerOrSeller: null | BuyerOrSeller;
  authChoose: null | AuthChoose;
  handleCLose: () => void;
}

export function Login({ buyerOrSeller, authChoose, handleCLose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const formRef = useRef(null);
  const { setAuth } = useAuthContext();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setAuth(buyerOrSeller);
      redirect(`/profile/${buyerOrSeller}`);
    }
  }, [isSuccess]);

  return (
    <ModalLayout onClose={handleCLose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>Вход</h2>
      <Form
        ref={formRef}
        className=' flex flex-col items-center gap-4'
        validationBehavior='native'
        onSubmit={(e) =>
          customSubmit(e, formRef, setIsSuccess, `${authChoose}/${buyerOrSeller}`, setIsLoading)
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
          Вход
        </Button>
      </Form>
      <SubEvent
        isSuccess={isSuccess}
        textFalse={"Неверный логин или пароль"}
        textTrue={"Вы вошли в аккаунт!"}
      />
    </ModalLayout>
  );
}
