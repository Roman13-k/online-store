import BuyerScreen from "@/components/screens/BuyerScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Личный кабинет покупателя | ПРОКниги",
  description:
    "Управляйте своими заказами, подписками, отзывами и личными данными в личном кабинете покупателя.",
};

export default function page() {
  return <BuyerScreen />;
}
