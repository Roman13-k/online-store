"use client";

import React from "react";
import Container from "../ui/shared/containers/Container";
import { useTranslations } from "next-intl";

export default function SupportScreen() {
  const t = useTranslations("main.supportPage");

  return (
    <Container>
      <section className='text-center mt-10'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>{t("title")}</h1>
        <p className='text-lg text-gray-700'>{t("intro")}</p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("contact.title")}</h2>
        <ul className='text-gray-700 space-y-2'>
          <li>{t("contact.email")}</li>
          <li>{t("contact.phone")}</li>
          <li>{t("contact.chat")}</li>
          <li>{t("contact.telegram")}</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("support.title")}</h2>
        <p className='text-gray-700 mb-4' dangerouslySetInnerHTML={{ __html: t("support.p1") }} />
        <p className='text-gray-700'>{t("support.p2")}</p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("delivery.title")}</h2>
        <p className='text-gray-700 mb-2'>{t("delivery.p1")}</p>
        <p className='text-gray-700 mb-2'>{t("delivery.p2")}</p>
        <p className='text-gray-700'>{t("delivery.p3")}</p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("help.title")}</h2>
        <p className='text-gray-700' dangerouslySetInnerHTML={{ __html: t("help.p") }} />
      </section>
    </Container>
  );
}
