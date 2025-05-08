import Image from 'next/image';
import { ProjectItem } from '@/types/dictionary';

const ProjectImage = ({ project }: { project: ProjectItem }) => {
  const isSvgPlaceholder = project.image.startsWith('data:image/svg+xml');

  return (
    <div className="aspect-video relative overflow-hidden">
      <Image
        src={project.image}
        alt={`Превью проекта: ${project.title}`}
        fill
        className="object-cover transition-transform hover:scale-105"
        placeholder={isSvgPlaceholder ? 'empty' : 'blur'}
        blurDataURL={isSvgPlaceholder ? undefined : project.image}
        quality={isSvgPlaceholder ? 75 : 90}
      />
    </div>
  );
};
export default ProjectImage;
