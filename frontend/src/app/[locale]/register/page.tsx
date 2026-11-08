"use client";
import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { errorCode, errorMessage, useRegisterMutation } from "@/store/api";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tp = useTranslations("profile");
  const lang = useLocale();
  const [register, state] = useRegisterMutation();
  const [form, setForm] = useState({ email: "", password: "", lastName: "", firstName: "", phone: "" });
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register({ ...form, lang }).unwrap();
      setSentTo(form.email);
    } catch (err) {
      setError(errorCode(err) === "DUPLICATE" ? t("emailTaken") : errorMessage(err));
    }
  };

  return (
    <Card className='mx-auto mt-10 w-full max-w-[460px]'>
      <CardBody>
        {sentTo ? (
          <div className='flex flex-col gap-4 p-2'>
            <h1 className='text-2xl font-semibold'>{t("registerTitle")}</h1>
            <p>{t("registered", { email: sentTo })}</p>
            <Link href='/login' className='text-orange-main'>{t("submitLogin")}</Link>
          </div>
        ) : (
          <form onSubmit={submit} className='flex flex-col gap-4 p-2'>
            <h1 className='text-2xl font-semibold'>{t("registerTitle")}</h1>
            <Input type='email' label={t("email")} value={form.email} onValueChange={set("email")} isRequired />
            <Input type='password' label={t("password")} description={t("passwordHint")} value={form.password}
              onValueChange={set("password")} isRequired minLength={8} autoComplete='new-password' />
            <Input label={tp("lastName")} value={form.lastName} onValueChange={set("lastName")} isRequired />
            <Input label={tp("firstName")} value={form.firstName} onValueChange={set("firstName")} isRequired />
            <Input type='tel' label={tp("phone")} value={form.phone} onValueChange={set("phone")} />
            {error && <p className='text-sm text-red'>{error}</p>}
            <Button type='submit' radius='sm' className='bg-orange-main text-white' isLoading={state.isLoading}>
              {t("submitRegister")}
            </Button>
            <p className='text-sm'>
              {t("haveAccount")} <Link href='/login' className='text-orange-main'>{t("submitLogin")}</Link>
            </p>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
