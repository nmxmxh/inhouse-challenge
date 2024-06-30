import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/all" }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
