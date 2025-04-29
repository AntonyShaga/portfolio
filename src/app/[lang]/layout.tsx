import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../style/globals.css";
import { ThemeProvider } from "next-themes";
import { DictionaryProvider } from "@/app/i18n/DictionaryContext";
import { getDictionary } from '@/app/i18n/get-dictionary';
import React from "react";
import { notFound } from "next/navigation";
import { headers } from 'next/headers';
import { Toaster } from "sonner";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Конфиг для метаданных
const SITE_URL = "https://yourdomain.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const lang = headersList.get('x-current-locale') || 'ru';
    const path = headersList.get('x-invoke-path') || '';

    const title = {
        ru: "Антон Шага | Frontend-разработчик",
        en: "Anton Shaga | Frontend Developer"
    };

    const description = {
        ru: "Создаю современные веб-приложения на Next.js и TypeScript",
        en: "Building modern web apps with Next.js and TypeScript"
    };

    return {
        title: title[lang as 'ru' | 'en'],
        description: description[lang as 'ru' | 'en'],
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: `${SITE_URL}/${lang}${path}`,
            languages: {
                'ru': `${SITE_URL}/ru${path}`,
                'en': `${SITE_URL}/en${path}`,
            },
        },
        openGraph: {
            title: title[lang as 'ru' | 'en'],
            description: description[lang as 'ru' | 'en'],
            url: `${SITE_URL}/${lang}${path}`,
            siteName: "Anton Shaga Portfolio",
            images: [{
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: title[lang as 'ru' | 'en'],
            }],
            locale: lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title[lang as 'ru' | 'en'],
            description: description[lang as 'ru' | 'en'],
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

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const langFromHeader = headersList.get('x-current-locale');
    const path = headersList.get('x-invoke-path') || headersList.get('x-matched-path') || '';
    const lang = langFromHeader || path?.split('/')[1] || 'ru';

    if (!['en', 'ru'].includes(lang)) {
        notFound();
    }

    const dict = await getDictionary(lang as 'en' | 'ru');

    // JSON-LD данные
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": lang === 'ru' ? "Антон Шага" : "Anton Shaga",
        "jobTitle": "Frontend Developer",
        "url": `${SITE_URL}/${lang}`,
        "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourprofile"
        ],
        "description": lang === 'ru'
            ? "Фронтенд-разработчик специализирующийся на Next.js"
            : "Frontend developer specializing in Next.js"
    };

    return (
        <html lang={lang} suppressHydrationWarning>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <DictionaryProvider dict={dict}>
                {children}
                <Toaster />
            </DictionaryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
