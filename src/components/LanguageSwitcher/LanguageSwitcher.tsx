'use client';

import {AnimatePresence} from 'framer-motion';
import {useLanguageSwitcher} from "@/hooks/useLanguageSwitcher";
import {Language} from "@/types/language";
import LanguageList from "@/components/LanguageSwitcher/LanguageList";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/ui/MotionWrapper";


const languages: Language[] = [
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
   /* { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },*/
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const currentLanguage = languages.find((l) => l.code === currentLang);
    const {isOpen , setIsOpen , ref , isPending,handleChange} = useLanguageSwitcher(currentLang)

    if (!currentLanguage) return currentLang;

    return (
        <div
            ref={ref}
            className="relative   border-transparent hover:border-border "
        >
            <Button onClick={() => setIsOpen((prev) => !prev)}
                    variant={isOpen ? 'ghost' : 'default'}
                    active={isOpen}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-label={`Change language. Current: ${currentLanguage.nativeName}`}
                    aria-busy={isPending}
            >
                <span>{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
                <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <MotionWrapper
                        className="absolute right-0 mt-2 dark:rounded-md   rounded-md  shadow-lg z-10"
                        initial={{ opacity: 0, y: -5 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <LanguageList languages={languages} currentLang={currentLang} onChange={handleChange}/>
                    </MotionWrapper>
                )}
            </AnimatePresence>
        </div>
    );
}
