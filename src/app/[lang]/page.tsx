import Header from "@/components/header/Header";
import Hero from "@/components/Hero";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Project from "@/components/project/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/experience/Experience";
import {getDictionary} from "@/app/i18n/get-dictionary";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ru" }];
}

export default async function Home({ params }: { params: { lang: 'en' | 'ru' } }) {

    const headersList = await headers();
    const langFromHeader = headersList.get('x-current-locale');
    const path = headersList.get('x-invoke-path') || headersList.get('x-matched-path') || '';
    const lang = langFromHeader || path?.split('/')[1];

    if (!['en', 'ru'].includes(lang || '')) {
        notFound();
    }

    const dict = await getDictionary(params.lang)
    console.log(dict);

  return (
    <main className="min-h-screen bg-background">
        <Header />
        <Hero/>
        <About/>
        <Project/>
        <Skills/>
        <Experience/>
        <Footer footer={dict.footer} />
    </main>
  );
}
