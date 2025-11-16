import { LoanProductKey } from '../../../shared/types';

export type ProductIcon = 'flash' | 'elderly' | 'card' | 'headset' | 'rocket';

export interface ProductItem {
  key: LoanProductKey;
  icon: ProductIcon;
  title: string;
  imagePath: string;
}

export const PRODUCT_ICONS: Record<LoanProductKey, ProductIcon> = {
  microloan: 'flash',
  pensioner: 'elderly',
  installment: 'card',
  sonic: 'headset',
  quick: 'rocket',
};

export const PRODUCT_TITLES: Record<LoanProductKey, string> = {
  microloan: 'Non-purpose microloan',
  pensioner: 'Loan for pensioners',
  installment: 'Installment loan',
  sonic: 'Sonic loan',
  quick: 'Quick loan',
};

