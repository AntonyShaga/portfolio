import { Metadata } from 'next';

interface GenerateMetadataProps {
    title?: string;
    description?: string;
    path?: string; // Изменили url на path для удобства
    image?: string;
    lang?: 'ru' | 'en'; // Добавляем поддержку языков
}

const BASE_URL = 'https://portfolio-inky-six-36.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/og-image-default.png`;

export const generateMetadata = ({
                                     title = 'Антон Шага — Frontend разработчик',
                                     description = 'Персональное портфолио фронтенд-разработчика',
                                     path = '',
                                     image = DEFAULT_IMAGE,
                                     lang = 'ru'
                                 }: GenerateMetadataProps = {}): Metadata => {

    const fullUrl = `${BASE_URL}${lang === 'ru' ? '/ru' : '/en'}${path}`;
    const alternateUrls = {
        'ru': `${BASE_URL}/ru${path}`,
        'en': `${BASE_URL}/en${path}`,
    };

    return {
        title: title.includes('Антон Шага') ? title : `${title} | Антон Шага`,
        description,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: fullUrl,
            languages: {
                'ru': alternateUrls.ru,
                'en': alternateUrls.en,
            },
        },
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName: 'Антон Шага | Портфолио',
            images: [{
                url: image,
                width: 1200,
                height: 630,
                alt: title,
            }],
            locale: lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
};
