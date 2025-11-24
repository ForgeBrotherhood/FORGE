// mobile/src/theme/index.ts

import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  spacing,
  typography
} as const;

export type ForgeTheme = typeof theme;
