// mobile/src/features/settings/components/SettingToggle.tsx

import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";

export interface SettingToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const SettingToggle: React.FC<SettingToggleProps> = ({
  label,
  description,
  value,
  onValueChange,
  disabled
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    marginRight: 12
  },
  label: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600"
  },
  description: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18
  }
});

export default SettingToggle;
