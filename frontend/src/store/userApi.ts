import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/profile/`, credentials: "include" }),
  endpoints: (build) => ({
    buyerProfile: build.query({
      query: () => ({
        url: "buyer",
        method: "GET",
      }),
    }),
    sellerProfile: build.query({
      query: () => ({
        url: "seller",
        method: "GET",
      }),
    }),
  }),
});

export const { useBuyerProfileQuery, useSellerProfileQuery } = userApi;
