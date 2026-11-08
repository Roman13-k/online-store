"use client";
import { FormEvent, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Input, Select, SelectItem, addToast } from "@heroui/react";
import { Loader, Page } from "@/components/common";
import { usePathname, useRouter } from "@/i18n/navigation";
import { formatDate } from "@/lib/currency";
import { errorMessage, useMeQuery, useUpdateProfileMutation } from "@/store/api";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useMeQuery();
  const [save, saving] = useUpdateProfileMutation();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", lang: "ru" });
  const user = data?.user;

  useEffect(() => {
    if (user) setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? "", lang: user.lang });
  }, [user]);
  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);
  if (!user) return <Loader />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await save(form as never).unwrap();
      addToast({ title: tc("saved"), color: "success" });
      if (form.lang !== locale) router.replace(pathname, { locale: form.lang });
    } catch (err) {
      addToast({ title: errorMessage(err), color: "danger" });
    }
  };
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Page title={t("title")}>
      <form onSubmit={submit} className='flex max-w-[480px] flex-col gap-4'>
        <Input label={t("email")} value={user.email} isReadOnly />
        <Input label={t("lastName")} value={form.lastName} onValueChange={set("lastName")} isRequired />
        <Input label={t("firstName")} value={form.firstName} onValueChange={set("firstName")} isRequired />
        <Input label={t("phone")} value={form.phone} onValueChange={set("phone")} type='tel' />
        <Select label={t("language")} selectedKeys={[form.lang]} onChange={(e) => e.target.value && set("lang")(e.target.value)}>
          <SelectItem key='ru'>Русский</SelectItem>
          <SelectItem key='be'>Беларуская</SelectItem>
          <SelectItem key='en'>English</SelectItem>
        </Select>
        {user.registeredAt && <p className='text-sm text-grey-price'>{t("registered")}: {formatDate(user.registeredAt, locale)}</p>}
        <Button type='submit' radius='sm' className='w-fit bg-orange-main text-white' isLoading={saving.isLoading}>
          {tc("save")}
        </Button>
      </form>
    </Page>
  );
}
