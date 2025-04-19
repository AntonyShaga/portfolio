import 'server-only'
import {Dictionary} from "@/types/dictionary";

const dictionaries = {
    en: () => import('../[lang]/dictionaries/ en.json').then((module) => module.default),
    ru: () => import('../[lang]/dictionaries/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ru') :Promise<Dictionary> =>
    dictionaries[locale]?.() ?? dictionaries.en()
