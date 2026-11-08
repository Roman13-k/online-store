"use client";
import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Link, useRouter } from "@/i18n/navigation";
import { errorCode, useLoginMutation } from "@/store/api";

export function LoginForm({ admin = false }: { admin?: boolean }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [login, state] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password, admin }).unwrap();
      router.push(admin ? "/admin" : "/catalog");
    } catch (err) {
      setError(errorCode(err) === "EMAIL_NOT_CONFIRMED" ? t("notConfirmed") : t("badCredentials"));
    }
  };

  return (
    <Card className='mx-auto mt-10 w-full max-w-[420px]'>
      <CardBody>
        <form onSubmit={submit} className='flex flex-col gap-4 p-2'>
          <h1 className='text-2xl font-semibold'>{admin ? t("adminLoginTitle") : t("loginTitle")}</h1>
          <Input type='email' label={t("email")} value={email} onValueChange={setEmail} isRequired autoComplete='email' />
          <Input type='password' label={t("password")} value={password} onValueChange={setPassword} isRequired autoComplete='current-password' />
          {error && <p className='text-sm text-red'>{error}</p>}
          <Button type='submit' radius='sm' className='bg-orange-main text-white' isLoading={state.isLoading}>
            {t("submitLogin")}
          </Button>
          {!admin && (
            <p className='text-sm'>
              {t("noAccount")} <Link href='/register' className='text-orange-main'>{t("registerTitle")}</Link>
            </p>
          )}
          <Link href={admin ? "/login" : "/admin/login"} className='text-sm text-grey-price'>
            {admin ? t("buyerLink") : t("adminLink")}
          </Link>
        </form>
      </CardBody>
    </Card>
  );
}
