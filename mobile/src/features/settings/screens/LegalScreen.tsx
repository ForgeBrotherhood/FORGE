// mobile/src/features/settings/screens/LegalScreen.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const LegalScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.kicker}>LEGAL & PRIVACY</Text>
        <Text style={styles.title}>How we protect the Forge</Text>
        <Text style={styles.subtitle}>
          Plain-language notes on how your data, privacy, and the Brotherhood
          are handled. Full legal docs will live on the web and be linked here.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy</Text>
          <Text style={styles.cardBody}>
            • Your journal and Smith conversations are private and encrypted in
            transit and at rest.{"\n"}
            • No selling your reflections or using them for ad targeting.{"\n"}
            • You&apos;ll be able to export and delete your data.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>The Forge Code</Text>
          <Text style={styles.cardBody}>
            The Brotherhood is moderated and built for men who build – not
            trolls. Respect, honesty, and effort are non‑negotiable. Breaking
            the code can mean losing access.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Full documents</Text>
          <Text style={styles.cardBody}>
            In a production build, this section will link to Terms of Service,
            Privacy Policy, and community guidelines hosted on our site.
          </Text>
        </View>
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
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  title: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 16
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    padding: 16,
    marginBottom: 12
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6
  },
  cardBody: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 20
  }
});

export default LegalScreen;
