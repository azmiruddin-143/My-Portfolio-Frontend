// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const AUTH_TOKEN_KEY = "token";
// const LOGIN_ROUTE = "/login";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
//   const { pathname } = request.nextUrl;

//   // ✅ শুধু dashboard ও তার সব সাবরাউট protect হবে
//   const isProtectedRoute = pathname.startsWith("/dashboard/create-project");

//   // 🔒 টোকেন ছাড়া dashboard রাউটে ঢুকলে redirect to login
//   if (isProtectedRoute && !token) {
//     const response = NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
//     response.cookies.delete(AUTH_TOKEN_KEY);
//     return response;
//   }

//   // 🔁 যদি login এ টোকেন থাকে → redirect to dashboard
//   if (pathname === LOGIN_ROUTE && token) {
//     return NextResponse.redirect(new URL("/dashboard/create-project", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   // ✅ dashboard এবং তার সব সাবরাউট (nested path সহ)
//   matcher: ["/dashboard/create-project/:path*", "/login"],
// };
