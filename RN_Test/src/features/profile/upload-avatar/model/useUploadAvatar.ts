import { useUploadAvatarMutation, useGetMeQuery } from '../../../../entities/user';

export const useUploadAvatar = () => {
  const [uploadAvatar] = useUploadAvatarMutation();
  const { refetch } = useGetMeQuery();

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

  return { uploadUserAvatar };
};

