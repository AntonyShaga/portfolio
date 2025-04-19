import {Dictionary, NavItem} from "@/types/dictionary";

export const getNavItems = (dict: Dictionary):NavItem[] => [
    { name: dict.header.home, href: "#home" },
    { name: dict.header.about, href: "#about" },
    { name: dict.header.projects, href: "#projects" },
    { name: dict.header.skills, href: "#skills" },
    { name: dict.header.experience, href: "#experience" },
    { name: dict.header.contact, href: "#contact" },
]
