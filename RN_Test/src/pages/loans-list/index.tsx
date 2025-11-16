import React from 'react';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { LoansListPageContent } from '../../widgets/loans-list-page';

interface LoansListPageProps {
  initialTab?: 'applications' | 'loans';
}

export const LoansListPage: React.FC<LoansListPageProps> = ({ initialTab = 'loans' }) => {
  return (
    <>
      <LoansListPageContent initialTab={initialTab} />
      <BottomNavigation currentScreen="products" />
    </>
  );
};

