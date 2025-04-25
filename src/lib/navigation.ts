import {NavItem, NavTitle} from "@/types/dictionary";

export const getNavItems = (dict: NavTitle):NavItem[] => [
    { name: dict.home, href: "#home" },
    { name: dict.about, href: "#about" },
    { name: dict.projects, href: "#projects" },
    { name: dict.skills, href: "#skills" },
    { name: dict.experience, href: "#experience" },
    { name: dict.contact, href: "#contact" },
]
