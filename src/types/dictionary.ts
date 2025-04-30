export interface AppDictionary {
    header: HeaderContent;
    navigation: NavigationLabels;
    hero: HeroSection;
    about: AboutSection;
    skills: SkillsSection;
    experience: ExperienceSection;
    projects: ProjectsSection;
    contact: ContactSection;
    footer: FooterContent;
    toast: ToastMessages;
}

// --- Sub-sections ---
export interface HeaderContent {
    logo: string;
    name: string;
}

export interface NavigationLabels {
    home: string;
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
    resume: string;
}

export interface HeroSection {
    name: string;
    title: string;
    description: string;
    contactButton: string;
    projectsButton: string;
}

export interface AboutSection {
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
}

export interface SkillsSection {
    sectionTitle: string;
    stackTitle: string;
    description: string;
    technology: string;
    tools: string;
}

export interface ExperienceSection {
    sectionTitle: string;
    careerPathTitle: string;
    intro: string;
    items: ExperienceItem[];
}

export interface ProjectsSection {
    sectionTitle: string;
    projectTitle: string;
    description: string;
    project: ProjectItem[];
}

export interface FooterContent {
    copyright: string;
}

export interface ToastMessages {
    loading: string;
    success: string;
    error: string;
    downloadError: string;
}

export interface ContactSection {
    sectionTitle: string;
    contactTitle: string;
    description: string;
    info: ContactInfo;
    form: ContactFormI;
    feedback: ContactFeedback;
}

// --- Items ---


export interface ContactInfo {
    titleInfo: string;
    subtitleInfo: string;
    emailInfo: string;
    phoneInfo: string;
    locationInfo: string;
    socialsInfo: string;
}


export interface ContactFormI {
    titleForm: string;
    subtitleForm: string;
    namePlaceholderForm: string;
    emailPlaceholderForm: string;
    messagePlaceholderForm: string;
    submitForm: string;
    sendingForm: string;
    formErrors:ContactFormErrors
}

export interface ContactFormErrors {
    nameTooShort: string;
    nameTooLong: string;
    emailInvalid: string;
    emailTooLong: string;
    messageTooShort: string;
    messageTooLong: string;
}

export interface ContactFeedback {
    success: string;
    fail: string;
    network: string;
    feedbackToken: {
        fail: string;
        rateLimit: string;
    };
}


export interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string[];
}

export interface ProjectItem {
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl: string;
    repoUrl: string;
    buttonCode: string;
    buttonDemo: string;
}

export interface NavigationItem {
    name: string;
    href: `#${string}`;
}
