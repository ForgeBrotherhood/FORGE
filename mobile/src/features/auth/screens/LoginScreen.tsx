// mobile/src/features/auth/screens/LoginScreen.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "../../../navigation/types";
import { useAuth } from "../hooks/useAuth";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    const success = await login(email.trim(), password);
    if (success) {
      // For now we just move into onboarding welcome.
      // Later RootNavigator will react to global auth state.
      navigation.navigate("OnboardingWelcome");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            FORGE your mind. Log in to rejoin the Brotherhood.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#6b7280"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#6b7280"
            secureTextEntry
            style={styles.input}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text style={styles.primaryButtonText}>Log in</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to FORGE?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.footerLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#050608",
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  header: {
    marginBottom: 32
  },
  title: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14
  },
  form: {
    gap: 12
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 4
  },
  input: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#f9fafb",
    marginBottom: 12
  },
  errorText: {
    color: "#f97373",
    marginBottom: 8,
    fontSize: 13
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  linkButton: {
    alignSelf: "flex-end",
    marginTop: 8
  },
  linkText: {
    color: "#9ca3af",
    fontSize: 13
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    color: "#9ca3af",
    marginRight: 6
  },
  footerLink: {
    color: "#f97316",
    fontWeight: "600"
  }
});

export default LoginScreen;
