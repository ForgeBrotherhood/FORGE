// mobile/src/App.tsx
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigation";

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#050608" // FORGE dark background
  }
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
