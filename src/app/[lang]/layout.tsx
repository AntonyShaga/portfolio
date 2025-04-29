import "../../style/globals.css";
import {ThemeProvider} from "next-themes";
import {DictionaryProvider} from "@/app/i18n/DictionaryContext";
import {getDictionary} from '@/app/i18n/get-dictionary';
import React from "react";
import {notFound} from "next/navigation";
import {headers} from 'next/headers';
import {Toaster} from "sonner";
import {generateJsonLd} from "@/lib/seo/generateJsonLd";
export { generateMetadata } from "./metadata"
import {geistMono, geistSans} from "@/lib/fonts";

export async function generateStaticParams() {
    // Статические параметры для языков
    return [{ lang: 'en' }, { lang: 'ru' }];
}




export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // Получаем заголовки
    const headersList = await headers();
    const langFromHeader = headersList.get('x-current-locale');
    const path = headersList.get('x-invoke-path') || headersList.get('x-matched-path') || '';
    // Определяем язык
    const lang = (langFromHeader || path?.split('/')[1] || 'ru') as 'en' | 'ru';

    // Если язык не поддерживается
    if (!['en', 'ru'].includes(lang)) {
        notFound();
    }

    // Получаем словарь для текущего языка
    const dict = await getDictionary(lang as 'en' | 'ru');
    // Генерируем JSON-LD для SEO
    const jsonLd = generateJsonLd(lang as 'en' | 'ru');

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
