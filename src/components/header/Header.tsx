import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import MotionWrapper from "@/components/ui/MotionWrapper";
import Nav from "@/components/header/Nav";
import DownloadResumeButton from "@/components/DownloadResumeButton";
import {HeaderContent} from "@/types/dictionary";
import BurgerButtonWrapper from "@/components/header/BurgerButtonWrapper";

interface IProps {
    header: HeaderContent
    lang: 'en' | 'ru'
}

export default function Header({header, lang}: IProps) {
    const {logo, name} = header

    return (
        <MotionWrapper as={'header'}
                       initial={{opacity: 0, y: 0}}
                       whileInView={{opacity: 1, y: 0}}
                       transition={{duration: 1, ease: 'easeOut'}}
                       className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-black/80"
        >
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href={`/${lang}`} aria-label="Homepage" className="flex items-center space-x-2">
                        <span className="h-8 w-8 bg-black dark:bg-white  dark:text-black text-white rounded-md flex items-center justify-center">
                          <span className="font-bold">{logo}</span>
                        </span>
                        <span className="font-bold text-lg">{name}</span>
                    </Link>
                    <div className="hidden lg:block">
                        <Nav ariaLabel={"Main navigation"} />
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher currentLang={lang} />
                        <ThemeSwitcher />
                        <div className="hidden  lg:block">
                            <DownloadResumeButton />
                        </div>
                        <div className={"lg:hidden bg-gray-100"}>
                            <BurgerButtonWrapper navContent={<Nav ariaLabel="Mobile navigation" />} />
                        </div>
                    </div>
                </div>
            </div>
        </MotionWrapper>
    );
}
