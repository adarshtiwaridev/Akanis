import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
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
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*'
  ],
};