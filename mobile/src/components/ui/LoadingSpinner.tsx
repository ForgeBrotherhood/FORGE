// mobile/src/components/ui/LoadingSpinner.tsx

import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View
} from "react-native";

export type SpinnerSize = "sm" | "md" | "lg";

export interface LoadingSpinnerProps extends ActivityIndicatorProps {
  sizeToken?: SpinnerSize;
  centered?: boolean;
}

const sizeToNative = (sizeToken: SpinnerSize | undefined): number | "small" | "large" => {
  switch (sizeToken) {
    case "sm":
      return "small";
    case "lg":
      return "large";
    case "md":
    default:
      return "large";
  }
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  sizeToken = "md",
  centered = false,
  color = "#f97316",
  style,
  ...rest
}) => {
  const indicator = (
    <ActivityIndicator
      {...rest}
      style={style}
      color={color}
      size={sizeToNative(sizeToken)}
    />
  );

  if (!centered) return indicator;

  return <View style={styles.center}>{indicator}</View>;
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoadingSpinner;
