// mobile/src/components/ui/Card.tsx

import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps
} from "react-native";

export interface CardProps extends ViewProps {
  elevated?: boolean;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  elevated = false,
  onPress,
  style,
  children,
  ...rest
}) => {
  const content = (
    <View
      {...rest}
      style={[
        styles.base,
        elevated && styles.elevated,
        style
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#020617",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111827",
    padding: 12
  },
  elevated: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  }
});

export default Card;
