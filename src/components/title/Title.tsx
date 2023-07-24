import React from 'react';
import style from "../my skills/MySkills.module.css";

type ForTitleType = {
    title: string
}
export const Title: React.FC<ForTitleType> = (
    {
        title
    }
) => {
    return (
        <h2 className={style.title}>
            {title}
        </h2>
    );
};