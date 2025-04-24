import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public files and homepage
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') || '';

  // Allow common browser or bot user-agents
  const allowedUserAgents = ['Mozilla', 'Chrome', 'Safari', 'Googlebot', 'Bingbot', 'DuckDuckBot'];
  const isAllowed = allowedUserAgents.some(agent => userAgent.includes(agent));

  if (!isAllowed) {
    return new NextResponse('Access denied: unauthorized request.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth).*)'], // Apply to all routes except auth
};
