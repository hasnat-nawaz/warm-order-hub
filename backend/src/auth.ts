import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}
const JWT_SECRET_STR: string = JWT_SECRET;

export const jwtPayloadSchema = z.object({
  sub: z.string(), // user uuid
  role: z.enum(["customer", "vendor"]),
  vendorId: z.string().nullable().optional(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET_STR, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET_STR);
  return jwtPayloadSchema.parse(decoded);
}

