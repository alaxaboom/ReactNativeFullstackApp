import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../../../shared/api/store';
import { updateTokens, logout } from '../../../entities/user';

export const refreshTokenFlow = async (
  dispatch: AppDispatch,
  refreshToken: (params: { refreshToken: string }) => Promise<{ data: { accessToken: string; refreshToken: string } }>
) => {
  try {
    const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
    if (refreshTokenValue) {
      const result = await refreshToken({ refreshToken: refreshTokenValue });
      if (result.data) {
        const { accessToken, refreshToken: newRefreshToken } = result.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        dispatch(updateTokens({ 
          accessToken, 
          refreshToken: newRefreshToken
        }));
        return { success: true };
      }
    }
    return { success: false };
  } catch (error) {
    console.log("Token refresh failed, logging out");
    dispatch(logout());
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    return { success: false };
  }
};


