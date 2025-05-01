import "../../style/globals.css";
import {ThemeProvider} from "next-themes";
import {DictionaryProvider} from "@/app/i18n/DictionaryContext";
import {getDictionary} from '@/app/i18n/get-dictionary';
import React from "react";
import {Toaster} from "sonner";
import {generateJsonLd} from "@/lib/seo/generateJsonLd";
import {geistMono, geistSans} from "@/lib/fonts";
import {getLangFromHeaders} from "@/lib/getLangFromHeaders";

export { generateMetadata } from "./metadata"

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const lang = await getLangFromHeaders()

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
