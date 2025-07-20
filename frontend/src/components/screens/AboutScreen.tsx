"use client";

import React from "react";
import Container from "../ui/shared/containers/Container";
import { useTranslations } from "next-intl";

export default function AboutScreen() {
  const t = useTranslations("main.aboutPage");

  return (
    <Container>
      <section className='text-center mt-10'>
        <h1 className='text-5xl font-extrabold text-orange-main mb-4'>{t("title")}</h1>
        <p className='text-lg text-gray-700'>
          {t.rich("intro", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("history.title")}</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          {t.rich("history.1", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className='text-gray-700 leading-relaxed'>
          {t.rich("history.2", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("mission.title")}</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          {[1, 2, 3].map((i) => (
            <li key={i}>
              {t.rich(`mission.${i}`, {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("whyUs.title")}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <h3 className='font-semibold'>{t(`whyUs.${i}.title`)}</h3>
              <p className='text-gray-700'>
                {t.rich(`whyUs.${i}.desc`, {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("team.title")}</h2>
        <p className='text-gray-700 mb-4'>
          {t.rich("team.intro", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              {t.rich(`team.${i}`, {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>{t("approach.title")}</h2>
        <p className='text-gray-700 leading-relaxed'>
          {t.rich("approach.intro", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <ol className='list-decimal list-inside text-gray-700 space-y-2 mt-4'>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              {t.rich(`approach.${i}`, {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
