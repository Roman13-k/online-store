"use client";

import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { SubEvent } from "./SubEvent";
import { customValidator } from "@/utils/login/customValidator";
import { customSubmit } from "@/utils/login/customSubmit";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export function RegSeller({ handleClose }: { handleClose: () => void }) {
  const t = useTranslations("RegSeller");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const { setAuth } = useAuthContext();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setAuth("seller");
      redirect("/profile/seller");
    }
  }, [isSuccess, isLoading, setAuth]);

  return (
    <ModalLayout onClose={handleClose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>{t("title")}</h2>
      <Form
        ref={formRef}
        className='grid grid-cols-2 gap-4'
        validationBehavior='native'
        onSubmit={(e) =>
          customSubmit(e, formRef, setIsSuccess, "registration/seller", setIsLoading)
        }>
        <Input
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
          isLoading={isLoading}
          type='submit'
          className='bg-[#F35935] rounded-[5px] pl-3 pr-3 w-[340px] h-[58px] font-medium text-white text-lg shadow-normal active:translate-y-1'>
          {t("button.start")}
        </Button>
      </Form>
      <SubEvent isSuccess={isSuccess} textFalse={t("errors.emailTaken")} />
    </ModalLayout>
  );
}
