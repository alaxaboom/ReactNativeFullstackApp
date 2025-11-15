import React, { createContext, useContext, ReactNode } from 'react';
import { NavigationFunction } from '../../shared/types/navigation';

type NavigationContextType = {
  navigateTo: NavigationFunction;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
  navigateTo: NavigationFunction;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, navigateTo }) => {
  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext };


