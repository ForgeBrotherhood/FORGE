// mobile/src/navigation/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

type RootStackParamList = {
  Root: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaceholderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FORGE</Text>
      <Text style={styles.subtitle}>
        Navigation shell is wired. Next we’ll add auth and tabs.
      </Text>
    </View>
  );
};

export const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  title: {
    color: "#f97316",
    fontSize: 28,
    fontWeight: "700"
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center"
  }
});

export default RootNavigation;
