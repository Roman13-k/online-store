import { configureStore, Middleware } from "@reduxjs/toolkit";
import type {
  Api,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  EndpointDefinitions,
} from "@reduxjs/toolkit/query";

export function setupApiStore<
  BQ extends BaseQueryFn<
    string | unknown,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,
  ED extends EndpointDefinitions,
  RP extends string,
  TagTypes extends string = never,
>(api: Api<BQ, ED, RP, TagTypes>) {
  const reducer = {
    [api.reducerPath]: api.reducer,
  };

  const store = configureStore({
    reducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware as Middleware),
  });

  return {
    store,
    api,
  };
}
