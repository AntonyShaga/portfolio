"use client";


import ProjectCard from "@/components/project/ProjectCard";

const Project = () => {
    return (
      <section id="projects" className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Проекты</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Мои последние работы</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-lg">
                      Вот некоторые из проектов, над которыми я работал. Каждый проект уникален и демонстрирует различные аспекты
                      моих навыков и опыта.
                  </p>
              </div>
              <ProjectCard/>
          </div>
      </section>
    );
};

export default Project;
