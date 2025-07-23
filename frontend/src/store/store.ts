import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { categoriesApi } from "./api/categoriesApi";
import { filtersApi } from "./api/filtersApi";
import { introApi } from "./api/introApi";
import { sortingApi } from "./api/sortingApi";

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [filtersApi.reducerPath]: filtersApi.reducer,
  [introApi.reducerPath]: introApi.reducer,
  [sortingApi.reducerPath]: sortingApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        categoriesApi.middleware,
        filtersApi.middleware,
        introApi.middleware,
        sortingApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
