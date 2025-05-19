import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'ru', 'ua'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  const lang = acceptLanguage?.split(',')[0]?.split('-')[0]?.toLowerCase();
  return locales.includes(lang || '') ? lang! : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const matchedLocale = locales.find((locale) => pathname.startsWith(`/${locale}`));
  if (matchedLocale) {
    const response = NextResponse.next();
    response.headers.set('x-current-locale', matchedLocale);
    return response;
  }

  const locale = getLocale(request);
  console.log('Redirecting to locale:', locale);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|favicon.svg|.*\\..*).*)'],
};
