// mobile/src/features/auth/hooks/useAuth.ts

import { useCallback, useState } from "react";
import { Alert } from "react-native";

import { loginApi, signUpApi, requestPasswordResetApi } from "../api/authApi";
import type { AuthResponse } from "../types";

// For now this is a simple local hook.
// Later we can connect it to a global auth store (e.g. Zustand) so
// RootNavigator can react to login state.
export function useAuth() {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, title: string) => {
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    setError(message);
    Alert.alert(title, message);
  };

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await loginApi({ email, password });
        setUser(response.user);
        // TODO: persist tokens (response.tokens) to secure storage.
        return true;
      } catch (err) {
        handleError(err, "Login failed");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await signUpApi({ name, email, password });
        setUser(response.user);
        // TODO: persist tokens (response.tokens).
        return true;
      } catch (err) {
        handleError(err, "Sign up failed");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const requestPasswordReset = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await requestPasswordResetApi(email);
        Alert.alert(
          "Check your email",
          "If an account exists for that address, we sent a reset link."
        );
        return true;
      } catch (err) {
        handleError(err, "Reset failed");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    // Later: clear tokens + any persisted session.
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    signUp,
    logout,
    requestPasswordReset
  };
}
