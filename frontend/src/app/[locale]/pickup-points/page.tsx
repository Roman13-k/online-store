import PickupPointsScreen from "@/components/screens/PickupPointsScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Пункты самовывоза | ПРОКниги",
  description: "Узнайте, где можно забрать заказанные книги в удобном для вас пункте самовывоза.",
};

export default function PickupPoints() {
  return <PickupPointsScreen />;
}
