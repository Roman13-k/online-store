"use client";

import React, { useEffect, useState } from "react";
import Container from "../ui/shared/containers/Container";
import NavBarProfile from "../ui/blocks/buyerpage/NavBarProfile";
import PersonalData from "../ui/blocks/buyerpage/PersonalData";
import PersonalBasket from "../ui/blocks/buyerpage/PersonalBasket";
import PersonalOrders from "../ui/blocks/buyerpage/PersonalOrders";
import Subscriptions from "../ui/blocks/buyerpage/Subscriptions";
import PersonalReviews from "../ui/blocks/buyerpage/PersonalReviews";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { Loading } from "../ui/shared/loading/Loading";
import { useTranslations } from "next-intl";

export default function BuyerScreen() {
  const { auth, buyerData } = useAuthContext();
  const t = useTranslations("main.buyerScreen");
  const router = useRouter();
  const searchParams = useSearchParams();
  const navBarDataBuyer: string[] = [
    t("navBar1"),
    t("navBar2"),
    t("navBar3"),
    t("navBar4"),
    t("navBar5"),
  ];

  const [selectedVariant, setSelectedVariant] = useState<string>(navBarDataBuyer[0]);

  useEffect(() => {
    const variant = searchParams.get("variant");
    if (variant) {
      switch (variant) {
        case "sub":
          setSelectedVariant(navBarDataBuyer[3]);
          break;
        case "orders":
          setSelectedVariant(navBarDataBuyer[1]);
          break;
        case "basket":
          setSelectedVariant(navBarDataBuyer[2]);
          break;
        default:
          setSelectedVariant(navBarDataBuyer[0]);
      }
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("variant");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, router, navBarDataBuyer]);

  useEffect(() => {
    if (!auth) router.replace("/");
  }, [auth, router]);

  const renderComponent = () => {
    switch (selectedVariant) {
      case navBarDataBuyer[0]:
        return <PersonalData buyerData={buyerData} />;
      case navBarDataBuyer[1]:
        return <PersonalOrders />;
      case navBarDataBuyer[2]:
        return <PersonalBasket />;
      case navBarDataBuyer[3]:
        return <Subscriptions />;
      case navBarDataBuyer[4]:
        return <PersonalReviews />;
      default:
        return null;
    }
  };

  if (!auth || !buyerData) return <Loading />;

  return (
    <section className='mt-6'>
      <Container className='items-center'>
        <NavBarProfile
          navBarData={navBarDataBuyer}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        {renderComponent()}
      </Container>
    </section>
  );
}
