import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ Allow static files and public assets
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // ✅ Skip all API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // ✅ Allow requests from common browsers and bots
  const userAgent = request.headers.get('user-agent') || '';
  const allowedUserAgents = [
    'Mozilla',
    'Chrome',
    'Safari',
    'Googlebot',
    'Bingbot',
    'DuckDuckBot',
    'node-fetch',
    'Next.js',
    'undici', // Node.js native fetch
  ];

  const isAllowed = allowedUserAgents.some(agent => userAgent.includes(agent));

  if (!isAllowed) {
    return new NextResponse('Access denied: unauthorized request.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api).*)'], // Apply to all routes except API
};
