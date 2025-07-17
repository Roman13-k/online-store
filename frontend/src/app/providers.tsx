"use client";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { LoginContextProvider } from "@/contexts/LoginContext";
import { setupStore } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Provider store={setupStore()}>
        <LoginContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </LoginContextProvider>
      </Provider>
    </HeroUIProvider>
  );
}
