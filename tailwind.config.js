module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
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
