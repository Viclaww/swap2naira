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
  }),
});

export const { useSetWithdrawalPinMutation, useChangeWithdrawalPinMutation } =
  settingsApi;
