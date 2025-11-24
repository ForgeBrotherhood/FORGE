// mobile/src/store/userStore.ts

import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  streakCount?: number;
  createdAt?: string;
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

type UserListener = (state: UserState) => void;

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null
};

let userState: UserState = initialState;
const listeners = new Set<UserListener>();

function setUserState(
  updater: Partial<UserState> | ((prev: UserState) => UserState)
) {
  userState =
    typeof updater === "function"
      ? (updater as (prev: UserState) => UserState)(userState)
      : { ...userState, ...updater };

  listeners.forEach((listener) => listener(userState));
}

export function getUserState(): UserState {
  return userState;
}

export function subscribeToUser(listener: UserListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useUserStore(): UserState {
  const [state, setState] = useState<UserState>(userState);

  useEffect(() => {
    const listener: UserListener = (next) => setState(next);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return state;
}

// Actions

export function setUserProfile(profile: UserProfile | null) {
  setUserState({ profile, error: null });
}

export function updateUserProfile(patch: Partial<UserProfile>) {
  setUserState((prev) => {
    if (!prev.profile) return prev;
    return {
      ...prev,
      profile: {
        ...prev.profile,
        ...patch
      }
    };
  });
}

export function setUserLoading(loading: boolean) {
  setUserState({ loading });
}

export function setUserError(error: string | null) {
  setUserState({ error });
}

export function clearUserProfile() {
  userState = initialState;
  listeners.forEach((listener) => listener(userState));
}
