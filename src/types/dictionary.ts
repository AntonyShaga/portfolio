export interface Dictionary {
    header: {
        logo: string;
        name: string;
        home: string;
        about: string;
        projects: string;
        skills: string;
        experience: string;
        contact: string;
        resume: string;
    };
    hero: {
        name: string;
        title: string;
        description: string;
        contact: string;
        projects: string;
    };
    toast: {
        loading: string
        success: string
        error: string
        downloadError: string
    }
}
export interface NavItem {
    name: string;
    href: `#${string}`;
}
