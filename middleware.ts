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

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // если уже есть язык в пути — ничего не делаем
    const matchedLocale = locales.find((locale) =>
        pathname.startsWith(`/${locale}`)
    );
    if (matchedLocale) {
        // добавим заголовок, чтобы layout мог прочитать
        const response = NextResponse.next();
        response.headers.set('x-current-locale', matchedLocale);
        return response;
    }

    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
