"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useDictionary} from "@/app/i18n/DictionaryContext";
import {useParams} from "next/navigation";
import LanguageSwitcher from "@/components/language-switcher";
import {getNavItems} from "@/lib/navigation";

const Header = () => {

    const dict = useDictionary();
    const params = useParams();
    const lang = params.lang as string;
    const navItems = getNavItems(dict)
    return (
    <header className="fixed flex justify-center top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
                <Link href="#" className="flex items-center space-x-2">
                    <span className="h-8 w-8 bg-black text-white rounded-md flex items-center justify-center">
                         <span className="font-bold">{dict.header.logo}</span>
                    </span>
                    <span className="font-bold text-lg">{dict.header.name}</span>
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    {
                        navItems.map((item, index) => (
                            <Link  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                   key={index}
                                   href={item.href}
                            >
                                {item.name}
                            </Link>))
                    }
                </nav>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher currentLang={lang} />
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
