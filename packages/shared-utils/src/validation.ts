// packages/shared-utils/src/validation.ts

/**
 * Frontend/shared validation helpers (pure, no Node dependencies).
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.toLowerCase());
}

export function isStrongPassword(password: string): boolean {
  if (!password || password.length < 8) return false;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
}

export function validateEmail(value: string, fieldName = "email"): void {
  if (!isEmail(value)) {
    throw new ValidationError(`Invalid ${fieldName} address.`);
  }
}

export function validatePasswordStrength(password: string): void {
  if (!isStrongPassword(password)) {
    throw new ValidationError(
      "Password must be at least 8 characters and include letters and numbers."
    );
  }
}

export function requireNonEmptyString(
  value: unknown,
  fieldName: string
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(`${fieldName} is required.`);
  }
  return value.trim();
}

/**
 * Trim and clamp to a maximum length.
 */
export function clampLength(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max);
}
