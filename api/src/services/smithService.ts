// api/src/services/smithService.ts
//
// The Smith – AI mentor logic (chat, weekly review, insights).
// Uses OpenAI via ../lib/openaiClient.

import prisma from "../db/client";
import logger from "../config/logger";
import openai from "../lib/openaiClient";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

const SMITH_SYSTEM_PROMPT = [
  "You are The Smith, an AI mentor inside the Forge app.",
  "Your style is masculine, direct, and rooted in discipline and stoic wisdom.",
  "You challenge excuses, emphasize responsibility, and always push toward clear next steps.",
  "Avoid therapy jargon and overly soft language.",
  "Speak like a wise older brother who wants the user to grow."
].join(" ");

export interface ChatResult {
  reply: string;
}

export async function chatWithSmith(
  userId: string,
  userMessage: string
): Promise<ChatResult> {
  if (!userMessage || !userMessage.trim()) {
    throw createError(400, "Message is required");
  }

  const response = await openai.chat.completions.create({
    // You can change the model when you wire this up for real.
    model: "gpt-5.1-mini",
    messages: [
      { role: "system", content: SMITH_SYSTEM_PROMPT },
      {
        role: "user",
        content: userMessage
      }
    ],
    temperature: 0.7,
    max_tokens: 400
  });

  const reply = response.choices[0]?.message?.content?.trim() || "…";

  logger.info("Smith chat completed", { userId });

  return { reply };
}

export interface WeeklyReviewInput {
  weekSummary?: string;
  highs?: string;
  lows?: string;
  lessons?: string;
  nextWeekFocus?: string;
}

export interface WeeklyReviewResult {
  summary: string;
}

export async function runWeeklyReview(
  userId: string,
  input: WeeklyReviewInput
): Promise<WeeklyReviewResult> {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 7
  });

  const journalContext =
    entries.length === 0
      ? "No recent journal entries."
      : entries
          .map(
            (e) =>
              `- [${e.createdAt.toISOString().slice(0, 10)}] ${e.title ?? ""} :: ${
                e.content
              }`
          )
          .join("\n");

  const userProvided = [
    input.weekSummary && `Week summary: ${input.weekSummary}`,
    input.highs && `Highs: ${input.highs}`,
    input.lows && `Lows: ${input.lows}`,
    input.lessons && `Lessons: ${input.lessons}`,
    input.nextWeekFocus && `Focus for next week: ${input.nextWeekFocus}`
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = [
    "You are running a weekly review with a man inside the Forge app.",
    "Summarize his week, highlight key themes, and propose 3–5 concrete action steps for next week.",
    "Keep the tone grounded, strong, and encouraging—not fluffy.",
    "",
    "Recent journal entries:",
    journalContext,
    "",
    "User's own notes for this review:",
    userProvided || "No additional notes."
  ].join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-5.1-mini",
    messages: [
      { role: "system", content: SMITH_SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    max_tokens: 600
  });

  const summary =
    response.choices[0]?.message?.content?.trim() ??
    "No review could be generated.";

  logger.info("Smith weekly review generated", { userId });

  return { summary };
}

export interface InsightsResult {
  insights: string;
}

export async function getInsights(userId: string): Promise<InsightsResult> {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  if (entries.length === 0) {
    return {
      insights:
        "You haven't written in your journal yet. Start capturing your thoughts so The Smith can surface patterns."
    };
  }

  const context = entries
    .map(
      (e) =>
        `- [${e.createdAt.toISOString().slice(0, 10)}] ${e.mood ?? ""} :: ${
          e.content
        }`
    )
    .join("\n");

  const prompt = [
    "Review the following journal snippets from a man working on discipline and purpose.",
    "Identify recurring themes, strengths, and weak points.",
    "Then give 3–5 short, punchy recommendations for where he should focus next.",
    "",
    context
  ].join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-5.1-mini",
    messages: [
      { role: "system", content: SMITH_SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    max_tokens: 600
  });

  const insights =
    response.choices[0]?.message?.content?.trim() ??
    "No insights could be generated.";

  logger.info("Smith insights generated", { userId });

  return { insights };
}
