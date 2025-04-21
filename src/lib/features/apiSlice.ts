import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "./authSlice";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "/user/refresh-token",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "/user/user-info",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err:any) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice;
