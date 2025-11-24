// mobile/src/store/uiStore.ts

import { useEffect, useState } from "react";

export type ToastType = "info" | "success" | "error";

export interface ToastState {
  id: string;
  message: string;
  type: ToastType;
  durationMs?: number;
}

export interface AlertDialogState {
  visible: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void | Promise<void>;
}

export interface UIState {
  globalLoading: boolean;
  toast: ToastState | null;
  alertDialog: AlertDialogState | null;
}

type UIListener = (state: UIState) => void;

const initialState: UIState = {
  globalLoading: false,
  toast: null,
  alertDialog: null
};

let uiState: UIState = initialState;
const listeners = new Set<UIListener>();

function setUIState(
  updater: Partial/UIState> | ((prev: UIState) => UIState)
) {
  uiState =
    typeof updater === "function"
      ? (updater as (prev: UIState) => UIState)(uiState)
      : { ...uiState, ...updater };

  listeners.forEach((listener) => listener(uiState));
}

export function getUIState(): UIState {
  return uiState;
}

export function subscribeToUI(listener: UIListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useUIStore(): UIState {
  const [state, setState] = useState<UIState>(uiState);

  useEffect(() => {
    const listener: UIListener = (next) => setState(next);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return state;
}

// Actions

export function setGlobalLoading(loading: boolean) {
  setUIState({ globalLoading: loading });
}

export interface ShowToastOptions {
  type?: ToastType;
  durationMs?: number;
}

export function showToast(
  message: string,
  options: ShowToastOptions = {}
) {
  const { type = "info", durationMs } = options;
  const id = `${Date.now()}`;

  setUIState({
    toast: {
      id,
      message,
      type,
      durationMs
    }
  });
}

export function hideToast() {
  setUIState({ toast: null });
}

export interface ShowAlertDialogOptions {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void | Promise<void>;
}

export function showAlertDialog(options: ShowAlertDialogOptions) {
  setUIState({
    alertDialog: {
      visible: true,
      ...options
    }
  });
}

export function hideAlertDialog() {
  setUIState({ alertDialog: null });
}
