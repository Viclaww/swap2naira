// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "../types";

// Define a service using a base URL and expected endpoints
export const generalApi = createApi({
  reducerPath: "Api",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.swap2naira.com/api/v1" }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),
    resendForgotPasswordOTP: build.mutation({
      query: (email: string) => ({
        url: "/auth/resend-forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    verifyEmail: build.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPass: build.mutation({
      query: (body) => ({
        url: "/auth/verify-forgot-password",
        method: "POST",
        body,
      }),
    }),
    changePassword: build.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
    resendVerifyEmail: build.query({
      query: (email: string) => ({
        url: `auth/resend${email}`,
      }),
    }),
    logoutUser: build.query({
      query: (token: string) => ({
        url: "/auth/logout",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUser: build.query({
      query: (token: string) => ({
        url: "/auth/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    withdraw: build.mutation({
      query: ({ token, body }) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getNotifications: build.query({
      query: ({ token, page }: { token: string; page?: number }) => ({
        url: `/notification?page=${page ? page : 1}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useWithdrawMutation,
  useLoginMutation,
  useGetUserQuery,
  useVerifyEmailMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyForgotPassMutation,
  useGetNotificationsQuery,
  useResendForgotPasswordOTPMutation,
  useLazyLogoutUserQuery,
  useChangePasswordMutation,
  useLazyResendVerifyEmailQuery,
} = generalApi;
