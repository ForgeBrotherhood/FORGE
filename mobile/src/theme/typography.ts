// mobile/src/theme/typography.ts

export const typography = {
  fontFamilyRegular: "System",
  fontFamilyMedium: "System",
  fontFamilySemibold: "System",
  fontFamilyBold: "System",
  sizes: {
    caption: 12,
    body: 14,
    bodyLarge: 16,
    subtitle: 18,
    title: 24,
    display: 32
  },
  lineHeights: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.5
  }
} as const;

export type Typography = typeof typography;
