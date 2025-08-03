"use client";

import React, { useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";
import { SubEvent } from "./SubEvent";
import { customValidator } from "@/utils/login/customValidator/customValidator";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRegisterBuyerMutation } from "@/store/api/userApi";
import { RegisterBuyerData, Token } from "@/interface/homePage/login";

export function RegBuyer({ handleClose }: { handleClose: () => void }) {
  const t = useTranslations("RegBuyer");
  const { setAuth } = useAuthContext();
  const [registerBuyer, { isLoading, isSuccess, isError, data }] = useRegisterBuyerMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (data) {
        const tokens: Token = data;
        localStorage.setItem("access_token_buyer", tokens.access_token);
      }
      setAuth("buyer");
      redirect("/profile/buyer");
    }
  }, [isSuccess, isLoading, setAuth]);

  const handleRegBuyer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const typedData: RegisterBuyerData = {
      email: data.email as string,
      password: data.password as string,
    };

    registerBuyer(typedData);
  };

  return (
    <ModalLayout onClose={handleClose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>{t("title")}</h2>
      <Form
        className='flex flex-col items-center gap-4'
        validationBehavior='native'
        onSubmit={(e) => handleRegBuyer(e)}>
        <Input
          data-testid='reg-email'
          isRequired
          errorMessage={t("errors.email")}
          placeholder={t("placeholders.email")}
          type='email'
          name='email'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-password'
          isRequired
          validate={customValidator}
          placeholder={t("placeholders.password")}
          type='password'
          name='password'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Button
          data-testid='reg-submit-btn'
          isLoading={isLoading}
          type='submit'
          className='bg-[#F35935] rounded-[5px] pl-3 pr-3 w-[340px] h-[58px] font-medium text-white text-lg shadow-normal active:translate-y-1'>
          {t("button.start")}
        </Button>
      </Form>
      <SubEvent isError={isError} textFalse={t("errors.emailTaken")} />
    </ModalLayout>
  );
}
