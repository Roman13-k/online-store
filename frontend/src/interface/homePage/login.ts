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

export interface RegisterBuyerData {
  email: string;
  password: string;
}

export interface RegisterSellerData {
  email: string;
  password: string;
  type_organization: string;
  country: string;
  itn: number;
  name: string;
  last_name: string;
  patronymic: string;
  company_name: string;
}

export interface LoginData {
  email: string;
  password: string;
  user_type: BuyerOrSeller;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}
