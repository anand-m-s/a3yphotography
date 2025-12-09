// lib/auth.ts
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const rawSecret = process.env.JWT_SECRET;
const rawExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

if (!rawSecret) {
  throw new Error("Missing JWT_SECRET in env");
}

const JWT_SECRET: Secret = rawSecret;

// 👇 FIX — force correct type that accepts "1h", "7d", "30m", numbers, etc.
const JWT_EXPIRES_IN = rawExpiresIn as SignOptions["expiresIn"];

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
  } catch {
    return null;
  }
}
