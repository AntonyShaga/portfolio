"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useDictionary} from "@/app/i18n/DictionaryContext";
import {useParams} from "next/navigation";
import LanguageSwitcher from "@/components/language-switcher";

const Header = () => {

    const dict = useDictionary();
    const params = useParams();
    const lang = params.lang as string;
    return (
    <header className="flex justify-center items-center">
      <div className={`flex justify-center `}>
        <div>
          <Link className="hover:underline" href={`/${lang}`}>{dict.header.logo}</Link>
        </div>
          <nav className="flex gap-4">
              <Link href={`/${lang}/about`} className="hover:underline">
                  {dict.header.about}
              </Link>
              <Link href={`/${lang}/projects`} className="hover:underline">
                  {dict.header.projects}
              </Link>
              <Link href={`/${lang}/contact`} className="hover:underline">
                  {dict.header.contact}
              </Link>
          </nav>
      </div>
        <LanguageSwitcher currentLang={lang} />
        <ThemeSwitcher/>
    </header>


  );
};

export default Header;
