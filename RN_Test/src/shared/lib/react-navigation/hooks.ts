import { useContext } from 'react';
import { NavigationContext } from '../../../app/providers/NavigationProvider';
import type { NavigationFunction } from '../../types/navigation';

export const useNavigation = (): { navigateTo: NavigationFunction } => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export { NavigationContext };

