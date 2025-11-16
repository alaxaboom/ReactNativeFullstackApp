import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../../../shared/api/store';
import { setCredentials, updateTokens, logout } from '../../../entities/user';

export const initAuth = async (dispatch: AppDispatch, refreshToken: (params: { refreshToken: string }) => Promise<{ data: { accessToken: string; refreshToken: string } }>) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
    
    if (accessToken && refreshTokenValue) {
      dispatch(setCredentials({ 
        accessToken, 
        refreshToken: refreshTokenValue, 
        user: null 
      }));
      
      try {
        const result = await refreshToken({ refreshToken: refreshTokenValue });
        if (result.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          dispatch(updateTokens({ 
            accessToken: newAccessToken, 
            refreshToken: newRefreshToken
          }));
        }
      } catch (refreshError) {
        console.log("Token refresh failed, logging out");
        dispatch(logout());
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      }
    }
    
    const passcode = await AsyncStorage.getItem("app_passcode");
    return { passcodeExists: !!passcode };
  } catch (error) {
    console.error("Auth initialization error:", error);
    return { passcodeExists: false };
  }
};

