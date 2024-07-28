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
  }),
});

export const { useSetWithdrawalPinMutation } = settingsApi;
