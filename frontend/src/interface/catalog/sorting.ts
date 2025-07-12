import { DirectionType } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface DirectionProps {
  direction: DirectionType;
  setDirection: Dispatch<SetStateAction<DirectionType>>;
}

export interface SortingOptionsIntrface {
  title: string;
  options: { label: string; value: string }[];
}
