import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithChat } from "./base-query";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: baseQueryWithChat,
  baseQuery: "//dummy" as any,
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
