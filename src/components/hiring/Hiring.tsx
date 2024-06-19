import React from 'react';
import {Title} from "../title/Title";
import {SimpleButton} from "../button/SimpleButton";
import style from './Hiring.module.css'

export const Hiring = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Title as={'h2'}>{"Рассматриваю варианты удаленной работы"}</Title>
                <div className={style.hiring}>
                    <SimpleButton onClick={()=>{}}>{"Нанять меня"}</SimpleButton>
                </div>
            </div>
        </div>
    );
};