// api/src/index.ts
//
// Entry point for the Forge API server.
// Loads environment variables, creates the Express app, and starts listening.

import dotenv from "dotenv";
dotenv.config(); // Loads api/.env into process.env for local dev

import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  // Simple logger for now – later you can swap to config/logger.ts
  // when we create that file.
  console.log(`Forge API listening on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || "development"})`);
});
