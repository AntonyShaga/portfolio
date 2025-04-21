import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

type UseThemeAnimationResult = {
    mounted: boolean;
    isAnimating: boolean;
    toggleTheme: () => void;
    isDark: boolean;
    resolvedTheme?: string;
};

export function useThemeAnimation() :UseThemeAnimationResult {
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

    const toggleTheme = () => {
        if (!mounted) return;
        setIsAnimating(true);
        try {
            setTheme(isDark ? 'light' : 'dark');
        } catch (error) {
            console.error('Theme switch failed:', error);
        }
    };
    return {
        mounted,
        isAnimating,
        toggleTheme,
        isDark,
        resolvedTheme
    }
}
