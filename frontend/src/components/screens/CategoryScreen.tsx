import React from "react";
import Container from "../ui/shared/containers/Container";
import CatalogPath from "../ui/blocks/catalogpage/CatalogPath";
import CatalogResently from "../ui/blocks/catalogpage/CatalogResently";
import Filters from "../ui/blocks/catalogpage/Filters";
import Sorting from "../ui/blocks/catalogpage/Sorting";
import CatalogData from "../ui/blocks/catalogpage/CatalogData";

export default function CategoryScreen() {
  return (
    <section className='mt-10'>
      <Container>
        <CatalogPath />
        <div className='flex gap-[60px] '>
          <Filters />
          <div className='flex flex-col gap-8'>
            <Sorting />
            <CatalogData />
          </div>
        </div>
        <CatalogResently />
      </Container>
    </section>
  );
}
