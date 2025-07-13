import { Dispatch, SetStateAction } from "react";

export interface BookPriceProps {
  priceValue: number[];
  setPriceValue: Dispatch<SetStateAction<number[]>>;
}
