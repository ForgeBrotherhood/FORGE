// mobile/src/hooks/useTheme.ts

import { theme, ForgeTheme } from "../theme";

/**
 * Simple hook returning the static Forge theme.
 * If you add light/dark mode later, this can become reactive.
 */
export function useTheme(): ForgeTheme {
  return theme;
}
