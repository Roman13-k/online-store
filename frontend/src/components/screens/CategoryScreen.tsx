"use client";
import React, { useState } from "react";
import Container from "../ui/shared/containers/Container";
import CatalogPath from "../ui/blocks/catalogpage/CatalogPath";
import CatalogResently from "../ui/blocks/catalogpage/CatalogResently";
import Filters from "../ui/blocks/catalogpage/filters/Filters";
import Sorting from "../ui/blocks/catalogpage/sorting/Sorting";
import CatalogData from "../ui/blocks/catalogpage/CatalogData";
import { DirectionType } from "@/types";

export default function CategoryScreen() {
  const [direction, setDirection] = useState<DirectionType>("row");
  return (
    <section className='mt-10'>
      <Container>
        <CatalogPath />
        <div className='flex gap-[60px] items-start'>
          <Filters />
          <div className='flex flex-col gap-8 w-full'>
            <Sorting direction={direction} setDirection={setDirection} />
            <CatalogData direction={direction} />
          </div>
        </div>
        <CatalogResently />
      </Container>
    </section>
  );
}
