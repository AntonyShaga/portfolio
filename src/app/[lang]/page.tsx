import Header from "@/components/header/Header";
import Hero from "@/components/Hero";

import Project from "@/components/project/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/experience/Experience";
import {getDictionary} from "@/app/i18n/get-dictionary";
import type { PageProps } from "@/types";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ru" }];
}

export default async function Home({ params }: PageProps) {
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
