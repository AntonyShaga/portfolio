import { NavigationItem, NavigationLabels } from '@/types/dictionary';

export const getNavItems = (dict: NavigationLabels): NavigationItem[] => [
  { name: dict.home, href: '#home' },
  { name: dict.about, href: '#about' },
  { name: dict.projects, href: '#projects' },
  { name: dict.skills, href: '#skills' },
  { name: dict.experience, href: '#experience' },
  { name: dict.contact, href: '#contact' },
];
