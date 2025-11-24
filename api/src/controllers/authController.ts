// api/src/controllers/authController.ts
//
// Handles HTTP layer for auth: register, login, logout, token refresh,
// and (future) password reset flows.

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const result = await authService.register({ email, password, name });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const result = await authService.login({ email, password });
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function logout(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Stateless JWT logout: client just drops tokens.
    // If you later add token blacklisting, call authService.logout here.
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "refreshToken is required" });
    }

    const result = await authService.refreshTokens(refreshToken);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await authService.requestPasswordReset(email);
    return res.status(202).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "token and newPassword are required" });
    }

    await authService.resetPassword(token, newPassword);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
