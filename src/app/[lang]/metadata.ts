import { headers } from 'next/headers';
import type { Metadata } from 'next';

const SITE_URL = 'https://portfolio-inky-six-36.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const lang = headersList.get('x-current-locale') || 'ru';
  const path = headersList.get('x-invoke-path') || '';
  const cleanPath = path.startsWith(`/${lang}`) ? path.replace(`/${lang}`, '') : path;

  const titleMap = {
    ru: 'Антон Шага | Frontend-разработчик',
    en: 'Anton Shaga | Frontend Developer',
    uk: 'Антон Шага | Фронтенд-розробник',
  };

  const descriptionMap = {
    ru: 'Создаю современные веб-приложения на Next.js и TypeScript',
    en: 'Building modern web apps with Next.js and TypeScript',
    uk: 'Створюю сучасні веб-застосунки з використанням Next.js та TypeScript',
  };

  const title = titleMap[lang as keyof typeof titleMap] ?? titleMap.ru;
  const description = descriptionMap[lang as keyof typeof descriptionMap] ?? descriptionMap.ru;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.ico',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}${cleanPath}`,
      languages: {
        ru: `${SITE_URL}/ru${path}`,
        en: `${SITE_URL}/en${path}`,
        uk: `${SITE_URL}/ua${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}${cleanPath}`,
      siteName: 'Anton Shaga Portfolio',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: lang === 'ru' ? 'ru_RU' : lang === 'uk' ? 'uk_UA' : 'en_US',
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
      },
    },
  };
}
