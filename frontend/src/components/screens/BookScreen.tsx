import React from "react";
import Container from "../ui/shared/containers/Container";
import CatalogPath from "../ui/blocks/catalogpage/CatalogPath";
import { BookCards } from "@/utils/catalogPage";
import MainInfo from "../ui/blocks/bookpage/maininfo/MainInfo";
import SimilarBooks from "../ui/blocks/bookpage/SimilarBooks";
import Collections from "../ui/blocks/bookpage/Collections";
import Description from "../ui/blocks/bookpage/description/Description";

export default function BookScreen() {
  return (
    <Container className='pt-10'>
      <CatalogPath />
      <MainInfo book={BookCards} />
      <Description />
      <SimilarBooks />
      <Collections category_slug={BookCards.category_slug} category={BookCards.category} />
    </Container>
  );
}
