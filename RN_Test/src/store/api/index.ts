import { userApi } from "./userApi";
import { applicationApi } from "./applicationApi";

export { userApi, applicationApi };

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

export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
  useGetApplicationByIdQuery,
  useGetCreditByIdQuery,
  useApproveApplicationMutation,
  useDeleteApplicationOrCreditMutation
} = applicationApi;