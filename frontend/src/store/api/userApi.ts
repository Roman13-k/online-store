import { LoginData, RegisterBuyerData, RegisterSellerData } from "@/interface/homePage/login";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, credentials: "include" }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: LoginData) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    registerBuyer: build.mutation({
      query: (data: RegisterBuyerData) => ({
        url: "buyer/registration/",
        method: "POST",
        body: data,
      }),
    }),
    registerSeller: build.mutation({
      query: (data: RegisterSellerData) => ({
        url: "seller/registration/",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: build.mutation({
      query: (token: string) => ({
        url: "auth/refresh/",
        method: "POST",
        body: token,
      }),
    }),
    buyerProfile: build.query({
      query: (token: string) => ({
        url: "profile/buyer",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    sellerProfile: build.query({
      query: (token: string) => ({
        url: "profile/seller",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useBuyerProfileQuery,
  useSellerProfileQuery,
  useLoginUserMutation,
  useRegisterBuyerMutation,
  useRegisterSellerMutation,
  useRefreshTokenMutation,
} = userApi;
