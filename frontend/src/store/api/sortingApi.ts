import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

export const sortingApi = createApi({
  reducerPath: "sorting",
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_URL }),
  endpoints: (build) => ({
    getSortingChoose: build.query({
      query: () => ({
        url: "/sorting-choose?populate=*",
        method: "GET",
      }),
    }),
    getSortingOptions: build.query({
      query: () => ({
        url: "/sorting-options?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSortingChooseQuery, useGetSortingOptionsQuery } = sortingApi;
