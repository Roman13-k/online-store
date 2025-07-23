import SupportScreen from "@/components/screens/SupportScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Служба поддержки | ПРОКниги",
  description:
    "Свяжитесь с нашей службой поддержки по любым вопросам, связанным с заказами и сайтом.",
};

export default function page() {
  return <SupportScreen />;
}
