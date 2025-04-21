'use client';

import {AnimatePresence, motion} from 'framer-motion';
import dynamic, {DynamicOptions} from 'next/dynamic';
import {useThemeAnimation} from "@/hooks/useThemeAnimation";

type DynamicIconOptions = DynamicOptions<{ className?: string }>;

const FallbackIcon = () => (
    <div
        className="h-6 w-6 rounded-full animate-pulse bg-cover bg-center bg-[url('/icons/MoonIcon.svg')] dark:bg-[url('/icons/SunIcon.svg')]"
        aria-hidden="true"
    />
);


const SunIcon = dynamic(
    () => import('../icons/SunIcon').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <FallbackIcon />,
    } as DynamicIconOptions
) ;

const MoonIcon = dynamic(() => import('../icons/MoonIcon').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <FallbackIcon />,
    } as DynamicIconOptions
) ;


const ANIMATION_PROPS = {
    initial: { opacity: 0, rotate: -90, scale: 0.7 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.7 },
    transition: { duration: 0.3 }
};

export default function ThemeSwitcher() {

const {mounted,isDark,isAnimating,toggleTheme, resolvedTheme} = useThemeAnimation()

    const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    };
    return (
        <button
            type="button"
            aria-label={
                !mounted
                    ? 'Loading theme...'
                    : isDark
                        ? 'Switch to light mode'
                        : 'Switch to dark mode'
            }
            aria-busy={isAnimating}
            aria-live="polite"
            aria-disabled={!mounted}
            tabIndex={!mounted ? -1 : 0}
            onClick={!mounted ? undefined : toggleTheme}
            onKeyDown={handleKeyDown}
            className={`h-8 w-8 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ${
                isAnimating ? '' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
            } `}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={resolvedTheme}
                    suppressHydrationWarning
                    {...ANIMATION_PROPS}
                >
                    {!mounted ? <FallbackIcon /> : (isDark ? <SunIcon className="h-6 w-6"/> : <MoonIcon className="h-6 w-6"/>)}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
