export enum ProductType {
  NON_PURPOSE_MICROLOAN = 'non_purpose_microloan',
  CAR_LOAN = 'car_loan',
  HOME_RENOVATION = 'home_renovation',
  EDUCATION_LOAN = 'education_loan',
  MEDICAL_EXPENSES = 'medical_expenses'
}

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELED = 'canceled',
  PAID_OFF = 'paid_off',
  CLOSED = 'closed',
  IN_ARREARS = 'in_arrears'
}

export interface ApplicationAttributes {
  id: number;
  userId: number;
  productType: ProductType;
  loanAmount: number;
  periodMonths: number;
  interestRate: number;
  fee: number;
  totalToReturn: number;
  monthlyRepayment: number;
  firstInstallmentDueDate: Date;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ApplicationCreationAttributes = Omit<ApplicationAttributes, 'id' | 'createdAt' | 'updatedAt'>;