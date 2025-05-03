import {ProjectItem} from "@/types/dictionary";

export const getProjectsList = (dict: ProjectItem[]): ProjectItem[] => {

    return dict.map((el) => ({
        title: el.title,
        description: el.description,
        image: getProjectImage(el.image, el.title),
        tags: el.tags,
        demoUrl: el.demoUrl,
        repoUrl: el.repoUrl,
        buttonCode:el.buttonCode,
        buttonDemo: el.buttonDemo,
    }));
};

const getProjectImage = (imagePath: string, title: string): string => {

    if (imagePath && !imagePath.includes('placeholder.svg')) {
        return imagePath;
    }

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
