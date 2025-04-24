'use client'

import {useDictionary} from "@/app/i18n/DictionaryContext";
import ExperienceCard from "@/components/experience/ExperienceCard";

const Experience = () => {
    const dict = useDictionary();


    return (
        <section
            id="experience"
            className="py-24 transition-all duration-300"
            aria-labelledby="experience-title"
            aria-describedby="experience-description"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div
                        className="inline-block rounded-lg dark:bg-gray-50 bg-black text-white dark:text-black px-3 py-1 text-sm"
                        id="experience-badge"
                    >
                        {dict.experience.sectionTitle}
                    </div>
                    <h2
                        className="text-3xl font-bold tracking-tighter md:text-4xl"
                        id="experience-title"
                    >
                        {dict.experience.careerPathTitle}
                    </h2>
                    <p
                        className="max-w-[700px] md:text-lg"
                        id="experience-description"
                    >
                        {dict.experience.intro}
                    </p>
                </div>
                <ExperienceCard/>
            </div>
        </section>
    );
};

export default Experience;
