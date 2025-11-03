import { userApi } from "./userApi";
import { applicationApi } from "./applicationApi";

export { userApi, applicationApi };

// Re-export user API hooks
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
  useResetPasswordMutation
} = userApi;

// Re-export application API hooks
export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
  useGetApplicationByIdQuery,
  useGetCreditByIdQuery,
  useApproveApplicationMutation,
  useDeleteApplicationOrCreditMutation
} = applicationApi;