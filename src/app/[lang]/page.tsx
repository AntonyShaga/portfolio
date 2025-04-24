import Header from "@/components/header/Header";
import Hero from "@/components/Hero";

import Project from "@/components/project/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/experience/Experience";



export default async function Home() {

  return (
    <main className="min-h-screen bg-background">
        <Header />
        <Hero/>
        <About/>
        <Project/>
        <Skills/>
        <Experience/>
        <Footer/>
    </main>
  );
}
