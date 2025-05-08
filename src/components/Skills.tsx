import { getSkillCategories } from '@/lib/skillCategories';
import MotionWrapper from '@/components/ui/MotionWrapper';
import { SkillsSection } from '@/types/dictionary';

interface IProps {
  skills: SkillsSection;
}

const Skills = ({ skills }: IProps) => {
  const { tools, technology, stackTitle, sectionTitle, description } = skills;

  const skillCategories = getSkillCategories(tools, technology);

  return (
    <section id="skills" className="py-24  dark:bg-black transition-all duration-300   bg-gray-50 ">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg px-3 py-1 text-sm  dark:bg-gray-50  bg-black text-white dark:text-black">
            {sectionTitle}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{stackTitle}</h2>
          <p className="max-w-[700px]  md:text-lg">{description}</p>
        </div>
        <div className="mt-12  space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-xl font-bold text-center ">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <MotionWrapper
                    key={skillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    className="flex flex-col items-center justify-center p-4 bg-white  rounded-lg  hover:shadow-md transition-shadow"
                  >
                    <skill.icon
                      size={40}
                      style={{ color: skill.color }}
                      aria-label={skill.name}
                      className="mb-2"
                    />
                    <span className="text-sm font-medium dark:text-black">{skill.name}</span>
                  </MotionWrapper>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;
