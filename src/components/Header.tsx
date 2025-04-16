"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center items-center">
      <div>
        <div>
          <Link href={"/"}>Мое портфолио</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
