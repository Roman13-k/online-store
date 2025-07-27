import React from "react";
import Link from "next/link";
import { getYear } from "@/utils/getYear/getYear";
import Image from "next/image";
import Container from "../../shared/containers/Container";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className='shadow-normal mt-[100px] bg-grey-e9'>
      <Container className='pt-10'>
        <ul className='flex gap-[111px]'>
          <li className='flex flex-col gap-3'>
            <h4>{t("buyersAndSellers")}</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='#'>{t("becomeSeller")}</Link>
              </li>
              <li>
                <Link href='#'>{t("openPickupPoint")}</Link>
              </li>
              <li>
                <Link href='/FAQ'>{t("faq")}</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>{t("aboutMarketplace")}</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='/about'>{t("aboutProBooks")}</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>{t("information")}</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='/certificates'>{t("giftCards")}</Link>
              </li>
              <li>
                <Link href='#'>{t("pickupPointsAddresses")}</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>{t("stayInTouchEmail")}</h4>
            {/* email */}
          </li>
        </ul>
        <span className='border-2 border-grey-d9 w-full block mt-6 mb-6'></span>
        <div className='flex flex-col gap-3 mb-10'>
          <h4>{t("paymentMethods")}</h4>
          <div className='flex gap-3'>
            <Image width={105} height={35} src='/img/cards/mir.png' alt='mir' />
            <Image width={105} height={35} src='/img/cards/visa.png' alt='visa' />
            <Image width={105} height={35} src='/img/cards/mastercard.png' alt='mastercard' />
          </div>
        </div>
        <div className='flex gap-[44px] opacity-60 mb-3'>
          <p>© PROBooks, {getYear()}</p>
          <p>{t("publicOffer")}</p>
        </div>
      </Container>
    </footer>
  );
}
