// mobile/src/theme/colors.ts

export const colors = {
  background: "#050608",
  surface: "#020617",
  surfaceAlt: "#111827",
  textPrimary: "#e5e7eb",
  textSecondary: "#9ca3af",
  accent: "#f97316",
  accentSoft: "#fed7aa",
  danger: "#b91c1c",
  dangerSoft: "#fecaca",
  success: "#15803d",
  successSoft: "#bbf7d0",
  borderSubtle: "#1f2937",
  overlay: "rgba(0,0,0,0.7)"
} as const;

export type ForgeColor = keyof typeof colors;
