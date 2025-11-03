import { createApi } from "@reduxjs/toolkit/query/react";
import httpBaseQuery from "../httpBaseQuery";
import { User } from "../../types/index";

const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

const normalizePhoneIfNotEmail = (input: string): string => {
  if (input.includes('@')) {
    return input.trim().toLowerCase();
  }
  return input.replace(/\D/g, '');
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: httpBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ user: User; accessToken: string; refreshToken: string }, Omit<User, "id" | "createdAt">>({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        body: {
          ...userData,
          phone: normalizePhone(userData.phone),
        },
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<{ user: User; accessToken: string; refreshToken: string }, { phoneOrEmail: string; password: string }>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: {
          phoneOrEmail: normalizePhoneIfNotEmail(credentials.phoneOrEmail),
          password: credentials.password,
        },
      }),
      invalidatesTags: ["User"],
    }),

    refreshToken: builder.mutation<{ accessToken: string; refreshToken: string }, { refreshToken: string }>({
      query: (body) => ({
        url: "users/refresh",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query<User, void>({
      query: () => "users/me",
      providesTags: ["User"],
    }),

    updatePhone: builder.mutation<User, { phone: string }>({
      query: (data) => ({
        url: "users/me/phone",
        method: "PATCH",
        body: { phone: normalizePhone(data.phone) },
      }),
      invalidatesTags: ["User"],
    }),

    updateEmail: builder.mutation<User, { email: string | null }>({
      query: (data) => ({
        url: "users/me/email",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateLocation: builder.mutation<User, { location: string | null }>({
      query: (data) => ({
        url: "users/me/location",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    uploadAvatar: builder.mutation<{ avatarPath: string }, FormData>({
      query: (formData) => ({
        url: "users/me/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    requestPasswordReset: builder.mutation<{ message: string }, { jmbg: string; phone?: string; email?: string }>({
      query: (data) => ({
        url: "users/password-reset/request",
        method: "POST",
        body: data,
      }),
    }),

    verifyPasswordResetCode: builder.mutation<{ userId: number }, { jmbg: string; phone?: string; email?: string; code: string }>({
      query: (data) => ({
        url: "users/password-reset/verify",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, { userId: number; newPassword: string }>({
      query: (data) => ({
        url: "users/password-reset/reset",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useUpdatePhoneMutation,
  useUpdateEmailMutation,
  useUpdateLocationMutation,
  useUploadAvatarMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetCodeMutation,
  useResetPasswordMutation,
} = userApi;