import { NavigationFunction } from '../types';
import { useAuth } from '../hooks/useAuth';

export const useSmartNavigation = () => {
  const { isAuthenticated } = useAuth();

  const navigateToHomeOrFirst = (onNavigate: NavigationFunction) => {
    if (isAuthenticated) {
      onNavigate('home');
    } else {
      onNavigate('firstpage');
    }
  };

  return { navigateToHomeOrFirst };
};