// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const path = url.pathname;

  // Allow public assets and home page
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path === '/' ||
    path.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // Block suspicious requests without a proper user-agent (non-browser)
  const userAgent = request.headers.get('user-agent') || '';

  const isRealBrowser = userAgent.includes('Mozilla') || userAgent.includes('Chrome') || userAgent.includes('Safari');

  if (!isRealBrowser) {
    return new NextResponse('Access denied: unauthorized request.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth).*)'], // apply to everything except auth if needed
};
