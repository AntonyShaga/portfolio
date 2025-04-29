// lib/seo/generateJsonLd.ts
interface JsonLdData {
    "@context": string;
    "@type": string;
    name?: string;
    jobTitle?: string;
    url?: string;
    sameAs?: string[];
    description?: string;
    // Добавьте другие необходимые поля
}

const MINIMAL_SCHEMA: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Developer",
    url: "https://default-site.com"
};

export function generateJsonLd(lang: 'en' | 'ru'): JsonLdData {
    try {
        const jsonLd: JsonLdData = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: lang === 'ru' ? 'Антон Шага' : 'Anton Shaga',
            jobTitle: "Frontend Developer",
            url: "https://yourdomain.com",
            sameAs: [
                "https://github.com/yourprofile",
                "https://linkedin.com/in/yourprofile"
            ],
            description: lang === 'ru'
                ? "Фронтенд-разработчик на Next.js и TypeScript"
                : "Frontend developer specializing in Next.js and TypeScript"
        };

        if (!jsonLd.name || !jsonLd.url) {
            throw new Error('Invalid JSON-LD: missing required fields');
        }

        return jsonLd;

    } catch (error) {
        console.error('JSON-LD Generation Error:', error);

        return {
            ...MINIMAL_SCHEMA,
            name: lang === 'ru' ? 'Антон Шага' : 'Anton Shaga',
            url: `https://yourdomain.com/${lang}`
        };
    }
}
