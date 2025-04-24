import { motion } from "framer-motion"
import Button from "@/components/ui/Button";

const projects = [
    {
        title: "E-commerce Platform",
        description: "Полнофункциональный интернет-магазин с корзиной, оформлением заказа и панелью администратора.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
        demoUrl: "https://example.com",
        repoUrl: "https://github.com",
    },
    {
        title: "Дашборд аналитики",
        description: "Интерактивный дашборд для визуализации и анализа данных с различными графиками и фильтрами.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["React", "TypeScript", "D3.js", "Recharts", "Material UI"],
        demoUrl: "https://example.com",
        repoUrl: "https://github.com",
    },
    {
        title: "Социальная платформа",
        description: "Платформа для общения с возможностью создания профиля, публикации постов и обмена сообщениями.",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["React", "Firebase", "Tailwind CSS", "Redux", "React Query"],
        demoUrl: "https://example.com",
        repoUrl: "https://github.com",
    },
]

const ProjectCard = () => {
    return (
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="overflow-hidden h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full transition-transform hover:scale-105"
                            />
                        </div>
                        <h2>
                            <div>{project.title}</div>
                            <p>{project.description}</p>
                        </h2>
                        <div className="flex-grow">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <div key={tag} >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                    {/*<Github className="mr-2 h-4 w-4" />*/}
                                    Код
                                </a>
                            </Button>
                            <Button size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  {/*  <ExternalLink className="mr-2 h-4 w-4" />*/}
                                    Демо
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
export default ProjectCard
