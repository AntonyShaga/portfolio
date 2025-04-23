'use client';

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useParams} from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import MotionWrapper from "@/components/ui/MotionWrapper";
import Nav from "@/components/Header/Nav";
import {useDictionary} from "@/app/i18n/DictionaryContext";
import Button from "@/components/ui/Button";

const Header = () => {
    const dict = useDictionary();
    const params = useParams();
    const lang = params.lang as string;


    return (
        <MotionWrapper as={'header'}
            initial={{ opacity: 0, y: 0 }}
            transition={{ duration: 0, ease: 'easeOut' }}
            className="fixed flex justify-center top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href={`/${lang}`} aria-label="Homepage" className="flex items-center space-x-2 transition-all duration-300">
                        <span className="h-8 w-8 bg-black dark:bg-white  dark:text-black text-white rounded-md flex items-center justify-center transition-all duration-300">
                          <span className="font-bold">{dict.header.logo}</span>
                        </span>
                        <span className="font-bold text-lg">{dict.header.name}</span>
                    </Link>

                   <Nav/>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher currentLang={lang} />
                        <ThemeSwitcher />
                        <Button
                            variant={"danger"}
                        >
                            {dict.header.resume}
                        </Button>
                    </div>
                </div>
            </div>
        </MotionWrapper>
    );
};

export default Header;
