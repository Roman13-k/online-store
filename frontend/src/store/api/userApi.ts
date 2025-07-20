import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/profile/`, credentials: "include" }),
  endpoints: (build) => ({
    buyerProfile: build.query({
      query: (token: string) => ({
        url: "buyer",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    sellerProfile: build.query({
      query: (token: string) => ({
        url: "seller",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useBuyerProfileQuery, useSellerProfileQuery } = userApi;
