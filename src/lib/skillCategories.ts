import {
  SiCss3,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiRedux,
  SiStorybook,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiWebpack,
} from 'react-icons/si';

import type { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
export const getSkillCategories = (tools: string, technology: string): SkillCategory[] => {
  if (!tools || !technology) throw new Error('Dictionary skills not loaded');
  return [
    {
      title: technology,
      skills: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Redux', icon: SiRedux, color: '#764ABC' },
      ],
    },
    {
      title: tools,
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'GitHub', icon: SiGithub, color: '#181717' },
        { name: 'npm', icon: SiNpm, color: '#CB3837' },
        { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
        { name: 'Jest', icon: SiJest, color: '#C21325' },
        { name: 'Testing Library', icon: SiTestinglibrary, color: '#E33332' },
        { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
      ],
    },
  ];
};
