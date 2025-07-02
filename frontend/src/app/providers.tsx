"use client";

import { AuthContextProvider } from "@/contexts/Context";
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
