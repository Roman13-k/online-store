"use client";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { LoginContextProvider } from "@/contexts/LoginContext";
import { setupStore } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export function Providers({ children, store }: { children: React.ReactNode; store?: Store }) {
  return (
    <HeroUIProvider>
      <Provider store={store ?? setupStore()}>
        <LoginContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </LoginContextProvider>
      </Provider>
    </HeroUIProvider>
  );
}
