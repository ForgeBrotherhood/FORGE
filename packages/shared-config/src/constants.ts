// packages/shared-config/src/constants.ts

export const APP_NAME = "Forge";

export const SMITH_MONTHLY_PRICE_USD = 9.99;
export const SMITH_MONTHLY_PRICE_CENTS = 999;

export const FREE_TRIAL_DAYS = 7;

export const MAX_JOURNAL_ENTRY_LENGTH = 5000;
export const MAX_MESSAGE_LENGTH = 2000;

export const SUPPORT_EMAIL = "support@forgeapp.com";

export const BROTHERHOOD_DEFAULT_GROUP_IDS = {
  business: "business",
  fitness: "fitness",
  faith: "faith",
  discipline: "discipline",
  recovery: "recovery"
} as const;

export type BrotherhoodDefaultGroupKey =
  keyof typeof BROTHERHOOD_DEFAULT_GROUP_IDS;
