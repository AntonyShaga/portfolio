import { Language } from '@/types/language';

type Props = {
  languages: Language[];
  currentLang: string;
  onChange: (lang: string) => void;
};

export default function LanguageList({ languages, onChange, currentLang }: Props) {
  return (
    <ul
      className="p-[10px] flex flex-col gap-2 dark:bg-neutral-900 bg-white dark:rounded-md  dark:text-white"
      role="listbox"
      tabIndex={-1}
    >
      {languages.map((lang) => (
        <li
          className={`flex items-center  px-1 py-2 rounded-md transition dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer  ${
            lang.code === currentLang
              ? 'bg-gray-200  dark:bg-neutral-800'
              : 'hover:bg-gray-50 text-gray-900'
          }`}
          onClick={() => onChange(lang.code)}
          key={lang.code}
        >
          <button
            className={'cursor-pointer'}
            role="option"
            aria-selected={lang.code === currentLang}
          >
            <span className="text-lg hidden sm:inline"> {lang.flag} </span>
            <span className="flex-1  text-sm">{lang.nativeName}</span>
            <span>{lang.code === currentLang && <span className="ml-2">✓</span>}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
