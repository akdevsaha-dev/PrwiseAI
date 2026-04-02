import type { NextFunction, Request, Response } from "express";
import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    req.session = session;

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(500).json({
      error: "Internal server error during authentication",
    });
  }
};
