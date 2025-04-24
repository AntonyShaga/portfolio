"use client";


import ProjectCard from "@/components/project/ProjectCard";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const Project = () => {
    const dict = useDictionary()
    return (
      <section id="projects"  aria-labelledby="projects-heading" className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-lg  dark:bg-gray-50  bg-black text-white dark:text-black px-3 py-1 text-sm ">{dict.projects.sectionTitle}</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{dict.projects.projectTitle}</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-lg">
                      {dict.projects.description}
                  </p>
              </div>
              <ProjectCard/>
          </div>
      </section>
    );
};

export default Project;
