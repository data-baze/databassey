import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithChat } from "./base-query";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: baseQueryWithChat,
  baseQuery: fakeBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});

// export enum methods {
//   GET = "GET",
//   POST = "POST",
//   PATCH = "PATCH",
//   PUT = "PUT",
//   DELETE = "DELETE",
// }
