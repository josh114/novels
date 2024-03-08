import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_endpoint } from "../../config/url";

const baseQuery = fetchBaseQuery({
  baseUrl: api_endpoint,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
