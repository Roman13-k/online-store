import CertificatesScreen from "@/components/screens/CertificatesScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Подарочные сертификаты | ПРОКниги",
  description:
    "Выбирайте и дарите электронные подарочные сертификаты на книги – отличный подарок для читателей.",
};

export default function Certificates() {
  return <CertificatesScreen />;
}
