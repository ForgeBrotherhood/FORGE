// api/src/lib/validation.ts

export class ValidationError extends Error {
  status = 400;
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function isEmail(value: string): boolean {
  // Simple, pragmatic email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function assertEmail(value: string, fieldName = 'email'): void {
  if (!isEmail(value)) {
    throw new ValidationError(`Invalid ${fieldName} format.`, { field: fieldName });
  }
}

export function assertString(
  value: unknown,
  fieldName: string,
  { minLength, maxLength }: { minLength?: number; maxLength?: number } = {}
): void {
  if (typeof value !== 'string') {
    throw new ValidationError(`${fieldName} must be a string.`, { field: fieldName });
  }

  if (minLength !== undefined && value.length < minLength) {
    throw new ValidationError(
      `${fieldName} must be at least ${minLength} characters.`,
      { field: fieldName }
    );
  }

  if (maxLength !== undefined && value.length > maxLength) {
    throw new ValidationError(
      `${fieldName} must be at most ${maxLength} characters.`,
      { field: fieldName }
    );
  }
}

export function assertRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined || value === '') {
    throw new ValidationError(`${fieldName} is required.`, { field: fieldName });
  }
}
