import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/profile/` }),
  endpoints: (build) => ({
    buyerProfile: build.query({
      query: () => ({
        url: "buyer",
        method: "GET",
        credentials: "include",
      }),
    }),
    sellerProfile: build.query({
      query: () => ({
        url: "seller",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useBuyerProfileQuery, useSellerProfileQuery } = userApi;
