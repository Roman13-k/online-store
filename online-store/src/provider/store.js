import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../API/booksApi";
import { userApi } from "../API/userApi";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware),
});
