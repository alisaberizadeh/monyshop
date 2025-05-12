import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from './middlewares/authMiddleware';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    return authMiddleware(request);
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/login',
    '/auth/register',
  ],
}