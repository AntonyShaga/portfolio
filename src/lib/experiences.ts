import {Dictionary} from "@/types/dictionary";

export interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string[];
}



export const getExperiences = (dict:Dictionary) : ExperienceItem[] => {
    return dict.experience.items.map((el) => ({
        title: el.title,
        company: el.company,
        period: el.period,
        description: el.description,
    }))
}
