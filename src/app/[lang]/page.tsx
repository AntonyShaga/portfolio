import Header from "@/components/header/Header";
import Hero from "@/components/Hero";
import Project from "@/components/project/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/experience/Experience";
import {getDictionary} from "@/app/i18n/get-dictionary";
import Contact from "@/components/contact/Contact";
import {getLangFromHeaders} from "@/lib/getLangFromHeaders";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ru" }];
}

export default async function Home() {

    const lang = await getLangFromHeaders();

    const dict = await getDictionary(lang as 'en' | 'ru')

    const {skills,footer,contact,hero,header,about,experience,projects,toast}=dict

  return (
    <main className="min-h-screen bg-background">
        <Header lang={lang as 'en' | 'ru'} header={header} toast={toast} />
        <Hero hero={hero}/>
        <About about={about} toast={toast}/>
        <Project projects={projects}/>
        <Skills skills={skills}/>
        <Experience experience={experience}/>
        <Contact contact={contact}/>
        <Footer footer={footer }  />
    </main>
  );
}
