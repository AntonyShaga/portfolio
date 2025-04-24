'use client'

import {motion} from "framer-motion";
import DownloadResumeButton from "@/components/DownloadResumeButton";
import {useDictionary} from "@/app/i18n/DictionaryContext";

export default function  About () {
    const dict = useDictionary();
    return (
        <section id="about" aria-labelledby="about-heading" className="py-24 dark:bg-black transition-all duration-300 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 id="about-heading" className="sr-only">{dict.about.headline}</h2>
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block rounded-lg  dark:bg-gray-50  bg-black text-white dark:text-black px-3 py-1 text-sm ">{dict.about.sectionTitle}</div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{dict.about.headline}</h2>
                        <p className="text-muted-foreground md:text-lg">
                            {dict.about.text}
                        </p>
                        <p className="text-muted-foreground md:text-lg">
                            {dict.about.story}
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <DownloadResumeButton />
                        </div>
                    </motion.div>
                    <motion.div
                        className="space-y-4 "
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold">{dict.about.education.title}</h3>
                        <div className="rounded-lg border p-4 bg-white dark:text-black">
                            <h4 className="font-semibold">{dict.about.education.university}</h4>
                            <p className="text-sm ">{dict.about.education.degree}</p>
                        </div>
                        <h3 className="text-xl font-bold mt-6">{dict.about.certificates}</h3>
                        <div className="space-y-2">
                            <div className="rounded-lg border p-4 bg-white dark:text-black">
                                <h4 className="font-semibold">Advanced React and Redux</h4>
                                <p className="text-sm ">Udemy, 2020</p>
                            </div>
                            <div className="rounded-lg border p-4 bg-white dark:text-black">
                                <h4 className="font-semibold">TypeScript Professional</h4>
                                <p className="text-sm ">Frontend Masters, 2021</p>
                            </div>
                            <div className="rounded-lg border p-4 bg-white dark:text-black">
                                <h4 className="font-semibold">Next.js Advanced Features</h4>
                                <p className="text-sm">Vercel, 2022</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
