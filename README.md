# FORGE

FORGE is a mobile-first platform that combines **The Brotherhood** (free community of men in the grind)
and **The Smith** (premium AI mentor) into one unified experience.

This repo is a **monorepo** containing:

- `mobile/` – React Native + Expo app (iOS & Android)
- `api/` – Node / Express backend (REST API, OpenAI, Stripe, DB)
- `packages/` – Shared TypeScript libraries (types, config, utilities)

---

## Repo structure

```text
/
├─ mobile/              # Forge mobile app (Brotherhood + The Smith)
├─ api/                 # Backend API
├─ packages/
│  ├─ shared-types/     # Shared TS types (User, Message, etc.)
│  ├─ shared-config/    # Shared config (Smith persona, categories, flags)
│  └─ shared-utils/     # Shared pure functions (scoring, journaling, validation)
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ .gitignore
└─ .env.example
