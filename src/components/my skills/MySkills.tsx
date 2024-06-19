import React from 'react';
import style from './MySkills.module.css'
import {MySkillsType} from "../../redax/redax";
import {MySkill} from "./my skill/MySkill";
import {Title} from "../title/Title";

type PropsForMySkillsType = {
    mySkills: MySkillsType
}
export const MySkills: React.FC<PropsForMySkillsType> = (
    {
        mySkills
    }
) => {
    let skill = mySkills.mySkillsArray.map(el => <MySkill key={el.id} title={el.title}
                                                          skillDescription={el.skillDescription}/>)
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div>
                    <Title as={'h2'}>{mySkills.mySkillsTitle}</Title>
                </div>
                <div className={style.skills__container}>
                    {skill}
                </div>
            </div>
        </div>

    );
};
