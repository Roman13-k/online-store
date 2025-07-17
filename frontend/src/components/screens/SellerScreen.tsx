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
import { navBarDataSeller } from "@/utils/profilepage/profile";

export type SelectedVariantSellerType = "Главная" | "Товары" | "Аналитика" | "Отзывы";
export type ProductActionType = "Добавить товары" | "Список товаров" | "Управление товарами";

export default function SellerScreen() {
  const { auth, sellerData } = useAuthContext();

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariantSellerType>("Главная");
  const [productAction, setProductAction] = useState<ProductActionType>("Добавить товары");
  const router = useRouter();

  useEffect(() => {
    if (!auth) router.replace("/");
  }, []);

  const renderComponent = () => {
    switch (selectedVariant) {
      case "Главная":
        return <SellerData />;
      case "Отзывы":
        return <SellerReviews />;
      case "Товары":
        switch (productAction) {
          case "Добавить товары":
            return <NewProduct />;
          case "Список товаров":
            return <ProductsList />;
          case "Управление товарами":
            return <ProductManagement />;
        }
      case "Аналитика":
        return <SellerAnalytics />;
      default:
        return null;
    }
  };

  if (!auth || !sellerData) return <Loading />;

  return (
    <section className='mt-6'>
      <Container className='items-center'>
        <NavBarProfile<SelectedVariantSellerType>
          navBarData={navBarDataSeller}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          setProductAction={setProductAction}
          productAction={productAction}
        />
        {renderComponent()}
      </Container>
    </section>
  );
}
