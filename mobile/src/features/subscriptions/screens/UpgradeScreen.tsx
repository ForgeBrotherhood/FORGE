// mobile/src/features/subscriptions/screens/UpgradeScreen.tsx

import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useSubscriptionStatus } from "../hooks/useSubscriptionStatus";

const UpgradeScreen: React.FC = () => {
  const {
    status,
    isActive,
    isLoading,
    isUpdating,
    startUpgrade,
    openBillingPortal,
    error
  } = useSubscriptionStatus();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.kicker}>PREMIUM</Text>
        <Text style={styles.title}>Unlock The Smith</Text>
        <Text style={styles.subtitle}>
          The Brotherhood is free. The Smith is your premium AI mentor — a
          stoic, no-nonsense coach available whenever you need clarity. 
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you unlock</Text>
          <Text style={styles.bullet}>
            • Unlimited 1:1 sessions with The Smith (no message caps).
          </Text>
          <Text style={styles.bullet}>
            • Daily and weekly guided reflection flows tailored to your grind.
          </Text>
          <Text style={styles.bullet}>
            • Deeper insight summaries based on your journal and check-ins.
          </Text>
          <Text style={styles.bullet}>
            • Priority access to new premium features as the Forge grows.
          </Text>
          <Text style={styles.price}>
            $9.99 / month – cancel anytime.
          </Text>
        </View>

        {status && (
          <Text style={styles.statusText}>
            Current status:{" "}
            {isActive ? "Premium (Smith unlocked)" : "Free (Brotherhood only)"}
          </Text>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {isActive ? (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              isUpdating && styles.primaryButtonDisabled
            ]}
            onPress={openBillingPortal}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text style={styles.primaryButtonText}>Manage billing</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (isUpdating || isLoading) && styles.primaryButtonDisabled
            ]}
            onPress={startUpgrade}
            disabled={isUpdating || isLoading}
          >
            {isUpdating ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text style={styles.primaryButtonText}>
                Upgrade to The Smith
              </Text>
            )}
          </TouchableOpacity>
        )}

        <Text style={styles.helperText}>
          Your Brotherhood access stays free forever. Upgrading simply unlocks
          The Smith and deeper reflection tools on top of what you already have. 
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608"
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32
  },
  kicker: {
    color: "#9ca3af",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4
  },
  title: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    padding: 16,
    marginBottom: 16
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8
  },
  bullet: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 4
  },
  price: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8
  },
  statusText: {
    color: "#e5e7eb",
    fontSize: 13,
    marginBottom: 8
  },
  errorText: {
    color: "#f97373",
    fontSize: 13,
    marginBottom: 8
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  helperText: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 4
  }
});

export default UpgradeScreen;
