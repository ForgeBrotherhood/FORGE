// mobile/src/components/layout/Screen.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps
} from "react-native";

export interface ScreenProps extends ViewProps {
  /**
   * If true, wraps children in a ScrollView with sensible defaults
   * (keyboardShouldPersistTaps, padding, etc.).
   */
  scroll?: boolean;

  /**
   * Adds standard Forge padding around the content.
   */
  padded?: boolean;
}

/**
 * Root layout wrapper for Forge screens.
 *
 * - Applies a dark Forge background.
 * - Handles safe-area insets.
 * - Optionally wraps content in a ScrollView.
 */
const Screen: React.FC<ScreenProps> = ({
  scroll = false,
  padded = true,
  style,
  children,
  ...rest
}) => {
  if (scroll) {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            padded && styles.padded,
            style
          ]}
          keyboardShouldPersistTaps="handled"
          {...rest}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View
        style={[
          styles.content,
          padded && styles.padded,
          style
        ]}
        {...rest}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050608" // Forge dark background
  },
  scroll: {
    flex: 1
  },
  content: {
    flex: 1
  },
  padded: {
    paddingHorizontal: 24,
    paddingVertical: 16
  }
});

export default Screen;
