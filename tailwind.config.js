module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'moon-icon': "url('/icons/MoonIcon.svg')",
                'sun-icon': "url('/icons/SunIcon.svg')",
            },
            colors: {
                background: "rgb(var(--background))",
                foreground: "rgb(var(--foreground))",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "Arial", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                ".rounded-1\\/2": {
                    borderRadius: "50%",
                },
            });
        },
    ],
}
