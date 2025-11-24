// mobile/src/lib/validation.ts

export function isNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

export function validatePasswordStrength(
  password: string
): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  // Add more rules later if needed.
  return null;
}

export interface FieldError {
  field: string;
  message: string;
}

export function requireField(
  value: unknown,
  field: string
): FieldError | null {
  if (!isNonEmptyString(value)) {
    return {
      field,
      message: "This field is required."
    };
  }
  return null;
}
