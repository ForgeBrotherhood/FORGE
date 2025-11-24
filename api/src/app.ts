// api/src/app.ts
//
// Creates and configures the Express application.
// Later we'll plug in route modules, Prisma, and structured logging.

import express, {
  Application,
  NextFunction,
  Request,
  Response
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// When you create your routes/index.ts later, you'll hook it up here:
// import apiRouter from "./routes";

const app: Application = express();

// Trust reverse proxy (useful for Render / other hosts)
app.set("trust proxy", 1);

// Basic security headers
app.use(helmet());

// CORS – keep simple for now; later we can centralize in config/env.ts.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Request logging (dev)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check – good for Render / uptime checks
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "forge-api",
    uptime: process.uptime()
  });
});

// TODO: mount versioned API routes once we create them.
// app.use("/api", apiRouter);

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not found"
  });
});

// Basic error handler (will later be replaced by src/middleware/errorHandler.ts)
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.error("Unhandled error in Forge API:", err);

    const status = err?.status ?? 500;
    const message =
      err?.message ?? "Internal server error";

    res.status(status).json({
      error: message
    });
  }
);

export default app;
