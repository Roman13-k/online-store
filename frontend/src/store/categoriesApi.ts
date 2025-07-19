import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_URL }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/categories?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
