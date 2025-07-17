import { Dispatch, SetStateAction } from "react";

export interface StateInterface<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
}
