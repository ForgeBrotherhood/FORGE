// mobile/src/store/authStore.ts

import { useEffect, useState } from "react";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type AuthListener = (state: AuthState) => void;

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

let authState: AuthState = initialState;
const listeners = new Set<AuthListener>();

function setAuthState(
  updater: Partial<AuthState> | ((prev: AuthState) => AuthState)
) {
  authState =
    typeof updater === "function"
      ? (updater as (prev: AuthState) => AuthState)(authState)
      : { ...authState, ...updater };

  listeners.forEach((listener) => listener(authState));
}

export function getAuthState(): AuthState {
  return authState;
}

export function subscribeToAuth(listener: AuthListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAuthStore(): AuthState {
  const [state, setState] = useState<AuthState>(authState);

  useEffect(() => {
    const listener: AuthListener = (next) => setState(next);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return state;
}

// Actions

export function setAuthTokens(
  accessToken: string | null,
  refreshToken?: string | null
) {
  setAuthState({
    accessToken,
    refreshToken: refreshToken ?? null,
    isAuthenticated: Boolean(accessToken),
    error: null
  });
}

export function setAuthLoading(loading: boolean) {
  setAuthState({ loading });
}

export function setAuthError(error: string | null) {
  setAuthState({ error });
}

export function clearAuth() {
  setAuthState({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
    loading: false
  });
}
