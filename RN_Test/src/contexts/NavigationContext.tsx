import React, { createContext, useContext, ReactNode } from 'react';
import type { NavigationFunction } from '../types';

type NavigationContextType = {
  navigateTo: NavigationFunction;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children, navigateTo }: { children: ReactNode; navigateTo: NavigationFunction }) => {
  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};