import React, { useRef, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { SubEvent } from "./SubEvent";
import { customValidator } from "@/utils/customValidator";
import { customSubmit } from "@/utils/customSubmit";
import ModalLayout from "@/components/ui/layout/ModalLayout";

export function RegSeller({ handleClose }: { handleClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const formRef = useRef<null | HTMLFormElement>(null);

  return (
    <ModalLayout onClose={handleClose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>Регистрация</h2>
      <Form
        ref={formRef}
        className='grid grid-cols-2 gap-4'
        validationBehavior='native'
        onSubmit={(e) =>
          customSubmit(e, formRef, setIsSuccess, "/registration/seller", setIsLoading)
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
        <Input
          isRequired
          errorMessage='Укажите страну'
          placeholder='Страна регистрации'
          type='text'
          name='country'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите тип организации'
          placeholder='Тип организации'
          type='text'
          name='type_organization'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите ИНН'
          placeholder='ИНН'
          type='text'
          name='itn'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите верную фамилтю'
          placeholder='Фамилия'
          type='text'
          name='name'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите верное имя'
          placeholder='Имя'
          type='text'
          name='last_name'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите верное Отчество'
          placeholder='Отчество'
          type='text'
          name='patronymic'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          isRequired
          errorMessage='Укажите верное название'
          placeholder='Название компании (магазина)'
          type='text'
          name='company_name'
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
    </ModalLayout>
  );
}
