import React from 'react';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { HowToPayExtensionContent } from '../../widgets/how-to-pay-extension';

export const HowToPayExtensionPage: React.FC = () => {
  return (
    <>
      <HowToPayExtensionContent />
      <BottomNavigation currentScreen="howtopay" />
    </>
  );
};


