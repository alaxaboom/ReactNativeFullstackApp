export type StorageKey = 'users' | 'loanApplications' | 'loanDetails';

export interface StorageSchema {
  users: User[];
  loanApplications: LoanApplication[];
  loanDetails: LoanDetails[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  jmbg: string;
  email?: string | null;
  avatarPath?: string | null;
  location?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetails extends User {
  avatar?: string;
  residentialAddress?: string;
}

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

export interface LoanApplication {
  id: number;
  userId: number;
  productType: string;
  loanAmount: number;
  periodMonths: number;
  interestRate: number;
  fee: number;
  totalToReturn: number;
  monthlyRepayment: number;
  firstInstallmentDueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'canceled' | 'paid_off' | 'closed' | 'in_arrears';
  createdAt: string;
  updatedAt: string;
}

export interface LoanDetails {
  id: string;
  applicationId: string;
  userId: string;
  creationDate: string;
  loanAmount: number;
  status: 'active' | 'paid' | 'overdue';
  remainingAmount: number;
  nextPaymentDate?: string;
}

export type LoanStep =
  | 'productcategories'
  | 'calculator'
  | 'registration'
  | 'documents'
  | 'confirmation';

export type LoanProductKey =
  | 'microloan'
  | 'pensioner'
  | 'installment'
  | 'sonic'
  | 'quick';

export interface TempRegistrationData {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LoanFormData {
  selectedProduct: LoanProductKey;
  loanAmount: number;
  loanPeriod: number;
  userData: {
    firstName: string;
    lastName: string;
    phone: string;
    jmbg: string;
  };
  currentStep: LoanStep;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type UpdateProfileData = Partial<
  Pick<UserDetails, 'email' | 'phone' | 'avatar' | 'residentialAddress'>
>;

export interface AuthResponse {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  phoneOrEmail: string;
  password: string;
}

export interface RegisterData extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface CreateApplicationDto {
  productType: string;
  loanAmount: number;
  periodMonths: number;
  interestRate: number;
  fee: number;
  totalToReturn: number;
  monthlyRepayment: number;
  firstInstallmentDueDate: string; 
}