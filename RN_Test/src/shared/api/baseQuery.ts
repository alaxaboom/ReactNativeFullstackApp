import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://10.0.2.2:3000/api',
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const httpBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: 'users/refresh',
          method: 'POST',
          body: { refreshToken },
        } as const,
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as RefreshResponse;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      }
    }
  }

  return result;
};

export default httpBaseQuery;

