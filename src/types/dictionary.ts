export interface Dictionary {
    header: {
        logo: string;
        name: string;
        nav: {
            home: string;
            about: string;
            projects: string;
            skills: string;
            experience: string;
            contact: string;
            resume: string;
        };
    };
    hero: {
        name: string;
        title: string;
        description: string;
        contactButton: string;
        projectsButton: string;
    };
    about: {
        sectionTitle: string;
        headline: string;
        text: string;
        education: {
            title: string;
            university: string;
            degree: string;
        };
        certificates: string;
        story: string;
    };
    skills: {
        sectionTitle: string;
        stackTitle: string;
        description: string;
        technology: string;
        tools: string;
    };
    experience: {
        sectionTitle: string;
        careerPathTitle: string;
        intro: string;
        items: ExperienceItem[];
    };
    projects : {
        sectionTitle: string;
        projectTitle: string;
        description: string;
        items: ProjectItem[];
    }
    footer: {
        copyright: string;
    };
    toast: {
        loading: string;
        success: string;
        error: string;
        downloadError: string;
    };
}

export interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string[];
}
export type ProjectItem = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl: string;
    repoUrl: string;
    buttonCode: string;
    buttonDemo: string;
};
export interface NavItem {
    name: string;
    href: `#${string}`;
}
