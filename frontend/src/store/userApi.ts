import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/profile/`, credentials: "include" }),
  endpoints: (build) => ({
    buyerProfile: build.query({
      query: (token) => ({
        url: "buyer",
        method: "GET",
        params: { token: token },
      }),
    }),
    sellerProfile: build.query({
      query: (token) => ({
        url: "seller",
        method: "GET",
        params: { token: token },
      }),
    }),
  }),
});

export const { useBuyerProfileQuery, useSellerProfileQuery } = userApi;
