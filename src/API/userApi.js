import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/profile/" }),
  endpoints: (build) => ({
    userdata: build.query({
      query: ({ token, url }) => ({
        url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useUserdataQuery } = userApi;
