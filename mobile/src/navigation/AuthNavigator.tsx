// mobile/src/navigation/AuthNavigator.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>TODO: replace with real {title} screen</Text>
  </View>
);

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#050608" }
      }}
    >
      <Stack.Screen
        name="Login"
        children={() => <PlaceholderScreen title="Login" />}
      />
      <Stack.Screen
        name="SignUp"
        children={() => <PlaceholderScreen title="Sign Up" />}
      />
      <Stack.Screen
        name="ForgotPassword"
        children={() => <PlaceholderScreen title="Forgot Password" />}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  title: {
    color: "#f97316",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#e5e7eb",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8
  }
});

export default AuthNavigator;
