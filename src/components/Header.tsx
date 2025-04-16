"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  return (
    <header className="flex justify-center items-center">
      <div>
        <div>
          <Link href={"/"}>Мое портфолио</Link>
        </div>
      </div>
        <ThemeSwitcher/>
    </header>


  );
};

export default Header;
