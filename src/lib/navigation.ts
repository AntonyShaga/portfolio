import {Dictionary, NavItem} from "@/types/dictionary";

export const getNavItems = (dict: Dictionary):NavItem[] => [
    { name: dict.header.nav.home, href: "#home" },
    { name: dict.header.nav.about, href: "#about" },
    { name: dict.header.nav.projects, href: "#projects" },
    { name: dict.header.nav.skills, href: "#skills" },
    { name: dict.header.nav.experience, href: "#experience" },
    { name: dict.header.nav.contact, href: "#contact" },
]
