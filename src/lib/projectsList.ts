import { Dictionary } from "@/types/dictionary";

export type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl: string;
    repoUrl: string;
};

export const getProjectsList = (dict: Dictionary): Project[] => {
    return dict.projects.items.map((el) => ({
        title: el.title,
        description: el.description,
        image: getProjectImage(el.image, el.title), // Используем хелпер для изображений
        tags: el.tags,
        demoUrl: el.demoUrl,
        repoUrl: el.repoUrl
    }));
};

// Хелпер для получения изображения или плейсхолдера
const getProjectImage = (imagePath: string, title: string): string => {
    // Если изображение указано и это не плейсхолдер
    if (imagePath && !imagePath.includes('placeholder.svg')) {
        return imagePath;
    }

    // Генерируем SVG-плейсхолдер с названием проекта
    const svgTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <text x="50%" y="50%" fill="#6b7280" font-family="sans-serif" 
                  font-size="24" text-anchor="middle" dominant-baseline="middle">
                ${title}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;base64,${Buffer.from(svgTemplate).toString('base64')}`;
};
