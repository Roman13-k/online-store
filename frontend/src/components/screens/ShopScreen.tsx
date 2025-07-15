"use client";
import React, { useState } from "react";
import Container from "../ui/shared/containers/Container";
import { DirectionType } from "@/types";
import Filters from "../ui/blocks/catalogpage/filters/Filters";
import Sorting from "../ui/blocks/catalogpage/sorting/Sorting";
import CatalogData from "../ui/blocks/catalogpage/CatalogData";
import { BookCards } from "@/utils/catalogPage";
import ShopCard from "../ui/shared/cards/ShopCard";

export default function ShopScreen() {
  const [direction, setDirection] = useState<DirectionType>("row");
  return (
    <section className='mt-10'>
      <Container>
        <ShopCard shop={BookCards.shop} />
        <div className='flex gap-[60px] items-start'>
          <Filters />
          <div className='flex flex-col gap-8 w-full'>
            <Sorting direction={direction} setDirection={setDirection} />
            <CatalogData direction={direction} />
          </div>
        </div>
      </Container>
    </section>
  );
}
