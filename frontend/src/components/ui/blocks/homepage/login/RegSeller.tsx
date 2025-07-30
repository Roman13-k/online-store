"use client";

import React, { useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";
import { SubEvent } from "./SubEvent";
import { customValidator } from "@/utils/login/customValidator/customValidator";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRegisterSellerMutation } from "@/store/api/userApi";
import { RegisterSellerData, Tokens } from "@/interface/homePage/login";

export function RegSeller({ handleClose }: { handleClose: () => void }) {
  const t = useTranslations("RegSeller");
  const { setAuth } = useAuthContext();
  const [registerSeller, { isLoading, isSuccess, isError, data }] = useRegisterSellerMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (data) {
        const tokens: Tokens = data;
        localStorage.setItem("access_token_seller", tokens.access_token);
        localStorage.setItem("refresh_token_seller", tokens.refresh_token);
      }
      setAuth("seller");
      redirect("/profile/seller");
    }
  }, [isSuccess, isLoading, setAuth]);

  const handleRegSeller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const typedData: RegisterSellerData = {
      email: data.email as string,
      password: data.password as string,
      type_organization: data.type_organization as string,
      country: data.country as string,
      itn: Number(data.itn),
      name: data.name as string,
      last_name: data.last_name as string,
      patronymic: data.patronymic as string,
      company_name: data.company_name as string,
    };

    registerSeller(typedData);
  };

  return (
    <ModalLayout onClose={handleClose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>{t("title")}</h2>
      <Form
        className='grid grid-cols-2 gap-4'
        validationBehavior='native'
        onSubmit={(e) => handleRegSeller(e)}>
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
        <Input
          data-testid='reg-country'
          isRequired
          errorMessage={t("errors.country")}
          placeholder={t("placeholders.country")}
          type='text'
          name='country'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-org-type'
          isRequired
          errorMessage={t("errors.organizationType")}
          placeholder={t("placeholders.organizationType")}
          type='text'
          name='type_organization'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-itn'
          isRequired
          errorMessage={t("errors.itn")}
          placeholder={t("placeholders.itn")}
          type='text'
          name='itn'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-last-name'
          isRequired
          errorMessage={t("errors.lastName")}
          placeholder={t("placeholders.lastName")}
          type='text'
          name='name'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-first-name'
          isRequired
          errorMessage={t("errors.firstName")}
          placeholder={t("placeholders.firstName")}
          type='text'
          name='last_name'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-patronymic'
          isRequired
          errorMessage={t("errors.patronymic")}
          placeholder={t("placeholders.patronymic")}
          type='text'
          name='patronymic'
          size='lg'
          variant='bordered'
          radius='sm'
        />
        <Input
          data-testid='reg-company-name'
          isRequired
          errorMessage={t("errors.companyName")}
          placeholder={t("placeholders.companyName")}
          type='text'
          name='company_name'
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
