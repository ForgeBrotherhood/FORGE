// mobile/src/components/layout/KeyboardAvoidingViewWrapper.tsx

import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

export interface KeyboardAvoidingViewWrapperProps
  extends KeyboardAvoidingViewProps {
  /**
   * On iOS, keyboard avoiding is always enabled.
   * On Android, it's opt-in (to avoid layout quirks in some screens).
   */
  enabledOnAndroid?: boolean;
}

/**
 * Wraps content in a KeyboardAvoidingView + tap-to-dismiss behavior.
 *
 * Typical usage:
 *
 * <KeyboardAvoidingViewWrapper>
 *   <Screen scroll>
 *     ...form...
 *   </Screen>
 * </KeyboardAvoidingViewWrapper>
 */
const KeyboardAvoidingViewWrapper: React.FC<
  KeyboardAvoidingViewWrapperProps
> = ({
  children,
  behavior,
  enabledOnAndroid = false,
  keyboardVerticalOffset,
  style,
  ...rest
}) => {
  const enabled =
    Platform.OS === "ios" ? true : enabledOnAndroid;

  // If disabled (e.g. Android forms where you don't want shifting), just render children.
  if (!enabled) {
    return <>{children}</>;
  }

  const resolvedBehavior =
    behavior ?? (Platform.OS === "ios" ? "padding" : undefined);

  const resolvedOffset =
    keyboardVerticalOffset ??
    (Platform.OS === "ios" ? 64 : 0);

  return (
    <KeyboardAvoidingView
      style={[styles.root, style]}
      behavior={resolvedBehavior}
      keyboardVerticalOffset={resolvedOffset}
      {...rest}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default KeyboardAvoidingViewWrapper;
