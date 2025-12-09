// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();


    console.log('inside login fun :: , '  )
    console.log(username,password )

    // Simple credential check - for production use hashed DB users.
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      return NextResponse.json({ success: false, message: "Server not configured" }, { status: 500 });
    }

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ username });

    console.log(token)

    const res = NextResponse.json({ success: true });

    // set HttpOnly cookie
    const cookieOptions = [
      `admin_token=${token}`,
      `Path=/`, // available site-wide (or Path=/author to limit)
      `HttpOnly`,
      `SameSite=Lax`,
      `Max-Age=${60 * 60}`, // seconds, align with JWT_EXPIRES_IN (1h)
      // `Secure` // set in production (HTTPS)
    ];

    // On production (https) include Secure
    if (process.env.NODE_ENV === "production") cookieOptions.push("Secure");

    res.headers.append("Set-Cookie", cookieOptions.join("; "));

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
