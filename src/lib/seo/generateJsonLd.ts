export function generateJsonLd(lang: 'en' | 'ru') {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": lang === 'ru' ? "Антон Шага" : "Anton Shaga",
        "jobTitle": "Frontend Developer",
        "url": `https://yourdomain.com/${lang}`,
        "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourprofile"
        ],
        "description": lang === 'ru'
            ? "Фронтенд-разработчик специализирующийся на Next.js"
            : "Frontend developer specializing in Next.js",
    };
}
