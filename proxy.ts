// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // 1️⃣ LOGIN PAGE: redirect if already logged-in
//   if (pathname === "/author/login") {
//     const token = req.cookies.get("admin_token")?.value;
//     if (token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/author";
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   // 2️⃣ PROTECTED ADMIN ROUTES
//   if (pathname.startsWith("/author")) {
//     const token = req.cookies.get("admin_token")?.value;

//     if (!token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/author/login";
//       url.search = `from=${encodeURIComponent(pathname)}`;
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/author/:path*", "/author/login"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
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
      // url.search = `from=${encodeURIComponent(pathname)}`;
       url.searchParams.set("message", "login-required"); 
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/author/:path*", "/author/login"],
};
