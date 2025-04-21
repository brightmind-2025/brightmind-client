import { apiSlice } from "./apiSlice";
import { userLogin, userLogout, userRegister } from "./authSlice";

type RegistrationResponse = {
  message?: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegister({ token: result.data.activationToken }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/user/activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/user/login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "/user/social-login",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "/user/logout-user",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // await queryFulfilled;
          dispatch(userLogout());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
