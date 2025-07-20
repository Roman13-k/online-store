import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

export const filtersApi = createApi({
  reducerPath: "filters",
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_URL }),
  endpoints: (build) => ({
    getFilters: build.query({
      query: () => ({
        url: "/filters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFiltersQuery } = filtersApi;
