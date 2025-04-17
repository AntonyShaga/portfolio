"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const Header = () => {

    const dict = useDictionary();

    return (
    <header className="flex justify-center items-center">
      <div>
        <div>
          <Link href={"/"}>{dict.wer}</Link>
        </div>
      </div>
        <ThemeSwitcher/>
    </header>


  );
};

export default Header;
