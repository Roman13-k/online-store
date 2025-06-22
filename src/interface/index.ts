import { SetStateAction } from "react";

export interface IAuthContext {
  isAuth: string;
  setIsAuth: React.Dispatch<SetStateAction<string>>;
}
