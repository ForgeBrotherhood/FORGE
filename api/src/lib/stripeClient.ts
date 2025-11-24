// api/src/lib/stripeClient.ts

import Stripe from 'stripe';
import { logger } from '../config/logger';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  logger.warn('STRIPE_SECRET_KEY is not set – Stripe operations will fail until this is configured.');
}

/**
 * Preconfigured Stripe client for subscriptions (The Smith, etc.).
 */
export const stripe = new Stripe(secretKey || '', {
  // Lock to a recent API version; update as needed.
  apiVersion: '2024-06-20',
});

export default stripe;
