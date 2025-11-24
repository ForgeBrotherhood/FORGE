// mobile/src/components/feedback/AlertDialog.tsx

import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { useTheme } from "../../hooks/useTheme";
import { useUIStore, hideAlertDialog } from "../../store/uiStore";

const AlertDialog: React.FC = () => {
  const theme = useTheme();
  const { alertDialog } = useUIStore();

  if (!alertDialog || !alertDialog.visible) {
    return null;
  }

  const {
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    destructive,
    onConfirm
  } = alertDialog;

  const handleDismiss = () => {
    hideAlertDialog();
  };

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
    } catch (err) {
      console.log("[FORGE] AlertDialog confirm error", err);
    } finally {
      hideAlertDialog();
    }
  };

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleDismiss}
        />
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderSubtle
            }
          ]}
        >
          {title ? (
            <Text variant="subtitle" weight="bold" style={styles.title}>
              {title}
            </Text>
          ) : null}

          {message ? (
            <Text variant="body" tone="muted" style={styles.message}>
              {message}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <Button
              label={cancelLabel}
              variant="ghost"
              onPress={handleDismiss}
              style={styles.actionButton}
            />
            <Button
              label={confirmLabel}
              variant={destructive ? "danger" : "primary"}
              onPress={handleConfirm}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject
  },
  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  title: {
    marginBottom: 4
  },
  message: {
    marginTop: 4,
    marginBottom: 16
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  actionButton: {
    marginLeft: 8
  }
});

export default AlertDialog;
