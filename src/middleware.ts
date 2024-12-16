import { NextResponse, type NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("authjs.session-token")?.value
  const { pathname } = req.nextUrl

  // ถ้าไม่มี token และพยายามเข้า dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(`/auth/login/?redirect=${encodeURIComponent(pathname)}`, req.url))
  }

  // ถ้ามี token แล้วพยายามเข้า auth routes
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"]
}
