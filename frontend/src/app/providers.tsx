"use client";

import { ContextProvider } from "@/contexts/Context";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {/* <Provider store={store}> */}
      <ContextProvider>{children}</ContextProvider>

      {/* </Provider> */}
    </HeroUIProvider>
  );
}
