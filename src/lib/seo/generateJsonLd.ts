interface JsonLdData {
  '@context': string;
  '@type': string;
  name?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  description?: string;
}

const MINIMAL_SCHEMA: JsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Developer',
  url: 'https://portfolio-inky-six-36.vercel.app',
};

export function generateJsonLd(lang: 'en' | 'ru' | 'uk'): JsonLdData {
  try {
    const name = lang === 'ru' ? 'Антон Шага' : lang === 'uk' ? 'Антон Шага' : 'Anton Shaga';

    const description =
      lang === 'ru'
        ? 'Фронтенд-разработчик на Next.js и TypeScript'
        : lang === 'uk'
          ? 'Фронтенд-розробник на Next.js та TypeScript'
          : 'Frontend developer specializing in Next.js and TypeScript';

    const jsonLd: JsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle: 'Frontend Developer',
      url: `https://portfolio-inky-six-36.vercel.app/${lang}`,
      sameAs: [
        'https://github.com/AntonyShaga',
        'https://www.linkedin.com/in/anton-shaga-2b4383157/',
      ],
      description,
    };

    if (!jsonLd.name || !jsonLd.url) {
      throw new Error('Invalid JSON-LD: missing required fields');
    }

    return jsonLd;
  } catch (error) {
    console.error('JSON-LD Generation Error:', error);

    return {
      ...MINIMAL_SCHEMA,
      name: lang === 'ru' ? 'Антон Шага' : lang === 'uk' ? 'Антон Шага' : 'Anton Shaga',
      url: `https://portfolio-inky-six-36.vercel.app/${lang}`,
    };
  }
}
