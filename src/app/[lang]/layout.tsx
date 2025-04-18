import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../../style/globals.css"
import {ThemeProvider} from "next-themes";
import {DictionaryProvider} from "@/app/i18n/DictionaryContext";
import {getDictionary} from '@/app/i18n/get-dictionary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
    params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: 'en' | 'ru' }
}>) {
    const { lang } = await params
    const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DictionaryProvider  dict={dict}>
              {children}
          </DictionaryProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
