import {ExperienceItem} from "@/types/dictionary";


export const getExperiences = (dict:ExperienceItem[]) : ExperienceItem[] => {
    return dict.map((el) => ({
        title: el.title,
        company: el.company,
        period: el.period,
        description: el.description,
    }))
}
