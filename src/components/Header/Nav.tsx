import Link from "next/link";
import {getNavItems} from "@/lib/navigation";
import {useDictionary} from "@/app/i18n/DictionaryContext";


const Nav = () => {
    const dict = useDictionary();
    const navItems = getNavItems(dict);

    return (
        <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-neutral-800 dark:hover:text-white font-medium  transition-colors"
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default Nav;
