import SellerScreen from "@/components/screens/SellerScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Панель продавца | ПРОКниги",
  description:
    "Добавляйте и редактируйте товары, отслеживайте продажи и управляйте акциями в личном кабинете продавца.",
};

export default function page() {
  return <SellerScreen />;
}
