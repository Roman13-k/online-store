import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface LoginContextInterface {
  loginModal: boolean;
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext({} as LoginContextInterface);

export const useLoginContext = () => useContext(LoginContext);

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginModal, setLoginModal] = useState(false);

  return (
    <LoginContext.Provider value={{ loginModal, setLoginModal }}>{children}</LoginContext.Provider>
  );
};
