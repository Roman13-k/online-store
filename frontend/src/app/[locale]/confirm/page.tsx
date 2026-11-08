"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { Loader } from "@/components/common";
import { useConfirmMutation } from "@/store/api";

function Confirm() {
  const t = useTranslations("auth");
  const token = useSearchParams().get("token") ?? "";
  const [confirm] = useConfirmMutation();
  const [result, setResult] = useState<"ok" | "fail" | null>(null);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    confirm(token).unwrap().then(() => setResult("ok")).catch(() => setResult("fail"));
  }, [confirm, token]);

  return (
    <Card className='mx-auto mt-10 w-full max-w-[460px]'>
      <CardBody className='flex flex-col gap-4 p-6'>
        <h1 className='text-2xl font-semibold'>{t("confirmTitle")}</h1>
        {result === null && <Loader />}
        {result === "ok" && <p className='text-green-700'>{t("confirmOk")}</p>}
        {result === "fail" && <p className='text-red'>{t("confirmFail")}</p>}
        {result === "ok" && <Link href='/login' className='text-orange-main'>{t("submitLogin")}</Link>}
      </CardBody>
    </Card>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Confirm />
    </Suspense>
  );
}
