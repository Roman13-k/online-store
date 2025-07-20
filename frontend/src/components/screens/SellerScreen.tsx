"use client";

import React, { useEffect, useState } from "react";
import Container from "../ui/shared/containers/Container";
import NavBarProfile from "../ui/blocks/buyerpage/NavBarProfile";
import SellerData from "../ui/blocks/sellerpage/SellerData";
import SellerReviews from "../ui/blocks/sellerpage/SellerReviews";
import SellerAnalytics from "../ui/blocks/sellerpage/SellerAnalytics";
import NewProduct from "../ui/blocks/sellerpage/products/NewProduct";
import ProductsList from "../ui/blocks/sellerpage/products/ProductsList";
import ProductManagement from "../ui/blocks/sellerpage/products/ProductManagement";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { Loading } from "../ui/shared/loading/Loading";
import { useTranslations } from "next-intl";

export default function SellerScreen() {
  const { auth, sellerData } = useAuthContext();
  const router = useRouter();
  const t = useTranslations("main.sellerScreen");

  const navBarDataSeller: string[] = [t("navBar.0"), t("navBar.1"), t("navBar.2"), t("navBar.3")];

  const productActionData: string[] = [
    t("productActions.0"),
    t("productActions.1"),
    t("productActions.2"),
  ];

  const [selectedVariant, setSelectedVariant] = useState<string>(navBarDataSeller[0]);
  const [productAction, setProductAction] = useState<string>(productActionData[0]);

  useEffect(() => {
    if (!auth) router.replace("/");
  }, [auth, router]);

  const renderComponent = () => {
    switch (selectedVariant) {
      case navBarDataSeller[0]:
        return <SellerData />;
      case navBarDataSeller[3]:
        return <SellerReviews />;
      case navBarDataSeller[1]:
        switch (productAction) {
          case productActionData[0]:
            return <NewProduct />;
          case productActionData[1]:
            return <ProductsList />;
          case productActionData[2]:
            return <ProductManagement />;
          default:
            return null;
        }
      case navBarDataSeller[2]:
        return <SellerAnalytics />;
      default:
        return null;
    }
  };

  if (!auth || !sellerData) return <Loading />;

  return (
    <section className='mt-6'>
      <Container className='items-center'>
        <NavBarProfile
          navBarData={navBarDataSeller}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          setProductAction={setProductAction}
          productAction={productAction}
          productActionData={productActionData}
        />
        {renderComponent()}
      </Container>
    </section>
  );
}
