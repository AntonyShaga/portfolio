"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useDictionary} from "@/app/i18n/DictionaryContext";
import {useParams} from "next/navigation";

const Header = () => {

    const dict = useDictionary();
    const params = useParams();
    const lang = params.lang as string;
    return (
    <header className="flex justify-center items-center">
      <div>
        <div>
          <Link href={`/${lang}`}>{dict.wer}</Link>
        </div>
      </div>
        <ThemeSwitcher/>
    </header>


  );
};

export default Header;
