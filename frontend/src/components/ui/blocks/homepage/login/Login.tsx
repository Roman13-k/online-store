import React, { useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";
import { customValidator } from "../../../../../utils/login/customValidator/customValidator";
import { SubEvent } from "./SubEvent";
import ModalLayout from "@/components/ui/layout/ModalLayout";
import { BuyerOrSeller } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLoginUserMutation } from "@/store/api/userApi";
import { LoginData, Tokens } from "@/interface/homePage/login";

interface LoginModalProps {
  buyerOrSeller: null | BuyerOrSeller;
  handleCLose: () => void;
}

export function Login({ buyerOrSeller, handleCLose }: LoginModalProps) {
  const t = useTranslations("LoginModal");
  const { setAuth } = useAuthContext();
  const [loginUser, { isSuccess, isError, isLoading, data }] = useLoginUserMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (data) {
        const tokens: Tokens = data;
        localStorage.setItem(`access_token_${buyerOrSeller}`, tokens.access_token);
        localStorage.setItem(`refresh_token_${buyerOrSeller}`, tokens.refresh_token);
      }
      setAuth(buyerOrSeller);
      redirect(`/profile/${buyerOrSeller}`);
    }
  }, [isSuccess]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!buyerOrSeller) return;

    const formData = new FormData(e.currentTarget);
    const data: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      user_type: buyerOrSeller,
    };

    loginUser(data);
  };

  return (
    <ModalLayout onClose={handleCLose}>
      <h2 className='text-4xl text-orange-main font-bold mb-4'>{t("title")}</h2>
      <Form
        className='flex flex-col items-center gap-4'
        validationBehavior='native'
        onSubmit={(e) => handleLogin(e)}>
        <Input
          data-testid='login-email'
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
          data-testid='login-password'
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
          data-testid='login-submit-btn'
          isLoading={isLoading}
          type='submit'
          className='bg-[#F35935] rounded-[5px] pl-3 pr-3 w-[340px] h-[58px] font-medium text-white text-lg shadow-normal active:translate-y-1'>
          {t("button.login")}
        </Button>
      </Form>
      <SubEvent isError={isError} textFalse={t("errors.loginFailed")} />
    </ModalLayout>
  );
}
