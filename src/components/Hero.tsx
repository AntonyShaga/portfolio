'use client'

import {useDictionary} from "@/app/i18n/DictionaryContext";
import Link from "next/link";
import MotionWrapper from "@/components/ui/MotionWrapper";
import SocialLinks from "@/components/ui/SocialLinks";


const Hero = ()=>{
    const dict = useDictionary();

    return(
        <section aria-label="Hero section" className="relative h-screen flex items-center justify-center overflow-hidden pt-16"  >
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_300px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <MotionWrapper  className="max-w-[700px] w-full text-muted-foreground md:text-xl">
                                <h1 className="text-3xl font-bold w-full flex flex-col tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    <span className={'flex '}>{dict.hero.name}</span>
                                    <span className={"flex"}>{dict.hero.title}</span>
                                </h1>
                            </MotionWrapper>
                            <MotionWrapper className="max-w-[600px] text-muted-foreground md:text-xl" as={"p"} transition={{delay:0.1}}>
                                {dict.hero.description}
                            </MotionWrapper>
                        </div>
                        <MotionWrapper className="flex flex-col gap-2 min-[400px]:flex-row" transition={{delay:0.2}}>
                            <Link href="#contact" aria-labelledby="contact-heading" className="flex items-center justify-center h-10 px-8 bg-neutral-900 transition-all duration-300 dark:bg-white dark:text-black text-white rounded-md dark:hover:bg-gray-200 hover:bg-neutral-700 cursor-pointer">
                                {dict.hero.contact}
                                <h2 id="contact-heading" className="sr-only">Contact Section</h2>
                            </Link>

                            <Link href="#projects" aria-labelledby="projects-heading" className="flex items-center justify-center h-10 px-8 border rounded-md transition-all duration-300 dark:bg-neutral-900 dark:text-white text-black dark:hover:bg-neutral-700 dark:border-neutral-700 hover:bg-gray-200 cursor-pointer" >
                                {dict.hero.projects}
                                <h2 id="projects-heading" className="sr-only">Projects Section</h2>
                            </Link>
                        </MotionWrapper>
                       <SocialLinks/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero;
