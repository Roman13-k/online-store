import React from "react";
import Container from "../ui/shared/containers/Container";
import CatalogPath from "../ui/blocks/catalogpage/CatalogPath";
import { BookCards } from "@/utils/catalogPage";
import MainInfo from "../ui/blocks/bookpage/MainInfo";
import Description from "../ui/blocks/bookpage/Description";
import SimilarBooks from "../ui/blocks/bookpage/SimilarBooks";
import Collections from "../ui/blocks/bookpage/Collections";

export default function BookScreen() {
  return (
    <Container className='pt-10'>
      <CatalogPath />
      <MainInfo />
      <Description />
      <SimilarBooks />
      <Collections category_slug={BookCards.category_slug} category={BookCards.category} />
    </Container>
  );
}
