import { userApi } from "./userApi";
import { applicationApi } from "./applicationApi";
import { locationApi } from "./locationApi";

export { userApi, applicationApi, locationApi };

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

export const {
  useGetAllLocationsQuery,
  useSearchLocationsQuery,
  useGetLocationByIdQuery
} = locationApi;