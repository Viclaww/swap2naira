import { generalApi } from "./generalApi";

export const cardApi = generalApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: (token) => ({
        url: "/request/get-brands",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCategories: build.mutation({
      query: ({ token, data }) => ({
        url: "/request/get-categories",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createRequest: build.mutation({
      query: ({ token, data }) => ({
        url: "/request",
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
  useGetBrandsQuery,
  useGetCategoriesMutation,
  useCreateRequestMutation,
} = cardApi;
