import { UpdateProfileData } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import {
  useGetMeQuery,
  useUpdatePhoneMutation,
  useUpdateEmailMutation,
  useUpdateLocationMutation,
  useUploadAvatarMutation,
} from '../../../store/api';

export const useProfileService = () => {
  const { logout: authLogout, refetchUser } = useAuth();

  const {
    data: userDetails,
    isLoading,
    isError,
    refetch,
  } = useGetMeQuery();

  const [updatePhone] = useUpdatePhoneMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [uploadAvatar] = useUploadAvatarMutation();

  const updateProfile = async (data: UpdateProfileData): Promise<{ success: boolean; error?: string }> => {
    try {
      if ('phone' in data && data.phone !== undefined) {
        await updatePhone({ phone: data.phone }).unwrap();
      }
      if ('email' in data && data.email !== undefined) {
        await updateEmail({ email: data.email }).unwrap();
      }
      if ('residentialAddress' in data && data.residentialAddress !== undefined) {
        await updateLocation({ location: data.residentialAddress }).unwrap();
      }
      await refetch();
      return { success: true };
    } catch (err: unknown) {
      const error = err as { data?: { error?: string }; status?: number };
      return {
        success: false,
        error: error.data?.error || 'Failed to update profile',
      };
    }
  };

  const uploadUserAvatar = async (formData: FormData): Promise<{ success: boolean; error?: string; avatarPath?: string }> => {
    try {
      const result = await uploadAvatar(formData).unwrap();
      await refetch();
      return { success: true, avatarPath: result.avatarPath };
    } catch (err: unknown) {
      const error = err as { data?: { error?: string }; status?: number };
      return {
        success: false,
        error: error.data?.error || 'Failed to upload avatar',
      };
    }
  };

  const logout = async () => {
    authLogout();
  };

  return {
    userDetails,
    isLoading,
    isError,
    refetch,
    logout,
    updateProfile,
    uploadUserAvatar,
  };
};