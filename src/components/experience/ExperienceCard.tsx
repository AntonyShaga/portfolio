import {motion} from "framer-motion";
import {getExperiences} from "@/lib/experiences";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const ExperienceCard = () => {

    const dict = useDictionary();

    const experiences = getExperiences(dict);
    return (
        <div className="mt-12 space-y-6" role="list" aria-label={dict.experience.sectionTitle}>
            {experiences.map((experience, index) => (
                <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    role="listitem"
                    aria-labelledby={`exp-title-${index}`}
                >
                    <div className="rounded-lg border shadow-sm border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3
                                        id={`exp-title-${index}`}
                                        className="text-2xl font-semibold leading-none tracking-tight"
                                    >
                                        {experience.title}
                                    </h3>
                                    <p className="text-sm">{experience.company}</p>
                                </div>
                                <div className="mt-2 md:mt-0 text-sm">
                                    {experience.period}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <ul className="list-disc pl-5 space-y-1">
                                {experience.description.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    )
}

export default ExperienceCard
