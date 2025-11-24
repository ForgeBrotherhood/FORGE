// api/src/lib/openaiClient.ts

import OpenAI from 'openai';
import { logger } from '../config/logger';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  logger.warn('OPENAI_API_KEY is not set – Smith replies will fail until this is configured.');
}

export const openai = new OpenAI({
  apiKey: apiKey || '',
});

export interface CreateSmithReplyParams {
  userId: string;
  conversationId: string;
  message: string;
}

/**
 * Generates a reply from “The Smith” – Forge’s stoic, masculine mentor.
 * The persona is direct, grounded, and focused on responsibility, not therapy-speak. 
 */
export async function createSmithReply({
  userId,
  conversationId,
  message,
}: CreateSmithReplyParams): Promise<string> {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const systemPrompt =
    [
      'You are The Smith, an AI mentor inside the Forge app.',
      'You coach men with a calm but firm tone, grounded in stoic and spiritual wisdom.',
      'You challenge excuses, highlight responsibility, and focus on clear next steps.',
      'Avoid clinical therapy language and avoid suggesting generic “self-care”.',
      'Be concise, concrete, and masculine in your style.',
    ].join(' ');

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      user: userId,
      metadata: {
        conversationId,
      } as any,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    return reply || '…';
  } catch (err) {
    logger.error('createSmithReply failed', {
      error: (err as Error).message,
      userId,
      conversationId,
    });
    throw new Error('Failed to generate mentor reply');
  }
}
