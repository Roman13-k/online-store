"use client";
import React, { useState } from "react";
import Container from "../ui/shared/containers/Container";
import NavBarProfile from "../ui/blocks/buyerpage/NavBarProfile";
import PersonalData from "../ui/blocks/buyerpage/PersonalData";
import PersonalBasket from "../ui/blocks/buyerpage/PersonalBasket";
import PersonalOrders from "../ui/blocks/buyerpage/PersonalOrders";
import Subscriptions from "../ui/blocks/buyerpage/Subscriptions";
import PersonalReviews from "../ui/blocks/buyerpage/PersonalReviews";

export type SelectedVariantType = "Личные данные" | "Заказы" | "Отзывы" | "Подписки" | "Корзина";

export default function BuyerScreen() {
  const navBarData: SelectedVariantType[] = [
    "Личные данные",
    "Заказы",
    "Корзина",
    "Подписки",
    "Отзывы",
  ];

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariantType>("Личные данные");

  const renderComponent = () => {
    switch (selectedVariant) {
      case "Личные данные":
        return <PersonalData />;
      case "Отзывы":
        return <PersonalReviews />;
      case "Корзина":
        return <PersonalBasket />;
      case "Заказы":
        return <PersonalOrders />;
      case "Подписки":
        return <Subscriptions />;
      default:
        return null;
    }
  };

  return (
    <section className='mt-6'>
      <Container className='items-center'>
        <NavBarProfile
          navBarData={navBarData}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        {renderComponent()}
      </Container>
    </section>
  );
}
