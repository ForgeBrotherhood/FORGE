// mobile/src/components/ui/Button.tsx

import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import Text from "./Text";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  fullWidth = false,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  children,
  onPress,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const { buttonStyle, textTone } = getVariantStyles(variant);
  const sizeStyle = getSizeStyles(size);

  return (
    <View
      style={[
        fullWidth && styles.fullWidth,
        containerStyle
      ]}
    >
      <TouchableOpacity
        {...rest}
        onPress={isDisabled ? undefined : onPress}
        activeOpacity={0.8}
        disabled={isDisabled}
        style={[
          styles.base,
          buttonStyle,
          sizeStyle,
          isDisabled && styles.disabled,
          style
        ]}
        accessibilityRole="button"
      >
        {loading ? (
          <LoadingSpinner sizeToken="sm" color="#f9fafb" />
        ) : (
          <View style={styles.content}>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
            {label ? (
              <Text
                variant="body"
                weight="semibold"
                tone={textTone}
                align="center"
                numberOfLines={1}
              >
                {label}
              </Text>
            ) : (
              children
            )}
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getVariantStyles = (
  variant: ButtonVariant
): { buttonStyle: ViewStyle; textTone: Parameters<typeof Text>[0]["tone"] } => {
  switch (variant) {
    case "secondary":
      return {
        buttonStyle: {
          backgroundColor: "#111827",
          borderColor: "#4b5563",
          borderWidth: 1
        },
        textTone: "default"
      };
    case "outline":
      return {
        buttonStyle: {
          backgroundColor: "transparent",
          borderColor: "#6b7280",
          borderWidth: 1
        },
        textTone: "default"
      };
    case "ghost":
      return {
        buttonStyle: {
          backgroundColor: "transparent"
        },
        textTone: "muted"
      };
    case "danger":
      return {
        buttonStyle: {
          backgroundColor: "#b91c1c"
        },
        textTone: "inverse"
      };
    case "primary":
    default:
      return {
        buttonStyle: {
          backgroundColor: "#f97316"
        },
        textTone: "inverse"
      };
  }
};

const getSizeStyles = (size: ButtonSize): ViewStyle => {
  switch (size) {
    case "sm":
      return {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 999
      };
    case "lg":
      return {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 999
      };
    case "md":
    default:
      return {
        paddingVertical: 11,
        paddingHorizontal: 18,
        borderRadius: 999
      };
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  fullWidth: {
    alignSelf: "stretch"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  iconLeft: {
    marginRight: 8
  },
  iconRight: {
    marginLeft: 8
  },
  disabled: {
    opacity: 0.55
  }
});

export default Button;
