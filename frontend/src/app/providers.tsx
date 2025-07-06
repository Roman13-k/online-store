"use client";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {/* <Provider store={store}> */}
      <AuthContextProvider>{children}</AuthContextProvider>

      {/* </Provider> */}
    </HeroUIProvider>
  );
}
