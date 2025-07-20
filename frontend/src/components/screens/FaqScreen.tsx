"use client";

import React from "react";
import Container from "../ui/shared/containers/Container";
import { useTranslations } from "next-intl";

export default function FaqScreen() {
  const t = useTranslations("main.faqPage");

  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>{t("title")}</h1>
        <p className='text-lg text-gray-700'>{t("intro")}</p>
      </section>

      <section className='space-y-6'>
        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.howOrder.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.howOrder.text")}</p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.payment.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.payment.text")}</p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.track.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.track.text")}</p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.return.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.return.text")}</p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.russia.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.russia.text")}</p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t("questions.ebooks.title")}
          </h2>
          <p className='text-gray-700'>{t("questions.ebooks.text")}</p>
        </div>
      </section>
    </Container>
  );
}
