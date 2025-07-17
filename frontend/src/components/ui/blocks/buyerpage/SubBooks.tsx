import React, { useState } from "react";
import SortingCategories from "../catalogpage/sorting/SortingCategories";
import { DirectionType } from "@/types";
import CatalogData from "../catalogpage/CatalogData";

export default function SubBooks() {
  const [direction, setDirection] = useState<DirectionType>("col");
  return (
    <div className='mt-5 flex flex-col w-full gap-8'>
      <SortingCategories direction={direction} setDirection={setDirection} />
      <CatalogData direction={direction} />
    </div>
  );
}
