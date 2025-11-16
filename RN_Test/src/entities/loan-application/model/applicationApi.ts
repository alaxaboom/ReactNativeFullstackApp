import { createApi } from "@reduxjs/toolkit/query/react";
import httpBaseQuery from "../../../shared/api/baseQuery";
import { CreateApplicationDto, LoanApplication } from "../../../shared/types";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: httpBaseQuery,
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    createApplication: builder.mutation<LoanApplication, CreateApplicationDto>({
      query: (data) => ({
        url: "applications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    getMyApplications: builder.query<LoanApplication[], void>({
      query: () => "applications/my/applications",
      providesTags: ["Application"],
    }),

    getMyCredits: builder.query<LoanApplication[], void>({
      query: () => "applications/my/credits",
      providesTags: ["Application"],
    }),

    getApplicationById: builder.query<LoanApplication, string>({
      query: (id) => `applications/applications/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Application", id }],
    }),

    getCreditById: builder.query<LoanApplication, string>({
      query: (id) => `applications/credits/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Application", id }],
    }),

    approveApplication: builder.mutation<LoanApplication, string>({
      query: (id) => ({
        url: `applications/applications/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplicationOrCredit: builder.mutation<void, string>({
      query: (id) => ({
        url: `applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
  useGetApplicationByIdQuery,
  useGetCreditByIdQuery,
  useApproveApplicationMutation,
  useDeleteApplicationOrCreditMutation
} = applicationApi;

