import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'ru'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language');
    const lang = acceptLanguage?.split(',')?.[0]?.split('-')[0];
    return locales.includes(lang || '') ? lang! : defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // игнорируем public и API
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return;
    }

    // уже содержит язык — не редиректим
    if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
        return;
    }

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
};
