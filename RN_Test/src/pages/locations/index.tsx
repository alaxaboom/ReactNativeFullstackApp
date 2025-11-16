import React from 'react';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { LocationsContent } from '../../widgets/location-map';

export const LocationsPage: React.FC = () => {
  return (
    <>
      <LocationsContent />
      <BottomNavigation currentScreen="locations" />
    </>
  );
};


