import Link from "next/link";
import MotionWrapper from "@/components/ui/MotionWrapper";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";
import ArrowDown from "@/icons/ArrowDown";
import {HeroSection} from "@/types/dictionary";

interface IProps {
  hero:HeroSection
}

const Hero = ({hero}:IProps)=>{
    const {name,description,title,projectsButton,contactButton} = hero

    return(
        <section aria-label="Hero section" className="relative min-h-[100vh] transition-all duration-300  flex items-center">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_300px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <MotionWrapper
                                as={"h1"}
                                className="max-w-[700px] w-full md:text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ delay: 0 }}
                            >
                                <div  className="text-3xl font-bold w-full flex flex-col tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    {name}
                                    <span className={"flex"}>{title}</span>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper
                                className="max-w-[600px] md:text-xl"
                                as={"p"}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ delay: 0.1 }}
                            >
                                {description}
                            </MotionWrapper>
                        </div>
                        <MotionWrapper
                            className="flex flex-col gap-2 min-[400px]:flex-row"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button className={'h-10 px-8 transition-all duration-300'} asChild variant={"danger"}>
                                <Link href="#contact" aria-label={`${contactButton} (Contact Section)`}>
                                    {contactButton}
                                </Link>
                            </Button>
                            <Button asChild className={'h-10 px-8 transition-all duration-300'}>
                                <Link href="#projects" aria-label={`${projectsButton} (Projects Section)`}>
                                    {projectsButton}
                                </Link>
                            </Button>
                        </MotionWrapper>
                       <SocialLinks/>
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 hover:text-neutral-800 dark:text-white dark:hover:text-gray-500">
                    <Link
                        href="#about"
                        className="flex items-center justify-center  transition-colors"
                    >
                        <ArrowDown className="h-6 w-6 transition-transform hover:scale-110" />
                        <span className="sr-only">Scroll down</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default Hero;
