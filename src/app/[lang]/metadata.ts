import { headers } from 'next/headers';
import type { Metadata } from 'next';
const SITE_URL = "https://yourdomain.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const lang = headersList.get('x-current-locale') || 'ru';
    const path = headersList.get('x-invoke-path') || '';
    const cleanPath = path.startsWith(`/${lang}`) ? path.replace(`/${lang}`, '') : path;

    const title = {
        ru: "Антон Шага | Frontend-разработчик",
        en: "Anton Shaga | Frontend Developer",
    }[lang as 'en' | 'ru'];

    const description = {
        ru: "Создаю современные веб-приложения на Next.js и TypeScript",
        en: "Building modern web apps with Next.js and TypeScript",
    }[lang as 'en' | 'ru'];

    return {
        title,
        description,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: `${SITE_URL}/${lang}${cleanPath}`,
            languages: {
                ru: `${SITE_URL}/ru${path}`,
                en: `${SITE_URL}/en${path}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/${lang}${cleanPath}`,
            siteName: "Anton Shaga Portfolio",
            images: [{
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: title,
            }],
            locale: lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
    };
}
