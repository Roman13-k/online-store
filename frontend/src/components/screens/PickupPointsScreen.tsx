"use client";

import React from "react";
import Container from "../ui/shared/containers/Container";
import { useTranslations } from "next-intl";

export default function PickupPointsScreen() {
  const t = useTranslations("main.pickupPointsPage");

  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>{t("title")}</h1>
        <p className='text-gray-700 text-lg'>{t("intro")}</p>
      </section>

      <section className='space-y-6'>
        <h2 className='text-3xl font-bold'>{t("howTo.title")}</h2>
        <ol className='list-decimal list-inside text-gray-700 space-y-2'>
          <li>{t("howTo.steps.1")}</li>
          <li>{t("howTo.steps.2")}</li>
          <li>{t("howTo.steps.3")}</li>
        </ol>
      </section>

      <section className='space-y-6'>
        <h2 className='text-3xl font-bold'>{t("examples.title")}</h2>
        <ul className='text-gray-700 space-y-4'>
          {["moscow", "spb", "nsk"].map((key) => (
            <li key={key}>
              <strong>{t(`examples.locations.${key}.city`)}:</strong>{" "}
              {t(`examples.locations.${key}.address`)} — {t(`examples.locations.${key}.hours`)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("faq.title")}</h2>
        <div className='space-y-4 text-gray-700'>
          <div>
            <h3 className='font-semibold'>{t("faq.storage.title")}</h3>
            <p>{t("faq.storage.text")}</p>
          </div>
          <div>
            <h3 className='font-semibold'>{t("faq.passport.title")}</h3>
            <p>{t("faq.passport.text")}</p>
          </div>
          <div>
            <h3 className='font-semibold'>{t("faq.payment.title")}</h3>
            <p>{t("faq.payment.text")}</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
