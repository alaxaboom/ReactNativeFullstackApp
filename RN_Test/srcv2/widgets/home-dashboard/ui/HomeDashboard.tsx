import React, { useMemo } from 'react';
import { View } from 'react-native';
import { UserHeader } from './UserHeader';
import { LoansCarousel } from './LoansCarousel';
import { QuickActions } from './QuickActions';
import { ProductsSection } from './ProductsSection';
import { User, LoanApplication } from '../../../shared/types';
import { getLatestCredits } from '../../../shared/utils/loanUtils';

interface HomeDashboardProps {
  user: User | null;
  credits?: LoanApplication[];
  isLoading?: boolean;
  renderLoanCard: (loan: LoanApplication | null, index?: number) => React.ReactNode;
  onApplicationsList: () => void;
  onCallMeBack: () => void;
  onProductSelect: (productKey: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  credits = [],
  isLoading = false,
  renderLoanCard,
  onApplicationsList,
  onCallMeBack,
  onProductSelect,
}) => {
  const latestCredits = useMemo(() => {
    return getLatestCredits(credits, 3);
  }, [credits]);

  return (
    <View>
      <UserHeader user={user} />
      {!isLoading && <LoansCarousel loans={latestCredits} renderLoanCard={renderLoanCard} />}
      <QuickActions onApplicationsList={onApplicationsList} onCallMeBack={onCallMeBack} />
      <ProductsSection onProductSelect={onProductSelect} />
    </View>
  );
};


