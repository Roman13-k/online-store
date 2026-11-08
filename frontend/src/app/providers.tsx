"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { useState } from "react";
import { setupStore } from "@/store/store";
import { CurrencyProvider } from "@/lib/currency";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(setupStore);
  return (
    <HeroUIProvider>
      <ToastProvider placement='top-center' />
      <Provider store={store}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </Provider>
    </HeroUIProvider>
  );
}
