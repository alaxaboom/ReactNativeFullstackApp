export const API_ROUTES = {
  USERS: {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    REFRESH: 'users/refresh',
    ME: 'users/me',
    UPDATE_PHONE: 'users/me/phone',
    UPDATE_EMAIL: 'users/me/email',
    UPDATE_LOCATION: 'users/me/location',
    UPLOAD_AVATAR: 'users/me/avatar',
    PASSWORD_RESET_REQUEST: 'users/password-reset/request',
    PASSWORD_RESET_VERIFY: 'users/password-reset/verify',
    PASSWORD_RESET_RESET: 'users/password-reset/reset',
  },
  APPLICATIONS: {
    CREATE: 'applications',
    MY_APPLICATIONS: 'applications/my/applications',
    MY_CREDITS: 'applications/my/credits',
    APPLICATION_BY_ID: (id: string) => `applications/applications/${id}`,
    CREDIT_BY_ID: (id: string) => `applications/credits/${id}`,
    APPROVE: (id: string) => `applications/applications/${id}/approve`,
    DELETE: (id: string) => `applications/${id}`,
  },
  LOCATIONS: {
    ALL: 'locations',
    SEARCH: 'locations/search',
    BY_ID: (id: number) => `locations/${id}`,
  },
} as const;

