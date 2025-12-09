// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "./lib/auth";

// const ADMIN_PATH = "/author"; // protect everything under /author

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow public paths that start with /api/admin/login or /api/admin/logout or login page
//   if (
//     pathname.startsWith("/api/admin/login") ||
//     pathname.startsWith("/api/admin/logout") ||
//     pathname === "/author/login" ||
//     pathname.startsWith("/_next/") ||
//     pathname.startsWith("/api/public") // allow other public APIs
//   ) {
//     return NextResponse.next();
//   }

//   if (pathname.startsWith(ADMIN_PATH)) {
//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       // redirect to login
//       const url = req.nextUrl.clone();
//       url.pathname = "/author/login";
//       url.search = `from=${encodeURIComponent(pathname)}`;
//       return NextResponse.redirect(url);
//     }

//     const payload = verifyToken(token);
//     if (!payload) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/author/login";
//       url.search = `from=${encodeURIComponent(pathname)}`;
//       return NextResponse.redirect(url);
//     }

//     // token valid -> allow
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// // matcher to run middleware for /author and /api/admin routes
// export const config = {
//   matcher: ["/author/:path*", "/api/admin/:path*"],
// };


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow login page itself
//   if (pathname === "/author/login" || pathname.startsWith("/_next/")) {
//     return NextResponse.next();
//   }

//   // Protect /author routes
//   if (pathname.startsWith("/author")) {
//     const token = req.cookies.get("admin_token")?.value;

//     if (!token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/author/login";
//       url.search = `from=${encodeURIComponent(pathname)}`;
//       return NextResponse.redirect(url);
//     }

//     // cookie exists → allow
//     return NextResponse.next();
//   }

// //   console.log('middleware auth error')
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/author/:path*", "/api/admin/:path*"],
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ LOGIN PAGE: redirect if already logged-in
  if (pathname === "/author/login") {
    const token = req.cookies.get("admin_token")?.value;
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/author";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2️⃣ PROTECTED ADMIN ROUTES
  if (pathname.startsWith("/author")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/author/login";
      url.search = `from=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/author/:path*", "/author/login"],
};
