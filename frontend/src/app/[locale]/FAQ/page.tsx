import FaqScreen from "@/components/screens/FaqScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Вопросы и ответы | ПРОКниги",
  description: "Ответы на самые частые вопросы о заказах, доставке и оплате в магазине ПРОКниги.",
};

export default function page() {
  return <FaqScreen />;
}
