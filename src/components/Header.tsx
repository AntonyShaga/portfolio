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
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">

        <div className="text-xl font-bold">
          <Link className="hover:opacity-80 transition" href={`/${lang}`}>{dict.header.logo}</Link>
        </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
              {
                  navItems.map((item, index) => (<Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" key={index} href={item.href}>{item.name}</Link>))
              }
          </nav>
        <div className="flex items-center gap-3">
            <LanguageSwitcher currentLang={lang} />
            <ThemeSwitcher />
        </div>
    </header>


  );
};

export default Header;
