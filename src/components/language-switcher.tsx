'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

type Language = {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
};

const languages: Language[] = [
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const currentLanguage = languages.find((l) => l.code === currentLang);
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (lang: string) => {
        if (lang === currentLang || isPending) return;

        const segments = pathname.split('/').filter(Boolean);

        if (segments.length === 0) {
            startTransition(() => router.push(`/${lang}`));
        } else {
            segments[0] = lang;
            startTransition(() => router.push(`/${segments.join('/')}`));
        }

        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    if (!currentLanguage) return currentLang;

    return (
        <div
            ref={ref}
            className="relative   border-transparent hover:border-border"
        >
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black min-w-[8rem] ${
                    isOpen ? ' cursor-default' : 'hover:bg-gray-200 cursor-pointer dark:hover:bg-neutral-800'
                }`}
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
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute right-0 mt-2 dark:rounded-md   rounded-md  shadow-lg z-10"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <ul className="p-[10px] dark:bg-neutral-900 dark:rounded-md dark:text-white" role="listbox" tabIndex={-1} >
                            {languages.map((lang) => (
                                <li className={`flex items-center gap-2 px-2 py-2 rounded-md transition dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer  ${
                                    lang.code === currentLang
                                        ? 'bg-gray-200  dark:bg-neutral-800'
                                        : 'hover:bg-gray-50 text-gray-900'
                                }`} key={lang.code}>
                                    <button
                                        className={"cursor-pointer"}
                                        onClick={() => handleChange(lang.code)}
                                        role="option"
                                        aria-selected={lang.code === currentLang}

                                    >
                                        <span className="text-lg"> {lang.flag} </span>
                                        <span className="flex-1 text-sm">{lang.nativeName}</span>
                                       <span>{lang.code === currentLang && <span className="ml-2">✓</span>}</span>

                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
