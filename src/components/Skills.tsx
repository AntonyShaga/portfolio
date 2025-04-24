'use client'
import { motion } from "framer-motion"
import {
    SiCss3, SiGit, SiGithub,
    SiHtml5,
    SiJavascript, SiJest,
    SiNextdotjs, SiNpm,
    SiReact,
    SiRedux, SiStorybook,
    SiTailwindcss, SiTestinglibrary,
    SiTypescript, SiVite, SiWebpack
} from "react-icons/si";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const skillCategories = [
    {
        title: "Основные технологии",
        skills: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: SiCss3, color: "#1572B6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Redux", icon: SiRedux, color: "#764ABC" },
        ],
    },
    {
        title: "Инструменты и рабочий процесс",
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: SiGithub, color: "#181717" },
            { name: "npm", icon: SiNpm, color: "#CB3837" },
            { name: "Webpack", icon: SiWebpack, color: "#8DD6F9" },
            { name: "Vite", icon: SiVite, color: "#646CFF" },
            { name: "Jest", icon: SiJest, color: "#C21325" },
            { name: "Testing Library", icon: SiTestinglibrary, color: "#E33332" },
            { name: "Storybook", icon: SiStorybook, color: "#FF4785" },
        ],
    },
]


const Skills = () => {
    const dict = useDictionary()
    return (
        <section id="skills" className="py-24  dark:bg-black  bg-gray-50 ">
            <div className="container mx-auto px-4 md:px-6 ">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg px-3 py-1 text-sm  dark:bg-gray-50  bg-black text-white dark:text-black">{dict.skills.sectionTitle}</div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{dict.skills.stackTitle}</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-lg">
                        {dict.skills.description}
                    </p>
                </div>
                <div className="mt-12  space-y-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-4">
                            <h3 className="text-xl font-bold text-center ">{category.title}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                        className="flex flex-col items-center justify-center p-4 bg-white  rounded-lg  hover:shadow-md transition-shadow"
                                    >
                                        <skill.icon size={40} style={{ color: skill.color }} className="mb-2" />
                                        <span className="text-sm font-medium dark:text-black">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Skills;
