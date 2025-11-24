// mobile/src/components/ui/Text.tsx

import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle
} from "react-native";

export type TextVariant = "title" | "subtitle" | "body" | "caption" | "label";
export type TextTone =
  | "default"
  | "muted"
  | "danger"
  | "success"
  | "primary"
  | "inverse";

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  tone?: TextTone;
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}

const BASE: TextStyle = {
  color: "#e5e7eb"
};

const VARIANTS: Record<TextVariant, TextStyle> = {
  title: { fontSize: 24, lineHeight: 30 },
  subtitle: { fontSize: 18, lineHeight: 24 },
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
  label: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: "uppercase"
  }
};

const TONES: Record<TextTone, TextStyle> = {
  default: { color: "#e5e7eb" },
  muted: { color: "#9ca3af" },
  danger: { color: "#fca5a5" },
  success: { color: "#bbf7d0" },
  primary: { color: "#f97316" },
  inverse: { color: "#020617" }
};

const WEIGHTS: Record<NonNullable<TextProps["weight"]>, TextStyle> = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" }
};

const styles = StyleSheet.create({
  base: BASE
});

const Text: React.FC<TextProps> = ({
  variant = "body",
  tone = "default",
  weight = "regular",
  align = "left",
  style,
  children,
  ...rest
}) => {
  const variantStyle = VARIANTS[variant];
  const toneStyle = TONES[tone];
  const weightStyle = WEIGHTS[weight];

  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        variantStyle,
        toneStyle,
        weightStyle,
        { textAlign: align },
        style
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
