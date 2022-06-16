import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: `/${addresses.transaction_getAll}`,
        method: "GET",
      }),
    }),
    getById: builder.query({
      query: (transactionId) => ({
        url: `/${addresses.transaction_getById}?transactionId=${transactionId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetByIdQuery, useGetAllQuery } = transactionApiSlice;
