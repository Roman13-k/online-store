import { createContext } from "react";
import { IAuthContext } from "src/types/type";

export const Context = createContext<IAuthContext | null>(null);
