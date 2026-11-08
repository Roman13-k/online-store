import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const setupStore = () =>
  configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
