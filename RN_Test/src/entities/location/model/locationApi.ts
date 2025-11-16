import { createApi } from "@reduxjs/toolkit/query/react";
import httpBaseQuery from "../../../shared/api/baseQuery";
import { Location } from "../../../shared/types";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: httpBaseQuery,
  tagTypes: ["Location"],
  endpoints: (builder) => ({
    getAllLocations: builder.query<Location[], void>({
      query: () => "locations",
      providesTags: ["Location"],
    }),

    searchLocations: builder.query<Location[], string>({
      query: (searchTerm) => ({
        url: "locations/search",
        params: { q: searchTerm },
      }),
      providesTags: ["Location"],
    }),

    getLocationById: builder.query<Location, number>({
      query: (id) => `locations/${id}`,
      providesTags: ["Location"],
    }),
  }),
});

export const {
  useGetAllLocationsQuery,
  useSearchLocationsQuery,
  useGetLocationByIdQuery,
} = locationApi;

