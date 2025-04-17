'use client';

import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full p-2 transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
            <Icon
                className="h-6 w-6 transition-transform duration-300 transform hover:scale-110"
                icon={isDark ? 'lets-icons:sun-light' : 'lets-icons:moon'}
            />
        </button>
    );
}
