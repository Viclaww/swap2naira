import { generalApi } from "./generalApi";

export const settingsApi = generalApi.injectEndpoints({
  endpoints: (build) => ({
    setWithdrawalPin: build.mutation({
      query: ({ token, pin }) => ({
        url: "/profile/set-pin",
        method: "POST",
        body: { pin },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    ChangeWithdrawalPin: build.mutation({
      query: ({ token, old_pin, new_pin }) => ({
        url: "/profile/change-pin",
        method: "POST",
        body: { old_pin, new_pin },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    profileChangePassword: build.mutation({
      query: ({ token, old_password, new_password }) => ({
        url: "/profile/change-password",
        method: "POST",
        body: { old_password, new_password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resolveAccount: build.mutation({
      query: ({ token, accountNumber, bankCode }) => ({
        url: "/profile/resolve-account",
        method: "POST",
        body: { account_number: accountNumber, bank_code: bankCode },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    profileUpdate: build.mutation({
      query: ({ token, data }) => ({
        url: "/profile/update",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addAccount: build.mutation({
      query: ({ token, body }) => ({
        url: "/profile/add-account",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    retrieveBanks: build.query({
      query: (token) => ({
        url: "/profile/banks",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useSetWithdrawalPinMutation,
  useChangeWithdrawalPinMutation,
  useProfileChangePasswordMutation,
  useProfileUpdateMutation,
  useRetrieveBanksQuery,
  useAddAccountMutation,
  useResolveAccountMutation,
} = settingsApi;
