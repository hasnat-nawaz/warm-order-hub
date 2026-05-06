import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth.js";

export type AuthedRequest = Request & {
  user?: {
    id: string;
    role: "customer" | "vendor";
    vendorId?: string | null;
  };
};

export function authRequired(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.header("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m)
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing token" } });

  try {
    const payload = verifyToken(m[1]);
    req.user = {
      id: payload.sub,
      role: payload.role,
      vendorId: payload.vendorId ?? null,
    };
    next();
  } catch {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
  }
}
