'use client'

import {useDictionary} from "@/app/i18n/DictionaryContext";
import Link from "next/link";
import MotionWrapper from "@/components/ui/MotionWrapper";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";
import ArrowDown from "@/icons/ArrowDown";


const Hero = ()=>{
    const dict = useDictionary();

    return(
        <section aria-label="Hero section" className="relative h-screen flex items-center justify-center overflow-hidden pt-16"  >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_300px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <MotionWrapper as={"h1"}  className="max-w-[700px] w-full text-muted-foreground md:text-xl">
                                <div  className="text-3xl font-bold w-full flex flex-col tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    {dict.hero.name}
                                    <span className={"flex"}>{dict.hero.title}</span>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper className="max-w-[600px] text-muted-foreground md:text-xl" as={"p"} transition={{delay:0.1}}>
                                {dict.hero.description}
                            </MotionWrapper>
                        </div>
                        <MotionWrapper className="flex flex-col gap-2 min-[400px]:flex-row" transition={{delay:0.2}}>
                            <Button className={'h-10 px-8 transition-all duration-300'} asChild variant={"danger"}>
                                <Link href="#contact" aria-labelledby="contact-heading">
                                    {dict.hero.contactButton}
                                    <h2 id="contact-heading" className="sr-only">Contact Section</h2>
                                </Link>
                            </Button>
                            <Button asChild className={'h-10 px-8 transition-all duration-300'}>
                                <Link href="#projects" aria-labelledby="projects-heading">
                                    {dict.hero.projectsButton}
                                    <h2 id="projects-heading" className="sr-only">Projects Section</h2>
                                </Link>
                            </Button>
                        </MotionWrapper>
                       <SocialLinks/>
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 hover:text-neutral-800 dark:text-white dark:hover:text-gray-500">
                    <a
                        href="#about"
                        className="flex items-center justify-center  transition-colors"
                    >
                        <ArrowDown className="h-6 w-6" />
                        <span className="sr-only">Scroll down</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
export default Hero;
