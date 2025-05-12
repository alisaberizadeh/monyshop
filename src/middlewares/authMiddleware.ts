import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
