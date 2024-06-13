import React from 'react';
import {Title} from "../title/Title";
import {SimpleButton} from "../button/SimpleButton";
import style from './Hiring.module.css'

export const Hiring = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Title title={"Рассматриваю варианты удаленной работы"}/>
                <div className={style.hiring}>
                    <SimpleButton name={"Нанять меня"} onClick={()=>{}}/>
                </div>
            </div>
        </div>
    );
};