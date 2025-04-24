'use client'

import { motion } from "framer-motion"
import {getExperiences} from "@/lib/experiences";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const Experience = () => {

    const dict = useDictionary()

    const experiences = getExperiences(dict)

    return (
        <section  id="experience" className="py-24 transition-all duration-300 ">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg dark:bg-gray-50  bg-black text-white dark:text-black px-3 py-1 text-sm">
                        {dict.experience.sectionTitle}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{dict.experience.careerPathTitle}</h2>
                    <p className="max-w-[700px] md:text-lg">
                        {dict.experience.intro}
                    </p>
                </div>
                <div className="mt-12 space-y-6">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={"rounded-lg border shadow-sm border-gray-200"}>
                                <div className={"p-6"}>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>{experience.title}</h3>
                                            <p className={"text-sm"}>{experience.company}</p>
                                        </div>
                                        <div className="mt-2 md:mt-0 text-sm ">{experience.period}</div>
                                    </div>
                                </div>
                                <div className={"p-6 pt-0"}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {experience.description.map((item, itemIndex) => (
                                            <li key={itemIndex} className="">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Experience
