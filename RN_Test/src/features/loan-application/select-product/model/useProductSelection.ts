import { useAppDispatch, useAppSelector } from '../../../../shared/lib/react-redux/hooks';
import { setSelectedProduct } from '../../../../entities/loan-application';
import { LoanProductKey } from '../../../../shared/types';

export const useProductSelection = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.loan.selectedProduct);

  const selectProduct = (productKey: LoanProductKey) => {
    dispatch(setSelectedProduct(productKey));
  };

  return {
    selectedProduct,
    selectProduct,
  };
};




