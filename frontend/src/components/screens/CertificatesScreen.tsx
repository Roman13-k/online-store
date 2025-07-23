"use client";

import React from "react";
import Container from "../ui/shared/containers/Container";
import { useTranslations } from "next-intl";

export default function CertificatesScreen() {
  const t = useTranslations("main.certificatesPage");

  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>{t("title")}</h1>
        <p className='text-lg text-gray-700'>{t("intro")}</p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("denominations.title")}</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>{t("denominations.item1")}</li>
          <li>{t("denominations.item2")}</li>
          <li>{t("denominations.item3")}</li>
          <li>{t("denominations.item4")}</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("howWorks.title")}</h2>
        <ol className='list-decimal list-inside text-gray-700 space-y-2'>
          <li>{t("howWorks.step1")}</li>
          <li>{t("howWorks.step2")}</li>
          <li>{t("howWorks.step3")}</li>
        </ol>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("conditions.title")}</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>{t("conditions.item1")}</li>
          <li>{t("conditions.item2")}</li>
          <li>{t("conditions.item3")}</li>
          <li>{t("conditions.item4")}</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("giftFriend.title")}</h2>
        <p className='text-gray-700'>{t("giftFriend.description")}</p>
      </section>
    </Container>
  );
}
