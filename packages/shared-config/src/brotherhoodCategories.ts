// packages/shared-config/src/brotherhoodCategories.ts

import { BROTHERHOOD_DEFAULT_GROUP_IDS } from "./constants";

export type BrotherhoodCategoryId =
  (typeof BROTHERHOOD_DEFAULT_GROUP_IDS)[keyof typeof BROTHERHOOD_DEFAULT_GROUP_IDS];

export interface BrotherhoodCategory {
  id: BrotherhoodCategoryId;
  name: string;
  description: string;
}

export const BROTHERHOOD_CATEGORIES: BrotherhoodCategory[] = [
  {
    id: BROTHERHOOD_DEFAULT_GROUP_IDS.business,
    name: "Business",
    description:
      "Builders, founders, salesmen, and anyone grinding on their craft or company."
  },
  {
    id: BROTHERHOOD_DEFAULT_GROUP_IDS.fitness,
    name: "Fitness",
    description:
      "Training, strength, conditioning, nutrition, and discipline in the body."
  },
  {
    id: BROTHERHOOD_DEFAULT_GROUP_IDS.faith,
    name: "Faith",
    description:
      "Spiritual growth, prayer, meaning, and living for something bigger than yourself."
  },
  {
    id: BROTHERHOOD_DEFAULT_GROUP_IDS.discipline,
    name: "Discipline",
    description:
      "Habits, focus, time management, and staying true to your word when it’s hard."
  },
  {
    id: BROTHERHOOD_DEFAULT_GROUP_IDS.recovery,
    name: "Recovery",
    description:
      "Addiction, relapse, burnout, and getting back up after you fall."
  }
];

export const BROTHERHOOD_CATEGORY_MAP: Record<
  BrotherhoodCategoryId,
  BrotherhoodCategory
> = BROTHERHOOD_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  },
  {} as Record<BrotherhoodCategoryId, BrotherhoodCategory>
);
