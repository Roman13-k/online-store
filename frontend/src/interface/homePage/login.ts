import { AuthChoose, BuyerOrSeller } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  isAuth: string;
  setIsAuth: React.Dispatch<SetStateAction<string>>;
}

export interface AuthInterface {
  setAuthChoose: Dispatch<SetStateAction<AuthChoose | null>>;
  setBuyerOrSeller: Dispatch<SetStateAction<BuyerOrSeller | null>>;
}
