import React from 'react';
import style from './MySkill.module.css'

type PropsForMySkillType = {
    title: string
    skillDescription: string
}
export const MySkill:React.FC<PropsForMySkillType> = (
    {
        title,
        skillDescription
    }
) => {

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <h3>{title}</h3>
            </div>
            <div className={style.text}>
                <p>{skillDescription}</p>
            </div>
        </div>

    );
};