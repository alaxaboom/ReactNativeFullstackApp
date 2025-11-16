import { LoanProductKey } from '../../../shared/types';
import { ProductItem, PRODUCT_ICONS, PRODUCT_TITLES } from './productTypes';

export const PRODUCT_IMAGE_PATHS: Record<LoanProductKey, string> = {
  microloan: require('../../../../assets/products/microloan.png'),
  pensioner: require('../../../../assets/products/pensioner.png'),
  installment: require('../../../../assets/products/installment.png'),
  sonic: require('../../../../assets/products/sonic.png'),
  quick: require('../../../../assets/products/quick.png'),
};

export const getAllProducts = (): ProductItem[] => {
  return (Object.keys(PRODUCT_ICONS) as LoanProductKey[]).map((key) => ({
    key,
    icon: PRODUCT_ICONS[key],
    title: PRODUCT_TITLES[key],
    imagePath: PRODUCT_IMAGE_PATHS[key],
  }));
};

export const getProductByKey = (key: LoanProductKey): ProductItem => {
  return {
    key,
    icon: PRODUCT_ICONS[key],
    title: PRODUCT_TITLES[key],
    imagePath: PRODUCT_IMAGE_PATHS[key],
  };
};

