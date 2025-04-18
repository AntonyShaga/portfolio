'use client';

import {useTheme} from 'next-themes';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import dynamic, {DynamicOptions} from 'next/dynamic';

type DynamicIconOptions = DynamicOptions<{ className?: string }>;

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

const FallbackIcon = () => (
    <div className="h-6 w-6 rounded-full animate-pulse bg-cover bg-center bg-[url('/icons/MoonIcon.svg')] dark:bg-[url('/icons/SunIcon.svg')]" />
);

const ANIMATION_PROPS = {
    initial: { opacity: 0, rotate: -90, scale: 0.7 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.7 },
    transition: { duration: 0.3 }
};

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setMounted(true);
        void Promise.all([
            import('../icons/SunIcon'),
            import('../icons/MoonIcon')
        ]);
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isAnimating) {
            timer = setTimeout(() => setIsAnimating(false), 300);
        }
        return () => clearTimeout(timer);
    }, [isAnimating]);

    const isDark = mounted && resolvedTheme === 'dark';

    const handleClick = () => {
        if (!mounted) return;
        setIsAnimating(true);
        try {
            setTheme(isDark ? 'light' : 'dark');
        } catch (error) {
            console.error('Theme switch failed:', error);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
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
            onClick={!mounted ? undefined : handleClick}
            onKeyDown={handleKeyDown}
            className={`h-8 w-8 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ${
                isAnimating ? '' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
            } `}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={mounted ? resolvedTheme : 'placeholder'}
                    suppressHydrationWarning
                    {...ANIMATION_PROPS}
                >
                    {!mounted ? <FallbackIcon /> : (isDark ? <SunIcon className="h-6 w-6"/> : <MoonIcon className="h-6 w-6"/>)}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
