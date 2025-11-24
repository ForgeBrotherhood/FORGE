// mobile/src/components/feedback/Toast.tsx

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../ui/Text";
import { useTheme } from "../../hooks/useTheme";
import { useUIStore, hideToast } from "../../store/uiStore";

const Toast: React.FC = () => {
  const theme = useTheme();
  const { toast } = useUIStore();

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      hideToast();
    }, toast.durationMs ?? 3000);

    return () => clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  let backgroundColor = theme.colors.surfaceAlt;
  let borderColor = theme.colors.borderSubtle;
  let tone: "default" | "inverse" | "success" | "danger" = "default";

  switch (toast.type) {
    case "success":
      backgroundColor = theme.colors.successSoft;
      borderColor = theme.colors.success;
      tone = "success";
      break;
    case "error":
      backgroundColor = theme.colors.dangerSoft;
      borderColor = theme.colors.danger;
      tone = "danger";
      break;
    case "info":
    default:
      backgroundColor = theme.colors.surfaceAlt;
      borderColor = theme.colors.borderSubtle;
      tone = "default";
      break;
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={styles.container} pointerEvents="box-none">
        <View
          style={[
            styles.toast,
            {
              backgroundColor,
              borderColor
            }
          ]}
        >
          <Text variant="body" weight="medium" tone={tone}>
            {toast.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  toast: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: "100%"
  }
});

export default Toast;
