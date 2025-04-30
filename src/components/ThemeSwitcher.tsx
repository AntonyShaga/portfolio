'use client';

import {AnimatePresence} from 'framer-motion';
import dynamic, {DynamicOptions} from 'next/dynamic';
import {useThemeAnimation} from "@/hooks/useThemeAnimation";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/ui/MotionWrapper";

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
        <Button
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
            active={isAnimating}
        >
            <AnimatePresence mode="wait" initial={false}>
                <MotionWrapper as={"span"}
                    key={resolvedTheme}
                    suppressHydrationWarning
                    {...ANIMATION_PROPS}
                >
                    {!mounted ? <FallbackIcon /> : (isDark ? <SunIcon className="h-6 w-6"/> : <MoonIcon className="h-6 w-6"/>)}
                </MotionWrapper>
            </AnimatePresence>
        </Button>
    );
}
