"use client";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { store } from "@/store";
import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </Provider>
    </HeroUIProvider>
  );
}
