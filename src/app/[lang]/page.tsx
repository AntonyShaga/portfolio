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
interface PageProps {
    params: {
        lang: 'en' | 'ru'
    }
}
export default async function Home({ params }: PageProps) {
    console.log(await params);
    const headersList = await headers();
    const langFromHeader = headersList.get('x-current-locale');
    const path = headersList.get('x-invoke-path') || headersList.get('x-matched-path') || '';
    const lang = langFromHeader || path?.split('/')[1];

    if (!['en', 'ru'].includes(lang || '')) {
        notFound();
    }

    const dict = await getDictionary(lang as 'en' | 'ru')

  return (
    <main className="min-h-screen bg-background">
        <Header lang={lang as 'en' | 'ru'} header={dict.header} nav={dict.navigation} />
        <Hero hero={dict.hero}/>
        <About about={dict.about}/>
        <Project projects={dict.projects}/>
        <Skills skills={dict.skills}/>
        <Experience experience={dict.experience}/>
        <Footer footer={dict.footer} />
    </main>
  );
}
