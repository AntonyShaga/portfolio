'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const languages = ['en', 'ru'];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleChange = (lang: string) => {
        const segments = pathname.split('/');
        segments[1] = lang; // заменить язык в URL
        const newPath = segments.join('/');
        startTransition(() => {
            router.push(newPath);
        });
    };

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => handleChange(lang)}
                    className={`px-3 py-1 rounded border ${
                        lang === currentLang ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
           {/* {isPending && <span className="ml-2 animate-pulse">Loading...</span>}*/}
        </div>
    );
}
