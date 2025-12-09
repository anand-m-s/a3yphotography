// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Remove cookie by setting Max-Age=0
  const cookie = `admin_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
  res.headers.append("Set-Cookie", cookie);
  return res;
}
