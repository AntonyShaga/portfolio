import 'server-only';
import { AppDictionary } from '@/types/dictionary';

const dictionaries = {
  en: () => import('../[lang]/dictionaries/en.json').then((module) => module.default),
  ru: () => import('../[lang]/dictionaries/ru.json').then((module) => module.default),
  ua: () => import('../[lang]/dictionaries/ua.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ru' | 'ua'): Promise<AppDictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
