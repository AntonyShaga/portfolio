import Button from "@/components/ui/Button";
import Link from "next/link";
import Git from "@/icons/Git";
import ExternalLink from "@/icons/ExternalLink";
import ProjectImage from "@/components/project/ProjectImage";
import {ProjectItem,} from "@/types/dictionary";
import MotionWrapper from "@/components/ui/MotionWrapper";
import {getProjectsList} from "@/lib/projectsList";

interface IProps {
    project:ProjectItem[]
}
export default function ProjectCard ({project}:IProps) {

const projects = getProjectsList(project)

    return (
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <MotionWrapper as={"article"}
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                    }}
                    aria-labelledby={`project-${index}-title`}
                >
                    <div className="rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                        <div className="aspect-video overflow-hidden relative">
                           <ProjectImage project={project}/>
                        </div>
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3
                                id={`project-${index}-title`}
                                className="text-2xl font-semibold leading-none tracking-tight"
                            >
                                {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        <div className="p-6 pt-0 flex-grow">
                            <ul className="flex flex-wrap gap-2" aria-label="Технологии">
                                {project.tags.map((tag) => (
                                    <li key={tag}>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      {tag}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="items-center p-6 pt-0 flex justify-between gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="flex-1"
                                aria-label={`Посмотреть код проекта ${project.title}`}
                            >
                                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                    <Git className="w-4 h-4 mr-2" />
                                    {project.buttonCode}
                                </Link>
                            </Button>

                            <Button
                                size="sm"
                                asChild
                                variant="reverseColor"
                                className="flex-1"
                                aria-label={`Посмотреть демо проекта ${project.title}`}
                            >
                                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {project.buttonDemo}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </MotionWrapper>
            ))}
        </div>
    )
}

