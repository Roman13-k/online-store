import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { categoriesApi } from "./categoriesApi";

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware, categoriesApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
