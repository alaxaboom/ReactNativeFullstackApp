import React from "react";
import { StoreProvider } from "./providers/StoreProvider";
import { SafeAreaProvider } from "./providers/SafeAreaProvider";
import AppNavigator from "./router/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <AppNavigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}


