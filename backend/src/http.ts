import { z } from "zod";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export function apiError(code: ApiErrorCode, message: string, status = 400) {
  return { status, body: { error: { code, message } } };
}

export function ok<T>(body: T, status = 200) {
  return { status, body };
}

export const idTextSchema = z.string().min(1).max(64);

