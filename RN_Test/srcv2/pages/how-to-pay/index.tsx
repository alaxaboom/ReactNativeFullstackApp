import React from 'react';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { HowToPayContent } from '../../widgets/how-to-pay';

export const HowToPayPage: React.FC = () => {
  return (
    <>
      <HowToPayContent />
      <BottomNavigation currentScreen="howtopay" />
    </>
  );
};


