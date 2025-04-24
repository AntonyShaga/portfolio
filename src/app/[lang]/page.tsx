import Header from "@/components/Header/Header";
import Hero from "@/components/Hero";

import Project from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";



export default async function Home() {

  return (
    <main className="min-h-screen bg-background">
        <Header />
        <Hero/>
        <About/>
        <Project/>
        <Skills/>
        <Footer/>
    </main>
  );
}
