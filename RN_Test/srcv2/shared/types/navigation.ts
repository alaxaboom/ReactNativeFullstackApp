export type Screen =
  | 'home'
  | 'loan'
  | 'login'
  | 'register'
  | 'otp'
  | 'password'
  | 'biometrics'
  | 'products'
  | 'profile'
  | 'callback'
  | 'firstpage'
  | 'howtopay'
  | 'howtopayextension' 
  | 'locations'
  | 'contacts'
  | 'resetpassword';

export type ScreenParams = {
  home: undefined;
  loan: { finalize?: boolean; product?: string };
  login: undefined;
  register: undefined;
  otp: undefined;
  password: undefined;
  biometrics: undefined;
  products: { tab?: 'applications' | 'loans' };
  profile: undefined;
  callback: undefined;
  firstpage: undefined;
  howtopay: undefined;
  howtopayextension: undefined; 
  locations: undefined;
  contacts: undefined;
  resetpassword: undefined;
};

export type NavigationFunction = <T extends Screen>(
  screen: T,
  params?: ScreenParams[T]
) => void;

export type NavigationState =
  | { screen: 'home'; params: undefined }
  | { screen: 'loan'; params: ScreenParams['loan'] }
  | { screen: 'login'; params: undefined }
  | { screen: 'register'; params: undefined }
  | { screen: 'otp'; params: undefined }
  | { screen: 'password'; params: undefined }
  | { screen: 'biometrics'; params: undefined }
  | { screen: 'products'; params: ScreenParams['products'] }
  | { screen: 'profile'; params: undefined }
  | { screen: 'callback'; params: undefined }
  | { screen: 'firstpage'; params: undefined }
  | { screen: 'howtopay'; params: undefined }
  | { screen: 'howtopayextension'; params: undefined }
  | { screen: 'locations'; params: undefined }
  | { screen: 'contacts'; params: undefined }
  | { screen: 'resetpassword'; params: undefined };

