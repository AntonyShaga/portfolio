'use client';

import { AnimatePresence } from 'framer-motion';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';
import { Language } from '@/types/language';
import LanguageList from '@/components/languageSwitcher/LanguageList';
import Button from '@/components/ui/Button';
import MotionWrapper from '@/components/ui/MotionWrapper';
import ChevronIcon from '@/icons/ChevronIcon';

const languages: Language[] = [
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ua', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const currentLanguage = languages.find((l) => l.code === currentLang);
  const { isOpen, setIsOpen, ref, isPending, handleChange } = useLanguageSwitcher(currentLang);

  if (!currentLanguage) return currentLang;

  return (
    <div ref={ref} className="relative   border-transparent hover:border-border ">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        variant={isOpen ? 'ghost' : 'default'}
        active={isOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change language. Current: ${currentLanguage.nativeName}`}
        aria-busy={isPending}
        rightIcon={
          <ChevronIcon
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        }
      >
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <MotionWrapper
            className="absolute right-0 mt-2 dark:rounded-md   rounded-md  shadow-lg z-10"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <LanguageList languages={languages} currentLang={currentLang} onChange={handleChange} />
          </MotionWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}
