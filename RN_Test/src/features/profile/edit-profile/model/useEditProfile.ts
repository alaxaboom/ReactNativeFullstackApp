import { useState } from 'react';
import { Alert } from 'react-native';
import {
  useUpdatePhoneMutation,
  useUpdateEmailMutation,
  useUpdateLocationMutation,
  useGetMeQuery,
} from '../../../../entities/user';
import { UpdateProfileData } from '../../../../shared/types';

export const useEditProfile = () => {
  const [updatePhone] = useUpdatePhoneMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const { refetch } = useGetMeQuery();

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

  return { updateProfile };
};

