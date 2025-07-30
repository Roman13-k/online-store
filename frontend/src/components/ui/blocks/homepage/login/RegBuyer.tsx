"use client";

import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { SubEvent } from "./SubEvent";
import { customSubmit } from "@/utils/login/customSubmit/customSubmit";
import { customValidator } from "@/utils/login/customValidator/customValidator";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export function RegBuyer({ handleClose }: { handleClose: () => void }) {
  const t = useTranslations("RegBuyer");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const formRef = useRef(null);
  const { setAuth } = useAuthContext();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setAuth("buyer");
      redirect("/profile/buyer");
    }
  }, [isSuccess, isLoading, setAuth]);

  return (
    <ModalLayout onClose={handleClose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>{t("title")}</h2>
      <Form
        ref={formRef}
        className='flex flex-col items-center gap-4'
        validationBehavior='native'
        onSubmit={(e) =>
          customSubmit(e, formRef, setIsSuccess, "registration/buyer", setIsLoading)
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
