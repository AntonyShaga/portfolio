import Link from "next/link";
import {getNavItems} from "@/lib/navigation";
import {getLangFromHeaders} from "@/lib/getLangFromHeaders";
import {getDictionary} from "@/app/i18n/get-dictionary";

interface IProps {
    ariaLabel:string
    onItemClick?: () => void
}
export default async  function Nav ( { ariaLabel,onItemClick  }:IProps)  {
    const lang = await getLangFromHeaders();

    const dict = await getDictionary(lang as 'en' | 'ru')

    const {navigation}=dict
    const navItems = getNavItems(navigation) ;

    return (
        <nav className="flex-col gap-10  lg:flex-row flex lg:gap-6 text-sm font-medium" aria-label={ariaLabel}>
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    onClick={onItemClick}
                    className="text-sm text-gray-500 hover:text-neutral-800 dark:text-gray-200  dark:hover:text-white font-medium  transition-colors"
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

