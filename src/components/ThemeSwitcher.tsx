'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black transition"
        >
            {resolvedTheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
        </button>
    )
}
