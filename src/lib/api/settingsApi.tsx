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
  }),
});

export const {
  useSetWithdrawalPinMutation,
  useChangeWithdrawalPinMutation,
  useProfileChangePasswordMutation,
  useProfileUpdateMutation,
} = settingsApi;
