import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

export const introApi = createApi({
  reducerPath: "intro",
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_URL }),
  endpoints: (build) => ({
    getBanners: build.query({
      query: () => ({
        url: "/banner?populate[slider][populate]=files",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBannersQuery } = introApi;
