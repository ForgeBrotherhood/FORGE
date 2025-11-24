// mobile/src/components/ui/TextInput.tsx

import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View
} from "react-native";
import Text from "./Text";

export interface ForgeTextInputProps extends RNTextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
}

const ForgeTextInput: React.FC<ForgeTextInputProps> = ({
  label,
  helperText,
  error,
  style,
  ...rest
}) => {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      {label ? (
        <Text
          variant="label"
          tone="muted"
          weight="medium"
          style={styles.label}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          hasError && styles.inputWrapperError
        ]}
      >
        <RNTextInput
          {...rest}
          placeholderTextColor="#6b7280"
          style={[styles.input, style]}
        />
      </View>

      {hasError ? (
        <Text variant="caption" tone="danger" style={styles.helper}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" tone="muted" style={styles.helper}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14
  },
  label: {
    marginBottom: 6
  },
  inputWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#020617",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  inputWrapperError: {
    borderColor: "#b91c1c"
  },
  input: {
    color: "#f9fafb",
    fontSize: 14,
    padding: 0
  },
  helper: {
    marginTop: 4
  }
});

export default ForgeTextInput;
