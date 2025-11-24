// mobile/src/features/streaks/components/StreakBar.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StreakBarProps {
  current: number;
  best?: number;
}

const StreakBar: React.FC<StreakBarProps> = ({ current, best }) => {
  const safeBest = best && best > 0 ? best : current || 1;
  const ratio = current / safeBest;
  const progress = Math.max(0, Math.min(1, isFinite(ratio) ? ratio : 0));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Streak</Text>
        <Text style={styles.value}>
          {current} day{current === 1 ? "" : "s"}
        </Text>
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      {typeof best === "number" && (
        <Text style={styles.meta}>
          Best streak: {best} day{best === 1 ? "" : "s"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  label: {
    color: "#9ca3af",
    fontSize: 13
  },
  value: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "600"
  },
  barBackground: {
    flexDirection: "row",
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#111827",
    height: 8,
    marginBottom: 4
  },
  barFill: {
    backgroundColor: "#f97316"
  },
  meta: {
    color: "#6b7280",
    fontSize: 11,
    marginTop: 2
  }
});

export default StreakBar;
