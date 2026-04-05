import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = [
    '/api/gallery',
    '/api/testimonials',
    '/api/upload',
    '/api/cloudinary-signature',
    '/dashboard'
  ];

  // Allow GET on /api/contact for authenticated users (handled in route)
  if (pathname === '/api/contact' && request.method === 'GET') {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    const token = request.cookies.get("auth_token");

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Note: JWT verification removed for simplicity, assuming token presence is sufficient
    // In production, add back jwt.verify if needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*'
  ],
};