// mobile/src/navigation/MainTabsNavigator.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BrotherhoodNavigator from "./BrotherhoodNavigator";
import type { MainTabsParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabsParamList>();

const TabPlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>TODO: replace with real {title} feature</Text>
  </View>
);

const MainTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#050608",
          borderTopColor: "#111827"
        },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#6b7280"
      }}
    >
      <Tab.Screen
        name="Brotherhood"
        component={BrotherhoodNavigator}
        options={{ title: "Brotherhood" }}
      />
      <Tab.Screen
        name="Smith"
        children={() => <TabPlaceholder title="The Smith" />}
        options={{ title: "The Smith" }}
      />
      <Tab.Screen
        name="Journal"
        children={() => <TabPlaceholder title="Journal" />}
        options={{ title: "Journal" }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <TabPlaceholder title="Profile" />}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
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
    fontSize: 22,
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

export default MainTabsNavigator;
