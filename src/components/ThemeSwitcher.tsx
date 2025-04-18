'use client';

import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';

const SunIcon = lazy(() => import('../icons/SunIcon')) as React.ComponentType<{
    className?: string;
}>;

const MoonIcon = lazy(() => import('../icons/MoonIcon')) as React.ComponentType<{
    className?: string;
}>;

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!mounted) return;

        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);

        try {
            setTheme(isDark ? 'light' : 'dark');
        } catch (error) {
            console.error('Theme switch failed:', error);
        }

        return () => clearTimeout(timer);
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
            onClick={handleClick}
            className={`h-8 w-8 flex items-center justify-center rounded-full p-2 transition-colors duration-300
                ${isAnimating ? '' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}
            `}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={mounted ? resolvedTheme : 'placeholder'}
                    suppressHydrationWarning
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.3 }}
                >
                    {!mounted ? (
                        <div className="h-6 w-6 rounded-full bg-transparent dark:bg-transparent animate-pulse dark:bg-[url('/icons/SunIcon.svg')] bg-[url('/icons/MoonIcon.svg')] bg-cover bg-center" />
                    ) : (
                        <Suspense
                            fallback={
                                <div className="h-6 w-6 rounded-full bg-transparent dark:bg-transparent animate-pulse dark:bg-[url('/icons/SunIcon.svg')] bg-[url('/icons/MoonIcon.svg')] bg-cover bg-center" />
                            }
                        >
                            {isDark ? (
                                <SunIcon className="h-6 w-6 transition duration-300" />
                            ) : (
                                <MoonIcon className="h-6 w-6 transition duration-300" />
                            )}
                        </Suspense>
                    )}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
