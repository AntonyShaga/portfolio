import Link from "next/link";
import {getNavItems} from "@/lib/navigation";
import {NavTitle} from "@/types/dictionary";

interface IProps {
    nav:NavTitle,
    ariaLabel:string
}
export default async function Nav ( { ariaLabel ,nav }:IProps)  {
    const navItems = await getNavItems(nav) ;

    return (
        <nav className="hidden md:flex gap-6 text-sm font-medium" aria-label={ariaLabel}>
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

