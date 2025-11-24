// mobile/src/components/ui/Badge.tsx

import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Text from "./Text";

export type BadgeVariant = "default" | "success" | "danger" | "warning" | "outline";

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  style,
  children,
  ...rest
}) => {
  const { containerStyle, textTone } = getVariantStyles(variant);

  return (
    <View
      {...rest}
      style={[styles.base, containerStyle, style]}
    >
      <Text
        variant="caption"
        weight="medium"
        tone={textTone}
      >
        {children}
      </Text>
    </View>
  );
};

const getVariantStyles = (
  variant: BadgeVariant
): { containerStyle: any; textTone: Parameters<typeof Text>[0]["tone"] } => {
  switch (variant) {
    case "success":
      return {
        containerStyle: {
          backgroundColor: "#064e3b"
        },
        textTone: "success"
      };
    case "danger":
      return {
        containerStyle: {
          backgroundColor: "#7f1d1d"
        },
        textTone: "danger"
      };
    case "warning":
      return {
        containerStyle: {
          backgroundColor: "#78350f"
        },
        textTone: "default"
      };
    case "outline":
      return {
        containerStyle: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#4b5563"
        },
        textTone: "muted"
      };
    case "default":
    default:
      return {
        containerStyle: {
          backgroundColor: "#111827"
        },
        textTone: "muted"
      };
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start"
  }
});

export default Badge;
